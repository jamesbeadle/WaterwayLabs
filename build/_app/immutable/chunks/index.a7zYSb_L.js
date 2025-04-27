var Es = Object.defineProperty;
var fa = (e) => {
  throw TypeError(e);
};
var As = (e, t, r) =>
  t in e
    ? Es(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
    : (e[t] = r);
var tt = (e, t, r) => As(e, typeof t != "symbol" ? t + "" : t, r),
  va = (e, t, r) => t.has(e) || fa("Cannot " + r);
var ge = (e, t, r) => (
    va(e, t, "read from private field"), r ? r.call(e) : t.get(e)
  ),
  mn = (e, t, r) =>
    t.has(e)
      ? fa("Cannot add the same private member more than once")
      : t instanceof WeakSet
        ? t.add(e)
        : t.set(e, r),
  gn = (e, t, r, n) => (
    va(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r
  );
import {
  D as Qa,
  u as ks,
  H as Vr,
  A as Da,
  a as Os,
  b as pa,
  C as Ls,
  P as Ps,
  y as Rs,
  c as $s,
} from "./vendor.DyonkqFY.js";
var Hn = Array.isArray,
  Wn = Array.from,
  eo = Object.defineProperty,
  zt = Object.getOwnPropertyDescriptor,
  to = Object.getOwnPropertyDescriptors,
  Fs = Object.prototype,
  Ms = Array.prototype,
  Br = Object.getPrototypeOf;
function Vs(e) {
  return typeof e == "function";
}
const Le = () => {};
function js(e) {
  return typeof e?.then == "function";
}
function qs(e) {
  return e();
}
function Hr(e) {
  for (var t = 0; t < e.length; t++) e[t]();
}
const Je = 2,
  ro = 4,
  Nr = 8,
  nn = 16,
  ze = 32,
  Sr = 64,
  Lt = 128,
  Wr = 256,
  fe = 512,
  mt = 1024,
  Dt = 2048,
  Ke = 4096,
  Er = 8192,
  no = 16384,
  er = 32768,
  ao = 65536,
  Us = 1 << 18,
  oo = 1 << 19,
  _t = Symbol("$state"),
  Bs = Symbol("");
function so(e) {
  return e === this.v;
}
function io(e, t) {
  return e != e
    ? t == t
    : e !== t || (e !== null && typeof e == "object") || typeof e == "function";
}
function zn(e) {
  return !io(e, this.v);
}
function Hs(e) {
  throw new Error("effect_in_teardown");
}
function Ws() {
  throw new Error("effect_in_unowned_derived");
}
function zs(e) {
  throw new Error("effect_orphan");
}
function Is() {
  throw new Error("effect_update_depth_exceeded");
}
function Zs() {
  throw new Error("hydration_failed");
}
function Gs(e) {
  throw new Error("props_invalid_value");
}
function Ks() {
  throw new Error("state_descriptors_fixed");
}
function Ys() {
  throw new Error("state_prototype_fixed");
}
function Xs() {
  throw new Error("state_unsafe_local_read");
}
function Js() {
  throw new Error("state_unsafe_mutation");
}
let tr = !1;
function Qs() {
  tr = !0;
}
function de(e) {
  return { f: 0, v: e, reactions: null, equals: so, version: 0 };
}
function Cn(e) {
  return lo(de(e));
}
function At(e, t = !1) {
  var n;
  const r = de(e);
  return (
    t || (r.equals = zn),
    tr && Z !== null && Z.l !== null && ((n = Z.l).s ?? (n.s = [])).push(r),
    r
  );
}
function V(e, t = !1) {
  return lo(At(e, t));
}
function lo(e) {
  return z !== null && z.f & Je && (Ye === null ? mi([e]) : Ye.push(e)), e;
}
function _a(e, t) {
  return (
    E(
      e,
      We(() => p(e)),
    ),
    t
  );
}
function E(e, t) {
  return (
    z !== null &&
      Or() &&
      z.f & (Je | nn) &&
      (Ye === null || !Ye.includes(e)) &&
      Js(),
    It(e, t)
  );
}
function It(e, t) {
  return (
    e.equals(t) ||
      ((e.v = t),
      (e.version = Po()),
      co(e, mt),
      Or() &&
        M !== null &&
        M.f & fe &&
        !(M.f & ze) &&
        (ie !== null && ie.includes(e)
          ? (Ie(M, mt), an(M))
          : ht === null
            ? gi([e])
            : ht.push(e))),
    t
  );
}
function co(e, t) {
  var r = e.reactions;
  if (r !== null)
    for (var n = Or(), a = r.length, o = 0; o < a; o++) {
      var s = r[o],
        c = s.f;
      c & mt ||
        (!n && s === M) ||
        (Ie(s, t), c & (fe | Lt) && (c & Je ? co(s, Dt) : an(s)));
    }
}
const In = 1,
  Zn = 2,
  uo = 4,
  Ds = 8,
  ei = 16,
  ti = 1,
  ri = 2,
  ni = 4,
  ai = 8,
  oi = 16,
  si = 4,
  ii = 1,
  li = 2,
  fo = "[",
  Gn = "[!",
  Kn = "]",
  pr = {},
  Te = Symbol();
function Yn(e) {
  console.warn("hydration_mismatch");
}
let F = !1;
function ot(e) {
  F = e;
}
let U;
function $e(e) {
  if (e === null) throw (Yn(), pr);
  return (U = e);
}
function Pt() {
  return $e(lt(U));
}
function h(e) {
  if (F) {
    if (lt(U) !== null) throw (Yn(), pr);
    U = e;
  }
}
function Xn(e = 1) {
  if (F) {
    for (var t = e, r = U; t--; ) r = lt(r);
    U = r;
  }
}
function On() {
  for (var e = 0, t = U; ; ) {
    if (t.nodeType === 8) {
      var r = t.data;
      if (r === Kn) {
        if (e === 0) return t;
        e -= 1;
      } else (r === fo || r === Gn) && (e += 1);
    }
    var n = lt(t);
    t.remove(), (t = n);
  }
}
function xt(e, t = null, r) {
  if (typeof e != "object" || e === null || _t in e) return e;
  const n = Br(e);
  if (n !== Fs && n !== Ms) return e;
  var a = new Map(),
    o = Hn(e),
    s = de(0);
  o && a.set("length", de(e.length));
  var c;
  return new Proxy(e, {
    defineProperty(i, l, u) {
      (!("value" in u) ||
        u.configurable === !1 ||
        u.enumerable === !1 ||
        u.writable === !1) &&
        Ks();
      var v = a.get(l);
      return (
        v === void 0 ? ((v = de(u.value)), a.set(l, v)) : E(v, xt(u.value, c)),
        !0
      );
    },
    deleteProperty(i, l) {
      var u = a.get(l);
      if (u === void 0) l in i && a.set(l, de(Te));
      else {
        if (o && typeof l == "string") {
          var v = a.get("length"),
            d = Number(l);
          Number.isInteger(d) && d < v.v && E(v, d);
        }
        E(u, Te), ha(s);
      }
      return !0;
    },
    get(i, l, u) {
      if (l === _t) return e;
      var v = a.get(l),
        d = l in i;
      if (
        (v === void 0 &&
          (!d || zt(i, l)?.writable) &&
          ((v = de(xt(d ? i[l] : Te, c))), a.set(l, v)),
        v !== void 0)
      ) {
        var f = p(v);
        return f === Te ? void 0 : f;
      }
      return Reflect.get(i, l, u);
    },
    getOwnPropertyDescriptor(i, l) {
      var u = Reflect.getOwnPropertyDescriptor(i, l);
      if (u && "value" in u) {
        var v = a.get(l);
        v && (u.value = p(v));
      } else if (u === void 0) {
        var d = a.get(l),
          f = d?.v;
        if (d !== void 0 && f !== Te)
          return { enumerable: !0, configurable: !0, value: f, writable: !0 };
      }
      return u;
    },
    has(i, l) {
      if (l === _t) return !0;
      var u = a.get(l),
        v = (u !== void 0 && u.v !== Te) || Reflect.has(i, l);
      if (u !== void 0 || (M !== null && (!v || zt(i, l)?.writable))) {
        u === void 0 && ((u = de(v ? xt(i[l], c) : Te)), a.set(l, u));
        var d = p(u);
        if (d === Te) return !1;
      }
      return v;
    },
    set(i, l, u, v) {
      var d = a.get(l),
        f = l in i;
      if (o && l === "length")
        for (var _ = u; _ < d.v; _ += 1) {
          var g = a.get(_ + "");
          g !== void 0 ? E(g, Te) : _ in i && ((g = de(Te)), a.set(_ + "", g));
        }
      d === void 0
        ? (!f || zt(i, l)?.writable) &&
          ((d = de(void 0)), E(d, xt(u, c)), a.set(l, d))
        : ((f = d.v !== Te), E(d, xt(u, c)));
      var C = Reflect.getOwnPropertyDescriptor(i, l);
      if ((C?.set && C.set.call(v, u), !f)) {
        if (o && typeof l == "string") {
          var b = a.get("length"),
            x = Number(l);
          Number.isInteger(x) && x >= b.v && E(b, x + 1);
        }
        ha(s);
      }
      return !0;
    },
    ownKeys(i) {
      p(s);
      var l = Reflect.ownKeys(i).filter((d) => {
        var f = a.get(d);
        return f === void 0 || f.v !== Te;
      });
      for (var [u, v] of a) v.v !== Te && !(u in i) && l.push(u);
      return l;
    },
    setPrototypeOf() {
      Ys();
    },
  });
}
function ha(e, t = 1) {
  E(e, e.v + t);
}
function ma(e) {
  return e !== null && typeof e == "object" && _t in e ? e[_t] : e;
}
function ci(e, t) {
  return Object.is(ma(e), ma(t));
}
var Ln, vo, po;
function Pn() {
  if (Ln === void 0) {
    Ln = window;
    var e = Element.prototype,
      t = Node.prototype;
    (vo = zt(t, "firstChild").get),
      (po = zt(t, "nextSibling").get),
      (e.__click = void 0),
      (e.__className = ""),
      (e.__attributes = null),
      (e.__styles = null),
      (e.__e = void 0),
      (Text.prototype.__t = void 0);
  }
}
function gt(e = "") {
  return document.createTextNode(e);
}
function Qe(e) {
  return vo.call(e);
}
function lt(e) {
  return po.call(e);
}
function m(e, t) {
  if (!F) return Qe(e);
  var r = Qe(U);
  if (r === null) r = U.appendChild(gt());
  else if (t && r.nodeType !== 3) {
    var n = gt();
    return r?.before(n), $e(n), n;
  }
  return $e(r), r;
}
function X(e, t) {
  if (!F) {
    var r = Qe(e);
    return r instanceof Comment && r.data === "" ? lt(r) : r;
  }
  return U;
}
function w(e, t = 1, r = !1) {
  let n = F ? U : e;
  for (; t--; ) n = lt(n);
  if (!F) return n;
  var a = n.nodeType;
  if (r && a !== 3) {
    var o = gt();
    return n?.before(o), $e(o), o;
  }
  return $e(n), n;
}
function Jn(e) {
  e.textContent = "";
}
function Nt(e) {
  var t = Je | mt;
  M === null ? (t |= Lt) : (M.f |= oo);
  const r = {
    children: null,
    ctx: Z,
    deps: null,
    equals: so,
    f: t,
    fn: e,
    reactions: null,
    v: null,
    version: 0,
    parent: M,
  };
  if (z !== null && z.f & Je) {
    var n = z;
    (n.children ?? (n.children = [])).push(r);
  }
  return r;
}
function Ee(e) {
  const t = Nt(e);
  return (t.equals = zn), t;
}
function _o(e) {
  var t = e.children;
  if (t !== null) {
    e.children = null;
    for (var r = 0; r < t.length; r += 1) {
      var n = t[r];
      n.f & Je ? Qn(n) : bt(n);
    }
  }
}
function ho(e) {
  var t,
    r = M;
  be(e.parent);
  try {
    _o(e), (t = Ro(e));
  } finally {
    be(r);
  }
  return t;
}
function mo(e) {
  var t = ho(e),
    r = (Ut || e.f & Lt) && e.deps !== null ? Dt : fe;
  Ie(e, r), e.equals(t) || ((e.v = t), (e.version = Po()));
}
function Qn(e) {
  _o(e),
    br(e, 0),
    Ie(e, Er),
    (e.v = e.children = e.deps = e.ctx = e.reactions = null);
}
function go(e) {
  M === null && z === null && zs(), z !== null && z.f & Lt && Ws(), ea && Hs();
}
function ui(e, t) {
  var r = t.last;
  r === null
    ? (t.last = t.first = e)
    : ((r.next = e), (e.prev = r), (t.last = e));
}
function rr(e, t, r, n = !0) {
  var a = (e & Sr) !== 0,
    o = M,
    s = {
      ctx: Z,
      deps: null,
      deriveds: null,
      nodes_start: null,
      nodes_end: null,
      f: e | mt,
      first: null,
      fn: t,
      last: null,
      next: null,
      parent: a ? null : o,
      prev: null,
      teardown: null,
      transitions: null,
      version: 0,
    };
  if (r) {
    var c = Zt;
    try {
      ga(!0), Lr(s), (s.f |= no);
    } catch (u) {
      throw (bt(s), u);
    } finally {
      ga(c);
    }
  } else t !== null && an(s);
  var i =
    r &&
    s.deps === null &&
    s.first === null &&
    s.nodes_start === null &&
    s.teardown === null &&
    (s.f & oo) === 0;
  if (!i && !a && n && (o !== null && ui(s, o), z !== null && z.f & Je)) {
    var l = z;
    (l.children ?? (l.children = [])).push(s);
  }
  return s;
}
function Co(e) {
  const t = rr(Nr, null, !1);
  return Ie(t, fe), (t.teardown = e), t;
}
function zr(e) {
  go();
  var t = M !== null && (M.f & ze) !== 0 && Z !== null && !Z.m;
  if (t) {
    var r = Z;
    (r.e ?? (r.e = [])).push({ fn: e, effect: M, reaction: z });
  } else {
    var n = nr(e);
    return n;
  }
}
function bo(e) {
  return go(), Ar(e);
}
function di(e) {
  const t = rr(Sr, e, !0);
  return () => {
    bt(t);
  };
}
function nr(e) {
  return rr(ro, e, !1);
}
function Ct(e, t) {
  var r = Z,
    n = { effect: null, ran: !1 };
  r.l.r1.push(n),
    (n.effect = Ar(() => {
      e(), !n.ran && ((n.ran = !0), E(r.l.r2, !0), We(t));
    }));
}
function ar() {
  var e = Z;
  Ar(() => {
    if (p(e.l.r2)) {
      for (var t of e.l.r1) {
        var r = t.effect;
        r.f & fe && Ie(r, Dt), sr(r) && Lr(r), (t.ran = !1);
      }
      e.l.r2.v = !1;
    }
  });
}
function Ar(e) {
  return rr(Nr, e, !0);
}
function O(e) {
  return or(e);
}
function or(e, t = 0) {
  return rr(Nr | nn | t, e, !0);
}
function He(e, t = !0) {
  return rr(Nr | ze, e, !0, t);
}
function wo(e) {
  var t = e.teardown;
  if (t !== null) {
    const r = ea,
      n = z;
    Ca(!0), Me(null);
    try {
      t.call(null);
    } finally {
      Ca(r), Me(n);
    }
  }
}
function yo(e) {
  var t = e.deriveds;
  if (t !== null) {
    e.deriveds = null;
    for (var r = 0; r < t.length; r += 1) Qn(t[r]);
  }
}
function xo(e, t = !1) {
  var r = e.first;
  for (e.first = e.last = null; r !== null; ) {
    var n = r.next;
    bt(r, t), (r = n);
  }
}
function fi(e) {
  for (var t = e.first; t !== null; ) {
    var r = t.next;
    t.f & ze || bt(t), (t = r);
  }
}
function bt(e, t = !0) {
  var r = !1;
  if ((t || e.f & Us) && e.nodes_start !== null) {
    for (var n = e.nodes_start, a = e.nodes_end; n !== null; ) {
      var o = n === a ? null : lt(n);
      n.remove(), (n = o);
    }
    r = !0;
  }
  xo(e, t && !r), yo(e), br(e, 0), Ie(e, Er);
  var s = e.transitions;
  if (s !== null) for (const i of s) i.stop();
  wo(e);
  var c = e.parent;
  c !== null && c.first !== null && To(e),
    (e.next =
      e.prev =
      e.teardown =
      e.ctx =
      e.deps =
      e.parent =
      e.fn =
      e.nodes_start =
      e.nodes_end =
        null);
}
function To(e) {
  var t = e.parent,
    r = e.prev,
    n = e.next;
  r !== null && (r.next = n),
    n !== null && (n.prev = r),
    t !== null &&
      (t.first === e && (t.first = n), t.last === e && (t.last = r));
}
function St(e, t) {
  var r = [];
  Dn(e, r, !0),
    No(r, () => {
      bt(e), t && t();
    });
}
function No(e, t) {
  var r = e.length;
  if (r > 0) {
    var n = () => --r || t();
    for (var a of e) a.out(n);
  } else t();
}
function Dn(e, t, r) {
  if (!(e.f & Ke)) {
    if (((e.f ^= Ke), e.transitions !== null))
      for (const s of e.transitions) (s.is_global || r) && t.push(s);
    for (var n = e.first; n !== null; ) {
      var a = n.next,
        o = (n.f & er) !== 0 || (n.f & ze) !== 0;
      Dn(n, t, o ? r : !1), (n = a);
    }
  }
}
function Et(e) {
  So(e, !0);
}
function So(e, t) {
  if (e.f & Ke) {
    sr(e) && Lr(e), (e.f ^= Ke);
    for (var r = e.first; r !== null; ) {
      var n = r.next,
        a = (r.f & er) !== 0 || (r.f & ze) !== 0;
      So(r, a ? t : !1), (r = n);
    }
    if (e.transitions !== null)
      for (const o of e.transitions) (o.is_global || t) && o.in();
  }
}
const vi =
  typeof requestIdleCallback > "u"
    ? (e) => setTimeout(e, 1)
    : requestIdleCallback;
let Ir = !1,
  Zr = !1,
  Rn = [],
  $n = [];
function Eo() {
  Ir = !1;
  const e = Rn.slice();
  (Rn = []), Hr(e);
}
function Ao() {
  Zr = !1;
  const e = $n.slice();
  ($n = []), Hr(e);
}
function kr(e) {
  Ir || ((Ir = !0), queueMicrotask(Eo)), Rn.push(e);
}
function pi(e) {
  Zr || ((Zr = !0), vi(Ao)), $n.push(e);
}
function _i() {
  Ir && Eo(), Zr && Ao();
}
function ko(e) {
  throw new Error("lifecycle_outside_component");
}
const Oo = 0,
  hi = 1;
let jr = Oo,
  Cr = !1,
  Zt = !1,
  ea = !1;
function ga(e) {
  Zt = e;
}
function Ca(e) {
  ea = e;
}
let Tt = [],
  Gt = 0;
let z = null;
function Me(e) {
  z = e;
}
let M = null;
function be(e) {
  M = e;
}
let Ye = null;
function mi(e) {
  Ye = e;
}
let ie = null,
  Ne = 0,
  ht = null;
function gi(e) {
  ht = e;
}
let Lo = 0,
  Ut = !1,
  Bt = !1,
  qt = new Set(),
  Z = null;
function ba(e) {
  Z = e;
}
function Po() {
  return ++Lo;
}
function Or() {
  return !tr || (Z !== null && Z.l === null);
}
function sr(e) {
  var s;
  var t = e.f;
  if (t & mt) return !0;
  if (t & Dt) {
    var r = e.deps,
      n = (t & Lt) !== 0;
    if (r !== null) {
      var a;
      if (t & Wr) {
        for (a = 0; a < r.length; a++)
          ((s = r[a]).reactions ?? (s.reactions = [])).push(e);
        e.f ^= Wr;
      }
      for (a = 0; a < r.length; a++) {
        var o = r[a];
        if (
          (sr(o) && mo(o),
          n &&
            M !== null &&
            !Ut &&
            !o?.reactions?.includes(e) &&
            (o.reactions ?? (o.reactions = [])).push(e),
          o.version > e.version)
        )
          return !0;
      }
    }
    n || Ie(e, fe);
  }
  return !1;
}
function Ci(e, t, r) {
  throw e;
}
function Ro(e) {
  var d;
  var t = ie,
    r = Ne,
    n = ht,
    a = z,
    o = Ut,
    s = Ye,
    c = Z,
    i = e.f;
  (ie = null),
    (Ne = 0),
    (ht = null),
    (z = i & (ze | Sr) ? null : e),
    (Ut = !Zt && (i & Lt) !== 0),
    (Ye = null),
    (Z = e.ctx);
  try {
    var l = (0, e.fn)(),
      u = e.deps;
    if (ie !== null) {
      var v;
      if ((br(e, Ne), u !== null && Ne > 0))
        for (u.length = Ne + ie.length, v = 0; v < ie.length; v++)
          u[Ne + v] = ie[v];
      else e.deps = u = ie;
      if (!Ut)
        for (v = Ne; v < u.length; v++)
          ((d = u[v]).reactions ?? (d.reactions = [])).push(e);
    } else u !== null && Ne < u.length && (br(e, Ne), (u.length = Ne));
    return l;
  } finally {
    (ie = t), (Ne = r), (ht = n), (z = a), (Ut = o), (Ye = s), (Z = c);
  }
}
function bi(e, t) {
  let r = t.reactions;
  if (r !== null) {
    var n = r.indexOf(e);
    if (n !== -1) {
      var a = r.length - 1;
      a === 0 ? (r = t.reactions = null) : ((r[n] = r[a]), r.pop());
    }
  }
  r === null &&
    t.f & Je &&
    (ie === null || !ie.includes(t)) &&
    (Ie(t, Dt), t.f & (Lt | Wr) || (t.f ^= Wr), br(t, 0));
}
function br(e, t) {
  var r = e.deps;
  if (r !== null) for (var n = t; n < r.length; n++) bi(e, r[n]);
}
function Lr(e) {
  var t = e.f;
  if (!(t & Er)) {
    Ie(e, fe);
    var r = M;
    M = e;
    try {
      t & nn ? fi(e) : xo(e), yo(e), wo(e);
      var n = Ro(e);
      (e.teardown = typeof n == "function" ? n : null), (e.version = Lo);
    } catch (a) {
      Ci(a);
    } finally {
      M = r;
    }
  }
}
function $o() {
  Gt > 1e3 && ((Gt = 0), Is()), Gt++;
}
function Fo(e) {
  var t = e.length;
  if (t !== 0) {
    $o();
    var r = Zt;
    Zt = !0;
    try {
      for (var n = 0; n < t; n++) {
        var a = e[n];
        a.f & fe || (a.f ^= fe);
        var o = [];
        Mo(a, o), wi(o);
      }
    } finally {
      Zt = r;
    }
  }
}
function wi(e) {
  var t = e.length;
  if (t !== 0)
    for (var r = 0; r < t; r++) {
      var n = e[r];
      !(n.f & (Er | Ke)) &&
        sr(n) &&
        (Lr(n),
        n.deps === null &&
          n.first === null &&
          n.nodes_start === null &&
          (n.teardown === null ? To(n) : (n.fn = null)));
    }
}
function yi() {
  if (((Cr = !1), Gt > 1001)) return;
  const e = Tt;
  (Tt = []), Fo(e), Cr || (Gt = 0);
}
function an(e) {
  jr === Oo && (Cr || ((Cr = !0), queueMicrotask(yi)));
  for (var t = e; t.parent !== null; ) {
    t = t.parent;
    var r = t.f;
    if (r & (Sr | ze)) {
      if (!(r & fe)) return;
      t.f ^= fe;
    }
  }
  Tt.push(t);
}
function Mo(e, t) {
  var r = e.first,
    n = [];
  e: for (; r !== null; ) {
    var a = r.f,
      o = (a & ze) !== 0,
      s = o && (a & fe) !== 0;
    if (!s && !(a & Ke))
      if (a & Nr) {
        o ? (r.f ^= fe) : sr(r) && Lr(r);
        var c = r.first;
        if (c !== null) {
          r = c;
          continue;
        }
      } else a & ro && n.push(r);
    var i = r.next;
    if (i === null) {
      let v = r.parent;
      for (; v !== null; ) {
        if (e === v) break e;
        var l = v.next;
        if (l !== null) {
          r = l;
          continue e;
        }
        v = v.parent;
      }
    }
    r = i;
  }
  for (var u = 0; u < n.length; u++) (c = n[u]), t.push(c), Mo(c, t);
}
function on(e) {
  var t = jr,
    r = Tt;
  try {
    $o();
    const a = [];
    (jr = hi), (Tt = a), (Cr = !1), Fo(r);
    var n = e?.();
    return _i(), (Tt.length > 0 || a.length > 0) && on(), (Gt = 0), n;
  } finally {
    (jr = t), (Tt = r);
  }
}
async function Vo() {
  await Promise.resolve(), on();
}
function p(e) {
  var t = e.f,
    r = (t & Je) !== 0;
  if (r && t & Er) {
    var n = ho(e);
    return Qn(e), n;
  }
  if ((Bt && qt.add(e), z !== null)) {
    Ye !== null && Ye.includes(e) && Xs();
    var a = z.deps;
    ie === null && a !== null && a[Ne] === e
      ? Ne++
      : ie === null
        ? (ie = [e])
        : ie.push(e),
      ht !== null &&
        M !== null &&
        M.f & fe &&
        !(M.f & ze) &&
        ht.includes(e) &&
        (Ie(M, mt), an(M));
  } else if (r && e.deps === null) {
    var o = e,
      s = o.parent;
    s !== null &&
      !s.deriveds?.includes(o) &&
      (s.deriveds ?? (s.deriveds = [])).push(o);
  }
  return r && ((o = e), sr(o) && mo(o)), e.v;
}
function xi(e) {
  var t = Bt,
    r = qt;
  (Bt = !0), (qt = new Set());
  var n = qt,
    a;
  try {
    We(e);
  } finally {
    if (((Bt = t), Bt)) for (a of qt) r.add(a);
    qt = r;
  }
  for (a of n)
    if (a.f & ao) for (const o of a.deps || []) o.f & Je || _a(o, null);
    else _a(a, null);
}
function We(e) {
  const t = z;
  try {
    return (z = null), e();
  } finally {
    z = t;
  }
}
const Ti = ~(mt | Dt | fe);
function Ie(e, t) {
  e.f = (e.f & Ti) | t;
}
function Q(e, t = !1, r) {
  (Z = { p: Z, c: null, e: null, m: !1, s: e, x: null, l: null }),
    tr && !t && (Z.l = { s: null, u: null, r1: [], r2: de(!1) });
}
function D(e) {
  const t = Z;
  if (t !== null) {
    const s = t.e;
    if (s !== null) {
      var r = M,
        n = z;
      t.e = null;
      try {
        for (var a = 0; a < s.length; a++) {
          var o = s[a];
          be(o.effect), Me(o.reaction), nr(o.fn);
        }
      } finally {
        be(r), Me(n);
      }
    }
    (Z = t.p), (t.m = !0);
  }
  return {};
}
function Ni(e) {
  if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
    if (_t in e) Fn(e);
    else if (!Array.isArray(e))
      for (let t in e) {
        const r = e[t];
        typeof r == "object" && r && _t in r && Fn(r);
      }
  }
}
function Fn(e, t = new Set()) {
  if (
    typeof e == "object" &&
    e !== null &&
    !(e instanceof EventTarget) &&
    !t.has(e)
  ) {
    t.add(e), e instanceof Date && e.getTime();
    for (let n in e)
      try {
        Fn(e[n], t);
      } catch {}
    const r = Br(e);
    if (
      r !== Object.prototype &&
      r !== Array.prototype &&
      r !== Map.prototype &&
      r !== Set.prototype &&
      r !== Date.prototype
    ) {
      const n = to(r);
      for (let a in n) {
        const o = n[a].get;
        if (o)
          try {
            o.call(e);
          } catch {}
      }
    }
  }
}
function Si(e) {
  F && Qe(e) !== null && Jn(e);
}
let wa = !1;
function jo() {
  wa ||
    ((wa = !0),
    document.addEventListener(
      "reset",
      (e) => {
        Promise.resolve().then(() => {
          if (!e.defaultPrevented)
            for (const t of e.target.elements) t.__on_r?.();
        });
      },
      { capture: !0 },
    ));
}
function qo(e) {
  var t = z,
    r = M;
  Me(null), be(null);
  try {
    return e();
  } finally {
    Me(t), be(r);
  }
}
function Uo(e, t, r, n = r) {
  e.addEventListener(t, () => qo(r));
  const a = e.__on_r;
  a
    ? (e.__on_r = () => {
        a(), n();
      })
    : (e.__on_r = n),
    jo();
}
const Ei = new Set(),
  ya = new Set();
function Ai(e, t, r, n) {
  function a(o) {
    if ((n.capture || vr.call(t, o), !o.cancelBubble))
      return qo(() => r.call(this, o));
  }
  return (
    e.startsWith("pointer") || e.startsWith("touch") || e === "wheel"
      ? kr(() => {
          t.addEventListener(e, a, n);
        })
      : t.addEventListener(e, a, n),
    a
  );
}
function G(e, t, r, n, a) {
  var o = { capture: n, passive: a },
    s = Ai(e, t, r, o);
  (t === document.body || t === window || t === document) &&
    Co(() => {
      t.removeEventListener(e, s, o);
    });
}
function vr(e) {
  var t = this,
    r = t.ownerDocument,
    n = e.type,
    a = e.composedPath?.() || [],
    o = a[0] || e.target,
    s = 0,
    c = e.__root;
  if (c) {
    var i = a.indexOf(c);
    if (i !== -1 && (t === document || t === window)) {
      e.__root = t;
      return;
    }
    var l = a.indexOf(t);
    if (l === -1) return;
    i <= l && (s = i);
  }
  if (((o = a[s] || e.target), o !== t)) {
    eo(e, "currentTarget", {
      configurable: !0,
      get() {
        return o || r;
      },
    });
    var u = z,
      v = M;
    Me(null), be(null);
    try {
      for (var d, f = []; o !== null; ) {
        var _ = o.assignedSlot || o.parentNode || o.host || null;
        try {
          var g = o["__" + n];
          if (g !== void 0 && !o.disabled)
            if (Hn(g)) {
              var [C, ...b] = g;
              C.apply(o, [e, ...b]);
            } else g.call(o, e);
        } catch (x) {
          d ? f.push(x) : (d = x);
        }
        if (e.cancelBubble || _ === t || _ === null) break;
        o = _;
      }
      if (d) {
        for (let x of f)
          queueMicrotask(() => {
            throw x;
          });
        throw d;
      }
    } finally {
      (e.__root = t), delete e.currentTarget, Me(u), be(v);
    }
  }
}
function Bo(e) {
  var t = document.createElement("template");
  return (t.innerHTML = e), t.content;
}
function Xe(e, t) {
  var r = M;
  r.nodes_start === null && ((r.nodes_start = e), (r.nodes_end = t));
}
function A(e, t) {
  var r = (t & ii) !== 0,
    n = (t & li) !== 0,
    a,
    o = !e.startsWith("<!>");
  return () => {
    if (F) return Xe(U, null), U;
    a === void 0 && ((a = Bo(o ? e : "<!>" + e)), r || (a = Qe(a)));
    var s = n ? document.importNode(a, !0) : a.cloneNode(!0);
    if (r) {
      var c = Qe(s),
        i = s.lastChild;
      Xe(c, i);
    } else Xe(s, s);
    return s;
  };
}
function ve(e, t, r = "svg") {
  var n = !e.startsWith("<!>"),
    a = `<${r}>${n ? e : "<!>" + e}</${r}>`,
    o;
  return () => {
    if (F) return Xe(U, null), U;
    if (!o) {
      var s = Bo(a),
        c = Qe(s);
      o = Qe(c);
    }
    var i = o.cloneNode(!0);
    return Xe(i, i), i;
  };
}
function ki(e = "") {
  if (!F) {
    var t = gt(e + "");
    return Xe(t, t), t;
  }
  var r = U;
  return r.nodeType !== 3 && (r.before((r = gt())), $e(r)), Xe(r, r), r;
}
function Ce() {
  if (F) return Xe(U, null), U;
  var e = document.createDocumentFragment(),
    t = document.createComment(""),
    r = gt();
  return e.append(t, r), Xe(t, r), e;
}
function T(e, t) {
  if (F) {
    (M.nodes_end = U), Pt();
    return;
  }
  e !== null && e.before(t);
}
const Oi = ["touchstart", "touchmove"];
function Li(e) {
  return Oi.includes(e);
}
let Mn = !0;
function R(e, t) {
  var r = t == null ? "" : typeof t == "object" ? t + "" : t;
  r !== (e.__t ?? (e.__t = e.nodeValue)) &&
    ((e.__t = r), (e.nodeValue = r == null ? "" : r + ""));
}
function Ho(e, t) {
  return Wo(e, t);
}
function Pi(e, t) {
  Pn(), (t.intro = t.intro ?? !1);
  const r = t.target,
    n = F,
    a = U;
  try {
    for (var o = Qe(r); o && (o.nodeType !== 8 || o.data !== fo); ) o = lt(o);
    if (!o) throw pr;
    ot(!0), $e(o), Pt();
    const s = Wo(e, { ...t, anchor: o });
    if (U === null || U.nodeType !== 8 || U.data !== Kn) throw (Yn(), pr);
    return ot(!1), s;
  } catch (s) {
    if (s === pr)
      return t.recover === !1 && Zs(), Pn(), Jn(r), ot(!1), Ho(e, t);
    throw s;
  } finally {
    ot(n), $e(a);
  }
}
const Mt = new Map();
function Wo(
  e,
  { target: t, anchor: r, props: n = {}, events: a, context: o, intro: s = !0 },
) {
  Pn();
  var c = new Set(),
    i = (v) => {
      for (var d = 0; d < v.length; d++) {
        var f = v[d];
        if (!c.has(f)) {
          c.add(f);
          var _ = Li(f);
          t.addEventListener(f, vr, { passive: _ });
          var g = Mt.get(f);
          g === void 0
            ? (document.addEventListener(f, vr, { passive: _ }), Mt.set(f, 1))
            : Mt.set(f, g + 1);
        }
      }
    };
  i(Wn(Ei)), ya.add(i);
  var l = void 0,
    u = di(() => {
      var v = r ?? t.appendChild(gt());
      return (
        He(() => {
          if (o) {
            Q({});
            var d = Z;
            d.c = o;
          }
          a && (n.$$events = a),
            F && Xe(v, null),
            (Mn = s),
            (l = e(v, n) || {}),
            (Mn = !0),
            F && (M.nodes_end = U),
            o && D();
        }),
        () => {
          for (var d of c) {
            t.removeEventListener(d, vr);
            var f = Mt.get(d);
            --f === 0
              ? (document.removeEventListener(d, vr), Mt.delete(d))
              : Mt.set(d, f);
          }
          ya.delete(i), Vn.delete(l), v !== r && v.parentNode?.removeChild(v);
        }
      );
    });
  return Vn.set(l, u), l;
}
let Vn = new WeakMap();
function Ri(e) {
  const t = Vn.get(e);
  t && t();
}
const bn = 0,
  Fr = 1,
  wn = 2;
function $i(e, t, r, n, a) {
  F && Pt();
  var o = e,
    s = Or(),
    c = Z,
    i,
    l,
    u,
    v,
    d = (s ? de : At)(void 0),
    f = (s ? de : At)(void 0),
    _ = !1;
  function g(b, x) {
    (_ = !0), x && (be(C), Me(C), ba(c));
    try {
      b === bn && r && (l ? Et(l) : (l = He(() => r(o)))),
        b === Fr && n && (u ? Et(u) : (u = He(() => n(o, d)))),
        b === wn && a && (v ? Et(v) : (v = He(() => a(o, f)))),
        b !== bn && l && St(l, () => (l = null)),
        b !== Fr && u && St(u, () => (u = null)),
        b !== wn && v && St(v, () => (v = null));
    } finally {
      x && (ba(null), Me(null), be(null), on());
    }
  }
  var C = or(() => {
    if (i !== (i = t())) {
      if (js(i)) {
        var b = i;
        (_ = !1),
          b.then(
            (x) => {
              b === i && (It(d, x), g(Fr, !0));
            },
            (x) => {
              if (b === i) throw (It(f, x), g(wn, !0), f.v);
            },
          ),
          F
            ? r && (l = He(() => r(o)))
            : kr(() => {
                _ || g(bn, !0);
              });
      } else It(d, i), g(Fr, !1);
      return () => (i = null);
    }
  });
  F && (o = U);
}
function W(e, t, r, n = null, a = !1) {
  F && Pt();
  var o = e,
    s = null,
    c = null,
    i = null,
    l = a ? er : 0;
  or(() => {
    if (i === (i = !!t())) return;
    let u = !1;
    if (F) {
      const v = o.data === Gn;
      i === v && ((o = On()), $e(o), ot(!1), (u = !0));
    }
    i
      ? (s ? Et(s) : (s = He(() => r(o))),
        c &&
          St(c, () => {
            c = null;
          }))
      : (c ? Et(c) : n && (c = He(() => n(o))),
        s &&
          St(s, () => {
            s = null;
          })),
      u && ot(!0);
  }, l),
    F && (o = U);
}
function Jt(e, t) {
  return t;
}
function Fi(e, t, r, n) {
  for (var a = [], o = t.length, s = 0; s < o; s++) Dn(t[s].e, a, !0);
  var c = o > 0 && a.length === 0 && r !== null;
  if (c) {
    var i = r.parentNode;
    Jn(i), i.append(r), n.clear(), ft(e, t[0].prev, t[o - 1].next);
  }
  No(a, () => {
    for (var l = 0; l < o; l++) {
      var u = t[l];
      c || (n.delete(u.k), ft(e, u.prev, u.next)), bt(u.e, !c);
    }
  });
}
function kt(e, t, r, n, a, o = null) {
  var s = e,
    c = { flags: t, items: new Map(), first: null },
    i = (t & uo) !== 0;
  if (i) {
    var l = e;
    s = F ? $e(Qe(l)) : l.appendChild(gt());
  }
  F && Pt();
  var u = null,
    v = !1;
  or(() => {
    var d = r(),
      f = Hn(d) ? d : d == null ? [] : Wn(d),
      _ = f.length;
    if (v && _ === 0) return;
    v = _ === 0;
    let g = !1;
    if (F) {
      var C = s.data === Gn;
      C !== (_ === 0) && ((s = On()), $e(s), ot(!1), (g = !0));
    }
    if (F) {
      for (var b = null, x, S = 0; S < _; S++) {
        if (U.nodeType === 8 && U.data === Kn) {
          (s = U), (g = !0), ot(!1);
          break;
        }
        var y = f[S],
          N = n(y, S);
        (x = zo(U, c, b, null, y, N, S, a, t)), c.items.set(N, x), (b = x);
      }
      _ > 0 && $e(On());
    }
    if (!F) {
      var k = z;
      Mi(f, c, s, a, t, (k.f & Ke) !== 0, n);
    }
    o !== null &&
      (_ === 0
        ? u
          ? Et(u)
          : (u = He(() => o(s)))
        : u !== null &&
          St(u, () => {
            u = null;
          })),
      g && ot(!0),
      r();
  }),
    F && (s = U);
}
function Mi(e, t, r, n, a, o, s) {
  var c = (a & Ds) !== 0,
    i = (a & (In | Zn)) !== 0,
    l = e.length,
    u = t.items,
    v = t.first,
    d = v,
    f,
    _ = null,
    g,
    C = [],
    b = [],
    x,
    S,
    y,
    N;
  if (c)
    for (N = 0; N < l; N += 1)
      (x = e[N]),
        (S = s(x, N)),
        (y = u.get(S)),
        y !== void 0 && (y.a?.measure(), (g ?? (g = new Set())).add(y));
  for (N = 0; N < l; N += 1) {
    if (((x = e[N]), (S = s(x, N)), (y = u.get(S)), y === void 0)) {
      var k = d ? d.e.nodes_start : r;
      (_ = zo(k, t, _, _ === null ? t.first : _.next, x, S, N, n, a)),
        u.set(S, _),
        (C = []),
        (b = []),
        (d = _.next);
      continue;
    }
    if (
      (i && Vi(y, x, N, a),
      y.e.f & Ke &&
        (Et(y.e), c && (y.a?.unfix(), (g ?? (g = new Set())).delete(y))),
      y !== d)
    ) {
      if (f !== void 0 && f.has(y)) {
        if (C.length < b.length) {
          var L = b[0],
            P;
          _ = L.prev;
          var B = C[0],
            q = C[C.length - 1];
          for (P = 0; P < C.length; P += 1) xa(C[P], L, r);
          for (P = 0; P < b.length; P += 1) f.delete(b[P]);
          ft(t, B.prev, q.next),
            ft(t, _, B),
            ft(t, q, L),
            (d = L),
            (_ = q),
            (N -= 1),
            (C = []),
            (b = []);
        } else
          f.delete(y),
            xa(y, d, r),
            ft(t, y.prev, y.next),
            ft(t, y, _ === null ? t.first : _.next),
            ft(t, _, y),
            (_ = y);
        continue;
      }
      for (C = [], b = []; d !== null && d.k !== S; )
        (o || !(d.e.f & Ke)) && (f ?? (f = new Set())).add(d),
          b.push(d),
          (d = d.next);
      if (d === null) continue;
      y = d;
    }
    C.push(y), (_ = y), (d = y.next);
  }
  if (d !== null || f !== void 0) {
    for (var I = f === void 0 ? [] : Wn(f); d !== null; )
      (o || !(d.e.f & Ke)) && I.push(d), (d = d.next);
    var K = I.length;
    if (K > 0) {
      var j = a & uo && l === 0 ? r : null;
      if (c) {
        for (N = 0; N < K; N += 1) I[N].a?.measure();
        for (N = 0; N < K; N += 1) I[N].a?.fix();
      }
      Fi(t, I, j, u);
    }
  }
  c &&
    kr(() => {
      if (g !== void 0) for (y of g) y.a?.apply();
    }),
    (M.first = t.first && t.first.e),
    (M.last = _ && _.e);
}
function Vi(e, t, r, n) {
  n & In && It(e.v, t), n & Zn ? It(e.i, r) : (e.i = r);
}
function zo(e, t, r, n, a, o, s, c, i) {
  var l = (i & In) !== 0,
    u = (i & ei) === 0,
    v = l ? (u ? At(a) : de(a)) : a,
    d = i & Zn ? de(s) : s,
    f = { i: d, v, k: o, a: null, e: null, prev: r, next: n };
  try {
    return (
      (f.e = He(() => c(e, v, d), F)),
      (f.e.prev = r && r.e),
      (f.e.next = n && n.e),
      r === null ? (t.first = f) : ((r.next = f), (r.e.next = f.e)),
      n !== null && ((n.prev = f), (n.e.prev = f.e)),
      f
    );
  } finally {
  }
}
function xa(e, t, r) {
  for (
    var n = e.next ? e.next.e.nodes_start : r,
      a = t ? t.e.nodes_start : r,
      o = e.e.nodes_start;
    o !== n;

  ) {
    var s = lt(o);
    a.before(o), (o = s);
  }
}
function ft(e, t, r) {
  t === null ? (e.first = r) : ((t.next = r), (t.e.next = r && r.e)),
    r !== null && ((r.prev = t), (r.e.prev = t && t.e));
}
function wr(e, t, r, n, a) {
  F && Pt();
  var o = t.$$slots?.[r],
    s = !1;
  o === !0 && ((o = t.children), (s = !0)),
    o === void 0 || o(e, s ? () => n : n);
}
function ji(e, t, ...r) {
  var n = e,
    a = Le,
    o;
  or(() => {
    a !== (a = t()) && (o && (bt(o), (o = null)), (o = He(() => a(n, ...r))));
  }, er),
    F && (n = U);
}
function qr(e, t, r) {
  F && Pt();
  var n = e,
    a,
    o;
  or(() => {
    a !== (a = t()) && (o && (St(o), (o = null)), a && (o = He(() => r(n, a))));
  }, er),
    F && (n = U);
}
function Gr(e) {
  if (F) {
    var t = !1,
      r = () => {
        if (!t) {
          if (((t = !0), e.hasAttribute("value"))) {
            var n = e.value;
            oe(e, "value", null), (e.value = n);
          }
          if (e.hasAttribute("checked")) {
            var a = e.checked;
            oe(e, "checked", null), (e.checked = a);
          }
        }
      };
    (e.__on_r = r), pi(r), jo();
  }
}
function oe(e, t, r, n) {
  var a = e.__attributes ?? (e.__attributes = {});
  (F &&
    ((a[t] = e.getAttribute(t)),
    t === "src" ||
      t === "srcset" ||
      (t === "href" && e.nodeName === "LINK"))) ||
    (a[t] !== (a[t] = r) &&
      (t === "style" && "__styles" in e && (e.__styles = {}),
      t === "loading" && (e[Bs] = r),
      r == null
        ? e.removeAttribute(t)
        : typeof r != "string" && qi(e).includes(t)
          ? (e[t] = r)
          : e.setAttribute(t, r)));
}
var Ta = new Map();
function qi(e) {
  var t = Ta.get(e.nodeName);
  if (t) return t;
  Ta.set(e.nodeName, (t = []));
  for (var r, n = Br(e), a = Element.prototype; a !== n; ) {
    r = to(n);
    for (var o in r) r[o].set && t.push(o);
    n = Br(n);
  }
  return t;
}
function pe(e, t) {
  var r = e.__className,
    n = Io(t);
  F && e.getAttribute("class") === n
    ? (e.__className = n)
    : (r !== n || (F && e.getAttribute("class") !== n)) &&
      (n === "" ? e.removeAttribute("class") : e.setAttribute("class", n),
      (e.__className = n));
}
function Se(e, t) {
  var r = e.__className,
    n = Io(t);
  F && e.className === n
    ? (e.__className = n)
    : (r !== n || (F && e.className !== n)) &&
      (t == null ? e.removeAttribute("class") : (e.className = n),
      (e.__className = n));
}
function Io(e) {
  return e ?? "";
}
const Ui = () => performance.now(),
  vt = {
    tick: (e) => requestAnimationFrame(e),
    now: () => Ui(),
    tasks: new Set(),
  };
function Zo(e) {
  vt.tasks.forEach((t) => {
    t.c(e) || (vt.tasks.delete(t), t.f());
  }),
    vt.tasks.size !== 0 && vt.tick(Zo);
}
function Bi(e) {
  let t;
  return (
    vt.tasks.size === 0 && vt.tick(Zo),
    {
      promise: new Promise((r) => {
        vt.tasks.add((t = { c: e, f: r }));
      }),
      abort() {
        vt.tasks.delete(t);
      },
    }
  );
}
function Na(e, t) {
  e.dispatchEvent(new CustomEvent(t));
}
function Hi(e) {
  if (e === "float") return "cssFloat";
  if (e === "offset") return "cssOffset";
  if (e.startsWith("--")) return e;
  const t = e.split("-");
  return t.length === 1
    ? t[0]
    : t[0] +
        t
          .slice(1)
          .map((r) => r[0].toUpperCase() + r.slice(1))
          .join("");
}
function Sa(e) {
  const t = {},
    r = e.split(";");
  for (const n of r) {
    const [a, o] = n.split(":");
    if (!a || o === void 0) break;
    const s = Hi(a.trim());
    t[s] = o.trim();
  }
  return t;
}
const Wi = (e) => e;
function Go(e, t, r, n) {
  var a = (e & si) !== 0,
    o = "in",
    s,
    c = t.inert,
    i,
    l;
  function u() {
    var g = z,
      C = M;
    Me(null), be(null);
    try {
      return s ?? (s = r()(t, n?.() ?? {}, { direction: o }));
    } finally {
      Me(g), be(C);
    }
  }
  var v = {
      is_global: a,
      in() {
        (t.inert = c),
          i?.abort(),
          Na(t, "introstart"),
          (i = Ko(t, u(), l, 1, () => {
            Na(t, "introend"), i?.abort(), (i = s = void 0);
          }));
      },
      out(g) {
        {
          g?.(), (s = void 0);
          return;
        }
      },
      stop: () => {
        i?.abort();
      },
    },
    d = M;
  if (((d.transitions ?? (d.transitions = [])).push(v), Mn)) {
    var f = a;
    if (!f) {
      for (var _ = d.parent; _ && _.f & er; )
        for (; (_ = _.parent) && !(_.f & nn); );
      f = !_ || (_.f & no) !== 0;
    }
    f &&
      nr(() => {
        We(() => v.in());
      });
  }
}
function Ko(e, t, r, n, a) {
  if (Vs(t)) {
    var o,
      s = !1;
    return (
      kr(() => {
        if (!s) {
          var g = t({ direction: "in" });
          o = Ko(e, g, r, n, a);
        }
      }),
      {
        abort: () => {
          (s = !0), o?.abort();
        },
        deactivate: () => o.deactivate(),
        reset: () => o.reset(),
        t: () => o.t(),
      }
    );
  }
  if (!t?.duration)
    return a(), { abort: Le, deactivate: Le, reset: Le, t: () => n };
  const { delay: c = 0, css: i, tick: l, easing: u = Wi } = t;
  var v = [];
  if ((l && l(0, 1), i)) {
    var d = Sa(i(0, 1));
    v.push(d, d);
  }
  var f = () => 1 - n,
    _ = e.animate(v, { duration: c });
  return (
    (_.onfinish = () => {
      var g = 1 - n,
        C = n - g,
        b = t.duration * Math.abs(C),
        x = [];
      if (b > 0) {
        if (i)
          for (
            var S = Math.ceil(b / 16.666666666666668), y = 0;
            y <= S;
            y += 1
          ) {
            var N = g + C * u(y / S),
              k = i(N, 1 - N);
            x.push(Sa(k));
          }
        (f = () => {
          var L = _.currentTime;
          return g + C * u(L / b);
        }),
          l &&
            Bi(() => {
              if (_.playState !== "running") return !1;
              var L = f();
              return l(L, 1 - L), !0;
            });
      }
      (_ = e.animate(x, { duration: b, fill: "forwards" })),
        (_.onfinish = () => {
          (f = () => n), l?.(n, 1 - n), a();
        });
    }),
    {
      abort: () => {
        _ && (_.cancel(), (_.effect = null), (_.onfinish = Le));
      },
      deactivate: () => {
        a = Le;
      },
      reset: () => {},
      t: () => f(),
    }
  );
}
function _r(e, t, r = t) {
  var n = Or();
  Uo(e, "input", () => {
    var a = Ea(e) ? Aa(e.value) : e.value;
    r(a), n && a !== (a = t()) && (e.value = a ?? "");
  }),
    Ar(() => {
      var a = t();
      if (F && e.defaultValue !== e.value) {
        r(e.value);
        return;
      }
      (Ea(e) && a === Aa(e.value)) ||
        (e.type === "date" && !a && !e.value) ||
        (a !== e.value && (e.value = a ?? ""));
    });
}
function Ea(e) {
  var t = e.type;
  return t === "number" || t === "range";
}
function Aa(e) {
  return e === "" ? null : +e;
}
function Yo(e, t, r) {
  if (e.multiple) return Zi(e, t);
  for (var n of e.options) {
    var a = hr(n);
    if (ci(a, t)) {
      n.selected = !0;
      return;
    }
  }
  (!r || t !== void 0) && (e.selectedIndex = -1);
}
function zi(e, t) {
  nr(() => {
    var r = new MutationObserver(() => {
      var n = e.__value;
      Yo(e, n);
    });
    return (
      r.observe(e, {
        childList: !0,
        subtree: !0,
        attributes: !0,
        attributeFilter: ["value"],
      }),
      () => {
        r.disconnect();
      }
    );
  });
}
function Ii(e, t, r = t) {
  var n = !0;
  Uo(e, "change", () => {
    var a;
    if (e.multiple) a = [].map.call(e.querySelectorAll(":checked"), hr);
    else {
      var o = e.querySelector(":checked");
      a = o && hr(o);
    }
    r(a);
  }),
    nr(() => {
      var a = t();
      if ((Yo(e, a, n), n && a === void 0)) {
        var o = e.querySelector(":checked");
        o !== null && ((a = hr(o)), r(a));
      }
      (e.__value = a), (n = !1);
    }),
    zi(e);
}
function Zi(e, t) {
  for (var r of e.options) r.selected = ~t.indexOf(hr(r));
}
function hr(e) {
  return "__value" in e ? e.__value : e.value;
}
function ka(e, t) {
  return e === t || e?.[_t] === t;
}
function yn(e = {}, t, r, n) {
  return (
    nr(() => {
      var a, o;
      return (
        Ar(() => {
          (a = o),
            (o = []),
            We(() => {
              e !== r(...o) &&
                (t(e, ...o), a && ka(r(...a), e) && t(null, ...a));
            });
        }),
        () => {
          kr(() => {
            o && ka(r(...o), e) && t(null, ...o);
          });
        }
      );
    }),
    e
  );
}
function Gi(e) {
  return function (...t) {
    var r = t[0];
    return r.preventDefault(), e?.apply(this, t);
  };
}
function ae(e = !1) {
  const t = Z,
    r = t.l.u;
  if (!r) return;
  let n = () => Ni(t.s);
  if (e) {
    let a = 0,
      o = {};
    const s = Nt(() => {
      let c = !1;
      const i = t.s;
      for (const l in i) i[l] !== o[l] && ((o[l] = i[l]), (c = !0));
      return c && a++, a;
    });
    n = () => p(s);
  }
  r.b.length &&
    bo(() => {
      Oa(t, n), Hr(r.b);
    }),
    zr(() => {
      const a = We(() => r.m.map(qs));
      return () => {
        for (const o of a) typeof o == "function" && o();
      };
    }),
    r.a.length &&
      zr(() => {
        Oa(t, n), Hr(r.a);
      });
}
function Oa(e, t) {
  if (e.l.s) for (const r of e.l.s) p(r);
  t();
}
function Ki(e, t, r) {
  if (e == null) return t(void 0), Le;
  const n = We(() => e.subscribe(t, r));
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
let Mr = !1;
function Ve(e, t, r) {
  const n =
    r[t] ?? (r[t] = { store: null, source: At(void 0), unsubscribe: Le });
  if (n.store !== e)
    if ((n.unsubscribe(), (n.store = e ?? null), e == null))
      (n.source.v = void 0), (n.unsubscribe = Le);
    else {
      var a = !0;
      (n.unsubscribe = Ki(e, (o) => {
        a ? (n.source.v = o) : E(n.source, o);
      })),
        (a = !1);
    }
  return p(n.source);
}
function La(e, t) {
  return e.set(t), t;
}
function je() {
  const e = {};
  return (
    Co(() => {
      for (var t in e) e[t].unsubscribe();
    }),
    e
  );
}
function Yi(e) {
  var t = Mr;
  try {
    return (Mr = !1), [e(), Mr];
  } finally {
    Mr = t;
  }
}
function Pa(e) {
  for (var t = M, r = M; t !== null && !(t.f & (ze | Sr)); ) t = t.parent;
  try {
    return be(t), e();
  } finally {
    be(r);
  }
}
function $(e, t, r, n) {
  var a = (r & ti) !== 0,
    o = !tr || (r & ri) !== 0,
    s = (r & ai) !== 0,
    c = (r & oi) !== 0,
    i = !1,
    l;
  s ? ([l, i] = Yi(() => e[t])) : (l = e[t]);
  var u = zt(e, t)?.set,
    v = n,
    d = !0,
    f = !1,
    _ = () => ((f = !0), d && ((d = !1), c ? (v = We(n)) : (v = n)), v);
  l === void 0 && n !== void 0 && (u && o && Gs(), (l = _()), u && u(l));
  var g;
  if (o)
    g = () => {
      var k = e[t];
      return k === void 0 ? _() : ((d = !0), (f = !1), k);
    };
  else {
    var C = Pa(() => (a ? Nt : Ee)(() => e[t]));
    (C.f |= ao),
      (g = () => {
        var k = p(C);
        return k !== void 0 && (v = void 0), k === void 0 ? v : k;
      });
  }
  if (!(r & ni)) return g;
  if (u) {
    var b = e.$$legacy;
    return function (k, L) {
      return arguments.length > 0
        ? ((!o || !L || b || i) && u(L ? g() : k), k)
        : g();
    };
  }
  var x = !1,
    S = !1,
    y = At(l),
    N = Pa(() =>
      Nt(() => {
        var k = g(),
          L = p(y);
        return x ? ((x = !1), (S = !0), L) : ((S = !1), (y.v = k));
      }),
    );
  return (
    a || (N.equals = zn),
    function (k, L) {
      if ((Bt && ((x = S), g(), p(y)), arguments.length > 0)) {
        const P = L ? p(N) : o && s ? xt(k) : k;
        return (
          N.equals(P) ||
            ((x = !0), E(y, P), f && v !== void 0 && (v = P), We(() => p(N))),
          k
        );
      }
      return p(N);
    }
  );
}
function Xi(e) {
  return class extends Ji {
    constructor(t) {
      super({ component: e, ...t });
    }
  };
}
var rt, Oe;
class Ji {
  constructor(t) {
    mn(this, rt);
    mn(this, Oe);
    var r = new Map(),
      n = (o, s) => {
        var c = At(s);
        return r.set(o, c), c;
      };
    const a = new Proxy(
      { ...(t.props || {}), $$events: {} },
      {
        get(o, s) {
          return p(r.get(s) ?? n(s, Reflect.get(o, s)));
        },
        has(o, s) {
          return p(r.get(s) ?? n(s, Reflect.get(o, s))), Reflect.has(o, s);
        },
        set(o, s, c) {
          return E(r.get(s) ?? n(s, c), c), Reflect.set(o, s, c);
        },
      },
    );
    gn(
      this,
      Oe,
      (t.hydrate ? Pi : Ho)(t.component, {
        target: t.target,
        anchor: t.anchor,
        props: a,
        context: t.context,
        intro: t.intro ?? !1,
        recover: t.recover,
      }),
    ),
      (!t?.props?.$$host || t.sync === !1) && on(),
      gn(this, rt, a.$$events);
    for (const o of Object.keys(ge(this, Oe)))
      o === "$set" ||
        o === "$destroy" ||
        o === "$on" ||
        eo(this, o, {
          get() {
            return ge(this, Oe)[o];
          },
          set(s) {
            ge(this, Oe)[o] = s;
          },
          enumerable: !0,
        });
    (ge(this, Oe).$set = (o) => {
      Object.assign(a, o);
    }),
      (ge(this, Oe).$destroy = () => {
        Ri(ge(this, Oe));
      });
  }
  $set(t) {
    ge(this, Oe).$set(t);
  }
  $on(t, r) {
    ge(this, rt)[t] = ge(this, rt)[t] || [];
    const n = (...a) => r.call(this, ...a);
    return (
      ge(this, rt)[t].push(n),
      () => {
        ge(this, rt)[t] = ge(this, rt)[t].filter((a) => a !== n);
      }
    );
  }
  $destroy() {
    ge(this, Oe).$destroy();
  }
}
(rt = new WeakMap()), (Oe = new WeakMap());
function _e(e) {
  Z === null && ko(),
    tr && Z.l !== null
      ? Di(Z).m.push(e)
      : zr(() => {
          const t = We(e);
          if (typeof t == "function") return t;
        });
}
function Qi(e) {
  Z === null && ko(), _e(() => () => We(e));
}
function Di(e) {
  var t = e.l;
  return t.u ?? (t.u = { a: [], b: [], m: [] });
}
new URL("sveltekit-internal://");
function el(e, t) {
  return e === "/" || t === "ignore"
    ? e
    : t === "never"
      ? e.endsWith("/")
        ? e.slice(0, -1)
        : e
      : t === "always" && !e.endsWith("/")
        ? e + "/"
        : e;
}
function tl(e) {
  return e.split("%25").map(decodeURI).join("%25");
}
function rl(e) {
  for (const t in e) e[t] = decodeURIComponent(e[t]);
  return e;
}
function xn({ href: e }) {
  return e.split("#")[0];
}
const nl = ["href", "pathname", "search", "toString", "toJSON"];
function al(e, t, r) {
  const n = new URL(e);
  Object.defineProperty(n, "searchParams", {
    value: new Proxy(n.searchParams, {
      get(a, o) {
        if (o === "get" || o === "getAll" || o === "has")
          return (c) => (r(c), a[o](c));
        t();
        const s = Reflect.get(a, o);
        return typeof s == "function" ? s.bind(a) : s;
      },
    }),
    enumerable: !0,
    configurable: !0,
  });
  for (const a of nl)
    Object.defineProperty(n, a, {
      get() {
        return t(), e[a];
      },
      enumerable: !0,
      configurable: !0,
    });
  return n;
}
const ol = "/__data.json",
  sl = ".html__data.json";
function il(e) {
  return e.endsWith(".html")
    ? e.replace(/\.html$/, sl)
    : e.replace(/\/$/, "") + ol;
}
function ll(...e) {
  let t = 5381;
  for (const r of e)
    if (typeof r == "string") {
      let n = r.length;
      for (; n; ) t = (t * 33) ^ r.charCodeAt(--n);
    } else if (ArrayBuffer.isView(r)) {
      const n = new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
      let a = n.length;
      for (; a; ) t = (t * 33) ^ n[--a];
    } else throw new TypeError("value must be a string or TypedArray");
  return (t >>> 0).toString(36);
}
var K2 =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
function Y2(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
function cl(e) {
  const t = atob(e),
    r = new Uint8Array(t.length);
  for (let n = 0; n < t.length; n++) r[n] = t.charCodeAt(n);
  return r.buffer;
}
const Xo = window.fetch;
window.fetch = (e, t) => (
  (e instanceof Request ? e.method : t?.method || "GET") !== "GET" &&
    mr.delete(ta(e)),
  Xo(e, t)
);
const mr = new Map();
function ul(e, t) {
  const r = ta(e, t),
    n = document.querySelector(r);
  if (n?.textContent) {
    let { body: a, ...o } = JSON.parse(n.textContent);
    const s = n.getAttribute("data-ttl");
    return (
      s && mr.set(r, { body: a, init: o, ttl: 1e3 * Number(s) }),
      n.getAttribute("data-b64") !== null && (a = cl(a)),
      Promise.resolve(new Response(a, o))
    );
  }
  return window.fetch(e, t);
}
function dl(e, t, r) {
  if (mr.size > 0) {
    const n = ta(e, r),
      a = mr.get(n);
    if (a) {
      if (
        performance.now() < a.ttl &&
        ["default", "force-cache", "only-if-cached", void 0].includes(r?.cache)
      )
        return new Response(a.body, a.init);
      mr.delete(n);
    }
  }
  return window.fetch(t, r);
}
function ta(e, t) {
  let n = `script[data-sveltekit-fetched][data-url=${JSON.stringify(e instanceof Request ? e.url : e)}]`;
  if (t?.headers || t?.body) {
    const a = [];
    t.headers && a.push([...new Headers(t.headers)].join(",")),
      t.body &&
        (typeof t.body == "string" || ArrayBuffer.isView(t.body)) &&
        a.push(t.body),
      (n += `[data-hash="${ll(...a)}"]`);
  }
  return n;
}
const fl = /^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;
function vl(e) {
  const t = [];
  return {
    pattern:
      e === "/"
        ? /^\/$/
        : new RegExp(
            `^${_l(e)
              .map((n) => {
                const a = /^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(n);
                if (a)
                  return (
                    t.push({
                      name: a[1],
                      matcher: a[2],
                      optional: !1,
                      rest: !0,
                      chained: !0,
                    }),
                    "(?:/(.*))?"
                  );
                const o = /^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(n);
                if (o)
                  return (
                    t.push({
                      name: o[1],
                      matcher: o[2],
                      optional: !0,
                      rest: !1,
                      chained: !0,
                    }),
                    "(?:/([^/]+))?"
                  );
                if (!n) return;
                const s = n.split(/\[(.+?)\](?!\])/);
                return (
                  "/" +
                  s
                    .map((i, l) => {
                      if (l % 2) {
                        if (i.startsWith("x+"))
                          return Tn(
                            String.fromCharCode(parseInt(i.slice(2), 16)),
                          );
                        if (i.startsWith("u+"))
                          return Tn(
                            String.fromCharCode(
                              ...i
                                .slice(2)
                                .split("-")
                                .map((g) => parseInt(g, 16)),
                            ),
                          );
                        const u = fl.exec(i),
                          [, v, d, f, _] = u;
                        return (
                          t.push({
                            name: f,
                            matcher: _,
                            optional: !!v,
                            rest: !!d,
                            chained: d ? l === 1 && s[0] === "" : !1,
                          }),
                          d ? "(.*?)" : v ? "([^/]*)?" : "([^/]+?)"
                        );
                      }
                      return Tn(i);
                    })
                    .join("")
                );
              })
              .join("")}/?$`,
          ),
    params: t,
  };
}
function pl(e) {
  return !/^\([^)]+\)$/.test(e);
}
function _l(e) {
  return e.slice(1).split("/").filter(pl);
}
function hl(e, t, r) {
  const n = {},
    a = e.slice(1),
    o = a.filter((c) => c !== void 0);
  let s = 0;
  for (let c = 0; c < t.length; c += 1) {
    const i = t[c];
    let l = a[c - s];
    if (
      (i.chained &&
        i.rest &&
        s &&
        ((l = a
          .slice(c - s, c + 1)
          .filter((u) => u)
          .join("/")),
        (s = 0)),
      l === void 0)
    ) {
      i.rest && (n[i.name] = "");
      continue;
    }
    if (!i.matcher || r[i.matcher](l)) {
      n[i.name] = l;
      const u = t[c + 1],
        v = a[c + 1];
      u && !u.rest && u.optional && v && i.chained && (s = 0),
        !u && !v && Object.keys(n).length === o.length && (s = 0);
      continue;
    }
    if (i.optional && i.chained) {
      s++;
      continue;
    }
    return;
  }
  if (!s) return n;
}
function Tn(e) {
  return e
    .normalize()
    .replace(/[[\]]/g, "\\$&")
    .replace(/%/g, "%25")
    .replace(/\//g, "%2[Ff]")
    .replace(/\?/g, "%3[Ff]")
    .replace(/#/g, "%23")
    .replace(/[.*+?^${}()|\\]/g, "\\$&");
}
function ml({ nodes: e, server_loads: t, dictionary: r, matchers: n }) {
  const a = new Set(t);
  return Object.entries(r).map(([c, [i, l, u]]) => {
    const { pattern: v, params: d } = vl(c),
      f = {
        id: c,
        exec: (_) => {
          const g = v.exec(_);
          if (g) return hl(g, d, n);
        },
        errors: [1, ...(u || [])].map((_) => e[_]),
        layouts: [0, ...(l || [])].map(s),
        leaf: o(i),
      };
    return (
      (f.errors.length = f.layouts.length =
        Math.max(f.errors.length, f.layouts.length)),
      f
    );
  });
  function o(c) {
    const i = c < 0;
    return i && (c = ~c), [i, e[c]];
  }
  function s(c) {
    return c === void 0 ? c : [a.has(c), e[c]];
  }
}
function Jo(e, t = JSON.parse) {
  try {
    return t(sessionStorage[e]);
  } catch {}
}
function Ra(e, t, r = JSON.stringify) {
  const n = r(t);
  try {
    sessionStorage[e] = n;
  } catch {}
}
const Vt = [];
function ct(e, t = Le) {
  let r = null;
  const n = new Set();
  function a(c) {
    if (io(e, c) && ((e = c), r)) {
      const i = !Vt.length;
      for (const l of n) l[1](), Vt.push(l, e);
      if (i) {
        for (let l = 0; l < Vt.length; l += 2) Vt[l][0](Vt[l + 1]);
        Vt.length = 0;
      }
    }
  }
  function o(c) {
    a(c(e));
  }
  function s(c, i = Le) {
    const l = [c, i];
    return (
      n.add(l),
      n.size === 1 && (r = t(a, o) || Le),
      c(e),
      () => {
        n.delete(l), n.size === 0 && r && (r(), (r = null));
      }
    );
  }
  return { set: a, update: o, subscribe: s };
}
const Fe = globalThis.__sveltekit_jufxgf?.base ?? "",
  gl = globalThis.__sveltekit_jufxgf?.assets ?? Fe,
  Cl = "1744817542818",
  Qo = "sveltekit:snapshot",
  Do = "sveltekit:scroll",
  es = "sveltekit:states",
  bl = "sveltekit:pageurl",
  Kt = "sveltekit:history",
  yr = "sveltekit:navigation",
  Kr = { tap: 1, hover: 2, viewport: 3, eager: 4, off: -1, false: -1 },
  Pr = location.origin;
function ts(e) {
  if (e instanceof URL) return e;
  let t = document.baseURI;
  if (!t) {
    const r = document.getElementsByTagName("base");
    t = r.length ? r[0].href : document.URL;
  }
  return new URL(e, t);
}
function ra() {
  return { x: pageXOffset, y: pageYOffset };
}
function jt(e, t) {
  return e.getAttribute(`data-sveltekit-${t}`);
}
const $a = { ...Kr, "": Kr.hover };
function rs(e) {
  let t = e.assignedSlot ?? e.parentNode;
  return t?.nodeType === 11 && (t = t.host), t;
}
function ns(e, t) {
  for (; e && e !== t; ) {
    if (e.nodeName.toUpperCase() === "A" && e.hasAttribute("href")) return e;
    e = rs(e);
  }
}
function jn(e, t) {
  let r;
  try {
    r = new URL(
      e instanceof SVGAElement ? e.href.baseVal : e.href,
      document.baseURI,
    );
  } catch {}
  const n = e instanceof SVGAElement ? e.target.baseVal : e.target,
    a =
      !r ||
      !!n ||
      sn(r, t) ||
      (e.getAttribute("rel") || "").split(/\s+/).includes("external"),
    o = r?.origin === Pr && e.hasAttribute("download");
  return { url: r, external: a, target: n, download: o };
}
function Yr(e) {
  let t = null,
    r = null,
    n = null,
    a = null,
    o = null,
    s = null,
    c = e;
  for (; c && c !== document.documentElement; )
    n === null && (n = jt(c, "preload-code")),
      a === null && (a = jt(c, "preload-data")),
      t === null && (t = jt(c, "keepfocus")),
      r === null && (r = jt(c, "noscroll")),
      o === null && (o = jt(c, "reload")),
      s === null && (s = jt(c, "replacestate")),
      (c = rs(c));
  function i(l) {
    switch (l) {
      case "":
      case "true":
        return !0;
      case "off":
      case "false":
        return !1;
      default:
        return;
    }
  }
  return {
    preload_code: $a[n ?? "off"],
    preload_data: $a[a ?? "off"],
    keepfocus: i(t),
    noscroll: i(r),
    reload: i(o),
    replace_state: i(s),
  };
}
function Fa(e) {
  const t = ct(e);
  let r = !0;
  function n() {
    (r = !0), t.update((s) => s);
  }
  function a(s) {
    (r = !1), t.set(s);
  }
  function o(s) {
    let c;
    return t.subscribe((i) => {
      (c === void 0 || (r && i !== c)) && s((c = i));
    });
  }
  return { notify: n, set: a, subscribe: o };
}
function wl() {
  const { set: e, subscribe: t } = ct(!1);
  let r;
  async function n() {
    clearTimeout(r);
    try {
      const a = await fetch(`${gl}/_app/version.json`, {
        headers: { pragma: "no-cache", "cache-control": "no-cache" },
      });
      if (!a.ok) return !1;
      const s = (await a.json()).version !== Cl;
      return s && (e(!0), clearTimeout(r)), s;
    } catch {
      return !1;
    }
  }
  return { subscribe: t, check: n };
}
function sn(e, t) {
  return e.origin !== Pr || !e.pathname.startsWith(t);
}
const as = new Set([
  "load",
  "prerender",
  "csr",
  "ssr",
  "trailingSlash",
  "config",
]);
[...as];
const yl = new Set([...as]);
[...yl];
function xl(e) {
  return e.filter((t) => t != null);
}
class ln {
  constructor(t, r) {
    (this.status = t),
      typeof r == "string"
        ? (this.body = { message: r })
        : r
          ? (this.body = r)
          : (this.body = { message: `Error: ${t}` });
  }
  toString() {
    return JSON.stringify(this.body);
  }
}
class os {
  constructor(t, r) {
    (this.status = t), (this.location = r);
  }
}
class na extends Error {
  constructor(t, r, n) {
    super(n), (this.status = t), (this.text = r);
  }
}
const Tl = "x-sveltekit-invalidated",
  Nl = "x-sveltekit-trailing-slash";
function Xr(e) {
  return e instanceof ln || e instanceof na ? e.status : 500;
}
function Sl(e) {
  return e instanceof na ? e.text : "Internal Error";
}
const Ot = Jo(Do) ?? {},
  xr = Jo(Qo) ?? {},
  st = { url: Fa({}), page: Fa({}), navigating: ct(null), updated: wl() };
function aa(e) {
  Ot[e] = ra();
}
function El(e, t) {
  let r = e + 1;
  for (; Ot[r]; ) delete Ot[r], (r += 1);
  for (r = t + 1; xr[r]; ) delete xr[r], (r += 1);
}
function Qt(e) {
  return (location.href = e.href), new Promise(() => {});
}
async function ss() {
  if ("serviceWorker" in navigator) {
    const e = await navigator.serviceWorker.getRegistration(Fe || "/");
    e && (await e.update());
  }
}
function Ma() {}
let cn, qn, Jr, nt, Un, ir;
const is = [],
  Qr = [];
let pt = null;
const ls = [],
  Al = [];
let Ht = [],
  Y = { branch: [], error: null, url: null },
  oa = !1,
  Dr = !1,
  Va = !0,
  Tr = !1,
  fr = !1,
  cs = !1,
  sa = !1,
  ia,
  le,
  Re,
  Pe,
  en;
const gr = new Set();
async function X2(e, t, r) {
  document.URL !== location.href && (location.href = location.href),
    (ir = e),
    (cn = ml(e)),
    (nt = document.documentElement),
    (Un = t),
    (qn = e.nodes[0]),
    (Jr = e.nodes[1]),
    qn(),
    Jr(),
    (le = history.state?.[Kt]),
    (Re = history.state?.[yr]),
    le ||
      ((le = Re = Date.now()),
      history.replaceState({ ...history.state, [Kt]: le, [yr]: Re }, ""));
  const n = Ot[le];
  n && ((history.scrollRestoration = "manual"), scrollTo(n.x, n.y)),
    r ? await Ml(Un, r) : $l(location.href, { replaceState: !0 }),
    Fl();
}
function kl() {
  (is.length = 0), (sa = !1);
}
function us(e) {
  Qr.some((t) => t?.snapshot) &&
    (xr[e] = Qr.map((t) => t?.snapshot?.capture()));
}
function ds(e) {
  xr[e]?.forEach((t, r) => {
    Qr[r]?.snapshot?.restore(t);
  });
}
function ja() {
  aa(le), Ra(Do, Ot), us(Re), Ra(Qo, xr);
}
async function fs(e, t, r, n) {
  return Ur({
    type: "goto",
    url: ts(e),
    keepfocus: t.keepFocus,
    noscroll: t.noScroll,
    replace_state: t.replaceState,
    state: t.state,
    redirect_count: r,
    nav_token: n,
    accept: () => {
      t.invalidateAll && (sa = !0);
    },
  });
}
async function Ol(e) {
  if (e.id !== pt?.id) {
    const t = {};
    gr.add(t),
      (pt = {
        id: e.id,
        token: t,
        promise: ps({ ...e, preload: t }).then(
          (r) => (
            gr.delete(t), r.type === "loaded" && r.state.error && (pt = null), r
          ),
        ),
      });
  }
  return pt.promise;
}
async function Nn(e) {
  const t = cn.find((r) => r.exec(_s(e)));
  t && (await Promise.all([...t.layouts, t.leaf].map((r) => r?.[1]())));
}
function vs(e, t, r) {
  Y = e.state;
  const n = document.querySelector("style[data-sveltekit]");
  n && n.remove(),
    (Pe = e.props.page),
    (ia = new ir.root({
      target: t,
      props: { ...e.props, stores: st, components: Qr },
      hydrate: r,
      sync: !1,
    })),
    ds(Re);
  const a = {
    from: null,
    to: {
      params: Y.params,
      route: { id: Y.route?.id ?? null },
      url: new URL(location.href),
    },
    willUnload: !1,
    type: "enter",
    complete: Promise.resolve(),
  };
  Ht.forEach((o) => o(a)), (Dr = !0);
}
function tn({
  url: e,
  params: t,
  branch: r,
  status: n,
  error: a,
  route: o,
  form: s,
}) {
  let c = "never";
  if (Fe && (e.pathname === Fe || e.pathname === Fe + "/")) c = "always";
  else for (const f of r) f?.slash !== void 0 && (c = f.slash);
  (e.pathname = el(e.pathname, c)), (e.search = e.search);
  const i = {
    type: "loaded",
    state: { url: e, params: t, branch: r, error: a, route: o },
    props: { constructors: xl(r).map((f) => f.node.component), page: Pe },
  };
  s !== void 0 && (i.props.form = s);
  let l = {},
    u = !Pe,
    v = 0;
  for (let f = 0; f < Math.max(r.length, Y.branch.length); f += 1) {
    const _ = r[f],
      g = Y.branch[f];
    _?.data !== g?.data && (u = !0),
      _ &&
        ((l = { ...l, ..._.data }), u && (i.props[`data_${v}`] = l), (v += 1));
  }
  return (
    (!Y.url ||
      e.href !== Y.url.href ||
      Y.error !== a ||
      (s !== void 0 && s !== Pe.form) ||
      u) &&
      (i.props.page = {
        error: a,
        params: t,
        route: { id: o?.id ?? null },
        state: {},
        status: n,
        url: new URL(e),
        form: s ?? null,
        data: u ? l : Pe.data,
      }),
    i
  );
}
async function la({
  loader: e,
  parent: t,
  url: r,
  params: n,
  route: a,
  server_data_node: o,
}) {
  let s = null,
    c = !0;
  const i = {
      dependencies: new Set(),
      params: new Set(),
      parent: !1,
      route: !1,
      url: !1,
      search_params: new Set(),
    },
    l = await e();
  if (l.universal?.load) {
    let u = function (...d) {
      for (const f of d) {
        const { href: _ } = new URL(f, r);
        i.dependencies.add(_);
      }
    };
    const v = {
      route: new Proxy(a, { get: (d, f) => (c && (i.route = !0), d[f]) }),
      params: new Proxy(n, { get: (d, f) => (c && i.params.add(f), d[f]) }),
      data: o?.data ?? null,
      url: al(
        r,
        () => {
          c && (i.url = !0);
        },
        (d) => {
          c && i.search_params.add(d);
        },
      ),
      async fetch(d, f) {
        let _;
        d instanceof Request
          ? ((_ = d.url),
            (f = {
              body:
                d.method === "GET" || d.method === "HEAD"
                  ? void 0
                  : await d.blob(),
              cache: d.cache,
              credentials: d.credentials,
              headers: d.headers,
              integrity: d.integrity,
              keepalive: d.keepalive,
              method: d.method,
              mode: d.mode,
              redirect: d.redirect,
              referrer: d.referrer,
              referrerPolicy: d.referrerPolicy,
              signal: d.signal,
              ...f,
            }))
          : (_ = d);
        const g = new URL(_, r);
        return (
          c && u(g.href),
          g.origin === r.origin && (_ = g.href.slice(r.origin.length)),
          Dr ? dl(_, g.href, f) : ul(_, f)
        );
      },
      setHeaders: () => {},
      depends: u,
      parent() {
        return c && (i.parent = !0), t();
      },
      untrack(d) {
        c = !1;
        try {
          return d();
        } finally {
          c = !0;
        }
      },
    };
    s = (await l.universal.load.call(null, v)) ?? null;
  }
  return {
    node: l,
    loader: e,
    server: o,
    universal: l.universal?.load ? { type: "data", data: s, uses: i } : null,
    data: s ?? o?.data ?? null,
    slash: l.universal?.trailingSlash ?? o?.slash,
  };
}
function qa(e, t, r, n, a, o) {
  if (sa) return !0;
  if (!a) return !1;
  if ((a.parent && e) || (a.route && t) || (a.url && r)) return !0;
  for (const s of a.search_params) if (n.has(s)) return !0;
  for (const s of a.params) if (o[s] !== Y.params[s]) return !0;
  for (const s of a.dependencies) if (is.some((c) => c(new URL(s)))) return !0;
  return !1;
}
function ca(e, t) {
  return e?.type === "data" ? e : e?.type === "skip" ? t ?? null : null;
}
function Ll(e, t) {
  if (!e) return new Set(t.searchParams.keys());
  const r = new Set([...e.searchParams.keys(), ...t.searchParams.keys()]);
  for (const n of r) {
    const a = e.searchParams.getAll(n),
      o = t.searchParams.getAll(n);
    a.every((s) => o.includes(s)) &&
      o.every((s) => a.includes(s)) &&
      r.delete(n);
  }
  return r;
}
function Ua({ error: e, url: t, route: r, params: n }) {
  return {
    type: "loaded",
    state: { error: e, url: t, route: r, params: n, branch: [] },
    props: { page: Pe, constructors: [] },
  };
}
async function ps({
  id: e,
  invalidating: t,
  url: r,
  params: n,
  route: a,
  preload: o,
}) {
  if (pt?.id === e) return gr.delete(pt.token), pt.promise;
  const { errors: s, layouts: c, leaf: i } = a,
    l = [...c, i];
  s.forEach((y) => y?.().catch(() => {})),
    l.forEach((y) => y?.[1]().catch(() => {}));
  let u = null;
  const v = Y.url ? e !== Y.url.pathname + Y.url.search : !1,
    d = Y.route ? a.id !== Y.route.id : !1,
    f = Ll(Y.url, r);
  let _ = !1;
  const g = l.map((y, N) => {
    const k = Y.branch[N],
      L = !!y?.[0] && (k?.loader !== y[1] || qa(_, d, v, f, k.server?.uses, n));
    return L && (_ = !0), L;
  });
  if (g.some(Boolean)) {
    try {
      u = await gs(r, g);
    } catch (y) {
      const N = await Yt(y, { url: r, params: n, route: { id: e } });
      return gr.has(o)
        ? Ua({ error: N, url: r, params: n, route: a })
        : un({ status: Xr(y), error: N, url: r, route: a });
    }
    if (u.type === "redirect") return u;
  }
  const C = u?.nodes;
  let b = !1;
  const x = l.map(async (y, N) => {
    if (!y) return;
    const k = Y.branch[N],
      L = C?.[N];
    if (
      (!L || L.type === "skip") &&
      y[1] === k?.loader &&
      !qa(b, d, v, f, k.universal?.uses, n)
    )
      return k;
    if (((b = !0), L?.type === "error")) throw L;
    return la({
      loader: y[1],
      url: r,
      params: n,
      route: a,
      parent: async () => {
        const B = {};
        for (let q = 0; q < N; q += 1) Object.assign(B, (await x[q])?.data);
        return B;
      },
      server_data_node: ca(
        L === void 0 && y[0] ? { type: "skip" } : L ?? null,
        y[0] ? k?.server : void 0,
      ),
    });
  });
  for (const y of x) y.catch(() => {});
  const S = [];
  for (let y = 0; y < l.length; y += 1)
    if (l[y])
      try {
        S.push(await x[y]);
      } catch (N) {
        if (N instanceof os) return { type: "redirect", location: N.location };
        if (gr.has(o))
          return Ua({
            error: await Yt(N, { params: n, url: r, route: { id: a.id } }),
            url: r,
            params: n,
            route: a,
          });
        let k = Xr(N),
          L;
        if (C?.includes(N)) (k = N.status ?? k), (L = N.error);
        else if (N instanceof ln) L = N.body;
        else {
          if (await st.updated.check()) return await ss(), await Qt(r);
          L = await Yt(N, { params: n, url: r, route: { id: a.id } });
        }
        const P = await Pl(y, S, s);
        return P
          ? tn({
              url: r,
              params: n,
              branch: S.slice(0, P.idx).concat(P.node),
              status: k,
              error: L,
              route: a,
            })
          : await ms(r, { id: a.id }, L, k);
      }
    else S.push(void 0);
  return tn({
    url: r,
    params: n,
    branch: S,
    status: 200,
    error: null,
    route: a,
    form: t ? void 0 : null,
  });
}
async function Pl(e, t, r) {
  for (; e--; )
    if (r[e]) {
      let n = e;
      for (; !t[n]; ) n -= 1;
      try {
        return {
          idx: n + 1,
          node: {
            node: await r[e](),
            loader: r[e],
            data: {},
            server: null,
            universal: null,
          },
        };
      } catch {
        continue;
      }
    }
}
async function un({ status: e, error: t, url: r, route: n }) {
  const a = {};
  let o = null;
  if (ir.server_loads[0] === 0)
    try {
      const l = await gs(r, [!0]);
      if (l.type !== "data" || (l.nodes[0] && l.nodes[0].type !== "data"))
        throw 0;
      o = l.nodes[0] ?? null;
    } catch {
      (r.origin !== Pr || r.pathname !== location.pathname || oa) &&
        (await Qt(r));
    }
  const c = await la({
      loader: qn,
      url: r,
      params: a,
      route: n,
      parent: () => Promise.resolve({}),
      server_data_node: ca(o),
    }),
    i = {
      node: await Jr(),
      loader: Jr,
      universal: null,
      server: null,
      data: null,
    };
  return tn({
    url: r,
    params: a,
    branch: [c, i],
    status: e,
    error: t,
    route: null,
  });
}
function ua(e, t) {
  if (!e || sn(e, Fe)) return;
  let r;
  try {
    r = ir.hooks.reroute({ url: new URL(e) }) ?? e.pathname;
  } catch {
    return;
  }
  const n = _s(r);
  for (const a of cn) {
    const o = a.exec(n);
    if (o)
      return {
        id: e.pathname + e.search,
        invalidating: t,
        route: a,
        params: rl(o),
        url: e,
      };
  }
}
function _s(e) {
  return tl(e.slice(Fe.length) || "/");
}
function hs({ url: e, type: t, intent: r, delta: n }) {
  let a = !1;
  const o = bs(Y, r, e, t);
  n !== void 0 && (o.navigation.delta = n);
  const s = {
    ...o.navigation,
    cancel: () => {
      (a = !0), o.reject(new Error("navigation cancelled"));
    },
  };
  return Tr || ls.forEach((c) => c(s)), a ? null : o;
}
async function Ur({
  type: e,
  url: t,
  popped: r,
  keepfocus: n,
  noscroll: a,
  replace_state: o,
  state: s = {},
  redirect_count: c = 0,
  nav_token: i = {},
  accept: l = Ma,
  block: u = Ma,
}) {
  const v = ua(t, !1),
    d = hs({ url: t, type: e, delta: r?.delta, intent: v });
  if (!d) {
    u();
    return;
  }
  const f = le,
    _ = Re;
  l(), (Tr = !0), Dr && st.navigating.set(d.navigation), (en = i);
  let g = v && (await ps(v));
  if (!g) {
    if (sn(t, Fe)) return await Qt(t);
    g = await ms(
      t,
      { id: null },
      await Yt(new na(404, "Not Found", `Not found: ${t.pathname}`), {
        url: t,
        params: {},
        route: { id: null },
      }),
      404,
    );
  }
  if (((t = v?.url || t), en !== i))
    return d.reject(new Error("navigation aborted")), !1;
  if (g.type === "redirect")
    if (c >= 20)
      g = await un({
        status: 500,
        error: await Yt(new Error("Redirect loop"), {
          url: t,
          params: {},
          route: { id: null },
        }),
        url: t,
        route: { id: null },
      });
    else return fs(new URL(g.location, t).href, {}, c + 1, i), !1;
  else
    g.props.page.status >= 400 &&
      (await st.updated.check()) &&
      (await ss(), await Qt(t));
  if (
    (kl(),
    aa(f),
    us(_),
    g.props.page.url.pathname !== t.pathname &&
      (t.pathname = g.props.page.url.pathname),
    (s = r ? r.state : s),
    !r)
  ) {
    const S = o ? 0 : 1,
      y = { [Kt]: (le += S), [yr]: (Re += S), [es]: s };
    (o ? history.replaceState : history.pushState).call(history, y, "", t),
      o || El(le, Re);
  }
  if (((pt = null), (g.props.page.state = s), Dr)) {
    (Y = g.state), g.props.page && (g.props.page.url = t);
    const S = (await Promise.all(Al.map((y) => y(d.navigation)))).filter(
      (y) => typeof y == "function",
    );
    if (S.length > 0) {
      let y = function () {
        Ht = Ht.filter((N) => !S.includes(N));
      };
      S.push(y), Ht.push(...S);
    }
    ia.$set(g.props), (cs = !0);
  } else vs(g, Un, !1);
  const { activeElement: C } = document;
  await Vo();
  const b = r ? r.scroll : a ? ra() : null;
  if (Va) {
    const S =
      t.hash && document.getElementById(decodeURIComponent(t.hash.slice(1)));
    b ? scrollTo(b.x, b.y) : S ? S.scrollIntoView() : scrollTo(0, 0);
  }
  const x =
    document.activeElement !== C && document.activeElement !== document.body;
  !n && !x && Vl(),
    (Va = !0),
    g.props.page && (Pe = g.props.page),
    (Tr = !1),
    e === "popstate" && ds(Re),
    d.fulfil(void 0),
    Ht.forEach((S) => S(d.navigation)),
    st.navigating.set(null);
}
async function ms(e, t, r, n) {
  return e.origin === Pr && e.pathname === location.pathname && !oa
    ? await un({ status: n, error: r, url: e, route: t })
    : await Qt(e);
}
function Rl() {
  let e;
  nt.addEventListener("mousemove", (o) => {
    const s = o.target;
    clearTimeout(e),
      (e = setTimeout(() => {
        n(s, 2);
      }, 20));
  });
  function t(o) {
    o.defaultPrevented || n(o.composedPath()[0], 1);
  }
  nt.addEventListener("mousedown", t),
    nt.addEventListener("touchstart", t, { passive: !0 });
  const r = new IntersectionObserver(
    (o) => {
      for (const s of o)
        s.isIntersecting && (Nn(s.target.href), r.unobserve(s.target));
    },
    { threshold: 0 },
  );
  function n(o, s) {
    const c = ns(o, nt);
    if (!c) return;
    const { url: i, external: l, download: u } = jn(c, Fe);
    if (l || u) return;
    const v = Yr(c),
      d = i && Y.url.pathname + Y.url.search === i.pathname + i.search;
    if (!v.reload && !d)
      if (s <= v.preload_data) {
        const f = ua(i, !1);
        f && Ol(f);
      } else s <= v.preload_code && Nn(i.pathname);
  }
  function a() {
    r.disconnect();
    for (const o of nt.querySelectorAll("a")) {
      const { url: s, external: c, download: i } = jn(o, Fe);
      if (c || i) continue;
      const l = Yr(o);
      l.reload ||
        (l.preload_code === Kr.viewport && r.observe(o),
        l.preload_code === Kr.eager && Nn(s.pathname));
    }
  }
  Ht.push(a), a();
}
function Yt(e, t) {
  if (e instanceof ln) return e.body;
  const r = Xr(e),
    n = Sl(e);
  return (
    ir.hooks.handleError({ error: e, event: t, status: r, message: n }) ?? {
      message: n,
    }
  );
}
function $l(e, t = {}) {
  return (
    (e = ts(e)),
    e.origin !== Pr
      ? Promise.reject(new Error("goto: invalid URL"))
      : fs(e, t, 0)
  );
}
function Fl() {
  (history.scrollRestoration = "manual"),
    addEventListener("beforeunload", (t) => {
      let r = !1;
      if ((ja(), !Tr)) {
        const n = bs(Y, void 0, null, "leave"),
          a = {
            ...n.navigation,
            cancel: () => {
              (r = !0), n.reject(new Error("navigation cancelled"));
            },
          };
        ls.forEach((o) => o(a));
      }
      r
        ? (t.preventDefault(), (t.returnValue = ""))
        : (history.scrollRestoration = "auto");
    }),
    addEventListener("visibilitychange", () => {
      document.visibilityState === "hidden" && ja();
    }),
    navigator.connection?.saveData || Rl(),
    nt.addEventListener("click", async (t) => {
      if (
        t.button ||
        t.which !== 1 ||
        t.metaKey ||
        t.ctrlKey ||
        t.shiftKey ||
        t.altKey ||
        t.defaultPrevented
      )
        return;
      const r = ns(t.composedPath()[0], nt);
      if (!r) return;
      const { url: n, external: a, target: o, download: s } = jn(r, Fe);
      if (!n) return;
      if (o === "_parent" || o === "_top") {
        if (window.parent !== window) return;
      } else if (o && o !== "_self") return;
      const c = Yr(r);
      if (
        (!(r instanceof SVGAElement) &&
          n.protocol !== location.protocol &&
          !(n.protocol === "https:" || n.protocol === "http:")) ||
        s
      )
        return;
      const [l, u] = n.href.split("#"),
        v = l === xn(location);
      if (a || (c.reload && (!v || !u))) {
        hs({ url: n, type: "link" }) ? (Tr = !0) : t.preventDefault();
        return;
      }
      if (u !== void 0 && v) {
        const [, d] = Y.url.href.split("#");
        if (d === u) {
          if (
            (t.preventDefault(),
            u === "" ||
              (u === "top" && r.ownerDocument.getElementById("top") === null))
          )
            window.scrollTo({ top: 0 });
          else {
            const f = r.ownerDocument.getElementById(decodeURIComponent(u));
            f && (f.scrollIntoView(), f.focus());
          }
          return;
        }
        if (((fr = !0), aa(le), e(n), !c.replace_state)) return;
        fr = !1;
      }
      t.preventDefault(),
        await new Promise((d) => {
          requestAnimationFrame(() => {
            setTimeout(d, 0);
          }),
            setTimeout(d, 100);
        }),
        Ur({
          type: "link",
          url: n,
          keepfocus: c.keepfocus,
          noscroll: c.noscroll,
          replace_state: c.replace_state ?? n.href === location.href,
        });
    }),
    nt.addEventListener("submit", (t) => {
      if (t.defaultPrevented) return;
      const r = HTMLFormElement.prototype.cloneNode.call(t.target),
        n = t.submitter;
      if (
        (n?.formTarget || r.target) === "_blank" ||
        (n?.formMethod || r.method) !== "get"
      )
        return;
      const s = new URL(
        (n?.hasAttribute("formaction") && n?.formAction) || r.action,
      );
      if (sn(s, Fe)) return;
      const c = t.target,
        i = Yr(c);
      if (i.reload) return;
      t.preventDefault(), t.stopPropagation();
      const l = new FormData(c),
        u = n?.getAttribute("name");
      u && l.append(u, n?.getAttribute("value") ?? ""),
        (s.search = new URLSearchParams(l).toString()),
        Ur({
          type: "form",
          url: s,
          keepfocus: i.keepfocus,
          noscroll: i.noscroll,
          replace_state: i.replace_state ?? s.href === location.href,
        });
    }),
    addEventListener("popstate", async (t) => {
      if (t.state?.[Kt]) {
        const r = t.state[Kt];
        if (((en = {}), r === le)) return;
        const n = Ot[r],
          a = t.state[es] ?? {},
          o = new URL(t.state[bl] ?? location.href),
          s = t.state[yr],
          c = xn(location) === xn(Y.url);
        if (s === Re && (cs || c)) {
          e(o),
            (Ot[le] = ra()),
            n && scrollTo(n.x, n.y),
            a !== Pe.state &&
              ((Pe = { ...Pe, state: a }), ia.$set({ page: Pe })),
            (le = r);
          return;
        }
        const l = r - le;
        await Ur({
          type: "popstate",
          url: o,
          popped: { state: a, scroll: n, delta: l },
          accept: () => {
            (le = r), (Re = s);
          },
          block: () => {
            history.go(-l);
          },
          nav_token: en,
        });
      } else if (!fr) {
        const r = new URL(location.href);
        e(r);
      }
    }),
    addEventListener("hashchange", () => {
      fr &&
        ((fr = !1),
        history.replaceState(
          { ...history.state, [Kt]: ++le, [yr]: Re },
          "",
          location.href,
        ));
    });
  for (const t of document.querySelectorAll("link"))
    t.rel === "icon" && (t.href = t.href);
  addEventListener("pageshow", (t) => {
    t.persisted && st.navigating.set(null);
  });
  function e(t) {
    (Y.url = t), st.page.set({ ...Pe, url: t }), st.page.notify();
  }
}
async function Ml(
  e,
  {
    status: t = 200,
    error: r,
    node_ids: n,
    params: a,
    route: o,
    data: s,
    form: c,
  },
) {
  oa = !0;
  const i = new URL(location.href);
  ({ params: a = {}, route: o = { id: null } } = ua(i, !1) || {});
  let l;
  try {
    const u = n.map(async (f, _) => {
        const g = s[_];
        return (
          g?.uses && (g.uses = Cs(g.uses)),
          la({
            loader: ir.nodes[f],
            url: i,
            params: a,
            route: o,
            parent: async () => {
              const C = {};
              for (let b = 0; b < _; b += 1)
                Object.assign(C, (await u[b]).data);
              return C;
            },
            server_data_node: ca(g),
          })
        );
      }),
      v = await Promise.all(u),
      d = cn.find(({ id: f }) => f === o.id);
    if (d) {
      const f = d.layouts;
      for (let _ = 0; _ < f.length; _++) f[_] || v.splice(_, 0, void 0);
    }
    l = tn({
      url: i,
      params: a,
      branch: v,
      status: t,
      error: r,
      form: c,
      route: d ?? null,
    });
  } catch (u) {
    if (u instanceof os) {
      await Qt(new URL(u.location, location.href));
      return;
    }
    l = await un({
      status: Xr(u),
      error: await Yt(u, { url: i, params: a, route: o }),
      url: i,
      route: o,
    });
  }
  l.props.page && (l.props.page.state = {}), vs(l, e, !0);
}
async function gs(e, t) {
  const r = new URL(e);
  (r.pathname = il(e.pathname)),
    e.pathname.endsWith("/") && r.searchParams.append(Nl, "1"),
    r.searchParams.append(Tl, t.map((a) => (a ? "1" : "0")).join(""));
  const n = await Xo(r.href);
  if (!n.ok) {
    let a;
    throw (
      (n.headers.get("content-type")?.includes("application/json")
        ? (a = await n.json())
        : n.status === 404
          ? (a = "Not Found")
          : n.status === 500 && (a = "Internal Error"),
      new ln(n.status, a))
    );
  }
  return new Promise(async (a) => {
    const o = new Map(),
      s = n.body.getReader(),
      c = new TextDecoder();
    function i(u) {
      return ks(u, {
        Promise: (v) =>
          new Promise((d, f) => {
            o.set(v, { fulfil: d, reject: f });
          }),
      });
    }
    let l = "";
    for (;;) {
      const { done: u, value: v } = await s.read();
      if (u && !l) break;
      for (
        l +=
          !v && l
            ? `
`
            : c.decode(v, { stream: !0 });
        ;

      ) {
        const d = l.indexOf(`
`);
        if (d === -1) break;
        const f = JSON.parse(l.slice(0, d));
        if (((l = l.slice(d + 1)), f.type === "redirect")) return a(f);
        if (f.type === "data")
          f.nodes?.forEach((_) => {
            _?.type === "data" && ((_.uses = Cs(_.uses)), (_.data = i(_.data)));
          }),
            a(f);
        else if (f.type === "chunk") {
          const { id: _, data: g, error: C } = f,
            b = o.get(_);
          o.delete(_), C ? b.reject(i(C)) : b.fulfil(i(g));
        }
      }
    }
  });
}
function Cs(e) {
  return {
    dependencies: new Set(e?.dependencies ?? []),
    params: new Set(e?.params ?? []),
    parent: !!e?.parent,
    route: !!e?.route,
    url: !!e?.url,
    search_params: new Set(e?.search_params ?? []),
  };
}
function Vl() {
  const e = document.querySelector("[autofocus]");
  if (e) e.focus();
  else {
    const t = document.body,
      r = t.getAttribute("tabindex");
    (t.tabIndex = -1),
      t.focus({ preventScroll: !0, focusVisible: !1 }),
      r !== null
        ? t.setAttribute("tabindex", r)
        : t.removeAttribute("tabindex");
    const n = getSelection();
    if (n && n.type !== "None") {
      const a = [];
      for (let o = 0; o < n.rangeCount; o += 1) a.push(n.getRangeAt(o));
      setTimeout(() => {
        if (n.rangeCount === a.length) {
          for (let o = 0; o < n.rangeCount; o += 1) {
            const s = a[o],
              c = n.getRangeAt(o);
            if (
              s.commonAncestorContainer !== c.commonAncestorContainer ||
              s.startContainer !== c.startContainer ||
              s.endContainer !== c.endContainer ||
              s.startOffset !== c.startOffset ||
              s.endOffset !== c.endOffset
            )
              return;
          }
          n.removeAllRanges();
        }
      });
    }
  }
}
function bs(e, t, r, n) {
  let a, o;
  const s = new Promise((i, l) => {
    (a = i), (o = l);
  });
  return (
    s.catch(() => {}),
    {
      navigation: {
        from: {
          params: e.params,
          route: { id: e.route?.id ?? null },
          url: e.url,
        },
        to: r && {
          params: t?.params ?? null,
          route: { id: t?.route?.id ?? null },
          url: r,
        },
        willUnload: !t,
        type: n,
        complete: s,
      },
      fulfil: a,
      reject: o,
    }
  );
}
const jl = "modulepreload",
  ql = function (e, t) {
    return new URL(e, t).href;
  },
  Ba = {},
  ue = function (t, r, n) {
    let a = Promise.resolve();
    if (r && r.length > 0) {
      const s = document.getElementsByTagName("link"),
        c = document.querySelector("meta[property=csp-nonce]"),
        i = c?.nonce || c?.getAttribute("nonce");
      a = Promise.allSettled(
        r.map((l) => {
          if (((l = ql(l, n)), l in Ba)) return;
          Ba[l] = !0;
          const u = l.endsWith(".css"),
            v = u ? '[rel="stylesheet"]' : "";
          if (!!n)
            for (let _ = s.length - 1; _ >= 0; _--) {
              const g = s[_];
              if (g.href === l && (!u || g.rel === "stylesheet")) return;
            }
          else if (document.querySelector(`link[href="${l}"]${v}`)) return;
          const f = document.createElement("link");
          if (
            ((f.rel = u ? "stylesheet" : jl),
            u || (f.as = "script"),
            (f.crossOrigin = ""),
            (f.href = l),
            i && f.setAttribute("nonce", i),
            document.head.appendChild(f),
            u)
          )
            return new Promise((_, g) => {
              f.addEventListener("load", _),
                f.addEventListener("error", () =>
                  g(new Error(`Unable to preload CSS for ${l}`)),
                );
            });
        }),
      );
    }
    function o(s) {
      const c = new Event("vite:preloadError", { cancelable: !0 });
      if (((c.payload = s), window.dispatchEvent(c), !c.defaultPrevented))
        throw s;
    }
    return a.then((s) => {
      for (const c of s || []) c.status === "rejected" && o(c.reason);
      return t().catch(o);
    });
  },
  J2 = {},
  Ul = "5";
typeof window < "u" &&
  (window.__svelte || (window.__svelte = { v: new Set() })).v.add(Ul);
var Bl = A(
    '<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>',
  ),
  Hl = A("<!> <!>", 1);
function Wl(e, t) {
  Q(t, !0);
  let r = $(t, "components", 23, () => []),
    n = $(t, "data_0", 3, null),
    a = $(t, "data_1", 3, null);
  bo(() => t.stores.page.set(t.page)),
    zr(() => {
      t.stores,
        t.page,
        t.constructors,
        r(),
        t.form,
        n(),
        a(),
        t.stores.page.notify();
    });
  let o = Cn(!1),
    s = Cn(!1),
    c = Cn(null);
  _e(() => {
    const d = t.stores.page.subscribe(() => {
      p(o) &&
        (E(s, !0),
        Vo().then(() => {
          E(c, xt(document.title || "untitled page"));
        }));
    });
    return E(o, !0), d;
  });
  const i = Nt(() => t.constructors[1]);
  var l = Hl(),
    u = X(l);
  W(
    u,
    () => t.constructors[1],
    (d) => {
      var f = Ce();
      const _ = Nt(() => t.constructors[0]);
      var g = X(f);
      qr(
        g,
        () => p(_),
        (C, b) => {
          yn(
            b(C, {
              get data() {
                return n();
              },
              get form() {
                return t.form;
              },
              children: (x, S) => {
                var y = Ce(),
                  N = X(y);
                qr(
                  N,
                  () => p(i),
                  (k, L) => {
                    yn(
                      L(k, {
                        get data() {
                          return a();
                        },
                        get form() {
                          return t.form;
                        },
                      }),
                      (P) => (r()[1] = P),
                      () => r()?.[1],
                    );
                  },
                ),
                  T(x, y);
              },
              $$slots: { default: !0 },
            }),
            (x) => (r()[0] = x),
            () => r()?.[0],
          );
        },
      ),
        T(d, f);
    },
    (d) => {
      var f = Ce();
      const _ = Nt(() => t.constructors[0]);
      var g = X(f);
      qr(
        g,
        () => p(_),
        (C, b) => {
          yn(
            b(C, {
              get data() {
                return n();
              },
              get form() {
                return t.form;
              },
            }),
            (x) => (r()[0] = x),
            () => r()?.[0],
          );
        },
      ),
        T(d, f);
    },
  );
  var v = w(u, 2);
  W(
    v,
    () => p(o),
    (d) => {
      var f = Bl(),
        _ = m(f);
      W(
        _,
        () => p(s),
        (g) => {
          var C = ki();
          O(() => R(C, p(c))), T(g, C);
        },
      ),
        h(f),
        T(d, f);
    },
  ),
    T(e, l),
    D();
}
const Q2 = Xi(Wl),
  D2 = [
    () => ue(() => Promise.resolve().then(() => Il), void 0, import.meta.url),
    () => ue(() => Promise.resolve().then(() => Yl), void 0, import.meta.url),
    () => ue(() => Promise.resolve().then(() => jc), void 0, import.meta.url),
    () => ue(() => Promise.resolve().then(() => Bc), void 0, import.meta.url),
    () => ue(() => Promise.resolve().then(() => Ic), void 0, import.meta.url),
    () => ue(() => Promise.resolve().then(() => Kc), void 0, import.meta.url),
    () => ue(() => Promise.resolve().then(() => Dc), void 0, import.meta.url),
    () => ue(() => Promise.resolve().then(() => l2), void 0, import.meta.url),
    () => ue(() => Promise.resolve().then(() => C2), void 0, import.meta.url),
    () => ue(() => Promise.resolve().then(() => y2), void 0, import.meta.url),
    () => ue(() => Promise.resolve().then(() => S2), void 0, import.meta.url),
    () => ue(() => Promise.resolve().then(() => L2), void 0, import.meta.url),
    () => ue(() => Promise.resolve().then(() => V2), void 0, import.meta.url),
    () => ue(() => Promise.resolve().then(() => W2), void 0, import.meta.url),
  ],
  eu = [],
  tu = {
    "/": [2],
    "/about": [3],
    "/account": [4],
    "/admin": [5],
    "/ai-data": [6],
    "/apps": [7],
    "/contact": [8],
    "/profile": [9],
    "/projects": [10],
    "/support": [11],
    "/team": [12],
    "/tokens": [13],
  },
  ru = {
    handleError: ({ error: e }) => {
      console.error(e);
    },
    reroute: () => {},
  };
function zl(e, t) {
  Q(t, !0);
  var r = Ce(),
    n = X(r);
  ji(n, () => t.children), T(e, r), D();
}
const Il = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: zl },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
Qs();
const Zl = () => {
    const e = st;
    return {
      page: { subscribe: e.page.subscribe },
      navigating: { subscribe: e.navigating.subscribe },
      updated: e.updated,
    };
  },
  dn = {
    subscribe(e) {
      return Zl().page.subscribe(e);
    },
  };
var Gl = A("<h1> </h1> <p> </p>", 1);
function Kl(e, t) {
  Q(t, !1);
  const r = je(),
    n = () => Ve(dn, "$page", r);
  ae();
  var a = Gl(),
    o = X(a),
    s = m(o, !0);
  h(o);
  var c = w(o, 2),
    i = m(c, !0);
  h(c),
    O(() => {
      R(s, n().status), R(i, n().error?.message);
    }),
    T(e, a),
    D();
}
const Yl = Object.freeze(
    Object.defineProperty(
      { __proto__: null, component: Kl },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Rt = ({ IDL: e }) => {
    const t = e.Variant({
        OpenFPL: e.Null,
        OpenWSL: e.Null,
        ICPCasino: e.Null,
        FootballGod: e.Null,
        ICF1: e.Null,
        ICFC: e.Null,
        ICGC: e.Null,
        ICPFA: e.Null,
        TransferKings: e.Null,
        JeffBets: e.Null,
        OpenBook: e.Null,
        OpenCare: e.Null,
        OpenChef: e.Null,
        OpenBeats: e.Null,
        WaterwayLabs: e.Null,
      }),
      r = e.Variant({
        Error: e.Null,
        SystemCheck: e.Null,
        CanisterCreated: e.Null,
        Information: e.Null,
        Success: e.Null,
        CanisterTopup: e.Null,
        Warning: e.Null,
      }),
      n = e.Record({
        app: t,
        eventId: e.Nat,
        eventTitle: e.Text,
        eventDetail: e.Text,
        eventTime: e.Int,
        eventType: r,
      }),
      a = e.Variant({
        InvalidProfilePicture: e.Null,
        DecodeError: e.Null,
        TooLong: e.Null,
        NotAllowed: e.Null,
        DuplicateData: e.Null,
        InvalidProperty: e.Null,
        NotFound: e.Null,
        IncorrectSetup: e.Null,
        AlreadyClaimed: e.Null,
        NotAuthorized: e.Null,
        MaxDataExceeded: e.Null,
        InvalidData: e.Null,
        SystemOnHold: e.Null,
        AlreadyExists: e.Null,
        NoPacketsRemaining: e.Null,
        UpdateFailed: e.Null,
        CanisterCreateError: e.Null,
        NeuronAlreadyUsed: e.Null,
        FailedInterCanisterCall: e.Null,
        InsufficientPacketsRemaining: e.Null,
        InsufficientFunds: e.Null,
        InEligible: e.Null,
      }),
      o = e.Variant({ ok: e.Null, err: a }),
      s = e.Text,
      c = e.Variant({ SNS: e.Null, Dynamic: e.Null, Static: e.Null }),
      i = e.Text,
      l = e.Record({ app: t, controller: s, canisterType: c, canisterId: i }),
      u = e.Record({
        bio: e.Vec(e.Text),
        video: e.Opt(e.Vec(e.Nat8)),
        jobTitle: e.Text,
        image: e.Vec(e.Nat8),
        lastName: e.Text,
        principalId: s,
        firstName: e.Text,
      }),
      v = e.Nat16,
      d = e.Variant({
        OnHold: e.Null,
        Beta: e.Null,
        Live: e.Null,
        Complete: e.Null,
        Decentralised: e.Null,
        Development: e.Null,
        Design: e.Null,
        Cancelled: e.Null,
      }),
      f = e.Record({
        id: v,
        app: t,
        status: d,
        githubLink: e.Text,
        mainColour: e.Text,
        websiteURL: e.Text,
        frontendCanisterId: i,
        socialLinks: e.Vec(e.Tuple(e.Text, e.Text)),
        name: e.Text,
        description: e.Text,
        summary: e.Text,
        backendCanisterId: i,
        thirdColour: e.Text,
        secondaryColour: e.Text,
      }),
      _ = e.Record({
        contact: e.Text,
        name: e.Text,
        createdBy: s,
        message: e.Text,
      }),
      g = e.Record({ app: t, canisterId: i }),
      C = e.Record({ app: t, snapshotId: e.Vec(e.Nat8), canisterId: i }),
      b = e.Record({ app: t }),
      x = e.Record({ version: e.Text, onHold: e.Bool }),
      S = e.Variant({ ok: x, err: a }),
      y = e.Record({ app: t, page: e.Nat }),
      N = e.Nat,
      k = e.Record({
        id: N,
        eventId: e.Nat,
        eventTitle: e.Text,
        eventDetail: e.Text,
        eventTime: e.Int,
        eventType: r,
      }),
      L = e.Record({
        app: t,
        totalEntries: e.Nat,
        logs: e.Vec(k),
        page: e.Nat,
      }),
      P = e.Variant({ ok: L, err: a }),
      B = e.Record({ app: t, canisterId: i }),
      q = e.Variant({ stopped: e.Null, stopping: e.Null, running: e.Null }),
      I = e.Record({
        app: t,
        canisterStatus: q,
        controllers: e.Vec(s),
        memoryUsage: e.Nat,
        cycles: e.Nat,
        memoryAllocation: e.Nat,
        freezeThreshold: e.Nat,
        idleCyclesBurnedPerDay: e.Nat,
        computeAllocation: e.Nat,
        canisterId: i,
      }),
      K = e.Variant({ ok: I, err: a }),
      j = e.Record({}),
      J = e.Record({}),
      ne = e.Variant({ ok: J, err: a }),
      ee = e.Record({ app: t }),
      te = e.Record({
        app: t,
        canisterName: e.Text,
        canisterType: c,
        canisterId: i,
      }),
      re = e.Record({ entries: e.Vec(te) }),
      he = e.Variant({ ok: re, err: a }),
      qe = e.Record({}),
      ce = e.Record({
        id: v,
        app: t,
        status: d,
        githubLink: e.Text,
        mainColour: e.Text,
        websiteURL: e.Text,
        frontendCanisterId: i,
        socialLinks: e.Vec(e.Tuple(e.Text, e.Text)),
        name: e.Text,
        description: e.Text,
        summary: e.Text,
        backendCanisterId: i,
        thirdColour: e.Text,
        secondaryColour: e.Text,
      }),
      ke = e.Record({ projects: e.Vec(ce) }),
      me = e.Variant({ ok: ke, err: a }),
      we = e.Record({ app: e.Opt(t) }),
      wt = e.Variant({ ok: we, err: a }),
      De = e.Record({
        bio: e.Text,
        title: e.Text,
        name: e.Text,
        image: e.Text,
      }),
      Ue = e.Variant({ ok: e.Vec(De), err: a }),
      ye = e.Record({ app: t, canisterId: i }),
      et = e.Record({
        id: e.Vec(e.Nat8),
        total_size: e.Nat64,
        taken_at_timestamp: e.Nat64,
      }),
      ut = e.Variant({ ok: e.Vec(et), err: a }),
      H = e.Record({ app: t, snapshotId: e.Vec(e.Nat8), canisterId: i }),
      xe = e.Record({ app: t, controller: s, canisterType: c, canisterId: i }),
      Be = e.Record({ app: t }),
      dt = e.Nat16,
      Ft = e.Record({ id: dt }),
      fn = e.Record({ app: t, computeAllocation: e.Nat, canisterId: i }),
      vn = e.Record({ app: t, freezingThreshold: e.Nat, canisterId: i }),
      yt = e.Record({ app: t, memoryAllocation: e.Nat, canisterId: i }),
      $r = e.Record({ app: t }),
      lr = e.Record({ app: t, canisterId: i }),
      pn = e.Record({ app: t, canisterId: i }),
      cr = e.Record({ app: t, canisterId: i }),
      _n = e.Record({
        id: e.Vec(e.Nat8),
        total_size: e.Nat64,
        taken_at_timestamp: e.Nat64,
      }),
      ur = e.Variant({ ok: _n, err: a }),
      hn = e.Record({ app: t, cycles: e.Nat, canisterId: i }),
      dr = e.Record({
        app: t,
        status: e.Opt(d),
        githubLink: e.Opt(e.Text),
        mainColour: e.Opt(e.Text),
        websiteURL: e.Opt(e.Text),
        frontendCanisterId: e.Opt(i),
        socialLinks: e.Opt(e.Vec(e.Tuple(e.Text, e.Text))),
        name: e.Opt(e.Text),
        description: e.Opt(e.Text),
        summary: e.Opt(e.Text),
        backendCanisterId: e.Opt(i),
        thirdColour: e.Opt(e.Text),
        secondaryColour: e.Opt(e.Text),
      });
    return e.Service({
      addApplicationLog: e.Func([n], [o], []),
      addCanisterController: e.Func([l], [o], []),
      addTeamMember: e.Func([u], [o], []),
      createProject: e.Func([f], [o], []),
      createSupportQuery: e.Func([_], [o], []),
      deleteCanister: e.Func([g], [o], []),
      deleteCanisterSnapshot: e.Func([C], [o], []),
      deleteProject: e.Func([b], [o], []),
      getAppStatus: e.Func([], [S], ["query"]),
      getApplicationLogs: e.Func([y], [P], ["query"]),
      getCanisterInfo: e.Func([B], [K], []),
      getDataHashes: e.Func([j], [ne], ["query"]),
      getProjectCanisters: e.Func([ee], [he], []),
      getProjects: e.Func([qe], [me], []),
      getSupportQueries: e.Func([we], [wt], []),
      getTeamMembers: e.Func([], [Ue], ["query"]),
      listCanisterSnapshots: e.Func([ye], [ut], []),
      loadCanisterSnapshot: e.Func([H], [o], []),
      removeCanisterController: e.Func([xe], [o], []),
      removeProjectOnHold: e.Func([Be], [o], []),
      removeTeamMember: e.Func([Ft], [o], []),
      setCanisterComputeAllocation: e.Func([fn], [o], []),
      setCanisterFreezeThreshold: e.Func([vn], [o], []),
      setCanisterMemoryAllocation: e.Func([yt], [o], []),
      setProjectOnHold: e.Func([$r], [o], []),
      startCanister: e.Func([lr], [o], []),
      stopCanister: e.Func([pn], [o], []),
      takeCanisterSnapshot: e.Func([cr], [ur], []),
      topupCanister: e.Func([hn], [o], []),
      updateProject: e.Func([dr], [o], []),
    });
  },
  Xl = "rbqtt-7yaaa-aaaal-qcndq-cai",
  Jl = (e, t = {}) => {
    const r = t.agent || new Vr({ ...t.agentOptions });
    return (
      t.agent &&
        t.agentOptions &&
        console.warn(
          "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.",
        ),
      Da.createActor(Rt, { agent: r, canisterId: e, ...t.actorOptions })
    );
  };
Jl(Xl);
var Ql = {
  BACKEND_CANISTER_ID: "rbqtt-7yaaa-aaaal-qcndq-cai",
  FRONTEND_CANISTER_ID: "qm6x5-qqaaa-aaaal-qcnea-cai",
  DFX_NETWORK: "ic",
};
class Ae {
  static createActor(t, r = "", n = null, a = null) {
    const o = { host: `https://${r}.icp-api.io`, identity: n };
    a
      ? a.agentOptions
        ? (a.agentOptions.host = o.host)
        : (a.agentOptions = o)
      : (a = { agentOptions: o });
    const s = new Vr({ ...a.agentOptions });
    return Da.createActor(t, { agent: s, canisterId: r, ...a?.actorOptions });
  }
  static getAgent(t = "", r = null, n = null) {
    const a = { host: `https://${t}.icp-api.io`, identity: r };
    return (
      n
        ? n.agentOptions
          ? (n.agentOptions.host = a.host)
          : (n.agentOptions = a)
        : (n = { agentOptions: a }),
      new Vr({ ...n.agentOptions })
    );
  }
  static createIdentityActor(t, r) {
    let n;
    return new Promise((a, o) => {
      n = t.subscribe((s) => {
        s.identity && a(s.identity);
      });
    }).then((a) => (n(), Ae.createActor(Rt, r, a)));
  }
  static getGovernanceAgent(t = null, r = null) {
    const a = {
      host: `https://${Ql.CANISTER_ID_SNS_GOVERNANCE}.icp-api.io`,
      identity: t,
    };
    return (
      r
        ? r.agentOptions
          ? (r.agentOptions.host = a.host)
          : (r.agentOptions = a)
        : (r = { agentOptions: a }),
      new Vr({ ...r.agentOptions })
    );
  }
}
function Ha(e, t) {
  return typeof t == "bigint" ? t.toString() : t;
}
function it(e) {
  return e && e.err !== void 0;
}
function Dl(e) {
  return "Development" in e
    ? "DEVELOPMENT"
    : "Design" in e
      ? "DESIGN"
      : "Decentralised" in e
        ? "DECENTRALISED"
        : "OnHold" in e
          ? "ON HOLD"
          : "UNKNOWN";
}
function Sn(e) {
  return (
    (Number(e) / 1e12).toLocaleString(void 0, {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }) + "T"
  );
}
function e1(e) {
  const t = new Date(Number(e) / 1e6),
    r = { day: "numeric", month: "short", year: "numeric" },
    n = new Intl.DateTimeFormat("en-UK", r).format(t),
    a = {
      hour: "numeric",
      minute: "numeric",
      hour12: !0,
      timeZone: "Europe/London",
    },
    o = new Intl.DateTimeFormat("en-GB", a).format(t);
  return `${n}, ${o}`;
}
var t1 = {
  BACKEND_CANISTER_ID: "rbqtt-7yaaa-aaaal-qcndq-cai",
  FRONTEND_CANISTER_ID: "qm6x5-qqaaa-aaaal-qcnea-cai",
  DFX_NETWORK: "ic",
};
class r1 {
  constructor() {
    tt(this, "actor");
    const t = t1.BACKEND_CANISTER_ID;
    this.actor = Ae.createActor(Rt, t);
  }
  async getDataHashes() {
    const t = await this.actor.getDataHashes({});
    if (it(t)) throw new Error("Failed to fetch data hashes");
    return t.ok;
  }
}
const n1 = BigInt(60 * 60 * 1e3 * 1e3 * 1e3 * 24 * 14),
  a1 = 576,
  o1 = 625,
  En = () =>
    Os.create({
      idleOptions: { disableIdle: !0, disableDefaultIdleCallback: !0 },
    }),
  s1 = ({ width: e, height: t }) => {
    if (pa(window) || pa(window.top)) return;
    const {
        top: { innerWidth: r, innerHeight: n },
      } = window,
      a = n / 2 + screenY - t / 2,
      o = r / 2 + screenX - e / 2;
    return `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=${e}, height=${t}, top=${a}, left=${o}`;
  };
let Ge;
const i1 = "https://waterwaylabs.xyz",
  l1 = "https://qm6x5-qqaaa-aaaal-qcnea-cai.icp0.io",
  c1 = () => window.location.origin === i1,
  u1 = () => {
    const { subscribe: e, set: t, update: r } = ct({ identity: void 0 });
    return {
      subscribe: e,
      sync: async () => {
        Ge = Ge ?? (await En());
        const n = await Ge.isAuthenticated();
        t({ identity: n ? Ge.getIdentity() : null });
      },
      signIn: ({ domain: n }) =>
        new Promise(async (a, o) => {
          Ge = Ge ?? (await En());
          const s = n;
          await Ge?.login({
            maxTimeToLive: n1,
            onSuccess: () => {
              r((c) => ({ ...c, identity: Ge?.getIdentity() })), a();
            },
            onError: o,
            identityProvider: s,
            ...(c1() && { derivationOrigin: l1 }),
            windowOpenerFeatures: s1({ width: a1, height: o1 }),
          });
        }),
      signOut: async () => {
        await (Ge ?? (await En())).logout(),
          (Ge = null),
          r((a) => ({ ...a, identity: null })),
          localStorage.removeItem("user_profile_data");
      },
    };
  },
  se = u1(),
  d1 = ct(void 0);
var Wa = {
  BACKEND_CANISTER_ID: "rbqtt-7yaaa-aaaal-qcndq-cai",
  FRONTEND_CANISTER_ID: "qm6x5-qqaaa-aaaal-qcnea-cai",
  DFX_NETWORK: "ic",
};
class rn {
  constructor() {
    tt(this, "actor");
    this.actor = Ae.createActor(Rt, Wa.BACKEND_CANISTER_ID);
  }
  async getProjects() {
    const t = await this.actor.getProjects({});
    if ((console.log(t), it(t))) throw new Error("Failed to fetch projects");
    return t.ok;
  }
  async topupCanister(t, r) {
    const a = await (
      await Ae.createIdentityActor(se, Wa.BACKEND_CANISTER_ID)
    ).topupCanister(t, r);
    if (it(a)) throw new Error("Failed to topup canister");
    return a.ok;
  }
}
var f1 = {
  BACKEND_CANISTER_ID: "rbqtt-7yaaa-aaaal-qcndq-cai",
  FRONTEND_CANISTER_ID: "qm6x5-qqaaa-aaaal-qcnea-cai",
  DFX_NETWORK: "ic",
};
class v1 {
  constructor() {
    tt(this, "actor");
    this.actor = Ae.createActor(Rt, f1.BACKEND_CANISTER_ID);
  }
  async getTeamMembers() {
    const t = await this.actor.getTeamMembers();
    if (it(t)) throw new Error("Failed to fetch team members");
    return t.ok;
  }
}
function p1() {
  const { subscribe: e, set: t } = ct([]);
  async function r(a) {
    return new rn().getProjectCanisterInfo(a);
  }
  async function n(a, o) {
    return new rn().topupCanister(a, o);
  }
  return {
    subscribe: e,
    setProjects: (a) => t(a),
    getProjectCanisterInfo: r,
    topupCanister: n,
  };
}
const at = p1();
function _1() {
  const { subscribe: e, set: t } = ct([]);
  return { subscribe: e, setTeamMembers: (r) => t(r) };
}
const Bn = _1();
class h1 {
  constructor() {
    tt(this, "dataHashService");
    tt(this, "projectService");
    tt(this, "teamService");
    tt(this, "categories", ["projects", "team_members"]);
    (this.dataHashService = new r1()),
      (this.projectService = new rn()),
      (this.teamService = new v1());
  }
  async syncStores() {}
  async syncCategory(t) {
    switch (t) {
      case "projects":
        const r = await this.projectService.getProjects();
        r &&
          (at.setProjects(r.projects),
          localStorage.setItem("projects", JSON.stringify(r, Ha)));
        break;
      case "team_members":
        const n = await this.teamService.getTeamMembers();
        Bn.setTeamMembers(n),
          localStorage.setItem("team_members", JSON.stringify(n, Ha));
        break;
    }
  }
  loadFromCache(t) {
    const r = localStorage.getItem(t);
    switch (t) {
      case "projects":
        const n = JSON.parse(r || "[]");
        at.setProjects(n);
        break;
      case "team_members":
        const a = JSON.parse(r || "[]");
        Bn.setTeamMembers(a);
        break;
    }
  }
}
const Rr = new h1(),
  m1 = (e) => e;
function g1(e) {
  const t = e - 1;
  return t * t * t + 1;
}
function za(e) {
  const t = typeof e == "string" && e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
  return t ? [parseFloat(t[1]), t[2] || "px"] : [e, "px"];
}
function C1(e, { delay: t = 0, duration: r = 400, easing: n = m1 } = {}) {
  const a = +getComputedStyle(e).opacity;
  return { delay: t, duration: r, easing: n, css: (o) => `opacity: ${o * a}` };
}
function b1(
  e,
  {
    delay: t = 0,
    duration: r = 400,
    easing: n = g1,
    x: a = 0,
    y: o = 0,
    opacity: s = 0,
  } = {},
) {
  const c = getComputedStyle(e),
    i = +c.opacity,
    l = c.transform === "none" ? "" : c.transform,
    u = i * (1 - s),
    [v, d] = za(a),
    [f, _] = za(o);
  return {
    delay: t,
    duration: r,
    easing: n,
    css: (g, C) => `
			transform: ${l} translate(${(1 - g) * v}${d}, ${(1 - g) * f}${_});
			opacity: ${i - u * C}`,
  };
}
const w1 = async () => y1(),
  y1 = async () => {
    await se.signOut(), window.location.reload();
  },
  x1 = async () => {
    const e = await ue(
        () => Promise.resolve().then(() => I2),
        void 0,
        import.meta.url,
      ),
      t = new e.default();
    return (
      (t.onmessage = async ({ data: r }) => {
        const { msg: n, data: a } = r;
        switch (n) {
          case "signOutIdleTimer":
            await w1();
            return;
          case "delegationRemainingTime":
            d1.set(a?.authRemainingTime);
            return;
        }
      }),
      {
        syncAuthIdle: (r) => {
          if (!r.identity) {
            t.postMessage({ msg: "stopIdleTimer" });
            return;
          }
          t.postMessage({ msg: "startIdleTimer" });
        },
      }
    );
  };
var T1 = A("<button>LET'S CONNECT</button>"),
  N1 = A("<button>LET'S CONNECT</button>"),
  S1 = A(
    '<footer class="relative py-8 overflow-hidden bg-BrandGray"><div class="absolute ellipse-1"></div> <div class="absolute ellipse-2"></div> <div class="relative z-10"><div class="flex flex-col px-6 lg:px-12 lg:flex-row lg:items-center lg:justify-between"><div class="flex items-center mb-6 lg:mb-0"><a href="/" class="flex items-center"><img src="logo.png" class="h-5 lg:h-4" alt="Waterway Labs Logo"> <span class="ml-2 tracking-wide"><span class="text-white">WATERWAY</span> <span class="text-white exLight">LABS</span></span></a></div> <div class="flex flex-col text-sm uppercase exLight lg:mb-0 lg:flex-row"><a href="/" class="mb-4 lg:mb-0 lg:mx-4 hover:text-blue-400">Products</a> <a href="/about" class="mb-4 lg:mb-0 lg:mx-4 hover:text-blue-400">About Us</a> <a href="/team" class="mb-4 lg:mb-0 lg:mx-4 hover:text-blue-400">The Team</a></div></div> <hr class="my-6 border-t-2 border-[#4E4E4E] mx-6 lg:mx-auto lg:w-[1450px]"> <div class="flex flex-col px-6 lg:px-12 lg:flex-row lg:items-center lg:justify-between"><div class="mb-4 lg:mb-0"><!></div> <div class="flex flex-col text-sm uppercase exLight lg:flex-row "><a href="https://github.com" target="_blank" class="mb-4 lg:mb-0 lg:mx-2 hover:text-blue-400">GitHub</a> <a href="https://twitter.com" target="_blank" class="mb-4 lg:mb-0 lg:mx-2 hover:text-blue-400">Twitter</a></div></div></div></footer>',
  );
function ws(e, t) {
  Q(t, !1);
  let r = V(!1);
  _e(async () => {
    try {
      se.subscribe((u) => {
        E(r, u.identity !== null && u.identity !== void 0);
      });
    } catch (u) {
      console.error("Error fetching homepage data:", u);
    } finally {
    }
  });
  function n() {
    let u = { domain: "https://identity.ic0.app" };
    se.signIn(u);
  }
  function a() {
    se.signOut();
  }
  ae();
  var o = S1(),
    s = w(m(o), 4),
    c = w(m(s), 4),
    i = m(c),
    l = m(i);
  W(
    l,
    () => p(r),
    (u) => {
      var v = T1();
      G("click", v, a), T(u, v);
    },
    (u) => {
      var v = N1();
      G("click", v, n), T(u, v);
    },
  ),
    h(i),
    Xn(2),
    h(c),
    h(s),
    h(o),
    T(e, o),
    D();
}
var E1 = ve(
  '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 16.495C13.242 16.495 14.25 17.503 14.25 18.745C14.25 19.987 13.242 20.995 12 20.995C10.758 20.995 9.75 19.987 9.75 18.745C9.75 17.503 10.758 16.495 12 16.495ZM12 9.745C13.242 9.745 14.25 10.753 14.25 11.995C14.25 13.237 13.242 14.245 12 14.245C10.758 14.245 9.75 13.237 9.75 11.995C9.75 10.753 10.758 9.745 12 9.745ZM12 2.995C13.242 2.995 14.25 4.003 14.25 5.245C14.25 6.487 13.242 7.495 12 7.495C10.758 7.495 9.75 6.487 9.75 5.245C9.75 4.003 10.758 2.995 12 2.995Z" fill="white"></path></svg>',
);
function A1(e, t) {
  let r = $(t, "className", 8, "");
  var n = E1();
  O(() => pe(n, r())), T(e, n);
}
var k1 = ve(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C18 12.1217 17.1572 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18ZM14 9H6C5.73479 9 5.48043 9.10536 5.2929 9.29289C5.10536 9.48043 5 9.73478 5 10C5 10.2652 5.10536 10.5196 5.2929 10.7071C5.48043 10.8946 5.73479 11 6 11H14C14.2652 11 14.5196 10.8946 14.7071 10.7071C14.8946 10.5196 15 10.2652 15 10C15 9.73478 14.8946 9.48043 14.7071 9.29289C14.5196 9.10536 14.2652 9 14 9Z" fill="white"></path></svg>',
);
function O1(e, t) {
  let r = $(t, "className", 8, "");
  var n = k1();
  O(() => pe(n, r())), T(e, n);
}
var L1 = ve(
  '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" viewBox="0 0 47 47"><circle cx="23.5" cy="23.5" r="23.5" fill="white"></circle><path d="M21.0753 33L19 30.8783L25.8486 23.997L19 17.1217L21.0753 15L30 23.997L21.0753 33Z" fill="#272727"></path></svg>',
);
function Wt(e, t) {
  let r = $(t, "className", 8, "");
  var n = L1();
  O(() => pe(n, r())), T(e, n);
}
var P1 = A('<a href="account">ACCOUNT</a>'),
  R1 = A(
    '<div class="mobile-menu-item"><a href="/account" class="mobile-nav-link">ACCOUNT</a> <a href="/account"><!></a></div> <div class="horizontal-divider"></div>',
    1,
  ),
  $1 = A(
    '<div class="mobile-menu"><div class="mobile-menu-header"><a href="/" class="flex items-center space-x-2"><img src="logo.png" class="h-5" alt="Waterway Labs Logo"> <span class="header-text">WATERWAY <span class="exLight">LABS</span></span></a> <button aria-label="Close menu"><!></button></div> <div class="mobile-menu-links"><div class="horizontal-divider"></div> <div class="mobile-menu-item"><a href="/about" class="mobile-nav-link">ABOUT</a> <a href="/about"><!></a></div> <div class="horizontal-divider"></div> <div class="mobile-menu-item"><a href="/team" class="mobile-nav-link">TEAM</a> <a href="/team"><!></a></div> <div class="horizontal-divider"></div> <div class="mobile-menu-item"><a href="/contact" class="mobile-nav-link">CONTACT</a> <a href="/contact"><!></a></div> <div class="horizontal-divider"></div> <!></div></div>',
  ),
  F1 = A(
    '<header><div class="flex items-center justify-between w-full mx-auto max-w-screen-2xl"><a href="/" class="flex-shrink-0"><div class="flex items-center space-x-2"><img src="logo.png" class="h-5" alt="Waterway Labs Logo"> <span class="lg:text-sm xl:text-base">WATERWAY <span class="exLight">LABS</span></span></div></a> <nav class="hidden space-x-4 lg:space-x-3 xl:space-x-6 sm:flex"><a href="about">ABOUT</a> <a href="team">TEAM</a> <a href="contact">CONTACT</a> <!></nav> <button class="flex-shrink-0 sm:hidden" aria-label="Menu"><!></button></div></header> <!>',
    1,
  );
function da(e, t) {
  Q(t, !1);
  const r = je(),
    n = () => Ve(dn, "$page", r),
    a = V();
  let o = $(t, "isMenuOpen", 12, !1),
    s = $(t, "halfWidth", 8, !1),
    c = V(!1);
  function i(P) {
    return p(a) === "/" + P;
  }
  _e(async () => {
    try {
      se.subscribe((P) => {
        E(c, P.identity !== null && P.identity !== void 0);
      });
    } catch (P) {
      console.error("Error fetching homepage data:", P);
    } finally {
    }
  });
  function l() {
    o(!o());
  }
  Ct(
    () => n(),
    () => {
      E(a, n().url.pathname);
    },
  ),
    ar(),
    ae();
  var u = F1(),
    v = X(u),
    d = m(v),
    f = w(m(d), 2),
    _ = m(f);
  const g = Ee(
    () =>
      `hover:underline lg:text-sm xl:text-base ${(i("about") ? "text-BrandTurquoise" : "") ?? ""}`,
  );
  var C = w(_, 2);
  const b = Ee(
    () =>
      `hover:underline lg:text-sm xl:text-base ${(i("team") ? "text-BrandTurquoise" : "") ?? ""}`,
  );
  var x = w(C, 2);
  const S = Ee(
    () =>
      `hover:underline lg:text-sm xl:text-base ${(i("contact") ? "text-BrandTurquoise" : "") ?? ""}`,
  );
  var y = w(x, 2);
  W(
    y,
    () => p(c),
    (P) => {
      var B = P1();
      const q = Ee(
        () =>
          `hover:underline lg:text-sm xl:text-base ${(i("account") ? "text-BrandTurquoise" : "") ?? ""}`,
      );
      O(() => Se(B, p(q))), T(P, B);
    },
  ),
    h(f);
  var N = w(f, 2),
    k = m(N);
  A1(k, { className: "w-5" }), h(N), h(d), h(v);
  var L = w(v, 2);
  W(L, o, (P) => {
    var B = $1(),
      q = m(B),
      I = w(m(q), 2),
      K = m(I);
    O1(K, { className: "w-5 text-white" }), h(I), h(q);
    var j = w(q, 2),
      J = w(m(j), 2),
      ne = m(J),
      ee = w(ne, 2),
      te = m(ee);
    Wt(te, { className: "w-7 h-7" }), h(ee), h(J);
    var re = w(J, 4),
      he = m(re),
      qe = w(he, 2),
      ce = m(qe);
    Wt(ce, { className: "w-7 h-7" }), h(qe), h(re);
    var ke = w(re, 4),
      me = m(ke),
      we = w(me, 2),
      wt = m(we);
    Wt(wt, { className: "w-7 h-7" }), h(we), h(ke);
    var De = w(ke, 4);
    W(
      De,
      () => p(c),
      (Ue) => {
        var ye = R1(),
          et = X(ye),
          ut = m(et),
          H = w(ut, 2),
          xe = m(H);
        Wt(xe, { className: "w-7 h-7" }),
          h(H),
          h(et),
          Xn(2),
          G("click", ut, l),
          G("click", H, l),
          T(Ue, ye);
      },
    ),
      h(j),
      h(B),
      G("click", I, l),
      G("click", ne, l),
      G("click", ee, l),
      G("click", he, l),
      G("click", qe, l),
      G("click", me, l),
      G("click", we, l),
      T(P, B);
  }),
    O(() => {
      Se(
        v,
        `py-4 px-4 bg-BrandGray lg:py-4 ${(s() ? "" : "w-full") ?? ""} ${(!s() && "sm:mx-auto lg:container lg:mx-auto") ?? ""}`,
      ),
        Se(_, p(g)),
        Se(C, p(b)),
        Se(x, p(S));
    }),
    G("click", N, l),
    T(e, u),
    D();
}
var M1 = A('<div class="mx-4 mt-2"><!></div>'),
  V1 = A('<div class="full-screen-flex"><!> <!> <!></div>');
function j1(e, t) {
  Q(t, !1);
  const r = je(),
    n = () => Ve(dn, "$page", r),
    a = V();
  Ct(
    () => n(),
    () => {
      E(a, n().url.pathname === "/");
    },
  ),
    ar(),
    ae();
  var o = V1(),
    s = m(o);
  W(
    s,
    () => !p(a),
    (l) => {
      var u = M1(),
        v = m(u);
      da(v, {}), h(u), T(l, u);
    },
  );
  var c = w(s, 2);
  wr(c, t, "default", {});
  var i = w(c, 2);
  W(
    i,
    () => !p(a),
    (l) => {
      ws(l, {});
    },
  ),
    h(o),
    T(e, o),
    D();
}
var q1 = A(
  '<div class="full-screen-flex-col"><div class="w-full px-4"><!></div> <div class="w-full"><!></div></div> <!>',
  1,
);
function U1(e, t) {
  Q(t, !1);
  const r = je(),
    n = () => Ve(dn, "$page", r),
    a = V();
  Ct(
    () => n(),
    () => {
      E(a, n().url.pathname === "/");
    },
  ),
    ar(),
    ae();
  var o = q1(),
    s = X(o),
    c = m(s),
    i = m(c);
  da(i, {}), h(c);
  var l = w(c, 2),
    u = m(l);
  wr(u, t, "default", {}), h(l), h(s);
  var v = w(s, 2);
  W(
    v,
    () => !p(a),
    (d) => {
      ws(d, {});
    },
  ),
    T(e, o),
    D();
}
var B1 = A('<div class="local-spinner svelte-pvdm52"></div>');
function $t(e) {
  var t = B1();
  T(e, t);
}
var H1 = {
  BACKEND_CANISTER_ID: "rbqtt-7yaaa-aaaal-qcndq-cai",
  FRONTEND_CANISTER_ID: "qm6x5-qqaaa-aaaal-qcnea-cai",
  DFX_NETWORK: "ic",
};
class Ia {
  constructor() {}
  async getAppStatus() {
    const r = await (
      await Ae.createActor(Rt, H1.BACKEND_CANISTER_ID)
    ).getAppStatus();
    if (it(r)) throw new Error("Failed to get app status");
    return r.ok;
  }
}
function W1() {
  const { subscribe: e, update: t } = ct([]);
  let r = 0;
  function n(o) {
    t((s) => [...s, { ...o, id: ++r }]);
  }
  function a(o) {
    t((s) => s.filter((c) => c.id !== o));
  }
  return { subscribe: e, addToast: n, removeToast: a };
}
const Xt = W1();
function z1() {
  async function e() {
    const r = await new Ia().getAppStatus();
    if (it(r)) throw new Error("Error fetching app status");
    let n = r;
    if (!localStorage.getItem("version")) {
      localStorage.setItem("version", n.version);
      return;
    }
    n.version !== localStorage.getItem("version") &&
      Xt.addToast({
        message: `Waterway Labs V${n.version} is now available. Click here to reload:`,
        type: "frontend-update",
      });
  }
  async function t() {
    const r = await new Ia().getAppStatus();
    if (it(r)) throw new Error("Error fetching app status");
    let n = r;
    localStorage.setItem("version", n.version),
      window.location.replace(`${window.location.pathname}?v=${n.version}`);
  }
  return { checkServerVersion: e, updateFrontend: t };
}
const ys = z1();
var I1 = A(
    '<button class="p-1 transition-colors border border-white rounded-full group hover:bg-white hover:text-black flex flex-row items-center"><span class="flex-1 text-xs semi-bold tracking-wide text-center lg:px-4">UPDATE SITE</span> <span class="w-8 h-8 flex items-center justify-center"><!></span></button>',
  ),
  Z1 = A(
    '<div><span> </span> <!> <button class="font-bold ml-4">&times;</button></div>',
  );
function G1(e, t) {
  Q(t, !1);
  let r = $(t, "toast", 8);
  _e(() => {
    r().duration && r().duration > 0 && setTimeout(n, r().duration);
  });
  function n() {
    Xt.removeToast(r().id);
  }
  function a() {
    ys.updateFrontend();
  }
  ae();
  var o = Z1(),
    s = m(o),
    c = m(s, !0);
  h(s);
  var i = w(s, 2);
  W(
    i,
    () => r().type == "frontend-update",
    (u) => {
      var v = I1(),
        d = w(m(v), 2),
        f = m(d);
      Wt(f, { className: "w-8 h-8" }), h(d), h(v), G("click", v, a), T(u, v);
    },
  );
  var l = w(i, 2);
  h(o),
    O(() => {
      Se(
        o,
        `fixed top-0 left-0 right-0 z-[9999] p-4 text-black shadow-md flex justify-between items-center bg-${r().type}`,
      ),
        R(c, r().message);
    }),
    G("click", l, n),
    T(e, o),
    D();
}
var K1 = A("<div><!></div>");
function Y1(e) {
  const t = je(),
    r = () => Ve(Xt, "$toasts", t);
  var n = Ce(),
    a = X(n);
  kt(
    a,
    1,
    r,
    (o) => o.id,
    (o, s) => {
      var c = K1(),
        i = m(c);
      G1(i, {
        get toast() {
          return p(s);
        },
      }),
        h(c),
        Go(
          1,
          c,
          () => b1,
          () => ({ y: 20, duration: 200 }),
        ),
        T(o, c);
    },
  ),
    T(e, n);
}
var X1 = A(
    '<div><!> <div class="block lg:hidden"><!></div> <div class="hidden lg:block"><!></div></div>',
  ),
  J1 = A("<div><!></div>");
function Ze(e, t) {
  Q(t, !1);
  const r = je(),
    n = () => Ve(se, "$authStore", r);
  let a = V();
  const o = async () => {
      try {
        await se.sync(),
          console.log(n().identity?.getPrincipal().toString() ?? "Not found");
      } catch (l) {
        console.error("Error syncing auth store:", l);
      }
    },
    s = async () => {
      await o(), await Rr.syncStores(), await ys.checkServerVersion();
    };
  _e(async () => {
    E(a, await x1());
  }),
    Ct(
      () => (p(a), n()),
      () => {
        p(a), n(), p(a)?.syncAuthIdle(n());
      },
    ),
    Ct(
      () => n(),
      () => {
        n() && document.querySelector("body > #app-spinner")?.remove();
      },
    ),
    ar(),
    ae();
  var c = Ce();
  G("storage", Ln, o);
  var i = X(c);
  $i(
    i,
    s,
    (l) => {
      var u = J1(),
        v = m(u);
      $t(v, {}), h(u), Go(1, u, () => C1), T(l, u);
    },
    (l, u) => {
      var v = X1(),
        d = m(v);
      Y1(d, {});
      var f = w(d, 2),
        _ = m(f);
      U1(_, {
        children: (b, x) => {
          var S = Ce(),
            y = X(S);
          wr(y, t, "default", {}, null), T(b, S);
        },
        $$slots: { default: !0 },
      }),
        h(f);
      var g = w(f, 2),
        C = m(g);
      j1(C, {
        children: (b, x) => {
          var S = Ce(),
            y = X(S);
          wr(y, t, "default", {}, null), T(b, S);
        },
        $$slots: { default: !0 },
      }),
        h(g),
        h(v),
        T(l, v);
    },
  ),
    T(e, c),
    D();
}
var Q1 = ve(
  '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 18 19"><path d="M9 0.5C4.0305 0.5 0 4.52975 0 9.5C0 13.4765 2.5785 16.85 6.15525 18.0402C6.6045 18.1235 6.75 17.8445 6.75 17.6075V15.932C4.2465 16.4765 3.72525 14.87 3.72525 14.87C3.31575 13.8298 2.7255 13.553 2.7255 13.553C1.90875 12.9942 2.78775 13.0062 2.78775 13.0062C3.6915 13.0692 4.167 13.934 4.167 13.934C4.9695 15.3095 6.27225 14.912 6.786 14.6818C6.86625 14.1005 7.0995 13.703 7.3575 13.4788C5.35875 13.25 3.25725 12.4782 3.25725 9.0305C3.25725 8.04725 3.609 7.24475 4.18425 6.61475C4.09125 6.3875 3.783 5.47175 4.272 4.23275C4.272 4.23275 5.028 3.99125 6.74775 5.15525C7.4655 4.95575 8.235 4.856 9 4.85225C9.765 4.856 10.5352 4.95575 11.2545 5.15525C12.9727 3.99125 13.7272 4.23275 13.7272 4.23275C14.217 5.4725 13.9087 6.38825 13.8158 6.61475C14.3932 7.24475 14.742 8.048 14.742 9.0305C14.742 12.4872 12.6368 13.2485 10.6327 13.4713C10.9552 13.7502 11.25 14.2978 11.25 15.1378V17.6075C11.25 17.8468 11.394 18.128 11.8507 18.0395C15.4245 16.8477 18 13.475 18 9.5C18 4.52975 13.9703 0.5 9 0.5Z"></path></svg>',
);
function Za(e, t) {
  let r = $(t, "className", 8, ""),
    n = $(t, "color", 8, "currentColor");
  var a = Q1();
  O(() => {
    pe(a, r()), oe(a, "fill", n());
  }),
    T(e, a);
}
var D1 = ve(
  '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 19 15"><path d="M12.8767 0.0963813V0.0931396H13.7207L14.029 0.154732C14.2346 0.194718 14.4213 0.24712 14.589 0.311953C14.7567 0.376787 14.9191 0.452431 15.0759 0.538871C15.2328 0.62531 15.3751 0.713387 15.5028 0.803068C15.6294 0.891679 15.743 0.985688 15.8437 1.08509C15.9432 1.18559 16.0985 1.21152 16.3095 1.16289C16.5205 1.11427 16.7477 1.04673 16.9912 0.960289C17.2346 0.87385 17.4754 0.7766 17.7135 0.668538C17.9515 0.560477 18.0965 0.491866 18.1485 0.462691C18.1993 0.432446 18.2264 0.416238 18.2296 0.414066L18.2328 0.409204L18.2491 0.401099L18.2653 0.392995L18.2815 0.384891L18.2978 0.376787L18.301 0.371924L18.3059 0.368683L18.3108 0.365441L18.314 0.360578L18.3302 0.355716L18.3465 0.352474L18.3432 0.376787L18.3383 0.401099L18.3302 0.425412L18.3221 0.449725L18.314 0.465933L18.3059 0.482141L18.2978 0.506454C18.2924 0.522662 18.287 0.544268 18.2815 0.571288C18.2761 0.598307 18.2247 0.706352 18.1273 0.895456C18.03 1.08456 17.9082 1.27635 17.7621 1.47085C17.6161 1.66536 17.4851 1.8123 17.3694 1.91172C17.2525 2.01222 17.1751 2.08245 17.1373 2.12243C17.0994 2.16349 17.0534 2.2013 16.9993 2.23589L16.9181 2.28938L16.9019 2.29748L16.8857 2.30559L16.8824 2.31045L16.8776 2.31369L16.8727 2.31693L16.8694 2.3218L16.8532 2.3299L16.837 2.338L16.8338 2.34287L16.8289 2.34611L16.824 2.34935L16.8208 2.35421L16.8175 2.35908L16.8126 2.36232L16.8078 2.36556L16.8045 2.37042H16.8857L17.3401 2.27317C17.6431 2.20834 17.9326 2.13 18.2085 2.03815L18.6467 1.89227L18.6954 1.87606L18.7198 1.86796L18.736 1.85986L18.7522 1.85175L18.7685 1.84365L18.7847 1.83554L18.8171 1.83068L18.8496 1.82744V1.85986L18.8415 1.8631L18.8334 1.86796L18.8301 1.87282L18.8253 1.87606L18.8204 1.87931L18.8171 1.88417L18.8139 1.88903L18.809 1.89227L18.8042 1.89551L18.8009 1.90038L18.7977 1.90524L18.7928 1.90848L18.7847 1.92469L18.7766 1.9409L18.7717 1.94414C18.7695 1.94738 18.7008 2.03922 18.5656 2.21968C18.4303 2.40122 18.3573 2.49305 18.3465 2.49523C18.3356 2.49847 18.3205 2.51468 18.301 2.54385C18.2826 2.5741 18.1679 2.69459 17.9569 2.9053C17.7459 3.11601 17.5393 3.30347 17.3369 3.46773C17.1335 3.63306 17.0307 3.8362 17.0285 4.07717C17.0253 4.31705 17.0128 4.58828 16.9912 4.89083C16.9695 5.19339 16.929 5.52025 16.8694 5.87144C16.8099 6.22262 16.718 6.61973 16.5935 7.06276C16.4691 7.50578 16.3176 7.93801 16.1391 8.35943C15.9605 8.78085 15.7739 9.15904 15.5791 9.49402C15.3843 9.829 15.2058 10.1126 15.0435 10.345C14.8812 10.5773 14.7162 10.7961 14.5484 11.0014C14.3807 11.2067 14.1687 11.438 13.9122 11.6951C13.6547 11.9512 13.514 12.0917 13.4902 12.1165C13.4653 12.1403 13.3593 12.2289 13.1721 12.3824C12.986 12.5369 12.7858 12.6914 12.5715 12.8459C12.3584 12.9994 12.1625 13.1274 11.984 13.2301C11.8054 13.3327 11.5901 13.4499 11.338 13.5818C11.087 13.7147 10.8153 13.8379 10.5232 13.9513C10.231 14.0648 9.92265 14.1701 9.59803 14.2674C9.27341 14.3646 8.95962 14.4403 8.65664 14.4943C8.35368 14.5483 8.01012 14.5943 7.62598 14.6321L7.04979 14.6888V14.6969H5.99479V14.6888L5.85682 14.6807C5.76486 14.6753 5.68911 14.6699 5.62959 14.6645C5.57009 14.6591 5.34555 14.6294 4.95601 14.5754C4.56647 14.5213 4.2608 14.4673 4.03897 14.4133C3.81716 14.3592 3.48712 14.2566 3.04889 14.1053C2.61066 13.954 2.23572 13.8011 1.92409 13.6466C1.61355 13.4932 1.41878 13.3959 1.33978 13.3549C1.26187 13.3149 1.17423 13.2652 1.07684 13.2057L0.930764 13.1166L0.927534 13.1117L0.922648 13.1085L0.917779 13.1052L0.914533 13.1004L0.898302 13.0923L0.882071 13.0842L0.878841 13.0793L0.873956 13.0761L0.869086 13.0728L0.86584 13.068L0.86261 13.0631L0.857725 13.0599H0.849609V13.0274L0.86584 13.0307L0.882071 13.0356L0.95511 13.0437C1.0038 13.0491 1.13636 13.0572 1.35277 13.068C1.56919 13.0788 1.79911 13.0788 2.04258 13.068C2.28604 13.0572 2.53492 13.0328 2.78919 12.995C3.04348 12.9572 3.34375 12.8924 3.69001 12.8005C4.03627 12.7087 4.3544 12.5995 4.6444 12.4731C4.9333 12.3456 5.13888 12.2505 5.26117 12.1879C5.38235 12.1263 5.56738 12.0117 5.81625 11.8442L6.18956 11.593L6.1928 11.5881L6.19767 11.5849L6.20256 11.5817L6.20579 11.5768L6.20903 11.5719L6.2139 11.5687L6.21879 11.5655L6.22202 11.5606L6.23825 11.5557L6.25448 11.5525L6.25772 11.5363L6.26259 11.5201L6.26748 11.5168L6.27071 11.512L6.14086 11.5039C6.0543 11.4985 5.97044 11.493 5.88928 11.4877C5.80813 11.4823 5.68099 11.4579 5.50786 11.4147C5.33474 11.3715 5.14809 11.3067 4.9479 11.2202C4.74772 11.1338 4.55295 11.0311 4.36359 10.9123C4.17424 10.7934 4.03735 10.6945 3.95295 10.6156C3.86963 10.5378 3.76142 10.4276 3.62833 10.285C3.49632 10.1413 3.38162 9.99377 3.28424 9.8425C3.18685 9.69122 3.0938 9.51669 3.00508 9.31897L2.87035 9.02397L2.86223 8.99966L2.85412 8.97535L2.84925 8.95914L2.846 8.94293L2.87035 8.94617L2.8947 8.95103L3.07323 8.97535C3.19227 8.99156 3.37893 8.99695 3.6332 8.99156C3.88749 8.98616 4.06332 8.97535 4.1607 8.95914C4.25809 8.94293 4.3176 8.93212 4.33924 8.92672L4.3717 8.91862L4.41228 8.91051L4.45286 8.90241L4.4561 8.89755L4.46097 8.89431L4.46586 8.89106L4.46909 8.8862L4.43662 8.8781L4.40416 8.86999L4.3717 8.86189L4.33924 8.85378L4.30678 8.84568C4.28514 8.84028 4.24728 8.82947 4.19316 8.81326C4.13906 8.79706 3.99299 8.73762 3.75493 8.63497C3.51689 8.53232 3.32752 8.43237 3.18685 8.33512C3.04583 8.23758 2.91137 8.13092 2.78433 8.01581C2.65772 7.89911 2.51869 7.74891 2.36719 7.56522C2.21571 7.38153 2.08046 7.16811 1.96142 6.92498C1.8424 6.68186 1.75313 6.44954 1.69361 6.22802C1.63433 6.0078 1.59522 5.78266 1.57677 5.55537L1.54754 5.215L1.56377 5.21824L1.58 5.2231L1.59623 5.2312L1.61246 5.23931L1.62869 5.24741L1.64492 5.25552L1.8965 5.36898C2.06423 5.44462 2.27252 5.50945 2.52139 5.56348C2.77027 5.6175 2.91904 5.64723 2.96773 5.65262L3.04077 5.66073H3.18685L3.18362 5.65587L3.17873 5.65262L3.17387 5.64938L3.17062 5.64452L3.16739 5.63966L3.1625 5.63642L3.15763 5.63317L3.15439 5.62831L3.13816 5.62021L3.12193 5.6121L3.1187 5.60724L3.11381 5.604L3.10894 5.60076L3.1057 5.59589L3.08947 5.58779L3.07323 5.57969L3.07 5.57482C3.06676 5.57265 3.02022 5.53808 2.9304 5.47109C2.84167 5.40301 2.74862 5.31495 2.65123 5.20689C2.55385 5.09883 2.45646 4.98537 2.35908 4.86652C2.26151 4.74739 2.17461 4.61993 2.09938 4.48562C2.02365 4.35055 1.94357 4.17873 1.85917 3.97019C1.77585 3.76272 1.71255 3.55363 1.66927 3.34293C1.626 3.13222 1.60165 2.92421 1.59623 2.7189C1.59082 2.51359 1.59623 2.338 1.61246 2.19213C1.62869 2.04625 1.66115 1.88146 1.70984 1.69777C1.75854 1.51408 1.82888 1.31958 1.92084 1.11427L2.05881 0.80631L2.06692 0.781997L2.07504 0.757684L2.07992 0.754443L2.08315 0.74958L2.0864 0.744718L2.09127 0.741476L2.09615 0.744718L2.09938 0.74958L2.10263 0.754443L2.1075 0.757684L2.11238 0.760926L2.11561 0.765789L2.11886 0.770651L2.12373 0.773893L2.13185 0.790101L2.13996 0.80631L2.14485 0.809551L2.14808 0.814414L2.36719 1.05754C2.51327 1.21962 2.6864 1.40062 2.88658 1.60052C3.08677 1.80042 3.19768 1.90415 3.21931 1.91172C3.24096 1.92036 3.268 1.94521 3.30047 1.98628C3.33293 2.02627 3.44114 2.1219 3.62508 2.27317C3.80904 2.42444 4.0498 2.60005 4.34736 2.79994C4.64493 2.99984 4.97495 3.19705 5.33744 3.39155C5.69994 3.58605 6.08948 3.76164 6.50606 3.91832C6.92265 4.07501 7.21481 4.17766 7.38252 4.22628C7.55025 4.27491 7.83699 4.33704 8.24276 4.41268C8.64853 4.48833 8.95422 4.53695 9.1598 4.55856C9.36539 4.58016 9.50607 4.59259 9.5818 4.59584L9.69542 4.59908L9.69219 4.57476L9.6873 4.55045L9.65484 4.34785C9.6332 4.21278 9.62238 4.02368 9.62238 3.78055C9.62238 3.53743 9.64132 3.31322 9.67919 3.1079C9.71707 2.90259 9.77388 2.69459 9.84961 2.48388C9.92536 2.27317 9.99949 2.10405 10.072 1.97656C10.1456 1.85013 10.2419 1.70588 10.3609 1.54379C10.4799 1.38171 10.6341 1.21423 10.8235 1.04133C11.0128 0.868436 11.2292 0.714457 11.4727 0.579392C11.7162 0.444327 11.9407 0.341663 12.1463 0.271432C12.3519 0.201201 12.525 0.155266 12.6657 0.133661C12.8063 0.112055 12.8767 0.099623 12.8767 0.0963813Z"></path></svg>',
);
function Ga(e, t) {
  let r = $(t, "className", 8, ""),
    n = $(t, "color", 8, "currentColor");
  var a = D1();
  O(() => {
    pe(a, r()), oe(a, "fill", n());
  }),
    T(e, a);
}
var ec = A('<a target="_blank" rel="noopener noreferrer"><!></a>'),
  tc = A('<a target="_blank" rel="noopener noreferrer"><!></a>'),
  rc = A('<div class="flex flex-row space-x-4 lg:hidden"><!> <!></div>'),
  nc = A('<a target="_blank" rel="noopener noreferrer"><!></a>'),
  ac = A('<a target="_blank" rel="noopener noreferrer"><!></a>'),
  oc = A(
    '<div class="flex flex-col space-y-2 xs:space-y-4 mx-4 mt-6 xs:mt-8 sm:mt-6 lg:mt-24"><div class="flex items-center justify-between w-full"><div class="status"> </div> <!></div> <h1 class="text-2xl xs:text-3xl lg:text-5xl uppercase semi-bold tracking-wide"> </h1> <p class="text-base xs:text-xl uppercase tracking-wide"> </p> <p class="text-sm exLight"> </p> <div class="flex items-center justify-between w-full"><a target="_blank" rel="noopener noreferrer" class="flex items-center w-full lg:w-auto xs:w-[99%] mt-4 p-1 transition-colors border border-white rounded-full group hover:bg-white hover:text-black"><span class="flex-1 text-xs semi-bold tracking-wide text-center lg:px-4">VISIT SITE</span> <span class="w-8 h-8 flex items-center justify-center"><!></span></a> <div class="flex-col hidden w-4 ml-auto space-y-4 lg:flex"><!> <!></div></div></div>',
  );
function Ka(e, t) {
  let r = $(t, "status", 8),
    n = $(t, "title", 8),
    a = $(t, "description", 8),
    o = $(t, "summary", 8),
    s = $(t, "backgroundColor", 8),
    c = $(t, "websiteURL", 8),
    i = $(t, "github", 8),
    l = $(t, "twitter", 8);
  var u = oc(),
    v = m(u),
    d = m(v),
    f = m(d, !0);
  h(d);
  var _ = w(d, 2);
  W(
    _,
    () => i() || l(),
    (K) => {
      var j = rc(),
        J = m(j);
      W(J, i, (ee) => {
        var te = ec(),
          re = m(te);
        Za(re, {
          className: "h-5 w-5",
          get color() {
            return s();
          },
        }),
          h(te),
          O(() => oe(te, "href", i())),
          T(ee, te);
      });
      var ne = w(J, 2);
      W(ne, l, (ee) => {
        var te = tc(),
          re = m(te);
        Ga(re, {
          className: "h-5 w-5",
          get color() {
            return s();
          },
        }),
          h(te),
          O(() => oe(te, "href", l())),
          T(ee, te);
      }),
        h(j),
        T(K, j);
    },
  ),
    h(v);
  var g = w(v, 2),
    C = m(g, !0);
  h(g);
  var b = w(g, 2),
    x = m(b, !0);
  h(b);
  var S = w(b, 2),
    y = m(S, !0);
  h(S);
  var N = w(S, 2),
    k = m(N),
    L = w(m(k), 2),
    P = m(L);
  Wt(P, { className: "w-8 h-8" }), h(L), h(k);
  var B = w(k, 2),
    q = m(B);
  W(q, i, (K) => {
    var j = nc(),
      J = m(j);
    Za(J, {
      className: "w-5 h-5",
      get color() {
        return s();
      },
    }),
      h(j),
      O(() => oe(j, "href", i())),
      T(K, j);
  });
  var I = w(q, 2);
  W(I, l, (K) => {
    var j = ac(),
      J = m(j);
    Ga(J, {
      className: "w-5 h-5",
      get color() {
        return s();
      },
    }),
      h(j),
      O(() => oe(j, "href", l())),
      T(K, j);
  }),
    h(B),
    h(N),
    h(u),
    O(() => {
      R(f, r()), R(C, n()), R(x, a()), R(y, o()), oe(k, "href", c());
    }),
    T(e, u);
}
var sc = A("<button><div><!></div></button>"),
  ic = A(
    '<div class="z-50 fixed bottom-4 left-1/2 transform -translate-x-1/2 max-w-[95%] sm:max-w-[90%] md:max-w-[85%] px-4 py-1"><div class="absolute inset-0 backdrop-blur bg-opacity-70 rounded-2xl thin-border"></div> <div class="relative flex px-4 py-4 space-x-2 overflow-x-auto md:space-x-5 scrollbar-hide"></div></div>',
  );
function lc(e, t) {
  Q(t, !1);
  const r = je(),
    n = () => Ve(o(), "$selectedProjectId", r);
  let a = $(t, "projects", 24, () => []),
    o = $(t, "selectedProjectId", 8);
  _e(() => {
    a().length > 0 && La(o(), a()[0].id);
  });
  function s(d) {
    d && La(o(), d.id);
  }
  function c(d) {
    switch (d) {
      case "OpenFPL":
      case "OpenWSL":
      case "OpenBook":
      case "Jeff Bets":
      case "ICFC":
        return "w-6 xs:w-8 ";
      case "OpenBeats":
        return "w-6 xs:w-8 md:w-9";
      case "Transfer Kings":
        return "w-6 xs:w-12";
      case "ICGC":
        return "w-6 xs:w-12";
    }
    return "w-6 xs:w-12";
  }
  function i(d) {
    return `w-full transition-transform duration-200 hover:scale-110 ${n() === d.id ? "scale-110" : ""}`;
  }
  function l(d) {
    return `flex items-center justify-center my-1 rounded-lg w-14 xs:w-20 h-14 xs:h-20 xs:rounded-2xl translate-z-0 ${n() === d.id ? "animate-ring-pulse" : ""}`;
  }
  ae();
  var u = ic(),
    v = w(m(u), 2);
  kt(v, 5, a, Jt, (d, f) => {
    var _ = sc();
    const g = Ee(() => i(p(f)));
    var C = m(_);
    const b = Ee(() => l(p(f)));
    var x = m(C),
      S = Ee(() => c(p(f).name));
    qr(
      x,
      () => p(f).component,
      (y, N) => {
        N(y, {
          get className() {
            return p(S);
          },
        });
      },
    ),
      h(C),
      h(_),
      O(() => {
        Se(_, p(g)),
          Se(C, p(b)),
          oe(C, "style", `background-color: ${p(f).backgroundColor}`);
      }),
      G("click", _, () => s(p(f))),
      T(d, _);
  }),
    h(v),
    h(u),
    T(e, u),
    D();
}
var cc = ve(
  '<svg width="76" height="39" viewBox="-33 0 140 39" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_13_18)"><path d="M0.436461 12.1401C0.259514 12.276 0.00411284 12.1513 0.00105618 11.9277C-0.0305293 9.59382 0.57418 0.580945 11.759 0.0954332C27.0593 -0.568718 45.2295 27.8706 55.6391 31.2765C58.1641 32.1026 60.5929 31.6873 61.722 31.402C61.9604 31.3417 62.1489 31.6058 62.0153 31.8128C60.8721 33.5833 57.0501 38.6552 50.5956 38.9909C39.1331 39.5869 18.9082 9.66603 8.7533 9.34247C4.67079 9.21236 1.52378 11.3051 0.436461 12.1401Z" fill="#FFFFFF"></path><path d="M29.3859 6.13239C29.2307 6.15027 29.083 6.14023 29.0808 5.98355C29.0585 4.34753 33.3455 0.511286 39.1331 0.0276471C48.7107 -0.772741 56.8278 16.0354 67.4412 20.5823C69.1533 21.3158 71.8905 20.4975 72.682 20.2976C72.8491 20.2553 72.9812 20.4404 72.8877 20.5855C72.0865 21.8266 69.1658 28.0412 62.3977 28.0412C54.2976 28.0412 38.5333 8.61274 33.9538 6.48184C31.8311 5.49413 30.4896 6.00501 29.3859 6.13239Z" fill="#FFFFFF"></path><path d="M53.3752 3.35703C53.1846 3.18846 53.2075 2.88424 53.4208 2.7457C55.3027 1.52255 63.2648 -2.93704 70.6788 3.64399C76.6017 8.90149 73.8656 14.6317 72.078 15.5434C69.9388 16.6343 68.4 16.2751 67.1422 15.4707C60.8 11.4147 55.1 5.23176 53.3752 3.35703Z" fill="#FFFFFF"></path></g><defs><clipPath id="clip0_13_18"><rect width="76" height="39" fill="white"></rect></clipPath></defs></svg>',
);
function Ya(e, t) {
  let r = $(t, "className", 8, "");
  var n = cc();
  O(() => pe(n, r())), T(e, n);
}
var uc = ve(
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 712 922"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.3593 84.6975L50 125.682V565.818L0.254433 570.856L0 568.343V99.6239L21.3593 84.6975ZM662 125.682C690.641 84.6975 690.623 84.6852 690.605 84.6727L690.567 84.6461L690.483 84.5878C690.424 84.5466 690.358 84.5009 690.285 84.4507L690.158 84.3638C690.042 84.2838 689.911 84.1944 689.766 84.096C689.366 83.8243 688.857 83.4832 688.241 83.0772C687.008 82.2652 685.344 81.1937 683.252 79.9007C679.07 77.315 673.175 73.8409 665.603 69.7841C650.464 61.6723 628.595 51.216 600.296 40.8771C543.642 20.1788 461.34 0 356 0C250.66 0 168.358 20.1788 111.704 40.8771C83.4054 51.216 61.5363 61.6723 46.3967 69.7841C38.8254 73.8409 32.9301 77.315 28.7476 79.9007C26.6561 81.1937 24.9917 82.2652 23.7592 83.0772C23.1428 83.4832 22.6343 83.8243 22.2342 84.096C22.0341 84.2318 21.8612 84.3502 21.7153 84.4507C21.6424 84.5009 21.5763 84.5466 21.5169 84.5878L21.433 84.6461L21.3949 84.6727C21.3769 84.6852 21.3593 84.6975 50 125.682C50 125.682 158.299 50 356 50C553.701 50 662 125.682 662 125.682ZM662 565.818L711.746 570.856L712 568.343V99.6239L690.641 84.6975L662 125.682V565.818ZM662 565.818C662 565.818 655.935 625.705 642.875 661.5C595.231 792.08 446.764 872 356 872C265.236 872 116.769 792.08 69.125 661.5C56.0647 625.705 50 565.818 50 565.818C0.254433 570.856 0.254837 570.86 0.255268 570.864L0.284927 571.153C0.301182 571.309 0.32354 571.523 0.352036 571.79C0.409019 572.326 0.490627 573.079 0.597122 574.03C0.809975 575.929 1.12308 578.623 1.53869 581.944C2.36752 588.566 3.61635 597.782 5.30772 608.228C8.54605 628.227 13.915 656.057 22.1539 678.638C50.5159 756.371 107.836 816.746 168.645 857.311C228.785 897.431 298.118 922 356 922C413.882 922 483.215 897.431 543.355 857.311C604.164 816.746 661.484 756.371 689.846 678.638C698.085 656.057 703.454 628.227 706.692 608.228C708.384 597.782 709.633 588.566 710.461 581.944C710.877 578.623 711.19 575.929 711.403 574.03C711.443 573.675 711.479 573.348 711.512 573.05C711.567 572.548 711.612 572.126 711.648 571.79C711.676 571.523 711.699 571.309 711.715 571.153L711.741 570.897L711.745 570.864C711.745 570.86 711.746 570.856 662 565.818Z" fill="white"></path><path d="M106.884 268C102.295 268 100 265.733 100 261.2V238.722C100 234.189 102.295 231.922 106.884 231.922H125.813V168.456H106.884C102.295 168.456 100 166.189 100 161.656V138.8C100 134.267 102.295 132 106.884 132H188.339C192.928 132 195.223 134.267 195.223 138.8V161.656C195.223 166.189 192.928 168.456 188.339 168.456H169.792V231.922H188.339C192.928 231.922 195.223 234.189 195.223 238.722V261.2C195.223 265.733 192.928 268 188.339 268H106.884Z" fill="white"></path><path d="M329.542 268H282.887C266.825 268 254.97 264.852 247.322 258.556C239.673 252.259 235.849 242.563 235.849 229.467V170.722C235.849 157.5 239.673 147.741 247.322 141.444C254.97 135.148 266.825 132 282.887 132H329.542C334.131 132 336.426 134.267 336.426 138.8V161.656C336.426 166.189 334.131 168.456 329.542 168.456H291.109C283.333 168.456 279.445 171.604 279.445 177.9V222.856C279.445 228.9 283.333 231.922 291.109 231.922H329.542C334.131 231.922 336.426 234.189 336.426 238.722V261.2C336.426 265.733 334.131 268 329.542 268Z" fill="white"></path><path d="M413.661 268H384.023C379.434 268 377.14 265.733 377.14 261.2V138.8C377.14 134.267 379.434 132 384.023 132H469.303C473.892 132 476.187 134.267 476.187 138.8V161.278C476.187 165.811 473.892 168.078 469.303 168.078H420.545V187.722H453.815C458.404 187.722 460.699 189.989 460.699 194.522V217.189C460.699 221.722 458.404 223.989 453.815 223.989H420.545V261.2C420.545 265.733 418.25 268 413.661 268Z" fill="white"></path><path d="M605.116 268H558.461C542.399 268 530.544 264.852 522.896 258.556C515.248 252.259 511.423 242.563 511.423 229.467V170.722C511.423 157.5 515.248 147.741 522.896 141.444C530.544 135.148 542.399 132 558.461 132H605.116C609.705 132 612 134.267 612 138.8V161.656C612 166.189 609.705 168.456 605.116 168.456H566.683C558.907 168.456 555.019 171.604 555.019 177.9V222.856C555.019 228.9 558.907 231.922 566.683 231.922H605.116C609.705 231.922 612 234.189 612 238.722V261.2C612 265.733 609.705 268 605.116 268Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M176 334.707C188.774 333.056 202.212 331.41 216 329.849V585.7C200.891 597.992 187.431 612.23 176 628.034V334.707ZM536 628.034V333.812C523.158 332.186 509.723 330.578 496 329.067V585.701C511.109 597.992 524.569 612.23 536 628.034ZM456 559.744V325.052C442.576 323.847 429.154 322.798 416 321.972V544.203C429.936 548.106 443.317 553.335 456 559.744ZM376 536.889V320.198C370.377 320.068 364.869 320 359.5 320C351.921 320 344.064 320.136 336 320.389V536.889C342.588 536.3 349.259 536 356 536C362.741 536 369.412 536.3 376 536.889ZM296 544.203V322.431C282.798 323.33 269.377 324.441 256 325.694V559.744C268.683 553.334 282.064 548.106 296 544.203ZM100 345.545C109.92 343.999 122.136 342.149 136 340.162V685.123C128.001 672.173 121.275 658.555 116.096 644.362C111.275 631.147 107.081 611.136 104.022 592.244C102.565 583.244 101.481 575.25 100.765 569.526C100.425 566.809 100.17 564.626 100 563.115V345.545ZM576 685.123C583.999 672.173 590.725 658.555 595.904 644.362C600.725 631.147 604.919 611.136 607.978 592.244C609.435 583.244 610.519 575.25 611.235 569.526C611.575 566.809 611.83 564.626 612 563.115V344.463C601.726 342.887 589.545 341.076 576 339.167V685.123Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M539.486 731.477C526.994 640.82 449.21 571 355.119 571C261.577 571 184.152 640.008 170.978 729.893C179.645 738.903 188.923 747.4 198.666 755.334L235.8 727.736C237.895 726.178 240.618 725.741 243.096 726.565L288.777 741.75C291.167 742.544 293.043 744.417 293.841 746.805L311.105 798.453C311.922 800.897 311.512 803.578 310.022 805.68C308.369 808.012 306.611 810.529 304.808 813.133C309.864 814.693 314.802 816.044 319.593 817.188L321.699 814.507C323.254 812.527 325.651 811.395 328.169 811.451L382.612 812.67C385.188 812.728 387.573 814.02 389.047 816.133C389.409 816.652 389.778 817.179 390.154 817.714C394.886 816.637 399.769 815.355 404.774 813.866L400.842 808.426C399.366 806.385 398.938 803.769 399.686 801.364L415.85 749.362C416.614 746.901 418.514 744.965 420.951 744.129C429.548 741.182 440.106 737.335 449.179 734.029L449.182 734.028L449.183 734.028L449.185 734.027L449.186 734.027C459.537 730.256 467.955 727.188 469.326 726.964C471.788 726.561 497.566 744.688 512.831 755.742C522.183 748.157 531.111 740.054 539.486 731.477ZM347.299 636.162V684.302C347.299 686.82 346.113 689.191 344.099 690.702L300.534 723.376C298.472 724.922 295.798 725.379 293.334 724.628C284.638 721.979 273.826 718.911 264.535 716.274C253.936 713.266 245.316 710.82 244.073 710.198C241.779 709.051 230.981 677.572 225.184 659.891C224.284 657.147 224.946 654.148 226.924 652.045C234.191 644.318 246.444 631.683 255.022 624.177C263.929 616.383 284.232 606.359 296.31 600.94C298.836 599.807 301.758 600.118 304.025 601.706L343.887 629.609C346.025 631.106 347.299 633.552 347.299 636.162ZM414.999 725.741L461.277 712.485C463.787 711.766 465.788 709.868 466.638 707.4L482.486 661.396C483.387 658.779 482.882 655.884 481.097 653.768C472.562 643.65 457.335 626.892 447.389 620.475C437.811 614.296 422.291 605.996 412.861 601.138C410.295 599.815 407.229 600.005 404.839 601.625C389.438 612.067 362.15 631.116 361.678 633.638C361.423 635.004 361.445 643.964 361.472 654.981V654.982V654.983V654.984V654.985C361.496 664.643 361.524 675.88 361.372 684.967C361.329 687.543 362.504 689.988 364.558 691.544L407.965 724.428C409.972 725.948 412.578 726.435 414.999 725.741Z" fill="white"></path></svg>',
);
function dc(e, t) {
  let r = $(t, "className", 8, "");
  var n = uc();
  O(() => pe(n, r())), T(e, n);
}
var fc = ve(
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 94 94"><path fill-rule="evenodd" clip-rule="evenodd" d="M94 47C94 72.9574 72.9574 94 47 94C21.0426 94 0 72.9574 0 47C0 21.0426 21.0426 0 47 0C72.9574 0 94 21.0426 94 47ZM77.7155 38.6837L81.8372 22.3311C76.8173 15.2548 69.6956 9.77444 61.3819 6.79982L46.2806 14.8676L32.1236 6.98018C24.23 9.91561 17.4398 15.1197 12.5456 21.7999L16.8012 38.6837L4.57764 51.7504C5.30848 58.3505 7.54415 64.4968 10.9339 69.8386L27.7234 73.332L33.1165 87.3749C37.469 88.8713 42.1396 89.6836 46.9999 89.6836C51.7382 89.6836 56.2961 88.9116 60.5548 87.4864L65.9906 73.332L83.1093 69.7701C86.5594 64.3103 88.8055 58.0138 89.4743 51.2537L77.7155 38.6837Z" fill="white"></path><g clip-path="url(#clip0_425_877)"><path d="M63.7855 31.2853V35.3105C63.7855 36.4336 62.8848 37.341 61.7701 37.341H41.6335C39.7607 37.341 38.2402 38.8729 38.2402 40.7597V62.714C38.2402 63.8371 37.3395 64.7446 36.2248 64.7446H32.2296C31.1148 64.7446 30.2141 63.8371 30.2141 62.714V40.7822C30.2141 34.4165 35.3374 29.2548 41.6558 29.2548H61.7701C62.8848 29.2548 63.7855 30.1622 63.7855 31.2853Z" fill="white"></path><path d="M63.7856 44.448V56.6672C63.7856 61.1282 60.1961 64.749 55.7639 64.749H45.4816C44.6656 64.749 44.0012 64.0797 44.0012 63.2576V58.1497C44.0012 57.3276 44.6656 56.6582 45.4816 56.6582H54.2791C55.0951 56.6582 55.7595 55.9889 55.7595 55.1668V52.5298C55.7595 51.7076 55.0951 51.0383 54.2791 51.0383H45.4816C44.6656 51.0383 44.0012 50.3689 44.0012 49.5468V44.439C44.0012 43.6169 44.6656 42.9475 45.4816 42.9475H62.3052C63.1212 42.9475 63.7856 43.6169 63.7856 44.439V44.448Z" fill="white"></path></g><defs><clipPath id="clip0_425_877"><rect width="33.5714" height="35.4898" fill="white" transform="translate(30.2141 29.2548)"></rect></clipPath></defs></svg>',
);
function vc(e, t) {
  let r = $(t, "className", 8, "");
  var n = fc();
  O(() => pe(n, r())), T(e, n);
}
var pc = ve(
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 68 94"><path d="M34.2198 0C21.368 2.1056 9.8424 7.49415 0.149728 15.2632L0.116272 15.3337V64.853L34.1864 94L67.8765 64.853L67.8837 15.3126C58.332 7.8537 46.7921 2.0727 34.2198 0ZM40.9541 72.5186C40.9541 72.763 40.8011 73.0074 40.5526 73.0686L34.1864 75.1765C34.0621 75.207 33.9379 75.207 33.8136 75.1765L27.4474 73.0686C27.1989 72.9769 27.0435 72.763 27.0435 72.5186V70.3801C27.0435 70.1663 27.1678 69.9524 27.3542 69.8608L33.7204 66.5614C33.9068 66.4697 34.0932 66.4697 34.2796 66.5614L40.6458 69.8608C40.8322 69.9524 40.9541 70.1663 40.9541 70.3801V72.5186ZM52.9265 48.9646C52.9265 49.1785 52.8022 49.3923 52.5848 49.484L48.0515 51.7752C47.7408 51.928 47.6476 52.2945 47.803 52.5695L52.212 60.6042C52.3363 60.8486 52.3052 61.1235 52.1188 61.3068L44.6031 68.5777C44.3857 68.7915 44.075 68.7915 43.8265 68.6388L35.257 62.5593C34.9774 62.3455 34.9153 61.9483 35.1638 61.6734L41.9649 54.2192C42.3688 53.761 41.9028 53.0889 41.3436 53.2722L34.1697 55.5634C34.0454 55.594 33.9211 55.594 33.7969 55.5634L26.6564 53.2722C26.0662 53.0889 25.6312 53.7915 26.0351 54.2192L32.8338 61.6734C33.0823 61.9483 33.0202 62.3455 32.7406 62.5593L24.1711 68.6388C23.9226 68.7915 23.6119 68.7915 23.3945 68.5777L15.8812 61.2762C15.6948 61.0929 15.6637 60.818 15.788 60.5736L20.197 52.539C20.3524 52.2335 20.2281 51.8974 19.9485 51.7447L15.4152 49.4534C15.2288 49.3618 15.0735 49.1479 15.0735 48.934V32.9258C15.0735 32.4676 15.6016 32.1621 16.0055 32.437L19.731 34.9116C19.8864 35.0338 19.9796 35.1866 19.9796 35.4004L20.0106 39.5247C20.0106 39.708 20.1038 39.8913 20.2592 40.0135L25.7244 43.7711C26.1283 44.046 26.6875 43.7406 26.6564 43.2518L26.3147 35.9809C26.3147 35.7976 26.2215 35.6143 26.0662 35.5226L15.322 28.2822C15.1667 28.16 15.0735 27.9767 15.0735 27.7934V24.2191C15.0735 24.0969 15.1045 23.9441 15.1977 23.8525L19.0786 19.0256C19.234 18.8118 19.5136 18.7507 19.7621 18.8423L33.7658 23.9441C33.8901 24.0052 34.0454 24.0052 34.1697 23.9441L48.1758 18.8423C48.4243 18.7507 48.7015 18.8423 48.8568 19.0256L52.7401 23.8525C52.8333 23.9441 52.8644 24.0969 52.8644 24.2191V27.7934C52.8644 27.9767 52.7712 28.16 52.6158 28.2822L41.8717 35.5226C41.7785 35.6448 41.6853 35.8281 41.6853 36.0114L41.3436 43.2823C41.3125 43.7711 41.8717 44.0766 42.2756 43.8017L47.7408 40.044C47.8962 39.9218 47.9894 39.7691 47.9894 39.5552L48.0204 35.431C48.0204 35.2477 48.1136 35.0644 48.269 34.9422L51.9945 32.4676C52.3984 32.1926 52.9265 32.4676 52.9265 32.9564V48.9646Z" fill="#161819"></path></svg>',
);
function _c(e, t) {
  let r = $(t, "className", 8, "");
  var n = pc();
  O(() => pe(n, r())), T(e, n);
}
var hc = ve(
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 137 184"><path d="M70.9347 0.361005C69.5501 0.110567 68.1312 0.110516 66.7459 0.356947C43.8914 4.42258 23.1171 13.7454 5.23385 26.8586C2.04247 29.1987 0.259521 32.9677 0.259521 36.9252V123.677C0.259521 127.489 1.9326 131.108 4.83607 133.578L60.3026 180.764C65.1793 184.912 72.3506 184.893 77.2043 180.717L132.002 133.574C134.873 131.105 136.524 127.508 136.524 123.721L136.537 36.9859C136.537 32.97 134.7 29.1542 131.44 26.8097C113.83 14.147 93.217 4.39139 70.9347 0.361005ZM82.383 145.014C82.383 145.503 82.0755 145.992 81.5757 146.114L68.7735 150.329C68.5236 150.39 68.2737 150.39 68.0238 150.329L55.2216 146.114C54.7218 145.93 54.4094 145.503 54.4094 145.014V140.738C54.4094 140.31 54.6593 139.883 55.0342 139.699L67.8364 133.101C68.2112 132.918 68.586 132.918 68.9609 133.101L81.7631 139.699C82.1379 139.883 82.383 140.31 82.383 140.738V145.014ZM106.459 97.9135C106.459 98.3412 106.209 98.7688 105.772 98.9521L96.6558 103.534C96.031 103.839 95.8436 104.572 96.156 105.122L105.022 121.189C105.272 121.678 105.21 122.227 104.835 122.594L89.7212 137.133C89.2839 137.561 88.6592 137.561 88.1594 137.256L70.9264 125.099C70.3641 124.671 70.2392 123.877 70.739 123.327L84.4158 108.421C85.228 107.505 84.2909 106.161 83.1664 106.527L68.7398 111.109C68.4899 111.17 68.24 111.17 67.9901 111.109L53.6309 106.527C52.4439 106.161 51.5693 107.566 52.3814 108.421L66.0535 123.327C66.5533 123.877 66.4283 124.671 65.8661 125.099L48.633 137.256C48.1333 137.561 47.5085 137.561 47.0712 137.133L31.9623 122.533C31.5875 122.166 31.525 121.617 31.7749 121.128L40.6413 105.061C40.9536 104.45 40.7037 103.778 40.1415 103.473L31.0252 98.891C30.6504 98.7077 30.338 98.2801 30.338 97.8524V65.8412C30.338 64.9248 31.4 64.3139 32.2122 64.8637L39.7042 69.812C40.0165 70.0564 40.204 70.3618 40.204 70.7895L40.2664 79.0366C40.2664 79.4032 40.4539 79.7697 40.7662 80.0141L51.7567 87.5282C52.5689 88.078 53.6934 87.4671 53.6309 86.4897L52.9437 71.9502C52.9437 71.5836 52.7563 71.2171 52.4439 71.0338L30.8378 56.5554C30.5254 56.3111 30.338 55.9445 30.338 55.578V48.4304C30.338 48.1861 30.4005 47.8806 30.5879 47.6974L38.3922 38.0451C38.7046 37.6175 39.2669 37.4953 39.7667 37.6786L67.9277 47.8806C68.1776 48.0028 68.4899 48.0028 68.7398 47.8806L96.9057 37.6786C97.4054 37.4953 97.9629 37.6786 98.2753 38.0451L106.084 47.6974C106.272 47.8806 106.334 48.1861 106.334 48.4304V55.578C106.334 55.9445 106.147 56.3111 105.835 56.5554L85.1128 70.4412C84.5271 70.8336 83.8535 71.3063 83.8535 72.0113L83.1664 86.5507C83.1039 87.5282 84.2284 88.1391 85.0405 87.5893L96.031 80.0752C96.3434 79.8308 96.5308 79.5254 96.5308 79.0977L96.5933 70.8506C96.5933 70.484 96.7807 70.1175 97.0931 69.8731L104.585 64.9248C105.397 64.375 106.459 64.9248 106.459 65.9023V97.9135Z" fill="white"></path></svg>',
);
function mc(e, t) {
  let r = $(t, "className", 8, "");
  var n = hc();
  O(() => pe(n, r())), T(e, n);
}
var gc = ve(
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 227 306"><path d="M106.223 0V206.887C106.223 216.182 104.944 225.179 102.549 233.715C96.6832 254.663 84.1048 272.802 67.2759 285.667C60.1308 291.143 52.2165 295.656 43.7155 299.033C32.4064 303.527 16.752 306 3.84661 306C2.55799 306 1.279 305.971 0 305.923V243.251C1.26938 243.385 2.54838 243.453 3.84661 243.453C13.4439 243.453 25.4922 239.758 32.0025 233.715C39.2053 227.037 43.7155 217.491 43.7155 206.887V0H106.223Z" fill="white"></path><path d="M226.604 117.692V206.802C226.604 248.667 200.67 284.465 163.984 299.027C152.655 303.524 140.304 306 127.375 306C120.102 306 113.011 305.22 106.181 303.727C97.9148 301.935 90.0343 299.104 82.6836 295.386C91.8647 287.547 99.803 278.301 106.181 267.977C107.539 265.791 108.83 263.547 110.034 261.255C113.252 255.197 115.94 248.821 118.04 242.195C121.017 242.985 124.148 243.399 127.375 243.399C147.597 243.399 163.984 227.017 163.984 206.802V174.057H123.522V117.769C124.803 117.721 126.084 117.692 127.375 117.692H226.604Z" fill="white"></path><path opacity="0.5" d="M127.408 107.604C126.169 107.604 124.939 107.731 123.709 107.941V107.604H127.408Z" fill="white"></path></svg>',
);
function Cc(e, t) {
  let r = $(t, "className", 8, "");
  var n = gc();
  O(() => pe(n, r())), T(e, n);
}
var bc = ve(
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 76 48"><path d="M59.2535 23.9917C59.3641 29.3513 53.1537 32.8988 48.6193 30.1084L48.6023 30.0914L47.1475 28.9089L46.9178 28.7303L46.9008 28.7132C43.4298 25.8888 35.0501 19.0659 31.5026 16.1734L31.477 16.1479L30.0988 15.0249V15.0079C30.0988 15.0079 30.0053 14.9399 29.9542 14.9058L29.9287 14.8888C18.4183 7.66611 6.65264 22.8262 16.6062 32.1842C17.1932 32.5841 34.0122 44.069 35.2373 44.9027C18.5289 54.2352 -2.38214 40.0875 0.2211 21.0056C1.87152 5.72643 18.8181 -4.25267 33.17 2.06828H33.187C37.6704 5.20749 44.8506 10.2353 49.402 13.4086L56.0887 18.0791C58.0029 19.3552 59.2705 21.5075 59.2705 23.9917H59.2535Z" fill="black"></path><path d="M75.9959 23.9917C76.3021 40.0876 59.4066 51.9979 44.3741 46.5021L42.562 45.2601C35.2968 40.3003 28.3888 35.4936 21.1151 30.5339L21.098 30.5169H21.081L18.7755 28.9345C13.0331 22.8262 20.4855 13.6468 27.6572 18.0281L27.6742 18.0451L28.8737 19.0234L28.8993 19.049L34.7863 23.8301V23.8471C36.4112 25.1828 44.9611 32.1162 46.3989 33.2988C53.8598 38.0544 63.941 31.9716 63.0732 22.9964V22.9794C62.7755 19.8657 61.1846 17.1178 58.8281 15.2887L58.2836 14.9144L41.1158 2.89355C56.5566 -5.48617 76.2511 6.31349 75.9959 24.0002V23.9917Z" fill="black"></path></svg>',
);
function wc(e, t) {
  let r = $(t, "className", 8, "");
  var n = bc();
  O(() => pe(n, r())), T(e, n);
}
var yc = A('<img src="/project-images/golfpad-token.png" alt="golfpad">');
function xc(e, t) {
  let r = $(t, "className", 8, "");
  var n = yc();
  O(() => Se(n, `${r()}`)), T(e, n);
}
var Tc = ve(
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 76 76"><g clip-path="url(#clip0_309_2026)"><path d="M29.78 61.4948C27.2577 62.0247 25.3375 62.2969 24.0965 62.4228C23.3446 62.4991 22.7418 63.1756 22.7594 63.9375C22.7919 65.3439 22.7751 67.034 22.8921 67.6239C23.7419 71.9083 25.7362 73.3851 26.226 73.6891C26.2979 73.7342 26.3725 73.7625 26.4544 73.7838C27.3752 74.0189 33.5533 75.5324 40.9818 75.7798C41.3312 75.7914 41.6698 75.6548 41.917 75.4056L47.8687 69.4035C48.4564 68.8109 48.336 67.8191 47.626 67.3837C46.1403 66.4723 44.2164 65.2757 43.1506 64.5595C41.9043 63.7215 39.5834 61.3325 38.1338 59.7627C37.743 59.3395 37.1229 59.2217 36.593 59.4426C35.2324 60.0096 32.8196 60.8562 29.78 61.4948Z" fill="white"></path><path d="M75.1588 49.4409C76.1028 46.8223 76.1015 43.5393 75.8748 41.1856C75.7809 40.2081 74.6575 39.8088 73.9192 40.4497L68.9205 44.7911C68.5277 45.1321 68.3348 45.6908 68.3514 46.2132C68.3719 46.8547 68.3616 47.8852 68.2709 49.4409C68.1292 51.8763 66.316 56.7918 65.0975 59.7571C64.8375 60.39 65.1 61.123 65.715 61.4142C66.9515 61.9995 68.4325 62.639 68.6759 62.5162C69.0814 62.3119 73.5379 53.9355 75.1588 49.4409Z" fill="white"></path><path d="M0.308158 31.6806L6.36348 23.9235C6.91297 23.2196 7.98942 23.2822 8.45494 24.0452L13.7181 32.6703C13.8855 32.9446 13.9449 33.2723 13.8846 33.5887L11.1527 47.9146C11.031 48.553 10.4567 48.9999 9.81349 48.9567L2.62564 48.4734C2.13529 48.4404 1.70523 48.1272 1.55447 47.6554C1.4321 47.2725 1.30246 46.8147 1.21555 46.3765C1.05936 45.5889 0.388868 37.148 0.0382191 32.5746C0.013524 32.2525 0.110011 31.9345 0.308158 31.6806Z" fill="white"></path><path d="M27.5514 1.02146C24.0754 1.63113 18.9197 4.65709 16.3232 6.38802C15.9943 6.60732 15.8015 6.97959 15.8015 7.37724C15.8015 8.23971 16.6749 8.8289 17.4731 8.5193C19.0631 7.90254 21.2713 7.10512 23.2972 6.53763C25.9261 5.80114 28.8622 5.45184 30.3558 5.34016C30.6393 5.31896 30.9094 5.20986 31.1243 5.02212L33.7261 2.74806C33.7962 2.68679 33.8727 2.63339 33.9543 2.58884L36.3229 1.29496C36.915 0.971512 36.6739 0.0883905 36.0017 0.129305C33.4852 0.282476 30.1481 0.56605 27.5514 1.02146Z" fill="white"></path><path d="M65.2323 11.8494C62.567 8.91729 59.5849 6.63961 57.5719 5.30658C57.2698 5.10649 56.9913 5.4556 57.2387 5.72137C58.0981 6.64464 59.0533 7.66117 59.5599 8.17198C60.2929 8.91124 61.5232 11.6007 62.2012 13.2163C62.3281 13.5188 62.5609 13.7631 62.8559 13.9022C63.7223 14.3104 65.1013 14.9843 66.0427 15.5268C66.8627 15.9995 68.9326 18.2805 70.6289 20.2543C70.8754 20.5416 71.2675 20.2756 71.0772 19.9475C69.7731 17.7003 67.7275 14.5948 65.2323 11.8494Z" fill="white"></path><path d="M57.2249 32.0975L39.2291 39.8311C38.8484 39.9946 38.6696 40.4426 38.8318 40.8265L39.4218 42.2225C39.584 42.6064 40.0282 42.7867 40.4089 42.6231L58.4047 34.8896C58.7854 34.726 58.9641 34.278 58.8018 33.8941L58.212 32.4981C58.0498 32.1142 57.6056 31.9339 57.2249 32.0975ZM54.0946 16.9475C52.9482 17.4402 52.4145 18.7778 52.903 19.9339C53.0339 20.2436 53.2248 20.5018 53.4583 20.7159L51.1264 23.9552C50.6298 24.6428 49.6731 24.7859 49.0005 24.2708L42.8462 19.5649C43.1469 18.982 43.2063 18.276 42.9298 17.6217C42.4413 16.4656 41.1149 15.9273 39.9685 16.42C38.8222 16.9126 38.2884 18.2502 38.7769 19.4063C39.0535 20.0607 39.5996 20.5064 40.2247 20.6914L39.3278 28.4276C39.2303 29.2736 38.461 29.8722 37.6295 29.7553L33.7018 29.206C33.708 28.8941 33.6581 28.5702 33.5272 28.2604C33.0387 27.1043 31.7123 26.5661 30.5659 27.0587C29.4196 27.5514 28.8815 28.8909 29.37 30.047C29.8585 31.2031 31.1849 31.7413 32.3313 31.2487C32.4438 31.2003 32.5488 31.1345 32.6496 31.0706L39.3313 38.1376L55.9428 30.999L55.5164 21.2438C55.6319 21.2148 55.7518 21.1839 55.8643 21.1356C57.0106 20.6429 57.5444 19.3053 57.0559 18.1492C56.5674 16.9931 55.2409 16.4549 54.0946 16.9475Z" fill="white"></path></g><defs><clipPath id="clip0_309_2026"><rect width="76" height="76" fill="white"></rect></clipPath></defs></svg>',
);
function Nc(e, t) {
  let r = $(t, "className", 8, "");
  var n = Tc();
  O(() => pe(n, r())), T(e, n);
}
var Sc = ve(
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 54 76"><path d="M53.2698 60.8778V73.4416C50.0032 71.4885 46.0742 70.3578 41.8482 70.3578C38.3988 70.3578 35.1551 71.1116 32.2997 72.4479C30.3237 73.3731 28.5305 74.5724 27 76.0001C25.4695 74.5724 23.6763 73.3731 21.7004 72.4479C18.845 71.1116 15.6012 70.3578 12.1519 70.3578C7.92587 70.3578 3.99682 71.4885 0.730225 73.4416V60.8778C2.78612 59.6443 5.0933 58.7419 7.58322 58.2508C9.05661 57.9539 10.5871 57.7939 12.1519 57.7939C13.3169 57.7939 14.4705 57.8853 15.5784 58.0452C20.0328 58.7077 24.0076 60.6494 27 63.4362C29.9925 60.6494 33.9672 58.7077 38.4217 58.0452C39.5296 57.8853 40.6832 57.7939 41.8482 57.7939C43.4129 57.7939 44.9434 57.9539 46.4168 58.2508C48.9068 58.7419 51.2139 59.6443 53.2698 60.8778Z" fill="white"></path><path d="M27 0C12.4945 0 0.730225 11.7643 0.730225 26.2698C0.730225 40.7753 12.4945 52.5396 27 52.5396C41.5055 52.5396 53.2698 40.7753 53.2698 26.2698C53.2698 11.7643 41.5055 0 27 0ZM27 39.9758C19.4275 39.9758 13.294 33.8424 13.294 26.2698C13.294 18.6972 19.4275 12.5638 27 12.5638C34.5726 12.5638 40.706 18.6972 40.706 26.2698C40.706 33.8424 34.5726 39.9758 27 39.9758Z" fill="#101111"></path></svg>',
);
function Ec(e, t) {
  let r = $(t, "className", 8, "");
  var n = Sc();
  O(() => pe(n, r())), T(e, n);
}
var Ac = A('<img src="/project-images/openbeats-token.png" alt="openbeats">');
function kc(e, t) {
  let r = $(t, "className", 8, "");
  var n = Ac();
  O(() => Se(n, r())), T(e, n);
}
var Oc = ve(
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 76 58"><g clip-path="url(#clip0_309_2044)"><path fill-rule="evenodd" clip-rule="evenodd" d="M54.34 41.1973C53.7444 42.453 53.0552 43.6689 52.2756 44.8336C49.1393 49.5207 44.6815 53.1735 39.466 55.3306C34.2503 57.4876 28.5113 58.0521 22.9745 56.9523C17.4377 55.8528 12.3519 53.1385 8.36007 49.1526C4.36825 45.1667 1.6498 40.0886 0.548445 34.5601C-0.552871 29.0316 0.0123737 23.3012 2.17269 18.0935C4.33307 12.8858 7.99149 8.43474 12.6854 5.30311C17.3792 2.17151 22.8977 0.5 28.543 0.5V12.5321C19.7455 12.8922 12.724 20.1273 12.724 29C12.724 38.1028 20.1143 45.4819 29.2308 45.4819C34.9325 45.4819 39.9591 42.5955 42.9245 38.2062L45.8751 38.9791C42.5349 37.2787 40.0276 34.1514 38.8271 30.3735H32.4977C31.833 30.3735 31.2941 29.8354 31.2941 29.1717C31.2941 28.5079 31.833 27.9699 32.4977 27.9699H71.7564C72.4211 27.9699 72.96 28.5079 72.96 29.1717C72.96 29.8354 72.4211 30.3735 71.7564 30.3735H65.1471C62.7426 36.5357 57.1169 40.6005 51.1057 40.3499L54.34 41.1973ZM53.6584 30.3735H44.351C45.5567 31.8618 47.197 32.7771 49.0045 32.7771C50.812 32.7771 52.4524 31.8618 53.6584 30.3735Z" fill="white"></path></g><defs><clipPath id="clip0_309_2044"><rect width="76" height="57" fill="white" transform="translate(0 0.5)"></rect></clipPath></defs></svg>',
);
function Lc(e, t) {
  let r = $(t, "className", 8, "");
  var n = Oc();
  O(() => pe(n, r())), T(e, n);
}
var Pc = A('<img src="/project-images/opencare-token.png" alt="opencare">');
function Rc(e, t) {
  let r = $(t, "className", 8, "");
  var n = Pc();
  O(() => Se(n, r())), T(e, n);
}
var $c = A(
  '<div class="widget svelte-1tvdi4g"><div class="widget-spinner svelte-1tvdi4g"></div></div>',
);
function xs(e) {
  var t = $c();
  T(e, t);
}
var Fc = A(
    '<div class="hidden w-full lg:flex"><div class="full-screen-flex-row"><div class="flex flex-col w-1/2 min-h-screen bg-BrandGray"><div class="mx-4 mt-2"><!></div> <div class="px-4 mt-8"><!></div></div> <div class="relative flex items-center justify-center w-1/2"><div class="absolute inset-0 z-0 bg-center bg-no-repeat"></div> <div class="relative z-10 flex items-center justify-center w-full h-full overflow-hidden"><div class="w-[95%] rounded-2xl border-8 border-BrandGray shadow-lg transform translate-x-[20%]"><img alt="Main feature" class="object-contain max-w-full max-h-full rounded"></div></div></div></div></div> <div class="lg:hidden lg:mb-0"><main class="flex flex-col items-center"><div class="relative z-0"><div class="mx-auto w-[50%] xs:w-[40%] lg:w-[60%] rounded-2xl border-4 border-BrandGray overflow-hidden translate-y-[10%] shadow-lg transform mt-2"><img alt="Main feature" class="object-top rounded"></div></div> <div class="relative z-20 bg-BrandGray -mt-8 w-[101%] px-[1%] -mb-[1px]"><!></div></main></div>',
    1,
  ),
  Mc = A("<!> <!>", 1);
function Vc(e, t) {
  Q(t, !1);
  const r = je(),
    n = () => Ve(s, "$selectedProjectId", r),
    a = new rn();
  let o = V([]),
    s = ct(0),
    c = V(null),
    i = V(null),
    l = V(!0),
    u = V(!0),
    v = $(t, "isMenuOpen", 12);
  _e(async () => {
    try {
      await Rr.syncStores(), await d();
    } catch {
      console.error("Error loading homepage projects");
    } finally {
      E(l, !1), E(u, !1);
    }
  });
  async function d() {
    try {
      const C = await a.getProjects();
      if (!C) return;
      E(
        o,
        C?.projects
          .sort((x, S) => x.id - S.id)
          .filter((x) => x.id !== 1)
          .map((x) => {
            const S = x.socialLinks || [],
              y = S.find(([k]) => k === "X");
            return {
              ...x,
              websiteURL: x.websiteURL.startsWith("http")
                ? x.websiteURL
                : `https://${x.websiteURL}`,
              component: _(x.name),
              buttonText: "Visit Site",
              backgroundImage: `/project-images/${x.id}-background.png`,
              screenshot: `/project-images/${x.id}-screenshot.jpg`,
              twitter: y && y[1] ? y[1] : void 0,
              github: x.githubLink || void 0,
              backgroundColor: x.mainColour,
              status: Dl(x.status),
              selected: !1,
              socialLinks: S,
            };
          }),
      ),
        at.setProjects(C.projects.sort((x, S) => x.id - S.id));
      const b = p(o).find((x) => x.id === 2) || p(o)[0];
      b && f(b);
    } catch (C) {
      console.error("Failed to load projects:", C);
    }
  }
  function f(C) {
    E(u, !0),
      C &&
        (E(c, C),
        E(i, g(C)),
        E(
          o,
          p(o).map((b) => ({ ...b, selected: b.id === C.id })),
        ),
        E(u, !1));
  }
  function _(C) {
    return (
      {
        "Waterway Labs": Ya,
        ICFC: dc,
        FootballGod: vc,
        OpenFPL: _c,
        OpenWSL: mc,
        "Jeff Bets": Cc,
        ICPFA: wc,
        ICGC: xc,
        "Transfer Kings": Nc,
        OpenBook: Ec,
        OpenBeats: kc,
        OpenChef: Lc,
        OpenCare: Rc,
      }[C] || Ya
    );
  }
  function g(C) {
    return {
      id: C.id,
      title: C.name,
      description: C.description,
      summary: C.summary,
      buttonText: "Visit Site",
      buttonLink: C.websiteURL,
      status: C.status,
      websiteURL: C.websiteURL,
      twitter: C.twitter,
      githubLink: C.githubLink,
      mainColour: C.mainColour,
      backgroundColor: C.mainColour,
      backgroundImage: `/project-images/${C.id}-background.png`,
      screenshot: `/project-images/${C.id}-screenshot.jpg`,
    };
  }
  Ct(
    () => (n(), p(c), p(o)),
    () => {
      n() > 0 && (E(c, p(o).find((C) => C.id == n()) ?? p(c)), p(c) && f(p(c)));
    },
  ),
    ar(),
    ae(),
    Ze(e, {
      get isMenuOpen() {
        return v();
      },
      set isMenuOpen(C) {
        v(C);
      },
      children: (C, b) => {
        var x = Ce(),
          S = X(x);
        W(
          S,
          () => p(l),
          (y) => {
            $t(y);
          },
          (y) => {
            var N = Mc(),
              k = X(N);
            W(
              k,
              () => p(u),
              (P) => {
                xs(P);
              },
              (P) => {
                var B = Ce(),
                  q = X(B);
                W(
                  q,
                  () => p(i),
                  (I) => {
                    var K = Fc(),
                      j = X(K),
                      J = m(j),
                      ne = m(J),
                      ee = m(ne),
                      te = m(ee);
                    da(te, {
                      halfWidth: !0,
                      get isMenuOpen() {
                        return v();
                      },
                      set isMenuOpen(dt) {
                        v(dt);
                      },
                      $$legacy: !0,
                    }),
                      h(ee);
                    var re = w(ee, 2),
                      he = m(re),
                      qe = Ee(() => p(i).twitter ?? "");
                    Ka(he, {
                      get title() {
                        return p(i).title;
                      },
                      get status() {
                        return p(i).status;
                      },
                      get summary() {
                        return p(i).summary;
                      },
                      get description() {
                        return p(i).description;
                      },
                      get backgroundColor() {
                        return p(i).backgroundColor;
                      },
                      get websiteURL() {
                        return p(i).websiteURL;
                      },
                      get github() {
                        return p(i).githubLink;
                      },
                      get twitter() {
                        return p(qe);
                      },
                    }),
                      h(re),
                      h(ne);
                    var ce = w(ne, 2),
                      ke = m(ce),
                      me = w(ke, 2),
                      we = m(me),
                      wt = m(we);
                    h(we), h(me), h(ce), h(J), h(j);
                    var De = w(j, 2),
                      Ue = m(De),
                      ye = m(Ue),
                      et = m(ye),
                      ut = m(et);
                    h(et), h(ye);
                    var H = w(ye, 2),
                      xe = m(H),
                      Be = Ee(() => p(i).twitter ?? "");
                    Ka(xe, {
                      get title() {
                        return p(i).title;
                      },
                      get status() {
                        return p(i).status;
                      },
                      get summary() {
                        return p(i).summary;
                      },
                      get description() {
                        return p(i).description;
                      },
                      get backgroundColor() {
                        return p(i).backgroundColor;
                      },
                      get websiteURL() {
                        return p(i).websiteURL;
                      },
                      get github() {
                        return p(i).githubLink;
                      },
                      get twitter() {
                        return p(Be);
                      },
                    }),
                      h(H),
                      h(Ue),
                      h(De),
                      O(() => {
                        oe(
                          ce,
                          "style",
                          `background-color: ${p(i).backgroundColor}`,
                        ),
                          oe(
                            ke,
                            "style",
                            `background-image: url('${p(i).backgroundImage}'); background-size: cover;`,
                          ),
                          oe(wt, "src", p(i).screenshot),
                          oe(
                            ye,
                            "style",
                            `background-color: ${p(i).backgroundColor}`,
                          ),
                          oe(ut, "src", p(i).screenshot);
                      }),
                      T(I, K);
                  },
                ),
                  T(P, B);
              },
            );
            var L = w(k, 2);
            lc(L, {
              get projects() {
                return p(o);
              },
              selectedProjectId: s,
            }),
              T(y, N);
          },
        ),
          T(C, x);
      },
      $$slots: { default: !0 },
      $$legacy: !0,
    }),
    D();
}
const jc = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: Vc },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var qc =
  A(`<div><div class="responsive-row-col"><div class="text-left lg:w-1/2"><span class="status">OUR MISSION</span> <h1 class="mt-6 mb-4 text-4xl leading-tight lg:mt-2 lg:mb-0 lg:text-5xl xl:text-6xl">A WAVE OF DECENTRALISED SERVICES</h1></div> <div class="lg:w-1/2 lg:pl-12"><p class="main-paragraph">At Waterway Labs, we aim to build a future of decentralised web services owned by their users.
          Our mission is to create secure, user-friendly and innovative blockchain products that empowers everyone to earn with our range of utility tokens. 
          We believe in a future run using a decentralised economy where technology is transparent, community owned and built to improve the lives of everyday people.</p></div></div> <div class="horizontal-divider"></div> <div class="px-4 mx-auto lg:mb-10 lg:w-4/5"><img src="about.jpg" alt="Waterway Labs Mission" class="block object-contain w-full rounded-lg my-8"></div> <div class="horizontal-divider"></div> <div><div class="responsive-row-col"><div class="mb-6 text-left lg:w-1/2 lg:mb-0"><h2 class="text-3xl">VISION</h2></div> <div class="lg:w-1/2 lg:pl-12"><p class="exLight">To become a global leader in decentralised technology, enabling a more transparent, secure, and open digital ecosystem. We envision a world where individuals have complete control over their digital assets, identities, data and privacy.</p></div></div> <div class="horizontal-divider"></div> <div class="responsive-row-col"><div class="mb-6 text-left lg:w-1/2 lg:mb-0"><h2 class="text-3xl">VALUES</h2></div> <div class="lg:w-1/2 lg:pl-12"><p class=" exLight">We believe in building open Web3 services that share equity with the users who make those services a success. We aim to contribute to the development of the Web3 ecosystem through the discussion and implementation of standards and techniques that lead to these equitable outcomes for society.</p></div></div> <div class="horizontal-divider"></div> <div class="responsive-row-col"><div class="mb-6 text-left lg:w-1/2 lg:mb-0"><h2 class="text-3xl">OUR JOURNEY</h2></div> <div class="lg:w-1/2 lg:pl-12"><p class="exLight">Founded with a vision to fight against the increased centralisation of big tech, Waterway Labs started with a small team passionate about decentralisation. 
            We aim to become a trusted name in blockchain innovation, known for contributions to fairly decentralising services among users.</p></div></div> <div class="horizontal-divider"></div> <div class="responsive-row-col"><div class="mb-6 text-left lg:w-1/2 lg:mb-0"><h2 class="text-3xl">FUTURE GOALS</h2></div> <div class="lg:w-1/2 lg:pl-12"><p class="exLight">We aim to decentralise services in key areas to introduce a wide range of the population to Web3. 
            Our aim is to automate the development of this software by developing our own internal narrow AI trained to build decentralised solutions from our codebase.</p></div></div> <div class="horizontal-divider"></div></div></div>`);
function Uc(e, t) {
  let r = $(t, "isMenuOpen", 12);
  Ze(e, {
    get isMenuOpen() {
      return r();
    },
    set isMenuOpen(n) {
      r(n);
    },
    children: (n, a) => {
      var o = qc();
      T(n, o);
    },
    $$slots: { default: !0 },
    $$legacy: !0,
  });
}
const Bc = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: Uc },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var Hc = A(
    '<div class="responsive-row-col"><div class="text-left"><span class="status">ACCOUNT</span> <h1 class="mt-6 mb-4 text-4xl leading-tight lg:mt-2 lg:mb-0 lg:text-5xl xl:text-6xl"> </h1></div></div>',
  ),
  Wc = A('<div class="mx-auto"><!></div>');
function zc(e, t) {
  Q(t, !1);
  const r = je(),
    n = () => Ve(se, "$authStore", r);
  let a = V(""),
    o = V(!0);
  _e(async () => {
    try {
      await se.sync(),
        E(a, n().identity?.getPrincipal().toText() ?? ""),
        E(o, !1);
    } catch (s) {
      console.error("Error fetching account information:", s), E(o, !1);
    }
  }),
    ae(),
    Ze(e, {
      children: (s, c) => {
        var i = Wc(),
          l = m(i);
        W(
          l,
          () => p(o),
          (u) => {
            $t(u);
          },
          (u) => {
            var v = Hc(),
              d = m(v),
              f = w(m(d), 2),
              _ = m(f);
            h(f),
              h(d),
              h(v),
              O(() => R(_, `YOUR PRINCIPAL ID: ${p(a) ?? ""}`)),
              T(u, v);
          },
        ),
          h(i),
          T(s, i);
      },
      $$slots: { default: !0 },
    }),
    D();
}
const Ic = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: zc },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var Zc = A("<p>Admin</p>");
function Gc(e) {
  var t = Zc();
  T(e, t);
}
const Kc = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: Gc },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var An = {
  BACKEND_CANISTER_ID: "rbqtt-7yaaa-aaaal-qcndq-cai",
  FRONTEND_CANISTER_ID: "qm6x5-qqaaa-aaaal-qcnea-cai",
  DFX_NETWORK: "ic",
};
function Yc() {
  async function e() {
    try {
      return await (
        await Ae.createIdentityActor(se, An.BACKEND_CANISTER_ID ?? "")
      ).getOpenFPLFantasyTeamSnapshots();
    } catch (n) {
      throw (console.error("Error getting fantasy team snapshots:", n), n);
    }
  }
  async function t() {
    try {
      return await (
        await Ae.createIdentityActor(se, An.BACKEND_CANISTER_ID ?? "")
      ).getLivePlayers();
    } catch (n) {
      throw (console.error("Error getting live players:", n), n);
    }
  }
  async function r() {
    try {
      return await (
        await Ae.createIdentityActor(se, An.BACKEND_CANISTER_ID ?? "")
      ).getSeasonFixtures();
    } catch (n) {
      throw (console.error("Error getting season fixtures:", n), n);
    }
  }
  return {
    getOpenFPLFantasyTeamSnapshots: e,
    getLivePlayers: t,
    getSeasonFixtures: r,
  };
}
const kn = Yc();
var Xc = A(
    '<div class="responsive-row-col"><div class="text-left"><span class="status">AI Data Download</span> <br> <button>Download Historical Manager Snapshot Data</button> <br> <button>Download Live Football Players</button> <br> <button>Download Historical Football Fixtures</button></div></div>',
  ),
  Jc = A('<div class="mx-auto"><!></div>');
function Qc(e, t) {
  Q(t, !1);
  let r = V(!0);
  _e(async () => {
    try {
      await se.sync(), E(r, !1);
    } catch (i) {
      console.error("Error fetching account information:", i), E(r, !1);
    }
  });
  async function n(i) {
    try {
      const l = await i(),
        u = a(l),
        v = new Blob([u], { type: "text/csv;charset=utf-8;" }),
        d = URL.createObjectURL(v),
        f = document.createElement("a");
      (f.href = d),
        f.setAttribute("download", "data.csv"),
        document.body.appendChild(f),
        f.click(),
        document.body.removeChild(f),
        URL.revokeObjectURL(d);
    } catch (l) {
      console.error("Error downloading CSV:", l);
    }
  }
  function a(i) {
    if (!i || i.length === 0) return "";
    const l = Object.keys(i[0]),
      u = i.map((v) =>
        l
          .map((d) => {
            const f = v[d];
            return f && typeof f == "object"
              ? `"${JSON.stringify(f).replace(/"/g, '""')}"`
              : (f ?? "").toString().replace(/"/g, '""');
          })
          .join(","),
      );
    return [l.join(","), ...u].join(`
`);
  }
  async function o() {
    return await kn.getOpenFPLFantasyTeamSnapshots();
  }
  async function s() {
    return await kn.getLivePlayers();
  }
  async function c() {
    return await kn.getSeasonFixtures();
  }
  ae(),
    Ze(e, {
      children: (i, l) => {
        var u = Jc(),
          v = m(u);
        W(
          v,
          () => p(r),
          (d) => {
            $t(d);
          },
          (d) => {
            var f = Xc(),
              _ = m(f),
              g = w(m(_), 4),
              C = w(g, 4),
              b = w(C, 4);
            h(_),
              h(f),
              G("click", g, () => n(o)),
              G("click", C, () => n(s)),
              G("click", b, () => n(c)),
              T(d, f);
          },
        ),
          h(u),
          T(i, u);
      },
      $$slots: { default: !0 },
    }),
    D();
}
const Dc = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: Qc },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var e2 = A(
  '<div class="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center" aria-hidden="true"><div class="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full mx-auto relative text-black" role="dialog" aria-modal="true"><button class="absolute top-4 right-4 text-gray-500 hover:text-gray-700" aria-label="Close modal">×</button> <!></div></div>',
);
function t2(e, t) {
  Q(t, !1);
  let r = $(t, "showModal", 8),
    n = $(t, "onClose", 8);
  const a = (i) => {
    i.key === "Escape" && r() && n()();
  };
  typeof window < "u" && window.addEventListener("keydown", a),
    Qi(() => {
      typeof window < "u" && window.removeEventListener("keydown", a);
    });
  const o = (i) => {
    i.target === i.currentTarget && n()();
  };
  ae();
  var s = Ce(),
    c = X(s);
  W(c, r, (i) => {
    var l = e2(),
      u = m(l),
      v = m(u),
      d = w(v, 2);
    wr(d, t, "default", {}),
      h(u),
      h(l),
      G("click", v, function (...f) {
        n()?.apply(this, f);
      }),
      G("click", l, o),
      T(i, l);
  }),
    T(e, s),
    D();
}
var r2 = A("<option> </option>"),
  n2 = A(
    '<p class="mt-2"> </p> <p class="text-xs"> </p> <p class="text-xs"> </p> <p class="text-xs"> </p> <button class="btn mt-2">Add Cycles</button>',
    1,
  ),
  a2 = A(
    '<div class="responsive-row-col"><div class="text-left w-full"><span class="status">APPS</span> <h1 class="mt-6 mb-4 text-4xl leading-tight lg:mt-2 lg:mb-0 lg:text-5xl xl:text-6xl">APPLICATION SUMMARY INFORMATION</h1></div></div> <div class="horizontal-divider"></div> <div class="flex flex-col mx-4"><p class="semi-bold">Waterway Labs Backend Canister</p> <p class="text-xs"> </p> <p class="mt-2 text-xs"> </p> <p class="text-xs"> </p> <p class="mt-2">Topup with 100T cycles command:</p> <p class="text-xxs"> </p></div> <div class="horizontal-divider"></div> <div class="flex flex-col mx-4"><p class="semi-bold">Waterway Labs Frontend Canister</p> <p class="text-xs"> </p> <p class="mt-2 text-xs"> </p> <p class="text-xs"> </p> <button class="btn mt-2">Add Cycles</button></div> <div class="horizontal-divider"></div> <div class="flex flex-col mx-4"><p>Project canisters:</p> <select class="p-2 brand-dropdown my-4 min-w-[100px]"><option>Select Project</option><!></select> <!></div> <div class="horizontal-divider"></div>',
    1,
  ),
  o2 = A(
    '<div class="flex flex-col space-y-4"><p> </p> <div class="flex flex-col"><label for="trillionCycles">Cycles (Trillions):</label> <input id="trillionCycles" type="number" class="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md fpl-dropdown"></div> <div class="flex flex-row"><button class="btn w-1/2 mx-1">Cancel</button> <button class="btn w-1/2 mx-1">Topup</button></div></div>',
  ),
  s2 = A('<div class="mx-auto"><!></div> <!>', 1);
function i2(e, t) {
  Q(t, !1);
  const r = je(),
    n = () => Ve(at, "$projectStore", r);
  let a = V(!0),
    o = V(!1),
    s = V([]),
    c = V(0),
    i = V(),
    l = V([]),
    u = V(""),
    v = V(!1),
    d = V(0);
  _e(async () => {
    try {
      await Rr.syncStores(),
        E(o, !0),
        E(s, await at.getProjectCanisterInfo(1)),
        E(o, !1);
    } catch (b) {
      console.error("Error :", b);
    } finally {
      E(a, !1);
    }
  });
  async function f(b) {
    b != "" && (E(u, b), E(v, !0));
  }
  async function _() {
    E(o, !0), E(l, await at.getProjectCanisterInfo(p(c))), E(o, !1);
  }
  async function g() {
    E(v, !1);
  }
  async function C() {
    try {
      E(a, !0),
        await at.topupCanister(p(u), BigInt(p(d) * 1e12)),
        E(s, await at.getProjectCanisterInfo(1)),
        await _(),
        g();
    } catch (b) {
      console.error("Error topping up canister", b);
    } finally {
      E(a, !1);
    }
  }
  Ct(
    () => p(c),
    () => {
      p(c) == 0 && E(l, []);
    },
  ),
    Ct(
      () => (p(c), p(i), n()),
      () => {
        p(c) > 0 &&
          (!p(i) || p(c) != p(i).id) &&
          (E(
            i,
            n().find((b) => b.id == p(c)),
          ),
          _());
      },
    ),
    ar(),
    ae(),
    Ze(e, {
      children: (b, x) => {
        var S = s2(),
          y = X(S),
          N = m(y);
        W(
          N,
          () => p(a),
          (L) => {
            $t(L);
          },
          (L) => {
            var P = a2(),
              B = w(X(P), 4),
              q = w(m(B), 2),
              I = m(q, !0);
            O(() =>
              R(I, p(s).find((H) => H.canisterName == "Backend")?.canisterId),
            ),
              h(q);
            var K = w(q, 2),
              j = m(K);
            O(() =>
              R(
                j,
                `Cycles: ${Sn(p(s).find((H) => H.canisterName == "Backend")?.cycles ?? 0n) ?? ""}`,
              ),
            ),
              h(K);
            var J = w(K, 2),
              ne = m(J);
            O(() =>
              R(
                ne,
                `Compute Allocation: ${p(s).find((H) => H.canisterName == "Backend")?.computeAllocation ?? ""}`,
              ),
            ),
              h(J);
            var ee = w(J, 4),
              te = m(ee);
            O(() =>
              R(
                te,
                `dfx canister --network ic deposit-cycles 100_000_000_000_000 ${p(s).find((H) => H.canisterName == "Backend")?.canisterId ?? ""}`,
              ),
            ),
              h(ee),
              h(B);
            var re = w(B, 4),
              he = w(m(re), 2),
              qe = m(he, !0);
            O(() =>
              R(qe, p(s).find((H) => H.canisterName == "Frontend")?.canisterId),
            ),
              h(he);
            var ce = w(he, 2),
              ke = m(ce);
            O(() =>
              R(
                ke,
                `Cycles: ${Sn(p(s).find((H) => H.canisterName == "Frontend")?.cycles ?? 0n) ?? ""}`,
              ),
            ),
              h(ce);
            var me = w(ce, 2),
              we = m(me);
            O(() =>
              R(
                we,
                `Compute Allocation: ${p(s).find((H) => H.canisterName == "Frontend")?.computeAllocation ?? ""}`,
              ),
            ),
              h(me);
            var wt = w(me, 2);
            h(re);
            var De = w(re, 4),
              Ue = w(m(De), 2);
            O(() => {
              p(c),
                xi(() => {
                  n();
                });
            });
            var ye = m(Ue);
            ye.value = (ye.__value = 0) == null ? "" : 0;
            var et = w(ye);
            kt(et, 1, n, Jt, (H, xe) => {
              var Be = r2(),
                dt = {},
                Ft = m(Be, !0);
              h(Be),
                O(() => {
                  dt !== (dt = p(xe).id) &&
                    (Be.value =
                      (Be.__value = p(xe).id) == null ? "" : p(xe).id),
                    R(Ft, p(xe).name);
                }),
                T(H, Be);
            }),
              h(Ue);
            var ut = w(Ue, 2);
            W(
              ut,
              () => p(o),
              (H) => {
                xs(H);
              },
              (H) => {
                var xe = Ce(),
                  Be = X(xe);
                W(
                  Be,
                  () => p(c) > 0,
                  (dt) => {
                    var Ft = Ce(),
                      fn = X(Ft);
                    kt(
                      fn,
                      1,
                      () => p(l),
                      Jt,
                      (vn, yt) => {
                        var $r = n2(),
                          lr = X($r),
                          pn = m(lr);
                        h(lr);
                        var cr = w(lr, 2),
                          _n = m(cr, !0);
                        h(cr);
                        var ur = w(cr, 2),
                          hn = m(ur);
                        O(() => R(hn, `Cycles: ${Sn(p(yt).cycles) ?? ""}`)),
                          h(ur);
                        var dr = w(ur, 2),
                          Ns = m(dr);
                        h(dr);
                        var Ss = w(dr, 2);
                        O(() => {
                          R(
                            pn,
                            `${p(i)?.name ?? ""} ${p(yt).canisterName ?? ""}`,
                          ),
                            R(_n, p(yt).canisterId),
                            R(
                              Ns,
                              `Compute Allocation: ${p(yt).computeAllocation ?? ""}`,
                            );
                        }),
                          G("click", Ss, () => f(p(yt).canisterId)),
                          T(vn, $r);
                      },
                    ),
                      T(dt, Ft);
                  },
                ),
                  T(H, xe);
              },
            ),
              h(De),
              Xn(2),
              G("click", wt, () =>
                f(
                  p(s).find((H) => H.canisterName == "Frontend")?.canisterId ??
                    "",
                ),
              ),
              Ii(
                Ue,
                () => p(c),
                (H) => E(c, H),
              ),
              T(L, P);
          },
        ),
          h(y);
        var k = w(y, 2);
        W(
          k,
          () => p(v),
          (L) => {
            t2(L, {
              get showModal() {
                return p(v);
              },
              onClose: g,
              children: (P, B) => {
                var q = o2(),
                  I = m(q),
                  K = m(I);
                h(I);
                var j = w(I, 2),
                  J = w(m(j), 2);
                Gr(J), h(j);
                var ne = w(j, 2),
                  ee = m(ne),
                  te = w(ee, 2);
                h(ne),
                  h(q),
                  O(() => R(K, `Topup Canister ${p(u) ?? ""}`)),
                  _r(
                    J,
                    () => p(d),
                    (re) => E(d, re),
                  ),
                  G("click", ee, g),
                  G("click", te, C),
                  T(P, q);
              },
              $$slots: { default: !0 },
            });
          },
        ),
          T(b, S);
      },
      $$slots: { default: !0 },
    }),
    D();
}
const l2 = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: i2 },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var Xa = {
  BACKEND_CANISTER_ID: "rbqtt-7yaaa-aaaal-qcndq-cai",
  FRONTEND_CANISTER_ID: "qm6x5-qqaaa-aaaal-qcnea-cai",
  DFX_NETWORK: "ic",
};
class Ja {
  constructor() {
    tt(this, "actor");
    this.actor = Ae.createActor(Rt, Xa.BACKEND_CANISTER_ID);
  }
  async submitContactForm(t) {
    return await this.actor.submitForm(t);
  }
  async getFormSubmissions() {
    await se.sync();
    const r = await (
      await Ae.createIdentityActor(se, Xa.BACKEND_CANISTER_ID)
    ).getFormSubmissions();
    if (it(r)) throw new Error("Failed to fetch form submissions");
    return r.ok;
  }
}
function c2() {
  async function e(r) {
    return new Ja().submitContactForm(r);
  }
  async function t() {
    return new Ja().getFormSubmissions();
  }
  return { submitContactForm: e, getFormSubmissions: t };
}
const Ts = c2();
var u2 = A(`<button type="submit" class="w-[90%] mb-10 px-4 py-3 font-medium  
               bg-BrandLightBlue text-black rounded-md hover:bg-BrandGreen 
               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
               lg:w-full lg:max-w-md">Send Message</button>`),
  d2 = A(
    '<div class="px-4 lg:px-32"><h2 class="mb-6 text-2xl">Send us a message</h2> <form method="POST" class="space-y-6"><div class="mb-4"><label for="name" class="form-label">Name</label> <input type="text" id="name" name="name" required class="form-input"></div> <div class="mb-4"><label for="email" class="form-label">Email</label> <input type="email" id="email" name="email" required class="form-input"></div> <div class="mb-4"><label for="message" class="form-label">Message</label> <textarea id="message" name="message" required class="h-32 rounded-md resize-none form-textarea"></textarea></div> <!></form></div>',
  );
function f2(e, t) {
  Q(t, !1);
  let r = V(!1),
    n = V(""),
    a = V(""),
    o = V("");
  async function s() {
    E(r, !0);
    const b = { contact: p(a), name: p(n), message: p(o) },
      x = await Ts.submitContactForm(b);
    if (it(x)) {
      const y = x.err;
      Object.keys(y)[0] == "AlreadyExists"
        ? (Xt.addToast({
            message:
              "A submission for your contact information already exists and is pending a response.",
            type: "error",
          }),
          console.error("Form already submitted: ", y))
        : (Xt.addToast({
            message: "There was an error submitting your form.",
            type: "error",
          }),
          console.error("Error submitting form: ", y)),
        E(r, !1);
      return;
    }
    c(),
      Xt.addToast({ message: "Form successfully submitted!", type: "success" }),
      E(r, !1);
  }
  function c() {
    E(n, ""), E(a, ""), E(o, "");
  }
  ae();
  var i = d2(),
    l = w(m(i), 2),
    u = m(l),
    v = w(m(u), 2);
  Gr(v), h(u);
  var d = w(u, 2),
    f = w(m(d), 2);
  Gr(f), h(d);
  var _ = w(d, 2),
    g = w(m(_), 2);
  Si(g), h(_);
  var C = w(_, 2);
  W(
    C,
    () => p(r),
    (b) => {
      $t(b);
    },
    (b) => {
      var x = u2();
      T(b, x);
    },
  ),
    h(l),
    h(i),
    _r(
      v,
      () => p(n),
      (b) => E(n, b),
    ),
    _r(
      f,
      () => p(a),
      (b) => E(a, b),
    ),
    _r(
      g,
      () => p(o),
      (b) => E(o, b),
    ),
    G("submit", l, Gi(s)),
    T(e, i),
    D();
}
var v2 = A(
  '<div class="px-4 mb-20 lg:mb-0"><h2 class="mb-10 text-2xl lg:mb-6">Contact Information</h2> <div class="relative rounded-lg p-6 overflow-hidden mt-10 w-[90%] lg:max-w-md"><div class="absolute ellipse-1"></div> <div class="absolute ellipse-2"></div> <div class="relative z-10"><p class="mb-2 text-lg">Email:</p> <a href="mailto:hello@waterwaylabs.xyz">hello@waterwaylabs.xyz</a></div></div></div>',
);
function p2(e) {
  var t = v2();
  T(e, t);
}
var _2 = A(
  '<div class="flex flex-col items-start gap-8 mx-auto md:flex-row mb-4"><div class="w-full mx-auto md:w-1/2"><!></div> <div class="w-full md:w-1/2"><!></div></div>',
);
function h2(e) {
  var t = _2(),
    r = m(t),
    n = m(r);
  f2(n, {}), h(r);
  var a = w(r, 2),
    o = m(a);
  p2(o), h(a), h(t), T(e, t);
}
var m2 = A(
  `<div class="mx-auto"><div class="responsive-row-col"><div class="text-left lg:w-1/2"><span class="status">CONTACT US</span> <h1 class="mt-6 mb-4 text-4xl leading-tight lg:mt-2 lg:mb-0 lg:text-5xl xl:text-6xl">WE'D LOVE TO HEAR FROM YOU!</h1></div> <div class="lg:w-1/2 lg:pl-12"><p class="main-paragraph">At Waterway Labs, your feedback is important to us! Whether you have a question, a suggestion, or simply want to share your experience, we're all ears. Our goal is to make sure you have the best possible experience, and your input helps us get there. Feel free to send us a message, and we'll get back to you as soon as possible.</p></div></div> <div class="horizontal-divider"></div> <!></div>`,
);
function g2(e) {
  Ze(e, {
    children: (t, r) => {
      var n = m2(),
        a = w(m(n), 4);
      h2(a), h(n), T(t, n);
    },
    $$slots: { default: !0 },
  });
}
const C2 = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: g2 },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var b2 = A("<h1>Profile</h1>");
function w2(e, t) {
  Q(t, !1),
    _e(async () => {
      await se.sync();
    }),
    ae(),
    Ze(e, {
      children: (r, n) => {
        var a = b2();
        T(r, a);
      },
      $$slots: { default: !0 },
    }),
    D();
}
const y2 = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: w2 },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var x2 = A(
    '<div class="flex flex-row"><div class="col-1/6"><p> </p></div> <div class="col-4/6"><p> </p></div> <div class="col-1/6"><a><button>Go</button></a></div></div>',
  ),
  T2 = A('<div class="flex w-full"><!></div>');
function N2(e, t) {
  Q(t, !1);
  const r = je(),
    n = () => Ve(at, "$projectStore", r);
  let a = V(!0);
  _e(() => {
    Rr.syncStores(), E(a, !1);
  }),
    ae(),
    Ze(e, {
      children: (o, s) => {
        var c = T2(),
          i = m(c);
        W(
          i,
          () => !p(a),
          (l) => {
            var u = Ce(),
              v = X(u);
            kt(v, 1, n, Jt, (d, f) => {
              var _ = x2(),
                g = m(_),
                C = m(g),
                b = m(C, !0);
              h(C), h(g);
              var x = w(g, 2),
                S = m(x),
                y = m(S, !0);
              h(S), h(x);
              var N = w(x, 2),
                k = m(N);
              h(N),
                h(_),
                O(() => {
                  R(b, p(f).id),
                    R(y, p(f).name),
                    oe(k, "href", `/project?id=${p(f).id}`);
                }),
                T(d, _);
            }),
              T(l, u);
          },
        ),
          h(c),
          T(o, c);
      },
      $$slots: { default: !0 },
    }),
    D();
}
const S2 = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: N2 },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var E2 = A(
    '<div class="flex flex-col gap-4 mx-4"><div><div class="flex justify-between items-center mb-2"><span class="text-sm text-gray-500"> </span> <span> </span></div> <div class="mb-2"><h3 class="text-lg font-semibold text-gray-800"> </h3> <p class="text-gray-700 text-sm"> </p></div> <div class="flex items-center mt-4"><span class="text-sm font-medium text-gray-500">Contact:</span> <span class="ml-2 text-gray-600 text-sm"> </span></div></div></div>',
  ),
  A2 = A(
    '<div class="responsive-row-col"><div class="text-left w-full"><span class="status">SUPPORT</span> <h1 class="mt-6 mb-4 text-4xl leading-tight lg:mt-2 lg:mb-0 lg:text-5xl xl:text-6xl">PLEASE SEE NEW SUPPORT QUERIES BELOW</h1></div></div> <div class="horizontal-divider"></div> <!>',
    1,
  ),
  k2 = A('<div class="mx-auto"><!></div>');
