import { D as DEV } from "./vendor.js";
import * as devalue from "devalue";
import { Buffer } from "buffer";
import { parse, serialize } from "cookie";
import * as set_cookie_parser from "set-cookie-parser";
import { nonNullish } from "@dfinity/utils";
import "dompurify";
import { HttpAgent, Actor } from "@dfinity/agent";
import "@dfinity/auth-client";
let base = "";
let assets = base;
const initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}
function set_assets(path) {
  assets = initial.assets = path;
}
const SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
const ENDPOINT_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"];
const PAGE_METHODS = ["GET", "POST", "HEAD"];
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/ \t]+)\/([^; \t]+)[ \t]*(?:;[ \t]*q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
class HttpError {
  /**
   * @param {number} status
   * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
   */
  constructor(status, body2) {
    this.status = status;
    if (typeof body2 === "string") {
      this.body = { message: body2 };
    } else if (body2) {
      this.body = body2;
    } else {
      this.body = { message: `Error: ${status}` };
    }
  }
  toString() {
    return JSON.stringify(this.body);
  }
}
class Redirect {
  /**
   * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
   * @param {string} location
   */
  constructor(status, location) {
    this.status = status;
    this.location = location;
  }
}
class SvelteKitError extends Error {
  /**
   * @param {number} status
   * @param {string} text
   * @param {string} message
   */
  constructor(status, text2, message) {
    super(message);
    this.status = status;
    this.text = text2;
  }
}
class ActionFailure {
  /**
   * @param {number} status
   * @param {T} data
   */
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
}
function json(data, init2) {
  const body2 = JSON.stringify(data);
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    headers2.set("content-length", encoder$3.encode(body2).byteLength.toString());
  }
  if (!headers2.has("content-type")) {
    headers2.set("content-type", "application/json");
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
const encoder$3 = new TextEncoder();
function text(body2, init2) {
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    const encoded = encoder$3.encode(body2);
    headers2.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers: headers2
    });
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
function fail(status, data) {
  return new ActionFailure(status, data);
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error) {
  return (
    /** @type {import('../runtime/control.js').Redirect | HttpError | SvelteKitError | Error} */
    error
  );
}
function get_status(error) {
  return error instanceof HttpError || error instanceof SvelteKitError ? error.status : 500;
}
function get_message(error) {
  return error instanceof SvelteKitError ? error.text : "Internal Error";
}
let public_env = {};
let safe_public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function set_safe_public_env(environment) {
  safe_public_env = environment;
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = ENDPOINT_METHODS.filter((method) => method in mod);
  if ("GET" in mod || "HEAD" in mod) allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error) {
  error = error instanceof HttpError ? error : coalesce_to_error(error);
  const status = get_status(error);
  const body2 = await handle_error_and_jsonify(event, options2, error);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body2, {
      status
    });
  }
  return static_error_page(options2, status, body2.message);
}
async function handle_error_and_jsonify(event, options2, error) {
  if (error instanceof HttpError) {
    return error.body;
  }
  const status = get_status(error);
  const message = get_message(error);
  return await options2.hooks.handleError({ error, event, status, message }) ?? { message };
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error) {
  if (error.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error.message} (data${error.path})`;
  }
  if (error.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.search_params.size > 0) {
    uses.push(`"search_params":${JSON.stringify(Array.from(node.uses.search_params))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent) uses.push('"parent":1');
  if (node.uses?.route) uses.push('"route":1');
  if (node.uses?.url) uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler = mod[method] || mod.fallback;
  if (method === "HEAD" && mod.GET && !mod.HEAD) {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    let response = await handler(
      /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      return new Response(void 0, {
        status: e.status,
        headers: { location: e.location }
      });
    }
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers: headers2 } = event.request;
  if (ENDPOINT_METHODS.includes(method) && !PAGE_METHODS.includes(method)) {
    return true;
  }
  if (method === "POST" && headers2.get("x-sveltekit-action") === "true") return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
const internal = new URL("sveltekit-internal://");
function resolve(base2, path) {
  if (path[0] === "/" && path[1] === "/") return path;
  let url = new URL(base2, internal);
  url = new URL(path, url);
  return url.protocol === internal.protocol ? url.pathname + url.search + url.hash : url.href;
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore") return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
const tracked_url_properties = (
  /** @type {const} */
  [
    "href",
    "pathname",
    "search",
    "toString",
    "toJSON"
  ]
);
function make_trackable(url, callback, search_params_callback) {
  const tracked = new URL(url);
  Object.defineProperty(tracked, "searchParams", {
    value: new Proxy(tracked.searchParams, {
      get(obj, key2) {
        if (key2 === "get" || key2 === "getAll" || key2 === "has") {
          return (param) => {
            search_params_callback(param);
            return obj[key2](param);
          };
        }
        callback();
        const value = Reflect.get(obj, key2);
        return typeof value === "function" ? value.bind(obj) : value;
      }
    }),
    enumerable: true,
    configurable: true
  });
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  {
    disable_hash(tracked);
  }
  return tracked;
}
function disable_hash(url) {
  allow_nodejs_console_log(url);
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  allow_nodejs_console_log(url);
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
function allow_nodejs_console_log(url) {
  {
    url[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(new URL(url), opts);
    };
  }
}
const DATA_SUFFIX = "/__data.json";
const HTML_DATA_SUFFIX = ".html__data.json";
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX) || pathname.endsWith(HTML_DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  if (pathname.endsWith(".html")) return pathname.replace(/\.html$/, HTML_DATA_SUFFIX);
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  if (pathname.endsWith(HTML_DATA_SUFFIX)) {
    return pathname.slice(0, -HTML_DATA_SUFFIX.length) + ".html";
  }
  return pathname.slice(0, -DATA_SUFFIX.length);
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server) {
  const actions2 = server?.actions;
  if (!actions2) {
    const no_actions_error = new SvelteKitError(
      405,
      "Method Not Allowed",
      "POST method not allowed. No actions exist for this page"
    );
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions2);
  try {
    const data = await call_action(event, actions2);
    if (false) ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: get_status(err)
      }
    );
  }
}
function check_incorrect_fail_use(error) {
  return error instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error;
}
function action_json_redirect(redirect) {
  return action_json({
    type: "redirect",
    status: redirect.status,
    location: redirect.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server) {
  const actions2 = server?.actions;
  if (!actions2) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: new SvelteKitError(
        405,
        "Method Not Allowed",
        "POST method not allowed. No actions exist for this page"
      )
    };
  }
  check_named_default_separate(actions2);
  try {
    const data = await call_action(event, actions2);
    if (false) ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions2) {
  if (actions2.default && Object.keys(actions2).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions2) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions2[name];
  if (!action) {
    throw new SvelteKitError(404, "Not Found", `No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new SvelteKitError(
      415,
      "Unsupported Media Type",
      `Form actions expect form-encoded data — received ${event.request.headers.get(
        "content-type"
      )}`
    );
  }
  return action(event);
}
function validate_action_return(data) {
  if (data instanceof Redirect) {
    throw new Error("Cannot `return redirect(...)` — use `redirect(...)` instead");
  }
  if (data instanceof HttpError) {
    throw new Error("Cannot `return error(...)` — use `error(...)` or `return fail(...)` instead");
  }
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, devalue.uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, devalue.stringify, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error = (
      /** @type {any} */
      e
    );
    if ("path" in error) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error.message}`;
      if (error.path !== "") message += ` (data.${error.path})`;
      throw new Error(message);
    }
    throw error;
  }
}
const INVALIDATED_PARAM = "x-sveltekit-invalidated";
const TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
function b64_encode(buffer) {
  if (globalThis.Buffer) {
    return Buffer.from(buffer).toString("base64");
  }
  const little_endian = new Uint8Array(new Uint16Array([1]).buffer)[0] > 0;
  return btoa(
    new TextDecoder(little_endian ? "utf-16le" : "utf-16be").decode(
      new Uint16Array(new Uint8Array(buffer))
    )
  );
}
async function load_server_data({ event, state, node, parent }) {
  if (!node?.server) return null;
  let is_tracking = true;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false,
    search_params: /* @__PURE__ */ new Set()
  };
  const url = make_trackable(
    event.url,
    () => {
      if (is_tracking) {
        uses.url = true;
      }
    },
    (param) => {
      if (is_tracking) {
        uses.search_params.add(param);
      }
    }
  );
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      new URL(info instanceof Request ? info.url : info, event.url);
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.params.add(key2);
        }
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      if (is_tracking) {
        uses.parent = true;
      }
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.route = true;
        }
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url,
    untrack(fn) {
      is_tracking = false;
      try {
        return fn();
      } finally {
        is_tracking = true;
      }
    }
  });
  return {
    type: "data",
    data: result ?? null,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent,
    untrack: (fn) => fn()
  });
  return result ?? null;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  const universal_fetch = async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function push_fetched(body2, is_b64) {
          const status_number = Number(response2.status);
          if (isNaN(status_number)) {
            throw new Error(
              `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
            );
          }
          fetched.push({
            url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
            method: event.request.method,
            request_body: (
              /** @type {string | ArrayBufferView | undefined} */
              input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
            ),
            request_headers: cloned_headers,
            response_body: body2,
            response: response2,
            is_b64
          });
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            if (buffer instanceof ArrayBuffer) {
              await push_fetched(b64_encode(buffer), true);
            }
            return buffer;
          };
        }
        async function text2() {
          const body2 = await response2.text();
          if (!body2 || typeof body2 === "string") {
            await push_fetched(body2, false);
          }
          if (dependency) {
            dependency.body = body2;
          }
          return body2;
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get2 = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get2.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" — it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
  return (input, init2) => {
    const response = universal_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
function noop() {
}
function is_promise(value) {
  return !!value && (typeof value === "object" || typeof value === "function") && typeof /** @type {any} */
  value.then === "function";
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component) throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
const ATTR_REGEX = /[&"]/g;
const CONTENT_REGEX = /[&<]/g;
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped + str.substring(last);
}
function each(items, fn) {
  items = ensure_array_like(items);
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
const missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component") name += " this={...}";
    throw new Error(
      `<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`
    );
  }
  return component;
}
let on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean) return "";
  const assignment = `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  if (!stores_array.every(Boolean)) {
    throw new Error("derived() expects stores as input, got a falsy value");
  }
  const auto = fn.length < 2;
  return readable(initial_value, (set, update) => {
    let started = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set, update);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map(
      (store, i) => subscribe(
        store,
        (value) => {
          values[i] = value;
          pending &= ~(1 << i);
          if (started) {
            sync();
          }
        },
        () => {
          pending |= 1 << i;
        }
      )
    );
    started = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
      started = false;
    };
  });
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i) hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer.length;
      while (i) hash2 = hash2 * 33 ^ buffer[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
const escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
const escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
const replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
const pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering2 = false) {
  const headers2 = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers2[key2] = value;
    }
    if (key2 === "cache-control") cache_control = value;
    else if (key2 === "age") age = value;
    else if (key2 === "vary" && value.trim() === "*") varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers: headers2,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.is_b64) {
    attrs.push("data-b64");
  }
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering2 && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
const s = JSON.stringify;
const encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0]) precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
const init = new Uint32Array(8);
const key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
const array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
const quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
const crypto_pattern = /^(nonce|sha\d\d\d)-/;
class BaseProvider {
  /** @type {boolean} */
  #use_hashes;
  /** @type {boolean} */
  #script_needs_csp;
  /** @type {boolean} */
  #style_needs_csp;
  /** @type {import('types').CspDirectives} */
  #directives;
  /** @type {import('types').Csp.Source[]} */
  #script_src;
  /** @type {import('types').Csp.Source[]} */
  #script_src_elem;
  /** @type {import('types').Csp.Source[]} */
  #style_src;
  /** @type {import('types').Csp.Source[]} */
  #style_src_attr;
  /** @type {import('types').Csp.Source[]} */
  #style_src_elem;
  /** @type {string} */
  #nonce;
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    this.#use_hashes = use_hashes;
    this.#directives = directives;
    const d = this.#directives;
    this.#script_src = [];
    this.#script_src_elem = [];
    this.#style_src = [];
    this.#style_src_attr = [];
    this.#style_src_elem = [];
    const effective_script_src = d["script-src"] || d["default-src"];
    const script_src_elem = d["script-src-elem"];
    const effective_style_src = d["style-src"] || d["default-src"];
    const style_src_attr = d["style-src-attr"];
    const style_src_elem = d["style-src-elem"];
    this.#script_needs_csp = !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0 || !!script_src_elem && script_src_elem.filter((value) => value !== "unsafe-inline").length > 0;
    this.#style_needs_csp = !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0 || !!style_src_attr && style_src_attr.filter((value) => value !== "unsafe-inline").length > 0 || !!style_src_elem && style_src_elem.filter((value) => value !== "unsafe-inline").length > 0;
    this.script_needs_nonce = this.#script_needs_csp && !this.#use_hashes;
    this.style_needs_nonce = this.#style_needs_csp && !this.#use_hashes;
    this.#nonce = nonce;
  }
  /** @param {string} content */
  add_script(content) {
    if (this.#script_needs_csp) {
      const d = this.#directives;
      if (this.#use_hashes) {
        const hash2 = sha256(content);
        this.#script_src.push(`sha256-${hash2}`);
        if (d["script-src-elem"]?.length) {
          this.#script_src_elem.push(`sha256-${hash2}`);
        }
      } else {
        if (this.#script_src.length === 0) {
          this.#script_src.push(`nonce-${this.#nonce}`);
        }
        if (d["script-src-elem"]?.length) {
          this.#script_src_elem.push(`nonce-${this.#nonce}`);
        }
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (this.#style_needs_csp) {
      const empty_comment_hash = "9OlNO0DNEeaVzHL4RZwCLsBHA8WBQ8toBp/4F5XV2nc=";
      const d = this.#directives;
      if (this.#use_hashes) {
        const hash2 = sha256(content);
        this.#style_src.push(`sha256-${hash2}`);
        if (d["style-src-attr"]?.length) {
          this.#style_src_attr.push(`sha256-${hash2}`);
        }
        if (d["style-src-elem"]?.length) {
          if (hash2 !== empty_comment_hash && !d["style-src-elem"].includes(`sha256-${empty_comment_hash}`)) {
            this.#style_src_elem.push(`sha256-${empty_comment_hash}`);
          }
          this.#style_src_elem.push(`sha256-${hash2}`);
        }
      } else {
        if (this.#style_src.length === 0 && !d["style-src"]?.includes("unsafe-inline")) {
          this.#style_src.push(`nonce-${this.#nonce}`);
        }
        if (d["style-src-attr"]?.length) {
          this.#style_src_attr.push(`nonce-${this.#nonce}`);
        }
        if (d["style-src-elem"]?.length) {
          if (!d["style-src-elem"].includes(`sha256-${empty_comment_hash}`)) {
            this.#style_src_elem.push(`sha256-${empty_comment_hash}`);
          }
          this.#style_src_elem.push(`nonce-${this.#nonce}`);
        }
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...this.#directives };
    if (this.#style_src.length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...this.#style_src
      ];
    }
    if (this.#style_src_attr.length > 0) {
      directives["style-src-attr"] = [
        ...directives["style-src-attr"] || [],
        ...this.#style_src_attr
      ];
    }
    if (this.#style_src_elem.length > 0) {
      directives["style-src-elem"] = [
        ...directives["style-src-elem"] || [],
        ...this.#style_src_elem
      ];
    }
    if (this.#script_src.length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...this.#script_src
      ];
    }
    if (this.#script_src_elem.length > 0) {
      directives["script-src-elem"] = [
        ...directives["script-src-elem"] || [],
        ...this.#script_src_elem
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value) continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
}
class CspProvider extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content=${escape_html_attr(content)}>`;
  }
}
class CspReportOnlyProvider extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
}
class Csp {
  /** @readonly */
  nonce = generate_nonce();
  /** @type {CspProvider} */
  csp_provider;
  /** @type {CspReportOnlyProvider} */
  report_only_provider;
  /**
   * @param {import('./types.js').CspConfig} config
   * @param {import('./types.js').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
}
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r) => {
    fulfil = f;
    reject = r;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done) deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
const updated = {
  ...readable(false),
  check: () => false
};
const encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest,
  state,
  page_config,
  status,
  error = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest._;
  const modulepreloads = new Set(client.imports);
  const stylesheets = new Set(client.stylesheets);
  const fonts = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  if (!state.prerendering?.fallback) {
    const segments = event.url.pathname.slice(base.length).split("/").slice(2);
    base$1 = segments.map(() => "..").join("/") || ".";
    base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
    if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
      assets$1 = base$1;
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i = 0; i < branch.length; i += 1) {
      data2 = { ...data2, ...branch[i].data };
      props[`data_${i}`] = data2;
    }
    props.page = {
      error,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value,
      state: {}
    };
    override({ base: base$1, assets: assets$1 });
    {
      try {
        rendered = options2.root.render(props);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports) modulepreloads.add(url);
      for (const url of node.stylesheets) stylesheets.add(url);
      for (const url of node.fonts) fonts.add(url);
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body2 = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce) attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b) => b.server_data),
    global
  );
  if (page_config.ssr && page_config.csr) {
    body2 += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    if (client.uses_env_dynamic_public && state.prerendering) {
      modulepreloads.add(`${options2.app_dir}/env.js`);
    }
    const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
      (path) => resolve_opts.preload({ type: "js", path })
    );
    for (const path of included_modulepreloads) {
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (options2.preload_strategy !== "modulepreload") {
        head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
      } else if (state.prerendering) {
        head += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const blocks = [];
    const load_env_eagerly = client.uses_env_dynamic_public && state.prerendering;
    const properties = [`base: ${base_expression}`];
    if (assets) {
      properties.push(`assets: ${s(assets)}`);
    }
    if (client.uses_env_dynamic_public) {
      properties.push(`env: ${load_env_eagerly ? "null" : s(public_env)}`);
    }
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`);
    }
    blocks.push(`${global} = {
						${properties.join(",\n						")}
					};`);
    const args = ["app", "element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      blocks.push(`const data = ${data};`);
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id
        );
      }
      if (error) {
        serialized.error = devalue.uneval(error);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        "data",
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate.push(`params: ${devalue.uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      const indent = "	".repeat(load_env_eagerly ? 7 : 6);
      args.push(`{
${indent}	${hydrate.join(`,
${indent}	`)}
${indent}}`);
    }
    if (load_env_eagerly) {
      blocks.push(`import(${s(`${base$1}/${options2.app_dir}/env.js`)}).then(({ env }) => {
						${global}.env = env;

						Promise.all([
							import(${s(prefixed(client.start))}),
							import(${s(prefixed(client.app))})
						]).then(([kit, app]) => {
							kit.start(${args.join(", ")});
						});
					});`);
    } else {
      blocks.push(`Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(${args.join(", ")});
					});`);
    }
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body2 += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers2 = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers2.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers2.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers2.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body: body2,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: safe_public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers2.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers: headers2
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: {
        "content-type": "text/html"
      }
    }
  );
}
function get_data(event, options2, nodes, global) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error) => ({
          error: await handle_error_and_jsonify(event, options2, error)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error }) => {
          count -= 1;
          let str;
          try {
            str = devalue.uneval({ id, data, error }, replacer);
          } catch {
            error = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = devalue.uneval({ id, data, error }, replacer);
          }
          push(`<script>${global}.resolve(${str})<\/script>
