

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/team/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.B6tz39q3.js","_app/immutable/chunks/index.Bid5RGIy.js","_app/immutable/chunks/vendor.Sy-KSkgp.js"];
export const stylesheets = ["_app/immutable/assets/index.PTUoVOG5.css"];
export const fonts = [];
