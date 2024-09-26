

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/team/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.DD4A7Y9G.js","_app/immutable/chunks/index.CHFeNPXv.js","_app/immutable/chunks/vendor.AgWGSE-B.js"];
export const stylesheets = ["_app/immutable/assets/index.CFyvyRUf.css"];
export const fonts = [];
