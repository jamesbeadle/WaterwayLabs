

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.b0c312a3.js","_app/immutable/chunks/index.c89a1bc3.js","_app/immutable/chunks/stores.db20997c.js","_app/immutable/chunks/singletons.a3e0ed1f.js"];
export const stylesheets = [];
export const fonts = [];
