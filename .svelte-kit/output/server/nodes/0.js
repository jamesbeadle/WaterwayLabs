

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.5BRvwlLl.js","_app/immutable/chunks/index.C_i3-7M7.js","_app/immutable/chunks/vendor.Bzei4L_2.js"];
export const stylesheets = ["_app/immutable/assets/index.my7aCXsf.css"];
export const fonts = [];
