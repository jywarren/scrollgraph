(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// JSFEAT MINFILE INJECTION
/* eslint-disable */
var jsfeat=jsfeat||{REVISION:"ALPHA"};(function(r){var o=1.192092896e-7;var l=1e-37;var m=256,i=512,h=1024,x=2048,w=4096;var A=1,n=2,b=3,p=4;var z=new Int32Array([-1,1,4,-1,4,-1,-1,-1,8,-1,-1,-1,-1,-1,-1,-1,8]);var y=(function(){return function(B){return(B&65280)}})();var k=(function(){return function(B){return(B&255)}})();var c=(function(){return function(B){return z[(B&65280)>>8]}})();var a=0;var f=1;var e=2;var u=3;var d=1;var s=1;var g=2;var v=(function(){function B(D,C){this.size=((D+7)|0)&-8;if(typeof C==="undefined"){this.buffer=new ArrayBuffer(this.size)}else{this.buffer=C;this.size=C.length}this.u8=new Uint8Array(this.buffer);this.i32=new Int32Array(this.buffer);this.f32=new Float32Array(this.buffer);this.f64=new Float64Array(this.buffer)}return B})();var q=(function(){function B(F,D,E,C){this.type=y(E)|0;this.channel=k(E)|0;this.cols=F|0;this.rows=D|0;if(typeof C==="undefined"){this.allocate()}else{this.buffer=C;this.data=this.type&m?this.buffer.u8:(this.type&i?this.buffer.i32:(this.type&h?this.buffer.f32:this.buffer.f64))}}B.prototype.allocate=function(){delete this.data;delete this.buffer;this.buffer=new v((this.cols*c(this.type)*this.channel)*this.rows);this.data=this.type&m?this.buffer.u8:(this.type&i?this.buffer.i32:(this.type&h?this.buffer.f32:this.buffer.f64))};B.prototype.copy_to=function(D){var C=D.data,G=this.data;var E=0,F=(this.cols*this.rows*this.channel)|0;for(;E<F-4;E+=4){C[E]=G[E];C[E+1]=G[E+1];C[E+2]=G[E+2];C[E+3]=G[E+3]}for(;E<F;++E){C[E]=G[E]}};B.prototype.resize=function(F,D,C){if(typeof C==="undefined"){C=this.channel}var E=(F*c(this.type)*C)*D;if(E>this.buffer.size){this.cols=F;this.rows=D;this.channel=C;this.allocate()}else{this.cols=F;this.rows=D;this.channel=C}};return B})();var t=(function(){function B(C){this.levels=C|0;this.data=new Array(C);this.pyrdown=jsfeat.imgproc.pyrdown}B.prototype.allocate=function(C,E,F){var D=this.levels;while(--D>=0){this.data[D]=new q(C>>D,E>>D,F)}};B.prototype.build=function(F,E){if(typeof E==="undefined"){E=true}var H=2,D=F,C=this.data[0];if(!E){var G=F.cols*F.rows;while(--G>=0){C.data[G]=F.data[G]}}C=this.data[1];this.pyrdown(D,C);for(;H<this.levels;++H){D=C;C=this.data[H];this.pyrdown(D,C)}};return B})();var j=(function(){function B(C,G,E,F,D){if(typeof C==="undefined"){C=0}if(typeof G==="undefined"){G=0}if(typeof E==="undefined"){E=0}if(typeof F==="undefined"){F=0}if(typeof D==="undefined"){D=-1}this.x=C;this.y=G;this.score=E;this.level=F;this.angle=D}return B})();r.U8_t=m;r.S32_t=i;r.F32_t=h;r.S64_t=x;r.F64_t=w;r.C1_t=A;r.C2_t=n;r.C3_t=b;r.C4_t=p;r.U8C1_t=m|A;r.U8C3_t=m|b;r.U8C4_t=m|p;r.F32C1_t=h|A;r.F32C2_t=h|n;r.S32C1_t=i|A;r.S32C2_t=i|n;r.EPSILON=o;r.FLT_MIN=l;r.COLOR_RGBA2GRAY=a;r.COLOR_RGB2GRAY=f;r.COLOR_BGRA2GRAY=e;r.COLOR_BGR2GRAY=u;r.BOX_BLUR_NOSCALE=d;r.SVD_U_T=s;r.SVD_V_T=g;r.get_data_type=y;r.get_channel=k;r.get_data_type_size=c;r.data_t=v;r.matrix_t=q;r.pyramid_t=t;r.keypoint_t=j})(jsfeat);(function(b){var a=(function(){var f=(function(){function g(h){this.next=null;this.data=new jsfeat.data_t(h);this.size=this.data.size;this.buffer=this.data.buffer;this.u8=this.data.u8;this.i32=this.data.i32;this.f32=this.data.f32;this.f64=this.data.f64}g.prototype.resize=function(h){delete this.data;this.data=new jsfeat.data_t(h);this.size=this.data.size;this.buffer=this.data.buffer;this.u8=this.data.u8;this.i32=this.data.i32;this.f32=this.data.f32;this.f64=this.data.f64};return g})();var e,c;var d=0;return{allocate:function(g,k){e=c=new f(k);for(var h=0;h<g;++h){var j=new f(k);c=c.next=j;d++}},get_buffer:function(g){var h=e;e=e.next;d--;if(g>h.size){h.resize(g)}return h},put_buffer:function(g){c=c.next=g;d++}}})();b.cache=a;a.allocate(30,640*4)})(jsfeat);(function(b){var a=(function(){var c=new Int32Array(48*2);return{get_gaussian_kernel:function(p,m,e,l){var f=0,j=0,o=0,n=0,d=0;var g=0;var h=jsfeat.cache.get_buffer(p<<2);var k=h.f32;if((p&1)==1&&p<=7&&m<=0){switch(p>>1){case 0:k[0]=1;g=1;break;case 1:k[0]=0.25,k[1]=0.5,k[2]=0.25;g=0.25+0.5+0.25;break;case 2:k[0]=0.0625,k[1]=0.25,k[2]=0.375,k[3]=0.25,k[4]=0.0625;g=0.0625+0.25+0.375+0.25+0.0625;break;case 3:k[0]=0.03125,k[1]=0.109375,k[2]=0.21875,k[3]=0.28125,k[4]=0.21875,k[5]=0.109375,k[6]=0.03125;g=0.03125+0.109375+0.21875+0.28125+0.21875+0.109375+0.03125;break}}else{n=m>0?m:((p-1)*0.5-1)*0.3+0.8;d=-0.5/(n*n);for(;f<p;++f){j=f-(p-1)*0.5;o=Math.exp(d*j*j);k[f]=o;g+=o}}if(l&jsfeat.U8_t){g=256/g;for(f=0;f<p;++f){e[f]=(k[f]*g+0.5)|0}}else{g=1/g;for(f=0;f<p;++f){e[f]=k[f]*g}}jsfeat.cache.put_buffer(h)},perspective_4point_transform:function(x,B,r,w,g,A,q,v,f,z,p,u,e,y,o,t,d){var Y=B;var X=z;var W=q;var V=Y*X*W;var U=o;var T=Y*U;var S=X*T;var R=p;var n=Y*R;var m=A;var k=r;var j=y;var i=k*j;var h=i*m;var ax=j*m*R;var aw=j*W;var aq=j*R;var ao=X*W;var am=U*X;var aj=U*m;var ag=R*m;var Q=1/(aw-aq-ao+am-aj+ag);var O=Y*j;var N=k*m;var M=W*Y;var L=U*M;var K=k*X;var I=i*R;var G=k*R*m;var D=W*U*X;var C=U*k;var av=-(S-V+n*m-m*T-i*X+h-ax+aw*X)*Q;var au=(V-S-O*W+O*R+h-X*N+aj*X-ax)*Q;var ar=Y;var ap=(-R*T+L+K*W-i*W+I-G+aj*R-D)*Q;var an=(-L+M*R-C*X+I-G+C*m+D-aw*R)*Q;var al=k;var ai=(-n+M+K-N+aq-aw-am+aj)*Q;var af=(-T+n+i-K+aj-ag-aw+ao)*Q;Y=w;X=u;W=f;V=Y*X*W;U=d;T=Y*U;S=X*T;R=e;n=Y*R;m=v;k=g;j=t;i=k*j;h=i*m;ax=j*m*R;aw=j*W;aq=j*R;ao=X*W;am=U*X;aj=U*m;ag=R*m;Q=1/(aw-aq-ao+am-aj+ag);O=Y*j;N=k*m;M=W*Y;L=U*M;K=k*X;I=i*R;G=k*R*m;D=W*U*X;C=U*k;var ak=-(S-V+n*m-m*T-i*X+h-ax+aw*X)*Q;var ah=(V-S-O*W+O*R+h-X*N+aj*X-ax)*Q;var ae=Y;var ad=(-R*T+L+K*W-i*W+I-G+aj*R-D)*Q;var ac=(-L+M*R-C*X+I-G+C*m+D-aw*R)*Q;var ab=k;var aa=(-n+M+K-N+aq-aw-am+aj)*Q;var Z=(-T+n+i-K+aj-ag-aw+ao)*Q;X=an-af*al;W=av*an;V=av*al;T=ap*au;S=ar*ap;n=au*ai;var l=ar*ai;j=1/(W-V*af-T+S*af+n*al-l*an);h=-ap+al*ai;var at=-ap*af+an*ai;ag=-au+ar*af;var P=av-l;N=av*af-n;M=-au*al+ar*an;var J=V-S;var H=W-T;G=X*j;var F=ag*j;var E=M*j;var s=x.data;s[0]=ak*G+ah*(h*j)-ae*(at*j);s[1]=ak*F+ah*(P*j)-ae*(N*j);s[2]=-ak*E-ah*(J*j)+ae*(H*j);s[3]=ad*G+ac*(h*j)-ab*(at*j);s[4]=ad*F+ac*(P*j)-ab*(N*j);s[5]=-ad*E-ac*(J*j)+ab*(H*j);s[6]=aa*G+Z*(h*j)-at*j;s[7]=aa*F+Z*(P*j)-N*j;s[8]=-aa*E-Z*(J*j)+H*j},qsort:function(o,J,s,u){var D=7;var v,r,q,p;var C=0,j=0,G=0,B=0,z=0,A=0,e=0,y=0,E=0;var x=0,w=0,h=0,g=0,l=0,I=0,H=0,F=0,f=0;var k=c;if((s-J+1)<=1){return}k[0]=J;k[1]=s;while(C>=0){j=k[C<<1];G=k[(C<<1)+1];C--;for(;;){z=(G-j)+1;if(z<=D){for(e=j+1;e<=G;e++){for(y=e;y>j&&u(o[y],o[y-1]);y--){v=o[y];o[y]=o[y-1];o[y-1]=v}}break}else{f=0;x=j;h=G;l=j+(z>>1);if(z>40){E=z>>3;I=j,H=j+E,F=j+(E<<1);r=o[I],q=o[H],p=o[F];j=u(r,q)?(u(q,p)?H:(u(r,p)?F:I)):(u(p,q)?H:(u(r,p)?I:F));I=l-E,H=l,F=l+E;r=o[I],q=o[H],p=o[F];l=u(r,q)?(u(q,p)?H:(u(r,p)?F:I)):(u(p,q)?H:(u(r,p)?I:F));I=G-(E<<1),H=G-E,F=G;r=o[I],q=o[H],p=o[F];G=u(r,q)?(u(q,p)?H:(u(r,p)?F:I)):(u(p,q)?H:(u(r,p)?I:F))}I=j,H=l,F=G;r=o[I],q=o[H],p=o[F];l=u(r,q)?(u(q,p)?H:(u(r,p)?F:I)):(u(p,q)?H:(u(r,p)?I:F));if(l!=x){v=o[l];o[l]=o[x];o[x]=v;l=x}j=w=x+1;G=g=h;r=o[l];for(;;){while(j<=G&&!u(r,o[j])){if(!u(o[j],r)){if(j>w){v=o[w];o[w]=o[j];o[j]=v}f=1;w++}j++}while(j<=G&&!u(o[G],r)){if(!u(r,o[G])){if(G<g){v=o[g];o[g]=o[G];o[G]=v}f=1;g--}G--}if(j>G){break}v=o[j];o[j]=o[G];o[G]=v;f=1;j++;G--}if(f==0){j=x,G=h;for(e=j+1;e<=G;e++){for(y=e;y>j&&u(o[y],o[y-1]);y--){v=o[y];o[y]=o[y-1];o[y-1]=v}}break}z=Math.min((w-x),(j-w));A=(j-z)|0;for(B=0;B<z;++B,++A){v=o[x+B];o[x+B]=o[A];o[A]=v}z=Math.min((h-g),(g-G));A=(h-z+1)|0;for(B=0;B<z;++B,++A){v=o[j+B];o[j+B]=o[A];o[A]=v}z=(j-w);A=(g-G);if(z>1){if(A>1){if(z>A){++C;k[C<<1]=x;k[(C<<1)+1]=x+z-1;j=h-A+1,G=h}else{++C;k[C<<1]=h-A+1;k[(C<<1)+1]=h;j=x,G=x+z-1}}else{j=x,G=x+z-1}}else{if(A>1){j=h-A+1,G=h}else{break}}}}}},median:function(k,d,i){var e;var f=0,j=0,g=0,h=(d+i)>>1;for(;;){if(i<=d){return k[h]}if(i==(d+1)){if(k[d]>k[i]){e=k[d];k[d]=k[i];k[i]=e}return k[h]}f=((d+i)>>1);if(k[f]>k[i]){e=k[f];k[f]=k[i];k[i]=e}if(k[d]>k[i]){e=k[d];k[d]=k[i];k[i]=e}if(k[f]>k[d]){e=k[f];k[f]=k[d];k[d]=e}j=(d+1);e=k[f];k[f]=k[j];k[j]=e;g=i;for(;;){do{++j}while(k[d]>k[j]);do{--g}while(k[g]>k[d]);if(g<j){break}e=k[j];k[j]=k[g];k[g]=e}e=k[d];k[d]=k[g];k[g]=e;if(g<=h){d=j}else{if(g>=h){i=(g-1)}}}return 0}}})();b.math=a})(jsfeat);(function(b){var a=(function(){return{identity:function(j,g){if(typeof g==="undefined"){g=1}var i=j.data;var f=j.rows,h=j.cols,e=(h+1)|0;var c=f*h;var d=c;while(--c>=0){i[c]=0}c=d;d=0;while(d<c){i[d]=g;d=d+e}},transpose:function(f,d){var l=0,h=0,k=d.rows,c=d.cols;var n=0,e=0,m=0;var o=d.data,g=f.data;for(;l<k;e+=1,n+=c,l++){m=e;for(h=0;h<c;m+=k,h++){g[m]=o[n+h]}}},multiply:function(l,n,m){var u=0,s=0,o=0;var r=0,t=0,q=0,w=0,g=0;var f=n.cols,e=n.rows,p=m.cols;var v=n.data,d=m.data,h=l.data;var c=0;for(;u<e;r+=f,u++){for(w=0,s=0;s<p;g++,w++,s++){q=w;t=r;c=0;for(o=0;o<f;t++,q+=p,o++){c+=v[t]*d[q]}h[g]=c}}},multiply_ABt:function(c,g,d){var p=0,n=0,m=0;var r=0,l=0,f=0,u=0;var e=g.cols,o=g.rows,q=d.rows;var v=g.data,t=d.data,h=c.data;var s=0;for(;p<o;r+=e,p++){for(f=0,n=0;n<q;u++,n++){l=r;s=0;for(m=0;m<e;l++,f++,m++){s+=v[l]*t[f]}h[u]=s}}},multiply_AtB:function(l,n,m){var u=0,s=0,o=0;var r=0,t=0,q=0,w=0,g=0;var f=n.cols,e=n.rows,p=m.cols;var v=n.data,d=m.data,h=l.data;var c=0;for(;u<f;r++,u++){for(w=0,s=0;s<p;g++,w++,s++){q=w;t=r;c=0;for(o=0;o<e;t+=f,q+=p,o++){c+=v[t]*d[q]}h[g]=c}}},multiply_AAt:function(d,h){var q=0,o=0,n=0;var c=0,r=0,m=0,g=0,e=0,u=0;var f=h.cols,p=h.rows;var t=h.data,l=d.data;var s=0;for(;q<p;c+=p+1,r=m,q++){e=c;u=c;g=r;for(o=q;o<p;e++,u+=p,o++){m=r;s=0;for(n=0;n<f;n++){s+=t[m++]*t[g++]}l[e]=s;l[u]=s}}},multiply_AtA:function(c,g){var r=0,p=0,n=0;var s=0,m=0,f=0,o=0,d=0,l=0;var e=g.cols,q=g.rows;var u=g.data,h=c.data;var t=0;for(;r<e;o+=e,r++){s=r;l=o+r;d=l;for(p=r;p<e;d++,l+=e,p++){m=s;f=p;t=0;for(n=0;n<q;m+=e,f+=e,n++){t+=u[m]*u[f]}h[d]=t;h[l]=t}}},identity_3x3:function(e,d){if(typeof d==="undefined"){d=1}var c=e.data;c[0]=c[4]=c[8]=d;c[1]=c[2]=c[3]=0;c[5]=c[6]=c[7]=0},invert_3x3:function(s,e){var o=s.data,h=e.data;var n=o[4];var m=o[8];var l=o[5];var k=o[7];var j=o[0];var i=j*n;var v=j*l;var u=o[3];var t=o[1];var r=u*t;var q=o[2];var p=u*q;var g=o[6];var f=g*t;var d=g*q;var c=1/(i*m-v*k-r*m+p*k+f*l-d*n);h[0]=(n*m-l*k)*c;h[1]=-(t*m-q*k)*c;h[2]=-(-t*l+q*n)*c;h[3]=-(u*m-l*g)*c;h[4]=(j*m-d)*c;h[5]=-(v-p)*c;h[6]=-(-u*k+n*g)*c;h[7]=-(j*k-f)*c;h[8]=(i-r)*c},multiply_3x3:function(r,v,t){var y=r.data,z=v.data,l=t.data;var x=z[0],w=z[1],u=z[2];var s=z[3],q=z[4],p=z[5];var o=z[6],n=z[7],m=z[8];var k=l[0],j=l[1],i=l[2];var h=l[3],g=l[4],f=l[5];var e=l[6],d=l[7],c=l[8];y[0]=x*k+w*h+u*e;y[1]=x*j+w*g+u*d;y[2]=x*i+w*f+u*c;y[3]=s*k+q*h+p*e;y[4]=s*j+q*g+p*d;y[5]=s*i+q*f+p*c;y[6]=o*k+n*h+m*e;y[7]=o*j+n*g+m*d;y[8]=o*i+n*f+m*c},mat3x3_determinant:function(d){var c=d.data;return c[0]*c[4]*c[8]-c[0]*c[5]*c[7]-c[3]*c[1]*c[8]+c[3]*c[2]*c[7]+c[6]*c[1]*c[5]-c[6]*c[2]*c[4]},determinant_3x3:function(h,g,f,e,d,c,k,j,i){return h*d*i-h*c*j-e*g*i+e*f*j+k*g*c-k*f*d}}})();b.matmath=a})(jsfeat);(function(b){var a=(function(){var f=function(g,j,i,h){h=g[j];g[j]=g[i];g[i]=h};var d=function(h,g){h=Math.abs(h);g=Math.abs(g);if(h>g){g/=h;return h*Math.sqrt(1+g*g)}if(g>0){h/=g;return g*Math.sqrt(1+h*h)}return 0};var c=function(H,o,q,r,h,I){var C=jsfeat.EPSILON;var N=0,M=0,L=0,J=0,K=0,D=0,R=0,G=0;var u=0,v=I*I*30;var E=0,U=0,F=0,x=0,z=0,B=0,Q=0,T=0,w=0;var P=jsfeat.cache.get_buffer(I<<2);var S=jsfeat.cache.get_buffer(I<<2);var O=P.i32;var g=S.i32;if(r){for(;N<I;N++){L=N*h;for(M=0;M<I;M++){r[L+M]=0}r[L+N]=1}}for(L=0;L<I;L++){q[L]=H[(o+1)*L];if(L<I-1){for(J=L+1,E=Math.abs(H[o*L+J]),N=L+2;N<I;N++){U=Math.abs(H[o*L+N]);if(E<U){E=U,J=N}}O[L]=J}if(L>0){for(J=0,E=Math.abs(H[L]),N=1;N<L;N++){U=Math.abs(H[o*N+L]);if(E<U){E=U,J=N}}g[L]=J}}if(I>1){for(;u<v;u++){for(L=0,E=Math.abs(H[O[0]]),N=1;N<I-1;N++){U=Math.abs(H[o*N+O[N]]);if(E<U){E=U,L=N}}K=O[L];for(N=1;N<I;N++){U=Math.abs(H[o*g[N]+N]);if(E<U){E=U,L=g[N],K=N}}F=H[o*L+K];if(Math.abs(F)<=C){break}x=(q[K]-q[L])*0.5;z=Math.abs(x)+d(F,x);B=d(F,z);Q=z/B;B=F/B;z=(F/z)*F;if(x<0){B=-B,z=-z}H[o*L+K]=0;q[L]-=z;q[K]+=z;for(N=0;N<L;N++){R=(o*N+L);G=(o*N+K);T=H[R];w=H[G];H[R]=T*Q-w*B;H[G]=T*B+w*Q}for(N=(L+1);N<K;N++){R=(o*L+N);G=(o*N+K);T=H[R];w=H[G];H[R]=T*Q-w*B;H[G]=T*B+w*Q}N=K+1;R=(o*L+N);G=(o*K+N);for(;N<I;N++,R++,G++){T=H[R];w=H[G];H[R]=T*Q-w*B;H[G]=T*B+w*Q}if(r){R=h*L;G=h*K;for(N=0;N<I;N++,R++,G++){T=r[R];w=r[G];r[R]=T*Q-w*B;r[G]=T*B+w*Q}}for(M=0;M<2;M++){D=M==0?L:K;if(D<I-1){for(J=D+1,E=Math.abs(H[o*D+J]),N=D+2;N<I;N++){U=Math.abs(H[o*D+N]);if(E<U){E=U,J=N}}O[D]=J}if(D>0){for(J=0,E=Math.abs(H[D]),N=1;N<D;N++){U=Math.abs(H[o*N+D]);if(E<U){E=U,J=N}}g[D]=J}}}}for(L=0;L<I-1;L++){J=L;for(N=L+1;N<I;N++){if(q[J]<q[N]){J=N}}if(L!=J){f(q,J,L,E);if(r){for(N=0;N<I;N++){f(r,h*J+N,h*L+N,E)}}}}jsfeat.cache.put_buffer(P);jsfeat.cache.put_buffer(S)};var e=function(D,l,h,M,v,T,S,E){var C=jsfeat.EPSILON*2;var q=jsfeat.FLT_MIN;var X=0,V=0,U=0,A=0,u=Math.max(T,30);var K=0,J=0,R=0,Q=0,F=0;var Y=0,O=0,N=0;var H=0,G=0,x=0,I=0,w=0,L=0,aa=0,P=0,Z=0;var z=4660;var B=0,y=0,o=0;var r=jsfeat.cache.get_buffer(S<<3);var g=r.f64;for(;X<S;X++){for(U=0,x=0;U<T;U++){N=D[X*l+U];x+=N*N}g[X]=x;if(M){for(U=0;U<S;U++){M[X*v+U]=0}M[X*v+X]=1}}for(;A<u;A++){F=0;for(X=0;X<S-1;X++){for(V=X+1;V<S;V++){K=(X*l)|0,J=(V*l)|0;aa=g[X],P=0,Z=g[V];U=2;P+=D[K]*D[J];P+=D[K+1]*D[J+1];for(;U<T;U++){P+=D[K+U]*D[J+U]}if(Math.abs(P)<=C*Math.sqrt(aa*Z)){continue}P*=2;I=aa-Z,w=d(P,I);if(I<0){L=(w-I)*0.5;O=Math.sqrt(L/w);Y=(P/(w*O*2))}else{Y=Math.sqrt((w+I)/(w*2));O=(P/(w*Y*2))}aa=0,Z=0;U=2;H=Y*D[K]+O*D[J];G=-O*D[K]+Y*D[J];D[K]=H;D[J]=G;aa+=H*H;Z+=G*G;H=Y*D[K+1]+O*D[J+1];G=-O*D[K+1]+Y*D[J+1];D[K+1]=H;D[J+1]=G;aa+=H*H;Z+=G*G;for(;U<T;U++){H=Y*D[K+U]+O*D[J+U];G=-O*D[K+U]+Y*D[J+U];D[K+U]=H;D[J+U]=G;aa+=H*H;Z+=G*G}g[X]=aa;g[V]=Z;F=1;if(M){R=(X*v)|0,Q=(V*v)|0;U=2;H=Y*M[R]+O*M[Q];G=-O*M[R]+Y*M[Q];M[R]=H;M[Q]=G;H=Y*M[R+1]+O*M[Q+1];G=-O*M[R+1]+Y*M[Q+1];M[R+1]=H;M[Q+1]=G;for(;U<S;U++){H=Y*M[R+U]+O*M[Q+U];G=-O*M[R+U]+Y*M[Q+U];M[R+U]=H;M[Q+U]=G}}}}if(F==0){break}}for(X=0;X<S;X++){for(U=0,x=0;U<T;U++){N=D[X*l+U];x+=N*N}g[X]=Math.sqrt(x)}for(X=0;X<S-1;X++){V=X;for(U=X+1;U<S;U++){if(g[V]<g[U]){V=U}}if(X!=V){f(g,X,V,x);if(M){for(U=0;U<T;U++){f(D,X*l+U,V*l+U,N)}for(U=0;U<S;U++){f(M,X*v+U,V*v+U,N)}}}}for(X=0;X<S;X++){h[X]=g[X]}if(!M){jsfeat.cache.put_buffer(r);return}for(X=0;X<E;X++){x=X<S?g[X]:0;while(x<=q){y=(1/T);for(U=0;U<T;U++){z=(z*214013+2531011);B=(((z>>16)&32767)&256)!=0?y:-y;D[X*l+U]=B}for(A=0;A<2;A++){for(V=0;V<X;V++){x=0;for(U=0;U<T;U++){x+=D[X*l+U]*D[V*l+U]}o=0;for(U=0;U<T;U++){N=(D[X*l+U]-x*D[V*l+U]);D[X*l+U]=N;o+=Math.abs(N)}o=o?1/o:0;for(U=0;U<T;U++){D[X*l+U]*=o}}}x=0;for(U=0;U<T;U++){N=D[X*l+U];x+=N*N}x=Math.sqrt(x)}O=(1/x);for(U=0;U<T;U++){D[X*l+U]*=O}}jsfeat.cache.put_buffer(r)};return{lu_solve:function(l,g){var q=0,o=0,n=0,h=1,v=l.cols;var w=l.data,r=g.data;var x,m,u,y;for(q=0;q<v;q++){n=q;for(o=q+1;o<v;o++){if(Math.abs(w[o*v+q])>Math.abs(w[n*v+q])){n=o}}if(Math.abs(w[n*v+q])<jsfeat.EPSILON){return 0}if(n!=q){for(o=q;o<v;o++){f(w,q*v+o,n*v+o,x)}f(r,q,n,x);h=-h}u=-1/w[q*v+q];for(o=q+1;o<v;o++){m=w[o*v+q]*u;for(n=q+1;n<v;n++){w[o*v+n]+=m*w[q*v+n]}r[o]+=m*r[q]}w[q*v+q]=-u}for(q=v-1;q>=0;q--){y=r[q];for(n=q+1;n<v;n++){y-=w[q*v+n]*r[n]}r[q]=y*w[q*v+q]}return 1},cholesky_solve:function(h,g){var l=0,v=0,r=0,s=0,n=0,p=0,o=0;var u=h.cols;var t=h.data,q=g.data;var k,m;for(l=0;l<u;l++){m=1;s=(l*u);n=s;for(v=l;v<u;v++){k=t[(n+l)];for(r=0;r<l;r++){k-=t[(r*u+l)]*t[(n+r)]}if(v==l){t[(n+l)]=k;if(k==0){return 0}m=1/k}else{t[(s+v)]=k;t[(n+l)]=k*m}n=(n+u)}}s=0;for(p=0;p<u;p++){k=q[p];for(o=0;o<p;o++){k-=t[(s+o)]*q[o]}q[p]=k;s=(s+u)}s=0;for(p=0;p<u;p++){q[p]/=t[(s+p)];s=(s+u)}p=(u-1);for(;p>=0;p--){k=q[p];o=(p+1);s=(o*u);for(;o<u;o++){k-=t[(s+p)]*q[o];s=(s+u)}q[p]=k}return 1},svd_decompose:function(t,k,p,l,o){if(typeof o==="undefined"){o=0}var r=0,z=0,x=0,g=t.rows,D=t.cols,w=g,v=D;var s=t.type|jsfeat.C1_t;if(w<v){r=1;z=w;w=v;v=z}var q=jsfeat.cache.get_buffer((w*w)<<3);var h=jsfeat.cache.get_buffer(v<<3);var C=jsfeat.cache.get_buffer((v*v)<<3);var u=new jsfeat.matrix_t(w,w,s,q.data);var B=new jsfeat.matrix_t(1,v,s,h.data);var y=new jsfeat.matrix_t(v,v,s,C.data);if(r==0){jsfeat.matmath.transpose(u,t)}else{for(z=0;z<D*g;z++){u.data[z]=t.data[z]}for(;z<v*w;z++){u.data[z]=0}}e(u.data,w,B.data,y.data,v,w,v,w);if(k){for(z=0;z<v;z++){k.data[z]=B.data[z]}for(;z<D;z++){k.data[z]=0}}if(r==0){if(p&&(o&jsfeat.SVD_U_T)){z=w*w;while(--z>=0){p.data[z]=u.data[z]}}else{if(p){jsfeat.matmath.transpose(p,u)}}if(l&&(o&jsfeat.SVD_V_T)){z=v*v;while(--z>=0){l.data[z]=y.data[z]}}else{if(l){jsfeat.matmath.transpose(l,y)}}}else{if(p&&(o&jsfeat.SVD_U_T)){z=v*v;while(--z>=0){p.data[z]=y.data[z]}}else{if(p){jsfeat.matmath.transpose(p,y)}}if(l&&(o&jsfeat.SVD_V_T)){z=w*w;while(--z>=0){l.data[z]=u.data[z]}}else{if(l){jsfeat.matmath.transpose(l,u)}}}jsfeat.cache.put_buffer(q);jsfeat.cache.put_buffer(h);jsfeat.cache.put_buffer(C)},svd_solve:function(v,l,s){var E=0,C=0,z=0;var w=0,u=0;var o=v.rows,p=v.cols;var h=0,I=0,x=0;var r=v.type|jsfeat.C1_t;var F=jsfeat.cache.get_buffer((o*o)<<3);var m=jsfeat.cache.get_buffer(p<<3);var H=jsfeat.cache.get_buffer((p*p)<<3);var t=new jsfeat.matrix_t(o,o,r,F.data);var G=new jsfeat.matrix_t(1,p,r,m.data);var D=new jsfeat.matrix_t(p,p,r,H.data);var n=s.data,y=t.data,q=G.data,g=D.data;this.svd_decompose(v,G,t,D,0);x=jsfeat.EPSILON*q[0]*p;for(;E<p;E++,u+=p){I=0;for(C=0;C<p;C++){if(q[C]>x){for(z=0,h=0,w=0;z<o;z++,w+=p){h+=y[w+C]*n[z]}I+=h*g[u+C]/q[C]}}l.data[E]=I}jsfeat.cache.put_buffer(F);jsfeat.cache.put_buffer(m);jsfeat.cache.put_buffer(H)},svd_invert:function(E,t){var C=0,z=0,y=0;var v=0,s=0,h=0;var n=t.rows,o=t.cols;var l=0,w=0;var q=t.type|jsfeat.C1_t;var D=jsfeat.cache.get_buffer((n*n)<<3);var m=jsfeat.cache.get_buffer(o<<3);var G=jsfeat.cache.get_buffer((o*o)<<3);var u=new jsfeat.matrix_t(n,n,q,D.data);var F=new jsfeat.matrix_t(1,o,q,m.data);var B=new jsfeat.matrix_t(o,o,q,G.data);var r=E.data,x=u.data,p=F.data,g=B.data;this.svd_decompose(t,F,u,B,0);w=jsfeat.EPSILON*p[0]*o;for(;C<o;C++,s+=o){for(z=0,v=0;z<n;z++,h++){for(y=0,l=0;y<o;y++,v++){if(p[y]>w){l+=g[s+y]*x[v]/p[y]}}r[h]=l}}jsfeat.cache.put_buffer(D);jsfeat.cache.put_buffer(m);jsfeat.cache.put_buffer(G)},eigenVV:function(j,p,r){var k=j.cols,m=k*k;var g=j.type|jsfeat.C1_t;var o=jsfeat.cache.get_buffer((k*k)<<3);var h=jsfeat.cache.get_buffer(k<<3);var l=new jsfeat.matrix_t(k,k,g,o.data);var q=new jsfeat.matrix_t(1,k,g,h.data);while(--m>=0){l.data[m]=j.data[m]}c(l.data,k,q.data,p?p.data:null,k,k);if(r){while(--k>=0){r.data[k]=q.data[k]}}jsfeat.cache.put_buffer(o);jsfeat.cache.put_buffer(h)}}})();b.linalg=a})(jsfeat);(function(a){var c=(function(){var m=function(p){return p*p};var e=function(z,A,x,w,u){var t=0;var y=0,s=0,q=0,C=0;var v=0,r=0,p=0,B=0;var E=0,D=0;for(;t<u;++t){y+=z[t].x;s+=z[t].y;v+=A[t].x;r+=A[t].y}y/=u;s/=u;v/=u;r/=u;for(t=0;t<u;++t){E=z[t].x-y;D=z[t].y-s;q+=Math.sqrt(E*E+D*D);E=A[t].x-v;D=A[t].y-r;p+=Math.sqrt(E*E+D*D)}q/=u;p/=u;C=Math.SQRT2/q;B=Math.SQRT2/p;x[0]=x[4]=C;x[2]=-y*C;x[5]=-s*C;x[1]=x[3]=x[6]=x[7]=0;x[8]=1;w[0]=w[4]=B;w[2]=-v*B;w[5]=-r*B;w[1]=w[3]=w[6]=w[7]=0;w[8]=1};var h=function(x,u){var q=0,p=0,r=(u-1)|0;var w=0,t=0,v=0,s=0;for(;q<r;++q){w=x[q].x-x[r].x;t=x[q].y-x[r].y;for(p=0;p<q;++p){v=x[p].x-x[r].x;s=x[p].y-x[r].y;if(Math.abs(v*t-s*w)<=jsfeat.EPSILON*(Math.abs(w)+Math.abs(t)+Math.abs(v)+Math.abs(s))){return true}}}return false};var k=new jsfeat.matrix_t(3,3,jsfeat.F32_t|jsfeat.C1_t);var i=new jsfeat.matrix_t(3,3,jsfeat.F32_t|jsfeat.C1_t);var o=new jsfeat.matrix_t(6,6,jsfeat.F32_t|jsfeat.C1_t);var n=new jsfeat.matrix_t(6,1,jsfeat.F32_t|jsfeat.C1_t);var j=(function(){function p(){}p.prototype.run=function(D,q,r,t){var G=0,F=0;var B=r.type|jsfeat.C1_t;var J=r.data,v=k.data,E=i.data;var x,w,A=0,z=0;e(D,q,v,E,t);var u=jsfeat.cache.get_buffer((2*t*6)<<3);var y=jsfeat.cache.get_buffer((2*t)<<3);var C=new jsfeat.matrix_t(6,2*t,B,u.data);var H=new jsfeat.matrix_t(1,2*t,B,y.data);var I=C.data,s=H.data;for(;G<t;++G){x=D[G];w=q[G];A=v[0]*x.x+v[1]*x.y+v[2];z=v[3]*x.x+v[4]*x.y+v[5];F=G*2*6;I[F]=A,I[F+1]=z,I[F+2]=1,I[F+3]=0,I[F+4]=0,I[F+5]=0;F+=6;I[F]=0,I[F+1]=0,I[F+2]=0,I[F+3]=A,I[F+4]=z,I[F+5]=1;s[G<<1]=E[0]*w.x+E[1]*w.y+E[2];s[(G<<1)+1]=E[3]*w.x+E[4]*w.y+E[5]}jsfeat.matmath.multiply_AtA(o,C);jsfeat.matmath.multiply_AtB(n,C,H);jsfeat.linalg.lu_solve(o,n);J[0]=n.data[0],J[1]=n.data[1],J[2]=n.data[2];J[3]=n.data[3],J[4]=n.data[4],J[5]=n.data[5];J[6]=0,J[7]=0,J[8]=1;jsfeat.matmath.invert_3x3(i,i);jsfeat.matmath.multiply_3x3(r,i,r);jsfeat.matmath.multiply_3x3(r,r,k);jsfeat.cache.put_buffer(u);jsfeat.cache.put_buffer(y);return 1};p.prototype.error=function(v,w,t,r,u){var s=0;var y,x;var q=t.data;for(;s<u;++s){y=v[s];x=w[s];r[s]=m(x.x-q[0]*y.x-q[1]*y.y-q[2])+m(x.y-q[3]*y.x-q[4]*y.y-q[5])}};p.prototype.check_subset=function(s,r,q){return true};return p})();var g=new jsfeat.matrix_t(9,9,jsfeat.F32_t|jsfeat.C1_t);var f=new jsfeat.matrix_t(9,9,jsfeat.F32_t|jsfeat.C1_t);var l=(function(){function p(){}p.prototype.run=function(I,r,v,C){var L=0,K=0;var O=v.data,D=k.data,J=i.data;var M=g.data,N=f.data;var H=0,G=0,s=0,q=0;var u=0,t=0,B=0,A=0,z=0,w=0,F=0,E=0;for(;L<C;++L){B+=r[L].x;A+=r[L].y;F+=I[L].x;E+=I[L].y}B/=C;A/=C;F/=C;E/=C;for(L=0;L<C;++L){u+=Math.abs(r[L].x-B);t+=Math.abs(r[L].y-A);z+=Math.abs(I[L].x-F);w+=Math.abs(I[L].y-E)}if(Math.abs(u)<jsfeat.EPSILON||Math.abs(t)<jsfeat.EPSILON||Math.abs(z)<jsfeat.EPSILON||Math.abs(w)<jsfeat.EPSILON){return 0}u=C/u;t=C/t;z=C/z;w=C/w;D[0]=z;D[1]=0;D[2]=-F*z;D[3]=0;D[4]=w;D[5]=-E*w;D[6]=0;D[7]=0;D[8]=1;J[0]=1/u;J[1]=0;J[2]=B;J[3]=0;J[4]=1/t;J[5]=A;J[6]=0;J[7]=0;J[8]=1;L=81;while(--L>=0){M[L]=0}for(L=0;L<C;++L){H=(r[L].x-B)*u;G=(r[L].y-A)*t;s=(I[L].x-F)*z;q=(I[L].y-E)*w;M[0]+=s*s;M[1]+=s*q;M[2]+=s;M[6]+=s*-H*s;M[7]+=s*-H*q;M[8]+=s*-H;M[10]+=q*q;M[11]+=q;M[15]+=q*-H*s;M[16]+=q*-H*q;M[17]+=q*-H;M[20]+=1;M[24]+=-H*s;M[25]+=-H*q;M[26]+=-H;M[30]+=s*s;M[31]+=s*q;M[32]+=s;M[33]+=s*-G*s;M[34]+=s*-G*q;M[35]+=s*-G;M[40]+=q*q;M[41]+=q;M[42]+=q*-G*s;M[43]+=q*-G*q;M[44]+=q*-G;M[50]+=1;M[51]+=-G*s;M[52]+=-G*q;M[53]+=-G;M[60]+=-H*s*-H*s+-G*s*-G*s;M[61]+=-H*s*-H*q+-G*s*-G*q;M[62]+=-H*s*-H+-G*s*-G;M[70]+=-H*q*-H*q+-G*q*-G*q;M[71]+=-H*q*-H+-G*q*-G;M[80]+=-H*-H+-G*-G}for(L=0;L<9;++L){for(K=0;K<L;++K){M[L*9+K]=M[K*9+L]}}jsfeat.linalg.eigenVV(g,f);O[0]=N[72],O[1]=N[73],O[2]=N[74];O[3]=N[75],O[4]=N[76],O[5]=N[77];O[6]=N[78],O[7]=N[79],O[8]=N[80];jsfeat.matmath.multiply_3x3(v,i,v);jsfeat.matmath.multiply_3x3(v,v,k);H=1/O[8];O[0]*=H;O[1]*=H;O[2]*=H;O[3]*=H;O[4]*=H;O[5]*=H;O[6]*=H;O[7]*=H;O[8]=1;return 1};p.prototype.error=function(w,x,u,r,v){var t=0;var z,y,s=0,B=0,A=0;var q=u.data;for(;t<v;++t){z=w[t];y=x[t];s=1/(q[6]*z.x+q[7]*z.y+1);B=(q[0]*z.x+q[1]*z.y+q[2])*s-y.x;A=(q[3]*z.x+q[4]*z.y+q[5])*s-y.y;r[t]=(B*B+A*A)}};p.prototype.check_subset=function(M,s,B){if(B==4){var N=0;var I=M[0],H=M[1],G=M[2],E=M[3];var A=s[0],y=s[1],w=s[2],u=s[3];var L=I.x,K=I.y,J=1;var V=H.x,U=H.y,T=1;var z=G.x,x=G.y,v=1;var t=A.x,r=A.y,q=1;var F=y.x,D=y.y,C=1;var Q=w.x,P=w.y,O=1;var S=jsfeat.matmath.determinant_3x3(L,K,J,V,U,T,z,x,v);var R=jsfeat.matmath.determinant_3x3(t,r,q,F,D,C,Q,P,O);if(S*R<0){N++}L=H.x,K=H.y;V=G.x,U=G.y;z=E.x,x=E.y;t=y.x,r=y.y;F=w.x,D=w.y;Q=u.x,P=u.y;S=jsfeat.matmath.determinant_3x3(L,K,J,V,U,T,z,x,v);R=jsfeat.matmath.determinant_3x3(t,r,q,F,D,C,Q,P,O);if(S*R<0){N++}L=I.x,K=I.y;V=G.x,U=G.y;z=E.x,x=E.y;t=A.x,r=A.y;F=w.x,D=w.y;Q=u.x,P=u.y;S=jsfeat.matmath.determinant_3x3(L,K,J,V,U,T,z,x,v);R=jsfeat.matmath.determinant_3x3(t,r,q,F,D,C,Q,P,O);if(S*R<0){N++}L=I.x,K=I.y;V=H.x,U=H.y;z=E.x,x=E.y;t=A.x,r=A.y;F=y.x,D=y.y;Q=u.x,P=u.y;S=jsfeat.matmath.determinant_3x3(L,K,J,V,U,T,z,x,v);R=jsfeat.matmath.determinant_3x3(t,r,q,F,D,C,Q,P,O);if(S*R<0){N++}if(N!=0&&N!=4){return false}}return true};return p})();return{affine2d:j,homography2d:l}})();var b=(function(){function e(h,i,f,g){if(typeof h==="undefined"){h=0}if(typeof i==="undefined"){i=0.5}if(typeof f==="undefined"){f=0.5}if(typeof g==="undefined"){g=0.99}this.size=h;this.thresh=i;this.eps=f;this.prob=g}e.prototype.update_iters=function(g,i){var h=Math.log(1-this.prob);var f=Math.log(1-Math.pow(1-g,this.size));return(f>=0||-h>=i*(-f)?i:Math.round(h/f))|0};return e})();var d=(function(){var e=function(l,q,r,p,t,m,g){var v=1000;var s=[];var n=0,k=0,u=0,h=0,o=false;for(;u<v;++u){n=0;for(;n<p&&u<v;){o=false;h=0;while(!o){o=true;h=s[n]=Math.floor(Math.random()*t)|0;for(k=0;k<n;++k){if(h==s[k]){o=false;break}}}m[n]=q[h];g[n]=r[h];if(!l.check_subset(m,g,n+1)){u++;continue}++n}break}return(n==p&&u<v)};var f=function(k,m,p,q,o,g,h,s){var j=0,l=0,n=0;var r=g*g;k.error(p,q,m,h,o);for(;l<o;++l){n=h[l]<=r;s[l]=n;j+=n}return j};return{ransac:function(E,m,x,i,l,j,y,g){if(typeof g==="undefined"){g=1000}if(l<E.size){return false}var v=E.size;var A=g,z=0;var q=false;var D=[];var C=[];var r=false;var G=j.cols,w=j.rows;var u=j.type|jsfeat.C1_t;var B=jsfeat.cache.get_buffer((G*w)<<3);var h=jsfeat.cache.get_buffer(l);var t=jsfeat.cache.get_buffer(l<<2);var o=new jsfeat.matrix_t(G,w,u,B.data);var s=new jsfeat.matrix_t(l,1,jsfeat.U8C1_t,h.data);var F=-1,p=0;var n=0;var k=t.f32;if(l==v){if(m.run(x,i,o,l)<=0){jsfeat.cache.put_buffer(B);jsfeat.cache.put_buffer(h);jsfeat.cache.put_buffer(t);return false}o.copy_to(j);if(y){while(--l>=0){y.data[l]=1}}jsfeat.cache.put_buffer(B);jsfeat.cache.put_buffer(h);jsfeat.cache.put_buffer(t);return true}for(;z<A;++z){r=e(m,x,i,v,l,D,C);if(!r){if(z==0){jsfeat.cache.put_buffer(B);jsfeat.cache.put_buffer(h);jsfeat.cache.put_buffer(t);return false}break}n=m.run(D,C,o,v);if(n<=0){continue}p=f(m,o,x,i,l,E.thresh,k,s.data);if(p>Math.max(F,v-1)){o.copy_to(j);F=p;if(y){s.copy_to(y)}A=E.update_iters((l-p)/l,A);q=true}}jsfeat.cache.put_buffer(B);jsfeat.cache.put_buffer(h);jsfeat.cache.put_buffer(t);return q},lmeds:function(H,n,z,i,l,j,B,g){if(typeof g==="undefined"){g=1000}if(l<H.size){return false}var w=H.size;var D=g,C=0;var r=false;var G=[];var F=[];var s=false;var I=j.cols,y=j.rows;var v=j.type|jsfeat.C1_t;var E=jsfeat.cache.get_buffer((I*y)<<3);var h=jsfeat.cache.get_buffer(l);var u=jsfeat.cache.get_buffer(l<<2);var p=new jsfeat.matrix_t(I,y,v,E.data);var t=new jsfeat.matrix_t(l,1,jsfeat.U8_t|jsfeat.C1_t,h.data);var q=0;var o=0;var k=u.f32;var A=1000000000,x=0,m=0;H.eps=0.45;D=H.update_iters(H.eps,D);if(l==w){if(n.run(z,i,p,l)<=0){jsfeat.cache.put_buffer(E);jsfeat.cache.put_buffer(h);jsfeat.cache.put_buffer(u);return false}p.copy_to(j);if(B){while(--l>=0){B.data[l]=1}}jsfeat.cache.put_buffer(E);jsfeat.cache.put_buffer(h);jsfeat.cache.put_buffer(u);return true}for(;C<D;++C){s=e(n,z,i,w,l,G,F);if(!s){if(C==0){jsfeat.cache.put_buffer(E);jsfeat.cache.put_buffer(h);jsfeat.cache.put_buffer(u);return false}break}o=n.run(G,F,p,w);if(o<=0){continue}n.error(z,i,p,k,l);m=jsfeat.math.median(k,0,l-1);if(m<A){A=m;p.copy_to(j);r=true}}if(r){x=2.5*1.4826*(1+5/(l-w))*Math.sqrt(A);x=Math.max(x,0.001);q=f(n,j,z,i,l,x,k,t.data);if(B){t.copy_to(B)}r=q>=w}jsfeat.cache.put_buffer(E);jsfeat.cache.put_buffer(h);jsfeat.cache.put_buffer(u);return r}}})();a.ransacParamsT=b;a.motion_model=c;a.motion_estimator=d})(jsfeat);(function(b){var a=(function(){var c=function(q,S,O,p){var r=0;var y=q.channel,v=q.cols,J=q.rows;var P=q.data,m=S.data;var I=v/O,H=J/p;var n=(I*H*65536)|0;var x=0,u=0,C=0,A=0,t=0,s=0,G=0,F=0,D=0,B=0;var Q=0,N=0,K=0,o=0,M=0,E=0;var l=jsfeat.cache.get_buffer((O*y)<<2);var g=jsfeat.cache.get_buffer((O*y)<<2);var R=jsfeat.cache.get_buffer((v*2*3)<<2);var L=l.i32;var j=g.i32;var z=R.i32;for(;x<O;x++){D=x*I,B=D+I;t=(D+1-0.000001)|0,s=B|0;t=Math.min(t,v-1);s=Math.min(s,v-1);if(t>D){z[F++]=(x*y)|0;z[F++]=((t-1)*y)|0;z[F++]=((t-D)*256)|0;r++}for(C=t;C<s;C++){r++;z[F++]=(x*y)|0;z[F++]=(C*y)|0;z[F++]=256}if(B-s>0.001){r++;z[F++]=(x*y)|0;z[F++]=(s*y)|0;z[F++]=((B-s)*256)|0}}for(x=0;x<O*y;x++){L[x]=j[x]=0}u=0;for(A=0;A<J;A++){Q=v*A;for(F=0;F<r;F++){K=z[F*3];t=z[F*3+1];o=z[F*3+2];for(G=0;G<y;G++){L[K+G]+=P[Q+t+G]*o}}if((u+1)*H<=A+1||A==J-1){M=(Math.max(A+1-(u+1)*H,0)*256)|0;E=256-M;N=O*u;if(M<=0){for(x=0;x<O*y;x++){m[N+x]=Math.min(Math.max((j[x]+L[x]*256)/n,0),255);j[x]=L[x]=0}}else{for(x=0;x<O*y;x++){m[N+x]=Math.min(Math.max((j[x]+L[x]*E)/n,0),255);j[x]=L[x]*M;L[x]=0}}u++}else{for(x=0;x<O*y;x++){j[x]+=L[x]*256;L[x]=0}}}jsfeat.cache.put_buffer(g);jsfeat.cache.put_buffer(l);jsfeat.cache.put_buffer(R)};var f=function(p,S,N,o){var q=0;var x=p.channel,u=p.cols,I=p.rows;var O=p.data,m=S.data;var H=u/N,G=I/o;var Q=1/(H*G);var v=0,t=0,B=0,z=0,s=0,r=0,F=0,E=0,C=0,A=0;var P=0,M=0,J=0,n=0,L=0,D=0;var l=jsfeat.cache.get_buffer((N*x)<<2);var g=jsfeat.cache.get_buffer((N*x)<<2);var R=jsfeat.cache.get_buffer((u*2*3)<<2);var K=l.f32;var j=g.f32;var y=R.f32;for(;v<N;v++){C=v*H,A=C+H;s=(C+1-0.000001)|0,r=A|0;s=Math.min(s,u-1);r=Math.min(r,u-1);if(s>C){q++;y[E++]=((s-1)*x)|0;y[E++]=(v*x)|0;y[E++]=(s-C)*Q}for(B=s;B<r;B++){q++;y[E++]=(B*x)|0;y[E++]=(v*x)|0;y[E++]=Q}if(A-r>0.001){q++;y[E++]=(r*x)|0;y[E++]=(v*x)|0;y[E++]=(A-r)*Q}}for(v=0;v<N*x;v++){K[v]=j[v]=0}t=0;for(z=0;z<I;z++){P=u*z;for(E=0;E<q;E++){s=y[E*3]|0;J=y[E*3+1]|0;n=y[E*3+2];for(F=0;F<x;F++){K[J+F]+=O[P+s+F]*n}}if((t+1)*G<=z+1||z==I-1){L=Math.max(z+1-(t+1)*G,0);D=1-L;M=N*t;if(Math.abs(L)<0.001){for(v=0;v<N*x;v++){m[M+v]=j[v]+K[v];j[v]=K[v]=0}}else{for(v=0;v<N*x;v++){m[M+v]=j[v]+K[v]*D;j[v]=K[v]*L;K[v]=0}}t++}else{for(v=0;v<N*x;v++){j[v]+=K[v];K[v]=0}}}jsfeat.cache.put_buffer(g);jsfeat.cache.put_buffer(l);jsfeat.cache.put_buffer(R)};var e=function(D,F,m,s,B,t,g,n){var z=0,y=0,x=0,A=0,u=0,l=0,G=0,E=0,C=0,v=t[0],r=0;var q=s<<1,p=s*3,o=s<<2;for(;z<B;++z){l=F[A];for(y=0;y<n;++y){D[y]=l}for(y=0;y<=s-2;y+=2){D[y+n]=F[A+y];D[y+n+1]=F[A+y+1]}for(;y<s;++y){D[y+n]=F[A+y]}l=F[A+s-1];for(y=s;y<n+s;++y){D[y+n]=l}for(y=0;y<=s-4;y+=4){l=D[y]*v,G=D[y+1]*v,E=D[y+2]*v,C=D[y+3]*v;for(x=1;x<g;++x){r=t[x];l+=D[x+y]*r;G+=D[x+y+1]*r;E+=D[x+y+2]*r;C+=D[x+y+3]*r}m[u+y]=Math.min(l>>8,255);m[u+y+1]=Math.min(G>>8,255);m[u+y+2]=Math.min(E>>8,255);m[u+y+3]=Math.min(C>>8,255)}for(;y<s;++y){l=D[y]*v;for(x=1;x<g;++x){l+=D[x+y]*t[x]}m[u+y]=Math.min(l>>8,255)}A+=s;u+=s}for(z=0;z<s;++z){l=m[z];for(y=0;y<n;++y){D[y]=l}x=z;for(y=0;y<=B-2;y+=2,x+=q){D[y+n]=m[x];D[y+n+1]=m[x+s]}for(;y<B;++y,x+=s){D[y+n]=m[x]}l=m[(B-1)*s+z];for(y=B;y<n+B;++y){D[y+n]=l}u=z;for(y=0;y<=B-4;y+=4,u+=o){l=D[y]*v,G=D[y+1]*v,E=D[y+2]*v,C=D[y+3]*v;for(x=1;x<g;++x){r=t[x];l+=D[x+y]*r;G+=D[x+y+1]*r;E+=D[x+y+2]*r;C+=D[x+y+3]*r}m[u]=Math.min(l>>8,255);m[u+s]=Math.min(G>>8,255);m[u+q]=Math.min(E>>8,255);m[u+p]=Math.min(C>>8,255)}for(;y<B;++y,u+=s){l=D[y]*v;for(x=1;x<g;++x){l+=D[x+y]*t[x]}m[u]=Math.min(l>>8,255)}}};var d=function(D,F,m,s,B,t,g,n){var z=0,y=0,x=0,A=0,u=0,l=0,G=0,E=0,C=0,v=t[0],r=0;var q=s<<1,p=s*3,o=s<<2;for(;z<B;++z){l=F[A];for(y=0;y<n;++y){D[y]=l}for(y=0;y<=s-2;y+=2){D[y+n]=F[A+y];D[y+n+1]=F[A+y+1]}for(;y<s;++y){D[y+n]=F[A+y]}l=F[A+s-1];for(y=s;y<n+s;++y){D[y+n]=l}for(y=0;y<=s-4;y+=4){l=D[y]*v,G=D[y+1]*v,E=D[y+2]*v,C=D[y+3]*v;for(x=1;x<g;++x){r=t[x];l+=D[x+y]*r;G+=D[x+y+1]*r;E+=D[x+y+2]*r;C+=D[x+y+3]*r}m[u+y]=l;m[u+y+1]=G;m[u+y+2]=E;m[u+y+3]=C}for(;y<s;++y){l=D[y]*v;for(x=1;x<g;++x){l+=D[x+y]*t[x]}m[u+y]=l}A+=s;u+=s}for(z=0;z<s;++z){l=m[z];for(y=0;y<n;++y){D[y]=l}x=z;for(y=0;y<=B-2;y+=2,x+=q){D[y+n]=m[x];D[y+n+1]=m[x+s]}for(;y<B;++y,x+=s){D[y+n]=m[x]}l=m[(B-1)*s+z];for(y=B;y<n+B;++y){D[y+n]=l}u=z;for(y=0;y<=B-4;y+=4,u+=o){l=D[y]*v,G=D[y+1]*v,E=D[y+2]*v,C=D[y+3]*v;for(x=1;x<g;++x){r=t[x];l+=D[x+y]*r;G+=D[x+y+1]*r;E+=D[x+y+2]*r;C+=D[x+y+3]*r}m[u]=l;m[u+s]=G;m[u+q]=E;m[u+p]=C}for(;y<B;++y,u+=s){l=D[y]*v;for(x=1;x<g;++x){l+=D[x+y]*t[x]}m[u]=l}}};return{grayscale:function(n,r,A,D,g){if(typeof g==="undefined"){g=jsfeat.COLOR_RGBA2GRAY}var q=0,p=0,z=0,v=0,m=0,u=0;var s=4899,B=9617,C=1868,o=4;if(g==jsfeat.COLOR_BGRA2GRAY||g==jsfeat.COLOR_BGR2GRAY){s=1868;C=4899}if(g==jsfeat.COLOR_RGB2GRAY||g==jsfeat.COLOR_BGR2GRAY){o=3}var l=o<<1,k=(o*3)|0;D.resize(r,A,1);var t=D.data;for(p=0;p<A;++p,v+=r,z+=r*o){for(q=0,m=z,u=v;q<=r-4;q+=4,m+=o<<2,u+=4){t[u]=(n[m]*s+n[m+1]*B+n[m+2]*C+8192)>>14;t[u+1]=(n[m+o]*s+n[m+o+1]*B+n[m+o+2]*C+8192)>>14;t[u+2]=(n[m+l]*s+n[m+l+1]*B+n[m+l+2]*C+8192)>>14;t[u+3]=(n[m+k]*s+n[m+k+1]*B+n[m+k+2]*C+8192)>>14}for(;q<r;++q,++u,m+=o){t[u]=(n[m]*s+n[m+1]*B+n[m+2]*C+8192)>>14}}},resample:function(l,m,i,k){var j=l.rows,g=l.cols;if(j>k&&g>i){m.resize(i,k,l.channel);if(l.type&jsfeat.U8_t&&m.type&jsfeat.U8_t&&j*g/(k*i)<256){c(l,m,i,k)}else{f(l,m,i,k)}}},box_blur_gray:function(r,J,n,l){if(typeof l==="undefined"){l=0}var z=r.cols,E=r.rows,s=E<<1,v=z<<1;var D=0,u=0,t=0,m=0;var B=((n<<1)+1)|0;var p=(n+1)|0,H=(p+1)|0;var I=l&jsfeat.BOX_BLUR_NOSCALE?1:(1/(B*B));var C=jsfeat.cache.get_buffer((z*E)<<2);var j=0,G=0,o=0,q=0,k=0;var F=C.i32;var g=r.data;var A=0;J.resize(z,E,r.channel);for(t=0;t<E;++t){G=t;j=p*g[o];for(D=(o+1)|0,m=(o+n)|0;D<=m;++D){j+=g[D]}q=(o+p)|0;k=o;A=g[k];for(u=0;u<n;++u,G+=E){F[G]=j;j+=g[q]-A;q++}for(;u<z-H;u+=2,G+=s){F[G]=j;j+=g[q]-g[k];F[G+E]=j;j+=g[q+1]-g[k+1];q+=2;k+=2}for(;u<z-p;++u,G+=E){F[G]=j;j+=g[q]-g[k];q++;k++}A=g[q-1];for(;u<z;++u,G+=E){F[G]=j;j+=A-g[k];k++}o+=z}o=0;g=J.data;if(I==1){for(t=0;t<z;++t){G=t;j=p*F[o];for(D=(o+1)|0,m=(o+n)|0;D<=m;++D){j+=F[D]}q=o+p;k=o;A=F[k];for(u=0;u<n;++u,G+=z){g[G]=j;j+=F[q]-A;q++}for(;u<E-H;u+=2,G+=v){g[G]=j;j+=F[q]-F[k];g[G+z]=j;j+=F[q+1]-F[k+1];q+=2;k+=2}for(;u<E-p;++u,G+=z){g[G]=j;j+=F[q]-F[k];q++;k++}A=F[q-1];for(;u<E;++u,G+=z){g[G]=j;j+=A-F[k];k++}o+=E}}else{for(t=0;t<z;++t){G=t;j=p*F[o];for(D=(o+1)|0,m=(o+n)|0;D<=m;++D){j+=F[D]}q=o+p;k=o;A=F[k];for(u=0;u<n;++u,G+=z){g[G]=j*I;j+=F[q]-A;q++}for(;u<E-H;u+=2,G+=v){g[G]=j*I;j+=F[q]-F[k];g[G+z]=j*I;j+=F[q+1]-F[k+1];q+=2;k+=2}for(;u<E-p;++u,G+=z){g[G]=j*I;j+=F[q]-F[k];q++;k++}A=F[q-1];for(;u<E;++u,G+=z){g[G]=j*I;j+=A-F[k];k++}o+=E}}jsfeat.cache.put_buffer(C)},gaussian_blur:function(g,s,r,v){if(typeof v==="undefined"){v=0}if(typeof r==="undefined"){r=0}r=r==0?(Math.max(1,(4*v+1-1e-8))*2+1)|0:r;var x=r>>1;var t=g.cols,p=g.rows;var u=g.type,n=u&jsfeat.U8_t;s.resize(t,p,g.channel);var m=g.data,j=s.data;var k,i,q=(r+Math.max(p,t))|0;var l=jsfeat.cache.get_buffer(q<<2);var o=jsfeat.cache.get_buffer(r<<2);if(n){k=l.i32;i=o.i32}else{if(u&jsfeat.S32_t){k=l.i32;i=o.f32}else{k=l.f32;i=o.f32}}jsfeat.math.get_gaussian_kernel(r,v,i,u);if(n){e(k,m,j,t,p,i,r,x)}else{d(k,m,j,t,p,i,r,x)}jsfeat.cache.put_buffer(l);jsfeat.cache.put_buffer(o)},pyrdown:function(k,A,s,r){if(typeof s==="undefined"){s=0}if(typeof r==="undefined"){r=0}var q=k.cols,t=k.rows;var p=q>>1,l=t>>1;var B=p-(s<<1),u=l-(r<<1);var o=0,n=0,g=s+r*q,m=0,v=0,i=0;A.resize(p,l,k.channel);var z=k.data,j=A.data;for(n=0;n<u;++n){m=g;i=v;for(o=0;o<=B-2;o+=2,i+=2,m+=4){j[i]=(z[m]+z[m+1]+z[m+q]+z[m+q+1]+2)>>2;j[i+1]=(z[m+2]+z[m+3]+z[m+q+2]+z[m+q+3]+2)>>2}for(;o<B;++o,++i,m+=2){j[i]=(z[m]+z[m+1]+z[m+q]+z[m+q+1]+2)>>2}g+=q<<1;v+=p}},scharr_derivatives:function(j,G){var p=j.cols,s=j.rows;var H=p<<1,o=0,m=0,u=0,E,D,C,B,A,z;var v=0,t=0,r=0,i=0;var n,l;G.resize(p,s,2);var F=j.data,g=G.data;var k=jsfeat.cache.get_buffer((p+2)<<2);var q=jsfeat.cache.get_buffer((p+2)<<2);if(j.type&jsfeat.U8_t||j.type&jsfeat.S32_t){n=k.i32;l=q.i32}else{n=k.f32;l=q.f32}for(;m<s;++m,t+=p){v=((m>0?m-1:1)*p)|0;r=((m<s-1?m+1:s-2)*p)|0;i=(m*H)|0;for(o=0,u=1;o<=p-2;o+=2,u+=2){E=F[v+o],D=F[r+o];n[u]=((E+D)*3+(F[t+o])*10);l[u]=(D-E);E=F[v+o+1],D=F[r+o+1];n[u+1]=((E+D)*3+(F[t+o+1])*10);l[u+1]=(D-E)}for(;o<p;++o,++u){E=F[v+o],D=F[r+o];n[u]=((E+D)*3+(F[t+o])*10);l[u]=(D-E)}o=(p+1)|0;n[0]=n[1];n[o]=n[p];l[0]=l[1];l[o]=l[p];for(o=0;o<=p-4;o+=4){E=l[o+2],D=l[o+1],C=l[o+3],B=l[o+4],A=n[o+2],z=n[o+3];g[i++]=(A-n[o]);g[i++]=((E+l[o])*3+D*10);g[i++]=(z-n[o+1]);g[i++]=((C+D)*3+E*10);g[i++]=((n[o+4]-A));g[i++]=(((B+E)*3+C*10));g[i++]=((n[o+5]-z));g[i++]=(((l[o+5]+C)*3+B*10))}for(;o<p;++o){g[i++]=((n[o+2]-n[o]));g[i++]=(((l[o+2]+l[o])*3+l[o+1]*10))}}jsfeat.cache.put_buffer(k);jsfeat.cache.put_buffer(q)},sobel_derivatives:function(j,G){var p=j.cols,s=j.rows;var H=p<<1,o=0,m=0,u=0,E,D,C,B,A,z;var v=0,t=0,r=0,i=0;var n,l;G.resize(p,s,2);var F=j.data,g=G.data;var k=jsfeat.cache.get_buffer((p+2)<<2);var q=jsfeat.cache.get_buffer((p+2)<<2);if(j.type&jsfeat.U8_t||j.type&jsfeat.S32_t){n=k.i32;l=q.i32}else{n=k.f32;l=q.f32}for(;m<s;++m,t+=p){v=((m>0?m-1:1)*p)|0;r=((m<s-1?m+1:s-2)*p)|0;i=(m*H)|0;for(o=0,u=1;o<=p-2;o+=2,u+=2){E=F[v+o],D=F[r+o];n[u]=((E+D)+(F[t+o]*2));l[u]=(D-E);E=F[v+o+1],D=F[r+o+1];n[u+1]=((E+D)+(F[t+o+1]*2));l[u+1]=(D-E)}for(;o<p;++o,++u){E=F[v+o],D=F[r+o];n[u]=((E+D)+(F[t+o]*2));l[u]=(D-E)}o=(p+1)|0;n[0]=n[1];n[o]=n[p];l[0]=l[1];l[o]=l[p];for(o=0;o<=p-4;o+=4){E=l[o+2],D=l[o+1],C=l[o+3],B=l[o+4],A=n[o+2],z=n[o+3];g[i++]=(A-n[o]);g[i++]=(E+l[o]+D*2);g[i++]=(z-n[o+1]);g[i++]=(C+D+E*2);g[i++]=(n[o+4]-A);g[i++]=(B+E+C*2);g[i++]=(n[o+5]-z);g[i++]=(l[o+5]+C+B*2)}for(;o<p;++o){g[i++]=(n[o+2]-n[o]);g[i++]=(l[o+2]+l[o]+l[o+1]*2)}}jsfeat.cache.put_buffer(k);jsfeat.cache.put_buffer(q)},compute_integral_image:function(g,l,y,u){var t=g.cols|0,w=g.rows|0,o=g.data;var r=(t+1)|0;var B=0,z=0,h=0,x=0,q=0,n=0,A=0,m=0;if(l&&y){for(;q<r;++q){l[q]=0,y[q]=0}h=(r+1)|0,x=1;for(q=0,m=0;q<w;++q,++h,++x){B=z=0;for(n=0;n<=t-2;n+=2,m+=2,h+=2,x+=2){A=o[m];B+=A,z+=A*A;l[h]=l[x]+B;y[h]=y[x]+z;A=o[m+1];B+=A,z+=A*A;l[h+1]=l[x+1]+B;y[h+1]=y[x+1]+z}for(;n<t;++n,++m,++h,++x){A=o[m];B+=A,z+=A*A;l[h]=l[x]+B;y[h]=y[x]+z}}}else{if(l){for(;q<r;++q){l[q]=0}h=(r+1)|0,x=1;for(q=0,m=0;q<w;++q,++h,++x){B=0;for(n=0;n<=t-2;n+=2,m+=2,h+=2,x+=2){B+=o[m];l[h]=l[x]+B;B+=o[m+1];l[h+1]=l[x+1]+B}for(;n<t;++n,++m,++h,++x){B+=o[m];l[h]=l[x]+B}}}else{if(y){for(;q<r;++q){y[q]=0}h=(r+1)|0,x=1;for(q=0,m=0;q<w;++q,++h,++x){z=0;for(n=0;n<=t-2;n+=2,m+=2,h+=2,x+=2){A=o[m];z+=A*A;y[h]=y[x]+z;A=o[m+1];z+=A*A;y[h+1]=y[x+1]+z}for(;n<t;++n,++m,++h,++x){A=o[m];z+=A*A;y[h]=y[x]+z}}}}}if(u){for(q=0;q<r;++q){u[q]=0}h=(r+1)|0,x=0;for(q=0,m=0;q<w;++q,++h,++x){for(n=0;n<=t-2;n+=2,m+=2,h+=2,x+=2){u[h]=o[m]+u[x];u[h+1]=o[m+1]+u[x+1]}for(;n<t;++n,++m,++h,++x){u[h]=o[m]+u[x]}}h=(r+t)|0,x=t;for(q=0;q<w;++q,h+=r,x+=r){u[h]+=u[x]}for(n=t-1;n>0;--n){h=n+w*r,x=h-r;for(q=w;q>0;--q,h-=r,x-=r){u[h]+=u[x]+u[x+1]}}}},equalize_histogram:function(j,r){var s=j.cols,q=j.rows,o=j.data;r.resize(s,q,j.channel);var l=r.data,t=s*q;var p=0,n=0,k,g;var m=jsfeat.cache.get_buffer(256<<2);k=m.i32;for(;p<256;++p){k[p]=0}for(p=0;p<t;++p){++k[o[p]]}n=k[0];for(p=1;p<256;++p){n=k[p]+=n}g=255/t;for(p=0;p<t;++p){l[p]=(k[o[p]]*g+0.5)|0}jsfeat.cache.put_buffer(m)},canny:function(u,V,E,k){var C=u.cols,L=u.rows,S=u.data;V.resize(C,L,u.channel);var o=V.data;var K=0,H=0,q=0,A=C<<1,R=0,J=0,N=0,z=0,v=0,D=0;var g=0,U=0;var p=jsfeat.cache.get_buffer((L*A)<<2);var m=jsfeat.cache.get_buffer((3*(C+2))<<2);var n=jsfeat.cache.get_buffer(((L+2)*(C+2))<<2);var t=jsfeat.cache.get_buffer((L*C)<<2);var Q=m.i32;var T=n.i32;var r=t.i32;var G=p.i32;var l=new jsfeat.matrix_t(C,L,jsfeat.S32C2_t,p.data);var P=1,O=(C+2+1)|0,M=(2*(C+2)+1)|0,B=(C+2)|0,I=(B+1)|0,F=0;this.sobel_derivatives(u,l);if(E>k){K=E;E=k;k=K}K=(3*(C+2))|0;while(--K>=0){Q[K]=0}K=((L+2)*(C+2))|0;while(--K>=0){T[K]=0}for(;H<C;++H,q+=2){z=G[q],v=G[q+1];Q[O+H]=((z^(z>>31))-(z>>31))+((v^(v>>31))-(v>>31))}for(K=1;K<=L;++K,q+=A){if(K==L){H=M+C;while(--H>=M){Q[H]=0}}else{for(H=0;H<C;H++){z=G[q+(H<<1)],v=G[q+(H<<1)+1];Q[M+H]=((z^(z>>31))-(z>>31))+((v^(v>>31))-(v>>31))}}R=(q-A)|0;T[I-1]=0;J=0;for(H=0;H<C;++H,R+=2){N=Q[O+H];if(N>E){z=G[R];v=G[R+1];D=z^v;z=((z^(z>>31))-(z>>31))|0;v=((v^(v>>31))-(v>>31))|0;g=z*13573;U=g+((z+z)<<15);v<<=15;if(v<g){if(N>Q[O+H-1]&&N>=Q[O+H+1]){if(N>k&&!J&&T[I+H-B]!=2){T[I+H]=2;J=1;r[F++]=I+H}else{T[I+H]=1}continue}}else{if(v>U){if(N>Q[P+H]&&N>=Q[M+H]){if(N>k&&!J&&T[I+H-B]!=2){T[I+H]=2;J=1;r[F++]=I+H}else{T[I+H]=1}continue}}else{D=D<0?-1:1;if(N>Q[P+H-D]&&N>Q[M+H+D]){if(N>k&&!J&&T[I+H-B]!=2){T[I+H]=2;J=1;r[F++]=I+H}else{T[I+H]=1}continue}}}}T[I+H]=0;J=0}T[I+C]=0;I+=B;H=P;P=O;O=M;M=H}H=I-B-1;for(K=0;K<B;++K,++H){T[H]=0}while(F>0){I=r[--F];I-=B+1;if(T[I]==1){T[I]=2,r[F++]=I}I+=1;if(T[I]==1){T[I]=2,r[F++]=I}I+=1;if(T[I]==1){T[I]=2,r[F++]=I}I+=B;if(T[I]==1){T[I]=2,r[F++]=I}I-=2;if(T[I]==1){T[I]=2,r[F++]=I}I+=B;if(T[I]==1){T[I]=2,r[F++]=I}I+=1;if(T[I]==1){T[I]=2,r[F++]=I}I+=1;if(T[I]==1){T[I]=2,r[F++]=I}}I=B+1;P=0;for(K=0;K<L;++K,I+=B){for(H=0;H<C;++H){o[P++]=(T[I+H]==2)*255}}jsfeat.cache.put_buffer(p);jsfeat.cache.put_buffer(m);jsfeat.cache.put_buffer(n);jsfeat.cache.put_buffer(t)},warp_perspective:function(t,D,A,r){if(typeof r==="undefined"){r=0}var l=t.cols|0,v=t.rows|0,L=D.cols|0,j=D.rows|0;var H=t.data,q=D.data;var F=0,E=0,G=0,u=0,k=0,C=0,p=0,h=0,O=0,P=0,s=0,R=0,Q=0,N=0,M=0;var i=A.data;var o=i[0],n=i[1],m=i[2],K=i[3],J=i[4],I=i[5],B=i[6],z=i[7],w=i[8];for(var g=0;E<j;++E){h=n*E+m,O=J*E+I,P=z*E+w;for(F=0;F<L;++F,++g,h+=o,O+=K,P+=B){s=1/P;C=h*s,p=O*s;u=C|0,k=p|0;if(C>0&&p>0&&u<(l-1)&&k<(v-1)){R=Math.max(C-u,0);Q=Math.max(p-k,0);G=(l*k+u)|0;N=H[G]+R*(H[G+1]-H[G]);M=H[G+l]+R*(H[G+l+1]-H[G+l]);q[g]=N+Q*(M-N)}else{q[g]=r}}}},warp_affine:function(k,K,p,J){if(typeof J==="undefined"){J=0}var u=k.cols,z=k.rows,j=K.cols,v=K.rows;var E=k.data,i=K.data;var o=0,n=0,I=0,q=0,A=0,m=0,w=0,G=0,D=0,h=0,g=0;var l=p.data;var t=l[0],s=l[1],r=l[2],H=l[3],F=l[4],C=l[5];for(var B=0;n<v;++n){m=s*n+r;w=F*n+C;for(o=0;o<j;++o,++B,m+=t,w+=H){q=m|0;A=w|0;if(q>=0&&A>=0&&q<(u-1)&&A<(z-1)){G=m-q;D=w-A;I=u*A+q;h=E[I]+G*(E[I+1]-E[I]);g=E[I+u]+G*(E[I+u+1]-E[I+u]);i[B]=h+D*(g-h)}else{i[B]=J}}}},skindetector:function(o,p){var n,m,h,k;var l=o.width*o.height;while(l--){k=l*4;n=o.data[k];m=o.data[k+1];h=o.data[k+2];if((n>95)&&(m>40)&&(h>20)&&(n>m)&&(n>h)&&(n-Math.min(m,h)>15)&&(Math.abs(n-m)>15)){p[l]=255}else{p[l]=0}}}}})();b.imgproc=a})(jsfeat);(function(a){var b=(function(){var h=new Int32Array([0,3,1,3,2,2,3,1,3,0,3,-1,2,-2,1,-3,0,-3,-1,-3,-2,-2,-3,-1,-3,0,-3,1,-2,2,-1,3]);var f=new Uint8Array(512);var e=new Int32Array(25);var i=new Int32Array(25);var d=function(l,n,o){var j=0;var m=h;for(;j<o;++j){l[j]=m[j<<1]+m[(j<<1)+1]*n}for(;j<25;++j){l[j]=l[j-o]}},g=function(j,n,l,r,p){var q=25,o=0,w=j[n];var m=p,t=0,u=0,s=0;for(;o<q;++o){r[o]=w-j[n+l[o]]}for(o=0;o<16;o+=2){t=Math.min(r[o+1],r[o+2]);t=Math.min(t,r[o+3]);if(t<=m){continue}t=Math.min(t,r[o+4]);t=Math.min(t,r[o+5]);t=Math.min(t,r[o+6]);t=Math.min(t,r[o+7]);t=Math.min(t,r[o+8]);m=Math.max(m,Math.min(t,r[o]));m=Math.max(m,Math.min(t,r[o+9]))}u=-m;for(o=0;o<16;o+=2){s=Math.max(r[o+1],r[o+2]);s=Math.max(s,r[o+3]);s=Math.max(s,r[o+4]);s=Math.max(s,r[o+5]);if(s>=u){continue}s=Math.max(s,r[o+6]);s=Math.max(s,r[o+7]);s=Math.max(s,r[o+8]);u=Math.min(u,Math.max(s,r[o]));u=Math.min(u,Math.max(s,r[o+9]))}return -u-1};var c=20;return{set_threshold:function(j){c=Math.min(Math.max(j,0),255);for(var k=-255;k<=255;++k){f[(k+255)]=(k<-c?1:(k>c?2:0))}return c},detect:function(L,H,D){if(typeof D==="undefined"){D=3}var A=8,t=25;var u=L.data,X=L.cols,ar=L.rows;var ap=0,an=0,al=0,E=0,W=0,aq=0;var B=jsfeat.cache.get_buffer(3*X);var O=jsfeat.cache.get_buffer(((X+1)*3)<<2);var I=B.u8;var F=O.i32;var M=e;var J=i;var y=Math.max(3,D);var Z=Math.min((ar-2),(ar-D));var z=Math.max(3,D);var aa=Math.min((X-3),(X-D));var ah=0,P=0,C;var Q=g;var G=f;var p=c;var Y=0,ao=0,au=0,aw=0,U=0,V=0,av=0,R=0,at=0;var T=0,S=0,o=0;d(M,X,16);var am=M[0];var ak=M[1];var aj=M[2];var ai=M[3];var ag=M[4];var af=M[5];var ae=M[6];var ad=M[7];var ac=M[8];var ab=M[9];var s=M[10];var r=M[11];var q=M[12];var n=M[13];var m=M[14];var l=M[15];for(ap=0;ap<X*3;++ap){I[ap]=0}for(ap=y;ap<Z;++ap){av=((ap*X)+z)|0;aq=(ap-3)%3;V=(aq*X)|0;U=(aq*(X+1))|0;for(an=0;an<X;++an){I[V+an]=0}aw=0;if(ap<(Z-1)){an=z;for(;an<aa;++an,++av){Y=u[av];ao=(-Y+255);au=(G[ao+u[av+am]]|G[ao+u[av+ac]]);if(au==0){continue}au&=(G[ao+u[av+aj]]|G[ao+u[av+s]]);au&=(G[ao+u[av+ag]]|G[ao+u[av+q]]);au&=(G[ao+u[av+ae]]|G[ao+u[av+m]]);if(au==0){continue}au&=(G[ao+u[av+ak]]|G[ao+u[av+ab]]);au&=(G[ao+u[av+ai]]|G[ao+u[av+r]]);au&=(G[ao+u[av+af]]|G[ao+u[av+n]]);au&=(G[ao+u[av+ad]]|G[ao+u[av+l]]);if(au&1){E=(Y-p);ah=0;for(al=0;al<t;++al){W=u[(av+M[al])];if(W<E){++ah;if(ah>A){++aw;F[U+aw]=an;I[V+an]=Q(u,av,M,J,p);break}}else{ah=0}}}if(au&2){E=(Y+p);ah=0;for(al=0;al<t;++al){W=u[(av+M[al])];if(W>E){++ah;if(ah>A){++aw;F[U+aw]=an;I[V+an]=Q(u,av,M,J,p);break}}else{ah=0}}}}}F[U+X]=aw;if(ap==y){continue}aq=(ap-4+3)%3;R=(aq*X)|0;U=(aq*(X+1))|0;aq=(ap-5+3)%3;at=(aq*X)|0;aw=F[U+X];for(al=0;al<aw;++al){an=F[U+al];T=(an+1)|0;S=(an-1)|0;o=I[R+an];if((o>I[R+T]&&o>I[R+S]&&o>I[at+S]&&o>I[at+an]&&o>I[at+T]&&o>I[V+S]&&o>I[V+an]&&o>I[V+T])){C=H[P];C.x=an,C.y=(ap-1),C.score=o;P++}}}jsfeat.cache.put_buffer(B);jsfeat.cache.put_buffer(O);return P}}})();a.fast_corners=b;b.set_threshold(20)})(jsfeat);(function(b){var a=(function(){var d=function(e,l,q,i,r,g,p,n,k,j){var m=0,o=0,f=(n*q+p)|0,s=f;for(m=n;m<j;++m,f+=q,s=f){for(o=p;o<k;++o,++s){l[s]=-4*e[s]+e[s+r]+e[s-r]+e[s+g]+e[s-g]}}};var c=function(e,f,k,m,g,l,h){var o=-2*e[f]+e[f+m]+e[f-m];var i=-2*e[f]+e[f+g]+e[f-g];var n=e[f+l]+e[f-l]-e[f+h]-e[f-h];var j=(Math.sqrt(((o-i)*(o-i)+4*n*n)))|0;return Math.min(Math.abs(k-j),Math.abs(-(k+j)))};return{laplacian_threshold:30,min_eigen_value_threshold:25,detect:function(l,A,z){if(typeof z==="undefined"){z=5}var o=0,n=0;var p=l.cols,B=l.rows,q=l.data;var H=5,f=(5*p)|0;var G=(3+3*p)|0,g=(3-3*p)|0;var e=jsfeat.cache.get_buffer((p*B)<<2);var j=e.i32;var i=0,k=0,m=0,r=0,v;var u=0;var F=this.laplacian_threshold;var D=this.min_eigen_value_threshold;var t=Math.max(5,z)|0;var s=Math.max(3,z)|0;var E=Math.min(p-5,p-z)|0;var C=Math.min(B-3,B-z)|0;o=p*B;while(--o>=0){j[o]=0}d(q,j,p,B,H,f,t,s,E,C);k=(s*p+t)|0;for(n=s;n<C;++n,k+=p){for(o=t,m=k;o<E;++o,++m){i=j[m];if((i<-F&&i<j[m-1]&&i<j[m+1]&&i<j[m-p]&&i<j[m+p]&&i<j[m-p-1]&&i<j[m+p-1]&&i<j[m-p+1]&&i<j[m+p+1])||(i>F&&i>j[m-1]&&i>j[m+1]&&i>j[m-p]&&i>j[m+p]&&i>j[m-p-1]&&i>j[m+p-1]&&i>j[m-p+1]&&i>j[m+p+1])){r=c(q,m,i,H,f,G,g);if(r>D){v=A[u];v.x=o,v.y=n,v.score=r;++u;++o,++m}}}}jsfeat.cache.put_buffer(e);return u}}})();b.yape06=a})(jsfeat);(function(a){var b=(function(){var d=function(l,m,k){var j=0;var h,n;h=k;for(n=0;n<h;n++,j++){h=(Math.sqrt((k*k-n*n))+0.5)|0;m[j]=(h+l*n)}for(h--;h<n&&h>=0;h--,j++){n=(Math.sqrt((k*k-h*h))+0.5)|0;m[j]=(h+l*n)}for(;-h<n;h--,j++){n=(Math.sqrt((k*k-h*h))+0.5)|0;m[j]=(h+l*n)}for(n--;n>=0;n--,j++){h=(-Math.sqrt((k*k-n*n))-0.5)|0;m[j]=(h+l*n)}for(;n>h;n--,j++){h=(-Math.sqrt((k*k-n*n))-0.5)|0;m[j]=(h+l*n)}for(h++;h<=0;h++,j++){n=(-Math.sqrt((k*k-h*h))-0.5)|0;m[j]=(h+l*n)}for(;h<-n;h++,j++){n=(-Math.sqrt((k*k-h*h))-0.5)|0;m[j]=(h+l*n)}for(n++;n<0;n++,j++){h=(Math.sqrt((k*k-n*n))+0.5)|0;m[j]=(h+l*n)}m[j]=m[0];m[j+1]=m[1];return j};var g=function(h,j,i){var k=0;if(h[j+1]!=0){k++}if(h[j-1]!=0){k++}if(h[j+i]!=0){k++}if(h[j+i+1]!=0){k++}if(h[j+i-1]!=0){k++}if(h[j-i]!=0){k++}if(h[j-i+1]!=0){k++}if(h[j-i-1]!=0){k++}return k};var c=function(l,m,i,k,j){var h,n;if(i>0){m-=k*j;for(n=-j;n<=j;++n){for(h=-j;h<=j;++h){if(l[m+h]>i){return false}}m+=k}}else{m-=k*j;for(n=-j;n<=j;++n){for(h=-j;h<=j;++h){if(l[m+h]<i){return false}}m+=k}}return true};var e=function(s,r,m,u,p,i,l,n){var k=0;var q=0,o=(l-1)|0;var j=0,w=0,v=0,t=0;var h=0;j=s[r+i[q]];if((j<=p)){if((j>=u)){w=s[r+i[o]];if((w<=p)){if((w>=u)){m[r]=0;return}else{o++;v=s[r+i[o]];if((v>p)){o++;t=s[r+i[o]];if((t>p)){h=3}else{if((t<u)){h=6}else{m[r]=0;return}}}else{o++;t=s[r+i[o]];if((t>p)){h=7}else{if((t<u)){h=2}else{m[r]=0;return}}}}}else{o++;v=s[r+i[o]];if((v>p)){o++;t=s[r+i[o]];if((t>p)){h=3}else{if((t<u)){h=6}else{m[r]=0;return}}}else{if((v<u)){o++;t=s[r+i[o]];if((t>p)){h=7}else{if((t<u)){h=2}else{m[r]=0;return}}}else{m[r]=0;return}}}}else{w=s[r+i[o]];if((w>p)){m[r]=0;return}o++;v=s[r+i[o]];if((v>p)){m[r]=0;return}o++;t=s[r+i[o]];if((t>p)){m[r]=0;return}h=1}}else{w=s[r+i[o]];if((w<u)){m[r]=0;return}o++;v=s[r+i[o]];if((v<u)){m[r]=0;return}o++;t=s[r+i[o]];if((t<u)){m[r]=0;return}h=0}for(q=1;q<=l;q++){j=s[r+i[q]];switch(h){case 0:if((j>p)){v=t;o++;t=s[r+i[o]];if((t<u)){m[r]=0;return}k-=j+v;h=0;break}if((j<u)){if((v>p)){m[r]=0;return}if((t>p)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((t>p)){m[r]=0;return}k-=j+v;h=8;break}if((v<=p)){m[r]=0;return}if((t<=p)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((t>p)){k-=j+v;h=3;break}if((t<u)){k-=j+v;h=6;break}m[r]=0;return;case 1:if((j<u)){v=t;o++;t=s[r+i[o]];if((t>p)){m[r]=0;return}k-=j+v;h=1;break}if((j>p)){if((v<u)){m[r]=0;return}if((t<u)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((t<u)){m[r]=0;return}k-=j+v;h=9;break}if((v>=u)){m[r]=0;return}if((t>=u)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((t<u)){k-=j+v;h=2;break}if((t>p)){k-=j+v;h=7;break}m[r]=0;return;case 2:if((j>p)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((j<u)){if((t>p)){m[r]=0;return}k-=j+v;h=4;break}if((t>p)){k-=j+v;h=7;break}if((t<u)){k-=j+v;h=2;break}m[r]=0;return;case 3:if((j<u)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((j>p)){if((t<u)){m[r]=0;return}k-=j+v;h=5;break}if((t>p)){k-=j+v;h=3;break}if((t<u)){k-=j+v;h=6;break}m[r]=0;return;case 4:if((j>p)){m[r]=0;return}if((j<u)){v=t;o++;t=s[r+i[o]];if((t>p)){m[r]=0;return}k-=j+v;h=1;break}if((t>=u)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((t<u)){k-=j+v;h=2;break}if((t>p)){k-=j+v;h=7;break}m[r]=0;return;case 5:if((j<u)){m[r]=0;return}if((j>p)){v=t;o++;t=s[r+i[o]];if((t<u)){m[r]=0;return}k-=j+v;h=0;break}if((t<=p)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((t>p)){k-=j+v;h=3;break}if((t<u)){k-=j+v;h=6;break}m[r]=0;return;case 7:if((j>p)){m[r]=0;return}if((j<u)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((t>p)){k-=j+v;h=3;break}if((t<u)){k-=j+v;h=6;break}m[r]=0;return;case 6:if((j>p)){m[r]=0;return}if((j<u)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((t<u)){k-=j+v;h=2;break}if((t>p)){k-=j+v;h=7;break}m[r]=0;return;case 8:if((j>p)){if((t<u)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((t<u)){m[r]=0;return}k-=j+v;h=9;break}if((j<u)){v=t;o++;t=s[r+i[o]];if((t>p)){m[r]=0;return}k-=j+v;h=1;break}m[r]=0;return;case 9:if((j<u)){if((t>p)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((t>p)){m[r]=0;return}k-=j+v;h=8;break}if((j>p)){v=t;o++;t=s[r+i[o]];if((t<u)){m[r]=0;return}k-=j+v;h=0;break}m[r]=0;return;default:break}}m[r]=(k+n*s[r])};var f=(function(){function h(i,j,k){this.dirs=new Int32Array(1024);this.dirs_count=d(i,this.dirs,k)|0;this.scores=new Int32Array(i*j);this.radius=k|0}return h})();return{level_tables:[],tau:7,init:function(m,j,h,l){if(typeof l==="undefined"){l=1}var k;h=Math.min(h,7);h=Math.max(h,3);for(k=0;k<l;++k){this.level_tables[k]=new f(m>>k,j>>k,h)}},detect:function(k,J,G){if(typeof G==="undefined"){G=4}var A=this.level_tables[0];var i=A.radius|0,q=(i-1)|0;var m=A.dirs;var n=A.dirs_count|0;var v=n>>1;var O=k.data,u=k.cols|0,K=k.rows|0,N=u>>1;var H=A.scores;var s=0,r=0,j=0,l=0,o=0,p=0,z=0,I=0;var F=this.tau|0;var D=0,E;var C=Math.max(i+1,G)|0;var B=Math.max(i+1,G)|0;var M=Math.min(u-i-2,u-G)|0;var L=Math.min(K-i-2,K-G)|0;j=(B*u+C)|0;for(r=B;r<L;++r,j+=u){for(s=C,l=j;s<M;++s,++l){o=O[l]+F,p=O[l]-F;if(p<O[l+i]&&O[l+i]<o&&p<O[l-i]&&O[l-i]<o){H[l]=0}else{e(O,l,H,p,o,m,v,n)}}}j=(B*u+C)|0;for(r=B;r<L;++r,j+=u){for(s=C,l=j;s<M;++s,++l){I=H[l];z=Math.abs(I);if(z<5){++s,++l}else{if(g(H,l,u)>=3&&c(H,l,I,N,i)){E=J[D];E.x=s,E.y=r,E.score=z;++D;s+=q,l+=q}}}}return D}}})();a.yape=b})(jsfeat);(function(b){var a=(function(){var d=new Int32Array([8,-3,9,5,4,2,7,-12,-11,9,-8,2,7,-12,12,-13,2,-13,2,12,1,-7,1,6,-2,-10,-2,-4,-13,-13,-11,-8,-13,-3,-12,-9,10,4,11,9,-13,-8,-8,-9,-11,7,-9,12,7,7,12,6,-4,-5,-3,0,-13,2,-12,-3,-9,0,-7,5,12,-6,12,-1,-3,6,-2,12,-6,-13,-4,-8,11,-13,12,-8,4,7,5,1,5,-3,10,-3,3,-7,6,12,-8,-7,-6,-2,-2,11,-1,-10,-13,12,-8,10,-7,3,-5,-3,-4,2,-3,7,-10,-12,-6,11,5,-12,6,-7,5,-6,7,-1,1,0,4,-5,9,11,11,-13,4,7,4,12,2,-1,4,4,-4,-12,-2,7,-8,-5,-7,-10,4,11,9,12,0,-8,1,-13,-13,-2,-8,2,-3,-2,-2,3,-6,9,-4,-9,8,12,10,7,0,9,1,3,7,-5,11,-10,-13,-6,-11,0,10,7,12,1,-6,-3,-6,12,10,-9,12,-4,-13,8,-8,-12,-13,0,-8,-4,3,3,7,8,5,7,10,-7,-1,7,1,-12,3,-10,5,6,2,-4,3,-10,-13,0,-13,5,-13,-7,-12,12,-13,3,-11,8,-7,12,-4,7,6,-10,12,8,-9,-1,-7,-6,-2,-5,0,12,-12,5,-7,5,3,-10,8,-13,-7,-7,-4,5,-3,-2,-1,-7,2,9,5,-11,-11,-13,-5,-13,-1,6,0,-1,5,-3,5,2,-4,-13,-4,12,-9,-6,-9,6,-12,-10,-8,-4,10,2,12,-3,7,12,12,12,-7,-13,-6,5,-4,9,-3,4,7,-1,12,2,-7,6,-5,1,-13,11,-12,5,-3,7,-2,-6,7,-8,12,-7,-13,-7,-11,-12,1,-3,12,12,2,-6,3,0,-4,3,-2,-13,-1,-13,1,9,7,1,8,-6,1,-1,3,12,9,1,12,6,-1,-9,-1,3,-13,-13,-10,5,7,7,10,12,12,-5,12,9,6,3,7,11,5,-13,6,10,2,-12,2,3,3,8,4,-6,2,6,12,-13,9,-12,10,3,-8,4,-7,9,-11,12,-4,-6,1,12,2,-8,6,-9,7,-4,2,3,3,-2,6,3,11,0,3,-3,8,-8,7,8,9,3,-11,-5,-6,-4,-10,11,-5,10,-5,-8,-3,12,-10,5,-9,0,8,-1,12,-6,4,-6,6,-11,-10,12,-8,7,4,-2,6,7,-2,0,-2,12,-5,-8,-5,2,7,-6,10,12,-9,-13,-8,-8,-5,-13,-5,-2,8,-8,9,-13,-9,-11,-9,0,1,-8,1,-2,7,-4,9,1,-2,1,-1,-4,11,-6,12,-11,-12,-9,-6,4,3,7,7,12,5,5,10,8,0,-4,2,8,-9,12,-5,-13,0,7,2,12,-1,2,1,7,5,11,7,-9,3,5,6,-8,-13,-4,-8,9,-5,9,-3,-3,-4,-7,-3,-12,6,5,8,0,-7,6,-6,12,-13,6,-5,-2,1,-10,3,10,4,1,8,-4,-2,-2,2,-13,2,-12,12,12,-2,-13,0,-6,4,1,9,3,-6,-10,-3,-5,-3,-13,-1,1,7,5,12,-11,4,-2,5,-7,-13,9,-9,-5,7,1,8,6,7,-8,7,6,-7,-4,-7,1,-8,11,-7,-8,-13,6,-12,-8,2,4,3,9,10,-5,12,3,-6,-5,-6,7,8,-3,9,-8,2,-12,2,8,-11,-2,-10,3,-12,-13,-7,-9,-11,0,-10,-5,5,-3,11,8,-2,-13,-1,12,-1,-8,0,9,-13,-11,-12,-5,-10,-2,-10,11,-3,9,-2,-13,2,-3,3,2,-9,-13,-4,0,-4,6,-3,-10,-4,12,-2,-7,-6,-11,-4,9,6,-3,6,11,-13,11,-5,5,11,11,12,6,7,-5,12,-2,-1,12,0,7,-4,-8,-3,-2,-7,1,-6,7,-13,-12,-8,-13,-7,-2,-6,-8,-8,5,-6,-9,-5,-1,-4,5,-13,7,-8,10,1,5,5,-13,1,0,10,-13,9,12,10,-1,5,-8,10,-9,-1,11,1,-13,-9,-3,-6,2,-1,-10,1,12,-13,1,-8,-10,8,-11,10,-6,2,-13,3,-6,7,-13,12,-9,-10,-10,-5,-7,-10,-8,-8,-13,4,-6,8,5,3,12,8,-13,-4,2,-3,-3,5,-13,10,-12,4,-13,5,-1,-9,9,-4,3,0,3,3,-9,-12,1,-6,1,3,2,4,-8,-10,-10,-10,9,8,-13,12,12,-8,-12,-6,-5,2,2,3,7,10,6,11,-8,6,8,8,-12,-7,10,-6,5,-3,-9,-3,9,-1,-13,-1,5,-3,-7,-3,4,-8,-2,-8,3,4,2,12,12,2,-5,3,11,6,-9,11,-13,3,-1,7,12,11,-1,12,4,-3,0,-3,6,4,-11,4,12,2,-4,2,1,-10,-6,-8,1,-13,7,-11,1,-13,12,-11,-13,6,0,11,-13,0,-1,1,4,-13,3,-9,-2,-9,8,-6,-3,-13,-6,-8,-2,5,-9,8,10,2,7,3,-9,-1,-6,-1,-1,9,5,11,-2,11,-3,12,-8,3,0,3,5,-1,4,0,10,3,-6,4,5,-13,0,-10,5,5,8,12,11,8,9,9,-6,7,-4,8,-12,-10,4,-10,9,7,3,12,4,9,-7,10,-2,7,0,12,-2,-1,-6,0,-11]);var c=new jsfeat.matrix_t(3,3,jsfeat.F32_t|jsfeat.C1_t);var f=new jsfeat.matrix_t(32,32,jsfeat.U8_t|jsfeat.C1_t);var e=function(l,n,k,i,h,j){var m=Math.cos(k);var g=Math.sin(k);c.data[0]=m,c.data[1]=-g,c.data[2]=(-m+g)*j*0.5+i,c.data[3]=g,c.data[4]=m,c.data[5]=(-g-m)*j*0.5+h;jsfeat.imgproc.warp_affine(l,n,c,128)};return{describe:function(j,u,g,B){var r=32;var x=0,A=0,q=0,p=0,z=0;var o=0,m=0,D=0;var C=j.data,n=j.cols,y=j.rows;var t=f.data;var v=16*32+16;var k=0;if(!(B.type&jsfeat.U8_t)){B.type=jsfeat.U8_t;B.cols=r;B.rows=g;B.channel=1;B.allocate()}else{B.resize(r,g,1)}var l=B.data;var s=0;for(x=0;x<g;++x){q=u[x].x;p=u[x].y;z=u[x].angle;e(j,f,z,q,p,32);k=0;for(A=0;A<r;++A){o=t[v+d[k+1]*32+d[k]];k+=2;m=t[v+d[k+1]*32+d[k]];k+=2;D=(o<m)|0;o=t[v+d[k+1]*32+d[k]];k+=2;m=t[v+d[k+1]*32+d[k]];k+=2;D|=(o<m)<<1;o=t[v+d[k+1]*32+d[k]];k+=2;m=t[v+d[k+1]*32+d[k]];k+=2;D|=(o<m)<<2;o=t[v+d[k+1]*32+d[k]];k+=2;m=t[v+d[k+1]*32+d[k]];k+=2;D|=(o<m)<<3;o=t[v+d[k+1]*32+d[k]];k+=2;m=t[v+d[k+1]*32+d[k]];k+=2;D|=(o<m)<<4;o=t[v+d[k+1]*32+d[k]];k+=2;m=t[v+d[k+1]*32+d[k]];k+=2;D|=(o<m)<<5;o=t[v+d[k+1]*32+d[k]];k+=2;m=t[v+d[k+1]*32+d[k]];k+=2;D|=(o<m)<<6;o=t[v+d[k+1]*32+d[k]];k+=2;m=t[v+d[k+1]*32+d[k]];k+=2;D|=(o<m)<<7;l[s+A]=D}s+=r}}}})();b.orb=a})(jsfeat);(function(b){var a=(function(){var c=jsfeat.imgproc.scharr_derivatives;return{track:function(n,u,ap,aL,k,N,R,K,f,q){if(typeof R==="undefined"){R=30}if(typeof K==="undefined"){K=new Uint8Array(k)}if(typeof f==="undefined"){f=0.01}if(typeof q==="undefined"){q=0.0001}var e=(N-1)*0.5;var h=(N*N)|0;var aa=h<<1;var r=n.data,S=u.data;var g=r[0].data,F=S[0].data;var M=r[0].cols,aB=r[0].rows,ay=0,aH=0;var az=jsfeat.cache.get_buffer(h<<2);var s=jsfeat.cache.get_buffer(aa<<2);var t=jsfeat.cache.get_buffer((aB*(M<<1))<<2);var V=new jsfeat.matrix_t(M,aB,jsfeat.S32C2_t,t.data);var w=az.i32;var ac=s.i32;var aA=t.i32;var ab=0,I=0,aM=0,at=0,aI=0,au=0;var am=0,aF=0,aD=0,af=0,ae=0;var E=0,z=0,Y=0,W=0;var p=0,o=0,aE=0,aC=0;var Q=0,P=0,J=0,H=0,ai=0,ak=0,l=0;var d=0,A=0,O=0;var U=0,T=0,aw=0,av=0;var ah=14;var C=14;var Z=C-5;var ax=(1<<((Z)-1));var ad=(1<<ah);var m=(1<<((C)-1));var X=1/(1<<20);var aK=0,aJ=0,ar=0,aq=0,al=0,v=0,B=0;var ao=0,an=0,ag=0,aj=0,aG=0;var G=1.1920929e-7;f*=f;for(;Q<k;++Q){K[Q]=1}var L=(n.levels-1)|0;ai=L;for(;ai>=0;--ai){am=(1/(1<<ai));ay=M>>ai;aH=aB>>ai;ab=ay<<1;g=r[ai].data;F=S[ai].data;A=(ay-N)|0;O=(aH-N)|0;c(r[ai],V);for(ak=0;ak<k;++ak){Q=ak<<1;P=Q+1;aF=ap[Q]*am;aD=ap[P]*am;if(ai==L){af=aF;ae=aD}else{af=aL[Q]*2;ae=aL[P]*2}aL[Q]=af;aL[P]=ae;aF-=e;aD-=e;p=aF|0;o=aD|0;J=(p<=d)|(p>=A)|(o<=d)|(o>=O);if(J!=0){if(ai==0){K[ak]=0}continue}U=aF-p;T=aD-o;aK=(((1-U)*(1-T)*ad)+0.5)|0;aJ=((U*(1-T)*ad)+0.5)|0;ar=(((1-U)*T*ad)+0.5)|0;aq=(ad-aK-aJ-ar);ao=0,an=0,ag=0;for(H=0;H<N;++H){I=((H+o)*ay+p)|0;aM=I<<1;at=(H*N)|0;aI=at<<1;for(J=0;J<N;++J,++I,++at,aM+=2){al=((g[I])*aK+(g[I+1])*aJ+(g[I+ay])*ar+(g[I+ay+1])*aq);al=(((al)+ax)>>(Z));v=(aA[aM]*aK+aA[aM+2]*aJ+aA[aM+ab]*ar+aA[aM+ab+2]*aq);v=(((v)+m)>>(C));B=(aA[aM+1]*aK+aA[aM+3]*aJ+aA[aM+ab+1]*ar+aA[aM+ab+3]*aq);B=(((B)+m)>>(C));w[at]=al;ac[aI++]=v;ac[aI++]=B;ao+=v*v;an+=v*B;ag+=B*B}}ao*=X;an*=X;ag*=X;aj=ao*ag-an*an;aG=(ag+ao-Math.sqrt((ao-ag)*(ao-ag)+4*an*an))/aa;if(aG<q||aj<G){if(ai==0){K[ak]=0}continue}aj=1/aj;af-=e;ae-=e;E=0;z=0;for(l=0;l<R;++l){aE=af|0;aC=ae|0;J=(aE<=d)|(aE>=A)|(aC<=d)|(aC>=O);if(J!=0){if(ai==0){K[ak]=0}break}U=af-aE;T=ae-aC;aK=(((1-U)*(1-T)*ad)+0.5)|0;aJ=((U*(1-T)*ad)+0.5)|0;ar=(((1-U)*T*ad)+0.5)|0;aq=(ad-aK-aJ-ar);aw=0,av=0;for(H=0;H<N;++H){au=((H+aC)*ay+aE)|0;at=(H*N)|0;aI=at<<1;for(J=0;J<N;++J,++au,++at){al=((F[au])*aK+(F[au+1])*aJ+(F[au+ay])*ar+(F[au+ay+1])*aq);al=(((al)+ax)>>(Z));al=(al-w[at]);aw+=al*ac[aI++];av+=al*ac[aI++]}}aw*=X;av*=X;Y=((an*av-ag*aw)*aj);W=((an*aw-ao*av)*aj);af+=Y;ae+=W;aL[Q]=af+e;aL[P]=ae+e;if(Y*Y+W*W<=f){break}if(l>0&&Math.abs(Y+E)<0.01&&Math.abs(W+z)<0.01){aL[Q]-=Y*0.5;aL[P]-=W*0.5;break}E=Y;z=W}}}jsfeat.cache.put_buffer(az);jsfeat.cache.put_buffer(s);jsfeat.cache.put_buffer(t)}}})();b.optical_flow_lk=a})(jsfeat);(function(b){var a=(function(){var c=function(e,d){var f=(e.width*0.25+0.5)|0;return d.x<=e.x+f&&d.x>=e.x-f&&d.y<=e.y+f&&d.y>=e.y-f&&d.width<=(e.width*1.5+0.5)|0&&(d.width*1.5+0.5)|0>=e.width};return{edges_density:0.07,detect_single_scale:function(E,ad,af,q,d,f,D,B){var z=(B.size[0]*D)|0,N=(B.size[1]*D)|0,V=(0.5*D+1.5)|0,U=V;var Z,X,W,Q,O,T=(d-z)|0,R=(f-N)|0;var H=(d+1)|0,w,p,r,S;var e=1/(z*N);var t,o,l,u,s,ae,A,g=true,L,h,n,G,m;var M,K,J,I,v,C;var ac=0,ab=z,aa=N*H,Y=aa+z;var F=((z*N)*255*this.edges_density)|0;var P=[];for(O=0;O<R;O+=U){ac=O*H;for(Q=0;Q<T;Q+=V,ac+=V){p=E[ac]-E[ac+ab]-E[ac+aa]+E[ac+Y];if(q){w=(q[ac]-q[ac+ab]-q[ac+aa]+q[ac+Y]);if(w<F||p<20){Q+=V,ac+=V;continue}}p*=e;r=(ad[ac]-ad[ac+ab]-ad[ac+aa]+ad[ac+Y])*e-p*p;S=r>0?Math.sqrt(r):1;t=B.complexClassifiers;s=t.length;g=true;for(Z=0;Z<s;++Z){o=t[Z];L=o.threshold;l=o.simpleClassifiers;ae=l.length;h=0;for(X=0;X<ae;++X){u=l[X];n=0;m=u.features;A=m.length;if(u.tilted===1){for(W=0;W<A;++W){G=m[W];M=~~(Q+G[0]*D)+~~(O+G[1]*D)*H;v=~~(G[2]*D);C=~~(G[3]*D);K=v*H;J=C*H;n+=(af[M]-af[M+v+K]-af[M-C+J]+af[M+v-C+K+J])*G[4]}}else{for(W=0;W<A;++W){G=m[W];M=~~(Q+G[0]*D)+~~(O+G[1]*D)*H;v=~~(G[2]*D);C=~~(G[3]*D);J=C*H;n+=(E[M]-E[M+v]-E[M+J]+E[M+J+v])*G[4]}}h+=(n*e<u.threshold*S)?u.left_val:u.right_val}if(h<L){g=false;break}}if(g){P.push({x:Q,y:O,width:z,height:N,neighbor:1,confidence:h});Q+=V,ac+=V}}}return P},detect_multi_scale:function(e,m,f,h,d,n,i,g,k){if(typeof g==="undefined"){g=1.2}if(typeof k==="undefined"){k=1}var o=i.size[0];var j=i.size[1];var l=[];while(k*o<d&&k*j<n){l=l.concat(this.detect_single_scale(e,m,f,h,d,n,k,i));k*=g}return l},group_rectangles:function(g,l){if(typeof l==="undefined"){l=1}var y,v,q=g.length;var r=[];for(y=0;y<q;++y){r[y]={parent:-1,element:g[y],rank:0}}for(y=0;y<q;++y){if(!r[y].element){continue}var t=y;while(r[t].parent!=-1){t=r[t].parent}for(v=0;v<q;++v){if(y!=v&&r[v].element&&c(r[y].element,r[v].element)){var s=v;while(r[s].parent!=-1){s=r[s].parent}if(s!=t){if(r[t].rank>r[s].rank){r[s].parent=t}else{r[t].parent=s;if(r[t].rank==r[s].rank){r[s].rank++}t=s}var A,d=v;while(r[d].parent!=-1){A=d;d=r[d].parent;r[A].parent=t}d=y;while(r[d].parent!=-1){A=d;d=r[d].parent;r[A].parent=t}}}}}var w=[];var o=0;for(y=0;y<q;y++){v=-1;var e=y;if(r[e].element){while(r[e].parent!=-1){e=r[e].parent}if(r[e].rank>=0){r[e].rank=~o++}v=~r[e].rank}w[y]=v}var m=[];for(y=0;y<o+1;++y){m[y]={neighbors:0,x:0,y:0,width:0,height:0,confidence:0}}for(y=0;y<q;++y){var z=g[y];var k=w[y];if(m[k].neighbors==0){m[k].confidence=z.confidence}++m[k].neighbors;m[k].x+=z.x;m[k].y+=z.y;m[k].width+=z.width;m[k].height+=z.height;m[k].confidence=Math.max(m[k].confidence,z.confidence)}var h=[];for(y=0;y<o;++y){q=m[y].neighbors;if(q>=l){h.push({x:(m[y].x*2+q)/(2*q),y:(m[y].y*2+q)/(2*q),width:(m[y].width*2+q)/(2*q),height:(m[y].height*2+q)/(2*q),neighbors:m[y].neighbors,confidence:m[y].confidence})}}var p=[];q=h.length;for(y=0;y<q;++y){var z=h[y];var x=true;for(v=0;v<q;++v){var u=h[v];var f=(u.width*0.25+0.5)|0;if(y!=v&&z.x>=u.x-f&&z.y>=u.y-f&&z.x+z.width<=u.x+u.width+f&&z.y+z.height<=u.y+u.height+f&&(u.neighbors>Math.max(3,z.neighbors)||z.neighbors<3)){x=false;break}}if(x){p.push(z)}}return p}}})();b.haar=a})(jsfeat);(function(a){var b=(function(){var c=function(f,e){var g=(f.width*0.25+0.5)|0;return e.x<=f.x+g&&e.x>=f.x-g&&e.y<=f.y+g&&e.y>=f.y-g&&e.width<=(f.width*1.5+0.5)|0&&(e.width*1.5+0.5)|0>=f.width};var d=new jsfeat.pyramid_t(1);return{interval:4,scale:1.1486,next:5,scale_to:1,prepare_cascade:function(g){var m=g.stage_classifier.length;for(var h=0;h<m;h++){var l=g.stage_classifier[h].feature;var e=g.stage_classifier[h].count;var i=g.stage_classifier[h]._feature=new Array(e);for(var f=0;f<e;f++){i[f]={size:l[f].size,px:new Array(l[f].size),pz:new Array(l[f].size),nx:new Array(l[f].size),nz:new Array(l[f].size)}}}},build_pyramid:function(e,k,s,f){if(typeof f==="undefined"){f=4}var q=e.cols,m=e.rows;var l=0,n=0,h=0;var p=false;var j=e,g=e;var r=jsfeat.U8_t|jsfeat.C1_t;this.interval=f;this.scale=Math.pow(2,1/(this.interval+1));this.next=(this.interval+1)|0;this.scale_to=(Math.log(Math.min(q/k,m/s))/Math.log(this.scale))|0;var o=((this.scale_to+this.next*2)*4)|0;if(d.levels!=o){d.levels=o;d.data=new Array(o);p=true;d.data[0]=e}for(l=1;l<=this.interval;++l){n=(q/Math.pow(this.scale,l))|0;h=(m/Math.pow(this.scale,l))|0;j=d.data[l<<2];if(p||n!=j.cols||h!=j.rows){d.data[l<<2]=new jsfeat.matrix_t(n,h,r);j=d.data[l<<2]}jsfeat.imgproc.resample(e,j,n,h)}for(l=this.next;l<this.scale_to+this.next*2;++l){g=d.data[(l<<2)-(this.next<<2)];j=d.data[l<<2];n=g.cols>>1;h=g.rows>>1;if(p||n!=j.cols||h!=j.rows){d.data[l<<2]=new jsfeat.matrix_t(n,h,r);j=d.data[l<<2]}jsfeat.imgproc.pyrdown(g,j)}for(l=this.next*2;l<this.scale_to+this.next*2;++l){g=d.data[(l<<2)-(this.next<<2)];n=g.cols>>1;h=g.rows>>1;j=d.data[(l<<2)+1];if(p||n!=j.cols||h!=j.rows){d.data[(l<<2)+1]=new jsfeat.matrix_t(n,h,r);j=d.data[(l<<2)+1]}jsfeat.imgproc.pyrdown(g,j,1,0);j=d.data[(l<<2)+2];if(p||n!=j.cols||h!=j.rows){d.data[(l<<2)+2]=new jsfeat.matrix_t(n,h,r);j=d.data[(l<<2)+2]}jsfeat.imgproc.pyrdown(g,j,0,1);j=d.data[(l<<2)+3];if(p||n!=j.cols||h!=j.rows){d.data[(l<<2)+3]=new jsfeat.matrix_t(n,h,r);j=d.data[(l<<2)+3]}jsfeat.imgproc.pyrdown(g,j,1,1)}return d},detect:function(G,L){var h=this.interval;var N=this.scale;var m=this.next;var l=this.scale_to;var ab=0,aa=0,Z=0,W=0,S=0,R=0,U=0,B=0,J=0,I=0,V=0,ae=0,M=0,ad=0,w=0,Y=0,g=0;var E=0,X,Q,D,H,F,O=true,o=true;var z=1,v=1;var s=[0,1,0,1];var r=[0,0,1,1];var K=[];var C=G.data,ac=1,u=2,t=4;var A=[],e=[0,0,0];var P=[0,0,0];var T=[0,0,0];for(ab=0;ab<l;ab++){w=(ab<<2);Y=C[w+(m<<3)].cols-(L.width>>2);g=C[w+(m<<3)].rows-(L.height>>2);P[0]=C[w].cols*ac;P[1]=C[w+(m<<2)].cols*ac;P[2]=C[w+(m<<3)].cols*ac;T[0]=(C[w].cols*t)-(Y*t);T[1]=(C[w+(m<<2)].cols*u)-(Y*u);T[2]=(C[w+(m<<3)].cols*ac)-(Y*ac);B=L.stage_classifier.length;for(aa=0;aa<B;aa++){D=L.stage_classifier[aa].feature;Q=L.stage_classifier[aa]._feature;J=L.stage_classifier[aa].count;for(Z=0;Z<J;Z++){H=Q[Z];F=D[Z];I=F.size|0;for(U=0;U<I;U++){H.px[U]=(F.px[U]*ac)+F.py[U]*P[F.pz[U]];H.pz[U]=F.pz[U];H.nx[U]=(F.nx[U]*ac)+F.ny[U]*P[F.nz[U]];H.nz[U]=F.nz[U]}}}A[0]=C[w].data;A[1]=C[w+(m<<2)].data;for(U=0;U<4;U++){A[2]=C[w+(m<<3)+U].data;e[0]=(s[U]*u)+r[U]*(C[w].cols*u);e[1]=(s[U]*ac)+r[U]*(C[w+(m<<2)].cols*ac);e[2]=0;for(R=0;R<g;R++){for(S=0;S<Y;S++){E=0;O=true;B=L.stage_classifier.length;for(aa=0;aa<B;aa++){E=0;X=L.stage_classifier[aa].alpha;Q=L.stage_classifier[aa]._feature;J=L.stage_classifier[aa].count;for(Z=0;Z<J;Z++){H=Q[Z];ae=A[H.pz[0]][e[H.pz[0]]+H.px[0]];M=A[H.nz[0]][e[H.nz[0]]+H.nx[0]];if(ae<=M){E+=X[Z<<1]}else{o=true;I=H.size;for(ad=1;ad<I;ad++){if(H.pz[ad]>=0){V=A[H.pz[ad]][e[H.pz[ad]]+H.px[ad]];if(V<ae){if(V<=M){o=false;break}ae=V}}if(H.nz[ad]>=0){W=A[H.nz[ad]][e[H.nz[ad]]+H.nx[ad]];if(W>M){if(ae<=W){o=false;break}M=W}}}E+=(o)?X[(Z<<1)+1]:X[Z<<1]}}if(E<L.stage_classifier[aa].threshold){O=false;break}}if(O){K.push({x:(S*4+s[U]*2)*z,y:(R*4+r[U]*2)*v,width:L.width*z,height:L.height*v,neighbor:1,confidence:E});++S;e[0]+=t;e[1]+=u;e[2]+=ac}e[0]+=t;e[1]+=u;e[2]+=ac}e[0]+=T[0];e[1]+=T[1];e[2]+=T[2]}}z*=N;v*=N}return K},group_rectangles:function(h,m){if(typeof m==="undefined"){m=1}var z,w,r=h.length;var s=[];for(z=0;z<r;++z){s[z]={parent:-1,element:h[z],rank:0}}for(z=0;z<r;++z){if(!s[z].element){continue}var u=z;while(s[u].parent!=-1){u=s[u].parent}for(w=0;w<r;++w){if(z!=w&&s[w].element&&c(s[z].element,s[w].element)){var t=w;while(s[t].parent!=-1){t=s[t].parent}if(t!=u){if(s[u].rank>s[t].rank){s[t].parent=u}else{s[u].parent=t;if(s[u].rank==s[t].rank){s[t].rank++}u=t}var B,e=w;while(s[e].parent!=-1){B=e;e=s[e].parent;s[B].parent=u}e=z;while(s[e].parent!=-1){B=e;e=s[e].parent;s[B].parent=u}}}}}var x=[];var p=0;for(z=0;z<r;z++){w=-1;var f=z;if(s[f].element){while(s[f].parent!=-1){f=s[f].parent}if(s[f].rank>=0){s[f].rank=~p++}w=~s[f].rank}x[z]=w}var o=[];for(z=0;z<p+1;++z){o[z]={neighbors:0,x:0,y:0,width:0,height:0,confidence:0}}for(z=0;z<r;++z){var A=h[z];var l=x[z];if(o[l].neighbors==0){o[l].confidence=A.confidence}++o[l].neighbors;o[l].x+=A.x;o[l].y+=A.y;o[l].width+=A.width;o[l].height+=A.height;o[l].confidence=Math.max(o[l].confidence,A.confidence)}var k=[];for(z=0;z<p;++z){r=o[z].neighbors;if(r>=m){k.push({x:(o[z].x*2+r)/(2*r),y:(o[z].y*2+r)/(2*r),width:(o[z].width*2+r)/(2*r),height:(o[z].height*2+r)/(2*r),neighbors:o[z].neighbors,confidence:o[z].confidence})}}var q=[];r=k.length;for(z=0;z<r;++z){var A=k[z];var y=true;for(w=0;w<r;++w){var v=k[w];var g=(v.width*0.25+0.5)|0;if(z!=w&&A.x>=v.x-g&&A.y>=v.y-g&&A.x+A.width<=v.x+v.width+g&&A.y+A.height<=v.y+v.height+g&&(v.neighbors>Math.max(3,A.neighbors)||A.neighbors<3)){y=false;break}}if(y){q.push(A)}}return q}}})();a.bbf=b})(jsfeat);(function(a){if(typeof module==="undefined"||typeof module.exports==="undefined"){window.jsfeat=a}else{module.exports=a}})(jsfeat);
/* eslint-enable */

exports.jsfeat = jsfeat;

},{}],2:[function(require,module,exports){
const jsfeat = require('../js/jsfeat.min.js');
const {icAngle} = require('./orb.icAngle.js');

function detectKeypoints(img, corners, maxAllowed) {
  let count = jsfeat.yape06.detect(img, corners, 17);
  const uMax = new Int32Array([15, 15, 15, 15, 14, 14, 14, 13, 13, 12, 11, 10, 9, 8, 6, 3, 0]);

  if (count > maxAllowed) {
    jsfeat.math.qsort(corners, 0, count - 1, function(a, b) {
      return (b.score < a.score);
    });
    count = maxAllowed;
  }

  for (let i = 0; i < count; ++i) {
    corners[i].angle = icAngle(uMax, img, corners[i].x, corners[i].y);
  }

  return count;
}

exports.detectKeypoints = detectKeypoints;


},{"../js/jsfeat.min.js":1,"./orb.icAngle.js":4}],3:[function(require,module,exports){
const jsfeat = require('../js/jsfeat.min.js');

function findTransform(matches, count, patternCorners, screenCorners, homo3x3, matchMask) {
  const mmKernel = new jsfeat.motion_model.homography2d();
  const numModelPoints = 4;
  const reprojThreshold = 3;
  const ransacParam = new jsfeat.ransacParamsT(numModelPoints,
      reprojThreshold, 0.5, 0.99);
  const patternXY = [];
  const screenXY = [];
  for (let i = 0; i < count; ++i) {
    const m = matches[i];
    const sKp = screenCorners[m.screenIdx];
    const pKp = patternCorners[m.patternLev][m.patternIdx];
    patternXY[i] = {
      'x': pKp.x,
      'y': pKp.y,
    };
    screenXY[i] = {
      'x': sKp.x,
      'y': sKp.y,
    };
  }
  let ok = false;
  ok = jsfeat.motion_estimator.ransac(ransacParam, mmKernel,
      patternXY, screenXY, count, homo3x3, matchMask, 1000);
  let goodCnt = 0;
  if (ok) {
    for (let i = 0; i < count; ++i) {
      if (matchMask.data[i]) {
        patternXY[goodCnt].x = patternXY[i].x;
        patternXY[goodCnt].y = patternXY[i].y;
        screenXY[goodCnt].x = screenXY[i].x;
        screenXY[goodCnt].y = screenXY[i].y;
        goodCnt++;
      }
    }
    mmKernel.run(patternXY, screenXY, homo3x3, goodCnt);
  } else {
    jsfeat.matmath.identity_3x3(homo3x3, 1.0);
  }
  return goodCnt;
}

exports.findTransform = findTransform;


},{"../js/jsfeat.min.js":1}],4:[function(require,module,exports){
function icAngle(uMax, img, px, py) {
  const halfK = 15;
  let m01 = 0;
  let m10 = 0;
  const src = img.data;
  const step = img.cols;
  let u = 0;
  let v = 0;
  const centerOff = (py * step + px) | 0;
  let vSum = 0;
  let d = 0;
  let valPlus = 0;
  let valMinus = 0;
  for (u = -halfK; u <= halfK; ++u) {
    m10 += u * src[centerOff + u];
  }
  for (v = 1; v <= halfK; ++v) {
    vSum = 0;
    d = uMax[v];
    for (u = -d; u <= d; ++u) {
      valPlus = src[centerOff + u + v * step];
      valMinus = src[centerOff + u - v * step];
      vSum += (valPlus - valMinus);
      m10 += u * (valPlus + valMinus);
    }
    m01 += v * vSum;
  }
  return Math.atan2(m01, m10);
}

exports.icAngle = icAngle;

},{}],5:[function(require,module,exports){
const {popcnt32} = require('./orb.popcnt32.js');

function matchPattern(matches, screenDescriptors, patternDescriptors, numTrainLevels, options) {
  const qCnt = screenDescriptors.rows;
  const queryU32 = screenDescriptors.buffer.i32;
  let qdOff = 0;
  let qidx = 0;
  let lev = 0;
  let pidx = 0;
  let k = 0;
  let numMatches = 0;
  for (qidx = 0; qidx < qCnt; ++qidx) {
    let bestDist = 256;
    let bestDist2 = 256;
    let bestIdx = -1;
    let bestLev = -1;

    for (lev = 0; lev < numTrainLevels; ++lev) {
      const levDescriptors = patternDescriptors[lev];
      const ldCnt = levDescriptors.rows;
      const ldI32 = levDescriptors.buffer.i32;
      let ldOff = 0;

      for (pidx = 0; pidx < ldCnt; ++pidx) {
        let currD = 0;
        for (k = 0; k < 8; ++k) {
          currD += popcnt32(queryU32[qdOff + k] ^ ldI32[ldOff + k]);
        }

        if (currD < bestDist) {
          bestDist2 = bestDist;
          bestDist = currD;
          bestLev = lev;
          bestIdx = pidx;
        } else if (currD < bestDist2) {
          bestDist2 = currD;
        }

        ldOff += 8;
      }
    }
    if (bestDist < options.matchThreshold) {
      matches[numMatches].screenIdx = qidx;
      matches[numMatches].patternLev = bestLev;
      matches[numMatches].patternIdx = bestIdx;
      numMatches++;
    }
    qdOff += 8;
  }
  return numMatches;
}

exports.matchPattern = matchPattern;


},{"./orb.popcnt32.js":6}],6:[function(require,module,exports){
function popcnt32(n) {
  n -= ((n >> 1) & 0x55555555);
  n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
  return (((n + (n >> 4)) & 0xF0F0F0F) * 0x1010101) >> 24;
}

exports.popcnt32 = popcnt32;


},{}],7:[function(require,module,exports){
async function renderCorners(args, cornersArray, corners, count) {
  for (let i = 0; i < count; ++i) {
    const x = await corners[i].x;
    const y = await corners[i].y;
    // GET CORNERS
    const cornersOut = {x: x, y: y};
    if (!args.browser) {
      console.log(`Corners: ${await (JSON.stringify(cornersOut)).toString()}`);
    }
    if (cornersArray.indexOf(cornersOut) === -1 && cornersArray.length < count) {
      await cornersArray.push(cornersOut);
    }
  }
  return await cornersArray;
}

exports.renderCorners = renderCorners;


},{}],8:[function(require,module,exports){
async function renderMatches(args, ctx, matches, count, screenCorners, patternCorners, matchesArray, matchMask) {
  for (let i = 0; i < count; ++i) {
    const m = await matches[i];
    const sKp = await screenCorners[m.screenIdx];
    const pKp = await patternCorners[m.patternLev][m.patternIdx];
    const matchedPair = await {confidence: {c1: pKp.score, c2: sKp.score}, x1: pKp.x, y1: pKp.y, x2: sKp.x, y2: sKp.y, population: count};
    if (!args.browser) {
      console.log(`Pairs: ${await (JSON.stringify(matchedPair)).toString()}`);
    }
    if (matchesArray.indexOf(matchedPair) === -1 && matchesArray.length < count) {
      await matchesArray.push(matchedPair);
    }
  }
  return await matchesArray;
}

exports.renderMatches = renderMatches;

},{}],9:[function(require,module,exports){
// ===================DEPENDENCIES===================
const jsfeat = require('../assets/js/jsfeat.min.js');
const resolve = require('path').resolve;

// ===================UTILS===================
const {detectKeypoints} = require('../assets/utils/orb.detectKeypoints.js');
const {findTransform} = require('../assets/utils/orb.findTransform.js');
const {matchPattern} = require('../assets/utils/orb.matchPattern.js');
const {renderCorners} = require('../assets/utils/orb.renderCorners.js');
const {renderMatches} = require('../assets/utils/orb.renderMatches.js');

// ===================ORB-CORE ALGORITHM===================
const orbify = function(X, Y, cb, args = {}) {
  args.browser = true;
  args.caching =
    args.caching == true || args.caching == undefined ? true : false;
  args.leniency = args.leniency || 30;
  args.dimensions = args.dimensions || [640, 480];
  this.args = args;
  self = this;
  const canvas = document.createElement('CANVAS'),
    c = document.createElement('CANVAS'),
    primaryImage = new Image(),
    secImage = new Image();

  let options,
    matchesArray = [],
    cornersArray = [];

  primaryImage.src = resolve(X);
  secImage.src = resolve(Y);
  canvas.setAttribute('id', 'canvas');
  canvas.setAttribute('width', self.args.dimensions[0]);
  canvas.setAttribute('height', self.args.dimensions[1]);
  c.setAttribute('id', 'myCanvas');
  c.setAttribute('style', 'border:1px solid #d3d3d3');

  (function core() {
    'use strict';

    let ctx,
      imgU8,
      imgU8Smooth,
      screenCorners,
      numCorners,
      screenDescriptors,
      patternCorners,
      patternDescriptors,
      patternPreview,
      matches,
      homo3x3,
      matchMask;

    const matchT = (function() {
        function matchT(screenIdx, patternLev, patternIdx, distance) {
          if (typeof screenIdx === 'undefined') {
            screenIdx = 0;
          }
          if (typeof patternLev === 'undefined') {
            patternLev = 0;
          }
          if (typeof patternIdx === 'undefined') {
            patternIdx = 0;
          }
          if (typeof distance === 'undefined') {
            distance = 0;
          }
          matchT.screenIdx = screenIdx;
          matchT.patternLev = patternLev;
          matchT.patternIdx = patternIdx;
          matchT.distance = distance;
        }
        return matchT;
      })(),
      numTrainLevels = 4;

    const demoOpt = function() {
      const params = self.args.params || {};
      this.blur_size = params.blur_size || 5;
      this.lap_thres = params.lap_thres || 30;
      this.eigen_thres = params.eigen_thres || 35;
      this.matchThreshold = params.matchThreshold || 49;

      this.train_pattern = function() {
        const maxPatternSize = 512,
          maxPerLevel = 300,
          scInc = Math.sqrt(2.0),
          ctxx = c.getContext('2d'),
          imgData = ctxx.getImageData(
              0,
              0,
              primaryImage.width,
              primaryImage.height
          ),
          imgg = new jsfeat.matrix_t(
              primaryImage.width,
              primaryImage.height,
              jsfeat.U8_t | jsfeat.C1_t
          ),
          sc0 = Math.min(
              maxPatternSize / primaryImage.width,
              maxPatternSize / primaryImage.height
          ),
          lev0Img = new jsfeat.matrix_t(
              imgU8.cols,
              imgU8.rows,
              jsfeat.U8_t | jsfeat.C1_t
          ),
          levImg = new jsfeat.matrix_t(
              imgU8.cols,
              imgU8.rows,
              jsfeat.U8_t | jsfeat.C1_t
          );

        let lev = 0,
          i = 0,
          sc = 1.0,
          newWidth = (primaryImage.width * sc0) | 0,
          newHeight = (primaryImage.height * sc0) | 0,
          levCorners,
          levDescriptors,
          cornersNum = 0;

        patternPreview = new jsfeat.matrix_t(
            newWidth >> 1,
            newHeight >> 1,
            jsfeat.U8_t | jsfeat.C1_t
        );

        for (lev = 0; lev < numTrainLevels; ++lev) {
          patternCorners[lev] = [];
          levCorners = patternCorners[lev];
          i = (newWidth * newHeight) >> lev;
          while (--i >= 0) {
            levCorners[i] = new jsfeat.keypoint_t(0, 0, 0, 0, -1);
          }
          patternDescriptors[lev] = new jsfeat.matrix_t(
              32,
              maxPerLevel,
              jsfeat.U8_t | jsfeat.C1_t
          );
        }

        levCorners = patternCorners[0];
        levDescriptors = patternDescriptors[0];

        jsfeat.imgproc.grayscale(
            imgData.data,
            primaryImage.width,
            primaryImage.height,
            imgg
        );
        jsfeat.imgproc.resample(imgg, lev0Img, newWidth, newHeight);
        jsfeat.imgproc.pyrdown(lev0Img, patternPreview);
        jsfeat.imgproc.gaussian_blur(lev0Img, levImg, options.blur_size | 0);
        cornersNum = detectKeypoints(levImg, levCorners, maxPerLevel);
        jsfeat.orb.describe(levImg, levCorners, cornersNum, levDescriptors);

        sc /= scInc;

        for (lev = 1; lev < numTrainLevels; ++lev) {
          levCorners = patternCorners[lev];
          levDescriptors = patternDescriptors[lev];
          newWidth = (lev0Img.cols * sc) | 0;
          newHeight = (lev0Img.rows * sc) | 0;
          jsfeat.imgproc.resample(lev0Img, levImg, newWidth, newHeight);
          jsfeat.imgproc.gaussian_blur(levImg, levImg, options.blur_size | 0);
          cornersNum = detectKeypoints(levImg, levCorners, maxPerLevel);
          jsfeat.orb.describe(levImg, levCorners, cornersNum, levDescriptors);
          for (i = 0; i < cornersNum; ++i) {
            levCorners[i].x *= 1 / sc;
            levCorners[i].y *= 1 / sc;
          }
          sc /= scInc;
        }
      };
    };

    function demoApp() {
      imgU8 = new jsfeat.matrix_t(self.args.dimensions[0], self.args.dimensions[1], jsfeat.U8_t | jsfeat.C1_t);
      imgU8Smooth = new jsfeat.matrix_t(self.args.dimensions[0], self.args.dimensions[1], jsfeat.U8_t | jsfeat.C1_t);
      screenDescriptors = new jsfeat.matrix_t(
          32,
          500,
          jsfeat.U8_t | jsfeat.C1_t
      );
      patternDescriptors = [];
      screenCorners = [];
      patternCorners = [];
      matches = [];
      homo3x3 = new jsfeat.matrix_t(3, 3, jsfeat.F32C1_t);
      matchMask = new jsfeat.matrix_t(500, 1, jsfeat.U8C1_t);
      options = new demoOpt();

      ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgb(0,255,0)';
      ctx.strokeStyle = 'rgb(0,255,0)';

      let i = self.args.dimensions[0] * self.args.dimensions[1];
      while (--i >= 0) {
        screenCorners[i] = new jsfeat.keypoint_t(0, 0, 0, 0, -1);
        matches[i] = new matchT();
      }
    }

    async function findPoints() {
      if (await cornersArray.length) {
        return true;
      }

      window.requestAnimationFrame(findPoints);

      const primaryImageData = ctx.getImageData(0, 0, self.args.dimensions[0], self.args.dimensions[1]);

      ctx.putImageData(primaryImageData, 0, 0);
      ctx.drawImage(secImage, 0, 0, self.args.dimensions[0], self.args.dimensions[1]);

      jsfeat.imgproc.grayscale(primaryImageData.data, self.args.dimensions[0], self.args.dimensions[1], imgU8);

      jsfeat.imgproc.gaussian_blur(imgU8, imgU8Smooth, options.blur_size | 0);

      jsfeat.yape06.laplacian_threshold = options.lap_thres | 0;
      jsfeat.yape06.min_eigen_value_threshold = options.eigen_thres | 0;

      numCorners = await detectKeypoints(imgU8Smooth, screenCorners, 500);

      jsfeat.orb.describe(
          imgU8Smooth,
          screenCorners,
          numCorners,
          screenDescriptors
      );

      cornersArray = await renderCorners(
          self.args,
          cornersArray,
          screenCorners,
          numCorners
      );
    }

    async function findMatchedPoints() {
      let numMatches = 0,
        goodMatches = 0;
      if (findPoints()) {
        if (await matchesArray.length) {
          return;
        }
        requestAnimationFrame(findMatchedPoints);
        if (patternPreview) {
          numMatches = await matchPattern(
              matches,
              screenDescriptors,
              patternDescriptors,
              numTrainLevels,
              options
          );
          goodMatches = await findTransform(
              matches,
              numMatches,
              patternCorners,
              screenCorners,
              homo3x3,
              matchMask
          );
        }

        if (numMatches) {
          if (goodMatches >= (numMatches * self.args.leniency) / 100) {
            matchesArray = await renderMatches(
                self.args,
                ctx,
                matches,
                numMatches,
                screenCorners,
                patternCorners,
                matchesArray,
                matchMask
            );
          }
        }
      }
    }

    window.onload = function() {
      c.width = primaryImage.width;
      c.height = primaryImage.height;
      c.style.display = 'none';

      const ctxx = c.getContext('2d');
      ctxx.drawImage(
          primaryImage,
          0,
          0,
          primaryImage.width,
          primaryImage.height
      );

      options.train_pattern();
    };

    demoApp();

    if(args.query === 'corners') {
      findPoints();
    } else {
      findMatchedPoints();
    }

  })();

  if (
    !self.args.caching ||
    // recur only if both images are changed w.r.t. content (not order)
    (localStorage.getItem('X') !== X && localStorage.getItem('X') !== Y) ||
    (localStorage.getItem('Y') !== X && localStorage.getItem('Y') !== Y)
  ) {
    localStorage.removeItem('utils');
    window.data = null;
  }

  // no timeout async/await polyfill -- by rexagod
  this.utils = new Promise(function(resolve) {
    if (self.args.query === 'corners') {
      setTimeout(function () {
        resolve(cornersArray);
      }, 5000);
    }
    function uncachedResponse() {
      localStorage.setItem(
          'utils',
          JSON.stringify({
            points: cornersArray,
            matched_points: matchesArray,
          })
      );
      localStorage.setItem('X', X);
      localStorage.setItem('Y', Y);
      resolve(JSON.parse(localStorage.getItem('utils')));
      return;
    }
    let timer = 0,
      continueThread = false;
    if (!self.args.caching) {
      setTimeout(uncachedResponse, timer);
    } else {
      if (
        JSON.parse(localStorage.getItem('utils')) &&
        JSON.parse(localStorage.getItem('utils')).points &&
        JSON.parse(localStorage.getItem('utils')).points.length &&
        JSON.parse(localStorage.getItem('utils')).matched_points &&
        JSON.parse(localStorage.getItem('utils')).matched_points.length
      ) {
        // second iteration
        window.data = {
          points: cornersArray,
          matched_points: matchesArray,
        };
        resolve(JSON.parse(localStorage.getItem('utils')));
        this.utils = Promise.resolve(this.utils);
      } else {
        setInterval(function() {
          if (!continueThread) {
            if (!matchesArray.length || !cornersArray.length) {
              timer += 1;
              return;
            } else {
              setTimeout(function() {
                if (continueThread) {
                  return;
                }
                // first iteration
                window.data = {
                  points: cornersArray,
                  matched_points: matchesArray,
                };
                uncachedResponse();
                continueThread = true;
              }, timer);
            }
          } else {
            return;
          }
        }, 1);
      }
    }
  });

  if (cb) {
    cb(this.utils);
  } else {
    console.warn('No callback function supplied');
  }
};

window.Matcher = orbify;

},{"../assets/js/jsfeat.min.js":1,"../assets/utils/orb.detectKeypoints.js":2,"../assets/utils/orb.findTransform.js":3,"../assets/utils/orb.matchPattern.js":5,"../assets/utils/orb.renderCorners.js":7,"../assets/utils/orb.renderMatches.js":8,"path":10}],10:[function(require,module,exports){
(function (process){
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":11}],11:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],12:[function(require,module,exports){
Scrollgraph = function Scrollgraph(options) {
  ctx = createCanvas(options);

  // background
  ctx.fillStyle = '#eee';
  ctx.fillRect(0, 0, options.width, options.height);

//  ctx.moveTo(-options.width/2, -options.height/2);
  var img1 = drawImage(options.path1);
  var img2 = drawImage(options.path2, {x: 801, y: 0});

  setupMatcher(options);

  function createCanvas(canvasOptions) {
    var _ctx, canvas, height, width;
    canvasOptions.canvasId = canvasOptions.canvasId || "canvas";
    canvas = document.getElementById(canvasOptions.canvasId);
    _ctx = canvas.getContext("2d");
    width = canvasOptions.width || 1000;
    height = canvasOptions.height || 1000;
    canvas.width = width;
    canvas.height = height;
    $(canvas).css('height', $(canvas).width() + 'px');
    return _ctx;
  }

  function drawImage(src, offset) {
    var img = new Image();
    offset = offset || {x: 0, y: 0};
    img.onload = function loadImage() {
//      ctx.globalAlpha = 0.5;
      ctx.drawImage(
        img,
        0, 0,
        img.width,
        img.height,
        offset.x,
        offset.y,
        img.width,
        img.height
      );
    }
    img.src = src;
    return img;
  }

  function setupMatcher(matcherOptions) {
    require('../node_modules/matcher-core/src/orb.core.js');
    var matcher = new Matcher(matcherOptions.path1, matcherOptions.path2,
      async function onMatches(q) {
        var res = await q;
        console.log("points found", res);
        var points = sortByConfidence(res.matched_points);
        var angle = findAngle(points[0], points[1]);
        // this offset will only work for translation, not rotation
        var offset = getOffset(points[0]);
        var offset2 = getOffset(points[0]);

        //drawImage(matcherOptions.path2, offset);

setTimeout(function() {
        var ratio = img1.width / 512; // ratio of source image to pattern-matching cavas
console.log('ratio ', ratio, ' width: ', img1.width);

  ctx.font = '14px sans';
  ctx.globalAlpha = 1;

  points.forEach(function(p, i) {
    ctx.save();
    ctx.beginPath();

    var ratio2 = ratio / 1.25; // mysterious 1.25 factor off on 2nd image

    // first circle adjusted
    ctx.arc(p.x1 * ratio, p.y1 * ratio, 4, 0, Math.PI*2);
    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'red';

    ctx.moveTo(800 + p.x2 * ratio2, p.y2 * ratio2);
    ctx.lineTo(p.x1 * ratio, p.y1 * ratio);
    ctx.stroke();

    // second circle
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    ctx.arc(800 + p.x2 * ratio2, p.y2 * ratio2, 4, 0, Math.PI*2);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillText(i+'/'+parseInt(p.confidence.c1+p.confidence.c2), p.x1*options.xAdjust, p.y1*options.yAdjust);
    ctx.fill();

    ctx.restore();
});
},2500)

      },
      {
        browser: true,
        leniency: 30,
        dimensions: options.dimensions || [640, 480],
        params: {
          lap_thres: 30,
          eigen_thres: 35
        }
      }
    );
  }

  function sortByConfidence(points) {
    return points.sort(function(a, b) {
      if (a.confidence.c1 + a.confidence.c2 < b.confidence.c1 + b.confidence.c2) return 1;
      else return -1;
    });
  }

  function getOffset(points) {
    return {
      x: points.x1 - points.x2,
      y: points.y1 - points.y2,
    };
  }

  // in degrees; alternatively var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);
  // not doing this yet as we're only doing translation
  function findAngle(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;    
  }

  // currently as imageData
  function getCanvasAsImage() {
    return ctx.getImageData(0, 0, options.width || 1000, options.height || 1000);
  }

  return {
    getCanvasAsImage: getCanvasAsImage
  }
}

},{"../node_modules/matcher-core/src/orb.core.js":9}]},{},[12]);
