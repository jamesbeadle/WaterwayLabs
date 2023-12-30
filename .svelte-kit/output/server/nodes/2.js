

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.286a988f.js","_app/immutable/chunks/index.ae66f530.js","_app/immutable/chunks/vendor.088539aa.js"];
export const stylesheets = ["_app/immutable/assets/index.11ddd166.css"];
export const fonts = [];
