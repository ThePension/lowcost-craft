var ge=Object.defineProperty;var ye=(e,t,n)=>t in e?ge(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var u=(e,t,n)=>ye(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();var W=1e-6,D=typeof Float32Array<"u"?Float32Array:Array;Math.hypot||(Math.hypot=function(){for(var e=0,t=arguments.length;t--;)e+=arguments[t]*arguments[t];return Math.sqrt(e)});function q(){var e=new D(16);return D!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function we(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function Me(e,t,n){var r=t[0],s=t[1],i=t[2],a=t[3],o=t[4],c=t[5],p=t[6],h=t[7],l=t[8],m=t[9],f=t[10],E=t[11],M=t[12],x=t[13],b=t[14],B=t[15],d=n[0],g=n[1],y=n[2],w=n[3];return e[0]=d*r+g*o+y*l+w*M,e[1]=d*s+g*c+y*m+w*x,e[2]=d*i+g*p+y*f+w*b,e[3]=d*a+g*h+y*E+w*B,d=n[4],g=n[5],y=n[6],w=n[7],e[4]=d*r+g*o+y*l+w*M,e[5]=d*s+g*c+y*m+w*x,e[6]=d*i+g*p+y*f+w*b,e[7]=d*a+g*h+y*E+w*B,d=n[8],g=n[9],y=n[10],w=n[11],e[8]=d*r+g*o+y*l+w*M,e[9]=d*s+g*c+y*m+w*x,e[10]=d*i+g*p+y*f+w*b,e[11]=d*a+g*h+y*E+w*B,d=n[12],g=n[13],y=n[14],w=n[15],e[12]=d*r+g*o+y*l+w*M,e[13]=d*s+g*c+y*m+w*x,e[14]=d*i+g*p+y*f+w*b,e[15]=d*a+g*h+y*E+w*B,e}function xe(e,t,n){var r=n[0],s=n[1],i=n[2],a,o,c,p,h,l,m,f,E,M,x,b;return t===e?(e[12]=t[0]*r+t[4]*s+t[8]*i+t[12],e[13]=t[1]*r+t[5]*s+t[9]*i+t[13],e[14]=t[2]*r+t[6]*s+t[10]*i+t[14],e[15]=t[3]*r+t[7]*s+t[11]*i+t[15]):(a=t[0],o=t[1],c=t[2],p=t[3],h=t[4],l=t[5],m=t[6],f=t[7],E=t[8],M=t[9],x=t[10],b=t[11],e[0]=a,e[1]=o,e[2]=c,e[3]=p,e[4]=h,e[5]=l,e[6]=m,e[7]=f,e[8]=E,e[9]=M,e[10]=x,e[11]=b,e[12]=a*r+h*s+E*i+t[12],e[13]=o*r+l*s+M*i+t[13],e[14]=c*r+m*s+x*i+t[14],e[15]=p*r+f*s+b*i+t[15]),e}function Ee(e,t,n){var r=n[0],s=n[1],i=n[2];return e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e[3]=t[3]*r,e[4]=t[4]*s,e[5]=t[5]*s,e[6]=t[6]*s,e[7]=t[7]*s,e[8]=t[8]*i,e[9]=t[9]*i,e[10]=t[10]*i,e[11]=t[11]*i,e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e}function be(e,t,n,r,s){var i=1/Math.tan(t/2),a;return e[0]=i/n,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=i,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,s!=null&&s!==1/0?(a=1/(r-s),e[10]=(s+r)*a,e[14]=2*s*r*a):(e[10]=-1,e[14]=-2*r),e}var Pe=be;function ke(e,t,n,r){var s,i,a,o,c,p,h,l,m,f,E=t[0],M=t[1],x=t[2],b=r[0],B=r[1],d=r[2],g=n[0],y=n[1],w=n[2];return Math.abs(E-g)<W&&Math.abs(M-y)<W&&Math.abs(x-w)<W?we(e):(h=E-g,l=M-y,m=x-w,f=1/Math.hypot(h,l,m),h*=f,l*=f,m*=f,s=B*m-d*l,i=d*h-b*m,a=b*l-B*h,f=Math.hypot(s,i,a),f?(f=1/f,s*=f,i*=f,a*=f):(s=0,i=0,a=0),o=l*a-m*i,c=m*s-h*a,p=h*i-l*s,f=Math.hypot(o,c,p),f?(f=1/f,o*=f,c*=f,p*=f):(o=0,c=0,p=0),e[0]=s,e[1]=o,e[2]=h,e[3]=0,e[4]=i,e[5]=c,e[6]=l,e[7]=0,e[8]=a,e[9]=p,e[10]=m,e[11]=0,e[12]=-(s*E+i*M+a*x),e[13]=-(o*E+c*M+p*x),e[14]=-(h*E+l*M+m*x),e[15]=1,e)}function N(){var e=new D(3);return D!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e}function Be(e,t,n){var r=new D(3);return r[0]=e,r[1]=t,r[2]=n,r}function Ce(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e}function U(e,t,n,r){return e[0]=t[0]+n[0]*r,e[1]=t[1]+n[1]*r,e[2]=t[2]+n[2]*r,e}function Z(e,t){var n=t[0],r=t[1],s=t[2],i=n*n+r*r+s*s;return i>0&&(i=1/Math.sqrt(i)),e[0]=t[0]*i,e[1]=t[1]*i,e[2]=t[2]*i,e}function Se(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function Te(e,t,n){var r=t[0],s=t[1],i=t[2],a=n[0],o=n[1],c=n[2];return e[0]=s*c-i*o,e[1]=i*a-r*c,e[2]=r*o-s*a,e}(function(){var e=N();return function(t,n,r,s,i,a){var o,c;for(n||(n=3),r||(r=0),s?c=Math.min(s*n+r,t.length):c=t.length,o=r;o<c;o+=n)e[0]=t[o],e[1]=t[o+1],e[2]=t[o+2],i(e,e,a),t[o]=e[0],t[o+1]=e[1],t[o+2]=e[2];return t}})();class k{constructor(t,n,r,s){u(this,"position");u(this,"modelMatrix");u(this,"textureCoords");u(this,"faceMask");this.position=t,this.faceMask=s,this.modelMatrix=q(),xe(this.modelMatrix,this.modelMatrix,t),Ee(this.modelMatrix,this.modelMatrix,n),this.textureCoords=r}static calculateFaceMask(t,n,r,s){let i=0;return s.has(`${t+1},${n},${r}`)||(i|=this.FACE_RIGHT),s.has(`${t-1},${n},${r}`)||(i|=this.FACE_LEFT),s.has(`${t},${n+1},${r}`)||(i|=this.FACE_TOP),s.has(`${t},${n-1},${r}`)||(i|=this.FACE_BOTTOM),s.has(`${t},${n},${r+1}`)||(i|=this.FACE_FRONT),s.has(`${t},${n},${r-1}`)||(i|=this.FACE_BACK),i}}u(k,"cubeVertices",new Float32Array([-.5,-.5,.5,0,1,0,0,1,.5,-.5,.5,1,1,0,0,1,.5,.5,.5,1,0,0,0,1,-.5,.5,.5,0,0,0,0,1,-.5,-.5,-.5,0,1,0,0,-1,.5,-.5,-.5,1,1,0,0,-1,.5,.5,-.5,1,0,0,0,-1,-.5,.5,-.5,0,0,0,0,-1,-.5,.5,.5,-2,0,0,1,0,.5,.5,.5,-1,0,0,1,0,.5,.5,-.5,-1,1,0,1,0,-.5,.5,-.5,-2,1,0,1,0,-.5,-.5,.5,0,1,0,-1,0,.5,-.5,.5,1,1,0,-1,0,.5,-.5,-.5,1,0,0,-1,0,-.5,-.5,-.5,0,0,0,-1,0,.5,-.5,.5,0,1,1,0,0,.5,-.5,-.5,1,1,1,0,0,.5,.5,-.5,1,0,1,0,0,.5,.5,.5,0,0,1,0,0,-.5,-.5,.5,1,1,-1,0,0,-.5,-.5,-.5,0,1,-1,0,0,-.5,.5,-.5,0,0,-1,0,0,-.5,.5,.5,1,0,-1,0,0])),u(k,"FACE_FRONT",1),u(k,"FACE_BACK",2),u(k,"FACE_TOP",4),u(k,"FACE_BOTTOM",8),u(k,"FACE_RIGHT",16),u(k,"FACE_LEFT",32),u(k,"cubeIndices",new Uint16Array([0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23]));class Fe{constructor(){u(this,"position");u(this,"direction");u(this,"target");u(this,"up");u(this,"cameraSpeed",.5);u(this,"yaw",0);u(this,"pitch",0);u(this,"sensitivity",.002);u(this,"keysPressed",{});this.position=[0,0,0],this.direction=[0,0,0],this.target=[0,0,0],this.up=[0,1,0],window.addEventListener("keydown",t=>{this.keysPressed[t.key]=!0}),window.addEventListener("keyup",t=>{this.keysPressed[t.key]=!1}),document.addEventListener("click",()=>{document.body.requestPointerLock()}),window.addEventListener("mousemove",t=>this.hanbleMouseMoveEvent(t))}hanbleMouseMoveEvent(t){document.pointerLockElement===document.body&&(this.yaw+=t.movementX*this.sensitivity,this.pitch-=t.movementY*this.sensitivity,this.pitch=Math.max(-Math.PI/2,Math.min(Math.PI/2,this.pitch)))}updateCameraDirection(){this.direction=[Math.cos(this.pitch)*Math.cos(this.yaw),Math.sin(this.pitch),Math.cos(this.pitch)*Math.sin(this.yaw)],Ce(this.target,this.position,this.direction)}updateCameraPosition(){const t=N(),n=N(),r=[0,1,0];Z(t,this.direction),Te(n,t,r),Z(n,n),this.keysPressed.w&&U(this.position,this.position,t,this.cameraSpeed),this.keysPressed.s&&U(this.position,this.position,t,-this.cameraSpeed),this.keysPressed.a&&U(this.position,this.position,n,-this.cameraSpeed),this.keysPressed.d&&U(this.position,this.position,n,this.cameraSpeed),this.keysPressed[" "]&&U(this.position,this.position,r,this.cameraSpeed),this.keysPressed.Shift&&U(this.position,this.position,r,-this.cameraSpeed)}}class H{static async loadShaderModuleFromFile(t,n){const s=await(await fetch(n)).text();return t.createShaderModule({code:s})}static async loadAtlasTexture(t,n){const r=await fetch(n),s=await createImageBitmap(await r.blob()),i=t.createTexture({size:[s.width,s.height,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});return t.queue.copyExternalImageToTexture({source:s},{texture:i},[s.width,s.height]),i}}const fe=Math.sqrt(3),ve=.5*(fe-1),R=(3-fe)/6,ae=e=>Math.floor(e)|0,oe=new Float64Array([1,1,-1,1,1,-1,-1,-1,1,0,-1,0,1,0,-1,0,0,1,0,-1,0,1,0,-1]);function Ae(e=Math.random){const t=Ge(e),n=new Float64Array(t).map(s=>oe[s%12*2]),r=new Float64Array(t).map(s=>oe[s%12*2+1]);return function(i,a){let o=0,c=0,p=0;const h=(i+a)*ve,l=ae(i+h),m=ae(a+h),f=(l+m)*R,E=l-f,M=m-f,x=i-E,b=a-M;let B,d;x>b?(B=1,d=0):(B=0,d=1);const g=x-B+R,y=b-d+R,w=x-1+2*R,j=b-1+2*R,Y=l&255,X=m&255;let L=.5-x*x-b*b;if(L>=0){const T=Y+t[X],z=n[T],_=r[T];L*=L,o=L*L*(z*x+_*b)}let O=.5-g*g-y*y;if(O>=0){const T=Y+B+t[X+d],z=n[T],_=r[T];O*=O,c=O*O*(z*g+_*y)}let $=.5-w*w-j*j;if($>=0){const T=Y+1+t[X+1],z=n[T],_=r[T];$*=$,p=$*$*(z*w+_*j)}return 70*(o+c+p)}}function Ge(e){const n=new Uint8Array(512);for(let r=0;r<512/2;r++)n[r]=r;for(let r=0;r<512/2-1;r++){const s=r+~~(e()*(256-r)),i=n[r];n[r]=n[s],n[s]=i}for(let r=256;r<512;r++)n[r]=n[r-256];return n}const v=class v{constructor(){u(this,"noise2D");this.noise2D=Ae()}static get Instance(){return this._instance||(this._instance=new this)}getTerrainHeight(t,n){return Math.floor(this.noise2D(t*v.frequency,n*v.frequency)*v.amplitude)}};u(v,"amplitude",20),u(v,"frequency",.01),u(v,"_instance");let Q=v;class he{constructor(t,n=16){u(this,"chunk_size",16);u(this,"pos");u(this,"cubes");this.pos=t,this.cubes=new Map,this.chunk_size=n}generateChunk(){for(let t=0;t<this.chunk_size;t++)for(let n=0;n<this.chunk_size;n++){let r=t-this.chunk_size/2+this.pos[0],s=n-this.chunk_size/2+this.pos[1],i=Q.Instance.getTerrainHeight(r,s);for(let a=i;a>-3;a--){const o=[r,a,s];let c;a===i?c=[4,4]:a>i-3?c=[2,0]:c=[1,0];const p=new k(o,[1,1,1],c,0);this.addCube(r,a,s,p)}if(i<-2){const a=[r,-3,s],o=new k(a,[1,1,1],[0,0],0);this.addCube(r,-3,s,o)}}this.calculateFaceMasks(new Set([...this.cubes.keys()]))}addCube(t,n,r,s){this.cubes.set(`${t},${n},${r}`,s)}getCube(t,n,r){return this.cubes.get(`${t},${n},${r}`)}calculateFaceMasks(t){this.cubes.forEach(n=>{n.faceMask=k.calculateFaceMask(n.position[0],n.position[1],n.position[2],t)})}}const F=new Fe,Ue=16*4;let se,I,J,ee,le,V,ie,te,ue,ce,C,de,pe;const P=16,ne=new Map,A=10,S=new Map;let re=0;function Ie(e,t){const n=Math.floor(e/P),r=Math.floor(t/P);return`${n},${r}`}function Le(e,t,n){const r=e-e%P,s=t-t%P,i=new Set;for(let a=-A*P;a<=A*P;a+=P)for(let o=-A*P;o<=A*P;o+=P){const c=r+a,p=s+o,h=`${c},${p}`,l=Z(N(),Be(c-e,0,p-t)),m=Se(n,l);Math.acos(m)<=Math.PI/6&&i.add(h)}return i}const me=new Set;for(let e=-A*P;e<A*P;e+=P)for(let t=-A*P;t<A*P;t+=P){const n=Ie(e,t);if(!ne.has(n)){const r=new he([e,t]);r.generateChunk(),ne.set(n,r),S.set(n,r),r.cubes.keys().forEach(s=>{me.add(s)})}}ne.forEach(e=>e.calculateFaceMasks(me));function Oe(e){let t=0;if(S.forEach(r=>{t+=[...r.cubes].filter(([,s])=>s.faceMask>0).length}),t===0||t===re)return;re=t,C=new Float32Array(t*(4*4+2+1+1));let n=0;S.forEach(r=>{[...r.cubes].map(([,s])=>s).filter(s=>s.faceMask>0).forEach(s=>{const i=n*20;C.set(s.modelMatrix,i),C.set(s.textureCoords,i+4*4),C[i+4*4+2]=s.faceMask,n++})}),I=e.createBuffer({label:"instanceBuffer",size:C.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),ie=e.createBindGroup({layout:V,entries:[{binding:1,resource:{buffer:I}}]}),e.queue.writeBuffer(I,0,C)}function $e(e,t,n,r){const s=Le(t,n,r);s.forEach(i=>{if(!S.has(i)){const[a,o]=i.split(",").map(Number),c=new he([a,o]);c.generateChunk(),S.set(i,c)}}),S.forEach((i,a)=>{s.has(a)||S.delete(a)}),Oe(e)}function ze(e){let t=0;S.forEach(r=>{t+=r.cubes.size}),C=new Float32Array(t*(4*4+2+1+1)),se=e.createBuffer({label:"uniformBuffer",size:Ue,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),J=e.createBuffer({label:"vertexBuffer",size:k.cubeVertices.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});let n=0;S.forEach(r=>{r.cubes.forEach(s=>{const i=n*20;C.set(s.modelMatrix,i),C.set(s.textureCoords,i+4*4),C[i+4*4+2]=s.faceMask,n++})}),I=e.createBuffer({label:"instanceBuffer",size:C.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST})}function _e(e){ee=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}}]}),le=e.createBindGroup({layout:ee,entries:[{binding:0,resource:{buffer:se}}]}),V=e.createBindGroupLayout({entries:[{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}}]}),ie=e.createBindGroup({layout:V,entries:[{binding:1,resource:{buffer:I}}]}),te=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]}),ue=e.createBindGroup({layout:te,entries:[{binding:0,resource:de.createView()},{binding:1,resource:pe}]})}async function Re(e,t){ze(e),de=await H.loadAtlasTexture(e,"basic_atlas.png"),pe=e.createSampler({magFilter:"linear",minFilter:"linear"}),_e(e),ce=e.createTexture({size:[G.width,G.height],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT});const n=q();Pe(n,Math.PI/4,G.width/G.height,.1,500),e.queue.writeBuffer(I,0,C),e.queue.writeBuffer(J,0,k.cubeVertices);const r=e.createBuffer({size:k.cubeIndices.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(r,0,k.cubeIndices);const s=await H.loadShaderModuleFromFile(e,"shaders/vertex.wgsl"),i=await H.loadShaderModuleFromFile(e,"shaders/fragment.wgsl");function a(){const h=q();ke(h,F.position,F.target,F.up);const l=q();Me(l,n,h),e.queue.writeBuffer(se,0,l)}const o=e.createRenderPipeline({layout:e.createPipelineLayout({bindGroupLayouts:[ee,V,te]}),vertex:{module:s,entryPoint:"vertexMain",buffers:[{arrayStride:8*4,attributes:[{shaderLocation:0,offset:0,format:"float32x3"},{shaderLocation:1,offset:3*4,format:"float32x2"},{shaderLocation:2,offset:5*4,format:"float32x3"}]}]},fragment:{module:i,entryPoint:"fragmentMain",targets:[{format:navigator.gpu.getPreferredCanvasFormat()}]},primitive:{topology:"triangle-list",cullMode:"none"},depthStencil:{depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus"}});let c=0;function p(){F.updateCameraPosition(),$e(e,F.position[0],F.position[2],F.direction),F.updateCameraDirection(),a();const h=performance.now()/1e3,l=h-c;c=h;const m=performance.now(),f=e.createCommandEncoder(),E={colorAttachments:[{view:t.getCurrentTexture().createView(),loadOp:"clear",clearValue:{r:.5,g:.8,b:1,a:1},storeOp:"store"}],depthStencilAttachment:{view:ce.createView(),depthLoadOp:"clear",depthClearValue:1,depthStoreOp:"store"}},M=f.beginRenderPass(E);M.setPipeline(o),M.setVertexBuffer(0,J),M.setIndexBuffer(r,"uint16"),M.setBindGroup(0,le),M.setBindGroup(1,ie),M.setBindGroup(2,ue),M.drawIndexed(36,re,0,0,0),M.end(),e.queue.submit([f.finish()]);const x=performance.now()-m;De.textContent=`        fps: ${(1/l).toFixed(1)}
        js: ${x.toFixed(1)}ms
        `,requestAnimationFrame(p)}requestAnimationFrame(p)}const De=document.querySelector("#info"),G=document.querySelector("canvas");if(G===null)throw new Error("Canvas not found");const qe=window.innerWidth,Ne=window.innerHeight;G.width=qe;G.height=Ne;let K;navigator.gpu.requestAdapter().then(e=>{if(K=e,K===null)throw new Error("WebGPU not supported");let t=null;K.requestDevice().then(n=>{t=n;const r=G.getContext("webgpu");if(r===null)throw new Error("WebGPU context not found");r.configure({device:t,format:navigator.gpu.getPreferredCanvasFormat()}),Re(t,r)})});