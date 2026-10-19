import os,sys
d=os.path.dirname(os.path.abspath(__file__))
out=[]
for line in open(os.path.join(d,'order.txt'),encoding='utf-8').read().split():
    if line=='@HEADEND': out.append('</head>\n<body>\n')
    elif line=='@END': out.append('\n</body>\n</html>\n')
    else: out.append(open(os.path.join(d,line),encoding='utf-8').read())
open(sys.argv[1],'w',encoding='utf-8').write(''.join(out))