`);
          if (count === 0) done();
        }
      );
      return `${global}.defer(${id})`;
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node) return "null";
      return `{"type":"data","data":${devalue.uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest,
  state,
  status,
  error,
  resolve_opts
}) {
  if (event.request.headers.get("x-sveltekit-error")) {
    return static_error_page(
      options2,
      status,
      /** @type {Error} */
      error.message
    );
  }
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        // eslint-disable-next-line @typescript-eslint/require-await
        parent: async () => ({})
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        // eslint-disable-next-line @typescript-eslint/require-await
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest,
      state,
      page_config: {
        ssr,
        csr
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e) {
    if (e instanceof Redirect) {
      return redirect_response(e.status, e.location);
    }
    return static_error_page(
      options2,
      get_status(e),
      (await handle_error_and_jsonify(event, options2, e)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done) return result;
    done = true;
    return result = fn();
  };
}
const encoder = new TextEncoder();
async function render_data(event, route, options2, manifest, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n == void 0 ? n : await manifest._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            }
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error) => {
          if (error instanceof Redirect) {
            throw error;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error),
              status: error instanceof HttpError || error instanceof SvelteKitError ? error.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e) {
    const error = normalize_error(e);
    if (error instanceof Redirect) {
      return redirect_json_response(error);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response({
    type: "redirect",
    location: redirect.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = devalue.stringify(value, reducers);
            } catch {
              const error = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = devalue.stringify(error, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0) done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node) return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${devalue.stringify(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function load_page_nodes(page2, manifest) {
  return Promise.all([
    // we use == here rather than === because [undefined] serializes as "[null]"
    ...page2.layouts.map((n) => n == void 0 ? n : manifest._.nodes[n]()),
    manifest._.nodes[page2.leaf]()
  ]);
}
const MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await load_page_nodes(page2, manifest);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        status = get_status(action_result.error);
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server?.load);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false && !(state.prerendering && should_prerender_data)) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest,
        state,
        resolve_opts
      });
    }
    const branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent) Object.assign(data, parent.data);
              }
              return data;
            }
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i) => {
      if (load_error) throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    for (const p of server_promises) p.catch(() => {
    });
    for (const p of load_promises) p.catch(() => {
    });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body2 = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body2),
                body: body2
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = get_status(err);
          const error = await handle_error_and_jsonify(event, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest._.nodes[index]();
              let j = i;
              while (!branch[j]) j -= 1;
              return await render_response({
                event,
                options: options2,
                manifest,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    const ssr = get_option(nodes, "ssr") ?? true;
    return await render_response({
      event,
      options: options2,
      manifest,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr
      },
      status,
      error: null,
      branch: ssr === false ? [] : compact(branch),
      action_result,
      fetched
    });
  } catch (e) {
    return await respond_with_error({
      event,
      options: options2,
      manifest,
      state,
      status: 500,
      error: e,
      resolve_opts
    });
  }
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  const values_needing_match = values.filter((value) => value !== void 0);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i - buffered, i + 1).filter((s2) => s2).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest) result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered) return;
  return result;
}
function validate_options(options2) {
  if (options2?.path === void 0) {
    throw new Error("You must specify a `path` when setting, deleting or serializing cookies");
  }
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = parse(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name, opts) {
      const c = new_cookies[name];
      if (c && domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
        return c.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = parse(header, { decode: decoder });
      const cookie = req_cookies[name];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder = opts?.decode || decodeURIComponent;
      const cookies2 = parse(header, { decode: decoder });
      for (const c of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
          cookies2[c.name] = c.value;
        }
      }
      return Object.entries(cookies2).map(([name, value]) => ({ name, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('./page/types.js').Cookie['options']} options
     */
    set(name, value, options2) {
      validate_options(options2);
      set_internal(name, value, { ...defaults, ...options2 });
    },
    /**
     * @param {string} name
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    delete(name, options2) {
      validate_options(options2);
      cookies.set(name, "", { ...options2, maxAge: 0 });
    },
    /**
     * @param {string} name
     * @param {string} value
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    serialize(name, value, options2) {
      validate_options(options2);
      let path = options2.path;
      if (!options2.domain || options2.domain === url.hostname) {
        path = resolve(normalized_url, path);
      }
      return serialize(name, value, { ...defaults, ...options2, path });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain)) continue;
      if (!path_matches(destination.pathname, cookie.options.path)) continue;
      const encoder2 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder2(cookie.value);
    }
    if (header2) {
      const parsed = parse(header2, { decode: (value) => value });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  function set_internal(name, value, options2) {
    let path = options2.path;
    if (!options2.domain || options2.domain === url.hostname) {
      path = resolve(normalized_url, path);
    }
    new_cookies[name] = { name, value, options: { ...options2, path } };
  }
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
function domain_matches(hostname, constraint) {
  if (!constraint) return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized) return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint) return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized) return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers2, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options: options2 } = new_cookie;
    headers2.append("set-cookie", serialize(name, value, options2));
    if (options2.path.endsWith(".html")) {
      const path = add_data_suffix(options2.path);
      headers2.append("set-cookie", serialize(name, value, { ...options2, path }));
    }
  }
}
function create_fetch({ event, options: options2, manifest, state, get_cookie_header, set_internal }) {
  const server_fetch = async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie) request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest.assets.has(filename);
        const is_asset_html = manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name, value, ...options3 } = set_cookie_parser.parseString(str, {
              decodeValues: false
            });
            const path = options3.path ?? (url.pathname.split("/").slice(0, -1).join("/") || "/");
            set_internal(name, value, {
              path,
              encode: (value2) => value2,
              .../** @type {import('cookie').CookieSerializeOptions} */
              options3
            });
          }
        }
        return response;
      }
    });
  };
  return (input, init2) => {
    const response = server_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
function validator(expected) {
  function validate(module, file) {
    if (!module) return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2)) continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
const valid_layout_exports = /* @__PURE__ */ new Set([
  "load",
  "prerender",
  "csr",
  "ssr",
  "trailingSlash",
  "config"
]);
const valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
const valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
const valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
const valid_server_exports = /* @__PURE__ */ new Set([
  "GET",
  "POST",
  "PATCH",
  "PUT",
  "DELETE",
  "OPTIONS",
  "HEAD",
  "fallback",
  "prerender",
  "trailingSlash",
  "config",
  "entries"
]);
const validate_layout_exports = validator(valid_layout_exports);
const validate_page_exports = validator(valid_page_exports);
const validate_layout_server_exports = validator(valid_layout_server_exports);
const validate_page_server_exports = validator(valid_page_server_exports);
const validate_server_exports = validator(valid_server_exports);
let body;
let etag;
let headers;
function get_public_env(request) {
  body ??= `export const env=${JSON.stringify(public_env)}`;
  etag ??= `W/${Date.now()}`;
  headers ??= new Headers({
    "content-type": "application/javascript; charset=utf-8",
    etag
  });
  if (request.headers.get("if-none-match") === etag) {
    return new Response(void 0, { status: 304, headers });
  }
  return new Response(body, { headers });
}
function get_page_config(nodes) {
  let current = {};
  for (const node of nodes) {
    if (!node?.universal?.config && !node?.server?.config) continue;
    current = {
      ...current,
      ...node?.universal?.config,
      ...node?.server?.config
    };
  }
  return Object.keys(current).length ? current : void 0;
}
const default_transform = ({ html }) => html;
const default_filter = () => false;
const default_preload = ({ type }) => type === "js" || type === "css";
const page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
const allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest, state) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = new HttpError(
        403,
        `Cross-site ${request.method} form submissions are forbidden`
      );
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let rerouted_path;
  try {
    rerouted_path = options2.hooks.reroute({ url: new URL(url) }) ?? url.pathname;
  } catch {
    return text("Internal Server Error", {
      status: 500
    });
  }
  let decoded;
  try {
    decoded = decode_pathname(rerouted_path);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  if (decoded === `/${options2.app_dir}/env.js`) {
    return get_public_env(request);
  }
  if (decoded.startsWith(`/${options2.app_dir}`)) {
    return text("Not found", { status: 404 });
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) + (url.searchParams.get(TRAILING_SLASH_PARAM) === "1" ? "/" : "") || "/";
    url.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest._.matchers();
    for (const candidate of manifest._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match) continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers2 = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-static"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers2) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers2[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state.depth > 0
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await load_page_nodes(route.page, manifest);
        if (DEV) ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV) ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
      if (state.before_handle || state.emulator?.platform) {
        let config = {};
        let prerender = false;
        if (route.endpoint) {
          const node = await route.endpoint();
          config = node.config ?? config;
          prerender = node.prerender ?? prerender;
        } else if (route.page) {
          const nodes = await load_page_nodes(route.page, manifest);
          config = get_page_config(nodes) ?? config;
          prerender = get_option(nodes, "prerender") ?? false;
        }
        if (state.before_handle) {
          state.before_handle(event, config, prerender);
        }
        if (state.emulator?.platform) {
          event.platform = await state.emulator.platform({ config, prerender });
        }
      }
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback) disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve2(event2, opts).then((response2) => {
        for (const key2 in headers2) {
          const value = headers2[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag2 = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag2) {
        const headers22 = new Headers({ etag: etag2 });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value) headers22.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers22
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e) : route?.page && is_action_json_request(event) ? action_json_redirect(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e);
  }
  async function resolve2(event2, opts) {
    try {
      if (opts) {
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          if (page_methods.has(method)) {
            response = await render_page(event2, route.page, options2, manifest, state, resolve_opts);
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v) => v.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state.error && event2.isSubRequest) {
        return await fetch(request, {
          headers: {
            "x-sveltekit-error": "true"
          }
        });
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest,
          state,
          status: 404,
          error: new SvelteKitError(404, "Not Found", `Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      return await handle_fatal_error(event2, options2, e);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
function afterUpdate() {
}
let prerendering = false;
function set_building() {
}
function set_prerendering() {
  prerendering = true;
}
const Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0) $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0) $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0) $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0) $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0) $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      stores.page.set(page2);
    }
    $$rendered = `  ${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
function set_read_implementation(fn) {
}
function set_manifest(_) {
}
const options = {
  app_dir: "_app",
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body: body2, assets: assets2, nonce, env }) => '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <meta content="width=device-width, initial-scale=1" name="viewport" />\n\n    <title>Waterway Labs</title>\n    <link href="https://waterwaylabs.xyz" rel="canonical" />\n    <meta\n      content="Waterway Labs is a UK based technology company."\n      name="description"\n    />\n    <meta content="Waterway Labs" property="og:title" />\n    <meta\n      content="Waterway Labs is a UK based technology company."\n      property="og:description"\n    />\n    <meta content="website" property="og:type" />\n    <meta content="https://waterwaylabs.xyz" property="og:url" />\n    <meta\n      content="https://waterwaylabs.xyz/meta-share.jpg"\n      property="og:image"\n    />\n    <meta content="summary_large_image" name="twitter:card" />\n    <meta content="Waterway Labs" name="twitter:title" />\n    <meta\n      content="Waterway Labs is a UK based technology company."\n      name="twitter:description"\n    />\n    <meta\n      content="https://waterwaylabs.xyz/meta-share.jpg"\n      name="twitter:image"\n    />\n\n    <link crossorigin="anonymous" href="/manifest.webmanifest" rel="manifest" />\n\n    <link rel="preload" href="/logo.png" as="image" />\n    <link rel="preload" href="/logo_black.png" as="image" />\n\n    <link rel="preload" href="/team/dfd.jpg" as="image" />\n    <link rel="preload" href="/team/george.jpg" as="image" />\n    <link rel="preload" href="/team/james.jpg" as="image" />\n    <link rel="preload" href="/team/josh.jpg" as="image" />\n    <link rel="preload" href="/team/kelly.jpeg" as="image" />\n    <link rel="preload" href="/team/zoe.jpg" as="image" />\n    <link rel="preload" href="/team/thilly.jpg" as="image" />\n\n    <!-- Favicon -->\n    <link\n      rel="icon"\n      type="image/png"\n      sizes="32x32"\n      href="' + assets2 + '/favicons/favicon-32x32.png"\n    />\n    <link\n      rel="icon"\n      type="image/png"\n      sizes="16x16"\n      href="' + assets2 + '/favicons/favicon-16x16.png"\n    />\n    <link rel="shortcut icon" href="' + assets2 + '/favicons/favicon.ico" />\n\n    <!-- iOS meta tags & icons -->\n    <meta name="apple-mobile-web-app-capable" content="yes" />\n    <meta name="apple-mobile-web-app-status-bar-style" content="#2CE3A6" />\n    <meta name="apple-mobile-web-app-title" content="Waterway Labs" />\n    <link\n      rel="apple-touch-icon"\n      href="' + assets2 + '/favicons/apple-touch-icon.png"\n    />\n\n    <!-- MS -->\n    <meta name="msapplication-TileColor" content="#101111" />\n    <meta\n      name="msapplication-config"\n      content="' + assets2 + '/favicons/browserconfig.xml"\n    />\n\n    <meta content="#2CE3A6" name="theme-color" />\n    ' + head + '\n\n    <style>\n      html,\n      body {\n        height: 100%;\n        margin: 0;\n      }\n\n      @font-face {\n        font-display: swap;\n        font-family: "Rubik";\n        font-style: normal;\n        font-weight: 400;\n        src: url("' + assets2 + '/Rubik-Regular.woff2") format("woff2");\n      }\n      body {\n        font-family: "Rubik", sans-serif !important;\n        color: white !important;\n        height: 100vh;\n        margin: 0;\n        background-color: #272727;\n      }\n\n      #app-spinner {\n        --spinner-size: 30px;\n\n        width: var(--spinner-size);\n        height: var(--spinner-size);\n\n        animation: app-spinner-linear-rotate 2000ms linear infinite;\n\n        position: absolute;\n        top: calc(50% - (var(--spinner-size) / 2));\n        left: calc(50% - (var(--spinner-size) / 2));\n\n        --radius: 45px;\n        --circumference: calc(3.14159265359 * var(--radius) * 2);\n\n        --start: calc((1 - 0.05) * var(--circumference));\n        --end: calc((1 - 0.8) * var(--circumference));\n      }\n\n      #app-spinner circle {\n        stroke-dasharray: var(--circumference);\n        stroke-width: 10%;\n        transform-origin: 50% 50% 0;\n\n        transition-property: stroke;\n\n        animation-name: app-spinner-stroke-rotate-100;\n        animation-duration: 4000ms;\n        animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);\n        animation-iteration-count: infinite;\n\n        fill: transparent;\n        stroke: currentColor;\n\n        transition: stroke-dashoffset 225ms linear;\n      }\n\n      @keyframes app-spinner-linear-rotate {\n        0% {\n          transform: rotate(0deg);\n        }\n        100% {\n          transform: rotate(360deg);\n        }\n      }\n\n      @keyframes app-spinner-stroke-rotate-100 {\n        0% {\n          stroke-dashoffset: var(--start);\n          transform: rotate(0);\n        }\n        12.5% {\n          stroke-dashoffset: var(--end);\n          transform: rotate(0);\n        }\n        12.5001% {\n          stroke-dashoffset: var(--end);\n          transform: rotateX(180deg) rotate(72.5deg);\n        }\n        25% {\n          stroke-dashoffset: var(--start);\n          transform: rotateX(180deg) rotate(72.5deg);\n        }\n\n        25.0001% {\n          stroke-dashoffset: var(--start);\n          transform: rotate(270deg);\n        }\n        37.5% {\n          stroke-dashoffset: var(--end);\n          transform: rotate(270deg);\n        }\n        37.5001% {\n          stroke-dashoffset: var(--end);\n          transform: rotateX(180deg) rotate(161.5deg);\n        }\n        50% {\n          stroke-dashoffset: var(--start);\n          transform: rotateX(180deg) rotate(161.5deg);\n        }\n\n        50.0001% {\n          stroke-dashoffset: var(--start);\n          transform: rotate(180deg);\n        }\n        62.5% {\n          stroke-dashoffset: var(--end);\n          transform: rotate(180deg);\n        }\n        62.5001% {\n          stroke-dashoffset: var(--end);\n          transform: rotateX(180deg) rotate(251.5deg);\n        }\n        75% {\n          stroke-dashoffset: var(--start);\n          transform: rotateX(180deg) rotate(251.5deg);\n        }\n\n        75.0001% {\n          stroke-dashoffset: var(--start);\n          transform: rotate(90deg);\n        }\n        87.5% {\n          stroke-dashoffset: var(--end);\n          transform: rotate(90deg);\n        }\n        87.5001% {\n          stroke-dashoffset: var(--end);\n          transform: rotateX(180deg) rotate(341.5deg);\n        }\n        100% {\n          stroke-dashoffset: var(--start);\n          transform: rotateX(180deg) rotate(341.5deg);\n        }\n      }\n    </style>\n  </head>\n  <body data-sveltekit-preload-data="hover">\n    <div style="display: contents">' + body2 + '</div>\n\n    <svg\n      id="app-spinner"\n      preserveAspectRatio="xMidYMid meet"\n      focusable="false"\n      aria-hidden="true"\n      data-tid="spinner"\n      viewBox="0 0 100 100"\n    >\n      <circle cx="50%" cy="50%" r="45" />\n    </svg>\n  </body>\n</html>\n',
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "5beq9i"
};
async function get_hooks() {
  return {};
}
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(private_prefix) && (public_prefix === "" || !k.startsWith(public_prefix))
    )
  );
}
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(public_prefix) && (private_prefix === "" || !k.startsWith(private_prefix))
    )
  );
}
const prerender_env_handler = {
  get({ type }, prop) {
    throw new Error(
      `Cannot read values from $env/dynamic/${type} while prerendering (attempted to read env.${prop.toString()}). Use $env/static/${type} instead`
    );
  }
};
class Server {
  /** @type {import('types').SSROptions} */
  #options;
  /** @type {import('@sveltejs/kit').SSRManifest} */
  #manifest;
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest) {
    this.#options = options;
    this.#manifest = manifest;
  }
  /**
   * @param {{
   *   env: Record<string, string>;
   *   read?: (file: string) => ReadableStream;
   * }} opts
   */
  async init({ env, read }) {
    const prefixes = {
      public_prefix: this.#options.env_public_prefix,
      private_prefix: this.#options.env_private_prefix
    };
    const private_env = filter_private_env(env, prefixes);
    const public_env2 = filter_public_env(env, prefixes);
    set_private_env(
      prerendering ? new Proxy({ type: "private" }, prerender_env_handler) : private_env
    );
    set_public_env(
      prerendering ? new Proxy({ type: "public" }, prerender_env_handler) : public_env2
    );
    set_safe_public_env(public_env2);
    if (!this.#options.hooks) {
      try {
        const module = await get_hooks();
        this.#options.hooks = {
          handle: module.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
          handleError: module.handleError || (({ error }) => console.error(error)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request)),
          reroute: module.reroute || (() => {
          })
        };
      } catch (error) {
        {
          throw error;
        }
      }
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    return respond(request, this.#options, this.#manifest, {
      ...options2,
      error: false,
      depth: 0
    });
  }
}
const Layout$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${slots.default ? slots.default({}) : ``}`;
});
function get(key2, parse2 = JSON.parse) {
  try {
    return parse2(sessionStorage[key2]);
  } catch {
  }
}
const SNAPSHOT_KEY = "sveltekit:snapshot";
const SCROLL_KEY = "sveltekit:scroll";
get(SCROLL_KEY) ?? {};
get(SNAPSHOT_KEY) ?? {};
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
});
const css$9 = {
  code: ".button-style.svelte-12gcm1i{display:inline-flex;align-items:center;justify-content:space-between;padding:12px 24px;background-color:transparent;color:white;border:2px solid white;border-radius:9999px;font-family:'mona', sans-serif;font-weight:600;font-size:14px;line-height:12.6px;cursor:pointer;transition:background-color 0.3s ease}.button-style.svelte-12gcm1i:hover{background-color:rgba(255, 255, 255, 0.1)}.button-text.svelte-12gcm1i{margin-right:8px}.button-icon.svelte-12gcm1i{width:24px;height:24px;transition:transform 0.3s ease}",
  map: `{"version":3,"file":"project-section.svelte","sources":["project-section.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let title;\\nexport let description;\\nexport let summary;\\nexport let buttonText;\\nexport let buttonLink;\\nexport let status;\\nexport let isFootballGod = false;\\n<\/script>\\n  \\n<section class=\\"space-y-6 project-section lg:p-8\\" style=\\"margin-top: -35px;\\">\\n    <span class=\\"px-3 py-1 translate-y-2 text-xs text-[#272727] bg-white rounded-full\\">{status}</span>\\n    <h1 class=\\"project-title\\">{title}</h1>\\n    <h4 class=\\"font-med font-mona {isFootballGod ? 'text-h4small' : 'text-h4'}\\">{description}</h4>\\n    <p class=\\"mr-8 font-light text-gray-300 font-inter lg:mt-4 lg:mb-8 {isFootballGod ? 'text-bodysmall' : 'text-body'}\\">{summary}</p>\\n    <a\\n        href={buttonLink}\\n        target=\\"_blank\\"\\n        class=\\"button-style group\\"\\n        >\\n        <span class=\\"button-text\\">{buttonText}</span>\\n        <svg\\n            xmlns=\\"http://www.w3.org/2000/svg\\"\\n            viewBox=\\"0 0 24 24\\"\\n            fill=\\"currentColor\\"\\n            class=\\"transition-transform duration-300 button-icon group-hover:translate-x-2\\"\\n        >\\n            <path d=\\"M10 17l5-5-5-5v10z\\"/>\\n        </svg>\\n    </a>\\n</section>\\n<style>\\n    .button-style {\\n      display: inline-flex;\\n      align-items: center;\\n      justify-content: space-between;\\n      padding: 12px 24px;\\n      background-color: transparent;\\n      color: white;\\n      border: 2px solid white;\\n      border-radius: 9999px;\\n      font-family: 'mona', sans-serif;\\n      font-weight: 600;\\n      font-size: 14px;\\n      line-height: 12.6px;\\n      cursor: pointer;\\n      transition: background-color 0.3s ease;\\n    }\\n    \\n    .button-style:hover {\\n      background-color: rgba(255, 255, 255, 0.1);\\n    }\\n    \\n    .button-text {\\n      margin-right: 8px;\\n    }\\n    \\n    .button-icon {\\n      width: 24px;\\n      height: 24px;\\n      transition: transform 0.3s ease;\\n    }</style>\\n"],"names":[],"mappings":"AA+BI,4BAAc,CACZ,OAAO,CAAE,WAAW,CACpB,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,aAAa,CAC9B,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,gBAAgB,CAAE,WAAW,CAC7B,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CACvB,aAAa,CAAE,MAAM,CACrB,WAAW,CAAE,MAAM,CAAC,CAAC,UAAU,CAC/B,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,gBAAgB,CAAC,IAAI,CAAC,IACpC,CAEA,4BAAa,MAAO,CAClB,gBAAgB,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAC3C,CAEA,2BAAa,CACX,YAAY,CAAE,GAChB,CAEA,2BAAa,CACX,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,IAC7B"}`
};
const Project_section = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { description } = $$props;
  let { summary } = $$props;
  let { buttonText } = $$props;
  let { buttonLink } = $$props;
  let { status } = $$props;
  let { isFootballGod = false } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0) $$bindings.description(description);
  if ($$props.summary === void 0 && $$bindings.summary && summary !== void 0) $$bindings.summary(summary);
  if ($$props.buttonText === void 0 && $$bindings.buttonText && buttonText !== void 0) $$bindings.buttonText(buttonText);
  if ($$props.buttonLink === void 0 && $$bindings.buttonLink && buttonLink !== void 0) $$bindings.buttonLink(buttonLink);
  if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
  if ($$props.isFootballGod === void 0 && $$bindings.isFootballGod && isFootballGod !== void 0) $$bindings.isFootballGod(isFootballGod);
  $$result.css.add(css$9);
  return `<section class="space-y-6 project-section lg:p-8" style="margin-top: -35px;"><span class="px-3 py-1 translate-y-2 text-xs text-[#272727] bg-white rounded-full">${escape(status)}</span> <h1 class="project-title">${escape(title)}</h1> <h4 class="${"font-med font-mona " + escape(isFootballGod ? "text-h4small" : "text-h4", true)}">${escape(description)}</h4> <p class="${"mr-8 font-light text-gray-300 font-inter lg:mt-4 lg:mb-8 " + escape(isFootballGod ? "text-bodysmall" : "text-body", true)}">${escape(summary)}</p> <a${add_attribute("href", buttonLink, 0)} target="_blank" class="button-style group svelte-12gcm1i"><span class="button-text svelte-12gcm1i">${escape(buttonText)}</span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="transition-transform duration-300 button-icon group-hover:translate-x-2 svelte-12gcm1i"><path d="M10 17l5-5-5-5v10z"></path></svg></a> </section>`;
});
const Openfpl = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  let { width = "43.16" } = $$props;
  let { height = "59.87" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0) $$bindings.height(height);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("class", className, 0)} fill="none" viewBox="-46 -155 157 400">${escape(width)}${escape(height)}
    preserveAspectRatio=&quot;xMidYMid meet&quot;
