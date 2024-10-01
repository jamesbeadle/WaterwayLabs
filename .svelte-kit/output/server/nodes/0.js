

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.C6cTxz7k.js","_app/immutable/chunks/index.WIUkwzx8.js","_app/immutable/chunks/vendor.BhKbhyQL.js"];
export const stylesheets = ["_app/immutable/assets/index.nIuyrJaP.css"];
export const fonts = [];
