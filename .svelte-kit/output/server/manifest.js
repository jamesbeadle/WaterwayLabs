export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".ic-assets.json",".well-known/ic-domains",".well-known/ii-alternative-origins","LinkedIn.svg","Rubik-Regular.woff2","Twitter.svg","about-page.png","apple-touch-icon.png","favicons/apple-touch-icon.png","favicons/browserconfig.xml","favicons/favicon-16x16.png","favicons/favicon-32x32.png","favicons/favicon.ico","favicons/icon-192x192.png","favicons/icon-512x512.png","favicons/mstile-150x150.png","footballGod-background.png","footballGod-preview.png","github-vector.svg","github.png","golfpad-background.png","golfpad-preview.png","icpfa-background.png","icpfa-preview.png","logo.png","logo_black.png","manifest.webmanifest","openBeats-background.png","openBeats-preview.png","openBook-background.png","openBook-preview.png","openCare-background.png","openCare-preview.png","openChef-background.png","openChef-preview.png","openFPL-background.png","openFPL-preview.png","profile_placeholder.png","team/ashutosh.jpg","team/dfd.jpg","team/george.jpg","team/james.jpg","team/josh.jpg","team/kelly.jpeg","team/thilly.jpg","team/zoe.jpg","transferKings-background.png","transferKings-preview.png","transferkings.jpg"]),
	mimeTypes: {".json":"application/json",".svg":"image/svg+xml",".woff2":"font/woff2",".png":"image/png",".xml":"text/xml",".webmanifest":"application/manifest+json",".jpg":"image/jpeg",".jpeg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.D01LYo9M.js","app":"_app/immutable/entry/app.B0TWr3Bl.js","imports":["_app/immutable/entry/start.D01LYo9M.js","_app/immutable/chunks/index.gRPc-veo.js","_app/immutable/chunks/vendor.DNHk5hZS.js","_app/immutable/entry/app.B0TWr3Bl.js","_app/immutable/chunks/index.gRPc-veo.js","_app/immutable/chunks/vendor.DNHk5hZS.js"],"stylesheets":["_app/immutable/assets/index.gUQgjVGM.css","_app/immutable/assets/index.gUQgjVGM.css"],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js'))
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
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/projects",
				pattern: /^\/projects\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/team",
				pattern: /^\/team\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
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