function O2(e, t) {
  Q(t, !1);
  let r = V([]),
    n = V(!0);
  _e(async () => {
    try {
      E(r, await Ts.getFormSubmissions());
    } catch (a) {
      console.error("Error fetching form submissions:", a);
    } finally {
      E(n, !1);
    }
  }),
    ae(),
    Ze(e, {
      children: (a, o) => {
        var s = k2(),
          c = m(s);
        W(
          c,
          () => p(n),
          (i) => {
            $t(i);
          },
          (i) => {
            var l = A2(),
              u = w(X(l), 4);
            kt(
              u,
              1,
              () => p(r),
              Jt,
              (v, d) => {
                var f = E2();
                const _ = Ee(() => Object.keys(p(d).status)[0]);
                var g = m(f),
                  C = m(g),
                  b = m(C),
                  x = m(b, !0);
                O(() => R(x, e1(p(d).submittedOn))), h(b);
                var S = w(b, 2),
                  y = m(S, !0);
                h(S), h(C);
                var N = w(C, 2),
                  k = m(N),
                  L = m(k, !0);
                h(k);
                var P = w(k, 2),
                  B = m(P, !0);
                h(P), h(N);
                var q = w(N, 2),
                  I = w(m(q), 2),
                  K = m(I, !0);
                h(I),
                  h(q),
                  h(g),
                  h(f),
                  O(() => {
                    Se(
                      g,
                      `bg-white shadow-md rounded-lg p-4 border-l-4 
                    ${p(_) == "Unread" ? "border-blue-500" : ""} 
                    ${p(_) == "Read" ? "border-green-500" : ""} 
                    ${p(_) == "Resolved" ? "border-yellow-500" : ""} 
                    ${p(_) == "Ignored" ? "border-red-500" : ""} 
                    ${p(_) == "Flagged" ? "border-purple-500" : ""} 
                `,
                    ),
                      Se(
                        S,
                        `text-xs font-semibold uppercase 
                        ${p(_) == "Unread" ? "border-blue-500" : ""} 
                        ${p(_) == "Read" ? "border-green-500" : ""} 
                        ${p(_) == "Resolved" ? "border-yellow-500" : ""} 
                        ${p(_) == "Ignored" ? "border-red-500" : ""} 
                        ${p(_) == "Flagged" ? "border-purple-500" : ""}
                        `,
                      ),
                      R(y, p(_)),
                      R(L, p(d).name),
                      R(B, p(d).message),
                      R(K, p(d).contact);
                  }),
                  T(v, f);
              },
            ),
              T(i, l);
          },
        ),
          h(s),
          T(a, s);
      },
      $$slots: { default: !0 },
    }),
    D();
}
const L2 = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: O2 },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var P2 = A(
    '<div class="p-6 transition-transform duration-300 ease-in-out rounded-lg shadow-md lg:mb-10 lg:p-4 hover:shadow-lg hover:scale-105"><div class="w-full mb-6 overflow-hidden rounded-lg aspect-square"><img class="object-cover w-full h-full aspect-square"></div> <div class="space-y-4"><span class="status"> </span> <h3 class="mb-2 text-lg lg:text-base"> </h3> <p class="text-base  exLight lg:text-sm"> </p></div></div>',
  ),
  R2 = A(
    '<div class="container mx-auto"><div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-10"></div></div>',
  );
