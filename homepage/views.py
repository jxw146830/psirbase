from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from .forms import SearchForm
from django import forms
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist
import os
from psiRbase.settings import PROJECT_ROOT
import urllib.request

from .models import CelegansSirna, CelegansSource, SusDomesticusSirna, SusDomesticusSource

def index(request):
    form = SearchForm()
    if request.method == 'POST':
        form = SearchForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            userIP = form.cleaned_data['userInput']
            # redirect to a new URL:
            return HttpResponseRedirect(userIP + '/')
    return render(request, 'homepage/index.html', {'theForm': form})

def search1(request):
    theSpecVal = request.GET.get('speciesVal', None)
    theSrchTyp = request.GET.get('srchTyp', None)
    theSeq = request.GET.get('sqn', None)
    theMismatchCount = request.GET.get('mmVal', None)
    data = ''
    if theSpecVal == 'Caenorhabditis elegans':
        try:
            resultSet = CelegansSirna.objects.get(sequence=theSeq)
            theSource = CelegansSource.objects.get(id=resultSet.source_id)
            data = yesResults(resultSet, theSpecVal, theSrchTyp, theSource, theMismatchCount)
            #data = yesResults('', theSpecVal, theSrchTyp, '')
        except ObjectDoesNotExist:
            data = noResults(theSpecVal, theSrchTyp, theSeq, theMismatchCount)
        
    elif theSpecVal == 'Sus domesticus':
        try:
            resultSet = SusDomesticusSirna.objects.get(sequence=theSeq)
            theSource = SusDomesticusSource.objects.get(id=resultSet.source_id)
            data = yesResults(resultSet, theSpecVal, theSrchTyp, theSource, theMismatchCount) 
        except ObjectDoesNotExist:
            data = noResults(theSpecVal, theSrchTyp, theSeq, theMismatchCount)
    else:
        data = {
            "sirSpecVal": theSpecVal,
            "sirSrchType": theSrchTyp,
            "sirName": "",
            "sirSeq": "Data not available for this species yet...",
            "sirStage": "",
            "sirSrc": "",
            "pubmedID": "",
        }
    return JsonResponse(data)

