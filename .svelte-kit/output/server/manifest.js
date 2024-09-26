export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store",".ic-assets.json",".well-known/ic-domains",".well-known/ii-alternative-origins","Rubik-Regular.woff2","apple-touch-icon.png","background.jpg","favicons/apple-touch-icon.png","favicons/browserconfig.xml","favicons/favicon-16x16.png","favicons/favicon-32x32.png","favicons/favicon.ico","favicons/icon-192x192.png","favicons/icon-512x512.png","favicons/mstile-150x150.png","github.png","logo.png","logo_black.png","manifest.webmanifest","profile_placeholder.png","team/.DS_Store","team/ashutosh.jpg","team/dfd.jpg","team/george.jpg","team/james.jpg","team/josh.jpg","team/kelly.jpeg","team/thilly.jpg","team/zoe.jpg","transferkings.jpg"]),
	mimeTypes: {".json":"application/json",".woff2":"font/woff2",".png":"image/png",".jpg":"image/jpeg",".xml":"text/xml",".webmanifest":"application/manifest+json",".jpeg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.icMkotlk.js","app":"_app/immutable/entry/app.CnTFvMdW.js","imports":["_app/immutable/entry/start.icMkotlk.js","_app/immutable/chunks/index.CHFeNPXv.js","_app/immutable/chunks/vendor.AgWGSE-B.js","_app/immutable/entry/app.CnTFvMdW.js","_app/immutable/chunks/index.CHFeNPXv.js","_app/immutable/chunks/vendor.AgWGSE-B.js"],"stylesheets":["_app/immutable/assets/index.CFyvyRUf.css","_app/immutable/assets/index.CFyvyRUf.css"],"fonts":[],"uses_env_dynamic_public":false},
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
				id: "/projects",
				pattern: /^\/projects\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/team",
				pattern: /^\/team\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
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
