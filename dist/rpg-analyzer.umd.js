(function(o,l){typeof exports=="object"&&typeof module<"u"?l(exports):typeof define=="function"&&define.amd?define(["exports"],l):(o=typeof globalThis<"u"?globalThis:o||self,l(o.RpgAnalyzer={}))})(this,function(o){"use strict";const x="bgm",w="se",d="me",S="bgs",le="characters",b=(e,r)=>r?e===r.code:!1,he="MessageHeader invalid command",ge="Invalid Head",V=e=>typeof e[0]=="string"&&e.length===1,h=(e,r,t)=>{const a=[];for(let n=t;n<r.length;n++){const f=r[n];if(b(e,f)&&V(f.parameters))a.push({code:e,indent:f.indent,parameters:[f.parameters[0]]});else break}return a},P=(e,r,t)=>{const a=e[r];if(a&&b(t,a)&&V(a.parameters))return{code:t,indent:a.indent,parameters:[a.parameters[0]]};throw new Error(ge,{cause:a})},Ee=(e,r)=>({head:P(e,r,108),bodys:h(408,e,r+1)}),fe=(e,r)=>({head:P(e,r,355),bodys:h(655,e,r+1)}),xe=(e,r)=>{const t=e[r];if(t&&be(t))return t;throw new Error(he,{cause:t})},be=e=>!e||e.code!==101||![4,5].includes(e.parameters.length)?!1:typeof e.parameters[0]=="string"&&typeof e.parameters[1]=="number"&&typeof e.parameters[2]=="number"&&typeof e.parameters[3]=="number",pe=(e,r)=>({head:xe(e,r),bodys:h(401,e,r+1)}),Ce="ScrollTextHeader invalid command",Ie=(e,r)=>{const t=e[r];if(b(105,t))return t;const a={headCode:105,bodyCode:405,index:r};throw new Error(Ce,{cause:a})},Fe=(e,r)=>({head:Ie(e,r),bodys:h(405,e,r+1)}),Te=(e,r=`
`)=>e.map(t=>t.parameters[0]).join(r);class R{constructor(r,t){this.header=r,this.bodies=t}getBodyText(r=`
`){return Te(this.getExpandedBodies(),r)}jopinHedderAndBody(){return[this.header,...this.bodies]}joinCommandBodies(){return this.getExpandedBodies()}}class p extends R{constructor(r,t,a){super(t,a),this.bodyCode=r}getExpandedBodies(){return this.bodies}normalizedCommands(){const r={...this.header,code:this.header.code,indent:this.header.indent,parameters:[...this.header.parameters]};return this.bodies.length===0?[r]:[r,this.mergedBody()]}mergedBody(){return{code:this.bodyCode,indent:this.header.indent,parameters:[this.getBodyText()]}}}class _ extends R{getExpandedBodies(){return[this.header,...this.bodies]}mergedBody(){return{code:this.header.code,indent:this.header.indent,parameters:[this.getBodyText()]}}normalizedCommands(){return[this.mergedBody()]}}const ve="選択肢ヘルプ",ye=e=>e.parameters[0]===ve,Ae=(e,r=[])=>new p(401,e,r),Be=(e,r=[])=>new p(405,e,r),Ne=(e,r=[])=>ye(e)?new p(408,e,r):new _(e,r),Me=(e,r=[])=>new _(e,r),we=(e,r,t)=>{const a=pe(e,r),n=Ae(a.head,a.bodys);return t(n)},Se=(e,r,t)=>{const a=Fe(e,r),n=Be(a.head,a.bodys);return t(n)},Ve=(e,r,t)=>{const a=Ee(e,r),n=Ne(a.head,a.bodys);return t(n)},Pe=(e,r,t)=>{const a=fe(e,r),n=Me(a.head,a.bodys);return t(n)},c=(e,r,t,a,n)=>a?a(e,r,t):n(e,r,t),C=(e,r)=>e.map((t,a)=>W(e,a,r)),Re=(e,r)=>e.flatMap((t,a)=>W(e,a,r)),W=(e,r,t)=>{const a=e[r];switch(a.code){case 101:return t.showMessage?we(e,r,t.showMessage):t.other(a,r,e);case 401:return c(a,r,e,t.showMessageBody,t.other);case 105:return t.showScrollingText?Se(e,r,t.showScrollingText):t.other(a,r,e);case 405:return c(a,r,e,t.showScrollingTextBody,t.other);case 102:return c(a,r,e,t.showChoices,t.other);case 402:return c(a,r,e,t.choiceWhen,t.other);case 108:return t.comment?Ve(e,r,t.comment):t.other(a,r,e);case 408:return c(a,r,e,t.commentBody,t.other);case 355:return t.script?Pe(e,r,t.script):t.other(a,r,e);case 655:return c(a,r,e,t.scriptBody,t.other);case 111:return c(a,r,e,t.conditionalBranch,t.other);case 121:return c(a,r,e,t.controlSwitch,t.other);case 122:return c(a,r,e,t.controlVariable,t.other);case 123:return c(a,r,e,t.controlSelfSwitch,t.other);case 124:return c(a,r,e,t.controlTimer,t.other);case 117:return c(a,r,e,t.commonEvent,t.other);case 134:return c(a,r,e,t.changeSaveAccess,t.other);case 135:return c(a,r,e,t.changeMenuAccess,t.other);case 136:return c(a,r,e,t.changeEncounter,t.other);case 137:return c(a,r,e,t.changeFormationAccess,t.other);case 320:return c(a,r,e,t.changeName,t.other);case 325:return c(a,r,e,t.changeProfile,t.other);case 324:return c(a,r,e,t.changeNickname,t.other);case 322:return c(a,r,e,t.changeActorImages,t.other);case 323:return c(a,r,e,t.changeVehicleImage,t.other);case 132:return c(a,r,e,t.changeBattleBGM,t.other);case 133:return c(a,r,e,t.changeVictoryME,t.other);case 139:return c(a,r,e,t.changeDefeatME,t.other);case 241:return c(a,r,e,t.playBGM,t.other);case 242:return c(a,r,e,t.fadeOutBGM,t.other);case 250:return c(a,r,e,t.playSE,t.other);case 251:return c(a,r,e,t.stopSE,t.other);case 249:return c(a,r,e,t.playME,t.other);case 118:return c(a,r,e,t.label,t.other);case 119:return c(a,r,e,t.labelJump,t.other);case 138:return c(a,r,e,t.changeWindowColor,t.other);case 223:return c(a,r,e,t.tintScreen,t.other);case 224:return c(a,r,e,t.flashScreen,t.other);case 225:return c(a,r,e,t.shakeScreen,t.other);case 231:return c(a,r,e,t.showPicture,t.other);case 232:return c(a,r,e,t.movePicture,t.other);case 233:return c(a,r,e,t.rotatePicture,t.other);case 234:return c(a,r,e,t.tintPicture,t.other);case 235:return c(a,r,e,t.erasePicture,t.other);case 301:return c(a,r,e,t.battleProcessing,t.other);case 230:return c(a,r,e,t.wait,t.other);case 353:return c(a,r,e,t.gameover,t.other);case 284:return c(a,r,e,t.changeParallax,t.other);case 283:return c(a,r,e,t.changeBattleBackground,t.other);case 261:return c(a,r,e,t.playMovie,t.other);case 211:return c(a,r,e,t.changeTransparency,t.other);case 236:return c(a,r,e,t.setWeatherEffects,t.other);case 125:return c(a,r,e,t.changeGold,t.other);case 212:return c(a,r,e,t.showAnimation,t.other);case 201:return c(a,r,e,t.transferPlayer,t.other);case 202:return c(a,r,e,t.setVehicleLocation,t.other);case 203:return c(a,r,e,t.setEventLocation,t.other);default:return t.other(a,r,e)}},_e={commentBody:()=>[],showMessageBody:()=>[],scriptBody:()=>[],showScrollingTextBody:()=>[],showMessage:e=>e.normalizedCommands(),showScrollingText:e=>e.normalizedCommands(),comment:e=>e.normalizedCommands(),script:e=>e.normalizedCommands(),other:e=>[e]},We=e=>C(e,_e),ke=e=>!!e,I=(e,r)=>e.pages.map((t,a)=>r(t,a,e)),k=(e,r)=>e.events.filter(ke).map(t=>I(t,r)),L=(e,r)=>k(e,r).flat(2),D=(e,r)=>e.map(t=>I(t,r)),G=(e,r)=>e.map(t=>r(t,0,t)),O=(e,r)=>r.includes(e.code),z=e=>O(e,Le),Le=[241,245,249,250,132,133,139,140],j=e=>O(e,De),De=[101,231,322,323,284,283],i=(e,r)=>({code:e.code,paramIndex:r,value:e.parameters[r]}),Ge=()=>/<([^<>:]+):([^>]*)>/g,Oe=(e,r)=>{const t=Ge(),a=[];let n;for(;(n=t.exec(e))!==null;)a.push(r(n[1],n[2]));return a},ze=(e,r,t)=>r.map(a=>t(a,e[a],e)),je=(e,r,t)=>ze(e,r,t),He=e=>e.folder===w||e.folder===x||e.folder===S||e.folder===d,H=e=>({code:e.code,path:F(e)}),F=e=>({folder:Je(e)||"",fileName:e.parameters[0].name}),Je=e=>Ye[e.code],Ye={241:x,245:S,249:d,250:w,132:x,133:d,139:d,140:d},g=(e,r,t)=>e.list.filter(z).map(a=>({code:a.code,path:F(a),pageIndex:r,eventId:t.id})),J=e=>e.filter(z).map(H),Qe=e=>G(e,g).flat(2),qe=e=>D(e,g).flat(2),Y=e=>({bgm:e.bgm,bgs:e.bgs,commands:L(e,g)}),Ke=e=>({map:Y(e.map),filename:e.filename,editingName:e.editingName}),Xe=e=>({sounds:T(e.sounds),bgm:T([e.battleBgm,e.titleBgm]),me:T([e.defeatMe,e.gameoverMe,e.victoryMe])}),T=e=>e.map((r,t)=>({index:t,path:r.name})),Q=(e,r,t)=>({key:e,text:r,id:t.id}),s=(e,r)=>({main:je(e,r,(t,a)=>Q(t,a,e)),note:v(e)}),v=e=>Oe(e.note,(r,t)=>Q(r,t,e)),Ue=e=>s(e,["name","nickname","profile"]),Ze=e=>s(e,["name"]),$e=e=>s(e,["name"]),er=e=>s(e,["name","description","message1","message2"]),rr=e=>s(e,["name","description"]),tr=e=>s(e,["name","description"]),ar=e=>s(e,["name","description"]),or=e=>s(e,["name","message1","message2","message3","message4"]),u=e=>{const r=We(e).flat();return C(r,q)},y=e=>I(e,r=>u(r.list)),q={changeName:e=>[i(e,1)],changeNickname:e=>[i(e,1)],changeProfile:e=>[i(e,1)],showChoices:e=>X(e),showScrollingText:e=>[i(e.mergedBody(),0)],showMessage:e=>{const r=e.normalizedCommands(),t=i(r[0],4),a=r[1];return a?[t,i(a,0)]:[t]},choiceWhen(){return[]},comment(e){const r=e.mergedBody();return[i(r,0)]},script:e=>K(),other:()=>[],commentBody:()=>[]},K=e=>[],X=e=>e.parameters[0].map((r,t)=>({code:e.code,paramIndex:t,value:r})),cr=(e,r,t)=>{const a=u(e.list);return{eventId:t.id,pageIndex:r,commands:a.flat()}},nr=e=>{const r=y(e);return{note:v(e),eventId:e.id,commands:r.flat(2)}},sr=e=>{const r=y(e);return{troopId:e.id,commands:r.flat(2)}},mr=e=>({eventId:e.id,commands:u(e.list).flat(2)}),ir=e=>({key:"battlerName",image:e.battlerName,id:e.id}),A=(e,r,t)=>({folder:t,key:r,image:e[r],id:e.id}),dr=e=>[A(e,"faceName","faces"),A(e,"characterName","characters"),A(e,"battlerName","sv_actors")],B=(e,r)=>({folder:"characters",key:r,image:e[r].characterName}),U=(e,r,t)=>({folder:t,key:r,image:e[r]}),ur=e=>[U(e,"title1Name","titles1"),U(e,"title2Name","titles2"),B(e,"boat"),B(e,"ship"),B(e,"airship")],Z=e=>C(e,ee),$=e=>Re(e.filter(j),ee),m=(e,r,t)=>({folderName:t,parameter:i(e,r)}),ee={showMessage:e=>[m(e.header,0,"faces")],changeActorImages:e=>[m(e,1,"characters"),m(e,3,"faces"),m(e,5,"sv_actors")],showPicture:e=>[m(e,1,"pictures")],changeBattleBackground:e=>[m(e,0,"battlebacks1"),m(e,1,"battlebacks2")],changeParallax:e=>[m(e,0,"parallaxes")],changeVehicleImage:e=>[m(e,1,"characters")],other:()=>[]},re=(e,r,t)=>Z(e.list.filter(j)).flatMap(n=>hr(n,r,t)),lr=(e,r,t)=>({folderName:e.folderName,command:e.parameter,eventId:r.id,pageIndex:t,eventName:r.name}),hr=(e,r,t)=>e.map(a=>lr(a,t,r)),gr=e=>({commands:L(e,re),background1:{folderName:"battlebacks1",fileName:e.battleback1Name},background2:{folderName:"battlebacks2",fileName:e.battleback2Name},parallax:{folderName:"parallaxes",fileName:e.parallaxName}}),te=e=>({folderName:le,fileName:e.characterName}),Er=1,fr={331:2,332:2,201:0,202:1,285:2,301:0},xr={331:[4],332:[4],201:[1,2,3],202:[2,3,4],285:[0],301:[1]},N=e=>e.filter(oe).flatMap(ae),ae=e=>{const r=xr[e.code];if(r===void 0)throw new Error(`code${e.code} is not supported`);return r.map(t=>({eventCode:e.code,index:t,variableId:e.parameters[t]}))},oe=e=>{const r=fr[e.code];return r===void 0?!1:e.parameters[r]===Er},ce=e=>e.flatMap(r=>ne(r)?se(r):[]),ne=e=>e.code===103||e.code===104||e.code===285||e.code===122,se=e=>e.code===122?me(e):[{variableId:e.parameters[0],code:e.code}],me=e=>{const r=e.parameters[0],t=e.parameters[1];return Array.from({length:t-r+1},(a,n)=>({variableId:n+r,code:122}))},M=e=>({variableId:e.variableId,valid:e.variableValid,value:e.variableValue}),E=(e,r,t)=>{const a=N(e.list);return{pageIndex:r,eventId:t.id,commands:a}},br=e=>k(e,(r,t,a)=>({page:E(r,t,a),conditions:M(r.conditions)})).flat(2),pr=e=>G(e,E),Cr=e=>D(e,E),ie=e=>e.reduce((r,t)=>{if(t.code===117){const a=t.parameters[0];r[a]=(r[a]||0)+1}return r},{}),Ir=e=>{const r=e.pages.map(de);return{name:e.name,eventId:e.id,pages:r}},de=e=>({commands:ue(e.list),condtion:M(e.conditions),image:te(e.image)}),ue=e=>({texts:u(e).flat(),calls:ie(e),audios:J(e),variableReading:N(e),variableWriting:ce(e),images:$(e)});o.audioCommandInfo=H,o.audioPathFromCommands=F,o.collectAudioCommands=g,o.collectImageCommands=re,o.collectVariableReadCommand=E,o.commandChoice=X,o.correctMapEventText=nr,o.correctTextCommands=cr,o.eventPageCharacterImage=te,o.expectAudioFromTroop=qe,o.extractAudioCFromCommonEvents=Qe,o.extractAudioCommandsInfo=J,o.extractAudioFromMap=Y,o.extractAudioFromMapFileInfo=Ke,o.extractCommonEventCalls=ie,o.extractEventCommandData=ue,o.extractImageFromActor=dr,o.extractImageFromEnemy=ir,o.extractImageFromMap=gr,o.extractImageFromSystem=ur,o.extractImagesFromCommandList=$,o.extractImagesFromCommandListOld=Z,o.extractMapEvent=Ir,o.extractNoteText=v,o.extractPageCondition=M,o.extractPageInfo=de,o.extractTextData=s,o.extractTextFromActor=Ue,o.extractTextFromArmor=ar,o.extractTextFromClass=$e,o.extractTextFromCommonEvent=mr,o.extractTextFromEnemy=Ze,o.extractTextFromEventCommands=u,o.extractTextFromEventPages=y,o.extractTextFromItem=rr,o.extractTextFromSkill=er,o.extractTextFromState=or,o.extractTextFromTroop=sr,o.extractTextFromWeapon=tr,o.extractTextMapper=q,o.extractVariableReadingFromCommonEvent=pr,o.extractVariableReadingFromMap=br,o.extractVariableReadingFromTroop=Cr,o.extractVariableReadingInfos=N,o.extractVariableReference=ae,o.extractVariableWriting=ce,o.extractVariableWritsFromControlVariable=me,o.extractVariableWritsFromEventCommand=se,o.isAudioResource=He,o.isVariableReadCommand=oe,o.isVariableWriteCommand=ne,o.readScript=K,o.systemAudioFiles=Xe,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=rpg-analyzer.umd.js.map
