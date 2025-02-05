const E = "bgm", T = "se", d = "me", w = "bgs", p = (e, t) => t ? e === t.code : !1, P = "MessageHeader invalid command", k = "Invalid Head", C = (e) => typeof e[0] == "string" && e.length === 1, i = (e, t, r) => {
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
}, I = (e, t, r) => {
  const o = e[t];
  if (o && p(r, o) && C(o.parameters))
    return {
      code: r,
      indent: o.indent,
      parameters: [o.parameters[0]]
    };
  throw new Error(k, { cause: o });
}, G = (e, t) => ({
  head: I(e, t, 108),
  bodys: i(408, e, t + 1)
}), L = (e, t) => ({
  head: I(e, t, 355),
  bodys: i(655, e, t + 1)
}), _ = (e, t) => {
  const r = e[t];
  if (r && D(r))
    return r;
  throw new Error(P, { cause: r });
}, D = (e) => !e || e.code !== 101 || ![4, 5].includes(e.parameters.length) ? !1 : typeof e.parameters[0] == "string" && typeof e.parameters[1] == "number" && typeof e.parameters[2] == "number" && typeof e.parameters[3] == "number", W = (e, t) => ({
  head: _(e, t),
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
}, J = (e, t) => ({
  head: V(e, t),
  bodys: i(405, e, t + 1)
}), H = (e, t = `
`) => e.map((r) => r.parameters[0]).join(t);
class F {
  constructor(t, r) {
    this.header = t, this.bodies = r;
  }
  getBodyText(t = `
`) {
    return H(this.getExpandedBodies(), t);
  }
  jopinHedderAndBody() {
    return [this.header, ...this.bodies];
  }
  joinCommandBodies() {
    return this.getExpandedBodies();
  }
}
class x extends F {
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
class S extends F {
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
const Q = "選択肢ヘルプ", R = (e) => e.parameters[0] === Q, O = (e, t = []) => new x(401, e, t), Z = (e, t = []) => new x(405, e, t), j = (e, t = []) => R(e) ? new x(
  408,
  e,
  t
) : new S(
  e,
  t
), U = (e, t = []) => new S(e, t), q = (e, t, r) => {
  const o = W(e, t), s = O(o.head, o.bodys);
  return r(s);
}, K = (e, t, r) => {
  const o = J(e, t), s = Z(o.head, o.bodys);
  return r(s);
}, Y = (e, t, r) => {
  const o = G(e, t), s = j(o.head, o.bodys);
  return r(s);
}, X = (e, t, r) => {
  const o = L(e, t), s = U(o.head, o.bodys);
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
), oe = (e, t) => e.events.filter(te).map((r) => b(r, t)), ae = (e, t) => oe(e, t).flat(2), se = (e, t) => e.map((r) => b(r, t)), ne = (e, t) => e.map((r, o) => t(r, o, r)), ce = () => /<([^<>:]+):([^>]*)>/g, me = (e, t) => {
  const r = ce(), o = [];
  let s;
  for (; (s = r.exec(e)) !== null; )
    o.push(t(s[1], s[2]));
  return o;
}, de = (e, t, r) => t.map((o) => r(o, e[o], e)), he = (e, t, r) => de(e, t, r), c = (e, t) => ({
  code: e.code,
  paramIndex: t,
  value: e.parameters[t]
}), Be = (e) => e.folder === T || e.folder === E || e.folder === w || e.folder === d, ie = [
  241,
  245,
  249,
  250,
  132,
  133,
  139,
  140
], ue = (e) => ie.includes(e.code), le = (e) => ({
  folder: ge(e) || "",
  fileName: e.parameters[0].name
}), ge = (e) => Ee[e.code], Ee = {
  241: E,
  245: w,
  249: d,
  250: T,
  132: E,
  133: d,
  139: d,
  140: d
}, y = (e, t, r) => e.list.filter(ue).map((o) => ({
  code: o.code,
  path: le(o),
  pageIndex: t,
  eventId: r.id
})), Te = (e) => ne(e, y).flat(2), we = (e) => se(e, y).flat(2), pe = (e) => ({
  bgm: e.bgm,
  bgs: e.bgs,
  commands: ae(e, y)
}), Ce = (e) => ({
  map: pe(e.map),
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
})), v = (e, t, r) => ({ key: e, text: t, id: r.id }), m = (e, t) => ({
  main: he(e, t, (r, o) => v(r, o, e)),
  note: A(e)
}), A = (e) => me(e.note, (t, r) => v(t, r, e)), Fe = (e) => m(e, ["name", "nickname", "profile"]), Se = (e) => m(e, ["name"]), ve = (e) => m(e, ["name"]), Ae = (e) => m(e, [
  "name",
  "description",
  "message1",
  "message2"
]), Me = (e) => m(e, ["name", "description"]), Ne = (e) => m(e, ["name", "description"]), Pe = (e) => m(e, ["name", "description"]), ke = (e) => m(e, [
  "name",
  "message1",
  "message2",
  "message3",
  "message4"
]), M = (e) => {
  const t = re(e).flat();
  return f(t, xe);
}, N = (e) => b(
  e,
  (t) => M(t.list)
), xe = {
  changeName: (e) => [c(e, 1)],
  changeNickname: (e) => [c(e, 1)],
  changeProfile: (e) => [c(e, 1)],
  showChoices: (e) => be(e),
  showScrollingText: (e) => [c(e.mergedBody(), 0)],
  showMessage: (e) => {
    const t = e.normalizedCommands(), r = c(t[0], 4), o = t[1];
    return o ? [r, c(o, 0)] : [r];
  },
  choiceWhen() {
    return [];
  },
  comment(e) {
    const t = e.mergedBody();
    return [c(t, 0)];
  },
  script: (e) => fe(),
  other: () => [],
  commentBody: () => []
}, fe = (e) => [], be = (e) => e.parameters[0].map((t, r) => ({
  code: e.code,
  paramIndex: r,
  value: t
})), Ge = (e) => {
  const t = N(e);
  return {
    note: A(e),
    eventId: e.id,
    commands: t.flat(2)
  };
}, Le = (e) => {
  const t = N(e);
  return {
    troopId: e.id,
    commands: t.flat(2)
  };
}, _e = (e) => ({
  eventId: e.id,
  commands: M(e.list).flat(2)
}), De = (e) => f(e, ye), n = (e, t, r) => ({
  folderName: r,
  command: c(e, t)
}), ye = {
  changeActorImages: (e) => [
    n(e, 1, "characters"),
    n(e, 3, "faces"),
    n(e, 5, "sv_actors")
  ],
  showPicture: (e) => [n(e, 1, "pictures")],
  changeBattleBackground: (e) => [
    n(e, 0, "battlebacks1"),
    n(e, 1, "battlebacks2")
  ],
  changeParallax: (e) => [n(e, 0, "parallaxes")],
  changeVehicleImage: (e) => [n(e, 1, "characters")],
  other: () => []
}, We = (e) => ({
  key: "battlerName",
  image: e.battlerName,
  id: e.id
}), l = (e, t, r) => ({
  folder: r,
  key: t,
  image: e[t],
  id: e.id
}), ze = (e) => [
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
}), Ve = (e) => [
  B(e, "title1Name", "titles1"),
  B(e, "title2Name", "titles2"),
  g(e, "boat"),
  g(e, "ship"),
  g(e, "airship")
];
export {
  le as audioPathFromCommands,
  y as collectAudioCommands,
  be as commandChoice,
  Ge as correctMapEventText,
  we as expectAudioFromTroop,
  Te as extractAudioCFromCommonEvents,
  pe as extractAudioFromMap,
  Ce as extractAudioFromMapFileInfo,
  ze as extractImageFromActor,
  We as extractImageFromEnemy,
  Ve as extractImageFromSystem,
  De as extractImagesFromCommands,
  A as extractNoteText,
  m as extractTextData,
  Fe as extractTextFromActor,
  Pe as extractTextFromArmor,
  ve as extractTextFromClass,
  _e as extractTextFromCommonEvent,
  Se as extractTextFromEnemy,
  M as extractTextFromEventCommands,
  N as extractTextFromEventPages,
  Me as extractTextFromItem,
  Ae as extractTextFromSkill,
  ke as extractTextFromState,
  Le as extractTextFromTroop,
  Ne as extractTextFromWeapon,
  xe as extractTextMapper,
  ue as isAudioCommand,
  Be as isAudioResource,
  fe as readScript,
  Ie as systemAudioFiles
};
//# sourceMappingURL=rpg-analyzer.es.js.map
