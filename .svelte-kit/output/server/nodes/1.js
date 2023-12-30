

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.fb408101.js","_app/immutable/chunks/index.ae66f530.js","_app/immutable/chunks/vendor.088539aa.js"];
export const stylesheets = ["_app/immutable/assets/index.11ddd166.css"];
export const fonts = [];
