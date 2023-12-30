

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.524e09d9.js","_app/immutable/chunks/index.ae66f530.js","_app/immutable/chunks/vendor.088539aa.js"];
export const stylesheets = ["_app/immutable/assets/index.11ddd166.css"];
export const fonts = [];
