

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/projects/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.DCqh6Org.js","_app/immutable/chunks/index.CHFeNPXv.js","_app/immutable/chunks/vendor.AgWGSE-B.js"];
export const stylesheets = ["_app/immutable/assets/index.CFyvyRUf.css"];
export const fonts = [];
