export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".ic-assets.json",".well-known/ic-domains",".well-known/ii-alternative-origins","ICPCoin.png","favicon.png","github.png","openchat.png","poppins-regular-webfont.woff2","profile_placeholder.png","twitter.png","waterwaylabs.webmanifest"]),
	mimeTypes: {".json":"application/json",".png":"image/png",".woff2":"font/woff2",".webmanifest":"application/manifest+json"},
	_: {
		client: {"start":"_app/immutable/entry/start.7667e291.js","app":"_app/immutable/entry/app.f2d68b0b.js","imports":["_app/immutable/entry/start.7667e291.js","_app/immutable/chunks/index.c89a1bc3.js","_app/immutable/chunks/singletons.a3e0ed1f.js","_app/immutable/entry/app.f2d68b0b.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.c89a1bc3.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/terms",
				pattern: /^\/terms\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