function $2(e, t) {
  let r = $(t, "teamMembers", 24, () => []);
  var n = R2(),
    a = m(n);
  kt(a, 5, r, Jt, (o, s) => {
    var c = P2(),
      i = m(c),
      l = m(i);
    h(i);
    var u = w(i, 2),
      v = m(u),
      d = m(v, !0);
    h(v);
    var f = w(v, 2),
      _ = m(f, !0);
    h(f);
    var g = w(f, 2),
      C = m(g, !0);
    h(g),
      h(u),
      h(c),
      O(() => {
        oe(l, "src", `team/${p(s).image}`),
          oe(l, "alt", p(s).name),
          R(d, p(s).title),
          R(_, p(s).name),
          R(C, p(s).bio);
      }),
      T(o, c);
  }),
    h(a),
    h(n),
    T(e, n);
}
var F2 =
  A(`<div class="mx-auto"><div class="responsive-row-col"><div class="text-left lg:w-1/2"><span class="status">THE TEAM</span> <h1 class="mt-6 mb-4 text-4xl leading-tight lg:mt-2 lg:mb-0 lg:text-5xl xl:text-6xl">A TEAM OF WEB3 EXPERTS</h1></div> <div class="lg:w-1/2 lg:pl-12"><p class="main-paragraph">At Waterway Labs, we are passionate about building innovative Web3 products that champion decentralisation. 
          Our team are passionate about building more equitable services for people through the use of new and exciting blockchain technologies. 
          We are committed to pushing the boundaries of what's possible with decentralised applications, 
          aiming to build an open and collaborative ecosystem.</p></div></div> <div class="horizontal-divider"></div> <!></div>`);
