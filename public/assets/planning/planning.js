var E0 = { exports: {} }, Ia = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var oh;
function ev() {
  if (oh) return Ia;
  oh = 1;
  var i = Symbol.for("react.transitional.element"), f = Symbol.for("react.fragment");
  function o(c, h, y) {
    var v = null;
    if (y !== void 0 && (v = "" + y), h.key !== void 0 && (v = "" + h.key), "key" in h) {
      y = {};
      for (var m in h)
        m !== "key" && (y[m] = h[m]);
    } else y = h;
    return h = y.ref, {
      $$typeof: i,
      type: c,
      key: v,
      ref: h !== void 0 ? h : null,
      props: y
    };
  }
  return Ia.Fragment = f, Ia.jsx = o, Ia.jsxs = o, Ia;
}
var sh;
function nv() {
  return sh || (sh = 1, E0.exports = ev()), E0.exports;
}
var j = nv(), A0 = { exports: {} }, rt = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hh;
function av() {
  if (hh) return rt;
  hh = 1;
  var i = Symbol.for("react.transitional.element"), f = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), h = Symbol.for("react.profiler"), y = Symbol.for("react.consumer"), v = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), d = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), p = Symbol.for("react.activity"), z = Symbol.iterator;
  function Z(E) {
    return E === null || typeof E != "object" ? null : (E = z && E[z] || E["@@iterator"], typeof E == "function" ? E : null);
  }
  var Y = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, C = Object.assign, L = {};
  function k(E, U, X) {
    this.props = E, this.context = U, this.refs = L, this.updater = X || Y;
  }
  k.prototype.isReactComponent = {}, k.prototype.setState = function(E, U) {
    if (typeof E != "object" && typeof E != "function" && E != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, E, U, "setState");
  }, k.prototype.forceUpdate = function(E) {
    this.updater.enqueueForceUpdate(this, E, "forceUpdate");
  };
  function w() {
  }
  w.prototype = k.prototype;
  function F(E, U, X) {
    this.props = E, this.context = U, this.refs = L, this.updater = X || Y;
  }
  var V = F.prototype = new w();
  V.constructor = F, C(V, k.prototype), V.isPureReactComponent = !0;
  var et = Array.isArray;
  function J() {
  }
  var $ = { H: null, A: null, T: null, S: null }, it = Object.prototype.hasOwnProperty;
  function ct(E, U, X) {
    var K = X.ref;
    return {
      $$typeof: i,
      type: E,
      key: U,
      ref: K !== void 0 ? K : null,
      props: X
    };
  }
  function Et(E, U) {
    return ct(E.type, U, E.props);
  }
  function tt(E) {
    return typeof E == "object" && E !== null && E.$$typeof === i;
  }
  function I(E) {
    var U = { "=": "=0", ":": "=2" };
    return "$" + E.replace(/[=:]/g, function(X) {
      return U[X];
    });
  }
  var dt = /\/+/g;
  function at(E, U) {
    return typeof E == "object" && E !== null && E.key != null ? I("" + E.key) : U.toString(36);
  }
  function B(E) {
    switch (E.status) {
      case "fulfilled":
        return E.value;
      case "rejected":
        throw E.reason;
      default:
        switch (typeof E.status == "string" ? E.then(J, J) : (E.status = "pending", E.then(
          function(U) {
            E.status === "pending" && (E.status = "fulfilled", E.value = U);
          },
          function(U) {
            E.status === "pending" && (E.status = "rejected", E.reason = U);
          }
        )), E.status) {
          case "fulfilled":
            return E.value;
          case "rejected":
            throw E.reason;
        }
    }
    throw E;
  }
  function x(E, U, X, K, ut) {
    var mt = typeof E;
    (mt === "undefined" || mt === "boolean") && (E = null);
    var xt = !1;
    if (E === null) xt = !0;
    else
      switch (mt) {
        case "bigint":
        case "string":
        case "number":
          xt = !0;
          break;
        case "object":
          switch (E.$$typeof) {
            case i:
            case f:
              xt = !0;
              break;
            case b:
              return xt = E._init, x(
                xt(E._payload),
                U,
                X,
                K,
                ut
              );
          }
      }
    if (xt)
      return ut = ut(E), xt = K === "" ? "." + at(E, 0) : K, et(ut) ? (X = "", xt != null && (X = xt.replace(dt, "$&/") + "/"), x(ut, U, X, "", function(ua) {
        return ua;
      })) : ut != null && (tt(ut) && (ut = Et(
        ut,
        X + (ut.key == null || E && E.key === ut.key ? "" : ("" + ut.key).replace(
          dt,
          "$&/"
        ) + "/") + xt
      )), U.push(ut)), 1;
    xt = 0;
    var al = K === "" ? "." : K + ":";
    if (et(E))
      for (var Lt = 0; Lt < E.length; Lt++)
        K = E[Lt], mt = al + at(K, Lt), xt += x(
          K,
          U,
          X,
          mt,
          ut
        );
    else if (Lt = Z(E), typeof Lt == "function")
      for (E = Lt.call(E), Lt = 0; !(K = E.next()).done; )
        K = K.value, mt = al + at(K, Lt++), xt += x(
          K,
          U,
          X,
          mt,
          ut
        );
    else if (mt === "object") {
      if (typeof E.then == "function")
        return x(
          B(E),
          U,
          X,
          K,
          ut
        );
      throw U = String(E), Error(
        "Objects are not valid as a React child (found: " + (U === "[object Object]" ? "object with keys {" + Object.keys(E).join(", ") + "}" : U) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return xt;
  }
  function G(E, U, X) {
    if (E == null) return E;
    var K = [], ut = 0;
    return x(E, K, "", "", function(mt) {
      return U.call(X, mt, ut++);
    }), K;
  }
  function Q(E) {
    if (E._status === -1) {
      var U = E._result;
      U = U(), U.then(
        function(X) {
          (E._status === 0 || E._status === -1) && (E._status = 1, E._result = X);
        },
        function(X) {
          (E._status === 0 || E._status === -1) && (E._status = 2, E._result = X);
        }
      ), E._status === -1 && (E._status = 0, E._result = U);
    }
    if (E._status === 1) return E._result.default;
    throw E._result;
  }
  var ft = typeof reportError == "function" ? reportError : function(E) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var U = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof E == "object" && E !== null && typeof E.message == "string" ? String(E.message) : String(E),
        error: E
      });
      if (!window.dispatchEvent(U)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", E);
      return;
    }
    console.error(E);
  }, ot = {
    map: G,
    forEach: function(E, U, X) {
      G(
        E,
        function() {
          U.apply(this, arguments);
        },
        X
      );
    },
    count: function(E) {
      var U = 0;
      return G(E, function() {
        U++;
      }), U;
    },
    toArray: function(E) {
      return G(E, function(U) {
        return U;
      }) || [];
    },
    only: function(E) {
      if (!tt(E))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return E;
    }
  };
  return rt.Activity = p, rt.Children = ot, rt.Component = k, rt.Fragment = o, rt.Profiler = h, rt.PureComponent = F, rt.StrictMode = c, rt.Suspense = S, rt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = $, rt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(E) {
      return $.H.useMemoCache(E);
    }
  }, rt.cache = function(E) {
    return function() {
      return E.apply(null, arguments);
    };
  }, rt.cacheSignal = function() {
    return null;
  }, rt.cloneElement = function(E, U, X) {
    if (E == null)
      throw Error(
        "The argument must be a React element, but you passed " + E + "."
      );
    var K = C({}, E.props), ut = E.key;
    if (U != null)
      for (mt in U.key !== void 0 && (ut = "" + U.key), U)
        !it.call(U, mt) || mt === "key" || mt === "__self" || mt === "__source" || mt === "ref" && U.ref === void 0 || (K[mt] = U[mt]);
    var mt = arguments.length - 2;
    if (mt === 1) K.children = X;
    else if (1 < mt) {
      for (var xt = Array(mt), al = 0; al < mt; al++)
        xt[al] = arguments[al + 2];
      K.children = xt;
    }
    return ct(E.type, ut, K);
  }, rt.createContext = function(E) {
    return E = {
      $$typeof: v,
      _currentValue: E,
      _currentValue2: E,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, E.Provider = E, E.Consumer = {
      $$typeof: y,
      _context: E
    }, E;
  }, rt.createElement = function(E, U, X) {
    var K, ut = {}, mt = null;
    if (U != null)
      for (K in U.key !== void 0 && (mt = "" + U.key), U)
        it.call(U, K) && K !== "key" && K !== "__self" && K !== "__source" && (ut[K] = U[K]);
    var xt = arguments.length - 2;
    if (xt === 1) ut.children = X;
    else if (1 < xt) {
      for (var al = Array(xt), Lt = 0; Lt < xt; Lt++)
        al[Lt] = arguments[Lt + 2];
      ut.children = al;
    }
    if (E && E.defaultProps)
      for (K in xt = E.defaultProps, xt)
        ut[K] === void 0 && (ut[K] = xt[K]);
    return ct(E, mt, ut);
  }, rt.createRef = function() {
    return { current: null };
  }, rt.forwardRef = function(E) {
    return { $$typeof: m, render: E };
  }, rt.isValidElement = tt, rt.lazy = function(E) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: E },
      _init: Q
    };
  }, rt.memo = function(E, U) {
    return {
      $$typeof: d,
      type: E,
      compare: U === void 0 ? null : U
    };
  }, rt.startTransition = function(E) {
    var U = $.T, X = {};
    $.T = X;
    try {
      var K = E(), ut = $.S;
      ut !== null && ut(X, K), typeof K == "object" && K !== null && typeof K.then == "function" && K.then(J, ft);
    } catch (mt) {
      ft(mt);
    } finally {
      U !== null && X.types !== null && (U.types = X.types), $.T = U;
    }
  }, rt.unstable_useCacheRefresh = function() {
    return $.H.useCacheRefresh();
  }, rt.use = function(E) {
    return $.H.use(E);
  }, rt.useActionState = function(E, U, X) {
    return $.H.useActionState(E, U, X);
  }, rt.useCallback = function(E, U) {
    return $.H.useCallback(E, U);
  }, rt.useContext = function(E) {
    return $.H.useContext(E);
  }, rt.useDebugValue = function() {
  }, rt.useDeferredValue = function(E, U) {
    return $.H.useDeferredValue(E, U);
  }, rt.useEffect = function(E, U) {
    return $.H.useEffect(E, U);
  }, rt.useEffectEvent = function(E) {
    return $.H.useEffectEvent(E);
  }, rt.useId = function() {
    return $.H.useId();
  }, rt.useImperativeHandle = function(E, U, X) {
    return $.H.useImperativeHandle(E, U, X);
  }, rt.useInsertionEffect = function(E, U) {
    return $.H.useInsertionEffect(E, U);
  }, rt.useLayoutEffect = function(E, U) {
    return $.H.useLayoutEffect(E, U);
  }, rt.useMemo = function(E, U) {
    return $.H.useMemo(E, U);
  }, rt.useOptimistic = function(E, U) {
    return $.H.useOptimistic(E, U);
  }, rt.useReducer = function(E, U, X) {
    return $.H.useReducer(E, U, X);
  }, rt.useRef = function(E) {
    return $.H.useRef(E);
  }, rt.useState = function(E) {
    return $.H.useState(E);
  }, rt.useSyncExternalStore = function(E, U, X) {
    return $.H.useSyncExternalStore(
      E,
      U,
      X
    );
  }, rt.useTransition = function() {
    return $.H.useTransition();
  }, rt.version = "19.2.0", rt;
}
var dh;
function P0() {
  return dh || (dh = 1, A0.exports = av()), A0.exports;
}
var O = P0();
function Zi(i, f) {
  return i == null || f == null ? NaN : i < f ? -1 : i > f ? 1 : i >= f ? 0 : NaN;
}
function uv(i, f) {
  return i == null || f == null ? NaN : f < i ? -1 : f > i ? 1 : f >= i ? 0 : NaN;
}
function ld(i) {
  let f, o, c;
  i.length !== 2 ? (f = Zi, o = (m, S) => Zi(i(m), S), c = (m, S) => i(m) - S) : (f = i === Zi || i === uv ? i : iv, o = i, c = i);
  function h(m, S, d = 0, b = m.length) {
    if (d < b) {
      if (f(S, S) !== 0) return b;
      do {
        const p = d + b >>> 1;
        o(m[p], S) < 0 ? d = p + 1 : b = p;
      } while (d < b);
    }
    return d;
  }
  function y(m, S, d = 0, b = m.length) {
    if (d < b) {
      if (f(S, S) !== 0) return b;
      do {
        const p = d + b >>> 1;
        o(m[p], S) <= 0 ? d = p + 1 : b = p;
      } while (d < b);
    }
    return d;
  }
  function v(m, S, d = 0, b = m.length) {
    const p = h(m, S, d, b - 1);
    return p > d && c(m[p - 1], S) > -c(m[p], S) ? p - 1 : p;
  }
  return { left: h, center: v, right: y };
}
function iv() {
  return 0;
}
function fv(i) {
  return i === null ? NaN : +i;
}
const cv = ld(Zi), rv = cv.right;
ld(fv).center;
class rn {
  constructor() {
    this._partials = new Float64Array(32), this._n = 0;
  }
  add(f) {
    const o = this._partials;
    let c = 0;
    for (let h = 0; h < this._n && h < 32; h++) {
      const y = o[h], v = f + y, m = Math.abs(f) < Math.abs(y) ? f - (v - y) : y - (v - f);
      m && (o[c++] = m), f = v;
    }
    return o[c] = f, this._n = c + 1, this;
  }
  valueOf() {
    const f = this._partials;
    let o = this._n, c, h, y, v = 0;
    if (o > 0) {
      for (v = f[--o]; o > 0 && (c = v, h = f[--o], v = c + h, y = h - (v - c), !y); )
        ;
      o > 0 && (y < 0 && f[o - 1] < 0 || y > 0 && f[o - 1] > 0) && (h = y * 2, c = v + h, h == c - v && (v = c));
    }
    return v;
  }
}
const ov = Math.sqrt(50), sv = Math.sqrt(10), hv = Math.sqrt(2);
function Li(i, f, o) {
  const c = (f - i) / Math.max(0, o), h = Math.floor(Math.log10(c)), y = c / Math.pow(10, h), v = y >= ov ? 10 : y >= sv ? 5 : y >= hv ? 2 : 1;
  let m, S, d;
  return h < 0 ? (d = Math.pow(10, -h) / v, m = Math.round(i * d), S = Math.round(f * d), m / d < i && ++m, S / d > f && --S, d = -d) : (d = Math.pow(10, h) * v, m = Math.round(i / d), S = Math.round(f / d), m * d < i && ++m, S * d > f && --S), S < m && 0.5 <= o && o < 2 ? Li(i, f, o * 2) : [m, S, d];
}
function dv(i, f, o) {
  if (f = +f, i = +i, o = +o, !(o > 0)) return [];
  if (i === f) return [i];
  const c = f < i, [h, y, v] = c ? Li(f, i, o) : Li(i, f, o);
  if (!(y >= h)) return [];
  const m = y - h + 1, S = new Array(m);
  if (c)
    if (v < 0) for (let d = 0; d < m; ++d) S[d] = (y - d) / -v;
    else for (let d = 0; d < m; ++d) S[d] = (y - d) * v;
  else if (v < 0) for (let d = 0; d < m; ++d) S[d] = (h + d) / -v;
  else for (let d = 0; d < m; ++d) S[d] = (h + d) * v;
  return S;
}
function R0(i, f, o) {
  return f = +f, i = +i, o = +o, Li(i, f, o)[2];
}
function mv(i, f, o) {
  f = +f, i = +i, o = +o;
  const c = f < i, h = c ? R0(f, i, o) : R0(i, f, o);
  return (c ? -1 : 1) * (h < 0 ? 1 / -h : h);
}
function* vv(i) {
  for (const f of i)
    yield* f;
}
function ed(i) {
  return Array.from(vv(i));
}
var Ut = 1e-6, bt = Math.PI, ml = bt / 2, mh = bt / 4, Tl = bt * 2, il = 180 / bt, qt = bt / 180, Bt = Math.abs, nd = Math.atan, uu = Math.atan2, Vt = Math.cos, yv = Math.exp, gv = Math.log, Qt = Math.sin, pv = Math.sign || function(i) {
  return i > 0 ? 1 : i < 0 ? -1 : 0;
}, sn = Math.sqrt, Sv = Math.tan;
function bv(i) {
  return i > 1 ? 0 : i < -1 ? bt : Math.acos(i);
}
function iu(i) {
  return i > 1 ? ml : i < -1 ? -ml : Math.asin(i);
}
function Zl() {
}
function Gi(i, f) {
  i && yh.hasOwnProperty(i.type) && yh[i.type](i, f);
}
var vh = {
  Feature: function(i, f) {
    Gi(i.geometry, f);
  },
  FeatureCollection: function(i, f) {
    for (var o = i.features, c = -1, h = o.length; ++c < h; ) Gi(o[c].geometry, f);
  }
}, yh = {
  Sphere: function(i, f) {
    f.sphere();
  },
  Point: function(i, f) {
    i = i.coordinates, f.point(i[0], i[1], i[2]);
  },
  MultiPoint: function(i, f) {
    for (var o = i.coordinates, c = -1, h = o.length; ++c < h; ) i = o[c], f.point(i[0], i[1], i[2]);
  },
  LineString: function(i, f) {
    j0(i.coordinates, f, 0);
  },
  MultiLineString: function(i, f) {
    for (var o = i.coordinates, c = -1, h = o.length; ++c < h; ) j0(o[c], f, 0);
  },
  Polygon: function(i, f) {
    gh(i.coordinates, f);
  },
  MultiPolygon: function(i, f) {
    for (var o = i.coordinates, c = -1, h = o.length; ++c < h; ) gh(o[c], f);
  },
  GeometryCollection: function(i, f) {
    for (var o = i.geometries, c = -1, h = o.length; ++c < h; ) Gi(o[c], f);
  }
};
function j0(i, f, o) {
  var c = -1, h = i.length - o, y;
  for (f.lineStart(); ++c < h; ) y = i[c], f.point(y[0], y[1], y[2]);
  f.lineEnd();
}
function gh(i, f) {
  var o = -1, c = i.length;
  for (f.polygonStart(); ++o < c; ) j0(i[o], f, 1);
  f.polygonEnd();
}
function In(i, f) {
  i && vh.hasOwnProperty(i.type) ? vh[i.type](i, f) : Gi(i, f);
}
function C0(i) {
  return [uu(i[1], i[0]), iu(i[2])];
}
function ea(i) {
  var f = i[0], o = i[1], c = Vt(o);
  return [c * Vt(f), c * Qt(f), Qt(o)];
}
function Di(i, f) {
  return i[0] * f[0] + i[1] * f[1] + i[2] * f[2];
}
function Xi(i, f) {
  return [i[1] * f[2] - i[2] * f[1], i[2] * f[0] - i[0] * f[2], i[0] * f[1] - i[1] * f[0]];
}
function M0(i, f) {
  i[0] += f[0], i[1] += f[1], i[2] += f[2];
}
function Ui(i, f) {
  return [i[0] * f, i[1] * f, i[2] * f];
}
function q0(i) {
  var f = sn(i[0] * i[0] + i[1] * i[1] + i[2] * i[2]);
  i[0] /= f, i[1] /= f, i[2] /= f;
}
function kn(i) {
  return function() {
    return i;
  };
}
function B0(i, f) {
  function o(c, h) {
    return c = i(c, h), f(c[0], c[1]);
  }
  return i.invert && f.invert && (o.invert = function(c, h) {
    return c = f.invert(c, h), c && i.invert(c[0], c[1]);
  }), o;
}
function Z0(i, f) {
  return Bt(i) > bt && (i -= Math.round(i / Tl) * Tl), [i, f];
}
Z0.invert = Z0;
function tr(i, f, o) {
  return (i %= Tl) ? f || o ? B0(Sh(i), bh(f, o)) : Sh(i) : f || o ? bh(f, o) : Z0;
}
function ph(i) {
  return function(f, o) {
    return f += i, Bt(f) > bt && (f -= Math.round(f / Tl) * Tl), [f, o];
  };
}
function Sh(i) {
  var f = ph(i);
  return f.invert = ph(-i), f;
}
function bh(i, f) {
  var o = Vt(i), c = Qt(i), h = Vt(f), y = Qt(f);
  function v(m, S) {
    var d = Vt(S), b = Vt(m) * d, p = Qt(m) * d, z = Qt(S), Z = z * o + b * c;
    return [
      uu(p * h - Z * y, b * o - z * c),
      iu(Z * h + p * y)
    ];
  }
  return v.invert = function(m, S) {
    var d = Vt(S), b = Vt(m) * d, p = Qt(m) * d, z = Qt(S), Z = z * h - p * y;
    return [
      uu(p * h + z * y, b * o + Z * c),
      iu(Z * o - b * c)
    ];
  }, v;
}
function Ev(i) {
  i = tr(i[0] * qt, i[1] * qt, i.length > 2 ? i[2] * qt : 0);
  function f(o) {
    return o = i(o[0] * qt, o[1] * qt), o[0] *= il, o[1] *= il, o;
  }
  return f.invert = function(o) {
    return o = i.invert(o[0] * qt, o[1] * qt), o[0] *= il, o[1] *= il, o;
  }, f;
}
function ad(i, f, o, c, h, y) {
  if (o) {
    var v = Vt(f), m = Qt(f), S = c * o;
    h == null ? (h = f + c * Tl, y = f - S / 2) : (h = Eh(v, h), y = Eh(v, y), (c > 0 ? h < y : h > y) && (h += c * Tl));
    for (var d, b = h; c > 0 ? b > y : b < y; b -= S)
      d = C0([v, -m * Vt(b), -m * Qt(b)]), i.point(d[0], d[1]);
  }
}
function Eh(i, f) {
  f = ea(f), f[0] -= i, q0(f);
  var o = bv(-f[1]);
  return ((-f[2] < 0 ? -o : o) + Tl - Ut) % Tl;
}
function Av() {
  var i = kn([0, 0]), f = kn(90), o = kn(2), c, h, y = { point: v };
  function v(S, d) {
    c.push(S = h(S, d)), S[0] *= il, S[1] *= il;
  }
  function m() {
    var S = i.apply(this, arguments), d = f.apply(this, arguments) * qt, b = o.apply(this, arguments) * qt;
    return c = [], h = tr(-S[0] * qt, -S[1] * qt, 0).invert, ad(y, d, b, 1), S = { type: "Polygon", coordinates: [c] }, c = h = null, S;
  }
  return m.center = function(S) {
    return arguments.length ? (i = typeof S == "function" ? S : kn([+S[0], +S[1]]), m) : i;
  }, m.radius = function(S) {
    return arguments.length ? (f = typeof S == "function" ? S : kn(+S), m) : f;
  }, m.precision = function(S) {
    return arguments.length ? (o = typeof S == "function" ? S : kn(+S), m) : o;
  }, m;
}
function ud() {
  var i = [], f;
  return {
    point: function(o, c, h) {
      f.push([o, c, h]);
    },
    lineStart: function() {
      i.push(f = []);
    },
    lineEnd: Zl,
    rejoin: function() {
      i.length > 1 && i.push(i.pop().concat(i.shift()));
    },
    result: function() {
      var o = i;
      return i = [], f = null, o;
    }
  };
}
function Yi(i, f) {
  return Bt(i[0] - f[0]) < Ut && Bt(i[1] - f[1]) < Ut;
}
function Ri(i, f, o, c) {
  this.x = i, this.z = f, this.o = o, this.e = c, this.v = !1, this.n = this.p = null;
}
function id(i, f, o, c, h) {
  var y = [], v = [], m, S;
  if (i.forEach(function(Y) {
    if (!((C = Y.length - 1) <= 0)) {
      var C, L = Y[0], k = Y[C], w;
      if (Yi(L, k)) {
        if (!L[2] && !k[2]) {
          for (h.lineStart(), m = 0; m < C; ++m) h.point((L = Y[m])[0], L[1]);
          h.lineEnd();
          return;
        }
        k[0] += 2 * Ut;
      }
      y.push(w = new Ri(L, Y, null, !0)), v.push(w.o = new Ri(L, null, w, !1)), y.push(w = new Ri(k, Y, null, !1)), v.push(w.o = new Ri(k, null, w, !0));
    }
  }), !!y.length) {
    for (v.sort(f), Ah(y), Ah(v), m = 0, S = v.length; m < S; ++m)
      v[m].e = o = !o;
    for (var d = y[0], b, p; ; ) {
      for (var z = d, Z = !0; z.v; ) if ((z = z.n) === d) return;
      b = z.z, h.lineStart();
      do {
        if (z.v = z.o.v = !0, z.e) {
          if (Z)
            for (m = 0, S = b.length; m < S; ++m) h.point((p = b[m])[0], p[1]);
          else
            c(z.x, z.n.x, 1, h);
          z = z.n;
        } else {
          if (Z)
            for (b = z.p.z, m = b.length - 1; m >= 0; --m) h.point((p = b[m])[0], p[1]);
          else
            c(z.x, z.p.x, -1, h);
          z = z.p;
        }
        z = z.o, b = z.z, Z = !Z;
      } while (!z.v);
      h.lineEnd();
    }
  }
}
function Ah(i) {
  if (f = i.length) {
    for (var f, o = 0, c = i[0], h; ++o < f; )
      c.n = h = i[o], h.p = c, c = h;
    c.n = h = i[0], h.p = c;
  }
}
function z0(i) {
  return Bt(i[0]) <= bt ? i[0] : pv(i[0]) * ((Bt(i[0]) + bt) % Tl - bt);
}
function Mv(i, f) {
  var o = z0(f), c = f[1], h = Qt(c), y = [Qt(o), -Vt(o), 0], v = 0, m = 0, S = new rn();
  h === 1 ? c = ml + Ut : h === -1 && (c = -ml - Ut);
  for (var d = 0, b = i.length; d < b; ++d)
    if (z = (p = i[d]).length)
      for (var p, z, Z = p[z - 1], Y = z0(Z), C = Z[1] / 2 + mh, L = Qt(C), k = Vt(C), w = 0; w < z; ++w, Y = V, L = J, k = $, Z = F) {
        var F = p[w], V = z0(F), et = F[1] / 2 + mh, J = Qt(et), $ = Vt(et), it = V - Y, ct = it >= 0 ? 1 : -1, Et = ct * it, tt = Et > bt, I = L * J;
        if (S.add(uu(I * ct * Qt(Et), k * $ + I * Vt(Et))), v += tt ? it + ct * Tl : it, tt ^ Y >= o ^ V >= o) {
          var dt = Xi(ea(Z), ea(F));
          q0(dt);
          var at = Xi(y, dt);
          q0(at);
          var B = (tt ^ it >= 0 ? -1 : 1) * iu(at[2]);
          (c > B || c === B && (dt[0] || dt[1])) && (m += tt ^ it >= 0 ? 1 : -1);
        }
      }
  return (v < -Ut || v < Ut && S < -1e-12) ^ m & 1;
}
function fd(i, f, o, c) {
  return function(h) {
    var y = f(h), v = ud(), m = f(v), S = !1, d, b, p, z = {
      point: Z,
      lineStart: C,
      lineEnd: L,
      polygonStart: function() {
        z.point = k, z.lineStart = w, z.lineEnd = F, b = [], d = [];
      },
      polygonEnd: function() {
        z.point = Z, z.lineStart = C, z.lineEnd = L, b = ed(b);
        var V = Mv(d, c);
        b.length ? (S || (h.polygonStart(), S = !0), id(b, xv, V, o, h)) : V && (S || (h.polygonStart(), S = !0), h.lineStart(), o(null, null, 1, h), h.lineEnd()), S && (h.polygonEnd(), S = !1), b = d = null;
      },
      sphere: function() {
        h.polygonStart(), h.lineStart(), o(null, null, 1, h), h.lineEnd(), h.polygonEnd();
      }
    };
    function Z(V, et) {
      i(V, et) && h.point(V, et);
    }
    function Y(V, et) {
      y.point(V, et);
    }
    function C() {
      z.point = Y, y.lineStart();
    }
    function L() {
      z.point = Z, y.lineEnd();
    }
    function k(V, et) {
      p.push([V, et]), m.point(V, et);
    }
    function w() {
      m.lineStart(), p = [];
    }
    function F() {
      k(p[0][0], p[0][1]), m.lineEnd();
      var V = m.clean(), et = v.result(), J, $ = et.length, it, ct, Et;
      if (p.pop(), d.push(p), p = null, !!$) {
        if (V & 1) {
          if (ct = et[0], (it = ct.length - 1) > 0) {
            for (S || (h.polygonStart(), S = !0), h.lineStart(), J = 0; J < it; ++J) h.point((Et = ct[J])[0], Et[1]);
            h.lineEnd();
          }
          return;
        }
        $ > 1 && V & 2 && et.push(et.pop().concat(et.shift())), b.push(et.filter(zv));
      }
    }
    return z;
  };
}
function zv(i) {
  return i.length > 1;
}
function xv(i, f) {
  return ((i = i.x)[0] < 0 ? i[1] - ml - Ut : ml - i[1]) - ((f = f.x)[0] < 0 ? f[1] - ml - Ut : ml - f[1]);
}
const Mh = fd(
  function() {
    return !0;
  },
  Tv,
  Nv,
  [-bt, -ml]
);
function Tv(i) {
  var f = NaN, o = NaN, c = NaN, h;
  return {
    lineStart: function() {
      i.lineStart(), h = 1;
    },
    point: function(y, v) {
      var m = y > 0 ? bt : -bt, S = Bt(y - f);
      Bt(S - bt) < Ut ? (i.point(f, o = (o + v) / 2 > 0 ? ml : -ml), i.point(c, o), i.lineEnd(), i.lineStart(), i.point(m, o), i.point(y, o), h = 0) : c !== m && S >= bt && (Bt(f - c) < Ut && (f -= c * Ut), Bt(y - m) < Ut && (y -= m * Ut), o = _v(f, o, y, v), i.point(c, o), i.lineEnd(), i.lineStart(), i.point(m, o), h = 0), i.point(f = y, o = v), c = m;
    },
    lineEnd: function() {
      i.lineEnd(), f = o = NaN;
    },
    clean: function() {
      return 2 - h;
    }
  };
}
function _v(i, f, o, c) {
  var h, y, v = Qt(i - o);
  return Bt(v) > Ut ? nd((Qt(f) * (y = Vt(c)) * Qt(o) - Qt(c) * (h = Vt(f)) * Qt(i)) / (h * y * v)) : (f + c) / 2;
}
function Nv(i, f, o, c) {
  var h;
  if (i == null)
    h = o * ml, c.point(-bt, h), c.point(0, h), c.point(bt, h), c.point(bt, 0), c.point(bt, -h), c.point(0, -h), c.point(-bt, -h), c.point(-bt, 0), c.point(-bt, h);
  else if (Bt(i[0] - f[0]) > Ut) {
    var y = i[0] < f[0] ? bt : -bt;
    h = o * y / 2, c.point(-y, h), c.point(0, h), c.point(y, h);
  } else
    c.point(f[0], f[1]);
}
function Ov(i) {
  var f = Vt(i), o = 2 * qt, c = f > 0, h = Bt(f) > Ut;
  function y(b, p, z, Z) {
    ad(Z, i, o, z, b, p);
  }
  function v(b, p) {
    return Vt(b) * Vt(p) > f;
  }
  function m(b) {
    var p, z, Z, Y, C;
    return {
      lineStart: function() {
        Y = Z = !1, C = 1;
      },
      point: function(L, k) {
        var w = [L, k], F, V = v(L, k), et = c ? V ? 0 : d(L, k) : V ? d(L + (L < 0 ? bt : -bt), k) : 0;
        if (!p && (Y = Z = V) && b.lineStart(), V !== Z && (F = S(p, w), (!F || Yi(p, F) || Yi(w, F)) && (w[2] = 1)), V !== Z)
          C = 0, V ? (b.lineStart(), F = S(w, p), b.point(F[0], F[1])) : (F = S(p, w), b.point(F[0], F[1], 2), b.lineEnd()), p = F;
        else if (h && p && c ^ V) {
          var J;
          !(et & z) && (J = S(w, p, !0)) && (C = 0, c ? (b.lineStart(), b.point(J[0][0], J[0][1]), b.point(J[1][0], J[1][1]), b.lineEnd()) : (b.point(J[1][0], J[1][1]), b.lineEnd(), b.lineStart(), b.point(J[0][0], J[0][1], 3)));
        }
        V && (!p || !Yi(p, w)) && b.point(w[0], w[1]), p = w, Z = V, z = et;
      },
      lineEnd: function() {
        Z && b.lineEnd(), p = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return C | (Y && Z) << 1;
      }
    };
  }
  function S(b, p, z) {
    var Z = ea(b), Y = ea(p), C = [1, 0, 0], L = Xi(Z, Y), k = Di(L, L), w = L[0], F = k - w * w;
    if (!F) return !z && b;
    var V = f * k / F, et = -f * w / F, J = Xi(C, L), $ = Ui(C, V), it = Ui(L, et);
    M0($, it);
    var ct = J, Et = Di($, ct), tt = Di(ct, ct), I = Et * Et - tt * (Di($, $) - 1);
    if (!(I < 0)) {
      var dt = sn(I), at = Ui(ct, (-Et - dt) / tt);
      if (M0(at, $), at = C0(at), !z) return at;
      var B = b[0], x = p[0], G = b[1], Q = p[1], ft;
      x < B && (ft = B, B = x, x = ft);
      var ot = x - B, E = Bt(ot - bt) < Ut, U = E || ot < Ut;
      if (!E && Q < G && (ft = G, G = Q, Q = ft), U ? E ? G + Q > 0 ^ at[1] < (Bt(at[0] - B) < Ut ? G : Q) : G <= at[1] && at[1] <= Q : ot > bt ^ (B <= at[0] && at[0] <= x)) {
        var X = Ui(ct, (-Et + dt) / tt);
        return M0(X, $), [at, C0(X)];
      }
    }
  }
  function d(b, p) {
    var z = c ? i : bt - i, Z = 0;
    return b < -z ? Z |= 1 : b > z && (Z |= 2), p < -z ? Z |= 4 : p > z && (Z |= 8), Z;
  }
  return fd(v, m, y, c ? [0, -i] : [-bt, i - bt]);
}
function Hv(i, f, o, c, h, y) {
  var v = i[0], m = i[1], S = f[0], d = f[1], b = 0, p = 1, z = S - v, Z = d - m, Y;
  if (Y = o - v, !(!z && Y > 0)) {
    if (Y /= z, z < 0) {
      if (Y < b) return;
      Y < p && (p = Y);
    } else if (z > 0) {
      if (Y > p) return;
      Y > b && (b = Y);
    }
    if (Y = h - v, !(!z && Y < 0)) {
      if (Y /= z, z < 0) {
        if (Y > p) return;
        Y > b && (b = Y);
      } else if (z > 0) {
        if (Y < b) return;
        Y < p && (p = Y);
      }
      if (Y = c - m, !(!Z && Y > 0)) {
        if (Y /= Z, Z < 0) {
          if (Y < b) return;
          Y < p && (p = Y);
        } else if (Z > 0) {
          if (Y > p) return;
          Y > b && (b = Y);
        }
        if (Y = y - m, !(!Z && Y < 0)) {
          if (Y /= Z, Z < 0) {
            if (Y > p) return;
            Y > b && (b = Y);
          } else if (Z > 0) {
            if (Y < b) return;
            Y < p && (p = Y);
          }
          return b > 0 && (i[0] = v + b * z, i[1] = m + b * Z), p < 1 && (f[0] = v + p * z, f[1] = m + p * Z), !0;
        }
      }
    }
  }
}
var tu = 1e9, ji = -tu;
function Dv(i, f, o, c) {
  function h(d, b) {
    return i <= d && d <= o && f <= b && b <= c;
  }
  function y(d, b, p, z) {
    var Z = 0, Y = 0;
    if (d == null || (Z = v(d, p)) !== (Y = v(b, p)) || S(d, b) < 0 ^ p > 0)
      do
        z.point(Z === 0 || Z === 3 ? i : o, Z > 1 ? c : f);
      while ((Z = (Z + p + 4) % 4) !== Y);
    else
      z.point(b[0], b[1]);
  }
  function v(d, b) {
    return Bt(d[0] - i) < Ut ? b > 0 ? 0 : 3 : Bt(d[0] - o) < Ut ? b > 0 ? 2 : 1 : Bt(d[1] - f) < Ut ? b > 0 ? 1 : 0 : b > 0 ? 3 : 2;
  }
  function m(d, b) {
    return S(d.x, b.x);
  }
  function S(d, b) {
    var p = v(d, 1), z = v(b, 1);
    return p !== z ? p - z : p === 0 ? b[1] - d[1] : p === 1 ? d[0] - b[0] : p === 2 ? d[1] - b[1] : b[0] - d[0];
  }
  return function(d) {
    var b = d, p = ud(), z, Z, Y, C, L, k, w, F, V, et, J, $ = {
      point: it,
      lineStart: I,
      lineEnd: dt,
      polygonStart: Et,
      polygonEnd: tt
    };
    function it(B, x) {
      h(B, x) && b.point(B, x);
    }
    function ct() {
      for (var B = 0, x = 0, G = Z.length; x < G; ++x)
        for (var Q = Z[x], ft = 1, ot = Q.length, E = Q[0], U, X, K = E[0], ut = E[1]; ft < ot; ++ft)
          U = K, X = ut, E = Q[ft], K = E[0], ut = E[1], X <= c ? ut > c && (K - U) * (c - X) > (ut - X) * (i - U) && ++B : ut <= c && (K - U) * (c - X) < (ut - X) * (i - U) && --B;
      return B;
    }
    function Et() {
      b = p, z = [], Z = [], J = !0;
    }
    function tt() {
      var B = ct(), x = J && B, G = (z = ed(z)).length;
      (x || G) && (d.polygonStart(), x && (d.lineStart(), y(null, null, 1, d), d.lineEnd()), G && id(z, m, B, y, d), d.polygonEnd()), b = d, z = Z = Y = null;
    }
    function I() {
      $.point = at, Z && Z.push(Y = []), et = !0, V = !1, w = F = NaN;
    }
    function dt() {
      z && (at(C, L), k && V && p.rejoin(), z.push(p.result())), $.point = it, V && b.lineEnd();
    }
    function at(B, x) {
      var G = h(B, x);
      if (Z && Y.push([B, x]), et)
        C = B, L = x, k = G, et = !1, G && (b.lineStart(), b.point(B, x));
      else if (G && V) b.point(B, x);
      else {
        var Q = [w = Math.max(ji, Math.min(tu, w)), F = Math.max(ji, Math.min(tu, F))], ft = [B = Math.max(ji, Math.min(tu, B)), x = Math.max(ji, Math.min(tu, x))];
        Hv(Q, ft, i, f, o, c) ? (V || (b.lineStart(), b.point(Q[0], Q[1])), b.point(ft[0], ft[1]), G || b.lineEnd(), J = !1) : G && (b.lineStart(), b.point(B, x), J = !1);
      }
      w = B, F = x, V = G;
    }
    return $;
  };
}
const Y0 = (i) => i;
var x0 = new rn(), L0 = new rn(), cd, rd, G0, X0, me = {
  point: Zl,
  lineStart: Zl,
  lineEnd: Zl,
  polygonStart: function() {
    me.lineStart = Uv, me.lineEnd = jv;
  },
  polygonEnd: function() {
    me.lineStart = me.lineEnd = me.point = Zl, x0.add(Bt(L0)), L0 = new rn();
  },
  result: function() {
    var i = x0 / 2;
    return x0 = new rn(), i;
  }
};
function Uv() {
  me.point = Rv;
}
function Rv(i, f) {
  me.point = od, cd = G0 = i, rd = X0 = f;
}
function od(i, f) {
  L0.add(X0 * i - G0 * f), G0 = i, X0 = f;
}
function jv() {
  od(cd, rd);
}
var na = 1 / 0, Vi = na, fu = -na, Qi = fu, Ki = {
  point: Cv,
  lineStart: Zl,
  lineEnd: Zl,
  polygonStart: Zl,
  polygonEnd: Zl,
  result: function() {
    var i = [[na, Vi], [fu, Qi]];
    return fu = Qi = -(Vi = na = 1 / 0), i;
  }
};
function Cv(i, f) {
  i < na && (na = i), i > fu && (fu = i), f < Vi && (Vi = f), f > Qi && (Qi = f);
}
var V0 = 0, Q0 = 0, lu = 0, wi = 0, Ji = 0, Pn = 0, K0 = 0, w0 = 0, eu = 0, sd, hd, Jl, $l, Bl = {
  point: on,
  lineStart: zh,
  lineEnd: xh,
  polygonStart: function() {
    Bl.lineStart = Zv, Bl.lineEnd = Yv;
  },
  polygonEnd: function() {
    Bl.point = on, Bl.lineStart = zh, Bl.lineEnd = xh;
  },
  result: function() {
    var i = eu ? [K0 / eu, w0 / eu] : Pn ? [wi / Pn, Ji / Pn] : lu ? [V0 / lu, Q0 / lu] : [NaN, NaN];
    return V0 = Q0 = lu = wi = Ji = Pn = K0 = w0 = eu = 0, i;
  }
};
function on(i, f) {
  V0 += i, Q0 += f, ++lu;
}
function zh() {
  Bl.point = qv;
}
function qv(i, f) {
  Bl.point = Bv, on(Jl = i, $l = f);
}
function Bv(i, f) {
  var o = i - Jl, c = f - $l, h = sn(o * o + c * c);
  wi += h * (Jl + i) / 2, Ji += h * ($l + f) / 2, Pn += h, on(Jl = i, $l = f);
}
function xh() {
  Bl.point = on;
}
function Zv() {
  Bl.point = Lv;
}
function Yv() {
  dd(sd, hd);
}
function Lv(i, f) {
  Bl.point = dd, on(sd = Jl = i, hd = $l = f);
}
function dd(i, f) {
  var o = i - Jl, c = f - $l, h = sn(o * o + c * c);
  wi += h * (Jl + i) / 2, Ji += h * ($l + f) / 2, Pn += h, h = $l * i - Jl * f, K0 += h * (Jl + i), w0 += h * ($l + f), eu += h * 3, on(Jl = i, $l = f);
}
function md(i) {
  this._context = i;
}
md.prototype = {
  _radius: 4.5,
  pointRadius: function(i) {
    return this._radius = i, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    this._line === 0 && this._context.closePath(), this._point = NaN;
  },
  point: function(i, f) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(i, f), this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(i, f);
        break;
      }
      default: {
        this._context.moveTo(i + this._radius, f), this._context.arc(i, f, this._radius, 0, Tl);
        break;
      }
    }
  },
  result: Zl
};
var J0 = new rn(), T0, vd, yd, nu, au, cu = {
  point: Zl,
  lineStart: function() {
    cu.point = Gv;
  },
  lineEnd: function() {
    T0 && gd(vd, yd), cu.point = Zl;
  },
  polygonStart: function() {
    T0 = !0;
  },
  polygonEnd: function() {
    T0 = null;
  },
  result: function() {
    var i = +J0;
    return J0 = new rn(), i;
  }
};
function Gv(i, f) {
  cu.point = gd, vd = nu = i, yd = au = f;
}
function gd(i, f) {
  nu -= i, au -= f, J0.add(sn(nu * nu + au * au)), nu = i, au = f;
}
let Th, $i, _h, Nh;
class Oh {
  constructor(f) {
    this._append = f == null ? pd : Xv(f), this._radius = 4.5, this._ = "";
  }
  pointRadius(f) {
    return this._radius = +f, this;
  }
  polygonStart() {
    this._line = 0;
  }
  polygonEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    this._line === 0 && (this._ += "Z"), this._point = NaN;
  }
  point(f, o) {
    switch (this._point) {
      case 0: {
        this._append`M${f},${o}`, this._point = 1;
        break;
      }
      case 1: {
        this._append`L${f},${o}`;
        break;
      }
      default: {
        if (this._append`M${f},${o}`, this._radius !== _h || this._append !== $i) {
          const c = this._radius, h = this._;
          this._ = "", this._append`m0,${c}a${c},${c} 0 1,1 0,${-2 * c}a${c},${c} 0 1,1 0,${2 * c}z`, _h = c, $i = this._append, Nh = this._, this._ = h;
        }
        this._ += Nh;
        break;
      }
    }
  }
  result() {
    const f = this._;
    return this._ = "", f.length ? f : null;
  }
}
function pd(i) {
  let f = 1;
  this._ += i[0];
  for (const o = i.length; f < o; ++f)
    this._ += arguments[f] + i[f];
}
function Xv(i) {
  const f = Math.floor(i);
  if (!(f >= 0)) throw new RangeError(`invalid digits: ${i}`);
  if (f > 15) return pd;
  if (f !== Th) {
    const o = 10 ** f;
    Th = f, $i = function(h) {
      let y = 1;
      this._ += h[0];
      for (const v = h.length; y < v; ++y)
        this._ += Math.round(arguments[y] * o) / o + h[y];
    };
  }
  return $i;
}
function Vv(i, f) {
  let o = 3, c = 4.5, h, y;
  function v(m) {
    return m && (typeof c == "function" && y.pointRadius(+c.apply(this, arguments)), In(m, h(y))), y.result();
  }
  return v.area = function(m) {
    return In(m, h(me)), me.result();
  }, v.measure = function(m) {
    return In(m, h(cu)), cu.result();
  }, v.bounds = function(m) {
    return In(m, h(Ki)), Ki.result();
  }, v.centroid = function(m) {
    return In(m, h(Bl)), Bl.result();
  }, v.projection = function(m) {
    return arguments.length ? (h = m == null ? (i = null, Y0) : (i = m).stream, v) : i;
  }, v.context = function(m) {
    return arguments.length ? (y = m == null ? (f = null, new Oh(o)) : new md(f = m), typeof c != "function" && y.pointRadius(c), v) : f;
  }, v.pointRadius = function(m) {
    return arguments.length ? (c = typeof m == "function" ? m : (y.pointRadius(+m), +m), v) : c;
  }, v.digits = function(m) {
    if (!arguments.length) return o;
    if (m == null) o = null;
    else {
      const S = Math.floor(m);
      if (!(S >= 0)) throw new RangeError(`invalid digits: ${m}`);
      o = S;
    }
    return f === null && (y = new Oh(o)), v;
  }, v.projection(i).digits(o).context(f);
}
function lr(i) {
  return function(f) {
    var o = new $0();
    for (var c in i) o[c] = i[c];
    return o.stream = f, o;
  };
}
function $0() {
}
$0.prototype = {
  constructor: $0,
  point: function(i, f) {
    this.stream.point(i, f);
  },
  sphere: function() {
    this.stream.sphere();
  },
  lineStart: function() {
    this.stream.lineStart();
  },
  lineEnd: function() {
    this.stream.lineEnd();
  },
  polygonStart: function() {
    this.stream.polygonStart();
  },
  polygonEnd: function() {
    this.stream.polygonEnd();
  }
};
function er(i, f, o) {
  var c = i.clipExtent && i.clipExtent();
  return i.scale(150).translate([0, 0]), c != null && i.clipExtent(null), In(o, i.stream(Ki)), f(Ki.result()), c != null && i.clipExtent(c), i;
}
function Sd(i, f, o) {
  return er(i, function(c) {
    var h = f[1][0] - f[0][0], y = f[1][1] - f[0][1], v = Math.min(h / (c[1][0] - c[0][0]), y / (c[1][1] - c[0][1])), m = +f[0][0] + (h - v * (c[1][0] + c[0][0])) / 2, S = +f[0][1] + (y - v * (c[1][1] + c[0][1])) / 2;
    i.scale(150 * v).translate([m, S]);
  }, o);
}
function Qv(i, f, o) {
  return Sd(i, [[0, 0], f], o);
}
function Kv(i, f, o) {
  return er(i, function(c) {
    var h = +f, y = h / (c[1][0] - c[0][0]), v = (h - y * (c[1][0] + c[0][0])) / 2, m = -y * c[0][1];
    i.scale(150 * y).translate([v, m]);
  }, o);
}
function wv(i, f, o) {
  return er(i, function(c) {
    var h = +f, y = h / (c[1][1] - c[0][1]), v = -y * c[0][0], m = (h - y * (c[1][1] + c[0][1])) / 2;
    i.scale(150 * y).translate([v, m]);
  }, o);
}
var Hh = 16, Jv = Vt(30 * qt);
function Dh(i, f) {
  return +f ? Wv(i, f) : $v(i);
}
function $v(i) {
  return lr({
    point: function(f, o) {
      f = i(f, o), this.stream.point(f[0], f[1]);
    }
  });
}
function Wv(i, f) {
  function o(c, h, y, v, m, S, d, b, p, z, Z, Y, C, L) {
    var k = d - c, w = b - h, F = k * k + w * w;
    if (F > 4 * f && C--) {
      var V = v + z, et = m + Z, J = S + Y, $ = sn(V * V + et * et + J * J), it = iu(J /= $), ct = Bt(Bt(J) - 1) < Ut || Bt(y - p) < Ut ? (y + p) / 2 : uu(et, V), Et = i(ct, it), tt = Et[0], I = Et[1], dt = tt - c, at = I - h, B = w * dt - k * at;
      (B * B / F > f || Bt((k * dt + w * at) / F - 0.5) > 0.3 || v * z + m * Z + S * Y < Jv) && (o(c, h, y, v, m, S, tt, I, ct, V /= $, et /= $, J, C, L), L.point(tt, I), o(tt, I, ct, V, et, J, d, b, p, z, Z, Y, C, L));
    }
  }
  return function(c) {
    var h, y, v, m, S, d, b, p, z, Z, Y, C, L = {
      point: k,
      lineStart: w,
      lineEnd: V,
      polygonStart: function() {
        c.polygonStart(), L.lineStart = et;
      },
      polygonEnd: function() {
        c.polygonEnd(), L.lineStart = w;
      }
    };
    function k(it, ct) {
      it = i(it, ct), c.point(it[0], it[1]);
    }
    function w() {
      p = NaN, L.point = F, c.lineStart();
    }
    function F(it, ct) {
      var Et = ea([it, ct]), tt = i(it, ct);
      o(p, z, b, Z, Y, C, p = tt[0], z = tt[1], b = it, Z = Et[0], Y = Et[1], C = Et[2], Hh, c), c.point(p, z);
    }
    function V() {
      L.point = k, c.lineEnd();
    }
    function et() {
      w(), L.point = J, L.lineEnd = $;
    }
    function J(it, ct) {
      F(h = it, ct), y = p, v = z, m = Z, S = Y, d = C, L.point = F;
    }
    function $() {
      o(p, z, b, Z, Y, C, y, v, h, m, S, d, Hh, c), L.lineEnd = V, V();
    }
    return L;
  };
}
var Fv = lr({
  point: function(i, f) {
    this.stream.point(i * qt, f * qt);
  }
});
function kv(i) {
  return lr({
    point: function(f, o) {
      var c = i(f, o);
      return this.stream.point(c[0], c[1]);
    }
  });
}
function Iv(i, f, o, c, h) {
  function y(v, m) {
    return v *= c, m *= h, [f + i * v, o - i * m];
  }
  return y.invert = function(v, m) {
    return [(v - f) / i * c, (o - m) / i * h];
  }, y;
}
function Uh(i, f, o, c, h, y) {
  if (!y) return Iv(i, f, o, c, h);
  var v = Vt(y), m = Qt(y), S = v * i, d = m * i, b = v / i, p = m / i, z = (m * o - v * f) / i, Z = (m * f + v * o) / i;
  function Y(C, L) {
    return C *= c, L *= h, [S * C - d * L + f, o - d * C - S * L];
  }
  return Y.invert = function(C, L) {
    return [c * (b * C - p * L + z), h * (Z - p * C - b * L)];
  }, Y;
}
function Pv(i) {
  return ty(function() {
    return i;
  })();
}
function ty(i) {
  var f, o = 150, c = 480, h = 250, y = 0, v = 0, m = 0, S = 0, d = 0, b, p = 0, z = 1, Z = 1, Y = null, C = Mh, L = null, k, w, F, V = Y0, et = 0.5, J, $, it, ct, Et;
  function tt(B) {
    return it(B[0] * qt, B[1] * qt);
  }
  function I(B) {
    return B = it.invert(B[0], B[1]), B && [B[0] * il, B[1] * il];
  }
  tt.stream = function(B) {
    return ct && Et === B ? ct : ct = Fv(kv(b)(C(J(V(Et = B)))));
  }, tt.preclip = function(B) {
    return arguments.length ? (C = B, Y = void 0, at()) : C;
  }, tt.postclip = function(B) {
    return arguments.length ? (V = B, L = k = w = F = null, at()) : V;
  }, tt.clipAngle = function(B) {
    return arguments.length ? (C = +B ? Ov(Y = B * qt) : (Y = null, Mh), at()) : Y * il;
  }, tt.clipExtent = function(B) {
    return arguments.length ? (V = B == null ? (L = k = w = F = null, Y0) : Dv(L = +B[0][0], k = +B[0][1], w = +B[1][0], F = +B[1][1]), at()) : L == null ? null : [[L, k], [w, F]];
  }, tt.scale = function(B) {
    return arguments.length ? (o = +B, dt()) : o;
  }, tt.translate = function(B) {
    return arguments.length ? (c = +B[0], h = +B[1], dt()) : [c, h];
  }, tt.center = function(B) {
    return arguments.length ? (y = B[0] % 360 * qt, v = B[1] % 360 * qt, dt()) : [y * il, v * il];
  }, tt.rotate = function(B) {
    return arguments.length ? (m = B[0] % 360 * qt, S = B[1] % 360 * qt, d = B.length > 2 ? B[2] % 360 * qt : 0, dt()) : [m * il, S * il, d * il];
  }, tt.angle = function(B) {
    return arguments.length ? (p = B % 360 * qt, dt()) : p * il;
  }, tt.reflectX = function(B) {
    return arguments.length ? (z = B ? -1 : 1, dt()) : z < 0;
  }, tt.reflectY = function(B) {
    return arguments.length ? (Z = B ? -1 : 1, dt()) : Z < 0;
  }, tt.precision = function(B) {
    return arguments.length ? (J = Dh($, et = B * B), at()) : sn(et);
  }, tt.fitExtent = function(B, x) {
    return Sd(tt, B, x);
  }, tt.fitSize = function(B, x) {
    return Qv(tt, B, x);
  }, tt.fitWidth = function(B, x) {
    return Kv(tt, B, x);
  }, tt.fitHeight = function(B, x) {
    return wv(tt, B, x);
  };
  function dt() {
    var B = Uh(o, 0, 0, z, Z, p).apply(null, f(y, v)), x = Uh(o, c - B[0], h - B[1], z, Z, p);
    return b = tr(m, S, d), $ = B0(f, x), it = B0(b, $), J = Dh($, et), at();
  }
  function at() {
    return ct = Et = null, tt;
  }
  return function() {
    return f = i.apply(this, arguments), tt.invert = f.invert && I, dt();
  };
}
function nr(i, f) {
  return [i, gv(Sv((ml + f) / 2))];
}
nr.invert = function(i, f) {
  return [i, 2 * nd(yv(f)) - ml];
};
function ly() {
  return ey(nr).scale(961 / Tl);
}
function ey(i) {
  var f = Pv(i), o = f.center, c = f.scale, h = f.translate, y = f.clipExtent, v = null, m, S, d;
  f.scale = function(p) {
    return arguments.length ? (c(p), b()) : c();
  }, f.translate = function(p) {
    return arguments.length ? (h(p), b()) : h();
  }, f.center = function(p) {
    return arguments.length ? (o(p), b()) : o();
  }, f.clipExtent = function(p) {
    return arguments.length ? (p == null ? v = m = S = d = null : (v = +p[0][0], m = +p[0][1], S = +p[1][0], d = +p[1][1]), b()) : v == null ? null : [[v, m], [S, d]];
  };
  function b() {
    var p = bt * c(), z = f(Ev(f.rotate()).invert([0, 0]));
    return y(v == null ? [[z[0] - p, z[1] - p], [z[0] + p, z[1] + p]] : i === nr ? [[Math.max(z[0] - p, v), m], [Math.min(z[0] + p, S), d]] : [[v, Math.max(z[1] - p, m)], [S, Math.min(z[1] + p, d)]]);
  }
  return b();
}
function ny(i, f) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(i);
      break;
    default:
      this.range(f).domain(i);
      break;
  }
  return this;
}
function ar(i, f, o) {
  i.prototype = f.prototype = o, o.constructor = i;
}
function bd(i, f) {
  var o = Object.create(i.prototype);
  for (var c in f) o[c] = f[c];
  return o;
}
function hu() {
}
var ru = 0.7, Wi = 1 / ru, la = "\\s*([+-]?\\d+)\\s*", ou = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Wl = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ay = /^#([0-9a-f]{3,8})$/, uy = new RegExp(`^rgb\\(${la},${la},${la}\\)$`), iy = new RegExp(`^rgb\\(${Wl},${Wl},${Wl}\\)$`), fy = new RegExp(`^rgba\\(${la},${la},${la},${ou}\\)$`), cy = new RegExp(`^rgba\\(${Wl},${Wl},${Wl},${ou}\\)$`), ry = new RegExp(`^hsl\\(${ou},${Wl},${Wl}\\)$`), oy = new RegExp(`^hsla\\(${ou},${Wl},${Wl},${ou}\\)$`), Rh = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
ar(hu, su, {
  copy(i) {
    return Object.assign(new this.constructor(), this, i);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: jh,
  // Deprecated! Use color.formatHex.
  formatHex: jh,
  formatHex8: sy,
  formatHsl: hy,
  formatRgb: Ch,
  toString: Ch
});
function jh() {
  return this.rgb().formatHex();
}
function sy() {
  return this.rgb().formatHex8();
}
function hy() {
  return Ed(this).formatHsl();
}
function Ch() {
  return this.rgb().formatRgb();
}
function su(i) {
  var f, o;
  return i = (i + "").trim().toLowerCase(), (f = ay.exec(i)) ? (o = f[1].length, f = parseInt(f[1], 16), o === 6 ? qh(f) : o === 3 ? new vl(f >> 8 & 15 | f >> 4 & 240, f >> 4 & 15 | f & 240, (f & 15) << 4 | f & 15, 1) : o === 8 ? Ci(f >> 24 & 255, f >> 16 & 255, f >> 8 & 255, (f & 255) / 255) : o === 4 ? Ci(f >> 12 & 15 | f >> 8 & 240, f >> 8 & 15 | f >> 4 & 240, f >> 4 & 15 | f & 240, ((f & 15) << 4 | f & 15) / 255) : null) : (f = uy.exec(i)) ? new vl(f[1], f[2], f[3], 1) : (f = iy.exec(i)) ? new vl(f[1] * 255 / 100, f[2] * 255 / 100, f[3] * 255 / 100, 1) : (f = fy.exec(i)) ? Ci(f[1], f[2], f[3], f[4]) : (f = cy.exec(i)) ? Ci(f[1] * 255 / 100, f[2] * 255 / 100, f[3] * 255 / 100, f[4]) : (f = ry.exec(i)) ? Yh(f[1], f[2] / 100, f[3] / 100, 1) : (f = oy.exec(i)) ? Yh(f[1], f[2] / 100, f[3] / 100, f[4]) : Rh.hasOwnProperty(i) ? qh(Rh[i]) : i === "transparent" ? new vl(NaN, NaN, NaN, 0) : null;
}
function qh(i) {
  return new vl(i >> 16 & 255, i >> 8 & 255, i & 255, 1);
}
function Ci(i, f, o, c) {
  return c <= 0 && (i = f = o = NaN), new vl(i, f, o, c);
}
function dy(i) {
  return i instanceof hu || (i = su(i)), i ? (i = i.rgb(), new vl(i.r, i.g, i.b, i.opacity)) : new vl();
}
function W0(i, f, o, c) {
  return arguments.length === 1 ? dy(i) : new vl(i, f, o, c ?? 1);
}
function vl(i, f, o, c) {
  this.r = +i, this.g = +f, this.b = +o, this.opacity = +c;
}
ar(vl, W0, bd(hu, {
  brighter(i) {
    return i = i == null ? Wi : Math.pow(Wi, i), new vl(this.r * i, this.g * i, this.b * i, this.opacity);
  },
  darker(i) {
    return i = i == null ? ru : Math.pow(ru, i), new vl(this.r * i, this.g * i, this.b * i, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new vl(cn(this.r), cn(this.g), cn(this.b), Fi(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Bh,
  // Deprecated! Use color.formatHex.
  formatHex: Bh,
  formatHex8: my,
  formatRgb: Zh,
  toString: Zh
}));
function Bh() {
  return `#${fn(this.r)}${fn(this.g)}${fn(this.b)}`;
}
function my() {
  return `#${fn(this.r)}${fn(this.g)}${fn(this.b)}${fn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Zh() {
  const i = Fi(this.opacity);
  return `${i === 1 ? "rgb(" : "rgba("}${cn(this.r)}, ${cn(this.g)}, ${cn(this.b)}${i === 1 ? ")" : `, ${i})`}`;
}
function Fi(i) {
  return isNaN(i) ? 1 : Math.max(0, Math.min(1, i));
}
function cn(i) {
  return Math.max(0, Math.min(255, Math.round(i) || 0));
}
function fn(i) {
  return i = cn(i), (i < 16 ? "0" : "") + i.toString(16);
}
function Yh(i, f, o, c) {
  return c <= 0 ? i = f = o = NaN : o <= 0 || o >= 1 ? i = f = NaN : f <= 0 && (i = NaN), new Xl(i, f, o, c);
}
function Ed(i) {
  if (i instanceof Xl) return new Xl(i.h, i.s, i.l, i.opacity);
  if (i instanceof hu || (i = su(i)), !i) return new Xl();
  if (i instanceof Xl) return i;
  i = i.rgb();
  var f = i.r / 255, o = i.g / 255, c = i.b / 255, h = Math.min(f, o, c), y = Math.max(f, o, c), v = NaN, m = y - h, S = (y + h) / 2;
  return m ? (f === y ? v = (o - c) / m + (o < c) * 6 : o === y ? v = (c - f) / m + 2 : v = (f - o) / m + 4, m /= S < 0.5 ? y + h : 2 - y - h, v *= 60) : m = S > 0 && S < 1 ? 0 : v, new Xl(v, m, S, i.opacity);
}
function vy(i, f, o, c) {
  return arguments.length === 1 ? Ed(i) : new Xl(i, f, o, c ?? 1);
}
function Xl(i, f, o, c) {
  this.h = +i, this.s = +f, this.l = +o, this.opacity = +c;
}
ar(Xl, vy, bd(hu, {
  brighter(i) {
    return i = i == null ? Wi : Math.pow(Wi, i), new Xl(this.h, this.s, this.l * i, this.opacity);
  },
  darker(i) {
    return i = i == null ? ru : Math.pow(ru, i), new Xl(this.h, this.s, this.l * i, this.opacity);
  },
  rgb() {
    var i = this.h % 360 + (this.h < 0) * 360, f = isNaN(i) || isNaN(this.s) ? 0 : this.s, o = this.l, c = o + (o < 0.5 ? o : 1 - o) * f, h = 2 * o - c;
    return new vl(
      _0(i >= 240 ? i - 240 : i + 120, h, c),
      _0(i, h, c),
      _0(i < 120 ? i + 240 : i - 120, h, c),
      this.opacity
    );
  },
  clamp() {
    return new Xl(Lh(this.h), qi(this.s), qi(this.l), Fi(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const i = Fi(this.opacity);
    return `${i === 1 ? "hsl(" : "hsla("}${Lh(this.h)}, ${qi(this.s) * 100}%, ${qi(this.l) * 100}%${i === 1 ? ")" : `, ${i})`}`;
  }
}));
function Lh(i) {
  return i = (i || 0) % 360, i < 0 ? i + 360 : i;
}
function qi(i) {
  return Math.max(0, Math.min(1, i || 0));
}
function _0(i, f, o) {
  return (i < 60 ? f + (o - f) * i / 60 : i < 180 ? o : i < 240 ? f + (o - f) * (240 - i) / 60 : f) * 255;
}
const ur = (i) => () => i;
function yy(i, f) {
  return function(o) {
    return i + o * f;
  };
}
function gy(i, f, o) {
  return i = Math.pow(i, o), f = Math.pow(f, o) - i, o = 1 / o, function(c) {
    return Math.pow(i + c * f, o);
  };
}
function py(i) {
  return (i = +i) == 1 ? Ad : function(f, o) {
    return o - f ? gy(f, o, i) : ur(isNaN(f) ? o : f);
  };
}
function Ad(i, f) {
  var o = f - i;
  return o ? yy(i, o) : ur(isNaN(i) ? f : i);
}
const Gh = (function i(f) {
  var o = py(f);
  function c(h, y) {
    var v = o((h = W0(h)).r, (y = W0(y)).r), m = o(h.g, y.g), S = o(h.b, y.b), d = Ad(h.opacity, y.opacity);
    return function(b) {
      return h.r = v(b), h.g = m(b), h.b = S(b), h.opacity = d(b), h + "";
    };
  }
  return c.gamma = i, c;
})(1);
function Sy(i, f) {
  f || (f = []);
  var o = i ? Math.min(f.length, i.length) : 0, c = f.slice(), h;
  return function(y) {
    for (h = 0; h < o; ++h) c[h] = i[h] * (1 - y) + f[h] * y;
    return c;
  };
}
function by(i) {
  return ArrayBuffer.isView(i) && !(i instanceof DataView);
}
function Ey(i, f) {
  var o = f ? f.length : 0, c = i ? Math.min(o, i.length) : 0, h = new Array(c), y = new Array(o), v;
  for (v = 0; v < c; ++v) h[v] = ir(i[v], f[v]);
  for (; v < o; ++v) y[v] = f[v];
  return function(m) {
    for (v = 0; v < c; ++v) y[v] = h[v](m);
    return y;
  };
}
function Ay(i, f) {
  var o = /* @__PURE__ */ new Date();
  return i = +i, f = +f, function(c) {
    return o.setTime(i * (1 - c) + f * c), o;
  };
}
function ki(i, f) {
  return i = +i, f = +f, function(o) {
    return i * (1 - o) + f * o;
  };
}
function My(i, f) {
  var o = {}, c = {}, h;
  (i === null || typeof i != "object") && (i = {}), (f === null || typeof f != "object") && (f = {});
  for (h in f)
    h in i ? o[h] = ir(i[h], f[h]) : c[h] = f[h];
  return function(y) {
    for (h in o) c[h] = o[h](y);
    return c;
  };
}
var F0 = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, N0 = new RegExp(F0.source, "g");
function zy(i) {
  return function() {
    return i;
  };
}
function xy(i) {
  return function(f) {
    return i(f) + "";
  };
}
function Ty(i, f) {
  var o = F0.lastIndex = N0.lastIndex = 0, c, h, y, v = -1, m = [], S = [];
  for (i = i + "", f = f + ""; (c = F0.exec(i)) && (h = N0.exec(f)); )
    (y = h.index) > o && (y = f.slice(o, y), m[v] ? m[v] += y : m[++v] = y), (c = c[0]) === (h = h[0]) ? m[v] ? m[v] += h : m[++v] = h : (m[++v] = null, S.push({ i: v, x: ki(c, h) })), o = N0.lastIndex;
  return o < f.length && (y = f.slice(o), m[v] ? m[v] += y : m[++v] = y), m.length < 2 ? S[0] ? xy(S[0].x) : zy(f) : (f = S.length, function(d) {
    for (var b = 0, p; b < f; ++b) m[(p = S[b]).i] = p.x(d);
    return m.join("");
  });
}
function ir(i, f) {
  var o = typeof f, c;
  return f == null || o === "boolean" ? ur(f) : (o === "number" ? ki : o === "string" ? (c = su(f)) ? (f = c, Gh) : Ty : f instanceof su ? Gh : f instanceof Date ? Ay : by(f) ? Sy : Array.isArray(f) ? Ey : typeof f.valueOf != "function" && typeof f.toString != "function" || isNaN(f) ? My : ki)(i, f);
}
function _y(i, f) {
  return i = +i, f = +f, function(o) {
    return Math.round(i * (1 - o) + f * o);
  };
}
function Ny(i) {
  return function() {
    return i;
  };
}
function Oy(i) {
  return +i;
}
var Xh = [0, 1];
function ta(i) {
  return i;
}
function k0(i, f) {
  return (f -= i = +i) ? function(o) {
    return (o - i) / f;
  } : Ny(isNaN(f) ? NaN : 0.5);
}
function Hy(i, f) {
  var o;
  return i > f && (o = i, i = f, f = o), function(c) {
    return Math.max(i, Math.min(f, c));
  };
}
function Dy(i, f, o) {
  var c = i[0], h = i[1], y = f[0], v = f[1];
  return h < c ? (c = k0(h, c), y = o(v, y)) : (c = k0(c, h), y = o(y, v)), function(m) {
    return y(c(m));
  };
}
function Uy(i, f, o) {
  var c = Math.min(i.length, f.length) - 1, h = new Array(c), y = new Array(c), v = -1;
  for (i[c] < i[0] && (i = i.slice().reverse(), f = f.slice().reverse()); ++v < c; )
    h[v] = k0(i[v], i[v + 1]), y[v] = o(f[v], f[v + 1]);
  return function(m) {
    var S = rv(i, m, 1, c) - 1;
    return y[S](h[S](m));
  };
}
function Ry(i, f) {
  return f.domain(i.domain()).range(i.range()).interpolate(i.interpolate()).clamp(i.clamp()).unknown(i.unknown());
}
function jy() {
  var i = Xh, f = Xh, o = ir, c, h, y, v = ta, m, S, d;
  function b() {
    var z = Math.min(i.length, f.length);
    return v !== ta && (v = Hy(i[0], i[z - 1])), m = z > 2 ? Uy : Dy, S = d = null, p;
  }
  function p(z) {
    return z == null || isNaN(z = +z) ? y : (S || (S = m(i.map(c), f, o)))(c(v(z)));
  }
  return p.invert = function(z) {
    return v(h((d || (d = m(f, i.map(c), ki)))(z)));
  }, p.domain = function(z) {
    return arguments.length ? (i = Array.from(z, Oy), b()) : i.slice();
  }, p.range = function(z) {
    return arguments.length ? (f = Array.from(z), b()) : f.slice();
  }, p.rangeRound = function(z) {
    return f = Array.from(z), o = _y, b();
  }, p.clamp = function(z) {
    return arguments.length ? (v = z ? !0 : ta, b()) : v !== ta;
  }, p.interpolate = function(z) {
    return arguments.length ? (o = z, b()) : o;
  }, p.unknown = function(z) {
    return arguments.length ? (y = z, p) : y;
  }, function(z, Z) {
    return c = z, h = Z, b();
  };
}
function Cy() {
  return jy()(ta, ta);
}
function qy(i) {
  return Math.abs(i = Math.round(i)) >= 1e21 ? i.toLocaleString("en").replace(/,/g, "") : i.toString(10);
}
function Ii(i, f) {
  if (!isFinite(i) || i === 0) return null;
  var o = (i = f ? i.toExponential(f - 1) : i.toExponential()).indexOf("e"), c = i.slice(0, o);
  return [
    c.length > 1 ? c[0] + c.slice(2) : c,
    +i.slice(o + 1)
  ];
}
function aa(i) {
  return i = Ii(Math.abs(i)), i ? i[1] : NaN;
}
function By(i, f) {
  return function(o, c) {
    for (var h = o.length, y = [], v = 0, m = i[0], S = 0; h > 0 && m > 0 && (S + m + 1 > c && (m = Math.max(1, c - S)), y.push(o.substring(h -= m, h + m)), !((S += m + 1) > c)); )
      m = i[v = (v + 1) % i.length];
    return y.reverse().join(f);
  };
}
function Zy(i) {
  return function(f) {
    return f.replace(/[0-9]/g, function(o) {
      return i[+o];
    });
  };
}
var Yy = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Pi(i) {
  if (!(f = Yy.exec(i))) throw new Error("invalid format: " + i);
  var f;
  return new fr({
    fill: f[1],
    align: f[2],
    sign: f[3],
    symbol: f[4],
    zero: f[5],
    width: f[6],
    comma: f[7],
    precision: f[8] && f[8].slice(1),
    trim: f[9],
    type: f[10]
  });
}
Pi.prototype = fr.prototype;
function fr(i) {
  this.fill = i.fill === void 0 ? " " : i.fill + "", this.align = i.align === void 0 ? ">" : i.align + "", this.sign = i.sign === void 0 ? "-" : i.sign + "", this.symbol = i.symbol === void 0 ? "" : i.symbol + "", this.zero = !!i.zero, this.width = i.width === void 0 ? void 0 : +i.width, this.comma = !!i.comma, this.precision = i.precision === void 0 ? void 0 : +i.precision, this.trim = !!i.trim, this.type = i.type === void 0 ? "" : i.type + "";
}
fr.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function Ly(i) {
  t: for (var f = i.length, o = 1, c = -1, h; o < f; ++o)
    switch (i[o]) {
      case ".":
        c = h = o;
        break;
      case "0":
        c === 0 && (c = o), h = o;
        break;
      default:
        if (!+i[o]) break t;
        c > 0 && (c = 0);
        break;
    }
  return c > 0 ? i.slice(0, c) + i.slice(h + 1) : i;
}
var tf;
function Gy(i, f) {
  var o = Ii(i, f);
  if (!o) return tf = void 0, i.toPrecision(f);
  var c = o[0], h = o[1], y = h - (tf = Math.max(-8, Math.min(8, Math.floor(h / 3))) * 3) + 1, v = c.length;
  return y === v ? c : y > v ? c + new Array(y - v + 1).join("0") : y > 0 ? c.slice(0, y) + "." + c.slice(y) : "0." + new Array(1 - y).join("0") + Ii(i, Math.max(0, f + y - 1))[0];
}
function Vh(i, f) {
  var o = Ii(i, f);
  if (!o) return i + "";
  var c = o[0], h = o[1];
  return h < 0 ? "0." + new Array(-h).join("0") + c : c.length > h + 1 ? c.slice(0, h + 1) + "." + c.slice(h + 1) : c + new Array(h - c.length + 2).join("0");
}
const Qh = {
  "%": (i, f) => (i * 100).toFixed(f),
  b: (i) => Math.round(i).toString(2),
  c: (i) => i + "",
  d: qy,
  e: (i, f) => i.toExponential(f),
  f: (i, f) => i.toFixed(f),
  g: (i, f) => i.toPrecision(f),
  o: (i) => Math.round(i).toString(8),
  p: (i, f) => Vh(i * 100, f),
  r: Vh,
  s: Gy,
  X: (i) => Math.round(i).toString(16).toUpperCase(),
  x: (i) => Math.round(i).toString(16)
};
function Kh(i) {
  return i;
}
var wh = Array.prototype.map, Jh = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function Xy(i) {
  var f = i.grouping === void 0 || i.thousands === void 0 ? Kh : By(wh.call(i.grouping, Number), i.thousands + ""), o = i.currency === void 0 ? "" : i.currency[0] + "", c = i.currency === void 0 ? "" : i.currency[1] + "", h = i.decimal === void 0 ? "." : i.decimal + "", y = i.numerals === void 0 ? Kh : Zy(wh.call(i.numerals, String)), v = i.percent === void 0 ? "%" : i.percent + "", m = i.minus === void 0 ? "−" : i.minus + "", S = i.nan === void 0 ? "NaN" : i.nan + "";
  function d(p, z) {
    p = Pi(p);
    var Z = p.fill, Y = p.align, C = p.sign, L = p.symbol, k = p.zero, w = p.width, F = p.comma, V = p.precision, et = p.trim, J = p.type;
    J === "n" ? (F = !0, J = "g") : Qh[J] || (V === void 0 && (V = 12), et = !0, J = "g"), (k || Z === "0" && Y === "=") && (k = !0, Z = "0", Y = "=");
    var $ = (z && z.prefix !== void 0 ? z.prefix : "") + (L === "$" ? o : L === "#" && /[boxX]/.test(J) ? "0" + J.toLowerCase() : ""), it = (L === "$" ? c : /[%p]/.test(J) ? v : "") + (z && z.suffix !== void 0 ? z.suffix : ""), ct = Qh[J], Et = /[defgprs%]/.test(J);
    V = V === void 0 ? 6 : /[gprs]/.test(J) ? Math.max(1, Math.min(21, V)) : Math.max(0, Math.min(20, V));
    function tt(I) {
      var dt = $, at = it, B, x, G;
      if (J === "c")
        at = ct(I) + at, I = "";
      else {
        I = +I;
        var Q = I < 0 || 1 / I < 0;
        if (I = isNaN(I) ? S : ct(Math.abs(I), V), et && (I = Ly(I)), Q && +I == 0 && C !== "+" && (Q = !1), dt = (Q ? C === "(" ? C : m : C === "-" || C === "(" ? "" : C) + dt, at = (J === "s" && !isNaN(I) && tf !== void 0 ? Jh[8 + tf / 3] : "") + at + (Q && C === "(" ? ")" : ""), Et) {
          for (B = -1, x = I.length; ++B < x; )
            if (G = I.charCodeAt(B), 48 > G || G > 57) {
              at = (G === 46 ? h + I.slice(B + 1) : I.slice(B)) + at, I = I.slice(0, B);
              break;
            }
        }
      }
      F && !k && (I = f(I, 1 / 0));
      var ft = dt.length + I.length + at.length, ot = ft < w ? new Array(w - ft + 1).join(Z) : "";
      switch (F && k && (I = f(ot + I, ot.length ? w - at.length : 1 / 0), ot = ""), Y) {
        case "<":
          I = dt + I + at + ot;
          break;
        case "=":
          I = dt + ot + I + at;
          break;
        case "^":
          I = ot.slice(0, ft = ot.length >> 1) + dt + I + at + ot.slice(ft);
          break;
        default:
          I = ot + dt + I + at;
          break;
      }
      return y(I);
    }
    return tt.toString = function() {
      return p + "";
    }, tt;
  }
  function b(p, z) {
    var Z = Math.max(-8, Math.min(8, Math.floor(aa(z) / 3))) * 3, Y = Math.pow(10, -Z), C = d((p = Pi(p), p.type = "f", p), { suffix: Jh[8 + Z / 3] });
    return function(L) {
      return C(Y * L);
    };
  }
  return {
    format: d,
    formatPrefix: b
  };
}
var Bi, Md, zd;
Vy({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function Vy(i) {
  return Bi = Xy(i), Md = Bi.format, zd = Bi.formatPrefix, Bi;
}
function Qy(i) {
  return Math.max(0, -aa(Math.abs(i)));
}
function Ky(i, f) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(aa(f) / 3))) * 3 - aa(Math.abs(i)));
}
function wy(i, f) {
  return i = Math.abs(i), f = Math.abs(f) - i, Math.max(0, aa(f) - aa(i)) + 1;
}
function Jy(i, f, o, c) {
  var h = mv(i, f, o), y;
  switch (c = Pi(c ?? ",f"), c.type) {
    case "s": {
      var v = Math.max(Math.abs(i), Math.abs(f));
      return c.precision == null && !isNaN(y = Ky(h, v)) && (c.precision = y), zd(c, v);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      c.precision == null && !isNaN(y = wy(h, Math.max(Math.abs(i), Math.abs(f)))) && (c.precision = y - (c.type === "e"));
      break;
    }
    case "f":
    case "%": {
      c.precision == null && !isNaN(y = Qy(h)) && (c.precision = y - (c.type === "%") * 2);
      break;
    }
  }
  return Md(c);
}
function $y(i) {
  var f = i.domain;
  return i.ticks = function(o) {
    var c = f();
    return dv(c[0], c[c.length - 1], o ?? 10);
  }, i.tickFormat = function(o, c) {
    var h = f();
    return Jy(h[0], h[h.length - 1], o ?? 10, c);
  }, i.nice = function(o) {
    o == null && (o = 10);
    var c = f(), h = 0, y = c.length - 1, v = c[h], m = c[y], S, d, b = 10;
    for (m < v && (d = v, v = m, m = d, d = h, h = y, y = d); b-- > 0; ) {
      if (d = R0(v, m, o), d === S)
        return c[h] = v, c[y] = m, f(c);
      if (d > 0)
        v = Math.floor(v / d) * d, m = Math.ceil(m / d) * d;
      else if (d < 0)
        v = Math.ceil(v * d) / d, m = Math.floor(m * d) / d;
      else
        break;
      S = d;
    }
    return i;
  }, i;
}
function lf() {
  var i = Cy();
  return i.copy = function() {
    return Ry(i, lf());
  }, ny.apply(i, arguments), $y(i);
}
const Wy = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M228,128a100,100,0,0,1-98.66,100H128a99.39,99.39,0,0,1-68.62-27.29,12,12,0,0,1,16.48-17.45,76,76,0,1,0-1.57-109c-.13.13-.25.25-.39.37L54.89,92H72a12,12,0,0,1,0,24H24a12,12,0,0,1-12-12V56a12,12,0,0,1,24,0V76.72L57.48,57.06A100,100,0,0,1,228,128Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M216,128a88,88,0,1,1-88-88A88,88,0,0,1,216,128Z", opacity: "0.2" }), /* @__PURE__ */ O.createElement("path", { d: "M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L44.59,96H72a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V56a8,8,0,0,1,16,0V85.8L60.25,60A96,96,0,0,1,224,128Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L60.63,81.29l17,17A8,8,0,0,1,72,112H24a8,8,0,0,1-8-8V56A8,8,0,0,1,29.66,50.3L49.31,70,60.25,60A96,96,0,0,1,224,128Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M222,128a94,94,0,0,1-92.74,94H128a93.43,93.43,0,0,1-64.5-25.65,6,6,0,1,1,8.24-8.72A82,82,0,1,0,70,70l-.19.19L39.44,98H72a6,6,0,0,1,0,12H24a6,6,0,0,1-6-6V56a6,6,0,0,1,12,0V90.34L61.63,61.4A94,94,0,0,1,222,128Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L44.59,96H72a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V56a8,8,0,0,1,16,0V85.8L60.25,60A96,96,0,0,1,224,128Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M220,128a92,92,0,0,1-90.77,92H128a91.47,91.47,0,0,1-63.13-25.1,4,4,0,1,1,5.5-5.82A84,84,0,1,0,68.6,68.57l-.13.12L34.3,100H72a4,4,0,0,1,0,8H24a4,4,0,0,1-4-4V56a4,4,0,0,1,8,0V94.89l35-32A92,92,0,0,1,220,128Z" }))
  ]
]), Fy = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M216,128l-72,72V56Z", opacity: "0.2" }), /* @__PURE__ */ O.createElement("path", { d: "M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M221.66,133.66l-72,72A8,8,0,0,1,136,200V136H40a8,8,0,0,1,0-16h96V56a8,8,0,0,1,13.66-5.66l72,72A8,8,0,0,1,221.66,133.66Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M220.24,132.24l-72,72a6,6,0,0,1-8.48-8.48L201.51,134H40a6,6,0,0,1,0-12H201.51L139.76,60.24a6,6,0,0,1,8.48-8.48l72,72A6,6,0,0,1,220.24,132.24Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M218.83,130.83l-72,72a4,4,0,0,1-5.66-5.66L206.34,132H40a4,4,0,0,1,0-8H206.34L141.17,58.83a4,4,0,0,1,5.66-5.66l72,72A4,4,0,0,1,218.83,130.83Z" }))
  ]
]), ky = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M228,144v64a12,12,0,0,1-12,12H40a12,12,0,0,1-12-12V144a12,12,0,0,1,24,0v52H204V144a12,12,0,0,1,24,0Zm-108.49,8.49a12,12,0,0,0,17,0l40-40a12,12,0,0,0-17-17L140,115V32a12,12,0,0,0-24,0v83L96.49,95.51a12,12,0,0,0-17,17Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement(
      "path",
      {
        d: "M216,48V208H40V48A16,16,0,0,1,56,32H200A16,16,0,0,1,216,48Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ O.createElement("path", { d: "M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,124.69V32a8,8,0,0,0-16,0v92.69L93.66,98.34a8,8,0,0,0-11.32,11.32Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40A8,8,0,0,0,168,96H136V32a8,8,0,0,0-16,0V96H88a8,8,0,0,0-5.66,13.66Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M222,144v64a6,6,0,0,1-6,6H40a6,6,0,0,1-6-6V144a6,6,0,0,1,12,0v58H210V144a6,6,0,0,1,12,0Zm-98.24,4.24a6,6,0,0,0,8.48,0l40-40a6,6,0,0,0-8.48-8.48L134,129.51V32a6,6,0,0,0-12,0v97.51L92.24,99.76a6,6,0,0,0-8.48,8.48Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,124.69V32a8,8,0,0,0-16,0v92.69L93.66,98.34a8,8,0,0,0-11.32,11.32Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M220,144v64a4,4,0,0,1-4,4H40a4,4,0,0,1-4-4V144a4,4,0,0,1,8,0v60H212V144a4,4,0,0,1,8,0Zm-94.83,2.83a4,4,0,0,0,5.66,0l40-40a4,4,0,1,0-5.66-5.66L132,134.34V32a4,4,0,0,0-8,0V134.34L90.83,101.17a4,4,0,0,0-5.66,5.66Z" }))
  ]
]), Iy = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement(
      "path",
      {
        d: "M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ O.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,136H72a8,8,0,0,1,0-16H184a8,8,0,0,1,0,16Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M222,128a6,6,0,0,1-6,6H40a6,6,0,0,1,0-12H216A6,6,0,0,1,222,128Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M220,128a4,4,0,0,1-4,4H40a4,4,0,0,1,0-8H216A4,4,0,0,1,220,128Z" }))
  ]
]), Py = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement(
      "path",
      {
        d: "M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ O.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,136H136v48a8,8,0,0,1-16,0V136H72a8,8,0,0,1,0-16h48V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M222,128a6,6,0,0,1-6,6H134v82a6,6,0,0,1-12,0V134H40a6,6,0,0,1,0-12h82V40a6,6,0,0,1,12,0v82h82A6,6,0,0,1,222,128Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M220,128a4,4,0,0,1-4,4H132v84a4,4,0,0,1-8,0V132H40a4,4,0,0,1,0-8h84V40a4,4,0,0,1,8,0v84h84A4,4,0,0,1,220,128Z" }))
  ]
]), tg = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement(
      "path",
      {
        d: "M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ O.createElement("path", { d: "M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM181.66,170.34a8,8,0,0,1-11.32,11.32L128,139.31,85.66,181.66a8,8,0,0,1-11.32-11.32L116.69,128,74.34,85.66A8,8,0,0,1,85.66,74.34L128,116.69l42.34-42.35a8,8,0,0,1,11.32,11.32L139.31,128Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M204.24,195.76a6,6,0,1,1-8.48,8.48L128,136.49,60.24,204.24a6,6,0,0,1-8.48-8.48L119.51,128,51.76,60.24a6,6,0,0,1,8.48-8.48L128,119.51l67.76-67.75a6,6,0,0,1,8.48,8.48L136.49,128Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("path", { d: "M202.83,197.17a4,4,0,0,1-5.66,5.66L128,133.66,58.83,202.83a4,4,0,0,1-5.66-5.66L122.34,128,53.17,58.83a4,4,0,0,1,5.66-5.66L128,122.34l69.17-69.17a4,4,0,1,1,5.66,5.66L133.66,128Z" }))
  ]
]), lg = O.createContext({
  color: "currentColor",
  size: "1em",
  weight: "regular",
  mirrored: !1
}), hn = O.forwardRef(
  (i, f) => {
    const {
      alt: o,
      color: c,
      size: h,
      weight: y,
      mirrored: v,
      children: m,
      weights: S,
      ...d
    } = i, {
      color: b = "currentColor",
      size: p,
      weight: z = "regular",
      mirrored: Z = !1,
      ...Y
    } = O.useContext(lg);
    return /* @__PURE__ */ O.createElement(
      "svg",
      {
        ref: f,
        xmlns: "http://www.w3.org/2000/svg",
        width: h ?? p,
        height: h ?? p,
        fill: c ?? b,
        viewBox: "0 0 256 256",
        transform: v || Z ? "scale(-1, 1)" : void 0,
        ...Y,
        ...d
      },
      !!o && /* @__PURE__ */ O.createElement("title", null, o),
      m,
      S.get(y ?? z)
    );
  }
);
hn.displayName = "IconBase";
const xd = O.forwardRef((i, f) => /* @__PURE__ */ O.createElement(hn, { ref: f, ...i, weights: Wy }));
xd.displayName = "ArrowCounterClockwiseIcon";
const eg = xd, Td = O.forwardRef((i, f) => /* @__PURE__ */ O.createElement(hn, { ref: f, ...i, weights: Fy }));
Td.displayName = "ArrowRightIcon";
const ng = Td, _d = O.forwardRef((i, f) => /* @__PURE__ */ O.createElement(hn, { ref: f, ...i, weights: ky }));
_d.displayName = "DownloadSimpleIcon";
const ag = _d, Nd = O.forwardRef((i, f) => /* @__PURE__ */ O.createElement(hn, { ref: f, ...i, weights: Iy }));
Nd.displayName = "MinusIcon";
const ug = Nd, Od = O.forwardRef((i, f) => /* @__PURE__ */ O.createElement(hn, { ref: f, ...i, weights: Py }));
Od.displayName = "PlusIcon";
const ig = Od, Hd = O.forwardRef((i, f) => /* @__PURE__ */ O.createElement(hn, { ref: f, ...i, weights: tg }));
Hd.displayName = "XIcon";
const fg = Hd;
var O0 = { exports: {} }, Pa = {}, H0 = { exports: {} }, D0 = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $h;
function cg() {
  return $h || ($h = 1, (function(i) {
    function f(x, G) {
      var Q = x.length;
      x.push(G);
      t: for (; 0 < Q; ) {
        var ft = Q - 1 >>> 1, ot = x[ft];
        if (0 < h(ot, G))
          x[ft] = G, x[Q] = ot, Q = ft;
        else break t;
      }
    }
    function o(x) {
      return x.length === 0 ? null : x[0];
    }
    function c(x) {
      if (x.length === 0) return null;
      var G = x[0], Q = x.pop();
      if (Q !== G) {
        x[0] = Q;
        t: for (var ft = 0, ot = x.length, E = ot >>> 1; ft < E; ) {
          var U = 2 * (ft + 1) - 1, X = x[U], K = U + 1, ut = x[K];
          if (0 > h(X, Q))
            K < ot && 0 > h(ut, X) ? (x[ft] = ut, x[K] = Q, ft = K) : (x[ft] = X, x[U] = Q, ft = U);
          else if (K < ot && 0 > h(ut, Q))
            x[ft] = ut, x[K] = Q, ft = K;
          else break t;
        }
      }
      return G;
    }
    function h(x, G) {
      var Q = x.sortIndex - G.sortIndex;
      return Q !== 0 ? Q : x.id - G.id;
    }
    if (i.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var y = performance;
      i.unstable_now = function() {
        return y.now();
      };
    } else {
      var v = Date, m = v.now();
      i.unstable_now = function() {
        return v.now() - m;
      };
    }
    var S = [], d = [], b = 1, p = null, z = 3, Z = !1, Y = !1, C = !1, L = !1, k = typeof setTimeout == "function" ? setTimeout : null, w = typeof clearTimeout == "function" ? clearTimeout : null, F = typeof setImmediate < "u" ? setImmediate : null;
    function V(x) {
      for (var G = o(d); G !== null; ) {
        if (G.callback === null) c(d);
        else if (G.startTime <= x)
          c(d), G.sortIndex = G.expirationTime, f(S, G);
        else break;
        G = o(d);
      }
    }
    function et(x) {
      if (C = !1, V(x), !Y)
        if (o(S) !== null)
          Y = !0, J || (J = !0, I());
        else {
          var G = o(d);
          G !== null && B(et, G.startTime - x);
        }
    }
    var J = !1, $ = -1, it = 5, ct = -1;
    function Et() {
      return L ? !0 : !(i.unstable_now() - ct < it);
    }
    function tt() {
      if (L = !1, J) {
        var x = i.unstable_now();
        ct = x;
        var G = !0;
        try {
          t: {
            Y = !1, C && (C = !1, w($), $ = -1), Z = !0;
            var Q = z;
            try {
              l: {
                for (V(x), p = o(S); p !== null && !(p.expirationTime > x && Et()); ) {
                  var ft = p.callback;
                  if (typeof ft == "function") {
                    p.callback = null, z = p.priorityLevel;
                    var ot = ft(
                      p.expirationTime <= x
                    );
                    if (x = i.unstable_now(), typeof ot == "function") {
                      p.callback = ot, V(x), G = !0;
                      break l;
                    }
                    p === o(S) && c(S), V(x);
                  } else c(S);
                  p = o(S);
                }
                if (p !== null) G = !0;
                else {
                  var E = o(d);
                  E !== null && B(
                    et,
                    E.startTime - x
                  ), G = !1;
                }
              }
              break t;
            } finally {
              p = null, z = Q, Z = !1;
            }
            G = void 0;
          }
        } finally {
          G ? I() : J = !1;
        }
      }
    }
    var I;
    if (typeof F == "function")
      I = function() {
        F(tt);
      };
    else if (typeof MessageChannel < "u") {
      var dt = new MessageChannel(), at = dt.port2;
      dt.port1.onmessage = tt, I = function() {
        at.postMessage(null);
      };
    } else
      I = function() {
        k(tt, 0);
      };
    function B(x, G) {
      $ = k(function() {
        x(i.unstable_now());
      }, G);
    }
    i.unstable_IdlePriority = 5, i.unstable_ImmediatePriority = 1, i.unstable_LowPriority = 4, i.unstable_NormalPriority = 3, i.unstable_Profiling = null, i.unstable_UserBlockingPriority = 2, i.unstable_cancelCallback = function(x) {
      x.callback = null;
    }, i.unstable_forceFrameRate = function(x) {
      0 > x || 125 < x ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : it = 0 < x ? Math.floor(1e3 / x) : 5;
    }, i.unstable_getCurrentPriorityLevel = function() {
      return z;
    }, i.unstable_next = function(x) {
      switch (z) {
        case 1:
        case 2:
        case 3:
          var G = 3;
          break;
        default:
          G = z;
      }
      var Q = z;
      z = G;
      try {
        return x();
      } finally {
        z = Q;
      }
    }, i.unstable_requestPaint = function() {
      L = !0;
    }, i.unstable_runWithPriority = function(x, G) {
      switch (x) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          x = 3;
      }
      var Q = z;
      z = x;
      try {
        return G();
      } finally {
        z = Q;
      }
    }, i.unstable_scheduleCallback = function(x, G, Q) {
      var ft = i.unstable_now();
      switch (typeof Q == "object" && Q !== null ? (Q = Q.delay, Q = typeof Q == "number" && 0 < Q ? ft + Q : ft) : Q = ft, x) {
        case 1:
          var ot = -1;
          break;
        case 2:
          ot = 250;
          break;
        case 5:
          ot = 1073741823;
          break;
        case 4:
          ot = 1e4;
          break;
        default:
          ot = 5e3;
      }
      return ot = Q + ot, x = {
        id: b++,
        callback: G,
        priorityLevel: x,
        startTime: Q,
        expirationTime: ot,
        sortIndex: -1
      }, Q > ft ? (x.sortIndex = Q, f(d, x), o(S) === null && x === o(d) && (C ? (w($), $ = -1) : C = !0, B(et, Q - ft))) : (x.sortIndex = ot, f(S, x), Y || Z || (Y = !0, J || (J = !0, I()))), x;
    }, i.unstable_shouldYield = Et, i.unstable_wrapCallback = function(x) {
      var G = z;
      return function() {
        var Q = z;
        z = G;
        try {
          return x.apply(this, arguments);
        } finally {
          z = Q;
        }
      };
    };
  })(D0)), D0;
}
var Wh;
function rg() {
  return Wh || (Wh = 1, H0.exports = cg()), H0.exports;
}
var U0 = { exports: {} }, nl = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fh;
function og() {
  if (Fh) return nl;
  Fh = 1;
  var i = P0();
  function f(S) {
    var d = "https://react.dev/errors/" + S;
    if (1 < arguments.length) {
      d += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        d += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + S + "; visit " + d + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var c = {
    d: {
      f: o,
      r: function() {
        throw Error(f(522));
      },
      D: o,
      C: o,
      L: o,
      m: o,
      X: o,
      S: o,
      M: o
    },
    p: 0,
    findDOMNode: null
  }, h = Symbol.for("react.portal");
  function y(S, d, b) {
    var p = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: h,
      key: p == null ? null : "" + p,
      children: S,
      containerInfo: d,
      implementation: b
    };
  }
  var v = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(S, d) {
    if (S === "font") return "";
    if (typeof d == "string")
      return d === "use-credentials" ? d : "";
  }
  return nl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c, nl.createPortal = function(S, d) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!d || d.nodeType !== 1 && d.nodeType !== 9 && d.nodeType !== 11)
      throw Error(f(299));
    return y(S, d, null, b);
  }, nl.flushSync = function(S) {
    var d = v.T, b = c.p;
    try {
      if (v.T = null, c.p = 2, S) return S();
    } finally {
      v.T = d, c.p = b, c.d.f();
    }
  }, nl.preconnect = function(S, d) {
    typeof S == "string" && (d ? (d = d.crossOrigin, d = typeof d == "string" ? d === "use-credentials" ? d : "" : void 0) : d = null, c.d.C(S, d));
  }, nl.prefetchDNS = function(S) {
    typeof S == "string" && c.d.D(S);
  }, nl.preinit = function(S, d) {
    if (typeof S == "string" && d && typeof d.as == "string") {
      var b = d.as, p = m(b, d.crossOrigin), z = typeof d.integrity == "string" ? d.integrity : void 0, Z = typeof d.fetchPriority == "string" ? d.fetchPriority : void 0;
      b === "style" ? c.d.S(
        S,
        typeof d.precedence == "string" ? d.precedence : void 0,
        {
          crossOrigin: p,
          integrity: z,
          fetchPriority: Z
        }
      ) : b === "script" && c.d.X(S, {
        crossOrigin: p,
        integrity: z,
        fetchPriority: Z,
        nonce: typeof d.nonce == "string" ? d.nonce : void 0
      });
    }
  }, nl.preinitModule = function(S, d) {
    if (typeof S == "string")
      if (typeof d == "object" && d !== null) {
        if (d.as == null || d.as === "script") {
          var b = m(
            d.as,
            d.crossOrigin
          );
          c.d.M(S, {
            crossOrigin: b,
            integrity: typeof d.integrity == "string" ? d.integrity : void 0,
            nonce: typeof d.nonce == "string" ? d.nonce : void 0
          });
        }
      } else d == null && c.d.M(S);
  }, nl.preload = function(S, d) {
    if (typeof S == "string" && typeof d == "object" && d !== null && typeof d.as == "string") {
      var b = d.as, p = m(b, d.crossOrigin);
      c.d.L(S, b, {
        crossOrigin: p,
        integrity: typeof d.integrity == "string" ? d.integrity : void 0,
        nonce: typeof d.nonce == "string" ? d.nonce : void 0,
        type: typeof d.type == "string" ? d.type : void 0,
        fetchPriority: typeof d.fetchPriority == "string" ? d.fetchPriority : void 0,
        referrerPolicy: typeof d.referrerPolicy == "string" ? d.referrerPolicy : void 0,
        imageSrcSet: typeof d.imageSrcSet == "string" ? d.imageSrcSet : void 0,
        imageSizes: typeof d.imageSizes == "string" ? d.imageSizes : void 0,
        media: typeof d.media == "string" ? d.media : void 0
      });
    }
  }, nl.preloadModule = function(S, d) {
    if (typeof S == "string")
      if (d) {
        var b = m(d.as, d.crossOrigin);
        c.d.m(S, {
          as: typeof d.as == "string" && d.as !== "script" ? d.as : void 0,
          crossOrigin: b,
          integrity: typeof d.integrity == "string" ? d.integrity : void 0
        });
      } else c.d.m(S);
  }, nl.requestFormReset = function(S) {
    c.d.r(S);
  }, nl.unstable_batchedUpdates = function(S, d) {
    return S(d);
  }, nl.useFormState = function(S, d, b) {
    return v.H.useFormState(S, d, b);
  }, nl.useFormStatus = function() {
    return v.H.useHostTransitionStatus();
  }, nl.version = "19.2.0", nl;
}
var kh;
function sg() {
  if (kh) return U0.exports;
  kh = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (f) {
        console.error(f);
      }
  }
  return i(), U0.exports = og(), U0.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ih;
function hg() {
  if (Ih) return Pa;
  Ih = 1;
  var i = rg(), f = P0(), o = sg();
  function c(t) {
    var l = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        l += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + t + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function h(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function y(t) {
    var l = t, e = t;
    if (t.alternate) for (; l.return; ) l = l.return;
    else {
      t = l;
      do
        l = t, (l.flags & 4098) !== 0 && (e = l.return), t = l.return;
      while (t);
    }
    return l.tag === 3 ? e : null;
  }
  function v(t) {
    if (t.tag === 13) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function m(t) {
    if (t.tag === 31) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function S(t) {
    if (y(t) !== t)
      throw Error(c(188));
  }
  function d(t) {
    var l = t.alternate;
    if (!l) {
      if (l = y(t), l === null) throw Error(c(188));
      return l !== t ? null : t;
    }
    for (var e = t, n = l; ; ) {
      var a = e.return;
      if (a === null) break;
      var u = a.alternate;
      if (u === null) {
        if (n = a.return, n !== null) {
          e = n;
          continue;
        }
        break;
      }
      if (a.child === u.child) {
        for (u = a.child; u; ) {
          if (u === e) return S(a), t;
          if (u === n) return S(a), l;
          u = u.sibling;
        }
        throw Error(c(188));
      }
      if (e.return !== n.return) e = a, n = u;
      else {
        for (var r = !1, s = a.child; s; ) {
          if (s === e) {
            r = !0, e = a, n = u;
            break;
          }
          if (s === n) {
            r = !0, n = a, e = u;
            break;
          }
          s = s.sibling;
        }
        if (!r) {
          for (s = u.child; s; ) {
            if (s === e) {
              r = !0, e = u, n = a;
              break;
            }
            if (s === n) {
              r = !0, n = u, e = a;
              break;
            }
            s = s.sibling;
          }
          if (!r) throw Error(c(189));
        }
      }
      if (e.alternate !== n) throw Error(c(190));
    }
    if (e.tag !== 3) throw Error(c(188));
    return e.stateNode.current === e ? t : l;
  }
  function b(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t;
    for (t = t.child; t !== null; ) {
      if (l = b(t), l !== null) return l;
      t = t.sibling;
    }
    return null;
  }
  var p = Object.assign, z = Symbol.for("react.element"), Z = Symbol.for("react.transitional.element"), Y = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), L = Symbol.for("react.strict_mode"), k = Symbol.for("react.profiler"), w = Symbol.for("react.consumer"), F = Symbol.for("react.context"), V = Symbol.for("react.forward_ref"), et = Symbol.for("react.suspense"), J = Symbol.for("react.suspense_list"), $ = Symbol.for("react.memo"), it = Symbol.for("react.lazy"), ct = Symbol.for("react.activity"), Et = Symbol.for("react.memo_cache_sentinel"), tt = Symbol.iterator;
  function I(t) {
    return t === null || typeof t != "object" ? null : (t = tt && t[tt] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var dt = Symbol.for("react.client.reference");
  function at(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === dt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case C:
        return "Fragment";
      case k:
        return "Profiler";
      case L:
        return "StrictMode";
      case et:
        return "Suspense";
      case J:
        return "SuspenseList";
      case ct:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case Y:
          return "Portal";
        case F:
          return t.displayName || "Context";
        case w:
          return (t._context.displayName || "Context") + ".Consumer";
        case V:
          var l = t.render;
          return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case $:
          return l = t.displayName || null, l !== null ? l : at(t.type) || "Memo";
        case it:
          l = t._payload, t = t._init;
          try {
            return at(t(l));
          } catch {
          }
      }
    return null;
  }
  var B = Array.isArray, x = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, G = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ft = [], ot = -1;
  function E(t) {
    return { current: t };
  }
  function U(t) {
    0 > ot || (t.current = ft[ot], ft[ot] = null, ot--);
  }
  function X(t, l) {
    ot++, ft[ot] = t.current, t.current = l;
  }
  var K = E(null), ut = E(null), mt = E(null), xt = E(null);
  function al(t, l) {
    switch (X(mt, l), X(ut, t), X(K, null), l.nodeType) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? Rs(t) : 0;
        break;
      default:
        if (t = l.tagName, l = l.namespaceURI)
          l = Rs(l), t = js(l, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    U(K), X(K, t);
  }
  function Lt() {
    U(K), U(ut), U(mt);
  }
  function ua(t) {
    t.memoizedState !== null && X(xt, t);
    var l = K.current, e = js(l, t.type);
    l !== e && (X(ut, t), X(K, e));
  }
  function du(t) {
    ut.current === t && (U(K), U(ut)), xt.current === t && (U(xt), $a._currentValue = Q);
  }
  var ef, cr;
  function Ge(t) {
    if (ef === void 0)
      try {
        throw Error();
      } catch (e) {
        var l = e.stack.trim().match(/\n( *(at )?)/);
        ef = l && l[1] || "", cr = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ef + t + cr;
  }
  var nf = !1;
  function af(t, l) {
    if (!t || nf) return "";
    nf = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function() {
          try {
            if (l) {
              var q = function() {
                throw Error();
              };
              if (Object.defineProperty(q.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(q, []);
                } catch (H) {
                  var N = H;
                }
                Reflect.construct(t, [], q);
              } else {
                try {
                  q.call();
                } catch (H) {
                  N = H;
                }
                t.call(q.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (H) {
                N = H;
              }
              (q = t()) && typeof q.catch == "function" && q.catch(function() {
              });
            }
          } catch (H) {
            if (H && N && typeof H.stack == "string")
              return [H.stack, N.stack];
          }
          return [null, null];
        }
      };
      n.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var a = Object.getOwnPropertyDescriptor(
        n.DetermineComponentFrameRoot,
        "name"
      );
      a && a.configurable && Object.defineProperty(
        n.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = n.DetermineComponentFrameRoot(), r = u[0], s = u[1];
      if (r && s) {
        var g = r.split(`
`), _ = s.split(`
`);
        for (a = n = 0; n < g.length && !g[n].includes("DetermineComponentFrameRoot"); )
          n++;
        for (; a < _.length && !_[a].includes(
          "DetermineComponentFrameRoot"
        ); )
          a++;
        if (n === g.length || a === _.length)
          for (n = g.length - 1, a = _.length - 1; 1 <= n && 0 <= a && g[n] !== _[a]; )
            a--;
        for (; 1 <= n && 0 <= a; n--, a--)
          if (g[n] !== _[a]) {
            if (n !== 1 || a !== 1)
              do
                if (n--, a--, 0 > a || g[n] !== _[a]) {
                  var D = `
` + g[n].replace(" at new ", " at ");
                  return t.displayName && D.includes("<anonymous>") && (D = D.replace("<anonymous>", t.displayName)), D;
                }
              while (1 <= n && 0 <= a);
            break;
          }
      }
    } finally {
      nf = !1, Error.prepareStackTrace = e;
    }
    return (e = t ? t.displayName || t.name : "") ? Ge(e) : "";
  }
  function Rd(t, l) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Ge(t.type);
      case 16:
        return Ge("Lazy");
      case 13:
        return t.child !== l && l !== null ? Ge("Suspense Fallback") : Ge("Suspense");
      case 19:
        return Ge("SuspenseList");
      case 0:
      case 15:
        return af(t.type, !1);
      case 11:
        return af(t.type.render, !1);
      case 1:
        return af(t.type, !0);
      case 31:
        return Ge("Activity");
      default:
        return "";
    }
  }
  function rr(t) {
    try {
      var l = "", e = null;
      do
        l += Rd(t, e), e = t, t = t.return;
      while (t);
      return l;
    } catch (n) {
      return `
Error generating stack: ` + n.message + `
` + n.stack;
    }
  }
  var uf = Object.prototype.hasOwnProperty, ff = i.unstable_scheduleCallback, cf = i.unstable_cancelCallback, jd = i.unstable_shouldYield, Cd = i.unstable_requestPaint, yl = i.unstable_now, qd = i.unstable_getCurrentPriorityLevel, or = i.unstable_ImmediatePriority, sr = i.unstable_UserBlockingPriority, mu = i.unstable_NormalPriority, Bd = i.unstable_LowPriority, hr = i.unstable_IdlePriority, Zd = i.log, Yd = i.unstable_setDisableYieldValue, ia = null, gl = null;
  function ve(t) {
    if (typeof Zd == "function" && Yd(t), gl && typeof gl.setStrictMode == "function")
      try {
        gl.setStrictMode(ia, t);
      } catch {
      }
  }
  var pl = Math.clz32 ? Math.clz32 : Xd, Ld = Math.log, Gd = Math.LN2;
  function Xd(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Ld(t) / Gd | 0) | 0;
  }
  var vu = 256, yu = 262144, gu = 4194304;
  function Xe(t) {
    var l = t & 42;
    if (l !== 0) return l;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function pu(t, l, e) {
    var n = t.pendingLanes;
    if (n === 0) return 0;
    var a = 0, u = t.suspendedLanes, r = t.pingedLanes;
    t = t.warmLanes;
    var s = n & 134217727;
    return s !== 0 ? (n = s & ~u, n !== 0 ? a = Xe(n) : (r &= s, r !== 0 ? a = Xe(r) : e || (e = s & ~t, e !== 0 && (a = Xe(e))))) : (s = n & ~u, s !== 0 ? a = Xe(s) : r !== 0 ? a = Xe(r) : e || (e = n & ~t, e !== 0 && (a = Xe(e)))), a === 0 ? 0 : l !== 0 && l !== a && (l & u) === 0 && (u = a & -a, e = l & -l, u >= e || u === 32 && (e & 4194048) !== 0) ? l : a;
  }
  function fa(t, l) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
  }
  function Vd(t, l) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return l + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function dr() {
    var t = gu;
    return gu <<= 1, (gu & 62914560) === 0 && (gu = 4194304), t;
  }
  function rf(t) {
    for (var l = [], e = 0; 31 > e; e++) l.push(t);
    return l;
  }
  function ca(t, l) {
    t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Qd(t, l, e, n, a, u) {
    var r = t.pendingLanes;
    t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
    var s = t.entanglements, g = t.expirationTimes, _ = t.hiddenUpdates;
    for (e = r & ~e; 0 < e; ) {
      var D = 31 - pl(e), q = 1 << D;
      s[D] = 0, g[D] = -1;
      var N = _[D];
      if (N !== null)
        for (_[D] = null, D = 0; D < N.length; D++) {
          var H = N[D];
          H !== null && (H.lane &= -536870913);
        }
      e &= ~q;
    }
    n !== 0 && mr(t, n, 0), u !== 0 && a === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(r & ~l));
  }
  function mr(t, l, e) {
    t.pendingLanes |= l, t.suspendedLanes &= ~l;
    var n = 31 - pl(l);
    t.entangledLanes |= l, t.entanglements[n] = t.entanglements[n] | 1073741824 | e & 261930;
  }
  function vr(t, l) {
    var e = t.entangledLanes |= l;
    for (t = t.entanglements; e; ) {
      var n = 31 - pl(e), a = 1 << n;
      a & l | t[n] & l && (t[n] |= l), e &= ~a;
    }
  }
  function yr(t, l) {
    var e = l & -l;
    return e = (e & 42) !== 0 ? 1 : of(e), (e & (t.suspendedLanes | l)) !== 0 ? 0 : e;
  }
  function of(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function sf(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function gr() {
    var t = G.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : nh(t.type));
  }
  function pr(t, l) {
    var e = G.p;
    try {
      return G.p = t, l();
    } finally {
      G.p = e;
    }
  }
  var ye = Math.random().toString(36).slice(2), It = "__reactFiber$" + ye, fl = "__reactProps$" + ye, dn = "__reactContainer$" + ye, hf = "__reactEvents$" + ye, Kd = "__reactListeners$" + ye, wd = "__reactHandles$" + ye, Sr = "__reactResources$" + ye, ra = "__reactMarker$" + ye;
  function df(t) {
    delete t[It], delete t[fl], delete t[hf], delete t[Kd], delete t[wd];
  }
  function mn(t) {
    var l = t[It];
    if (l) return l;
    for (var e = t.parentNode; e; ) {
      if (l = e[dn] || e[It]) {
        if (e = l.alternate, l.child !== null || e !== null && e.child !== null)
          for (t = Gs(t); t !== null; ) {
            if (e = t[It]) return e;
            t = Gs(t);
          }
        return l;
      }
      t = e, e = t.parentNode;
    }
    return null;
  }
  function vn(t) {
    if (t = t[It] || t[dn]) {
      var l = t.tag;
      if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3)
        return t;
    }
    return null;
  }
  function oa(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
    throw Error(c(33));
  }
  function yn(t) {
    var l = t[Sr];
    return l || (l = t[Sr] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
  }
  function Ft(t) {
    t[ra] = !0;
  }
  var br = /* @__PURE__ */ new Set(), Er = {};
  function Ve(t, l) {
    gn(t, l), gn(t + "Capture", l);
  }
  function gn(t, l) {
    for (Er[t] = l, t = 0; t < l.length; t++)
      br.add(l[t]);
  }
  var Jd = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Ar = {}, Mr = {};
  function $d(t) {
    return uf.call(Mr, t) ? !0 : uf.call(Ar, t) ? !1 : Jd.test(t) ? Mr[t] = !0 : (Ar[t] = !0, !1);
  }
  function Su(t, l, e) {
    if ($d(l))
      if (e === null) t.removeAttribute(l);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(l);
            return;
          case "boolean":
            var n = l.toLowerCase().slice(0, 5);
            if (n !== "data-" && n !== "aria-") {
              t.removeAttribute(l);
              return;
            }
        }
        t.setAttribute(l, "" + e);
      }
  }
  function bu(t, l, e) {
    if (e === null) t.removeAttribute(l);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttribute(l, "" + e);
    }
  }
  function Fl(t, l, e, n) {
    if (n === null) t.removeAttribute(e);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttributeNS(l, e, "" + n);
    }
  }
  function _l(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function zr(t) {
    var l = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (l === "checkbox" || l === "radio");
  }
  function Wd(t, l, e) {
    var n = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      l
    );
    if (!t.hasOwnProperty(l) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var a = n.get, u = n.set;
      return Object.defineProperty(t, l, {
        configurable: !0,
        get: function() {
          return a.call(this);
        },
        set: function(r) {
          e = "" + r, u.call(this, r);
        }
      }), Object.defineProperty(t, l, {
        enumerable: n.enumerable
      }), {
        getValue: function() {
          return e;
        },
        setValue: function(r) {
          e = "" + r;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[l];
        }
      };
    }
  }
  function mf(t) {
    if (!t._valueTracker) {
      var l = zr(t) ? "checked" : "value";
      t._valueTracker = Wd(
        t,
        l,
        "" + t[l]
      );
    }
  }
  function xr(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var e = l.getValue(), n = "";
    return t && (n = zr(t) ? t.checked ? "true" : "false" : t.value), t = n, t !== e ? (l.setValue(t), !0) : !1;
  }
  function Eu(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Fd = /[\n"\\]/g;
  function Nl(t) {
    return t.replace(
      Fd,
      function(l) {
        return "\\" + l.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function vf(t, l, e, n, a, u, r, s) {
    t.name = "", r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" ? t.type = r : t.removeAttribute("type"), l != null ? r === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + _l(l)) : t.value !== "" + _l(l) && (t.value = "" + _l(l)) : r !== "submit" && r !== "reset" || t.removeAttribute("value"), l != null ? yf(t, r, _l(l)) : e != null ? yf(t, r, _l(e)) : n != null && t.removeAttribute("value"), a == null && u != null && (t.defaultChecked = !!u), a != null && (t.checked = a && typeof a != "function" && typeof a != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? t.name = "" + _l(s) : t.removeAttribute("name");
  }
  function Tr(t, l, e, n, a, u, r, s) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), l != null || e != null) {
      if (!(u !== "submit" && u !== "reset" || l != null)) {
        mf(t);
        return;
      }
      e = e != null ? "" + _l(e) : "", l = l != null ? "" + _l(l) : e, s || l === t.value || (t.value = l), t.defaultValue = l;
    }
    n = n ?? a, n = typeof n != "function" && typeof n != "symbol" && !!n, t.checked = s ? t.checked : !!n, t.defaultChecked = !!n, r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" && (t.name = r), mf(t);
  }
  function yf(t, l, e) {
    l === "number" && Eu(t.ownerDocument) === t || t.defaultValue === "" + e || (t.defaultValue = "" + e);
  }
  function pn(t, l, e, n) {
    if (t = t.options, l) {
      l = {};
      for (var a = 0; a < e.length; a++)
        l["$" + e[a]] = !0;
      for (e = 0; e < t.length; e++)
        a = l.hasOwnProperty("$" + t[e].value), t[e].selected !== a && (t[e].selected = a), a && n && (t[e].defaultSelected = !0);
    } else {
      for (e = "" + _l(e), l = null, a = 0; a < t.length; a++) {
        if (t[a].value === e) {
          t[a].selected = !0, n && (t[a].defaultSelected = !0);
          return;
        }
        l !== null || t[a].disabled || (l = t[a]);
      }
      l !== null && (l.selected = !0);
    }
  }
  function _r(t, l, e) {
    if (l != null && (l = "" + _l(l), l !== t.value && (t.value = l), e == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = e != null ? "" + _l(e) : "";
  }
  function Nr(t, l, e, n) {
    if (l == null) {
      if (n != null) {
        if (e != null) throw Error(c(92));
        if (B(n)) {
          if (1 < n.length) throw Error(c(93));
          n = n[0];
        }
        e = n;
      }
      e == null && (e = ""), l = e;
    }
    e = _l(l), t.defaultValue = e, n = t.textContent, n === e && n !== "" && n !== null && (t.value = n), mf(t);
  }
  function Sn(t, l) {
    if (l) {
      var e = t.firstChild;
      if (e && e === t.lastChild && e.nodeType === 3) {
        e.nodeValue = l;
        return;
      }
    }
    t.textContent = l;
  }
  var kd = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Or(t, l, e) {
    var n = l.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? n ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : n ? t.setProperty(l, e) : typeof e != "number" || e === 0 || kd.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
  }
  function Hr(t, l, e) {
    if (l != null && typeof l != "object")
      throw Error(c(62));
    if (t = t.style, e != null) {
      for (var n in e)
        !e.hasOwnProperty(n) || l != null && l.hasOwnProperty(n) || (n.indexOf("--") === 0 ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "");
      for (var a in l)
        n = l[a], l.hasOwnProperty(a) && e[a] !== n && Or(t, a, n);
    } else
      for (var u in l)
        l.hasOwnProperty(u) && Or(t, u, l[u]);
  }
  function gf(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Id = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), Pd = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Au(t) {
    return Pd.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function kl() {
  }
  var pf = null;
  function Sf(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var bn = null, En = null;
  function Dr(t) {
    var l = vn(t);
    if (l && (t = l.stateNode)) {
      var e = t[fl] || null;
      t: switch (t = l.stateNode, l.type) {
        case "input":
          if (vf(
            t,
            e.value,
            e.defaultValue,
            e.defaultValue,
            e.checked,
            e.defaultChecked,
            e.type,
            e.name
          ), l = e.name, e.type === "radio" && l != null) {
            for (e = t; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll(
              'input[name="' + Nl(
                "" + l
              ) + '"][type="radio"]'
            ), l = 0; l < e.length; l++) {
              var n = e[l];
              if (n !== t && n.form === t.form) {
                var a = n[fl] || null;
                if (!a) throw Error(c(90));
                vf(
                  n,
                  a.value,
                  a.defaultValue,
                  a.defaultValue,
                  a.checked,
                  a.defaultChecked,
                  a.type,
                  a.name
                );
              }
            }
            for (l = 0; l < e.length; l++)
              n = e[l], n.form === t.form && xr(n);
          }
          break t;
        case "textarea":
          _r(t, e.value, e.defaultValue);
          break t;
        case "select":
          l = e.value, l != null && pn(t, !!e.multiple, l, !1);
      }
    }
  }
  var bf = !1;
  function Ur(t, l, e) {
    if (bf) return t(l, e);
    bf = !0;
    try {
      var n = t(l);
      return n;
    } finally {
      if (bf = !1, (bn !== null || En !== null) && (ri(), bn && (l = bn, t = En, En = bn = null, Dr(l), t)))
        for (l = 0; l < t.length; l++) Dr(t[l]);
    }
  }
  function sa(t, l) {
    var e = t.stateNode;
    if (e === null) return null;
    var n = e[fl] || null;
    if (n === null) return null;
    e = n[l];
    t: switch (l) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (n = !n.disabled) || (t = t.type, n = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !n;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (e && typeof e != "function")
      throw Error(
        c(231, l, typeof e)
      );
    return e;
  }
  var Il = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ef = !1;
  if (Il)
    try {
      var ha = {};
      Object.defineProperty(ha, "passive", {
        get: function() {
          Ef = !0;
        }
      }), window.addEventListener("test", ha, ha), window.removeEventListener("test", ha, ha);
    } catch {
      Ef = !1;
    }
  var ge = null, Af = null, Mu = null;
  function Rr() {
    if (Mu) return Mu;
    var t, l = Af, e = l.length, n, a = "value" in ge ? ge.value : ge.textContent, u = a.length;
    for (t = 0; t < e && l[t] === a[t]; t++) ;
    var r = e - t;
    for (n = 1; n <= r && l[e - n] === a[u - n]; n++) ;
    return Mu = a.slice(t, 1 < n ? 1 - n : void 0);
  }
  function zu(t) {
    var l = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function xu() {
    return !0;
  }
  function jr() {
    return !1;
  }
  function cl(t) {
    function l(e, n, a, u, r) {
      this._reactName = e, this._targetInst = a, this.type = n, this.nativeEvent = u, this.target = r, this.currentTarget = null;
      for (var s in t)
        t.hasOwnProperty(s) && (e = t[s], this[s] = e ? e(u) : u[s]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? xu : jr, this.isPropagationStopped = jr, this;
    }
    return p(l.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = xu);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = xu);
      },
      persist: function() {
      },
      isPersistent: xu
    }), l;
  }
  var Qe = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Tu = cl(Qe), da = p({}, Qe, { view: 0, detail: 0 }), t2 = cl(da), Mf, zf, ma, _u = p({}, da, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Tf,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== ma && (ma && t.type === "mousemove" ? (Mf = t.screenX - ma.screenX, zf = t.screenY - ma.screenY) : zf = Mf = 0, ma = t), Mf);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : zf;
    }
  }), Cr = cl(_u), l2 = p({}, _u, { dataTransfer: 0 }), e2 = cl(l2), n2 = p({}, da, { relatedTarget: 0 }), xf = cl(n2), a2 = p({}, Qe, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), u2 = cl(a2), i2 = p({}, Qe, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), f2 = cl(i2), c2 = p({}, Qe, { data: 0 }), qr = cl(c2), r2 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, o2 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, s2 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function h2(t) {
    var l = this.nativeEvent;
    return l.getModifierState ? l.getModifierState(t) : (t = s2[t]) ? !!l[t] : !1;
  }
  function Tf() {
    return h2;
  }
  var d2 = p({}, da, {
    key: function(t) {
      if (t.key) {
        var l = r2[t.key] || t.key;
        if (l !== "Unidentified") return l;
      }
      return t.type === "keypress" ? (t = zu(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? o2[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Tf,
    charCode: function(t) {
      return t.type === "keypress" ? zu(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? zu(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), m2 = cl(d2), v2 = p({}, _u, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Br = cl(v2), y2 = p({}, da, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Tf
  }), g2 = cl(y2), p2 = p({}, Qe, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), S2 = cl(p2), b2 = p({}, _u, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), E2 = cl(b2), A2 = p({}, Qe, {
    newState: 0,
    oldState: 0
  }), M2 = cl(A2), z2 = [9, 13, 27, 32], _f = Il && "CompositionEvent" in window, va = null;
  Il && "documentMode" in document && (va = document.documentMode);
  var x2 = Il && "TextEvent" in window && !va, Zr = Il && (!_f || va && 8 < va && 11 >= va), Yr = " ", Lr = !1;
  function Gr(t, l) {
    switch (t) {
      case "keyup":
        return z2.indexOf(l.keyCode) !== -1;
      case "keydown":
        return l.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Xr(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var An = !1;
  function T2(t, l) {
    switch (t) {
      case "compositionend":
        return Xr(l);
      case "keypress":
        return l.which !== 32 ? null : (Lr = !0, Yr);
      case "textInput":
        return t = l.data, t === Yr && Lr ? null : t;
      default:
        return null;
    }
  }
  function _2(t, l) {
    if (An)
      return t === "compositionend" || !_f && Gr(t, l) ? (t = Rr(), Mu = Af = ge = null, An = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(l.ctrlKey || l.altKey || l.metaKey) || l.ctrlKey && l.altKey) {
          if (l.char && 1 < l.char.length)
            return l.char;
          if (l.which) return String.fromCharCode(l.which);
        }
        return null;
      case "compositionend":
        return Zr && l.locale !== "ko" ? null : l.data;
      default:
        return null;
    }
  }
  var N2 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Vr(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!N2[t.type] : l === "textarea";
  }
  function Qr(t, l, e, n) {
    bn ? En ? En.push(n) : En = [n] : bn = n, l = yi(l, "onChange"), 0 < l.length && (e = new Tu(
      "onChange",
      "change",
      null,
      e,
      n
    ), t.push({ event: e, listeners: l }));
  }
  var ya = null, ga = null;
  function O2(t) {
    _s(t, 0);
  }
  function Nu(t) {
    var l = oa(t);
    if (xr(l)) return t;
  }
  function Kr(t, l) {
    if (t === "change") return l;
  }
  var wr = !1;
  if (Il) {
    var Nf;
    if (Il) {
      var Of = "oninput" in document;
      if (!Of) {
        var Jr = document.createElement("div");
        Jr.setAttribute("oninput", "return;"), Of = typeof Jr.oninput == "function";
      }
      Nf = Of;
    } else Nf = !1;
    wr = Nf && (!document.documentMode || 9 < document.documentMode);
  }
  function $r() {
    ya && (ya.detachEvent("onpropertychange", Wr), ga = ya = null);
  }
  function Wr(t) {
    if (t.propertyName === "value" && Nu(ga)) {
      var l = [];
      Qr(
        l,
        ga,
        t,
        Sf(t)
      ), Ur(O2, l);
    }
  }
  function H2(t, l, e) {
    t === "focusin" ? ($r(), ya = l, ga = e, ya.attachEvent("onpropertychange", Wr)) : t === "focusout" && $r();
  }
  function D2(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Nu(ga);
  }
  function U2(t, l) {
    if (t === "click") return Nu(l);
  }
  function R2(t, l) {
    if (t === "input" || t === "change")
      return Nu(l);
  }
  function j2(t, l) {
    return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
  }
  var Sl = typeof Object.is == "function" ? Object.is : j2;
  function pa(t, l) {
    if (Sl(t, l)) return !0;
    if (typeof t != "object" || t === null || typeof l != "object" || l === null)
      return !1;
    var e = Object.keys(t), n = Object.keys(l);
    if (e.length !== n.length) return !1;
    for (n = 0; n < e.length; n++) {
      var a = e[n];
      if (!uf.call(l, a) || !Sl(t[a], l[a]))
        return !1;
    }
    return !0;
  }
  function Fr(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function kr(t, l) {
    var e = Fr(t);
    t = 0;
    for (var n; e; ) {
      if (e.nodeType === 3) {
        if (n = t + e.textContent.length, t <= l && n >= l)
          return { node: e, offset: l - t };
        t = n;
      }
      t: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break t;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = Fr(e);
    }
  }
  function Ir(t, l) {
    return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? Ir(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
  }
  function Pr(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var l = Eu(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof l.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) t = l.contentWindow;
      else break;
      l = Eu(t.document);
    }
    return l;
  }
  function Hf(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
  }
  var C2 = Il && "documentMode" in document && 11 >= document.documentMode, Mn = null, Df = null, Sa = null, Uf = !1;
  function to(t, l, e) {
    var n = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    Uf || Mn == null || Mn !== Eu(n) || (n = Mn, "selectionStart" in n && Hf(n) ? n = { start: n.selectionStart, end: n.selectionEnd } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
      anchorNode: n.anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    }), Sa && pa(Sa, n) || (Sa = n, n = yi(Df, "onSelect"), 0 < n.length && (l = new Tu(
      "onSelect",
      "select",
      null,
      l,
      e
    ), t.push({ event: l, listeners: n }), l.target = Mn)));
  }
  function Ke(t, l) {
    var e = {};
    return e[t.toLowerCase()] = l.toLowerCase(), e["Webkit" + t] = "webkit" + l, e["Moz" + t] = "moz" + l, e;
  }
  var zn = {
    animationend: Ke("Animation", "AnimationEnd"),
    animationiteration: Ke("Animation", "AnimationIteration"),
    animationstart: Ke("Animation", "AnimationStart"),
    transitionrun: Ke("Transition", "TransitionRun"),
    transitionstart: Ke("Transition", "TransitionStart"),
    transitioncancel: Ke("Transition", "TransitionCancel"),
    transitionend: Ke("Transition", "TransitionEnd")
  }, Rf = {}, lo = {};
  Il && (lo = document.createElement("div").style, "AnimationEvent" in window || (delete zn.animationend.animation, delete zn.animationiteration.animation, delete zn.animationstart.animation), "TransitionEvent" in window || delete zn.transitionend.transition);
  function we(t) {
    if (Rf[t]) return Rf[t];
    if (!zn[t]) return t;
    var l = zn[t], e;
    for (e in l)
      if (l.hasOwnProperty(e) && e in lo)
        return Rf[t] = l[e];
    return t;
  }
  var eo = we("animationend"), no = we("animationiteration"), ao = we("animationstart"), q2 = we("transitionrun"), B2 = we("transitionstart"), Z2 = we("transitioncancel"), uo = we("transitionend"), io = /* @__PURE__ */ new Map(), jf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  jf.push("scrollEnd");
  function Yl(t, l) {
    io.set(t, l), Ve(l, [t]);
  }
  var Ou = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var l = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(l)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Ol = [], xn = 0, Cf = 0;
  function Hu() {
    for (var t = xn, l = Cf = xn = 0; l < t; ) {
      var e = Ol[l];
      Ol[l++] = null;
      var n = Ol[l];
      Ol[l++] = null;
      var a = Ol[l];
      Ol[l++] = null;
      var u = Ol[l];
      if (Ol[l++] = null, n !== null && a !== null) {
        var r = n.pending;
        r === null ? a.next = a : (a.next = r.next, r.next = a), n.pending = a;
      }
      u !== 0 && fo(e, a, u);
    }
  }
  function Du(t, l, e, n) {
    Ol[xn++] = t, Ol[xn++] = l, Ol[xn++] = e, Ol[xn++] = n, Cf |= n, t.lanes |= n, t = t.alternate, t !== null && (t.lanes |= n);
  }
  function qf(t, l, e, n) {
    return Du(t, l, e, n), Uu(t);
  }
  function Je(t, l) {
    return Du(t, null, null, l), Uu(t);
  }
  function fo(t, l, e) {
    t.lanes |= e;
    var n = t.alternate;
    n !== null && (n.lanes |= e);
    for (var a = !1, u = t.return; u !== null; )
      u.childLanes |= e, n = u.alternate, n !== null && (n.childLanes |= e), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (a = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, a && l !== null && (a = 31 - pl(e), t = u.hiddenUpdates, n = t[a], n === null ? t[a] = [l] : n.push(l), l.lane = e | 536870912), u) : null;
  }
  function Uu(t) {
    if (50 < Ga)
      throw Ga = 0, Kc = null, Error(c(185));
    for (var l = t.return; l !== null; )
      t = l, l = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Tn = {};
  function Y2(t, l, e, n) {
    this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function bl(t, l, e, n) {
    return new Y2(t, l, e, n);
  }
  function Bf(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Pl(t, l) {
    var e = t.alternate;
    return e === null ? (e = bl(
      t.tag,
      l,
      t.key,
      t.mode
    ), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = l, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 65011712, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, l = t.dependencies, e.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
  }
  function co(t, l) {
    t.flags &= 65011714;
    var e = t.alternate;
    return e === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, l = e.dependencies, t.dependencies = l === null ? null : {
      lanes: l.lanes,
      firstContext: l.firstContext
    }), t;
  }
  function Ru(t, l, e, n, a, u) {
    var r = 0;
    if (n = t, typeof t == "function") Bf(t) && (r = 1);
    else if (typeof t == "string")
      r = Qm(
        t,
        e,
        K.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case ct:
          return t = bl(31, e, l, a), t.elementType = ct, t.lanes = u, t;
        case C:
          return $e(e.children, a, u, l);
        case L:
          r = 8, a |= 24;
          break;
        case k:
          return t = bl(12, e, l, a | 2), t.elementType = k, t.lanes = u, t;
        case et:
          return t = bl(13, e, l, a), t.elementType = et, t.lanes = u, t;
        case J:
          return t = bl(19, e, l, a), t.elementType = J, t.lanes = u, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case F:
                r = 10;
                break t;
              case w:
                r = 9;
                break t;
              case V:
                r = 11;
                break t;
              case $:
                r = 14;
                break t;
              case it:
                r = 16, n = null;
                break t;
            }
          r = 29, e = Error(
            c(130, t === null ? "null" : typeof t, "")
          ), n = null;
      }
    return l = bl(r, e, l, a), l.elementType = t, l.type = n, l.lanes = u, l;
  }
  function $e(t, l, e, n) {
    return t = bl(7, t, n, l), t.lanes = e, t;
  }
  function Zf(t, l, e) {
    return t = bl(6, t, null, l), t.lanes = e, t;
  }
  function ro(t) {
    var l = bl(18, null, null, 0);
    return l.stateNode = t, l;
  }
  function Yf(t, l, e) {
    return l = bl(
      4,
      t.children !== null ? t.children : [],
      t.key,
      l
    ), l.lanes = e, l.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, l;
  }
  var oo = /* @__PURE__ */ new WeakMap();
  function Hl(t, l) {
    if (typeof t == "object" && t !== null) {
      var e = oo.get(t);
      return e !== void 0 ? e : (l = {
        value: t,
        source: l,
        stack: rr(l)
      }, oo.set(t, l), l);
    }
    return {
      value: t,
      source: l,
      stack: rr(l)
    };
  }
  var _n = [], Nn = 0, ju = null, ba = 0, Dl = [], Ul = 0, pe = null, Vl = 1, Ql = "";
  function te(t, l) {
    _n[Nn++] = ba, _n[Nn++] = ju, ju = t, ba = l;
  }
  function so(t, l, e) {
    Dl[Ul++] = Vl, Dl[Ul++] = Ql, Dl[Ul++] = pe, pe = t;
    var n = Vl;
    t = Ql;
    var a = 32 - pl(n) - 1;
    n &= ~(1 << a), e += 1;
    var u = 32 - pl(l) + a;
    if (30 < u) {
      var r = a - a % 5;
      u = (n & (1 << r) - 1).toString(32), n >>= r, a -= r, Vl = 1 << 32 - pl(l) + a | e << a | n, Ql = u + t;
    } else
      Vl = 1 << u | e << a | n, Ql = t;
  }
  function Lf(t) {
    t.return !== null && (te(t, 1), so(t, 1, 0));
  }
  function Gf(t) {
    for (; t === ju; )
      ju = _n[--Nn], _n[Nn] = null, ba = _n[--Nn], _n[Nn] = null;
    for (; t === pe; )
      pe = Dl[--Ul], Dl[Ul] = null, Ql = Dl[--Ul], Dl[Ul] = null, Vl = Dl[--Ul], Dl[Ul] = null;
  }
  function ho(t, l) {
    Dl[Ul++] = Vl, Dl[Ul++] = Ql, Dl[Ul++] = pe, Vl = l.id, Ql = l.overflow, pe = t;
  }
  var Pt = null, Rt = null, St = !1, Se = null, Rl = !1, Xf = Error(c(519));
  function be(t) {
    var l = Error(
      c(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ea(Hl(l, t)), Xf;
  }
  function mo(t) {
    var l = t.stateNode, e = t.type, n = t.memoizedProps;
    switch (l[It] = t, l[fl] = n, e) {
      case "dialog":
        yt("cancel", l), yt("close", l);
        break;
      case "iframe":
      case "object":
      case "embed":
        yt("load", l);
        break;
      case "video":
      case "audio":
        for (e = 0; e < Va.length; e++)
          yt(Va[e], l);
        break;
      case "source":
        yt("error", l);
        break;
      case "img":
      case "image":
      case "link":
        yt("error", l), yt("load", l);
        break;
      case "details":
        yt("toggle", l);
        break;
      case "input":
        yt("invalid", l), Tr(
          l,
          n.value,
          n.defaultValue,
          n.checked,
          n.defaultChecked,
          n.type,
          n.name,
          !0
        );
        break;
      case "select":
        yt("invalid", l);
        break;
      case "textarea":
        yt("invalid", l), Nr(l, n.value, n.defaultValue, n.children);
    }
    e = n.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || n.suppressHydrationWarning === !0 || Ds(l.textContent, e) ? (n.popover != null && (yt("beforetoggle", l), yt("toggle", l)), n.onScroll != null && yt("scroll", l), n.onScrollEnd != null && yt("scrollend", l), n.onClick != null && (l.onclick = kl), l = !0) : l = !1, l || be(t, !0);
  }
  function vo(t) {
    for (Pt = t.return; Pt; )
      switch (Pt.tag) {
        case 5:
        case 31:
        case 13:
          Rl = !1;
          return;
        case 27:
        case 3:
          Rl = !0;
          return;
        default:
          Pt = Pt.return;
      }
  }
  function On(t) {
    if (t !== Pt) return !1;
    if (!St) return vo(t), St = !0, !1;
    var l = t.tag, e;
    if ((e = l !== 3 && l !== 27) && ((e = l === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || i0(t.type, t.memoizedProps)), e = !e), e && Rt && be(t), vo(t), l === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(c(317));
      Rt = Ls(t);
    } else if (l === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(c(317));
      Rt = Ls(t);
    } else
      l === 27 ? (l = Rt, je(t.type) ? (t = s0, s0 = null, Rt = t) : Rt = l) : Rt = Pt ? Cl(t.stateNode.nextSibling) : null;
    return !0;
  }
  function We() {
    Rt = Pt = null, St = !1;
  }
  function Vf() {
    var t = Se;
    return t !== null && (hl === null ? hl = t : hl.push.apply(
      hl,
      t
    ), Se = null), t;
  }
  function Ea(t) {
    Se === null ? Se = [t] : Se.push(t);
  }
  var Qf = E(null), Fe = null, le = null;
  function Ee(t, l, e) {
    X(Qf, l._currentValue), l._currentValue = e;
  }
  function ee(t) {
    t._currentValue = Qf.current, U(Qf);
  }
  function Kf(t, l, e) {
    for (; t !== null; ) {
      var n = t.alternate;
      if ((t.childLanes & l) !== l ? (t.childLanes |= l, n !== null && (n.childLanes |= l)) : n !== null && (n.childLanes & l) !== l && (n.childLanes |= l), t === e) break;
      t = t.return;
    }
  }
  function wf(t, l, e, n) {
    var a = t.child;
    for (a !== null && (a.return = t); a !== null; ) {
      var u = a.dependencies;
      if (u !== null) {
        var r = a.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var s = u;
          u = a;
          for (var g = 0; g < l.length; g++)
            if (s.context === l[g]) {
              u.lanes |= e, s = u.alternate, s !== null && (s.lanes |= e), Kf(
                u.return,
                e,
                t
              ), n || (r = null);
              break t;
            }
          u = s.next;
        }
      } else if (a.tag === 18) {
        if (r = a.return, r === null) throw Error(c(341));
        r.lanes |= e, u = r.alternate, u !== null && (u.lanes |= e), Kf(r, e, t), r = null;
      } else r = a.child;
      if (r !== null) r.return = a;
      else
        for (r = a; r !== null; ) {
          if (r === t) {
            r = null;
            break;
          }
          if (a = r.sibling, a !== null) {
            a.return = r.return, r = a;
            break;
          }
          r = r.return;
        }
      a = r;
    }
  }
  function Hn(t, l, e, n) {
    t = null;
    for (var a = l, u = !1; a !== null; ) {
      if (!u) {
        if ((a.flags & 524288) !== 0) u = !0;
        else if ((a.flags & 262144) !== 0) break;
      }
      if (a.tag === 10) {
        var r = a.alternate;
        if (r === null) throw Error(c(387));
        if (r = r.memoizedProps, r !== null) {
          var s = a.type;
          Sl(a.pendingProps.value, r.value) || (t !== null ? t.push(s) : t = [s]);
        }
      } else if (a === xt.current) {
        if (r = a.alternate, r === null) throw Error(c(387));
        r.memoizedState.memoizedState !== a.memoizedState.memoizedState && (t !== null ? t.push($a) : t = [$a]);
      }
      a = a.return;
    }
    t !== null && wf(
      l,
      t,
      e,
      n
    ), l.flags |= 262144;
  }
  function Cu(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Sl(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function ke(t) {
    Fe = t, le = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function tl(t) {
    return yo(Fe, t);
  }
  function qu(t, l) {
    return Fe === null && ke(t), yo(t, l);
  }
  function yo(t, l) {
    var e = l._currentValue;
    if (l = { context: l, memoizedValue: e, next: null }, le === null) {
      if (t === null) throw Error(c(308));
      le = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
    } else le = le.next = l;
    return e;
  }
  var L2 = typeof AbortController < "u" ? AbortController : function() {
    var t = [], l = this.signal = {
      aborted: !1,
      addEventListener: function(e, n) {
        t.push(n);
      }
    };
    this.abort = function() {
      l.aborted = !0, t.forEach(function(e) {
        return e();
      });
    };
  }, G2 = i.unstable_scheduleCallback, X2 = i.unstable_NormalPriority, Kt = {
    $$typeof: F,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Jf() {
    return {
      controller: new L2(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Aa(t) {
    t.refCount--, t.refCount === 0 && G2(X2, function() {
      t.controller.abort();
    });
  }
  var Ma = null, $f = 0, Dn = 0, Un = null;
  function V2(t, l) {
    if (Ma === null) {
      var e = Ma = [];
      $f = 0, Dn = kc(), Un = {
        status: "pending",
        value: void 0,
        then: function(n) {
          e.push(n);
        }
      };
    }
    return $f++, l.then(go, go), l;
  }
  function go() {
    if (--$f === 0 && Ma !== null) {
      Un !== null && (Un.status = "fulfilled");
      var t = Ma;
      Ma = null, Dn = 0, Un = null;
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function Q2(t, l) {
    var e = [], n = {
      status: "pending",
      value: null,
      reason: null,
      then: function(a) {
        e.push(a);
      }
    };
    return t.then(
      function() {
        n.status = "fulfilled", n.value = l;
        for (var a = 0; a < e.length; a++) (0, e[a])(l);
      },
      function(a) {
        for (n.status = "rejected", n.reason = a, a = 0; a < e.length; a++)
          (0, e[a])(void 0);
      }
    ), n;
  }
  var po = x.S;
  x.S = function(t, l) {
    ls = yl(), typeof l == "object" && l !== null && typeof l.then == "function" && V2(t, l), po !== null && po(t, l);
  };
  var Ie = E(null);
  function Wf() {
    var t = Ie.current;
    return t !== null ? t : Dt.pooledCache;
  }
  function Bu(t, l) {
    l === null ? X(Ie, Ie.current) : X(Ie, l.pool);
  }
  function So() {
    var t = Wf();
    return t === null ? null : { parent: Kt._currentValue, pool: t };
  }
  var Rn = Error(c(460)), Ff = Error(c(474)), Zu = Error(c(542)), Yu = { then: function() {
  } };
  function bo(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Eo(t, l, e) {
    switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(kl, kl), l = e), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw t = l.reason, Mo(t), t;
      default:
        if (typeof l.status == "string") l.then(kl, kl);
        else {
          if (t = Dt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(c(482));
          t = l, t.status = "pending", t.then(
            function(n) {
              if (l.status === "pending") {
                var a = l;
                a.status = "fulfilled", a.value = n;
              }
            },
            function(n) {
              if (l.status === "pending") {
                var a = l;
                a.status = "rejected", a.reason = n;
              }
            }
          );
        }
        switch (l.status) {
          case "fulfilled":
            return l.value;
          case "rejected":
            throw t = l.reason, Mo(t), t;
        }
        throw tn = l, Rn;
    }
  }
  function Pe(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (tn = e, Rn) : e;
    }
  }
  var tn = null;
  function Ao() {
    if (tn === null) throw Error(c(459));
    var t = tn;
    return tn = null, t;
  }
  function Mo(t) {
    if (t === Rn || t === Zu)
      throw Error(c(483));
  }
  var jn = null, za = 0;
  function Lu(t) {
    var l = za;
    return za += 1, jn === null && (jn = []), Eo(jn, t, l);
  }
  function xa(t, l) {
    l = l.props.ref, t.ref = l !== void 0 ? l : null;
  }
  function Gu(t, l) {
    throw l.$$typeof === z ? Error(c(525)) : (t = Object.prototype.toString.call(l), Error(
      c(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
      )
    ));
  }
  function zo(t) {
    function l(M, A) {
      if (t) {
        var T = M.deletions;
        T === null ? (M.deletions = [A], M.flags |= 16) : T.push(A);
      }
    }
    function e(M, A) {
      if (!t) return null;
      for (; A !== null; )
        l(M, A), A = A.sibling;
      return null;
    }
    function n(M) {
      for (var A = /* @__PURE__ */ new Map(); M !== null; )
        M.key !== null ? A.set(M.key, M) : A.set(M.index, M), M = M.sibling;
      return A;
    }
    function a(M, A) {
      return M = Pl(M, A), M.index = 0, M.sibling = null, M;
    }
    function u(M, A, T) {
      return M.index = T, t ? (T = M.alternate, T !== null ? (T = T.index, T < A ? (M.flags |= 67108866, A) : T) : (M.flags |= 67108866, A)) : (M.flags |= 1048576, A);
    }
    function r(M) {
      return t && M.alternate === null && (M.flags |= 67108866), M;
    }
    function s(M, A, T, R) {
      return A === null || A.tag !== 6 ? (A = Zf(T, M.mode, R), A.return = M, A) : (A = a(A, T), A.return = M, A);
    }
    function g(M, A, T, R) {
      var lt = T.type;
      return lt === C ? D(
        M,
        A,
        T.props.children,
        R,
        T.key
      ) : A !== null && (A.elementType === lt || typeof lt == "object" && lt !== null && lt.$$typeof === it && Pe(lt) === A.type) ? (A = a(A, T.props), xa(A, T), A.return = M, A) : (A = Ru(
        T.type,
        T.key,
        T.props,
        null,
        M.mode,
        R
      ), xa(A, T), A.return = M, A);
    }
    function _(M, A, T, R) {
      return A === null || A.tag !== 4 || A.stateNode.containerInfo !== T.containerInfo || A.stateNode.implementation !== T.implementation ? (A = Yf(T, M.mode, R), A.return = M, A) : (A = a(A, T.children || []), A.return = M, A);
    }
    function D(M, A, T, R, lt) {
      return A === null || A.tag !== 7 ? (A = $e(
        T,
        M.mode,
        R,
        lt
      ), A.return = M, A) : (A = a(A, T), A.return = M, A);
    }
    function q(M, A, T) {
      if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint")
        return A = Zf(
          "" + A,
          M.mode,
          T
        ), A.return = M, A;
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case Z:
            return T = Ru(
              A.type,
              A.key,
              A.props,
              null,
              M.mode,
              T
            ), xa(T, A), T.return = M, T;
          case Y:
            return A = Yf(
              A,
              M.mode,
              T
            ), A.return = M, A;
          case it:
            return A = Pe(A), q(M, A, T);
        }
        if (B(A) || I(A))
          return A = $e(
            A,
            M.mode,
            T,
            null
          ), A.return = M, A;
        if (typeof A.then == "function")
          return q(M, Lu(A), T);
        if (A.$$typeof === F)
          return q(
            M,
            qu(M, A),
            T
          );
        Gu(M, A);
      }
      return null;
    }
    function N(M, A, T, R) {
      var lt = A !== null ? A.key : null;
      if (typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint")
        return lt !== null ? null : s(M, A, "" + T, R);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case Z:
            return T.key === lt ? g(M, A, T, R) : null;
          case Y:
            return T.key === lt ? _(M, A, T, R) : null;
          case it:
            return T = Pe(T), N(M, A, T, R);
        }
        if (B(T) || I(T))
          return lt !== null ? null : D(M, A, T, R, null);
        if (typeof T.then == "function")
          return N(
            M,
            A,
            Lu(T),
            R
          );
        if (T.$$typeof === F)
          return N(
            M,
            A,
            qu(M, T),
            R
          );
        Gu(M, T);
      }
      return null;
    }
    function H(M, A, T, R, lt) {
      if (typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint")
        return M = M.get(T) || null, s(A, M, "" + R, lt);
      if (typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case Z:
            return M = M.get(
              R.key === null ? T : R.key
            ) || null, g(A, M, R, lt);
          case Y:
            return M = M.get(
              R.key === null ? T : R.key
            ) || null, _(A, M, R, lt);
          case it:
            return R = Pe(R), H(
              M,
              A,
              T,
              R,
              lt
            );
        }
        if (B(R) || I(R))
          return M = M.get(T) || null, D(A, M, R, lt, null);
        if (typeof R.then == "function")
          return H(
            M,
            A,
            T,
            Lu(R),
            lt
          );
        if (R.$$typeof === F)
          return H(
            M,
            A,
            T,
            qu(A, R),
            lt
          );
        Gu(A, R);
      }
      return null;
    }
    function W(M, A, T, R) {
      for (var lt = null, At = null, P = A, ht = A = 0, pt = null; P !== null && ht < T.length; ht++) {
        P.index > ht ? (pt = P, P = null) : pt = P.sibling;
        var Mt = N(
          M,
          P,
          T[ht],
          R
        );
        if (Mt === null) {
          P === null && (P = pt);
          break;
        }
        t && P && Mt.alternate === null && l(M, P), A = u(Mt, A, ht), At === null ? lt = Mt : At.sibling = Mt, At = Mt, P = pt;
      }
      if (ht === T.length)
        return e(M, P), St && te(M, ht), lt;
      if (P === null) {
        for (; ht < T.length; ht++)
          P = q(M, T[ht], R), P !== null && (A = u(
            P,
            A,
            ht
          ), At === null ? lt = P : At.sibling = P, At = P);
        return St && te(M, ht), lt;
      }
      for (P = n(P); ht < T.length; ht++)
        pt = H(
          P,
          M,
          ht,
          T[ht],
          R
        ), pt !== null && (t && pt.alternate !== null && P.delete(
          pt.key === null ? ht : pt.key
        ), A = u(
          pt,
          A,
          ht
        ), At === null ? lt = pt : At.sibling = pt, At = pt);
      return t && P.forEach(function(Ye) {
        return l(M, Ye);
      }), St && te(M, ht), lt;
    }
    function nt(M, A, T, R) {
      if (T == null) throw Error(c(151));
      for (var lt = null, At = null, P = A, ht = A = 0, pt = null, Mt = T.next(); P !== null && !Mt.done; ht++, Mt = T.next()) {
        P.index > ht ? (pt = P, P = null) : pt = P.sibling;
        var Ye = N(M, P, Mt.value, R);
        if (Ye === null) {
          P === null && (P = pt);
          break;
        }
        t && P && Ye.alternate === null && l(M, P), A = u(Ye, A, ht), At === null ? lt = Ye : At.sibling = Ye, At = Ye, P = pt;
      }
      if (Mt.done)
        return e(M, P), St && te(M, ht), lt;
      if (P === null) {
        for (; !Mt.done; ht++, Mt = T.next())
          Mt = q(M, Mt.value, R), Mt !== null && (A = u(Mt, A, ht), At === null ? lt = Mt : At.sibling = Mt, At = Mt);
        return St && te(M, ht), lt;
      }
      for (P = n(P); !Mt.done; ht++, Mt = T.next())
        Mt = H(P, M, ht, Mt.value, R), Mt !== null && (t && Mt.alternate !== null && P.delete(Mt.key === null ? ht : Mt.key), A = u(Mt, A, ht), At === null ? lt = Mt : At.sibling = Mt, At = Mt);
      return t && P.forEach(function(lv) {
        return l(M, lv);
      }), St && te(M, ht), lt;
    }
    function Ht(M, A, T, R) {
      if (typeof T == "object" && T !== null && T.type === C && T.key === null && (T = T.props.children), typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case Z:
            t: {
              for (var lt = T.key; A !== null; ) {
                if (A.key === lt) {
                  if (lt = T.type, lt === C) {
                    if (A.tag === 7) {
                      e(
                        M,
                        A.sibling
                      ), R = a(
                        A,
                        T.props.children
                      ), R.return = M, M = R;
                      break t;
                    }
                  } else if (A.elementType === lt || typeof lt == "object" && lt !== null && lt.$$typeof === it && Pe(lt) === A.type) {
                    e(
                      M,
                      A.sibling
                    ), R = a(A, T.props), xa(R, T), R.return = M, M = R;
                    break t;
                  }
                  e(M, A);
                  break;
                } else l(M, A);
                A = A.sibling;
              }
              T.type === C ? (R = $e(
                T.props.children,
                M.mode,
                R,
                T.key
              ), R.return = M, M = R) : (R = Ru(
                T.type,
                T.key,
                T.props,
                null,
                M.mode,
                R
              ), xa(R, T), R.return = M, M = R);
            }
            return r(M);
          case Y:
            t: {
              for (lt = T.key; A !== null; ) {
                if (A.key === lt)
                  if (A.tag === 4 && A.stateNode.containerInfo === T.containerInfo && A.stateNode.implementation === T.implementation) {
                    e(
                      M,
                      A.sibling
                    ), R = a(A, T.children || []), R.return = M, M = R;
                    break t;
                  } else {
                    e(M, A);
                    break;
                  }
                else l(M, A);
                A = A.sibling;
              }
              R = Yf(T, M.mode, R), R.return = M, M = R;
            }
            return r(M);
          case it:
            return T = Pe(T), Ht(
              M,
              A,
              T,
              R
            );
        }
        if (B(T))
          return W(
            M,
            A,
            T,
            R
          );
        if (I(T)) {
          if (lt = I(T), typeof lt != "function") throw Error(c(150));
          return T = lt.call(T), nt(
            M,
            A,
            T,
            R
          );
        }
        if (typeof T.then == "function")
          return Ht(
            M,
            A,
            Lu(T),
            R
          );
        if (T.$$typeof === F)
          return Ht(
            M,
            A,
            qu(M, T),
            R
          );
        Gu(M, T);
      }
      return typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint" ? (T = "" + T, A !== null && A.tag === 6 ? (e(M, A.sibling), R = a(A, T), R.return = M, M = R) : (e(M, A), R = Zf(T, M.mode, R), R.return = M, M = R), r(M)) : e(M, A);
    }
    return function(M, A, T, R) {
      try {
        za = 0;
        var lt = Ht(
          M,
          A,
          T,
          R
        );
        return jn = null, lt;
      } catch (P) {
        if (P === Rn || P === Zu) throw P;
        var At = bl(29, P, null, M.mode);
        return At.lanes = R, At.return = M, At;
      } finally {
      }
    };
  }
  var ln = zo(!0), xo = zo(!1), Ae = !1;
  function kf(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function If(t, l) {
    t = t.updateQueue, l.updateQueue === t && (l.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Me(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function ze(t, l, e) {
    var n = t.updateQueue;
    if (n === null) return null;
    if (n = n.shared, (zt & 2) !== 0) {
      var a = n.pending;
      return a === null ? l.next = l : (l.next = a.next, a.next = l), n.pending = l, l = Uu(t), fo(t, null, e), l;
    }
    return Du(t, n, l, e), Uu(t);
  }
  function Ta(t, l, e) {
    if (l = l.updateQueue, l !== null && (l = l.shared, (e & 4194048) !== 0)) {
      var n = l.lanes;
      n &= t.pendingLanes, e |= n, l.lanes = e, vr(t, e);
    }
  }
  function Pf(t, l) {
    var e = t.updateQueue, n = t.alternate;
    if (n !== null && (n = n.updateQueue, e === n)) {
      var a = null, u = null;
      if (e = e.firstBaseUpdate, e !== null) {
        do {
          var r = {
            lane: e.lane,
            tag: e.tag,
            payload: e.payload,
            callback: null,
            next: null
          };
          u === null ? a = u = r : u = u.next = r, e = e.next;
        } while (e !== null);
        u === null ? a = u = l : u = u.next = l;
      } else a = u = l;
      e = {
        baseState: n.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: u,
        shared: n.shared,
        callbacks: n.callbacks
      }, t.updateQueue = e;
      return;
    }
    t = e.lastBaseUpdate, t === null ? e.firstBaseUpdate = l : t.next = l, e.lastBaseUpdate = l;
  }
  var tc = !1;
  function _a() {
    if (tc) {
      var t = Un;
      if (t !== null) throw t;
    }
  }
  function Na(t, l, e, n) {
    tc = !1;
    var a = t.updateQueue;
    Ae = !1;
    var u = a.firstBaseUpdate, r = a.lastBaseUpdate, s = a.shared.pending;
    if (s !== null) {
      a.shared.pending = null;
      var g = s, _ = g.next;
      g.next = null, r === null ? u = _ : r.next = _, r = g;
      var D = t.alternate;
      D !== null && (D = D.updateQueue, s = D.lastBaseUpdate, s !== r && (s === null ? D.firstBaseUpdate = _ : s.next = _, D.lastBaseUpdate = g));
    }
    if (u !== null) {
      var q = a.baseState;
      r = 0, D = _ = g = null, s = u;
      do {
        var N = s.lane & -536870913, H = N !== s.lane;
        if (H ? (gt & N) === N : (n & N) === N) {
          N !== 0 && N === Dn && (tc = !0), D !== null && (D = D.next = {
            lane: 0,
            tag: s.tag,
            payload: s.payload,
            callback: null,
            next: null
          });
          t: {
            var W = t, nt = s;
            N = l;
            var Ht = e;
            switch (nt.tag) {
              case 1:
                if (W = nt.payload, typeof W == "function") {
                  q = W.call(Ht, q, N);
                  break t;
                }
                q = W;
                break t;
              case 3:
                W.flags = W.flags & -65537 | 128;
              case 0:
                if (W = nt.payload, N = typeof W == "function" ? W.call(Ht, q, N) : W, N == null) break t;
                q = p({}, q, N);
                break t;
              case 2:
                Ae = !0;
            }
          }
          N = s.callback, N !== null && (t.flags |= 64, H && (t.flags |= 8192), H = a.callbacks, H === null ? a.callbacks = [N] : H.push(N));
        } else
          H = {
            lane: N,
            tag: s.tag,
            payload: s.payload,
            callback: s.callback,
            next: null
          }, D === null ? (_ = D = H, g = q) : D = D.next = H, r |= N;
        if (s = s.next, s === null) {
          if (s = a.shared.pending, s === null)
            break;
          H = s, s = H.next, H.next = null, a.lastBaseUpdate = H, a.shared.pending = null;
        }
      } while (!0);
      D === null && (g = q), a.baseState = g, a.firstBaseUpdate = _, a.lastBaseUpdate = D, u === null && (a.shared.lanes = 0), Oe |= r, t.lanes = r, t.memoizedState = q;
    }
  }
  function To(t, l) {
    if (typeof t != "function")
      throw Error(c(191, t));
    t.call(l);
  }
  function _o(t, l) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        To(e[t], l);
  }
  var Cn = E(null), Xu = E(0);
  function No(t, l) {
    t = se, X(Xu, t), X(Cn, l), se = t | l.baseLanes;
  }
  function lc() {
    X(Xu, se), X(Cn, Cn.current);
  }
  function ec() {
    se = Xu.current, U(Cn), U(Xu);
  }
  var El = E(null), jl = null;
  function xe(t) {
    var l = t.alternate;
    X(Gt, Gt.current & 1), X(El, t), jl === null && (l === null || Cn.current !== null || l.memoizedState !== null) && (jl = t);
  }
  function nc(t) {
    X(Gt, Gt.current), X(El, t), jl === null && (jl = t);
  }
  function Oo(t) {
    t.tag === 22 ? (X(Gt, Gt.current), X(El, t), jl === null && (jl = t)) : Te();
  }
  function Te() {
    X(Gt, Gt.current), X(El, El.current);
  }
  function Al(t) {
    U(El), jl === t && (jl = null), U(Gt);
  }
  var Gt = E(0);
  function Vu(t) {
    for (var l = t; l !== null; ) {
      if (l.tag === 13) {
        var e = l.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || r0(e) || o0(e)))
          return l;
      } else if (l.tag === 19 && (l.memoizedProps.revealOrder === "forwards" || l.memoizedProps.revealOrder === "backwards" || l.memoizedProps.revealOrder === "unstable_legacy-backwards" || l.memoizedProps.revealOrder === "together")) {
        if ((l.flags & 128) !== 0) return l;
      } else if (l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === t) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === t) return null;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
    return null;
  }
  var ne = 0, st = null, Nt = null, wt = null, Qu = !1, qn = !1, en = !1, Ku = 0, Oa = 0, Bn = null, K2 = 0;
  function Zt() {
    throw Error(c(321));
  }
  function ac(t, l) {
    if (l === null) return !1;
    for (var e = 0; e < l.length && e < t.length; e++)
      if (!Sl(t[e], l[e])) return !1;
    return !0;
  }
  function uc(t, l, e, n, a, u) {
    return ne = u, st = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, x.H = t === null || t.memoizedState === null ? h1 : bc, en = !1, u = e(n, a), en = !1, qn && (u = Do(
      l,
      e,
      n,
      a
    )), Ho(t), u;
  }
  function Ho(t) {
    x.H = Ua;
    var l = Nt !== null && Nt.next !== null;
    if (ne = 0, wt = Nt = st = null, Qu = !1, Oa = 0, Bn = null, l) throw Error(c(300));
    t === null || Jt || (t = t.dependencies, t !== null && Cu(t) && (Jt = !0));
  }
  function Do(t, l, e, n) {
    st = t;
    var a = 0;
    do {
      if (qn && (Bn = null), Oa = 0, qn = !1, 25 <= a) throw Error(c(301));
      if (a += 1, wt = Nt = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      x.H = d1, u = l(e, n);
    } while (qn);
    return u;
  }
  function w2() {
    var t = x.H, l = t.useState()[0];
    return l = typeof l.then == "function" ? Ha(l) : l, t = t.useState()[0], (Nt !== null ? Nt.memoizedState : null) !== t && (st.flags |= 1024), l;
  }
  function ic() {
    var t = Ku !== 0;
    return Ku = 0, t;
  }
  function fc(t, l, e) {
    l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
  }
  function cc(t) {
    if (Qu) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        l !== null && (l.pending = null), t = t.next;
      }
      Qu = !1;
    }
    ne = 0, wt = Nt = st = null, qn = !1, Oa = Ku = 0, Bn = null;
  }
  function ul() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return wt === null ? st.memoizedState = wt = t : wt = wt.next = t, wt;
  }
  function Xt() {
    if (Nt === null) {
      var t = st.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Nt.next;
    var l = wt === null ? st.memoizedState : wt.next;
    if (l !== null)
      wt = l, Nt = t;
    else {
      if (t === null)
        throw st.alternate === null ? Error(c(467)) : Error(c(310));
      Nt = t, t = {
        memoizedState: Nt.memoizedState,
        baseState: Nt.baseState,
        baseQueue: Nt.baseQueue,
        queue: Nt.queue,
        next: null
      }, wt === null ? st.memoizedState = wt = t : wt = wt.next = t;
    }
    return wt;
  }
  function wu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ha(t) {
    var l = Oa;
    return Oa += 1, Bn === null && (Bn = []), t = Eo(Bn, t, l), l = st, (wt === null ? l.memoizedState : wt.next) === null && (l = l.alternate, x.H = l === null || l.memoizedState === null ? h1 : bc), t;
  }
  function Ju(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Ha(t);
      if (t.$$typeof === F) return tl(t);
    }
    throw Error(c(438, String(t)));
  }
  function rc(t) {
    var l = null, e = st.updateQueue;
    if (e !== null && (l = e.memoCache), l == null) {
      var n = st.alternate;
      n !== null && (n = n.updateQueue, n !== null && (n = n.memoCache, n != null && (l = {
        data: n.data.map(function(a) {
          return a.slice();
        }),
        index: 0
      })));
    }
    if (l == null && (l = { data: [], index: 0 }), e === null && (e = wu(), st.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
      for (e = l.data[l.index] = Array(t), n = 0; n < t; n++)
        e[n] = Et;
    return l.index++, e;
  }
  function ae(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function $u(t) {
    var l = Xt();
    return oc(l, Nt, t);
  }
  function oc(t, l, e) {
    var n = t.queue;
    if (n === null) throw Error(c(311));
    n.lastRenderedReducer = e;
    var a = t.baseQueue, u = n.pending;
    if (u !== null) {
      if (a !== null) {
        var r = a.next;
        a.next = u.next, u.next = r;
      }
      l.baseQueue = a = u, n.pending = null;
    }
    if (u = t.baseState, a === null) t.memoizedState = u;
    else {
      l = a.next;
      var s = r = null, g = null, _ = l, D = !1;
      do {
        var q = _.lane & -536870913;
        if (q !== _.lane ? (gt & q) === q : (ne & q) === q) {
          var N = _.revertLane;
          if (N === 0)
            g !== null && (g = g.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: _.action,
              hasEagerState: _.hasEagerState,
              eagerState: _.eagerState,
              next: null
            }), q === Dn && (D = !0);
          else if ((ne & N) === N) {
            _ = _.next, N === Dn && (D = !0);
            continue;
          } else
            q = {
              lane: 0,
              revertLane: _.revertLane,
              gesture: null,
              action: _.action,
              hasEagerState: _.hasEagerState,
              eagerState: _.eagerState,
              next: null
            }, g === null ? (s = g = q, r = u) : g = g.next = q, st.lanes |= N, Oe |= N;
          q = _.action, en && e(u, q), u = _.hasEagerState ? _.eagerState : e(u, q);
        } else
          N = {
            lane: q,
            revertLane: _.revertLane,
            gesture: _.gesture,
            action: _.action,
            hasEagerState: _.hasEagerState,
            eagerState: _.eagerState,
            next: null
          }, g === null ? (s = g = N, r = u) : g = g.next = N, st.lanes |= q, Oe |= q;
        _ = _.next;
      } while (_ !== null && _ !== l);
      if (g === null ? r = u : g.next = s, !Sl(u, t.memoizedState) && (Jt = !0, D && (e = Un, e !== null)))
        throw e;
      t.memoizedState = u, t.baseState = r, t.baseQueue = g, n.lastRenderedState = u;
    }
    return a === null && (n.lanes = 0), [t.memoizedState, n.dispatch];
  }
  function sc(t) {
    var l = Xt(), e = l.queue;
    if (e === null) throw Error(c(311));
    e.lastRenderedReducer = t;
    var n = e.dispatch, a = e.pending, u = l.memoizedState;
    if (a !== null) {
      e.pending = null;
      var r = a = a.next;
      do
        u = t(u, r.action), r = r.next;
      while (r !== a);
      Sl(u, l.memoizedState) || (Jt = !0), l.memoizedState = u, l.baseQueue === null && (l.baseState = u), e.lastRenderedState = u;
    }
    return [u, n];
  }
  function Uo(t, l, e) {
    var n = st, a = Xt(), u = St;
    if (u) {
      if (e === void 0) throw Error(c(407));
      e = e();
    } else e = l();
    var r = !Sl(
      (Nt || a).memoizedState,
      e
    );
    if (r && (a.memoizedState = e, Jt = !0), a = a.queue, mc(Co.bind(null, n, a, t), [
      t
    ]), a.getSnapshot !== l || r || wt !== null && wt.memoizedState.tag & 1) {
      if (n.flags |= 2048, Zn(
        9,
        { destroy: void 0 },
        jo.bind(
          null,
          n,
          a,
          e,
          l
        ),
        null
      ), Dt === null) throw Error(c(349));
      u || (ne & 127) !== 0 || Ro(n, l, e);
    }
    return e;
  }
  function Ro(t, l, e) {
    t.flags |= 16384, t = { getSnapshot: l, value: e }, l = st.updateQueue, l === null ? (l = wu(), st.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
  }
  function jo(t, l, e, n) {
    l.value = e, l.getSnapshot = n, qo(l) && Bo(t);
  }
  function Co(t, l, e) {
    return e(function() {
      qo(l) && Bo(t);
    });
  }
  function qo(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var e = l();
      return !Sl(t, e);
    } catch {
      return !0;
    }
  }
  function Bo(t) {
    var l = Je(t, 2);
    l !== null && dl(l, t, 2);
  }
  function hc(t) {
    var l = ul();
    if (typeof t == "function") {
      var e = t;
      if (t = e(), en) {
        ve(!0);
        try {
          e();
        } finally {
          ve(!1);
        }
      }
    }
    return l.memoizedState = l.baseState = t, l.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ae,
      lastRenderedState: t
    }, l;
  }
  function Zo(t, l, e, n) {
    return t.baseState = e, oc(
      t,
      Nt,
      typeof n == "function" ? n : ae
    );
  }
  function J2(t, l, e, n, a) {
    if (ku(t)) throw Error(c(485));
    if (t = l.action, t !== null) {
      var u = {
        payload: a,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(r) {
          u.listeners.push(r);
        }
      };
      x.T !== null ? e(!0) : u.isTransition = !1, n(u), e = l.pending, e === null ? (u.next = l.pending = u, Yo(l, u)) : (u.next = e.next, l.pending = e.next = u);
    }
  }
  function Yo(t, l) {
    var e = l.action, n = l.payload, a = t.state;
    if (l.isTransition) {
      var u = x.T, r = {};
      x.T = r;
      try {
        var s = e(a, n), g = x.S;
        g !== null && g(r, s), Lo(t, l, s);
      } catch (_) {
        dc(t, l, _);
      } finally {
        u !== null && r.types !== null && (u.types = r.types), x.T = u;
      }
    } else
      try {
        u = e(a, n), Lo(t, l, u);
      } catch (_) {
        dc(t, l, _);
      }
  }
  function Lo(t, l, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(n) {
        Go(t, l, n);
      },
      function(n) {
        return dc(t, l, n);
      }
    ) : Go(t, l, e);
  }
  function Go(t, l, e) {
    l.status = "fulfilled", l.value = e, Xo(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, Yo(t, e)));
  }
  function dc(t, l, e) {
    var n = t.pending;
    if (t.pending = null, n !== null) {
      n = n.next;
      do
        l.status = "rejected", l.reason = e, Xo(l), l = l.next;
      while (l !== n);
    }
    t.action = null;
  }
  function Xo(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function Vo(t, l) {
    return l;
  }
  function Qo(t, l) {
    if (St) {
      var e = Dt.formState;
      if (e !== null) {
        t: {
          var n = st;
          if (St) {
            if (Rt) {
              l: {
                for (var a = Rt, u = Rl; a.nodeType !== 8; ) {
                  if (!u) {
                    a = null;
                    break l;
                  }
                  if (a = Cl(
                    a.nextSibling
                  ), a === null) {
                    a = null;
                    break l;
                  }
                }
                u = a.data, a = u === "F!" || u === "F" ? a : null;
              }
              if (a) {
                Rt = Cl(
                  a.nextSibling
                ), n = a.data === "F!";
                break t;
              }
            }
            be(n);
          }
          n = !1;
        }
        n && (l = e[0]);
      }
    }
    return e = ul(), e.memoizedState = e.baseState = l, n = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Vo,
      lastRenderedState: l
    }, e.queue = n, e = r1.bind(
      null,
      st,
      n
    ), n.dispatch = e, n = hc(!1), u = Sc.bind(
      null,
      st,
      !1,
      n.queue
    ), n = ul(), a = {
      state: l,
      dispatch: null,
      action: t,
      pending: null
    }, n.queue = a, e = J2.bind(
      null,
      st,
      a,
      u,
      e
    ), a.dispatch = e, n.memoizedState = t, [l, e, !1];
  }
  function Ko(t) {
    var l = Xt();
    return wo(l, Nt, t);
  }
  function wo(t, l, e) {
    if (l = oc(
      t,
      l,
      Vo
    )[0], t = $u(ae)[0], typeof l == "object" && l !== null && typeof l.then == "function")
      try {
        var n = Ha(l);
      } catch (r) {
        throw r === Rn ? Zu : r;
      }
    else n = l;
    l = Xt();
    var a = l.queue, u = a.dispatch;
    return e !== l.memoizedState && (st.flags |= 2048, Zn(
      9,
      { destroy: void 0 },
      $2.bind(null, a, e),
      null
    )), [n, u, t];
  }
  function $2(t, l) {
    t.action = l;
  }
  function Jo(t) {
    var l = Xt(), e = Nt;
    if (e !== null)
      return wo(l, e, t);
    Xt(), l = l.memoizedState, e = Xt();
    var n = e.queue.dispatch;
    return e.memoizedState = t, [l, n, !1];
  }
  function Zn(t, l, e, n) {
    return t = { tag: t, create: e, deps: n, inst: l, next: null }, l = st.updateQueue, l === null && (l = wu(), st.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (n = e.next, e.next = t, t.next = n, l.lastEffect = t), t;
  }
  function $o() {
    return Xt().memoizedState;
  }
  function Wu(t, l, e, n) {
    var a = ul();
    st.flags |= t, a.memoizedState = Zn(
      1 | l,
      { destroy: void 0 },
      e,
      n === void 0 ? null : n
    );
  }
  function Fu(t, l, e, n) {
    var a = Xt();
    n = n === void 0 ? null : n;
    var u = a.memoizedState.inst;
    Nt !== null && n !== null && ac(n, Nt.memoizedState.deps) ? a.memoizedState = Zn(l, u, e, n) : (st.flags |= t, a.memoizedState = Zn(
      1 | l,
      u,
      e,
      n
    ));
  }
  function Wo(t, l) {
    Wu(8390656, 8, t, l);
  }
  function mc(t, l) {
    Fu(2048, 8, t, l);
  }
  function W2(t) {
    st.flags |= 4;
    var l = st.updateQueue;
    if (l === null)
      l = wu(), st.updateQueue = l, l.events = [t];
    else {
      var e = l.events;
      e === null ? l.events = [t] : e.push(t);
    }
  }
  function Fo(t) {
    var l = Xt().memoizedState;
    return W2({ ref: l, nextImpl: t }), function() {
      if ((zt & 2) !== 0) throw Error(c(440));
      return l.impl.apply(void 0, arguments);
    };
  }
  function ko(t, l) {
    return Fu(4, 2, t, l);
  }
  function Io(t, l) {
    return Fu(4, 4, t, l);
  }
  function Po(t, l) {
    if (typeof l == "function") {
      t = t();
      var e = l(t);
      return function() {
        typeof e == "function" ? e() : l(null);
      };
    }
    if (l != null)
      return t = t(), l.current = t, function() {
        l.current = null;
      };
  }
  function t1(t, l, e) {
    e = e != null ? e.concat([t]) : null, Fu(4, 4, Po.bind(null, l, t), e);
  }
  function vc() {
  }
  function l1(t, l) {
    var e = Xt();
    l = l === void 0 ? null : l;
    var n = e.memoizedState;
    return l !== null && ac(l, n[1]) ? n[0] : (e.memoizedState = [t, l], t);
  }
  function e1(t, l) {
    var e = Xt();
    l = l === void 0 ? null : l;
    var n = e.memoizedState;
    if (l !== null && ac(l, n[1]))
      return n[0];
    if (n = t(), en) {
      ve(!0);
      try {
        t();
      } finally {
        ve(!1);
      }
    }
    return e.memoizedState = [n, l], n;
  }
  function yc(t, l, e) {
    return e === void 0 || (ne & 1073741824) !== 0 && (gt & 261930) === 0 ? t.memoizedState = l : (t.memoizedState = e, t = ns(), st.lanes |= t, Oe |= t, e);
  }
  function n1(t, l, e, n) {
    return Sl(e, l) ? e : Cn.current !== null ? (t = yc(t, e, n), Sl(t, l) || (Jt = !0), t) : (ne & 42) === 0 || (ne & 1073741824) !== 0 && (gt & 261930) === 0 ? (Jt = !0, t.memoizedState = e) : (t = ns(), st.lanes |= t, Oe |= t, l);
  }
  function a1(t, l, e, n, a) {
    var u = G.p;
    G.p = u !== 0 && 8 > u ? u : 8;
    var r = x.T, s = {};
    x.T = s, Sc(t, !1, l, e);
    try {
      var g = a(), _ = x.S;
      if (_ !== null && _(s, g), g !== null && typeof g == "object" && typeof g.then == "function") {
        var D = Q2(
          g,
          n
        );
        Da(
          t,
          l,
          D,
          xl(t)
        );
      } else
        Da(
          t,
          l,
          n,
          xl(t)
        );
    } catch (q) {
      Da(
        t,
        l,
        { then: function() {
        }, status: "rejected", reason: q },
        xl()
      );
    } finally {
      G.p = u, r !== null && s.types !== null && (r.types = s.types), x.T = r;
    }
  }
  function F2() {
  }
  function gc(t, l, e, n) {
    if (t.tag !== 5) throw Error(c(476));
    var a = u1(t).queue;
    a1(
      t,
      a,
      l,
      Q,
      e === null ? F2 : function() {
        return i1(t), e(n);
      }
    );
  }
  function u1(t) {
    var l = t.memoizedState;
    if (l !== null) return l;
    l = {
      memoizedState: Q,
      baseState: Q,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ae,
        lastRenderedState: Q
      },
      next: null
    };
    var e = {};
    return l.next = {
      memoizedState: e,
      baseState: e,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ae,
        lastRenderedState: e
      },
      next: null
    }, t.memoizedState = l, t = t.alternate, t !== null && (t.memoizedState = l), l;
  }
  function i1(t) {
    var l = u1(t);
    l.next === null && (l = t.alternate.memoizedState), Da(
      t,
      l.next.queue,
      {},
      xl()
    );
  }
  function pc() {
    return tl($a);
  }
  function f1() {
    return Xt().memoizedState;
  }
  function c1() {
    return Xt().memoizedState;
  }
  function k2(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var e = xl();
          t = Me(e);
          var n = ze(l, t, e);
          n !== null && (dl(n, l, e), Ta(n, l, e)), l = { cache: Jf() }, t.payload = l;
          return;
      }
      l = l.return;
    }
  }
  function I2(t, l, e) {
    var n = xl();
    e = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ku(t) ? o1(l, e) : (e = qf(t, l, e, n), e !== null && (dl(e, t, n), s1(e, l, n)));
  }
  function r1(t, l, e) {
    var n = xl();
    Da(t, l, e, n);
  }
  function Da(t, l, e, n) {
    var a = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (ku(t)) o1(l, a);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = l.lastRenderedReducer, u !== null))
        try {
          var r = l.lastRenderedState, s = u(r, e);
          if (a.hasEagerState = !0, a.eagerState = s, Sl(s, r))
            return Du(t, l, a, 0), Dt === null && Hu(), !1;
        } catch {
        } finally {
        }
      if (e = qf(t, l, a, n), e !== null)
        return dl(e, t, n), s1(e, l, n), !0;
    }
    return !1;
  }
  function Sc(t, l, e, n) {
    if (n = {
      lane: 2,
      revertLane: kc(),
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ku(t)) {
      if (l) throw Error(c(479));
    } else
      l = qf(
        t,
        e,
        n,
        2
      ), l !== null && dl(l, t, 2);
  }
  function ku(t) {
    var l = t.alternate;
    return t === st || l !== null && l === st;
  }
  function o1(t, l) {
    qn = Qu = !0;
    var e = t.pending;
    e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
  }
  function s1(t, l, e) {
    if ((e & 4194048) !== 0) {
      var n = l.lanes;
      n &= t.pendingLanes, e |= n, l.lanes = e, vr(t, e);
    }
  }
  var Ua = {
    readContext: tl,
    use: Ju,
    useCallback: Zt,
    useContext: Zt,
    useEffect: Zt,
    useImperativeHandle: Zt,
    useLayoutEffect: Zt,
    useInsertionEffect: Zt,
    useMemo: Zt,
    useReducer: Zt,
    useRef: Zt,
    useState: Zt,
    useDebugValue: Zt,
    useDeferredValue: Zt,
    useTransition: Zt,
    useSyncExternalStore: Zt,
    useId: Zt,
    useHostTransitionStatus: Zt,
    useFormState: Zt,
    useActionState: Zt,
    useOptimistic: Zt,
    useMemoCache: Zt,
    useCacheRefresh: Zt
  };
  Ua.useEffectEvent = Zt;
  var h1 = {
    readContext: tl,
    use: Ju,
    useCallback: function(t, l) {
      return ul().memoizedState = [
        t,
        l === void 0 ? null : l
      ], t;
    },
    useContext: tl,
    useEffect: Wo,
    useImperativeHandle: function(t, l, e) {
      e = e != null ? e.concat([t]) : null, Wu(
        4194308,
        4,
        Po.bind(null, l, t),
        e
      );
    },
    useLayoutEffect: function(t, l) {
      return Wu(4194308, 4, t, l);
    },
    useInsertionEffect: function(t, l) {
      Wu(4, 2, t, l);
    },
    useMemo: function(t, l) {
      var e = ul();
      l = l === void 0 ? null : l;
      var n = t();
      if (en) {
        ve(!0);
        try {
          t();
        } finally {
          ve(!1);
        }
      }
      return e.memoizedState = [n, l], n;
    },
    useReducer: function(t, l, e) {
      var n = ul();
      if (e !== void 0) {
        var a = e(l);
        if (en) {
          ve(!0);
          try {
            e(l);
          } finally {
            ve(!1);
          }
        }
      } else a = l;
      return n.memoizedState = n.baseState = a, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: a
      }, n.queue = t, t = t.dispatch = I2.bind(
        null,
        st,
        t
      ), [n.memoizedState, t];
    },
    useRef: function(t) {
      var l = ul();
      return t = { current: t }, l.memoizedState = t;
    },
    useState: function(t) {
      t = hc(t);
      var l = t.queue, e = r1.bind(null, st, l);
      return l.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: vc,
    useDeferredValue: function(t, l) {
      var e = ul();
      return yc(e, t, l);
    },
    useTransition: function() {
      var t = hc(!1);
      return t = a1.bind(
        null,
        st,
        t.queue,
        !0,
        !1
      ), ul().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, l, e) {
      var n = st, a = ul();
      if (St) {
        if (e === void 0)
          throw Error(c(407));
        e = e();
      } else {
        if (e = l(), Dt === null)
          throw Error(c(349));
        (gt & 127) !== 0 || Ro(n, l, e);
      }
      a.memoizedState = e;
      var u = { value: e, getSnapshot: l };
      return a.queue = u, Wo(Co.bind(null, n, u, t), [
        t
      ]), n.flags |= 2048, Zn(
        9,
        { destroy: void 0 },
        jo.bind(
          null,
          n,
          u,
          e,
          l
        ),
        null
      ), e;
    },
    useId: function() {
      var t = ul(), l = Dt.identifierPrefix;
      if (St) {
        var e = Ql, n = Vl;
        e = (n & ~(1 << 32 - pl(n) - 1)).toString(32) + e, l = "_" + l + "R_" + e, e = Ku++, 0 < e && (l += "H" + e.toString(32)), l += "_";
      } else
        e = K2++, l = "_" + l + "r_" + e.toString(32) + "_";
      return t.memoizedState = l;
    },
    useHostTransitionStatus: pc,
    useFormState: Qo,
    useActionState: Qo,
    useOptimistic: function(t) {
      var l = ul();
      l.memoizedState = l.baseState = t;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return l.queue = e, l = Sc.bind(
        null,
        st,
        !0,
        e
      ), e.dispatch = l, [t, l];
    },
    useMemoCache: rc,
    useCacheRefresh: function() {
      return ul().memoizedState = k2.bind(
        null,
        st
      );
    },
    useEffectEvent: function(t) {
      var l = ul(), e = { impl: t };
      return l.memoizedState = e, function() {
        if ((zt & 2) !== 0)
          throw Error(c(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, bc = {
    readContext: tl,
    use: Ju,
    useCallback: l1,
    useContext: tl,
    useEffect: mc,
    useImperativeHandle: t1,
    useInsertionEffect: ko,
    useLayoutEffect: Io,
    useMemo: e1,
    useReducer: $u,
    useRef: $o,
    useState: function() {
      return $u(ae);
    },
    useDebugValue: vc,
    useDeferredValue: function(t, l) {
      var e = Xt();
      return n1(
        e,
        Nt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = $u(ae)[0], l = Xt().memoizedState;
      return [
        typeof t == "boolean" ? t : Ha(t),
        l
      ];
    },
    useSyncExternalStore: Uo,
    useId: f1,
    useHostTransitionStatus: pc,
    useFormState: Ko,
    useActionState: Ko,
    useOptimistic: function(t, l) {
      var e = Xt();
      return Zo(e, Nt, t, l);
    },
    useMemoCache: rc,
    useCacheRefresh: c1
  };
  bc.useEffectEvent = Fo;
  var d1 = {
    readContext: tl,
    use: Ju,
    useCallback: l1,
    useContext: tl,
    useEffect: mc,
    useImperativeHandle: t1,
    useInsertionEffect: ko,
    useLayoutEffect: Io,
    useMemo: e1,
    useReducer: sc,
    useRef: $o,
    useState: function() {
      return sc(ae);
    },
    useDebugValue: vc,
    useDeferredValue: function(t, l) {
      var e = Xt();
      return Nt === null ? yc(e, t, l) : n1(
        e,
        Nt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = sc(ae)[0], l = Xt().memoizedState;
      return [
        typeof t == "boolean" ? t : Ha(t),
        l
      ];
    },
    useSyncExternalStore: Uo,
    useId: f1,
    useHostTransitionStatus: pc,
    useFormState: Jo,
    useActionState: Jo,
    useOptimistic: function(t, l) {
      var e = Xt();
      return Nt !== null ? Zo(e, Nt, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: rc,
    useCacheRefresh: c1
  };
  d1.useEffectEvent = Fo;
  function Ec(t, l, e, n) {
    l = t.memoizedState, e = e(n, l), e = e == null ? l : p({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
  }
  var Ac = {
    enqueueSetState: function(t, l, e) {
      t = t._reactInternals;
      var n = xl(), a = Me(n);
      a.payload = l, e != null && (a.callback = e), l = ze(t, a, n), l !== null && (dl(l, t, n), Ta(l, t, n));
    },
    enqueueReplaceState: function(t, l, e) {
      t = t._reactInternals;
      var n = xl(), a = Me(n);
      a.tag = 1, a.payload = l, e != null && (a.callback = e), l = ze(t, a, n), l !== null && (dl(l, t, n), Ta(l, t, n));
    },
    enqueueForceUpdate: function(t, l) {
      t = t._reactInternals;
      var e = xl(), n = Me(e);
      n.tag = 2, l != null && (n.callback = l), l = ze(t, n, e), l !== null && (dl(l, t, e), Ta(l, t, e));
    }
  };
  function m1(t, l, e, n, a, u, r) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(n, u, r) : l.prototype && l.prototype.isPureReactComponent ? !pa(e, n) || !pa(a, u) : !0;
  }
  function v1(t, l, e, n) {
    t = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(e, n), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(e, n), l.state !== t && Ac.enqueueReplaceState(l, l.state, null);
  }
  function nn(t, l) {
    var e = l;
    if ("ref" in l) {
      e = {};
      for (var n in l)
        n !== "ref" && (e[n] = l[n]);
    }
    if (t = t.defaultProps) {
      e === l && (e = p({}, e));
      for (var a in t)
        e[a] === void 0 && (e[a] = t[a]);
    }
    return e;
  }
  function y1(t) {
    Ou(t);
  }
  function g1(t) {
    console.error(t);
  }
  function p1(t) {
    Ou(t);
  }
  function Iu(t, l) {
    try {
      var e = t.onUncaughtError;
      e(l.value, { componentStack: l.stack });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function S1(t, l, e) {
    try {
      var n = t.onCaughtError;
      n(e.value, {
        componentStack: e.stack,
        errorBoundary: l.tag === 1 ? l.stateNode : null
      });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Mc(t, l, e) {
    return e = Me(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      Iu(t, l);
    }, e;
  }
  function b1(t) {
    return t = Me(t), t.tag = 3, t;
  }
  function E1(t, l, e, n) {
    var a = e.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var u = n.value;
      t.payload = function() {
        return a(u);
      }, t.callback = function() {
        S1(l, e, n);
      };
    }
    var r = e.stateNode;
    r !== null && typeof r.componentDidCatch == "function" && (t.callback = function() {
      S1(l, e, n), typeof a != "function" && (He === null ? He = /* @__PURE__ */ new Set([this]) : He.add(this));
      var s = n.stack;
      this.componentDidCatch(n.value, {
        componentStack: s !== null ? s : ""
      });
    });
  }
  function P2(t, l, e, n, a) {
    if (e.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
      if (l = e.alternate, l !== null && Hn(
        l,
        e,
        a,
        !0
      ), e = El.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return jl === null ? oi() : e.alternate === null && Yt === 0 && (Yt = 3), e.flags &= -257, e.flags |= 65536, e.lanes = a, n === Yu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([n]) : l.add(n), $c(t, n, a)), !1;
          case 22:
            return e.flags |= 65536, n === Yu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([n])
            }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([n]) : e.add(n)), $c(t, n, a)), !1;
        }
        throw Error(c(435, e.tag));
      }
      return $c(t, n, a), oi(), !1;
    }
    if (St)
      return l = El.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = a, n !== Xf && (t = Error(c(422), { cause: n }), Ea(Hl(t, e)))) : (n !== Xf && (l = Error(c(423), {
        cause: n
      }), Ea(
        Hl(l, e)
      )), t = t.current.alternate, t.flags |= 65536, a &= -a, t.lanes |= a, n = Hl(n, e), a = Mc(
        t.stateNode,
        n,
        a
      ), Pf(t, a), Yt !== 4 && (Yt = 2)), !1;
    var u = Error(c(520), { cause: n });
    if (u = Hl(u, e), La === null ? La = [u] : La.push(u), Yt !== 4 && (Yt = 2), l === null) return !0;
    n = Hl(n, e), e = l;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = a & -a, e.lanes |= t, t = Mc(e.stateNode, n, t), Pf(e, t), !1;
        case 1:
          if (l = e.type, u = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (He === null || !He.has(u))))
            return e.flags |= 65536, a &= -a, e.lanes |= a, a = b1(a), E1(
              a,
              t,
              e,
              n
            ), Pf(e, a), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var zc = Error(c(461)), Jt = !1;
  function ll(t, l, e, n) {
    l.child = t === null ? xo(l, null, e, n) : ln(
      l,
      t.child,
      e,
      n
    );
  }
  function A1(t, l, e, n, a) {
    e = e.render;
    var u = l.ref;
    if ("ref" in n) {
      var r = {};
      for (var s in n)
        s !== "ref" && (r[s] = n[s]);
    } else r = n;
    return ke(l), n = uc(
      t,
      l,
      e,
      r,
      u,
      a
    ), s = ic(), t !== null && !Jt ? (fc(t, l, a), ue(t, l, a)) : (St && s && Lf(l), l.flags |= 1, ll(t, l, n, a), l.child);
  }
  function M1(t, l, e, n, a) {
    if (t === null) {
      var u = e.type;
      return typeof u == "function" && !Bf(u) && u.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = u, z1(
        t,
        l,
        u,
        n,
        a
      )) : (t = Ru(
        e.type,
        null,
        n,
        l,
        l.mode,
        a
      ), t.ref = l.ref, t.return = l, l.child = t);
    }
    if (u = t.child, !Uc(t, a)) {
      var r = u.memoizedProps;
      if (e = e.compare, e = e !== null ? e : pa, e(r, n) && t.ref === l.ref)
        return ue(t, l, a);
    }
    return l.flags |= 1, t = Pl(u, n), t.ref = l.ref, t.return = l, l.child = t;
  }
  function z1(t, l, e, n, a) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (pa(u, n) && t.ref === l.ref)
        if (Jt = !1, l.pendingProps = n = u, Uc(t, a))
          (t.flags & 131072) !== 0 && (Jt = !0);
        else
          return l.lanes = t.lanes, ue(t, l, a);
    }
    return xc(
      t,
      l,
      e,
      n,
      a
    );
  }
  function x1(t, l, e, n) {
    var a = n.children, u = t !== null ? t.memoizedState : null;
    if (t === null && l.stateNode === null && (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.mode === "hidden") {
      if ((l.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | e : e, t !== null) {
          for (n = l.child = t.child, a = 0; n !== null; )
            a = a | n.lanes | n.childLanes, n = n.sibling;
          n = a & ~u;
        } else n = 0, l.child = null;
        return T1(
          t,
          l,
          u,
          e,
          n
        );
      }
      if ((e & 536870912) !== 0)
        l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Bu(
          l,
          u !== null ? u.cachePool : null
        ), u !== null ? No(l, u) : lc(), Oo(l);
      else
        return n = l.lanes = 536870912, T1(
          t,
          l,
          u !== null ? u.baseLanes | e : e,
          e,
          n
        );
    } else
      u !== null ? (Bu(l, u.cachePool), No(l, u), Te(), l.memoizedState = null) : (t !== null && Bu(l, null), lc(), Te());
    return ll(t, l, a, e), l.child;
  }
  function Ra(t, l) {
    return t !== null && t.tag === 22 || l.stateNode !== null || (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.sibling;
  }
  function T1(t, l, e, n, a) {
    var u = Wf();
    return u = u === null ? null : { parent: Kt._currentValue, pool: u }, l.memoizedState = {
      baseLanes: e,
      cachePool: u
    }, t !== null && Bu(l, null), lc(), Oo(l), t !== null && Hn(t, l, n, !0), l.childLanes = a, null;
  }
  function Pu(t, l) {
    return l = li(
      { mode: l.mode, children: l.children },
      t.mode
    ), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function _1(t, l, e) {
    return ln(l, t.child, null, e), t = Pu(l, l.pendingProps), t.flags |= 2, Al(l), l.memoizedState = null, t;
  }
  function tm(t, l, e) {
    var n = l.pendingProps, a = (l.flags & 128) !== 0;
    if (l.flags &= -129, t === null) {
      if (St) {
        if (n.mode === "hidden")
          return t = Pu(l, n), l.lanes = 536870912, Ra(null, t);
        if (nc(l), (t = Rt) ? (t = Ys(
          t,
          Rl
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: pe !== null ? { id: Vl, overflow: Ql } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = ro(t), e.return = l, l.child = e, Pt = l, Rt = null)) : t = null, t === null) throw be(l);
        return l.lanes = 536870912, null;
      }
      return Pu(l, n);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var r = u.dehydrated;
      if (nc(l), a)
        if (l.flags & 256)
          l.flags &= -257, l = _1(
            t,
            l,
            e
          );
        else if (l.memoizedState !== null)
          l.child = t.child, l.flags |= 128, l = null;
        else throw Error(c(558));
      else if (Jt || Hn(t, l, e, !1), a = (e & t.childLanes) !== 0, Jt || a) {
        if (n = Dt, n !== null && (r = yr(n, e), r !== 0 && r !== u.retryLane))
          throw u.retryLane = r, Je(t, r), dl(n, t, r), zc;
        oi(), l = _1(
          t,
          l,
          e
        );
      } else
        t = u.treeContext, Rt = Cl(r.nextSibling), Pt = l, St = !0, Se = null, Rl = !1, t !== null && ho(l, t), l = Pu(l, n), l.flags |= 4096;
      return l;
    }
    return t = Pl(t.child, {
      mode: n.mode,
      children: n.children
    }), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function ti(t, l) {
    var e = l.ref;
    if (e === null)
      t !== null && t.ref !== null && (l.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(c(284));
      (t === null || t.ref !== e) && (l.flags |= 4194816);
    }
  }
  function xc(t, l, e, n, a) {
    return ke(l), e = uc(
      t,
      l,
      e,
      n,
      void 0,
      a
    ), n = ic(), t !== null && !Jt ? (fc(t, l, a), ue(t, l, a)) : (St && n && Lf(l), l.flags |= 1, ll(t, l, e, a), l.child);
  }
  function N1(t, l, e, n, a, u) {
    return ke(l), l.updateQueue = null, e = Do(
      l,
      n,
      e,
      a
    ), Ho(t), n = ic(), t !== null && !Jt ? (fc(t, l, u), ue(t, l, u)) : (St && n && Lf(l), l.flags |= 1, ll(t, l, e, u), l.child);
  }
  function O1(t, l, e, n, a) {
    if (ke(l), l.stateNode === null) {
      var u = Tn, r = e.contextType;
      typeof r == "object" && r !== null && (u = tl(r)), u = new e(n, u), l.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Ac, l.stateNode = u, u._reactInternals = l, u = l.stateNode, u.props = n, u.state = l.memoizedState, u.refs = {}, kf(l), r = e.contextType, u.context = typeof r == "object" && r !== null ? tl(r) : Tn, u.state = l.memoizedState, r = e.getDerivedStateFromProps, typeof r == "function" && (Ec(
        l,
        e,
        r,
        n
      ), u.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (r = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), r !== u.state && Ac.enqueueReplaceState(u, u.state, null), Na(l, n, u, a), _a(), u.state = l.memoizedState), typeof u.componentDidMount == "function" && (l.flags |= 4194308), n = !0;
    } else if (t === null) {
      u = l.stateNode;
      var s = l.memoizedProps, g = nn(e, s);
      u.props = g;
      var _ = u.context, D = e.contextType;
      r = Tn, typeof D == "object" && D !== null && (r = tl(D));
      var q = e.getDerivedStateFromProps;
      D = typeof q == "function" || typeof u.getSnapshotBeforeUpdate == "function", s = l.pendingProps !== s, D || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (s || _ !== r) && v1(
        l,
        u,
        n,
        r
      ), Ae = !1;
      var N = l.memoizedState;
      u.state = N, Na(l, n, u, a), _a(), _ = l.memoizedState, s || N !== _ || Ae ? (typeof q == "function" && (Ec(
        l,
        e,
        q,
        n
      ), _ = l.memoizedState), (g = Ae || m1(
        l,
        e,
        g,
        n,
        N,
        _,
        r
      )) ? (D || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = n, l.memoizedState = _), u.props = n, u.state = _, u.context = r, n = g) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), n = !1);
    } else {
      u = l.stateNode, If(t, l), r = l.memoizedProps, D = nn(e, r), u.props = D, q = l.pendingProps, N = u.context, _ = e.contextType, g = Tn, typeof _ == "object" && _ !== null && (g = tl(_)), s = e.getDerivedStateFromProps, (_ = typeof s == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (r !== q || N !== g) && v1(
        l,
        u,
        n,
        g
      ), Ae = !1, N = l.memoizedState, u.state = N, Na(l, n, u, a), _a();
      var H = l.memoizedState;
      r !== q || N !== H || Ae || t !== null && t.dependencies !== null && Cu(t.dependencies) ? (typeof s == "function" && (Ec(
        l,
        e,
        s,
        n
      ), H = l.memoizedState), (D = Ae || m1(
        l,
        e,
        D,
        n,
        N,
        H,
        g
      ) || t !== null && t.dependencies !== null && Cu(t.dependencies)) ? (_ || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(n, H, g), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        n,
        H,
        g
      )), typeof u.componentDidUpdate == "function" && (l.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || r === t.memoizedProps && N === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || r === t.memoizedProps && N === t.memoizedState || (l.flags |= 1024), l.memoizedProps = n, l.memoizedState = H), u.props = n, u.state = H, u.context = g, n = D) : (typeof u.componentDidUpdate != "function" || r === t.memoizedProps && N === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || r === t.memoizedProps && N === t.memoizedState || (l.flags |= 1024), n = !1);
    }
    return u = n, ti(t, l), n = (l.flags & 128) !== 0, u || n ? (u = l.stateNode, e = n && typeof e.getDerivedStateFromError != "function" ? null : u.render(), l.flags |= 1, t !== null && n ? (l.child = ln(
      l,
      t.child,
      null,
      a
    ), l.child = ln(
      l,
      null,
      e,
      a
    )) : ll(t, l, e, a), l.memoizedState = u.state, t = l.child) : t = ue(
      t,
      l,
      a
    ), t;
  }
  function H1(t, l, e, n) {
    return We(), l.flags |= 256, ll(t, l, e, n), l.child;
  }
  var Tc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function _c(t) {
    return { baseLanes: t, cachePool: So() };
  }
  function Nc(t, l, e) {
    return t = t !== null ? t.childLanes & ~e : 0, l && (t |= zl), t;
  }
  function D1(t, l, e) {
    var n = l.pendingProps, a = !1, u = (l.flags & 128) !== 0, r;
    if ((r = u) || (r = t !== null && t.memoizedState === null ? !1 : (Gt.current & 2) !== 0), r && (a = !0, l.flags &= -129), r = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
      if (St) {
        if (a ? xe(l) : Te(), (t = Rt) ? (t = Ys(
          t,
          Rl
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: pe !== null ? { id: Vl, overflow: Ql } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = ro(t), e.return = l, l.child = e, Pt = l, Rt = null)) : t = null, t === null) throw be(l);
        return o0(t) ? l.lanes = 32 : l.lanes = 536870912, null;
      }
      var s = n.children;
      return n = n.fallback, a ? (Te(), a = l.mode, s = li(
        { mode: "hidden", children: s },
        a
      ), n = $e(
        n,
        a,
        e,
        null
      ), s.return = l, n.return = l, s.sibling = n, l.child = s, n = l.child, n.memoizedState = _c(e), n.childLanes = Nc(
        t,
        r,
        e
      ), l.memoizedState = Tc, Ra(null, n)) : (xe(l), Oc(l, s));
    }
    var g = t.memoizedState;
    if (g !== null && (s = g.dehydrated, s !== null)) {
      if (u)
        l.flags & 256 ? (xe(l), l.flags &= -257, l = Hc(
          t,
          l,
          e
        )) : l.memoizedState !== null ? (Te(), l.child = t.child, l.flags |= 128, l = null) : (Te(), s = n.fallback, a = l.mode, n = li(
          { mode: "visible", children: n.children },
          a
        ), s = $e(
          s,
          a,
          e,
          null
        ), s.flags |= 2, n.return = l, s.return = l, n.sibling = s, l.child = n, ln(
          l,
          t.child,
          null,
          e
        ), n = l.child, n.memoizedState = _c(e), n.childLanes = Nc(
          t,
          r,
          e
        ), l.memoizedState = Tc, l = Ra(null, n));
      else if (xe(l), o0(s)) {
        if (r = s.nextSibling && s.nextSibling.dataset, r) var _ = r.dgst;
        r = _, n = Error(c(419)), n.stack = "", n.digest = r, Ea({ value: n, source: null, stack: null }), l = Hc(
          t,
          l,
          e
        );
      } else if (Jt || Hn(t, l, e, !1), r = (e & t.childLanes) !== 0, Jt || r) {
        if (r = Dt, r !== null && (n = yr(r, e), n !== 0 && n !== g.retryLane))
          throw g.retryLane = n, Je(t, n), dl(r, t, n), zc;
        r0(s) || oi(), l = Hc(
          t,
          l,
          e
        );
      } else
        r0(s) ? (l.flags |= 192, l.child = t.child, l = null) : (t = g.treeContext, Rt = Cl(
          s.nextSibling
        ), Pt = l, St = !0, Se = null, Rl = !1, t !== null && ho(l, t), l = Oc(
          l,
          n.children
        ), l.flags |= 4096);
      return l;
    }
    return a ? (Te(), s = n.fallback, a = l.mode, g = t.child, _ = g.sibling, n = Pl(g, {
      mode: "hidden",
      children: n.children
    }), n.subtreeFlags = g.subtreeFlags & 65011712, _ !== null ? s = Pl(
      _,
      s
    ) : (s = $e(
      s,
      a,
      e,
      null
    ), s.flags |= 2), s.return = l, n.return = l, n.sibling = s, l.child = n, Ra(null, n), n = l.child, s = t.child.memoizedState, s === null ? s = _c(e) : (a = s.cachePool, a !== null ? (g = Kt._currentValue, a = a.parent !== g ? { parent: g, pool: g } : a) : a = So(), s = {
      baseLanes: s.baseLanes | e,
      cachePool: a
    }), n.memoizedState = s, n.childLanes = Nc(
      t,
      r,
      e
    ), l.memoizedState = Tc, Ra(t.child, n)) : (xe(l), e = t.child, t = e.sibling, e = Pl(e, {
      mode: "visible",
      children: n.children
    }), e.return = l, e.sibling = null, t !== null && (r = l.deletions, r === null ? (l.deletions = [t], l.flags |= 16) : r.push(t)), l.child = e, l.memoizedState = null, e);
  }
  function Oc(t, l) {
    return l = li(
      { mode: "visible", children: l },
      t.mode
    ), l.return = t, t.child = l;
  }
  function li(t, l) {
    return t = bl(22, t, null, l), t.lanes = 0, t;
  }
  function Hc(t, l, e) {
    return ln(l, t.child, null, e), t = Oc(
      l,
      l.pendingProps.children
    ), t.flags |= 2, l.memoizedState = null, t;
  }
  function U1(t, l, e) {
    t.lanes |= l;
    var n = t.alternate;
    n !== null && (n.lanes |= l), Kf(t.return, l, e);
  }
  function Dc(t, l, e, n, a, u) {
    var r = t.memoizedState;
    r === null ? t.memoizedState = {
      isBackwards: l,
      rendering: null,
      renderingStartTime: 0,
      last: n,
      tail: e,
      tailMode: a,
      treeForkCount: u
    } : (r.isBackwards = l, r.rendering = null, r.renderingStartTime = 0, r.last = n, r.tail = e, r.tailMode = a, r.treeForkCount = u);
  }
  function R1(t, l, e) {
    var n = l.pendingProps, a = n.revealOrder, u = n.tail;
    n = n.children;
    var r = Gt.current, s = (r & 2) !== 0;
    if (s ? (r = r & 1 | 2, l.flags |= 128) : r &= 1, X(Gt, r), ll(t, l, n, e), n = St ? ba : 0, !s && t !== null && (t.flags & 128) !== 0)
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && U1(t, e, l);
        else if (t.tag === 19)
          U1(t, e, l);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === l) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (a) {
      case "forwards":
        for (e = l.child, a = null; e !== null; )
          t = e.alternate, t !== null && Vu(t) === null && (a = e), e = e.sibling;
        e = a, e === null ? (a = l.child, l.child = null) : (a = e.sibling, e.sibling = null), Dc(
          l,
          !1,
          a,
          e,
          u,
          n
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (e = null, a = l.child, l.child = null; a !== null; ) {
          if (t = a.alternate, t !== null && Vu(t) === null) {
            l.child = a;
            break;
          }
          t = a.sibling, a.sibling = e, e = a, a = t;
        }
        Dc(
          l,
          !0,
          e,
          null,
          u,
          n
        );
        break;
      case "together":
        Dc(
          l,
          !1,
          null,
          null,
          void 0,
          n
        );
        break;
      default:
        l.memoizedState = null;
    }
    return l.child;
  }
  function ue(t, l, e) {
    if (t !== null && (l.dependencies = t.dependencies), Oe |= l.lanes, (e & l.childLanes) === 0)
      if (t !== null) {
        if (Hn(
          t,
          l,
          e,
          !1
        ), (e & l.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && l.child !== t.child)
      throw Error(c(153));
    if (l.child !== null) {
      for (t = l.child, e = Pl(t, t.pendingProps), l.child = e, e.return = l; t.sibling !== null; )
        t = t.sibling, e = e.sibling = Pl(t, t.pendingProps), e.return = l;
      e.sibling = null;
    }
    return l.child;
  }
  function Uc(t, l) {
    return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Cu(t)));
  }
  function lm(t, l, e) {
    switch (l.tag) {
      case 3:
        al(l, l.stateNode.containerInfo), Ee(l, Kt, t.memoizedState.cache), We();
        break;
      case 27:
      case 5:
        ua(l);
        break;
      case 4:
        al(l, l.stateNode.containerInfo);
        break;
      case 10:
        Ee(
          l,
          l.type,
          l.memoizedProps.value
        );
        break;
      case 31:
        if (l.memoizedState !== null)
          return l.flags |= 128, nc(l), null;
        break;
      case 13:
        var n = l.memoizedState;
        if (n !== null)
          return n.dehydrated !== null ? (xe(l), l.flags |= 128, null) : (e & l.child.childLanes) !== 0 ? D1(t, l, e) : (xe(l), t = ue(
            t,
            l,
            e
          ), t !== null ? t.sibling : null);
        xe(l);
        break;
      case 19:
        var a = (t.flags & 128) !== 0;
        if (n = (e & l.childLanes) !== 0, n || (Hn(
          t,
          l,
          e,
          !1
        ), n = (e & l.childLanes) !== 0), a) {
          if (n)
            return R1(
              t,
              l,
              e
            );
          l.flags |= 128;
        }
        if (a = l.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), X(Gt, Gt.current), n) break;
        return null;
      case 22:
        return l.lanes = 0, x1(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        Ee(l, Kt, t.memoizedState.cache);
    }
    return ue(t, l, e);
  }
  function j1(t, l, e) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps)
        Jt = !0;
      else {
        if (!Uc(t, e) && (l.flags & 128) === 0)
          return Jt = !1, lm(
            t,
            l,
            e
          );
        Jt = (t.flags & 131072) !== 0;
      }
    else
      Jt = !1, St && (l.flags & 1048576) !== 0 && so(l, ba, l.index);
    switch (l.lanes = 0, l.tag) {
      case 16:
        t: {
          var n = l.pendingProps;
          if (t = Pe(l.elementType), l.type = t, typeof t == "function")
            Bf(t) ? (n = nn(t, n), l.tag = 1, l = O1(
              null,
              l,
              t,
              n,
              e
            )) : (l.tag = 0, l = xc(
              null,
              l,
              t,
              n,
              e
            ));
          else {
            if (t != null) {
              var a = t.$$typeof;
              if (a === V) {
                l.tag = 11, l = A1(
                  null,
                  l,
                  t,
                  n,
                  e
                );
                break t;
              } else if (a === $) {
                l.tag = 14, l = M1(
                  null,
                  l,
                  t,
                  n,
                  e
                );
                break t;
              }
            }
            throw l = at(t) || t, Error(c(306, l, ""));
          }
        }
        return l;
      case 0:
        return xc(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 1:
        return n = l.type, a = nn(
          n,
          l.pendingProps
        ), O1(
          t,
          l,
          n,
          a,
          e
        );
      case 3:
        t: {
          if (al(
            l,
            l.stateNode.containerInfo
          ), t === null) throw Error(c(387));
          n = l.pendingProps;
          var u = l.memoizedState;
          a = u.element, If(t, l), Na(l, n, null, e);
          var r = l.memoizedState;
          if (n = r.cache, Ee(l, Kt, n), n !== u.cache && wf(
            l,
            [Kt],
            e,
            !0
          ), _a(), n = r.element, u.isDehydrated)
            if (u = {
              element: n,
              isDehydrated: !1,
              cache: r.cache
            }, l.updateQueue.baseState = u, l.memoizedState = u, l.flags & 256) {
              l = H1(
                t,
                l,
                n,
                e
              );
              break t;
            } else if (n !== a) {
              a = Hl(
                Error(c(424)),
                l
              ), Ea(a), l = H1(
                t,
                l,
                n,
                e
              );
              break t;
            } else {
              switch (t = l.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (Rt = Cl(t.firstChild), Pt = l, St = !0, Se = null, Rl = !0, e = xo(
                l,
                null,
                n,
                e
              ), l.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (We(), n === a) {
              l = ue(
                t,
                l,
                e
              );
              break t;
            }
            ll(t, l, n, e);
          }
          l = l.child;
        }
        return l;
      case 26:
        return ti(t, l), t === null ? (e = Ks(
          l.type,
          null,
          l.pendingProps,
          null
        )) ? l.memoizedState = e : St || (e = l.type, t = l.pendingProps, n = gi(
          mt.current
        ).createElement(e), n[It] = l, n[fl] = t, el(n, e, t), Ft(n), l.stateNode = n) : l.memoizedState = Ks(
          l.type,
          t.memoizedProps,
          l.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return ua(l), t === null && St && (n = l.stateNode = Xs(
          l.type,
          l.pendingProps,
          mt.current
        ), Pt = l, Rl = !0, a = Rt, je(l.type) ? (s0 = a, Rt = Cl(n.firstChild)) : Rt = a), ll(
          t,
          l,
          l.pendingProps.children,
          e
        ), ti(t, l), t === null && (l.flags |= 4194304), l.child;
      case 5:
        return t === null && St && ((a = n = Rt) && (n = Dm(
          n,
          l.type,
          l.pendingProps,
          Rl
        ), n !== null ? (l.stateNode = n, Pt = l, Rt = Cl(n.firstChild), Rl = !1, a = !0) : a = !1), a || be(l)), ua(l), a = l.type, u = l.pendingProps, r = t !== null ? t.memoizedProps : null, n = u.children, i0(a, u) ? n = null : r !== null && i0(a, r) && (l.flags |= 32), l.memoizedState !== null && (a = uc(
          t,
          l,
          w2,
          null,
          null,
          e
        ), $a._currentValue = a), ti(t, l), ll(t, l, n, e), l.child;
      case 6:
        return t === null && St && ((t = e = Rt) && (e = Um(
          e,
          l.pendingProps,
          Rl
        ), e !== null ? (l.stateNode = e, Pt = l, Rt = null, t = !0) : t = !1), t || be(l)), null;
      case 13:
        return D1(t, l, e);
      case 4:
        return al(
          l,
          l.stateNode.containerInfo
        ), n = l.pendingProps, t === null ? l.child = ln(
          l,
          null,
          n,
          e
        ) : ll(t, l, n, e), l.child;
      case 11:
        return A1(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 7:
        return ll(
          t,
          l,
          l.pendingProps,
          e
        ), l.child;
      case 8:
        return ll(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 12:
        return ll(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 10:
        return n = l.pendingProps, Ee(l, l.type, n.value), ll(t, l, n.children, e), l.child;
      case 9:
        return a = l.type._context, n = l.pendingProps.children, ke(l), a = tl(a), n = n(a), l.flags |= 1, ll(t, l, n, e), l.child;
      case 14:
        return M1(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 15:
        return z1(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 19:
        return R1(t, l, e);
      case 31:
        return tm(t, l, e);
      case 22:
        return x1(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        return ke(l), n = tl(Kt), t === null ? (a = Wf(), a === null && (a = Dt, u = Jf(), a.pooledCache = u, u.refCount++, u !== null && (a.pooledCacheLanes |= e), a = u), l.memoizedState = { parent: n, cache: a }, kf(l), Ee(l, Kt, a)) : ((t.lanes & e) !== 0 && (If(t, l), Na(l, null, null, e), _a()), a = t.memoizedState, u = l.memoizedState, a.parent !== n ? (a = { parent: n, cache: n }, l.memoizedState = a, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = a), Ee(l, Kt, n)) : (n = u.cache, Ee(l, Kt, n), n !== a.cache && wf(
          l,
          [Kt],
          e,
          !0
        ))), ll(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 29:
        throw l.pendingProps;
    }
    throw Error(c(156, l.tag));
  }
  function ie(t) {
    t.flags |= 4;
  }
  function Rc(t, l, e, n, a) {
    if ((l = (t.mode & 32) !== 0) && (l = !1), l) {
      if (t.flags |= 16777216, (a & 335544128) === a)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (fs()) t.flags |= 8192;
        else
          throw tn = Yu, Ff;
    } else t.flags &= -16777217;
  }
  function C1(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Fs(l))
      if (fs()) t.flags |= 8192;
      else
        throw tn = Yu, Ff;
  }
  function ei(t, l) {
    l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? dr() : 536870912, t.lanes |= l, Xn |= l);
  }
  function ja(t, l) {
    if (!St)
      switch (t.tailMode) {
        case "hidden":
          l = t.tail;
          for (var e = null; l !== null; )
            l.alternate !== null && (e = l), l = l.sibling;
          e === null ? t.tail = null : e.sibling = null;
          break;
        case "collapsed":
          e = t.tail;
          for (var n = null; e !== null; )
            e.alternate !== null && (n = e), e = e.sibling;
          n === null ? l || t.tail === null ? t.tail = null : t.tail.sibling = null : n.sibling = null;
      }
  }
  function jt(t) {
    var l = t.alternate !== null && t.alternate.child === t.child, e = 0, n = 0;
    if (l)
      for (var a = t.child; a !== null; )
        e |= a.lanes | a.childLanes, n |= a.subtreeFlags & 65011712, n |= a.flags & 65011712, a.return = t, a = a.sibling;
    else
      for (a = t.child; a !== null; )
        e |= a.lanes | a.childLanes, n |= a.subtreeFlags, n |= a.flags, a.return = t, a = a.sibling;
    return t.subtreeFlags |= n, t.childLanes = e, l;
  }
  function em(t, l, e) {
    var n = l.pendingProps;
    switch (Gf(l), l.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return jt(l), null;
      case 1:
        return jt(l), null;
      case 3:
        return e = l.stateNode, n = null, t !== null && (n = t.memoizedState.cache), l.memoizedState.cache !== n && (l.flags |= 2048), ee(Kt), Lt(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (On(l) ? ie(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, Vf())), jt(l), null;
      case 26:
        var a = l.type, u = l.memoizedState;
        return t === null ? (ie(l), u !== null ? (jt(l), C1(l, u)) : (jt(l), Rc(
          l,
          a,
          null,
          n,
          e
        ))) : u ? u !== t.memoizedState ? (ie(l), jt(l), C1(l, u)) : (jt(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== n && ie(l), jt(l), Rc(
          l,
          a,
          t,
          n,
          e
        )), null;
      case 27:
        if (du(l), e = mt.current, a = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== n && ie(l);
        else {
          if (!n) {
            if (l.stateNode === null)
              throw Error(c(166));
            return jt(l), null;
          }
          t = K.current, On(l) ? mo(l) : (t = Xs(a, n, e), l.stateNode = t, ie(l));
        }
        return jt(l), null;
      case 5:
        if (du(l), a = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== n && ie(l);
        else {
          if (!n) {
            if (l.stateNode === null)
              throw Error(c(166));
            return jt(l), null;
          }
          if (u = K.current, On(l))
            mo(l);
          else {
            var r = gi(
              mt.current
            );
            switch (u) {
              case 1:
                u = r.createElementNS(
                  "http://www.w3.org/2000/svg",
                  a
                );
                break;
              case 2:
                u = r.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  a
                );
                break;
              default:
                switch (a) {
                  case "svg":
                    u = r.createElementNS(
                      "http://www.w3.org/2000/svg",
                      a
                    );
                    break;
                  case "math":
                    u = r.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      a
                    );
                    break;
                  case "script":
                    u = r.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof n.is == "string" ? r.createElement("select", {
                      is: n.is
                    }) : r.createElement("select"), n.multiple ? u.multiple = !0 : n.size && (u.size = n.size);
                    break;
                  default:
                    u = typeof n.is == "string" ? r.createElement(a, { is: n.is }) : r.createElement(a);
                }
            }
            u[It] = l, u[fl] = n;
            t: for (r = l.child; r !== null; ) {
              if (r.tag === 5 || r.tag === 6)
                u.appendChild(r.stateNode);
              else if (r.tag !== 4 && r.tag !== 27 && r.child !== null) {
                r.child.return = r, r = r.child;
                continue;
              }
              if (r === l) break t;
              for (; r.sibling === null; ) {
                if (r.return === null || r.return === l)
                  break t;
                r = r.return;
              }
              r.sibling.return = r.return, r = r.sibling;
            }
            l.stateNode = u;
            t: switch (el(u, a, n), a) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                n = !!n.autoFocus;
                break t;
              case "img":
                n = !0;
                break t;
              default:
                n = !1;
            }
            n && ie(l);
          }
        }
        return jt(l), Rc(
          l,
          l.type,
          t === null ? null : t.memoizedProps,
          l.pendingProps,
          e
        ), null;
      case 6:
        if (t && l.stateNode != null)
          t.memoizedProps !== n && ie(l);
        else {
          if (typeof n != "string" && l.stateNode === null)
            throw Error(c(166));
          if (t = mt.current, On(l)) {
            if (t = l.stateNode, e = l.memoizedProps, n = null, a = Pt, a !== null)
              switch (a.tag) {
                case 27:
                case 5:
                  n = a.memoizedProps;
              }
            t[It] = l, t = !!(t.nodeValue === e || n !== null && n.suppressHydrationWarning === !0 || Ds(t.nodeValue, e)), t || be(l, !0);
          } else
            t = gi(t).createTextNode(
              n
            ), t[It] = l, l.stateNode = t;
        }
        return jt(l), null;
      case 31:
        if (e = l.memoizedState, t === null || t.memoizedState !== null) {
          if (n = On(l), e !== null) {
            if (t === null) {
              if (!n) throw Error(c(318));
              if (t = l.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(c(557));
              t[It] = l;
            } else
              We(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            jt(l), t = !1;
          } else
            e = Vf(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e), t = !0;
          if (!t)
            return l.flags & 256 ? (Al(l), l) : (Al(l), null);
          if ((l.flags & 128) !== 0)
            throw Error(c(558));
        }
        return jt(l), null;
      case 13:
        if (n = l.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (a = On(l), n !== null && n.dehydrated !== null) {
            if (t === null) {
              if (!a) throw Error(c(318));
              if (a = l.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(c(317));
              a[It] = l;
            } else
              We(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            jt(l), a = !1;
          } else
            a = Vf(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), a = !0;
          if (!a)
            return l.flags & 256 ? (Al(l), l) : (Al(l), null);
        }
        return Al(l), (l.flags & 128) !== 0 ? (l.lanes = e, l) : (e = n !== null, t = t !== null && t.memoizedState !== null, e && (n = l.child, a = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (a = n.alternate.memoizedState.cachePool.pool), u = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (u = n.memoizedState.cachePool.pool), u !== a && (n.flags |= 2048)), e !== t && e && (l.child.flags |= 8192), ei(l, l.updateQueue), jt(l), null);
      case 4:
        return Lt(), t === null && l0(l.stateNode.containerInfo), jt(l), null;
      case 10:
        return ee(l.type), jt(l), null;
      case 19:
        if (U(Gt), n = l.memoizedState, n === null) return jt(l), null;
        if (a = (l.flags & 128) !== 0, u = n.rendering, u === null)
          if (a) ja(n, !1);
          else {
            if (Yt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = l.child; t !== null; ) {
                if (u = Vu(t), u !== null) {
                  for (l.flags |= 128, ja(n, !1), t = u.updateQueue, l.updateQueue = t, ei(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; )
                    co(e, t), e = e.sibling;
                  return X(
                    Gt,
                    Gt.current & 1 | 2
                  ), St && te(l, n.treeForkCount), l.child;
                }
                t = t.sibling;
              }
            n.tail !== null && yl() > fi && (l.flags |= 128, a = !0, ja(n, !1), l.lanes = 4194304);
          }
        else {
          if (!a)
            if (t = Vu(u), t !== null) {
              if (l.flags |= 128, a = !0, t = t.updateQueue, l.updateQueue = t, ei(l, t), ja(n, !0), n.tail === null && n.tailMode === "hidden" && !u.alternate && !St)
                return jt(l), null;
            } else
              2 * yl() - n.renderingStartTime > fi && e !== 536870912 && (l.flags |= 128, a = !0, ja(n, !1), l.lanes = 4194304);
          n.isBackwards ? (u.sibling = l.child, l.child = u) : (t = n.last, t !== null ? t.sibling = u : l.child = u, n.last = u);
        }
        return n.tail !== null ? (t = n.tail, n.rendering = t, n.tail = t.sibling, n.renderingStartTime = yl(), t.sibling = null, e = Gt.current, X(
          Gt,
          a ? e & 1 | 2 : e & 1
        ), St && te(l, n.treeForkCount), t) : (jt(l), null);
      case 22:
      case 23:
        return Al(l), ec(), n = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== n && (l.flags |= 8192) : n && (l.flags |= 8192), n ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (jt(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : jt(l), e = l.updateQueue, e !== null && ei(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), n = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (n = l.memoizedState.cachePool.pool), n !== e && (l.flags |= 2048), t !== null && U(Ie), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), ee(Kt), jt(l), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(c(156, l.tag));
  }
  function nm(t, l) {
    switch (Gf(l), l.tag) {
      case 1:
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 3:
        return ee(Kt), Lt(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
      case 26:
      case 27:
      case 5:
        return du(l), null;
      case 31:
        if (l.memoizedState !== null) {
          if (Al(l), l.alternate === null)
            throw Error(c(340));
          We();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 13:
        if (Al(l), t = l.memoizedState, t !== null && t.dehydrated !== null) {
          if (l.alternate === null)
            throw Error(c(340));
          We();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 19:
        return U(Gt), null;
      case 4:
        return Lt(), null;
      case 10:
        return ee(l.type), null;
      case 22:
      case 23:
        return Al(l), ec(), t !== null && U(Ie), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 24:
        return ee(Kt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function q1(t, l) {
    switch (Gf(l), l.tag) {
      case 3:
        ee(Kt), Lt();
        break;
      case 26:
      case 27:
      case 5:
        du(l);
        break;
      case 4:
        Lt();
        break;
      case 31:
        l.memoizedState !== null && Al(l);
        break;
      case 13:
        Al(l);
        break;
      case 19:
        U(Gt);
        break;
      case 10:
        ee(l.type);
        break;
      case 22:
      case 23:
        Al(l), ec(), t !== null && U(Ie);
        break;
      case 24:
        ee(Kt);
    }
  }
  function Ca(t, l) {
    try {
      var e = l.updateQueue, n = e !== null ? e.lastEffect : null;
      if (n !== null) {
        var a = n.next;
        e = a;
        do {
          if ((e.tag & t) === t) {
            n = void 0;
            var u = e.create, r = e.inst;
            n = u(), r.destroy = n;
          }
          e = e.next;
        } while (e !== a);
      }
    } catch (s) {
      _t(l, l.return, s);
    }
  }
  function _e(t, l, e) {
    try {
      var n = l.updateQueue, a = n !== null ? n.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        n = u;
        do {
          if ((n.tag & t) === t) {
            var r = n.inst, s = r.destroy;
            if (s !== void 0) {
              r.destroy = void 0, a = l;
              var g = e, _ = s;
              try {
                _();
              } catch (D) {
                _t(
                  a,
                  g,
                  D
                );
              }
            }
          }
          n = n.next;
        } while (n !== u);
      }
    } catch (D) {
      _t(l, l.return, D);
    }
  }
  function B1(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var e = t.stateNode;
      try {
        _o(l, e);
      } catch (n) {
        _t(t, t.return, n);
      }
    }
  }
  function Z1(t, l, e) {
    e.props = nn(
      t.type,
      t.memoizedProps
    ), e.state = t.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (n) {
      _t(t, l, n);
    }
  }
  function qa(t, l) {
    try {
      var e = t.ref;
      if (e !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var n = t.stateNode;
            break;
          case 30:
            n = t.stateNode;
            break;
          default:
            n = t.stateNode;
        }
        typeof e == "function" ? t.refCleanup = e(n) : e.current = n;
      }
    } catch (a) {
      _t(t, l, a);
    }
  }
  function Kl(t, l) {
    var e = t.ref, n = t.refCleanup;
    if (e !== null)
      if (typeof n == "function")
        try {
          n();
        } catch (a) {
          _t(t, l, a);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (a) {
          _t(t, l, a);
        }
      else e.current = null;
  }
  function Y1(t) {
    var l = t.type, e = t.memoizedProps, n = t.stateNode;
    try {
      t: switch (l) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && n.focus();
          break t;
        case "img":
          e.src ? n.src = e.src : e.srcSet && (n.srcset = e.srcSet);
      }
    } catch (a) {
      _t(t, t.return, a);
    }
  }
  function jc(t, l, e) {
    try {
      var n = t.stateNode;
      xm(n, t.type, e, l), n[fl] = l;
    } catch (a) {
      _t(t, t.return, a);
    }
  }
  function L1(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && je(t.type) || t.tag === 4;
  }
  function Cc(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || L1(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && je(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function qc(t, l, e) {
    var n = t.tag;
    if (n === 5 || n === 6)
      t = t.stateNode, l ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(t, l) : (l = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.appendChild(t), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = kl));
    else if (n !== 4 && (n === 27 && je(t.type) && (e = t.stateNode, l = null), t = t.child, t !== null))
      for (qc(t, l, e), t = t.sibling; t !== null; )
        qc(t, l, e), t = t.sibling;
  }
  function ni(t, l, e) {
    var n = t.tag;
    if (n === 5 || n === 6)
      t = t.stateNode, l ? e.insertBefore(t, l) : e.appendChild(t);
    else if (n !== 4 && (n === 27 && je(t.type) && (e = t.stateNode), t = t.child, t !== null))
      for (ni(t, l, e), t = t.sibling; t !== null; )
        ni(t, l, e), t = t.sibling;
  }
  function G1(t) {
    var l = t.stateNode, e = t.memoizedProps;
    try {
      for (var n = t.type, a = l.attributes; a.length; )
        l.removeAttributeNode(a[0]);
      el(l, n, e), l[It] = t, l[fl] = e;
    } catch (u) {
      _t(t, t.return, u);
    }
  }
  var fe = !1, $t = !1, Bc = !1, X1 = typeof WeakSet == "function" ? WeakSet : Set, kt = null;
  function am(t, l) {
    if (t = t.containerInfo, a0 = zi, t = Pr(t), Hf(t)) {
      if ("selectionStart" in t)
        var e = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          e = (e = t.ownerDocument) && e.defaultView || window;
          var n = e.getSelection && e.getSelection();
          if (n && n.rangeCount !== 0) {
            e = n.anchorNode;
            var a = n.anchorOffset, u = n.focusNode;
            n = n.focusOffset;
            try {
              e.nodeType, u.nodeType;
            } catch {
              e = null;
              break t;
            }
            var r = 0, s = -1, g = -1, _ = 0, D = 0, q = t, N = null;
            l: for (; ; ) {
              for (var H; q !== e || a !== 0 && q.nodeType !== 3 || (s = r + a), q !== u || n !== 0 && q.nodeType !== 3 || (g = r + n), q.nodeType === 3 && (r += q.nodeValue.length), (H = q.firstChild) !== null; )
                N = q, q = H;
              for (; ; ) {
                if (q === t) break l;
                if (N === e && ++_ === a && (s = r), N === u && ++D === n && (g = r), (H = q.nextSibling) !== null) break;
                q = N, N = q.parentNode;
              }
              q = H;
            }
            e = s === -1 || g === -1 ? null : { start: s, end: g };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (u0 = { focusedElem: t, selectionRange: e }, zi = !1, kt = l; kt !== null; )
      if (l = kt, t = l.child, (l.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = l, kt = t;
      else
        for (; kt !== null; ) {
          switch (l = kt, u = l.alternate, t = l.flags, l.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = l.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (e = 0; e < t.length; e++)
                  a = t[e], a.ref.impl = a.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && u !== null) {
                t = void 0, e = l, a = u.memoizedProps, u = u.memoizedState, n = e.stateNode;
                try {
                  var W = nn(
                    e.type,
                    a
                  );
                  t = n.getSnapshotBeforeUpdate(
                    W,
                    u
                  ), n.__reactInternalSnapshotBeforeUpdate = t;
                } catch (nt) {
                  _t(
                    e,
                    e.return,
                    nt
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = l.stateNode.containerInfo, e = t.nodeType, e === 9)
                  c0(t);
                else if (e === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      c0(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(c(163));
          }
          if (t = l.sibling, t !== null) {
            t.return = l.return, kt = t;
            break;
          }
          kt = l.return;
        }
  }
  function V1(t, l, e) {
    var n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        re(t, e), n & 4 && Ca(5, e);
        break;
      case 1:
        if (re(t, e), n & 4)
          if (t = e.stateNode, l === null)
            try {
              t.componentDidMount();
            } catch (r) {
              _t(e, e.return, r);
            }
          else {
            var a = nn(
              e.type,
              l.memoizedProps
            );
            l = l.memoizedState;
            try {
              t.componentDidUpdate(
                a,
                l,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (r) {
              _t(
                e,
                e.return,
                r
              );
            }
          }
        n & 64 && B1(e), n & 512 && qa(e, e.return);
        break;
      case 3:
        if (re(t, e), n & 64 && (t = e.updateQueue, t !== null)) {
          if (l = null, e.child !== null)
            switch (e.child.tag) {
              case 27:
              case 5:
                l = e.child.stateNode;
                break;
              case 1:
                l = e.child.stateNode;
            }
          try {
            _o(t, l);
          } catch (r) {
            _t(e, e.return, r);
          }
        }
        break;
      case 27:
        l === null && n & 4 && G1(e);
      case 26:
      case 5:
        re(t, e), l === null && n & 4 && Y1(e), n & 512 && qa(e, e.return);
        break;
      case 12:
        re(t, e);
        break;
      case 31:
        re(t, e), n & 4 && w1(t, e);
        break;
      case 13:
        re(t, e), n & 4 && J1(t, e), n & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = dm.bind(
          null,
          e
        ), Rm(t, e))));
        break;
      case 22:
        if (n = e.memoizedState !== null || fe, !n) {
          l = l !== null && l.memoizedState !== null || $t, a = fe;
          var u = $t;
          fe = n, ($t = l) && !u ? oe(
            t,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : re(t, e), fe = a, $t = u;
        }
        break;
      case 30:
        break;
      default:
        re(t, e);
    }
  }
  function Q1(t) {
    var l = t.alternate;
    l !== null && (t.alternate = null, Q1(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && df(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Ct = null, rl = !1;
  function ce(t, l, e) {
    for (e = e.child; e !== null; )
      K1(t, l, e), e = e.sibling;
  }
  function K1(t, l, e) {
    if (gl && typeof gl.onCommitFiberUnmount == "function")
      try {
        gl.onCommitFiberUnmount(ia, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        $t || Kl(e, l), ce(
          t,
          l,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        $t || Kl(e, l);
        var n = Ct, a = rl;
        je(e.type) && (Ct = e.stateNode, rl = !1), ce(
          t,
          l,
          e
        ), Ka(e.stateNode), Ct = n, rl = a;
        break;
      case 5:
        $t || Kl(e, l);
      case 6:
        if (n = Ct, a = rl, Ct = null, ce(
          t,
          l,
          e
        ), Ct = n, rl = a, Ct !== null)
          if (rl)
            try {
              (Ct.nodeType === 9 ? Ct.body : Ct.nodeName === "HTML" ? Ct.ownerDocument.body : Ct).removeChild(e.stateNode);
            } catch (u) {
              _t(
                e,
                l,
                u
              );
            }
          else
            try {
              Ct.removeChild(e.stateNode);
            } catch (u) {
              _t(
                e,
                l,
                u
              );
            }
        break;
      case 18:
        Ct !== null && (rl ? (t = Ct, Bs(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          e.stateNode
        ), Fn(t)) : Bs(Ct, e.stateNode));
        break;
      case 4:
        n = Ct, a = rl, Ct = e.stateNode.containerInfo, rl = !0, ce(
          t,
          l,
          e
        ), Ct = n, rl = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        _e(2, e, l), $t || _e(4, e, l), ce(
          t,
          l,
          e
        );
        break;
      case 1:
        $t || (Kl(e, l), n = e.stateNode, typeof n.componentWillUnmount == "function" && Z1(
          e,
          l,
          n
        )), ce(
          t,
          l,
          e
        );
        break;
      case 21:
        ce(
          t,
          l,
          e
        );
        break;
      case 22:
        $t = (n = $t) || e.memoizedState !== null, ce(
          t,
          l,
          e
        ), $t = n;
        break;
      default:
        ce(
          t,
          l,
          e
        );
    }
  }
  function w1(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Fn(t);
      } catch (e) {
        _t(l, l.return, e);
      }
    }
  }
  function J1(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Fn(t);
      } catch (e) {
        _t(l, l.return, e);
      }
  }
  function um(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var l = t.stateNode;
        return l === null && (l = t.stateNode = new X1()), l;
      case 22:
        return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new X1()), l;
      default:
        throw Error(c(435, t.tag));
    }
  }
  function ai(t, l) {
    var e = um(t);
    l.forEach(function(n) {
      if (!e.has(n)) {
        e.add(n);
        var a = mm.bind(null, t, n);
        n.then(a, a);
      }
    });
  }
  function ol(t, l) {
    var e = l.deletions;
    if (e !== null)
      for (var n = 0; n < e.length; n++) {
        var a = e[n], u = t, r = l, s = r;
        t: for (; s !== null; ) {
          switch (s.tag) {
            case 27:
              if (je(s.type)) {
                Ct = s.stateNode, rl = !1;
                break t;
              }
              break;
            case 5:
              Ct = s.stateNode, rl = !1;
              break t;
            case 3:
            case 4:
              Ct = s.stateNode.containerInfo, rl = !0;
              break t;
          }
          s = s.return;
        }
        if (Ct === null) throw Error(c(160));
        K1(u, r, a), Ct = null, rl = !1, u = a.alternate, u !== null && (u.return = null), a.return = null;
      }
    if (l.subtreeFlags & 13886)
      for (l = l.child; l !== null; )
        $1(l, t), l = l.sibling;
  }
  var Ll = null;
  function $1(t, l) {
    var e = t.alternate, n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ol(l, t), sl(t), n & 4 && (_e(3, t, t.return), Ca(3, t), _e(5, t, t.return));
        break;
      case 1:
        ol(l, t), sl(t), n & 512 && ($t || e === null || Kl(e, e.return)), n & 64 && fe && (t = t.updateQueue, t !== null && (n = t.callbacks, n !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? n : e.concat(n))));
        break;
      case 26:
        var a = Ll;
        if (ol(l, t), sl(t), n & 512 && ($t || e === null || Kl(e, e.return)), n & 4) {
          var u = e !== null ? e.memoizedState : null;
          if (n = t.memoizedState, e === null)
            if (n === null)
              if (t.stateNode === null) {
                t: {
                  n = t.type, e = t.memoizedProps, a = a.ownerDocument || a;
                  l: switch (n) {
                    case "title":
                      u = a.getElementsByTagName("title")[0], (!u || u[ra] || u[It] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = a.createElement(n), a.head.insertBefore(
                        u,
                        a.querySelector("head > title")
                      )), el(u, n, e), u[It] = t, Ft(u), n = u;
                      break t;
                    case "link":
                      var r = $s(
                        "link",
                        "href",
                        a
                      ).get(n + (e.href || ""));
                      if (r) {
                        for (var s = 0; s < r.length; s++)
                          if (u = r[s], u.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && u.getAttribute("rel") === (e.rel == null ? null : e.rel) && u.getAttribute("title") === (e.title == null ? null : e.title) && u.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                            r.splice(s, 1);
                            break l;
                          }
                      }
                      u = a.createElement(n), el(u, n, e), a.head.appendChild(u);
                      break;
                    case "meta":
                      if (r = $s(
                        "meta",
                        "content",
                        a
                      ).get(n + (e.content || ""))) {
                        for (s = 0; s < r.length; s++)
                          if (u = r[s], u.getAttribute("content") === (e.content == null ? null : "" + e.content) && u.getAttribute("name") === (e.name == null ? null : e.name) && u.getAttribute("property") === (e.property == null ? null : e.property) && u.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && u.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                            r.splice(s, 1);
                            break l;
                          }
                      }
                      u = a.createElement(n), el(u, n, e), a.head.appendChild(u);
                      break;
                    default:
                      throw Error(c(468, n));
                  }
                  u[It] = t, Ft(u), n = u;
                }
                t.stateNode = n;
              } else
                Ws(
                  a,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Js(
                a,
                n,
                t.memoizedProps
              );
          else
            u !== n ? (u === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : u.count--, n === null ? Ws(
              a,
              t.type,
              t.stateNode
            ) : Js(
              a,
              n,
              t.memoizedProps
            )) : n === null && t.stateNode !== null && jc(
              t,
              t.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        ol(l, t), sl(t), n & 512 && ($t || e === null || Kl(e, e.return)), e !== null && n & 4 && jc(
          t,
          t.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (ol(l, t), sl(t), n & 512 && ($t || e === null || Kl(e, e.return)), t.flags & 32) {
          a = t.stateNode;
          try {
            Sn(a, "");
          } catch (W) {
            _t(t, t.return, W);
          }
        }
        n & 4 && t.stateNode != null && (a = t.memoizedProps, jc(
          t,
          a,
          e !== null ? e.memoizedProps : a
        )), n & 1024 && (Bc = !0);
        break;
      case 6:
        if (ol(l, t), sl(t), n & 4) {
          if (t.stateNode === null)
            throw Error(c(162));
          n = t.memoizedProps, e = t.stateNode;
          try {
            e.nodeValue = n;
          } catch (W) {
            _t(t, t.return, W);
          }
        }
        break;
      case 3:
        if (bi = null, a = Ll, Ll = pi(l.containerInfo), ol(l, t), Ll = a, sl(t), n & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            Fn(l.containerInfo);
          } catch (W) {
            _t(t, t.return, W);
          }
        Bc && (Bc = !1, W1(t));
        break;
      case 4:
        n = Ll, Ll = pi(
          t.stateNode.containerInfo
        ), ol(l, t), sl(t), Ll = n;
        break;
      case 12:
        ol(l, t), sl(t);
        break;
      case 31:
        ol(l, t), sl(t), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, ai(t, n)));
        break;
      case 13:
        ol(l, t), sl(t), t.child.flags & 8192 && t.memoizedState !== null != (e !== null && e.memoizedState !== null) && (ii = yl()), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, ai(t, n)));
        break;
      case 22:
        a = t.memoizedState !== null;
        var g = e !== null && e.memoizedState !== null, _ = fe, D = $t;
        if (fe = _ || a, $t = D || g, ol(l, t), $t = D, fe = _, sl(t), n & 8192)
          t: for (l = t.stateNode, l._visibility = a ? l._visibility & -2 : l._visibility | 1, a && (e === null || g || fe || $t || an(t)), e = null, l = t; ; ) {
            if (l.tag === 5 || l.tag === 26) {
              if (e === null) {
                g = e = l;
                try {
                  if (u = g.stateNode, a)
                    r = u.style, typeof r.setProperty == "function" ? r.setProperty("display", "none", "important") : r.display = "none";
                  else {
                    s = g.stateNode;
                    var q = g.memoizedProps.style, N = q != null && q.hasOwnProperty("display") ? q.display : null;
                    s.style.display = N == null || typeof N == "boolean" ? "" : ("" + N).trim();
                  }
                } catch (W) {
                  _t(g, g.return, W);
                }
              }
            } else if (l.tag === 6) {
              if (e === null) {
                g = l;
                try {
                  g.stateNode.nodeValue = a ? "" : g.memoizedProps;
                } catch (W) {
                  _t(g, g.return, W);
                }
              }
            } else if (l.tag === 18) {
              if (e === null) {
                g = l;
                try {
                  var H = g.stateNode;
                  a ? Zs(H, !0) : Zs(g.stateNode, !1);
                } catch (W) {
                  _t(g, g.return, W);
                }
              }
            } else if ((l.tag !== 22 && l.tag !== 23 || l.memoizedState === null || l === t) && l.child !== null) {
              l.child.return = l, l = l.child;
              continue;
            }
            if (l === t) break t;
            for (; l.sibling === null; ) {
              if (l.return === null || l.return === t) break t;
              e === l && (e = null), l = l.return;
            }
            e === l && (e = null), l.sibling.return = l.return, l = l.sibling;
          }
        n & 4 && (n = t.updateQueue, n !== null && (e = n.retryQueue, e !== null && (n.retryQueue = null, ai(t, e))));
        break;
      case 19:
        ol(l, t), sl(t), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, ai(t, n)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ol(l, t), sl(t);
    }
  }
  function sl(t) {
    var l = t.flags;
    if (l & 2) {
      try {
        for (var e, n = t.return; n !== null; ) {
          if (L1(n)) {
            e = n;
            break;
          }
          n = n.return;
        }
        if (e == null) throw Error(c(160));
        switch (e.tag) {
          case 27:
            var a = e.stateNode, u = Cc(t);
            ni(t, u, a);
            break;
          case 5:
            var r = e.stateNode;
            e.flags & 32 && (Sn(r, ""), e.flags &= -33);
            var s = Cc(t);
            ni(t, s, r);
            break;
          case 3:
          case 4:
            var g = e.stateNode.containerInfo, _ = Cc(t);
            qc(
              t,
              _,
              g
            );
            break;
          default:
            throw Error(c(161));
        }
      } catch (D) {
        _t(t, t.return, D);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function W1(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        W1(l), l.tag === 5 && l.flags & 1024 && l.stateNode.reset(), t = t.sibling;
      }
  }
  function re(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; )
        V1(t, l.alternate, l), l = l.sibling;
  }
  function an(t) {
    for (t = t.child; t !== null; ) {
      var l = t;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          _e(4, l, l.return), an(l);
          break;
        case 1:
          Kl(l, l.return);
          var e = l.stateNode;
          typeof e.componentWillUnmount == "function" && Z1(
            l,
            l.return,
            e
          ), an(l);
          break;
        case 27:
          Ka(l.stateNode);
        case 26:
        case 5:
          Kl(l, l.return), an(l);
          break;
        case 22:
          l.memoizedState === null && an(l);
          break;
        case 30:
          an(l);
          break;
        default:
          an(l);
      }
      t = t.sibling;
    }
  }
  function oe(t, l, e) {
    for (e = e && (l.subtreeFlags & 8772) !== 0, l = l.child; l !== null; ) {
      var n = l.alternate, a = t, u = l, r = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          oe(
            a,
            u,
            e
          ), Ca(4, u);
          break;
        case 1:
          if (oe(
            a,
            u,
            e
          ), n = u, a = n.stateNode, typeof a.componentDidMount == "function")
            try {
              a.componentDidMount();
            } catch (_) {
              _t(n, n.return, _);
            }
          if (n = u, a = n.updateQueue, a !== null) {
            var s = n.stateNode;
            try {
              var g = a.shared.hiddenCallbacks;
              if (g !== null)
                for (a.shared.hiddenCallbacks = null, a = 0; a < g.length; a++)
                  To(g[a], s);
            } catch (_) {
              _t(n, n.return, _);
            }
          }
          e && r & 64 && B1(u), qa(u, u.return);
          break;
        case 27:
          G1(u);
        case 26:
        case 5:
          oe(
            a,
            u,
            e
          ), e && n === null && r & 4 && Y1(u), qa(u, u.return);
          break;
        case 12:
          oe(
            a,
            u,
            e
          );
          break;
        case 31:
          oe(
            a,
            u,
            e
          ), e && r & 4 && w1(a, u);
          break;
        case 13:
          oe(
            a,
            u,
            e
          ), e && r & 4 && J1(a, u);
          break;
        case 22:
          u.memoizedState === null && oe(
            a,
            u,
            e
          ), qa(u, u.return);
          break;
        case 30:
          break;
        default:
          oe(
            a,
            u,
            e
          );
      }
      l = l.sibling;
    }
  }
  function Zc(t, l) {
    var e = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && Aa(e));
  }
  function Yc(t, l) {
    t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && Aa(t));
  }
  function Gl(t, l, e, n) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        F1(
          t,
          l,
          e,
          n
        ), l = l.sibling;
  }
  function F1(t, l, e, n) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Gl(
          t,
          l,
          e,
          n
        ), a & 2048 && Ca(9, l);
        break;
      case 1:
        Gl(
          t,
          l,
          e,
          n
        );
        break;
      case 3:
        Gl(
          t,
          l,
          e,
          n
        ), a & 2048 && (t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && Aa(t)));
        break;
      case 12:
        if (a & 2048) {
          Gl(
            t,
            l,
            e,
            n
          ), t = l.stateNode;
          try {
            var u = l.memoizedProps, r = u.id, s = u.onPostCommit;
            typeof s == "function" && s(
              r,
              l.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (g) {
            _t(l, l.return, g);
          }
        } else
          Gl(
            t,
            l,
            e,
            n
          );
        break;
      case 31:
        Gl(
          t,
          l,
          e,
          n
        );
        break;
      case 13:
        Gl(
          t,
          l,
          e,
          n
        );
        break;
      case 23:
        break;
      case 22:
        u = l.stateNode, r = l.alternate, l.memoizedState !== null ? u._visibility & 2 ? Gl(
          t,
          l,
          e,
          n
        ) : Ba(t, l) : u._visibility & 2 ? Gl(
          t,
          l,
          e,
          n
        ) : (u._visibility |= 2, Yn(
          t,
          l,
          e,
          n,
          (l.subtreeFlags & 10256) !== 0 || !1
        )), a & 2048 && Zc(r, l);
        break;
      case 24:
        Gl(
          t,
          l,
          e,
          n
        ), a & 2048 && Yc(l.alternate, l);
        break;
      default:
        Gl(
          t,
          l,
          e,
          n
        );
    }
  }
  function Yn(t, l, e, n, a) {
    for (a = a && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var u = t, r = l, s = e, g = n, _ = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          Yn(
            u,
            r,
            s,
            g,
            a
          ), Ca(8, r);
          break;
        case 23:
          break;
        case 22:
          var D = r.stateNode;
          r.memoizedState !== null ? D._visibility & 2 ? Yn(
            u,
            r,
            s,
            g,
            a
          ) : Ba(
            u,
            r
          ) : (D._visibility |= 2, Yn(
            u,
            r,
            s,
            g,
            a
          )), a && _ & 2048 && Zc(
            r.alternate,
            r
          );
          break;
        case 24:
          Yn(
            u,
            r,
            s,
            g,
            a
          ), a && _ & 2048 && Yc(r.alternate, r);
          break;
        default:
          Yn(
            u,
            r,
            s,
            g,
            a
          );
      }
      l = l.sibling;
    }
  }
  function Ba(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var e = t, n = l, a = n.flags;
        switch (n.tag) {
          case 22:
            Ba(e, n), a & 2048 && Zc(
              n.alternate,
              n
            );
            break;
          case 24:
            Ba(e, n), a & 2048 && Yc(n.alternate, n);
            break;
          default:
            Ba(e, n);
        }
        l = l.sibling;
      }
  }
  var Za = 8192;
  function Ln(t, l, e) {
    if (t.subtreeFlags & Za)
      for (t = t.child; t !== null; )
        k1(
          t,
          l,
          e
        ), t = t.sibling;
  }
  function k1(t, l, e) {
    switch (t.tag) {
      case 26:
        Ln(
          t,
          l,
          e
        ), t.flags & Za && t.memoizedState !== null && Km(
          e,
          Ll,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Ln(
          t,
          l,
          e
        );
        break;
      case 3:
      case 4:
        var n = Ll;
        Ll = pi(t.stateNode.containerInfo), Ln(
          t,
          l,
          e
        ), Ll = n;
        break;
      case 22:
        t.memoizedState === null && (n = t.alternate, n !== null && n.memoizedState !== null ? (n = Za, Za = 16777216, Ln(
          t,
          l,
          e
        ), Za = n) : Ln(
          t,
          l,
          e
        ));
        break;
      default:
        Ln(
          t,
          l,
          e
        );
    }
  }
  function I1(t) {
    var l = t.alternate;
    if (l !== null && (t = l.child, t !== null)) {
      l.child = null;
      do
        l = t.sibling, t.sibling = null, t = l;
      while (t !== null);
    }
  }
  function Ya(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var n = l[e];
          kt = n, ts(
            n,
            t
          );
        }
      I1(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        P1(t), t = t.sibling;
  }
  function P1(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Ya(t), t.flags & 2048 && _e(9, t, t.return);
        break;
      case 3:
        Ya(t);
        break;
      case 12:
        Ya(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -3, ui(t)) : Ya(t);
        break;
      default:
        Ya(t);
    }
  }
  function ui(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var n = l[e];
          kt = n, ts(
            n,
            t
          );
        }
      I1(t);
    }
    for (t = t.child; t !== null; ) {
      switch (l = t, l.tag) {
        case 0:
        case 11:
        case 15:
          _e(8, l, l.return), ui(l);
          break;
        case 22:
          e = l.stateNode, e._visibility & 2 && (e._visibility &= -3, ui(l));
          break;
        default:
          ui(l);
      }
      t = t.sibling;
    }
  }
  function ts(t, l) {
    for (; kt !== null; ) {
      var e = kt;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          _e(8, e, l);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var n = e.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          Aa(e.memoizedState.cache);
      }
      if (n = e.child, n !== null) n.return = e, kt = n;
      else
        t: for (e = t; kt !== null; ) {
          n = kt;
          var a = n.sibling, u = n.return;
          if (Q1(n), n === e) {
            kt = null;
            break t;
          }
          if (a !== null) {
            a.return = u, kt = a;
            break t;
          }
          kt = u;
        }
    }
  }
  var im = {
    getCacheForType: function(t) {
      var l = tl(Kt), e = l.data.get(t);
      return e === void 0 && (e = t(), l.data.set(t, e)), e;
    },
    cacheSignal: function() {
      return tl(Kt).controller.signal;
    }
  }, fm = typeof WeakMap == "function" ? WeakMap : Map, zt = 0, Dt = null, vt = null, gt = 0, Tt = 0, Ml = null, Ne = !1, Gn = !1, Lc = !1, se = 0, Yt = 0, Oe = 0, un = 0, Gc = 0, zl = 0, Xn = 0, La = null, hl = null, Xc = !1, ii = 0, ls = 0, fi = 1 / 0, ci = null, He = null, Wt = 0, De = null, Vn = null, he = 0, Vc = 0, Qc = null, es = null, Ga = 0, Kc = null;
  function xl() {
    return (zt & 2) !== 0 && gt !== 0 ? gt & -gt : x.T !== null ? kc() : gr();
  }
  function ns() {
    if (zl === 0)
      if ((gt & 536870912) === 0 || St) {
        var t = yu;
        yu <<= 1, (yu & 3932160) === 0 && (yu = 262144), zl = t;
      } else zl = 536870912;
    return t = El.current, t !== null && (t.flags |= 32), zl;
  }
  function dl(t, l, e) {
    (t === Dt && (Tt === 2 || Tt === 9) || t.cancelPendingCommit !== null) && (Qn(t, 0), Ue(
      t,
      gt,
      zl,
      !1
    )), ca(t, e), ((zt & 2) === 0 || t !== Dt) && (t === Dt && ((zt & 2) === 0 && (un |= e), Yt === 4 && Ue(
      t,
      gt,
      zl,
      !1
    )), wl(t));
  }
  function as(t, l, e) {
    if ((zt & 6) !== 0) throw Error(c(327));
    var n = !e && (l & 127) === 0 && (l & t.expiredLanes) === 0 || fa(t, l), a = n ? om(t, l) : Jc(t, l, !0), u = n;
    do {
      if (a === 0) {
        Gn && !n && Ue(t, l, 0, !1);
        break;
      } else {
        if (e = t.current.alternate, u && !cm(e)) {
          a = Jc(t, l, !1), u = !1;
          continue;
        }
        if (a === 2) {
          if (u = l, t.errorRecoveryDisabledLanes & u)
            var r = 0;
          else
            r = t.pendingLanes & -536870913, r = r !== 0 ? r : r & 536870912 ? 536870912 : 0;
          if (r !== 0) {
            l = r;
            t: {
              var s = t;
              a = La;
              var g = s.current.memoizedState.isDehydrated;
              if (g && (Qn(s, r).flags |= 256), r = Jc(
                s,
                r,
                !1
              ), r !== 2) {
                if (Lc && !g) {
                  s.errorRecoveryDisabledLanes |= u, un |= u, a = 4;
                  break t;
                }
                u = hl, hl = a, u !== null && (hl === null ? hl = u : hl.push.apply(
                  hl,
                  u
                ));
              }
              a = r;
            }
            if (u = !1, a !== 2) continue;
          }
        }
        if (a === 1) {
          Qn(t, 0), Ue(t, l, 0, !0);
          break;
        }
        t: {
          switch (n = t, u = a, u) {
            case 0:
            case 1:
              throw Error(c(345));
            case 4:
              if ((l & 4194048) !== l) break;
            case 6:
              Ue(
                n,
                l,
                zl,
                !Ne
              );
              break t;
            case 2:
              hl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(c(329));
          }
          if ((l & 62914560) === l && (a = ii + 300 - yl(), 10 < a)) {
            if (Ue(
              n,
              l,
              zl,
              !Ne
            ), pu(n, 0, !0) !== 0) break t;
            he = l, n.timeoutHandle = Cs(
              us.bind(
                null,
                n,
                e,
                hl,
                ci,
                Xc,
                l,
                zl,
                un,
                Xn,
                Ne,
                u,
                "Throttled",
                -0,
                0
              ),
              a
            );
            break t;
          }
          us(
            n,
            e,
            hl,
            ci,
            Xc,
            l,
            zl,
            un,
            Xn,
            Ne,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    wl(t);
  }
  function us(t, l, e, n, a, u, r, s, g, _, D, q, N, H) {
    if (t.timeoutHandle = -1, q = l.subtreeFlags, q & 8192 || (q & 16785408) === 16785408) {
      q = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: kl
      }, k1(
        l,
        u,
        q
      );
      var W = (u & 62914560) === u ? ii - yl() : (u & 4194048) === u ? ls - yl() : 0;
      if (W = wm(
        q,
        W
      ), W !== null) {
        he = u, t.cancelPendingCommit = W(
          ds.bind(
            null,
            t,
            l,
            u,
            e,
            n,
            a,
            r,
            s,
            g,
            D,
            q,
            null,
            N,
            H
          )
        ), Ue(t, u, r, !_);
        return;
      }
    }
    ds(
      t,
      l,
      u,
      e,
      n,
      a,
      r,
      s,
      g
    );
  }
  function cm(t) {
    for (var l = t; ; ) {
      var e = l.tag;
      if ((e === 0 || e === 11 || e === 15) && l.flags & 16384 && (e = l.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var n = 0; n < e.length; n++) {
          var a = e[n], u = a.getSnapshot;
          a = a.value;
          try {
            if (!Sl(u(), a)) return !1;
          } catch {
            return !1;
          }
        }
      if (e = l.child, l.subtreeFlags & 16384 && e !== null)
        e.return = l, l = e;
      else {
        if (l === t) break;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) return !0;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    }
    return !0;
  }
  function Ue(t, l, e, n) {
    l &= ~Gc, l &= ~un, t.suspendedLanes |= l, t.pingedLanes &= ~l, n && (t.warmLanes |= l), n = t.expirationTimes;
    for (var a = l; 0 < a; ) {
      var u = 31 - pl(a), r = 1 << u;
      n[u] = -1, a &= ~r;
    }
    e !== 0 && mr(t, e, l);
  }
  function ri() {
    return (zt & 6) === 0 ? (Xa(0), !1) : !0;
  }
  function wc() {
    if (vt !== null) {
      if (Tt === 0)
        var t = vt.return;
      else
        t = vt, le = Fe = null, cc(t), jn = null, za = 0, t = vt;
      for (; t !== null; )
        q1(t.alternate, t), t = t.return;
      vt = null;
    }
  }
  function Qn(t, l) {
    var e = t.timeoutHandle;
    e !== -1 && (t.timeoutHandle = -1, Nm(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), he = 0, wc(), Dt = t, vt = e = Pl(t.current, null), gt = l, Tt = 0, Ml = null, Ne = !1, Gn = fa(t, l), Lc = !1, Xn = zl = Gc = un = Oe = Yt = 0, hl = La = null, Xc = !1, (l & 8) !== 0 && (l |= l & 32);
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= l; 0 < n; ) {
        var a = 31 - pl(n), u = 1 << a;
        l |= t[a], n &= ~u;
      }
    return se = l, Hu(), e;
  }
  function is(t, l) {
    st = null, x.H = Ua, l === Rn || l === Zu ? (l = Ao(), Tt = 3) : l === Ff ? (l = Ao(), Tt = 4) : Tt = l === zc ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, Ml = l, vt === null && (Yt = 1, Iu(
      t,
      Hl(l, t.current)
    ));
  }
  function fs() {
    var t = El.current;
    return t === null ? !0 : (gt & 4194048) === gt ? jl === null : (gt & 62914560) === gt || (gt & 536870912) !== 0 ? t === jl : !1;
  }
  function cs() {
    var t = x.H;
    return x.H = Ua, t === null ? Ua : t;
  }
  function rs() {
    var t = x.A;
    return x.A = im, t;
  }
  function oi() {
    Yt = 4, Ne || (gt & 4194048) !== gt && El.current !== null || (Gn = !0), (Oe & 134217727) === 0 && (un & 134217727) === 0 || Dt === null || Ue(
      Dt,
      gt,
      zl,
      !1
    );
  }
  function Jc(t, l, e) {
    var n = zt;
    zt |= 2;
    var a = cs(), u = rs();
    (Dt !== t || gt !== l) && (ci = null, Qn(t, l)), l = !1;
    var r = Yt;
    t: do
      try {
        if (Tt !== 0 && vt !== null) {
          var s = vt, g = Ml;
          switch (Tt) {
            case 8:
              wc(), r = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              El.current === null && (l = !0);
              var _ = Tt;
              if (Tt = 0, Ml = null, Kn(t, s, g, _), e && Gn) {
                r = 0;
                break t;
              }
              break;
            default:
              _ = Tt, Tt = 0, Ml = null, Kn(t, s, g, _);
          }
        }
        rm(), r = Yt;
        break;
      } catch (D) {
        is(t, D);
      }
    while (!0);
    return l && t.shellSuspendCounter++, le = Fe = null, zt = n, x.H = a, x.A = u, vt === null && (Dt = null, gt = 0, Hu()), r;
  }
  function rm() {
    for (; vt !== null; ) os(vt);
  }
  function om(t, l) {
    var e = zt;
    zt |= 2;
    var n = cs(), a = rs();
    Dt !== t || gt !== l ? (ci = null, fi = yl() + 500, Qn(t, l)) : Gn = fa(
      t,
      l
    );
    t: do
      try {
        if (Tt !== 0 && vt !== null) {
          l = vt;
          var u = Ml;
          l: switch (Tt) {
            case 1:
              Tt = 0, Ml = null, Kn(t, l, u, 1);
              break;
            case 2:
            case 9:
              if (bo(u)) {
                Tt = 0, Ml = null, ss(l);
                break;
              }
              l = function() {
                Tt !== 2 && Tt !== 9 || Dt !== t || (Tt = 7), wl(t);
              }, u.then(l, l);
              break t;
            case 3:
              Tt = 7;
              break t;
            case 4:
              Tt = 5;
              break t;
            case 7:
              bo(u) ? (Tt = 0, Ml = null, ss(l)) : (Tt = 0, Ml = null, Kn(t, l, u, 7));
              break;
            case 5:
              var r = null;
              switch (vt.tag) {
                case 26:
                  r = vt.memoizedState;
                case 5:
                case 27:
                  var s = vt;
                  if (r ? Fs(r) : s.stateNode.complete) {
                    Tt = 0, Ml = null;
                    var g = s.sibling;
                    if (g !== null) vt = g;
                    else {
                      var _ = s.return;
                      _ !== null ? (vt = _, si(_)) : vt = null;
                    }
                    break l;
                  }
              }
              Tt = 0, Ml = null, Kn(t, l, u, 5);
              break;
            case 6:
              Tt = 0, Ml = null, Kn(t, l, u, 6);
              break;
            case 8:
              wc(), Yt = 6;
              break t;
            default:
              throw Error(c(462));
          }
        }
        sm();
        break;
      } catch (D) {
        is(t, D);
      }
    while (!0);
    return le = Fe = null, x.H = n, x.A = a, zt = e, vt !== null ? 0 : (Dt = null, gt = 0, Hu(), Yt);
  }
  function sm() {
    for (; vt !== null && !jd(); )
      os(vt);
  }
  function os(t) {
    var l = j1(t.alternate, t, se);
    t.memoizedProps = t.pendingProps, l === null ? si(t) : vt = l;
  }
  function ss(t) {
    var l = t, e = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = N1(
          e,
          l,
          l.pendingProps,
          l.type,
          void 0,
          gt
        );
        break;
      case 11:
        l = N1(
          e,
          l,
          l.pendingProps,
          l.type.render,
          l.ref,
          gt
        );
        break;
      case 5:
        cc(l);
      default:
        q1(e, l), l = vt = co(l, se), l = j1(e, l, se);
    }
    t.memoizedProps = t.pendingProps, l === null ? si(t) : vt = l;
  }
  function Kn(t, l, e, n) {
    le = Fe = null, cc(l), jn = null, za = 0;
    var a = l.return;
    try {
      if (P2(
        t,
        a,
        l,
        e,
        gt
      )) {
        Yt = 1, Iu(
          t,
          Hl(e, t.current)
        ), vt = null;
        return;
      }
    } catch (u) {
      if (a !== null) throw vt = a, u;
      Yt = 1, Iu(
        t,
        Hl(e, t.current)
      ), vt = null;
      return;
    }
    l.flags & 32768 ? (St || n === 1 ? t = !0 : Gn || (gt & 536870912) !== 0 ? t = !1 : (Ne = t = !0, (n === 2 || n === 9 || n === 3 || n === 6) && (n = El.current, n !== null && n.tag === 13 && (n.flags |= 16384))), hs(l, t)) : si(l);
  }
  function si(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        hs(
          l,
          Ne
        );
        return;
      }
      t = l.return;
      var e = em(
        l.alternate,
        l,
        se
      );
      if (e !== null) {
        vt = e;
        return;
      }
      if (l = l.sibling, l !== null) {
        vt = l;
        return;
      }
      vt = l = t;
    } while (l !== null);
    Yt === 0 && (Yt = 5);
  }
  function hs(t, l) {
    do {
      var e = nm(t.alternate, t);
      if (e !== null) {
        e.flags &= 32767, vt = e;
        return;
      }
      if (e = t.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !l && (t = t.sibling, t !== null)) {
        vt = t;
        return;
      }
      vt = t = e;
    } while (t !== null);
    Yt = 6, vt = null;
  }
  function ds(t, l, e, n, a, u, r, s, g) {
    t.cancelPendingCommit = null;
    do
      hi();
    while (Wt !== 0);
    if ((zt & 6) !== 0) throw Error(c(327));
    if (l !== null) {
      if (l === t.current) throw Error(c(177));
      if (u = l.lanes | l.childLanes, u |= Cf, Qd(
        t,
        e,
        u,
        r,
        s,
        g
      ), t === Dt && (vt = Dt = null, gt = 0), Vn = l, De = t, he = e, Vc = u, Qc = a, es = n, (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, vm(mu, function() {
        return ps(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), n = (l.flags & 13878) !== 0, (l.subtreeFlags & 13878) !== 0 || n) {
        n = x.T, x.T = null, a = G.p, G.p = 2, r = zt, zt |= 4;
        try {
          am(t, l, e);
        } finally {
          zt = r, G.p = a, x.T = n;
        }
      }
      Wt = 1, ms(), vs(), ys();
    }
  }
  function ms() {
    if (Wt === 1) {
      Wt = 0;
      var t = De, l = Vn, e = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || e) {
        e = x.T, x.T = null;
        var n = G.p;
        G.p = 2;
        var a = zt;
        zt |= 4;
        try {
          $1(l, t);
          var u = u0, r = Pr(t.containerInfo), s = u.focusedElem, g = u.selectionRange;
          if (r !== s && s && s.ownerDocument && Ir(
            s.ownerDocument.documentElement,
            s
          )) {
            if (g !== null && Hf(s)) {
              var _ = g.start, D = g.end;
              if (D === void 0 && (D = _), "selectionStart" in s)
                s.selectionStart = _, s.selectionEnd = Math.min(
                  D,
                  s.value.length
                );
              else {
                var q = s.ownerDocument || document, N = q && q.defaultView || window;
                if (N.getSelection) {
                  var H = N.getSelection(), W = s.textContent.length, nt = Math.min(g.start, W), Ht = g.end === void 0 ? nt : Math.min(g.end, W);
                  !H.extend && nt > Ht && (r = Ht, Ht = nt, nt = r);
                  var M = kr(
                    s,
                    nt
                  ), A = kr(
                    s,
                    Ht
                  );
                  if (M && A && (H.rangeCount !== 1 || H.anchorNode !== M.node || H.anchorOffset !== M.offset || H.focusNode !== A.node || H.focusOffset !== A.offset)) {
                    var T = q.createRange();
                    T.setStart(M.node, M.offset), H.removeAllRanges(), nt > Ht ? (H.addRange(T), H.extend(A.node, A.offset)) : (T.setEnd(A.node, A.offset), H.addRange(T));
                  }
                }
              }
            }
            for (q = [], H = s; H = H.parentNode; )
              H.nodeType === 1 && q.push({
                element: H,
                left: H.scrollLeft,
                top: H.scrollTop
              });
            for (typeof s.focus == "function" && s.focus(), s = 0; s < q.length; s++) {
              var R = q[s];
              R.element.scrollLeft = R.left, R.element.scrollTop = R.top;
            }
          }
          zi = !!a0, u0 = a0 = null;
        } finally {
          zt = a, G.p = n, x.T = e;
        }
      }
      t.current = l, Wt = 2;
    }
  }
  function vs() {
    if (Wt === 2) {
      Wt = 0;
      var t = De, l = Vn, e = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || e) {
        e = x.T, x.T = null;
        var n = G.p;
        G.p = 2;
        var a = zt;
        zt |= 4;
        try {
          V1(t, l.alternate, l);
        } finally {
          zt = a, G.p = n, x.T = e;
        }
      }
      Wt = 3;
    }
  }
  function ys() {
    if (Wt === 4 || Wt === 3) {
      Wt = 0, Cd();
      var t = De, l = Vn, e = he, n = es;
      (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? Wt = 5 : (Wt = 0, Vn = De = null, gs(t, t.pendingLanes));
      var a = t.pendingLanes;
      if (a === 0 && (He = null), sf(e), l = l.stateNode, gl && typeof gl.onCommitFiberRoot == "function")
        try {
          gl.onCommitFiberRoot(
            ia,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        l = x.T, a = G.p, G.p = 2, x.T = null;
        try {
          for (var u = t.onRecoverableError, r = 0; r < n.length; r++) {
            var s = n[r];
            u(s.value, {
              componentStack: s.stack
            });
          }
        } finally {
          x.T = l, G.p = a;
        }
      }
      (he & 3) !== 0 && hi(), wl(t), a = t.pendingLanes, (e & 261930) !== 0 && (a & 42) !== 0 ? t === Kc ? Ga++ : (Ga = 0, Kc = t) : Ga = 0, Xa(0);
    }
  }
  function gs(t, l) {
    (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, Aa(l)));
  }
  function hi() {
    return ms(), vs(), ys(), ps();
  }
  function ps() {
    if (Wt !== 5) return !1;
    var t = De, l = Vc;
    Vc = 0;
    var e = sf(he), n = x.T, a = G.p;
    try {
      G.p = 32 > e ? 32 : e, x.T = null, e = Qc, Qc = null;
      var u = De, r = he;
      if (Wt = 0, Vn = De = null, he = 0, (zt & 6) !== 0) throw Error(c(331));
      var s = zt;
      if (zt |= 4, P1(u.current), F1(
        u,
        u.current,
        r,
        e
      ), zt = s, Xa(0, !1), gl && typeof gl.onPostCommitFiberRoot == "function")
        try {
          gl.onPostCommitFiberRoot(ia, u);
        } catch {
        }
      return !0;
    } finally {
      G.p = a, x.T = n, gs(t, l);
    }
  }
  function Ss(t, l, e) {
    l = Hl(e, l), l = Mc(t.stateNode, l, 2), t = ze(t, l, 2), t !== null && (ca(t, 2), wl(t));
  }
  function _t(t, l, e) {
    if (t.tag === 3)
      Ss(t, t, e);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          Ss(
            l,
            t,
            e
          );
          break;
        } else if (l.tag === 1) {
          var n = l.stateNode;
          if (typeof l.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (He === null || !He.has(n))) {
            t = Hl(e, t), e = b1(2), n = ze(l, e, 2), n !== null && (E1(
              e,
              n,
              l,
              t
            ), ca(n, 2), wl(n));
            break;
          }
        }
        l = l.return;
      }
  }
  function $c(t, l, e) {
    var n = t.pingCache;
    if (n === null) {
      n = t.pingCache = new fm();
      var a = /* @__PURE__ */ new Set();
      n.set(l, a);
    } else
      a = n.get(l), a === void 0 && (a = /* @__PURE__ */ new Set(), n.set(l, a));
    a.has(e) || (Lc = !0, a.add(e), t = hm.bind(null, t, l, e), l.then(t, t));
  }
  function hm(t, l, e) {
    var n = t.pingCache;
    n !== null && n.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, Dt === t && (gt & e) === e && (Yt === 4 || Yt === 3 && (gt & 62914560) === gt && 300 > yl() - ii ? (zt & 2) === 0 && Qn(t, 0) : Gc |= e, Xn === gt && (Xn = 0)), wl(t);
  }
  function bs(t, l) {
    l === 0 && (l = dr()), t = Je(t, l), t !== null && (ca(t, l), wl(t));
  }
  function dm(t) {
    var l = t.memoizedState, e = 0;
    l !== null && (e = l.retryLane), bs(t, e);
  }
  function mm(t, l) {
    var e = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var n = t.stateNode, a = t.memoizedState;
        a !== null && (e = a.retryLane);
        break;
      case 19:
        n = t.stateNode;
        break;
      case 22:
        n = t.stateNode._retryCache;
        break;
      default:
        throw Error(c(314));
    }
    n !== null && n.delete(l), bs(t, e);
  }
  function vm(t, l) {
    return ff(t, l);
  }
  var di = null, wn = null, Wc = !1, mi = !1, Fc = !1, Re = 0;
  function wl(t) {
    t !== wn && t.next === null && (wn === null ? di = wn = t : wn = wn.next = t), mi = !0, Wc || (Wc = !0, gm());
  }
  function Xa(t, l) {
    if (!Fc && mi) {
      Fc = !0;
      do
        for (var e = !1, n = di; n !== null; ) {
          if (t !== 0) {
            var a = n.pendingLanes;
            if (a === 0) var u = 0;
            else {
              var r = n.suspendedLanes, s = n.pingedLanes;
              u = (1 << 31 - pl(42 | t) + 1) - 1, u &= a & ~(r & ~s), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (e = !0, zs(n, u));
          } else
            u = gt, u = pu(
              n,
              n === Dt ? u : 0,
              n.cancelPendingCommit !== null || n.timeoutHandle !== -1
            ), (u & 3) === 0 || fa(n, u) || (e = !0, zs(n, u));
          n = n.next;
        }
      while (e);
      Fc = !1;
    }
  }
  function ym() {
    Es();
  }
  function Es() {
    mi = Wc = !1;
    var t = 0;
    Re !== 0 && _m() && (t = Re);
    for (var l = yl(), e = null, n = di; n !== null; ) {
      var a = n.next, u = As(n, l);
      u === 0 ? (n.next = null, e === null ? di = a : e.next = a, a === null && (wn = e)) : (e = n, (t !== 0 || (u & 3) !== 0) && (mi = !0)), n = a;
    }
    Wt !== 0 && Wt !== 5 || Xa(t), Re !== 0 && (Re = 0);
  }
  function As(t, l) {
    for (var e = t.suspendedLanes, n = t.pingedLanes, a = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var r = 31 - pl(u), s = 1 << r, g = a[r];
      g === -1 ? ((s & e) === 0 || (s & n) !== 0) && (a[r] = Vd(s, l)) : g <= l && (t.expiredLanes |= s), u &= ~s;
    }
    if (l = Dt, e = gt, e = pu(
      t,
      t === l ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n = t.callbackNode, e === 0 || t === l && (Tt === 2 || Tt === 9) || t.cancelPendingCommit !== null)
      return n !== null && n !== null && cf(n), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || fa(t, e)) {
      if (l = e & -e, l === t.callbackPriority) return l;
      switch (n !== null && cf(n), sf(e)) {
        case 2:
        case 8:
          e = sr;
          break;
        case 32:
          e = mu;
          break;
        case 268435456:
          e = hr;
          break;
        default:
          e = mu;
      }
      return n = Ms.bind(null, t), e = ff(e, n), t.callbackPriority = l, t.callbackNode = e, l;
    }
    return n !== null && n !== null && cf(n), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Ms(t, l) {
    if (Wt !== 0 && Wt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var e = t.callbackNode;
    if (hi() && t.callbackNode !== e)
      return null;
    var n = gt;
    return n = pu(
      t,
      t === Dt ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n === 0 ? null : (as(t, n, l), As(t, yl()), t.callbackNode != null && t.callbackNode === e ? Ms.bind(null, t) : null);
  }
  function zs(t, l) {
    if (hi()) return null;
    as(t, l, !0);
  }
  function gm() {
    Om(function() {
      (zt & 6) !== 0 ? ff(
        or,
        ym
      ) : Es();
    });
  }
  function kc() {
    if (Re === 0) {
      var t = Dn;
      t === 0 && (t = vu, vu <<= 1, (vu & 261888) === 0 && (vu = 256)), Re = t;
    }
    return Re;
  }
  function xs(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Au("" + t);
  }
  function Ts(t, l) {
    var e = l.ownerDocument.createElement("input");
    return e.name = l.name, e.value = l.value, t.id && e.setAttribute("form", t.id), l.parentNode.insertBefore(e, l), t = new FormData(t), e.parentNode.removeChild(e), t;
  }
  function pm(t, l, e, n, a) {
    if (l === "submit" && e && e.stateNode === a) {
      var u = xs(
        (a[fl] || null).action
      ), r = n.submitter;
      r && (l = (l = r[fl] || null) ? xs(l.formAction) : r.getAttribute("formAction"), l !== null && (u = l, r = null));
      var s = new Tu(
        "action",
        "action",
        null,
        n,
        a
      );
      t.push({
        event: s,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (n.defaultPrevented) {
                if (Re !== 0) {
                  var g = r ? Ts(a, r) : new FormData(a);
                  gc(
                    e,
                    {
                      pending: !0,
                      data: g,
                      method: a.method,
                      action: u
                    },
                    null,
                    g
                  );
                }
              } else
                typeof u == "function" && (s.preventDefault(), g = r ? Ts(a, r) : new FormData(a), gc(
                  e,
                  {
                    pending: !0,
                    data: g,
                    method: a.method,
                    action: u
                  },
                  u,
                  g
                ));
            },
            currentTarget: a
          }
        ]
      });
    }
  }
  for (var Ic = 0; Ic < jf.length; Ic++) {
    var Pc = jf[Ic], Sm = Pc.toLowerCase(), bm = Pc[0].toUpperCase() + Pc.slice(1);
    Yl(
      Sm,
      "on" + bm
    );
  }
  Yl(eo, "onAnimationEnd"), Yl(no, "onAnimationIteration"), Yl(ao, "onAnimationStart"), Yl("dblclick", "onDoubleClick"), Yl("focusin", "onFocus"), Yl("focusout", "onBlur"), Yl(q2, "onTransitionRun"), Yl(B2, "onTransitionStart"), Yl(Z2, "onTransitionCancel"), Yl(uo, "onTransitionEnd"), gn("onMouseEnter", ["mouseout", "mouseover"]), gn("onMouseLeave", ["mouseout", "mouseover"]), gn("onPointerEnter", ["pointerout", "pointerover"]), gn("onPointerLeave", ["pointerout", "pointerover"]), Ve(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ve(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ve("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ve(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ve(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ve(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Va = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Em = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Va)
  );
  function _s(t, l) {
    l = (l & 4) !== 0;
    for (var e = 0; e < t.length; e++) {
      var n = t[e], a = n.event;
      n = n.listeners;
      t: {
        var u = void 0;
        if (l)
          for (var r = n.length - 1; 0 <= r; r--) {
            var s = n[r], g = s.instance, _ = s.currentTarget;
            if (s = s.listener, g !== u && a.isPropagationStopped())
              break t;
            u = s, a.currentTarget = _;
            try {
              u(a);
            } catch (D) {
              Ou(D);
            }
            a.currentTarget = null, u = g;
          }
        else
          for (r = 0; r < n.length; r++) {
            if (s = n[r], g = s.instance, _ = s.currentTarget, s = s.listener, g !== u && a.isPropagationStopped())
              break t;
            u = s, a.currentTarget = _;
            try {
              u(a);
            } catch (D) {
              Ou(D);
            }
            a.currentTarget = null, u = g;
          }
      }
    }
  }
  function yt(t, l) {
    var e = l[hf];
    e === void 0 && (e = l[hf] = /* @__PURE__ */ new Set());
    var n = t + "__bubble";
    e.has(n) || (Ns(l, t, 2, !1), e.add(n));
  }
  function t0(t, l, e) {
    var n = 0;
    l && (n |= 4), Ns(
      e,
      t,
      n,
      l
    );
  }
  var vi = "_reactListening" + Math.random().toString(36).slice(2);
  function l0(t) {
    if (!t[vi]) {
      t[vi] = !0, br.forEach(function(e) {
        e !== "selectionchange" && (Em.has(e) || t0(e, !1, t), t0(e, !0, t));
      });
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[vi] || (l[vi] = !0, t0("selectionchange", !1, l));
    }
  }
  function Ns(t, l, e, n) {
    switch (nh(l)) {
      case 2:
        var a = Wm;
        break;
      case 8:
        a = Fm;
        break;
      default:
        a = y0;
    }
    e = a.bind(
      null,
      l,
      e,
      t
    ), a = void 0, !Ef || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (a = !0), n ? a !== void 0 ? t.addEventListener(l, e, {
      capture: !0,
      passive: a
    }) : t.addEventListener(l, e, !0) : a !== void 0 ? t.addEventListener(l, e, {
      passive: a
    }) : t.addEventListener(l, e, !1);
  }
  function e0(t, l, e, n, a) {
    var u = n;
    if ((l & 1) === 0 && (l & 2) === 0 && n !== null)
      t: for (; ; ) {
        if (n === null) return;
        var r = n.tag;
        if (r === 3 || r === 4) {
          var s = n.stateNode.containerInfo;
          if (s === a) break;
          if (r === 4)
            for (r = n.return; r !== null; ) {
              var g = r.tag;
              if ((g === 3 || g === 4) && r.stateNode.containerInfo === a)
                return;
              r = r.return;
            }
          for (; s !== null; ) {
            if (r = mn(s), r === null) return;
            if (g = r.tag, g === 5 || g === 6 || g === 26 || g === 27) {
              n = u = r;
              continue t;
            }
            s = s.parentNode;
          }
        }
        n = n.return;
      }
    Ur(function() {
      var _ = u, D = Sf(e), q = [];
      t: {
        var N = io.get(t);
        if (N !== void 0) {
          var H = Tu, W = t;
          switch (t) {
            case "keypress":
              if (zu(e) === 0) break t;
            case "keydown":
            case "keyup":
              H = m2;
              break;
            case "focusin":
              W = "focus", H = xf;
              break;
            case "focusout":
              W = "blur", H = xf;
              break;
            case "beforeblur":
            case "afterblur":
              H = xf;
              break;
            case "click":
              if (e.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              H = Cr;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              H = e2;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              H = g2;
              break;
            case eo:
            case no:
            case ao:
              H = u2;
              break;
            case uo:
              H = S2;
              break;
            case "scroll":
            case "scrollend":
              H = t2;
              break;
            case "wheel":
              H = E2;
              break;
            case "copy":
            case "cut":
            case "paste":
              H = f2;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              H = Br;
              break;
            case "toggle":
            case "beforetoggle":
              H = M2;
          }
          var nt = (l & 4) !== 0, Ht = !nt && (t === "scroll" || t === "scrollend"), M = nt ? N !== null ? N + "Capture" : null : N;
          nt = [];
          for (var A = _, T; A !== null; ) {
            var R = A;
            if (T = R.stateNode, R = R.tag, R !== 5 && R !== 26 && R !== 27 || T === null || M === null || (R = sa(A, M), R != null && nt.push(
              Qa(A, R, T)
            )), Ht) break;
            A = A.return;
          }
          0 < nt.length && (N = new H(
            N,
            W,
            null,
            e,
            D
          ), q.push({ event: N, listeners: nt }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (N = t === "mouseover" || t === "pointerover", H = t === "mouseout" || t === "pointerout", N && e !== pf && (W = e.relatedTarget || e.fromElement) && (mn(W) || W[dn]))
            break t;
          if ((H || N) && (N = D.window === D ? D : (N = D.ownerDocument) ? N.defaultView || N.parentWindow : window, H ? (W = e.relatedTarget || e.toElement, H = _, W = W ? mn(W) : null, W !== null && (Ht = y(W), nt = W.tag, W !== Ht || nt !== 5 && nt !== 27 && nt !== 6) && (W = null)) : (H = null, W = _), H !== W)) {
            if (nt = Cr, R = "onMouseLeave", M = "onMouseEnter", A = "mouse", (t === "pointerout" || t === "pointerover") && (nt = Br, R = "onPointerLeave", M = "onPointerEnter", A = "pointer"), Ht = H == null ? N : oa(H), T = W == null ? N : oa(W), N = new nt(
              R,
              A + "leave",
              H,
              e,
              D
            ), N.target = Ht, N.relatedTarget = T, R = null, mn(D) === _ && (nt = new nt(
              M,
              A + "enter",
              W,
              e,
              D
            ), nt.target = T, nt.relatedTarget = Ht, R = nt), Ht = R, H && W)
              l: {
                for (nt = Am, M = H, A = W, T = 0, R = M; R; R = nt(R))
                  T++;
                R = 0;
                for (var lt = A; lt; lt = nt(lt))
                  R++;
                for (; 0 < T - R; )
                  M = nt(M), T--;
                for (; 0 < R - T; )
                  A = nt(A), R--;
                for (; T--; ) {
                  if (M === A || A !== null && M === A.alternate) {
                    nt = M;
                    break l;
                  }
                  M = nt(M), A = nt(A);
                }
                nt = null;
              }
            else nt = null;
            H !== null && Os(
              q,
              N,
              H,
              nt,
              !1
            ), W !== null && Ht !== null && Os(
              q,
              Ht,
              W,
              nt,
              !0
            );
          }
        }
        t: {
          if (N = _ ? oa(_) : window, H = N.nodeName && N.nodeName.toLowerCase(), H === "select" || H === "input" && N.type === "file")
            var At = Kr;
          else if (Vr(N))
            if (wr)
              At = R2;
            else {
              At = D2;
              var P = H2;
            }
          else
            H = N.nodeName, !H || H.toLowerCase() !== "input" || N.type !== "checkbox" && N.type !== "radio" ? _ && gf(_.elementType) && (At = Kr) : At = U2;
          if (At && (At = At(t, _))) {
            Qr(
              q,
              At,
              e,
              D
            );
            break t;
          }
          P && P(t, N, _), t === "focusout" && _ && N.type === "number" && _.memoizedProps.value != null && yf(N, "number", N.value);
        }
        switch (P = _ ? oa(_) : window, t) {
          case "focusin":
            (Vr(P) || P.contentEditable === "true") && (Mn = P, Df = _, Sa = null);
            break;
          case "focusout":
            Sa = Df = Mn = null;
            break;
          case "mousedown":
            Uf = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Uf = !1, to(q, e, D);
            break;
          case "selectionchange":
            if (C2) break;
          case "keydown":
          case "keyup":
            to(q, e, D);
        }
        var ht;
        if (_f)
          t: {
            switch (t) {
              case "compositionstart":
                var pt = "onCompositionStart";
                break t;
              case "compositionend":
                pt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                pt = "onCompositionUpdate";
                break t;
            }
            pt = void 0;
          }
        else
          An ? Gr(t, e) && (pt = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (pt = "onCompositionStart");
        pt && (Zr && e.locale !== "ko" && (An || pt !== "onCompositionStart" ? pt === "onCompositionEnd" && An && (ht = Rr()) : (ge = D, Af = "value" in ge ? ge.value : ge.textContent, An = !0)), P = yi(_, pt), 0 < P.length && (pt = new qr(
          pt,
          t,
          null,
          e,
          D
        ), q.push({ event: pt, listeners: P }), ht ? pt.data = ht : (ht = Xr(e), ht !== null && (pt.data = ht)))), (ht = x2 ? T2(t, e) : _2(t, e)) && (pt = yi(_, "onBeforeInput"), 0 < pt.length && (P = new qr(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          D
        ), q.push({
          event: P,
          listeners: pt
        }), P.data = ht)), pm(
          q,
          t,
          _,
          e,
          D
        );
      }
      _s(q, l);
    });
  }
  function Qa(t, l, e) {
    return {
      instance: t,
      listener: l,
      currentTarget: e
    };
  }
  function yi(t, l) {
    for (var e = l + "Capture", n = []; t !== null; ) {
      var a = t, u = a.stateNode;
      if (a = a.tag, a !== 5 && a !== 26 && a !== 27 || u === null || (a = sa(t, e), a != null && n.unshift(
        Qa(t, a, u)
      ), a = sa(t, l), a != null && n.push(
        Qa(t, a, u)
      )), t.tag === 3) return n;
      t = t.return;
    }
    return [];
  }
  function Am(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Os(t, l, e, n, a) {
    for (var u = l._reactName, r = []; e !== null && e !== n; ) {
      var s = e, g = s.alternate, _ = s.stateNode;
      if (s = s.tag, g !== null && g === n) break;
      s !== 5 && s !== 26 && s !== 27 || _ === null || (g = _, a ? (_ = sa(e, u), _ != null && r.unshift(
        Qa(e, _, g)
      )) : a || (_ = sa(e, u), _ != null && r.push(
        Qa(e, _, g)
      ))), e = e.return;
    }
    r.length !== 0 && t.push({ event: l, listeners: r });
  }
  var Mm = /\r\n?/g, zm = /\u0000|\uFFFD/g;
  function Hs(t) {
    return (typeof t == "string" ? t : "" + t).replace(Mm, `
`).replace(zm, "");
  }
  function Ds(t, l) {
    return l = Hs(l), Hs(t) === l;
  }
  function Ot(t, l, e, n, a, u) {
    switch (e) {
      case "children":
        typeof n == "string" ? l === "body" || l === "textarea" && n === "" || Sn(t, n) : (typeof n == "number" || typeof n == "bigint") && l !== "body" && Sn(t, "" + n);
        break;
      case "className":
        bu(t, "class", n);
        break;
      case "tabIndex":
        bu(t, "tabindex", n);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        bu(t, e, n);
        break;
      case "style":
        Hr(t, n, u);
        break;
      case "data":
        if (l !== "object") {
          bu(t, "data", n);
          break;
        }
      case "src":
      case "href":
        if (n === "" && (l !== "a" || e !== "href")) {
          t.removeAttribute(e);
          break;
        }
        if (n == null || typeof n == "function" || typeof n == "symbol" || typeof n == "boolean") {
          t.removeAttribute(e);
          break;
        }
        n = Au("" + n), t.setAttribute(e, n);
        break;
      case "action":
      case "formAction":
        if (typeof n == "function") {
          t.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (e === "formAction" ? (l !== "input" && Ot(t, l, "name", a.name, a, null), Ot(
            t,
            l,
            "formEncType",
            a.formEncType,
            a,
            null
          ), Ot(
            t,
            l,
            "formMethod",
            a.formMethod,
            a,
            null
          ), Ot(
            t,
            l,
            "formTarget",
            a.formTarget,
            a,
            null
          )) : (Ot(t, l, "encType", a.encType, a, null), Ot(t, l, "method", a.method, a, null), Ot(t, l, "target", a.target, a, null)));
        if (n == null || typeof n == "symbol" || typeof n == "boolean") {
          t.removeAttribute(e);
          break;
        }
        n = Au("" + n), t.setAttribute(e, n);
        break;
      case "onClick":
        n != null && (t.onclick = kl);
        break;
      case "onScroll":
        n != null && yt("scroll", t);
        break;
      case "onScrollEnd":
        n != null && yt("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n))
            throw Error(c(61));
          if (e = n.__html, e != null) {
            if (a.children != null) throw Error(c(60));
            t.innerHTML = e;
          }
        }
        break;
      case "multiple":
        t.multiple = n && typeof n != "function" && typeof n != "symbol";
        break;
      case "muted":
        t.muted = n && typeof n != "function" && typeof n != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (n == null || typeof n == "function" || typeof n == "boolean" || typeof n == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        e = Au("" + n), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          e
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        n != null && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(e, "" + n) : t.removeAttribute(e);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        n && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(e, "") : t.removeAttribute(e);
        break;
      case "capture":
      case "download":
        n === !0 ? t.setAttribute(e, "") : n !== !1 && n != null && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(e, n) : t.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        n != null && typeof n != "function" && typeof n != "symbol" && !isNaN(n) && 1 <= n ? t.setAttribute(e, n) : t.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        n == null || typeof n == "function" || typeof n == "symbol" || isNaN(n) ? t.removeAttribute(e) : t.setAttribute(e, n);
        break;
      case "popover":
        yt("beforetoggle", t), yt("toggle", t), Su(t, "popover", n);
        break;
      case "xlinkActuate":
        Fl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          n
        );
        break;
      case "xlinkArcrole":
        Fl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          n
        );
        break;
      case "xlinkRole":
        Fl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          n
        );
        break;
      case "xlinkShow":
        Fl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          n
        );
        break;
      case "xlinkTitle":
        Fl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          n
        );
        break;
      case "xlinkType":
        Fl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          n
        );
        break;
      case "xmlBase":
        Fl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          n
        );
        break;
      case "xmlLang":
        Fl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          n
        );
        break;
      case "xmlSpace":
        Fl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          n
        );
        break;
      case "is":
        Su(t, "is", n);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = Id.get(e) || e, Su(t, e, n));
    }
  }
  function n0(t, l, e, n, a, u) {
    switch (e) {
      case "style":
        Hr(t, n, u);
        break;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n))
            throw Error(c(61));
          if (e = n.__html, e != null) {
            if (a.children != null) throw Error(c(60));
            t.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof n == "string" ? Sn(t, n) : (typeof n == "number" || typeof n == "bigint") && Sn(t, "" + n);
        break;
      case "onScroll":
        n != null && yt("scroll", t);
        break;
      case "onScrollEnd":
        n != null && yt("scrollend", t);
        break;
      case "onClick":
        n != null && (t.onclick = kl);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Er.hasOwnProperty(e))
          t: {
            if (e[0] === "o" && e[1] === "n" && (a = e.endsWith("Capture"), l = e.slice(2, a ? e.length - 7 : void 0), u = t[fl] || null, u = u != null ? u[e] : null, typeof u == "function" && t.removeEventListener(l, u, a), typeof n == "function")) {
              typeof u != "function" && u !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(l, n, a);
              break t;
            }
            e in t ? t[e] = n : n === !0 ? t.setAttribute(e, "") : Su(t, e, n);
          }
    }
  }
  function el(t, l, e) {
    switch (l) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        yt("error", t), yt("load", t);
        var n = !1, a = !1, u;
        for (u in e)
          if (e.hasOwnProperty(u)) {
            var r = e[u];
            if (r != null)
              switch (u) {
                case "src":
                  n = !0;
                  break;
                case "srcSet":
                  a = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(c(137, l));
                default:
                  Ot(t, l, u, r, e, null);
              }
          }
        a && Ot(t, l, "srcSet", e.srcSet, e, null), n && Ot(t, l, "src", e.src, e, null);
        return;
      case "input":
        yt("invalid", t);
        var s = u = r = a = null, g = null, _ = null;
        for (n in e)
          if (e.hasOwnProperty(n)) {
            var D = e[n];
            if (D != null)
              switch (n) {
                case "name":
                  a = D;
                  break;
                case "type":
                  r = D;
                  break;
                case "checked":
                  g = D;
                  break;
                case "defaultChecked":
                  _ = D;
                  break;
                case "value":
                  u = D;
                  break;
                case "defaultValue":
                  s = D;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (D != null)
                    throw Error(c(137, l));
                  break;
                default:
                  Ot(t, l, n, D, e, null);
              }
          }
        Tr(
          t,
          u,
          s,
          g,
          _,
          r,
          a,
          !1
        );
        return;
      case "select":
        yt("invalid", t), n = r = u = null;
        for (a in e)
          if (e.hasOwnProperty(a) && (s = e[a], s != null))
            switch (a) {
              case "value":
                u = s;
                break;
              case "defaultValue":
                r = s;
                break;
              case "multiple":
                n = s;
              default:
                Ot(t, l, a, s, e, null);
            }
        l = u, e = r, t.multiple = !!n, l != null ? pn(t, !!n, l, !1) : e != null && pn(t, !!n, e, !0);
        return;
      case "textarea":
        yt("invalid", t), u = a = n = null;
        for (r in e)
          if (e.hasOwnProperty(r) && (s = e[r], s != null))
            switch (r) {
              case "value":
                n = s;
                break;
              case "defaultValue":
                a = s;
                break;
              case "children":
                u = s;
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(c(91));
                break;
              default:
                Ot(t, l, r, s, e, null);
            }
        Nr(t, n, a, u);
        return;
      case "option":
        for (g in e)
          if (e.hasOwnProperty(g) && (n = e[g], n != null))
            switch (g) {
              case "selected":
                t.selected = n && typeof n != "function" && typeof n != "symbol";
                break;
              default:
                Ot(t, l, g, n, e, null);
            }
        return;
      case "dialog":
        yt("beforetoggle", t), yt("toggle", t), yt("cancel", t), yt("close", t);
        break;
      case "iframe":
      case "object":
        yt("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Va.length; n++)
          yt(Va[n], t);
        break;
      case "image":
        yt("error", t), yt("load", t);
        break;
      case "details":
        yt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        yt("error", t), yt("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (_ in e)
          if (e.hasOwnProperty(_) && (n = e[_], n != null))
            switch (_) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(c(137, l));
              default:
                Ot(t, l, _, n, e, null);
            }
        return;
      default:
        if (gf(l)) {
          for (D in e)
            e.hasOwnProperty(D) && (n = e[D], n !== void 0 && n0(
              t,
              l,
              D,
              n,
              e,
              void 0
            ));
          return;
        }
    }
    for (s in e)
      e.hasOwnProperty(s) && (n = e[s], n != null && Ot(t, l, s, n, e, null));
  }
  function xm(t, l, e, n) {
    switch (l) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var a = null, u = null, r = null, s = null, g = null, _ = null, D = null;
        for (H in e) {
          var q = e[H];
          if (e.hasOwnProperty(H) && q != null)
            switch (H) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                g = q;
              default:
                n.hasOwnProperty(H) || Ot(t, l, H, null, n, q);
            }
        }
        for (var N in n) {
          var H = n[N];
          if (q = e[N], n.hasOwnProperty(N) && (H != null || q != null))
            switch (N) {
              case "type":
                u = H;
                break;
              case "name":
                a = H;
                break;
              case "checked":
                _ = H;
                break;
              case "defaultChecked":
                D = H;
                break;
              case "value":
                r = H;
                break;
              case "defaultValue":
                s = H;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (H != null)
                  throw Error(c(137, l));
                break;
              default:
                H !== q && Ot(
                  t,
                  l,
                  N,
                  H,
                  n,
                  q
                );
            }
        }
        vf(
          t,
          r,
          s,
          g,
          _,
          D,
          u,
          a
        );
        return;
      case "select":
        H = r = s = N = null;
        for (u in e)
          if (g = e[u], e.hasOwnProperty(u) && g != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                H = g;
              default:
                n.hasOwnProperty(u) || Ot(
                  t,
                  l,
                  u,
                  null,
                  n,
                  g
                );
            }
        for (a in n)
          if (u = n[a], g = e[a], n.hasOwnProperty(a) && (u != null || g != null))
            switch (a) {
              case "value":
                N = u;
                break;
              case "defaultValue":
                s = u;
                break;
              case "multiple":
                r = u;
              default:
                u !== g && Ot(
                  t,
                  l,
                  a,
                  u,
                  n,
                  g
                );
            }
        l = s, e = r, n = H, N != null ? pn(t, !!e, N, !1) : !!n != !!e && (l != null ? pn(t, !!e, l, !0) : pn(t, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        H = N = null;
        for (s in e)
          if (a = e[s], e.hasOwnProperty(s) && a != null && !n.hasOwnProperty(s))
            switch (s) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ot(t, l, s, null, n, a);
            }
        for (r in n)
          if (a = n[r], u = e[r], n.hasOwnProperty(r) && (a != null || u != null))
            switch (r) {
              case "value":
                N = a;
                break;
              case "defaultValue":
                H = a;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (a != null) throw Error(c(91));
                break;
              default:
                a !== u && Ot(t, l, r, a, n, u);
            }
        _r(t, N, H);
        return;
      case "option":
        for (var W in e)
          if (N = e[W], e.hasOwnProperty(W) && N != null && !n.hasOwnProperty(W))
            switch (W) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Ot(
                  t,
                  l,
                  W,
                  null,
                  n,
                  N
                );
            }
        for (g in n)
          if (N = n[g], H = e[g], n.hasOwnProperty(g) && N !== H && (N != null || H != null))
            switch (g) {
              case "selected":
                t.selected = N && typeof N != "function" && typeof N != "symbol";
                break;
              default:
                Ot(
                  t,
                  l,
                  g,
                  N,
                  n,
                  H
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var nt in e)
          N = e[nt], e.hasOwnProperty(nt) && N != null && !n.hasOwnProperty(nt) && Ot(t, l, nt, null, n, N);
        for (_ in n)
          if (N = n[_], H = e[_], n.hasOwnProperty(_) && N !== H && (N != null || H != null))
            switch (_) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (N != null)
                  throw Error(c(137, l));
                break;
              default:
                Ot(
                  t,
                  l,
                  _,
                  N,
                  n,
                  H
                );
            }
        return;
      default:
        if (gf(l)) {
          for (var Ht in e)
            N = e[Ht], e.hasOwnProperty(Ht) && N !== void 0 && !n.hasOwnProperty(Ht) && n0(
              t,
              l,
              Ht,
              void 0,
              n,
              N
            );
          for (D in n)
            N = n[D], H = e[D], !n.hasOwnProperty(D) || N === H || N === void 0 && H === void 0 || n0(
              t,
              l,
              D,
              N,
              n,
              H
            );
          return;
        }
    }
    for (var M in e)
      N = e[M], e.hasOwnProperty(M) && N != null && !n.hasOwnProperty(M) && Ot(t, l, M, null, n, N);
    for (q in n)
      N = n[q], H = e[q], !n.hasOwnProperty(q) || N === H || N == null && H == null || Ot(t, l, q, N, n, H);
  }
  function Us(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function Tm() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, l = 0, e = performance.getEntriesByType("resource"), n = 0; n < e.length; n++) {
        var a = e[n], u = a.transferSize, r = a.initiatorType, s = a.duration;
        if (u && s && Us(r)) {
          for (r = 0, s = a.responseEnd, n += 1; n < e.length; n++) {
            var g = e[n], _ = g.startTime;
            if (_ > s) break;
            var D = g.transferSize, q = g.initiatorType;
            D && Us(q) && (g = g.responseEnd, r += D * (g < s ? 1 : (s - _) / (g - _)));
          }
          if (--n, l += 8 * (u + r) / (a.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var a0 = null, u0 = null;
  function gi(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Rs(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function js(t, l) {
    if (t === 0)
      switch (l) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && l === "foreignObject" ? 0 : t;
  }
  function i0(t, l) {
    return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
  }
  var f0 = null;
  function _m() {
    var t = window.event;
    return t && t.type === "popstate" ? t === f0 ? !1 : (f0 = t, !0) : (f0 = null, !1);
  }
  var Cs = typeof setTimeout == "function" ? setTimeout : void 0, Nm = typeof clearTimeout == "function" ? clearTimeout : void 0, qs = typeof Promise == "function" ? Promise : void 0, Om = typeof queueMicrotask == "function" ? queueMicrotask : typeof qs < "u" ? function(t) {
    return qs.resolve(null).then(t).catch(Hm);
  } : Cs;
  function Hm(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function je(t) {
    return t === "head";
  }
  function Bs(t, l) {
    var e = l, n = 0;
    do {
      var a = e.nextSibling;
      if (t.removeChild(e), a && a.nodeType === 8)
        if (e = a.data, e === "/$" || e === "/&") {
          if (n === 0) {
            t.removeChild(a), Fn(l);
            return;
          }
          n--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          n++;
        else if (e === "html")
          Ka(t.ownerDocument.documentElement);
        else if (e === "head") {
          e = t.ownerDocument.head, Ka(e);
          for (var u = e.firstChild; u; ) {
            var r = u.nextSibling, s = u.nodeName;
            u[ra] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && u.rel.toLowerCase() === "stylesheet" || e.removeChild(u), u = r;
          }
        } else
          e === "body" && Ka(t.ownerDocument.body);
      e = a;
    } while (e);
    Fn(l);
  }
  function Zs(t, l) {
    var e = t;
    t = 0;
    do {
      var n = e.nextSibling;
      if (e.nodeType === 1 ? l ? (e._stashedDisplay = e.style.display, e.style.display = "none") : (e.style.display = e._stashedDisplay || "", e.getAttribute("style") === "" && e.removeAttribute("style")) : e.nodeType === 3 && (l ? (e._stashedText = e.nodeValue, e.nodeValue = "") : e.nodeValue = e._stashedText || ""), n && n.nodeType === 8)
        if (e = n.data, e === "/$") {
          if (t === 0) break;
          t--;
        } else
          e !== "$" && e !== "$?" && e !== "$~" && e !== "$!" || t++;
      e = n;
    } while (e);
  }
  function c0(t) {
    var l = t.firstChild;
    for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
      var e = l;
      switch (l = l.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          c0(e), df(e);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(e);
    }
  }
  function Dm(t, l, e, n) {
    for (; t.nodeType === 1; ) {
      var a = e;
      if (t.nodeName.toLowerCase() !== l.toLowerCase()) {
        if (!n && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (n) {
        if (!t[ra])
          switch (l) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (u = t.getAttribute("rel"), u === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (u !== a.rel || t.getAttribute("href") !== (a.href == null || a.href === "" ? null : a.href) || t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin) || t.getAttribute("title") !== (a.title == null ? null : a.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (u = t.getAttribute("src"), (u !== (a.src == null ? null : a.src) || t.getAttribute("type") !== (a.type == null ? null : a.type) || t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin)) && u && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (l === "input" && t.type === "hidden") {
        var u = a.name == null ? null : "" + a.name;
        if (a.type === "hidden" && t.getAttribute("name") === u)
          return t;
      } else return t;
      if (t = Cl(t.nextSibling), t === null) break;
    }
    return null;
  }
  function Um(t, l, e) {
    if (l === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Cl(t.nextSibling), t === null)) return null;
    return t;
  }
  function Ys(t, l) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = Cl(t.nextSibling), t === null)) return null;
    return t;
  }
  function r0(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function o0(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function Rm(t, l) {
    var e = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = l;
    else if (t.data !== "$?" || e.readyState !== "loading")
      l();
    else {
      var n = function() {
        l(), e.removeEventListener("DOMContentLoaded", n);
      };
      e.addEventListener("DOMContentLoaded", n), t._reactRetry = n;
    }
  }
  function Cl(t) {
    for (; t != null; t = t.nextSibling) {
      var l = t.nodeType;
      if (l === 1 || l === 3) break;
      if (l === 8) {
        if (l = t.data, l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&" || l === "F!" || l === "F")
          break;
        if (l === "/$" || l === "/&") return null;
      }
    }
    return t;
  }
  var s0 = null;
  function Ls(t) {
    t = t.nextSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "/$" || e === "/&") {
          if (l === 0)
            return Cl(t.nextSibling);
          l--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || l++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Gs(t) {
    t = t.previousSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
          if (l === 0) return t;
          l--;
        } else e !== "/$" && e !== "/&" || l++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Xs(t, l, e) {
    switch (l = gi(e), t) {
      case "html":
        if (t = l.documentElement, !t) throw Error(c(452));
        return t;
      case "head":
        if (t = l.head, !t) throw Error(c(453));
        return t;
      case "body":
        if (t = l.body, !t) throw Error(c(454));
        return t;
      default:
        throw Error(c(451));
    }
  }
  function Ka(t) {
    for (var l = t.attributes; l.length; )
      t.removeAttributeNode(l[0]);
    df(t);
  }
  var ql = /* @__PURE__ */ new Map(), Vs = /* @__PURE__ */ new Set();
  function pi(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var de = G.d;
  G.d = {
    f: jm,
    r: Cm,
    D: qm,
    C: Bm,
    L: Zm,
    m: Ym,
    X: Gm,
    S: Lm,
    M: Xm
  };
  function jm() {
    var t = de.f(), l = ri();
    return t || l;
  }
  function Cm(t) {
    var l = vn(t);
    l !== null && l.tag === 5 && l.type === "form" ? i1(l) : de.r(t);
  }
  var Jn = typeof document > "u" ? null : document;
  function Qs(t, l, e) {
    var n = Jn;
    if (n && typeof l == "string" && l) {
      var a = Nl(l);
      a = 'link[rel="' + t + '"][href="' + a + '"]', typeof e == "string" && (a += '[crossorigin="' + e + '"]'), Vs.has(a) || (Vs.add(a), t = { rel: t, crossOrigin: e, href: l }, n.querySelector(a) === null && (l = n.createElement("link"), el(l, "link", t), Ft(l), n.head.appendChild(l)));
    }
  }
  function qm(t) {
    de.D(t), Qs("dns-prefetch", t, null);
  }
  function Bm(t, l) {
    de.C(t, l), Qs("preconnect", t, l);
  }
  function Zm(t, l, e) {
    de.L(t, l, e);
    var n = Jn;
    if (n && t && l) {
      var a = 'link[rel="preload"][as="' + Nl(l) + '"]';
      l === "image" && e && e.imageSrcSet ? (a += '[imagesrcset="' + Nl(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (a += '[imagesizes="' + Nl(
        e.imageSizes
      ) + '"]')) : a += '[href="' + Nl(t) + '"]';
      var u = a;
      switch (l) {
        case "style":
          u = $n(t);
          break;
        case "script":
          u = Wn(t);
      }
      ql.has(u) || (t = p(
        {
          rel: "preload",
          href: l === "image" && e && e.imageSrcSet ? void 0 : t,
          as: l
        },
        e
      ), ql.set(u, t), n.querySelector(a) !== null || l === "style" && n.querySelector(wa(u)) || l === "script" && n.querySelector(Ja(u)) || (l = n.createElement("link"), el(l, "link", t), Ft(l), n.head.appendChild(l)));
    }
  }
  function Ym(t, l) {
    de.m(t, l);
    var e = Jn;
    if (e && t) {
      var n = l && typeof l.as == "string" ? l.as : "script", a = 'link[rel="modulepreload"][as="' + Nl(n) + '"][href="' + Nl(t) + '"]', u = a;
      switch (n) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Wn(t);
      }
      if (!ql.has(u) && (t = p({ rel: "modulepreload", href: t }, l), ql.set(u, t), e.querySelector(a) === null)) {
        switch (n) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(Ja(u)))
              return;
        }
        n = e.createElement("link"), el(n, "link", t), Ft(n), e.head.appendChild(n);
      }
    }
  }
  function Lm(t, l, e) {
    de.S(t, l, e);
    var n = Jn;
    if (n && t) {
      var a = yn(n).hoistableStyles, u = $n(t);
      l = l || "default";
      var r = a.get(u);
      if (!r) {
        var s = { loading: 0, preload: null };
        if (r = n.querySelector(
          wa(u)
        ))
          s.loading = 5;
        else {
          t = p(
            { rel: "stylesheet", href: t, "data-precedence": l },
            e
          ), (e = ql.get(u)) && h0(t, e);
          var g = r = n.createElement("link");
          Ft(g), el(g, "link", t), g._p = new Promise(function(_, D) {
            g.onload = _, g.onerror = D;
          }), g.addEventListener("load", function() {
            s.loading |= 1;
          }), g.addEventListener("error", function() {
            s.loading |= 2;
          }), s.loading |= 4, Si(r, l, n);
        }
        r = {
          type: "stylesheet",
          instance: r,
          count: 1,
          state: s
        }, a.set(u, r);
      }
    }
  }
  function Gm(t, l) {
    de.X(t, l);
    var e = Jn;
    if (e && t) {
      var n = yn(e).hoistableScripts, a = Wn(t), u = n.get(a);
      u || (u = e.querySelector(Ja(a)), u || (t = p({ src: t, async: !0 }, l), (l = ql.get(a)) && d0(t, l), u = e.createElement("script"), Ft(u), el(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, n.set(a, u));
    }
  }
  function Xm(t, l) {
    de.M(t, l);
    var e = Jn;
    if (e && t) {
      var n = yn(e).hoistableScripts, a = Wn(t), u = n.get(a);
      u || (u = e.querySelector(Ja(a)), u || (t = p({ src: t, async: !0, type: "module" }, l), (l = ql.get(a)) && d0(t, l), u = e.createElement("script"), Ft(u), el(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, n.set(a, u));
    }
  }
  function Ks(t, l, e, n) {
    var a = (a = mt.current) ? pi(a) : null;
    if (!a) throw Error(c(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (l = $n(e.href), e = yn(
          a
        ).hoistableStyles, n = e.get(l), n || (n = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, n)), n) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          t = $n(e.href);
          var u = yn(
            a
          ).hoistableStyles, r = u.get(t);
          if (r || (a = a.ownerDocument || a, r = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, r), (u = a.querySelector(
            wa(t)
          )) && !u._p && (r.instance = u, r.state.loading = 5), ql.has(t) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, ql.set(t, e), u || Vm(
            a,
            t,
            e,
            r.state
          ))), l && n === null)
            throw Error(c(528, ""));
          return r;
        }
        if (l && n !== null)
          throw Error(c(529, ""));
        return null;
      case "script":
        return l = e.async, e = e.src, typeof e == "string" && l && typeof l != "function" && typeof l != "symbol" ? (l = Wn(e), e = yn(
          a
        ).hoistableScripts, n = e.get(l), n || (n = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, n)), n) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(c(444, t));
    }
  }
  function $n(t) {
    return 'href="' + Nl(t) + '"';
  }
  function wa(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function ws(t) {
    return p({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function Vm(t, l, e, n) {
    t.querySelector('link[rel="preload"][as="style"][' + l + "]") ? n.loading = 1 : (l = t.createElement("link"), n.preload = l, l.addEventListener("load", function() {
      return n.loading |= 1;
    }), l.addEventListener("error", function() {
      return n.loading |= 2;
    }), el(l, "link", e), Ft(l), t.head.appendChild(l));
  }
  function Wn(t) {
    return '[src="' + Nl(t) + '"]';
  }
  function Ja(t) {
    return "script[async]" + t;
  }
  function Js(t, l, e) {
    if (l.count++, l.instance === null)
      switch (l.type) {
        case "style":
          var n = t.querySelector(
            'style[data-href~="' + Nl(e.href) + '"]'
          );
          if (n)
            return l.instance = n, Ft(n), n;
          var a = p({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return n = (t.ownerDocument || t).createElement(
            "style"
          ), Ft(n), el(n, "style", a), Si(n, e.precedence, t), l.instance = n;
        case "stylesheet":
          a = $n(e.href);
          var u = t.querySelector(
            wa(a)
          );
          if (u)
            return l.state.loading |= 4, l.instance = u, Ft(u), u;
          n = ws(e), (a = ql.get(a)) && h0(n, a), u = (t.ownerDocument || t).createElement("link"), Ft(u);
          var r = u;
          return r._p = new Promise(function(s, g) {
            r.onload = s, r.onerror = g;
          }), el(u, "link", n), l.state.loading |= 4, Si(u, e.precedence, t), l.instance = u;
        case "script":
          return u = Wn(e.src), (a = t.querySelector(
            Ja(u)
          )) ? (l.instance = a, Ft(a), a) : (n = e, (a = ql.get(u)) && (n = p({}, e), d0(n, a)), t = t.ownerDocument || t, a = t.createElement("script"), Ft(a), el(a, "link", n), t.head.appendChild(a), l.instance = a);
        case "void":
          return null;
        default:
          throw Error(c(443, l.type));
      }
    else
      l.type === "stylesheet" && (l.state.loading & 4) === 0 && (n = l.instance, l.state.loading |= 4, Si(n, e.precedence, t));
    return l.instance;
  }
  function Si(t, l, e) {
    for (var n = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), a = n.length ? n[n.length - 1] : null, u = a, r = 0; r < n.length; r++) {
      var s = n[r];
      if (s.dataset.precedence === l) u = s;
      else if (u !== a) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (l = e.nodeType === 9 ? e.head : e, l.insertBefore(t, l.firstChild));
  }
  function h0(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.title == null && (t.title = l.title);
  }
  function d0(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
  }
  var bi = null;
  function $s(t, l, e) {
    if (bi === null) {
      var n = /* @__PURE__ */ new Map(), a = bi = /* @__PURE__ */ new Map();
      a.set(e, n);
    } else
      a = bi, n = a.get(e), n || (n = /* @__PURE__ */ new Map(), a.set(e, n));
    if (n.has(t)) return n;
    for (n.set(t, null), e = e.getElementsByTagName(t), a = 0; a < e.length; a++) {
      var u = e[a];
      if (!(u[ra] || u[It] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var r = u.getAttribute(l) || "";
        r = t + r;
        var s = n.get(r);
        s ? s.push(u) : n.set(r, [u]);
      }
    }
    return n;
  }
  function Ws(t, l, e) {
    t = t.ownerDocument || t, t.head.insertBefore(
      e,
      l === "title" ? t.querySelector("head > title") : null
    );
  }
  function Qm(t, l, e) {
    if (e === 1 || l.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof l.precedence != "string" || typeof l.href != "string" || l.href === "")
          break;
        return !0;
      case "link":
        if (typeof l.rel != "string" || typeof l.href != "string" || l.href === "" || l.onLoad || l.onError)
          break;
        switch (l.rel) {
          case "stylesheet":
            return t = l.disabled, typeof l.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (l.async && typeof l.async != "function" && typeof l.async != "symbol" && !l.onLoad && !l.onError && l.src && typeof l.src == "string")
          return !0;
    }
    return !1;
  }
  function Fs(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function Km(t, l, e, n) {
    if (e.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var a = $n(n.href), u = l.querySelector(
          wa(a)
        );
        if (u) {
          l = u._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = Ei.bind(t), l.then(t, t)), e.state.loading |= 4, e.instance = u, Ft(u);
          return;
        }
        u = l.ownerDocument || l, n = ws(n), (a = ql.get(a)) && h0(n, a), u = u.createElement("link"), Ft(u);
        var r = u;
        r._p = new Promise(function(s, g) {
          r.onload = s, r.onerror = g;
        }), el(u, "link", n), e.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(e, l), (l = e.state.preload) && (e.state.loading & 3) === 0 && (t.count++, e = Ei.bind(t), l.addEventListener("load", e), l.addEventListener("error", e));
    }
  }
  var m0 = 0;
  function wm(t, l) {
    return t.stylesheets && t.count === 0 && Mi(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(e) {
      var n = setTimeout(function() {
        if (t.stylesheets && Mi(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + l);
      0 < t.imgBytes && m0 === 0 && (m0 = 62500 * Tm());
      var a = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Mi(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > m0 ? 50 : 800) + l
      );
      return t.unsuspend = e, function() {
        t.unsuspend = null, clearTimeout(n), clearTimeout(a);
      };
    } : null;
  }
  function Ei() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Mi(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Ai = null;
  function Mi(t, l) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Ai = /* @__PURE__ */ new Map(), l.forEach(Jm, t), Ai = null, Ei.call(t));
  }
  function Jm(t, l) {
    if (!(l.state.loading & 4)) {
      var e = Ai.get(t);
      if (e) var n = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), Ai.set(t, e);
        for (var a = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < a.length; u++) {
          var r = a[u];
          (r.nodeName === "LINK" || r.getAttribute("media") !== "not all") && (e.set(r.dataset.precedence, r), n = r);
        }
        n && e.set(null, n);
      }
      a = l.instance, r = a.getAttribute("data-precedence"), u = e.get(r) || n, u === n && e.set(null, a), e.set(r, a), this.count++, n = Ei.bind(this), a.addEventListener("load", n), a.addEventListener("error", n), u ? u.parentNode.insertBefore(a, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(a, t.firstChild)), l.state.loading |= 4;
    }
  }
  var $a = {
    $$typeof: F,
    Provider: null,
    Consumer: null,
    _currentValue: Q,
    _currentValue2: Q,
    _threadCount: 0
  };
  function $m(t, l, e, n, a, u, r, s, g) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = rf(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = rf(0), this.hiddenUpdates = rf(null), this.identifierPrefix = n, this.onUncaughtError = a, this.onCaughtError = u, this.onRecoverableError = r, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = g, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function ks(t, l, e, n, a, u, r, s, g, _, D, q) {
    return t = new $m(
      t,
      l,
      e,
      r,
      g,
      _,
      D,
      q,
      s
    ), l = 1, u === !0 && (l |= 24), u = bl(3, null, null, l), t.current = u, u.stateNode = t, l = Jf(), l.refCount++, t.pooledCache = l, l.refCount++, u.memoizedState = {
      element: n,
      isDehydrated: e,
      cache: l
    }, kf(u), t;
  }
  function Is(t) {
    return t ? (t = Tn, t) : Tn;
  }
  function Ps(t, l, e, n, a, u) {
    a = Is(a), n.context === null ? n.context = a : n.pendingContext = a, n = Me(l), n.payload = { element: e }, u = u === void 0 ? null : u, u !== null && (n.callback = u), e = ze(t, n, l), e !== null && (dl(e, t, l), Ta(e, t, l));
  }
  function th(t, l) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < l ? e : l;
    }
  }
  function v0(t, l) {
    th(t, l), (t = t.alternate) && th(t, l);
  }
  function lh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = Je(t, 67108864);
      l !== null && dl(l, t, 67108864), v0(t, 67108864);
    }
  }
  function eh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = xl();
      l = of(l);
      var e = Je(t, l);
      e !== null && dl(e, t, l), v0(t, l);
    }
  }
  var zi = !0;
  function Wm(t, l, e, n) {
    var a = x.T;
    x.T = null;
    var u = G.p;
    try {
      G.p = 2, y0(t, l, e, n);
    } finally {
      G.p = u, x.T = a;
    }
  }
  function Fm(t, l, e, n) {
    var a = x.T;
    x.T = null;
    var u = G.p;
    try {
      G.p = 8, y0(t, l, e, n);
    } finally {
      G.p = u, x.T = a;
    }
  }
  function y0(t, l, e, n) {
    if (zi) {
      var a = g0(n);
      if (a === null)
        e0(
          t,
          l,
          n,
          xi,
          e
        ), ah(t, n);
      else if (Im(
        a,
        t,
        l,
        e,
        n
      ))
        n.stopPropagation();
      else if (ah(t, n), l & 4 && -1 < km.indexOf(t)) {
        for (; a !== null; ) {
          var u = vn(a);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var r = Xe(u.pendingLanes);
                  if (r !== 0) {
                    var s = u;
                    for (s.pendingLanes |= 2, s.entangledLanes |= 2; r; ) {
                      var g = 1 << 31 - pl(r);
                      s.entanglements[1] |= g, r &= ~g;
                    }
                    wl(u), (zt & 6) === 0 && (fi = yl() + 500, Xa(0));
                  }
                }
                break;
              case 31:
              case 13:
                s = Je(u, 2), s !== null && dl(s, u, 2), ri(), v0(u, 2);
            }
          if (u = g0(n), u === null && e0(
            t,
            l,
            n,
            xi,
            e
          ), u === a) break;
          a = u;
        }
        a !== null && n.stopPropagation();
      } else
        e0(
          t,
          l,
          n,
          null,
          e
        );
    }
  }
  function g0(t) {
    return t = Sf(t), p0(t);
  }
  var xi = null;
  function p0(t) {
    if (xi = null, t = mn(t), t !== null) {
      var l = y(t);
      if (l === null) t = null;
      else {
        var e = l.tag;
        if (e === 13) {
          if (t = v(l), t !== null) return t;
          t = null;
        } else if (e === 31) {
          if (t = m(l), t !== null) return t;
          t = null;
        } else if (e === 3) {
          if (l.stateNode.current.memoizedState.isDehydrated)
            return l.tag === 3 ? l.stateNode.containerInfo : null;
          t = null;
        } else l !== t && (t = null);
      }
    }
    return xi = t, null;
  }
  function nh(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (qd()) {
          case or:
            return 2;
          case sr:
            return 8;
          case mu:
          case Bd:
            return 32;
          case hr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var S0 = !1, Ce = null, qe = null, Be = null, Wa = /* @__PURE__ */ new Map(), Fa = /* @__PURE__ */ new Map(), Ze = [], km = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function ah(t, l) {
    switch (t) {
      case "focusin":
      case "focusout":
        Ce = null;
        break;
      case "dragenter":
      case "dragleave":
        qe = null;
        break;
      case "mouseover":
      case "mouseout":
        Be = null;
        break;
      case "pointerover":
      case "pointerout":
        Wa.delete(l.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Fa.delete(l.pointerId);
    }
  }
  function ka(t, l, e, n, a, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: l,
      domEventName: e,
      eventSystemFlags: n,
      nativeEvent: u,
      targetContainers: [a]
    }, l !== null && (l = vn(l), l !== null && lh(l)), t) : (t.eventSystemFlags |= n, l = t.targetContainers, a !== null && l.indexOf(a) === -1 && l.push(a), t);
  }
  function Im(t, l, e, n, a) {
    switch (l) {
      case "focusin":
        return Ce = ka(
          Ce,
          t,
          l,
          e,
          n,
          a
        ), !0;
      case "dragenter":
        return qe = ka(
          qe,
          t,
          l,
          e,
          n,
          a
        ), !0;
      case "mouseover":
        return Be = ka(
          Be,
          t,
          l,
          e,
          n,
          a
        ), !0;
      case "pointerover":
        var u = a.pointerId;
        return Wa.set(
          u,
          ka(
            Wa.get(u) || null,
            t,
            l,
            e,
            n,
            a
          )
        ), !0;
      case "gotpointercapture":
        return u = a.pointerId, Fa.set(
          u,
          ka(
            Fa.get(u) || null,
            t,
            l,
            e,
            n,
            a
          )
        ), !0;
    }
    return !1;
  }
  function uh(t) {
    var l = mn(t.target);
    if (l !== null) {
      var e = y(l);
      if (e !== null) {
        if (l = e.tag, l === 13) {
          if (l = v(e), l !== null) {
            t.blockedOn = l, pr(t.priority, function() {
              eh(e);
            });
            return;
          }
        } else if (l === 31) {
          if (l = m(e), l !== null) {
            t.blockedOn = l, pr(t.priority, function() {
              eh(e);
            });
            return;
          }
        } else if (l === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Ti(t) {
    if (t.blockedOn !== null) return !1;
    for (var l = t.targetContainers; 0 < l.length; ) {
      var e = g0(t.nativeEvent);
      if (e === null) {
        e = t.nativeEvent;
        var n = new e.constructor(
          e.type,
          e
        );
        pf = n, e.target.dispatchEvent(n), pf = null;
      } else
        return l = vn(e), l !== null && lh(l), t.blockedOn = e, !1;
      l.shift();
    }
    return !0;
  }
  function ih(t, l, e) {
    Ti(t) && e.delete(l);
  }
  function Pm() {
    S0 = !1, Ce !== null && Ti(Ce) && (Ce = null), qe !== null && Ti(qe) && (qe = null), Be !== null && Ti(Be) && (Be = null), Wa.forEach(ih), Fa.forEach(ih);
  }
  function _i(t, l) {
    t.blockedOn === l && (t.blockedOn = null, S0 || (S0 = !0, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      Pm
    )));
  }
  var Ni = null;
  function fh(t) {
    Ni !== t && (Ni = t, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      function() {
        Ni === t && (Ni = null);
        for (var l = 0; l < t.length; l += 3) {
          var e = t[l], n = t[l + 1], a = t[l + 2];
          if (typeof n != "function") {
            if (p0(n || e) === null)
              continue;
            break;
          }
          var u = vn(e);
          u !== null && (t.splice(l, 3), l -= 3, gc(
            u,
            {
              pending: !0,
              data: a,
              method: e.method,
              action: n
            },
            n,
            a
          ));
        }
      }
    ));
  }
  function Fn(t) {
    function l(g) {
      return _i(g, t);
    }
    Ce !== null && _i(Ce, t), qe !== null && _i(qe, t), Be !== null && _i(Be, t), Wa.forEach(l), Fa.forEach(l);
    for (var e = 0; e < Ze.length; e++) {
      var n = Ze[e];
      n.blockedOn === t && (n.blockedOn = null);
    }
    for (; 0 < Ze.length && (e = Ze[0], e.blockedOn === null); )
      uh(e), e.blockedOn === null && Ze.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (n = 0; n < e.length; n += 3) {
        var a = e[n], u = e[n + 1], r = a[fl] || null;
        if (typeof u == "function")
          r || fh(e);
        else if (r) {
          var s = null;
          if (u && u.hasAttribute("formAction")) {
            if (a = u, r = u[fl] || null)
              s = r.formAction;
            else if (p0(a) !== null) continue;
          } else s = r.action;
          typeof s == "function" ? e[n + 1] = s : (e.splice(n, 3), n -= 3), fh(e);
        }
      }
  }
  function ch() {
    function t(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(r) {
            return a = r;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function l() {
      a !== null && (a(), a = null), n || setTimeout(e, 20);
    }
    function e() {
      if (!n && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var n = !1, a = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", l), navigation.addEventListener("navigateerror", l), setTimeout(e, 100), function() {
        n = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", l), navigation.removeEventListener("navigateerror", l), a !== null && (a(), a = null);
      };
    }
  }
  function b0(t) {
    this._internalRoot = t;
  }
  Oi.prototype.render = b0.prototype.render = function(t) {
    var l = this._internalRoot;
    if (l === null) throw Error(c(409));
    var e = l.current, n = xl();
    Ps(e, n, t, l, null, null);
  }, Oi.prototype.unmount = b0.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var l = t.containerInfo;
      Ps(t.current, 2, null, t, null, null), ri(), l[dn] = null;
    }
  };
  function Oi(t) {
    this._internalRoot = t;
  }
  Oi.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var l = gr();
      t = { blockedOn: null, target: t, priority: l };
      for (var e = 0; e < Ze.length && l !== 0 && l < Ze[e].priority; e++) ;
      Ze.splice(e, 0, t), e === 0 && uh(t);
    }
  };
  var rh = f.version;
  if (rh !== "19.2.0")
    throw Error(
      c(
        527,
        rh,
        "19.2.0"
      )
    );
  G.findDOMNode = function(t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == "function" ? Error(c(188)) : (t = Object.keys(t).join(","), Error(c(268, t)));
    return t = d(l), t = t !== null ? b(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var tv = {
    bundleType: 0,
    version: "19.2.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: x,
    reconcilerVersion: "19.2.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Hi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Hi.isDisabled && Hi.supportsFiber)
      try {
        ia = Hi.inject(
          tv
        ), gl = Hi;
      } catch {
      }
  }
  return Pa.createRoot = function(t, l) {
    if (!h(t)) throw Error(c(299));
    var e = !1, n = "", a = y1, u = g1, r = p1;
    return l != null && (l.unstable_strictMode === !0 && (e = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (a = l.onUncaughtError), l.onCaughtError !== void 0 && (u = l.onCaughtError), l.onRecoverableError !== void 0 && (r = l.onRecoverableError)), l = ks(
      t,
      1,
      !1,
      null,
      null,
      e,
      n,
      null,
      a,
      u,
      r,
      ch
    ), t[dn] = l.current, l0(t), new b0(l);
  }, Pa.hydrateRoot = function(t, l, e) {
    if (!h(t)) throw Error(c(299));
    var n = !1, a = "", u = y1, r = g1, s = p1, g = null;
    return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (a = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (r = e.onCaughtError), e.onRecoverableError !== void 0 && (s = e.onRecoverableError), e.formState !== void 0 && (g = e.formState)), l = ks(
      t,
      1,
      !0,
      l,
      e ?? null,
      n,
      a,
      g,
      u,
      r,
      s,
      ch
    ), l.context = Is(null), e = l.current, n = xl(), n = of(n), a = Me(n), a.callback = null, ze(e, a, n), e = n, l.current.lanes = e, ca(l, e), wl(l), t[dn] = l.current, l0(t), new Oi(l);
  }, Pa.version = "19.2.0", Pa;
}
var Ph;
function dg() {
  if (Ph) return O0.exports;
  Ph = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (f) {
        console.error(f);
      }
  }
  return i(), O0.exports = hg(), O0.exports;
}
var mg = dg();
const Le = { transport: { name: "Add community transport", short: "Transport scenario", factor: 0.77, coverage: 1.65, detail: "Two additional weekday routes connect selected communities to existing service locations." }, capacity: { name: "Extend service hours", short: "Capacity scenario", factor: 0.86, coverage: 1.22, detail: "Evening appointments add capacity at existing service locations." }, mobile: { name: "Deploy a mobile care team", short: "Mobile care scenario", factor: 0.68, coverage: 2.05, detail: "A mobile team adds recurring visits in areas beyond the existing service footprint." } }, I0 = ["Transportation", "Service capacity", "Digital access"], Dd = (i, f = 0) => 36 + (Number(i) * 7 + f * 19) % 58, td = () => /* @__PURE__ */ j.jsx(ng, { size: 23, "aria-hidden": "true" });
function Ud({ zip: i, scenario: f, horizon: o = 6 }) {
  const c = 105 + Number(i) % 35, h = Math.round(c * (1 + 0.32 * o / 6)), y = Math.round(c * (1 + (Le[f].factor - 1) * o / 6)), v = lf().domain([-6, o]).range([48, 380]), m = lf().domain([0, 220]).range([218, 38]), S = (d) => d.map((b, p) => `${p ? "L" : "M"}${v(b[0])},${m(b[1])}`).join(" ");
  return /* @__PURE__ */ j.jsxs("div", { className: "chart", children: [
    /* @__PURE__ */ j.jsx("h3", { children: "Forecast unmet demand" }),
    /* @__PURE__ */ j.jsxs("svg", { viewBox: "0 0 414 250", role: "img", "aria-label": `Illustrative demand index for ${i}: current plan ${h}; ${Le[f].short} ${y} at ${o} months.`, children: [
      [0, 50, 100, 150, 200].map((d) => /* @__PURE__ */ j.jsxs("g", { children: [
        /* @__PURE__ */ j.jsx("line", { x1: "48", x2: "380", y1: m(d), y2: m(d), stroke: "#e1e8ee" }),
        /* @__PURE__ */ j.jsx("text", { x: "35", y: m(d) + 4, textAnchor: "end", children: d })
      ] }, d)),
      /* @__PURE__ */ j.jsx("text", { x: (48 + v(0)) / 2, y: "17", textAnchor: "middle", children: "Observed" }),
      /* @__PURE__ */ j.jsx("text", { x: (380 + v(0)) / 2, y: "17", textAnchor: "middle", children: "Forecast" }),
      /* @__PURE__ */ j.jsx("line", { x1: v(0), x2: v(0), y1: "30", y2: "218", stroke: "#a8b8cb", strokeDasharray: "5 5" }),
      /* @__PURE__ */ j.jsx("path", { d: S([[-6, c * 0.74], [-3, c * 0.88], [0, c]]), fill: "none", stroke: "var(--blue)", strokeWidth: "2.5" }),
      /* @__PURE__ */ j.jsx("path", { d: S([[0, c], [o, h]]), fill: "none", stroke: "var(--blue)", strokeWidth: "2.5", strokeDasharray: "7 5" }),
      /* @__PURE__ */ j.jsx("path", { d: S([[0, c], [o, y]]), fill: "none", stroke: "var(--teal)", strokeWidth: "2.5", strokeDasharray: "7 5" }),
      [[-6, c * 0.74, "var(--blue)"], [0, c, "var(--blue)"], [o, h, "var(--blue)"], [o, y, "var(--teal)"]].map(([d, b, p], z) => /* @__PURE__ */ j.jsx("circle", { cx: v(d), cy: m(b), r: "4.5", fill: p }, z)),
      /* @__PURE__ */ j.jsx("text", { x: "48", y: "240", children: "-6 months" }),
      /* @__PURE__ */ j.jsx("text", { x: v(0), y: "240", textAnchor: "middle", children: "Now" }),
      /* @__PURE__ */ j.jsxs("text", { x: "380", y: "240", textAnchor: "end", children: [
        "+",
        o,
        " months"
      ] }),
      /* @__PURE__ */ j.jsx("text", { transform: "translate(12,155) rotate(-90)", textAnchor: "middle", children: "Demand index" })
    ] }),
    /* @__PURE__ */ j.jsxs("div", { className: "chart-legend", children: [
      /* @__PURE__ */ j.jsxs("span", { children: [
        /* @__PURE__ */ j.jsx("i", {}),
        "Current plan"
      ] }),
      /* @__PURE__ */ j.jsxs("span", { children: [
        /* @__PURE__ */ j.jsx("i", { className: "teal" }),
        Le[f].short
      ] })
    ] }),
    /* @__PURE__ */ j.jsx("small", { children: "Illustrative forecast · index, not a count of people" })
  ] });
}
function vg({ data: i, zip: f, setZip: o, layer: c, barrier: h, scenario: y, compact: v = !1 }) {
  const [m, S] = O.useState(1.85), { path: d, projection: b } = O.useMemo(() => {
    const C = ly();
    return i && C.fitExtent([[18, 20], [882, 442]], i), { projection: C, path: Vv(C) };
  }, [i]), p = lf().domain([30, 65, 100]).range(["#e4f0fc", "#9bc3ee", "#396cd2"]), z = i == null ? void 0 : i.features.find((C) => C.properties.ZCTA5CE10 === f), Z = z ? [+z.properties.INTPTLON10, +z.properties.INTPTLAT10] : [-73.82, 42.72], Y = (i == null ? void 0 : i.features.filter((C, L) => L % 5 === 0).map((C) => [+C.properties.INTPTLON10, +C.properties.INTPTLAT10])) || [];
  return /* @__PURE__ */ j.jsxs("div", { className: "map-shell " + (v ? "compact" : ""), children: [
    /* @__PURE__ */ j.jsxs("div", { className: "map-tools", children: [
      /* @__PURE__ */ j.jsxs("label", { className: "map-location", children: [
        /* @__PURE__ */ j.jsx("span", { className: "sr-only", children: "Map ZIP area" }),
        /* @__PURE__ */ j.jsx("select", { "aria-label": "Map ZIP area", value: f, onChange: (C) => o(C.target.value), children: i == null ? void 0 : i.features.map((C) => C.properties.ZCTA5CE10).sort().map((C) => /* @__PURE__ */ j.jsxs("option", { value: C, children: [
          "ZIP area ",
          C
        ] }, C)) })
      ] }),
      /* @__PURE__ */ j.jsxs("div", { children: [
        /* @__PURE__ */ j.jsx("button", { "aria-label": "Zoom in", disabled: m >= 3.2, onClick: () => S(Math.min(3.2, m + 0.3)), children: /* @__PURE__ */ j.jsx(ig, {}) }),
        /* @__PURE__ */ j.jsx("button", { "aria-label": "Zoom out", disabled: m <= 1, onClick: () => S(Math.max(1, m - 0.3)), children: /* @__PURE__ */ j.jsx(ug, {}) }),
        /* @__PURE__ */ j.jsx("button", { "aria-label": "Reset map zoom", onClick: () => S(1.85), children: /* @__PURE__ */ j.jsx(eg, {}) })
      ] })
    ] }),
    i ? /* @__PURE__ */ j.jsx("svg", { className: "map", viewBox: "0 0 900 470", "aria-label": "Interactive ZIP tabulation area map", children: /* @__PURE__ */ j.jsxs("g", { transform: `translate(${450 * (1 - m)},${235 * (1 - m)}) scale(${m})`, children: [
      i.features.map((C) => {
        const L = C.properties.ZCTA5CE10, k = Dd(L, h);
        return /* @__PURE__ */ j.jsx("path", { d: d(C), fill: L === f ? "#214fcc" : p(c === "Forecast" ? Math.min(100, k + 12) : k), stroke: L === f ? "#132b42" : "#fff", strokeWidth: L === f ? 2 : 1, tabIndex: L === f ? 0 : -1, role: "button", "aria-label": `Select ZIP area ${L}`, "aria-pressed": L === f, onClick: () => o(L), onKeyDown: (w) => {
          (w.key === "Enter" || w.key === " ") && (w.preventDefault(), o(L));
        }, children: /* @__PURE__ */ j.jsxs("title", { children: [
          "ZIP area ",
          L,
          " · illustrative ",
          I0[h].toLowerCase(),
          " index ",
          k
        ] }) }, L);
      }),
      c === "Resource planning" && Y.map((C, L) => /* @__PURE__ */ j.jsx("path", { d: d(Av().center(C).radius(0.025 * Le[y].coverage)()), fill: "#23616b", fillOpacity: ".09", stroke: "#23616b", strokeWidth: "1.3", strokeDasharray: "5 4", pointerEvents: "none" }, "c" + L)),
      Y.map((C, L) => /* @__PURE__ */ j.jsx("circle", { cx: b(C)[0], cy: b(C)[1], r: "5", fill: "#23616b", stroke: "white", strokeWidth: "1.5", pointerEvents: "none" }, L)),
      z && /* @__PURE__ */ j.jsxs("g", { pointerEvents: "none", transform: `translate(${b(Z)[0]},${b(Z)[1]})`, children: [
        /* @__PURE__ */ j.jsx("circle", { r: "6", fill: "#132b42", stroke: "white", strokeWidth: "2" }),
        /* @__PURE__ */ j.jsx("rect", { x: "-59", y: "-39", width: "118", height: "26", fill: "#214fcc" }),
        /* @__PURE__ */ j.jsxs("text", { x: "0", y: "-21", textAnchor: "middle", fill: "white", fontSize: "13", children: [
          "ZIP area ",
          f
        ] })
      ] })
    ] }) }) : /* @__PURE__ */ j.jsx("p", { className: "map-loading", children: "Loading geographic boundaries…" }),
    /* @__PURE__ */ j.jsxs("div", { className: "map-legend", children: [
      /* @__PURE__ */ j.jsxs("span", { children: [
        /* @__PURE__ */ j.jsx("i", { className: "high" }),
        "Higher barriers"
      ] }),
      /* @__PURE__ */ j.jsxs("span", { children: [
        /* @__PURE__ */ j.jsx("i", { className: "low" }),
        "Lower barriers"
      ] }),
      /* @__PURE__ */ j.jsxs("span", { children: [
        /* @__PURE__ */ j.jsx("i", { className: "point" }),
        "Sample service location"
      ] }),
      c === "Resource planning" && /* @__PURE__ */ j.jsxs("span", { children: [
        /* @__PURE__ */ j.jsx("i", { className: "coverage" }),
        "Scenario coverage"
      ] })
    ] }),
    /* @__PURE__ */ j.jsx("div", { className: "map-caption", children: "Illustrative planning scenario" })
  ] });
}
function yg({ data: i, compact: f = !1, onExplore: o, onReview: c }) {
  const [h, y] = O.useState("12205"), [v, m] = O.useState(f ? "Barriers" : "Resource planning"), [S, d] = O.useState("transport"), [b, p] = O.useState(0), [z, Z] = O.useState(6), Y = (i == null ? void 0 : i.features.map((C) => C.properties.ZCTA5CE10).sort()) || ["12205"];
  return /* @__PURE__ */ j.jsxs("div", { "data-layer": v, className: "workspace " + (f ? "workspace-compact" : ""), id: f ? void 0 : "planning", children: [
    /* @__PURE__ */ j.jsxs("div", { className: "geo-panel", children: [
      /* @__PURE__ */ j.jsxs("div", { className: "workspace-toolbar", children: [
        !f && /* @__PURE__ */ j.jsx("strong", { children: "Access planning" }),
        /* @__PURE__ */ j.jsx("div", { className: "tabs", role: "tablist", "aria-label": "Map view", children: ["Barriers", "Forecast", "Resource planning"].map((C) => /* @__PURE__ */ j.jsx("button", { onKeyDown: (L) => {
          if (L.key === "ArrowRight" || L.key === "ArrowLeft") {
            L.preventDefault();
            const k = Array.from(L.currentTarget.parentElement.children), w = k.indexOf(L.currentTarget), F = k[(w + (L.key === "ArrowRight" ? 1 : k.length - 1)) % k.length];
            F.focus(), F.click();
          }
        }, role: "tab", "aria-selected": v === C, onClick: () => m(C), children: C }, C)) })
      ] }),
      /* @__PURE__ */ j.jsx(vg, { data: i, zip: h, setZip: y, layer: v, barrier: b, scenario: S, compact: f }),
      !f && /* @__PURE__ */ j.jsxs("div", { className: "map-filters", children: [
        /* @__PURE__ */ j.jsxs("label", { children: [
          "ZIP area",
          /* @__PURE__ */ j.jsx("select", { "aria-label": "ZIP area", value: h, onChange: (C) => y(C.target.value), children: Y.map((C) => /* @__PURE__ */ j.jsx("option", { children: C }, C)) })
        ] }),
        /* @__PURE__ */ j.jsxs("label", { children: [
          "Barrier",
          /* @__PURE__ */ j.jsx("select", { "aria-label": "Barrier", value: b, onChange: (C) => p(+C.target.value), children: I0.map((C, L) => /* @__PURE__ */ j.jsx("option", { value: L, children: C }, C)) })
        ] }),
        /* @__PURE__ */ j.jsxs("p", { "aria-live": "polite", children: [
          /* @__PURE__ */ j.jsx("strong", { children: Dd(h, b) }),
          " / 100",
          /* @__PURE__ */ j.jsx("br", {}),
          /* @__PURE__ */ j.jsx("small", { children: "Illustrative barrier index" })
        ] })
      ] })
    ] }),
    !f && /* @__PURE__ */ j.jsxs("aside", { className: "response-panel", children: [
      /* @__PURE__ */ j.jsx("h2", { children: v === "Barriers" ? "Understand the barriers" : v === "Forecast" ? "Look ahead" : "Compare the response" }),
      /* @__PURE__ */ j.jsx("label", { className: "sr-only", htmlFor: "scenario", children: "Planning scenario" }),
      /* @__PURE__ */ j.jsx("select", { id: "scenario", value: S, onChange: (C) => d(C.target.value), children: Object.entries(Le).map(([C, L]) => /* @__PURE__ */ j.jsx("option", { value: C, children: L.name }, C)) }),
      /* @__PURE__ */ j.jsx(Ud, { zip: h, scenario: S, horizon: z }),
      /* @__PURE__ */ j.jsx("p", { children: "Compare service reach, capacity and funding before committing resources." }),
      /* @__PURE__ */ j.jsxs("button", { className: "text-link", onClick: () => c({ zip: h, scenario: S, horizon: z, barrier: b }), children: [
        "Review scenario ",
        /* @__PURE__ */ j.jsx(td, {})
      ] }),
      v === "Forecast" && /* @__PURE__ */ j.jsxs("label", { className: "horizon", children: [
        "Forecast horizon: ",
        z,
        " months",
        /* @__PURE__ */ j.jsx("input", { type: "range", min: "3", max: "12", step: "3", value: z, onChange: (C) => Z(+C.target.value) })
      ] }),
      v === "Barriers" && /* @__PURE__ */ j.jsxs("p", { className: "context-note", children: [
        "Explore ",
        I0[b].toLowerCase(),
        " across neighboring areas. Select a ZIP area on the map or in the list to update the comparison."
      ] })
    ] }),
    f && v === "Forecast" && /* @__PURE__ */ j.jsxs("div", { className: "compact-result", children: [
      /* @__PURE__ */ j.jsx("strong", { children: "From visibility to foresight." }),
      /* @__PURE__ */ j.jsx("span", { children: "Compare future demand under different service plans." }),
      /* @__PURE__ */ j.jsxs("button", { className: "text-link", onClick: o, children: [
        "Open forecast ",
        /* @__PURE__ */ j.jsx(td, {})
      ] })
    ] })
  ] });
}
function gg({ modal: i, close: f }) {
  const o = O.useRef(null), [c, h] = O.useState(!1), y = i.details;
  O.useEffect(() => {
    const m = document.activeElement;
    return o.current.showModal(), () => m == null ? void 0 : m.focus();
  }, []);
  const v = () => h(!0);
  return /* @__PURE__ */ j.jsxs("dialog", { "aria-label": "Scenario review", ref: o, onCancel: f, onClick: (m) => {
    m.target === o.current && f();
  }, children: [
    /* @__PURE__ */ j.jsx("button", { className: "close", onClick: f, "aria-label": "Close dialog", children: /* @__PURE__ */ j.jsx(fg, { size: 25 }) }),
    /* @__PURE__ */ j.jsxs(j.Fragment, { children: [
      /* @__PURE__ */ j.jsxs("p", { className: "eyebrow", children: [
        "ILLUSTRATIVE SCENARIO · ZIP AREA ",
        y.zip
      ] }),
      /* @__PURE__ */ j.jsx("h2", { children: Le[y.scenario].name }),
      /* @__PURE__ */ j.jsx("p", { children: Le[y.scenario].detail }),
      /* @__PURE__ */ j.jsx(Ud, { zip: y.zip, scenario: y.scenario, horizon: y.horizon }),
      /* @__PURE__ */ j.jsx("h3", { children: "Planning assumptions" }),
      /* @__PURE__ */ j.jsxs("ul", { children: [
        /* @__PURE__ */ j.jsx("li", { children: "Existing locations remain open." }),
        /* @__PURE__ */ j.jsx("li", { children: "Demand and service capacity are synthetic demonstration inputs." }),
        /* @__PURE__ */ j.jsx("li", { children: "Coverage circles illustrate reach; they are not road-network travel-time estimates." })
      ] }),
      /* @__PURE__ */ j.jsx("p", { children: "Use the comparison to frame a service plan, funding discussion or CHIP priority. Production forecasts require local data, validation and human review." }),
      /* @__PURE__ */ j.jsxs("button", { className: "primary", onClick: v, children: [
        "Export scenario ",
        /* @__PURE__ */ j.jsx(ag, { size: 20 })
      ] }),
      c && /* @__PURE__ */ j.jsxs("label", { className: "export-label", children: [
        "Scenario export — select and copy",
        /* @__PURE__ */ j.jsx("textarea", { "aria-label": "Scenario export", readOnly: !0, rows: "9", value: JSON.stringify({ status: "Illustrative scenario; not a validated forecast", ...y, assumption: Le[y.scenario].detail }, null, 2) })
      ] })
    ] })
  ] });
}
function pg({ compact: i }) {
  const [f, o] = O.useState(null), [c, h] = O.useState(!1), [y, v] = O.useState(null);
  return O.useEffect(() => {
    fetch(new URL(
      /* @vite-ignore */
      "capital-region-zcta.json",
      import.meta.url
    )).then((m) => {
      if (!m.ok) throw Error("Geography unavailable");
      return m.json();
    }).then(o).catch(() => h(!0));
  }, []), /* @__PURE__ */ j.jsxs(j.Fragment, { children: [
    c ? /* @__PURE__ */ j.jsxs("p", { role: "alert", children: [
      "The interactive map could not load. ",
      /* @__PURE__ */ j.jsx("a", { href: "/cb-cap/request-demo", children: "Discuss your planning needs with us." })
    ] }) : /* @__PURE__ */ j.jsx(yg, { data: f, compact: i, onExplore: () => {
      location.href = "/cb-cap";
    }, onReview: (m) => v({ type: "scenario", details: m }) }),
    y && /* @__PURE__ */ j.jsx(gg, { modal: y, close: () => v(null) })
  ] });
}
for (const i of document.querySelectorAll("[data-planning-root]")) mg.createRoot(i).render(/* @__PURE__ */ j.jsx(pg, { compact: i.hasAttribute("data-compact") }));
