const s = "bgm", a = "se", r = "me", i = "bgs", d = (e) => ({
  type: 0,
  elementId: 0,
  formula: "0",
  variance: 20,
  critical: !1,
  ...e
}), l = (e) => ({
  id: 0,
  name: "",
  iconIndex: 0,
  description: "",
  note: "",
  price: 0,
  consumable: !1,
  scope: 0,
  occasion: 0,
  speed: 0,
  successRate: 100,
  repeats: 1,
  tpGain: 0,
  hitType: 0,
  animationId: 0,
  damage: d(),
  effects: [],
  ...e
}), f = (e) => !!e, m = (e, o) => e.pages.map(
  (t, n) => o(t, n, e)
), p = (e, o) => e.events.filter(f).map((t) => m(t, o)), u = (e, o) => p(e, o).flat(2), E = (e, o) => e.map((t) => m(t, o)), I = (e, o) => e.map((t, n) => o(t, n, { id: t.id })), x = l({ name: "やくそう", price: 50 }), C = (e) => e.folder === a || e.folder === s || e.folder === i || e.folder === r, g = [
  241,
  245,
  249,
  250,
  132,
  133,
  139,
  140
], A = (e) => g.includes(e.code), F = (e) => ({
  folder: b(e) || "",
  fileName: e.parameters[0].name
}), b = (e) => _[e.code], _ = {
  241: s,
  245: i,
  249: r,
  250: a,
  132: s,
  133: r,
  139: r,
  140: r
}, c = (e, o, t) => e.list.filter(A).map((n) => ({
  code: n.code,
  path: F(n),
  pageIndex: o,
  eventId: t.id
})), v = (e) => I(e, c).flat(2), D = (e) => E(e, c).flat(2), G = (e) => ({
  bgm: e.bgm,
  bgs: e.bgs,
  commands: u(e, c)
});
export {
  F as audioPathFromCommands,
  c as collectAudioCommands,
  D as expectAudioFromTroop,
  v as extractAudioCFromCommonEvents,
  G as extractAudioFromMap,
  A as isAudioCommand,
  C as isAudioResource,
  x as item
};
//# sourceMappingURL=rpg-analyzer.es.js.map
