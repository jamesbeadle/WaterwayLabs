

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.DRrUenoh.js","_app/immutable/chunks/index.Bid5RGIy.js","_app/immutable/chunks/vendor.Sy-KSkgp.js"];
export const stylesheets = ["_app/immutable/assets/index.PTUoVOG5.css"];
export const fonts = [];
