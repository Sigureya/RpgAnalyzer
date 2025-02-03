const c = "bgm", r = "se", s = "me", a = "bgs", i = (e) => ({
  type: 0,
  elementId: 0,
  formula: "0",
  variance: 20,
  critical: !1,
  ...e
}), d = (e) => ({
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
  damage: i(),
  effects: [],
  ...e
}), m = (e) => !!e, l = (e, o) => e.pages.map(
  (t, n) => o(t, n, e)
), f = (e, o) => e.events.filter(m).map((t) => l(t, o)), p = (e, o) => f(e, o).flat(2), A = d({ name: "やくそう", price: 50 }), F = (e) => e.folder === r || e.folder === c || e.folder === a || e.folder === s, u = [
  241,
  245,
  249,
  250,
  132,
  133,
  139,
  140
], E = (e) => u.includes(e.code), I = (e) => ({
  folder: g(e) || "",
  fileName: e.parameters[0].name
}), g = (e) => b[e.code], b = {
  241: c,
  245: a,
  249: s,
  250: r,
  132: c,
  133: s,
  139: s,
  140: s
}, _ = (e, o, t) => e.list.filter(E).map((n) => ({
  code: n.code,
  path: I(n),
  pageIndex: o,
  eventId: t.id
})), D = (e) => ({
  bgm: e.bgm,
  bgs: e.bgs,
  commands: p(e, _)
});
export {
  I as audioPathFromCommands,
  _ as collectAudioCommands,
  D as extractAudioFromMap,
  E as isAudioCommand,
  F as isAudioResource,
  A as item
};
//# sourceMappingURL=rpg-analyzer.es.js.map
