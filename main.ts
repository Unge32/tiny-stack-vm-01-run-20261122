// KANCIL: one-table dispatch tiny stack VM
import{readdirSync as R,readFileSync as F,writeFileSync as W,mkdirSync as M}from"node:fs";
const I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output';
const T='01146abf0000000099999995999599909990000000000000044000000000000058000000000000004414';
function run(p,q){
const D=new Int32Array(256),C=new Int32Array(64),Y=new Int32Array(256);
let s=0,c=0,o='',n=0,pc=0,t=0;
for(;;){
if(t===1e6)return[o,10];
if(pc<0||pc>=p.length)return[o,9];
const op=p[pc];
if(!(op<8||op>15&&op<35&&op!=31||op>47&&op<53||op>63&&op<66||op>79&&op<84))return[o,5];
const m=op==1?1:op==2?4:op>47&&op<52?2:0;
if(pc+m>=p.length)return[o,9];
t++;
const x=pc+1+m,v=parseInt(T[op],16),u=v>>2,g=v&3;
if(s<u)return[o,2];
if(s-u+g>256)return[o,3];
pc=x;
switch(op){
case 0:return[o,0];
case 1:D[s++]=(p[x-1]<<24)>>24;break;
case 2:D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{const a=D[s-1];D[s-1]=D[s-2];D[s-2]=a;break;}
case 6:D[s]=D[s-2];s++;break;
case 7:{const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break;}
case 23:D[s-1]=-D[s-1];break;
case 27:D[s-1]=~D[s-1];break;
case 48:case 49:case 50:{const r=((p[x-2]|p[x-1]<<8)<<16)>>16,z=op>48?D[--s]:0;if(op==48||(op==49)==(z==0))pc=x+r;break;}
case 51:if(c==64)return[o,7];C[c++]=x;pc=p[x-2]|p[x-1]<<8;break;
case 52:if(!c)return[o,8];pc=C[--c];break;
case 64:{const a=D[s-1];if(a>>>0>255)return[o,6];D[s-1]=Y[a];break;}
case 65:{const a=D[s-1],y=D[s-2];if(a>>>0>255)return[o,6];s-=2;Y[a]=y;break;}
case 80:{const z=''+D[s-1];if(o.length+z.length>65536)return[o,11];s--;o+=z;break;}
case 81:if(o.length>65535)return[o,11];o+=String.fromCharCode(D[--s]&255);break;
case 82:D[s++]=n<q.length?q[n++]:-1;break;
case 83:return[o,D[--s]&255];
default:{
const b=D[s-1],a=D[s-2];
let r;
if(op>18&&op<23&&!b)return[o,4];
if(op==16)r=a+b|0;
else if(op==17)r=a-b|0;
else if(op==18)r=Math.imul(a,b);
else if(op==19)r=a/b|0;
else if(op==20)r=a%b|0;
else if(op==21)r=(a>>>0)/(b>>>0)|0;
else if(op==22)r=(a>>>0)%(b>>>0)|0;
else if(op==24)r=a&b;
else if(op==25)r=a|b;
else if(op==26)r=a^b;
else if(op==28)r=a<<b;
else if(op==29)r=a>>b;
else if(op==30)r=a>>>b;
else if(op==32)r=a==b?1:0;
else if(op==33)r=a<b?1:0;
else if(op==34)r=(a>>>0)<(b>>>0)?1:0;
s-=2;D[s++]=r;
}
}
}
}
for(const d of R(I)){
const r=run(F(I+'/'+d+'/program.bin'),F(I+'/'+d+'/input.bin'));
M(O+'/'+d,{recursive:true});
W(O+'/'+d+'/stdout.bin',r[0],'latin1');
W(O+'/'+d+'/exit.txt',r[1]+'\n');
}
