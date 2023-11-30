

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/terms/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.b9cc4071.js","_app/immutable/chunks/index.c89a1bc3.js","_app/immutable/chunks/Layout.afec06dc.js","_app/immutable/chunks/singletons.a3e0ed1f.js","_app/immutable/chunks/stores.db20997c.js","_app/immutable/chunks/preload-helper.a4192956.js"];
export const stylesheets = ["_app/immutable/assets/Layout.b23325f1.css"];
export const fonts = [];
