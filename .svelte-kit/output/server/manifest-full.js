export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".ic-assets.json",".well-known/ic-domains",".well-known/ii-alternative-origins","ICPCoin.png","favicon.png","github.png","logo.png","openchat.png","poppins-regular-webfont.woff2","profile_placeholder.png","twitter.png","waterwaylabs.webmanifest"]),
	mimeTypes: {".json":"application/json",".png":"image/png",".woff2":"font/woff2",".webmanifest":"application/manifest+json"},
	_: {
		client: {"start":"_app/immutable/entry/start.ab121703.js","app":"_app/immutable/entry/app.ecb49178.js","imports":["_app/immutable/entry/start.ab121703.js","_app/immutable/chunks/index.ae66f530.js","_app/immutable/chunks/vendor.088539aa.js","_app/immutable/entry/app.ecb49178.js","_app/immutable/chunks/index.ae66f530.js","_app/immutable/chunks/vendor.088539aa.js"],"stylesheets":["_app/immutable/assets/index.11ddd166.css","_app/immutable/assets/index.11ddd166.css"],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
