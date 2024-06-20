export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store",".ic-assets.json",".well-known/ic-domains",".well-known/ii-alternative-origins","Rubik-Regular.woff2","apple-touch-icon.png","background.jpg","favicons/apple-touch-icon.png","favicons/browserconfig.xml","favicons/favicon-16x16.png","favicons/favicon-32x32.png","favicons/favicon.ico","favicons/icon-192x192.png","favicons/icon-512x512.png","favicons/mstile-150x150.png","github.png","logo.png","manifest.webmanifest","profile_placeholder.png","transferkings.jpg"]),
	mimeTypes: {".json":"application/json",".woff2":"font/woff2",".png":"image/png",".jpg":"image/jpeg",".xml":"text/xml",".webmanifest":"application/manifest+json"},
	_: {
		client: {"start":"_app/immutable/entry/start.6FKFQaiI.js","app":"_app/immutable/entry/app.DNEyJ2HJ.js","imports":["_app/immutable/entry/start.6FKFQaiI.js","_app/immutable/chunks/index.C_i3-7M7.js","_app/immutable/chunks/vendor.Bzei4L_2.js","_app/immutable/entry/app.DNEyJ2HJ.js","_app/immutable/chunks/index.C_i3-7M7.js","_app/immutable/chunks/vendor.Bzei4L_2.js"],"stylesheets":["_app/immutable/assets/index.my7aCXsf.css","_app/immutable/assets/index.my7aCXsf.css"],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
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
				id: "/projects",
				pattern: /^\/projects\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
