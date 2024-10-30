

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/team/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.1fyw8eGh.js","_app/immutable/chunks/index.kYWMF5SF.js","_app/immutable/chunks/vendor.DSWSTTFQ.js"];
export const stylesheets = ["_app/immutable/assets/index.-fty8BuF.css"];
export const fonts = [];
