const E = "bgm", w = "se", d = "me", T = "bgs", p = (e, t) => t ? e === t.code : !1, P = "MessageHeader invalid command", k = "Invalid Head", C = (e) => typeof e[0] == "string" && e.length === 1, i = (e, t, r) => {
  const o = [];
  for (let s = r; s < t.length; s++) {
    const h = t[s];
    if (p(e, h) && C(h.parameters))
      o.push({
        code: e,
        indent: h.indent,
        parameters: [h.parameters[0]]
      });
    else
      break;
  }
  return o;
}, F = (e, t, r) => {
  const o = e[t];
  if (o && p(r, o) && C(o.parameters))
    return {
      code: r,
      indent: o.indent,
      parameters: [o.parameters[0]]
    };
  throw new Error(k, { cause: o });
}, G = (e, t) => ({
  head: F(e, t, 108),
  bodys: i(408, e, t + 1)
}), L = (e, t) => ({
  head: F(e, t, 355),
  bodys: i(655, e, t + 1)
}), D = (e, t) => {
  const r = e[t];
  if (r && W(r))
    return r;
  throw new Error(P, { cause: r });
}, W = (e) => !e || e.code !== 101 || ![4, 5].includes(e.parameters.length) ? !1 : typeof e.parameters[0] == "string" && typeof e.parameters[1] == "number" && typeof e.parameters[2] == "number" && typeof e.parameters[3] == "number", _ = (e, t) => ({
  head: D(e, t),
  bodys: i(401, e, t + 1)
}), z = "ScrollTextHeader invalid command", V = (e, t) => {
  const r = e[t];
  if (p(105, r))
    return r;
  const o = {
    headCode: 105,
    bodyCode: 405,
    index: t
  };
  throw new Error(z, { cause: o });
}, H = (e, t) => ({
  head: V(e, t),
  bodys: i(405, e, t + 1)
}), J = (e, t = `
`) => e.map((r) => r.parameters[0]).join(t);
class I {
  constructor(t, r) {
    this.header = t, this.bodies = r;
  }
  getBodyText(t = `
`) {
    return J(this.getExpandedBodies(), t);
  }
  jopinHedderAndBody() {
    return [this.header, ...this.bodies];
  }
  joinCommandBodies() {
    return this.getExpandedBodies();
  }
}
class x extends I {
  constructor(t, r, o) {
    super(r, o), this.bodyCode = t;
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
class v extends I {
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
const Q = "選択肢ヘルプ", R = (e) => e.parameters[0] === Q, j = (e, t = []) => new x(401, e, t), O = (e, t = []) => new x(405, e, t), U = (e, t = []) => R(e) ? new x(
  408,
  e,
  t
) : new v(
  e,
  t
), Z = (e, t = []) => new v(e, t), q = (e, t, r) => {
  const o = _(e, t), s = j(o.head, o.bodys);
  return r(s);
}, K = (e, t, r) => {
  const o = H(e, t), s = O(o.head, o.bodys);
  return r(s);
}, Y = (e, t, r) => {
  const o = G(e, t), s = U(o.head, o.bodys);
  return r(s);
}, X = (e, t, r) => {
  const o = L(e, t), s = Z(o.head, o.bodys);
  return r(s);
}, a = (e, t, r, o, s) => o ? o(e, t, r) : s(e, t, r), f = (e, t) => e.map((r, o) => $(e, o, t)), $ = (e, t, r) => {
  const o = e[t];
  switch (o.code) {
    // メッセージ関連
    case 101:
      return r.showMessage ? q(e, t, r.showMessage) : r.other(o, t, e);
    case 401:
      return a(o, t, e, r.showMessageBody, r.other);
    case 105:
      return r.showScrollingText ? K(e, t, r.showScrollingText) : r.other(o, t, e);
    case 405:
      return a(o, t, e, r.showScrollingTextBody, r.other);
    case 102:
      return a(o, t, e, r.showChoices, r.other);
    case 402:
      return a(o, t, e, r.choiceWhen, r.other);
    // コメント・スクリプト関連
    case 108:
      return r.comment ? Y(e, t, r.comment) : r.other(o, t, e);
    case 408:
      return a(o, t, e, r.commentBody, r.other);
    case 355:
      return r.script ? X(e, t, r.script) : r.other(o, t, e);
    case 655:
      return a(o, t, e, r.scriptBody, r.other);
    // 条件・制御系
    case 111:
      return a(o, t, e, r.conditionalBranch, r.other);
    case 121:
      return a(o, t, e, r.controlSwitch, r.other);
    case 122:
      return a(o, t, e, r.controlVariable, r.other);
    case 123:
      return a(o, t, e, r.controlSelfSwitch, r.other);
    case 124:
      return a(o, t, e, r.controlTimer, r.other);
    case 117:
      return a(o, t, e, r.commonEvent, r.other);
    // メニュー
    case 134:
      return a(o, t, e, r.changeSaveAccess, r.other);
    case 135:
      return a(o, t, e, r.changeMenuAccess, r.other);
    case 136:
      return a(o, t, e, r.changeEncounter, r.other);
    case 137:
      return a(o, t, e, r.changeFormationAccess, r.other);
    // キャラクター情報変更
    case 320:
      return a(o, t, e, r.changeName, r.other);
    case 325:
      return a(o, t, e, r.changeProfile, r.other);
    case 324:
      return a(o, t, e, r.changeNickname, r.other);
    case 322:
      return a(o, t, e, r.changeActorImages, r.other);
    case 323:
      return a(o, t, e, r.changeVehicleImage, r.other);
    // BGM・音楽関連
    case 132:
      return a(o, t, e, r.changeBattleBGM, r.other);
    case 133:
      return a(o, t, e, r.changeVictoryME, r.other);
    case 139:
      return a(o, t, e, r.changeDefeatME, r.other);
    case 241:
      return a(o, t, e, r.playBGM, r.other);
    case 242:
      return a(o, t, e, r.fadeOutBGM, r.other);
    case 250:
      return a(o, t, e, r.playSE, r.other);
    case 251:
      return a(o, t, e, r.stopSE, r.other);
    case 249:
      return a(o, t, e, r.playME, r.other);
    // ラベル・ジャンプ
    case 118:
      return a(o, t, e, r.label, r.other);
    case 119:
      return a(o, t, e, r.labelJump, r.other);
    // 画面演出
    case 138:
      return a(o, t, e, r.changeWindowColor, r.other);
    case 223:
      return a(o, t, e, r.tintScreen, r.other);
    case 224:
      return a(o, t, e, r.flashScreen, r.other);
    case 225:
      return a(o, t, e, r.shakeScreen, r.other);
    // ピクチャー
    case 231:
      return a(o, t, e, r.showPicture, r.other);
    case 232:
      return a(o, t, e, r.movePicture, r.other);
    case 233:
      return a(o, t, e, r.rotatePicture, r.other);
    case 234:
      return a(o, t, e, r.tintPicture, r.other);
    case 235:
      return a(o, t, e, r.erasePicture, r.other);
    // ゲーム進行
    case 301:
      return a(o, t, e, r.battleProcessing, r.other);
    case 230:
      return a(o, t, e, r.wait, r.other);
    case 353:
      return a(o, t, e, r.gameover, r.other);
    // 未整理
    case 284:
      return a(o, t, e, r.changeParallax, r.other);
    case 283:
      return a(o, t, e, r.changeBattleBackground, r.other);
    case 261:
      return a(o, t, e, r.playMovie, r.other);
    case 211:
      return a(o, t, e, r.changeTransparency, r.other);
    case 236:
      return a(o, t, e, r.setWeatherEffects, r.other);
    case 125:
      return a(o, t, e, r.changeGold, r.other);
    case 212:
      return a(o, t, e, r.showAnimation, r.other);
    case 201:
      return a(o, t, e, r.transferPlayer, r.other);
    case 202:
      return a(o, t, e, r.setVehicleLocation, r.other);
    case 203:
      return a(o, t, e, r.setEventLocation, r.other);
    default:
      return r.other(o, t, e);
  }
}, ee = {
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
}, re = (e) => f(e, ee), te = (e) => !!e, b = (e, t) => e.pages.map(
  (r, o) => t(r, o, e)
), oe = (e, t) => e.events.filter(te).map((r) => b(r, t)), ae = (e, t) => oe(e, t).flat(2), se = (e, t) => e.map((r) => b(r, t)), ce = (e, t) => e.map((r, o) => t(r, o, r)), ne = () => /<([^<>:]+):([^>]*)>/g, me = (e, t) => {
  const r = ne(), o = [];
  let s;
  for (; (s = r.exec(e)) !== null; )
    o.push(t(s[1], s[2]));
  return o;
}, de = (e, t, r) => t.map((o) => r(o, e[o], e)), he = (e, t, r) => de(e, t, r), n = (e, t) => ({
  code: e.code,
  paramIndex: t,
  value: e.parameters[t]
}), ie = (e, t) => t.includes(e.code), ue = (e) => ie(e, le), le = [
  241,
  245,
  249,
  250,
  132,
  133,
  139,
  140
], we = (e) => e.folder === w || e.folder === E || e.folder === T || e.folder === d, ge = (e) => ({
  folder: Ee(e) || "",
  fileName: e.parameters[0].name
}), Ee = (e) => pe[e.code], pe = {
  241: E,
  245: T,
  249: d,
  250: w,
  132: E,
  133: d,
  139: d,
  140: d
}, y = (e, t, r) => e.list.filter(ue).map((o) => ({
  code: o.code,
  path: ge(o),
  pageIndex: t,
  eventId: r.id
})), Te = (e) => ce(e, y).flat(2), Ce = (e) => se(e, y).flat(2), xe = (e) => ({
  bgm: e.bgm,
  bgs: e.bgs,
  commands: ae(e, y)
}), Fe = (e) => ({
  map: xe(e.map),
  filename: e.filename,
  editingName: e.editingName
}), Ie = (e) => ({
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
})), S = (e, t, r) => ({ key: e, text: t, id: r.id }), m = (e, t) => ({
  main: he(e, t, (r, o) => S(r, o, e)),
  note: A(e)
}), A = (e) => me(e.note, (t, r) => S(t, r, e)), ve = (e) => m(e, ["name", "nickname", "profile"]), Se = (e) => m(e, ["name"]), Ae = (e) => m(e, ["name"]), Me = (e) => m(e, [
  "name",
  "description",
  "message1",
  "message2"
]), Ne = (e) => m(e, ["name", "description"]), Pe = (e) => m(e, ["name", "description"]), ke = (e) => m(e, ["name", "description"]), Ge = (e) => m(e, [
  "name",
  "message1",
  "message2",
  "message3",
  "message4"
]), M = (e) => {
  const t = re(e).flat();
  return f(t, fe);
}, N = (e) => b(
  e,
  (t) => M(t.list)
), fe = {
  changeName: (e) => [n(e, 1)],
  changeNickname: (e) => [n(e, 1)],
  changeProfile: (e) => [n(e, 1)],
  showChoices: (e) => ye(e),
  showScrollingText: (e) => [n(e.mergedBody(), 0)],
  showMessage: (e) => {
    const t = e.normalizedCommands(), r = n(t[0], 4), o = t[1];
    return o ? [r, n(o, 0)] : [r];
  },
  choiceWhen() {
    return [];
  },
  comment(e) {
    const t = e.mergedBody();
    return [n(t, 0)];
  },
  script: (e) => be(),
  other: () => [],
  commentBody: () => []
}, be = (e) => [], ye = (e) => e.parameters[0].map((t, r) => ({
  code: e.code,
  paramIndex: r,
  value: t
})), Le = (e) => {
  const t = N(e);
  return {
    note: A(e),
    eventId: e.id,
    commands: t.flat(2)
  };
}, De = (e) => {
  const t = N(e);
  return {
    troopId: e.id,
    commands: t.flat(2)
  };
}, We = (e) => ({
  eventId: e.id,
  commands: M(e.list).flat(2)
}), _e = (e) => f(e, Be), c = (e, t, r) => ({
  folderName: r,
  command: n(e, t)
}), Be = {
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
}, ze = (e) => ({
  key: "battlerName",
  image: e.battlerName,
  id: e.id
}), l = (e, t, r) => ({
  folder: r,
  key: t,
  image: e[t],
  id: e.id
}), Ve = (e) => [
  l(e, "faceName", "faces"),
  l(e, "characterName", "characters"),
  l(e, "battlerName", "sv_actors")
], g = (e, t) => ({
  folder: "characters",
  key: t,
  image: e[t].characterName
}), B = (e, t, r) => ({
  folder: r,
  key: t,
  image: e[t]
}), He = (e) => [
  B(e, "title1Name", "titles1"),
  B(e, "title2Name", "titles2"),
  g(e, "boat"),
  g(e, "ship"),
  g(e, "airship")
];
export {
  ge as audioPathFromCommands,
  y as collectAudioCommands,
  ye as commandChoice,
  Le as correctMapEventText,
  Ce as expectAudioFromTroop,
  Te as extractAudioCFromCommonEvents,
  xe as extractAudioFromMap,
  Fe as extractAudioFromMapFileInfo,
  Ve as extractImageFromActor,
  ze as extractImageFromEnemy,
  He as extractImageFromSystem,
  _e as extractImagesFromCommands,
  A as extractNoteText,
  m as extractTextData,
  ve as extractTextFromActor,
  ke as extractTextFromArmor,
  Ae as extractTextFromClass,
  We as extractTextFromCommonEvent,
  Se as extractTextFromEnemy,
  M as extractTextFromEventCommands,
  N as extractTextFromEventPages,
  Ne as extractTextFromItem,
  Me as extractTextFromSkill,
  Ge as extractTextFromState,
  De as extractTextFromTroop,
  Pe as extractTextFromWeapon,
  fe as extractTextMapper,
  we as isAudioResource,
  be as readScript,
  Ie as systemAudioFiles
};
//# sourceMappingURL=rpg-analyzer.es.js.map
