

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.tI58Y6MZ.js","_app/immutable/chunks/index.BuPhSIsx.js","_app/immutable/chunks/vendor.Dl8cUuki.js"];
export const stylesheets = ["_app/immutable/assets/index.pAzHB5B0.css"];
export const fonts = [];
