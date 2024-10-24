

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.D9Xm1iqc.js","_app/immutable/chunks/index.gRPc-veo.js","_app/immutable/chunks/vendor.DNHk5hZS.js"];
export const stylesheets = ["_app/immutable/assets/index.gUQgjVGM.css"];
export const fonts = [];
