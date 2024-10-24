

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/team/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.BbR-yLf_.js","_app/immutable/chunks/index.gRPc-veo.js","_app/immutable/chunks/vendor.DNHk5hZS.js"];
export const stylesheets = ["_app/immutable/assets/index.gUQgjVGM.css"];
export const fonts = [];
