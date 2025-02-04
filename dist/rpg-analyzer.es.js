const a = "bgm", s = "se", n = "me", c = "bgs", u = (e) => !!e, i = (e, o) => e.pages.map(
  (t, r) => o(t, r, e)
), l = (e, o) => e.events.filter(u).map((t) => i(t, o)), f = (e, o) => l(e, o).flat(2), E = (e, o) => e.map((t) => i(t, o)), g = (e, o) => e.map((t, r) => o(t, r, t)), _ = (e) => e.folder === s || e.folder === a || e.folder === c || e.folder === n, p = [
  241,
  245,
  249,
  250,
  132,
  133,
  139,
  140
], F = (e) => p.includes(e.code), A = (e) => ({
  folder: b(e) || "",
  fileName: e.parameters[0].name
}), b = (e) => x[e.code], x = {
  241: a,
  245: c,
  249: n,
  250: s,
  132: a,
  133: n,
  139: n,
  140: n
}, d = (e, o, t) => e.list.filter(F).map((r) => ({
  code: r.code,
  path: A(r),
  pageIndex: o,
  eventId: t.id
})), v = (e) => g(e, d).flat(2), C = (e) => E(e, d).flat(2), I = (e) => ({
  bgm: e.bgm,
  bgs: e.bgs,
  commands: f(e, d)
}), M = (e) => ({
  map: I(e.map),
  filename: e.filename,
  editingName: e.editingName
}), D = (e) => ({
  sounds: m(e.sounds),
  bgm: m([e.battleBgm, e.titleBgm]),
  me: m([
    e.defeatMe,
    e.gameoverMe,
    e.victoryMe
  ])
}), m = (e) => e.map((o, t) => ({
  index: t,
  path: o.name
}));
export {
  A as audioPathFromCommands,
  d as collectAudioCommands,
  C as expectAudioFromTroop,
  v as extractAudioCFromCommonEvents,
  I as extractAudioFromMap,
  M as extractAudioFromMapFileInfo,
  F as isAudioCommand,
  _ as isAudioResource,
  D as systemAudioFiles
};
//# sourceMappingURL=rpg-analyzer.es.js.map