&gt;
<path d="M34.2198 0C21.368 2.1056 9.8424 7.49415 0.149728 15.2632L0.116272 15.3337V64.853L34.1864 94L67.8765 64.853L67.8837 15.3126C58.332 7.8537 46.7921 2.0727 34.2198 0ZM40.9541 72.5186C40.9541 72.763 40.8011 73.0074 40.5526 73.0686L34.1864 75.1765C34.0621 75.207 33.9379 75.207 33.8136 75.1765L27.4474 73.0686C27.1989 72.9769 27.0435 72.763 27.0435 72.5186V70.3801C27.0435 70.1663 27.1678 69.9524 27.3542 69.8608L33.7204 66.5614C33.9068 66.4697 34.0932 66.4697 34.2796 66.5614L40.6458 69.8608C40.8322 69.9524 40.9541 70.1663 40.9541 70.3801V72.5186ZM52.9265 48.9646C52.9265 49.1785 52.8022 49.3923 52.5848 49.484L48.0515 51.7752C47.7408 51.928 47.6476 52.2945 47.803 52.5695L52.212 60.6042C52.3363 60.8486 52.3052 61.1235 52.1188 61.3068L44.6031 68.5777C44.3857 68.7915 44.075 68.7915 43.8265 68.6388L35.257 62.5593C34.9774 62.3455 34.9153 61.9483 35.1638 61.6734L41.9649 54.2192C42.3688 53.761 41.9028 53.0889 41.3436 53.2722L34.1697 55.5634C34.0454 55.594 33.9211 55.594 33.7969 55.5634L26.6564 53.2722C26.0662 53.0889 25.6312 53.7915 26.0351 54.2192L32.8338 61.6734C33.0823 61.9483 33.0202 62.3455 32.7406 62.5593L24.1711 68.6388C23.9226 68.7915 23.6119 68.7915 23.3945 68.5777L15.8812 61.2762C15.6948 61.0929 15.6637 60.818 15.788 60.5736L20.197 52.539C20.3524 52.2335 20.2281 51.8974 19.9485 51.7447L15.4152 49.4534C15.2288 49.3618 15.0735 49.1479 15.0735 48.934V32.9258C15.0735 32.4676 15.6016 32.1621 16.0055 32.437L19.731 34.9116C19.8864 35.0338 19.9796 35.1866 19.9796 35.4004L20.0106 39.5247C20.0106 39.708 20.1038 39.8913 20.2592 40.0135L25.7244 43.7711C26.1283 44.046 26.6875 43.7406 26.6564 43.2518L26.3147 35.9809C26.3147 35.7976 26.2215 35.6143 26.0662 35.5226L15.322 28.2822C15.1667 28.16 15.0735 27.9767 15.0735 27.7934V24.2191C15.0735 24.0969 15.1045 23.9441 15.1977 23.8525L19.0786 19.0256C19.234 18.8118 19.5136 18.7507 19.7621 18.8423L33.7658 23.9441C33.8901 24.0052 34.0454 24.0052 34.1697 23.9441L48.1758 18.8423C48.4243 18.7507 48.7015 18.8423 48.8568 19.0256L52.7401 23.8525C52.8333 23.9441 52.8644 24.0969 52.8644 24.2191V27.7934C52.8644 27.9767 52.7712 28.16 52.6158 28.2822L41.8717 35.5226C41.7785 35.6448 41.6853 35.8281 41.6853 36.0114L41.3436 43.2823C41.3125 43.7711 41.8717 44.0766 42.2756 43.8017L47.7408 40.044C47.8962 39.9218 47.9894 39.7691 47.9894 39.5552L48.0204 35.431C48.0204 35.2477 48.1136 35.0644 48.269 34.9422L51.9945 32.4676C52.3984 32.1926 52.9265 32.4676 52.9265 32.9564V48.9646Z" fill="#161819"></path></svg>`;
});
const Footballgod = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("class", className, 0)} fill="none" viewBox="-73 -68 300 300"><path fill-rule="evenodd" clip-rule="evenodd" d="M160 80C160 124.183 124.183 160 80 160C35.8172 160 0 124.183 0 80C0 35.8172 35.8172 0 80 0C124.183 0 160 35.8172 160 80ZM132.282 65.8446L139.297 38.0102C130.753 25.9655 118.63 16.6371 104.479 11.574L78.7755 25.3062L54.6791 11.881C41.243 16.8774 29.6852 25.7354 21.3544 37.1061L28.598 65.8446L7.79184 88.0861C9.03586 99.3203 12.8414 109.782 18.6114 118.875L47.1891 124.821L56.3685 148.723C63.777 151.27 71.727 152.653 80 152.653C88.0652 152.653 95.8235 151.339 103.072 148.913L112.325 124.821L141.462 118.758C147.335 109.465 151.158 98.7472 152.297 87.2404L132.282 65.8446Z" fill="#FFFFFF"></path><g clip-path="url(#clip0_269_2886)"><path d="M76 38C76 58.9868 58.9868 76 38 76C17.0132 76 0 58.9868 0 38C0 17.0132 17.0132 0 38 0C58.9868 0 76 17.0132 76 38ZM62.8338 31.2761L66.1662 18.0549C62.1075 12.3337 56.3494 7.90269 49.6276 5.49772L37.4184 12.0204L25.9727 5.64355C19.5905 8.01684 14.1005 12.2244 10.1434 17.6255L13.584 31.2761L3.7011 41.8407C4.29197 47.177 6.09957 52.1465 8.84029 56.4655L22.4148 59.2899L26.775 70.6437C30.2941 71.8535 34.0703 72.5103 38 72.5103C41.8309 72.5103 45.516 71.8861 48.9592 70.7338L53.3541 59.2899L67.1948 56.4101C69.9843 51.9957 71.8002 46.9048 72.341 41.4391L62.8338 31.2761Z" fill="white"></path></g><defs><clipPath id="clip0_269_2886"><rect width="55" height="60.4082" fill="white" transform="translate(51.4286 49.796)"></rect></clipPath></defs></svg>`;
});
const Golfpad = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  return `<svg${add_attribute("class", className, 0)} viewBox="-34 -85 140 250" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="38" cy="38" r="38" fill="#101111"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M73.0947 43.5257C73.376 41.7251 73.5219 39.8796 73.5219 38.0001C73.5219 18.3819 57.6183 2.47827 38.0001 2.47827C18.3819 2.47827 2.47827 18.3819 2.47827 38.0001C2.47827 39.8796 2.62425 41.7251 2.90548 43.5257H73.0947Z" fill="#F4C802"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M67.9727 43.5258C68.3614 41.6057 68.5654 39.6198 68.5654 37.587C68.5654 20.9344 54.8809 7.43481 38.0002 7.43481C21.1194 7.43481 7.43494 20.9344 7.43494 37.587C7.43494 39.6198 7.63886 41.6057 8.02764 43.5258H67.9727Z" fill="#F4C802"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M62.1644 43.5257C62.5691 41.7489 62.7827 39.8994 62.7827 38C62.7827 24.313 51.6872 13.2174 38.0001 13.2174C24.3131 13.2174 13.2175 24.313 13.2175 38C13.2175 39.8994 13.4312 41.7489 13.8358 43.5257H62.1644Z" fill="#F4C802"></path><mask id="mask0_71_260" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="2" y="2" width="72" height="72"><circle cx="38" cy="38" r="35.5217" fill="#101111"></circle></mask><g mask="url(#mask0_71_260)"><rect x="-23.9564" y="38" width="123.087" height="54.5217" fill="#70B354"></rect><path d="M35.7926 72.5684C35.8356 73.119 36.2792 73.5675 36.8315 73.5675H39.9945C40.5468 73.5675 40.9904 73.119 41.0334 72.5684C41.3972 67.907 44.2865 63.8758 48.4724 61.5853C48.6353 61.4961 48.7391 61.3262 48.7391 61.1404C48.7391 60.7626 48.3346 60.5198 47.9934 60.6818C45.3573 61.9336 42.0299 62.6805 38.413 62.6805C34.7961 62.6805 31.4687 61.9336 28.8326 60.6818C28.4914 60.5198 28.0869 60.7626 28.0869 61.1404C28.0869 61.3262 28.1907 61.4961 28.3536 61.5853C32.5395 63.8758 35.4288 67.907 35.7926 72.5684Z" fill="#101111"></path><path d="M35.8315 63.6805C35.8315 63.1283 36.2792 62.6805 36.8315 62.6805H39.9945C40.5468 62.6805 40.9945 63.1283 40.9945 63.6805V86.5652C40.9945 87.1175 40.5468 87.5652 39.9945 87.5652H36.8315C36.2792 87.5652 35.8315 87.1175 35.8315 86.5652V63.6805Z" fill="#101111"></path></g><circle cx="38" cy="38" r="16.5217" fill="white"></circle><circle cx="38" cy="38" r="21.4783" fill="#101111"></circle><circle cx="38.0001" cy="38" r="18.1739" fill="white"></circle></svg>`;
});
const Transferkings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("class", className, 0)} fill="none" viewBox="-34 -60 140 200"><path d="M29.78 61.4948C27.2577 62.0247 25.3375 62.2969 24.0965 62.4228C23.3446 62.4991 22.7418 63.1756 22.7594 63.9375C22.7919 65.3439 22.7751 67.034 22.8921 67.6239C23.7419 71.9083 25.7362 73.3851 26.226 73.6891C26.2979 73.7342 26.3725 73.7625 26.4544 73.7838C27.3752 74.0189 33.5533 75.5324 40.9818 75.7798C41.3312 75.7914 41.6698 75.6548 41.917 75.4056L47.8687 69.4035C48.4564 68.8109 48.336 67.8191 47.626 67.3837C46.1403 66.4723 44.2164 65.2757 43.1506 64.5595C41.9043 63.7215 39.5834 61.3325 38.1338 59.7627C37.743 59.3395 37.1229 59.2217 36.593 59.4426C35.2324 60.0096 32.8196 60.8562 29.78 61.4948Z" fill="white"></path><path d="M75.1588 49.4409C76.1028 46.8223 76.1015 43.5393 75.8748 41.1856C75.7809 40.2081 74.6575 39.8088 73.9192 40.4497L68.9205 44.7911C68.5277 45.1321 68.3348 45.6908 68.3514 46.2132C68.3719 46.8547 68.3616 47.8852 68.2709 49.4409C68.1292 51.8763 66.316 56.7918 65.0975 59.7571C64.8375 60.39 65.1 61.123 65.715 61.4142C66.9515 61.9995 68.4325 62.639 68.6759 62.5162C69.0814 62.3119 73.5379 53.9355 75.1588 49.4409Z" fill="white"></path><path d="M0.308158 31.6806L6.36348 23.9235C6.91297 23.2196 7.98942 23.2822 8.45494 24.0452L13.7181 32.6703C13.8855 32.9446 13.9449 33.2723 13.8846 33.5887L11.1527 47.9146C11.031 48.553 10.4567 48.9999 9.81349 48.9567L2.62564 48.4734C2.13529 48.4404 1.70523 48.1272 1.55447 47.6554C1.4321 47.2725 1.30246 46.8147 1.21555 46.3765C1.05936 45.5889 0.388868 37.148 0.0382191 32.5746C0.013524 32.2525 0.110011 31.9345 0.308158 31.6806Z" fill="white"></path><path d="M27.5514 1.02146C24.0754 1.63113 18.9197 4.65709 16.3232 6.38802C15.9943 6.60732 15.8015 6.97959 15.8015 7.37724C15.8015 8.23971 16.6749 8.8289 17.4731 8.5193C19.0631 7.90254 21.2713 7.10512 23.2972 6.53763C25.9261 5.80114 28.8622 5.45184 30.3558 5.34016C30.6393 5.31896 30.9094 5.20986 31.1243 5.02212L33.7261 2.74806C33.7962 2.68679 33.8727 2.63339 33.9543 2.58884L36.3229 1.29496C36.915 0.971512 36.6739 0.0883905 36.0017 0.129305C33.4852 0.282476 30.1481 0.56605 27.5514 1.02146Z" fill="white"></path><path d="M65.2323 11.8494C62.567 8.91729 59.5849 6.63961 57.5719 5.30658C57.2698 5.10649 56.9913 5.4556 57.2387 5.72137C58.0981 6.64464 59.0533 7.66117 59.5599 8.17198C60.2929 8.91124 61.5232 11.6007 62.2012 13.2163C62.3281 13.5188 62.5609 13.7631 62.8559 13.9022C63.7223 14.3104 65.1013 14.9843 66.0427 15.5268C66.8627 15.9995 68.9326 18.2805 70.6289 20.2543C70.8754 20.5416 71.2675 20.2756 71.0772 19.9475C69.7731 17.7003 67.7275 14.5948 65.2323 11.8494Z" fill="white"></path><path d="M57.2249 32.0975L39.2291 39.8311C38.8484 39.9946 38.6696 40.4426 38.8318 40.8265L39.4218 42.2225C39.584 42.6064 40.0282 42.7867 40.4089 42.6231L58.4047 34.8896C58.7854 34.726 58.9641 34.278 58.8018 33.8941L58.212 32.4981C58.0498 32.1142 57.6056 31.9339 57.2249 32.0975ZM54.0946 16.9475C52.9482 17.4402 52.4145 18.7778 52.903 19.9339C53.0339 20.2436 53.2248 20.5018 53.4583 20.7159L51.1264 23.9552C50.6298 24.6428 49.6731 24.7859 49.0005 24.2708L42.8462 19.5649C43.1469 18.982 43.2063 18.276 42.9298 17.6217C42.4413 16.4656 41.1149 15.9273 39.9685 16.42C38.8222 16.9126 38.2884 18.2502 38.7769 19.4063C39.0535 20.0607 39.5996 20.5064 40.2247 20.6914L39.3278 28.4276C39.2303 29.2736 38.461 29.8722 37.6295 29.7553L33.7018 29.206C33.708 28.8941 33.6581 28.5702 33.5272 28.2604C33.0387 27.1043 31.7123 26.5661 30.5659 27.0587C29.4196 27.5514 28.8815 28.8909 29.37 30.047C29.8585 31.2031 31.1849 31.7413 32.3313 31.2487C32.4438 31.2003 32.5488 31.1345 32.6496 31.0706L39.3313 38.1376L55.9428 30.999L55.5164 21.2438C55.6319 21.2148 55.7518 21.1839 55.8643 21.1356C57.0106 20.6429 57.5444 19.3053 57.0559 18.1492C56.5674 16.9931 55.2409 16.4549 54.0946 16.9475Z" fill="white"></path></svg>`;
});
const Openbook = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("class", className, 0)} fill="none" viewBox="-45 -60 140 200"><path d="M53.2698 60.8778V73.4416C50.0032 71.4885 46.0742 70.3578 41.8482 70.3578C38.3988 70.3578 35.1551 71.1116 32.2997 72.4479C30.3237 73.3731 28.5305 74.5724 27 76.0001C25.4695 74.5724 23.6763 73.3731 21.7004 72.4479C18.845 71.1116 15.6012 70.3578 12.1519 70.3578C7.92587 70.3578 3.99682 71.4885 0.730225 73.4416V60.8778C2.78612 59.6443 5.0933 58.7419 7.58322 58.2508C9.05661 57.9539 10.5871 57.7939 12.1519 57.7939C13.3169 57.7939 14.4705 57.8853 15.5784 58.0452C20.0328 58.7077 24.0076 60.6494 27 63.4362C29.9925 60.6494 33.9672 58.7077 38.4217 58.0452C39.5296 57.8853 40.6832 57.7939 41.8482 57.7939C43.4129 57.7939 44.9434 57.9539 46.4168 58.2508C48.9068 58.7419 51.2139 59.6443 53.2698 60.8778Z" fill="white"></path><path d="M27 0C12.4945 0 0.730225 11.7643 0.730225 26.2698C0.730225 40.7753 12.4945 52.5396 27 52.5396C41.5055 52.5396 53.2698 40.7753 53.2698 26.2698C53.2698 11.7643 41.5055 0 27 0ZM27 39.9758C19.4275 39.9758 13.294 33.8424 13.294 26.2698C13.294 18.6972 19.4275 12.5638 27 12.5638C34.5726 12.5638 40.706 18.6972 40.706 26.2698C40.706 33.8424 34.5726 39.9758 27 39.9758Z" fill="#101111"></path></svg>`;
});
const Openbeats = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("class", className, 0)} viewBox="-43 -60 140 200" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.354736 0H14.7443C23.6111 0 30.8199 6.98764 30.9964 15.6734H30.9999V45.8363H31.0375V15.6735C47.9449 15.6934 61.6451 29.1903 61.6451 45.8367C61.6451 62.4954 47.9248 76 30.9999 76C14.075 76 0.354736 62.4954 0.354736 45.8367V0Z" fill="url(#paint0_angular_71_293)"></path><defs><radialGradient id="paint0_angular_71_293" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(30.9999 46.0583) rotate(-90) scale(34.0817 34.6838)"><stop stop-color="#FFA295"></stop><stop offset="1" stop-color="white"></stop></radialGradient></defs></svg>`;
});
const Openchef = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("class", className, 0)} viewBox="-35 -70 125 200" fill="none"><g clip-path="url(#clip0_71_299)"><path fill-rule="evenodd" clip-rule="evenodd" d="M54.34 41.1973C53.7444 42.453 53.0552 43.6689 52.2756 44.8336C49.1393 49.5207 44.6815 53.1735 39.466 55.3306C34.2503 57.4876 28.5113 58.0521 22.9745 56.9523C17.4377 55.8528 12.3519 53.1385 8.36007 49.1526C4.36825 45.1667 1.6498 40.0886 0.548445 34.5601C-0.552871 29.0316 0.0123737 23.3012 2.17269 18.0935C4.33307 12.8858 7.99149 8.43474 12.6854 5.30311C17.3792 2.17151 22.8977 0.5 28.543 0.5V12.5321C19.7455 12.8922 12.724 20.1273 12.724 29C12.724 38.1028 20.1143 45.4819 29.2308 45.4819C34.9325 45.4819 39.9591 42.5955 42.9245 38.2062L45.8751 38.9791C42.5349 37.2787 40.0276 34.1514 38.8271 30.3735H32.4977C31.833 30.3735 31.2941 29.8354 31.2941 29.1717C31.2941 28.5079 31.833 27.9699 32.4977 27.9699H71.7564C72.4211 27.9699 72.96 28.5079 72.96 29.1717C72.96 29.8354 72.4211 30.3735 71.7564 30.3735H65.1471C62.7426 36.5357 57.1169 40.6005 51.1057 40.3499L54.34 41.1973ZM53.6584 30.3735H44.351C45.5567 31.8618 47.197 32.7771 49.0045 32.7771C50.812 32.7771 52.4524 31.8618 53.6584 30.3735Z" fill="white"></path></g><defs><clipPath id="clip0_71_299"><rect width="76" height="57" fill="white" transform="translate(0 0.5)"></rect></clipPath></defs></svg>`;
});
const Icpfa = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("class", className, 0)} fill="none" viewBox="-23 -75 115 200"><path d="M59.2535 23.9917C59.3641 29.3513 53.1537 32.8988 48.6193 30.1084L48.6023 30.0914L47.1475 28.9089L46.9178 28.7303L46.9008 28.7132C43.4298 25.8888 35.0501 19.0659 31.5026 16.1734L31.477 16.1479L30.0988 15.0249V15.0079C30.0988 15.0079 30.0053 14.9399 29.9542 14.9058L29.9287 14.8888C18.4183 7.66611 6.65264 22.8262 16.6062 32.1842C17.1932 32.5841 34.0122 44.069 35.2373 44.9027C18.5289 54.2352 -2.38214 40.0875 0.2211 21.0056C1.87152 5.72643 18.8181 -4.25267 33.17 2.06828H33.187C37.6704 5.20749 44.8506 10.2353 49.402 13.4086L56.0887 18.0791C58.0029 19.3552 59.2705 21.5075 59.2705 23.9917H59.2535Z" fill="black"></path><path d="M75.9959 23.9917C76.3021 40.0876 59.4066 51.9979 44.3741 46.5021L42.562 45.2601C35.2968 40.3003 28.3888 35.4936 21.1151 30.5339L21.098 30.5169H21.081L18.7755 28.9345C13.0331 22.8262 20.4855 13.6468 27.6572 18.0281L27.6742 18.0451L28.8737 19.0234L28.8993 19.049L34.7863 23.8301V23.8471C36.4112 25.1828 44.9611 32.1162 46.3989 33.2988C53.8598 38.0544 63.941 31.9716 63.0732 22.9964V22.9794C62.7755 19.8657 61.1846 17.1178 58.8281 15.2887L58.2836 14.9144L41.1158 2.89355C56.5566 -5.48617 76.2511 6.31349 75.9959 24.0002V23.9917Z" fill="black"></path></svg>`;
});
const Opencare = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("class", className, 0)} fill="none" viewBox="-35 -60 138 200"><g clip-path="url(#clip0_448_6875)"><path d="M53.5509 0.197966C65.3998 0.197966 75.1021 9.38515 75.9416 21.0301C75.9814 21.5708 76.0001 22.1185 76.0001 22.6686L76.0001 67.1252C76.0001 71.9166 72.1182 75.8021 67.3314 75.8021L22.5405 75.8021C22.6154 75.8021 22.6902 75.8021 22.7627 75.7974C27.4069 75.6617 31.1016 71.7996 31.1016 67.1252L31.1016 22.6686C31.1016 22.1185 31.1203 21.5708 31.1601 21.0301C31.9996 9.38515 41.7019 0.197967 53.5509 0.197966Z" fill="white"></path><path d="M22.4492 30.861L31.1015 30.861L31.1015 67.1252C31.1015 71.7995 27.4068 75.6617 22.7626 75.7974C22.6901 75.8021 22.6153 75.8021 22.5404 75.8021L22.4492 75.8021C15.4853 75.8021 9.26031 72.6282 5.14461 67.6448C1.92923 63.7593 -7.44441e-07 58.7713 -9.8222e-07 53.3315C-1.22e-06 47.8918 1.92923 42.9038 5.14461 39.0182C9.26031 34.0349 15.4853 30.861 22.4492 30.861Z" fill="url(#paint0_linear_71_302)"></path></g><defs><linearGradient id="paint0_linear_71_302" x1="8.71576e-07" y1="53.3315" x2="31.1015" y2="53.3315" gradientUnits="userSpaceOnUse"><stop stop-color="white"></stop><stop offset="1" stop-color="#FFCEE7"></stop></linearGradient><clipPath id="clip0_71_302"><rect width="75.6042" height="76" fill="white" transform="translate(0 75.8021) rotate(-90)"></rect></clipPath></defs></svg>`;
});
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<header class="fixed top-0 left-0 right-0 bg-[#272727] z-50"><nav class="text-white"><div class="flex items-center justify-between h-16 px-4"><a href="/" class="flex items-center" data-svelte-h="svelte-d9t3r0"><img src="logo.png" class="h-6" alt="Waterway Labs Logo"> <span class="ml-2 text-xl tracking-wide font-mona"><span class="text-white">WATERWAY</span> <span class="text-white font-exlight">LABS</span></span></a>  <div class="hidden space-x-8 text-sm md:flex font-mona" data-svelte-h="svelte-n3yf8g"><a href="/about" class="hover:text-blue-400">ABOUT</a> <a href="/team" class="hover:text-blue-400">TEAM</a> <a href="/contact" class="hover:text-blue-400">CONTACT</a></div>  <button class="p-2 md:hidden" data-svelte-h="svelte-1p91wba"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button></div></nav>  ${``} </header>`;
});
const core = {
  close: "Close",
  back: "Back",
  menu: "Open menu to access navigation options",
  collapse: "Collapse",
  expand: "Expand",
  copy: "Copy to clipboard"
};
const theme = {
  switch_theme: "Switch theme"
};
const progress = {
  completed: "Completed",
  in_progress: "In progress"
};
const en = {
  core,
  theme,
  progress
};
readable({
  lang: "en",
  ...en
});
const initBusyStore = () => {
  const DEFAULT_STATE = [];
  const { subscribe: subscribe2, update, set } = writable(DEFAULT_STATE);
  return {
    subscribe: subscribe2,
    /**
     * Show the busy-screen if not visible
     */
    startBusy({ initiator: newInitiator, text: text2 }) {
      update((state) => [
        ...state.filter(({ initiator }) => newInitiator !== initiator),
        { initiator: newInitiator, text: text2 }
      ]);
    },
    /**
     * Hide the busy-screen if no other initiators are done
     */
    stopBusy(initiatorToRemove) {
      update((state) => state.filter(({ initiator }) => initiator !== initiatorToRemove));
    },
    resetForTesting() {
      set(DEFAULT_STATE);
    }
  };
};
const busyStore = initBusyStore();
const busy = derived(busyStore, ($busyStore) => $busyStore.length > 0);
const busyMessage = derived(busyStore, ($busyStore) => $busyStore.reverse().find(({ text: text2 }) => nonNullish(text2))?.text);
const css$8 = {
  code: ".medium.svelte-85668t{--spinner-size:30px}.small.svelte-85668t{--spinner-size:calc(var(--line-height-standard) * 1rem)}.tiny.svelte-85668t{--spinner-size:calc(var(--line-height-standard) * 0.5rem)}svg.svelte-85668t{width:var(--spinner-size);height:var(--spinner-size);animation:spinner-linear-rotate 2000ms linear infinite;position:absolute;top:calc(50% - var(--spinner-size) / 2);left:calc(50% - var(--spinner-size) / 2);--radius:45px;--circumference:calc(3.1415926536 * var(--radius) * 2);--start:calc((1 - 0.05) * var(--circumference));--end:calc((1 - 0.8) * var(--circumference))}svg.inline.svelte-85668t{display:inline-block;position:relative}circle.svelte-85668t{stroke-dasharray:var(--circumference);stroke-width:10%;transform-origin:50% 50% 0;transition-property:stroke;animation-name:spinner-stroke-rotate-100;animation-duration:4000ms;animation-timing-function:cubic-bezier(0.35, 0, 0.25, 1);animation-iteration-count:infinite;fill:transparent;stroke:currentColor;transition:stroke-dashoffset 225ms linear}@keyframes spinner-linear-rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes spinner-stroke-rotate-100{0%{stroke-dashoffset:var(--start);transform:rotate(0)}12.5%{stroke-dashoffset:var(--end);transform:rotate(0)}12.5001%{stroke-dashoffset:var(--end);transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:var(--start);transform:rotateX(180deg) rotate(72.5deg)}25.0001%{stroke-dashoffset:var(--start);transform:rotate(270deg)}37.5%{stroke-dashoffset:var(--end);transform:rotate(270deg)}37.5001%{stroke-dashoffset:var(--end);transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:var(--start);transform:rotateX(180deg) rotate(161.5deg)}50.0001%{stroke-dashoffset:var(--start);transform:rotate(180deg)}62.5%{stroke-dashoffset:var(--end);transform:rotate(180deg)}62.5001%{stroke-dashoffset:var(--end);transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:var(--start);transform:rotateX(180deg) rotate(251.5deg)}75.0001%{stroke-dashoffset:var(--start);transform:rotate(90deg)}87.5%{stroke-dashoffset:var(--end);transform:rotate(90deg)}87.5001%{stroke-dashoffset:var(--end);transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:var(--start);transform:rotateX(180deg) rotate(341.5deg)}}",
  map: '{"version":3,"file":"Spinner.svelte","sources":["Spinner.svelte"],"sourcesContent":["<!-- adapted source: https://github.com/angular/components/tree/master/src/material/progress-spinner -->\\n<script>export let inline = false;\\nexport let size = \\"medium\\";\\n<\/script>\\n\\n<svg\\n  class:inline\\n  class={size}\\n  preserveAspectRatio=\\"xMidYMid meet\\"\\n  focusable=\\"false\\"\\n  aria-hidden=\\"true\\"\\n  data-tid=\\"spinner\\"\\n  viewBox=\\"0 0 100 100\\"><circle cx=\\"50%\\" cy=\\"50%\\" r=\\"45\\" /></svg\\n>\\n\\n<style>.medium {\\n  --spinner-size: 30px;\\n}\\n\\n.small {\\n  --spinner-size: calc(var(--line-height-standard) * 1rem);\\n}\\n\\n.tiny {\\n  --spinner-size: calc(var(--line-height-standard) * 0.5rem);\\n}\\n\\nsvg {\\n  width: var(--spinner-size);\\n  height: var(--spinner-size);\\n  animation: spinner-linear-rotate 2000ms linear infinite;\\n  position: absolute;\\n  top: calc(50% - var(--spinner-size) / 2);\\n  left: calc(50% - var(--spinner-size) / 2);\\n  --radius: 45px;\\n  --circumference: calc(3.1415926536 * var(--radius) * 2);\\n  --start: calc((1 - 0.05) * var(--circumference));\\n  --end: calc((1 - 0.8) * var(--circumference));\\n}\\nsvg.inline {\\n  display: inline-block;\\n  position: relative;\\n}\\n\\ncircle {\\n  stroke-dasharray: var(--circumference);\\n  stroke-width: 10%;\\n  transform-origin: 50% 50% 0;\\n  transition-property: stroke;\\n  animation-name: spinner-stroke-rotate-100;\\n  animation-duration: 4000ms;\\n  animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);\\n  animation-iteration-count: infinite;\\n  fill: transparent;\\n  stroke: currentColor;\\n  transition: stroke-dashoffset 225ms linear;\\n}\\n\\n/* -global- */\\n@keyframes -global-spinner-linear-rotate {\\n  0% {\\n    transform: rotate(0deg);\\n  }\\n  100% {\\n    transform: rotate(360deg);\\n  }\\n}\\n/* -global- */\\n@keyframes -global-spinner-stroke-rotate-100 {\\n  0% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotate(0);\\n  }\\n  12.5% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotate(0);\\n  }\\n  12.5001% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotateX(180deg) rotate(72.5deg);\\n  }\\n  25% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotateX(180deg) rotate(72.5deg);\\n  }\\n  25.0001% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotate(270deg);\\n  }\\n  37.5% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotate(270deg);\\n  }\\n  37.5001% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotateX(180deg) rotate(161.5deg);\\n  }\\n  50% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotateX(180deg) rotate(161.5deg);\\n  }\\n  50.0001% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotate(180deg);\\n  }\\n  62.5% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotate(180deg);\\n  }\\n  62.5001% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotateX(180deg) rotate(251.5deg);\\n  }\\n  75% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotateX(180deg) rotate(251.5deg);\\n  }\\n  75.0001% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotate(90deg);\\n  }\\n  87.5% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotate(90deg);\\n  }\\n  87.5001% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotateX(180deg) rotate(341.5deg);\\n  }\\n  100% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotateX(180deg) rotate(341.5deg);\\n  }\\n}</style>\\n"],"names":[],"mappings":"AAeO,qBAAQ,CACb,cAAc,CAAE,IAClB,CAEA,oBAAO,CACL,cAAc,CAAE,wCAClB,CAEA,mBAAM,CACJ,cAAc,CAAE,0CAClB,CAEA,iBAAI,CACF,KAAK,CAAE,IAAI,cAAc,CAAC,CAC1B,MAAM,CAAE,IAAI,cAAc,CAAC,CAC3B,SAAS,CAAE,qBAAqB,CAAC,MAAM,CAAC,MAAM,CAAC,QAAQ,CACvD,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,IAAI,cAAc,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACxC,IAAI,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,IAAI,cAAc,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACzC,QAAQ,CAAE,IAAI,CACd,eAAe,CAAE,sCAAsC,CACvD,OAAO,CAAE,uCAAuC,CAChD,KAAK,CAAE,sCACT,CACA,GAAG,qBAAQ,CACT,OAAO,CAAE,YAAY,CACrB,QAAQ,CAAE,QACZ,CAEA,oBAAO,CACL,gBAAgB,CAAE,IAAI,eAAe,CAAC,CACtC,YAAY,CAAE,GAAG,CACjB,gBAAgB,CAAE,GAAG,CAAC,GAAG,CAAC,CAAC,CAC3B,mBAAmB,CAAE,MAAM,CAC3B,cAAc,CAAE,yBAAyB,CACzC,kBAAkB,CAAE,MAAM,CAC1B,yBAAyB,CAAE,aAAa,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CACzD,yBAAyB,CAAE,QAAQ,CACnC,IAAI,CAAE,WAAW,CACjB,MAAM,CAAE,YAAY,CACpB,UAAU,CAAE,iBAAiB,CAAC,KAAK,CAAC,MACtC,CAGA,WAAmB,qBAAsB,CACvC,EAAG,CACD,SAAS,CAAE,OAAO,IAAI,CACxB,CACA,IAAK,CACH,SAAS,CAAE,OAAO,MAAM,CAC1B,CACF,CAEA,WAAmB,yBAA0B,CAC3C,EAAG,CACD,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,OAAO,CAAC,CACrB,CACA,KAAM,CACJ,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,OAAO,CAAC,CACrB,CACA,QAAS,CACP,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,OAAO,CAC3C,CACA,GAAI,CACF,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,OAAO,CAC3C,CACA,QAAS,CACP,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,OAAO,MAAM,CAC1B,CACA,KAAM,CACJ,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,OAAO,MAAM,CAC1B,CACA,QAAS,CACP,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,QAAQ,CAC5C,CACA,GAAI,CACF,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,QAAQ,CAC5C,CACA,QAAS,CACP,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,OAAO,MAAM,CAC1B,CACA,KAAM,CACJ,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,OAAO,MAAM,CAC1B,CACA,QAAS,CACP,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,QAAQ,CAC5C,CACA,GAAI,CACF,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,QAAQ,CAC5C,CACA,QAAS,CACP,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,OAAO,KAAK,CACzB,CACA,KAAM,CACJ,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,OAAO,KAAK,CACzB,CACA,QAAS,CACP,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,QAAQ,CAC5C,CACA,IAAK,CACH,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,QAAQ,CAC5C,CACF"}'
};
const Spinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { inline = false } = $$props;
  let { size = "medium" } = $$props;
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0) $$bindings.inline(inline);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  $$result.css.add(css$8);
  return `  <svg class="${[escape(null_to_empty(size), true) + " svelte-85668t", inline ? "inline" : ""].join(" ").trim()}" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true" data-tid="spinner" viewBox="0 0 100 100"><circle cx="50%" cy="50%" r="45" class="svelte-85668t"></circle></svg>`;
});
const css$7 = {
  code: "div.svelte-14plyno{z-index:calc(var(--z-index) + 1000);position:fixed;top:0;right:0;bottom:0;left:0;background:var(--backdrop);color:var(--backdrop-contrast)}.content.svelte-14plyno{display:flex;flex-direction:column;justify-content:center;align-items:center}p.svelte-14plyno{padding-bottom:var(--padding);max-width:calc(var(--section-max-width) / 2)}",
  map: '{"version":3,"file":"BusyScreen.svelte","sources":["BusyScreen.svelte"],"sourcesContent":["<script>import { fade } from \\"svelte/transition\\";\\nimport { busy, busyMessage } from \\"../stores/busy.store\\";\\nimport Spinner from \\"./Spinner.svelte\\";\\nimport { nonNullish } from \\"@dfinity/utils\\";\\n<\/script>\\n\\n<!-- Display spinner and lock UI if busyStore is not empty -->\\n{#if $busy}\\n  <div data-tid=\\"busy\\" transition:fade|global>\\n    <div class=\\"content\\">\\n      {#if nonNullish($busyMessage)}\\n        <p>{$busyMessage}</p>\\n      {/if}\\n      <span>\\n        <Spinner inline />\\n      </span>\\n    </div>\\n  </div>\\n{/if}\\n\\n<style>div {\\n  z-index: calc(var(--z-index) + 1000);\\n  position: fixed;\\n  top: 0;\\n  right: 0;\\n  bottom: 0;\\n  left: 0;\\n  background: var(--backdrop);\\n  color: var(--backdrop-contrast);\\n}\\n\\n.content {\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: center;\\n  align-items: center;\\n}\\n\\np {\\n  padding-bottom: var(--padding);\\n  max-width: calc(var(--section-max-width) / 2);\\n}</style>\\n"],"names":[],"mappings":"AAoBO,kBAAI,CACT,OAAO,CAAE,KAAK,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CACpC,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,CAAC,CACT,IAAI,CAAE,CAAC,CACP,UAAU,CAAE,IAAI,UAAU,CAAC,CAC3B,KAAK,CAAE,IAAI,mBAAmB,CAChC,CAEA,uBAAS,CACP,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MACf,CAEA,gBAAE,CACA,cAAc,CAAE,IAAI,SAAS,CAAC,CAC9B,SAAS,CAAE,KAAK,IAAI,mBAAmB,CAAC,CAAC,CAAC,CAAC,CAAC,CAC9C"}'
};
const BusyScreen = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $busy, $$unsubscribe_busy;
  let $busyMessage, $$unsubscribe_busyMessage;
  $$unsubscribe_busy = subscribe(busy, (value) => $busy = value);
  $$unsubscribe_busyMessage = subscribe(busyMessage, (value) => $busyMessage = value);
  $$result.css.add(css$7);
  $$unsubscribe_busy();
  $$unsubscribe_busyMessage();
  return ` ${$busy ? `<div data-tid="busy" class="svelte-14plyno"><div class="content svelte-14plyno">${nonNullish($busyMessage) ? `<p class="svelte-14plyno">${escape($busyMessage)}</p>` : ``} <span>${validate_component(Spinner, "Spinner").$$render($$result, { inline: true }, {}, {})}</span></div></div>` : ``}`;
});
var Menu;
(function(Menu2) {
  Menu2["COLLAPSED"] = "collapsed";
  Menu2["EXPANDED"] = "expanded";
})(Menu || (Menu = {}));
const isNode = () => typeof process !== "undefined" && process.versions != null && process.versions.node != null;
const enumFromStringExists = ({ obj, value }) => Object.values(obj).includes(value);
const MENU_ATTRIBUTE = "menu";
const LOCALSTORAGE_MENU_KEY = "nnsMenu";
const initMenu = () => {
  if (isNode()) {
    return void 0;
  }
  const menu = document.documentElement.getAttribute(MENU_ATTRIBUTE);
  const initialMenu2 = enumFromStringExists({
    obj: Menu,
    value: menu
  }) ? menu : Menu.EXPANDED;
  applyMenu({ menu: initialMenu2, preserve: false });
  return initialMenu2;
};
const applyMenu = ({ menu, preserve = true }) => {
  const { documentElement } = document;
  documentElement.setAttribute(MENU_ATTRIBUTE, menu);
  if (preserve) {
    localStorage.setItem(LOCALSTORAGE_MENU_KEY, JSON.stringify(menu));
  }
};
const initialMenu = initMenu();
const initMenuStore = () => {
  const { subscribe: subscribe2, set, update } = writable(initialMenu);
  return {
    subscribe: subscribe2,
    toggle: () => {
      update((state) => {
        const menu = state === Menu.EXPANDED ? Menu.COLLAPSED : Menu.EXPANDED;
        applyMenu({ menu, preserve: true });
        return menu;
      });
    },
    resetForTesting: () => {
      set(Menu.EXPANDED);
    }
  };
};
const menuStore = initMenuStore();
derived(menuStore, ($menuStore) => $menuStore === Menu.COLLAPSED);
var Theme;
(function(Theme2) {
  Theme2["DARK"] = "dark";
  Theme2["LIGHT"] = "light";
})(Theme || (Theme = {}));
const THEME_ATTRIBUTE = "theme";
const LOCALSTORAGE_THEME_KEY = "nnsTheme";
const initTheme = () => {
  if (isNode()) {
    return void 0;
  }
  const theme2 = document.documentElement.getAttribute(THEME_ATTRIBUTE);
  const initialTheme = enumFromStringExists({
    obj: Theme,
    value: theme2
  }) ? theme2 : Theme.DARK;
  applyTheme({ theme: initialTheme, preserve: false });
  return initialTheme;
};
const applyTheme = ({ theme: theme2, preserve = true }) => {
  const { documentElement, head } = document;
  documentElement.setAttribute(THEME_ATTRIBUTE, theme2);
  const color = getComputedStyle(documentElement).getPropertyValue("--theme-color");
  head?.children?.namedItem("theme-color")?.setAttribute("content", color.trim());
  if (preserve) {
    localStorage.setItem(LOCALSTORAGE_THEME_KEY, JSON.stringify(theme2));
  }
};
initTheme();
const css$6 = {
  code: 'footer.svelte-1l1jgex.svelte-1l1jgex{background-color:#272727;position:relative;overflow:hidden}.ellipse-1.svelte-1l1jgex.svelte-1l1jgex{width:256px;height:256px;background:rgba(79, 168, 246, 0.2);filter:blur(240px);position:absolute;top:10%;left:25%}.ellipse-2.svelte-1l1jgex.svelte-1l1jgex{width:240px;height:240px;background:rgba(244, 223, 253, 0.2);filter:blur(320px);position:absolute;bottom:20%;right:30%}footer.svelte-1l1jgex a.svelte-1l1jgex{font-family:"Inter", sans-serif;text-transform:uppercase;letter-spacing:1px}.relative.svelte-1l1jgex.svelte-1l1jgex{position:relative;z-index:10}hr.svelte-1l1jgex.svelte-1l1jgex{border-color:#4E4E4E}',
  map: `{"version":3,"file":"Footer.svelte","sources":["Footer.svelte"],"sourcesContent":["<footer class=\\"relative py-8 bg-gray-900\\">\\n  <!-- Add Ellipses for Blur Effect -->\\n  <div class=\\"absolute ellipse-1\\"></div>\\n  <div class=\\"absolute ellipse-2\\"></div>\\n\\n  <div class=\\"relative z-10\\">\\n    \\n    <!-- First Row (Logo and Links) -->\\n    <div class=\\"flex items-center justify-between w-full px-12\\">\\n      <div class=\\"flex items-center mb-0\\">\\n        <a href=\\"/\\" class=\\"flex items-center\\">\\n          <img src=\\"logo.png\\" class=\\"h-6\\" alt=\\"Waterway Labs Logo\\" />\\n          <span class=\\"ml-2 tracking-wide font-mona\\">\\n            <span class=\\"text-white\\">WATERWAY</span>\\n            <span class=\\"text-white font-exlight\\">LABS</span>\\n          </span>\\n        </a>\\n      </div>\\n      <div class=\\"text-sm font-light text-right font-inter font-body\\">\\n        <a href=\\"/\\" class=\\"mx-4 hover:text-blue-400\\">Products</a> | \\n        <a href=\\"/about\\" class=\\"mx-4 hover:text-blue-400\\">About Us</a> | \\n        <a href=\\"/team\\" class=\\"mx-4 hover:text-blue-400\\">The Team</a>\\n      </div>\\n    </div>\\n    <!-- Divider -->\\n    <hr class=\\"my-6 border-t-2 border-[#4E4E4E] mx-auto\\" style=\\"margin-bottom: 20px; width: 1450px;\\" />\\n    \\n    <!-- Second Row (Let's Connect and Social Links) -->\\n    <div class=\\"flex items-center justify-between w-full px-12\\">\\n      <div class=\\"flex flex-col text-sm\\">\\n        <h4 class=\\"font-mona font-h4\\">LET'S CONNECT</h4>\\n      </div>\\n      <div class=\\"text-sm font-light text-right font-inter font-body\\">\\n        <a href=\\"https://github.com\\" target=\\"_blank\\" class=\\"mx-2 hover:text-white\\">GitHub</a>\\n        <a href=\\"https://twitter.com\\" target=\\"_blank\\" class=\\"mx-2 hover:text-white\\">Twitter</a>\\n      </div>\\n    </div>\\n    \\n  </div>\\n</footer>\\n\\n<style>\\n  footer {\\n    background-color: #272727;\\n    position: relative;\\n    overflow: hidden;\\n  }\\n\\n  /* Ellipse 1 */\\n  .ellipse-1 {\\n    width: 256px;\\n    height: 256px;\\n    background: rgba(79, 168, 246, 0.2); /* Adjust the color based on Figma */\\n    filter: blur(240px);\\n    position: absolute;\\n    top: 10%;\\n    left: 25%;\\n  }\\n\\n  /* Ellipse 2 */\\n  .ellipse-2 {\\n    width: 240px;\\n    height: 240px;\\n    background: rgba(244, 223, 253, 0.2); /* Adjust the color based on Figma */\\n    filter: blur(320px);\\n    position: absolute;\\n    bottom: 20%;\\n    right: 30%;\\n  }\\n\\n  footer a {\\n    font-family: \\"Inter\\", sans-serif;\\n    text-transform: uppercase;\\n    letter-spacing: 1px;\\n  }\\n\\n  .relative {\\n    position: relative;\\n    z-index: 10;\\n  }\\n\\n  /* Optional: Ensure the divider is visually balanced */\\n  hr {\\n    border-color: #4E4E4E;\\n  }</style>"],"names":[],"mappings":"AA0CE,oCAAO,CACL,gBAAgB,CAAE,OAAO,CACzB,QAAQ,CAAE,QAAQ,CAClB,QAAQ,CAAE,MACZ,CAGA,wCAAW,CACT,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,UAAU,CAAE,KAAK,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACnC,MAAM,CAAE,KAAK,KAAK,CAAC,CACnB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GACR,CAGA,wCAAW,CACT,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,UAAU,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACpC,MAAM,CAAE,KAAK,KAAK,CAAC,CACnB,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,GACT,CAEA,qBAAM,CAAC,gBAAE,CACP,WAAW,CAAE,OAAO,CAAC,CAAC,UAAU,CAChC,cAAc,CAAE,SAAS,CACzB,cAAc,CAAE,GAClB,CAEA,uCAAU,CACR,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,EACX,CAGA,gCAAG,CACD,YAAY,CAAE,OAChB"}`
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$6);
  return `<footer class="relative py-8 bg-gray-900 svelte-1l1jgex" data-svelte-h="svelte-i3ldfd"> <div class="absolute ellipse-1 svelte-1l1jgex"></div> <div class="absolute ellipse-2 svelte-1l1jgex"></div> <div class="relative z-10 svelte-1l1jgex"> <div class="flex items-center justify-between w-full px-12"><div class="flex items-center mb-0"><a href="/" class="flex items-center svelte-1l1jgex"><img src="logo.png" class="h-6" alt="Waterway Labs Logo"> <span class="ml-2 tracking-wide font-mona"><span class="text-white">WATERWAY</span> <span class="text-white font-exlight">LABS</span></span></a></div> <div class="text-sm font-light text-right font-inter font-body"><a href="/" class="mx-4 hover:text-blue-400 svelte-1l1jgex">Products</a> | 
        <a href="/about" class="mx-4 hover:text-blue-400 svelte-1l1jgex">About Us</a> | 
        <a href="/team" class="mx-4 hover:text-blue-400 svelte-1l1jgex">The Team</a></div></div>  <hr class="my-6 border-t-2 border-[#4E4E4E] mx-auto svelte-1l1jgex" style="margin-bottom: 20px; width: 1450px;">  <div class="flex items-center justify-between w-full px-12"><div class="flex flex-col text-sm"><h4 class="font-mona font-h4">LET&#39;S CONNECT</h4></div> <div class="text-sm font-light text-right font-inter font-body"><a href="https://github.com" target="_blank" class="mx-2 hover:text-white svelte-1l1jgex">GitHub</a> <a href="https://twitter.com" target="_blank" class="mx-2 hover:text-white svelte-1l1jgex">Twitter</a></div></div></div> </footer>`;
});
const css$5 = {
  code: "body{display:flex;flex-direction:column;min-height:100vh}.override-bg.svelte-1d1mt42{background-color:#272727}",
  map: `{"version":3,"file":"Layout.svelte","sources":["Layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount, afterUpdate } from \\"svelte\\";\\nimport { fade } from \\"svelte/transition\\";\\nimport { browser } from \\"$app/environment\\";\\nimport Header from \\"$lib/shared/Header.svelte\\";\\nimport \\"../app.css\\";\\nimport { page } from \\"$app/stores\\";\\nimport { BusyScreen, Spinner, Toasts } from \\"@dfinity/gix-components\\";\\nimport Footer from \\"$lib/shared/Footer.svelte\\";\\nexport let overrideBackground = false;\\nconst init = async () => await Promise.all([syncAuthStore()]);\\nconst syncAuthStore = async () => {\\n    if (!browser) {\\n        return;\\n    }\\n};\\n$: isHomePage = $page.url.pathname === '/';\\n$: (() => {\\n    if (!browser) {\\n        return;\\n    }\\n    const spinner = document.querySelector(\\"body > #app-spinner\\");\\n    spinner?.remove();\\n})();\\nafterUpdate(() => {\\n    if (browser) {\\n        document.body.style.height = '100%';\\n        setTimeout(() => {\\n            document.body.style.height = 'auto';\\n        }, 0);\\n    }\\n});\\n<\/script>\\n\\n<svelte:window on:storage={syncAuthStore} />\\n{#await init()}\\n  <div in:fade>\\n    <Spinner />\\n  </div>\\n{:then _}\\n  <div class=\\"flex flex-col min-h-screen\\" class:override-bg={overrideBackground}>\\n    <Header />\\n    <main class=\\"flex-1\\">\\n      <slot />\\n    </main>\\n    {#if !isHomePage}\\n      <Footer/>\\n    {/if}\\n  </div>\\n{/await}\\n\\n<BusyScreen />\\n\\n<style>\\n  :global(body) {\\n    display: flex;\\n    flex-direction: column;\\n    min-height: 100vh;\\n  }\\n\\n  .override-bg {\\n    background-color: #272727;\\n  }</style>\\n"],"names":[],"mappings":"AAqDU,IAAM,CACZ,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,UAAU,CAAE,KACd,CAEA,2BAAa,CACX,gBAAgB,CAAE,OACpB"}`
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isHomePage;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { overrideBackground = false } = $$props;
  const init2 = async () => await Promise.all([syncAuthStore()]);
  const syncAuthStore = async () => {
    {
      return;
    }
  };
  if ($$props.overrideBackground === void 0 && $$bindings.overrideBackground && overrideBackground !== void 0) $$bindings.overrideBackground(overrideBackground);
  $$result.css.add(css$5);
  isHomePage = $page.url.pathname === "/";
  $$unsubscribe_page();
  return ` ${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ` <div>${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}</div> `;
    }
    return function(_) {
      return ` <div class="${[
        "flex flex-col min-h-screen svelte-1d1mt42",
        overrideBackground ? "override-bg" : ""
      ].join(" ").trim()}">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <main class="flex-1">${slots.default ? slots.default({}) : ``}</main> ${!isHomePage ? `${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}` : ``}</div> `;
    }();
  }(init2())} ${validate_component(BusyScreen, "BusyScreen").$$render($$result, {}, {}, {})}`;
});
const css$4 = {
  code: ".icon-bar.svelte-1ynletn{display:flex;justify-content:center;padding:16px;gap:32px;background:linear-gradient(4.8%, #FFFFFF, 1.2%, #FFFFFF);box-shadow:0 10px 20px rgba(0, 0, 0, 0.1);border-radius:32px;width:auto;position:fixed;bottom:0;left:50%;transform:translateX(-50%);margin-bottom:16px;z-index:20}.icon-box.svelte-1ynletn{display:flex;justify-content:center;align-items:center;width:100px;height:100px;border-radius:16px;box-shadow:0 2px 10px rgba(0, 0, 0, 0.1);cursor:pointer;margin:auto;transition:transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out;transform:scale(1);border:3px solid transparent}.icon-box.safari.svelte-1ynletn{display:flex;justify-content:center;width:100px;height:100px;border-radius:16px;box-shadow:0 2px 10px rgba(0, 0, 0, 0.1);cursor:pointer;margin:auto;transition:transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out;transform:scale(1);border:3px solid transparent}.mobile-icon-box.svelte-1ynletn{display:flex;justify-content:center;align-items:center;width:60px;height:60px;border-radius:12px;box-shadow:0 2px 10px rgba(0, 0, 0, 0.1);cursor:pointer;transition:transform 0.3s ease-in-out;border:2px solid transparent}.mobile-icon-box.selected.svelte-1ynletn{transform:scale(1.1);border-color:var(--border-color);animation:svelte-1ynletn-mobilePulse 2s infinite}.hide-scrollbar.svelte-1ynletn{-ms-overflow-style:none;scrollbar-width:none}.hide-scrollbar.svelte-1ynletn::-webkit-scrollbar{display:none}.icon-box.svelte-1ynletn:hover{transform:scale(1.1);box-shadow:0 5px 15px rgba(0, 0, 0, 0.2)}.icon-box.selected.svelte-1ynletn{transform:scale(1.15);box-shadow:0 0 20px rgba(0, 0, 0, 0.2);border-color:var(--border-color);animation:svelte-1ynletn-pulse 2s infinite}@keyframes svelte-1ynletn-pulse{0%{box-shadow:0 0 0 0 var(--border-color)}70%{box-shadow:0 0 0 10px rgba(0, 0, 0, 0)}100%{box-shadow:0 0 0 0 rgba(0, 0, 0, 0)}}@keyframes svelte-1ynletn-mobilePulse{0%{box-shadow:0 0 0 0 var(--border-color)}70%{box-shadow:0 0 0 5px rgba(0, 0, 0, 0)}100%{box-shadow:0 0 0 0 rgba(0, 0, 0, 0)}}",
  map: `{"version":3,"file":"icons-row.svelte","sources":["icons-row.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let projects = [];\\nexport let selectProject;\\nimport { onMount } from 'svelte';\\nlet isSafari = false;\\nonMount(() => {\\n    isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);\\n    console.log(isSafari);\\n});\\n<\/script>\\n\\n<!-- Desktop Bar for icons -->\\n<div class=\\"fixed bottom-0 left-0 right-0 hidden lg:block\\"> <!-- Updated classes -->\\n  <div class=\\"icon-bar\\">\\n    {#each projects as project}\\n      <div\\n        class=\\"icon-box {project.selected ? 'selected': ''}\\"\\n        class:safari={isSafari}\\n        style=\\"background-color: {project.backgroundColor}; --border-color: {project.backgroundColor};\\"\\n        role=\\"button\\"\\n        aria-label={project.name}\\n        tabindex=\\"0\\"\\n        on:click={() => selectProject(project)}\\n        on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && selectProject(project)}\\n      >\\n        <svelte:component this={project.component} className=\\"icon\\" />\\n      </div>\\n    {/each}\\n  </div>\\n</div>\\n\\n<!-- Mobile Bar for icons -->\\n<div class=\\"fixed bottom-0 left-0 right-0 bg-[#272727] lg:hidden z-50\\">\\n  <div class=\\"py-6\\">\\n    <div class=\\"flex px-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar\\">\\n      <div class=\\"flex space-x-8\\">\\n        {#each projects as project}\\n          <div\\n            class=\\"mobile-icon-box flex-shrink-0 {project.selected ? 'selected': ''}\\"\\n            style=\\"background-color: {project.backgroundColor}; --border-color: {project.backgroundColor};\\"\\n            role=\\"button\\"\\n            aria-label={project.name}\\n            on:click={() => selectProject(project)}\\n          >\\n            <svelte:component this={project.component} className=\\"icon\\" />\\n          </div>\\n        {/each}\\n      </div>\\n    </div>\\n  </div>\\n</div>\\n\\n<style>\\n  /* Existing desktop styles */\\n  .icon-bar {\\n    display: flex;\\n    justify-content: center;\\n    padding: 16px;\\n    gap: 32px;\\n    background: linear-gradient(4.8%, #FFFFFF, 1.2%, #FFFFFF);\\n    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);\\n    border-radius: 32px;\\n    width: auto; \\n    position: fixed;\\n    bottom: 0;\\n    left: 50%;\\n    transform: translateX(-50%); \\n    margin-bottom: 16px;\\n    z-index: 20;\\n  }\\n\\n  .icon-box {\\n    display: flex;\\n    justify-content: center;\\n    align-items:center;\\n    width: 100px;\\n    height: 100px;\\n    border-radius: 16px;\\n    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\\n    cursor: pointer;\\n    margin: auto;\\n    transition: transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out;\\n    transform: scale(1);\\n    border: 3px solid transparent;\\n  }\\n\\n  .icon-box.safari {\\n    display: flex;\\n    justify-content: center;\\n    width: 100px;\\n    height: 100px;\\n    border-radius: 16px;\\n    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\\n    cursor: pointer;\\n    margin: auto;\\n    transition: transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out;\\n    transform: scale(1);\\n    border: 3px solid transparent; \\n  }\\n\\n  /* Mobile styles */\\n  .mobile-icon-box {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    width: 60px;  /* Increased from 50px */\\n    height: 60px; /* Increased from 50px */\\n    border-radius: 12px;\\n    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\\n    cursor: pointer;\\n    transition: transform 0.3s ease-in-out;\\n    border: 2px solid transparent;\\n  }\\n\\n  .mobile-icon-box.selected {\\n    transform: scale(1.1);\\n    border-color: var(--border-color);\\n    animation: mobilePulse 2s infinite;\\n  }\\n\\n  /* Hide scrollbar but keep functionality */\\n  .hide-scrollbar {\\n    -ms-overflow-style: none;\\n    scrollbar-width: none;\\n  }\\n  \\n  .hide-scrollbar::-webkit-scrollbar {\\n    display: none;\\n  }\\n\\n  /* Shared hover and animation styles */\\n  .icon-box:hover {\\n    transform: scale(1.1); \\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); \\n  }\\n\\n  .icon-box.selected {\\n    transform: scale(1.15); \\n    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); \\n    border-color: var(--border-color);\\n    animation: pulse 2s infinite;\\n  }\\n\\n  @keyframes pulse {\\n    0% {\\n      box-shadow: 0 0 0 0 var(--border-color);\\n    }\\n    70% {\\n      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);\\n    }\\n    100% {\\n      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);\\n    }\\n  }\\n\\n  @keyframes mobilePulse {\\n    0% {\\n      box-shadow: 0 0 0 0 var(--border-color);\\n    }\\n    70% {\\n      box-shadow: 0 0 0 5px rgba(0, 0, 0, 0);\\n    }\\n    100% {\\n      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);\\n    }\\n  }</style>"],"names":[],"mappings":"AAqDE,wBAAU,CACR,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,IAAI,CACT,UAAU,CAAE,gBAAgB,IAAI,CAAC,CAAC,OAAO,CAAC,CAAC,IAAI,CAAC,CAAC,OAAO,CAAC,CACzD,UAAU,CAAE,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC1C,aAAa,CAAE,IAAI,CACnB,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,KAAK,CACf,MAAM,CAAE,CAAC,CACT,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,EACX,CAEA,wBAAU,CACR,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,YAAY,MAAM,CAClB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACzC,MAAM,CAAE,OAAO,CACf,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,WAAW,CAAC,CAAC,UAAU,CAAC,IAAI,CAAC,WAAW,CACnE,SAAS,CAAE,MAAM,CAAC,CAAC,CACnB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,WACpB,CAEA,SAAS,sBAAQ,CACf,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACzC,MAAM,CAAE,OAAO,CACf,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,WAAW,CAAC,CAAC,UAAU,CAAC,IAAI,CAAC,WAAW,CACnE,SAAS,CAAE,MAAM,CAAC,CAAC,CACnB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,WACpB,CAGA,+BAAiB,CACf,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACzC,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,WAAW,CACtC,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,WACpB,CAEA,gBAAgB,wBAAU,CACxB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,YAAY,CAAE,IAAI,cAAc,CAAC,CACjC,SAAS,CAAE,0BAAW,CAAC,EAAE,CAAC,QAC5B,CAGA,8BAAgB,CACd,kBAAkB,CAAE,IAAI,CACxB,eAAe,CAAE,IACnB,CAEA,8BAAe,mBAAoB,CACjC,OAAO,CAAE,IACX,CAGA,wBAAS,MAAO,CACd,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAC1C,CAEA,SAAS,wBAAU,CACjB,SAAS,CAAE,MAAM,IAAI,CAAC,CACtB,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACvC,YAAY,CAAE,IAAI,cAAc,CAAC,CACjC,SAAS,CAAE,oBAAK,CAAC,EAAE,CAAC,QACtB,CAEA,WAAW,oBAAM,CACf,EAAG,CACD,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,cAAc,CACxC,CACA,GAAI,CACF,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACxC,CACA,IAAK,CACH,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACrC,CACF,CAEA,WAAW,0BAAY,CACrB,EAAG,CACD,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,cAAc,CACxC,CACA,GAAI,CACF,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACvC,CACA,IAAK,CACH,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACrC,CACF"}`
};
const Icons_row = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { projects = [] } = $$props;
  let { selectProject } = $$props;
  if ($$props.projects === void 0 && $$bindings.projects && projects !== void 0) $$bindings.projects(projects);
  if ($$props.selectProject === void 0 && $$bindings.selectProject && selectProject !== void 0) $$bindings.selectProject(selectProject);
  $$result.css.add(css$4);
  return ` <div class="fixed bottom-0 left-0 right-0 hidden lg:block"> <div class="icon-bar svelte-1ynletn">${each(projects, (project) => {
    return `<div class="${[
      "icon-box " + escape(project.selected ? "selected" : "", true) + " svelte-1ynletn",
      ""
    ].join(" ").trim()}" style="${"background-color: " + escape(project.backgroundColor, true) + "; --border-color: " + escape(project.backgroundColor, true) + ";"}" role="button"${add_attribute("aria-label", project.name, 0)} tabindex="0">${validate_component(project.component || missing_component, "svelte:component").$$render($$result, { className: "icon" }, {}, {})} </div>`;
  })}</div></div>  <div class="fixed bottom-0 left-0 right-0 bg-[#272727] lg:hidden z-50"><div class="py-6"><div class="flex px-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar svelte-1ynletn"><div class="flex space-x-8">${each(projects, (project) => {
    return `<div class="${"mobile-icon-box flex-shrink-0 " + escape(project.selected ? "selected" : "", true) + " svelte-1ynletn"}" style="${"background-color: " + escape(project.backgroundColor, true) + "; --border-color: " + escape(project.backgroundColor, true) + ";"}" role="button"${add_attribute("aria-label", project.name, 0)}>${validate_component(project.component || missing_component, "svelte:component").$$render($$result, { className: "icon" }, {}, {})} </div>`;
  })}</div></div></div> </div>`;
});
const css$3 = {
  code: 'html,body{height:100%;margin:0;padding:0;overflow-x:hidden}body{font-family:"Poppins", "Mona Sans Expanded", sans-serif !important;color:white !important}.mobile-preview-image.svelte-1vbtu8m{width:361px;height:233px;border-radius:8px 0 0 0;border-top:5px solid #272727;-o-object-fit:cover;object-fit:cover;box-shadow:4px 3px 12px 0px rgba(0, 0, 0, 0.21),\n      18px 12px 21px 0px rgba(0, 0, 0, 0.18),\n      40px 26px 29px 0px rgba(0, 0, 0, 0.11),\n      71px 46px 34px 0px rgba(0, 0, 0, 0.03),\n      111px 72px 37px 0px rgba(0, 0, 0, 0)}@media(max-width: 1023px){body{background:#272727}.project-title{font-size:48px;line-height:1.2;text-align:center}.mobile-preview-image.svelte-1vbtu8m{margin:0 auto;display:block}}@media(min-width: 1024px){body{background:linear-gradient(\n        to right,\n        #272727 50%,\n        var(--selectedProject-bg-color, #2ce3a6) 50%\n      )}.project-title{font-family:"Mona Sans Expanded", sans-serif;font-size:90px;font-weight:600;line-height:81px;text-align:left}}',
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport ProjectSection from \\"$lib/components/project-section.svelte\\";\\nimport OpenFPLIcon from \\"$lib/icons/svgs/openfpl.svelte\\";\\nimport FootballGodIcon from \\"$lib/icons/svgs/footballgod.svelte\\";\\nimport GolfPadIcon from \\"$lib/icons/svgs/golfpad.svelte\\";\\nimport TransferKingsIcon from \\"$lib/icons/svgs/transferkings.svelte\\";\\nimport OpenBookIcon from \\"$lib/icons/svgs/openbook.svelte\\";\\nimport OpenBeatsIcon from \\"$lib/icons/svgs/openbeats.svelte\\";\\nimport OpenChefIcon from \\"$lib/icons/svgs/openchef.svelte\\";\\nimport ICPFAIcon from \\"$lib/icons/svgs/icpfa.svelte\\";\\nimport OpenCareIcon from \\"$lib/icons/svgs/opencare.svelte\\";\\nimport Layout from \\"./Layout.svelte\\";\\nimport IconsRow from \\"$lib/components/icons-row.svelte\\";\\nlet projects = [\\n    {\\n        component: OpenFPLIcon,\\n        name: \\"OpenFPL\\",\\n        title: \\"OPENFPL\\",\\n        description: \\"Decentralized fantasy football.\\",\\n        summary: \\"OpenFPL is a decentralized fantasy football game for the Premier League hosted through the Internet Computer's Network Nervous System. OpenFPL token holders reach community consensus for player valuations, data validation, and more to ensure the entire platform operates entirely on the blockchain with zero dependencies.\\",\\n        buttonText: \\"Visit Site\\",\\n        buttonLink: \\"https://openfpl.xyz\\",\\n        backgroundColor: \\"#2CE3A6\\",\\n        backgroundImage: \\"openFPL-background.png\\",\\n        previewImage: \\"openFPL-preview.png\\",\\n        mobilePreviewImage: \\"openFPL-mobile-preview.png\\",\\n        translateX: \\"-214px\\",\\n        status: \\"Decentralized\\",\\n        twitter: \\"https://x.com/OpenFPL_DAO\\",\\n        github: \\"https://github.com/jamesbeadle/OpenFPL\\"\\n    },\\n    {\\n        component: FootballGodIcon,\\n        name: \\"Football God\\",\\n        title: \\"FOOTBALL GOD\\",\\n        description: \\"Live play to earn football games.\\",\\n        summary: \\"FootballGod will be a fixed odds betting platform funded by the OpenFPL DAO. Data managed to run OpenFPL and Transfer Kings will be used to offer odds on worldwide football matches. Algorithms for FootballGod will be managed by the OpenFPL DAO, allowing FootballGod to be used as a useful tool for controlling the FPL token supply. FootballGod has been designed to take advantage of the highly profitable nature of betting platforms to benefit OpenFPL token holders. FootballGod will send all profits to the OpenFPL DAO FPL Treasury, with the DAO able to burn these profit at it's discretion.\\",\\n        buttonText: \\"Visit Site\\",\\n        buttonLink: \\"https://footballgod.xyz\\",\\n        backgroundColor: \\"#7F56F1\\",\\n        backgroundImage: \\"footballGod-background.png\\",\\n        previewImage: \\"footballGod-preview.png\\",\\n        mobilePreviewImage: \\"footballGod-mobile-preview.png\\",\\n        translateX: \\"-160px\\",\\n        status: \\"Development\\",\\n        isFootballGod: true,\\n    },\\n    {\\n        component: GolfPadIcon,\\n        name: \\"GolfPad\\",\\n        title: \\"GOLFPAD\\",\\n        description: \\"Golf meets Web3.\\",\\n        summary: \\"GolfPad gives golfers of all levels a new dimension to their game. GolfPad focuses on individual achievements throughout your round rather than a single round's total score. This allows you to compete against your friends within a new framework, training your golf game for new scenarios.\\",\\n        buttonText: \\"Visit Site\\",\\n        buttonLink: \\"https://golfpad.xyz\\",\\n        backgroundColor: \\"#F4C802\\",\\n        backgroundImage: \\"golfpad-background.png\\",\\n        previewImage: \\"golfpad-preview.png\\",\\n        mobilePreviewImage: \\"golfpad-mobile-preview.png\\",\\n        translateX: \\"-167px\\",\\n        status: \\"Development\\",\\n        twitter: \\"https://x.com/GolfPadDAO\\",\\n        github: \\"https://github.com/jamesbeadle/GolfPad\\"\\n    },\\n    {\\n        component: TransferKingsIcon,\\n        name: \\"Transfer Kings\\",\\n        title: \\"TRANSFER KINGS\\",\\n        description: \\"Become a football agent today.\\",\\n        summary: \\"Transfer Kings is our upcoming purchase to play football agency game. Groups of friends will be able to setup their own agency, competing against each other for custom reward pools. Transfer Kings is designed to span multiple seasons and international tournaments, allowing your contracted players to achieve their expected career goals. Designed for the football expert that can spot prospects around the world, Transfer Kings is the worldwide football game Web3 has been waiting for.\\",\\n        buttonText: \\"Visit Site\\",\\n        buttonLink: \\"https://transferkings.xyz\\",\\n        backgroundColor: \\"#2D64E3\\",\\n        backgroundImage: \\"transferKings-background.png\\",\\n        previewImage: \\"transferKings-preview.png\\",\\n        mobilePreviewImage: \\"transferKings-mobile-preview.png\\",\\n        translateX: \\"-145px\\",\\n        status: \\"Development\\",\\n    },\\n    {\\n        component: OpenBookIcon,\\n        name: \\"OpenBook\\",\\n        title: \\"OPENBOOK\\",\\n        description: \\"Decentralized business management.\\",\\n        summary: \\"OpenBook is evolving into a comprehensive, 100% on-chain business management platform. OpenBook's initial offering of sales, accountancy, recruitment, timesheet and task management are just the first step on delivering the perfect single SaaS for businesses at the lowest possible price.\\",\\n        buttonText: \\"Visit Site\\",\\n        buttonLink: \\"https://openbook.services\\",\\n        backgroundColor: \\"#66E094\\",\\n        backgroundImage: \\"openBook-background.png\\",\\n        previewImage: \\"openBook-preview.png\\",\\n        mobilePreviewImage: \\"openBook-mobile-preview.png\\",\\n        translateX: \\"-220px\\",\\n        status: \\"Development\\",\\n    },\\n    {\\n        component: OpenBeatsIcon,\\n        name: \\"OpenBeats\\",\\n        title: \\"OPENBEATS\\",\\n        description: \\"Decentralized Audio Network.\\",\\n        summary: \\"OpenBeats is a decentralized audio network enabling producers to create tracks using audio samples from the OpenBeats library. Creators of samples share the monthly subscription revenue based on how often their sample is used in the projects being composed.\\",\\n        buttonText: \\"Visit Site\\",\\n        buttonLink: \\"https://openbeats.xyz\\",\\n        backgroundColor: \\"#FF8D7D\\",\\n        backgroundImage: \\"openBeats-background.png\\",\\n        previewImage: \\"openBeats-preview.png\\",\\n        mobilePreviewImage: \\"openBeats-mobile-preview.png\\",\\n        translateX: \\"-160px\\",\\n        status: \\"Design\\",\\n    },\\n    {\\n        component: OpenChefIcon,\\n        name: \\"OpenChef\\",\\n        title: \\"OPENCHEF\\",\\n        description: \\"Build your own cooking community.\\",\\n        summary: \\"OpenChef is designed to enable chefs to earn as they help people within their local community. Chefs will create projects that receive funding through sponsorship, charitable donations and a share of premium content subscriptions. This funding will be used to feed the community, giving a chef the opportunity to show off their passion for cooking through charitable content. The DAO will vote on rewards for chefs that help the most people, ensuring as much good as possible can be done.\\",\\n        buttonText: \\"Visit Site\\",\\n        buttonLink: \\"https://openchef.xyz\\",\\n        backgroundColor: \\"#731728\\",\\n        backgroundImage: \\"openChef-background.png\\",\\n        previewImage: \\"openChef-preview.png\\",\\n        mobilePreviewImage: \\"openChef-mobile-preview.png\\",\\n        translateX: \\"-60px\\",\\n        status: \\"Design\\",\\n    },\\n    {\\n        component: ICPFAIcon,\\n        name: \\"ICPFA\\",\\n        title: \\"ICPFA\\",\\n        description: \\"Supporting community football.\\",\\n        summary: \\"The ICPFA has been setup to support community grassroots football causes, funded by revenue from our football related applications.\\",\\n        buttonText: \\"Visit Site\\",\\n        buttonLink: \\"https://icpfa.org\\",\\n        backgroundColor: \\"#F7F7F7\\",\\n        backgroundImage: \\"icpfa-background.png\\",\\n        previewImage: \\"icpfa-preview.png\\",\\n        mobilePreviewImage: \\"icpfa-mobile-preview.png\\",\\n        translateX: \\"-125px\\",\\n        status: \\"Development\\",\\n    },\\n    {\\n        component: OpenCareIcon,\\n        name: \\"OpenCare\\",\\n        title: \\"OPENCARE\\",\\n        description: \\"The Future Of Social Care\\",\\n        summary: \\"OpenCare has been designed with care professionals and families who have elderly relatives in care-homes. Caring for the elderly will be a huge challenge for society going forwards and OpenCare will provide a caring, efficient and secure solution to help all stakeholders involved.\\",\\n        buttonText: \\"Visit Site\\",\\n        buttonLink: \\"https://opencare.services\\",\\n        backgroundColor: \\"#FF69B4\\",\\n        backgroundImage: \\"openCare-background.png\\",\\n        previewImage: \\"openCare-preview.png\\",\\n        mobilePreviewImage: \\"openCare-mobile-preview.png\\",\\n        translateX: \\"-88px\\",\\n        status: \\"Development\\",\\n    },\\n];\\nlet selectedProject = projects.find(p => p.name === \\"OpenFPL\\") || projects[0];\\nfunction selectProject(project) {\\n    selectedProject = project;\\n    // Update the selected state of projects\\n    projects = projects.map(p => ({\\n        ...p,\\n        selected: p.name === project.name\\n    }));\\n    updateGlobalColor(project.backgroundColor);\\n}\\nfunction updateGlobalColor(color) {\\n    document.body.style.setProperty('--selectedProject-bg-color', color);\\n    // Update the global CSS\\n    document.documentElement.style.setProperty('--selectedProject-bg-color', color);\\n}\\nfunction setDefaultProject() {\\n    const defaultProject = projects.find(p => p.name === \\"OpenFPL\\") || projects[0];\\n    selectProject(defaultProject);\\n}\\nonMount(() => {\\n    // Add click event listeners to logo and \\"Waterway Labs\\" text\\n    const logo = document.querySelector('.logo');\\n    const waterwayLabs = document.querySelector('.waterway-labs');\\n    if (logo) {\\n        logo.addEventListener('click', setDefaultProject);\\n    }\\n    if (waterwayLabs) {\\n        waterwayLabs.addEventListener('click', setDefaultProject);\\n    }\\n    updateGlobalColor(selectedProject?.backgroundColor ?? '#2CE3A6');\\n});\\n<\/script>\\n\\n<Layout>\\n  <main class=\\"flex flex-col min-h-screen text-white\\">\\n    {#if selectedProject}\\n      <!-- Mobile Layout -->\\n      <div class=\\"lg:hidden\\">\\n        <!-- Preview Image Section -->\\n        <div\\n          class=\\"h-[305px] w-full\\" \\n          style=\\"background-color: {selectedProject?.backgroundColor};\\"\\n        >\\n          <img\\n            src={selectedProject?.mobilePreviewImage}\\n            alt={\`\${selectedProject?.name} preview\`}\\n            class=\\"mobile-preview-image\\"\\n          />\\n        </div>\\n\\n        <!-- Project Information -->\\n        <div class=\\"flex flex-col px-4 py-6 bg-[#272727]\\">\\n          <h1 class=\\"mb-4 text-4xl font-bold font-mona\\">\\n            {selectedProject.title}\\n          </h1>\\n          <p class=\\"mb-4 text-xl\\">{selectedProject.description}</p>\\n          <p class=\\"mb-6 text-gray-300\\">{selectedProject.summary}</p>\\n          \\n          <!-- Status and Button -->\\n          <div class=\\"flex flex-col mb-6 space-y-4\\">\\n            <div class=\\"flex items-center space-x-2\\">\\n              <span class=\\"text-sm\\">Status:</span>\\n              <span class=\\"text-sm font-semibold\\">{selectedProject.status}</span>\\n            </div>\\n            <a\\n              href={selectedProject.buttonLink}\\n              target=\\"_blank\\"\\n              rel=\\"noopener noreferrer\\"\\n              class=\\"inline-flex items-center justify-center px-6 py-3 transition-colors rounded-lg\\"\\n              style=\\"background-color: {selectedProject.backgroundColor}\\"\\n            >\\n              {selectedProject.buttonText}\\n            </a>\\n          </div>\\n\\n          <!-- Social Links -->\\n          <div class=\\"flex justify-center mb-4 space-x-6\\">\\n            {#if selectedProject.twitter}\\n              <a href={selectedProject.twitter} target=\\"_blank\\" rel=\\"noopener noreferrer\\">\\n                <svg class=\\"w-6 h-6\\" fill={selectedProject.backgroundColor} viewBox=\\"0 0 24 24\\">\\n                  <path d=\\"M12.8767 0.0963813V0.0931396H13.7207L14.029 0.154732C14.2346 0.194718 14.4213 0.24712 14.589 0.311953C14.7567 0.376787 14.9191 0.452431 15.0759 0.538871C15.2328 0.62531 15.3751 0.713387 15.5028 0.803068C15.6294 0.891679 15.743 0.985688 15.8437 1.08509C15.9432 1.18559 16.0985 1.21152 16.3095 1.16289C16.5205 1.11427 16.7477 1.04673 16.9912 0.960289C17.2346 0.87385 17.4754 0.7766 17.7135 0.668538C17.9515 0.560477 18.0965 0.491866 18.1485 0.462691C18.1993 0.432446 18.2264 0.416238 18.2296 0.414066L18.2328 0.409204L18.2491 0.401099L18.2653 0.392995L18.2815 0.384891L18.2978 0.376787L18.301 0.371924L18.3059 0.368683L18.3108 0.365441L18.314 0.360578L18.3302 0.355716L18.3465 0.352474L18.3432 0.376787L18.3383 0.401099L18.3302 0.425412L18.3221 0.449725L18.314 0.465933L18.3059 0.482141L18.2978 0.506454C18.2924 0.522662 18.287 0.544268 18.2815 0.571288C18.2761 0.598307 18.2247 0.706352 18.1273 0.895456C18.03 1.08456 17.9082 1.27635 17.7621 1.47085C17.6161 1.66536 17.4851 1.8123 17.3694 1.91172C17.2525 2.01222 17.1751 2.08245 17.1373 2.12243C17.0994 2.16349 17.0534 2.2013 16.9993 2.23589L16.9181 2.28938L16.9019 2.29748L16.8857 2.30559L16.8824 2.31045L16.8776 2.31369L16.8727 2.31693L16.8694 2.3218L16.8532 2.3299L16.837 2.338L16.8338 2.34287L16.8289 2.34611L16.824 2.34935L16.8208 2.35421L16.8175 2.35908L16.8126 2.36232L16.8078 2.36556L16.8045 2.37042H16.8857L17.3401 2.27317C17.6431 2.20834 17.9326 2.13 18.2085 2.03815L18.6467 1.89227L18.6954 1.87606L18.7198 1.86796L18.736 1.85986L18.7522 1.85175L18.7685 1.84365L18.7847 1.83554L18.8171 1.83068L18.8496 1.82744V1.85986L18.8415 1.8631L18.8334 1.86796L18.8301 1.87282L18.8253 1.87606L18.8204 1.87931L18.8171 1.88417L18.8139 1.88903L18.809 1.89227L18.8042 1.89551L18.8009 1.90038L18.7977 1.90524L18.7928 1.90848L18.7847 1.92469L18.7766 1.9409L18.7717 1.94414C18.7695 1.94738 18.7008 2.03922 18.5656 2.21968C18.4303 2.40122 18.3573 2.49305 18.3465 2.49523C18.3356 2.49847 18.3205 2.51468 18.301 2.54385C18.2826 2.5741 18.1679 2.69459 17.9569 2.9053C17.7459 3.11601 17.5393 3.30347 17.3369 3.46773C17.1335 3.63306 17.0307 3.8362 17.0285 4.07717C17.0253 4.31705 17.0128 4.58828 16.9912 4.89083C16.9695 5.19339 16.929 5.52025 16.8694 5.87144C16.8099 6.22262 16.718 6.61973 16.5935 7.06276C16.4691 7.50578 16.3176 7.93801 16.1391 8.35943C15.9605 8.78085 15.7739 9.15904 15.5791 9.49402C15.3843 9.829 15.2058 10.1126 15.0435 10.345C14.8812 10.5773 14.7162 10.7961 14.5484 11.0014C14.3807 11.2067 14.1687 11.438 13.9122 11.6951C13.6547 11.9512 13.514 12.0917 13.4902 12.1165C13.4653 12.1403 13.3593 12.2289 13.1721 12.3824C12.986 12.5369 12.7858 12.6914 12.5715 12.8459C12.3584 12.9994 12.1625 13.1274 11.984 13.2301C11.8054 13.3327 11.5901 13.4499 11.338 13.5818C11.087 13.7147 10.8153 13.8379 10.5232 13.9513C10.231 14.0648 9.92265 14.1701 9.59803 14.2674C9.27341 14.3646 8.95962 14.4403 8.65664 14.4943C8.35368 14.5483 8.01012 14.5943 7.62598 14.6321L7.04979 14.6888V14.6969H5.99479V14.6888L5.85682 14.6807C5.76486 14.6753 5.68911 14.6699 5.62959 14.6645C5.57009 14.6591 5.34555 14.6294 4.95601 14.5754C4.56647 14.5213 4.2608 14.4673 4.03897 14.4133C3.81716 14.3592 3.48712 14.2566 3.04889 14.1053C2.61066 13.954 2.23572 13.8011 1.92409 13.6466C1.61355 13.4932 1.41878 13.3959 1.33978 13.3549C1.26187 13.3149 1.17423 13.2652 1.07684 13.2057L0.930764 13.1166L0.927534 13.1117L0.922648 13.1085L0.917779 13.1052L0.914533 13.1004L0.898302 13.0923L0.882071 13.0842L0.878841 13.0793L0.873956 13.0761L0.869086 13.0728L0.86584 13.068L0.86261 13.0631L0.857725 13.0599H0.849609V13.0274L0.86584 13.0307L0.882071 13.0356L0.95511 13.0437C1.0038 13.0491 1.13636 13.0572 1.35277 13.068C1.56919 13.0788 1.79911 13.0788 2.04258 13.068C2.28604 13.0572 2.53492 13.0328 2.78919 12.995C3.04348 12.9572 3.34375 12.8924 3.69001 12.8005C4.03627 12.7087 4.3544 12.5995 4.6444 12.4731C4.9333 12.3456 5.13888 12.2505 5.26117 12.1879C5.38235 12.1263 5.56738 12.0117 5.81625 11.8442L6.18956 11.593L6.1928 11.5881L6.19767 11.5849L6.20256 11.5817L6.20579 11.5768L6.20903 11.5719L6.2139 11.5687L6.21879 11.5655L6.22202 11.5606L6.23825 11.5557L6.25448 11.5525L6.25772 11.5363L6.26259 11.5201L6.26748 11.5168L6.27071 11.512L6.14086 11.5039C6.0543 11.4985 5.97044 11.493 5.88928 11.4877C5.80813 11.4823 5.68099 11.4579 5.50786 11.4147C5.33474 11.3715 5.14809 11.3067 4.9479 11.2202C4.74772 11.1338 4.55295 11.0311 4.36359 10.9123C4.17424 10.7934 4.03735 10.6945 3.95295 10.6156C3.86963 10.5378 3.76142 10.4276 3.62833 10.285C3.49632 10.1413 3.38162 9.99377 3.28424 9.8425C3.18685 9.69122 3.0938 9.51669 3.00508 9.31897L2.87035 9.02397L2.86223 8.99966L2.85412 8.97535L2.84925 8.95914L2.846 8.94293L2.87035 8.94617L2.8947 8.95103L3.07323 8.97535C3.19227 8.99156 3.37893 8.99695 3.6332 8.99156C3.88749 8.98616 4.06332 8.97535 4.1607 8.95914C4.25809 8.94293 4.3176 8.93212 4.33924 8.92672L4.3717 8.91862L4.41228 8.91051L4.45286 8.90241L4.4561 8.89755L4.46097 8.89431L4.46586 8.89106L4.46909 8.8862L4.43662 8.8781L4.40416 8.86999L4.3717 8.86189L4.33924 8.85378L4.30678 8.84568C4.28514 8.84028 4.24728 8.82947 4.19316 8.81326C4.13906 8.79706 3.99299 8.73762 3.75493 8.63497C3.51689 8.53232 3.32752 8.43237 3.18685 8.33512C3.04583 8.23758 2.91137 8.13092 2.78433 8.01581C2.65772 7.89911 2.51869 7.74891 2.36719 7.56522C2.21571 7.38153 2.08046 7.16811 1.96142 6.92498C1.8424 6.68186 1.75313 6.44954 1.69361 6.22802C1.63433 6.0078 1.59522 5.78266 1.57677 5.55537L1.54754 5.215L1.56377 5.21824L1.58 5.2231L1.59623 5.2312L1.61246 5.23931L1.62869 5.24741L1.64492 5.25552L1.8965 5.36898C2.06423 5.44462 2.27252 5.50945 2.52139 5.56348C2.77027 5.6175 2.91904 5.64723 2.96773 5.65262L3.04077 5.66073H3.18685L3.18362 5.65587L3.17873 5.65262L3.17387 5.64938L3.17062 5.64452L3.16739 5.63966L3.1625 5.63642L3.15763 5.63317L3.15439 5.62831L3.13816 5.62021L3.12193 5.6121L3.1187 5.60724L3.11381 5.604L3.10894 5.60076L3.1057 5.59589L3.08947 5.58779L3.07323 5.57969L3.07 5.57482C3.06676 5.57265 3.02022 5.53808 2.9304 5.47109C2.84167 5.40301 2.74862 5.31495 2.65123 5.20689C2.55385 5.09883 2.45646 4.98537 2.35908 4.86652C2.26151 4.74739 2.17461 4.61993 2.09938 4.48562C2.02365 4.35055 1.94357 4.17873 1.85917 3.97019C1.77585 3.76272 1.71255 3.55363 1.66927 3.34293C1.626 3.13222 1.60165 2.92421 1.59623 2.7189C1.59082 2.51359 1.59623 2.338 1.61246 2.19213C1.62869 2.04625 1.66115 1.88146 1.70984 1.69777C1.75854 1.51408 1.82888 1.31958 1.92084 1.11427L2.05881 0.80631L2.06692 0.781997L2.07504 0.757684L2.07992 0.754443L2.08315 0.74958L2.0864 0.744718L2.09127 0.741476L2.09615 0.744718L2.09938 0.74958L2.10263 0.754443L2.1075 0.757684L2.11238 0.760926L2.11561 0.765789L2.11886 0.770651L2.12373 0.773893L2.13185 0.790101L2.13996 0.80631L2.14485 0.809551L2.14808 0.814414L2.36719 1.05754C2.51327 1.21962 2.6864 1.40062 2.88658 1.60052C3.08677 1.80042 3.19768 1.90415 3.21931 1.91172C3.24096 1.92036 3.268 1.94521 3.30047 1.98628C3.33293 2.02627 3.44114 2.1219 3.62508 2.27317C3.80904 2.42444 4.0498 2.60005 4.34736 2.79994C4.64493 2.99984 4.97495 3.19705 5.33744 3.39155C5.69994 3.58605 6.08948 3.76164 6.50606 3.91832C6.92265 4.07501 7.21481 4.17766 7.38252 4.22628C7.55025 4.27491 7.83699 4.33704 8.24276 4.41268C8.64853 4.48833 8.95422 4.53695 9.1598 4.55856C9.36539 4.58016 9.50607 4.59259 9.5818 4.59584L9.69542 4.59908L9.69219 4.57476L9.6873 4.55045L9.65484 4.34785C9.6332 4.21278 9.62238 4.02368 9.62238 3.78055C9.62238 3.53743 9.64132 3.31322 9.67919 3.1079C9.71707 2.90259 9.77388 2.69459 9.84961 2.48388C9.92536 2.27317 9.99949 2.10405 10.072 1.97656C10.1456 1.85013 10.2419 1.70588 10.3609 1.54379C10.4799 1.38171 10.6341 1.21423 10.8235 1.04133C11.0128 0.868436 11.2292 0.714457 11.4727 0.579392C11.7162 0.444327 11.9407 0.341663 12.1463 0.271432C12.3519 0.201201 12.525 0.155266 12.6657 0.133661C12.8063 0.112055 12.8767 0.099623 12.8767 0.0963813Z\\"/>\\n                </svg>\\n              </a>\\n            {/if}\\n            {#if selectedProject.github}\\n              <a href={selectedProject.github} target=\\"_blank\\" rel=\\"noopener noreferrer\\">\\n                <svg class=\\"w-6 h-6\\" fill={selectedProject.backgroundColor} viewBox=\\"0 0 24 24\\">\\n                  <path d=\\"M9.5 0C4.5305 0 0.5 4.02975 0.5 9C0.5 12.9765 3.0785 16.35 6.65525 17.5402C7.1045 17.6235 7.25 17.3445 7.25 17.1075V15.432C4.7465 15.9765 4.22525 14.37 4.22525 14.37C3.81575 13.3298 3.2255 13.053 3.2255 13.053C2.40875 12.4942 3.28775 12.5062 3.28775 12.5062C4.1915 12.5692 4.667 13.434 4.667 13.434C5.4695 14.8095 6.77225 14.412 7.286 14.1818C7.36625 13.6005 7.5995 13.203 7.8575 12.9788C5.85875 12.75 3.75725 11.9782 3.75725 8.5305C3.75725 7.54725 4.109 6.74475 4.68425 6.11475C4.59125 5.8875 4.283 4.97175 4.772 3.73275C4.772 3.73275 5.528 3.49125 7.24775 4.65525C7.9655 4.45575 8.735 4.356 9.5 4.35225C10.265 4.356 11.0352 4.45575 11.7545 4.65525C13.4727 3.49125 14.2272 3.73275 14.2272 3.73275C14.717 4.9725 14.4087 5.88825 14.3158 6.11475C14.8932 6.74475 15.242 7.548 15.242 8.5305C15.242 11.9872 13.1368 12.7485 11.1327 12.9713C11.4552 13.2502 11.75 13.7978 11.75 14.6378V17.1075C11.75 17.3468 11.894 17.628 12.3507 17.5395C15.9245 16.3477 18.5 12.975 18.5 9C18.5 4.02975 14.4703 0 9.5 0Z\\"/>\\n                </svg>\\n              </a>\\n            {/if}\\n          </div>\\n        </div>\\n      </div>\\n\\n      <!-- Desktop Layout -->\\n      <div class=\\"flex-row items-start hidden min-h-screen px-10 pt-20 overflow-x-hidden lg:flex\\">\\n        <!-- Left Section: Project Information -->\\n        <div class=\\"w-1/2 space-y-10 bg-[#272727] in:fade={{ duration: 500 }} z-0\\">\\n          <ProjectSection\\n            title={selectedProject.title}\\n            description={selectedProject.description}\\n            summary={selectedProject.summary}\\n            buttonText={selectedProject.buttonText}\\n            buttonLink={selectedProject.buttonLink}\\n            status={selectedProject.status}\\n            isFootballGod={selectedProject.name === \\"Football God\\"}\\n          />\\n        </div>\\n\\n        <!-- Right Section: Image/Graphic -->\\n        <div\\n          class=\\"relative flex items-center justify-center w-1/2 mt-[-115px]\\"\\n          style=\\"background-color: {selectedProject?.backgroundColor};\\"\\n        >\\n          <img\\n            src={selectedProject?.backgroundImage}\\n            alt={selectedProject?.name}\\n            style=\\"width: 650px; height: 750px; transform: translateX({selectedProject.translateX}); z-index: 1;\\"\\n            class=\\"object-contain\\"\\n          />\\n          <img\\n            src={selectedProject?.previewImage}\\n            alt={\`\${selectedProject?.name} preview\`}\\n            class=\\"absolute z-10 object-contain preview-image-container\\"\\n            style=\\"width: 650px; height:700px; transform: translate(20%, 10%);\\"\\n          />\\n        </div>\\n\\n        <!-- Desktop Social Icons -->\\n        <div class=\\"fixed flex flex-col items-center justify-end space-y-4\\" \\n             style=\\"position: fixed; bottom: 170px; left: 50%; transform: translateX(-200%); z-index: 2;\\">\\n          {#if selectedProject.twitter}\\n            <a href={selectedProject.twitter} target=\\"_blank\\" rel=\\"noopener noreferrer\\" class=\\"block transition hover:opacity-80 relative z-[2]\\">\\n              <svg class=\\"w-6 h-6 pointer-events-auto\\" width=\\"24\\" height=\\"24\\" fill={selectedProject.backgroundColor} xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\">\\n                <path d=\\"M12.8767 0.0963813V0.0931396H13.7207L14.029 0.154732C14.2346 0.194718 14.4213 0.24712 14.589 0.311953C14.7567 0.376787 14.9191 0.452431 15.0759 0.538871C15.2328 0.62531 15.3751 0.713387 15.5028 0.803068C15.6294 0.891679 15.743 0.985688 15.8437 1.08509C15.9432 1.18559 16.0985 1.21152 16.3095 1.16289C16.5205 1.11427 16.7477 1.04673 16.9912 0.960289C17.2346 0.87385 17.4754 0.7766 17.7135 0.668538C17.9515 0.560477 18.0965 0.491866 18.1485 0.462691C18.1993 0.432446 18.2264 0.416238 18.2296 0.414066L18.2328 0.409204L18.2491 0.401099L18.2653 0.392995L18.2815 0.384891L18.2978 0.376787L18.301 0.371924L18.3059 0.368683L18.3108 0.365441L18.314 0.360578L18.3302 0.355716L18.3465 0.352474L18.3432 0.376787L18.3383 0.401099L18.3302 0.425412L18.3221 0.449725L18.314 0.465933L18.3059 0.482141L18.2978 0.506454C18.2924 0.522662 18.287 0.544268 18.2815 0.571288C18.2761 0.598307 18.2247 0.706352 18.1273 0.895456C18.03 1.08456 17.9082 1.27635 17.7621 1.47085C17.6161 1.66536 17.4851 1.8123 17.3694 1.91172C17.2525 2.01222 17.1751 2.08245 17.1373 2.12243C17.0994 2.16349 17.0534 2.2013 16.9993 2.23589L16.9181 2.28938L16.9019 2.29748L16.8857 2.30559L16.8824 2.31045L16.8776 2.31369L16.8727 2.31693L16.8694 2.3218L16.8532 2.3299L16.837 2.338L16.8338 2.34287L16.8289 2.34611L16.824 2.34935L16.8208 2.35421L16.8175 2.35908L16.8126 2.36232L16.8078 2.36556L16.8045 2.37042H16.8857L17.3401 2.27317C17.6431 2.20834 17.9326 2.13 18.2085 2.03815L18.6467 1.89227L18.6954 1.87606L18.7198 1.86796L18.736 1.85986L18.7522 1.85175L18.7685 1.84365L18.7847 1.83554L18.8171 1.83068L18.8496 1.82744V1.85986L18.8415 1.8631L18.8334 1.86796L18.8301 1.87282L18.8253 1.87606L18.8204 1.87931L18.8171 1.88417L18.8139 1.88903L18.809 1.89227L18.8042 1.89551L18.8009 1.90038L18.7977 1.90524L18.7928 1.90848L18.7847 1.92469L18.7766 1.9409L18.7717 1.94414C18.7695 1.94738 18.7008 2.03922 18.5656 2.21968C18.4303 2.40122 18.3573 2.49305 18.3465 2.49523C18.3356 2.49847 18.3205 2.51468 18.301 2.54385C18.2826 2.5741 18.1679 2.69459 17.9569 2.9053C17.7459 3.11601 17.5393 3.30347 17.3369 3.46773C17.1335 3.63306 17.0307 3.8362 17.0285 4.07717C17.0253 4.31705 17.0128 4.58828 16.9912 4.89083C16.9695 5.19339 16.929 5.52025 16.8694 5.87144C16.8099 6.22262 16.718 6.61973 16.5935 7.06276C16.4691 7.50578 16.3176 7.93801 16.1391 8.35943C15.9605 8.78085 15.7739 9.15904 15.5791 9.49402C15.3843 9.829 15.2058 10.1126 15.0435 10.345C14.8812 10.5773 14.7162 10.7961 14.5484 11.0014C14.3807 11.2067 14.1687 11.438 13.9122 11.6951C13.6547 11.9512 13.514 12.0917 13.4902 12.1165C13.4653 12.1403 13.3593 12.2289 13.1721 12.3824C12.986 12.5369 12.7858 12.6914 12.5715 12.8459C12.3584 12.9994 12.1625 13.1274 11.984 13.2301C11.8054 13.3327 11.5901 13.4499 11.338 13.5818C11.087 13.7147 10.8153 13.8379 10.5232 13.9513C10.231 14.0648 9.92265 14.1701 9.59803 14.2674C9.27341 14.3646 8.95962 14.4403 8.65664 14.4943C8.35368 14.5483 8.01012 14.5943 7.62598 14.6321L7.04979 14.6888V14.6969H5.99479V14.6888L5.85682 14.6807C5.76486 14.6753 5.68911 14.6699 5.62959 14.6645C5.57009 14.6591 5.34555 14.6294 4.95601 14.5754C4.56647 14.5213 4.2608 14.4673 4.03897 14.4133C3.81716 14.3592 3.48712 14.2566 3.04889 14.1053C2.61066 13.954 2.23572 13.8011 1.92409 13.6466C1.61355 13.4932 1.41878 13.3959 1.33978 13.3549C1.26187 13.3149 1.17423 13.2652 1.07684 13.2057L0.930764 13.1166L0.927534 13.1117L0.922648 13.1085L0.917779 13.1052L0.914533 13.1004L0.898302 13.0923L0.882071 13.0842L0.878841 13.0793L0.873956 13.0761L0.869086 13.0728L0.86584 13.068L0.86261 13.0631L0.857725 13.0599H0.849609V13.0274L0.86584 13.0307L0.882071 13.0356L0.95511 13.0437C1.0038 13.0491 1.13636 13.0572 1.35277 13.068C1.56919 13.0788 1.79911 13.0788 2.04258 13.068C2.28604 13.0572 2.53492 13.0328 2.78919 12.995C3.04348 12.9572 3.34375 12.8924 3.69001 12.8005C4.03627 12.7087 4.3544 12.5995 4.6444 12.4731C4.9333 12.3456 5.13888 12.2505 5.26117 12.1879C5.38235 12.1263 5.56738 12.0117 5.81625 11.8442L6.18956 11.593L6.1928 11.5881L6.19767 11.5849L6.20256 11.5817L6.20579 11.5768L6.20903 11.5719L6.2139 11.5687L6.21879 11.5655L6.22202 11.5606L6.23825 11.5557L6.25448 11.5525L6.25772 11.5363L6.26259 11.5201L6.26748 11.5168L6.27071 11.512L6.14086 11.5039C6.0543 11.4985 5.97044 11.493 5.88928 11.4877C5.80813 11.4823 5.68099 11.4579 5.50786 11.4147C5.33474 11.3715 5.14809 11.3067 4.9479 11.2202C4.74772 11.1338 4.55295 11.0311 4.36359 10.9123C4.17424 10.7934 4.03735 10.6945 3.95295 10.6156C3.86963 10.5378 3.76142 10.4276 3.62833 10.285C3.49632 10.1413 3.38162 9.99377 3.28424 9.8425C3.18685 9.69122 3.0938 9.51669 3.00508 9.31897L2.87035 9.02397L2.86223 8.99966L2.85412 8.97535L2.84925 8.95914L2.846 8.94293L2.87035 8.94617L2.8947 8.95103L3.07323 8.97535C3.19227 8.99156 3.37893 8.99695 3.6332 8.99156C3.88749 8.98616 4.06332 8.97535 4.1607 8.95914C4.25809 8.94293 4.3176 8.93212 4.33924 8.92672L4.3717 8.91862L4.41228 8.91051L4.45286 8.90241L4.4561 8.89755L4.46097 8.89431L4.46586 8.89106L4.46909 8.8862L4.43662 8.8781L4.40416 8.86999L4.3717 8.86189L4.33924 8.85378L4.30678 8.84568C4.28514 8.84028 4.24728 8.82947 4.19316 8.81326C4.13906 8.79706 3.99299 8.73762 3.75493 8.63497C3.51689 8.53232 3.32752 8.43237 3.18685 8.33512C3.04583 8.23758 2.91137 8.13092 2.78433 8.01581C2.65772 7.89911 2.51869 7.74891 2.36719 7.56522C2.21571 7.38153 2.08046 7.16811 1.96142 6.92498C1.8424 6.68186 1.75313 6.44954 1.69361 6.22802C1.63433 6.0078 1.59522 5.78266 1.57677 5.55537L1.54754 5.215L1.56377 5.21824L1.58 5.2231L1.59623 5.2312L1.61246 5.23931L1.62869 5.24741L1.64492 5.25552L1.8965 5.36898C2.06423 5.44462 2.27252 5.50945 2.52139 5.56348C2.77027 5.6175 2.91904 5.64723 2.96773 5.65262L3.04077 5.66073H3.18685L3.18362 5.65587L3.17873 5.65262L3.17387 5.64938L3.17062 5.64452L3.16739 5.63966L3.1625 5.63642L3.15763 5.63317L3.15439 5.62831L3.13816 5.62021L3.12193 5.6121L3.1187 5.60724L3.11381 5.604L3.10894 5.60076L3.1057 5.59589L3.08947 5.58779L3.07323 5.57969L3.07 5.57482C3.06676 5.57265 3.02022 5.53808 2.9304 5.47109C2.84167 5.40301 2.74862 5.31495 2.65123 5.20689C2.55385 5.09883 2.45646 4.98537 2.35908 4.86652C2.26151 4.74739 2.17461 4.61993 2.09938 4.48562C2.02365 4.35055 1.94357 4.17873 1.85917 3.97019C1.77585 3.76272 1.71255 3.55363 1.66927 3.34293C1.626 3.13222 1.60165 2.92421 1.59623 2.7189C1.59082 2.51359 1.59623 2.338 1.61246 2.19213C1.62869 2.04625 1.66115 1.88146 1.70984 1.69777C1.75854 1.51408 1.82888 1.31958 1.92084 1.11427L2.05881 0.80631L2.06692 0.781997L2.07504 0.757684L2.07992 0.754443L2.08315 0.74958L2.0864 0.744718L2.09127 0.741476L2.09615 0.744718L2.09938 0.74958L2.10263 0.754443L2.1075 0.757684L2.11238 0.760926L2.11561 0.765789L2.11886 0.770651L2.12373 0.773893L2.13185 0.790101L2.13996 0.80631L2.14485 0.809551L2.14808 0.814414L2.36719 1.05754C2.51327 1.21962 2.6864 1.40062 2.88658 1.60052C3.08677 1.80042 3.19768 1.90415 3.21931 1.91172C3.24096 1.92036 3.268 1.94521 3.30047 1.98628C3.33293 2.02627 3.44114 2.1219 3.62508 2.27317C3.80904 2.42444 4.0498 2.60005 4.34736 2.79994C4.64493 2.99984 4.97495 3.19705 5.33744 3.39155C5.69994 3.58605 6.08948 3.76164 6.50606 3.91832C6.92265 4.07501 7.21481 4.17766 7.38252 4.22628C7.55025 4.27491 7.83699 4.33704 8.24276 4.41268C8.64853 4.48833 8.95422 4.53695 9.1598 4.55856C9.36539 4.58016 9.50607 4.59259 9.5818 4.59584L9.69542 4.59908L9.69219 4.57476L9.6873 4.55045L9.65484 4.34785C9.6332 4.21278 9.62238 4.02368 9.62238 3.78055C9.62238 3.53743 9.64132 3.31322 9.67919 3.1079C9.71707 2.90259 9.77388 2.69459 9.84961 2.48388C9.92536 2.27317 9.99949 2.10405 10.072 1.97656C10.1456 1.85013 10.2419 1.70588 10.3609 1.54379C10.4799 1.38171 10.6341 1.21423 10.8235 1.04133C11.0128 0.868436 11.2292 0.714457 11.4727 0.579392C11.7162 0.444327 11.9407 0.341663 12.1463 0.271432C12.3519 0.201201 12.525 0.155266 12.6657 0.133661C12.8063 0.112055 12.8767 0.099623 12.8767 0.0963813Z\\"/>\\n              </svg>\\n            </a>\\n          {/if}\\n          {#if selectedProject.github}\\n            <a href={selectedProject.github} target=\\"_blank\\" rel=\\"noopener noreferrer\\" class=\\"block transition hover:opacity-80 relative z-[2]\\">\\n              <svg class=\\"w-6 h-6 pointer-events-auto\\" width=\\"24\\" height=\\"24\\" fill={selectedProject.backgroundColor} xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\">\\n                <path d=\\"M9.5 0C4.5305 0 0.5 4.02975 0.5 9C0.5 12.9765 3.0785 16.35 6.65525 17.5402C7.1045 17.6235 7.25 17.3445 7.25 17.1075V15.432C4.7465 15.9765 4.22525 14.37 4.22525 14.37C3.81575 13.3298 3.2255 13.053 3.2255 13.053C2.40875 12.4942 3.28775 12.5062 3.28775 12.5062C4.1915 12.5692 4.667 13.434 4.667 13.434C5.4695 14.8095 6.77225 14.412 7.286 14.1818C7.36625 13.6005 7.5995 13.203 7.8575 12.9788C5.85875 12.75 3.75725 11.9782 3.75725 8.5305C3.75725 7.54725 4.109 6.74475 4.68425 6.11475C4.59125 5.8875 4.283 4.97175 4.772 3.73275C4.772 3.73275 5.528 3.49125 7.24775 4.65525C7.9655 4.45575 8.735 4.356 9.5 4.35225C10.265 4.356 11.0352 4.45575 11.7545 4.65525C13.4727 3.49125 14.2272 3.73275 14.2272 3.73275C14.717 4.9725 14.4087 5.88825 14.3158 6.11475C14.8932 6.74475 15.242 7.548 15.242 8.5305C15.242 11.9872 13.1368 12.7485 11.1327 12.9713C11.4552 13.2502 11.75 13.7978 11.75 14.6378V17.1075C11.75 17.3468 11.894 17.628 12.3507 17.5395C15.9245 16.3477 18.5 12.975 18.5 9C18.5 4.02975 14.4703 0 9.5 0Z\\"/>\\n              </svg>\\n            </a>\\n          {/if}\\n        </div>\\n      </div>\\n    {/if}\\n  </main>\\n\\n  <!-- Bottom Icon Row -->\\n  <IconsRow {projects} {selectProject} />\\n</Layout>\\n\\n<style>\\n  :global(html),\\n  :global(body) {\\n    height: 100%;\\n    margin: 0;\\n    padding: 0;\\n    overflow-x: hidden;\\n  }\\n\\n  :global(body) {\\n    font-family: \\"Poppins\\", \\"Mona Sans Expanded\\", sans-serif !important;\\n    color: white !important;\\n  }\\n\\n  /* Mobile-specific styles */\\n  .mobile-preview-image {\\n    width: 361px;\\n    height: 233px;\\n    border-radius: 8px 0 0 0;\\n    border-top: 5px solid #272727;\\n    -o-object-fit: cover;\\n       object-fit: cover;\\n    box-shadow: \\n      4px 3px 12px 0px rgba(0, 0, 0, 0.21),\\n      18px 12px 21px 0px rgba(0, 0, 0, 0.18),\\n      40px 26px 29px 0px rgba(0, 0, 0, 0.11),\\n      71px 46px 34px 0px rgba(0, 0, 0, 0.03),\\n      111px 72px 37px 0px rgba(0, 0, 0, 0);\\n  }\\n\\n  @media (max-width: 1023px) { \\n    :global(body) {\\n      background: #272727;\\n    }\\n\\n    :global(.project-title) {\\n      font-size: 48px;\\n      line-height: 1.2;\\n      text-align: center;\\n    }\\n\\n    .mobile-preview-image {\\n      margin: 0 auto;\\n      display: block;\\n    }\\n  }\\n\\n  /* Desktop-specific styles */\\n  @media (min-width: 1024px) { /* Changed from 769px to match lg breakpoint */\\n    :global(body) {\\n      background: linear-gradient(\\n        to right,\\n        #272727 50%,\\n        var(--selectedProject-bg-color, #2ce3a6) 50%\\n      );\\n    }\\n\\n    :global(.project-title) {\\n      font-family: \\"Mona Sans Expanded\\", sans-serif;\\n      font-size: 90px;\\n      font-weight: 600;\\n      line-height: 81px;\\n      text-align: left;\\n    }\\n  }</style>\\n\\n"],"names":[],"mappings":"AAuTU,IAAK,CACL,IAAM,CACZ,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,MACd,CAEQ,IAAM,CACZ,WAAW,CAAE,SAAS,CAAC,CAAC,oBAAoB,CAAC,CAAC,UAAU,CAAC,UAAU,CACnE,KAAK,CAAE,KAAK,CAAC,UACf,CAGA,oCAAsB,CACpB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,aAAa,CAAE,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACxB,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAC7B,aAAa,CAAE,KAAK,CACjB,UAAU,CAAE,KAAK,CACpB,UAAU,CACR,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC;AAC3C,MAAM,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC;AAC7C,MAAM,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC;AAC7C,MAAM,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC;AAC7C,MAAM,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACvC,CAEA,MAAO,YAAY,MAAM,CAAE,CACjB,IAAM,CACZ,UAAU,CAAE,OACd,CAEQ,cAAgB,CACtB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,UAAU,CAAE,MACd,CAEA,oCAAsB,CACpB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,OAAO,CAAE,KACX,CACF,CAGA,MAAO,YAAY,MAAM,CAAE,CACjB,IAAM,CACZ,UAAU,CAAE;AAClB,QAAQ,EAAE,CAAC,KAAK,CAAC;AACjB,QAAQ,OAAO,CAAC,GAAG,CAAC;AACpB,QAAQ,IAAI,0BAA0B,CAAC,QAAQ,CAAC,CAAC,GAAG;AACpD,OACI,CAEQ,cAAgB,CACtB,WAAW,CAAE,oBAAoB,CAAC,CAAC,UAAU,CAC7C,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,IAAI,CACjB,UAAU,CAAE,IACd,CACF"}`
};
function updateGlobalColor(color) {
  document.body.style.setProperty("--selectedProject-bg-color", color);
  document.documentElement.style.setProperty("--selectedProject-bg-color", color);
}
const Page$5 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let projects = [
    {
      component: Openfpl,
      name: "OpenFPL",
      title: "OPENFPL",
      description: "Decentralized fantasy football.",
      summary: "OpenFPL is a decentralized fantasy football game for the Premier League hosted through the Internet Computer's Network Nervous System. OpenFPL token holders reach community consensus for player valuations, data validation, and more to ensure the entire platform operates entirely on the blockchain with zero dependencies.",
      buttonText: "Visit Site",
      buttonLink: "https://openfpl.xyz",
      backgroundColor: "#2CE3A6",
      backgroundImage: "openFPL-background.png",
      previewImage: "openFPL-preview.png",
      mobilePreviewImage: "openFPL-mobile-preview.png",
      translateX: "-214px",
      status: "Decentralized",
      twitter: "https://x.com/OpenFPL_DAO",
      github: "https://github.com/jamesbeadle/OpenFPL"
    },
    {
      component: Footballgod,
      name: "Football God",
      title: "FOOTBALL GOD",
      description: "Live play to earn football games.",
      summary: "FootballGod will be a fixed odds betting platform funded by the OpenFPL DAO. Data managed to run OpenFPL and Transfer Kings will be used to offer odds on worldwide football matches. Algorithms for FootballGod will be managed by the OpenFPL DAO, allowing FootballGod to be used as a useful tool for controlling the FPL token supply. FootballGod has been designed to take advantage of the highly profitable nature of betting platforms to benefit OpenFPL token holders. FootballGod will send all profits to the OpenFPL DAO FPL Treasury, with the DAO able to burn these profit at it's discretion.",
      buttonText: "Visit Site",
      buttonLink: "https://footballgod.xyz",
      backgroundColor: "#7F56F1",
      backgroundImage: "footballGod-background.png",
      previewImage: "footballGod-preview.png",
      mobilePreviewImage: "footballGod-mobile-preview.png",
      translateX: "-160px",
      status: "Development",
      isFootballGod: true
    },
    {
      component: Golfpad,
      name: "GolfPad",
      title: "GOLFPAD",
      description: "Golf meets Web3.",
      summary: "GolfPad gives golfers of all levels a new dimension to their game. GolfPad focuses on individual achievements throughout your round rather than a single round's total score. This allows you to compete against your friends within a new framework, training your golf game for new scenarios.",
      buttonText: "Visit Site",
      buttonLink: "https://golfpad.xyz",
      backgroundColor: "#F4C802",
      backgroundImage: "golfpad-background.png",
      previewImage: "golfpad-preview.png",
      mobilePreviewImage: "golfpad-mobile-preview.png",
      translateX: "-167px",
      status: "Development",
      twitter: "https://x.com/GolfPadDAO",
      github: "https://github.com/jamesbeadle/GolfPad"
    },
    {
      component: Transferkings,
      name: "Transfer Kings",
      title: "TRANSFER KINGS",
      description: "Become a football agent today.",
      summary: "Transfer Kings is our upcoming purchase to play football agency game. Groups of friends will be able to setup their own agency, competing against each other for custom reward pools. Transfer Kings is designed to span multiple seasons and international tournaments, allowing your contracted players to achieve their expected career goals. Designed for the football expert that can spot prospects around the world, Transfer Kings is the worldwide football game Web3 has been waiting for.",
      buttonText: "Visit Site",
      buttonLink: "https://transferkings.xyz",
      backgroundColor: "#2D64E3",
      backgroundImage: "transferKings-background.png",
      previewImage: "transferKings-preview.png",
      mobilePreviewImage: "transferKings-mobile-preview.png",
      translateX: "-145px",
      status: "Development"
    },
    {
      component: Openbook,
      name: "OpenBook",
      title: "OPENBOOK",
      description: "Decentralized business management.",
      summary: "OpenBook is evolving into a comprehensive, 100% on-chain business management platform. OpenBook's initial offering of sales, accountancy, recruitment, timesheet and task management are just the first step on delivering the perfect single SaaS for businesses at the lowest possible price.",
      buttonText: "Visit Site",
      buttonLink: "https://openbook.services",
      backgroundColor: "#66E094",
      backgroundImage: "openBook-background.png",
      previewImage: "openBook-preview.png",
      mobilePreviewImage: "openBook-mobile-preview.png",
      translateX: "-220px",
      status: "Development"
    },
    {
      component: Openbeats,
      name: "OpenBeats",
      title: "OPENBEATS",
      description: "Decentralized Audio Network.",
      summary: "OpenBeats is a decentralized audio network enabling producers to create tracks using audio samples from the OpenBeats library. Creators of samples share the monthly subscription revenue based on how often their sample is used in the projects being composed.",
      buttonText: "Visit Site",
      buttonLink: "https://openbeats.xyz",
      backgroundColor: "#FF8D7D",
      backgroundImage: "openBeats-background.png",
      previewImage: "openBeats-preview.png",
      mobilePreviewImage: "openBeats-mobile-preview.png",
      translateX: "-160px",
      status: "Design"
    },
    {
      component: Openchef,
      name: "OpenChef",
      title: "OPENCHEF",
      description: "Build your own cooking community.",
      summary: "OpenChef is designed to enable chefs to earn as they help people within their local community. Chefs will create projects that receive funding through sponsorship, charitable donations and a share of premium content subscriptions. This funding will be used to feed the community, giving a chef the opportunity to show off their passion for cooking through charitable content. The DAO will vote on rewards for chefs that help the most people, ensuring as much good as possible can be done.",
      buttonText: "Visit Site",
      buttonLink: "https://openchef.xyz",
      backgroundColor: "#731728",
      backgroundImage: "openChef-background.png",
      previewImage: "openChef-preview.png",
      mobilePreviewImage: "openChef-mobile-preview.png",
      translateX: "-60px",
      status: "Design"
    },
    {
      component: Icpfa,
      name: "ICPFA",
      title: "ICPFA",
      description: "Supporting community football.",
      summary: "The ICPFA has been setup to support community grassroots football causes, funded by revenue from our football related applications.",
      buttonText: "Visit Site",
      buttonLink: "https://icpfa.org",
      backgroundColor: "#F7F7F7",
      backgroundImage: "icpfa-background.png",
      previewImage: "icpfa-preview.png",
      mobilePreviewImage: "icpfa-mobile-preview.png",
      translateX: "-125px",
      status: "Development"
    },
    {
      component: Opencare,
      name: "OpenCare",
      title: "OPENCARE",
      description: "The Future Of Social Care",
      summary: "OpenCare has been designed with care professionals and families who have elderly relatives in care-homes. Caring for the elderly will be a huge challenge for society going forwards and OpenCare will provide a caring, efficient and secure solution to help all stakeholders involved.",
      buttonText: "Visit Site",
      buttonLink: "https://opencare.services",
      backgroundColor: "#FF69B4",
      backgroundImage: "openCare-background.png",
      previewImage: "openCare-preview.png",
      mobilePreviewImage: "openCare-mobile-preview.png",
      translateX: "-88px",
      status: "Development"
    }
  ];
  let selectedProject = projects.find((p) => p.name === "OpenFPL") || projects[0];
  function selectProject(project) {
    selectedProject = project;
    projects = projects.map((p) => ({ ...p, selected: p.name === project.name }));
    updateGlobalColor(project.backgroundColor);
  }
  $$result.css.add(css$3);
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `<main class="flex flex-col min-h-screen text-white">${selectedProject ? ` <div class="lg:hidden"> <div class="h-[305px] w-full" style="${"background-color: " + escape(selectedProject?.backgroundColor, true) + ";"}"><img${add_attribute("src", selectedProject?.mobilePreviewImage, 0)}${add_attribute("alt", `${selectedProject?.name} preview`, 0)} class="mobile-preview-image svelte-1vbtu8m"></div>  <div class="flex flex-col px-4 py-6 bg-[#272727]"><h1 class="mb-4 text-4xl font-bold font-mona">${escape(selectedProject.title)}</h1> <p class="mb-4 text-xl">${escape(selectedProject.description)}</p> <p class="mb-6 text-gray-300">${escape(selectedProject.summary)}</p>  <div class="flex flex-col mb-6 space-y-4"><div class="flex items-center space-x-2"><span class="text-sm" data-svelte-h="svelte-fmf2nr">Status:</span> <span class="text-sm font-semibold">${escape(selectedProject.status)}</span></div> <a${add_attribute("href", selectedProject.buttonLink, 0)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center px-6 py-3 transition-colors rounded-lg" style="${"background-color: " + escape(selectedProject.backgroundColor, true)}">${escape(selectedProject.buttonText)}</a></div>  <div class="flex justify-center mb-4 space-x-6">${selectedProject.twitter ? `<a${add_attribute("href", selectedProject.twitter, 0)} target="_blank" rel="noopener noreferrer"><svg class="w-6 h-6"${add_attribute("fill", selectedProject.backgroundColor, 0)} viewBox="0 0 24 24"><path d="M12.8767 0.0963813V0.0931396H13.7207L14.029 0.154732C14.2346 0.194718 14.4213 0.24712 14.589 0.311953C14.7567 0.376787 14.9191 0.452431 15.0759 0.538871C15.2328 0.62531 15.3751 0.713387 15.5028 0.803068C15.6294 0.891679 15.743 0.985688 15.8437 1.08509C15.9432 1.18559 16.0985 1.21152 16.3095 1.16289C16.5205 1.11427 16.7477 1.04673 16.9912 0.960289C17.2346 0.87385 17.4754 0.7766 17.7135 0.668538C17.9515 0.560477 18.0965 0.491866 18.1485 0.462691C18.1993 0.432446 18.2264 0.416238 18.2296 0.414066L18.2328 0.409204L18.2491 0.401099L18.2653 0.392995L18.2815 0.384891L18.2978 0.376787L18.301 0.371924L18.3059 0.368683L18.3108 0.365441L18.314 0.360578L18.3302 0.355716L18.3465 0.352474L18.3432 0.376787L18.3383 0.401099L18.3302 0.425412L18.3221 0.449725L18.314 0.465933L18.3059 0.482141L18.2978 0.506454C18.2924 0.522662 18.287 0.544268 18.2815 0.571288C18.2761 0.598307 18.2247 0.706352 18.1273 0.895456C18.03 1.08456 17.9082 1.27635 17.7621 1.47085C17.6161 1.66536 17.4851 1.8123 17.3694 1.91172C17.2525 2.01222 17.1751 2.08245 17.1373 2.12243C17.0994 2.16349 17.0534 2.2013 16.9993 2.23589L16.9181 2.28938L16.9019 2.29748L16.8857 2.30559L16.8824 2.31045L16.8776 2.31369L16.8727 2.31693L16.8694 2.3218L16.8532 2.3299L16.837 2.338L16.8338 2.34287L16.8289 2.34611L16.824 2.34935L16.8208 2.35421L16.8175 2.35908L16.8126 2.36232L16.8078 2.36556L16.8045 2.37042H16.8857L17.3401 2.27317C17.6431 2.20834 17.9326 2.13 18.2085 2.03815L18.6467 1.89227L18.6954 1.87606L18.7198 1.86796L18.736 1.85986L18.7522 1.85175L18.7685 1.84365L18.7847 1.83554L18.8171 1.83068L18.8496 1.82744V1.85986L18.8415 1.8631L18.8334 1.86796L18.8301 1.87282L18.8253 1.87606L18.8204 1.87931L18.8171 1.88417L18.8139 1.88903L18.809 1.89227L18.8042 1.89551L18.8009 1.90038L18.7977 1.90524L18.7928 1.90848L18.7847 1.92469L18.7766 1.9409L18.7717 1.94414C18.7695 1.94738 18.7008 2.03922 18.5656 2.21968C18.4303 2.40122 18.3573 2.49305 18.3465 2.49523C18.3356 2.49847 18.3205 2.51468 18.301 2.54385C18.2826 2.5741 18.1679 2.69459 17.9569 2.9053C17.7459 3.11601 17.5393 3.30347 17.3369 3.46773C17.1335 3.63306 17.0307 3.8362 17.0285 4.07717C17.0253 4.31705 17.0128 4.58828 16.9912 4.89083C16.9695 5.19339 16.929 5.52025 16.8694 5.87144C16.8099 6.22262 16.718 6.61973 16.5935 7.06276C16.4691 7.50578 16.3176 7.93801 16.1391 8.35943C15.9605 8.78085 15.7739 9.15904 15.5791 9.49402C15.3843 9.829 15.2058 10.1126 15.0435 10.345C14.8812 10.5773 14.7162 10.7961 14.5484 11.0014C14.3807 11.2067 14.1687 11.438 13.9122 11.6951C13.6547 11.9512 13.514 12.0917 13.4902 12.1165C13.4653 12.1403 13.3593 12.2289 13.1721 12.3824C12.986 12.5369 12.7858 12.6914 12.5715 12.8459C12.3584 12.9994 12.1625 13.1274 11.984 13.2301C11.8054 13.3327 11.5901 13.4499 11.338 13.5818C11.087 13.7147 10.8153 13.8379 10.5232 13.9513C10.231 14.0648 9.92265 14.1701 9.59803 14.2674C9.27341 14.3646 8.95962 14.4403 8.65664 14.4943C8.35368 14.5483 8.01012 14.5943 7.62598 14.6321L7.04979 14.6888V14.6969H5.99479V14.6888L5.85682 14.6807C5.76486 14.6753 5.68911 14.6699 5.62959 14.6645C5.57009 14.6591 5.34555 14.6294 4.95601 14.5754C4.56647 14.5213 4.2608 14.4673 4.03897 14.4133C3.81716 14.3592 3.48712 14.2566 3.04889 14.1053C2.61066 13.954 2.23572 13.8011 1.92409 13.6466C1.61355 13.4932 1.41878 13.3959 1.33978 13.3549C1.26187 13.3149 1.17423 13.2652 1.07684 13.2057L0.930764 13.1166L0.927534 13.1117L0.922648 13.1085L0.917779 13.1052L0.914533 13.1004L0.898302 13.0923L0.882071 13.0842L0.878841 13.0793L0.873956 13.0761L0.869086 13.0728L0.86584 13.068L0.86261 13.0631L0.857725 13.0599H0.849609V13.0274L0.86584 13.0307L0.882071 13.0356L0.95511 13.0437C1.0038 13.0491 1.13636 13.0572 1.35277 13.068C1.56919 13.0788 1.79911 13.0788 2.04258 13.068C2.28604 13.0572 2.53492 13.0328 2.78919 12.995C3.04348 12.9572 3.34375 12.8924 3.69001 12.8005C4.03627 12.7087 4.3544 12.5995 4.6444 12.4731C4.9333 12.3456 5.13888 12.2505 5.26117 12.1879C5.38235 12.1263 5.56738 12.0117 5.81625 11.8442L6.18956 11.593L6.1928 11.5881L6.19767 11.5849L6.20256 11.5817L6.20579 11.5768L6.20903 11.5719L6.2139 11.5687L6.21879 11.5655L6.22202 11.5606L6.23825 11.5557L6.25448 11.5525L6.25772 11.5363L6.26259 11.5201L6.26748 11.5168L6.27071 11.512L6.14086 11.5039C6.0543 11.4985 5.97044 11.493 5.88928 11.4877C5.80813 11.4823 5.68099 11.4579 5.50786 11.4147C5.33474 11.3715 5.14809 11.3067 4.9479 11.2202C4.74772 11.1338 4.55295 11.0311 4.36359 10.9123C4.17424 10.7934 4.03735 10.6945 3.95295 10.6156C3.86963 10.5378 3.76142 10.4276 3.62833 10.285C3.49632 10.1413 3.38162 9.99377 3.28424 9.8425C3.18685 9.69122 3.0938 9.51669 3.00508 9.31897L2.87035 9.02397L2.86223 8.99966L2.85412 8.97535L2.84925 8.95914L2.846 8.94293L2.87035 8.94617L2.8947 8.95103L3.07323 8.97535C3.19227 8.99156 3.37893 8.99695 3.6332 8.99156C3.88749 8.98616 4.06332 8.97535 4.1607 8.95914C4.25809 8.94293 4.3176 8.93212 4.33924 8.92672L4.3717 8.91862L4.41228 8.91051L4.45286 8.90241L4.4561 8.89755L4.46097 8.89431L4.46586 8.89106L4.46909 8.8862L4.43662 8.8781L4.40416 8.86999L4.3717 8.86189L4.33924 8.85378L4.30678 8.84568C4.28514 8.84028 4.24728 8.82947 4.19316 8.81326C4.13906 8.79706 3.99299 8.73762 3.75493 8.63497C3.51689 8.53232 3.32752 8.43237 3.18685 8.33512C3.04583 8.23758 2.91137 8.13092 2.78433 8.01581C2.65772 7.89911 2.51869 7.74891 2.36719 7.56522C2.21571 7.38153 2.08046 7.16811 1.96142 6.92498C1.8424 6.68186 1.75313 6.44954 1.69361 6.22802C1.63433 6.0078 1.59522 5.78266 1.57677 5.55537L1.54754 5.215L1.56377 5.21824L1.58 5.2231L1.59623 5.2312L1.61246 5.23931L1.62869 5.24741L1.64492 5.25552L1.8965 5.36898C2.06423 5.44462 2.27252 5.50945 2.52139 5.56348C2.77027 5.6175 2.91904 5.64723 2.96773 5.65262L3.04077 5.66073H3.18685L3.18362 5.65587L3.17873 5.65262L3.17387 5.64938L3.17062 5.64452L3.16739 5.63966L3.1625 5.63642L3.15763 5.63317L3.15439 5.62831L3.13816 5.62021L3.12193 5.6121L3.1187 5.60724L3.11381 5.604L3.10894 5.60076L3.1057 5.59589L3.08947 5.58779L3.07323 5.57969L3.07 5.57482C3.06676 5.57265 3.02022 5.53808 2.9304 5.47109C2.84167 5.40301 2.74862 5.31495 2.65123 5.20689C2.55385 5.09883 2.45646 4.98537 2.35908 4.86652C2.26151 4.74739 2.17461 4.61993 2.09938 4.48562C2.02365 4.35055 1.94357 4.17873 1.85917 3.97019C1.77585 3.76272 1.71255 3.55363 1.66927 3.34293C1.626 3.13222 1.60165 2.92421 1.59623 2.7189C1.59082 2.51359 1.59623 2.338 1.61246 2.19213C1.62869 2.04625 1.66115 1.88146 1.70984 1.69777C1.75854 1.51408 1.82888 1.31958 1.92084 1.11427L2.05881 0.80631L2.06692 0.781997L2.07504 0.757684L2.07992 0.754443L2.08315 0.74958L2.0864 0.744718L2.09127 0.741476L2.09615 0.744718L2.09938 0.74958L2.10263 0.754443L2.1075 0.757684L2.11238 0.760926L2.11561 0.765789L2.11886 0.770651L2.12373 0.773893L2.13185 0.790101L2.13996 0.80631L2.14485 0.809551L2.14808 0.814414L2.36719 1.05754C2.51327 1.21962 2.6864 1.40062 2.88658 1.60052C3.08677 1.80042 3.19768 1.90415 3.21931 1.91172C3.24096 1.92036 3.268 1.94521 3.30047 1.98628C3.33293 2.02627 3.44114 2.1219 3.62508 2.27317C3.80904 2.42444 4.0498 2.60005 4.34736 2.79994C4.64493 2.99984 4.97495 3.19705 5.33744 3.39155C5.69994 3.58605 6.08948 3.76164 6.50606 3.91832C6.92265 4.07501 7.21481 4.17766 7.38252 4.22628C7.55025 4.27491 7.83699 4.33704 8.24276 4.41268C8.64853 4.48833 8.95422 4.53695 9.1598 4.55856C9.36539 4.58016 9.50607 4.59259 9.5818 4.59584L9.69542 4.59908L9.69219 4.57476L9.6873 4.55045L9.65484 4.34785C9.6332 4.21278 9.62238 4.02368 9.62238 3.78055C9.62238 3.53743 9.64132 3.31322 9.67919 3.1079C9.71707 2.90259 9.77388 2.69459 9.84961 2.48388C9.92536 2.27317 9.99949 2.10405 10.072 1.97656C10.1456 1.85013 10.2419 1.70588 10.3609 1.54379C10.4799 1.38171 10.6341 1.21423 10.8235 1.04133C11.0128 0.868436 11.2292 0.714457 11.4727 0.579392C11.7162 0.444327 11.9407 0.341663 12.1463 0.271432C12.3519 0.201201 12.525 0.155266 12.6657 0.133661C12.8063 0.112055 12.8767 0.099623 12.8767 0.0963813Z"></path></svg></a>` : ``} ${selectedProject.github ? `<a${add_attribute("href", selectedProject.github, 0)} target="_blank" rel="noopener noreferrer"><svg class="w-6 h-6"${add_attribute("fill", selectedProject.backgroundColor, 0)} viewBox="0 0 24 24"><path d="M9.5 0C4.5305 0 0.5 4.02975 0.5 9C0.5 12.9765 3.0785 16.35 6.65525 17.5402C7.1045 17.6235 7.25 17.3445 7.25 17.1075V15.432C4.7465 15.9765 4.22525 14.37 4.22525 14.37C3.81575 13.3298 3.2255 13.053 3.2255 13.053C2.40875 12.4942 3.28775 12.5062 3.28775 12.5062C4.1915 12.5692 4.667 13.434 4.667 13.434C5.4695 14.8095 6.77225 14.412 7.286 14.1818C7.36625 13.6005 7.5995 13.203 7.8575 12.9788C5.85875 12.75 3.75725 11.9782 3.75725 8.5305C3.75725 7.54725 4.109 6.74475 4.68425 6.11475C4.59125 5.8875 4.283 4.97175 4.772 3.73275C4.772 3.73275 5.528 3.49125 7.24775 4.65525C7.9655 4.45575 8.735 4.356 9.5 4.35225C10.265 4.356 11.0352 4.45575 11.7545 4.65525C13.4727 3.49125 14.2272 3.73275 14.2272 3.73275C14.717 4.9725 14.4087 5.88825 14.3158 6.11475C14.8932 6.74475 15.242 7.548 15.242 8.5305C15.242 11.9872 13.1368 12.7485 11.1327 12.9713C11.4552 13.2502 11.75 13.7978 11.75 14.6378V17.1075C11.75 17.3468 11.894 17.628 12.3507 17.5395C15.9245 16.3477 18.5 12.975 18.5 9C18.5 4.02975 14.4703 0 9.5 0Z"></path></svg></a>` : ``}</div></div></div>  <div class="flex-row items-start hidden min-h-screen px-10 pt-20 overflow-x-hidden lg:flex"> <div class="${"w-1/2 space-y-10 bg-[#272727] in:fade=" + escape({ duration: 500 }, true) + " z-0 svelte-1vbtu8m"}">${validate_component(Project_section, "ProjectSection").$$render(
        $$result,
        {
          title: selectedProject.title,
          description: selectedProject.description,
          summary: selectedProject.summary,
          buttonText: selectedProject.buttonText,
          buttonLink: selectedProject.buttonLink,
          status: selectedProject.status,
          isFootballGod: selectedProject.name === "Football God"
        },
        {},
        {}
      )}</div>  <div class="relative flex items-center justify-center w-1/2 mt-[-115px]" style="${"background-color: " + escape(selectedProject?.backgroundColor, true) + ";"}"><img${add_attribute("src", selectedProject?.backgroundImage, 0)}${add_attribute("alt", selectedProject?.name, 0)} style="${"width: 650px; height: 750px; transform: translateX(" + escape(selectedProject.translateX, true) + "); z-index: 1;"}" class="object-contain"> <img${add_attribute("src", selectedProject?.previewImage, 0)}${add_attribute("alt", `${selectedProject?.name} preview`, 0)} class="absolute z-10 object-contain preview-image-container" style="width: 650px; height:700px; transform: translate(20%, 10%);"></div>  <div class="fixed flex flex-col items-center justify-end space-y-4" style="position: fixed; bottom: 170px; left: 50%; transform: translateX(-200%); z-index: 2;">${selectedProject.twitter ? `<a${add_attribute("href", selectedProject.twitter, 0)} target="_blank" rel="noopener noreferrer" class="block transition hover:opacity-80 relative z-[2]"><svg class="w-6 h-6 pointer-events-auto" width="24" height="24"${add_attribute("fill", selectedProject.backgroundColor, 0)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.8767 0.0963813V0.0931396H13.7207L14.029 0.154732C14.2346 0.194718 14.4213 0.24712 14.589 0.311953C14.7567 0.376787 14.9191 0.452431 15.0759 0.538871C15.2328 0.62531 15.3751 0.713387 15.5028 0.803068C15.6294 0.891679 15.743 0.985688 15.8437 1.08509C15.9432 1.18559 16.0985 1.21152 16.3095 1.16289C16.5205 1.11427 16.7477 1.04673 16.9912 0.960289C17.2346 0.87385 17.4754 0.7766 17.7135 0.668538C17.9515 0.560477 18.0965 0.491866 18.1485 0.462691C18.1993 0.432446 18.2264 0.416238 18.2296 0.414066L18.2328 0.409204L18.2491 0.401099L18.2653 0.392995L18.2815 0.384891L18.2978 0.376787L18.301 0.371924L18.3059 0.368683L18.3108 0.365441L18.314 0.360578L18.3302 0.355716L18.3465 0.352474L18.3432 0.376787L18.3383 0.401099L18.3302 0.425412L18.3221 0.449725L18.314 0.465933L18.3059 0.482141L18.2978 0.506454C18.2924 0.522662 18.287 0.544268 18.2815 0.571288C18.2761 0.598307 18.2247 0.706352 18.1273 0.895456C18.03 1.08456 17.9082 1.27635 17.7621 1.47085C17.6161 1.66536 17.4851 1.8123 17.3694 1.91172C17.2525 2.01222 17.1751 2.08245 17.1373 2.12243C17.0994 2.16349 17.0534 2.2013 16.9993 2.23589L16.9181 2.28938L16.9019 2.29748L16.8857 2.30559L16.8824 2.31045L16.8776 2.31369L16.8727 2.31693L16.8694 2.3218L16.8532 2.3299L16.837 2.338L16.8338 2.34287L16.8289 2.34611L16.824 2.34935L16.8208 2.35421L16.8175 2.35908L16.8126 2.36232L16.8078 2.36556L16.8045 2.37042H16.8857L17.3401 2.27317C17.6431 2.20834 17.9326 2.13 18.2085 2.03815L18.6467 1.89227L18.6954 1.87606L18.7198 1.86796L18.736 1.85986L18.7522 1.85175L18.7685 1.84365L18.7847 1.83554L18.8171 1.83068L18.8496 1.82744V1.85986L18.8415 1.8631L18.8334 1.86796L18.8301 1.87282L18.8253 1.87606L18.8204 1.87931L18.8171 1.88417L18.8139 1.88903L18.809 1.89227L18.8042 1.89551L18.8009 1.90038L18.7977 1.90524L18.7928 1.90848L18.7847 1.92469L18.7766 1.9409L18.7717 1.94414C18.7695 1.94738 18.7008 2.03922 18.5656 2.21968C18.4303 2.40122 18.3573 2.49305 18.3465 2.49523C18.3356 2.49847 18.3205 2.51468 18.301 2.54385C18.2826 2.5741 18.1679 2.69459 17.9569 2.9053C17.7459 3.11601 17.5393 3.30347 17.3369 3.46773C17.1335 3.63306 17.0307 3.8362 17.0285 4.07717C17.0253 4.31705 17.0128 4.58828 16.9912 4.89083C16.9695 5.19339 16.929 5.52025 16.8694 5.87144C16.8099 6.22262 16.718 6.61973 16.5935 7.06276C16.4691 7.50578 16.3176 7.93801 16.1391 8.35943C15.9605 8.78085 15.7739 9.15904 15.5791 9.49402C15.3843 9.829 15.2058 10.1126 15.0435 10.345C14.8812 10.5773 14.7162 10.7961 14.5484 11.0014C14.3807 11.2067 14.1687 11.438 13.9122 11.6951C13.6547 11.9512 13.514 12.0917 13.4902 12.1165C13.4653 12.1403 13.3593 12.2289 13.1721 12.3824C12.986 12.5369 12.7858 12.6914 12.5715 12.8459C12.3584 12.9994 12.1625 13.1274 11.984 13.2301C11.8054 13.3327 11.5901 13.4499 11.338 13.5818C11.087 13.7147 10.8153 13.8379 10.5232 13.9513C10.231 14.0648 9.92265 14.1701 9.59803 14.2674C9.27341 14.3646 8.95962 14.4403 8.65664 14.4943C8.35368 14.5483 8.01012 14.5943 7.62598 14.6321L7.04979 14.6888V14.6969H5.99479V14.6888L5.85682 14.6807C5.76486 14.6753 5.68911 14.6699 5.62959 14.6645C5.57009 14.6591 5.34555 14.6294 4.95601 14.5754C4.56647 14.5213 4.2608 14.4673 4.03897 14.4133C3.81716 14.3592 3.48712 14.2566 3.04889 14.1053C2.61066 13.954 2.23572 13.8011 1.92409 13.6466C1.61355 13.4932 1.41878 13.3959 1.33978 13.3549C1.26187 13.3149 1.17423 13.2652 1.07684 13.2057L0.930764 13.1166L0.927534 13.1117L0.922648 13.1085L0.917779 13.1052L0.914533 13.1004L0.898302 13.0923L0.882071 13.0842L0.878841 13.0793L0.873956 13.0761L0.869086 13.0728L0.86584 13.068L0.86261 13.0631L0.857725 13.0599H0.849609V13.0274L0.86584 13.0307L0.882071 13.0356L0.95511 13.0437C1.0038 13.0491 1.13636 13.0572 1.35277 13.068C1.56919 13.0788 1.79911 13.0788 2.04258 13.068C2.28604 13.0572 2.53492 13.0328 2.78919 12.995C3.04348 12.9572 3.34375 12.8924 3.69001 12.8005C4.03627 12.7087 4.3544 12.5995 4.6444 12.4731C4.9333 12.3456 5.13888 12.2505 5.26117 12.1879C5.38235 12.1263 5.56738 12.0117 5.81625 11.8442L6.18956 11.593L6.1928 11.5881L6.19767 11.5849L6.20256 11.5817L6.20579 11.5768L6.20903 11.5719L6.2139 11.5687L6.21879 11.5655L6.22202 11.5606L6.23825 11.5557L6.25448 11.5525L6.25772 11.5363L6.26259 11.5201L6.26748 11.5168L6.27071 11.512L6.14086 11.5039C6.0543 11.4985 5.97044 11.493 5.88928 11.4877C5.80813 11.4823 5.68099 11.4579 5.50786 11.4147C5.33474 11.3715 5.14809 11.3067 4.9479 11.2202C4.74772 11.1338 4.55295 11.0311 4.36359 10.9123C4.17424 10.7934 4.03735 10.6945 3.95295 10.6156C3.86963 10.5378 3.76142 10.4276 3.62833 10.285C3.49632 10.1413 3.38162 9.99377 3.28424 9.8425C3.18685 9.69122 3.0938 9.51669 3.00508 9.31897L2.87035 9.02397L2.86223 8.99966L2.85412 8.97535L2.84925 8.95914L2.846 8.94293L2.87035 8.94617L2.8947 8.95103L3.07323 8.97535C3.19227 8.99156 3.37893 8.99695 3.6332 8.99156C3.88749 8.98616 4.06332 8.97535 4.1607 8.95914C4.25809 8.94293 4.3176 8.93212 4.33924 8.92672L4.3717 8.91862L4.41228 8.91051L4.45286 8.90241L4.4561 8.89755L4.46097 8.89431L4.46586 8.89106L4.46909 8.8862L4.43662 8.8781L4.40416 8.86999L4.3717 8.86189L4.33924 8.85378L4.30678 8.84568C4.28514 8.84028 4.24728 8.82947 4.19316 8.81326C4.13906 8.79706 3.99299 8.73762 3.75493 8.63497C3.51689 8.53232 3.32752 8.43237 3.18685 8.33512C3.04583 8.23758 2.91137 8.13092 2.78433 8.01581C2.65772 7.89911 2.51869 7.74891 2.36719 7.56522C2.21571 7.38153 2.08046 7.16811 1.96142 6.92498C1.8424 6.68186 1.75313 6.44954 1.69361 6.22802C1.63433 6.0078 1.59522 5.78266 1.57677 5.55537L1.54754 5.215L1.56377 5.21824L1.58 5.2231L1.59623 5.2312L1.61246 5.23931L1.62869 5.24741L1.64492 5.25552L1.8965 5.36898C2.06423 5.44462 2.27252 5.50945 2.52139 5.56348C2.77027 5.6175 2.91904 5.64723 2.96773 5.65262L3.04077 5.66073H3.18685L3.18362 5.65587L3.17873 5.65262L3.17387 5.64938L3.17062 5.64452L3.16739 5.63966L3.1625 5.63642L3.15763 5.63317L3.15439 5.62831L3.13816 5.62021L3.12193 5.6121L3.1187 5.60724L3.11381 5.604L3.10894 5.60076L3.1057 5.59589L3.08947 5.58779L3.07323 5.57969L3.07 5.57482C3.06676 5.57265 3.02022 5.53808 2.9304 5.47109C2.84167 5.40301 2.74862 5.31495 2.65123 5.20689C2.55385 5.09883 2.45646 4.98537 2.35908 4.86652C2.26151 4.74739 2.17461 4.61993 2.09938 4.48562C2.02365 4.35055 1.94357 4.17873 1.85917 3.97019C1.77585 3.76272 1.71255 3.55363 1.66927 3.34293C1.626 3.13222 1.60165 2.92421 1.59623 2.7189C1.59082 2.51359 1.59623 2.338 1.61246 2.19213C1.62869 2.04625 1.66115 1.88146 1.70984 1.69777C1.75854 1.51408 1.82888 1.31958 1.92084 1.11427L2.05881 0.80631L2.06692 0.781997L2.07504 0.757684L2.07992 0.754443L2.08315 0.74958L2.0864 0.744718L2.09127 0.741476L2.09615 0.744718L2.09938 0.74958L2.10263 0.754443L2.1075 0.757684L2.11238 0.760926L2.11561 0.765789L2.11886 0.770651L2.12373 0.773893L2.13185 0.790101L2.13996 0.80631L2.14485 0.809551L2.14808 0.814414L2.36719 1.05754C2.51327 1.21962 2.6864 1.40062 2.88658 1.60052C3.08677 1.80042 3.19768 1.90415 3.21931 1.91172C3.24096 1.92036 3.268 1.94521 3.30047 1.98628C3.33293 2.02627 3.44114 2.1219 3.62508 2.27317C3.80904 2.42444 4.0498 2.60005 4.34736 2.79994C4.64493 2.99984 4.97495 3.19705 5.33744 3.39155C5.69994 3.58605 6.08948 3.76164 6.50606 3.91832C6.92265 4.07501 7.21481 4.17766 7.38252 4.22628C7.55025 4.27491 7.83699 4.33704 8.24276 4.41268C8.64853 4.48833 8.95422 4.53695 9.1598 4.55856C9.36539 4.58016 9.50607 4.59259 9.5818 4.59584L9.69542 4.59908L9.69219 4.57476L9.6873 4.55045L9.65484 4.34785C9.6332 4.21278 9.62238 4.02368 9.62238 3.78055C9.62238 3.53743 9.64132 3.31322 9.67919 3.1079C9.71707 2.90259 9.77388 2.69459 9.84961 2.48388C9.92536 2.27317 9.99949 2.10405 10.072 1.97656C10.1456 1.85013 10.2419 1.70588 10.3609 1.54379C10.4799 1.38171 10.6341 1.21423 10.8235 1.04133C11.0128 0.868436 11.2292 0.714457 11.4727 0.579392C11.7162 0.444327 11.9407 0.341663 12.1463 0.271432C12.3519 0.201201 12.525 0.155266 12.6657 0.133661C12.8063 0.112055 12.8767 0.099623 12.8767 0.0963813Z"></path></svg></a>` : ``} ${selectedProject.github ? `<a${add_attribute("href", selectedProject.github, 0)} target="_blank" rel="noopener noreferrer" class="block transition hover:opacity-80 relative z-[2]"><svg class="w-6 h-6 pointer-events-auto" width="24" height="24"${add_attribute("fill", selectedProject.backgroundColor, 0)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.5 0C4.5305 0 0.5 4.02975 0.5 9C0.5 12.9765 3.0785 16.35 6.65525 17.5402C7.1045 17.6235 7.25 17.3445 7.25 17.1075V15.432C4.7465 15.9765 4.22525 14.37 4.22525 14.37C3.81575 13.3298 3.2255 13.053 3.2255 13.053C2.40875 12.4942 3.28775 12.5062 3.28775 12.5062C4.1915 12.5692 4.667 13.434 4.667 13.434C5.4695 14.8095 6.77225 14.412 7.286 14.1818C7.36625 13.6005 7.5995 13.203 7.8575 12.9788C5.85875 12.75 3.75725 11.9782 3.75725 8.5305C3.75725 7.54725 4.109 6.74475 4.68425 6.11475C4.59125 5.8875 4.283 4.97175 4.772 3.73275C4.772 3.73275 5.528 3.49125 7.24775 4.65525C7.9655 4.45575 8.735 4.356 9.5 4.35225C10.265 4.356 11.0352 4.45575 11.7545 4.65525C13.4727 3.49125 14.2272 3.73275 14.2272 3.73275C14.717 4.9725 14.4087 5.88825 14.3158 6.11475C14.8932 6.74475 15.242 7.548 15.242 8.5305C15.242 11.9872 13.1368 12.7485 11.1327 12.9713C11.4552 13.2502 11.75 13.7978 11.75 14.6378V17.1075C11.75 17.3468 11.894 17.628 12.3507 17.5395C15.9245 16.3477 18.5 12.975 18.5 9C18.5 4.02975 14.4703 0 9.5 0Z"></path></svg></a>` : ``}</div></div>` : ``}</main>  ${validate_component(Icons_row, "IconsRow").$$render($$result, { projects, selectProject }, {}, {})}`;
    }
  })}`;
});
const css$2 = {
  code: 'h1.svelte-1v10eld{font-family:"Inter", sans-serif}p.svelte-1v10eld{font-family:"Inter", sans-serif;font-size:16px;line-height:25px;font-weight:300}.container.svelte-1v10eld{max-width:1500px;margin:0 auto}',
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Layout from \\"../Layout.svelte\\";\\nexport let missionText = \\"At Waterway Labs, we are committed to pioneering the next generation of decentralized solutions. Our mission is to create secure, innovative, and user-friendly blockchain products that empower individuals and businesses. We believe in a future where technology fosters transparency, freedom, and collaboration, allowing everyone to participate in the decentralized economy.\\";\\nexport let visionText = \\"To become a global leader in decentralized technology, enabling a more transparent, secure, and open digital ecosystem. We envision a world where individuals have complete control over their digital assets, identities, and privacy.\\";\\nexport let valuesText = `\\n    <strong style=\\"font-weight: 700;\\">Innovation:</strong> Constantly pushing the boundaries of what’s possible in decentralized technology.<br>\\n    <strong style=\\"font-weight: 700;\\">Transparency:</strong> Upholding openness in our processes, products, and communication.<br>\\n    <strong style=\\"font-weight: 700;\\">Empowerment:</strong> Giving users the tools and freedom to control their digital presence.<br>\\n    <strong style=\\"font-weight: 700;\\">Security:</strong> Prioritizing the highest standards of safety and reliability in every solution we build.\\n    `;\\nexport let journeyText = \\"Founded with a vision to challenge centralized norms, Waterway Labs started with a small team passionate about decentralization. Over the years, we have grown into a trusted name in blockchain innovation, known for our contributions to various web3 products and decentralized applications.\\";\\nexport let goalsText = \\"Looking ahead, Waterway Labs aims to broaden the accessibility of decentralized technologies, fostering an inclusive ecosystem for developers, businesses, and end-users alike. We are focused on pushing innovation further, partnering with like-minded communities to build the foundation of the next digital era.\\";\\n<\/script>\\n\\n<Layout overrideBackground={true}>\\n<div class=\\"bg-[#272727] text-white\\">\\n  <!-- Hero Section -->\\n    <div class=\\"container flex flex-col items-center justify-center py-20 lg:flex-row lg:px-20 lg:justify-between\\">\\n        <!-- Left side: Heading -->\\n        <div class=\\"text-center lg:w-1/2 lg:text-left\\"style=\\"margin-top: 25px;\\">\\n            <span class=\\"px-3 py-1 translate-y-4 text-xs text-[#272727] bg-white font-semi rounded-full\\">OUR MISSION</span>\\n            <h1 class=\\"mt-2 mb-0 text-5xl leading-tight font-semi font-mona font-h2\\">\\n                EMPOWERING <br> DECENTRALIZED <br> INNOVATION\\n            </h1>\\n        </div>\\n        <!-- Right side: Mission Text -->\\n        <div class=\\"lg:w-1/2 lg:mt-0 lg:pl-12\\">\\n            <p class=\\"font-light font-body font-inter\\" style=\\"margin-top: 110px;\\">\\n                {missionText}\\n            </p>\\n        </div>\\n    </div>\\n\\n    <hr class=\\"my-8 border-t-2 border-[#4E4E4E] mx-auto\\" style=\\"margin-top: -35px; margin-bottom: 70px; width: 1375px;\\"/>\\n  <!-- Image Section -->\\n    <div class=\\"mx-auto lg:w-4/5\\" style=\\"margin-top: 15px;\\">\\n        <img src=\\"about-page.png\\" alt=\\"Waterway Labs Mission Image\\" class=\\"h-auto rounded-lg\\" style=\\"width:2600px;\\">\\n    </div>\\n\\n    <hr class=\\"my-8 border-t-2 border-[#4E4E4E] mx-auto\\" style=\\"margin-top: 75px; margin-bottom: 20px; width: 1375px;\\"/>\\n  <!-- Vision Section -->\\n    <div class=\\"container flex flex-col items-center justify-center px-8 py-10 lg:flex-row lg:justify-between\\">\\n        <!-- Left side: Heading -->\\n        <div class=\\" lg:w-1/2 lg:text-left\\"style=\\"margin-top: -80px;\\">\\n            <h1 class=\\"mt-10 text-3xl ml-14 font-semi font-mona font-h3\\">\\n                VISION\\n            </h1>\\n        </div>\\n        <!-- Right side: Vision Text -->\\n        <div class=\\"lg:w-1/2 lg:mt-0 lg:pl-12\\">\\n            <p class=\\"mr-8 font-light font-body font-inter\\" style=\\"margin-top: -6px;\\">\\n                {visionText}\\n            </p>\\n        </div>\\n    </div>\\n    <hr class=\\"my-8 border-t-2 border-[#4E4E4E] mx-auto\\" style=\\"margin-top: 75px; margin-bottom: 20px; width: 1375px;\\"/>\\n  <!-- Values Section -->\\n<div class=\\"container flex flex-col items-center justify-center px-8 py-10 lg:flex-row lg:justify-between\\">\\n    <!-- Left side: Heading -->\\n    <div class=\\" lg:w-1/2 lg:text-left\\"style=\\"margin-top: -80px;\\">\\n        <h1 class=\\"mt-10 text-3xl ml-14 font-semi font-mona font-h3\\">\\n            VALUES\\n        </h1>\\n    </div>\\n    <!-- Right side: Vision Text -->\\n    <div class=\\"lg:w-1/2 lg:mt-0 lg:pl-12\\">\\n        <p class=\\"mr-8 font-light font-body font-inter\\" style=\\"margin-top: -6px;\\" bind:innerHTML={valuesText} contenteditable=\\"false\\"></p>\\n    </div>\\n</div>\\n<hr class=\\"my-8 border-t-2 border-[#4E4E4E] mx-auto\\" style=\\"margin-top: 45px; margin-bottom: 20px; width: 1375px;\\"/>\\n\\n  <!-- Journey Section -->\\n<div class=\\"container flex flex-col items-center justify-center px-8 py-10 lg:flex-row lg:justify-between\\">\\n    <!-- Left side: Heading -->\\n    <div class=\\" lg:w-1/2 lg:text-left\\"style=\\"margin-top: -80px;\\">\\n        <h1 class=\\"mt-10 text-3xl ml-14 font-semi font-mona font-h3\\">\\n            OUR JOURNEY\\n        </h1>\\n    </div>\\n    <!-- Right side: Vision Text -->\\n    <div class=\\"lg:w-1/2 lg:mt-0 lg:pl-12\\">\\n        <p class=\\"mr-8 font-light font-body font-inter\\" style=\\"margin-top: -6px;\\">\\n            {journeyText}\\n        </p>\\n    </div>\\n</div>\\n<hr class=\\"my-8 border-t-2 border-[#4E4E4E] mx-auto\\" style=\\"margin-top: 75px; margin-bottom: 20px; width: 1375px;\\"/>\\n\\n  <!-- Future Goals Section -->\\n  <div class=\\"container flex flex-col items-center justify-center px-8 py-10 lg:flex-row lg:justify-between\\">\\n    <!-- Left side: Heading -->\\n    <div class=\\" lg:w-1/2 lg:text-left\\"style=\\"margin-top: -80px;\\">\\n        <h1 class=\\"mt-10 text-3xl ml-14 font-semi font-mona font-h3\\">\\n            FUTURE GOALS\\n        </h1>\\n    </div>\\n    <!-- Right side: Vision Text -->\\n    <div class=\\"lg:w-1/2 lg:mt-0 lg:pl-12\\">\\n        <p class=\\"mr-8 font-light font-body font-inter\\" style=\\"margin-top: -6px;\\">\\n            {goalsText}\\n        </p>\\n    </div>\\n</div>\\n</div>\\n</Layout>\\n\\n<style>\\n  h1, h2 {\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n  p {\\n    font-family: \\"Inter\\", sans-serif;\\n    font-size: 16px;\\n    line-height: 25px;\\n    font-weight: 300;\\n  }\\n  p strong {\\n    font-weight: 1000; /* Make bold text inside <p> have a font weight of 700 */\\n  }\\n  .container {\\n    max-width: 1500px; /* Set the maximum width for the page content */\\n    margin: 0 auto; /* Center the content */\\n  }</style>"],"names":[],"mappings":"AA0GE,iBAAO,CACL,WAAW,CAAE,OAAO,CAAC,CAAC,UACxB,CACA,gBAAE,CACA,WAAW,CAAE,OAAO,CAAC,CAAC,UAAU,CAChC,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,WAAW,CAAE,GACf,CAIA,yBAAW,CACT,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,CAAC,CAAC,IACZ"}'
};
const Page$4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { missionText = "At Waterway Labs, we are committed to pioneering the next generation of decentralized solutions. Our mission is to create secure, innovative, and user-friendly blockchain products that empower individuals and businesses. We believe in a future where technology fosters transparency, freedom, and collaboration, allowing everyone to participate in the decentralized economy." } = $$props;
  let { visionText = "To become a global leader in decentralized technology, enabling a more transparent, secure, and open digital ecosystem. We envision a world where individuals have complete control over their digital assets, identities, and privacy." } = $$props;
  let { valuesText = `
    <strong style="font-weight: 700;">Innovation:</strong> Constantly pushing the boundaries of what’s possible in decentralized technology.<br>
    <strong style="font-weight: 700;">Transparency:</strong> Upholding openness in our processes, products, and communication.<br>
    <strong style="font-weight: 700;">Empowerment:</strong> Giving users the tools and freedom to control their digital presence.<br>
    <strong style="font-weight: 700;">Security:</strong> Prioritizing the highest standards of safety and reliability in every solution we build.
    ` } = $$props;
  let { journeyText = "Founded with a vision to challenge centralized norms, Waterway Labs started with a small team passionate about decentralization. Over the years, we have grown into a trusted name in blockchain innovation, known for our contributions to various web3 products and decentralized applications." } = $$props;
  let { goalsText = "Looking ahead, Waterway Labs aims to broaden the accessibility of decentralized technologies, fostering an inclusive ecosystem for developers, businesses, and end-users alike. We are focused on pushing innovation further, partnering with like-minded communities to build the foundation of the next digital era." } = $$props;
  if ($$props.missionText === void 0 && $$bindings.missionText && missionText !== void 0) $$bindings.missionText(missionText);
  if ($$props.visionText === void 0 && $$bindings.visionText && visionText !== void 0) $$bindings.visionText(visionText);
  if ($$props.valuesText === void 0 && $$bindings.valuesText && valuesText !== void 0) $$bindings.valuesText(valuesText);
  if ($$props.journeyText === void 0 && $$bindings.journeyText && journeyText !== void 0) $$bindings.journeyText(journeyText);
  if ($$props.goalsText === void 0 && $$bindings.goalsText && goalsText !== void 0) $$bindings.goalsText(goalsText);
  $$result.css.add(css$2);
  return `${validate_component(Layout, "Layout").$$render($$result, { overrideBackground: true }, {}, {
    default: () => {
      return `<div class="bg-[#272727] text-white"> <div class="container flex flex-col items-center justify-center py-20 lg:flex-row lg:px-20 lg:justify-between svelte-1v10eld"> <div class="text-center lg:w-1/2 lg:text-left" style="margin-top: 25px;" data-svelte-h="svelte-1w3kcr1"><span class="px-3 py-1 translate-y-4 text-xs text-[#272727] bg-white font-semi rounded-full">OUR MISSION</span> <h1 class="mt-2 mb-0 text-5xl leading-tight font-semi font-mona font-h2 svelte-1v10eld">EMPOWERING <br> DECENTRALIZED <br> INNOVATION</h1></div>  <div class="lg:w-1/2 lg:mt-0 lg:pl-12"><p class="font-light font-body font-inter svelte-1v10eld" style="margin-top: 110px;">${escape(missionText)}</p></div></div> <hr class="my-8 border-t-2 border-[#4E4E4E] mx-auto" style="margin-top: -35px; margin-bottom: 70px; width: 1375px;">  <div class="mx-auto lg:w-4/5" style="margin-top: 15px;" data-svelte-h="svelte-1y8dz62"><img src="about-page.png" alt="Waterway Labs Mission Image" class="h-auto rounded-lg" style="width:2600px;"></div> <hr class="my-8 border-t-2 border-[#4E4E4E] mx-auto" style="margin-top: 75px; margin-bottom: 20px; width: 1375px;">  <div class="container flex flex-col items-center justify-center px-8 py-10 lg:flex-row lg:justify-between svelte-1v10eld"> <div class="lg:w-1/2 lg:text-left" style="margin-top: -80px;" data-svelte-h="svelte-2apedd"><h1 class="mt-10 text-3xl ml-14 font-semi font-mona font-h3 svelte-1v10eld">VISION</h1></div>  <div class="lg:w-1/2 lg:mt-0 lg:pl-12"><p class="mr-8 font-light font-body font-inter svelte-1v10eld" style="margin-top: -6px;">${escape(visionText)}</p></div></div> <hr class="my-8 border-t-2 border-[#4E4E4E] mx-auto" style="margin-top: 75px; margin-bottom: 20px; width: 1375px;">  <div class="container flex flex-col items-center justify-center px-8 py-10 lg:flex-row lg:justify-between svelte-1v10eld"> <div class="lg:w-1/2 lg:text-left" style="margin-top: -80px;" data-svelte-h="svelte-auzyq7"><h1 class="mt-10 text-3xl ml-14 font-semi font-mona font-h3 svelte-1v10eld">VALUES</h1></div>  <div class="lg:w-1/2 lg:mt-0 lg:pl-12"><p class="mr-8 font-light font-body font-inter svelte-1v10eld" style="margin-top: -6px;" contenteditable="false">${/* @__PURE__ */ (($$value) => $$value === void 0 ? `` : $$value)(valuesText)}</p></div></div> <hr class="my-8 border-t-2 border-[#4E4E4E] mx-auto" style="margin-top: 45px; margin-bottom: 20px; width: 1375px;">  <div class="container flex flex-col items-center justify-center px-8 py-10 lg:flex-row lg:justify-between svelte-1v10eld"> <div class="lg:w-1/2 lg:text-left" style="margin-top: -80px;" data-svelte-h="svelte-hrybv9"><h1 class="mt-10 text-3xl ml-14 font-semi font-mona font-h3 svelte-1v10eld">OUR JOURNEY</h1></div>  <div class="lg:w-1/2 lg:mt-0 lg:pl-12"><p class="mr-8 font-light font-body font-inter svelte-1v10eld" style="margin-top: -6px;">${escape(journeyText)}</p></div></div> <hr class="my-8 border-t-2 border-[#4E4E4E] mx-auto" style="margin-top: 75px; margin-bottom: 20px; width: 1375px;">  <div class="container flex flex-col items-center justify-center px-8 py-10 lg:flex-row lg:justify-between svelte-1v10eld"> <div class="lg:w-1/2 lg:text-left" style="margin-top: -80px;" data-svelte-h="svelte-3qls38"><h1 class="mt-10 text-3xl ml-14 font-semi font-mona font-h3 svelte-1v10eld">FUTURE GOALS</h1></div>  <div class="lg:w-1/2 lg:mt-0 lg:pl-12"><p class="mr-8 font-light font-body font-inter svelte-1v10eld" style="margin-top: -6px;">${escape(goalsText)}</p></div></div></div>`;
    }
  })}`;
});
const css$1 = {
  code: ".local-spinner.svelte-pvdm52{border:5px solid rgba(255, 255, 255, 0.3);border-top:5px solid white;border-radius:50%;width:50px;height:50px;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);animation:svelte-pvdm52-spin 1s linear infinite}@keyframes svelte-pvdm52-spin{0%{transform:translate(-50%, -50%) rotate(0deg)}100%{transform:translate(-50%, -50%) rotate(360deg)}}",
  map: '{"version":3,"file":"local-spinner.svelte","sources":["local-spinner.svelte"],"sourcesContent":["<div class=\\"local-spinner\\" />\\n\\n<style>\\n  .local-spinner {\\n    border: 5px solid rgba(255, 255, 255, 0.3);\\n    border-top: 5px solid white;\\n    border-radius: 50%;\\n    width: 50px;\\n    height: 50px;\\n    position: absolute;\\n    top: 50%;\\n    left: 50%;\\n    transform: translate(-50%, -50%);\\n    animation: spin 1s linear infinite;\\n  }\\n\\n  @keyframes spin {\\n    0% {\\n      transform: translate(-50%, -50%) rotate(0deg);\\n    }\\n    100% {\\n      transform: translate(-50%, -50%) rotate(360deg);\\n    }\\n  }</style>"],"names":[],"mappings":"AAGE,4BAAe,CACb,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAC1C,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAC3B,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAChC,SAAS,CAAE,kBAAI,CAAC,EAAE,CAAC,MAAM,CAAC,QAC5B,CAEA,WAAW,kBAAK,CACd,EAAG,CACD,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,OAAO,IAAI,CAC9C,CACA,IAAK,CACH,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,OAAO,MAAM,CAChD,CACF"}'
};
const Local_spinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="local-spinner svelte-pvdm52"></div>`;
});
const idlFactory = ({ IDL }) => {
  return IDL.Service({
    "submitForm": IDL.Func(
      [
        IDL.Record({
          "name": IDL.Text,
          "email": IDL.Text,
          "message": IDL.Text
        })
      ],
      [IDL.Text],
      []
    )
  });
};
const canisterId = "br5f7-7uaaa-aaaaa-qaaca-cai";
const createActor = (canisterId2, options2 = {}) => {
  const agent = options2.agent || new HttpAgent({ ...options2.agentOptions });
  if (options2.agent && options2.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }
  {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }
  return Actor.createActor(idlFactory, {
    agent,
    canisterId: canisterId2,
    ...options2.actorOptions
  });
};
createActor(canisterId);
BigInt(
  60 * 60 * 1e3 * 1e3 * 1e3 * 24 * 14
);
const Canisters = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${`${validate_component(Local_spinner, "LocalSpinner").$$render($$result, {}, {}, {})}`}`;
});
const Page$3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Canisters, "Canisters").$$render($$result, {}, {}, {})}`;
});
const Page$2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let name = "";
  let email = "";
  return `${validate_component(Layout, "Layout").$$render($$result, { overrideBackground: true }, {}, {
    default: () => {
      return `<main class="min-h-screen px-4 py-12 text-white bg-[#272727] sm:px-6 lg:px-8"><div class="max-w-6xl mx-auto"><div class="flex flex-col items-center mb-20 translate-y-12 md:flex-row md:items-start" data-svelte-h="svelte-3cf1yn"><div class="md:w-1/2"><span class="px-3 py-1 text-xs text-[#272727] bg-white font-semi rounded-full">CONTACT US</span> <h1 class="mt-2 mb-0 text-5xl leading-tight font-semi font-mona font-h2">WE&#39;D LOVE TO <br> HEAR FROM YOU!</h1></div> <div class="md:w-1/2"><p class="font-light font-body font-inter" style="margin-top: 30px;">At Waterway Labs, your feedback is important to us! Whether you have a question, a suggestion, or simply want to share your experience, we&#39;re all ears. Our goal is to make sure you have the best possible experience, and your input helps us get there.

                        Feel free to send us a message, and we&#39;ll get back to you as soon as possible.</p></div></div>  <div class="mb-12 border-t-2 border-[#4E4E4E] mx-auto"></div> <div class="flex flex-col items-start gap-8 md:flex-row"> <div class="w-full md:w-1/2"><h2 class="mb-6 text-2xl font-med font-mona" data-svelte-h="svelte-1clup7e">Send us a message</h2> <form method="POST" class="space-y-6"><div><label for="name" class="block mb-2 text-sm font-medium text-gray-300" data-svelte-h="svelte-kzldna">Name</label> <input type="text" id="name" name="name" required class="w-full p-3 text-gray-900 transition bg-gray-100 rounded-md font-inter focus:ring-2 focus:ring-blue-500 focus:outline-none"${add_attribute("value", name, 0)}></div> <div><label for="email" class="block mb-2 text-sm font-medium text-gray-300" data-svelte-h="svelte-8jbhn4">Email</label> <input type="email" id="email" name="email" required class="w-full p-3 text-gray-900 transition bg-gray-100 rounded-md font-inter focus:ring-2 focus:ring-blue-500 focus:outline-none"${add_attribute("value", email, 0)}></div> <div><label for="message" class="block mb-2 text-sm font-medium text-gray-300" data-svelte-h="svelte-1k6yko4">Message</label> <textarea id="message" name="message" required class="w-full p-3 text-gray-900 transition bg-gray-100 rounded-md font-inter focus:ring-2 focus:ring-blue-500 focus:outline-none" rows="5">${escape("")}</textarea></div> <button type="submit" class="w-full px-4 py-3 font-medium text-white transition duration-150 ease-in-out bg-blue-600 rounded-md font-inter hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" data-svelte-h="svelte-1ezckat">Send Message</button></form> ${``}</div>  <div class="w-full md:w-1/2" data-svelte-h="svelte-1duoh4a"><h2 class="mb-6 text-2xl font-med font-mona">Contact Information</h2> <div class="relative bg-[#272727] rounded-lg p-6 overflow-hidden mt-6"> <div class="absolute w-64 h-64 bg-[rgba(79,168,246,0.2)] filter blur-[240px] top-[10%] left-[25%]"></div>  <div class="absolute w-60 h-60 bg-[rgba(244,223,253,0.2)] filter blur-[320px] bottom-[20%] right-[30%]"></div> <div class="relative z-10"><p class="mb-2 text-lg font-inter">Email:</p> <a href="mailto:hello@waterwaylabs.xyz" class="text-blue-400 transition hover:text-blue-300 font-inter">hello@waterwaylabs.xyz</a></div></div></div></div></div></main>`;
    }
  })}`;
});
var define_process_env_default = { __CANDID_UI_CANISTER_ID: "b77ix-eeaaa-aaaaa-qaada-cai", BACKEND_CANISTER_ID: "br5f7-7uaaa-aaaaa-qaaca-cai", FRONTEND_CANISTER_ID: "bw4dl-smaaa-aaaaa-qaacq-cai", DFX_NETWORK: "local" };
const CANISTER_ID = define_process_env_default.BACKEND_CANISTER_ID;
const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    if (!name || !email || !message) {
      return fail(400, { error: "All fields are required" });
    }
    try {
      console.log("Creating HttpAgent");
      const agent = new HttpAgent({ host: "http://localhost:8080" });
      console.log("Fetching root key");
      await agent.fetchRootKey();
      console.log("Creating actor");
      const actor = Actor.createActor(idlFactory, {
        agent,
        canisterId: CANISTER_ID
      });
      console.log("Calling submitForm");
      const result = await actor.submitForm({
        name: String(name),
        email: String(email),
        message: String(message)
      });
      console.log("Form submitted to canister:", result);
      return { success: true, message: result };
    } catch (error) {
      console.error("Detailed error:", error);
      if (error instanceof Error) {
        console.error("Stack:", error.stack);
      }
      return fail(500, { error: "Failed to submit form" });
    }
  }
};
const Page$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
const css = {
  code: 'p.svelte-9r0sum{font-family:"Inter", sans-serif}p.svelte-9r0sum{font-size:16px;line-height:1.5}.grid.svelte-9r0sum{gap:24px}img.svelte-9r0sum{transition:transform 0.3s ease-in-out}img.svelte-9r0sum:hover{transform:scale(1.05)}',
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport { isLoading } from \\"$lib/stores/global-stores\\";\\nimport Layout from \\"../Layout.svelte\\";\\nconst teamMembers = [\\n    { name: \\"Zoe Duffy\\", title: \\"Managing Director\\", image: \\"zoe.jpg\\", bio: \\"Zoe runs many tech companies through her management consultancy, providing expert advice to ensure compliance with various legal frameworks.\\" },\\n    { name: \\"Kelly Howlett\\", title: \\"Head of Operations\\", image: \\"kelly.jpeg\\", bio: \\"Kelly ensures the day-to-day operation of Waterway Labs on all things water. Kelly has the experience required to ensure anything can be done in a safe and secure manner.\\" },\\n    { name: \\"James Beadle\\", title: \\"Development Manager\\", image: \\"james.jpg\\", bio: \\"James ensures the delivery of all Waterway Labs Projects.\\" },\\n    { name: \\"Dfinity Designer\\", title: \\"Head of Design\\", image: \\"dfd.jpg\\", bio: \\"DfinityDesigner is a talented UI/UX designer that has put his stamp on various blockchain projects. He is known for high-quality, brilliant branding.\\" },\\n    { name: \\"Thilly Thana\\", title: \\"Lead Developer\\", image: \\"thilly.jpg\\", bio: \\"Thilly is a computer science graduate with a passion for frontend development. Thilly brings DfinityDesigner’s designs to life using his expert Svelte skills.\\" },\\n    { name: \\"George Robinson\\", title: \\"Community Manager\\", image: \\"george.jpg\\", bio: \\"George builds relationships with community members through any channel with users receptive to the Internet Computer’s message.\\" },\\n    { name: \\"Josh Wray\\", title: \\"Head of Promotion\\", image: \\"josh.jpg\\", bio: \\"Josh ensures our team has the relationships in place to foster a co-operative, results-driven ecosystem.\\" },\\n    { name: \\"Ashutosh Yadav\\", title: \\"Media Production Manager\\", image: \\"ashutosh.jpg\\", bio: \\"Ashutosh delivers high-quality rendered content at lightning speed. When we need to take our message to the next level, he is always required.\\" },\\n];\\nonMount(async () => {\\n    try {\\n        // Your existing logic\\n    }\\n    catch (error) {\\n        console.error(\\"Error fetching homepage data:\\", error);\\n    }\\n    finally {\\n        isLoading.set(false);\\n    }\\n});\\n<\/script>\\n\\n<Layout overrideBackground={true}>\\n\\n<!-- Team Section -->\\n<section class=\\"bg-[#272727] text-white py-16 px-8\\">\\n  <div class=\\"max-w-screen-xl mx-auto\\">\\n    <div class=\\"container flex flex-col items-center justify-center py-5 lg:flex-row lg:px-10 lg:justify-between\\" style=\\"transform: translateX(-4%);\\">\\n      <!-- Left side: Heading -->\\n      <div class=\\"text-center lg:w-1/2 lg:text-left\\"style=\\"margin-top: 20px;\\">\\n          <span class=\\"px-3 py-1 translate-y-4 text-xs text-[#272727] bg-white font-semi rounded-full\\">THE TEAM</span>\\n          <h1 class=\\"mt-2 text-6xl leading-tight font-med font-mona font-h2\\">\\n            A TEAM OF <br> WEB3 EXPERTS\\n          </h1>\\n      </div>\\n      <!-- Right side: Mission Text -->\\n      <div class=\\"mx-auto mt-2 lg:w-3/5 lg:mt-4 lg:pl-12\\">\\n          <p class=\\"font-light font-body font-inter\\" style=\\"margin-top: 25px; transform: translateX(10%);\\">\\n            At Waterway Labs, we are passionate about building innovative Web3 products that champion decentralization. Our team is dedicated to developing cutting-edge solutions that empower users, offering transparency, security, and freedom. With a shared belief in the transformative potential of blockchain technology, we are committed to pushing the boundaries of what’s possible in decentralized applications, fostering an open and collaborative ecosystem.          </p>\\n      </div>\\n    </div>\\n\\n    <hr class=\\"my-8 border-t-2 border-[#4E4E4E] mx-auto\\" style=\\"transform: translateX(-2%); margin-top: 15px; margin-bottom: 50px; width: 1360px;\\"/>\\n\\n    <div class=\\"grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4\\" style= \\"margin-top: -20px;\\">\\n      {#each teamMembers as member}\\n        <div class=\\"p-6\\" style=\\"transform: translateX(-15%);\\">\\n          <div class=\\"mx-auto mb-6 overflow-hidden w-80 h-80\\">\\n            <img src={`team/${member.image}`} alt={member.name} class=\\"object-cover w-full h-full\\" />\\n          </div>\\n          <span class=\\"px-3 py-1 translate-y-4 mb-6 text-xs text-[#272727] bg-white font-semi rounded-full\\">{member.title}</span>\\n          <h3 class=\\"mt-2 mb-4 text-2xl font-mona font-med\\">{member.name}</h3>\\n          <p class=\\"text-sm font-light font-inter\\">{member.bio}</p>\\n        </div>\\n      {/each}\\n    </div>\\n  </div>\\n</section>\\n\\n</Layout>\\n\\n<style>\\n  h2, p {\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  h2 {\\n    font-size: 24px;\\n    font-weight: bold;\\n  }\\n\\n  p {\\n    font-size: 16px;\\n    line-height: 1.5;\\n  }\\n\\n  /* Adjusts the grid for team members */\\n  .grid {\\n    gap: 24px;\\n  }\\n\\n  .bg-gray-800 {\\n    background-color: #1F1F1F;\\n  }\\n\\n  .text-blue-400 {\\n    color: #61dafb;\\n  }\\n\\n  img {\\n    transition: transform 0.3s ease-in-out;\\n  }\\n\\n  img:hover {\\n    transform: scale(1.05);\\n  }</style>"],"names":[],"mappings":"AAkEM,eAAE,CACJ,WAAW,CAAE,OAAO,CAAC,CAAC,UACxB,CAOA,eAAE,CACA,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GACf,CAGA,mBAAM,CACJ,GAAG,CAAE,IACP,CAUA,iBAAI,CACF,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,WAC7B,CAEA,iBAAG,MAAO,CACR,SAAS,CAAE,MAAM,IAAI,CACvB"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const teamMembers = [
    {
      name: "Zoe Duffy",
      title: "Managing Director",
      image: "zoe.jpg",
      bio: "Zoe runs many tech companies through her management consultancy, providing expert advice to ensure compliance with various legal frameworks."
    },
    {
      name: "Kelly Howlett",
      title: "Head of Operations",
      image: "kelly.jpeg",
      bio: "Kelly ensures the day-to-day operation of Waterway Labs on all things water. Kelly has the experience required to ensure anything can be done in a safe and secure manner."
    },
    {
      name: "James Beadle",
      title: "Development Manager",
      image: "james.jpg",
      bio: "James ensures the delivery of all Waterway Labs Projects."
    },
    {
      name: "Dfinity Designer",
      title: "Head of Design",
      image: "dfd.jpg",
      bio: "DfinityDesigner is a talented UI/UX designer that has put his stamp on various blockchain projects. He is known for high-quality, brilliant branding."
    },
    {
      name: "Thilly Thana",
      title: "Lead Developer",
      image: "thilly.jpg",
      bio: "Thilly is a computer science graduate with a passion for frontend development. Thilly brings DfinityDesigner’s designs to life using his expert Svelte skills."
    },
    {
      name: "George Robinson",
      title: "Community Manager",
      image: "george.jpg",
      bio: "George builds relationships with community members through any channel with users receptive to the Internet Computer’s message."
    },
    {
      name: "Josh Wray",
      title: "Head of Promotion",
      image: "josh.jpg",
      bio: "Josh ensures our team has the relationships in place to foster a co-operative, results-driven ecosystem."
    },
    {
      name: "Ashutosh Yadav",
      title: "Media Production Manager",
      image: "ashutosh.jpg",
      bio: "Ashutosh delivers high-quality rendered content at lightning speed. When we need to take our message to the next level, he is always required."
    }
  ];
  $$result.css.add(css);
  return `${validate_component(Layout, "Layout").$$render($$result, { overrideBackground: true }, {}, {
    default: () => {
      return ` <section class="bg-[#272727] text-white py-16 px-8"><div class="max-w-screen-xl mx-auto"><div class="container flex flex-col items-center justify-center py-5 lg:flex-row lg:px-10 lg:justify-between" style="transform: translateX(-4%);" data-svelte-h="svelte-xng2bj"> <div class="text-center lg:w-1/2 lg:text-left" style="margin-top: 20px;"><span class="px-3 py-1 translate-y-4 text-xs text-[#272727] bg-white font-semi rounded-full">THE TEAM</span> <h1 class="mt-2 text-6xl leading-tight font-med font-mona font-h2">A TEAM OF <br> WEB3 EXPERTS</h1></div>  <div class="mx-auto mt-2 lg:w-3/5 lg:mt-4 lg:pl-12"><p class="font-light font-body font-inter svelte-9r0sum" style="margin-top: 25px; transform: translateX(10%);">At Waterway Labs, we are passionate about building innovative Web3 products that champion decentralization. Our team is dedicated to developing cutting-edge solutions that empower users, offering transparency, security, and freedom. With a shared belief in the transformative potential of blockchain technology, we are committed to pushing the boundaries of what’s possible in decentralized applications, fostering an open and collaborative ecosystem.</p></div></div> <hr class="my-8 border-t-2 border-[#4E4E4E] mx-auto" style="transform: translateX(-2%); margin-top: 15px; margin-bottom: 50px; width: 1360px;"> <div class="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4 svelte-9r0sum" style="margin-top: -20px;">${each(teamMembers, (member) => {
        return `<div class="p-6" style="transform: translateX(-15%);"><div class="mx-auto mb-6 overflow-hidden w-80 h-80"><img${add_attribute("src", `team/${member.image}`, 0)}${add_attribute("alt", member.name, 0)} class="object-cover w-full h-full svelte-9r0sum"></div> <span class="px-3 py-1 translate-y-4 mb-6 text-xs text-[#272727] bg-white font-semi rounded-full">${escape(member.title)}</span> <h3 class="mt-2 mb-4 text-2xl font-mona font-med">${escape(member.name)}</h3> <p class="text-sm font-light font-inter svelte-9r0sum">${escape(member.bio)}</p> </div>`;
      })}</div></div></section>`;
    }
  })}`;
});
export {
  Error$1 as E,
  Layout$1 as L,
  Page$5 as P,
  Server as S,
  set_building as a,
  set_manifest as b,
  set_prerendering as c,
  set_private_env as d,
  set_public_env as e,
  set_read_implementation as f,
  get_hooks as g,
  set_safe_public_env as h,
  Page$4 as i,
  Page$3 as j,
  Page$2 as k,
  actions as l,
  Page$1 as m,
  Page as n,
  options as o,
  set_assets as s
};
