

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/projects/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.CPSBU0i2.js","_app/immutable/chunks/index.C_i3-7M7.js","_app/immutable/chunks/vendor.Bzei4L_2.js"];
export const stylesheets = ["_app/immutable/assets/index.my7aCXsf.css"];
export const fonts = [];
