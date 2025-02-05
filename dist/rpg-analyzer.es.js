const u = "bgm", x = "se", d = "me", f = "bgs", l = (e, r) => r ? e === r.code : !1, A = "MessageHeader invalid command", I = "Invalid Head", y = (e) => typeof e[0] == "string" && e.length === 1, i = (e, r, t) => {
  const o = [];
  for (let a = t; a < r.length; a++) {
    const m = r[a];
    if (l(e, m) && y(m.parameters))
      o.push({
        code: e,
        indent: m.indent,
        parameters: [m.parameters[0]]
      });
    else
      break;
  }
  return o;
}, w = (e, r, t) => {
  const o = e[r];
  if (o && l(t, o) && y(o.parameters))
    return {
      code: t,
      indent: o.indent,
      parameters: [o.parameters[0]]
    };
  throw new Error(I, { cause: o });
}, M = (e, r) => ({
  head: w(e, r, 108),
  bodys: i(408, e, r + 1)
}), N = (e, r) => ({
  head: w(e, r, 355),
  bodys: i(655, e, r + 1)
}), k = (e, r) => {
  const t = e[r];
  if (t && z(t))
    return t;
  throw new Error(A, { cause: t });
}, z = (e) => !e || e.code !== 101 || ![4, 5].includes(e.parameters.length) ? !1 : typeof e.parameters[0] == "string" && typeof e.parameters[1] == "number" && typeof e.parameters[2] == "number" && typeof e.parameters[3] == "number", D = (e, r) => ({
  head: k(e, r),
  bodys: i(401, e, r + 1)
}), G = "ScrollTextHeader invalid command", L = (e, r) => {
  const t = e[r];
  if (l(105, t))
    return t;
  const o = {
    headCode: 105,
    bodyCode: 405,
    index: r
  };
  throw new Error(G, { cause: o });
}, _ = (e, r) => ({
  head: L(e, r),
  bodys: i(405, e, r + 1)
}), P = (e, r = `
`) => e.map((t) => t.parameters[0]).join(r);
class T {
  constructor(r, t) {
    this.header = r, this.bodies = t;
  }
  getBodyText(r = `
`) {
    return P(this.getExpandedBodies(), r);
  }
  jopinHedderAndBody() {
    return [this.header, ...this.bodies];
  }
  joinCommandBodies() {
    return this.getExpandedBodies();
  }
}
class g extends T {
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
class b extends T {
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
const J = "選択肢ヘルプ", W = (e) => e.parameters[0] === J, H = (e, r = []) => new g(401, e, r), Q = (e, r = []) => new g(405, e, r), R = (e, r = []) => W(e) ? new g(
  408,
  e,
  r
) : new b(
  e,
  r
), V = (e, r = []) => new b(e, r), Z = (e, r, t) => {
  const o = D(e, r), a = H(o.head, o.bodys);
  return t(a);
}, j = (e, r, t) => {
  const o = _(e, r), a = Q(o.head, o.bodys);
  return t(a);
}, O = (e, r, t) => {
  const o = M(e, r), a = R(o.head, o.bodys);
  return t(a);
}, U = (e, r, t) => {
  const o = N(e, r), a = V(o.head, o.bodys);
  return t(a);
}, s = (e, r, t, o, a) => o ? o(e, r, t) : a(e, r, t), B = (e, r) => e.map((t, o) => K(e, o, r)), K = (e, r, t) => {
  const o = e[r];
  switch (o.code) {
    case 101:
      return t.showMessage ? Z(e, r, t.showMessage) : t.other(o, r, e);
    case 401:
      return s(o, r, e, t.showMessageBody, t.other);
    case 105:
      return t.showScrollingText ? j(e, r, t.showScrollingText) : t.other(o, r, e);
    case 405:
      return s(o, r, e, t.showScrollingTextBody, t.other);
    case 108:
      return t.comment ? O(e, r, t.comment) : t.other(o, r, e);
    case 408:
      return s(o, r, e, t.commentBody, t.other);
    case 355:
      return t.script ? U(e, r, t.script) : t.other(o, r, e);
    case 655:
      return s(o, r, e, t.scriptBody, t.other);
    case 121:
      return s(o, r, e, t.controlSwitch, t.other);
    case 122:
      return s(o, r, e, t.controlVariable, t.other);
    case 123:
      return s(o, r, e, t.controlSelfSwitch, t.other);
    case 124:
      return s(o, r, e, t.controlTimer, t.other);
    case 111:
      return s(o, r, e, t.conditionalBranch, t.other);
    case 102:
      return s(o, r, e, t.showChoices, t.other);
    case 402:
      return s(o, r, e, t.choiceWhen, t.other);
    case 320:
      return s(o, r, e, t.changeName, t.other);
    case 325:
      return s(o, r, e, t.changeProfile, t.other);
    case 324:
      return s(o, r, e, t.changeNickname, t.other);
    case 117:
      return s(o, r, e, t.commonEvent, t.other);
    case 118:
      return s(o, r, e, t.label, t.other);
    case 119:
      return s(o, r, e, t.labelJump, t.other);
    case 132:
      return s(o, r, e, t.changeBattleBGM, t.other);
    case 133:
      return s(o, r, e, t.changeVictoryME, t.other);
    case 139:
      return s(o, r, e, t.changeDefeatME, t.other);
    case 134:
      return s(o, r, e, t.changeSaveAccess, t.other);
    case 135:
      return s(o, r, e, t.changeMenuAccess, t.other);
    case 136:
      return s(o, r, e, t.changeEncounter, t.other);
    case 137:
      return s(o, r, e, t.changeFormationAccess, t.other);
    case 138:
      return s(o, r, e, t.changeWindowColor, t.other);
    case 223:
      return s(o, r, e, t.tintScreen, t.other);
    case 224:
      return s(o, r, e, t.flashScreen, t.other);
    case 225:
      return s(o, r, e, t.shakeScreen, t.other);
    case 301:
      return s(o, r, e, t.battleProcessing, t.other);
    case 230:
      return s(o, r, e, t.wait, t.other);
    case 322:
      return s(o, r, e, t.changeActorImages, t.other);
    case 125:
      return s(o, r, e, t.changeGold, t.other);
    case 212:
      return s(o, r, e, t.showAnimation, t.other);
    case 201:
      return s(o, r, e, t.transferPlayer, t.other);
    case 202:
      return s(o, r, e, t.setVehicleLocation, t.other);
    case 203:
      return s(o, r, e, t.setEventLocation, t.other);
    case 353:
      return s(o, r, e, t.gameover, t.other);
  }
  return t.other(o, r, e);
}, Y = {
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
}, q = (e) => B(e, Y), X = (e) => !!e, p = (e, r) => e.pages.map(
  (t, o) => r(t, o, e)
), $ = (e, r) => e.events.filter(X).map((t) => p(t, r)), ee = (e, r) => $(e, r).flat(2), re = (e, r) => e.map((t) => p(t, r)), te = (e, r) => e.map((t, o) => r(t, o, t)), oe = () => /<([^<>:]+):([^>]*)>/g, se = (e, r) => {
  const t = oe(), o = [];
  let a;
  for (; (a = t.exec(e)) !== null; )
    o.push(r(a[1], a[2]));
  return o;
}, ae = (e, r, t) => r.map((o) => t(o, e[o], e)), ne = (e, r, t) => ae(e, r, t), c = (e, r) => ({
  code: e.code,
  paramIndex: r,
  value: e.parameters[r]
}), Ee = (e) => e.folder === x || e.folder === u || e.folder === f || e.folder === d, ce = [
  241,
  245,
  249,
  250,
  132,
  133,
  139,
  140
], de = (e) => ce.includes(e.code), me = (e) => ({
  folder: ie(e) || "",
  fileName: e.parameters[0].name
}), ie = (e) => he[e.code], he = {
  241: u,
  245: f,
  249: d,
  250: x,
  132: u,
  133: d,
  139: d,
  140: d
}, E = (e, r, t) => e.list.filter(de).map((o) => ({
  code: o.code,
  path: me(o),
  pageIndex: r,
  eventId: t.id
})), xe = (e) => te(e, E).flat(2), fe = (e) => re(e, E).flat(2), ue = (e) => ({
  bgm: e.bgm,
  bgs: e.bgs,
  commands: ee(e, E)
}), ye = (e) => ({
  map: ue(e.map),
  filename: e.filename,
  editingName: e.editingName
}), we = (e) => ({
  sounds: h(e.sounds),
  bgm: h([e.battleBgm, e.titleBgm]),
  me: h([
    e.defeatMe,
    e.gameoverMe,
    e.victoryMe
  ])
}), h = (e) => e.map((r, t) => ({
  index: t,
  path: r.name
})), C = (e, r, t) => ({ key: e, text: r, id: t.id }), n = (e, r) => ({
  main: ne(e, r, (t, o) => C(t, o, e)),
  note: F(e)
}), F = (e) => se(e.note, (r, t) => C(r, t, e)), Te = (e) => n(e, ["name", "nickname", "profile"]), be = (e) => n(e, ["name"]), Be = (e) => n(e, ["name"]), Ce = (e) => n(e, [
  "name",
  "description",
  "message1",
  "message2"
]), Fe = (e) => n(e, ["name", "description"]), Se = (e) => n(e, ["name", "description"]), ve = (e) => n(e, ["name", "description"]), Ae = (e) => n(e, [
  "name",
  "message1",
  "message2",
  "message3",
  "message4"
]), S = (e) => {
  const r = q(e).flat();
  return B(r, le);
}, v = (e) => p(
  e,
  (r) => S(r.list)
), le = {
  changeName: (e) => [c(e, 1)],
  changeNickname: (e) => [c(e, 1)],
  changeProfile: (e) => [c(e, 1)],
  showChoices: (e) => pe(e),
  showScrollingText: (e) => [c(e.mergedBody(), 0)],
  showMessage: (e) => {
    const r = e.normalizedCommands(), t = c(r[0], 4), o = r[1];
    return o ? [t, c(o, 0)] : [t];
  },
  choiceWhen() {
    return [];
  },
  comment(e) {
    const r = e.mergedBody();
    return [c(r, 0)];
  },
  script: (e) => ge(),
  other: () => [],
  commentBody: () => []
}, ge = (e) => [], pe = (e) => e.parameters[0].map((r, t) => ({
  code: e.code,
  paramIndex: t,
  value: r
})), Ie = (e) => {
  const r = v(e);
  return {
    note: F(e),
    eventId: e.id,
    commands: r.flat(2)
  };
}, Me = (e) => {
  const r = v(e);
  return {
    troopId: e.id,
    commands: r.flat(2)
  };
}, Ne = (e) => ({
  eventId: e.id,
  commands: S(e.list).flat(2)
});
export {
  me as audioPathFromCommands,
  E as collectAudioCommands,
  pe as commandChoice,
  Ie as correctMapEventText,
  fe as expectAudioFromTroop,
  xe as extractAudioCFromCommonEvents,
  ue as extractAudioFromMap,
  ye as extractAudioFromMapFileInfo,
  F as extractNoteText,
  n as extractTextData,
  Te as extractTextFromActor,
  ve as extractTextFromArmor,
  Be as extractTextFromClass,
  Ne as extractTextFromCommonEvent,
  be as extractTextFromEnemy,
  S as extractTextFromEventCommands,
  v as extractTextFromEventPages,
  Fe as extractTextFromItem,
  Ce as extractTextFromSkill,
  Ae as extractTextFromState,
  Me as extractTextFromTroop,
  Se as extractTextFromWeapon,
  le as extractTextMapper,
  de as isAudioCommand,
  Ee as isAudioResource,
  ge as readScript,
  we as systemAudioFiles
};
//# sourceMappingURL=rpg-analyzer.es.js.map
