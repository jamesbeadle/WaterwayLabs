

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.BhLY5GSF.js","_app/immutable/chunks/index.kYWMF5SF.js","_app/immutable/chunks/vendor.DSWSTTFQ.js"];
export const stylesheets = ["_app/immutable/assets/index.-fty8BuF.css"];
export const fonts = [];
