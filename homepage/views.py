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
import string

from .models import CelegansSirna, CelegansBed, CelegansMrna
from .models import CelegansChrSliceI, CelegansChrSliceII, CelegansChrSliceIII, CelegansChrSliceIV, CelegansChrSliceV
from .models import CelegansChrSliceX, CelegansChrSliceMtDNA

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

    #THE FOLLOWING CHECKS IF USER INPUT IS VALID (string only consists of A, C, G, T, U, a, c, g, t, u)
    
    #get length for user input
    theSeqLength = len(theSeq)

    inputOkay = 1
    
    #check each character
    seqChars = list(theSeq)
    for x in range(0, theSeqLength):
        if seqChars[x] == 'A':
            continue
        if seqChars[x] == 'C':
            continue        
        if seqChars[x] == 'G':
            continue
        if seqChars[x] == 'T':
            continue
        if seqChars[x] == 'U':
            continue
        if seqChars[x] == 'a':
            continue
        if seqChars[x] == 'c':
            continue        
        if seqChars[x] == 'g':
            continue
        if seqChars[x] == 't':
            continue
        if seqChars[x] == 'u':
            continue
        #invalid char detected
        inputOkay = 2
        break

    #notify user of invalid input if invalid char detected
    if inputOkay == 2:
        data = {
            "sirSpecVal": 'INVALID INPUT',
            "sirSrchType": theSrchTyp,
            "mismatchesAllowed": theMismatchCount,
            "sirnaResults": theSeq,
            "sirSeq": '',
            "bedFileResults": '',
            "mrnasResultSet": '',
        }
        return JsonResponse(data)

    #otherwise, first convert any lower case letters to upper case
    for x in range(0, theSeqLength):
        if seqChars[x] == 'a':
            seqChars[x] = 'A'
        elif seqChars[x] == 'c':
            seqChars[x] = 'C'        
        elif seqChars[x] == 'g':
            seqChars[x] = 'G'
        elif seqChars[x] == 't':
            seqChars[x] = 'T'
        elif seqChars[x] == 'u':
            seqChars[x] = 'U'

    #next, convert all U to T
    for x in range(0, theSeqLength):
        if seqChars[x] == 'U':
            seqChars[x] = 'T'

    theSeq = ''.join(seqChars)


    #flip sirna sequence
    sirnaSeq = list(theSeq)
    for x in range(0, theSeqLength):
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
    theSeqR = ''
    for i in sirnaSeq:
        theSeqR = i + theSeqR


    bedFilesResultSet = ['']
    mrnasResultSet = ['']
    
    if theSpecVal == 'Caenorhabditis elegans':
        try:
            #get subset of bed files
            sirnasResultSet = CelegansSirna.objects.filter(sequence=theSeq)
            if sirnasResultSet.exists() == False:
                data = {
                    "sirSpecVal": theSpecVal,
                    "sirSrchType": theSrchTyp,
                    "mismatchesAllowed": theMismatchCount,
                    "sirnaResults": theSeq,
                    "sirSeq": 'EXISTS NOT',
                    "bedFileResults": '',
                    "mrnasResultSet": '',
                }
                return JsonResponse(data)
            for sirnaRow in sirnasResultSet:
                sirName = sirnaRow.name
                #remove > character to get bed file sirna name equivalent
                sirName = sirName.replace('>','')
                bedRows = CelegansBed.objects.filter(name=sirName)
                for bedRow in bedRows:
                    mmComputed = 0
                    inResultSet = 1
                    #check if current bed row already added to output list
                    if len(bedFilesResultSet) > 1:
                        bedCount = -1
                        for bedResult in bedFilesResultSet:
                            bedCount = bedCount + 1
                            if bedCount == 0:
                                continue
                            if bedResult[0] == bedRow.chr_num and bedResult[1] == bedRow.start and bedResult[2] == bedRow.end and bedResult[3] == bedRow.name and bedResult[4] == bedRow.strand and bedResult[5] == bedRow.stage and bedResult[6] == bedRow.source and bedResult[7] == bedRow.pubmed_id and bedResult[8] == bedRow.target_mrna:
                                inResultSet = 2

                    #current bed row not yet in output list            
                    if inResultSet == 1:
                        matchedSequence = 'nothing yet'
                        #get matching sequence for each bed row
                        bedRowStart = bedRow.start
                        bedRowEnd = bedRow.end
                        sliceResult = 'nothing yet'
                        sliceResult2 = 'nothing yet'
                        lastTwo = 'nothing yet'
                        onlyOneSliceNeeded = 1
                        if int(bedRowStart) <= 99:
                            lastTwo = bedRowStart
                            if bedRow.chr_num == 'I':
                                sliceResult = CelegansChrSliceI.objects.get(start=0)
                            if bedRow.chr_num == 'II':
                                sliceResult = CelegansChrSliceII.objects.get(start=0)
                            if bedRow.chr_num == 'III':
                                sliceResult = CelegansChrSliceIII.objects.get(start=0)
                            if bedRow.chr_num == 'IV':
                                sliceResult = CelegansChrSliceIV.objects.get(start=0)
                            if bedRow.chr_num == 'V':
                                sliceResult = CelegansChrSliceV.objects.get(start=0)
                            if bedRow.chr_num == 'X':
                                sliceResult = CelegansChrSliceX.objects.get(start=0)
                            if bedRow.chr_num == 'MtDNA':
                                sliceResult = CelegansChrSliceMtDNA.objects.get(start=0)
                            #matchedSequence = sliceResult.sequence[ int(bedRowStart) : int(bedRowStart)+theSeqLength ]
                        else:
                            startLength = len(bedRowStart)
                            lastTwo = bedRowStart [ startLength-2 : startLength ]
                            bedRowStart = bedRowStart[ 0 : startLength-2]
                            bedRowStart = bedRowStart + '00'
                            bedRowStart = int(bedRowStart)
                            if bedRow.chr_num == 'I':
                                sliceResult = CelegansChrSliceI.objects.get(start=bedRowStart)
                            if bedRow.chr_num == 'II':
                                sliceResult = CelegansChrSliceII.objects.get(start=bedRowStart)
                            if bedRow.chr_num == 'III':
                                sliceResult = CelegansChrSliceIII.objects.get(start=bedRowStart)
                            if bedRow.chr_num == 'IV':
                                sliceResult = CelegansChrSliceIV.objects.get(start=bedRowStart)
                            if bedRow.chr_num == 'V':
                                sliceResult = CelegansChrSliceV.objects.get(start=bedRowStart)
                            if bedRow.chr_num == 'X':
                                sliceResult = CelegansChrSliceX.objects.get(start=bedRowStart)
                            if bedRow.chr_num == 'MtDNA':
                                sliceResult = CelegansChrSliceMtDNA.objects.get(start=bedRowStart)
                            #matchedSequence = sliceResult.sequence[ int(lastTwo) : int(lastTwo)+theSeqLength ]
                        if int(bedRowEnd) > 99:
                            endLength = len(bedRowEnd)
                            bedRowEnd = bedRowEnd[ 0 : endLength-2]
                            bedRowEnd = bedRowEnd + '00'
                            if bedRowStart != bedRowEnd:
                                onlyOneSliceNeeded = 2
                                bedRowEnd = int(bedRowEnd)
                                if bedRow.chr_num == 'I':
                                    sliceResult2 = CelegansChrSliceI.objects.get(start=bedRowEnd)
                                if bedRow.chr_num == 'II':
                                    sliceResult2 = CelegansChrSliceII.objects.get(start=bedRowEnd)
                                if bedRow.chr_num == 'III':
                                    sliceResult2 = CelegansChrSliceIII.objects.get(start=bedRowEnd)
                                if bedRow.chr_num == 'IV':
                                    sliceResult2 = CelegansChrSliceIV.objects.get(start=bedRowEnd)
                                if bedRow.chr_num == 'V':
                                    sliceResult2 = CelegansChrSliceV.objects.get(start=bedRowEnd)
                                if bedRow.chr_num == 'X':
                                    sliceResult2 = CelegansChrSliceX.objects.get(start=bedRowEnd)
                                if bedRow.chr_num == 'MtDNA':
                                    sliceResult2 = CelegansChrSliceMtDNA.objects.get(start=bedRowEnd)
                        if onlyOneSliceNeeded == 1:
                            matchedSequence = sliceResult.sequence[ int(lastTwo) : int(lastTwo)+theSeqLength ]
                        else:
                            combinedSlice = sliceResult.sequence + sliceResult2.sequence
                            matchedSequence = combinedSlice[ int(lastTwo) : int(lastTwo)+theSeqLength ]
                        if bedRow.strand == '+':
                                #flip matched sequence
                                preMatchedSequence = list(matchedSequence)
                                for x in range(0, theSeqLength):
                                    if preMatchedSequence[x] == 'A':
                                        preMatchedSequence[x] = 'T'
                                    elif preMatchedSequence[x] == 'T':
                                        preMatchedSequence[x] = 'A'
                                    elif preMatchedSequence[x] == 'C':
                                        preMatchedSequence[x] = 'G'
                                    elif preMatchedSequence[x] == 'G':
                                        preMatchedSequence[x] = 'C'
                                preMatchedSequence = ''.join(preMatchedSequence)

                                #reverse matched sequence
                                matchedSequence = ''
                                for i in preMatchedSequence:
                                    matchedSequence = i + matchedSequence

                        #compute number of mismatches present in matched sequence
                        seqIndex = 0
                        for base in matchedSequence:
                            if base != theSeqR[seqIndex]:
                                mmComputed = mmComputed + 1
                            seqIndex = seqIndex + 1
                        if mmComputed <= int(theMismatchCount):
                            bedFilesResultSet.append([bedRow.chr_num, bedRow.start, bedRow.end, bedRow.name, bedRow.strand, bedRow.stage, bedRow.source, bedRow.pubmed_id, bedRow.target_mrna, matchedSequence, mmComputed])

            #get subset of mRNAs
            bedCount = -1
            for bedRow in bedFilesResultSet:
                bedCount = bedCount + 1
                if bedCount == 0:
                    continue
                currentMrna1 = bedRow[8]
                #check if current mRNA already added to output list
                inResultSet = 1
                if len(mrnasResultSet) > 1:
                    mrnaCount = -1
                    for item in mrnasResultSet:
                        mrnaCount = mrnaCount + 1
                        if mrnaCount == 0:
                            continue
                        if item[3] == currentMrna1:
                            inResultSet = 2

                if inResultSet == 1:
                    currentMrna2 = CelegansMrna.objects.get(name=currentMrna1)
                    mrnasResultSet.append([currentMrna2.chr_num, currentMrna2.start, currentMrna2.end, currentMrna2.name, currentMrna2.strand])

            resultsWereFound = 'yes'
            #if no results (because of mismatch limit exceeded for all sirnas)
            if len(bedFilesResultSet) == 1:
                resultsWereFound = 'no'
            
            #data = yesResults(sirnasResultSet, theSpecVal, theSrchTyp, bedFilesResultSet, theMismatchCount)
            data = {
                "sirSpecVal": theSpecVal,
                "sirSrchType": theSrchTyp,
                "sirSeq": theSeq,
                "sirSeqR": theSeqR,
                "mismatchesAllowed": theMismatchCount,
                "bedFileResults": bedFilesResultSet,
                "mrnaResults": mrnasResultSet,
                "resultsFound": resultsWereFound,
            }
        except ObjectDoesNotExist:
            data = ''
    else:
        data = {
            "sirSpecVal": theSpecVal,
            "sirSrchType": 'NOT READY',
            "mismatchesAllowed": theMismatchCount,
            "sirnaResults": theSeq,
            "sirSeq": '',
            "bedFileResults": '',
            "mrnasResultSet": '',
        }
        
    return JsonResponse(data)

    '''
    #this goes under if theSpecVall == 'Caenor..." once sus ready
    elif theSpecVal == 'Sus domesticus':
        try:
            sirnasResultSet = SusDomesticusSirna.objects.get(sequence=theSeq)
            theSource = SusDomesticusSource.objects.get(id=sirnasResultSet.source_id)
            data = yesResults(sirnasResultSet, theSpecVal, theSrchTyp, theSource, theMismatchCount) 
        except ObjectDoesNotExist:
            data = noResults(theSpecVal, theSrchTyp, theSeq, theMismatchCount)
    '''

