

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/team/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.CYMoY9IZ.js","_app/immutable/chunks/index.CtRnVdqR.js","_app/immutable/chunks/vendor.jNm9LP9F.js"];
export const stylesheets = ["_app/immutable/assets/index.CX-Bkwmm.css"];
export const fonts = [];
