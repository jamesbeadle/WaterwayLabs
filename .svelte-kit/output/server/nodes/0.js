

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.CRwKKoXm.js","_app/immutable/chunks/index.DDvoJxJj.js","_app/immutable/chunks/vendor.Dh-aC2DW.js"];
export const stylesheets = ["_app/immutable/assets/index.UoRHb-af.css"];
export const fonts = [];
