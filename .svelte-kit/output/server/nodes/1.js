

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.DmJWYsWh.js","_app/immutable/chunks/index.CtRnVdqR.js","_app/immutable/chunks/vendor.jNm9LP9F.js"];
export const stylesheets = ["_app/immutable/assets/index.CX-Bkwmm.css"];
export const fonts = [];
