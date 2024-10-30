import * as server from '../entries/pages/contact/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/contact/_page.svelte.js')).default;
export { server };
export const server_id = "src/frontend/src/routes/contact/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.BcAfMXiz.js","_app/immutable/chunks/index.DDvoJxJj.js","_app/immutable/chunks/vendor.Dh-aC2DW.js"];
export const stylesheets = ["_app/immutable/assets/index.UoRHb-af.css"];
export const fonts = [];
