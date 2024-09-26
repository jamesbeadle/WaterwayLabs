

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.ahyknkYv.js","_app/immutable/chunks/index.CHFeNPXv.js","_app/immutable/chunks/vendor.AgWGSE-B.js"];
export const stylesheets = ["_app/immutable/assets/index.CFyvyRUf.css"];
export const fonts = [];