function M2(e, t) {
  Q(t, !1);
  const r = je(),
    n = () => Ve(Bn, "$teamStore", r);
  _e(async () => {
    a();
  });
  async function a() {
    try {
      await Rr.syncStores();
    } catch (o) {
      console.error("Error fetching team members:", o);
    }
  }
  ae(),
    Ze(e, {
      children: (o, s) => {
        var c = F2(),
          i = w(m(c), 4);
        $2(i, {
          get teamMembers() {
            return n();
          },
        }),
          h(c),
          T(o, c);
      },
      $$slots: { default: !0 },
    }),
    D();
}
const V2 = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: M2 },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var j2 = {
    BACKEND_CANISTER_ID: "rbqtt-7yaaa-aaaal-qcndq-cai",
    FRONTEND_CANISTER_ID: "qm6x5-qqaaa-aaaal-qcnea-cai",
    DFX_NETWORK: "ic",
  },
  q2 = A('<p class="text-red-500"> </p>'),
  U2 = A(
    '<div class="bg-BrandGray text-white p-4 rounded-md shadow"><h2 class="text-xl font-bold mb-2">Neuron Details</h2> <p class="text-xxs"><strong>Neuron ID:</strong> </p> <p class="text-xxs"><strong>Neuron Created:</strong> </p> <p><strong>Staked FPL:</strong> </p> <p class="text-sm mb-4"><strong>Staked FPL Maturity:</strong> </p> <p class="text-xs"><strong>VP Multiplier:</strong> </p> <p class="text-xs mb-4"> </p> <p class="mb-4"> </p> <p> </p> <p> </p> <p> </p></div>',
  ),
  B2 = A(
    '<div class="p-4"><div class="mb-4 flex flex-col sm:flex-row gap-2"><input type="text" placeholder="Enter Neuron ID" class="flex-grow p-2 border rounded text-black"> <button class="brand-button">Search</button></div> <!> <!></div>',
  );
