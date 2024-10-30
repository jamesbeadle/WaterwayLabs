import * as server from '../entries/pages/contact/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/contact/_page.svelte.js')).default;
export { server };
export const server_id = "src/frontend/src/routes/contact/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.BvU_CwE9.js","_app/immutable/chunks/index.CtRnVdqR.js","_app/immutable/chunks/vendor.jNm9LP9F.js"];
export const stylesheets = ["_app/immutable/assets/index.CX-Bkwmm.css"];
export const fonts = [];
