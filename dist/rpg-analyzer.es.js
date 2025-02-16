const p = "bgm", N = "se", d = "me", y = "bgs", Y = "characters", x = (e, r) => r ? e === r.code : !1, j = "MessageHeader invalid command", Q = "Invalid Head", T = (e) => typeof e[0] == "string" && e.length === 1, u = (e, r, t) => {
  const a = [];
  for (let s = t; s < r.length; s++) {
    const m = r[s];
    if (x(e, m) && T(m.parameters))
      a.push({
        code: e,
        indent: m.indent,
        parameters: [m.parameters[0]]
      });
    else
      break;
  }
  return a;
}, w = (e, r, t) => {
  const a = e[r];
  if (a && x(t, a) && T(a.parameters))
    return {
      code: t,
      indent: a.indent,
      parameters: [a.parameters[0]]
    };
  throw new Error(Q, { cause: a });
}, q = (e, r) => ({
  head: w(e, r, 108),
  bodys: u(408, e, r + 1)
}), K = (e, r) => ({
  head: w(e, r, 355),
  bodys: u(655, e, r + 1)
}), X = (e, r) => {
  const t = e[r];
  if (t && U(t))
    return t;
  throw new Error(j, { cause: t });
}, U = (e) => !e || e.code !== 101 || ![4, 5].includes(e.parameters.length) ? !1 : typeof e.parameters[0] == "string" && typeof e.parameters[1] == "number" && typeof e.parameters[2] == "number" && typeof e.parameters[3] == "number", Z = (e, r) => ({
  head: X(e, r),
  bodys: u(401, e, r + 1)
}), $ = "ScrollTextHeader invalid command", ee = (e, r) => {
  const t = e[r];
  if (x(105, t))
    return t;
  const a = {
    headCode: 105,
    bodyCode: 405,
    index: r
  };
  throw new Error($, { cause: a });
}, re = (e, r) => ({
  head: ee(e, r),
  bodys: u(405, e, r + 1)
}), te = (e, r = `
`) => e.map((t) => t.parameters[0]).join(r);
class A {
  constructor(r, t) {
    this.header = r, this.bodies = t;
  }
  getBodyText(r = `
`) {
    return te(this.getExpandedBodies(), r);
  }
  jopinHedderAndBody() {
    return [this.header, ...this.bodies];
  }
  joinCommandBodies() {
    return this.getExpandedBodies();
  }
}
class f extends A {
  constructor(r, t, a) {
    super(t, a), this.bodyCode = r;
  }
  getExpandedBodies() {
    return this.bodies;
  }
  normalizedCommands() {
    const r = {
      ...this.header,
      code: this.header.code,
      indent: this.header.indent,
      parameters: [...this.header.parameters]
    };
    return this.bodies.length === 0 ? [r] : [r, this.mergedBody()];
  }
  mergedBody() {
    return {
      code: this.bodyCode,
      indent: this.header.indent,
      parameters: [this.getBodyText()]
    };
  }
}
class F extends A {
  getExpandedBodies() {
    return [this.header, ...this.bodies];
  }
  mergedBody() {
    return {
      code: this.header.code,
      indent: this.header.indent,
      parameters: [this.getBodyText()]
    };
  }
  normalizedCommands() {
    return [this.mergedBody()];
  }
}
const ae = "選択肢ヘルプ", oe = (e) => e.parameters[0] === ae, se = (e, r = []) => new f(401, e, r), ce = (e, r = []) => new f(405, e, r), ne = (e, r = []) => oe(e) ? new f(
  408,
  e,
  r
) : new F(
  e,
  r
), ie = (e, r = []) => new F(e, r), de = (e, r, t) => {
  const a = Z(e, r), s = se(a.head, a.bodys);
  return t(s);
}, me = (e, r, t) => {
  const a = re(e, r), s = ce(a.head, a.bodys);
  return t(s);
}, ue = (e, r, t) => {
  const a = q(e, r), s = ne(a.head, a.bodys);
  return t(s);
}, he = (e, r, t) => {
  const a = K(e, r), s = ie(a.head, a.bodys);
  return t(s);
}, o = (e, r, t, a, s) => a ? a(e, r, t) : s(e, r, t), b = (e, r) => e.map((t, a) => M(e, a, r)), le = (e, r) => e.flatMap((t, a) => M(e, a, r)), M = (e, r, t) => {
  const a = e[r];
  switch (a.code) {
    // メッセージ関連
    case 101:
      return t.showMessage ? de(e, r, t.showMessage) : t.other(a, r, e);
    case 401:
      return o(a, r, e, t.showMessageBody, t.other);
    case 105:
      return t.showScrollingText ? me(e, r, t.showScrollingText) : t.other(a, r, e);
    case 405:
      return o(a, r, e, t.showScrollingTextBody, t.other);
    case 102:
      return o(a, r, e, t.showChoices, t.other);
    case 402:
      return o(a, r, e, t.choiceWhen, t.other);
    // コメント・スクリプト関連
    case 108:
      return t.comment ? ue(e, r, t.comment) : t.other(a, r, e);
    case 408:
      return o(a, r, e, t.commentBody, t.other);
    case 355:
      return t.script ? he(e, r, t.script) : t.other(a, r, e);
    case 655:
      return o(a, r, e, t.scriptBody, t.other);
    // 条件・制御系
    case 111:
      return o(a, r, e, t.conditionalBranch, t.other);
    case 121:
      return o(a, r, e, t.controlSwitch, t.other);
    case 122:
      return o(a, r, e, t.controlVariable, t.other);
    case 123:
      return o(a, r, e, t.controlSelfSwitch, t.other);
    case 124:
      return o(a, r, e, t.controlTimer, t.other);
    case 117:
      return o(a, r, e, t.commonEvent, t.other);
    // メニュー
    case 134:
      return o(a, r, e, t.changeSaveAccess, t.other);
    case 135:
      return o(a, r, e, t.changeMenuAccess, t.other);
    case 136:
      return o(a, r, e, t.changeEncounter, t.other);
    case 137:
      return o(a, r, e, t.changeFormationAccess, t.other);
    // キャラクター情報変更
    case 320:
      return o(a, r, e, t.changeName, t.other);
    case 325:
      return o(a, r, e, t.changeProfile, t.other);
    case 324:
      return o(a, r, e, t.changeNickname, t.other);
    case 322:
      return o(a, r, e, t.changeActorImages, t.other);
    case 323:
      return o(a, r, e, t.changeVehicleImage, t.other);
    // BGM・音楽関連
    case 132:
      return o(a, r, e, t.changeBattleBGM, t.other);
    case 133:
      return o(a, r, e, t.changeVictoryME, t.other);
    case 139:
      return o(a, r, e, t.changeDefeatME, t.other);
    case 241:
      return o(a, r, e, t.playBGM, t.other);
    case 242:
      return o(a, r, e, t.fadeOutBGM, t.other);
    case 250:
      return o(a, r, e, t.playSE, t.other);
    case 251:
      return o(a, r, e, t.stopSE, t.other);
    case 249:
      return o(a, r, e, t.playME, t.other);
    // ラベル・ジャンプ
    case 118:
      return o(a, r, e, t.label, t.other);
    case 119:
      return o(a, r, e, t.labelJump, t.other);
    // 画面演出
    case 138:
      return o(a, r, e, t.changeWindowColor, t.other);
    case 223:
      return o(a, r, e, t.tintScreen, t.other);
    case 224:
      return o(a, r, e, t.flashScreen, t.other);
    case 225:
      return o(a, r, e, t.shakeScreen, t.other);
    // ピクチャー
    case 231:
      return o(a, r, e, t.showPicture, t.other);
    case 232:
      return o(a, r, e, t.movePicture, t.other);
    case 233:
      return o(a, r, e, t.rotatePicture, t.other);
    case 234:
      return o(a, r, e, t.tintPicture, t.other);
    case 235:
      return o(a, r, e, t.erasePicture, t.other);
    // ゲーム進行
    case 301:
      return o(a, r, e, t.battleProcessing, t.other);
    case 230:
      return o(a, r, e, t.wait, t.other);
    case 353:
      return o(a, r, e, t.gameover, t.other);
    // 未整理
    case 284:
      return o(a, r, e, t.changeParallax, t.other);
    case 283:
      return o(a, r, e, t.changeBattleBackground, t.other);
    case 261:
      return o(a, r, e, t.playMovie, t.other);
    case 211:
      return o(a, r, e, t.changeTransparency, t.other);
    case 236:
      return o(a, r, e, t.setWeatherEffects, t.other);
    case 125:
      return o(a, r, e, t.changeGold, t.other);
    case 212:
      return o(a, r, e, t.showAnimation, t.other);
    case 201:
      return o(a, r, e, t.transferPlayer, t.other);
    case 202:
      return o(a, r, e, t.setVehicleLocation, t.other);
    case 203:
      return o(a, r, e, t.setEventLocation, t.other);
    default:
      return t.other(a, r, e);
  }
}, ge = {
  // body部分は空の要素で置き換える
  commentBody: () => [],
  showMessageBody: () => [],
  scriptBody: () => [],
  showScrollingTextBody: () => [],
  // ヘッダ側を基準に、Header+Bodyで生成
  showMessage: (e) => e.normalizedCommands(),
  showScrollingText: (e) => e.normalizedCommands(),
  comment: (e) => e.normalizedCommands(),
  script: (e) => e.normalizedCommands(),
  other: (e) => [e]
}, Ee = (e) => b(e, ge), pe = (e) => !!e, I = (e, r) => e.pages.map(
  (t, a) => r(t, a, e)
), S = (e, r) => e.events.filter(pe).map((t) => I(t, r)), P = (e, r) => S(e, r).flat(2), _ = (e, r) => e.map((t) => I(t, r)), V = (e, r) => e.map((t) => r(t, 0, t)), R = (e, r) => r.includes(e.code), k = (e) => R(e, xe), xe = [
  241,
  245,
  249,
  250,
  132,
  133,
  139,
  140
], L = (e) => R(e, fe), fe = [
  231,
  322,
  323,
  284,
  283
], n = (e, r) => ({
  code: e.code,
  paramIndex: r,
  value: e.parameters[r]
}), be = () => /<([^<>:]+):([^>]*)>/g, Ie = (e, r) => {
  const t = be(), a = [];
  let s;
  for (; (s = t.exec(e)) !== null; )
    a.push(r(s[1], s[2]));
  return a;
}, Ce = (e, r, t) => r.map((a) => t(a, e[a], e)), ve = (e, r, t) => Ce(e, r, t), Ke = (e) => e.folder === N || e.folder === p || e.folder === y || e.folder === d, Be = (e) => ({
  code: e.code,
  path: W(e)
}), W = (e) => ({
  folder: Ne(e) || "",
  fileName: e.parameters[0].name
}), Ne = (e) => ye[e.code], ye = {
  241: p,
  245: y,
  249: d,
  250: N,
  132: p,
  133: d,
  139: d,
  140: d
}, C = (e, r, t) => e.list.filter(k).map((a) => ({
  code: a.code,
  path: W(a),
  pageIndex: r,
  eventId: t.id
})), Te = (e) => e.filter(k).map(Be), Xe = (e) => V(e, C).flat(2), Ue = (e) => _(e, C).flat(2), we = (e) => ({
  bgm: e.bgm,
  bgs: e.bgs,
  commands: P(e, C)
}), Ze = (e) => ({
  map: we(e.map),
  filename: e.filename,
  editingName: e.editingName
}), $e = (e) => ({
  sounds: l(e.sounds),
  bgm: l([e.battleBgm, e.titleBgm]),
  me: l([
    e.defeatMe,
    e.gameoverMe,
    e.victoryMe
  ])
}), l = (e) => e.map((r, t) => ({
  index: t,
  path: r.name
})), G = (e, r, t) => ({ key: e, text: r, id: t.id }), i = (e, r) => ({
  main: ve(e, r, (t, a) => G(t, a, e)),
  note: D(e)
}), D = (e) => Ie(e.note, (r, t) => G(r, t, e)), er = (e) => i(e, ["name", "nickname", "profile"]), rr = (e) => i(e, ["name"]), tr = (e) => i(e, ["name"]), ar = (e) => i(e, [
  "name",
  "description",
  "message1",
  "message2"
]), or = (e) => i(e, ["name", "description"]), sr = (e) => i(e, ["name", "description"]), cr = (e) => i(e, ["name", "description"]), nr = (e) => i(e, [
  "name",
  "message1",
  "message2",
  "message3",
  "message4"
]), h = (e) => {
  const r = Ee(e).flat();
  return b(r, Ae);
}, O = (e) => I(
  e,
  (r) => h(r.list)
), Ae = {
  changeName: (e) => [n(e, 1)],
  changeNickname: (e) => [n(e, 1)],
  changeProfile: (e) => [n(e, 1)],
  showChoices: (e) => Me(e),
  showScrollingText: (e) => [n(e.mergedBody(), 0)],
  showMessage: (e) => {
    const r = e.normalizedCommands(), t = n(r[0], 4), a = r[1];
    return a ? [t, n(a, 0)] : [t];
  },
  choiceWhen() {
    return [];
  },
  comment(e) {
    const r = e.mergedBody();
    return [n(r, 0)];
  },
  script: (e) => Fe(),
  other: () => [],
  commentBody: () => []
}, Fe = (e) => [], Me = (e) => e.parameters[0].map((r, t) => ({
  code: e.code,
  paramIndex: t,
  value: r
})), ir = (e, r, t) => {
  const a = h(
    e.list
  );
  return {
    eventId: t.id,
    pageIndex: r,
    commands: a.flat()
  };
}, dr = (e) => {
  const r = O(e);
  return {
    note: D(e),
    eventId: e.id,
    commands: r.flat(2)
  };
}, mr = (e) => {
  const r = O(e);
  return {
    troopId: e.id,
    commands: r.flat(2)
  };
}, ur = (e) => ({
  eventId: e.id,
  commands: h(e.list).flat(2)
}), hr = (e) => ({
  key: "battlerName",
  image: e.battlerName,
  id: e.id
}), g = (e, r, t) => ({
  folder: t,
  key: r,
  image: e[r],
  id: e.id
}), lr = (e) => [
  g(e, "faceName", "faces"),
  g(e, "characterName", "characters"),
  g(e, "battlerName", "sv_actors")
], E = (e, r) => ({
  folder: "characters",
  key: r,
  image: e[r].characterName
}), B = (e, r, t) => ({
  folder: t,
  key: r,
  image: e[r]
}), gr = (e) => [
  B(e, "title1Name", "titles1"),
  B(e, "title2Name", "titles2"),
  E(e, "boat"),
  E(e, "ship"),
  E(e, "airship")
], Se = (e) => b(e, z), Pe = (e) => le(e.filter(L), z), c = (e, r, t) => ({
  folderName: t,
  command: n(e, r)
}), z = {
  changeActorImages: (e) => [
    c(e, 1, "characters"),
    c(e, 3, "faces"),
    c(e, 5, "sv_actors")
  ],
  showPicture: (e) => [c(e, 1, "pictures")],
  changeBattleBackground: (e) => [
    c(e, 0, "battlebacks1"),
    c(e, 1, "battlebacks2")
  ],
  changeParallax: (e) => [c(e, 0, "parallaxes")],
  changeVehicleImage: (e) => [c(e, 1, "characters")],
  other: () => []
}, _e = (e, r, t) => Se(
  e.list.filter(L)
).flatMap((s) => Re(s, r, t)), Ve = (e, r, t) => ({
  folderName: e.folderName,
  command: e.command,
  eventId: r.id,
  pageIndex: t,
  eventName: r.name
}), Re = (e, r, t) => e.map((a) => Ve(a, t, r)), Er = (e) => ({
  commands: P(e, _e),
  background1: {
    folderName: "battlebacks1",
    fileName: e.battleback1Name
  },
  background2: {
    folderName: "battlebacks2",
    fileName: e.battleback2Name
  },
  parallax: {
    folderName: "parallaxes",
    fileName: e.parallaxName
  }
}), ke = (e) => ({
  folderName: Y,
  fileName: e.characterName
}), Le = 1, We = {
  331: 2,
  332: 2,
  201: 0,
  202: 1,
  285: 2,
  301: 0
}, Ge = {
  331: [4],
  332: [4],
  201: [1, 2, 3],
  202: [2, 3, 4],
  285: [0],
  301: [1]
}, H = (e) => e.filter(Oe).flatMap(De), De = (e) => {
  const r = Ge[e.code];
  if (r === void 0)
    throw new Error(`code${e.code} is not supported`);
  return r.map((t) => ({
    eventCode: e.code,
    index: t,
    variableId: e.parameters[t]
  }));
}, Oe = (e) => {
  const r = We[e.code];
  return r === void 0 ? !1 : e.parameters[r] === Le;
}, ze = (e) => e.flatMap((r) => He(r) ? Je(r) : []), He = (e) => e.code === 103 || e.code === 104 || e.code === 285 || e.code === 122, Je = (e) => e.code === 122 ? Ye(e) : [
  {
    variableId: e.parameters[0],
    code: e.code
  }
], Ye = (e) => {
  const r = e.parameters[0], t = e.parameters[1];
  return Array.from({ length: t - r + 1 }, (a, s) => ({
    variableId: s + r,
    code: 122
  }));
}, J = (e) => ({
  variableId: e.variableId,
  valid: e.variableValid,
  value: e.variableValue
}), v = (e, r, t) => {
  const a = H(e.list);
  return {
    pageIndex: r,
    eventId: t.id,
    commands: a
  };
}, pr = (e) => S(e, (r, t, a) => ({
  page: v(r, t, a),
  conditions: J(r.conditions)
})).flat(2), xr = (e) => V(e, v), fr = (e) => _(e, v), je = (e) => e.reduce((r, t) => {
  if (t.code === 117) {
    const a = t.parameters[0];
    r[a] = (r[a] || 0) + 1;
  }
  return r;
}, {}), br = (e) => {
  const r = e.pages.map(Qe);
  return {
    name: e.name,
    eventId: e.id,
    pages: r
  };
}, Qe = (e) => ({
  commands: qe(e.list),
  condtion: J(e.conditions),
  image: ke(e.image)
}), qe = (e) => ({
  texts: h(e).flat(),
  calls: je(e),
  audios: Te(e),
  variableReading: H(e),
  variableWriting: ze(e),
  images: Pe(e)
});
export {
  Be as audioCommandInfo,
  W as audioPathFromCommands,
  C as collectAudioCommands,
  _e as collectImageCommands,
  v as collectVariableReadCommand,
  Me as commandChoice,
  dr as correctMapEventText,
  ir as correctTextCommands,
  ke as eventPageCharacterImage,
  Ue as expectAudioFromTroop,
  Xe as extractAudioCFromCommonEvents,
  Te as extractAudioCommandsInfo,
  we as extractAudioFromMap,
  Ze as extractAudioFromMapFileInfo,
  je as extractCommonEventCalls,
  qe as extractEventCommandData,
  lr as extractImageFromActor,
  hr as extractImageFromEnemy,
  Er as extractImageFromMap,
  gr as extractImageFromSystem,
  Pe as extractImagesFromCommandList,
  Se as extractImagesFromCommandListOld,
  br as extractMapEvent,
  D as extractNoteText,
  J as extractPageCondition,
  Qe as extractPageInfo,
  i as extractTextData,
  er as extractTextFromActor,
  cr as extractTextFromArmor,
  tr as extractTextFromClass,
  ur as extractTextFromCommonEvent,
  rr as extractTextFromEnemy,
  h as extractTextFromEventCommands,
  O as extractTextFromEventPages,
  or as extractTextFromItem,
  ar as extractTextFromSkill,
  nr as extractTextFromState,
  mr as extractTextFromTroop,
  sr as extractTextFromWeapon,
  Ae as extractTextMapper,
  xr as extractVariableReadingFromCommonEvent,
  pr as extractVariableReadingFromMap,
  fr as extractVariableReadingFromTroop,
  H as extractVariableReadingInfos,
  De as extractVariableReference,
  ze as extractVariableWriting,
  Ye as extractVariableWritsFromControlVariable,
  Je as extractVariableWritsFromEventCommand,
  Ke as isAudioResource,
  Oe as isVariableReadCommand,
  He as isVariableWriteCommand,
  Fe as readScript,
  $e as systemAudioFiles
};
//# sourceMappingURL=rpg-analyzer.es.js.map
