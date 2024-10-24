

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.Bs4KEC05.js","_app/immutable/chunks/index.gRPc-veo.js","_app/immutable/chunks/vendor.DNHk5hZS.js"];
export const stylesheets = ["_app/immutable/assets/index.gUQgjVGM.css"];
export const fonts = [];
