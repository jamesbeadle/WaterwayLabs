

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.9c0a3de1.js","_app/immutable/chunks/index.c89a1bc3.js","_app/immutable/chunks/Layout.afec06dc.js","_app/immutable/chunks/singletons.a3e0ed1f.js","_app/immutable/chunks/stores.db20997c.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/system-store.9c2ee2ef.js"];
export const stylesheets = ["_app/immutable/assets/Layout.b23325f1.css"];
export const fonts = [];
