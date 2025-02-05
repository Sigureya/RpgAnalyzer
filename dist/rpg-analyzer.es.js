const g = "bgm", w = "se", d = "me", B = "bgs", p = (e, r) => r ? e === r.code : !1, k = "MessageHeader invalid command", D = "Invalid Head", T = (e) => typeof e[0] == "string" && e.length === 1, h = (e, r, t) => {
  const o = [];
  for (let s = t; s < r.length; s++) {
    const i = r[s];
    if (p(e, i) && T(i.parameters))
      o.push({
        code: e,
        indent: i.indent,
        parameters: [i.parameters[0]]
      });
    else
      break;
  }
  return o;
}, C = (e, r, t) => {
  const o = e[r];
  if (o && p(t, o) && T(o.parameters))
    return {
      code: t,
      indent: o.indent,
      parameters: [o.parameters[0]]
    };
  throw new Error(D, { cause: o });
}, P = (e, r) => ({
  head: C(e, r, 108),
  bodys: h(408, e, r + 1)
}), _ = (e, r) => ({
  head: C(e, r, 355),
  bodys: h(655, e, r + 1)
}), z = (e, r) => {
  const t = e[r];
  if (t && G(t))
    return t;
  throw new Error(k, { cause: t });
}, G = (e) => !e || e.code !== 101 || ![4, 5].includes(e.parameters.length) ? !1 : typeof e.parameters[0] == "string" && typeof e.parameters[1] == "number" && typeof e.parameters[2] == "number" && typeof e.parameters[3] == "number", L = (e, r) => ({
  head: z(e, r),
  bodys: h(401, e, r + 1)
}), J = "ScrollTextHeader invalid command", V = (e, r) => {
  const t = e[r];
  if (p(105, t))
    return t;
  const o = {
    headCode: 105,
    bodyCode: 405,
    index: r
  };
  throw new Error(J, { cause: o });
}, W = (e, r) => ({
  head: V(e, r),
  bodys: h(405, e, r + 1)
}), H = (e, r = `
`) => e.map((t) => t.parameters[0]).join(r);
class I {
  constructor(r, t) {
    this.header = r, this.bodies = t;
  }
  getBodyText(r = `
`) {
    return H(this.getExpandedBodies(), r);
  }
  jopinHedderAndBody() {
    return [this.header, ...this.bodies];
  }
  joinCommandBodies() {
    return this.getExpandedBodies();
  }
}
class x extends I {
  constructor(r, t, o) {
    super(t, o), this.bodyCode = r;
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
class F extends I {
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
const Q = "選択肢ヘルプ", R = (e) => e.parameters[0] === Q, Z = (e, r = []) => new x(401, e, r), j = (e, r = []) => new x(405, e, r), O = (e, r = []) => R(e) ? new x(
  408,
  e,
  r
) : new F(
  e,
  r
), U = (e, r = []) => new F(e, r), K = (e, r, t) => {
  const o = L(e, r), s = Z(o.head, o.bodys);
  return t(s);
}, Y = (e, r, t) => {
  const o = W(e, r), s = j(o.head, o.bodys);
  return t(s);
}, q = (e, r, t) => {
  const o = P(e, r), s = O(o.head, o.bodys);
  return t(s);
}, X = (e, r, t) => {
  const o = _(e, r), s = U(o.head, o.bodys);
  return t(s);
}, a = (e, r, t, o, s) => o ? o(e, r, t) : s(e, r, t), E = (e, r) => e.map((t, o) => $(e, o, r)), $ = (e, r, t) => {
  const o = e[r];
  switch (o.code) {
    case 101:
      return t.showMessage ? K(e, r, t.showMessage) : t.other(o, r, e);
    case 401:
      return a(o, r, e, t.showMessageBody, t.other);
    case 105:
      return t.showScrollingText ? Y(e, r, t.showScrollingText) : t.other(o, r, e);
    case 405:
      return a(o, r, e, t.showScrollingTextBody, t.other);
    case 108:
      return t.comment ? q(e, r, t.comment) : t.other(o, r, e);
    case 408:
      return a(o, r, e, t.commentBody, t.other);
    case 355:
      return t.script ? X(e, r, t.script) : t.other(o, r, e);
    case 655:
      return a(o, r, e, t.scriptBody, t.other);
    case 121:
      return a(o, r, e, t.controlSwitch, t.other);
    case 122:
      return a(o, r, e, t.controlVariable, t.other);
    case 123:
      return a(o, r, e, t.controlSelfSwitch, t.other);
    case 124:
      return a(o, r, e, t.controlTimer, t.other);
    case 111:
      return a(o, r, e, t.conditionalBranch, t.other);
    case 102:
      return a(o, r, e, t.showChoices, t.other);
    case 402:
      return a(o, r, e, t.choiceWhen, t.other);
    case 320:
      return a(o, r, e, t.changeName, t.other);
    case 325:
      return a(o, r, e, t.changeProfile, t.other);
    case 324:
      return a(o, r, e, t.changeNickname, t.other);
    case 117:
      return a(o, r, e, t.commonEvent, t.other);
    case 118:
      return a(o, r, e, t.label, t.other);
    case 119:
      return a(o, r, e, t.labelJump, t.other);
    case 132:
      return a(o, r, e, t.changeBattleBGM, t.other);
    case 133:
      return a(o, r, e, t.changeVictoryME, t.other);
    case 139:
      return a(o, r, e, t.changeDefeatME, t.other);
    case 134:
      return a(o, r, e, t.changeSaveAccess, t.other);
    case 135:
      return a(o, r, e, t.changeMenuAccess, t.other);
    case 136:
      return a(o, r, e, t.changeEncounter, t.other);
    case 137:
      return a(o, r, e, t.changeFormationAccess, t.other);
    case 138:
      return a(o, r, e, t.changeWindowColor, t.other);
    case 223:
      return a(o, r, e, t.tintScreen, t.other);
    case 224:
      return a(o, r, e, t.flashScreen, t.other);
    case 225:
      return a(o, r, e, t.shakeScreen, t.other);
    case 301:
      return a(o, r, e, t.battleProcessing, t.other);
    case 230:
      return a(o, r, e, t.wait, t.other);
    case 322:
      return a(o, r, e, t.changeActorImages, t.other);
    case 125:
      return a(o, r, e, t.changeGold, t.other);
    case 212:
      return a(o, r, e, t.showAnimation, t.other);
    case 201:
      return a(o, r, e, t.transferPlayer, t.other);
    case 202:
      return a(o, r, e, t.setVehicleLocation, t.other);
    case 203:
      return a(o, r, e, t.setEventLocation, t.other);
    case 353:
      return a(o, r, e, t.gameover, t.other);
  }
  return t.other(o, r, e);
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
}, re = (e) => E(e, ee), te = (e) => !!e, f = (e, r) => e.pages.map(
  (t, o) => r(t, o, e)
), oe = (e, r) => e.events.filter(te).map((t) => f(t, r)), ae = (e, r) => oe(e, r).flat(2), se = (e, r) => e.map((t) => f(t, r)), ce = (e, r) => e.map((t, o) => r(t, o, t)), ne = () => /<([^<>:]+):([^>]*)>/g, me = (e, r) => {
  const t = ne(), o = [];
  let s;
  for (; (s = t.exec(e)) !== null; )
    o.push(r(s[1], s[2]));
  return o;
}, de = (e, r, t) => r.map((o) => t(o, e[o], e)), v = (e, r, t) => de(e, r, t), n = (e, r) => ({
  code: e.code,
  paramIndex: r,
  value: e.parameters[r]
}), Be = (e) => e.folder === w || e.folder === g || e.folder === B || e.folder === d, ie = [
  241,
  245,
  249,
  250,
  132,
  133,
  139,
  140
], he = (e) => ie.includes(e.code), ue = (e) => ({
  folder: le(e) || "",
  fileName: e.parameters[0].name
}), le = (e) => ge[e.code], ge = {
  241: g,
  245: B,
  249: d,
  250: w,
  132: g,
  133: d,
  139: d,
  140: d
}, b = (e, r, t) => e.list.filter(he).map((o) => ({
  code: o.code,
  path: ue(o),
  pageIndex: r,
  eventId: t.id
})), Te = (e) => ce(e, b).flat(2), Ce = (e) => se(e, b).flat(2), pe = (e) => ({
  bgm: e.bgm,
  bgs: e.bgs,
  commands: ae(e, b)
}), Ie = (e) => ({
  map: pe(e.map),
  filename: e.filename,
  editingName: e.editingName
}), Fe = (e) => ({
  sounds: u(e.sounds),
  bgm: u([e.battleBgm, e.titleBgm]),
  me: u([
    e.defeatMe,
    e.gameoverMe,
    e.victoryMe
  ])
}), u = (e) => e.map((r, t) => ({
  index: t,
  path: r.name
})), S = (e, r, t) => ({ key: e, text: r, id: t.id }), m = (e, r) => ({
  main: v(e, r, (t, o) => S(t, o, e)),
  note: A(e)
}), A = (e) => me(e.note, (r, t) => S(r, t, e)), ve = (e) => m(e, ["name", "nickname", "profile"]), Se = (e) => m(e, ["name"]), Ae = (e) => m(e, ["name"]), Me = (e) => m(e, [
  "name",
  "description",
  "message1",
  "message2"
]), Ne = (e) => m(e, ["name", "description"]), ke = (e) => m(e, ["name", "description"]), De = (e) => m(e, ["name", "description"]), Pe = (e) => m(e, [
  "name",
  "message1",
  "message2",
  "message3",
  "message4"
]), M = (e) => {
  const r = re(e).flat();
  return E(r, xe);
}, N = (e) => f(
  e,
  (r) => M(r.list)
), xe = {
  changeName: (e) => [n(e, 1)],
  changeNickname: (e) => [n(e, 1)],
  changeProfile: (e) => [n(e, 1)],
  showChoices: (e) => fe(e),
  showScrollingText: (e) => [n(e.mergedBody(), 0)],
  showMessage: (e) => {
    const r = e.normalizedCommands(), t = n(r[0], 4), o = r[1];
    return o ? [t, n(o, 0)] : [t];
  },
  choiceWhen() {
    return [];
  },
  comment(e) {
    const r = e.mergedBody();
    return [n(r, 0)];
  },
  script: (e) => Ee(),
  other: () => [],
  commentBody: () => []
}, Ee = (e) => [], fe = (e) => e.parameters[0].map((r, t) => ({
  code: e.code,
  paramIndex: t,
  value: r
})), _e = (e) => {
  const r = N(e);
  return {
    note: A(e),
    eventId: e.id,
    commands: r.flat(2)
  };
}, ze = (e) => {
  const r = N(e);
  return {
    troopId: e.id,
    commands: r.flat(2)
  };
}, Ge = (e) => ({
  eventId: e.id,
  commands: M(e.list).flat(2)
}), Le = (e) => E(e, be), c = (e, r, t) => ({
  folderName: t,
  command: n(e, r)
}), be = {
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
}, Je = (e) => ({
  key: "battlerName",
  image: e.battlerName,
  id: e.id
}), ye = (e, r, t) => ({ key: e, image: r, id: t.id }), we = (e, r) => v(
  e,
  r,
  (t, o) => ye(t, o, e)
), Ve = (e) => we(e, ["characterName", "faceName", "battlerName"]), l = (e, r) => ({
  folder: "characters",
  key: r,
  image: e[r].characterName
}), y = (e, r, t) => ({
  folder: t,
  key: r,
  image: e[r]
}), We = (e) => [
  y(e, "title1Name", "titles1"),
  y(e, "title2Name", "titles2"),
  l(e, "boat"),
  l(e, "ship"),
  l(e, "airship")
];
export {
  ue as audioPathFromCommands,
  b as collectAudioCommands,
  fe as commandChoice,
  _e as correctMapEventText,
  Ce as expectAudioFromTroop,
  Te as extractAudioCFromCommonEvents,
  pe as extractAudioFromMap,
  Ie as extractAudioFromMapFileInfo,
  we as extractImageData,
  Ve as extractImageFromActor,
  Je as extractImageFromEnemy,
  We as extractImageFromSystem,
  Le as extractImagesFromCommands,
  A as extractNoteText,
  m as extractTextData,
  ve as extractTextFromActor,
  De as extractTextFromArmor,
  Ae as extractTextFromClass,
  Ge as extractTextFromCommonEvent,
  Se as extractTextFromEnemy,
  M as extractTextFromEventCommands,
  N as extractTextFromEventPages,
  Ne as extractTextFromItem,
  Me as extractTextFromSkill,
  Pe as extractTextFromState,
  ze as extractTextFromTroop,
  ke as extractTextFromWeapon,
  xe as extractTextMapper,
  ye as extractedImageItem,
  he as isAudioCommand,
  Be as isAudioResource,
  Ee as readScript,
  Fe as systemAudioFiles
};
//# sourceMappingURL=rpg-analyzer.es.js.map
