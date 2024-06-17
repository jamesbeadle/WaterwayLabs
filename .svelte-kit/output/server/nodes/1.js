

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.SHfmedq3.js","_app/immutable/chunks/index.DSyQ2ed_.js","_app/immutable/chunks/vendor.DljMCGEY.js"];
export const stylesheets = ["_app/immutable/assets/index.C9Efgpaf.css"];
export const fonts = [];
