

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DzZl1YUJ.js","_app/immutable/chunks/index.CtRnVdqR.js","_app/immutable/chunks/vendor.jNm9LP9F.js"];
export const stylesheets = ["_app/immutable/assets/index.CX-Bkwmm.css"];
export const fonts = [];
