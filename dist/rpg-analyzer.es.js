const c = "bgm", i = "se", r = "me", m = "bgs", l = (e) => ({
  type: 0,
  elementId: 0,
  formula: "0",
  variance: 20,
  critical: !1,
  ...e
}), u = (e) => ({
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
  damage: l(),
  effects: [],
  ...e
}), f = (e) => !!e, d = (e, t) => e.pages.map(
  (o, n) => t(o, n, e)
), p = (e, t) => e.events.filter(f).map((o) => d(o, t)), E = (e, t) => p(e, t).flat(2), g = (e, t) => e.map((o) => d(o, t)), F = (e, t) => e.map((o, n) => t(o, n, o)), C = u({ name: "やくそう", price: 50 }), M = (e) => e.folder === i || e.folder === c || e.folder === m || e.folder === r, A = [
  241,
  245,
  249,
  250,
  132,
  133,
  139,
  140
], I = (e) => A.includes(e.code), b = (e) => ({
  folder: x(e) || "",
  fileName: e.parameters[0].name
}), x = (e) => v[e.code], v = {
  241: c,
  245: m,
  249: r,
  250: i,
  132: c,
  133: r,
  139: r,
  140: r
}, s = (e, t, o) => e.list.filter(I).map((n) => ({
  code: n.code,
  path: b(n),
  pageIndex: t,
  eventId: o.id
})), h = (e) => F(e, s).flat(2), D = (e) => g(e, s).flat(2), _ = (e) => ({
  bgm: e.bgm,
  bgs: e.bgs,
  commands: E(e, s)
}), N = (e) => ({
  map: _(e.map),
  filename: e.filename,
  editingName: e.editingName
}), B = (e) => ({
  sounds: a(e.sounds),
  bgm: a([e.battleBgm, e.titleBgm]),
  me: a([
    e.defeatMe,
    e.gameoverMe,
    e.victoryMe
  ])
}), a = (e) => e.map((t, o) => ({
  index: o,
  path: t.name
}));
export {
  b as audioPathFromCommands,
  s as collectAudioCommands,
  D as expectAudioFromTroop,
  h as extractAudioCFromCommonEvents,
  _ as extractAudioFromMap,
  N as extractAudioFromMapFileInfo,
  I as isAudioCommand,
  M as isAudioResource,
  C as item,
  B as systemAudioFiles
};
//# sourceMappingURL=rpg-analyzer.es.js.map
