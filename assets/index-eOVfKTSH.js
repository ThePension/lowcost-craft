var de=Object.defineProperty;var pe=(e,t,r)=>t in e?de(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var x=(e,t,r)=>pe(e,typeof t!="symbol"?t+"":t,r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=r(n);fetch(n.href,s)}})();var D=1e-6,k=typeof Float32Array<"u"?Float32Array:Array;Math.hypot||(Math.hypot=function(){for(var e=0,t=arguments.length;t--;)e+=arguments[t]*arguments[t];return Math.sqrt(e)});function R(){var e=new k(16);return k!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function ue(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function me(e,t,r){var i=t[0],n=t[1],s=t[2],a=t[3],o=t[4],l=t[5],M=t[6],f=t[7],h=t[8],y=t[9],c=t[10],P=t[11],g=t[12],w=t[13],v=t[14],B=t[15],d=r[0],p=r[1],u=r[2],m=r[3];return e[0]=d*i+p*o+u*h+m*g,e[1]=d*n+p*l+u*y+m*w,e[2]=d*s+p*M+u*c+m*v,e[3]=d*a+p*f+u*P+m*B,d=r[4],p=r[5],u=r[6],m=r[7],e[4]=d*i+p*o+u*h+m*g,e[5]=d*n+p*l+u*y+m*w,e[6]=d*s+p*M+u*c+m*v,e[7]=d*a+p*f+u*P+m*B,d=r[8],p=r[9],u=r[10],m=r[11],e[8]=d*i+p*o+u*h+m*g,e[9]=d*n+p*l+u*y+m*w,e[10]=d*s+p*M+u*c+m*v,e[11]=d*a+p*f+u*P+m*B,d=r[12],p=r[13],u=r[14],m=r[15],e[12]=d*i+p*o+u*h+m*g,e[13]=d*n+p*l+u*y+m*w,e[14]=d*s+p*M+u*c+m*v,e[15]=d*a+p*f+u*P+m*B,e}function ge(e,t,r){var i=r[0],n=r[1],s=r[2],a,o,l,M,f,h,y,c,P,g,w,v;return t===e?(e[12]=t[0]*i+t[4]*n+t[8]*s+t[12],e[13]=t[1]*i+t[5]*n+t[9]*s+t[13],e[14]=t[2]*i+t[6]*n+t[10]*s+t[14],e[15]=t[3]*i+t[7]*n+t[11]*s+t[15]):(a=t[0],o=t[1],l=t[2],M=t[3],f=t[4],h=t[5],y=t[6],c=t[7],P=t[8],g=t[9],w=t[10],v=t[11],e[0]=a,e[1]=o,e[2]=l,e[3]=M,e[4]=f,e[5]=h,e[6]=y,e[7]=c,e[8]=P,e[9]=g,e[10]=w,e[11]=v,e[12]=a*i+f*n+P*s+t[12],e[13]=o*i+h*n+g*s+t[13],e[14]=l*i+y*n+w*s+t[14],e[15]=M*i+c*n+v*s+t[15]),e}function ye(e,t,r){var i=r[0],n=r[1],s=r[2];return e[0]=t[0]*i,e[1]=t[1]*i,e[2]=t[2]*i,e[3]=t[3]*i,e[4]=t[4]*n,e[5]=t[5]*n,e[6]=t[6]*n,e[7]=t[7]*n,e[8]=t[8]*s,e[9]=t[9]*s,e[10]=t[10]*s,e[11]=t[11]*s,e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e}function we(e,t,r,i,n){var s=1/Math.tan(t/2),a;return e[0]=s/r,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=s,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,n!=null&&n!==1/0?(a=1/(i-n),e[10]=(n+i)*a,e[14]=2*n*i*a):(e[10]=-1,e[14]=-2*i),e}var xe=we;function Me(e,t,r,i){var n,s,a,o,l,M,f,h,y,c,P=t[0],g=t[1],w=t[2],v=i[0],B=i[1],d=i[2],p=r[0],u=r[1],m=r[2];return Math.abs(P-p)<D&&Math.abs(g-u)<D&&Math.abs(w-m)<D?ue(e):(f=P-p,h=g-u,y=w-m,c=1/Math.hypot(f,h,y),f*=c,h*=c,y*=c,n=B*y-d*h,s=d*f-v*y,a=v*h-B*f,c=Math.hypot(n,s,a),c?(c=1/c,n*=c,s*=c,a*=c):(n=0,s=0,a=0),o=h*a-y*s,l=y*n-f*a,M=f*s-h*n,c=Math.hypot(o,l,M),c?(c=1/c,o*=c,l*=c,M*=c):(o=0,l=0,M=0),e[0]=n,e[1]=o,e[2]=f,e[3]=0,e[4]=s,e[5]=l,e[6]=h,e[7]=0,e[8]=a,e[9]=M,e[10]=y,e[11]=0,e[12]=-(n*P+s*g+a*w),e[13]=-(o*P+l*g+M*w),e[14]=-(f*P+h*g+y*w),e[15]=1,e)}function H(){var e=new k(3);return k!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e}function Pe(e,t,r){return e[0]=t[0]+r[0],e[1]=t[1]+r[1],e[2]=t[2]+r[2],e}function b(e,t,r,i){return e[0]=t[0]+r[0]*i,e[1]=t[1]+r[1]*i,e[2]=t[2]+r[2]*i,e}function ee(e,t){var r=t[0],i=t[1],n=t[2],s=r*r+i*i+n*n;return s>0&&(s=1/Math.sqrt(s)),e[0]=t[0]*s,e[1]=t[1]*s,e[2]=t[2]*s,e}function ve(e,t,r){var i=t[0],n=t[1],s=t[2],a=r[0],o=r[1],l=r[2];return e[0]=n*l-s*o,e[1]=s*a-i*l,e[2]=i*o-n*a,e}(function(){var e=H();return function(t,r,i,n,s,a){var o,l;for(r||(r=3),i||(i=0),n?l=Math.min(n*r+i,t.length):l=t.length,o=i;o<l;o+=r)e[0]=t[o],e[1]=t[o+1],e[2]=t[o+2],s(e,e,a),t[o]=e[0],t[o+1]=e[1],t[o+2]=e[2];return t}})();class E{constructor(t,r,i,n){x(this,"position");x(this,"modelMatrix");x(this,"textureCoords");x(this,"faceMask");this.position=t,this.faceMask=n,this.modelMatrix=R(),ge(this.modelMatrix,this.modelMatrix,t),ye(this.modelMatrix,this.modelMatrix,r),this.textureCoords=i}static calculateFaceMask(t,r,i,n){let s=0;return n.has(`${t+1},${r},${i}`)||(s|=this.FACE_RIGHT),n.has(`${t-1},${r},${i}`)||(s|=this.FACE_LEFT),n.has(`${t},${r+1},${i}`)||(s|=this.FACE_TOP),n.has(`${t},${r-1},${i}`)||(s|=this.FACE_BOTTOM),n.has(`${t},${r},${i+1}`)||(s|=this.FACE_FRONT),n.has(`${t},${r},${i-1}`)||(s|=this.FACE_BACK),s}}x(E,"cubeVertices",new Float32Array([-.5,-.5,.5,0,1,0,0,1,.5,-.5,.5,1,1,0,0,1,.5,.5,.5,1,0,0,0,1,-.5,.5,.5,0,0,0,0,1,-.5,-.5,-.5,0,1,0,0,-1,.5,-.5,-.5,1,1,0,0,-1,.5,.5,-.5,1,0,0,0,-1,-.5,.5,-.5,0,0,0,0,-1,-.5,.5,.5,-2,0,0,1,0,.5,.5,.5,-1,0,0,1,0,.5,.5,-.5,-1,1,0,1,0,-.5,.5,-.5,-2,1,0,1,0,-.5,-.5,.5,0,1,0,-1,0,.5,-.5,.5,1,1,0,-1,0,.5,-.5,-.5,1,0,0,-1,0,-.5,-.5,-.5,0,0,0,-1,0,.5,-.5,.5,0,1,1,0,0,.5,-.5,-.5,1,1,1,0,0,.5,.5,-.5,1,0,1,0,0,.5,.5,.5,0,0,1,0,0,-.5,-.5,.5,1,1,-1,0,0,-.5,-.5,-.5,0,1,-1,0,0,-.5,.5,-.5,0,0,-1,0,0,-.5,.5,.5,1,0,-1,0,0])),x(E,"FACE_FRONT",1),x(E,"FACE_BACK",2),x(E,"FACE_TOP",4),x(E,"FACE_BOTTOM",8),x(E,"FACE_RIGHT",16),x(E,"FACE_LEFT",32),x(E,"cubeIndices",new Uint16Array([0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23]));class Ee{constructor(){x(this,"position");x(this,"direction");x(this,"target");x(this,"up");x(this,"cameraSpeed",.5);x(this,"yaw",0);x(this,"pitch",0);x(this,"sensitivity",.002);x(this,"keysPressed",{});this.position=[0,0,0],this.direction=[0,0,0],this.target=[0,0,0],this.up=[0,1,0],window.addEventListener("keydown",t=>{this.keysPressed[t.key]=!0}),window.addEventListener("keyup",t=>{this.keysPressed[t.key]=!1}),document.addEventListener("click",()=>{document.body.requestPointerLock()}),window.addEventListener("mousemove",t=>this.hanbleMouseMoveEvent(t))}hanbleMouseMoveEvent(t){document.pointerLockElement===document.body&&(this.yaw+=t.movementX*this.sensitivity,this.pitch-=t.movementY*this.sensitivity,this.pitch=Math.max(-Math.PI/2,Math.min(Math.PI/2,this.pitch)))}updateCameraDirection(){this.direction=[Math.cos(this.pitch)*Math.cos(this.yaw),Math.sin(this.pitch),Math.cos(this.pitch)*Math.sin(this.yaw)],Pe(this.target,this.position,this.direction)}updateCameraPosition(){const t=H(),r=H(),i=[0,1,0];ee(t,this.direction),ve(r,t,i),ee(r,r),this.keysPressed.w&&b(this.position,this.position,t,this.cameraSpeed),this.keysPressed.s&&b(this.position,this.position,t,-this.cameraSpeed),this.keysPressed.a&&b(this.position,this.position,r,-this.cameraSpeed),this.keysPressed.d&&b(this.position,this.position,r,this.cameraSpeed),this.keysPressed[" "]&&b(this.position,this.position,i,this.cameraSpeed),this.keysPressed.Shift&&b(this.position,this.position,i,-this.cameraSpeed)}}class V{static async loadShaderModuleFromFile(t,r){const n=await(await fetch(r)).text();return t.createShaderModule({code:n})}static async loadAtlasTexture(t,r){const i=await fetch(r),n=await createImageBitmap(await i.blob()),s=t.createTexture({size:[n.width,n.height,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});return t.queue.copyExternalImageToTexture({source:n},{texture:s},[n.width,n.height]),s}}const se=Math.sqrt(3),Te=.5*(se-1),$=(3-se)/6,te=e=>Math.floor(e)|0,re=new Float64Array([1,1,-1,1,1,-1,-1,-1,1,0,-1,0,1,0,-1,0,0,1,0,-1,0,1,0,-1]);function Be(e=Math.random){const t=Fe(e),r=new Float64Array(t).map(n=>re[n%12*2]),i=new Float64Array(t).map(n=>re[n%12*2+1]);return function(s,a){let o=0,l=0,M=0;const f=(s+a)*Te,h=te(s+f),y=te(a+f),c=(h+y)*$,P=h-c,g=y-c,w=s-P,v=a-g;let B,d;w>v?(B=1,d=0):(B=0,d=1);const p=w-B+$,u=v-d+$,m=w-1+2*$,I=v-1+2*$,q=h&255,N=y&255;let G=.5-w*w-v*v;if(G>=0){const F=q+t[N],L=r[F],O=i[F];G*=G,o=G*G*(L*w+O*v)}let U=.5-p*p-u*u;if(U>=0){const F=q+B+t[N+d],L=r[F],O=i[F];U*=U,l=U*U*(L*p+O*u)}let C=.5-m*m-I*I;if(C>=0){const F=q+1+t[N+1],L=r[F],O=i[F];C*=C,M=C*C*(L*m+O*I)}return 70*(o+l+M)}}function Fe(e){const r=new Uint8Array(512);for(let i=0;i<512/2;i++)r[i]=i;for(let i=0;i<512/2-1;i++){const n=i+~~(e()*(256-i)),s=r[i];r[i]=r[n],r[n]=s}for(let i=256;i<512;i++)r[i]=r[i-256];return r}const Ae=Be(),z=new Ee,Se=16*4;let J,Z,X,W,ae,K,oe,Q,ce,ie,T=[],A,le,fe;const _=300,j=-10,be=20,ne=.01,he=new Map;for(let e=0;e<_;e++)for(let t=0;t<_;t++){let r=e-_/2,i=t-_/2,n=Ae(r*ne,i*ne)*be;n=Math.floor(n);for(let s=j;s<=n;s++){const a=[r,s,i];let o;s===n?o=[4,4]:s>n-3?o=[2,0]:o=[1,0];const l=new E(a,[1,1,1],o,0);he.set(`${r},${s},${i}`,l),T.push(l)}n<j&&T.push(new E([r,j,i],[1,1,1],[2,0],0))}for(let e=0;e<T.length;e++)T[e].faceMask=E.calculateFaceMask(T[e].position[0],T[e].position[1],T[e].position[2],he);function Ge(e){A=new Float32Array(T.length*(4*4+2+1+1)),J=e.createBuffer({label:"uniformBuffer",size:Se,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),X=e.createBuffer({label:"vertexBuffer",size:E.cubeVertices.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});for(let t=0;t<T.length;t++)A.set(T[t].modelMatrix,t*(4*4+2+1+1)),A.set(T[t].textureCoords,t*(4*4+2+1+1)+4*4),A[t*(4*4+2+1+1)+4*4+2]=T[t].faceMask;Z=e.createBuffer({label:"instanceBuffer",size:A.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST})}function Ue(e){W=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}}]}),ae=e.createBindGroup({layout:W,entries:[{binding:0,resource:{buffer:J}}]}),K=e.createBindGroupLayout({entries:[{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage",minBindingSize:A.byteLength}}]}),oe=e.createBindGroup({layout:K,entries:[{binding:1,resource:{buffer:Z,size:A.byteLength}}]}),Q=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]}),ce=e.createBindGroup({layout:Q,entries:[{binding:0,resource:le.createView()},{binding:1,resource:fe}]})}async function Ce(e,t){Ge(e),le=await V.loadAtlasTexture(e,"basic_atlas.png"),fe=e.createSampler({magFilter:"linear",minFilter:"linear"}),Ue(e),ie=e.createTexture({size:[S.width,S.height],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT});const r=R();xe(r,Math.PI/4,S.width/S.height,.1,500),e.queue.writeBuffer(Z,0,A),e.queue.writeBuffer(X,0,E.cubeVertices);const i=e.createBuffer({size:E.cubeIndices.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(i,0,E.cubeIndices);const n=await V.loadShaderModuleFromFile(e,"shaders/vertex.wgsl"),s=await V.loadShaderModuleFromFile(e,"shaders/fragment.wgsl");function a(){const f=R();Me(f,z.position,z.target,z.up);const h=R();me(h,r,f),e.queue.writeBuffer(J,0,h)}const o=e.createRenderPipeline({layout:e.createPipelineLayout({bindGroupLayouts:[W,K,Q]}),vertex:{module:n,entryPoint:"vertexMain",buffers:[{arrayStride:8*4,attributes:[{shaderLocation:0,offset:0,format:"float32x3"},{shaderLocation:1,offset:3*4,format:"float32x2"},{shaderLocation:2,offset:5*4,format:"float32x3"}]}]},fragment:{module:s,entryPoint:"fragmentMain",targets:[{format:navigator.gpu.getPreferredCanvasFormat()}]},primitive:{topology:"triangle-list",cullMode:"none"},depthStencil:{depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus"}});let l=0;function M(){z.updateCameraPosition(),z.updateCameraDirection(),a();const f=performance.now()/1e3,h=f-l;l=f;const y=performance.now(),c=e.createCommandEncoder(),P={colorAttachments:[{view:t.getCurrentTexture().createView(),loadOp:"clear",clearValue:{r:.5,g:.8,b:1,a:1},storeOp:"store"}],depthStencilAttachment:{view:ie.createView(),depthLoadOp:"clear",depthClearValue:1,depthStoreOp:"store"}},g=c.beginRenderPass(P);g.setPipeline(o),g.setVertexBuffer(0,X),g.setIndexBuffer(i,"uint16"),g.setBindGroup(0,ae),g.setBindGroup(1,oe),g.setBindGroup(2,ce),g.drawIndexed(36,T.length,0,0,0),g.end(),e.queue.submit([c.finish()]);const w=performance.now()-y;Le.textContent=`        fps: ${(1/h).toFixed(1)}
        js: ${w.toFixed(1)}ms
        `,requestAnimationFrame(M)}requestAnimationFrame(M)}const Le=document.querySelector("#info"),S=document.querySelector("canvas");if(S===null)throw new Error("Canvas not found");const Oe=window.innerWidth,$e=window.innerHeight;S.width=Oe;S.height=$e;let Y;navigator.gpu.requestAdapter().then(e=>{if(Y=e,Y===null)throw new Error("WebGPU not supported");let t=null;Y.requestDevice().then(r=>{t=r;const i=S.getContext("webgpu");if(i===null)throw new Error("WebGPU context not found");i.configure({device:t,format:navigator.gpu.getPreferredCanvasFormat()}),Ce(t,i)})});