def yesResults(resultSet, theSpecVal, theSrchTyp, theSource, theMismatchCount):
    
    if theSpecVal != 'Caenorhabditis elegans':
        data = {
            "sirSpecVal": theSpecVal,
            "sirSrchType": theSrchTyp,
            "mismatchesAllowed": theMismatchCount,
            "sirName": resultSet.name,
            "sirSeq": resultSet.sequence,
            "sirSeqR": '',
            "sirStage": resultSet.stage,
            "sirSrc": theSource.author,
            "pubmedID": theSource.pubmed_id,
            "resultSet": '',
        }
        return data

    myFile = urllib.request.urlopen("https://gdurl.com/ZMAl")

    charRead = myFile.read(1)
    data = {
        "sirSpecVal": theSpecVal,
        "sirSrchType": theSrchTyp,
        "mismatchesAllowed": theMismatchCount,
        "sirName": resultSet.name,
        "sirSeq": resultSet.sequence,
        "sirSeqR": charRead,
        "sirStage": resultSet.stage,
        "sirSrc": theSource.author,
        "pubmedID": theSource.pubmed_id,
        "resultSet": '',
    }
    return data
    
    rowList = ['']
    mrnaName = ['']

    sirnaSeq = resultSet.sequence

    #get length for sirna sequence
    sLength = len(sirnaSeq)
    
    #flip sirna sequence
    sirnaSeq = list(sirnaSeq)
    for x in range(0, sLength):
        if sirnaSeq[x] == 'A':
            sirnaSeq[x] = 'T'
        elif sirnaSeq[x] == 'T':
            sirnaSeq[x] = 'A'
        elif sirnaSeq[x] == 'C':
            sirnaSeq[x] = 'G'
        elif sirnaSeq[x] == 'G':
            sirnaSeq[x] = 'C'
    sirnaSeq = ''.join(sirnaSeq)
    #reverse sirna sequence
    str = ''
    for i in sirnaSeq:
        str = i + str
    sirnaSeq = str
    
    while True:
        #get name of current mRNA
        charRead = myFile.read(1)
        while charRead != ' ':
            mrnaName.append(charRead)
            charRead = myFile.read(1)
        mrnaName = ''.join(mrnaName)

        #skip stuff until chromosome number reached
        while charRead != ':':
            charRead = myFile.read(1)
        charRead = myFile.read(1)
        while charRead != ':':
            charRead = myFile.read(1)

        #get chromosome number of current mRNA
        chrNum = ['']
        charRead = myFile.read(1)
        while charRead != ':':
            chrNum.append(charRead)
            charRead = myFile.read(1)
        chrNum = ''.join(chrNum)

        #get start position of current mRNA relative to the chromosome containing it
        mrnaStart = ['']
        charRead = myFile.read(1)
        while charRead != ':':
            mrnaStart.append(charRead)
            charRead = myFile.read(1)
        mrnaStart = ''.join(mrnaStart)
        mrnaStart = int(mrnaStart)
            
        #get end position of current mRNA relative to the chromosome containing it
        mrnaEnd = ['']
        charRead = myFile.read(1)
        while charRead != ':':
            mrnaEnd.append(charRead)
            charRead = myFile.read(1)
        mrnaEnd = ''.join(mrnaEnd)
        mrnaEnd = int(mrnaEnd)

        #skip stuff until beginning of mRNA sequence reached (a newline char)
        while charRead != '\n':
            charRead = myFile.read(1)

        #get mRNA sequence of current mRNA
        mrnaSeq = ['']
        charRead = myFile.read(1)
        while True:
            if charRead == '':
                break
            if charRead == '>':
                break
            if charRead == '\n':
                charRead = myFile.read(1)
                continue
            if charRead == '\r':
                charRead = myFile.read(1)
                continue
            mrnaSeq.append(charRead)
            charRead = myFile.read(1)
        mrnaSeq = ''.join(mrnaSeq)

        #get current mRNA length
        mLength = mrnaEnd - mrnaStart + 1
        
        # # # # # # # # BEGIN MATCHING ALGO # # # # # # #
        '''
        if sLength <= mLength:
            offset = 0
            maxOffset = mLength - sLength
            for i in range(0, maxOffset+1):
                ss = mrnaSeq[ i : i + sLength ]
                if sirnaSeq == ss:
                    sirnaStart = mrnaStart + offset
                    sirnaEnd = sirnaStart + sLength - 1
                    newRow = (mrnaName, chrNum, sirnaStart, sirnaEnd)
                    rowList.append(newRow)
                offset += 1
        '''
        
        KMPSearch(sirnaSeq, mrnaSeq, mrnaName, chrNum, mrnaStart, mrnaEnd, rowList)
        
        #FOR DEBUGGING ONLY: append > symbol for next mRNA name after having processed current mRNA
        mrnaName = ['']
        mrnaName.append('>')

        if charRead == '':
            break

    data = {
        "sirSpecVal": theSpecVal,
        "sirSrchType": theSrchTyp,
        "mismatchesAllowed": theMismatchCount,
        "sirName": resultSet.name,
        "sirSeq": resultSet.sequence,
        "sirSeqR": sirnaSeq,
        "sirStage": resultSet.stage,
        "sirSrc": theSource.author,
        "pubmedID": theSource.pubmed_id,
        "resultSet": rowList,
    }
    return data


def noResults(theSpecVal, theSrchTyp, theSeq, theMismatchCount):
    data = {
        "sirSpecVal": theSpecVal,
        "sirSrchType": theSrchTyp,
        "mismatchesAllowed": theMismatchCount,
        "sirName": "",
        "sirSeq": theSeq,
        "sirSeqR": "",
        "sirStage": "No such sirna sequence exists.",
        "sirSrc": "",
        "pubmedID": "",
    }
    return data

def KMPSearch(pat, txt, mrnaName, chrNum, mrnaStart, mrnaEnd, rowList):
    M = len(pat)
    N = len(txt)
 
    # create lps[] that will hold the longest prefix suffix 
    # values for pattern
    lps = [0]*M
    j = 0 # index for pat[]
 
    # Preprocess the pattern (calculate lps[] array)
    computeLPSArray(pat, M, lps)
 
    i = 0 # index for txt[]
    while i < N:
        if pat[j] == txt[i]:
            i += 1
            j += 1
 
        if j == M:
            sirnaStart = mrnaStart + (i-j)
            sirnaEnd = sirnaStart + M - 1
            newRow = (mrnaName, chrNum, sirnaStart, sirnaEnd)
            rowList.append(newRow)
            j = lps[j-1]
 
        # mismatch after j matches
        elif i < N and pat[j] != txt[i]:
            # Do not match lps[0..lps[j-1]] characters,
            # they will match anyway
            if j != 0:
                j = lps[j-1]
            else:
                i += 1
 
def computeLPSArray(pat, M, lps):
    len = 0 # length of the previous longest prefix suffix
 
    lps[0] # lps[0] is always 0
    i = 1
 
    # the loop calculates lps[i] for i = 1 to M-1
    while i < M:
        if pat[i]==pat[len]:
            len += 1
            lps[i] = len
            i += 1
        else:
            # This is tricky. Consider the example.
            # AAACAAAA and i = 7. The idea is similar 
            # to search step.
            if len != 0:
                len = lps[len-1]
 
                # Also, note that we do not increment i here
            else:
                lps[i] = 0
                i += 1
