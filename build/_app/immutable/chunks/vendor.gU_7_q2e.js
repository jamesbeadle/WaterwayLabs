const Jr = !0,
  Xr = !1;
var Sr = {},
  G = {};
G.byteLength = _r;
G.toByteArray = Lr;
G.fromByteArray = Pr;
var b = [],
  T = [],
  br = typeof Uint8Array < "u" ? Uint8Array : Array,
  H = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var P = 0, Nr = H.length; P < Nr; ++P)
  (b[P] = H[P]), (T[H.charCodeAt(P)] = P);
T[45] = 62;
T[95] = 63;
function cr(h) {
  var c = h.length;
  if (c % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var p = h.indexOf("=");
  p === -1 && (p = c);
  var a = p === c ? 0 : 4 - (p % 4);
  return [p, a];
}
function _r(h) {
  var c = cr(h),
    p = c[0],
    a = c[1];
  return ((p + a) * 3) / 4 - a;
}
function kr(h, c, p) {
  return ((c + p) * 3) / 4 - p;
}
function Lr(h) {
  var c,
    p = cr(h),
    a = p[0],
    y = p[1],
    s = new br(kr(h, a, y)),
    l = 0,
    o = y > 0 ? a - 4 : a,
    B;
  for (B = 0; B < o; B += 4)
    (c =
      (T[h.charCodeAt(B)] << 18) |
      (T[h.charCodeAt(B + 1)] << 12) |
      (T[h.charCodeAt(B + 2)] << 6) |
      T[h.charCodeAt(B + 3)]),
      (s[l++] = (c >> 16) & 255),
      (s[l++] = (c >> 8) & 255),
      (s[l++] = c & 255);
  return (
    y === 2 &&
      ((c = (T[h.charCodeAt(B)] << 2) | (T[h.charCodeAt(B + 1)] >> 4)),
      (s[l++] = c & 255)),
    y === 1 &&
      ((c =
        (T[h.charCodeAt(B)] << 10) |
        (T[h.charCodeAt(B + 1)] << 4) |
        (T[h.charCodeAt(B + 2)] >> 2)),
      (s[l++] = (c >> 8) & 255),
      (s[l++] = c & 255)),
    s
  );
}
function Dr(h) {
  return b[(h >> 18) & 63] + b[(h >> 12) & 63] + b[(h >> 6) & 63] + b[h & 63];
}
function Mr(h, c, p) {
  for (var a, y = [], s = c; s < p; s += 3)
    (a =
      ((h[s] << 16) & 16711680) + ((h[s + 1] << 8) & 65280) + (h[s + 2] & 255)),
      y.push(Dr(a));
  return y.join("");
}
function Pr(h) {
  for (
    var c, p = h.length, a = p % 3, y = [], s = 16383, l = 0, o = p - a;
    l < o;
    l += s
  )
    y.push(Mr(h, l, l + s > o ? o : l + s));
  return (
    a === 1
      ? ((c = h[p - 1]), y.push(b[c >> 2] + b[(c << 4) & 63] + "=="))
      : a === 2 &&
        ((c = (h[p - 2] << 8) + h[p - 1]),
        y.push(b[c >> 10] + b[(c >> 4) & 63] + b[(c << 2) & 63] + "=")),
    y.join("")
  );
}
var J = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ J.read =
  function (h, c, p, a, y) {
    var s,
      l,
      o = y * 8 - a - 1,
      B = (1 << o) - 1,
      F = B >> 1,
      g = -7,
      A = p ? y - 1 : 0,
      R = p ? -1 : 1,
      x = h[c + A];
    for (
      A += R, s = x & ((1 << -g) - 1), x >>= -g, g += o;
      g > 0;
      s = s * 256 + h[c + A], A += R, g -= 8
    );
    for (
      l = s & ((1 << -g) - 1), s >>= -g, g += a;
      g > 0;
      l = l * 256 + h[c + A], A += R, g -= 8
    );
    if (s === 0) s = 1 - F;
    else {
      if (s === B) return l ? NaN : (x ? -1 : 1) * (1 / 0);
      (l = l + Math.pow(2, a)), (s = s - F);
    }
    return (x ? -1 : 1) * l * Math.pow(2, s - a);
  };
J.write = function (h, c, p, a, y, s) {
  var l,
    o,
    B,
    F = s * 8 - y - 1,
    g = (1 << F) - 1,
    A = g >> 1,
    R = y === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
    x = a ? 0 : s - 1,
    N = a ? 1 : -1,
    k = c < 0 || (c === 0 && 1 / c < 0) ? 1 : 0;
  for (
    c = Math.abs(c),
      isNaN(c) || c === 1 / 0
        ? ((o = isNaN(c) ? 1 : 0), (l = g))
        : ((l = Math.floor(Math.log(c) / Math.LN2)),
          c * (B = Math.pow(2, -l)) < 1 && (l--, (B *= 2)),
          l + A >= 1 ? (c += R / B) : (c += R * Math.pow(2, 1 - A)),
          c * B >= 2 && (l++, (B /= 2)),
          l + A >= g
            ? ((o = 0), (l = g))
            : l + A >= 1
              ? ((o = (c * B - 1) * Math.pow(2, y)), (l = l + A))
              : ((o = c * Math.pow(2, A - 1) * Math.pow(2, y)), (l = 0)));
    y >= 8;
    h[p + x] = o & 255, x += N, o /= 256, y -= 8
  );
  for (
    l = (l << y) | o, F += y;
    F > 0;
    h[p + x] = l & 255, x += N, l /= 256, F -= 8
  );
  h[p + x - N] |= k * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ (function (h) {
  const c = G,
    p = J,
    a =
      typeof Symbol == "function" && typeof Symbol.for == "function"
        ? Symbol.for("nodejs.util.inspect.custom")
        : null;
  (h.Buffer = o), (h.SlowBuffer = hr), (h.INSPECT_MAX_BYTES = 50);
  const y = 2147483647;
  (h.kMaxLength = y),
    (o.TYPED_ARRAY_SUPPORT = s()),
    !o.TYPED_ARRAY_SUPPORT &&
      typeof console < "u" &&
      typeof console.error == "function" &&
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.",
      );
  function s() {
    try {
      const n = new Uint8Array(1),
        r = {
          foo: function () {
            return 42;
          },
        };
      return (
        Object.setPrototypeOf(r, Uint8Array.prototype),
        Object.setPrototypeOf(n, r),
        n.foo() === 42
      );
    } catch {
      return !1;
    }
  }
  Object.defineProperty(o.prototype, "parent", {
    enumerable: !0,
    get: function () {
      if (o.isBuffer(this)) return this.buffer;
    },
  }),
    Object.defineProperty(o.prototype, "offset", {
      enumerable: !0,
      get: function () {
        if (o.isBuffer(this)) return this.byteOffset;
      },
    });
  function l(n) {
    if (n > y)
      throw new RangeError(
        'The value "' + n + '" is invalid for option "size"',
      );
    const r = new Uint8Array(n);
    return Object.setPrototypeOf(r, o.prototype), r;
  }
  function o(n, r, t) {
    if (typeof n == "number") {
      if (typeof r == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number',
        );
      return A(n);
    }
    return B(n, r, t);
  }
  o.poolSize = 8192;
  function B(n, r, t) {
    if (typeof n == "string") return R(n, r);
    if (ArrayBuffer.isView(n)) return N(n);
    if (n == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
          typeof n,
      );
    if (
      S(n, ArrayBuffer) ||
      (n && S(n.buffer, ArrayBuffer)) ||
      (typeof SharedArrayBuffer < "u" &&
        (S(n, SharedArrayBuffer) || (n && S(n.buffer, SharedArrayBuffer))))
    )
      return k(n, r, t);
    if (typeof n == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number',
      );
    const e = n.valueOf && n.valueOf();
    if (e != null && e !== n) return o.from(e, r, t);
    const i = j(n);
    if (i) return i;
    if (
      typeof Symbol < "u" &&
      Symbol.toPrimitive != null &&
      typeof n[Symbol.toPrimitive] == "function"
    )
      return o.from(n[Symbol.toPrimitive]("string"), r, t);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
        typeof n,
    );
  }
  (o.from = function (n, r, t) {
    return B(n, r, t);
  }),
    Object.setPrototypeOf(o.prototype, Uint8Array.prototype),
    Object.setPrototypeOf(o, Uint8Array);
  function F(n) {
    if (typeof n != "number")
      throw new TypeError('"size" argument must be of type number');
    if (n < 0)
      throw new RangeError(
        'The value "' + n + '" is invalid for option "size"',
      );
  }
  function g(n, r, t) {
    return (
      F(n),
      n <= 0
        ? l(n)
        : r !== void 0
          ? typeof t == "string"
            ? l(n).fill(r, t)
            : l(n).fill(r)
          : l(n)
    );
  }
  o.alloc = function (n, r, t) {
    return g(n, r, t);
  };
  function A(n) {
    return F(n), l(n < 0 ? 0 : Y(n) | 0);
  }
  (o.allocUnsafe = function (n) {
    return A(n);
  }),
    (o.allocUnsafeSlow = function (n) {
      return A(n);
    });
  function R(n, r) {
    if (((typeof r != "string" || r === "") && (r = "utf8"), !o.isEncoding(r)))
      throw new TypeError("Unknown encoding: " + r);
    const t = X(n, r) | 0;
    let e = l(t);
    const i = e.write(n, r);
    return i !== t && (e = e.slice(0, i)), e;
  }
  function x(n) {
    const r = n.length < 0 ? 0 : Y(n.length) | 0,
      t = l(r);
    for (let e = 0; e < r; e += 1) t[e] = n[e] & 255;
    return t;
  }
  function N(n) {
    if (S(n, Uint8Array)) {
      const r = new Uint8Array(n);
      return k(r.buffer, r.byteOffset, r.byteLength);
    }
    return x(n);
  }
  function k(n, r, t) {
    if (r < 0 || n.byteLength < r)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (n.byteLength < r + (t || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let e;
    return (
      r === void 0 && t === void 0
        ? (e = new Uint8Array(n))
        : t === void 0
          ? (e = new Uint8Array(n, r))
          : (e = new Uint8Array(n, r, t)),
      Object.setPrototypeOf(e, o.prototype),
      e
    );
  }
  function j(n) {
    if (o.isBuffer(n)) {
      const r = Y(n.length) | 0,
        t = l(r);
      return t.length === 0 || n.copy(t, 0, 0, r), t;
    }
    if (n.length !== void 0)
      return typeof n.length != "number" || q(n.length) ? l(0) : x(n);
    if (n.type === "Buffer" && Array.isArray(n.data)) return x(n.data);
  }
  function Y(n) {
    if (n >= y)
      throw new RangeError(
        "Attempt to allocate Buffer larger than maximum size: 0x" +
          y.toString(16) +
          " bytes",
      );
    return n | 0;
  }
  function hr(n) {
    return +n != n && (n = 0), o.alloc(+n);
  }
  (o.isBuffer = function (r) {
    return r != null && r._isBuffer === !0 && r !== o.prototype;
  }),
    (o.compare = function (r, t) {
      if (
        (S(r, Uint8Array) && (r = o.from(r, r.offset, r.byteLength)),
        S(t, Uint8Array) && (t = o.from(t, t.offset, t.byteLength)),
        !o.isBuffer(r) || !o.isBuffer(t))
      )
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
        );
      if (r === t) return 0;
      let e = r.length,
        i = t.length;
      for (let u = 0, f = Math.min(e, i); u < f; ++u)
        if (r[u] !== t[u]) {
          (e = r[u]), (i = t[u]);
          break;
        }
      return e < i ? -1 : i < e ? 1 : 0;
    }),
    (o.isEncoding = function (r) {
      switch (String(r).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }),
    (o.concat = function (r, t) {
      if (!Array.isArray(r))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (r.length === 0) return o.alloc(0);
      let e;
      if (t === void 0) for (t = 0, e = 0; e < r.length; ++e) t += r[e].length;
      const i = o.allocUnsafe(t);
      let u = 0;
      for (e = 0; e < r.length; ++e) {
        let f = r[e];
        if (S(f, Uint8Array))
          u + f.length > i.length
            ? (o.isBuffer(f) || (f = o.from(f)), f.copy(i, u))
            : Uint8Array.prototype.set.call(i, f, u);
        else if (o.isBuffer(f)) f.copy(i, u);
        else throw new TypeError('"list" argument must be an Array of Buffers');
        u += f.length;
      }
      return i;
    });
  function X(n, r) {
    if (o.isBuffer(n)) return n.length;
    if (ArrayBuffer.isView(n) || S(n, ArrayBuffer)) return n.byteLength;
    if (typeof n != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
          typeof n,
      );
    const t = n.length,
      e = arguments.length > 2 && arguments[2] === !0;
    if (!e && t === 0) return 0;
    let i = !1;
    for (;;)
      switch (r) {
        case "ascii":
        case "latin1":
        case "binary":
          return t;
        case "utf8":
        case "utf-8":
          return W(n).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return t * 2;
        case "hex":
          return t >>> 1;
        case "base64":
          return ur(n).length;
        default:
          if (i) return e ? -1 : W(n).length;
          (r = ("" + r).toLowerCase()), (i = !0);
      }
  }
  o.byteLength = X;
  function sr(n, r, t) {
    let e = !1;
    if (
      ((r === void 0 || r < 0) && (r = 0),
      r > this.length ||
        ((t === void 0 || t > this.length) && (t = this.length), t <= 0) ||
        ((t >>>= 0), (r >>>= 0), t <= r))
    )
      return "";
    for (n || (n = "utf8"); ; )
      switch (n) {
        case "hex":
          return Ir(this, r, t);
        case "utf8":
        case "utf-8":
          return Z(this, r, t);
        case "ascii":
          return Er(this, r, t);
        case "latin1":
        case "binary":
          return gr(this, r, t);
        case "base64":
          return Br(this, r, t);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return mr(this, r, t);
        default:
          if (e) throw new TypeError("Unknown encoding: " + n);
          (n = (n + "").toLowerCase()), (e = !0);
      }
  }
  o.prototype._isBuffer = !0;
  function L(n, r, t) {
    const e = n[r];
    (n[r] = n[t]), (n[t] = e);
  }
  (o.prototype.swap16 = function () {
    const r = this.length;
    if (r % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let t = 0; t < r; t += 2) L(this, t, t + 1);
    return this;
  }),
    (o.prototype.swap32 = function () {
      const r = this.length;
      if (r % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let t = 0; t < r; t += 4) L(this, t, t + 3), L(this, t + 1, t + 2);
      return this;
    }),
    (o.prototype.swap64 = function () {
      const r = this.length;
      if (r % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let t = 0; t < r; t += 8)
        L(this, t, t + 7),
          L(this, t + 1, t + 6),
          L(this, t + 2, t + 5),
          L(this, t + 3, t + 4);
      return this;
    }),
    (o.prototype.toString = function () {
      const r = this.length;
      return r === 0
        ? ""
        : arguments.length === 0
          ? Z(this, 0, r)
          : sr.apply(this, arguments);
    }),
    (o.prototype.toLocaleString = o.prototype.toString),
    (o.prototype.equals = function (r) {
      if (!o.isBuffer(r)) throw new TypeError("Argument must be a Buffer");
      return this === r ? !0 : o.compare(this, r) === 0;
    }),
    (o.prototype.inspect = function () {
      let r = "";
      const t = h.INSPECT_MAX_BYTES;
      return (
        (r = this.toString("hex", 0, t)
          .replace(/(.{2})/g, "$1 ")
          .trim()),
        this.length > t && (r += " ... "),
        "<Buffer " + r + ">"
      );
    }),
    a && (o.prototype[a] = o.prototype.inspect),
    (o.prototype.compare = function (r, t, e, i, u) {
      if (
        (S(r, Uint8Array) && (r = o.from(r, r.offset, r.byteLength)),
        !o.isBuffer(r))
      )
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
            typeof r,
        );
      if (
        (t === void 0 && (t = 0),
        e === void 0 && (e = r ? r.length : 0),
        i === void 0 && (i = 0),
        u === void 0 && (u = this.length),
        t < 0 || e > r.length || i < 0 || u > this.length)
      )
        throw new RangeError("out of range index");
      if (i >= u && t >= e) return 0;
      if (i >= u) return -1;
      if (t >= e) return 1;
      if (((t >>>= 0), (e >>>= 0), (i >>>= 0), (u >>>= 0), this === r))
        return 0;
      let f = u - i,
        w = e - t;
      const m = Math.min(f, w),
        I = this.slice(i, u),
        d = r.slice(t, e);
      for (let E = 0; E < m; ++E)
        if (I[E] !== d[E]) {
          (f = I[E]), (w = d[E]);
          break;
        }
      return f < w ? -1 : w < f ? 1 : 0;
    });
  function z(n, r, t, e, i) {
    if (n.length === 0) return -1;
    if (
      (typeof t == "string"
        ? ((e = t), (t = 0))
        : t > 2147483647
          ? (t = 2147483647)
          : t < -2147483648 && (t = -2147483648),
      (t = +t),
      q(t) && (t = i ? 0 : n.length - 1),
      t < 0 && (t = n.length + t),
      t >= n.length)
    ) {
      if (i) return -1;
      t = n.length - 1;
    } else if (t < 0)
      if (i) t = 0;
      else return -1;
    if ((typeof r == "string" && (r = o.from(r, e)), o.isBuffer(r)))
      return r.length === 0 ? -1 : K(n, r, t, e, i);
    if (typeof r == "number")
      return (
        (r = r & 255),
        typeof Uint8Array.prototype.indexOf == "function"
          ? i
            ? Uint8Array.prototype.indexOf.call(n, r, t)
            : Uint8Array.prototype.lastIndexOf.call(n, r, t)
          : K(n, [r], t, e, i)
      );
    throw new TypeError("val must be string, number or Buffer");
  }
  function K(n, r, t, e, i) {
    let u = 1,
      f = n.length,
      w = r.length;
    if (
      e !== void 0 &&
      ((e = String(e).toLowerCase()),
      e === "ucs2" || e === "ucs-2" || e === "utf16le" || e === "utf-16le")
    ) {
      if (n.length < 2 || r.length < 2) return -1;
      (u = 2), (f /= 2), (w /= 2), (t /= 2);
    }
    function m(d, E) {
      return u === 1 ? d[E] : d.readUInt16BE(E * u);
    }
    let I;
    if (i) {
      let d = -1;
      for (I = t; I < f; I++)
        if (m(n, I) === m(r, d === -1 ? 0 : I - d)) {
          if ((d === -1 && (d = I), I - d + 1 === w)) return d * u;
        } else d !== -1 && (I -= I - d), (d = -1);
    } else
      for (t + w > f && (t = f - w), I = t; I >= 0; I--) {
        let d = !0;
        for (let E = 0; E < w; E++)
          if (m(n, I + E) !== m(r, E)) {
            d = !1;
            break;
          }
        if (d) return I;
      }
    return -1;
  }
  (o.prototype.includes = function (r, t, e) {
    return this.indexOf(r, t, e) !== -1;
  }),
    (o.prototype.indexOf = function (r, t, e) {
      return z(this, r, t, e, !0);
    }),
    (o.prototype.lastIndexOf = function (r, t, e) {
      return z(this, r, t, e, !1);
    });
  function pr(n, r, t, e) {
    t = Number(t) || 0;
    const i = n.length - t;
    e ? ((e = Number(e)), e > i && (e = i)) : (e = i);
    const u = r.length;
    e > u / 2 && (e = u / 2);
    let f;
    for (f = 0; f < e; ++f) {
      const w = parseInt(r.substr(f * 2, 2), 16);
      if (q(w)) return f;
      n[t + f] = w;
    }
    return f;
  }
  function ar(n, r, t, e) {
    return O(W(r, n.length - t), n, t, e);
  }
  function lr(n, r, t, e) {
    return O(Ur(r), n, t, e);
  }
  function yr(n, r, t, e) {
    return O(ur(r), n, t, e);
  }
  function wr(n, r, t, e) {
    return O(Cr(r, n.length - t), n, t, e);
  }
  (o.prototype.write = function (r, t, e, i) {
    if (t === void 0) (i = "utf8"), (e = this.length), (t = 0);
    else if (e === void 0 && typeof t == "string")
      (i = t), (e = this.length), (t = 0);
    else if (isFinite(t))
      (t = t >>> 0),
        isFinite(e)
          ? ((e = e >>> 0), i === void 0 && (i = "utf8"))
          : ((i = e), (e = void 0));
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported",
      );
    const u = this.length - t;
    if (
      ((e === void 0 || e > u) && (e = u),
      (r.length > 0 && (e < 0 || t < 0)) || t > this.length)
    )
      throw new RangeError("Attempt to write outside buffer bounds");
    i || (i = "utf8");
    let f = !1;
    for (;;)
      switch (i) {
        case "hex":
          return pr(this, r, t, e);
        case "utf8":
        case "utf-8":
          return ar(this, r, t, e);
        case "ascii":
        case "latin1":
        case "binary":
          return lr(this, r, t, e);
        case "base64":
          return yr(this, r, t, e);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return wr(this, r, t, e);
        default:
          if (f) throw new TypeError("Unknown encoding: " + i);
          (i = ("" + i).toLowerCase()), (f = !0);
      }
  }),
    (o.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0),
      };
    });
  function Br(n, r, t) {
    return r === 0 && t === n.length
      ? c.fromByteArray(n)
      : c.fromByteArray(n.slice(r, t));
  }
  function Z(n, r, t) {
    t = Math.min(n.length, t);
    const e = [];
    let i = r;
    for (; i < t; ) {
      const u = n[i];
      let f = null,
        w = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
      if (i + w <= t) {
        let m, I, d, E;
        switch (w) {
          case 1:
            u < 128 && (f = u);
            break;
          case 2:
            (m = n[i + 1]),
              (m & 192) === 128 &&
                ((E = ((u & 31) << 6) | (m & 63)), E > 127 && (f = E));
            break;
          case 3:
            (m = n[i + 1]),
              (I = n[i + 2]),
              (m & 192) === 128 &&
                (I & 192) === 128 &&
                ((E = ((u & 15) << 12) | ((m & 63) << 6) | (I & 63)),
                E > 2047 && (E < 55296 || E > 57343) && (f = E));
            break;
          case 4:
            (m = n[i + 1]),
              (I = n[i + 2]),
              (d = n[i + 3]),
              (m & 192) === 128 &&
                (I & 192) === 128 &&
                (d & 192) === 128 &&
                ((E =
                  ((u & 15) << 18) |
                  ((m & 63) << 12) |
                  ((I & 63) << 6) |
                  (d & 63)),
                E > 65535 && E < 1114112 && (f = E));
        }
      }
      f === null
        ? ((f = 65533), (w = 1))
        : f > 65535 &&
          ((f -= 65536),
          e.push(((f >>> 10) & 1023) | 55296),
          (f = 56320 | (f & 1023))),
        e.push(f),
        (i += w);
    }
    return xr(e);
  }
  const Q = 4096;
  function xr(n) {
    const r = n.length;
    if (r <= Q) return String.fromCharCode.apply(String, n);
    let t = "",
      e = 0;
    for (; e < r; )
      t += String.fromCharCode.apply(String, n.slice(e, (e += Q)));
    return t;
  }
  function Er(n, r, t) {
    let e = "";
    t = Math.min(n.length, t);
    for (let i = r; i < t; ++i) e += String.fromCharCode(n[i] & 127);
    return e;
  }
  function gr(n, r, t) {
    let e = "";
    t = Math.min(n.length, t);
    for (let i = r; i < t; ++i) e += String.fromCharCode(n[i]);
    return e;
  }
  function Ir(n, r, t) {
    const e = n.length;
    (!r || r < 0) && (r = 0), (!t || t < 0 || t > e) && (t = e);
    let i = "";
    for (let u = r; u < t; ++u) i += Tr[n[u]];
    return i;
  }
  function mr(n, r, t) {
    const e = n.slice(r, t);
    let i = "";
    for (let u = 0; u < e.length - 1; u += 2)
      i += String.fromCharCode(e[u] + e[u + 1] * 256);
    return i;
  }
  o.prototype.slice = function (r, t) {
    const e = this.length;
    (r = ~~r),
      (t = t === void 0 ? e : ~~t),
      r < 0 ? ((r += e), r < 0 && (r = 0)) : r > e && (r = e),
      t < 0 ? ((t += e), t < 0 && (t = 0)) : t > e && (t = e),
      t < r && (t = r);
    const i = this.subarray(r, t);
    return Object.setPrototypeOf(i, o.prototype), i;
  };
  function U(n, r, t) {
    if (n % 1 !== 0 || n < 0) throw new RangeError("offset is not uint");
    if (n + r > t)
      throw new RangeError("Trying to access beyond buffer length");
  }
  (o.prototype.readUintLE = o.prototype.readUIntLE =
    function (r, t, e) {
      (r = r >>> 0), (t = t >>> 0), e || U(r, t, this.length);
      let i = this[r],
        u = 1,
        f = 0;
      for (; ++f < t && (u *= 256); ) i += this[r + f] * u;
      return i;
    }),
    (o.prototype.readUintBE = o.prototype.readUIntBE =
      function (r, t, e) {
        (r = r >>> 0), (t = t >>> 0), e || U(r, t, this.length);
        let i = this[r + --t],
          u = 1;
        for (; t > 0 && (u *= 256); ) i += this[r + --t] * u;
        return i;
      }),
    (o.prototype.readUint8 = o.prototype.readUInt8 =
      function (r, t) {
        return (r = r >>> 0), t || U(r, 1, this.length), this[r];
      }),
    (o.prototype.readUint16LE = o.prototype.readUInt16LE =
      function (r, t) {
        return (
          (r = r >>> 0), t || U(r, 2, this.length), this[r] | (this[r + 1] << 8)
        );
      }),
    (o.prototype.readUint16BE = o.prototype.readUInt16BE =
      function (r, t) {
        return (
          (r = r >>> 0), t || U(r, 2, this.length), (this[r] << 8) | this[r + 1]
        );
      }),
    (o.prototype.readUint32LE = o.prototype.readUInt32LE =
      function (r, t) {
        return (
          (r = r >>> 0),
          t || U(r, 4, this.length),
          (this[r] | (this[r + 1] << 8) | (this[r + 2] << 16)) +
            this[r + 3] * 16777216
        );
      }),
    (o.prototype.readUint32BE = o.prototype.readUInt32BE =
      function (r, t) {
        return (
          (r = r >>> 0),
          t || U(r, 4, this.length),
          this[r] * 16777216 +
            ((this[r + 1] << 16) | (this[r + 2] << 8) | this[r + 3])
        );
      }),
    (o.prototype.readBigUInt64LE = _(function (r) {
      (r = r >>> 0), M(r, "offset");
      const t = this[r],
        e = this[r + 7];
      (t === void 0 || e === void 0) && $(r, this.length - 8);
      const i =
          t + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + this[++r] * 2 ** 24,
        u = this[++r] + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + e * 2 ** 24;
      return BigInt(i) + (BigInt(u) << BigInt(32));
    })),
    (o.prototype.readBigUInt64BE = _(function (r) {
      (r = r >>> 0), M(r, "offset");
      const t = this[r],
        e = this[r + 7];
      (t === void 0 || e === void 0) && $(r, this.length - 8);
      const i =
          t * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + this[++r],
        u = this[++r] * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + e;
      return (BigInt(i) << BigInt(32)) + BigInt(u);
    })),
    (o.prototype.readIntLE = function (r, t, e) {
      (r = r >>> 0), (t = t >>> 0), e || U(r, t, this.length);
      let i = this[r],
        u = 1,
        f = 0;
      for (; ++f < t && (u *= 256); ) i += this[r + f] * u;
      return (u *= 128), i >= u && (i -= Math.pow(2, 8 * t)), i;
    }),
    (o.prototype.readIntBE = function (r, t, e) {
      (r = r >>> 0), (t = t >>> 0), e || U(r, t, this.length);
      let i = t,
        u = 1,
        f = this[r + --i];
      for (; i > 0 && (u *= 256); ) f += this[r + --i] * u;
      return (u *= 128), f >= u && (f -= Math.pow(2, 8 * t)), f;
    }),
    (o.prototype.readInt8 = function (r, t) {
      return (
        (r = r >>> 0),
        t || U(r, 1, this.length),
        this[r] & 128 ? (255 - this[r] + 1) * -1 : this[r]
      );
    }),
    (o.prototype.readInt16LE = function (r, t) {
      (r = r >>> 0), t || U(r, 2, this.length);
      const e = this[r] | (this[r + 1] << 8);
      return e & 32768 ? e | 4294901760 : e;
    }),
    (o.prototype.readInt16BE = function (r, t) {
      (r = r >>> 0), t || U(r, 2, this.length);
      const e = this[r + 1] | (this[r] << 8);
      return e & 32768 ? e | 4294901760 : e;
    }),
    (o.prototype.readInt32LE = function (r, t) {
      return (
        (r = r >>> 0),
        t || U(r, 4, this.length),
        this[r] | (this[r + 1] << 8) | (this[r + 2] << 16) | (this[r + 3] << 24)
      );
    }),
    (o.prototype.readInt32BE = function (r, t) {
      return (
        (r = r >>> 0),
        t || U(r, 4, this.length),
        (this[r] << 24) | (this[r + 1] << 16) | (this[r + 2] << 8) | this[r + 3]
      );
    }),
    (o.prototype.readBigInt64LE = _(function (r) {
      (r = r >>> 0), M(r, "offset");
      const t = this[r],
        e = this[r + 7];
      (t === void 0 || e === void 0) && $(r, this.length - 8);
      const i =
        this[r + 4] + this[r + 5] * 2 ** 8 + this[r + 6] * 2 ** 16 + (e << 24);
      return (
        (BigInt(i) << BigInt(32)) +
        BigInt(
          t + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + this[++r] * 2 ** 24,
        )
      );
    })),
    (o.prototype.readBigInt64BE = _(function (r) {
      (r = r >>> 0), M(r, "offset");
      const t = this[r],
        e = this[r + 7];
      (t === void 0 || e === void 0) && $(r, this.length - 8);
      const i =
        (t << 24) + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + this[++r];
      return (
        (BigInt(i) << BigInt(32)) +
        BigInt(
          this[++r] * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + e,
        )
      );
    })),
    (o.prototype.readFloatLE = function (r, t) {
      return (
        (r = r >>> 0), t || U(r, 4, this.length), p.read(this, r, !0, 23, 4)
      );
    }),
    (o.prototype.readFloatBE = function (r, t) {
      return (
        (r = r >>> 0), t || U(r, 4, this.length), p.read(this, r, !1, 23, 4)
      );
    }),
    (o.prototype.readDoubleLE = function (r, t) {
      return (
        (r = r >>> 0), t || U(r, 8, this.length), p.read(this, r, !0, 52, 8)
      );
    }),
    (o.prototype.readDoubleBE = function (r, t) {
      return (
        (r = r >>> 0), t || U(r, 8, this.length), p.read(this, r, !1, 52, 8)
      );
    });
  function C(n, r, t, e, i, u) {
    if (!o.isBuffer(n))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (r > i || r < u)
      throw new RangeError('"value" argument is out of bounds');
    if (t + e > n.length) throw new RangeError("Index out of range");
  }
  (o.prototype.writeUintLE = o.prototype.writeUIntLE =
    function (r, t, e, i) {
      if (((r = +r), (t = t >>> 0), (e = e >>> 0), !i)) {
        const w = Math.pow(2, 8 * e) - 1;
        C(this, r, t, e, w, 0);
      }
      let u = 1,
        f = 0;
      for (this[t] = r & 255; ++f < e && (u *= 256); )
        this[t + f] = (r / u) & 255;
      return t + e;
    }),
    (o.prototype.writeUintBE = o.prototype.writeUIntBE =
      function (r, t, e, i) {
        if (((r = +r), (t = t >>> 0), (e = e >>> 0), !i)) {
          const w = Math.pow(2, 8 * e) - 1;
          C(this, r, t, e, w, 0);
        }
        let u = e - 1,
          f = 1;
        for (this[t + u] = r & 255; --u >= 0 && (f *= 256); )
          this[t + u] = (r / f) & 255;
        return t + e;
      }),
    (o.prototype.writeUint8 = o.prototype.writeUInt8 =
      function (r, t, e) {
        return (
          (r = +r),
          (t = t >>> 0),
          e || C(this, r, t, 1, 255, 0),
          (this[t] = r & 255),
          t + 1
        );
      }),
    (o.prototype.writeUint16LE = o.prototype.writeUInt16LE =
      function (r, t, e) {
        return (
          (r = +r),
          (t = t >>> 0),
          e || C(this, r, t, 2, 65535, 0),
          (this[t] = r & 255),
          (this[t + 1] = r >>> 8),
          t + 2
        );
      }),
    (o.prototype.writeUint16BE = o.prototype.writeUInt16BE =
      function (r, t, e) {
        return (
          (r = +r),
          (t = t >>> 0),
          e || C(this, r, t, 2, 65535, 0),
          (this[t] = r >>> 8),
          (this[t + 1] = r & 255),
          t + 2
        );
      }),
    (o.prototype.writeUint32LE = o.prototype.writeUInt32LE =
      function (r, t, e) {
        return (
          (r = +r),
          (t = t >>> 0),
          e || C(this, r, t, 4, 4294967295, 0),
          (this[t + 3] = r >>> 24),
          (this[t + 2] = r >>> 16),
          (this[t + 1] = r >>> 8),
          (this[t] = r & 255),
          t + 4
        );
      }),
    (o.prototype.writeUint32BE = o.prototype.writeUInt32BE =
      function (r, t, e) {
        return (
          (r = +r),
          (t = t >>> 0),
          e || C(this, r, t, 4, 4294967295, 0),
          (this[t] = r >>> 24),
          (this[t + 1] = r >>> 16),
          (this[t + 2] = r >>> 8),
          (this[t + 3] = r & 255),
          t + 4
        );
      });
  function v(n, r, t, e, i) {
    or(r, e, i, n, t, 7);
    let u = Number(r & BigInt(4294967295));
    (n[t++] = u),
      (u = u >> 8),
      (n[t++] = u),
      (u = u >> 8),
      (n[t++] = u),
      (u = u >> 8),
      (n[t++] = u);
    let f = Number((r >> BigInt(32)) & BigInt(4294967295));
    return (
      (n[t++] = f),
      (f = f >> 8),
      (n[t++] = f),
      (f = f >> 8),
      (n[t++] = f),
      (f = f >> 8),
      (n[t++] = f),
      t
    );
  }
  function rr(n, r, t, e, i) {
    or(r, e, i, n, t, 7);
    let u = Number(r & BigInt(4294967295));
    (n[t + 7] = u),
      (u = u >> 8),
      (n[t + 6] = u),
      (u = u >> 8),
      (n[t + 5] = u),
      (u = u >> 8),
      (n[t + 4] = u);
    let f = Number((r >> BigInt(32)) & BigInt(4294967295));
    return (
      (n[t + 3] = f),
      (f = f >> 8),
      (n[t + 2] = f),
      (f = f >> 8),
      (n[t + 1] = f),
      (f = f >> 8),
      (n[t] = f),
      t + 8
    );
  }
  (o.prototype.writeBigUInt64LE = _(function (r, t = 0) {
    return v(this, r, t, BigInt(0), BigInt("0xffffffffffffffff"));
  })),
    (o.prototype.writeBigUInt64BE = _(function (r, t = 0) {
      return rr(this, r, t, BigInt(0), BigInt("0xffffffffffffffff"));
    })),
    (o.prototype.writeIntLE = function (r, t, e, i) {
      if (((r = +r), (t = t >>> 0), !i)) {
        const m = Math.pow(2, 8 * e - 1);
        C(this, r, t, e, m - 1, -m);
      }
      let u = 0,
        f = 1,
        w = 0;
      for (this[t] = r & 255; ++u < e && (f *= 256); )
        r < 0 && w === 0 && this[t + u - 1] !== 0 && (w = 1),
          (this[t + u] = (((r / f) >> 0) - w) & 255);
      return t + e;
    }),
    (o.prototype.writeIntBE = function (r, t, e, i) {
      if (((r = +r), (t = t >>> 0), !i)) {
        const m = Math.pow(2, 8 * e - 1);
        C(this, r, t, e, m - 1, -m);
      }
      let u = e - 1,
        f = 1,
        w = 0;
      for (this[t + u] = r & 255; --u >= 0 && (f *= 256); )
        r < 0 && w === 0 && this[t + u + 1] !== 0 && (w = 1),
          (this[t + u] = (((r / f) >> 0) - w) & 255);
      return t + e;
    }),
    (o.prototype.writeInt8 = function (r, t, e) {
      return (
        (r = +r),
        (t = t >>> 0),
        e || C(this, r, t, 1, 127, -128),
        r < 0 && (r = 255 + r + 1),
        (this[t] = r & 255),
        t + 1
      );
    }),
    (o.prototype.writeInt16LE = function (r, t, e) {
      return (
        (r = +r),
        (t = t >>> 0),
        e || C(this, r, t, 2, 32767, -32768),
        (this[t] = r & 255),
        (this[t + 1] = r >>> 8),
        t + 2
      );
    }),
    (o.prototype.writeInt16BE = function (r, t, e) {
      return (
        (r = +r),
        (t = t >>> 0),
        e || C(this, r, t, 2, 32767, -32768),
        (this[t] = r >>> 8),
        (this[t + 1] = r & 255),
        t + 2
      );
    }),
    (o.prototype.writeInt32LE = function (r, t, e) {
      return (
        (r = +r),
        (t = t >>> 0),
        e || C(this, r, t, 4, 2147483647, -2147483648),
        (this[t] = r & 255),
        (this[t + 1] = r >>> 8),
        (this[t + 2] = r >>> 16),
        (this[t + 3] = r >>> 24),
        t + 4
      );
    }),
    (o.prototype.writeInt32BE = function (r, t, e) {
      return (
        (r = +r),
        (t = t >>> 0),
        e || C(this, r, t, 4, 2147483647, -2147483648),
        r < 0 && (r = 4294967295 + r + 1),
        (this[t] = r >>> 24),
        (this[t + 1] = r >>> 16),
        (this[t + 2] = r >>> 8),
        (this[t + 3] = r & 255),
        t + 4
      );
    }),
    (o.prototype.writeBigInt64LE = _(function (r, t = 0) {
      return v(
        this,
        r,
        t,
        -BigInt("0x8000000000000000"),
        BigInt("0x7fffffffffffffff"),
      );
    })),
    (o.prototype.writeBigInt64BE = _(function (r, t = 0) {
      return rr(
        this,
        r,
        t,
        -BigInt("0x8000000000000000"),
        BigInt("0x7fffffffffffffff"),
      );
    }));
  function tr(n, r, t, e, i, u) {
    if (t + e > n.length) throw new RangeError("Index out of range");
    if (t < 0) throw new RangeError("Index out of range");
  }
  function nr(n, r, t, e, i) {
    return (
      (r = +r),
      (t = t >>> 0),
      i || tr(n, r, t, 4),
      p.write(n, r, t, e, 23, 4),
      t + 4
    );
  }
  (o.prototype.writeFloatLE = function (r, t, e) {
    return nr(this, r, t, !0, e);
  }),
    (o.prototype.writeFloatBE = function (r, t, e) {
      return nr(this, r, t, !1, e);
    });
  function er(n, r, t, e, i) {
    return (
      (r = +r),
      (t = t >>> 0),
      i || tr(n, r, t, 8),
      p.write(n, r, t, e, 52, 8),
      t + 8
    );
  }
  (o.prototype.writeDoubleLE = function (r, t, e) {
    return er(this, r, t, !0, e);
  }),
    (o.prototype.writeDoubleBE = function (r, t, e) {
      return er(this, r, t, !1, e);
    }),
    (o.prototype.copy = function (r, t, e, i) {
      if (!o.isBuffer(r)) throw new TypeError("argument should be a Buffer");
      if (
        (e || (e = 0),
        !i && i !== 0 && (i = this.length),
        t >= r.length && (t = r.length),
        t || (t = 0),
        i > 0 && i < e && (i = e),
        i === e || r.length === 0 || this.length === 0)
      )
        return 0;
      if (t < 0) throw new RangeError("targetStart out of bounds");
      if (e < 0 || e >= this.length) throw new RangeError("Index out of range");
      if (i < 0) throw new RangeError("sourceEnd out of bounds");
      i > this.length && (i = this.length),
        r.length - t < i - e && (i = r.length - t + e);
      const u = i - e;
      return (
        this === r && typeof Uint8Array.prototype.copyWithin == "function"
          ? this.copyWithin(t, e, i)
          : Uint8Array.prototype.set.call(r, this.subarray(e, i), t),
        u
      );
    }),
    (o.prototype.fill = function (r, t, e, i) {
      if (typeof r == "string") {
        if (
          (typeof t == "string"
            ? ((i = t), (t = 0), (e = this.length))
            : typeof e == "string" && ((i = e), (e = this.length)),
          i !== void 0 && typeof i != "string")
        )
          throw new TypeError("encoding must be a string");
        if (typeof i == "string" && !o.isEncoding(i))
          throw new TypeError("Unknown encoding: " + i);
        if (r.length === 1) {
          const f = r.charCodeAt(0);
          ((i === "utf8" && f < 128) || i === "latin1") && (r = f);
        }
      } else
        typeof r == "number"
          ? (r = r & 255)
          : typeof r == "boolean" && (r = Number(r));
      if (t < 0 || this.length < t || this.length < e)
        throw new RangeError("Out of range index");
      if (e <= t) return this;
      (t = t >>> 0), (e = e === void 0 ? this.length : e >>> 0), r || (r = 0);
      let u;
      if (typeof r == "number") for (u = t; u < e; ++u) this[u] = r;
      else {
        const f = o.isBuffer(r) ? r : o.from(r, i),
          w = f.length;
        if (w === 0)
          throw new TypeError(
            'The value "' + r + '" is invalid for argument "value"',
          );
        for (u = 0; u < e - t; ++u) this[u + t] = f[u % w];
      }
      return this;
    });
  const D = {};
  function V(n, r, t) {
    D[n] = class extends t {
      constructor() {
        super(),
          Object.defineProperty(this, "message", {
            value: r.apply(this, arguments),
            writable: !0,
            configurable: !0,
          }),
          (this.name = `${this.name} [${n}]`),
          this.stack,
          delete this.name;
      }
      get code() {
        return n;
      }
      set code(i) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: i,
          writable: !0,
        });
      }
      toString() {
        return `${this.name} [${n}]: ${this.message}`;
      }
    };
  }
  V(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function (n) {
      return n
        ? `${n} is outside of buffer bounds`
        : "Attempt to access memory outside buffer bounds";
    },
    RangeError,
  ),
    V(
      "ERR_INVALID_ARG_TYPE",
      function (n, r) {
        return `The "${n}" argument must be of type number. Received type ${typeof r}`;
      },
      TypeError,
    ),
    V(
      "ERR_OUT_OF_RANGE",
      function (n, r, t) {
        let e = `The value of "${n}" is out of range.`,
          i = t;
        return (
          Number.isInteger(t) && Math.abs(t) > 2 ** 32
            ? (i = ir(String(t)))
            : typeof t == "bigint" &&
              ((i = String(t)),
              (t > BigInt(2) ** BigInt(32) || t < -(BigInt(2) ** BigInt(32))) &&
                (i = ir(i)),
              (i += "n")),
          (e += ` It must be ${r}. Received ${i}`),
          e
        );
      },
      RangeError,
    );
  function ir(n) {
    let r = "",
      t = n.length;
    const e = n[0] === "-" ? 1 : 0;
    for (; t >= e + 4; t -= 3) r = `_${n.slice(t - 3, t)}${r}`;
    return `${n.slice(0, t)}${r}`;
  }
  function dr(n, r, t) {
    M(r, "offset"),
      (n[r] === void 0 || n[r + t] === void 0) && $(r, n.length - (t + 1));
  }
  function or(n, r, t, e, i, u) {
    if (n > t || n < r) {
      const f = typeof r == "bigint" ? "n" : "";
      let w;
      throw (
        (r === 0 || r === BigInt(0)
          ? (w = `>= 0${f} and < 2${f} ** ${(u + 1) * 8}${f}`)
          : (w = `>= -(2${f} ** ${(u + 1) * 8 - 1}${f}) and < 2 ** ${(u + 1) * 8 - 1}${f}`),
        new D.ERR_OUT_OF_RANGE("value", w, n))
      );
    }
    dr(e, i, u);
  }
  function M(n, r) {
    if (typeof n != "number") throw new D.ERR_INVALID_ARG_TYPE(r, "number", n);
  }
  function $(n, r, t) {
    throw Math.floor(n) !== n
      ? (M(n, t), new D.ERR_OUT_OF_RANGE("offset", "an integer", n))
      : r < 0
        ? new D.ERR_BUFFER_OUT_OF_BOUNDS()
        : new D.ERR_OUT_OF_RANGE("offset", `>= 0 and <= ${r}`, n);
  }
  const Fr = /[^+/0-9A-Za-z-_]/g;
  function Ar(n) {
    if (((n = n.split("=")[0]), (n = n.trim().replace(Fr, "")), n.length < 2))
      return "";
    for (; n.length % 4 !== 0; ) n = n + "=";
    return n;
  }
  function W(n, r) {
    r = r || 1 / 0;
    let t;
    const e = n.length;
    let i = null;
    const u = [];
    for (let f = 0; f < e; ++f) {
      if (((t = n.charCodeAt(f)), t > 55295 && t < 57344)) {
        if (!i) {
          if (t > 56319) {
            (r -= 3) > -1 && u.push(239, 191, 189);
            continue;
          } else if (f + 1 === e) {
            (r -= 3) > -1 && u.push(239, 191, 189);
            continue;
          }
          i = t;
          continue;
        }
        if (t < 56320) {
          (r -= 3) > -1 && u.push(239, 191, 189), (i = t);
          continue;
        }
        t = (((i - 55296) << 10) | (t - 56320)) + 65536;
      } else i && (r -= 3) > -1 && u.push(239, 191, 189);
      if (((i = null), t < 128)) {
        if ((r -= 1) < 0) break;
        u.push(t);
      } else if (t < 2048) {
        if ((r -= 2) < 0) break;
        u.push((t >> 6) | 192, (t & 63) | 128);
      } else if (t < 65536) {
        if ((r -= 3) < 0) break;
        u.push((t >> 12) | 224, ((t >> 6) & 63) | 128, (t & 63) | 128);
      } else if (t < 1114112) {
        if ((r -= 4) < 0) break;
        u.push(
          (t >> 18) | 240,
          ((t >> 12) & 63) | 128,
          ((t >> 6) & 63) | 128,
          (t & 63) | 128,
        );
      } else throw new Error("Invalid code point");
    }
    return u;
  }
  function Ur(n) {
    const r = [];
    for (let t = 0; t < n.length; ++t) r.push(n.charCodeAt(t) & 255);
    return r;
  }
  function Cr(n, r) {
    let t, e, i;
    const u = [];
    for (let f = 0; f < n.length && !((r -= 2) < 0); ++f)
      (t = n.charCodeAt(f)), (e = t >> 8), (i = t % 256), u.push(i), u.push(e);
    return u;
  }
  function ur(n) {
    return c.toByteArray(Ar(n));
  }
  function O(n, r, t, e) {
    let i;
    for (i = 0; i < e && !(i + t >= r.length || i >= n.length); ++i)
      r[i + t] = n[i];
    return i;
  }
  function S(n, r) {
    return (
      n instanceof r ||
      (n != null &&
        n.constructor != null &&
        n.constructor.name != null &&
        n.constructor.name === r.name)
    );
  }
  function q(n) {
    return n !== n;
  }
  const Tr = (function () {
    const n = "0123456789abcdef",
      r = new Array(256);
    for (let t = 0; t < 16; ++t) {
      const e = t * 16;
      for (let i = 0; i < 16; ++i) r[e + i] = n[t] + n[i];
    }
    return r;
  })();
  function _(n) {
    return typeof BigInt > "u" ? Rr : n;
  }
  function Rr() {
    throw new Error("BigInt not supported");
  }
})(Sr);
function fr(h) {
  const c = Or(h),
    p = new ArrayBuffer(c.length),
    a = new DataView(p);
  for (let y = 0; y < p.byteLength; y++) a.setUint8(y, c.charCodeAt(y));
  return p;
}
const $r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function Or(h) {
  h.length % 4 === 0 && (h = h.replace(/==?$/, ""));
  let c = "",
    p = 0,
    a = 0;
  for (let y = 0; y < h.length; y++)
    (p <<= 6),
      (p |= $r.indexOf(h[y])),
      (a += 6),
      a === 24 &&
        ((c += String.fromCharCode((p & 16711680) >> 16)),
        (c += String.fromCharCode((p & 65280) >> 8)),
        (c += String.fromCharCode(p & 255)),
        (p = a = 0));
  return (
    a === 12
      ? ((p >>= 4), (c += String.fromCharCode(p)))
      : a === 18 &&
        ((p >>= 2),
        (c += String.fromCharCode((p & 65280) >> 8)),
        (c += String.fromCharCode(p & 255))),
    c
  );
}
const Gr = -1,
  jr = -2,
  Yr = -3,
  Vr = -4,
  Wr = -5,
  qr = -6;
