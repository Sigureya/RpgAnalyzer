const E = "bgm", w = "se", d = "me", C = "bgs", p = (e, t) => t ? e === t.code : !1, D = "MessageHeader invalid command", _ = "Invalid Head", I = (e) => typeof e[0] == "string" && e.length === 1, h = (e, t, r) => {
  const a = [];
  for (let s = r; s < t.length; s++) {
    const i = t[s];
    if (p(e, i) && I(i.parameters))
      a.push({
        code: e,
        indent: i.indent,
        parameters: [i.parameters[0]]
      });
    else
      break;
  }
  return a;
}, N = (e, t, r) => {
  const a = e[t];
  if (a && p(r, a) && I(a.parameters))
    return {
      code: r,
      indent: a.indent,
      parameters: [a.parameters[0]]
    };
  throw new Error(_, { cause: a });
}, z = (e, t) => ({
  head: N(e, t, 108),
  bodys: h(408, e, t + 1)
}), V = (e, t) => ({
  head: N(e, t, 355),
  bodys: h(655, e, t + 1)
}), H = (e, t) => {
  const r = e[t];
  if (r && J(r))
    return r;
  throw new Error(D, { cause: r });
}, J = (e) => !e || e.code !== 101 || ![4, 5].includes(e.parameters.length) ? !1 : typeof e.parameters[0] == "string" && typeof e.parameters[1] == "number" && typeof e.parameters[2] == "number" && typeof e.parameters[3] == "number", Q = (e, t) => ({
  head: H(e, t),
  bodys: h(401, e, t + 1)
}), R = "ScrollTextHeader invalid command", j = (e, t) => {
  const r = e[t];
  if (p(105, r))
    return r;
  const a = {
    headCode: 105,
    bodyCode: 405,
    index: t
  };
  throw new Error(R, { cause: a });
}, O = (e, t) => ({
  head: j(e, t),
  bodys: h(405, e, t + 1)
}), U = (e, t = `
`) => e.map((r) => r.parameters[0]).join(t);
class F {
  constructor(t, r) {
    this.header = t, this.bodies = r;
  }
  getBodyText(t = `
`) {
    return U(this.getExpandedBodies(), t);
  }
  jopinHedderAndBody() {
    return [this.header, ...this.bodies];
  }
  joinCommandBodies() {
    return this.getExpandedBodies();
  }
}
class x extends F {
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
class v extends F {
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
const Z = "選択肢ヘルプ", q = (e) => e.parameters[0] === Z, K = (e, t = []) => new x(401, e, t), Y = (e, t = []) => new x(405, e, t), X = (e, t = []) => q(e) ? new x(
  408,
  e,
  t
) : new v(
  e,
  t
), $ = (e, t = []) => new v(e, t), ee = (e, t, r) => {
  const a = Q(e, t), s = K(a.head, a.bodys);
  return r(s);
}, re = (e, t, r) => {
  const a = O(e, t), s = Y(a.head, a.bodys);
  return r(s);
}, te = (e, t, r) => {
  const a = z(e, t), s = X(a.head, a.bodys);
  return r(s);
}, ae = (e, t, r) => {
  const a = V(e, t), s = $(a.head, a.bodys);
  return r(s);
}, o = (e, t, r, a, s) => a ? a(e, t, r) : s(e, t, r), f = (e, t) => e.map((r, a) => oe(e, a, t)), oe = (e, t, r) => {
  const a = e[t];
  switch (a.code) {
    // メッセージ関連
    case 101:
      return r.showMessage ? ee(e, t, r.showMessage) : r.other(a, t, e);
    case 401:
      return o(a, t, e, r.showMessageBody, r.other);
    case 105:
      return r.showScrollingText ? re(e, t, r.showScrollingText) : r.other(a, t, e);
    case 405:
      return o(a, t, e, r.showScrollingTextBody, r.other);
    case 102:
      return o(a, t, e, r.showChoices, r.other);
    case 402:
      return o(a, t, e, r.choiceWhen, r.other);
    // コメント・スクリプト関連
    case 108:
      return r.comment ? te(e, t, r.comment) : r.other(a, t, e);
    case 408:
      return o(a, t, e, r.commentBody, r.other);
    case 355:
      return r.script ? ae(e, t, r.script) : r.other(a, t, e);
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
}, se = {
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
}, ce = (e) => f(e, se), ne = (e) => !!e, b = (e, t) => e.pages.map(
  (r, a) => t(r, a, e)
), me = (e, t) => e.events.filter(ne).map((r) => b(r, t)), S = (e, t) => me(e, t).flat(2), A = (e, t) => e.map((r) => b(r, t)), M = (e, t) => e.map((r, a) => t(r, a, r)), de = () => /<([^<>:]+):([^>]*)>/g, ie = (e, t) => {
  const r = de(), a = [];
  let s;
  for (; (s = r.exec(e)) !== null; )
    a.push(t(s[1], s[2]));
  return a;
}, he = (e, t, r) => t.map((a) => r(a, e[a], e)), ue = (e, t, r) => he(e, t, r), n = (e, t) => ({
  code: e.code,
  paramIndex: t,
  value: e.parameters[t]
}), P = (e, t) => t.includes(e.code), le = (e) => P(e, ge), ge = [
  241,
  245,
  249,
  250,
  132,
  133,
  139,
  140
], Ee = (e) => P(e, pe), pe = [
  231,
  322,
  323,
  284,
  283
], ve = (e) => e.folder === w || e.folder === E || e.folder === C || e.folder === d, xe = (e) => ({
  folder: fe(e) || "",
  fileName: e.parameters[0].name
}), fe = (e) => be[e.code], be = {
  241: E,
  245: C,
  249: d,
  250: w,
  132: E,
  133: d,
  139: d,
  140: d
}, y = (e, t, r) => e.list.filter(le).map((a) => ({
  code: a.code,
  path: xe(a),
  pageIndex: t,
  eventId: r.id
})), Se = (e) => M(e, y).flat(2), Ae = (e) => A(e, y).flat(2), ye = (e) => ({
  bgm: e.bgm,
  bgs: e.bgs,
  commands: S(e, y)
}), Me = (e) => ({
  map: ye(e.map),
  filename: e.filename,
  editingName: e.editingName
}), Pe = (e) => ({
  sounds: u(e.sounds),
  bgm: u([e.battleBgm, e.titleBgm]),
  me: u([
    e.defeatMe,
    e.gameoverMe,
    e.victoryMe
  ])
}), u = (e) => e.map((t, r) => ({
  index: r,
  path: t.name
})), k = (e, t, r) => ({ key: e, text: t, id: r.id }), m = (e, t) => ({
  main: ue(e, t, (r, a) => k(r, a, e)),
  note: L(e)
}), L = (e) => ie(e.note, (t, r) => k(t, r, e)), ke = (e) => m(e, ["name", "nickname", "profile"]), Le = (e) => m(e, ["name"]), Ge = (e) => m(e, ["name"]), We = (e) => m(e, [
  "name",
  "description",
  "message1",
  "message2"
]), De = (e) => m(e, ["name", "description"]), _e = (e) => m(e, ["name", "description"]), ze = (e) => m(e, ["name", "description"]), Ve = (e) => m(e, [
  "name",
  "message1",
  "message2",
  "message3",
  "message4"
]), G = (e) => {
  const t = ce(e).flat();
  return f(t, Be);
}, W = (e) => b(
  e,
  (t) => G(t.list)
), Be = {
  changeName: (e) => [n(e, 1)],
  changeNickname: (e) => [n(e, 1)],
  changeProfile: (e) => [n(e, 1)],
  showChoices: (e) => we(e),
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
  script: (e) => Te(),
  other: () => [],
  commentBody: () => []
}, Te = (e) => [], we = (e) => e.parameters[0].map((t, r) => ({
  code: e.code,
  paramIndex: r,
  value: t
})), He = (e) => {
  const t = W(e);
  return {
    note: L(e),
    eventId: e.id,
    commands: t.flat(2)
  };
}, Je = (e) => {
  const t = W(e);
  return {
    troopId: e.id,
    commands: t.flat(2)
  };
}, Qe = (e) => ({
  eventId: e.id,
  commands: G(e.list).flat(2)
}), Re = (e) => ({
  key: "battlerName",
  image: e.battlerName,
  id: e.id
}), l = (e, t, r) => ({
  folder: r,
  key: t,
  image: e[t],
  id: e.id
}), je = (e) => [
  l(e, "faceName", "faces"),
  l(e, "characterName", "characters"),
  l(e, "battlerName", "sv_actors")
], g = (e, t) => ({
  folder: "characters",
  key: t,
  image: e[t].characterName
}), T = (e, t, r) => ({
  folder: r,
  key: t,
  image: e[t]
}), Oe = (e) => [
  T(e, "title1Name", "titles1"),
  T(e, "title2Name", "titles2"),
  g(e, "boat"),
  g(e, "ship"),
  g(e, "airship")
], Ce = (e) => f(e, Ie), c = (e, t, r) => ({
  folderName: r,
  command: n(e, t)
}), Ie = {
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
}, Ue = (e) => A(e, B).flat(2), Ze = (e) => M(e, B).flat(2), qe = (e) => ({
  commands: S(e, B),
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
}), B = (e, t, r) => Ce(
  e.list.filter(Ee)
).flatMap((s) => Fe(s, t, r)), Ne = (e, t, r) => ({
  folderName: e.folderName,
  command: e.command,
  eventId: t.id,
  pageIndex: r,
  eventName: t.name
}), Fe = (e, t, r) => e.map((a) => Ne(a, r, t));
export {
  xe as audioPathFromCommands,
  y as collectAudioCommands,
  B as collectImageCommands,
  we as commandChoice,
  He as correctMapEventText,
  Ae as expectAudioFromTroop,
  Se as extractAudioCFromCommonEvents,
  ye as extractAudioFromMap,
  Me as extractAudioFromMapFileInfo,
  je as extractImageFromActor,
  Re as extractImageFromEnemy,
  Oe as extractImageFromSystem,
  Ce as extractImagesFromCommandList,
  Ze as extractImagesFromCommonEvents,
  Ue as extractImagesFromTroop,
  L as extractNoteText,
  m as extractTextData,
  ke as extractTextFromActor,
  ze as extractTextFromArmor,
  Ge as extractTextFromClass,
  Qe as extractTextFromCommonEvent,
  Le as extractTextFromEnemy,
  G as extractTextFromEventCommands,
  W as extractTextFromEventPages,
  De as extractTextFromItem,
  qe as extractTextFromMap,
  We as extractTextFromSkill,
  Ve as extractTextFromState,
  Je as extractTextFromTroop,
  _e as extractTextFromWeapon,
  Be as extractTextMapper,
  ve as isAudioResource,
  Te as readScript,
  Pe as systemAudioFiles
};
//# sourceMappingURL=rpg-analyzer.es.js.map
