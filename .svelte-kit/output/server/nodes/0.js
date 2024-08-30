

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DGEXSV5t.js","_app/immutable/chunks/index.BuPhSIsx.js","_app/immutable/chunks/vendor.Dl8cUuki.js"];
export const stylesheets = ["_app/immutable/assets/index.pAzHB5B0.css"];
export const fonts = [];