function Kr(h, c) {
  return Hr(JSON.parse(h), c);
}
function Hr(h, c) {
  if (typeof h == "number") return y(h, !0);
  if (!Array.isArray(h) || h.length === 0) throw new Error("Invalid input");
  const p = h,
    a = Array(p.length);
  function y(s, l = !1) {
    if (s === Gr) return;
    if (s === Yr) return NaN;
    if (s === Vr) return 1 / 0;
    if (s === Wr) return -1 / 0;
    if (s === qr) return -0;
    if (l) throw new Error("Invalid input");
    if (s in a) return a[s];
    const o = p[s];
    if (!o || typeof o != "object") a[s] = o;
    else if (Array.isArray(o))
      if (typeof o[0] == "string") {
        const B = o[0],
          F = c?.[B];
        if (F) return (a[s] = F(y(o[1])));
        switch (B) {
          case "Date":
            a[s] = new Date(o[1]);
            break;
          case "Set":
            const g = new Set();
            a[s] = g;
            for (let x = 1; x < o.length; x += 1) g.add(y(o[x]));
            break;
          case "Map":
            const A = new Map();
            a[s] = A;
            for (let x = 1; x < o.length; x += 2) A.set(y(o[x]), y(o[x + 1]));
            break;
          case "RegExp":
            a[s] = new RegExp(o[1], o[2]);
            break;
          case "Object":
            a[s] = Object(o[1]);
            break;
          case "BigInt":
            a[s] = BigInt(o[1]);
            break;
          case "null":
            const R = Object.create(null);
            a[s] = R;
            for (let x = 1; x < o.length; x += 2) R[o[x]] = y(o[x + 1]);
            break;
          case "Int8Array":
          case "Uint8Array":
          case "Uint8ClampedArray":
          case "Int16Array":
          case "Uint16Array":
          case "Int32Array":
          case "Uint32Array":
          case "Float32Array":
          case "Float64Array":
          case "BigInt64Array":
          case "BigUint64Array": {
            const x = globalThis[B],
              N = o[1],
              k = fr(N),
              j = new x(k);
            a[s] = j;
            break;
          }
          case "ArrayBuffer": {
            const x = o[1],
              N = fr(x);
            a[s] = N;
            break;
          }
          default:
            throw new Error(`Unknown type ${B}`);
        }
      } else {
        const B = new Array(o.length);
        a[s] = B;
        for (let F = 0; F < o.length; F += 1) {
          const g = o[F];
          g !== jr && (B[F] = y(g));
        }
      }
    else {
      const B = {};
      a[s] = B;
      for (const F in o) {
        const g = o[F];
        B[F] = y(g);
      }
    }
    return a[s];
  }
  return y(0);
}
export { Jr as B, Xr as D, Kr as p, Hr as u };
