"""Hershey Script Simplex (scripts.jhf) -> the cursive letters for 筆記体なぞり (parts/f24_cdata.js).

The Hershey glyphs are drawn in pen-plotter order; SPEC joins and reorders their strokes into the order
a person writes them (one pen movement per letter where real cursive has one, i/j dots and t/x crosses
last). Run:  python3 babel-flight/cursive/build.py
"""
import json,os
HERE=os.path.dirname(os.path.abspath(__file__))
def parse(path):
    raw=open(path,encoding='latin-1').read().split('\n')
    glyphs=[];i=0
    while i<len(raw):
        line=raw[i];i+=1
        if not line.strip():continue
        n=int(line[5:8]);body=line[8:]
        while len(body)<n*2 and i<len(raw):body+=raw[i];i+=1
        L=ord(body[0])-82;R=ord(body[1])-82
        strokes=[];cur=[]
        for k in range(1,n):
            a,b=body[2*k],body[2*k+1]
            if a==' ' and b=='R':
                if cur:strokes.append(cur);cur=[]
                continue
            cur.append([ord(a)-82,ord(b)-82])
        if cur:strokes.append(cur)
        glyphs.append({'L':L,'R':R,'s':strokes})
    return glyphs
G=parse(os.path.join(HERE,'scripts.jhf'))
def gl(ch):return G[ord(ch)-32]
def d2(a,b):return (a[0]-b[0])**2+(a[1]-b[1])**2
def J(a,b,mode='line'):
    a=[list(p) for p in a];b=[list(p) for p in b]
    if mode=='retrace':
        k=min(range(len(a)),key=lambda i:d2(a[i],b[0]))
        tail=a[k:-1][::-1]
        out=a+tail
    else: out=a[:]
    if out[-1]==b[0]: out+=b[1:]
    else: out+=b
    return out
def R(s):return s[::-1]
SPEC={
 'd':lambda s:[J(s[0],s[1],'retrace')],
 'g':lambda s:[J(s[0],s[1])],
 'h':lambda s:[J(s[0],s[1])],
 'i':lambda s:[s[1],s[0]],
 'j':lambda s:[s[1],s[0]],
 'k':lambda s:[J(J(s[0],s[1]),s[2])],
 'm':lambda s:[J(J(s[0],s[1],'retrace'),s[2],'retrace')],
 'n':lambda s:[J(s[0],s[1],'retrace')],
 'p':lambda s:[J(J(s[0],s[1],'retrace'),s[2])],
 'q':lambda s:[J(s[0],s[1])],
 's':lambda s:[J(s[0],s[1])],
 't':lambda s:[J(s[0],s[1]),s[2]],
 'u':lambda s:[J(s[0],s[1])],
 'v':lambda s:[J(s[0],s[1])],
 'w':lambda s:[J(J(s[0],s[1]),s[2])],
 'y':lambda s:[J(s[0],s[1])],
 'B':lambda s:[J(s[0],s[1])],
 'K':lambda s:[s[0],J(s[1],s[2])],
 'M':lambda s:[J(J(s[0],s[1],'retrace'),s[2],'retrace')],
 'N':lambda s:[J(s[0],s[1],'retrace')],
 'U':lambda s:[J(s[0],s[1],'retrace')],
 'W':lambda s:[J(J(J(s[0],R(s[1])),s[2]),R(s[3]))],
 'Y':lambda s:[J(s[0],s[1])],
}
out={}
for ch in 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ':
    g=gl(ch);s=g['s']
    st=SPEC[ch](s) if ch in SPEC else [list(map(list,x)) for x in s]
    # drop consecutive duplicate points
    clean=[]
    for x in st:
        y=[x[0]]
        for p in x[1:]:
            if p!=y[-1]:y.append(p)
        clean.append(y)
    L=g['L']
    dots=[]
    for i,x in enumerate(clean):
        xs=[p[0] for p in x];ys=[p[1] for p in x]
        if max(xs)-min(xs)<=2 and max(ys)-min(ys)<=2:dots.append(i)
    out[ch]={'w':g['R']-L,'s':[[c for p in x for c in (p[0]-L,p[1])] for x in clean],'d':dots}
sp=G[0]
meta={'space':sp['R']-sp['L'],'top':-12,'xh':0,'base':9,'desc':21,'join':4}
js='var CUR_G='+json.dumps(out,separators=(',',':'))+';\nvar CUR_M='+json.dumps(meta,separators=(',',':'))+';\n'
HDR=open(os.path.join(HERE,'header.txt'),encoding='utf-8').read()
open(os.path.join(HERE,'..','parts','f24_cdata.js'),'w',encoding='utf-8').write(HDR+js)
print(len(js),'bytes; multi-stroke:',{k:len(v['s']) for k,v in out.items() if len(v['s'])>1})