def yesResults(sirnasResultSet, theSpecVal, theSrchTyp, bedFilesResultSet, theMismatchCount):

    #myFile = urllib.request.urlopen("https://s3-us-west-2.amazonaws.com/psirbasecdnafafiles/cElegans.txt")

    sirnaSeqOriginal = sirnasResultSet[0].sequence

    #get length for sirna sequence
    sLength = len(sirnaSeqOriginal)
    
    #flip sirna sequence
    sirnaSeq = list(sirnaSeqOriginal)
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

    mrnaName = ['']
    rowList = ['']
    eofReached = 1
    matchFound = 1

    mrnaSeq = ['']
    
    while True:
        #get name of current mRNA
        charRead = myFile.read(1).decode('utf-8')
        while charRead != ' ':
            mrnaName.append(charRead)
            charRead = myFile.read(1).decode('utf-8')
        mrnaName = ''.join(mrnaName)

        #skip stuff until chromosome number reached
        while charRead != ':':
            charRead = myFile.read(1).decode('utf-8')
        charRead = myFile.read(1).decode('utf-8')
        while charRead != ':':
            charRead = myFile.read(1).decode('utf-8')

        #get chromosome number of current mRNA
        chrNum = ['']
        charRead = myFile.read(1).decode('utf-8')
        while charRead != ':':
            chrNum.append(charRead)
            charRead = myFile.read(1).decode('utf-8')
        chrNum = ''.join(chrNum)

        #get start position of current mRNA relative to the chromosome containing it
        mrnaStart = ['']
        charRead = myFile.read(1).decode('utf-8')
        while charRead != ':':
            mrnaStart.append(charRead)
            charRead = myFile.read(1).decode('utf-8')
        mrnaStart = ''.join(mrnaStart)
        mrnaStart = int(mrnaStart)
            
        #get end position of current mRNA relative to the chromosome containing it
        mrnaEnd = ['']
        charRead = myFile.read(1).decode('utf-8')
        while charRead != ':':
            mrnaEnd.append(charRead)
            charRead = myFile.read(1).decode('utf-8')
        mrnaEnd = ''.join(mrnaEnd)
        mrnaEnd = int(mrnaEnd)

        #skip stuff until beginning of mRNA sequence reached (a newline char)
        while charRead == ' ' or all(c in string.whitespace for c in charRead) == False:
            charRead = myFile.read(1).decode('utf-8')
        

        #get mRNA sequence of current mRNA
        mrnaSeq = ['']
        charRead = myFile.read(1)
        while True:
            #if EOF reached...
            if not charRead:
                eofReached = 2
                break
            charRead = charRead.decode('utf-8')
            if charRead == '>':
                break
            if charRead.isalnum() == False:
                charRead = myFile.read(1)
                continue
            mrnaSeq.append(charRead)
            charRead = myFile.read(1)
        mrnaSeq = ''.join(mrnaSeq)

        #get current mRNA length
        mLength = mrnaEnd - mrnaStart + 1
        
        #do matching algo on current mRNA
        #matchFound = NaiveSearch(sirnaSeq, mrnaSeq, mrnaName, chrNum, mrnaStart, mrnaEnd, rowList, sLength, mLength, matchFound)
        matchFound = KMPSearch(sirnaSeq, mrnaSeq, mrnaName, chrNum, mrnaStart, mrnaEnd, rowList, matchFound)
        
        #FOR DEBUGGING ONLY: append > symbol for next mRNA name after having processed current mRNA
        mrnaName = ['']
        mrnaName.append('>')

        if eofReached == 2:
            break

    data = {
        "sirSpecVal": theSpecVal,
        "sirSrchType": theSrchTyp,
        "mismatchesAllowed": theMismatchCount,
        "sirnaResults": sirnasResultSet,
        "sirSeq": sirnaSeq,
        "bedFileResults": bedFilesResultSet,
        "mrnasResultSet": rowList,
    }
    return data

def NaiveSearch(sirnaSeq, mrnaSeq, mrnaName, chrNum, mrnaStart, mrnaEnd, rowList, sLength, mLength, matchFound):
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
                matchFound = 2
            offset += 1
    return matchFound
    
def KMPSearch(pat, txt, mrnaName, chrNum, mrnaStart, mrnaEnd, rowList, matchFound):
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
            matchFound = 2
            j = lps[j-1]
 
        # mismatch after j matches
        elif i < N and pat[j] != txt[i]:
            # Do not match lps[0..lps[j-1]] characters,
            # they will match anyway
            if j != 0:
                j = lps[j-1]
            else:
                i += 1
    return matchFound
 
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
