

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.BzXCJmZU.js","_app/immutable/chunks/index.kYWMF5SF.js","_app/immutable/chunks/vendor.DSWSTTFQ.js"];
export const stylesheets = ["_app/immutable/assets/index.-fty8BuF.css"];
export const fonts = [];
