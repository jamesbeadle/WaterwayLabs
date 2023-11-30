

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.1382fc08.js","_app/immutable/chunks/index.c89a1bc3.js"];
export const stylesheets = [];
export const fonts = [];