function H2(e, t) {
  Q(t, !1);
  let r = V(""),
    n = V(null),
    a = V(""),
    o = V(null),
    s = V(0);
  async function c() {
    if ((E(a, ""), E(n, null), !p(r))) {
      E(a, "Please enter a neuron ID.");
      return;
    }
    try {
      const l = await Ae.getGovernanceAgent();
      j2.DFX_NETWORK;
      const {
        getNeuron: u,
        listProposals: v,
        nervousSystemParameters: d,
      } = Ls.create({
        agent: l,
        canisterId: Ps.fromText("detjl-sqaaa-aaaaq-aacqa-cai"),
      });
      E(o, await d({ certified: !1 }));
      const f = { neuronId: { id: Rs(p(r)) } },
        _ = await u(f);
      E(n, _ ?? null), p(n) || E(a, "Neuron not found.");
      let b = (await v({})).proposals[0],
        x = Number(b.latest_tally[0]?.total) / 1e8,
        y = i(p(n)) / Number(x);
      E(s, y);
    } catch (l) {
      console.error(l), E(a, "Error fetching neuron.");
    }
  }
  function i(l) {
    return Date.now() / 1e3 - Number(l.created_timestamp_seconds) >
      Number(p(o)?.max_neuron_age_for_age_bonus)
      ? ((Number(l.cached_neuron_stake_e8s) +
          Number(l.staked_maturity_e8s_equivalent[0] ?? 0)) *
          1.25 *
          (1 + Number(l.voting_power_percentage_multiplier) / 100)) /
          1e8
      : ((Number(l.cached_neuron_stake_e8s) +
          Number(l.staked_maturity_e8s_equivalent[0] ?? 0)) *
          (1 + Number(l.voting_power_percentage_multiplier) / 100)) /
          1e8;
  }
  ae(),
    Ze(e, {
      children: (l, u) => {
        var v = B2(),
          d = m(v),
          f = m(d);
        Gr(f);
        var _ = w(f, 2);
        h(d);
        var g = w(d, 2);
        W(
          g,
          () => p(a),
          (b) => {
            var x = q2(),
              S = m(x, !0);
            h(x), O(() => R(S, p(a))), T(b, x);
          },
        );
        var C = w(g, 2);
        W(
          C,
          () => p(n),
          (b) => {
            var x = U2(),
              S = w(m(x), 2),
              y = w(m(S));
            O(() => R(y, ` ${$s(p(n).id[0]?.id ?? []) ?? ""}`)), h(S);
            var N = w(S, 2),
              k = w(m(N));
            O(() =>
              R(
                k,
                ` ${new Date(Number(p(n).created_timestamp_seconds) * 1e3).toLocaleString() ?? ""}`,
              ),
            ),
              h(N);
            var L = w(N, 2),
              P = w(m(L));
            O(() =>
              R(
                P,
                ` ${(Number(p(n).cached_neuron_stake_e8s) / 1e8).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? ""}`,
              ),
            ),
              h(L);
            var B = w(L, 2),
              q = w(m(B));
            O(() =>
              R(
                q,
                ` ${(Number(p(n).staked_maturity_e8s_equivalent[0] ?? 0) / 1e8).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? ""}`,
              ),
            ),
              h(B);
            var I = w(B, 2),
              K = w(m(I));
            h(I);
            var j = w(I, 2),
              J = m(j);
            O(() =>
              R(
                J,
                `Age Bonus: ${(Date.now() / 1e3 - Number(p(n).created_timestamp_seconds) > Number(p(o)?.max_neuron_age_for_age_bonus) ? "25" : "0") ?? ""}%`,
              ),
            ),
              h(j);
            var ne = w(j, 2);
            const ee = Ee(() => i(p(n)) ?? ""),
              te = Ee(
                () =>
                  (p(s) * 100).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) ?? "",
              );
            var re = m(ne);
            O(() => R(re, `Total Voting Power: ${p(ee)} (${p(te)}%)`)), h(ne);
            var he = w(ne, 2),
              qe = m(he);
            O(() =>
              R(
                qe,
                `$BOOK Tokens: ${(1e7 * p(s)).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? ""}`,
              ),
            ),
              h(he);
            var ce = w(he, 2),
              ke = m(ce);
            O(() =>
              R(
                ke,
                `$GOLF Tokens: ${(1e7 * p(s)).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? ""}`,
              ),
            ),
              h(ce);
            var me = w(ce, 2),
              we = m(me);
            O(() =>
              R(
                we,
                `$BEAT Tokens: ${(1e7 * p(s)).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? ""}`,
              ),
            ),
              h(me),
              h(x),
              O(() =>
                R(K, ` ${p(n).voting_power_percentage_multiplier ?? ""}%`),
              ),
              T(b, x);
          },
        ),
          h(v),
          _r(
            f,
            () => p(r),
            (b) => E(r, b),
          ),
          G("click", _, c),
          T(l, v);
      },
      $$slots: { default: !0 },
    }),
    D();
}
const W2 = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: H2 },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
function z2(e) {
  return new Worker(
    "" + new URL("../workers/auth-worker-BLNmMgom.js", import.meta.url).href,
    { type: "module", name: e?.name },
  );
}
const I2 = Object.freeze(
  Object.defineProperty({ __proto__: null, default: z2 }, Symbol.toStringTag, {
    value: "Module",
  }),
);
export {
  Kl as E,
  zl as L,
  ue as _,
  eu as a,
  Vc as b,
  K2 as c,
  tu as d,
  Uc as e,
  zc as f,
  Y2 as g,
  ru as h,
  Gc as i,
  Qc as j,
  i2 as k,
  g2 as l,
  J2 as m,
  D2 as n,
  w2 as o,
  N2 as p,
  O2 as q,
  Q2 as r,
  X2 as s,
  M2 as t,
  H2 as u,
};
