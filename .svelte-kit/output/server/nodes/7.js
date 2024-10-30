

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/team/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.2u4s7N67.js","_app/immutable/chunks/index.DDvoJxJj.js","_app/immutable/chunks/vendor.Dh-aC2DW.js"];
export const stylesheets = ["_app/immutable/assets/index.UoRHb-af.css"];
export const fonts = [];
