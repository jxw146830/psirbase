sirnaSeq = 'GAATTGCAAGTGAAAATCGGCGATTTCGGGTTGGCAACAACTT'

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

output = open("output.txt", 'w')
output.write(sirnaSeq)
