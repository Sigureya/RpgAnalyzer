const E = "bgm", T = "se", i = "me", w = "bgs", p = (e, t) => t ? e === t.code : !1, W = "MessageHeader invalid command", D = "Invalid Head", F = (e) => typeof e[0] == "string" && e.length === 1, u = (e, t, r) => {
  const a = [];
  for (let s = r; s < t.length; s++) {
    const m = t[s];
    if (p(e, m) && F(m.parameters))
      a.push({
        code: e,
        indent: m.indent,
        parameters: [m.parameters[0]]
      });
    else
      break;
  }
  return a;
}, A = (e, t, r) => {
  const a = e[t];
  if (a && p(r, a) && F(a.parameters))
    return {
      code: r,
      indent: a.indent,
      parameters: [a.parameters[0]]
    };
  throw new Error(D, { cause: a });
}, O = (e, t) => ({
  head: A(e, t, 108),
  bodys: u(408, e, t + 1)
}), z = (e, t) => ({
  head: A(e, t, 355),
  bodys: u(655, e, t + 1)
}), H = (e, t) => {
  const r = e[t];
  if (r && J(r))
    return r;
  throw new Error(W, { cause: r });
}, J = (e) => !e || e.code !== 101 || ![4, 5].includes(e.parameters.length) ? !1 : typeof e.parameters[0] == "string" && typeof e.parameters[1] == "number" && typeof e.parameters[2] == "number" && typeof e.parameters[3] == "number", Y = (e, t) => ({
  head: H(e, t),
  bodys: u(401, e, t + 1)
}), j = "ScrollTextHeader invalid command", q = (e, t) => {
  const r = e[t];
  if (p(105, r))
    return r;
  const a = {
    headCode: 105,
    bodyCode: 405,
    index: t
  };
  throw new Error(j, { cause: a });
}, K = (e, t) => ({
  head: q(e, t),
  bodys: u(405, e, t + 1)
}), Q = (e, t = `
`) => e.map((r) => r.parameters[0]).join(t);
class M {
  constructor(t, r) {
    this.header = t, this.bodies = r;
  }
  getBodyText(t = `
`) {
    return Q(this.getExpandedBodies(), t);
  }
  jopinHedderAndBody() {
    return [this.header, ...this.bodies];
  }
  joinCommandBodies() {
    return this.getExpandedBodies();
  }
}
class x extends M {
  constructor(t, r, a) {
    super(r, a), this.bodyCode = t;
  }
  getExpandedBodies() {
    return this.bodies;
  }
  normalizedCommands() {
    const t = {
      ...this.header,
      code: this.header.code,
      indent: this.header.indent,
      parameters: [...this.header.parameters]
    };
    return this.bodies.length === 0 ? [t] : [t, this.mergedBody()];
  }
  mergedBody() {
    return {
      code: this.bodyCode,
      indent: this.header.indent,
      parameters: [this.getBodyText()]
    };
  }
}
class S extends M {
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
const X = "選択肢ヘルプ", U = (e) => e.parameters[0] === X, Z = (e, t = []) => new x(401, e, t), $ = (e, t = []) => new x(405, e, t), ee = (e, t = []) => U(e) ? new x(
  408,
  e,
  t
) : new S(
  e,
  t
), re = (e, t = []) => new S(e, t), te = (e, t, r) => {
  const a = Y(e, t), s = Z(a.head, a.bodys);
  return r(s);
}, ae = (e, t, r) => {
  const a = K(e, t), s = $(a.head, a.bodys);
  return r(s);
}, oe = (e, t, r) => {
  const a = O(e, t), s = ee(a.head, a.bodys);
  return r(s);
}, se = (e, t, r) => {
  const a = z(e, t), s = re(a.head, a.bodys);
  return r(s);
}, o = (e, t, r, a, s) => a ? a(e, t, r) : s(e, t, r), f = (e, t) => e.map((r, a) => ce(e, a, t)), ce = (e, t, r) => {
  const a = e[t];
  switch (a.code) {
    // メッセージ関連
    case 101:
      return r.showMessage ? te(e, t, r.showMessage) : r.other(a, t, e);
    case 401:
      return o(a, t, e, r.showMessageBody, r.other);
    case 105:
      return r.showScrollingText ? ae(e, t, r.showScrollingText) : r.other(a, t, e);
    case 405:
      return o(a, t, e, r.showScrollingTextBody, r.other);
    case 102:
      return o(a, t, e, r.showChoices, r.other);
    case 402:
      return o(a, t, e, r.choiceWhen, r.other);
    // コメント・スクリプト関連
    case 108:
      return r.comment ? oe(e, t, r.comment) : r.other(a, t, e);
    case 408:
      return o(a, t, e, r.commentBody, r.other);
    case 355:
      return r.script ? se(e, t, r.script) : r.other(a, t, e);
    case 655:
      return o(a, t, e, r.scriptBody, r.other);
    // 条件・制御系
    case 111:
      return o(a, t, e, r.conditionalBranch, r.other);
    case 121:
      return o(a, t, e, r.controlSwitch, r.other);
    case 122:
      return o(a, t, e, r.controlVariable, r.other);
    case 123:
      return o(a, t, e, r.controlSelfSwitch, r.other);
    case 124:
      return o(a, t, e, r.controlTimer, r.other);
    case 117:
      return o(a, t, e, r.commonEvent, r.other);
    // メニュー
    case 134:
      return o(a, t, e, r.changeSaveAccess, r.other);
    case 135:
      return o(a, t, e, r.changeMenuAccess, r.other);
    case 136:
      return o(a, t, e, r.changeEncounter, r.other);
    case 137:
      return o(a, t, e, r.changeFormationAccess, r.other);
    // キャラクター情報変更
    case 320:
      return o(a, t, e, r.changeName, r.other);
    case 325:
      return o(a, t, e, r.changeProfile, r.other);
    case 324:
      return o(a, t, e, r.changeNickname, r.other);
    case 322:
      return o(a, t, e, r.changeActorImages, r.other);
    case 323:
      return o(a, t, e, r.changeVehicleImage, r.other);
    // BGM・音楽関連
    case 132:
      return o(a, t, e, r.changeBattleBGM, r.other);
    case 133:
      return o(a, t, e, r.changeVictoryME, r.other);
    case 139:
      return o(a, t, e, r.changeDefeatME, r.other);
    case 241:
      return o(a, t, e, r.playBGM, r.other);
    case 242:
      return o(a, t, e, r.fadeOutBGM, r.other);
    case 250:
      return o(a, t, e, r.playSE, r.other);
    case 251:
      return o(a, t, e, r.stopSE, r.other);
    case 249:
      return o(a, t, e, r.playME, r.other);
    // ラベル・ジャンプ
    case 118:
      return o(a, t, e, r.label, r.other);
    case 119:
      return o(a, t, e, r.labelJump, r.other);
    // 画面演出
    case 138:
      return o(a, t, e, r.changeWindowColor, r.other);
    case 223:
      return o(a, t, e, r.tintScreen, r.other);
    case 224:
      return o(a, t, e, r.flashScreen, r.other);
    case 225:
      return o(a, t, e, r.shakeScreen, r.other);
    // ピクチャー
    case 231:
      return o(a, t, e, r.showPicture, r.other);
    case 232:
      return o(a, t, e, r.movePicture, r.other);
    case 233:
      return o(a, t, e, r.rotatePicture, r.other);
    case 234:
      return o(a, t, e, r.tintPicture, r.other);
    case 235:
      return o(a, t, e, r.erasePicture, r.other);
    // ゲーム進行
    case 301:
      return o(a, t, e, r.battleProcessing, r.other);
    case 230:
      return o(a, t, e, r.wait, r.other);
    case 353:
      return o(a, t, e, r.gameover, r.other);
    // 未整理
    case 284:
      return o(a, t, e, r.changeParallax, r.other);
    case 283:
      return o(a, t, e, r.changeBattleBackground, r.other);
    case 261:
      return o(a, t, e, r.playMovie, r.other);
    case 211:
      return o(a, t, e, r.changeTransparency, r.other);
    case 236:
      return o(a, t, e, r.setWeatherEffects, r.other);
    case 125:
      return o(a, t, e, r.changeGold, r.other);
    case 212:
      return o(a, t, e, r.showAnimation, r.other);
    case 201:
      return o(a, t, e, r.transferPlayer, r.other);
    case 202:
      return o(a, t, e, r.setVehicleLocation, r.other);
    case 203:
      return o(a, t, e, r.setEventLocation, r.other);
    default:
      return r.other(a, t, e);
  }
}, ne = {
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
}, de = (e) => f(e, ne), ie = (e) => !!e, b = (e, t) => e.pages.map(
  (r, a) => t(r, a, e)
), V = (e, t) => e.events.filter(ie).map((r) => b(r, t)), _ = (e, t) => V(e, t).flat(2), I = (e, t) => e.map((r) => b(r, t)), C = (e, t) => e.map((r) => t(r, 0, r)), P = (e, t) => t.includes(e.code), me = (e) => P(e, ue), ue = [
  241,
  245,
  249,
  250,
  132,
  133,
  139,
  140
], he = (e) => P(e, le), le = [
  231,
  322,
  323,
  284,
  283
], n = (e, t) => ({
  code: e.code,
  paramIndex: t,
  value: e.parameters[t]
}), ge = () => /<([^<>:]+):([^>]*)>/g, Ee = (e, t) => {
  const r = ge(), a = [];
  let s;
  for (; (s = r.exec(e)) !== null; )
    a.push(t(s[1], s[2]));
  return a;
}, pe = (e, t, r) => t.map((a) => r(a, e[a], e)), xe = (e, t, r) => pe(e, t, r), Le = (e) => e.folder === T || e.folder === E || e.folder === w || e.folder === i, fe = (e) => ({
  folder: be(e) || "",
  fileName: e.parameters[0].name
}), be = (e) => Ie[e.code], Ie = {
  241: E,
  245: w,
  249: i,
  250: T,
  132: E,
  133: i,
  139: i,
  140: i
}, B = (e, t, r) => e.list.filter(me).map((a) => ({
  code: a.code,
  path: fe(a),
  pageIndex: t,
  eventId: r.id
})), Ge = (e) => C(e, B).flat(2), We = (e) => I(e, B).flat(2), Ce = (e) => ({
  bgm: e.bgm,
  bgs: e.bgs,
  commands: _(e, B)
}), De = (e) => ({
  map: Ce(e.map),
  filename: e.filename,
  editingName: e.editingName
}), Oe = (e) => ({
  sounds: h(e.sounds),
  bgm: h([e.battleBgm, e.titleBgm]),
  me: h([
    e.defeatMe,
    e.gameoverMe,
    e.victoryMe
  ])
}), h = (e) => e.map((t, r) => ({
  index: r,
  path: t.name
})), R = (e, t, r) => ({ key: e, text: t, id: r.id }), d = (e, t) => ({
  main: xe(e, t, (r, a) => R(r, a, e)),
  note: k(e)
}), k = (e) => Ee(e.note, (t, r) => R(t, r, e)), ze = (e) => d(e, ["name", "nickname", "profile"]), He = (e) => d(e, ["name"]), Je = (e) => d(e, ["name"]), Ye = (e) => d(e, [
  "name",
  "description",
  "message1",
  "message2"
]), je = (e) => d(e, ["name", "description"]), qe = (e) => d(e, ["name", "description"]), Ke = (e) => d(e, ["name", "description"]), Qe = (e) => d(e, [
  "name",
  "message1",
  "message2",
  "message3",
  "message4"
]), L = (e) => {
  const t = de(e).flat();
  return f(t, Be);
}, G = (e) => b(
  e,
  (t) => L(t.list)
), Be = {
  changeName: (e) => [n(e, 1)],
  changeNickname: (e) => [n(e, 1)],
  changeProfile: (e) => [n(e, 1)],
  showChoices: (e) => ye(e),
  showScrollingText: (e) => [n(e.mergedBody(), 0)],
  showMessage: (e) => {
    const t = e.normalizedCommands(), r = n(t[0], 4), a = t[1];
    return a ? [r, n(a, 0)] : [r];
  },
  choiceWhen() {
    return [];
  },
  comment(e) {
    const t = e.mergedBody();
    return [n(t, 0)];
  },
  script: (e) => ve(),
  other: () => [],
  commentBody: () => []
}, ve = (e) => [], ye = (e) => e.parameters[0].map((t, r) => ({
  code: e.code,
  paramIndex: r,
  value: t
})), Xe = (e) => {
  const t = G(e);
  return {
    note: k(e),
    eventId: e.id,
    commands: t.flat(2)
  };
}, Ue = (e) => {
  const t = G(e);
  return {
    troopId: e.id,
    commands: t.flat(2)
  };
}, Ze = (e) => ({
  eventId: e.id,
  commands: L(e.list).flat(2)
}), $e = (e) => ({
  key: "battlerName",
  image: e.battlerName,
  id: e.id
}), l = (e, t, r) => ({
  folder: r,
  key: t,
  image: e[t],
  id: e.id
}), er = (e) => [
  l(e, "faceName", "faces"),
  l(e, "characterName", "characters"),
  l(e, "battlerName", "sv_actors")
], g = (e, t) => ({
  folder: "characters",
  key: t,
  image: e[t].characterName
}), N = (e, t, r) => ({
  folder: r,
  key: t,
  image: e[t]
}), rr = (e) => [
  N(e, "title1Name", "titles1"),
  N(e, "title2Name", "titles2"),
  g(e, "boat"),
  g(e, "ship"),
  g(e, "airship")
], Ne = (e) => f(e, Te), c = (e, t, r) => ({
  folderName: r,
  command: n(e, t)
}), Te = {
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
}, tr = (e) => I(e, v).flat(2), ar = (e) => C(e, v).flat(2), or = (e) => ({
  commands: _(e, v),
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
}), v = (e, t, r) => Ne(
  e.list.filter(he)
).flatMap((s) => Fe(s, t, r)), we = (e, t, r) => ({
  folderName: e.folderName,
  command: e.command,
  eventId: t.id,
  pageIndex: r,
  eventName: t.name
}), Fe = (e, t, r) => e.map((a) => we(a, r, t)), Ae = 1, Me = {
  331: 2,
  332: 2,
  201: 0,
  202: 1,
  285: 2,
  301: 0
}, Se = {
  331: [4],
  332: [4],
  201: [1, 2, 3],
  202: [2, 3, 4],
  285: [0],
  301: [1]
}, Ve = (e) => e.filter(Pe).flatMap(_e), _e = (e) => {
  const t = Se[e.code];
  if (t === void 0)
    throw new Error(`code${e.code} is not supported`);
  return t.map((r) => ({
    eventCode: e.code,
    index: r,
    variableId: e.parameters[r]
  }));
}, Pe = (e) => {
  const t = Me[e.code];
  return t === void 0 ? !1 : e.parameters[t] === Ae;
}, sr = (e) => e.code === 103 || e.code === 104 || e.code === 285 || e.code === 122, cr = (e) => e.code === 122 ? Re(e) : [
  {
    variableId: e.parameters[0],
    code: e.code
  }
], Re = (e) => {
  const t = e.parameters[0], r = e.parameters[1];
  return Array.from({ length: r - t + 1 }, (a, s) => ({
    variableId: s + t,
    code: 122
  }));
}, y = (e, t, r) => {
  const a = Ve(e.list);
  return {
    pageIndex: t,
    eventId: r.id,
    commands: a
  };
}, nr = (e) => V(e, (t, r, a) => ({
  page: y(t, r, a),
  conditions: ke(t.conditions)
})).flat(2), ke = (e) => ({
  variableId: e.variableId,
  valid: e.variableValid,
  value: e.variableValue
}), dr = (e) => C(e, y), ir = (e) => I(e, y), mr = (e) => e.reduce((t, r) => {
  if (r.code === 117) {
    const a = r.parameters[0];
    t[a] = (t[a] || 0) + 1;
  }
  return t;
}, {});
export {
  fe as audioPathFromCommands,
  B as collectAudioCommands,
  v as collectImageCommands,
  y as collectVariableReadCommand,
  ye as commandChoice,
  Xe as correctMapEventText,
  We as expectAudioFromTroop,
  Ge as extractAudioCFromCommonEvents,
  Ce as extractAudioFromMap,
  De as extractAudioFromMapFileInfo,
  mr as extractCommonEventCalls,
  er as extractImageFromActor,
  $e as extractImageFromEnemy,
  rr as extractImageFromSystem,
  Ne as extractImagesFromCommandList,
  ar as extractImagesFromCommonEvents,
  tr as extractImagesFromTroop,
  k as extractNoteText,
  ke as extractPageCondition,
  d as extractTextData,
  ze as extractTextFromActor,
  Ke as extractTextFromArmor,
  Je as extractTextFromClass,
  Ze as extractTextFromCommonEvent,
  He as extractTextFromEnemy,
  L as extractTextFromEventCommands,
  G as extractTextFromEventPages,
  je as extractTextFromItem,
  or as extractTextFromMap,
  Ye as extractTextFromSkill,
  Qe as extractTextFromState,
  Ue as extractTextFromTroop,
  qe as extractTextFromWeapon,
  Be as extractTextMapper,
  Ve as extractVariableInfos,
  dr as extractVariableReadingFromCommonEvent,
  nr as extractVariableReadingFromMap,
  ir as extractVariableReadingFromTroop,
  _e as extractVariableReference,
  Re as extractVariableWritsFromControlVariable,
  cr as extractVariableWritsFromEventCommand,
  Le as isAudioResource,
  Pe as isVariableReadCommand,
  sr as isVariableWriteCommand,
  ve as readScript,
  Oe as systemAudioFiles
};
//# sourceMappingURL=rpg-analyzer.es.js.map
