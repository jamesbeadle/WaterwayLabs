

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/team/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.DwjqO3EA.js","_app/immutable/chunks/index.CBXd7AXW.js","_app/immutable/chunks/vendor.DK8YoGL4.js"];
export const stylesheets = ["_app/immutable/assets/index.IA-KNvD2.css"];
export const fonts = [];