

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.fcc19562.js","_app/immutable/chunks/index.c89a1bc3.js","_app/immutable/chunks/Layout.afec06dc.js","_app/immutable/chunks/singletons.a3e0ed1f.js","_app/immutable/chunks/stores.db20997c.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/system-store.9c2ee2ef.js"];
export const stylesheets = ["_app/immutable/assets/3.a52d0793.css","_app/immutable/assets/Layout.b23325f1.css"];
export const fonts = [];
