

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/team/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.ze-BeLcS.js","_app/immutable/chunks/index.WIUkwzx8.js","_app/immutable/chunks/vendor.BhKbhyQL.js"];
export const stylesheets = ["_app/immutable/assets/index.nIuyrJaP.css"];
export const fonts = [];
