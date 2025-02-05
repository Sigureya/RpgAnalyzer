"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const S=101,M=401,te=102,oe=402,g=105,T=405,N=108,P=408,ae=111,se=117,ce=118,ne=119,me=121,de=122,ie=123,he=124,ue=125,f=132,F=133,le=134,xe=135,ge=136,pe=137,Te=138,E=139,k=140,fe=201,Fe=202,Ee=203,be=212,ye=223,Ce=224,we=225,Be=230,D=241,_=245,z=249,L=250,Ie=301,Ae=320,ve=322,Se=324,Me=325,Ne=353,W=355,G=655,p="bgm",H="se",d="me",R="bgs",b=(e,r)=>r?e===r.code:!1,Pe="MessageHeader invalid command",ke="Invalid Head",V=e=>typeof e[0]=="string"&&e.length===1,h=(e,r,t)=>{const o=[];for(let s=t;s<r.length;s++){const i=r[s];if(b(e,i)&&V(i.parameters))o.push({code:e,indent:i.indent,parameters:[i.parameters[0]]});else break}return o},j=(e,r,t)=>{const o=e[r];if(o&&b(t,o)&&V(o.parameters))return{code:t,indent:o.indent,parameters:[o.parameters[0]]};throw new Error(ke,{cause:o})},De=(e,r)=>({head:j(e,r,N),bodys:h(P,e,r+1)}),_e=(e,r)=>({head:j(e,r,W),bodys:h(G,e,r+1)}),ze=(e,r)=>{const t=e[r];if(t&&Le(t))return t;throw new Error(Pe,{cause:t})},Le=e=>!e||e.code!==S||![4,5].includes(e.parameters.length)?!1:typeof e.parameters[0]=="string"&&typeof e.parameters[1]=="number"&&typeof e.parameters[2]=="number"&&typeof e.parameters[3]=="number",We=(e,r)=>({head:ze(e,r),bodys:h(M,e,r+1)}),Ge="ScrollTextHeader invalid command",He=(e,r)=>{const t=e[r];if(b(g,t))return t;const o={headCode:g,bodyCode:T,index:r};throw new Error(Ge,{cause:o})},Re=(e,r)=>({head:He(e,r),bodys:h(T,e,r+1)}),Ve=(e,r=`
`)=>e.map(t=>t.parameters[0]).join(r);class J{constructor(r,t){this.header=r,this.bodies=t}getBodyText(r=`
`){return Ve(this.getExpandedBodies(),r)}jopinHedderAndBody(){return[this.header,...this.bodies]}joinCommandBodies(){return this.getExpandedBodies()}}class y extends J{constructor(r,t,o){super(t,o),this.bodyCode=r}getExpandedBodies(){return this.bodies}normalizedCommands(){const r={...this.header,code:this.header.code,indent:this.header.indent,parameters:[...this.header.parameters]};return this.bodies.length===0?[r]:[r,this.mergedBody()]}mergedBody(){return{code:this.bodyCode,indent:this.header.indent,parameters:[this.getBodyText()]}}}class O extends J{getExpandedBodies(){return[this.header,...this.bodies]}mergedBody(){return{code:this.header.code,indent:this.header.indent,parameters:[this.getBodyText()]}}normalizedCommands(){return[this.mergedBody()]}}const je="選択肢ヘルプ",Je=e=>e.parameters[0]===je,Oe=(e,r=[])=>new y(401,e,r),Qe=(e,r=[])=>new y(405,e,r),Ze=(e,r=[])=>Je(e)?new y(408,e,r):new O(e,r),Ke=(e,r=[])=>new O(e,r),Ue=(e,r,t)=>{const o=We(e,r),s=Oe(o.head,o.bodys);return t(s)},Ye=(e,r,t)=>{const o=Re(e,r),s=Qe(o.head,o.bodys);return t(s)},qe=(e,r,t)=>{const o=De(e,r),s=Ze(o.head,o.bodys);return t(s)},Xe=(e,r,t)=>{const o=_e(e,r),s=Ke(o.head,o.bodys);return t(s)},a=(e,r,t,o,s)=>o?o(e,r,t):s(e,r,t),C=(e,r)=>e.map((t,o)=>$e(e,o,r)),$e=(e,r,t)=>{const o=e[r];switch(o.code){case S:return t.showMessage?Ue(e,r,t.showMessage):t.other(o,r,e);case M:return a(o,r,e,t.showMessageBody,t.other);case g:return t.showScrollingText?Ye(e,r,t.showScrollingText):t.other(o,r,e);case T:return a(o,r,e,t.showScrollingTextBody,t.other);case N:return t.comment?qe(e,r,t.comment):t.other(o,r,e);case P:return a(o,r,e,t.commentBody,t.other);case W:return t.script?Xe(e,r,t.script):t.other(o,r,e);case G:return a(o,r,e,t.scriptBody,t.other);case me:return a(o,r,e,t.controlSwitch,t.other);case de:return a(o,r,e,t.controlVariable,t.other);case ie:return a(o,r,e,t.controlSelfSwitch,t.other);case he:return a(o,r,e,t.controlTimer,t.other);case ae:return a(o,r,e,t.conditionalBranch,t.other);case te:return a(o,r,e,t.showChoices,t.other);case oe:return a(o,r,e,t.choiceWhen,t.other);case Ae:return a(o,r,e,t.changeName,t.other);case Me:return a(o,r,e,t.changeProfile,t.other);case Se:return a(o,r,e,t.changeNickname,t.other);case se:return a(o,r,e,t.commonEvent,t.other);case ce:return a(o,r,e,t.label,t.other);case ne:return a(o,r,e,t.labelJump,t.other);case f:return a(o,r,e,t.changeBattleBGM,t.other);case F:return a(o,r,e,t.changeVictoryME,t.other);case E:return a(o,r,e,t.changeDefeatME,t.other);case le:return a(o,r,e,t.changeSaveAccess,t.other);case xe:return a(o,r,e,t.changeMenuAccess,t.other);case ge:return a(o,r,e,t.changeEncounter,t.other);case pe:return a(o,r,e,t.changeFormationAccess,t.other);case Te:return a(o,r,e,t.changeWindowColor,t.other);case ye:return a(o,r,e,t.tintScreen,t.other);case Ce:return a(o,r,e,t.flashScreen,t.other);case we:return a(o,r,e,t.shakeScreen,t.other);case Ie:return a(o,r,e,t.battleProcessing,t.other);case Be:return a(o,r,e,t.wait,t.other);case ve:return a(o,r,e,t.changeActorImages,t.other);case ue:return a(o,r,e,t.changeGold,t.other);case be:return a(o,r,e,t.showAnimation,t.other);case fe:return a(o,r,e,t.transferPlayer,t.other);case Fe:return a(o,r,e,t.setVehicleLocation,t.other);case Ee:return a(o,r,e,t.setEventLocation,t.other);case Ne:return a(o,r,e,t.gameover,t.other)}return t.other(o,r,e)},er={commentBody:()=>[],showMessageBody:()=>[],scriptBody:()=>[],showScrollingTextBody:()=>[],showMessage:e=>e.normalizedCommands(),showScrollingText:e=>e.normalizedCommands(),comment:e=>e.normalizedCommands(),script:e=>e.normalizedCommands(),other:e=>[e]},rr=e=>C(e,er),tr=e=>!!e,w=(e,r)=>e.pages.map((t,o)=>r(t,o,e)),or=(e,r)=>e.events.filter(tr).map(t=>w(t,r)),ar=(e,r)=>or(e,r).flat(2),sr=(e,r)=>e.map(t=>w(t,r)),cr=(e,r)=>e.map((t,o)=>r(t,o,t)),nr=()=>/<([^<>:]+):([^>]*)>/g,mr=(e,r)=>{const t=nr(),o=[];let s;for(;(s=t.exec(e))!==null;)o.push(r(s[1],s[2]));return o},dr=(e,r,t)=>r.map(o=>t(o,e[o],e)),Q=(e,r,t)=>dr(e,r,t),m=(e,r)=>({code:e.code,paramIndex:r,value:e.parameters[r]}),ir=e=>e.folder===H||e.folder===p||e.folder===R||e.folder===d,hr=[D,_,z,L,f,F,E,k],Z=e=>hr.includes(e.code),K=e=>({folder:ur(e)||"",fileName:e.parameters[0].name}),ur=e=>lr[e.code],lr={[D]:p,[_]:R,[z]:d,[L]:H,[f]:p,[F]:d,[E]:d,[k]:d},u=(e,r,t)=>e.list.filter(Z).map(o=>({code:o.code,path:K(o),pageIndex:r,eventId:t.id})),xr=e=>cr(e,u).flat(2),gr=e=>sr(e,u).flat(2),U=e=>({bgm:e.bgm,bgs:e.bgs,commands:ar(e,u)}),pr=e=>({map:U(e.map),filename:e.filename,editingName:e.editingName}),Tr=e=>({sounds:l(e.sounds),bgm:l([e.battleBgm,e.titleBgm]),me:l([e.defeatMe,e.gameoverMe,e.victoryMe])}),l=e=>e.map((r,t)=>({index:t,path:r.name})),Y=(e,r,t)=>({key:e,text:r,id:t.id}),c=(e,r)=>({main:Q(e,r,(t,o)=>Y(t,o,e)),note:B(e)}),B=e=>mr(e.note,(r,t)=>Y(r,t,e)),fr=e=>c(e,["name","nickname","profile"]),Fr=e=>c(e,["name"]),Er=e=>c(e,["name"]),br=e=>c(e,["name","description","message1","message2"]),yr=e=>c(e,["name","description"]),Cr=e=>c(e,["name","description"]),wr=e=>c(e,["name","description"]),Br=e=>c(e,["name","message1","message2","message3","message4"]),I=e=>{const r=rr(e).flat();return C(r,q)},A=e=>w(e,r=>I(r.list)),q={changeName:e=>[m(e,1)],changeNickname:e=>[m(e,1)],changeProfile:e=>[m(e,1)],showChoices:e=>$(e),showScrollingText:e=>[m(e.mergedBody(),0)],showMessage:e=>{const r=e.normalizedCommands(),t=m(r[0],4),o=r[1];return o?[t,m(o,0)]:[t]},choiceWhen(){return[]},comment(e){const r=e.mergedBody();return[m(r,0)]},script:e=>X(),other:()=>[],commentBody:()=>[]},X=e=>[],$=e=>e.parameters[0].map((r,t)=>({code:e.code,paramIndex:t,value:r})),Ir=e=>{const r=A(e);return{note:B(e),eventId:e.id,commands:r.flat(2)}},Ar=e=>{const r=A(e);return{troopId:e.id,commands:r.flat(2)}},vr=e=>({eventId:e.id,commands:I(e.list).flat(2)}),Sr=e=>C(e,Mr),n=(e,r,t)=>({folderName:t,command:m(e,r)}),Mr={changeActorImages:e=>[n(e,1,"characters"),n(e,3,"faces"),n(e,5,"sv_actors")],showPicture:e=>[n(e,1,"pictures")],changeBattleBackground:e=>[n(e,0,"battlebacks1"),n(e,1,"battlebacks2")],changeParallax:e=>[n(e,0,"parallaxes")],changeVehicleImage:e=>[n(e,1,"characters")],other:()=>[]},Nr=e=>({key:"battlerName",image:e.battlerName,id:e.id}),ee=(e,r,t)=>({key:e,image:r,id:t.id}),re=(e,r)=>Q(e,r,(t,o)=>ee(t,o,e)),Pr=e=>re(e,["characterName","faceName","battlerName"]),x=(e,r)=>({folder:"characters",key:r,image:e[r].characterName}),v=(e,r,t)=>({folder:t,key:r,image:e[r]}),kr=e=>[v(e,"title1Name","titles1"),v(e,"title2Name","titles2"),x(e,"boat"),x(e,"ship"),x(e,"airship")];exports.audioPathFromCommands=K;exports.collectAudioCommands=u;exports.commandChoice=$;exports.correctMapEventText=Ir;exports.expectAudioFromTroop=gr;exports.extractAudioCFromCommonEvents=xr;exports.extractAudioFromMap=U;exports.extractAudioFromMapFileInfo=pr;exports.extractImageData=re;exports.extractImageFromActor=Pr;exports.extractImageFromEnemy=Nr;exports.extractImageFromSystem=kr;exports.extractImagesFromCommands=Sr;exports.extractNoteText=B;exports.extractTextData=c;exports.extractTextFromActor=fr;exports.extractTextFromArmor=wr;exports.extractTextFromClass=Er;exports.extractTextFromCommonEvent=vr;exports.extractTextFromEnemy=Fr;exports.extractTextFromEventCommands=I;exports.extractTextFromEventPages=A;exports.extractTextFromItem=yr;exports.extractTextFromSkill=br;exports.extractTextFromState=Br;exports.extractTextFromTroop=Ar;exports.extractTextFromWeapon=Cr;exports.extractTextMapper=q;exports.extractedImageItem=ee;exports.isAudioCommand=Z;exports.isAudioResource=ir;exports.readScript=X;exports.systemAudioFiles=Tr;
//# sourceMappingURL=rpg-analyzer.cjs.js.map
