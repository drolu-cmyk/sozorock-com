var A0 = { exports: {} }, Ia = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sh;
function ev() {
  if (sh) return Ia;
  sh = 1;
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
var hh;
function nv() {
  return hh || (hh = 1, A0.exports = ev()), A0.exports;
}
var O = nv(), x0 = { exports: {} }, rt = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dh;
function av() {
  if (dh) return rt;
  dh = 1;
  var i = Symbol.for("react.transitional.element"), f = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), h = Symbol.for("react.profiler"), y = Symbol.for("react.consumer"), v = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), d = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), p = Symbol.for("react.activity"), M = Symbol.iterator;
  function Z(E) {
    return E === null || typeof E != "object" ? null : (E = M && E[M] || E["@@iterator"], typeof E == "function" ? E : null);
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
  function F(E, U, X) {
    this.props = E, this.context = U, this.refs = L, this.updater = X || Y;
  }
  F.prototype.isReactComponent = {}, F.prototype.setState = function(E, U) {
    if (typeof E != "object" && typeof E != "function" && E != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, E, U, "setState");
  }, F.prototype.forceUpdate = function(E) {
    this.updater.enqueueForceUpdate(this, E, "forceUpdate");
  };
  function K() {
  }
  K.prototype = F.prototype;
  function k(E, U, X) {
    this.props = E, this.context = U, this.refs = L, this.updater = X || Y;
  }
  var V = k.prototype = new K();
  V.constructor = k, C(V, F.prototype), V.isPureReactComponent = !0;
  var et = Array.isArray;
  function J() {
  }
  var $ = { H: null, A: null, T: null, S: null }, it = Object.prototype.hasOwnProperty;
  function ct(E, U, X) {
    var w = X.ref;
    return {
      $$typeof: i,
      type: E,
      key: U,
      ref: w !== void 0 ? w : null,
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
  function z(E, U, X, w, ut) {
    var mt = typeof E;
    (mt === "undefined" || mt === "boolean") && (E = null);
    var zt = !1;
    if (E === null) zt = !0;
    else
      switch (mt) {
        case "bigint":
        case "string":
        case "number":
          zt = !0;
          break;
        case "object":
          switch (E.$$typeof) {
            case i:
            case f:
              zt = !0;
              break;
            case b:
              return zt = E._init, z(
                zt(E._payload),
                U,
                X,
                w,
                ut
              );
          }
      }
    if (zt)
      return ut = ut(E), zt = w === "" ? "." + at(E, 0) : w, et(ut) ? (X = "", zt != null && (X = zt.replace(dt, "$&/") + "/"), z(ut, U, X, "", function(ua) {
        return ua;
      })) : ut != null && (tt(ut) && (ut = Et(
        ut,
        X + (ut.key == null || E && E.key === ut.key ? "" : ("" + ut.key).replace(
          dt,
          "$&/"
        ) + "/") + zt
      )), U.push(ut)), 1;
    zt = 0;
    var al = w === "" ? "." : w + ":";
    if (et(E))
      for (var Lt = 0; Lt < E.length; Lt++)
        w = E[Lt], mt = al + at(w, Lt), zt += z(
          w,
          U,
          X,
          mt,
          ut
        );
    else if (Lt = Z(E), typeof Lt == "function")
      for (E = Lt.call(E), Lt = 0; !(w = E.next()).done; )
        w = w.value, mt = al + at(w, Lt++), zt += z(
          w,
          U,
          X,
          mt,
          ut
        );
    else if (mt === "object") {
      if (typeof E.then == "function")
        return z(
          B(E),
          U,
          X,
          w,
          ut
        );
      throw U = String(E), Error(
        "Objects are not valid as a React child (found: " + (U === "[object Object]" ? "object with keys {" + Object.keys(E).join(", ") + "}" : U) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return zt;
  }
  function G(E, U, X) {
    if (E == null) return E;
    var w = [], ut = 0;
    return z(E, w, "", "", function(mt) {
      return U.call(X, mt, ut++);
    }), w;
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
  return rt.Activity = p, rt.Children = ot, rt.Component = F, rt.Fragment = o, rt.Profiler = h, rt.PureComponent = k, rt.StrictMode = c, rt.Suspense = S, rt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = $, rt.__COMPILER_RUNTIME = {
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
    var w = C({}, E.props), ut = E.key;
    if (U != null)
      for (mt in U.key !== void 0 && (ut = "" + U.key), U)
        !it.call(U, mt) || mt === "key" || mt === "__self" || mt === "__source" || mt === "ref" && U.ref === void 0 || (w[mt] = U[mt]);
    var mt = arguments.length - 2;
    if (mt === 1) w.children = X;
    else if (1 < mt) {
      for (var zt = Array(mt), al = 0; al < mt; al++)
        zt[al] = arguments[al + 2];
      w.children = zt;
    }
    return ct(E.type, ut, w);
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
    var w, ut = {}, mt = null;
    if (U != null)
      for (w in U.key !== void 0 && (mt = "" + U.key), U)
        it.call(U, w) && w !== "key" && w !== "__self" && w !== "__source" && (ut[w] = U[w]);
    var zt = arguments.length - 2;
    if (zt === 1) ut.children = X;
    else if (1 < zt) {
      for (var al = Array(zt), Lt = 0; Lt < zt; Lt++)
        al[Lt] = arguments[Lt + 2];
      ut.children = al;
    }
    if (E && E.defaultProps)
      for (w in zt = E.defaultProps, zt)
        ut[w] === void 0 && (ut[w] = zt[w]);
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
      var w = E(), ut = $.S;
      ut !== null && ut(X, w), typeof w == "object" && w !== null && typeof w.then == "function" && w.then(J, ft);
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
var mh;
function tr() {
  return mh || (mh = 1, x0.exports = av()), x0.exports;
}
var H = tr();
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
function j0(i, f, o) {
  return f = +f, i = +i, o = +o, Li(i, f, o)[2];
}
function mv(i, f, o) {
  f = +f, i = +i, o = +o;
  const c = f < i, h = c ? j0(f, i, o) : j0(i, f, o);
  return (c ? -1 : 1) * (h < 0 ? 1 / -h : h);
}
function* vv(i) {
  for (const f of i)
    yield* f;
}
function ed(i) {
  return Array.from(vv(i));
}
var Rt = 1e-6, bt = Math.PI, ml = bt / 2, vh = bt / 4, Tl = bt * 2, il = 180 / bt, qt = bt / 180, Bt = Math.abs, nd = Math.atan, uu = Math.atan2, Vt = Math.cos, yv = Math.exp, gv = Math.log, Qt = Math.sin, pv = Math.sign || function(i) {
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
  i && gh.hasOwnProperty(i.type) && gh[i.type](i, f);
}
var yh = {
  Feature: function(i, f) {
    Gi(i.geometry, f);
  },
  FeatureCollection: function(i, f) {
    for (var o = i.features, c = -1, h = o.length; ++c < h; ) Gi(o[c].geometry, f);
  }
}, gh = {
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
    C0(i.coordinates, f, 0);
  },
  MultiLineString: function(i, f) {
    for (var o = i.coordinates, c = -1, h = o.length; ++c < h; ) C0(o[c], f, 0);
  },
  Polygon: function(i, f) {
    ph(i.coordinates, f);
  },
  MultiPolygon: function(i, f) {
    for (var o = i.coordinates, c = -1, h = o.length; ++c < h; ) ph(o[c], f);
  },
  GeometryCollection: function(i, f) {
    for (var o = i.geometries, c = -1, h = o.length; ++c < h; ) Gi(o[c], f);
  }
};
function C0(i, f, o) {
  var c = -1, h = i.length - o, y;
  for (f.lineStart(); ++c < h; ) y = i[c], f.point(y[0], y[1], y[2]);
  f.lineEnd();
}
function ph(i, f) {
  var o = -1, c = i.length;
  for (f.polygonStart(); ++o < c; ) C0(i[o], f, 1);
  f.polygonEnd();
}
function In(i, f) {
  i && yh.hasOwnProperty(i.type) ? yh[i.type](i, f) : Gi(i, f);
}
function q0(i) {
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
function Ri(i, f) {
  return [i[0] * f, i[1] * f, i[2] * f];
}
function B0(i) {
  var f = sn(i[0] * i[0] + i[1] * i[1] + i[2] * i[2]);
  i[0] /= f, i[1] /= f, i[2] /= f;
}
function Fn(i) {
  return function() {
    return i;
  };
}
function Z0(i, f) {
  function o(c, h) {
    return c = i(c, h), f(c[0], c[1]);
  }
  return i.invert && f.invert && (o.invert = function(c, h) {
    return c = f.invert(c, h), c && i.invert(c[0], c[1]);
  }), o;
}
function Y0(i, f) {
  return Bt(i) > bt && (i -= Math.round(i / Tl) * Tl), [i, f];
}
Y0.invert = Y0;
function lr(i, f, o) {
  return (i %= Tl) ? f || o ? Z0(bh(i), Eh(f, o)) : bh(i) : f || o ? Eh(f, o) : Y0;
}
function Sh(i) {
  return function(f, o) {
    return f += i, Bt(f) > bt && (f -= Math.round(f / Tl) * Tl), [f, o];
  };
}
function bh(i) {
  var f = Sh(i);
  return f.invert = Sh(-i), f;
}
function Eh(i, f) {
  var o = Vt(i), c = Qt(i), h = Vt(f), y = Qt(f);
  function v(m, S) {
    var d = Vt(S), b = Vt(m) * d, p = Qt(m) * d, M = Qt(S), Z = M * o + b * c;
    return [
      uu(p * h - Z * y, b * o - M * c),
      iu(Z * h + p * y)
    ];
  }
  return v.invert = function(m, S) {
    var d = Vt(S), b = Vt(m) * d, p = Qt(m) * d, M = Qt(S), Z = M * h - p * y;
    return [
      uu(p * h + M * y, b * o + Z * c),
      iu(Z * o - b * c)
    ];
  }, v;
}
function Ev(i) {
  i = lr(i[0] * qt, i[1] * qt, i.length > 2 ? i[2] * qt : 0);
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
    h == null ? (h = f + c * Tl, y = f - S / 2) : (h = Ah(v, h), y = Ah(v, y), (c > 0 ? h < y : h > y) && (h += c * Tl));
    for (var d, b = h; c > 0 ? b > y : b < y; b -= S)
      d = q0([v, -m * Vt(b), -m * Qt(b)]), i.point(d[0], d[1]);
  }
}
function Ah(i, f) {
  f = ea(f), f[0] -= i, B0(f);
  var o = bv(-f[1]);
  return ((-f[2] < 0 ? -o : o) + Tl - Rt) % Tl;
}
function Av() {
  var i = Fn([0, 0]), f = Fn(90), o = Fn(2), c, h, y = { point: v };
  function v(S, d) {
    c.push(S = h(S, d)), S[0] *= il, S[1] *= il;
  }
  function m() {
    var S = i.apply(this, arguments), d = f.apply(this, arguments) * qt, b = o.apply(this, arguments) * qt;
    return c = [], h = lr(-S[0] * qt, -S[1] * qt, 0).invert, ad(y, d, b, 1), S = { type: "Polygon", coordinates: [c] }, c = h = null, S;
  }
  return m.center = function(S) {
    return arguments.length ? (i = typeof S == "function" ? S : Fn([+S[0], +S[1]]), m) : i;
  }, m.radius = function(S) {
    return arguments.length ? (f = typeof S == "function" ? S : Fn(+S), m) : f;
  }, m.precision = function(S) {
    return arguments.length ? (o = typeof S == "function" ? S : Fn(+S), m) : o;
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
  return Bt(i[0] - f[0]) < Rt && Bt(i[1] - f[1]) < Rt;
}
function Ui(i, f, o, c) {
  this.x = i, this.z = f, this.o = o, this.e = c, this.v = !1, this.n = this.p = null;
}
function id(i, f, o, c, h) {
  var y = [], v = [], m, S;
  if (i.forEach(function(Y) {
    if (!((C = Y.length - 1) <= 0)) {
      var C, L = Y[0], F = Y[C], K;
      if (Yi(L, F)) {
        if (!L[2] && !F[2]) {
          for (h.lineStart(), m = 0; m < C; ++m) h.point((L = Y[m])[0], L[1]);
          h.lineEnd();
          return;
        }
        F[0] += 2 * Rt;
      }
      y.push(K = new Ui(L, Y, null, !0)), v.push(K.o = new Ui(L, null, K, !1)), y.push(K = new Ui(F, Y, null, !1)), v.push(K.o = new Ui(F, null, K, !0));
    }
  }), !!y.length) {
    for (v.sort(f), xh(y), xh(v), m = 0, S = v.length; m < S; ++m)
      v[m].e = o = !o;
    for (var d = y[0], b, p; ; ) {
      for (var M = d, Z = !0; M.v; ) if ((M = M.n) === d) return;
      b = M.z, h.lineStart();
      do {
        if (M.v = M.o.v = !0, M.e) {
          if (Z)
            for (m = 0, S = b.length; m < S; ++m) h.point((p = b[m])[0], p[1]);
          else
            c(M.x, M.n.x, 1, h);
          M = M.n;
        } else {
          if (Z)
            for (b = M.p.z, m = b.length - 1; m >= 0; --m) h.point((p = b[m])[0], p[1]);
          else
            c(M.x, M.p.x, -1, h);
          M = M.p;
        }
        M = M.o, b = M.z, Z = !Z;
      } while (!M.v);
      h.lineEnd();
    }
  }
}
function xh(i) {
  if (f = i.length) {
    for (var f, o = 0, c = i[0], h; ++o < f; )
      c.n = h = i[o], h.p = c, c = h;
    c.n = h = i[0], h.p = c;
  }
}
function z0(i) {
  return Bt(i[0]) <= bt ? i[0] : pv(i[0]) * ((Bt(i[0]) + bt) % Tl - bt);
}
function xv(i, f) {
  var o = z0(f), c = f[1], h = Qt(c), y = [Qt(o), -Vt(o), 0], v = 0, m = 0, S = new rn();
  h === 1 ? c = ml + Rt : h === -1 && (c = -ml - Rt);
  for (var d = 0, b = i.length; d < b; ++d)
    if (M = (p = i[d]).length)
      for (var p, M, Z = p[M - 1], Y = z0(Z), C = Z[1] / 2 + vh, L = Qt(C), F = Vt(C), K = 0; K < M; ++K, Y = V, L = J, F = $, Z = k) {
        var k = p[K], V = z0(k), et = k[1] / 2 + vh, J = Qt(et), $ = Vt(et), it = V - Y, ct = it >= 0 ? 1 : -1, Et = ct * it, tt = Et > bt, I = L * J;
        if (S.add(uu(I * ct * Qt(Et), F * $ + I * Vt(Et))), v += tt ? it + ct * Tl : it, tt ^ Y >= o ^ V >= o) {
          var dt = Xi(ea(Z), ea(k));
          B0(dt);
          var at = Xi(y, dt);
          B0(at);
          var B = (tt ^ it >= 0 ? -1 : 1) * iu(at[2]);
          (c > B || c === B && (dt[0] || dt[1])) && (m += tt ^ it >= 0 ? 1 : -1);
        }
      }
  return (v < -Rt || v < Rt && S < -1e-12) ^ m & 1;
}
function fd(i, f, o, c) {
  return function(h) {
    var y = f(h), v = ud(), m = f(v), S = !1, d, b, p, M = {
      point: Z,
      lineStart: C,
      lineEnd: L,
      polygonStart: function() {
        M.point = F, M.lineStart = K, M.lineEnd = k, b = [], d = [];
      },
      polygonEnd: function() {
        M.point = Z, M.lineStart = C, M.lineEnd = L, b = ed(b);
        var V = xv(d, c);
        b.length ? (S || (h.polygonStart(), S = !0), id(b, zv, V, o, h)) : V && (S || (h.polygonStart(), S = !0), h.lineStart(), o(null, null, 1, h), h.lineEnd()), S && (h.polygonEnd(), S = !1), b = d = null;
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
      M.point = Y, y.lineStart();
    }
    function L() {
      M.point = Z, y.lineEnd();
    }
    function F(V, et) {
      p.push([V, et]), m.point(V, et);
    }
    function K() {
      m.lineStart(), p = [];
    }
    function k() {
      F(p[0][0], p[0][1]), m.lineEnd();
      var V = m.clean(), et = v.result(), J, $ = et.length, it, ct, Et;
      if (p.pop(), d.push(p), p = null, !!$) {
        if (V & 1) {
          if (ct = et[0], (it = ct.length - 1) > 0) {
            for (S || (h.polygonStart(), S = !0), h.lineStart(), J = 0; J < it; ++J) h.point((Et = ct[J])[0], Et[1]);
            h.lineEnd();
          }
          return;
        }
        $ > 1 && V & 2 && et.push(et.pop().concat(et.shift())), b.push(et.filter(Mv));
      }
    }
    return M;
  };
}
function Mv(i) {
  return i.length > 1;
}
function zv(i, f) {
  return ((i = i.x)[0] < 0 ? i[1] - ml - Rt : ml - i[1]) - ((f = f.x)[0] < 0 ? f[1] - ml - Rt : ml - f[1]);
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
      Bt(S - bt) < Rt ? (i.point(f, o = (o + v) / 2 > 0 ? ml : -ml), i.point(c, o), i.lineEnd(), i.lineStart(), i.point(m, o), i.point(y, o), h = 0) : c !== m && S >= bt && (Bt(f - c) < Rt && (f -= c * Rt), Bt(y - m) < Rt && (y -= m * Rt), o = _v(f, o, y, v), i.point(c, o), i.lineEnd(), i.lineStart(), i.point(m, o), h = 0), i.point(f = y, o = v), c = m;
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
  return Bt(v) > Rt ? nd((Qt(f) * (y = Vt(c)) * Qt(o) - Qt(c) * (h = Vt(f)) * Qt(i)) / (h * y * v)) : (f + c) / 2;
}
function Nv(i, f, o, c) {
  var h;
  if (i == null)
    h = o * ml, c.point(-bt, h), c.point(0, h), c.point(bt, h), c.point(bt, 0), c.point(bt, -h), c.point(0, -h), c.point(-bt, -h), c.point(-bt, 0), c.point(-bt, h);
  else if (Bt(i[0] - f[0]) > Rt) {
    var y = i[0] < f[0] ? bt : -bt;
    h = o * y / 2, c.point(-y, h), c.point(0, h), c.point(y, h);
  } else
    c.point(f[0], f[1]);
}
function Ov(i) {
  var f = Vt(i), o = 2 * qt, c = f > 0, h = Bt(f) > Rt;
  function y(b, p, M, Z) {
    ad(Z, i, o, M, b, p);
  }
  function v(b, p) {
    return Vt(b) * Vt(p) > f;
  }
  function m(b) {
    var p, M, Z, Y, C;
    return {
      lineStart: function() {
        Y = Z = !1, C = 1;
      },
      point: function(L, F) {
        var K = [L, F], k, V = v(L, F), et = c ? V ? 0 : d(L, F) : V ? d(L + (L < 0 ? bt : -bt), F) : 0;
        if (!p && (Y = Z = V) && b.lineStart(), V !== Z && (k = S(p, K), (!k || Yi(p, k) || Yi(K, k)) && (K[2] = 1)), V !== Z)
          C = 0, V ? (b.lineStart(), k = S(K, p), b.point(k[0], k[1])) : (k = S(p, K), b.point(k[0], k[1], 2), b.lineEnd()), p = k;
        else if (h && p && c ^ V) {
          var J;
          !(et & M) && (J = S(K, p, !0)) && (C = 0, c ? (b.lineStart(), b.point(J[0][0], J[0][1]), b.point(J[1][0], J[1][1]), b.lineEnd()) : (b.point(J[1][0], J[1][1]), b.lineEnd(), b.lineStart(), b.point(J[0][0], J[0][1], 3)));
        }
        V && (!p || !Yi(p, K)) && b.point(K[0], K[1]), p = K, Z = V, M = et;
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
  function S(b, p, M) {
    var Z = ea(b), Y = ea(p), C = [1, 0, 0], L = Xi(Z, Y), F = Di(L, L), K = L[0], k = F - K * K;
    if (!k) return !M && b;
    var V = f * F / k, et = -f * K / k, J = Xi(C, L), $ = Ri(C, V), it = Ri(L, et);
    M0($, it);
    var ct = J, Et = Di($, ct), tt = Di(ct, ct), I = Et * Et - tt * (Di($, $) - 1);
    if (!(I < 0)) {
      var dt = sn(I), at = Ri(ct, (-Et - dt) / tt);
      if (M0(at, $), at = q0(at), !M) return at;
      var B = b[0], z = p[0], G = b[1], Q = p[1], ft;
      z < B && (ft = B, B = z, z = ft);
      var ot = z - B, E = Bt(ot - bt) < Rt, U = E || ot < Rt;
      if (!E && Q < G && (ft = G, G = Q, Q = ft), U ? E ? G + Q > 0 ^ at[1] < (Bt(at[0] - B) < Rt ? G : Q) : G <= at[1] && at[1] <= Q : ot > bt ^ (B <= at[0] && at[0] <= z)) {
        var X = Ri(ct, (-Et + dt) / tt);
        return M0(X, $), [at, q0(X)];
      }
    }
  }
  function d(b, p) {
    var M = c ? i : bt - i, Z = 0;
    return b < -M ? Z |= 1 : b > M && (Z |= 2), p < -M ? Z |= 4 : p > M && (Z |= 8), Z;
  }
  return fd(v, m, y, c ? [0, -i] : [-bt, i - bt]);
}
function Hv(i, f, o, c, h, y) {
  var v = i[0], m = i[1], S = f[0], d = f[1], b = 0, p = 1, M = S - v, Z = d - m, Y;
  if (Y = o - v, !(!M && Y > 0)) {
    if (Y /= M, M < 0) {
      if (Y < b) return;
      Y < p && (p = Y);
    } else if (M > 0) {
      if (Y > p) return;
      Y > b && (b = Y);
    }
    if (Y = h - v, !(!M && Y < 0)) {
      if (Y /= M, M < 0) {
        if (Y > p) return;
        Y > b && (b = Y);
      } else if (M > 0) {
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
          return b > 0 && (i[0] = v + b * M, i[1] = m + b * Z), p < 1 && (f[0] = v + p * M, f[1] = m + p * Z), !0;
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
  function y(d, b, p, M) {
    var Z = 0, Y = 0;
    if (d == null || (Z = v(d, p)) !== (Y = v(b, p)) || S(d, b) < 0 ^ p > 0)
      do
        M.point(Z === 0 || Z === 3 ? i : o, Z > 1 ? c : f);
      while ((Z = (Z + p + 4) % 4) !== Y);
    else
      M.point(b[0], b[1]);
  }
  function v(d, b) {
    return Bt(d[0] - i) < Rt ? b > 0 ? 0 : 3 : Bt(d[0] - o) < Rt ? b > 0 ? 2 : 1 : Bt(d[1] - f) < Rt ? b > 0 ? 1 : 0 : b > 0 ? 3 : 2;
  }
  function m(d, b) {
    return S(d.x, b.x);
  }
  function S(d, b) {
    var p = v(d, 1), M = v(b, 1);
    return p !== M ? p - M : p === 0 ? b[1] - d[1] : p === 1 ? d[0] - b[0] : p === 2 ? d[1] - b[1] : b[0] - d[0];
  }
  return function(d) {
    var b = d, p = ud(), M, Z, Y, C, L, F, K, k, V, et, J, $ = {
      point: it,
      lineStart: I,
      lineEnd: dt,
      polygonStart: Et,
      polygonEnd: tt
    };
    function it(B, z) {
      h(B, z) && b.point(B, z);
    }
    function ct() {
      for (var B = 0, z = 0, G = Z.length; z < G; ++z)
        for (var Q = Z[z], ft = 1, ot = Q.length, E = Q[0], U, X, w = E[0], ut = E[1]; ft < ot; ++ft)
          U = w, X = ut, E = Q[ft], w = E[0], ut = E[1], X <= c ? ut > c && (w - U) * (c - X) > (ut - X) * (i - U) && ++B : ut <= c && (w - U) * (c - X) < (ut - X) * (i - U) && --B;
      return B;
    }
    function Et() {
      b = p, M = [], Z = [], J = !0;
    }
    function tt() {
      var B = ct(), z = J && B, G = (M = ed(M)).length;
      (z || G) && (d.polygonStart(), z && (d.lineStart(), y(null, null, 1, d), d.lineEnd()), G && id(M, m, B, y, d), d.polygonEnd()), b = d, M = Z = Y = null;
    }
    function I() {
      $.point = at, Z && Z.push(Y = []), et = !0, V = !1, K = k = NaN;
    }
    function dt() {
      M && (at(C, L), F && V && p.rejoin(), M.push(p.result())), $.point = it, V && b.lineEnd();
    }
    function at(B, z) {
      var G = h(B, z);
      if (Z && Y.push([B, z]), et)
        C = B, L = z, F = G, et = !1, G && (b.lineStart(), b.point(B, z));
      else if (G && V) b.point(B, z);
      else {
        var Q = [K = Math.max(ji, Math.min(tu, K)), k = Math.max(ji, Math.min(tu, k))], ft = [B = Math.max(ji, Math.min(tu, B)), z = Math.max(ji, Math.min(tu, z))];
        Hv(Q, ft, i, f, o, c) ? (V || (b.lineStart(), b.point(Q[0], Q[1])), b.point(ft[0], ft[1]), G || b.lineEnd(), J = !1) : G && (b.lineStart(), b.point(B, z), J = !1);
      }
      K = B, k = z, V = G;
    }
    return $;
  };
}
const L0 = (i) => i;
var T0 = new rn(), G0 = new rn(), cd, rd, X0, V0, me = {
  point: Zl,
  lineStart: Zl,
  lineEnd: Zl,
  polygonStart: function() {
    me.lineStart = Rv, me.lineEnd = jv;
  },
  polygonEnd: function() {
    me.lineStart = me.lineEnd = me.point = Zl, T0.add(Bt(G0)), G0 = new rn();
  },
  result: function() {
    var i = T0 / 2;
    return T0 = new rn(), i;
  }
};
function Rv() {
  me.point = Uv;
}
function Uv(i, f) {
  me.point = od, cd = X0 = i, rd = V0 = f;
}
function od(i, f) {
  G0.add(V0 * i - X0 * f), X0 = i, V0 = f;
}
function jv() {
  od(cd, rd);
}
var na = 1 / 0, Vi = na, fu = -na, Qi = fu, wi = {
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
var Q0 = 0, w0 = 0, lu = 0, Ki = 0, Ji = 0, Pn = 0, K0 = 0, J0 = 0, eu = 0, sd, hd, Jl, $l, Bl = {
  point: on,
  lineStart: zh,
  lineEnd: Th,
  polygonStart: function() {
    Bl.lineStart = Zv, Bl.lineEnd = Yv;
  },
  polygonEnd: function() {
    Bl.point = on, Bl.lineStart = zh, Bl.lineEnd = Th;
  },
  result: function() {
    var i = eu ? [K0 / eu, J0 / eu] : Pn ? [Ki / Pn, Ji / Pn] : lu ? [Q0 / lu, w0 / lu] : [NaN, NaN];
    return Q0 = w0 = lu = Ki = Ji = Pn = K0 = J0 = eu = 0, i;
  }
};
function on(i, f) {
  Q0 += i, w0 += f, ++lu;
}
function zh() {
  Bl.point = qv;
}
function qv(i, f) {
  Bl.point = Bv, on(Jl = i, $l = f);
}
function Bv(i, f) {
  var o = i - Jl, c = f - $l, h = sn(o * o + c * c);
  Ki += h * (Jl + i) / 2, Ji += h * ($l + f) / 2, Pn += h, on(Jl = i, $l = f);
}
function Th() {
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
  Ki += h * (Jl + i) / 2, Ji += h * ($l + f) / 2, Pn += h, h = $l * i - Jl * f, K0 += h * (Jl + i), J0 += h * ($l + f), eu += h * 3, on(Jl = i, $l = f);
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
var $0 = new rn(), _0, vd, yd, nu, au, cu = {
  point: Zl,
  lineStart: function() {
    cu.point = Gv;
  },
  lineEnd: function() {
    _0 && gd(vd, yd), cu.point = Zl;
  },
  polygonStart: function() {
    _0 = !0;
  },
  polygonEnd: function() {
    _0 = null;
  },
  result: function() {
    var i = +$0;
    return $0 = new rn(), i;
  }
};
function Gv(i, f) {
  cu.point = gd, vd = nu = i, yd = au = f;
}
function gd(i, f) {
  nu -= i, au -= f, $0.add(sn(nu * nu + au * au)), nu = i, au = f;
}
let _h, $i, Nh, Oh;
class Hh {
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
        if (this._append`M${f},${o}`, this._radius !== Nh || this._append !== $i) {
          const c = this._radius, h = this._;
          this._ = "", this._append`m0,${c}a${c},${c} 0 1,1 0,${-2 * c}a${c},${c} 0 1,1 0,${2 * c}z`, Nh = c, $i = this._append, Oh = this._, this._ = h;
        }
        this._ += Oh;
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
  if (f !== _h) {
    const o = 10 ** f;
    _h = f, $i = function(h) {
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
    return In(m, h(wi)), wi.result();
  }, v.centroid = function(m) {
    return In(m, h(Bl)), Bl.result();
  }, v.projection = function(m) {
    return arguments.length ? (h = m == null ? (i = null, L0) : (i = m).stream, v) : i;
  }, v.context = function(m) {
    return arguments.length ? (y = m == null ? (f = null, new Hh(o)) : new md(f = m), typeof c != "function" && y.pointRadius(c), v) : f;
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
    return f === null && (y = new Hh(o)), v;
  }, v.projection(i).digits(o).context(f);
}
function er(i) {
  return function(f) {
    var o = new W0();
    for (var c in i) o[c] = i[c];
    return o.stream = f, o;
  };
}
function W0() {
}
W0.prototype = {
  constructor: W0,
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
function nr(i, f, o) {
  var c = i.clipExtent && i.clipExtent();
  return i.scale(150).translate([0, 0]), c != null && i.clipExtent(null), In(o, i.stream(wi)), f(wi.result()), c != null && i.clipExtent(c), i;
}
function Sd(i, f, o) {
  return nr(i, function(c) {
    var h = f[1][0] - f[0][0], y = f[1][1] - f[0][1], v = Math.min(h / (c[1][0] - c[0][0]), y / (c[1][1] - c[0][1])), m = +f[0][0] + (h - v * (c[1][0] + c[0][0])) / 2, S = +f[0][1] + (y - v * (c[1][1] + c[0][1])) / 2;
    i.scale(150 * v).translate([m, S]);
  }, o);
}
function Qv(i, f, o) {
  return Sd(i, [[0, 0], f], o);
}
function wv(i, f, o) {
  return nr(i, function(c) {
    var h = +f, y = h / (c[1][0] - c[0][0]), v = (h - y * (c[1][0] + c[0][0])) / 2, m = -y * c[0][1];
    i.scale(150 * y).translate([v, m]);
  }, o);
}
function Kv(i, f, o) {
  return nr(i, function(c) {
    var h = +f, y = h / (c[1][1] - c[0][1]), v = -y * c[0][0], m = (h - y * (c[1][1] + c[0][1])) / 2;
    i.scale(150 * y).translate([v, m]);
  }, o);
}
var Dh = 16, Jv = Vt(30 * qt);
function Rh(i, f) {
  return +f ? Wv(i, f) : $v(i);
}
function $v(i) {
  return er({
    point: function(f, o) {
      f = i(f, o), this.stream.point(f[0], f[1]);
    }
  });
}
function Wv(i, f) {
  function o(c, h, y, v, m, S, d, b, p, M, Z, Y, C, L) {
    var F = d - c, K = b - h, k = F * F + K * K;
    if (k > 4 * f && C--) {
      var V = v + M, et = m + Z, J = S + Y, $ = sn(V * V + et * et + J * J), it = iu(J /= $), ct = Bt(Bt(J) - 1) < Rt || Bt(y - p) < Rt ? (y + p) / 2 : uu(et, V), Et = i(ct, it), tt = Et[0], I = Et[1], dt = tt - c, at = I - h, B = K * dt - F * at;
      (B * B / k > f || Bt((F * dt + K * at) / k - 0.5) > 0.3 || v * M + m * Z + S * Y < Jv) && (o(c, h, y, v, m, S, tt, I, ct, V /= $, et /= $, J, C, L), L.point(tt, I), o(tt, I, ct, V, et, J, d, b, p, M, Z, Y, C, L));
    }
  }
  return function(c) {
    var h, y, v, m, S, d, b, p, M, Z, Y, C, L = {
      point: F,
      lineStart: K,
      lineEnd: V,
      polygonStart: function() {
        c.polygonStart(), L.lineStart = et;
      },
      polygonEnd: function() {
        c.polygonEnd(), L.lineStart = K;
      }
    };
    function F(it, ct) {
      it = i(it, ct), c.point(it[0], it[1]);
    }
    function K() {
      p = NaN, L.point = k, c.lineStart();
    }
    function k(it, ct) {
      var Et = ea([it, ct]), tt = i(it, ct);
      o(p, M, b, Z, Y, C, p = tt[0], M = tt[1], b = it, Z = Et[0], Y = Et[1], C = Et[2], Dh, c), c.point(p, M);
    }
    function V() {
      L.point = F, c.lineEnd();
    }
    function et() {
      K(), L.point = J, L.lineEnd = $;
    }
    function J(it, ct) {
      k(h = it, ct), y = p, v = M, m = Z, S = Y, d = C, L.point = k;
    }
    function $() {
      o(p, M, b, Z, Y, C, y, v, h, m, S, d, Dh, c), L.lineEnd = V, V();
    }
    return L;
  };
}
var kv = er({
  point: function(i, f) {
    this.stream.point(i * qt, f * qt);
  }
});
function Fv(i) {
  return er({
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
  var v = Vt(y), m = Qt(y), S = v * i, d = m * i, b = v / i, p = m / i, M = (m * o - v * f) / i, Z = (m * f + v * o) / i;
  function Y(C, L) {
    return C *= c, L *= h, [S * C - d * L + f, o - d * C - S * L];
  }
  return Y.invert = function(C, L) {
    return [c * (b * C - p * L + M), h * (Z - p * C - b * L)];
  }, Y;
}
function Pv(i) {
  return ty(function() {
    return i;
  })();
}
function ty(i) {
  var f, o = 150, c = 480, h = 250, y = 0, v = 0, m = 0, S = 0, d = 0, b, p = 0, M = 1, Z = 1, Y = null, C = Mh, L = null, F, K, k, V = L0, et = 0.5, J, $, it, ct, Et;
  function tt(B) {
    return it(B[0] * qt, B[1] * qt);
  }
  function I(B) {
    return B = it.invert(B[0], B[1]), B && [B[0] * il, B[1] * il];
  }
  tt.stream = function(B) {
    return ct && Et === B ? ct : ct = kv(Fv(b)(C(J(V(Et = B)))));
  }, tt.preclip = function(B) {
    return arguments.length ? (C = B, Y = void 0, at()) : C;
  }, tt.postclip = function(B) {
    return arguments.length ? (V = B, L = F = K = k = null, at()) : V;
  }, tt.clipAngle = function(B) {
    return arguments.length ? (C = +B ? Ov(Y = B * qt) : (Y = null, Mh), at()) : Y * il;
  }, tt.clipExtent = function(B) {
    return arguments.length ? (V = B == null ? (L = F = K = k = null, L0) : Dv(L = +B[0][0], F = +B[0][1], K = +B[1][0], k = +B[1][1]), at()) : L == null ? null : [[L, F], [K, k]];
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
    return arguments.length ? (M = B ? -1 : 1, dt()) : M < 0;
  }, tt.reflectY = function(B) {
    return arguments.length ? (Z = B ? -1 : 1, dt()) : Z < 0;
  }, tt.precision = function(B) {
    return arguments.length ? (J = Rh($, et = B * B), at()) : sn(et);
  }, tt.fitExtent = function(B, z) {
    return Sd(tt, B, z);
  }, tt.fitSize = function(B, z) {
    return Qv(tt, B, z);
  }, tt.fitWidth = function(B, z) {
    return wv(tt, B, z);
  }, tt.fitHeight = function(B, z) {
    return Kv(tt, B, z);
  };
  function dt() {
    var B = Uh(o, 0, 0, M, Z, p).apply(null, f(y, v)), z = Uh(o, c - B[0], h - B[1], M, Z, p);
    return b = lr(m, S, d), $ = Z0(f, z), it = Z0(b, $), J = Rh($, et), at();
  }
  function at() {
    return ct = Et = null, tt;
  }
  return function() {
    return f = i.apply(this, arguments), tt.invert = f.invert && I, dt();
  };
}
function ar(i, f) {
  return [i, gv(Sv((ml + f) / 2))];
}
ar.invert = function(i, f) {
  return [i, 2 * nd(yv(f)) - ml];
};
function ly() {
  return ey(ar).scale(961 / Tl);
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
    var p = bt * c(), M = f(Ev(f.rotate()).invert([0, 0]));
    return y(v == null ? [[M[0] - p, M[1] - p], [M[0] + p, M[1] + p]] : i === ar ? [[Math.max(M[0] - p, v), m], [Math.min(M[0] + p, S), d]] : [[v, Math.max(M[1] - p, m)], [S, Math.min(M[1] + p, d)]]);
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
function ur(i, f, o) {
  i.prototype = f.prototype = o, o.constructor = i;
}
function bd(i, f) {
  var o = Object.create(i.prototype);
  for (var c in f) o[c] = f[c];
  return o;
}
function hu() {
}
var ru = 0.7, Wi = 1 / ru, la = "\\s*([+-]?\\d+)\\s*", ou = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Wl = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ay = /^#([0-9a-f]{3,8})$/, uy = new RegExp(`^rgb\\(${la},${la},${la}\\)$`), iy = new RegExp(`^rgb\\(${Wl},${Wl},${Wl}\\)$`), fy = new RegExp(`^rgba\\(${la},${la},${la},${ou}\\)$`), cy = new RegExp(`^rgba\\(${Wl},${Wl},${Wl},${ou}\\)$`), ry = new RegExp(`^hsl\\(${ou},${Wl},${Wl}\\)$`), oy = new RegExp(`^hsla\\(${ou},${Wl},${Wl},${ou}\\)$`), jh = {
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
ur(hu, su, {
  copy(i) {
    return Object.assign(new this.constructor(), this, i);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Ch,
  // Deprecated! Use color.formatHex.
  formatHex: Ch,
  formatHex8: sy,
  formatHsl: hy,
  formatRgb: qh,
  toString: qh
});
function Ch() {
  return this.rgb().formatHex();
}
function sy() {
  return this.rgb().formatHex8();
}
function hy() {
  return Ed(this).formatHsl();
}
function qh() {
  return this.rgb().formatRgb();
}
function su(i) {
  var f, o;
  return i = (i + "").trim().toLowerCase(), (f = ay.exec(i)) ? (o = f[1].length, f = parseInt(f[1], 16), o === 6 ? Bh(f) : o === 3 ? new vl(f >> 8 & 15 | f >> 4 & 240, f >> 4 & 15 | f & 240, (f & 15) << 4 | f & 15, 1) : o === 8 ? Ci(f >> 24 & 255, f >> 16 & 255, f >> 8 & 255, (f & 255) / 255) : o === 4 ? Ci(f >> 12 & 15 | f >> 8 & 240, f >> 8 & 15 | f >> 4 & 240, f >> 4 & 15 | f & 240, ((f & 15) << 4 | f & 15) / 255) : null) : (f = uy.exec(i)) ? new vl(f[1], f[2], f[3], 1) : (f = iy.exec(i)) ? new vl(f[1] * 255 / 100, f[2] * 255 / 100, f[3] * 255 / 100, 1) : (f = fy.exec(i)) ? Ci(f[1], f[2], f[3], f[4]) : (f = cy.exec(i)) ? Ci(f[1] * 255 / 100, f[2] * 255 / 100, f[3] * 255 / 100, f[4]) : (f = ry.exec(i)) ? Lh(f[1], f[2] / 100, f[3] / 100, 1) : (f = oy.exec(i)) ? Lh(f[1], f[2] / 100, f[3] / 100, f[4]) : jh.hasOwnProperty(i) ? Bh(jh[i]) : i === "transparent" ? new vl(NaN, NaN, NaN, 0) : null;
}
function Bh(i) {
  return new vl(i >> 16 & 255, i >> 8 & 255, i & 255, 1);
}
function Ci(i, f, o, c) {
  return c <= 0 && (i = f = o = NaN), new vl(i, f, o, c);
}
function dy(i) {
  return i instanceof hu || (i = su(i)), i ? (i = i.rgb(), new vl(i.r, i.g, i.b, i.opacity)) : new vl();
}
function k0(i, f, o, c) {
  return arguments.length === 1 ? dy(i) : new vl(i, f, o, c ?? 1);
}
function vl(i, f, o, c) {
  this.r = +i, this.g = +f, this.b = +o, this.opacity = +c;
}
ur(vl, k0, bd(hu, {
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
    return new vl(cn(this.r), cn(this.g), cn(this.b), ki(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Zh,
  // Deprecated! Use color.formatHex.
  formatHex: Zh,
  formatHex8: my,
  formatRgb: Yh,
  toString: Yh
}));
function Zh() {
  return `#${fn(this.r)}${fn(this.g)}${fn(this.b)}`;
}
function my() {
  return `#${fn(this.r)}${fn(this.g)}${fn(this.b)}${fn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Yh() {
  const i = ki(this.opacity);
  return `${i === 1 ? "rgb(" : "rgba("}${cn(this.r)}, ${cn(this.g)}, ${cn(this.b)}${i === 1 ? ")" : `, ${i})`}`;
}
function ki(i) {
  return isNaN(i) ? 1 : Math.max(0, Math.min(1, i));
}
function cn(i) {
  return Math.max(0, Math.min(255, Math.round(i) || 0));
}
function fn(i) {
  return i = cn(i), (i < 16 ? "0" : "") + i.toString(16);
}
function Lh(i, f, o, c) {
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
ur(Xl, vy, bd(hu, {
  brighter(i) {
    return i = i == null ? Wi : Math.pow(Wi, i), new Xl(this.h, this.s, this.l * i, this.opacity);
  },
  darker(i) {
    return i = i == null ? ru : Math.pow(ru, i), new Xl(this.h, this.s, this.l * i, this.opacity);
  },
  rgb() {
    var i = this.h % 360 + (this.h < 0) * 360, f = isNaN(i) || isNaN(this.s) ? 0 : this.s, o = this.l, c = o + (o < 0.5 ? o : 1 - o) * f, h = 2 * o - c;
    return new vl(
      N0(i >= 240 ? i - 240 : i + 120, h, c),
      N0(i, h, c),
      N0(i < 120 ? i + 240 : i - 120, h, c),
      this.opacity
    );
  },
  clamp() {
    return new Xl(Gh(this.h), qi(this.s), qi(this.l), ki(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const i = ki(this.opacity);
    return `${i === 1 ? "hsl(" : "hsla("}${Gh(this.h)}, ${qi(this.s) * 100}%, ${qi(this.l) * 100}%${i === 1 ? ")" : `, ${i})`}`;
  }
}));
function Gh(i) {
  return i = (i || 0) % 360, i < 0 ? i + 360 : i;
}
function qi(i) {
  return Math.max(0, Math.min(1, i || 0));
}
function N0(i, f, o) {
  return (i < 60 ? f + (o - f) * i / 60 : i < 180 ? o : i < 240 ? f + (o - f) * (240 - i) / 60 : f) * 255;
}
const ir = (i) => () => i;
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
    return o - f ? gy(f, o, i) : ir(isNaN(f) ? o : f);
  };
}
function Ad(i, f) {
  var o = f - i;
  return o ? yy(i, o) : ir(isNaN(i) ? f : i);
}
const Xh = (function i(f) {
  var o = py(f);
  function c(h, y) {
    var v = o((h = k0(h)).r, (y = k0(y)).r), m = o(h.g, y.g), S = o(h.b, y.b), d = Ad(h.opacity, y.opacity);
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
  for (v = 0; v < c; ++v) h[v] = fr(i[v], f[v]);
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
function Fi(i, f) {
  return i = +i, f = +f, function(o) {
    return i * (1 - o) + f * o;
  };
}
function xy(i, f) {
  var o = {}, c = {}, h;
  (i === null || typeof i != "object") && (i = {}), (f === null || typeof f != "object") && (f = {});
  for (h in f)
    h in i ? o[h] = fr(i[h], f[h]) : c[h] = f[h];
  return function(y) {
    for (h in o) c[h] = o[h](y);
    return c;
  };
}
var F0 = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, O0 = new RegExp(F0.source, "g");
function My(i) {
  return function() {
    return i;
  };
}
function zy(i) {
  return function(f) {
    return i(f) + "";
  };
}
function Ty(i, f) {
  var o = F0.lastIndex = O0.lastIndex = 0, c, h, y, v = -1, m = [], S = [];
  for (i = i + "", f = f + ""; (c = F0.exec(i)) && (h = O0.exec(f)); )
    (y = h.index) > o && (y = f.slice(o, y), m[v] ? m[v] += y : m[++v] = y), (c = c[0]) === (h = h[0]) ? m[v] ? m[v] += h : m[++v] = h : (m[++v] = null, S.push({ i: v, x: Fi(c, h) })), o = O0.lastIndex;
  return o < f.length && (y = f.slice(o), m[v] ? m[v] += y : m[++v] = y), m.length < 2 ? S[0] ? zy(S[0].x) : My(f) : (f = S.length, function(d) {
    for (var b = 0, p; b < f; ++b) m[(p = S[b]).i] = p.x(d);
    return m.join("");
  });
}
function fr(i, f) {
  var o = typeof f, c;
  return f == null || o === "boolean" ? ir(f) : (o === "number" ? Fi : o === "string" ? (c = su(f)) ? (f = c, Xh) : Ty : f instanceof su ? Xh : f instanceof Date ? Ay : by(f) ? Sy : Array.isArray(f) ? Ey : typeof f.valueOf != "function" && typeof f.toString != "function" || isNaN(f) ? xy : Fi)(i, f);
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
var Vh = [0, 1];
function ta(i) {
  return i;
}
function I0(i, f) {
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
  return h < c ? (c = I0(h, c), y = o(v, y)) : (c = I0(c, h), y = o(y, v)), function(m) {
    return y(c(m));
  };
}
function Ry(i, f, o) {
  var c = Math.min(i.length, f.length) - 1, h = new Array(c), y = new Array(c), v = -1;
  for (i[c] < i[0] && (i = i.slice().reverse(), f = f.slice().reverse()); ++v < c; )
    h[v] = I0(i[v], i[v + 1]), y[v] = o(f[v], f[v + 1]);
  return function(m) {
    var S = rv(i, m, 1, c) - 1;
    return y[S](h[S](m));
  };
}
function Uy(i, f) {
  return f.domain(i.domain()).range(i.range()).interpolate(i.interpolate()).clamp(i.clamp()).unknown(i.unknown());
}
function jy() {
  var i = Vh, f = Vh, o = fr, c, h, y, v = ta, m, S, d;
  function b() {
    var M = Math.min(i.length, f.length);
    return v !== ta && (v = Hy(i[0], i[M - 1])), m = M > 2 ? Ry : Dy, S = d = null, p;
  }
  function p(M) {
    return M == null || isNaN(M = +M) ? y : (S || (S = m(i.map(c), f, o)))(c(v(M)));
  }
  return p.invert = function(M) {
    return v(h((d || (d = m(f, i.map(c), Fi)))(M)));
  }, p.domain = function(M) {
    return arguments.length ? (i = Array.from(M, Oy), b()) : i.slice();
  }, p.range = function(M) {
    return arguments.length ? (f = Array.from(M), b()) : f.slice();
  }, p.rangeRound = function(M) {
    return f = Array.from(M), o = _y, b();
  }, p.clamp = function(M) {
    return arguments.length ? (v = M ? !0 : ta, b()) : v !== ta;
  }, p.interpolate = function(M) {
    return arguments.length ? (o = M, b()) : o;
  }, p.unknown = function(M) {
    return arguments.length ? (y = M, p) : y;
  }, function(M, Z) {
    return c = M, h = Z, b();
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
  return new cr({
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
Pi.prototype = cr.prototype;
function cr(i) {
  this.fill = i.fill === void 0 ? " " : i.fill + "", this.align = i.align === void 0 ? ">" : i.align + "", this.sign = i.sign === void 0 ? "-" : i.sign + "", this.symbol = i.symbol === void 0 ? "" : i.symbol + "", this.zero = !!i.zero, this.width = i.width === void 0 ? void 0 : +i.width, this.comma = !!i.comma, this.precision = i.precision === void 0 ? void 0 : +i.precision, this.trim = !!i.trim, this.type = i.type === void 0 ? "" : i.type + "";
}
cr.prototype.toString = function() {
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
function Qh(i, f) {
  var o = Ii(i, f);
  if (!o) return i + "";
  var c = o[0], h = o[1];
  return h < 0 ? "0." + new Array(-h).join("0") + c : c.length > h + 1 ? c.slice(0, h + 1) + "." + c.slice(h + 1) : c + new Array(h - c.length + 2).join("0");
}
const wh = {
  "%": (i, f) => (i * 100).toFixed(f),
  b: (i) => Math.round(i).toString(2),
  c: (i) => i + "",
  d: qy,
  e: (i, f) => i.toExponential(f),
  f: (i, f) => i.toFixed(f),
  g: (i, f) => i.toPrecision(f),
  o: (i) => Math.round(i).toString(8),
  p: (i, f) => Qh(i * 100, f),
  r: Qh,
  s: Gy,
  X: (i) => Math.round(i).toString(16).toUpperCase(),
  x: (i) => Math.round(i).toString(16)
};
function Kh(i) {
  return i;
}
var Jh = Array.prototype.map, $h = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function Xy(i) {
  var f = i.grouping === void 0 || i.thousands === void 0 ? Kh : By(Jh.call(i.grouping, Number), i.thousands + ""), o = i.currency === void 0 ? "" : i.currency[0] + "", c = i.currency === void 0 ? "" : i.currency[1] + "", h = i.decimal === void 0 ? "." : i.decimal + "", y = i.numerals === void 0 ? Kh : Zy(Jh.call(i.numerals, String)), v = i.percent === void 0 ? "%" : i.percent + "", m = i.minus === void 0 ? "−" : i.minus + "", S = i.nan === void 0 ? "NaN" : i.nan + "";
  function d(p, M) {
    p = Pi(p);
    var Z = p.fill, Y = p.align, C = p.sign, L = p.symbol, F = p.zero, K = p.width, k = p.comma, V = p.precision, et = p.trim, J = p.type;
    J === "n" ? (k = !0, J = "g") : wh[J] || (V === void 0 && (V = 12), et = !0, J = "g"), (F || Z === "0" && Y === "=") && (F = !0, Z = "0", Y = "=");
    var $ = (M && M.prefix !== void 0 ? M.prefix : "") + (L === "$" ? o : L === "#" && /[boxX]/.test(J) ? "0" + J.toLowerCase() : ""), it = (L === "$" ? c : /[%p]/.test(J) ? v : "") + (M && M.suffix !== void 0 ? M.suffix : ""), ct = wh[J], Et = /[defgprs%]/.test(J);
    V = V === void 0 ? 6 : /[gprs]/.test(J) ? Math.max(1, Math.min(21, V)) : Math.max(0, Math.min(20, V));
    function tt(I) {
      var dt = $, at = it, B, z, G;
      if (J === "c")
        at = ct(I) + at, I = "";
      else {
        I = +I;
        var Q = I < 0 || 1 / I < 0;
        if (I = isNaN(I) ? S : ct(Math.abs(I), V), et && (I = Ly(I)), Q && +I == 0 && C !== "+" && (Q = !1), dt = (Q ? C === "(" ? C : m : C === "-" || C === "(" ? "" : C) + dt, at = (J === "s" && !isNaN(I) && tf !== void 0 ? $h[8 + tf / 3] : "") + at + (Q && C === "(" ? ")" : ""), Et) {
          for (B = -1, z = I.length; ++B < z; )
            if (G = I.charCodeAt(B), 48 > G || G > 57) {
              at = (G === 46 ? h + I.slice(B + 1) : I.slice(B)) + at, I = I.slice(0, B);
              break;
            }
        }
      }
      k && !F && (I = f(I, 1 / 0));
      var ft = dt.length + I.length + at.length, ot = ft < K ? new Array(K - ft + 1).join(Z) : "";
      switch (k && F && (I = f(ot + I, ot.length ? K - at.length : 1 / 0), ot = ""), Y) {
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
  function b(p, M) {
    var Z = Math.max(-8, Math.min(8, Math.floor(aa(M) / 3))) * 3, Y = Math.pow(10, -Z), C = d((p = Pi(p), p.type = "f", p), { suffix: $h[8 + Z / 3] });
    return function(L) {
      return C(Y * L);
    };
  }
  return {
    format: d,
    formatPrefix: b
  };
}
var Bi, xd, Md;
Vy({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function Vy(i) {
  return Bi = Xy(i), xd = Bi.format, Md = Bi.formatPrefix, Bi;
}
function Qy(i) {
  return Math.max(0, -aa(Math.abs(i)));
}
function wy(i, f) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(aa(f) / 3))) * 3 - aa(Math.abs(i)));
}
function Ky(i, f) {
  return i = Math.abs(i), f = Math.abs(f) - i, Math.max(0, aa(f) - aa(i)) + 1;
}
function Jy(i, f, o, c) {
  var h = mv(i, f, o), y;
  switch (c = Pi(c ?? ",f"), c.type) {
    case "s": {
      var v = Math.max(Math.abs(i), Math.abs(f));
      return c.precision == null && !isNaN(y = wy(h, v)) && (c.precision = y), Md(c, v);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      c.precision == null && !isNaN(y = Ky(h, Math.max(Math.abs(i), Math.abs(f)))) && (c.precision = y - (c.type === "e"));
      break;
    }
    case "f":
    case "%": {
      c.precision == null && !isNaN(y = Qy(h)) && (c.precision = y - (c.type === "%") * 2);
      break;
    }
  }
  return xd(c);
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
      if (d = j0(v, m, o), d === S)
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
    return Uy(i, lf());
  }, ny.apply(i, arguments), $y(i);
}
const Wy = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M228,128a100,100,0,0,1-98.66,100H128a99.39,99.39,0,0,1-68.62-27.29,12,12,0,0,1,16.48-17.45,76,76,0,1,0-1.57-109c-.13.13-.25.25-.39.37L54.89,92H72a12,12,0,0,1,0,24H24a12,12,0,0,1-12-12V56a12,12,0,0,1,24,0V76.72L57.48,57.06A100,100,0,0,1,228,128Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M216,128a88,88,0,1,1-88-88A88,88,0,0,1,216,128Z", opacity: "0.2" }), /* @__PURE__ */ H.createElement("path", { d: "M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L44.59,96H72a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V56a8,8,0,0,1,16,0V85.8L60.25,60A96,96,0,0,1,224,128Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L60.63,81.29l17,17A8,8,0,0,1,72,112H24a8,8,0,0,1-8-8V56A8,8,0,0,1,29.66,50.3L49.31,70,60.25,60A96,96,0,0,1,224,128Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M222,128a94,94,0,0,1-92.74,94H128a93.43,93.43,0,0,1-64.5-25.65,6,6,0,1,1,8.24-8.72A82,82,0,1,0,70,70l-.19.19L39.44,98H72a6,6,0,0,1,0,12H24a6,6,0,0,1-6-6V56a6,6,0,0,1,12,0V90.34L61.63,61.4A94,94,0,0,1,222,128Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L44.59,96H72a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V56a8,8,0,0,1,16,0V85.8L60.25,60A96,96,0,0,1,224,128Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M220,128a92,92,0,0,1-90.77,92H128a91.47,91.47,0,0,1-63.13-25.1,4,4,0,1,1,5.5-5.82A84,84,0,1,0,68.6,68.57l-.13.12L34.3,100H72a4,4,0,0,1,0,8H24a4,4,0,0,1-4-4V56a4,4,0,0,1,8,0V94.89l35-32A92,92,0,0,1,220,128Z" }))
  ]
]), ky = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M216,128l-72,72V56Z", opacity: "0.2" }), /* @__PURE__ */ H.createElement("path", { d: "M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M221.66,133.66l-72,72A8,8,0,0,1,136,200V136H40a8,8,0,0,1,0-16h96V56a8,8,0,0,1,13.66-5.66l72,72A8,8,0,0,1,221.66,133.66Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M220.24,132.24l-72,72a6,6,0,0,1-8.48-8.48L201.51,134H40a6,6,0,0,1,0-12H201.51L139.76,60.24a6,6,0,0,1,8.48-8.48l72,72A6,6,0,0,1,220.24,132.24Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M218.83,130.83l-72,72a4,4,0,0,1-5.66-5.66L206.34,132H40a4,4,0,0,1,0-8H206.34L141.17,58.83a4,4,0,0,1,5.66-5.66l72,72A4,4,0,0,1,218.83,130.83Z" }))
  ]
]), Fy = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M228,144v64a12,12,0,0,1-12,12H40a12,12,0,0,1-12-12V144a12,12,0,0,1,24,0v52H204V144a12,12,0,0,1,24,0Zm-108.49,8.49a12,12,0,0,0,17,0l40-40a12,12,0,0,0-17-17L140,115V32a12,12,0,0,0-24,0v83L96.49,95.51a12,12,0,0,0-17,17Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement(
      "path",
      {
        d: "M216,48V208H40V48A16,16,0,0,1,56,32H200A16,16,0,0,1,216,48Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ H.createElement("path", { d: "M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,124.69V32a8,8,0,0,0-16,0v92.69L93.66,98.34a8,8,0,0,0-11.32,11.32Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40A8,8,0,0,0,168,96H136V32a8,8,0,0,0-16,0V96H88a8,8,0,0,0-5.66,13.66Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M222,144v64a6,6,0,0,1-6,6H40a6,6,0,0,1-6-6V144a6,6,0,0,1,12,0v58H210V144a6,6,0,0,1,12,0Zm-98.24,4.24a6,6,0,0,0,8.48,0l40-40a6,6,0,0,0-8.48-8.48L134,129.51V32a6,6,0,0,0-12,0v97.51L92.24,99.76a6,6,0,0,0-8.48,8.48Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,124.69V32a8,8,0,0,0-16,0v92.69L93.66,98.34a8,8,0,0,0-11.32,11.32Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M220,144v64a4,4,0,0,1-4,4H40a4,4,0,0,1-4-4V144a4,4,0,0,1,8,0v60H212V144a4,4,0,0,1,8,0Zm-94.83,2.83a4,4,0,0,0,5.66,0l40-40a4,4,0,1,0-5.66-5.66L132,134.34V32a4,4,0,0,0-8,0V134.34L90.83,101.17a4,4,0,0,0-5.66,5.66Z" }))
  ]
]), Iy = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement(
      "path",
      {
        d: "M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ H.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,136H72a8,8,0,0,1,0-16H184a8,8,0,0,1,0,16Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M222,128a6,6,0,0,1-6,6H40a6,6,0,0,1,0-12H216A6,6,0,0,1,222,128Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M220,128a4,4,0,0,1-4,4H40a4,4,0,0,1,0-8H216A4,4,0,0,1,220,128Z" }))
  ]
]), Py = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement(
      "path",
      {
        d: "M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ H.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,136H136v48a8,8,0,0,1-16,0V136H72a8,8,0,0,1,0-16h48V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M222,128a6,6,0,0,1-6,6H134v82a6,6,0,0,1-12,0V134H40a6,6,0,0,1,0-12h82V40a6,6,0,0,1,12,0v82h82A6,6,0,0,1,222,128Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M220,128a4,4,0,0,1-4,4H132v84a4,4,0,0,1-8,0V132H40a4,4,0,0,1,0-8h84V40a4,4,0,0,1,8,0v84h84A4,4,0,0,1,220,128Z" }))
  ]
]), tg = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement(
      "path",
      {
        d: "M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ H.createElement("path", { d: "M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM181.66,170.34a8,8,0,0,1-11.32,11.32L128,139.31,85.66,181.66a8,8,0,0,1-11.32-11.32L116.69,128,74.34,85.66A8,8,0,0,1,85.66,74.34L128,116.69l42.34-42.35a8,8,0,0,1,11.32,11.32L139.31,128Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M204.24,195.76a6,6,0,1,1-8.48,8.48L128,136.49,60.24,204.24a6,6,0,0,1-8.48-8.48L119.51,128,51.76,60.24a6,6,0,0,1,8.48-8.48L128,119.51l67.76-67.75a6,6,0,0,1,8.48,8.48L136.49,128Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement("path", { d: "M202.83,197.17a4,4,0,0,1-5.66,5.66L128,133.66,58.83,202.83a4,4,0,0,1-5.66-5.66L122.34,128,53.17,58.83a4,4,0,0,1,5.66-5.66L128,122.34l69.17-69.17a4,4,0,1,1,5.66,5.66L133.66,128Z" }))
  ]
]), lg = H.createContext({
  color: "currentColor",
  size: "1em",
  weight: "regular",
  mirrored: !1
}), hn = H.forwardRef(
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
      weight: M = "regular",
      mirrored: Z = !1,
      ...Y
    } = H.useContext(lg);
    return /* @__PURE__ */ H.createElement(
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
      !!o && /* @__PURE__ */ H.createElement("title", null, o),
      m,
      S.get(y ?? M)
    );
  }
);
hn.displayName = "IconBase";
const zd = H.forwardRef((i, f) => /* @__PURE__ */ H.createElement(hn, { ref: f, ...i, weights: Wy }));
zd.displayName = "ArrowCounterClockwiseIcon";
const eg = zd, Td = H.forwardRef((i, f) => /* @__PURE__ */ H.createElement(hn, { ref: f, ...i, weights: ky }));
Td.displayName = "ArrowRightIcon";
const ng = Td, _d = H.forwardRef((i, f) => /* @__PURE__ */ H.createElement(hn, { ref: f, ...i, weights: Fy }));
_d.displayName = "DownloadSimpleIcon";
const ag = _d, Nd = H.forwardRef((i, f) => /* @__PURE__ */ H.createElement(hn, { ref: f, ...i, weights: Iy }));
Nd.displayName = "MinusIcon";
const ug = Nd, Od = H.forwardRef((i, f) => /* @__PURE__ */ H.createElement(hn, { ref: f, ...i, weights: Py }));
Od.displayName = "PlusIcon";
const ig = Od, Hd = H.forwardRef((i, f) => /* @__PURE__ */ H.createElement(hn, { ref: f, ...i, weights: tg }));
Hd.displayName = "XIcon";
const fg = Hd;
var H0 = { exports: {} }, Pa = {}, D0 = { exports: {} }, R0 = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wh;
function cg() {
  return Wh || (Wh = 1, (function(i) {
    function f(z, G) {
      var Q = z.length;
      z.push(G);
      t: for (; 0 < Q; ) {
        var ft = Q - 1 >>> 1, ot = z[ft];
        if (0 < h(ot, G))
          z[ft] = G, z[Q] = ot, Q = ft;
        else break t;
      }
    }
    function o(z) {
      return z.length === 0 ? null : z[0];
    }
    function c(z) {
      if (z.length === 0) return null;
      var G = z[0], Q = z.pop();
      if (Q !== G) {
        z[0] = Q;
        t: for (var ft = 0, ot = z.length, E = ot >>> 1; ft < E; ) {
          var U = 2 * (ft + 1) - 1, X = z[U], w = U + 1, ut = z[w];
          if (0 > h(X, Q))
            w < ot && 0 > h(ut, X) ? (z[ft] = ut, z[w] = Q, ft = w) : (z[ft] = X, z[U] = Q, ft = U);
          else if (w < ot && 0 > h(ut, Q))
            z[ft] = ut, z[w] = Q, ft = w;
          else break t;
        }
      }
      return G;
    }
    function h(z, G) {
      var Q = z.sortIndex - G.sortIndex;
      return Q !== 0 ? Q : z.id - G.id;
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
    var S = [], d = [], b = 1, p = null, M = 3, Z = !1, Y = !1, C = !1, L = !1, F = typeof setTimeout == "function" ? setTimeout : null, K = typeof clearTimeout == "function" ? clearTimeout : null, k = typeof setImmediate < "u" ? setImmediate : null;
    function V(z) {
      for (var G = o(d); G !== null; ) {
        if (G.callback === null) c(d);
        else if (G.startTime <= z)
          c(d), G.sortIndex = G.expirationTime, f(S, G);
        else break;
        G = o(d);
      }
    }
    function et(z) {
      if (C = !1, V(z), !Y)
        if (o(S) !== null)
          Y = !0, J || (J = !0, I());
        else {
          var G = o(d);
          G !== null && B(et, G.startTime - z);
        }
    }
    var J = !1, $ = -1, it = 5, ct = -1;
    function Et() {
      return L ? !0 : !(i.unstable_now() - ct < it);
    }
    function tt() {
      if (L = !1, J) {
        var z = i.unstable_now();
        ct = z;
        var G = !0;
        try {
          t: {
            Y = !1, C && (C = !1, K($), $ = -1), Z = !0;
            var Q = M;
            try {
              l: {
                for (V(z), p = o(S); p !== null && !(p.expirationTime > z && Et()); ) {
                  var ft = p.callback;
                  if (typeof ft == "function") {
                    p.callback = null, M = p.priorityLevel;
                    var ot = ft(
                      p.expirationTime <= z
                    );
                    if (z = i.unstable_now(), typeof ot == "function") {
                      p.callback = ot, V(z), G = !0;
                      break l;
                    }
                    p === o(S) && c(S), V(z);
                  } else c(S);
                  p = o(S);
                }
                if (p !== null) G = !0;
                else {
                  var E = o(d);
                  E !== null && B(
                    et,
                    E.startTime - z
                  ), G = !1;
                }
              }
              break t;
            } finally {
              p = null, M = Q, Z = !1;
            }
            G = void 0;
          }
        } finally {
          G ? I() : J = !1;
        }
      }
    }
    var I;
    if (typeof k == "function")
      I = function() {
        k(tt);
      };
    else if (typeof MessageChannel < "u") {
      var dt = new MessageChannel(), at = dt.port2;
      dt.port1.onmessage = tt, I = function() {
        at.postMessage(null);
      };
    } else
      I = function() {
        F(tt, 0);
      };
    function B(z, G) {
      $ = F(function() {
        z(i.unstable_now());
      }, G);
    }
    i.unstable_IdlePriority = 5, i.unstable_ImmediatePriority = 1, i.unstable_LowPriority = 4, i.unstable_NormalPriority = 3, i.unstable_Profiling = null, i.unstable_UserBlockingPriority = 2, i.unstable_cancelCallback = function(z) {
      z.callback = null;
    }, i.unstable_forceFrameRate = function(z) {
      0 > z || 125 < z ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : it = 0 < z ? Math.floor(1e3 / z) : 5;
    }, i.unstable_getCurrentPriorityLevel = function() {
      return M;
    }, i.unstable_next = function(z) {
      switch (M) {
        case 1:
        case 2:
        case 3:
          var G = 3;
          break;
        default:
          G = M;
      }
      var Q = M;
      M = G;
      try {
        return z();
      } finally {
        M = Q;
      }
    }, i.unstable_requestPaint = function() {
      L = !0;
    }, i.unstable_runWithPriority = function(z, G) {
      switch (z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          z = 3;
      }
      var Q = M;
      M = z;
      try {
        return G();
      } finally {
        M = Q;
      }
    }, i.unstable_scheduleCallback = function(z, G, Q) {
      var ft = i.unstable_now();
      switch (typeof Q == "object" && Q !== null ? (Q = Q.delay, Q = typeof Q == "number" && 0 < Q ? ft + Q : ft) : Q = ft, z) {
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
      return ot = Q + ot, z = {
        id: b++,
        callback: G,
        priorityLevel: z,
        startTime: Q,
        expirationTime: ot,
        sortIndex: -1
      }, Q > ft ? (z.sortIndex = Q, f(d, z), o(S) === null && z === o(d) && (C ? (K($), $ = -1) : C = !0, B(et, Q - ft))) : (z.sortIndex = ot, f(S, z), Y || Z || (Y = !0, J || (J = !0, I()))), z;
    }, i.unstable_shouldYield = Et, i.unstable_wrapCallback = function(z) {
      var G = M;
      return function() {
        var Q = M;
        M = G;
        try {
          return z.apply(this, arguments);
        } finally {
          M = Q;
        }
      };
    };
  })(R0)), R0;
}
var kh;
function rg() {
  return kh || (kh = 1, D0.exports = cg()), D0.exports;
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
  var i = tr();
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
      var b = d.as, p = m(b, d.crossOrigin), M = typeof d.integrity == "string" ? d.integrity : void 0, Z = typeof d.fetchPriority == "string" ? d.fetchPriority : void 0;
      b === "style" ? c.d.S(
        S,
        typeof d.precedence == "string" ? d.precedence : void 0,
        {
          crossOrigin: p,
          integrity: M,
          fetchPriority: Z
        }
      ) : b === "script" && c.d.X(S, {
        crossOrigin: p,
        integrity: M,
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
var Ih;
function sg() {
  if (Ih) return U0.exports;
  Ih = 1;
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
var Ph;
function hg() {
  if (Ph) return Pa;
  Ph = 1;
  var i = rg(), f = tr(), o = sg();
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
  var p = Object.assign, M = Symbol.for("react.element"), Z = Symbol.for("react.transitional.element"), Y = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), L = Symbol.for("react.strict_mode"), F = Symbol.for("react.profiler"), K = Symbol.for("react.consumer"), k = Symbol.for("react.context"), V = Symbol.for("react.forward_ref"), et = Symbol.for("react.suspense"), J = Symbol.for("react.suspense_list"), $ = Symbol.for("react.memo"), it = Symbol.for("react.lazy"), ct = Symbol.for("react.activity"), Et = Symbol.for("react.memo_cache_sentinel"), tt = Symbol.iterator;
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
      case F:
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
        case k:
          return t.displayName || "Context";
        case K:
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
  var B = Array.isArray, z = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, G = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = {
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
  var w = E(null), ut = E(null), mt = E(null), zt = E(null);
  function al(t, l) {
    switch (X(mt, l), X(ut, t), X(w, null), l.nodeType) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? js(t) : 0;
        break;
      default:
        if (t = l.tagName, l = l.namespaceURI)
          l = js(l), t = Cs(l, t);
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
    U(w), X(w, t);
  }
  function Lt() {
    U(w), U(ut), U(mt);
  }
  function ua(t) {
    t.memoizedState !== null && X(zt, t);
    var l = w.current, e = Cs(l, t.type);
    l !== e && (X(ut, t), X(w, e));
  }
  function du(t) {
    ut.current === t && (U(w), U(ut)), zt.current === t && (U(zt), $a._currentValue = Q);
  }
  var nf, rr;
  function Ge(t) {
    if (nf === void 0)
      try {
        throw Error();
      } catch (e) {
        var l = e.stack.trim().match(/\n( *(at )?)/);
        nf = l && l[1] || "", rr = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + nf + t + rr;
  }
  var af = !1;
  function uf(t, l) {
    if (!t || af) return "";
    af = !0;
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
                } catch (D) {
                  var N = D;
                }
                Reflect.construct(t, [], q);
              } else {
                try {
                  q.call();
                } catch (D) {
                  N = D;
                }
                t.call(q.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (D) {
                N = D;
              }
              (q = t()) && typeof q.catch == "function" && q.catch(function() {
              });
            }
          } catch (D) {
            if (D && N && typeof D.stack == "string")
              return [D.stack, N.stack];
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
                  var R = `
` + g[n].replace(" at new ", " at ");
                  return t.displayName && R.includes("<anonymous>") && (R = R.replace("<anonymous>", t.displayName)), R;
                }
              while (1 <= n && 0 <= a);
            break;
          }
      }
    } finally {
      af = !1, Error.prepareStackTrace = e;
    }
    return (e = t ? t.displayName || t.name : "") ? Ge(e) : "";
  }
  function Ud(t, l) {
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
        return uf(t.type, !1);
      case 11:
        return uf(t.type.render, !1);
      case 1:
        return uf(t.type, !0);
      case 31:
        return Ge("Activity");
      default:
        return "";
    }
  }
  function or(t) {
    try {
      var l = "", e = null;
      do
        l += Ud(t, e), e = t, t = t.return;
      while (t);
      return l;
    } catch (n) {
      return `
Error generating stack: ` + n.message + `
` + n.stack;
    }
  }
  var ff = Object.prototype.hasOwnProperty, cf = i.unstable_scheduleCallback, rf = i.unstable_cancelCallback, jd = i.unstable_shouldYield, Cd = i.unstable_requestPaint, yl = i.unstable_now, qd = i.unstable_getCurrentPriorityLevel, sr = i.unstable_ImmediatePriority, hr = i.unstable_UserBlockingPriority, mu = i.unstable_NormalPriority, Bd = i.unstable_LowPriority, dr = i.unstable_IdlePriority, Zd = i.log, Yd = i.unstable_setDisableYieldValue, ia = null, gl = null;
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
  function mr() {
    var t = gu;
    return gu <<= 1, (gu & 62914560) === 0 && (gu = 4194304), t;
  }
  function of(t) {
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
      var R = 31 - pl(e), q = 1 << R;
      s[R] = 0, g[R] = -1;
      var N = _[R];
      if (N !== null)
        for (_[R] = null, R = 0; R < N.length; R++) {
          var D = N[R];
          D !== null && (D.lane &= -536870913);
        }
      e &= ~q;
    }
    n !== 0 && vr(t, n, 0), u !== 0 && a === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(r & ~l));
  }
  function vr(t, l, e) {
    t.pendingLanes |= l, t.suspendedLanes &= ~l;
    var n = 31 - pl(l);
    t.entangledLanes |= l, t.entanglements[n] = t.entanglements[n] | 1073741824 | e & 261930;
  }
  function yr(t, l) {
    var e = t.entangledLanes |= l;
    for (t = t.entanglements; e; ) {
      var n = 31 - pl(e), a = 1 << n;
      a & l | t[n] & l && (t[n] |= l), e &= ~a;
    }
  }
  function gr(t, l) {
    var e = l & -l;
    return e = (e & 42) !== 0 ? 1 : sf(e), (e & (t.suspendedLanes | l)) !== 0 ? 0 : e;
  }
  function sf(t) {
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
  function hf(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function pr() {
    var t = G.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : ah(t.type));
  }
  function Sr(t, l) {
    var e = G.p;
    try {
      return G.p = t, l();
    } finally {
      G.p = e;
    }
  }
  var ye = Math.random().toString(36).slice(2), It = "__reactFiber$" + ye, fl = "__reactProps$" + ye, dn = "__reactContainer$" + ye, df = "__reactEvents$" + ye, wd = "__reactListeners$" + ye, Kd = "__reactHandles$" + ye, br = "__reactResources$" + ye, ra = "__reactMarker$" + ye;
  function mf(t) {
    delete t[It], delete t[fl], delete t[df], delete t[wd], delete t[Kd];
  }
  function mn(t) {
    var l = t[It];
    if (l) return l;
    for (var e = t.parentNode; e; ) {
      if (l = e[dn] || e[It]) {
        if (e = l.alternate, l.child !== null || e !== null && e.child !== null)
          for (t = Xs(t); t !== null; ) {
            if (e = t[It]) return e;
            t = Xs(t);
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
    var l = t[br];
    return l || (l = t[br] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
  }
  function kt(t) {
    t[ra] = !0;
  }
  var Er = /* @__PURE__ */ new Set(), Ar = {};
  function Ve(t, l) {
    gn(t, l), gn(t + "Capture", l);
  }
  function gn(t, l) {
    for (Ar[t] = l, t = 0; t < l.length; t++)
      Er.add(l[t]);
  }
  var Jd = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), xr = {}, Mr = {};
  function $d(t) {
    return ff.call(Mr, t) ? !0 : ff.call(xr, t) ? !1 : Jd.test(t) ? Mr[t] = !0 : (xr[t] = !0, !1);
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
  function kl(t, l, e, n) {
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
  function vf(t) {
    if (!t._valueTracker) {
      var l = zr(t) ? "checked" : "value";
      t._valueTracker = Wd(
        t,
        l,
        "" + t[l]
      );
    }
  }
  function Tr(t) {
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
  var kd = /[\n"\\]/g;
  function Nl(t) {
    return t.replace(
      kd,
      function(l) {
        return "\\" + l.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function yf(t, l, e, n, a, u, r, s) {
    t.name = "", r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" ? t.type = r : t.removeAttribute("type"), l != null ? r === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + _l(l)) : t.value !== "" + _l(l) && (t.value = "" + _l(l)) : r !== "submit" && r !== "reset" || t.removeAttribute("value"), l != null ? gf(t, r, _l(l)) : e != null ? gf(t, r, _l(e)) : n != null && t.removeAttribute("value"), a == null && u != null && (t.defaultChecked = !!u), a != null && (t.checked = a && typeof a != "function" && typeof a != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? t.name = "" + _l(s) : t.removeAttribute("name");
  }
  function _r(t, l, e, n, a, u, r, s) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), l != null || e != null) {
      if (!(u !== "submit" && u !== "reset" || l != null)) {
        vf(t);
        return;
      }
      e = e != null ? "" + _l(e) : "", l = l != null ? "" + _l(l) : e, s || l === t.value || (t.value = l), t.defaultValue = l;
    }
    n = n ?? a, n = typeof n != "function" && typeof n != "symbol" && !!n, t.checked = s ? t.checked : !!n, t.defaultChecked = !!n, r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" && (t.name = r), vf(t);
  }
  function gf(t, l, e) {
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
  function Nr(t, l, e) {
    if (l != null && (l = "" + _l(l), l !== t.value && (t.value = l), e == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = e != null ? "" + _l(e) : "";
  }
  function Or(t, l, e, n) {
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
    e = _l(l), t.defaultValue = e, n = t.textContent, n === e && n !== "" && n !== null && (t.value = n), vf(t);
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
  var Fd = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Hr(t, l, e) {
    var n = l.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? n ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : n ? t.setProperty(l, e) : typeof e != "number" || e === 0 || Fd.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
  }
  function Dr(t, l, e) {
    if (l != null && typeof l != "object")
      throw Error(c(62));
    if (t = t.style, e != null) {
      for (var n in e)
        !e.hasOwnProperty(n) || l != null && l.hasOwnProperty(n) || (n.indexOf("--") === 0 ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "");
      for (var a in l)
        n = l[a], l.hasOwnProperty(a) && e[a] !== n && Hr(t, a, n);
    } else
      for (var u in l)
        l.hasOwnProperty(u) && Hr(t, u, l[u]);
  }
  function pf(t) {
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
  function Fl() {
  }
  var Sf = null;
  function bf(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var bn = null, En = null;
  function Rr(t) {
    var l = vn(t);
    if (l && (t = l.stateNode)) {
      var e = t[fl] || null;
      t: switch (t = l.stateNode, l.type) {
        case "input":
          if (yf(
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
                yf(
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
              n = e[l], n.form === t.form && Tr(n);
          }
          break t;
        case "textarea":
          Nr(t, e.value, e.defaultValue);
          break t;
        case "select":
          l = e.value, l != null && pn(t, !!e.multiple, l, !1);
      }
    }
  }
  var Ef = !1;
  function Ur(t, l, e) {
    if (Ef) return t(l, e);
    Ef = !0;
    try {
      var n = t(l);
      return n;
    } finally {
      if (Ef = !1, (bn !== null || En !== null) && (ri(), bn && (l = bn, t = En, En = bn = null, Rr(l), t)))
        for (l = 0; l < t.length; l++) Rr(t[l]);
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
  var Il = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Af = !1;
  if (Il)
    try {
      var ha = {};
      Object.defineProperty(ha, "passive", {
        get: function() {
          Af = !0;
        }
      }), window.addEventListener("test", ha, ha), window.removeEventListener("test", ha, ha);
    } catch {
      Af = !1;
    }
  var ge = null, xf = null, xu = null;
  function jr() {
    if (xu) return xu;
    var t, l = xf, e = l.length, n, a = "value" in ge ? ge.value : ge.textContent, u = a.length;
    for (t = 0; t < e && l[t] === a[t]; t++) ;
    var r = e - t;
    for (n = 1; n <= r && l[e - n] === a[u - n]; n++) ;
    return xu = a.slice(t, 1 < n ? 1 - n : void 0);
  }
  function Mu(t) {
    var l = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function zu() {
    return !0;
  }
  function Cr() {
    return !1;
  }
  function cl(t) {
    function l(e, n, a, u, r) {
      this._reactName = e, this._targetInst = a, this.type = n, this.nativeEvent = u, this.target = r, this.currentTarget = null;
      for (var s in t)
        t.hasOwnProperty(s) && (e = t[s], this[s] = e ? e(u) : u[s]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? zu : Cr, this.isPropagationStopped = Cr, this;
    }
    return p(l.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = zu);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = zu);
      },
      persist: function() {
      },
      isPersistent: zu
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
    getModifierState: _f,
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
  }), qr = cl(_u), l2 = p({}, _u, { dataTransfer: 0 }), e2 = cl(l2), n2 = p({}, da, { relatedTarget: 0 }), Tf = cl(n2), a2 = p({}, Qe, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), u2 = cl(a2), i2 = p({}, Qe, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), f2 = cl(i2), c2 = p({}, Qe, { data: 0 }), Br = cl(c2), r2 = {
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
  function _f() {
    return h2;
  }
  var d2 = p({}, da, {
    key: function(t) {
      if (t.key) {
        var l = r2[t.key] || t.key;
        if (l !== "Unidentified") return l;
      }
      return t.type === "keypress" ? (t = Mu(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? o2[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: _f,
    charCode: function(t) {
      return t.type === "keypress" ? Mu(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Mu(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
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
  }), Zr = cl(v2), y2 = p({}, da, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: _f
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
  }), x2 = cl(A2), M2 = [9, 13, 27, 32], Nf = Il && "CompositionEvent" in window, va = null;
  Il && "documentMode" in document && (va = document.documentMode);
  var z2 = Il && "TextEvent" in window && !va, Yr = Il && (!Nf || va && 8 < va && 11 >= va), Lr = " ", Gr = !1;
  function Xr(t, l) {
    switch (t) {
      case "keyup":
        return M2.indexOf(l.keyCode) !== -1;
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
  function Vr(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var An = !1;
  function T2(t, l) {
    switch (t) {
      case "compositionend":
        return Vr(l);
      case "keypress":
        return l.which !== 32 ? null : (Gr = !0, Lr);
      case "textInput":
        return t = l.data, t === Lr && Gr ? null : t;
      default:
        return null;
    }
  }
  function _2(t, l) {
    if (An)
      return t === "compositionend" || !Nf && Xr(t, l) ? (t = jr(), xu = xf = ge = null, An = !1, t) : null;
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
        return Yr && l.locale !== "ko" ? null : l.data;
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
  function Qr(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!N2[t.type] : l === "textarea";
  }
  function wr(t, l, e, n) {
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
    Ns(t, 0);
  }
  function Nu(t) {
    var l = oa(t);
    if (Tr(l)) return t;
  }
  function Kr(t, l) {
    if (t === "change") return l;
  }
  var Jr = !1;
  if (Il) {
    var Of;
    if (Il) {
      var Hf = "oninput" in document;
      if (!Hf) {
        var $r = document.createElement("div");
        $r.setAttribute("oninput", "return;"), Hf = typeof $r.oninput == "function";
      }
      Of = Hf;
    } else Of = !1;
    Jr = Of && (!document.documentMode || 9 < document.documentMode);
  }
  function Wr() {
    ya && (ya.detachEvent("onpropertychange", kr), ga = ya = null);
  }
  function kr(t) {
    if (t.propertyName === "value" && Nu(ga)) {
      var l = [];
      wr(
        l,
        ga,
        t,
        bf(t)
      ), Ur(O2, l);
    }
  }
  function H2(t, l, e) {
    t === "focusin" ? (Wr(), ya = l, ga = e, ya.attachEvent("onpropertychange", kr)) : t === "focusout" && Wr();
  }
  function D2(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Nu(ga);
  }
  function R2(t, l) {
    if (t === "click") return Nu(l);
  }
  function U2(t, l) {
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
      if (!ff.call(l, a) || !Sl(t[a], l[a]))
        return !1;
    }
    return !0;
  }
  function Fr(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Ir(t, l) {
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
  function Pr(t, l) {
    return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? Pr(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
  }
  function to(t) {
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
  function Df(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
  }
  var C2 = Il && "documentMode" in document && 11 >= document.documentMode, xn = null, Rf = null, Sa = null, Uf = !1;
  function lo(t, l, e) {
    var n = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    Uf || xn == null || xn !== Eu(n) || (n = xn, "selectionStart" in n && Df(n) ? n = { start: n.selectionStart, end: n.selectionEnd } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
      anchorNode: n.anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    }), Sa && pa(Sa, n) || (Sa = n, n = yi(Rf, "onSelect"), 0 < n.length && (l = new Tu(
      "onSelect",
      "select",
      null,
      l,
      e
    ), t.push({ event: l, listeners: n }), l.target = xn)));
  }
  function we(t, l) {
    var e = {};
    return e[t.toLowerCase()] = l.toLowerCase(), e["Webkit" + t] = "webkit" + l, e["Moz" + t] = "moz" + l, e;
  }
  var Mn = {
    animationend: we("Animation", "AnimationEnd"),
    animationiteration: we("Animation", "AnimationIteration"),
    animationstart: we("Animation", "AnimationStart"),
    transitionrun: we("Transition", "TransitionRun"),
    transitionstart: we("Transition", "TransitionStart"),
    transitioncancel: we("Transition", "TransitionCancel"),
    transitionend: we("Transition", "TransitionEnd")
  }, jf = {}, eo = {};
  Il && (eo = document.createElement("div").style, "AnimationEvent" in window || (delete Mn.animationend.animation, delete Mn.animationiteration.animation, delete Mn.animationstart.animation), "TransitionEvent" in window || delete Mn.transitionend.transition);
  function Ke(t) {
    if (jf[t]) return jf[t];
    if (!Mn[t]) return t;
    var l = Mn[t], e;
    for (e in l)
      if (l.hasOwnProperty(e) && e in eo)
        return jf[t] = l[e];
    return t;
  }
  var no = Ke("animationend"), ao = Ke("animationiteration"), uo = Ke("animationstart"), q2 = Ke("transitionrun"), B2 = Ke("transitionstart"), Z2 = Ke("transitioncancel"), io = Ke("transitionend"), fo = /* @__PURE__ */ new Map(), Cf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Cf.push("scrollEnd");
  function Yl(t, l) {
    fo.set(t, l), Ve(l, [t]);
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
  }, Ol = [], zn = 0, qf = 0;
  function Hu() {
    for (var t = zn, l = qf = zn = 0; l < t; ) {
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
      u !== 0 && co(e, a, u);
    }
  }
  function Du(t, l, e, n) {
    Ol[zn++] = t, Ol[zn++] = l, Ol[zn++] = e, Ol[zn++] = n, qf |= n, t.lanes |= n, t = t.alternate, t !== null && (t.lanes |= n);
  }
  function Bf(t, l, e, n) {
    return Du(t, l, e, n), Ru(t);
  }
  function Je(t, l) {
    return Du(t, null, null, l), Ru(t);
  }
  function co(t, l, e) {
    t.lanes |= e;
    var n = t.alternate;
    n !== null && (n.lanes |= e);
    for (var a = !1, u = t.return; u !== null; )
      u.childLanes |= e, n = u.alternate, n !== null && (n.childLanes |= e), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (a = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, a && l !== null && (a = 31 - pl(e), t = u.hiddenUpdates, n = t[a], n === null ? t[a] = [l] : n.push(l), l.lane = e | 536870912), u) : null;
  }
  function Ru(t) {
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
  function Zf(t) {
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
  function ro(t, l) {
    t.flags &= 65011714;
    var e = t.alternate;
    return e === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, l = e.dependencies, t.dependencies = l === null ? null : {
      lanes: l.lanes,
      firstContext: l.firstContext
    }), t;
  }
  function Uu(t, l, e, n, a, u) {
    var r = 0;
    if (n = t, typeof t == "function") Zf(t) && (r = 1);
    else if (typeof t == "string")
      r = Qm(
        t,
        e,
        w.current
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
        case F:
          return t = bl(12, e, l, a | 2), t.elementType = F, t.lanes = u, t;
        case et:
          return t = bl(13, e, l, a), t.elementType = et, t.lanes = u, t;
        case J:
          return t = bl(19, e, l, a), t.elementType = J, t.lanes = u, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case k:
                r = 10;
                break t;
              case K:
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
  function Yf(t, l, e) {
    return t = bl(6, t, null, l), t.lanes = e, t;
  }
  function oo(t) {
    var l = bl(18, null, null, 0);
    return l.stateNode = t, l;
  }
  function Lf(t, l, e) {
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
  var so = /* @__PURE__ */ new WeakMap();
  function Hl(t, l) {
    if (typeof t == "object" && t !== null) {
      var e = so.get(t);
      return e !== void 0 ? e : (l = {
        value: t,
        source: l,
        stack: or(l)
      }, so.set(t, l), l);
    }
    return {
      value: t,
      source: l,
      stack: or(l)
    };
  }
  var _n = [], Nn = 0, ju = null, ba = 0, Dl = [], Rl = 0, pe = null, Vl = 1, Ql = "";
  function te(t, l) {
    _n[Nn++] = ba, _n[Nn++] = ju, ju = t, ba = l;
  }
  function ho(t, l, e) {
    Dl[Rl++] = Vl, Dl[Rl++] = Ql, Dl[Rl++] = pe, pe = t;
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
  function Gf(t) {
    t.return !== null && (te(t, 1), ho(t, 1, 0));
  }
  function Xf(t) {
    for (; t === ju; )
      ju = _n[--Nn], _n[Nn] = null, ba = _n[--Nn], _n[Nn] = null;
    for (; t === pe; )
      pe = Dl[--Rl], Dl[Rl] = null, Ql = Dl[--Rl], Dl[Rl] = null, Vl = Dl[--Rl], Dl[Rl] = null;
  }
  function mo(t, l) {
    Dl[Rl++] = Vl, Dl[Rl++] = Ql, Dl[Rl++] = pe, Vl = l.id, Ql = l.overflow, pe = t;
  }
  var Pt = null, Ut = null, St = !1, Se = null, Ul = !1, Vf = Error(c(519));
  function be(t) {
    var l = Error(
      c(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ea(Hl(l, t)), Vf;
  }
  function vo(t) {
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
        yt("invalid", l), _r(
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
        yt("invalid", l), Or(l, n.value, n.defaultValue, n.children);
    }
    e = n.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || n.suppressHydrationWarning === !0 || Rs(l.textContent, e) ? (n.popover != null && (yt("beforetoggle", l), yt("toggle", l)), n.onScroll != null && yt("scroll", l), n.onScrollEnd != null && yt("scrollend", l), n.onClick != null && (l.onclick = Fl), l = !0) : l = !1, l || be(t, !0);
  }
  function yo(t) {
    for (Pt = t.return; Pt; )
      switch (Pt.tag) {
        case 5:
        case 31:
        case 13:
          Ul = !1;
          return;
        case 27:
        case 3:
          Ul = !0;
          return;
        default:
          Pt = Pt.return;
      }
  }
  function On(t) {
    if (t !== Pt) return !1;
    if (!St) return yo(t), St = !0, !1;
    var l = t.tag, e;
    if ((e = l !== 3 && l !== 27) && ((e = l === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || f0(t.type, t.memoizedProps)), e = !e), e && Ut && be(t), yo(t), l === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(c(317));
      Ut = Gs(t);
    } else if (l === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(c(317));
      Ut = Gs(t);
    } else
      l === 27 ? (l = Ut, je(t.type) ? (t = h0, h0 = null, Ut = t) : Ut = l) : Ut = Pt ? Cl(t.stateNode.nextSibling) : null;
    return !0;
  }
  function We() {
    Ut = Pt = null, St = !1;
  }
  function Qf() {
    var t = Se;
    return t !== null && (hl === null ? hl = t : hl.push.apply(
      hl,
      t
    ), Se = null), t;
  }
  function Ea(t) {
    Se === null ? Se = [t] : Se.push(t);
  }
  var wf = E(null), ke = null, le = null;
  function Ee(t, l, e) {
    X(wf, l._currentValue), l._currentValue = e;
  }
  function ee(t) {
    t._currentValue = wf.current, U(wf);
  }
  function Kf(t, l, e) {
    for (; t !== null; ) {
      var n = t.alternate;
      if ((t.childLanes & l) !== l ? (t.childLanes |= l, n !== null && (n.childLanes |= l)) : n !== null && (n.childLanes & l) !== l && (n.childLanes |= l), t === e) break;
      t = t.return;
    }
  }
  function Jf(t, l, e, n) {
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
      } else if (a === zt.current) {
        if (r = a.alternate, r === null) throw Error(c(387));
        r.memoizedState.memoizedState !== a.memoizedState.memoizedState && (t !== null ? t.push($a) : t = [$a]);
      }
      a = a.return;
    }
    t !== null && Jf(
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
  function Fe(t) {
    ke = t, le = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function tl(t) {
    return go(ke, t);
  }
  function qu(t, l) {
    return ke === null && Fe(t), go(t, l);
  }
  function go(t, l) {
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
  }, G2 = i.unstable_scheduleCallback, X2 = i.unstable_NormalPriority, wt = {
    $$typeof: k,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function $f() {
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
  var xa = null, Wf = 0, Dn = 0, Rn = null;
  function V2(t, l) {
    if (xa === null) {
      var e = xa = [];
      Wf = 0, Dn = Ic(), Rn = {
        status: "pending",
        value: void 0,
        then: function(n) {
          e.push(n);
        }
      };
    }
    return Wf++, l.then(po, po), l;
  }
  function po() {
    if (--Wf === 0 && xa !== null) {
      Rn !== null && (Rn.status = "fulfilled");
      var t = xa;
      xa = null, Dn = 0, Rn = null;
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
  var So = z.S;
  z.S = function(t, l) {
    es = yl(), typeof l == "object" && l !== null && typeof l.then == "function" && V2(t, l), So !== null && So(t, l);
  };
  var Ie = E(null);
  function kf() {
    var t = Ie.current;
    return t !== null ? t : Dt.pooledCache;
  }
  function Bu(t, l) {
    l === null ? X(Ie, Ie.current) : X(Ie, l.pool);
  }
  function bo() {
    var t = kf();
    return t === null ? null : { parent: wt._currentValue, pool: t };
  }
  var Un = Error(c(460)), Ff = Error(c(474)), Zu = Error(c(542)), Yu = { then: function() {
  } };
  function Eo(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Ao(t, l, e) {
    switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(Fl, Fl), l = e), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw t = l.reason, Mo(t), t;
      default:
        if (typeof l.status == "string") l.then(Fl, Fl);
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
        throw tn = l, Un;
    }
  }
  function Pe(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (tn = e, Un) : e;
    }
  }
  var tn = null;
  function xo() {
    if (tn === null) throw Error(c(459));
    var t = tn;
    return tn = null, t;
  }
  function Mo(t) {
    if (t === Un || t === Zu)
      throw Error(c(483));
  }
  var jn = null, Ma = 0;
  function Lu(t) {
    var l = Ma;
    return Ma += 1, jn === null && (jn = []), Ao(jn, t, l);
  }
  function za(t, l) {
    l = l.props.ref, t.ref = l !== void 0 ? l : null;
  }
  function Gu(t, l) {
    throw l.$$typeof === M ? Error(c(525)) : (t = Object.prototype.toString.call(l), Error(
      c(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
      )
    ));
  }
  function zo(t) {
    function l(x, A) {
      if (t) {
        var T = x.deletions;
        T === null ? (x.deletions = [A], x.flags |= 16) : T.push(A);
      }
    }
    function e(x, A) {
      if (!t) return null;
      for (; A !== null; )
        l(x, A), A = A.sibling;
      return null;
    }
    function n(x) {
      for (var A = /* @__PURE__ */ new Map(); x !== null; )
        x.key !== null ? A.set(x.key, x) : A.set(x.index, x), x = x.sibling;
      return A;
    }
    function a(x, A) {
      return x = Pl(x, A), x.index = 0, x.sibling = null, x;
    }
    function u(x, A, T) {
      return x.index = T, t ? (T = x.alternate, T !== null ? (T = T.index, T < A ? (x.flags |= 67108866, A) : T) : (x.flags |= 67108866, A)) : (x.flags |= 1048576, A);
    }
    function r(x) {
      return t && x.alternate === null && (x.flags |= 67108866), x;
    }
    function s(x, A, T, j) {
      return A === null || A.tag !== 6 ? (A = Yf(T, x.mode, j), A.return = x, A) : (A = a(A, T), A.return = x, A);
    }
    function g(x, A, T, j) {
      var lt = T.type;
      return lt === C ? R(
        x,
        A,
        T.props.children,
        j,
        T.key
      ) : A !== null && (A.elementType === lt || typeof lt == "object" && lt !== null && lt.$$typeof === it && Pe(lt) === A.type) ? (A = a(A, T.props), za(A, T), A.return = x, A) : (A = Uu(
        T.type,
        T.key,
        T.props,
        null,
        x.mode,
        j
      ), za(A, T), A.return = x, A);
    }
    function _(x, A, T, j) {
      return A === null || A.tag !== 4 || A.stateNode.containerInfo !== T.containerInfo || A.stateNode.implementation !== T.implementation ? (A = Lf(T, x.mode, j), A.return = x, A) : (A = a(A, T.children || []), A.return = x, A);
    }
    function R(x, A, T, j, lt) {
      return A === null || A.tag !== 7 ? (A = $e(
        T,
        x.mode,
        j,
        lt
      ), A.return = x, A) : (A = a(A, T), A.return = x, A);
    }
    function q(x, A, T) {
      if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint")
        return A = Yf(
          "" + A,
          x.mode,
          T
        ), A.return = x, A;
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case Z:
            return T = Uu(
              A.type,
              A.key,
              A.props,
              null,
              x.mode,
              T
            ), za(T, A), T.return = x, T;
          case Y:
            return A = Lf(
              A,
              x.mode,
              T
            ), A.return = x, A;
          case it:
            return A = Pe(A), q(x, A, T);
        }
        if (B(A) || I(A))
          return A = $e(
            A,
            x.mode,
            T,
            null
          ), A.return = x, A;
        if (typeof A.then == "function")
          return q(x, Lu(A), T);
        if (A.$$typeof === k)
          return q(
            x,
            qu(x, A),
            T
          );
        Gu(x, A);
      }
      return null;
    }
    function N(x, A, T, j) {
      var lt = A !== null ? A.key : null;
      if (typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint")
        return lt !== null ? null : s(x, A, "" + T, j);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case Z:
            return T.key === lt ? g(x, A, T, j) : null;
          case Y:
            return T.key === lt ? _(x, A, T, j) : null;
          case it:
            return T = Pe(T), N(x, A, T, j);
        }
        if (B(T) || I(T))
          return lt !== null ? null : R(x, A, T, j, null);
        if (typeof T.then == "function")
          return N(
            x,
            A,
            Lu(T),
            j
          );
        if (T.$$typeof === k)
          return N(
            x,
            A,
            qu(x, T),
            j
          );
        Gu(x, T);
      }
      return null;
    }
    function D(x, A, T, j, lt) {
      if (typeof j == "string" && j !== "" || typeof j == "number" || typeof j == "bigint")
        return x = x.get(T) || null, s(A, x, "" + j, lt);
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case Z:
            return x = x.get(
              j.key === null ? T : j.key
            ) || null, g(A, x, j, lt);
          case Y:
            return x = x.get(
              j.key === null ? T : j.key
            ) || null, _(A, x, j, lt);
          case it:
            return j = Pe(j), D(
              x,
              A,
              T,
              j,
              lt
            );
        }
        if (B(j) || I(j))
          return x = x.get(T) || null, R(A, x, j, lt, null);
        if (typeof j.then == "function")
          return D(
            x,
            A,
            T,
            Lu(j),
            lt
          );
        if (j.$$typeof === k)
          return D(
            x,
            A,
            T,
            qu(A, j),
            lt
          );
        Gu(A, j);
      }
      return null;
    }
    function W(x, A, T, j) {
      for (var lt = null, At = null, P = A, ht = A = 0, pt = null; P !== null && ht < T.length; ht++) {
        P.index > ht ? (pt = P, P = null) : pt = P.sibling;
        var xt = N(
          x,
          P,
          T[ht],
          j
        );
        if (xt === null) {
          P === null && (P = pt);
          break;
        }
        t && P && xt.alternate === null && l(x, P), A = u(xt, A, ht), At === null ? lt = xt : At.sibling = xt, At = xt, P = pt;
      }
      if (ht === T.length)
        return e(x, P), St && te(x, ht), lt;
      if (P === null) {
        for (; ht < T.length; ht++)
          P = q(x, T[ht], j), P !== null && (A = u(
            P,
            A,
            ht
          ), At === null ? lt = P : At.sibling = P, At = P);
        return St && te(x, ht), lt;
      }
      for (P = n(P); ht < T.length; ht++)
        pt = D(
          P,
          x,
          ht,
          T[ht],
          j
        ), pt !== null && (t && pt.alternate !== null && P.delete(
          pt.key === null ? ht : pt.key
        ), A = u(
          pt,
          A,
          ht
        ), At === null ? lt = pt : At.sibling = pt, At = pt);
      return t && P.forEach(function(Ye) {
        return l(x, Ye);
      }), St && te(x, ht), lt;
    }
    function nt(x, A, T, j) {
      if (T == null) throw Error(c(151));
      for (var lt = null, At = null, P = A, ht = A = 0, pt = null, xt = T.next(); P !== null && !xt.done; ht++, xt = T.next()) {
        P.index > ht ? (pt = P, P = null) : pt = P.sibling;
        var Ye = N(x, P, xt.value, j);
        if (Ye === null) {
          P === null && (P = pt);
          break;
        }
        t && P && Ye.alternate === null && l(x, P), A = u(Ye, A, ht), At === null ? lt = Ye : At.sibling = Ye, At = Ye, P = pt;
      }
      if (xt.done)
        return e(x, P), St && te(x, ht), lt;
      if (P === null) {
        for (; !xt.done; ht++, xt = T.next())
          xt = q(x, xt.value, j), xt !== null && (A = u(xt, A, ht), At === null ? lt = xt : At.sibling = xt, At = xt);
        return St && te(x, ht), lt;
      }
      for (P = n(P); !xt.done; ht++, xt = T.next())
        xt = D(P, x, ht, xt.value, j), xt !== null && (t && xt.alternate !== null && P.delete(xt.key === null ? ht : xt.key), A = u(xt, A, ht), At === null ? lt = xt : At.sibling = xt, At = xt);
      return t && P.forEach(function(lv) {
        return l(x, lv);
      }), St && te(x, ht), lt;
    }
    function Ht(x, A, T, j) {
      if (typeof T == "object" && T !== null && T.type === C && T.key === null && (T = T.props.children), typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case Z:
            t: {
              for (var lt = T.key; A !== null; ) {
                if (A.key === lt) {
                  if (lt = T.type, lt === C) {
                    if (A.tag === 7) {
                      e(
                        x,
                        A.sibling
                      ), j = a(
                        A,
                        T.props.children
                      ), j.return = x, x = j;
                      break t;
                    }
                  } else if (A.elementType === lt || typeof lt == "object" && lt !== null && lt.$$typeof === it && Pe(lt) === A.type) {
                    e(
                      x,
                      A.sibling
                    ), j = a(A, T.props), za(j, T), j.return = x, x = j;
                    break t;
                  }
                  e(x, A);
                  break;
                } else l(x, A);
                A = A.sibling;
              }
              T.type === C ? (j = $e(
                T.props.children,
                x.mode,
                j,
                T.key
              ), j.return = x, x = j) : (j = Uu(
                T.type,
                T.key,
                T.props,
                null,
                x.mode,
                j
              ), za(j, T), j.return = x, x = j);
            }
            return r(x);
          case Y:
            t: {
              for (lt = T.key; A !== null; ) {
                if (A.key === lt)
                  if (A.tag === 4 && A.stateNode.containerInfo === T.containerInfo && A.stateNode.implementation === T.implementation) {
                    e(
                      x,
                      A.sibling
                    ), j = a(A, T.children || []), j.return = x, x = j;
                    break t;
                  } else {
                    e(x, A);
                    break;
                  }
                else l(x, A);
                A = A.sibling;
              }
              j = Lf(T, x.mode, j), j.return = x, x = j;
            }
            return r(x);
          case it:
            return T = Pe(T), Ht(
              x,
              A,
              T,
              j
            );
        }
        if (B(T))
          return W(
            x,
            A,
            T,
            j
          );
        if (I(T)) {
          if (lt = I(T), typeof lt != "function") throw Error(c(150));
          return T = lt.call(T), nt(
            x,
            A,
            T,
            j
          );
        }
        if (typeof T.then == "function")
          return Ht(
            x,
            A,
            Lu(T),
            j
          );
        if (T.$$typeof === k)
          return Ht(
            x,
            A,
            qu(x, T),
            j
          );
        Gu(x, T);
      }
      return typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint" ? (T = "" + T, A !== null && A.tag === 6 ? (e(x, A.sibling), j = a(A, T), j.return = x, x = j) : (e(x, A), j = Yf(T, x.mode, j), j.return = x, x = j), r(x)) : e(x, A);
    }
    return function(x, A, T, j) {
      try {
        Ma = 0;
        var lt = Ht(
          x,
          A,
          T,
          j
        );
        return jn = null, lt;
      } catch (P) {
        if (P === Un || P === Zu) throw P;
        var At = bl(29, P, null, x.mode);
        return At.lanes = j, At.return = x, At;
      } finally {
      }
    };
  }
  var ln = zo(!0), To = zo(!1), Ae = !1;
  function If(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Pf(t, l) {
    t = t.updateQueue, l.updateQueue === t && (l.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function xe(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Me(t, l, e) {
    var n = t.updateQueue;
    if (n === null) return null;
    if (n = n.shared, (Mt & 2) !== 0) {
      var a = n.pending;
      return a === null ? l.next = l : (l.next = a.next, a.next = l), n.pending = l, l = Ru(t), co(t, null, e), l;
    }
    return Du(t, n, l, e), Ru(t);
  }
  function Ta(t, l, e) {
    if (l = l.updateQueue, l !== null && (l = l.shared, (e & 4194048) !== 0)) {
      var n = l.lanes;
      n &= t.pendingLanes, e |= n, l.lanes = e, yr(t, e);
    }
  }
  function tc(t, l) {
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
  var lc = !1;
  function _a() {
    if (lc) {
      var t = Rn;
      if (t !== null) throw t;
    }
  }
  function Na(t, l, e, n) {
    lc = !1;
    var a = t.updateQueue;
    Ae = !1;
    var u = a.firstBaseUpdate, r = a.lastBaseUpdate, s = a.shared.pending;
    if (s !== null) {
      a.shared.pending = null;
      var g = s, _ = g.next;
      g.next = null, r === null ? u = _ : r.next = _, r = g;
      var R = t.alternate;
      R !== null && (R = R.updateQueue, s = R.lastBaseUpdate, s !== r && (s === null ? R.firstBaseUpdate = _ : s.next = _, R.lastBaseUpdate = g));
    }
    if (u !== null) {
      var q = a.baseState;
      r = 0, R = _ = g = null, s = u;
      do {
        var N = s.lane & -536870913, D = N !== s.lane;
        if (D ? (gt & N) === N : (n & N) === N) {
          N !== 0 && N === Dn && (lc = !0), R !== null && (R = R.next = {
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
          N = s.callback, N !== null && (t.flags |= 64, D && (t.flags |= 8192), D = a.callbacks, D === null ? a.callbacks = [N] : D.push(N));
        } else
          D = {
            lane: N,
            tag: s.tag,
            payload: s.payload,
            callback: s.callback,
            next: null
          }, R === null ? (_ = R = D, g = q) : R = R.next = D, r |= N;
        if (s = s.next, s === null) {
          if (s = a.shared.pending, s === null)
            break;
          D = s, s = D.next, D.next = null, a.lastBaseUpdate = D, a.shared.pending = null;
        }
      } while (!0);
      R === null && (g = q), a.baseState = g, a.firstBaseUpdate = _, a.lastBaseUpdate = R, u === null && (a.shared.lanes = 0), Oe |= r, t.lanes = r, t.memoizedState = q;
    }
  }
  function _o(t, l) {
    if (typeof t != "function")
      throw Error(c(191, t));
    t.call(l);
  }
  function No(t, l) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        _o(e[t], l);
  }
  var Cn = E(null), Xu = E(0);
  function Oo(t, l) {
    t = se, X(Xu, t), X(Cn, l), se = t | l.baseLanes;
  }
  function ec() {
    X(Xu, se), X(Cn, Cn.current);
  }
  function nc() {
    se = Xu.current, U(Cn), U(Xu);
  }
  var El = E(null), jl = null;
  function ze(t) {
    var l = t.alternate;
    X(Gt, Gt.current & 1), X(El, t), jl === null && (l === null || Cn.current !== null || l.memoizedState !== null) && (jl = t);
  }
  function ac(t) {
    X(Gt, Gt.current), X(El, t), jl === null && (jl = t);
  }
  function Ho(t) {
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
        if (e !== null && (e = e.dehydrated, e === null || o0(e) || s0(e)))
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
  var ne = 0, st = null, Nt = null, Kt = null, Qu = !1, qn = !1, en = !1, wu = 0, Oa = 0, Bn = null, w2 = 0;
  function Zt() {
    throw Error(c(321));
  }
  function uc(t, l) {
    if (l === null) return !1;
    for (var e = 0; e < l.length && e < t.length; e++)
      if (!Sl(t[e], l[e])) return !1;
    return !0;
  }
  function ic(t, l, e, n, a, u) {
    return ne = u, st = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, z.H = t === null || t.memoizedState === null ? d1 : Ec, en = !1, u = e(n, a), en = !1, qn && (u = Ro(
      l,
      e,
      n,
      a
    )), Do(t), u;
  }
  function Do(t) {
    z.H = Ra;
    var l = Nt !== null && Nt.next !== null;
    if (ne = 0, Kt = Nt = st = null, Qu = !1, Oa = 0, Bn = null, l) throw Error(c(300));
    t === null || Jt || (t = t.dependencies, t !== null && Cu(t) && (Jt = !0));
  }
  function Ro(t, l, e, n) {
    st = t;
    var a = 0;
    do {
      if (qn && (Bn = null), Oa = 0, qn = !1, 25 <= a) throw Error(c(301));
      if (a += 1, Kt = Nt = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      z.H = m1, u = l(e, n);
    } while (qn);
    return u;
  }
  function K2() {
    var t = z.H, l = t.useState()[0];
    return l = typeof l.then == "function" ? Ha(l) : l, t = t.useState()[0], (Nt !== null ? Nt.memoizedState : null) !== t && (st.flags |= 1024), l;
  }
  function fc() {
    var t = wu !== 0;
    return wu = 0, t;
  }
  function cc(t, l, e) {
    l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
  }
  function rc(t) {
    if (Qu) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        l !== null && (l.pending = null), t = t.next;
      }
      Qu = !1;
    }
    ne = 0, Kt = Nt = st = null, qn = !1, Oa = wu = 0, Bn = null;
  }
  function ul() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Kt === null ? st.memoizedState = Kt = t : Kt = Kt.next = t, Kt;
  }
  function Xt() {
    if (Nt === null) {
      var t = st.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Nt.next;
    var l = Kt === null ? st.memoizedState : Kt.next;
    if (l !== null)
      Kt = l, Nt = t;
    else {
      if (t === null)
        throw st.alternate === null ? Error(c(467)) : Error(c(310));
      Nt = t, t = {
        memoizedState: Nt.memoizedState,
        baseState: Nt.baseState,
        baseQueue: Nt.baseQueue,
        queue: Nt.queue,
        next: null
      }, Kt === null ? st.memoizedState = Kt = t : Kt = Kt.next = t;
    }
    return Kt;
  }
  function Ku() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ha(t) {
    var l = Oa;
    return Oa += 1, Bn === null && (Bn = []), t = Ao(Bn, t, l), l = st, (Kt === null ? l.memoizedState : Kt.next) === null && (l = l.alternate, z.H = l === null || l.memoizedState === null ? d1 : Ec), t;
  }
  function Ju(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Ha(t);
      if (t.$$typeof === k) return tl(t);
    }
    throw Error(c(438, String(t)));
  }
  function oc(t) {
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
    if (l == null && (l = { data: [], index: 0 }), e === null && (e = Ku(), st.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
      for (e = l.data[l.index] = Array(t), n = 0; n < t; n++)
        e[n] = Et;
    return l.index++, e;
  }
  function ae(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function $u(t) {
    var l = Xt();
    return sc(l, Nt, t);
  }
  function sc(t, l, e) {
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
      var s = r = null, g = null, _ = l, R = !1;
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
            }), q === Dn && (R = !0);
          else if ((ne & N) === N) {
            _ = _.next, N === Dn && (R = !0);
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
      if (g === null ? r = u : g.next = s, !Sl(u, t.memoizedState) && (Jt = !0, R && (e = Rn, e !== null)))
        throw e;
      t.memoizedState = u, t.baseState = r, t.baseQueue = g, n.lastRenderedState = u;
    }
    return a === null && (n.lanes = 0), [t.memoizedState, n.dispatch];
  }
  function hc(t) {
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
    if (r && (a.memoizedState = e, Jt = !0), a = a.queue, vc(qo.bind(null, n, a, t), [
      t
    ]), a.getSnapshot !== l || r || Kt !== null && Kt.memoizedState.tag & 1) {
      if (n.flags |= 2048, Zn(
        9,
        { destroy: void 0 },
        Co.bind(
          null,
          n,
          a,
          e,
          l
        ),
        null
      ), Dt === null) throw Error(c(349));
      u || (ne & 127) !== 0 || jo(n, l, e);
    }
    return e;
  }
  function jo(t, l, e) {
    t.flags |= 16384, t = { getSnapshot: l, value: e }, l = st.updateQueue, l === null ? (l = Ku(), st.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
  }
  function Co(t, l, e, n) {
    l.value = e, l.getSnapshot = n, Bo(l) && Zo(t);
  }
  function qo(t, l, e) {
    return e(function() {
      Bo(l) && Zo(t);
    });
  }
  function Bo(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var e = l();
      return !Sl(t, e);
    } catch {
      return !0;
    }
  }
  function Zo(t) {
    var l = Je(t, 2);
    l !== null && dl(l, t, 2);
  }
  function dc(t) {
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
  function Yo(t, l, e, n) {
    return t.baseState = e, sc(
      t,
      Nt,
      typeof n == "function" ? n : ae
    );
  }
  function J2(t, l, e, n, a) {
    if (Fu(t)) throw Error(c(485));
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
      z.T !== null ? e(!0) : u.isTransition = !1, n(u), e = l.pending, e === null ? (u.next = l.pending = u, Lo(l, u)) : (u.next = e.next, l.pending = e.next = u);
    }
  }
  function Lo(t, l) {
    var e = l.action, n = l.payload, a = t.state;
    if (l.isTransition) {
      var u = z.T, r = {};
      z.T = r;
      try {
        var s = e(a, n), g = z.S;
        g !== null && g(r, s), Go(t, l, s);
      } catch (_) {
        mc(t, l, _);
      } finally {
        u !== null && r.types !== null && (u.types = r.types), z.T = u;
      }
    } else
      try {
        u = e(a, n), Go(t, l, u);
      } catch (_) {
        mc(t, l, _);
      }
  }
  function Go(t, l, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(n) {
        Xo(t, l, n);
      },
      function(n) {
        return mc(t, l, n);
      }
    ) : Xo(t, l, e);
  }
  function Xo(t, l, e) {
    l.status = "fulfilled", l.value = e, Vo(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, Lo(t, e)));
  }
  function mc(t, l, e) {
    var n = t.pending;
    if (t.pending = null, n !== null) {
      n = n.next;
      do
        l.status = "rejected", l.reason = e, Vo(l), l = l.next;
      while (l !== n);
    }
    t.action = null;
  }
  function Vo(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function Qo(t, l) {
    return l;
  }
  function wo(t, l) {
    if (St) {
      var e = Dt.formState;
      if (e !== null) {
        t: {
          var n = st;
          if (St) {
            if (Ut) {
              l: {
                for (var a = Ut, u = Ul; a.nodeType !== 8; ) {
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
                Ut = Cl(
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
      lastRenderedReducer: Qo,
      lastRenderedState: l
    }, e.queue = n, e = o1.bind(
      null,
      st,
      n
    ), n.dispatch = e, n = dc(!1), u = bc.bind(
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
    return Jo(l, Nt, t);
  }
  function Jo(t, l, e) {
    if (l = sc(
      t,
      l,
      Qo
    )[0], t = $u(ae)[0], typeof l == "object" && l !== null && typeof l.then == "function")
      try {
        var n = Ha(l);
      } catch (r) {
        throw r === Un ? Zu : r;
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
  function $o(t) {
    var l = Xt(), e = Nt;
    if (e !== null)
      return Jo(l, e, t);
    Xt(), l = l.memoizedState, e = Xt();
    var n = e.queue.dispatch;
    return e.memoizedState = t, [l, n, !1];
  }
  function Zn(t, l, e, n) {
    return t = { tag: t, create: e, deps: n, inst: l, next: null }, l = st.updateQueue, l === null && (l = Ku(), st.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (n = e.next, e.next = t, t.next = n, l.lastEffect = t), t;
  }
  function Wo() {
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
  function ku(t, l, e, n) {
    var a = Xt();
    n = n === void 0 ? null : n;
    var u = a.memoizedState.inst;
    Nt !== null && n !== null && uc(n, Nt.memoizedState.deps) ? a.memoizedState = Zn(l, u, e, n) : (st.flags |= t, a.memoizedState = Zn(
      1 | l,
      u,
      e,
      n
    ));
  }
  function ko(t, l) {
    Wu(8390656, 8, t, l);
  }
  function vc(t, l) {
    ku(2048, 8, t, l);
  }
  function W2(t) {
    st.flags |= 4;
    var l = st.updateQueue;
    if (l === null)
      l = Ku(), st.updateQueue = l, l.events = [t];
    else {
      var e = l.events;
      e === null ? l.events = [t] : e.push(t);
    }
  }
  function Fo(t) {
    var l = Xt().memoizedState;
    return W2({ ref: l, nextImpl: t }), function() {
      if ((Mt & 2) !== 0) throw Error(c(440));
      return l.impl.apply(void 0, arguments);
    };
  }
  function Io(t, l) {
    return ku(4, 2, t, l);
  }
  function Po(t, l) {
    return ku(4, 4, t, l);
  }
  function t1(t, l) {
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
  function l1(t, l, e) {
    e = e != null ? e.concat([t]) : null, ku(4, 4, t1.bind(null, l, t), e);
  }
  function yc() {
  }
  function e1(t, l) {
    var e = Xt();
    l = l === void 0 ? null : l;
    var n = e.memoizedState;
    return l !== null && uc(l, n[1]) ? n[0] : (e.memoizedState = [t, l], t);
  }
  function n1(t, l) {
    var e = Xt();
    l = l === void 0 ? null : l;
    var n = e.memoizedState;
    if (l !== null && uc(l, n[1]))
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
  function gc(t, l, e) {
    return e === void 0 || (ne & 1073741824) !== 0 && (gt & 261930) === 0 ? t.memoizedState = l : (t.memoizedState = e, t = as(), st.lanes |= t, Oe |= t, e);
  }
  function a1(t, l, e, n) {
    return Sl(e, l) ? e : Cn.current !== null ? (t = gc(t, e, n), Sl(t, l) || (Jt = !0), t) : (ne & 42) === 0 || (ne & 1073741824) !== 0 && (gt & 261930) === 0 ? (Jt = !0, t.memoizedState = e) : (t = as(), st.lanes |= t, Oe |= t, l);
  }
  function u1(t, l, e, n, a) {
    var u = G.p;
    G.p = u !== 0 && 8 > u ? u : 8;
    var r = z.T, s = {};
    z.T = s, bc(t, !1, l, e);
    try {
      var g = a(), _ = z.S;
      if (_ !== null && _(s, g), g !== null && typeof g == "object" && typeof g.then == "function") {
        var R = Q2(
          g,
          n
        );
        Da(
          t,
          l,
          R,
          zl(t)
        );
      } else
        Da(
          t,
          l,
          n,
          zl(t)
        );
    } catch (q) {
      Da(
        t,
        l,
        { then: function() {
        }, status: "rejected", reason: q },
        zl()
      );
    } finally {
      G.p = u, r !== null && s.types !== null && (r.types = s.types), z.T = r;
    }
  }
  function k2() {
  }
  function pc(t, l, e, n) {
    if (t.tag !== 5) throw Error(c(476));
    var a = i1(t).queue;
    u1(
      t,
      a,
      l,
      Q,
      e === null ? k2 : function() {
        return f1(t), e(n);
      }
    );
  }
  function i1(t) {
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
  function f1(t) {
    var l = i1(t);
    l.next === null && (l = t.alternate.memoizedState), Da(
      t,
      l.next.queue,
      {},
      zl()
    );
  }
  function Sc() {
    return tl($a);
  }
  function c1() {
    return Xt().memoizedState;
  }
  function r1() {
    return Xt().memoizedState;
  }
  function F2(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var e = zl();
          t = xe(e);
          var n = Me(l, t, e);
          n !== null && (dl(n, l, e), Ta(n, l, e)), l = { cache: $f() }, t.payload = l;
          return;
      }
      l = l.return;
    }
  }
  function I2(t, l, e) {
    var n = zl();
    e = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Fu(t) ? s1(l, e) : (e = Bf(t, l, e, n), e !== null && (dl(e, t, n), h1(e, l, n)));
  }
  function o1(t, l, e) {
    var n = zl();
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
    if (Fu(t)) s1(l, a);
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
      if (e = Bf(t, l, a, n), e !== null)
        return dl(e, t, n), h1(e, l, n), !0;
    }
    return !1;
  }
  function bc(t, l, e, n) {
    if (n = {
      lane: 2,
      revertLane: Ic(),
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Fu(t)) {
      if (l) throw Error(c(479));
    } else
      l = Bf(
        t,
        e,
        n,
        2
      ), l !== null && dl(l, t, 2);
  }
  function Fu(t) {
    var l = t.alternate;
    return t === st || l !== null && l === st;
  }
  function s1(t, l) {
    qn = Qu = !0;
    var e = t.pending;
    e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
  }
  function h1(t, l, e) {
    if ((e & 4194048) !== 0) {
      var n = l.lanes;
      n &= t.pendingLanes, e |= n, l.lanes = e, yr(t, e);
    }
  }
  var Ra = {
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
  Ra.useEffectEvent = Zt;
  var d1 = {
    readContext: tl,
    use: Ju,
    useCallback: function(t, l) {
      return ul().memoizedState = [
        t,
        l === void 0 ? null : l
      ], t;
    },
    useContext: tl,
    useEffect: ko,
    useImperativeHandle: function(t, l, e) {
      e = e != null ? e.concat([t]) : null, Wu(
        4194308,
        4,
        t1.bind(null, l, t),
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
      t = dc(t);
      var l = t.queue, e = o1.bind(null, st, l);
      return l.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: yc,
    useDeferredValue: function(t, l) {
      var e = ul();
      return gc(e, t, l);
    },
    useTransition: function() {
      var t = dc(!1);
      return t = u1.bind(
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
        (gt & 127) !== 0 || jo(n, l, e);
      }
      a.memoizedState = e;
      var u = { value: e, getSnapshot: l };
      return a.queue = u, ko(qo.bind(null, n, u, t), [
        t
      ]), n.flags |= 2048, Zn(
        9,
        { destroy: void 0 },
        Co.bind(
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
        e = (n & ~(1 << 32 - pl(n) - 1)).toString(32) + e, l = "_" + l + "R_" + e, e = wu++, 0 < e && (l += "H" + e.toString(32)), l += "_";
      } else
        e = w2++, l = "_" + l + "r_" + e.toString(32) + "_";
      return t.memoizedState = l;
    },
    useHostTransitionStatus: Sc,
    useFormState: wo,
    useActionState: wo,
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
      return l.queue = e, l = bc.bind(
        null,
        st,
        !0,
        e
      ), e.dispatch = l, [t, l];
    },
    useMemoCache: oc,
    useCacheRefresh: function() {
      return ul().memoizedState = F2.bind(
        null,
        st
      );
    },
    useEffectEvent: function(t) {
      var l = ul(), e = { impl: t };
      return l.memoizedState = e, function() {
        if ((Mt & 2) !== 0)
          throw Error(c(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, Ec = {
    readContext: tl,
    use: Ju,
    useCallback: e1,
    useContext: tl,
    useEffect: vc,
    useImperativeHandle: l1,
    useInsertionEffect: Io,
    useLayoutEffect: Po,
    useMemo: n1,
    useReducer: $u,
    useRef: Wo,
    useState: function() {
      return $u(ae);
    },
    useDebugValue: yc,
    useDeferredValue: function(t, l) {
      var e = Xt();
      return a1(
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
    useId: c1,
    useHostTransitionStatus: Sc,
    useFormState: Ko,
    useActionState: Ko,
    useOptimistic: function(t, l) {
      var e = Xt();
      return Yo(e, Nt, t, l);
    },
    useMemoCache: oc,
    useCacheRefresh: r1
  };
  Ec.useEffectEvent = Fo;
  var m1 = {
    readContext: tl,
    use: Ju,
    useCallback: e1,
    useContext: tl,
    useEffect: vc,
    useImperativeHandle: l1,
    useInsertionEffect: Io,
    useLayoutEffect: Po,
    useMemo: n1,
    useReducer: hc,
    useRef: Wo,
    useState: function() {
      return hc(ae);
    },
    useDebugValue: yc,
    useDeferredValue: function(t, l) {
      var e = Xt();
      return Nt === null ? gc(e, t, l) : a1(
        e,
        Nt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = hc(ae)[0], l = Xt().memoizedState;
      return [
        typeof t == "boolean" ? t : Ha(t),
        l
      ];
    },
    useSyncExternalStore: Uo,
    useId: c1,
    useHostTransitionStatus: Sc,
    useFormState: $o,
    useActionState: $o,
    useOptimistic: function(t, l) {
      var e = Xt();
      return Nt !== null ? Yo(e, Nt, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: oc,
    useCacheRefresh: r1
  };
  m1.useEffectEvent = Fo;
  function Ac(t, l, e, n) {
    l = t.memoizedState, e = e(n, l), e = e == null ? l : p({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
  }
  var xc = {
    enqueueSetState: function(t, l, e) {
      t = t._reactInternals;
      var n = zl(), a = xe(n);
      a.payload = l, e != null && (a.callback = e), l = Me(t, a, n), l !== null && (dl(l, t, n), Ta(l, t, n));
    },
    enqueueReplaceState: function(t, l, e) {
      t = t._reactInternals;
      var n = zl(), a = xe(n);
      a.tag = 1, a.payload = l, e != null && (a.callback = e), l = Me(t, a, n), l !== null && (dl(l, t, n), Ta(l, t, n));
    },
    enqueueForceUpdate: function(t, l) {
      t = t._reactInternals;
      var e = zl(), n = xe(e);
      n.tag = 2, l != null && (n.callback = l), l = Me(t, n, e), l !== null && (dl(l, t, e), Ta(l, t, e));
    }
  };
  function v1(t, l, e, n, a, u, r) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(n, u, r) : l.prototype && l.prototype.isPureReactComponent ? !pa(e, n) || !pa(a, u) : !0;
  }
  function y1(t, l, e, n) {
    t = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(e, n), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(e, n), l.state !== t && xc.enqueueReplaceState(l, l.state, null);
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
  function g1(t) {
    Ou(t);
  }
  function p1(t) {
    console.error(t);
  }
  function S1(t) {
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
  function b1(t, l, e) {
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
    return e = xe(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      Iu(t, l);
    }, e;
  }
  function E1(t) {
    return t = xe(t), t.tag = 3, t;
  }
  function A1(t, l, e, n) {
    var a = e.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var u = n.value;
      t.payload = function() {
        return a(u);
      }, t.callback = function() {
        b1(l, e, n);
      };
    }
    var r = e.stateNode;
    r !== null && typeof r.componentDidCatch == "function" && (t.callback = function() {
      b1(l, e, n), typeof a != "function" && (He === null ? He = /* @__PURE__ */ new Set([this]) : He.add(this));
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
            return jl === null ? oi() : e.alternate === null && Yt === 0 && (Yt = 3), e.flags &= -257, e.flags |= 65536, e.lanes = a, n === Yu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([n]) : l.add(n), Wc(t, n, a)), !1;
          case 22:
            return e.flags |= 65536, n === Yu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([n])
            }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([n]) : e.add(n)), Wc(t, n, a)), !1;
        }
        throw Error(c(435, e.tag));
      }
      return Wc(t, n, a), oi(), !1;
    }
    if (St)
      return l = El.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = a, n !== Vf && (t = Error(c(422), { cause: n }), Ea(Hl(t, e)))) : (n !== Vf && (l = Error(c(423), {
        cause: n
      }), Ea(
        Hl(l, e)
      )), t = t.current.alternate, t.flags |= 65536, a &= -a, t.lanes |= a, n = Hl(n, e), a = Mc(
        t.stateNode,
        n,
        a
      ), tc(t, a), Yt !== 4 && (Yt = 2)), !1;
    var u = Error(c(520), { cause: n });
    if (u = Hl(u, e), La === null ? La = [u] : La.push(u), Yt !== 4 && (Yt = 2), l === null) return !0;
    n = Hl(n, e), e = l;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = a & -a, e.lanes |= t, t = Mc(e.stateNode, n, t), tc(e, t), !1;
        case 1:
          if (l = e.type, u = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (He === null || !He.has(u))))
            return e.flags |= 65536, a &= -a, e.lanes |= a, a = E1(a), A1(
              a,
              t,
              e,
              n
            ), tc(e, a), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var zc = Error(c(461)), Jt = !1;
  function ll(t, l, e, n) {
    l.child = t === null ? To(l, null, e, n) : ln(
      l,
      t.child,
      e,
      n
    );
  }
  function x1(t, l, e, n, a) {
    e = e.render;
    var u = l.ref;
    if ("ref" in n) {
      var r = {};
      for (var s in n)
        s !== "ref" && (r[s] = n[s]);
    } else r = n;
    return Fe(l), n = ic(
      t,
      l,
      e,
      r,
      u,
      a
    ), s = fc(), t !== null && !Jt ? (cc(t, l, a), ue(t, l, a)) : (St && s && Gf(l), l.flags |= 1, ll(t, l, n, a), l.child);
  }
  function M1(t, l, e, n, a) {
    if (t === null) {
      var u = e.type;
      return typeof u == "function" && !Zf(u) && u.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = u, z1(
        t,
        l,
        u,
        n,
        a
      )) : (t = Uu(
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
    return Tc(
      t,
      l,
      e,
      n,
      a
    );
  }
  function T1(t, l, e, n) {
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
        return _1(
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
        ), u !== null ? Oo(l, u) : ec(), Ho(l);
      else
        return n = l.lanes = 536870912, _1(
          t,
          l,
          u !== null ? u.baseLanes | e : e,
          e,
          n
        );
    } else
      u !== null ? (Bu(l, u.cachePool), Oo(l, u), Te(), l.memoizedState = null) : (t !== null && Bu(l, null), ec(), Te());
    return ll(t, l, a, e), l.child;
  }
  function Ua(t, l) {
    return t !== null && t.tag === 22 || l.stateNode !== null || (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.sibling;
  }
  function _1(t, l, e, n, a) {
    var u = kf();
    return u = u === null ? null : { parent: wt._currentValue, pool: u }, l.memoizedState = {
      baseLanes: e,
      cachePool: u
    }, t !== null && Bu(l, null), ec(), Ho(l), t !== null && Hn(t, l, n, !0), l.childLanes = a, null;
  }
  function Pu(t, l) {
    return l = li(
      { mode: l.mode, children: l.children },
      t.mode
    ), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function N1(t, l, e) {
    return ln(l, t.child, null, e), t = Pu(l, l.pendingProps), t.flags |= 2, Al(l), l.memoizedState = null, t;
  }
  function tm(t, l, e) {
    var n = l.pendingProps, a = (l.flags & 128) !== 0;
    if (l.flags &= -129, t === null) {
      if (St) {
        if (n.mode === "hidden")
          return t = Pu(l, n), l.lanes = 536870912, Ua(null, t);
        if (ac(l), (t = Ut) ? (t = Ls(
          t,
          Ul
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: pe !== null ? { id: Vl, overflow: Ql } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = oo(t), e.return = l, l.child = e, Pt = l, Ut = null)) : t = null, t === null) throw be(l);
        return l.lanes = 536870912, null;
      }
      return Pu(l, n);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var r = u.dehydrated;
      if (ac(l), a)
        if (l.flags & 256)
          l.flags &= -257, l = N1(
            t,
            l,
            e
          );
        else if (l.memoizedState !== null)
          l.child = t.child, l.flags |= 128, l = null;
        else throw Error(c(558));
      else if (Jt || Hn(t, l, e, !1), a = (e & t.childLanes) !== 0, Jt || a) {
        if (n = Dt, n !== null && (r = gr(n, e), r !== 0 && r !== u.retryLane))
          throw u.retryLane = r, Je(t, r), dl(n, t, r), zc;
        oi(), l = N1(
          t,
          l,
          e
        );
      } else
        t = u.treeContext, Ut = Cl(r.nextSibling), Pt = l, St = !0, Se = null, Ul = !1, t !== null && mo(l, t), l = Pu(l, n), l.flags |= 4096;
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
  function Tc(t, l, e, n, a) {
    return Fe(l), e = ic(
      t,
      l,
      e,
      n,
      void 0,
      a
    ), n = fc(), t !== null && !Jt ? (cc(t, l, a), ue(t, l, a)) : (St && n && Gf(l), l.flags |= 1, ll(t, l, e, a), l.child);
  }
  function O1(t, l, e, n, a, u) {
    return Fe(l), l.updateQueue = null, e = Ro(
      l,
      n,
      e,
      a
    ), Do(t), n = fc(), t !== null && !Jt ? (cc(t, l, u), ue(t, l, u)) : (St && n && Gf(l), l.flags |= 1, ll(t, l, e, u), l.child);
  }
  function H1(t, l, e, n, a) {
    if (Fe(l), l.stateNode === null) {
      var u = Tn, r = e.contextType;
      typeof r == "object" && r !== null && (u = tl(r)), u = new e(n, u), l.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = xc, l.stateNode = u, u._reactInternals = l, u = l.stateNode, u.props = n, u.state = l.memoizedState, u.refs = {}, If(l), r = e.contextType, u.context = typeof r == "object" && r !== null ? tl(r) : Tn, u.state = l.memoizedState, r = e.getDerivedStateFromProps, typeof r == "function" && (Ac(
        l,
        e,
        r,
        n
      ), u.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (r = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), r !== u.state && xc.enqueueReplaceState(u, u.state, null), Na(l, n, u, a), _a(), u.state = l.memoizedState), typeof u.componentDidMount == "function" && (l.flags |= 4194308), n = !0;
    } else if (t === null) {
      u = l.stateNode;
      var s = l.memoizedProps, g = nn(e, s);
      u.props = g;
      var _ = u.context, R = e.contextType;
      r = Tn, typeof R == "object" && R !== null && (r = tl(R));
      var q = e.getDerivedStateFromProps;
      R = typeof q == "function" || typeof u.getSnapshotBeforeUpdate == "function", s = l.pendingProps !== s, R || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (s || _ !== r) && y1(
        l,
        u,
        n,
        r
      ), Ae = !1;
      var N = l.memoizedState;
      u.state = N, Na(l, n, u, a), _a(), _ = l.memoizedState, s || N !== _ || Ae ? (typeof q == "function" && (Ac(
        l,
        e,
        q,
        n
      ), _ = l.memoizedState), (g = Ae || v1(
        l,
        e,
        g,
        n,
        N,
        _,
        r
      )) ? (R || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = n, l.memoizedState = _), u.props = n, u.state = _, u.context = r, n = g) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), n = !1);
    } else {
      u = l.stateNode, Pf(t, l), r = l.memoizedProps, R = nn(e, r), u.props = R, q = l.pendingProps, N = u.context, _ = e.contextType, g = Tn, typeof _ == "object" && _ !== null && (g = tl(_)), s = e.getDerivedStateFromProps, (_ = typeof s == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (r !== q || N !== g) && y1(
        l,
        u,
        n,
        g
      ), Ae = !1, N = l.memoizedState, u.state = N, Na(l, n, u, a), _a();
      var D = l.memoizedState;
      r !== q || N !== D || Ae || t !== null && t.dependencies !== null && Cu(t.dependencies) ? (typeof s == "function" && (Ac(
        l,
        e,
        s,
        n
      ), D = l.memoizedState), (R = Ae || v1(
        l,
        e,
        R,
        n,
        N,
        D,
        g
      ) || t !== null && t.dependencies !== null && Cu(t.dependencies)) ? (_ || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(n, D, g), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        n,
        D,
        g
      )), typeof u.componentDidUpdate == "function" && (l.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || r === t.memoizedProps && N === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || r === t.memoizedProps && N === t.memoizedState || (l.flags |= 1024), l.memoizedProps = n, l.memoizedState = D), u.props = n, u.state = D, u.context = g, n = R) : (typeof u.componentDidUpdate != "function" || r === t.memoizedProps && N === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || r === t.memoizedProps && N === t.memoizedState || (l.flags |= 1024), n = !1);
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
  function D1(t, l, e, n) {
    return We(), l.flags |= 256, ll(t, l, e, n), l.child;
  }
  var _c = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Nc(t) {
    return { baseLanes: t, cachePool: bo() };
  }
  function Oc(t, l, e) {
    return t = t !== null ? t.childLanes & ~e : 0, l && (t |= Ml), t;
  }
  function R1(t, l, e) {
    var n = l.pendingProps, a = !1, u = (l.flags & 128) !== 0, r;
    if ((r = u) || (r = t !== null && t.memoizedState === null ? !1 : (Gt.current & 2) !== 0), r && (a = !0, l.flags &= -129), r = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
      if (St) {
        if (a ? ze(l) : Te(), (t = Ut) ? (t = Ls(
          t,
          Ul
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: pe !== null ? { id: Vl, overflow: Ql } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = oo(t), e.return = l, l.child = e, Pt = l, Ut = null)) : t = null, t === null) throw be(l);
        return s0(t) ? l.lanes = 32 : l.lanes = 536870912, null;
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
      ), s.return = l, n.return = l, s.sibling = n, l.child = s, n = l.child, n.memoizedState = Nc(e), n.childLanes = Oc(
        t,
        r,
        e
      ), l.memoizedState = _c, Ua(null, n)) : (ze(l), Hc(l, s));
    }
    var g = t.memoizedState;
    if (g !== null && (s = g.dehydrated, s !== null)) {
      if (u)
        l.flags & 256 ? (ze(l), l.flags &= -257, l = Dc(
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
        ), n = l.child, n.memoizedState = Nc(e), n.childLanes = Oc(
          t,
          r,
          e
        ), l.memoizedState = _c, l = Ua(null, n));
      else if (ze(l), s0(s)) {
        if (r = s.nextSibling && s.nextSibling.dataset, r) var _ = r.dgst;
        r = _, n = Error(c(419)), n.stack = "", n.digest = r, Ea({ value: n, source: null, stack: null }), l = Dc(
          t,
          l,
          e
        );
      } else if (Jt || Hn(t, l, e, !1), r = (e & t.childLanes) !== 0, Jt || r) {
        if (r = Dt, r !== null && (n = gr(r, e), n !== 0 && n !== g.retryLane))
          throw g.retryLane = n, Je(t, n), dl(r, t, n), zc;
        o0(s) || oi(), l = Dc(
          t,
          l,
          e
        );
      } else
        o0(s) ? (l.flags |= 192, l.child = t.child, l = null) : (t = g.treeContext, Ut = Cl(
          s.nextSibling
        ), Pt = l, St = !0, Se = null, Ul = !1, t !== null && mo(l, t), l = Hc(
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
    ), s.flags |= 2), s.return = l, n.return = l, n.sibling = s, l.child = n, Ua(null, n), n = l.child, s = t.child.memoizedState, s === null ? s = Nc(e) : (a = s.cachePool, a !== null ? (g = wt._currentValue, a = a.parent !== g ? { parent: g, pool: g } : a) : a = bo(), s = {
      baseLanes: s.baseLanes | e,
      cachePool: a
    }), n.memoizedState = s, n.childLanes = Oc(
      t,
      r,
      e
    ), l.memoizedState = _c, Ua(t.child, n)) : (ze(l), e = t.child, t = e.sibling, e = Pl(e, {
      mode: "visible",
      children: n.children
    }), e.return = l, e.sibling = null, t !== null && (r = l.deletions, r === null ? (l.deletions = [t], l.flags |= 16) : r.push(t)), l.child = e, l.memoizedState = null, e);
  }
  function Hc(t, l) {
    return l = li(
      { mode: "visible", children: l },
      t.mode
    ), l.return = t, t.child = l;
  }
  function li(t, l) {
    return t = bl(22, t, null, l), t.lanes = 0, t;
  }
  function Dc(t, l, e) {
    return ln(l, t.child, null, e), t = Hc(
      l,
      l.pendingProps.children
    ), t.flags |= 2, l.memoizedState = null, t;
  }
  function U1(t, l, e) {
    t.lanes |= l;
    var n = t.alternate;
    n !== null && (n.lanes |= l), Kf(t.return, l, e);
  }
  function Rc(t, l, e, n, a, u) {
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
  function j1(t, l, e) {
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
        e = a, e === null ? (a = l.child, l.child = null) : (a = e.sibling, e.sibling = null), Rc(
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
        Rc(
          l,
          !0,
          e,
          null,
          u,
          n
        );
        break;
      case "together":
        Rc(
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
        al(l, l.stateNode.containerInfo), Ee(l, wt, t.memoizedState.cache), We();
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
          return l.flags |= 128, ac(l), null;
        break;
      case 13:
        var n = l.memoizedState;
        if (n !== null)
          return n.dehydrated !== null ? (ze(l), l.flags |= 128, null) : (e & l.child.childLanes) !== 0 ? R1(t, l, e) : (ze(l), t = ue(
            t,
            l,
            e
          ), t !== null ? t.sibling : null);
        ze(l);
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
            return j1(
              t,
              l,
              e
            );
          l.flags |= 128;
        }
        if (a = l.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), X(Gt, Gt.current), n) break;
        return null;
      case 22:
        return l.lanes = 0, T1(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        Ee(l, wt, t.memoizedState.cache);
    }
    return ue(t, l, e);
  }
  function C1(t, l, e) {
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
      Jt = !1, St && (l.flags & 1048576) !== 0 && ho(l, ba, l.index);
    switch (l.lanes = 0, l.tag) {
      case 16:
        t: {
          var n = l.pendingProps;
          if (t = Pe(l.elementType), l.type = t, typeof t == "function")
            Zf(t) ? (n = nn(t, n), l.tag = 1, l = H1(
              null,
              l,
              t,
              n,
              e
            )) : (l.tag = 0, l = Tc(
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
                l.tag = 11, l = x1(
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
        return Tc(
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
        ), H1(
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
          a = u.element, Pf(t, l), Na(l, n, null, e);
          var r = l.memoizedState;
          if (n = r.cache, Ee(l, wt, n), n !== u.cache && Jf(
            l,
            [wt],
            e,
            !0
          ), _a(), n = r.element, u.isDehydrated)
            if (u = {
              element: n,
              isDehydrated: !1,
              cache: r.cache
            }, l.updateQueue.baseState = u, l.memoizedState = u, l.flags & 256) {
              l = D1(
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
              ), Ea(a), l = D1(
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
              for (Ut = Cl(t.firstChild), Pt = l, St = !0, Se = null, Ul = !0, e = To(
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
        ).createElement(e), n[It] = l, n[fl] = t, el(n, e, t), kt(n), l.stateNode = n) : l.memoizedState = Ks(
          l.type,
          t.memoizedProps,
          l.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return ua(l), t === null && St && (n = l.stateNode = Vs(
          l.type,
          l.pendingProps,
          mt.current
        ), Pt = l, Ul = !0, a = Ut, je(l.type) ? (h0 = a, Ut = Cl(n.firstChild)) : Ut = a), ll(
          t,
          l,
          l.pendingProps.children,
          e
        ), ti(t, l), t === null && (l.flags |= 4194304), l.child;
      case 5:
        return t === null && St && ((a = n = Ut) && (n = Dm(
          n,
          l.type,
          l.pendingProps,
          Ul
        ), n !== null ? (l.stateNode = n, Pt = l, Ut = Cl(n.firstChild), Ul = !1, a = !0) : a = !1), a || be(l)), ua(l), a = l.type, u = l.pendingProps, r = t !== null ? t.memoizedProps : null, n = u.children, f0(a, u) ? n = null : r !== null && f0(a, r) && (l.flags |= 32), l.memoizedState !== null && (a = ic(
          t,
          l,
          K2,
          null,
          null,
          e
        ), $a._currentValue = a), ti(t, l), ll(t, l, n, e), l.child;
      case 6:
        return t === null && St && ((t = e = Ut) && (e = Rm(
          e,
          l.pendingProps,
          Ul
        ), e !== null ? (l.stateNode = e, Pt = l, Ut = null, t = !0) : t = !1), t || be(l)), null;
      case 13:
        return R1(t, l, e);
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
        return x1(
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
        return a = l.type._context, n = l.pendingProps.children, Fe(l), a = tl(a), n = n(a), l.flags |= 1, ll(t, l, n, e), l.child;
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
        return j1(t, l, e);
      case 31:
        return tm(t, l, e);
      case 22:
        return T1(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        return Fe(l), n = tl(wt), t === null ? (a = kf(), a === null && (a = Dt, u = $f(), a.pooledCache = u, u.refCount++, u !== null && (a.pooledCacheLanes |= e), a = u), l.memoizedState = { parent: n, cache: a }, If(l), Ee(l, wt, a)) : ((t.lanes & e) !== 0 && (Pf(t, l), Na(l, null, null, e), _a()), a = t.memoizedState, u = l.memoizedState, a.parent !== n ? (a = { parent: n, cache: n }, l.memoizedState = a, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = a), Ee(l, wt, n)) : (n = u.cache, Ee(l, wt, n), n !== a.cache && Jf(
          l,
          [wt],
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
  function jc(t, l, e, n, a) {
    if ((l = (t.mode & 32) !== 0) && (l = !1), l) {
      if (t.flags |= 16777216, (a & 335544128) === a)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (cs()) t.flags |= 8192;
        else
          throw tn = Yu, Ff;
    } else t.flags &= -16777217;
  }
  function q1(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Fs(l))
      if (cs()) t.flags |= 8192;
      else
        throw tn = Yu, Ff;
  }
  function ei(t, l) {
    l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? mr() : 536870912, t.lanes |= l, Xn |= l);
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
    switch (Xf(l), l.tag) {
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
        return e = l.stateNode, n = null, t !== null && (n = t.memoizedState.cache), l.memoizedState.cache !== n && (l.flags |= 2048), ee(wt), Lt(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (On(l) ? ie(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, Qf())), jt(l), null;
      case 26:
        var a = l.type, u = l.memoizedState;
        return t === null ? (ie(l), u !== null ? (jt(l), q1(l, u)) : (jt(l), jc(
          l,
          a,
          null,
          n,
          e
        ))) : u ? u !== t.memoizedState ? (ie(l), jt(l), q1(l, u)) : (jt(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== n && ie(l), jt(l), jc(
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
          t = w.current, On(l) ? vo(l) : (t = Vs(a, n, e), l.stateNode = t, ie(l));
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
          if (u = w.current, On(l))
            vo(l);
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
        return jt(l), jc(
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
            t[It] = l, t = !!(t.nodeValue === e || n !== null && n.suppressHydrationWarning === !0 || Rs(t.nodeValue, e)), t || be(l, !0);
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
            e = Qf(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e), t = !0;
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
            a = Qf(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), a = !0;
          if (!a)
            return l.flags & 256 ? (Al(l), l) : (Al(l), null);
        }
        return Al(l), (l.flags & 128) !== 0 ? (l.lanes = e, l) : (e = n !== null, t = t !== null && t.memoizedState !== null, e && (n = l.child, a = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (a = n.alternate.memoizedState.cachePool.pool), u = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (u = n.memoizedState.cachePool.pool), u !== a && (n.flags |= 2048)), e !== t && e && (l.child.flags |= 8192), ei(l, l.updateQueue), jt(l), null);
      case 4:
        return Lt(), t === null && e0(l.stateNode.containerInfo), jt(l), null;
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
                    ro(e, t), e = e.sibling;
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
        return Al(l), nc(), n = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== n && (l.flags |= 8192) : n && (l.flags |= 8192), n ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (jt(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : jt(l), e = l.updateQueue, e !== null && ei(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), n = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (n = l.memoizedState.cachePool.pool), n !== e && (l.flags |= 2048), t !== null && U(Ie), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), ee(wt), jt(l), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(c(156, l.tag));
  }
  function nm(t, l) {
    switch (Xf(l), l.tag) {
      case 1:
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 3:
        return ee(wt), Lt(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
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
        return Al(l), nc(), t !== null && U(Ie), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 24:
        return ee(wt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function B1(t, l) {
    switch (Xf(l), l.tag) {
      case 3:
        ee(wt), Lt();
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
        Al(l), nc(), t !== null && U(Ie);
        break;
      case 24:
        ee(wt);
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
              } catch (R) {
                _t(
                  a,
                  g,
                  R
                );
              }
            }
          }
          n = n.next;
        } while (n !== u);
      }
    } catch (R) {
      _t(l, l.return, R);
    }
  }
  function Z1(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var e = t.stateNode;
      try {
        No(l, e);
      } catch (n) {
        _t(t, t.return, n);
      }
    }
  }
  function Y1(t, l, e) {
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
  function wl(t, l) {
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
  function L1(t) {
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
  function Cc(t, l, e) {
    try {
      var n = t.stateNode;
      zm(n, t.type, e, l), n[fl] = l;
    } catch (a) {
      _t(t, t.return, a);
    }
  }
  function G1(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && je(t.type) || t.tag === 4;
  }
  function qc(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || G1(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && je(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Bc(t, l, e) {
    var n = t.tag;
    if (n === 5 || n === 6)
      t = t.stateNode, l ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(t, l) : (l = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.appendChild(t), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = Fl));
    else if (n !== 4 && (n === 27 && je(t.type) && (e = t.stateNode, l = null), t = t.child, t !== null))
      for (Bc(t, l, e), t = t.sibling; t !== null; )
        Bc(t, l, e), t = t.sibling;
  }
  function ni(t, l, e) {
    var n = t.tag;
    if (n === 5 || n === 6)
      t = t.stateNode, l ? e.insertBefore(t, l) : e.appendChild(t);
    else if (n !== 4 && (n === 27 && je(t.type) && (e = t.stateNode), t = t.child, t !== null))
      for (ni(t, l, e), t = t.sibling; t !== null; )
        ni(t, l, e), t = t.sibling;
  }
  function X1(t) {
    var l = t.stateNode, e = t.memoizedProps;
    try {
      for (var n = t.type, a = l.attributes; a.length; )
        l.removeAttributeNode(a[0]);
      el(l, n, e), l[It] = t, l[fl] = e;
    } catch (u) {
      _t(t, t.return, u);
    }
  }
  var fe = !1, $t = !1, Zc = !1, V1 = typeof WeakSet == "function" ? WeakSet : Set, Ft = null;
  function am(t, l) {
    if (t = t.containerInfo, u0 = Mi, t = to(t), Df(t)) {
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
            var r = 0, s = -1, g = -1, _ = 0, R = 0, q = t, N = null;
            l: for (; ; ) {
              for (var D; q !== e || a !== 0 && q.nodeType !== 3 || (s = r + a), q !== u || n !== 0 && q.nodeType !== 3 || (g = r + n), q.nodeType === 3 && (r += q.nodeValue.length), (D = q.firstChild) !== null; )
                N = q, q = D;
              for (; ; ) {
                if (q === t) break l;
                if (N === e && ++_ === a && (s = r), N === u && ++R === n && (g = r), (D = q.nextSibling) !== null) break;
                q = N, N = q.parentNode;
              }
              q = D;
            }
            e = s === -1 || g === -1 ? null : { start: s, end: g };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (i0 = { focusedElem: t, selectionRange: e }, Mi = !1, Ft = l; Ft !== null; )
      if (l = Ft, t = l.child, (l.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = l, Ft = t;
      else
        for (; Ft !== null; ) {
          switch (l = Ft, u = l.alternate, t = l.flags, l.tag) {
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
                  r0(t);
                else if (e === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      r0(t);
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
            t.return = l.return, Ft = t;
            break;
          }
          Ft = l.return;
        }
  }
  function Q1(t, l, e) {
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
        n & 64 && Z1(e), n & 512 && qa(e, e.return);
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
            No(t, l);
          } catch (r) {
            _t(e, e.return, r);
          }
        }
        break;
      case 27:
        l === null && n & 4 && X1(e);
      case 26:
      case 5:
        re(t, e), l === null && n & 4 && L1(e), n & 512 && qa(e, e.return);
        break;
      case 12:
        re(t, e);
        break;
      case 31:
        re(t, e), n & 4 && J1(t, e);
        break;
      case 13:
        re(t, e), n & 4 && $1(t, e), n & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = dm.bind(
          null,
          e
        ), Um(t, e))));
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
  function w1(t) {
    var l = t.alternate;
    l !== null && (t.alternate = null, w1(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && mf(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
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
        $t || wl(e, l), ce(
          t,
          l,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        $t || wl(e, l);
        var n = Ct, a = rl;
        je(e.type) && (Ct = e.stateNode, rl = !1), ce(
          t,
          l,
          e
        ), wa(e.stateNode), Ct = n, rl = a;
        break;
      case 5:
        $t || wl(e, l);
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
        Ct !== null && (rl ? (t = Ct, Zs(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          e.stateNode
        ), kn(t)) : Zs(Ct, e.stateNode));
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
        $t || (wl(e, l), n = e.stateNode, typeof n.componentWillUnmount == "function" && Y1(
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
  function J1(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        kn(t);
      } catch (e) {
        _t(l, l.return, e);
      }
    }
  }
  function $1(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        kn(t);
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
        return l === null && (l = t.stateNode = new V1()), l;
      case 22:
        return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new V1()), l;
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
        W1(l, t), l = l.sibling;
  }
  var Ll = null;
  function W1(t, l) {
    var e = t.alternate, n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ol(l, t), sl(t), n & 4 && (_e(3, t, t.return), Ca(3, t), _e(5, t, t.return));
        break;
      case 1:
        ol(l, t), sl(t), n & 512 && ($t || e === null || wl(e, e.return)), n & 64 && fe && (t = t.updateQueue, t !== null && (n = t.callbacks, n !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? n : e.concat(n))));
        break;
      case 26:
        var a = Ll;
        if (ol(l, t), sl(t), n & 512 && ($t || e === null || wl(e, e.return)), n & 4) {
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
                      )), el(u, n, e), u[It] = t, kt(u), n = u;
                      break t;
                    case "link":
                      var r = Ws(
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
                      if (r = Ws(
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
                  u[It] = t, kt(u), n = u;
                }
                t.stateNode = n;
              } else
                ks(
                  a,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = $s(
                a,
                n,
                t.memoizedProps
              );
          else
            u !== n ? (u === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : u.count--, n === null ? ks(
              a,
              t.type,
              t.stateNode
            ) : $s(
              a,
              n,
              t.memoizedProps
            )) : n === null && t.stateNode !== null && Cc(
              t,
              t.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        ol(l, t), sl(t), n & 512 && ($t || e === null || wl(e, e.return)), e !== null && n & 4 && Cc(
          t,
          t.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (ol(l, t), sl(t), n & 512 && ($t || e === null || wl(e, e.return)), t.flags & 32) {
          a = t.stateNode;
          try {
            Sn(a, "");
          } catch (W) {
            _t(t, t.return, W);
          }
        }
        n & 4 && t.stateNode != null && (a = t.memoizedProps, Cc(
          t,
          a,
          e !== null ? e.memoizedProps : a
        )), n & 1024 && (Zc = !0);
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
            kn(l.containerInfo);
          } catch (W) {
            _t(t, t.return, W);
          }
        Zc && (Zc = !1, k1(t));
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
        var g = e !== null && e.memoizedState !== null, _ = fe, R = $t;
        if (fe = _ || a, $t = R || g, ol(l, t), $t = R, fe = _, sl(t), n & 8192)
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
                  var D = g.stateNode;
                  a ? Ys(D, !0) : Ys(g.stateNode, !1);
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
          if (G1(n)) {
            e = n;
            break;
          }
          n = n.return;
        }
        if (e == null) throw Error(c(160));
        switch (e.tag) {
          case 27:
            var a = e.stateNode, u = qc(t);
            ni(t, u, a);
            break;
          case 5:
            var r = e.stateNode;
            e.flags & 32 && (Sn(r, ""), e.flags &= -33);
            var s = qc(t);
            ni(t, s, r);
            break;
          case 3:
          case 4:
            var g = e.stateNode.containerInfo, _ = qc(t);
            Bc(
              t,
              _,
              g
            );
            break;
          default:
            throw Error(c(161));
        }
      } catch (R) {
        _t(t, t.return, R);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function k1(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        k1(l), l.tag === 5 && l.flags & 1024 && l.stateNode.reset(), t = t.sibling;
      }
  }
  function re(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; )
        Q1(t, l.alternate, l), l = l.sibling;
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
          wl(l, l.return);
          var e = l.stateNode;
          typeof e.componentWillUnmount == "function" && Y1(
            l,
            l.return,
            e
          ), an(l);
          break;
        case 27:
          wa(l.stateNode);
        case 26:
        case 5:
          wl(l, l.return), an(l);
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
                  _o(g[a], s);
            } catch (_) {
              _t(n, n.return, _);
            }
          }
          e && r & 64 && Z1(u), qa(u, u.return);
          break;
        case 27:
          X1(u);
        case 26:
        case 5:
          oe(
            a,
            u,
            e
          ), e && n === null && r & 4 && L1(u), qa(u, u.return);
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
          ), e && r & 4 && J1(a, u);
          break;
        case 13:
          oe(
            a,
            u,
            e
          ), e && r & 4 && $1(a, u);
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
  function Yc(t, l) {
    var e = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && Aa(e));
  }
  function Lc(t, l) {
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
        )), a & 2048 && Yc(r, l);
        break;
      case 24:
        Gl(
          t,
          l,
          e,
          n
        ), a & 2048 && Lc(l.alternate, l);
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
          var R = r.stateNode;
          r.memoizedState !== null ? R._visibility & 2 ? Yn(
            u,
            r,
            s,
            g,
            a
          ) : Ba(
            u,
            r
          ) : (R._visibility |= 2, Yn(
            u,
            r,
            s,
            g,
            a
          )), a && _ & 2048 && Yc(
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
          ), a && _ & 2048 && Lc(r.alternate, r);
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
            Ba(e, n), a & 2048 && Yc(
              n.alternate,
              n
            );
            break;
          case 24:
            Ba(e, n), a & 2048 && Lc(n.alternate, n);
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
        I1(
          t,
          l,
          e
        ), t = t.sibling;
  }
  function I1(t, l, e) {
    switch (t.tag) {
      case 26:
        Ln(
          t,
          l,
          e
        ), t.flags & Za && t.memoizedState !== null && wm(
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
  function P1(t) {
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
          Ft = n, ls(
            n,
            t
          );
        }
      P1(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        ts(t), t = t.sibling;
  }
  function ts(t) {
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
          Ft = n, ls(
            n,
            t
          );
        }
      P1(t);
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
  function ls(t, l) {
    for (; Ft !== null; ) {
      var e = Ft;
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
      if (n = e.child, n !== null) n.return = e, Ft = n;
      else
        t: for (e = t; Ft !== null; ) {
          n = Ft;
          var a = n.sibling, u = n.return;
          if (w1(n), n === e) {
            Ft = null;
            break t;
          }
          if (a !== null) {
            a.return = u, Ft = a;
            break t;
          }
          Ft = u;
        }
    }
  }
  var im = {
    getCacheForType: function(t) {
      var l = tl(wt), e = l.data.get(t);
      return e === void 0 && (e = t(), l.data.set(t, e)), e;
    },
    cacheSignal: function() {
      return tl(wt).controller.signal;
    }
  }, fm = typeof WeakMap == "function" ? WeakMap : Map, Mt = 0, Dt = null, vt = null, gt = 0, Tt = 0, xl = null, Ne = !1, Gn = !1, Gc = !1, se = 0, Yt = 0, Oe = 0, un = 0, Xc = 0, Ml = 0, Xn = 0, La = null, hl = null, Vc = !1, ii = 0, es = 0, fi = 1 / 0, ci = null, He = null, Wt = 0, De = null, Vn = null, he = 0, Qc = 0, wc = null, ns = null, Ga = 0, Kc = null;
  function zl() {
    return (Mt & 2) !== 0 && gt !== 0 ? gt & -gt : z.T !== null ? Ic() : pr();
  }
  function as() {
    if (Ml === 0)
      if ((gt & 536870912) === 0 || St) {
        var t = yu;
        yu <<= 1, (yu & 3932160) === 0 && (yu = 262144), Ml = t;
      } else Ml = 536870912;
    return t = El.current, t !== null && (t.flags |= 32), Ml;
  }
  function dl(t, l, e) {
    (t === Dt && (Tt === 2 || Tt === 9) || t.cancelPendingCommit !== null) && (Qn(t, 0), Re(
      t,
      gt,
      Ml,
      !1
    )), ca(t, e), ((Mt & 2) === 0 || t !== Dt) && (t === Dt && ((Mt & 2) === 0 && (un |= e), Yt === 4 && Re(
      t,
      gt,
      Ml,
      !1
    )), Kl(t));
  }
  function us(t, l, e) {
    if ((Mt & 6) !== 0) throw Error(c(327));
    var n = !e && (l & 127) === 0 && (l & t.expiredLanes) === 0 || fa(t, l), a = n ? om(t, l) : $c(t, l, !0), u = n;
    do {
      if (a === 0) {
        Gn && !n && Re(t, l, 0, !1);
        break;
      } else {
        if (e = t.current.alternate, u && !cm(e)) {
          a = $c(t, l, !1), u = !1;
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
              if (g && (Qn(s, r).flags |= 256), r = $c(
                s,
                r,
                !1
              ), r !== 2) {
                if (Gc && !g) {
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
          Qn(t, 0), Re(t, l, 0, !0);
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
              Re(
                n,
                l,
                Ml,
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
            if (Re(
              n,
              l,
              Ml,
              !Ne
            ), pu(n, 0, !0) !== 0) break t;
            he = l, n.timeoutHandle = qs(
              is.bind(
                null,
                n,
                e,
                hl,
                ci,
                Vc,
                l,
                Ml,
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
          is(
            n,
            e,
            hl,
            ci,
            Vc,
            l,
            Ml,
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
    Kl(t);
  }
  function is(t, l, e, n, a, u, r, s, g, _, R, q, N, D) {
    if (t.timeoutHandle = -1, q = l.subtreeFlags, q & 8192 || (q & 16785408) === 16785408) {
      q = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Fl
      }, I1(
        l,
        u,
        q
      );
      var W = (u & 62914560) === u ? ii - yl() : (u & 4194048) === u ? es - yl() : 0;
      if (W = Km(
        q,
        W
      ), W !== null) {
        he = u, t.cancelPendingCommit = W(
          ms.bind(
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
            R,
            q,
            null,
            N,
            D
          )
        ), Re(t, u, r, !_);
        return;
      }
    }
    ms(
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
  function Re(t, l, e, n) {
    l &= ~Xc, l &= ~un, t.suspendedLanes |= l, t.pingedLanes &= ~l, n && (t.warmLanes |= l), n = t.expirationTimes;
    for (var a = l; 0 < a; ) {
      var u = 31 - pl(a), r = 1 << u;
      n[u] = -1, a &= ~r;
    }
    e !== 0 && vr(t, e, l);
  }
  function ri() {
    return (Mt & 6) === 0 ? (Xa(0), !1) : !0;
  }
  function Jc() {
    if (vt !== null) {
      if (Tt === 0)
        var t = vt.return;
      else
        t = vt, le = ke = null, rc(t), jn = null, Ma = 0, t = vt;
      for (; t !== null; )
        B1(t.alternate, t), t = t.return;
      vt = null;
    }
  }
  function Qn(t, l) {
    var e = t.timeoutHandle;
    e !== -1 && (t.timeoutHandle = -1, Nm(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), he = 0, Jc(), Dt = t, vt = e = Pl(t.current, null), gt = l, Tt = 0, xl = null, Ne = !1, Gn = fa(t, l), Gc = !1, Xn = Ml = Xc = un = Oe = Yt = 0, hl = La = null, Vc = !1, (l & 8) !== 0 && (l |= l & 32);
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= l; 0 < n; ) {
        var a = 31 - pl(n), u = 1 << a;
        l |= t[a], n &= ~u;
      }
    return se = l, Hu(), e;
  }
  function fs(t, l) {
    st = null, z.H = Ra, l === Un || l === Zu ? (l = xo(), Tt = 3) : l === Ff ? (l = xo(), Tt = 4) : Tt = l === zc ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, xl = l, vt === null && (Yt = 1, Iu(
      t,
      Hl(l, t.current)
    ));
  }
  function cs() {
    var t = El.current;
    return t === null ? !0 : (gt & 4194048) === gt ? jl === null : (gt & 62914560) === gt || (gt & 536870912) !== 0 ? t === jl : !1;
  }
  function rs() {
    var t = z.H;
    return z.H = Ra, t === null ? Ra : t;
  }
  function os() {
    var t = z.A;
    return z.A = im, t;
  }
  function oi() {
    Yt = 4, Ne || (gt & 4194048) !== gt && El.current !== null || (Gn = !0), (Oe & 134217727) === 0 && (un & 134217727) === 0 || Dt === null || Re(
      Dt,
      gt,
      Ml,
      !1
    );
  }
  function $c(t, l, e) {
    var n = Mt;
    Mt |= 2;
    var a = rs(), u = os();
    (Dt !== t || gt !== l) && (ci = null, Qn(t, l)), l = !1;
    var r = Yt;
    t: do
      try {
        if (Tt !== 0 && vt !== null) {
          var s = vt, g = xl;
          switch (Tt) {
            case 8:
              Jc(), r = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              El.current === null && (l = !0);
              var _ = Tt;
              if (Tt = 0, xl = null, wn(t, s, g, _), e && Gn) {
                r = 0;
                break t;
              }
              break;
            default:
              _ = Tt, Tt = 0, xl = null, wn(t, s, g, _);
          }
        }
        rm(), r = Yt;
        break;
      } catch (R) {
        fs(t, R);
      }
    while (!0);
    return l && t.shellSuspendCounter++, le = ke = null, Mt = n, z.H = a, z.A = u, vt === null && (Dt = null, gt = 0, Hu()), r;
  }
  function rm() {
    for (; vt !== null; ) ss(vt);
  }
  function om(t, l) {
    var e = Mt;
    Mt |= 2;
    var n = rs(), a = os();
    Dt !== t || gt !== l ? (ci = null, fi = yl() + 500, Qn(t, l)) : Gn = fa(
      t,
      l
    );
    t: do
      try {
        if (Tt !== 0 && vt !== null) {
          l = vt;
          var u = xl;
          l: switch (Tt) {
            case 1:
              Tt = 0, xl = null, wn(t, l, u, 1);
              break;
            case 2:
            case 9:
              if (Eo(u)) {
                Tt = 0, xl = null, hs(l);
                break;
              }
              l = function() {
                Tt !== 2 && Tt !== 9 || Dt !== t || (Tt = 7), Kl(t);
              }, u.then(l, l);
              break t;
            case 3:
              Tt = 7;
              break t;
            case 4:
              Tt = 5;
              break t;
            case 7:
              Eo(u) ? (Tt = 0, xl = null, hs(l)) : (Tt = 0, xl = null, wn(t, l, u, 7));
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
                    Tt = 0, xl = null;
                    var g = s.sibling;
                    if (g !== null) vt = g;
                    else {
                      var _ = s.return;
                      _ !== null ? (vt = _, si(_)) : vt = null;
                    }
                    break l;
                  }
              }
              Tt = 0, xl = null, wn(t, l, u, 5);
              break;
            case 6:
              Tt = 0, xl = null, wn(t, l, u, 6);
              break;
            case 8:
              Jc(), Yt = 6;
              break t;
            default:
              throw Error(c(462));
          }
        }
        sm();
        break;
      } catch (R) {
        fs(t, R);
      }
    while (!0);
    return le = ke = null, z.H = n, z.A = a, Mt = e, vt !== null ? 0 : (Dt = null, gt = 0, Hu(), Yt);
  }
  function sm() {
    for (; vt !== null && !jd(); )
      ss(vt);
  }
  function ss(t) {
    var l = C1(t.alternate, t, se);
    t.memoizedProps = t.pendingProps, l === null ? si(t) : vt = l;
  }
  function hs(t) {
    var l = t, e = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = O1(
          e,
          l,
          l.pendingProps,
          l.type,
          void 0,
          gt
        );
        break;
      case 11:
        l = O1(
          e,
          l,
          l.pendingProps,
          l.type.render,
          l.ref,
          gt
        );
        break;
      case 5:
        rc(l);
      default:
        B1(e, l), l = vt = ro(l, se), l = C1(e, l, se);
    }
    t.memoizedProps = t.pendingProps, l === null ? si(t) : vt = l;
  }
  function wn(t, l, e, n) {
    le = ke = null, rc(l), jn = null, Ma = 0;
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
    l.flags & 32768 ? (St || n === 1 ? t = !0 : Gn || (gt & 536870912) !== 0 ? t = !1 : (Ne = t = !0, (n === 2 || n === 9 || n === 3 || n === 6) && (n = El.current, n !== null && n.tag === 13 && (n.flags |= 16384))), ds(l, t)) : si(l);
  }
  function si(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        ds(
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
  function ds(t, l) {
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
  function ms(t, l, e, n, a, u, r, s, g) {
    t.cancelPendingCommit = null;
    do
      hi();
    while (Wt !== 0);
    if ((Mt & 6) !== 0) throw Error(c(327));
    if (l !== null) {
      if (l === t.current) throw Error(c(177));
      if (u = l.lanes | l.childLanes, u |= qf, Qd(
        t,
        e,
        u,
        r,
        s,
        g
      ), t === Dt && (vt = Dt = null, gt = 0), Vn = l, De = t, he = e, Qc = u, wc = a, ns = n, (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, vm(mu, function() {
        return Ss(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), n = (l.flags & 13878) !== 0, (l.subtreeFlags & 13878) !== 0 || n) {
        n = z.T, z.T = null, a = G.p, G.p = 2, r = Mt, Mt |= 4;
        try {
          am(t, l, e);
        } finally {
          Mt = r, G.p = a, z.T = n;
        }
      }
      Wt = 1, vs(), ys(), gs();
    }
  }
  function vs() {
    if (Wt === 1) {
      Wt = 0;
      var t = De, l = Vn, e = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || e) {
        e = z.T, z.T = null;
        var n = G.p;
        G.p = 2;
        var a = Mt;
        Mt |= 4;
        try {
          W1(l, t);
          var u = i0, r = to(t.containerInfo), s = u.focusedElem, g = u.selectionRange;
          if (r !== s && s && s.ownerDocument && Pr(
            s.ownerDocument.documentElement,
            s
          )) {
            if (g !== null && Df(s)) {
              var _ = g.start, R = g.end;
              if (R === void 0 && (R = _), "selectionStart" in s)
                s.selectionStart = _, s.selectionEnd = Math.min(
                  R,
                  s.value.length
                );
              else {
                var q = s.ownerDocument || document, N = q && q.defaultView || window;
                if (N.getSelection) {
                  var D = N.getSelection(), W = s.textContent.length, nt = Math.min(g.start, W), Ht = g.end === void 0 ? nt : Math.min(g.end, W);
                  !D.extend && nt > Ht && (r = Ht, Ht = nt, nt = r);
                  var x = Ir(
                    s,
                    nt
                  ), A = Ir(
                    s,
                    Ht
                  );
                  if (x && A && (D.rangeCount !== 1 || D.anchorNode !== x.node || D.anchorOffset !== x.offset || D.focusNode !== A.node || D.focusOffset !== A.offset)) {
                    var T = q.createRange();
                    T.setStart(x.node, x.offset), D.removeAllRanges(), nt > Ht ? (D.addRange(T), D.extend(A.node, A.offset)) : (T.setEnd(A.node, A.offset), D.addRange(T));
                  }
                }
              }
            }
            for (q = [], D = s; D = D.parentNode; )
              D.nodeType === 1 && q.push({
                element: D,
                left: D.scrollLeft,
                top: D.scrollTop
              });
            for (typeof s.focus == "function" && s.focus(), s = 0; s < q.length; s++) {
              var j = q[s];
              j.element.scrollLeft = j.left, j.element.scrollTop = j.top;
            }
          }
          Mi = !!u0, i0 = u0 = null;
        } finally {
          Mt = a, G.p = n, z.T = e;
        }
      }
      t.current = l, Wt = 2;
    }
  }
  function ys() {
    if (Wt === 2) {
      Wt = 0;
      var t = De, l = Vn, e = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || e) {
        e = z.T, z.T = null;
        var n = G.p;
        G.p = 2;
        var a = Mt;
        Mt |= 4;
        try {
          Q1(t, l.alternate, l);
        } finally {
          Mt = a, G.p = n, z.T = e;
        }
      }
      Wt = 3;
    }
  }
  function gs() {
    if (Wt === 4 || Wt === 3) {
      Wt = 0, Cd();
      var t = De, l = Vn, e = he, n = ns;
      (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? Wt = 5 : (Wt = 0, Vn = De = null, ps(t, t.pendingLanes));
      var a = t.pendingLanes;
      if (a === 0 && (He = null), hf(e), l = l.stateNode, gl && typeof gl.onCommitFiberRoot == "function")
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
        l = z.T, a = G.p, G.p = 2, z.T = null;
        try {
          for (var u = t.onRecoverableError, r = 0; r < n.length; r++) {
            var s = n[r];
            u(s.value, {
              componentStack: s.stack
            });
          }
        } finally {
          z.T = l, G.p = a;
        }
      }
      (he & 3) !== 0 && hi(), Kl(t), a = t.pendingLanes, (e & 261930) !== 0 && (a & 42) !== 0 ? t === Kc ? Ga++ : (Ga = 0, Kc = t) : Ga = 0, Xa(0);
    }
  }
  function ps(t, l) {
    (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, Aa(l)));
  }
  function hi() {
    return vs(), ys(), gs(), Ss();
  }
  function Ss() {
    if (Wt !== 5) return !1;
    var t = De, l = Qc;
    Qc = 0;
    var e = hf(he), n = z.T, a = G.p;
    try {
      G.p = 32 > e ? 32 : e, z.T = null, e = wc, wc = null;
      var u = De, r = he;
      if (Wt = 0, Vn = De = null, he = 0, (Mt & 6) !== 0) throw Error(c(331));
      var s = Mt;
      if (Mt |= 4, ts(u.current), F1(
        u,
        u.current,
        r,
        e
      ), Mt = s, Xa(0, !1), gl && typeof gl.onPostCommitFiberRoot == "function")
        try {
          gl.onPostCommitFiberRoot(ia, u);
        } catch {
        }
      return !0;
    } finally {
      G.p = a, z.T = n, ps(t, l);
    }
  }
  function bs(t, l, e) {
    l = Hl(e, l), l = Mc(t.stateNode, l, 2), t = Me(t, l, 2), t !== null && (ca(t, 2), Kl(t));
  }
  function _t(t, l, e) {
    if (t.tag === 3)
      bs(t, t, e);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          bs(
            l,
            t,
            e
          );
          break;
        } else if (l.tag === 1) {
          var n = l.stateNode;
          if (typeof l.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (He === null || !He.has(n))) {
            t = Hl(e, t), e = E1(2), n = Me(l, e, 2), n !== null && (A1(
              e,
              n,
              l,
              t
            ), ca(n, 2), Kl(n));
            break;
          }
        }
        l = l.return;
      }
  }
  function Wc(t, l, e) {
    var n = t.pingCache;
    if (n === null) {
      n = t.pingCache = new fm();
      var a = /* @__PURE__ */ new Set();
      n.set(l, a);
    } else
      a = n.get(l), a === void 0 && (a = /* @__PURE__ */ new Set(), n.set(l, a));
    a.has(e) || (Gc = !0, a.add(e), t = hm.bind(null, t, l, e), l.then(t, t));
  }
  function hm(t, l, e) {
    var n = t.pingCache;
    n !== null && n.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, Dt === t && (gt & e) === e && (Yt === 4 || Yt === 3 && (gt & 62914560) === gt && 300 > yl() - ii ? (Mt & 2) === 0 && Qn(t, 0) : Xc |= e, Xn === gt && (Xn = 0)), Kl(t);
  }
  function Es(t, l) {
    l === 0 && (l = mr()), t = Je(t, l), t !== null && (ca(t, l), Kl(t));
  }
  function dm(t) {
    var l = t.memoizedState, e = 0;
    l !== null && (e = l.retryLane), Es(t, e);
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
    n !== null && n.delete(l), Es(t, e);
  }
  function vm(t, l) {
    return cf(t, l);
  }
  var di = null, Kn = null, kc = !1, mi = !1, Fc = !1, Ue = 0;
  function Kl(t) {
    t !== Kn && t.next === null && (Kn === null ? di = Kn = t : Kn = Kn.next = t), mi = !0, kc || (kc = !0, gm());
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
    As();
  }
  function As() {
    mi = kc = !1;
    var t = 0;
    Ue !== 0 && _m() && (t = Ue);
    for (var l = yl(), e = null, n = di; n !== null; ) {
      var a = n.next, u = xs(n, l);
      u === 0 ? (n.next = null, e === null ? di = a : e.next = a, a === null && (Kn = e)) : (e = n, (t !== 0 || (u & 3) !== 0) && (mi = !0)), n = a;
    }
    Wt !== 0 && Wt !== 5 || Xa(t), Ue !== 0 && (Ue = 0);
  }
  function xs(t, l) {
    for (var e = t.suspendedLanes, n = t.pingedLanes, a = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var r = 31 - pl(u), s = 1 << r, g = a[r];
      g === -1 ? ((s & e) === 0 || (s & n) !== 0) && (a[r] = Vd(s, l)) : g <= l && (t.expiredLanes |= s), u &= ~s;
    }
    if (l = Dt, e = gt, e = pu(
      t,
      t === l ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n = t.callbackNode, e === 0 || t === l && (Tt === 2 || Tt === 9) || t.cancelPendingCommit !== null)
      return n !== null && n !== null && rf(n), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || fa(t, e)) {
      if (l = e & -e, l === t.callbackPriority) return l;
      switch (n !== null && rf(n), hf(e)) {
        case 2:
        case 8:
          e = hr;
          break;
        case 32:
          e = mu;
          break;
        case 268435456:
          e = dr;
          break;
        default:
          e = mu;
      }
      return n = Ms.bind(null, t), e = cf(e, n), t.callbackPriority = l, t.callbackNode = e, l;
    }
    return n !== null && n !== null && rf(n), t.callbackPriority = 2, t.callbackNode = null, 2;
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
    ), n === 0 ? null : (us(t, n, l), xs(t, yl()), t.callbackNode != null && t.callbackNode === e ? Ms.bind(null, t) : null);
  }
  function zs(t, l) {
    if (hi()) return null;
    us(t, l, !0);
  }
  function gm() {
    Om(function() {
      (Mt & 6) !== 0 ? cf(
        sr,
        ym
      ) : As();
    });
  }
  function Ic() {
    if (Ue === 0) {
      var t = Dn;
      t === 0 && (t = vu, vu <<= 1, (vu & 261888) === 0 && (vu = 256)), Ue = t;
    }
    return Ue;
  }
  function Ts(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Au("" + t);
  }
  function _s(t, l) {
    var e = l.ownerDocument.createElement("input");
    return e.name = l.name, e.value = l.value, t.id && e.setAttribute("form", t.id), l.parentNode.insertBefore(e, l), t = new FormData(t), e.parentNode.removeChild(e), t;
  }
  function pm(t, l, e, n, a) {
    if (l === "submit" && e && e.stateNode === a) {
      var u = Ts(
        (a[fl] || null).action
      ), r = n.submitter;
      r && (l = (l = r[fl] || null) ? Ts(l.formAction) : r.getAttribute("formAction"), l !== null && (u = l, r = null));
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
                if (Ue !== 0) {
                  var g = r ? _s(a, r) : new FormData(a);
                  pc(
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
                typeof u == "function" && (s.preventDefault(), g = r ? _s(a, r) : new FormData(a), pc(
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
  for (var Pc = 0; Pc < Cf.length; Pc++) {
    var t0 = Cf[Pc], Sm = t0.toLowerCase(), bm = t0[0].toUpperCase() + t0.slice(1);
    Yl(
      Sm,
      "on" + bm
    );
  }
  Yl(no, "onAnimationEnd"), Yl(ao, "onAnimationIteration"), Yl(uo, "onAnimationStart"), Yl("dblclick", "onDoubleClick"), Yl("focusin", "onFocus"), Yl("focusout", "onBlur"), Yl(q2, "onTransitionRun"), Yl(B2, "onTransitionStart"), Yl(Z2, "onTransitionCancel"), Yl(io, "onTransitionEnd"), gn("onMouseEnter", ["mouseout", "mouseover"]), gn("onMouseLeave", ["mouseout", "mouseover"]), gn("onPointerEnter", ["pointerout", "pointerover"]), gn("onPointerLeave", ["pointerout", "pointerover"]), Ve(
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
  function Ns(t, l) {
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
            } catch (R) {
              Ou(R);
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
            } catch (R) {
              Ou(R);
            }
            a.currentTarget = null, u = g;
          }
      }
    }
  }
  function yt(t, l) {
    var e = l[df];
    e === void 0 && (e = l[df] = /* @__PURE__ */ new Set());
    var n = t + "__bubble";
    e.has(n) || (Os(l, t, 2, !1), e.add(n));
  }
  function l0(t, l, e) {
    var n = 0;
    l && (n |= 4), Os(
      e,
      t,
      n,
      l
    );
  }
  var vi = "_reactListening" + Math.random().toString(36).slice(2);
  function e0(t) {
    if (!t[vi]) {
      t[vi] = !0, Er.forEach(function(e) {
        e !== "selectionchange" && (Em.has(e) || l0(e, !1, t), l0(e, !0, t));
      });
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[vi] || (l[vi] = !0, l0("selectionchange", !1, l));
    }
  }
  function Os(t, l, e, n) {
    switch (ah(l)) {
      case 2:
        var a = Wm;
        break;
      case 8:
        a = km;
        break;
      default:
        a = g0;
    }
    e = a.bind(
      null,
      l,
      e,
      t
    ), a = void 0, !Af || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (a = !0), n ? a !== void 0 ? t.addEventListener(l, e, {
      capture: !0,
      passive: a
    }) : t.addEventListener(l, e, !0) : a !== void 0 ? t.addEventListener(l, e, {
      passive: a
    }) : t.addEventListener(l, e, !1);
  }
  function n0(t, l, e, n, a) {
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
      var _ = u, R = bf(e), q = [];
      t: {
        var N = fo.get(t);
        if (N !== void 0) {
          var D = Tu, W = t;
          switch (t) {
            case "keypress":
              if (Mu(e) === 0) break t;
            case "keydown":
            case "keyup":
              D = m2;
              break;
            case "focusin":
              W = "focus", D = Tf;
              break;
            case "focusout":
              W = "blur", D = Tf;
              break;
            case "beforeblur":
            case "afterblur":
              D = Tf;
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
              D = qr;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              D = e2;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              D = g2;
              break;
            case no:
            case ao:
            case uo:
              D = u2;
              break;
            case io:
              D = S2;
              break;
            case "scroll":
            case "scrollend":
              D = t2;
              break;
            case "wheel":
              D = E2;
              break;
            case "copy":
            case "cut":
            case "paste":
              D = f2;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              D = Zr;
              break;
            case "toggle":
            case "beforetoggle":
              D = x2;
          }
          var nt = (l & 4) !== 0, Ht = !nt && (t === "scroll" || t === "scrollend"), x = nt ? N !== null ? N + "Capture" : null : N;
          nt = [];
          for (var A = _, T; A !== null; ) {
            var j = A;
            if (T = j.stateNode, j = j.tag, j !== 5 && j !== 26 && j !== 27 || T === null || x === null || (j = sa(A, x), j != null && nt.push(
              Qa(A, j, T)
            )), Ht) break;
            A = A.return;
          }
          0 < nt.length && (N = new D(
            N,
            W,
            null,
            e,
            R
          ), q.push({ event: N, listeners: nt }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (N = t === "mouseover" || t === "pointerover", D = t === "mouseout" || t === "pointerout", N && e !== Sf && (W = e.relatedTarget || e.fromElement) && (mn(W) || W[dn]))
            break t;
          if ((D || N) && (N = R.window === R ? R : (N = R.ownerDocument) ? N.defaultView || N.parentWindow : window, D ? (W = e.relatedTarget || e.toElement, D = _, W = W ? mn(W) : null, W !== null && (Ht = y(W), nt = W.tag, W !== Ht || nt !== 5 && nt !== 27 && nt !== 6) && (W = null)) : (D = null, W = _), D !== W)) {
            if (nt = qr, j = "onMouseLeave", x = "onMouseEnter", A = "mouse", (t === "pointerout" || t === "pointerover") && (nt = Zr, j = "onPointerLeave", x = "onPointerEnter", A = "pointer"), Ht = D == null ? N : oa(D), T = W == null ? N : oa(W), N = new nt(
              j,
              A + "leave",
              D,
              e,
              R
            ), N.target = Ht, N.relatedTarget = T, j = null, mn(R) === _ && (nt = new nt(
              x,
              A + "enter",
              W,
              e,
              R
            ), nt.target = T, nt.relatedTarget = Ht, j = nt), Ht = j, D && W)
              l: {
                for (nt = Am, x = D, A = W, T = 0, j = x; j; j = nt(j))
                  T++;
                j = 0;
                for (var lt = A; lt; lt = nt(lt))
                  j++;
                for (; 0 < T - j; )
                  x = nt(x), T--;
                for (; 0 < j - T; )
                  A = nt(A), j--;
                for (; T--; ) {
                  if (x === A || A !== null && x === A.alternate) {
                    nt = x;
                    break l;
                  }
                  x = nt(x), A = nt(A);
                }
                nt = null;
              }
            else nt = null;
            D !== null && Hs(
              q,
              N,
              D,
              nt,
              !1
            ), W !== null && Ht !== null && Hs(
              q,
              Ht,
              W,
              nt,
              !0
            );
          }
        }
        t: {
          if (N = _ ? oa(_) : window, D = N.nodeName && N.nodeName.toLowerCase(), D === "select" || D === "input" && N.type === "file")
            var At = Kr;
          else if (Qr(N))
            if (Jr)
              At = U2;
            else {
              At = D2;
              var P = H2;
            }
          else
            D = N.nodeName, !D || D.toLowerCase() !== "input" || N.type !== "checkbox" && N.type !== "radio" ? _ && pf(_.elementType) && (At = Kr) : At = R2;
          if (At && (At = At(t, _))) {
            wr(
              q,
              At,
              e,
              R
            );
            break t;
          }
          P && P(t, N, _), t === "focusout" && _ && N.type === "number" && _.memoizedProps.value != null && gf(N, "number", N.value);
        }
        switch (P = _ ? oa(_) : window, t) {
          case "focusin":
            (Qr(P) || P.contentEditable === "true") && (xn = P, Rf = _, Sa = null);
            break;
          case "focusout":
            Sa = Rf = xn = null;
            break;
          case "mousedown":
            Uf = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Uf = !1, lo(q, e, R);
            break;
          case "selectionchange":
            if (C2) break;
          case "keydown":
          case "keyup":
            lo(q, e, R);
        }
        var ht;
        if (Nf)
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
          An ? Xr(t, e) && (pt = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (pt = "onCompositionStart");
        pt && (Yr && e.locale !== "ko" && (An || pt !== "onCompositionStart" ? pt === "onCompositionEnd" && An && (ht = jr()) : (ge = R, xf = "value" in ge ? ge.value : ge.textContent, An = !0)), P = yi(_, pt), 0 < P.length && (pt = new Br(
          pt,
          t,
          null,
          e,
          R
        ), q.push({ event: pt, listeners: P }), ht ? pt.data = ht : (ht = Vr(e), ht !== null && (pt.data = ht)))), (ht = z2 ? T2(t, e) : _2(t, e)) && (pt = yi(_, "onBeforeInput"), 0 < pt.length && (P = new Br(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          R
        ), q.push({
          event: P,
          listeners: pt
        }), P.data = ht)), pm(
          q,
          t,
          _,
          e,
          R
        );
      }
      Ns(q, l);
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
  function Hs(t, l, e, n, a) {
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
  var xm = /\r\n?/g, Mm = /\u0000|\uFFFD/g;
  function Ds(t) {
    return (typeof t == "string" ? t : "" + t).replace(xm, `
`).replace(Mm, "");
  }
  function Rs(t, l) {
    return l = Ds(l), Ds(t) === l;
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
        Dr(t, n, u);
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
        n != null && (t.onclick = Fl);
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
        kl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          n
        );
        break;
      case "xlinkArcrole":
        kl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          n
        );
        break;
      case "xlinkRole":
        kl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          n
        );
        break;
      case "xlinkShow":
        kl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          n
        );
        break;
      case "xlinkTitle":
        kl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          n
        );
        break;
      case "xlinkType":
        kl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          n
        );
        break;
      case "xmlBase":
        kl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          n
        );
        break;
      case "xmlLang":
        kl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          n
        );
        break;
      case "xmlSpace":
        kl(
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
  function a0(t, l, e, n, a, u) {
    switch (e) {
      case "style":
        Dr(t, n, u);
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
        n != null && (t.onclick = Fl);
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
        if (!Ar.hasOwnProperty(e))
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
            var R = e[n];
            if (R != null)
              switch (n) {
                case "name":
                  a = R;
                  break;
                case "type":
                  r = R;
                  break;
                case "checked":
                  g = R;
                  break;
                case "defaultChecked":
                  _ = R;
                  break;
                case "value":
                  u = R;
                  break;
                case "defaultValue":
                  s = R;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (R != null)
                    throw Error(c(137, l));
                  break;
                default:
                  Ot(t, l, n, R, e, null);
              }
          }
        _r(
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
        Or(t, n, a, u);
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
        if (pf(l)) {
          for (R in e)
            e.hasOwnProperty(R) && (n = e[R], n !== void 0 && a0(
              t,
              l,
              R,
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
  function zm(t, l, e, n) {
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
        var a = null, u = null, r = null, s = null, g = null, _ = null, R = null;
        for (D in e) {
          var q = e[D];
          if (e.hasOwnProperty(D) && q != null)
            switch (D) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                g = q;
              default:
                n.hasOwnProperty(D) || Ot(t, l, D, null, n, q);
            }
        }
        for (var N in n) {
          var D = n[N];
          if (q = e[N], n.hasOwnProperty(N) && (D != null || q != null))
            switch (N) {
              case "type":
                u = D;
                break;
              case "name":
                a = D;
                break;
              case "checked":
                _ = D;
                break;
              case "defaultChecked":
                R = D;
                break;
              case "value":
                r = D;
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
                D !== q && Ot(
                  t,
                  l,
                  N,
                  D,
                  n,
                  q
                );
            }
        }
        yf(
          t,
          r,
          s,
          g,
          _,
          R,
          u,
          a
        );
        return;
      case "select":
        D = r = s = N = null;
        for (u in e)
          if (g = e[u], e.hasOwnProperty(u) && g != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                D = g;
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
        l = s, e = r, n = D, N != null ? pn(t, !!e, N, !1) : !!n != !!e && (l != null ? pn(t, !!e, l, !0) : pn(t, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        D = N = null;
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
                D = a;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (a != null) throw Error(c(91));
                break;
              default:
                a !== u && Ot(t, l, r, a, n, u);
            }
        Nr(t, N, D);
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
          if (N = n[g], D = e[g], n.hasOwnProperty(g) && N !== D && (N != null || D != null))
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
                  D
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
          if (N = n[_], D = e[_], n.hasOwnProperty(_) && N !== D && (N != null || D != null))
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
                  D
                );
            }
        return;
      default:
        if (pf(l)) {
          for (var Ht in e)
            N = e[Ht], e.hasOwnProperty(Ht) && N !== void 0 && !n.hasOwnProperty(Ht) && a0(
              t,
              l,
              Ht,
              void 0,
              n,
              N
            );
          for (R in n)
            N = n[R], D = e[R], !n.hasOwnProperty(R) || N === D || N === void 0 && D === void 0 || a0(
              t,
              l,
              R,
              N,
              n,
              D
            );
          return;
        }
    }
    for (var x in e)
      N = e[x], e.hasOwnProperty(x) && N != null && !n.hasOwnProperty(x) && Ot(t, l, x, null, n, N);
    for (q in n)
      N = n[q], D = e[q], !n.hasOwnProperty(q) || N === D || N == null && D == null || Ot(t, l, q, N, n, D);
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
            var R = g.transferSize, q = g.initiatorType;
            R && Us(q) && (g = g.responseEnd, r += R * (g < s ? 1 : (s - _) / (g - _)));
          }
          if (--n, l += 8 * (u + r) / (a.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var u0 = null, i0 = null;
  function gi(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function js(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Cs(t, l) {
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
  function f0(t, l) {
    return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
  }
  var c0 = null;
  function _m() {
    var t = window.event;
    return t && t.type === "popstate" ? t === c0 ? !1 : (c0 = t, !0) : (c0 = null, !1);
  }
  var qs = typeof setTimeout == "function" ? setTimeout : void 0, Nm = typeof clearTimeout == "function" ? clearTimeout : void 0, Bs = typeof Promise == "function" ? Promise : void 0, Om = typeof queueMicrotask == "function" ? queueMicrotask : typeof Bs < "u" ? function(t) {
    return Bs.resolve(null).then(t).catch(Hm);
  } : qs;
  function Hm(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function je(t) {
    return t === "head";
  }
  function Zs(t, l) {
    var e = l, n = 0;
    do {
      var a = e.nextSibling;
      if (t.removeChild(e), a && a.nodeType === 8)
        if (e = a.data, e === "/$" || e === "/&") {
          if (n === 0) {
            t.removeChild(a), kn(l);
            return;
          }
          n--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          n++;
        else if (e === "html")
          wa(t.ownerDocument.documentElement);
        else if (e === "head") {
          e = t.ownerDocument.head, wa(e);
          for (var u = e.firstChild; u; ) {
            var r = u.nextSibling, s = u.nodeName;
            u[ra] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && u.rel.toLowerCase() === "stylesheet" || e.removeChild(u), u = r;
          }
        } else
          e === "body" && wa(t.ownerDocument.body);
      e = a;
    } while (e);
    kn(l);
  }
  function Ys(t, l) {
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
  function r0(t) {
    var l = t.firstChild;
    for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
      var e = l;
      switch (l = l.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          r0(e), mf(e);
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
  function Rm(t, l, e) {
    if (l === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Cl(t.nextSibling), t === null)) return null;
    return t;
  }
  function Ls(t, l) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = Cl(t.nextSibling), t === null)) return null;
    return t;
  }
  function o0(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function s0(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function Um(t, l) {
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
  var h0 = null;
  function Gs(t) {
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
  function Xs(t) {
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
  function Vs(t, l, e) {
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
  function wa(t) {
    for (var l = t.attributes; l.length; )
      t.removeAttributeNode(l[0]);
    mf(t);
  }
  var ql = /* @__PURE__ */ new Map(), Qs = /* @__PURE__ */ new Set();
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
    l !== null && l.tag === 5 && l.type === "form" ? f1(l) : de.r(t);
  }
  var Jn = typeof document > "u" ? null : document;
  function ws(t, l, e) {
    var n = Jn;
    if (n && typeof l == "string" && l) {
      var a = Nl(l);
      a = 'link[rel="' + t + '"][href="' + a + '"]', typeof e == "string" && (a += '[crossorigin="' + e + '"]'), Qs.has(a) || (Qs.add(a), t = { rel: t, crossOrigin: e, href: l }, n.querySelector(a) === null && (l = n.createElement("link"), el(l, "link", t), kt(l), n.head.appendChild(l)));
    }
  }
  function qm(t) {
    de.D(t), ws("dns-prefetch", t, null);
  }
  function Bm(t, l) {
    de.C(t, l), ws("preconnect", t, l);
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
      ), ql.set(u, t), n.querySelector(a) !== null || l === "style" && n.querySelector(Ka(u)) || l === "script" && n.querySelector(Ja(u)) || (l = n.createElement("link"), el(l, "link", t), kt(l), n.head.appendChild(l)));
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
        n = e.createElement("link"), el(n, "link", t), kt(n), e.head.appendChild(n);
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
          Ka(u)
        ))
          s.loading = 5;
        else {
          t = p(
            { rel: "stylesheet", href: t, "data-precedence": l },
            e
          ), (e = ql.get(u)) && d0(t, e);
          var g = r = n.createElement("link");
          kt(g), el(g, "link", t), g._p = new Promise(function(_, R) {
            g.onload = _, g.onerror = R;
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
      u || (u = e.querySelector(Ja(a)), u || (t = p({ src: t, async: !0 }, l), (l = ql.get(a)) && m0(t, l), u = e.createElement("script"), kt(u), el(u, "link", t), e.head.appendChild(u)), u = {
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
      u || (u = e.querySelector(Ja(a)), u || (t = p({ src: t, async: !0, type: "module" }, l), (l = ql.get(a)) && m0(t, l), u = e.createElement("script"), kt(u), el(u, "link", t), e.head.appendChild(u)), u = {
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
            Ka(t)
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
  function Ka(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Js(t) {
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
    }), el(l, "link", e), kt(l), t.head.appendChild(l));
  }
  function Wn(t) {
    return '[src="' + Nl(t) + '"]';
  }
  function Ja(t) {
    return "script[async]" + t;
  }
  function $s(t, l, e) {
    if (l.count++, l.instance === null)
      switch (l.type) {
        case "style":
          var n = t.querySelector(
            'style[data-href~="' + Nl(e.href) + '"]'
          );
          if (n)
            return l.instance = n, kt(n), n;
          var a = p({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return n = (t.ownerDocument || t).createElement(
            "style"
          ), kt(n), el(n, "style", a), Si(n, e.precedence, t), l.instance = n;
        case "stylesheet":
          a = $n(e.href);
          var u = t.querySelector(
            Ka(a)
          );
          if (u)
            return l.state.loading |= 4, l.instance = u, kt(u), u;
          n = Js(e), (a = ql.get(a)) && d0(n, a), u = (t.ownerDocument || t).createElement("link"), kt(u);
          var r = u;
          return r._p = new Promise(function(s, g) {
            r.onload = s, r.onerror = g;
          }), el(u, "link", n), l.state.loading |= 4, Si(u, e.precedence, t), l.instance = u;
        case "script":
          return u = Wn(e.src), (a = t.querySelector(
            Ja(u)
          )) ? (l.instance = a, kt(a), a) : (n = e, (a = ql.get(u)) && (n = p({}, e), m0(n, a)), t = t.ownerDocument || t, a = t.createElement("script"), kt(a), el(a, "link", n), t.head.appendChild(a), l.instance = a);
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
  function d0(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.title == null && (t.title = l.title);
  }
  function m0(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
  }
  var bi = null;
  function Ws(t, l, e) {
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
  function ks(t, l, e) {
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
  function wm(t, l, e, n) {
    if (e.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var a = $n(n.href), u = l.querySelector(
          Ka(a)
        );
        if (u) {
          l = u._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = Ei.bind(t), l.then(t, t)), e.state.loading |= 4, e.instance = u, kt(u);
          return;
        }
        u = l.ownerDocument || l, n = Js(n), (a = ql.get(a)) && d0(n, a), u = u.createElement("link"), kt(u);
        var r = u;
        r._p = new Promise(function(s, g) {
          r.onload = s, r.onerror = g;
        }), el(u, "link", n), e.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(e, l), (l = e.state.preload) && (e.state.loading & 3) === 0 && (t.count++, e = Ei.bind(t), l.addEventListener("load", e), l.addEventListener("error", e));
    }
  }
  var v0 = 0;
  function Km(t, l) {
    return t.stylesheets && t.count === 0 && xi(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(e) {
      var n = setTimeout(function() {
        if (t.stylesheets && xi(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + l);
      0 < t.imgBytes && v0 === 0 && (v0 = 62500 * Tm());
      var a = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && xi(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > v0 ? 50 : 800) + l
      );
      return t.unsuspend = e, function() {
        t.unsuspend = null, clearTimeout(n), clearTimeout(a);
      };
    } : null;
  }
  function Ei() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) xi(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Ai = null;
  function xi(t, l) {
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
    $$typeof: k,
    Provider: null,
    Consumer: null,
    _currentValue: Q,
    _currentValue2: Q,
    _threadCount: 0
  };
  function $m(t, l, e, n, a, u, r, s, g) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = of(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = of(0), this.hiddenUpdates = of(null), this.identifierPrefix = n, this.onUncaughtError = a, this.onCaughtError = u, this.onRecoverableError = r, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = g, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Is(t, l, e, n, a, u, r, s, g, _, R, q) {
    return t = new $m(
      t,
      l,
      e,
      r,
      g,
      _,
      R,
      q,
      s
    ), l = 1, u === !0 && (l |= 24), u = bl(3, null, null, l), t.current = u, u.stateNode = t, l = $f(), l.refCount++, t.pooledCache = l, l.refCount++, u.memoizedState = {
      element: n,
      isDehydrated: e,
      cache: l
    }, If(u), t;
  }
  function Ps(t) {
    return t ? (t = Tn, t) : Tn;
  }
  function th(t, l, e, n, a, u) {
    a = Ps(a), n.context === null ? n.context = a : n.pendingContext = a, n = xe(l), n.payload = { element: e }, u = u === void 0 ? null : u, u !== null && (n.callback = u), e = Me(t, n, l), e !== null && (dl(e, t, l), Ta(e, t, l));
  }
  function lh(t, l) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < l ? e : l;
    }
  }
  function y0(t, l) {
    lh(t, l), (t = t.alternate) && lh(t, l);
  }
  function eh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = Je(t, 67108864);
      l !== null && dl(l, t, 67108864), y0(t, 67108864);
    }
  }
  function nh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = zl();
      l = sf(l);
      var e = Je(t, l);
      e !== null && dl(e, t, l), y0(t, l);
    }
  }
  var Mi = !0;
  function Wm(t, l, e, n) {
    var a = z.T;
    z.T = null;
    var u = G.p;
    try {
      G.p = 2, g0(t, l, e, n);
    } finally {
      G.p = u, z.T = a;
    }
  }
  function km(t, l, e, n) {
    var a = z.T;
    z.T = null;
    var u = G.p;
    try {
      G.p = 8, g0(t, l, e, n);
    } finally {
      G.p = u, z.T = a;
    }
  }
  function g0(t, l, e, n) {
    if (Mi) {
      var a = p0(n);
      if (a === null)
        n0(
          t,
          l,
          n,
          zi,
          e
        ), uh(t, n);
      else if (Im(
        a,
        t,
        l,
        e,
        n
      ))
        n.stopPropagation();
      else if (uh(t, n), l & 4 && -1 < Fm.indexOf(t)) {
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
                    Kl(u), (Mt & 6) === 0 && (fi = yl() + 500, Xa(0));
                  }
                }
                break;
              case 31:
              case 13:
                s = Je(u, 2), s !== null && dl(s, u, 2), ri(), y0(u, 2);
            }
          if (u = p0(n), u === null && n0(
            t,
            l,
            n,
            zi,
            e
          ), u === a) break;
          a = u;
        }
        a !== null && n.stopPropagation();
      } else
        n0(
          t,
          l,
          n,
          null,
          e
        );
    }
  }
  function p0(t) {
    return t = bf(t), S0(t);
  }
  var zi = null;
  function S0(t) {
    if (zi = null, t = mn(t), t !== null) {
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
    return zi = t, null;
  }
  function ah(t) {
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
          case sr:
            return 2;
          case hr:
            return 8;
          case mu:
          case Bd:
            return 32;
          case dr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var b0 = !1, Ce = null, qe = null, Be = null, Wa = /* @__PURE__ */ new Map(), ka = /* @__PURE__ */ new Map(), Ze = [], Fm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function uh(t, l) {
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
        ka.delete(l.pointerId);
    }
  }
  function Fa(t, l, e, n, a, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: l,
      domEventName: e,
      eventSystemFlags: n,
      nativeEvent: u,
      targetContainers: [a]
    }, l !== null && (l = vn(l), l !== null && eh(l)), t) : (t.eventSystemFlags |= n, l = t.targetContainers, a !== null && l.indexOf(a) === -1 && l.push(a), t);
  }
  function Im(t, l, e, n, a) {
    switch (l) {
      case "focusin":
        return Ce = Fa(
          Ce,
          t,
          l,
          e,
          n,
          a
        ), !0;
      case "dragenter":
        return qe = Fa(
          qe,
          t,
          l,
          e,
          n,
          a
        ), !0;
      case "mouseover":
        return Be = Fa(
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
          Fa(
            Wa.get(u) || null,
            t,
            l,
            e,
            n,
            a
          )
        ), !0;
      case "gotpointercapture":
        return u = a.pointerId, ka.set(
          u,
          Fa(
            ka.get(u) || null,
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
  function ih(t) {
    var l = mn(t.target);
    if (l !== null) {
      var e = y(l);
      if (e !== null) {
        if (l = e.tag, l === 13) {
          if (l = v(e), l !== null) {
            t.blockedOn = l, Sr(t.priority, function() {
              nh(e);
            });
            return;
          }
        } else if (l === 31) {
          if (l = m(e), l !== null) {
            t.blockedOn = l, Sr(t.priority, function() {
              nh(e);
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
      var e = p0(t.nativeEvent);
      if (e === null) {
        e = t.nativeEvent;
        var n = new e.constructor(
          e.type,
          e
        );
        Sf = n, e.target.dispatchEvent(n), Sf = null;
      } else
        return l = vn(e), l !== null && eh(l), t.blockedOn = e, !1;
      l.shift();
    }
    return !0;
  }
  function fh(t, l, e) {
    Ti(t) && e.delete(l);
  }
  function Pm() {
    b0 = !1, Ce !== null && Ti(Ce) && (Ce = null), qe !== null && Ti(qe) && (qe = null), Be !== null && Ti(Be) && (Be = null), Wa.forEach(fh), ka.forEach(fh);
  }
  function _i(t, l) {
    t.blockedOn === l && (t.blockedOn = null, b0 || (b0 = !0, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      Pm
    )));
  }
  var Ni = null;
  function ch(t) {
    Ni !== t && (Ni = t, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      function() {
        Ni === t && (Ni = null);
        for (var l = 0; l < t.length; l += 3) {
          var e = t[l], n = t[l + 1], a = t[l + 2];
          if (typeof n != "function") {
            if (S0(n || e) === null)
              continue;
            break;
          }
          var u = vn(e);
          u !== null && (t.splice(l, 3), l -= 3, pc(
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
  function kn(t) {
    function l(g) {
      return _i(g, t);
    }
    Ce !== null && _i(Ce, t), qe !== null && _i(qe, t), Be !== null && _i(Be, t), Wa.forEach(l), ka.forEach(l);
    for (var e = 0; e < Ze.length; e++) {
      var n = Ze[e];
      n.blockedOn === t && (n.blockedOn = null);
    }
    for (; 0 < Ze.length && (e = Ze[0], e.blockedOn === null); )
      ih(e), e.blockedOn === null && Ze.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (n = 0; n < e.length; n += 3) {
        var a = e[n], u = e[n + 1], r = a[fl] || null;
        if (typeof u == "function")
          r || ch(e);
        else if (r) {
          var s = null;
          if (u && u.hasAttribute("formAction")) {
            if (a = u, r = u[fl] || null)
              s = r.formAction;
            else if (S0(a) !== null) continue;
          } else s = r.action;
          typeof s == "function" ? e[n + 1] = s : (e.splice(n, 3), n -= 3), ch(e);
        }
      }
  }
  function rh() {
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
  function E0(t) {
    this._internalRoot = t;
  }
  Oi.prototype.render = E0.prototype.render = function(t) {
    var l = this._internalRoot;
    if (l === null) throw Error(c(409));
    var e = l.current, n = zl();
    th(e, n, t, l, null, null);
  }, Oi.prototype.unmount = E0.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var l = t.containerInfo;
      th(t.current, 2, null, t, null, null), ri(), l[dn] = null;
    }
  };
  function Oi(t) {
    this._internalRoot = t;
  }
  Oi.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var l = pr();
      t = { blockedOn: null, target: t, priority: l };
      for (var e = 0; e < Ze.length && l !== 0 && l < Ze[e].priority; e++) ;
      Ze.splice(e, 0, t), e === 0 && ih(t);
    }
  };
  var oh = f.version;
  if (oh !== "19.2.0")
    throw Error(
      c(
        527,
        oh,
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
    currentDispatcherRef: z,
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
    var e = !1, n = "", a = g1, u = p1, r = S1;
    return l != null && (l.unstable_strictMode === !0 && (e = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (a = l.onUncaughtError), l.onCaughtError !== void 0 && (u = l.onCaughtError), l.onRecoverableError !== void 0 && (r = l.onRecoverableError)), l = Is(
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
      rh
    ), t[dn] = l.current, e0(t), new E0(l);
  }, Pa.hydrateRoot = function(t, l, e) {
    if (!h(t)) throw Error(c(299));
    var n = !1, a = "", u = g1, r = p1, s = S1, g = null;
    return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (a = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (r = e.onCaughtError), e.onRecoverableError !== void 0 && (s = e.onRecoverableError), e.formState !== void 0 && (g = e.formState)), l = Is(
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
      rh
    ), l.context = Ps(null), e = l.current, n = zl(), n = sf(n), a = xe(n), a.callback = null, Me(e, a, n), e = n, l.current.lanes = e, ca(l, e), Kl(l), t[dn] = l.current, e0(t), new Oi(l);
  }, Pa.version = "19.2.0", Pa;
}
var td;
function dg() {
  if (td) return H0.exports;
  td = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (f) {
        console.error(f);
      }
  }
  return i(), H0.exports = hg(), H0.exports;
}
var mg = dg();
const vg = [["AI & Intelligent Systems", "Put intelligence to work.", "Connect AI to the decisions, workflows and information that matter to your business.", "Workflow design · Applied AI · Human oversight"], ["Data & Decision Infrastructure", "Make fragmented data useful.", "Bring information together so teams can see what is changing and decide what comes next.", "Data integration · Spatial intelligence · Decision systems"], ["Cybersecurity & Identity", "Build trust into the system.", "Align access, identity and security with how your organization actually operates.", "Identity architecture · Access governance · Secure design"], ["Product Engineering", "Turn a business need into a working product.", "Design and engineer software around the people who use it and the outcomes it needs to deliver.", "Product strategy · Experience design · Software engineering"]], Le = { transport: { name: "Add community transport", short: "Transport scenario", factor: 0.77, coverage: 1.65, detail: "Two additional weekday routes connect selected communities to existing service locations." }, capacity: { name: "Extend service hours", short: "Capacity scenario", factor: 0.86, coverage: 1.22, detail: "Evening appointments add capacity at existing service locations." }, mobile: { name: "Deploy a mobile care team", short: "Mobile care scenario", factor: 0.68, coverage: 2.05, detail: "A mobile team adds recurring visits in areas beyond the existing service footprint." } }, P0 = ["Transportation", "Service capacity", "Digital access"], Dd = (i, f = 0) => 36 + (Number(i) * 7 + f * 19) % 58, ef = () => /* @__PURE__ */ O.jsx(ng, { size: 23, "aria-hidden": "true" });
function Rd({ zip: i, scenario: f, horizon: o = 6 }) {
  const c = 105 + Number(i) % 35, h = Math.round(c * (1 + 0.32 * o / 6)), y = Math.round(c * (1 + (Le[f].factor - 1) * o / 6)), v = lf().domain([-6, o]).range([48, 380]), m = lf().domain([0, 220]).range([218, 38]), S = (d) => d.map((b, p) => `${p ? "L" : "M"}${v(b[0])},${m(b[1])}`).join(" ");
  return /* @__PURE__ */ O.jsxs("div", { className: "chart", children: [
    /* @__PURE__ */ O.jsx("h3", { children: "Forecast unmet demand" }),
    /* @__PURE__ */ O.jsxs("svg", { viewBox: "0 0 414 250", role: "img", "aria-label": `Illustrative demand index for ${i}: current plan ${h}; ${Le[f].short} ${y} at ${o} months.`, children: [
      [0, 50, 100, 150, 200].map((d) => /* @__PURE__ */ O.jsxs("g", { children: [
        /* @__PURE__ */ O.jsx("line", { x1: "48", x2: "380", y1: m(d), y2: m(d), stroke: "#e1e8ee" }),
        /* @__PURE__ */ O.jsx("text", { x: "35", y: m(d) + 4, textAnchor: "end", children: d })
      ] }, d)),
      /* @__PURE__ */ O.jsx("text", { x: (48 + v(0)) / 2, y: "17", textAnchor: "middle", children: "Observed" }),
      /* @__PURE__ */ O.jsx("text", { x: (380 + v(0)) / 2, y: "17", textAnchor: "middle", children: "Forecast" }),
      /* @__PURE__ */ O.jsx("line", { x1: v(0), x2: v(0), y1: "30", y2: "218", stroke: "#a8b8cb", strokeDasharray: "5 5" }),
      /* @__PURE__ */ O.jsx("path", { d: S([[-6, c * 0.74], [-3, c * 0.88], [0, c]]), fill: "none", stroke: "var(--blue)", strokeWidth: "2.5" }),
      /* @__PURE__ */ O.jsx("path", { d: S([[0, c], [o, h]]), fill: "none", stroke: "var(--blue)", strokeWidth: "2.5", strokeDasharray: "7 5" }),
      /* @__PURE__ */ O.jsx("path", { d: S([[0, c], [o, y]]), fill: "none", stroke: "var(--teal)", strokeWidth: "2.5", strokeDasharray: "7 5" }),
      [[-6, c * 0.74, "var(--blue)"], [0, c, "var(--blue)"], [o, h, "var(--blue)"], [o, y, "var(--teal)"]].map(([d, b, p], M) => /* @__PURE__ */ O.jsx("circle", { cx: v(d), cy: m(b), r: "4.5", fill: p }, M)),
      /* @__PURE__ */ O.jsx("text", { x: "48", y: "240", children: "-6 months" }),
      /* @__PURE__ */ O.jsx("text", { x: v(0), y: "240", textAnchor: "middle", children: "Now" }),
      /* @__PURE__ */ O.jsxs("text", { x: "380", y: "240", textAnchor: "end", children: [
        "+",
        o,
        " months"
      ] }),
      /* @__PURE__ */ O.jsx("text", { transform: "translate(12,155) rotate(-90)", textAnchor: "middle", children: "Demand index" })
    ] }),
    /* @__PURE__ */ O.jsxs("div", { className: "chart-legend", children: [
      /* @__PURE__ */ O.jsxs("span", { children: [
        /* @__PURE__ */ O.jsx("i", {}),
        "Current plan"
      ] }),
      /* @__PURE__ */ O.jsxs("span", { children: [
        /* @__PURE__ */ O.jsx("i", { className: "teal" }),
        Le[f].short
      ] })
    ] }),
    /* @__PURE__ */ O.jsx("small", { children: "Illustrative forecast · index, not a count of people" })
  ] });
}
function yg({ data: i, zip: f, setZip: o, layer: c, barrier: h, scenario: y, compact: v = !1 }) {
  const [m, S] = H.useState(1.85), { path: d, projection: b } = H.useMemo(() => {
    const C = ly();
    return i && C.fitExtent([[18, 20], [882, 442]], i), { projection: C, path: Vv(C) };
  }, [i]), p = lf().domain([30, 65, 100]).range(["#e4f0fc", "#9bc3ee", "#396cd2"]), M = i == null ? void 0 : i.features.find((C) => C.properties.ZCTA5CE10 === f), Z = M ? [+M.properties.INTPTLON10, +M.properties.INTPTLAT10] : [-73.82, 42.72], Y = (i == null ? void 0 : i.features.filter((C, L) => L % 5 === 0).map((C) => [+C.properties.INTPTLON10, +C.properties.INTPTLAT10])) || [];
  return /* @__PURE__ */ O.jsxs("div", { className: "map-shell " + (v ? "compact" : ""), children: [
    /* @__PURE__ */ O.jsxs("div", { className: "map-tools", children: [
      /* @__PURE__ */ O.jsxs("label", { className: "map-location", children: [
        /* @__PURE__ */ O.jsx("span", { className: "sr-only", children: "Map ZIP area" }),
        /* @__PURE__ */ O.jsx("select", { "aria-label": "Map ZIP area", value: f, onChange: (C) => o(C.target.value), children: i == null ? void 0 : i.features.map((C) => C.properties.ZCTA5CE10).sort().map((C) => /* @__PURE__ */ O.jsxs("option", { value: C, children: [
          "ZIP area ",
          C
        ] }, C)) })
      ] }),
      /* @__PURE__ */ O.jsxs("div", { children: [
        /* @__PURE__ */ O.jsx("button", { "aria-label": "Zoom in", disabled: m >= 3.2, onClick: () => S(Math.min(3.2, m + 0.3)), children: /* @__PURE__ */ O.jsx(ig, {}) }),
        /* @__PURE__ */ O.jsx("button", { "aria-label": "Zoom out", disabled: m <= 1, onClick: () => S(Math.max(1, m - 0.3)), children: /* @__PURE__ */ O.jsx(ug, {}) }),
        /* @__PURE__ */ O.jsx("button", { "aria-label": "Reset map zoom", onClick: () => S(1.85), children: /* @__PURE__ */ O.jsx(eg, {}) })
      ] })
    ] }),
    i ? /* @__PURE__ */ O.jsx("svg", { className: "map", viewBox: "0 0 900 470", "aria-label": "Interactive ZIP tabulation area map", children: /* @__PURE__ */ O.jsxs("g", { transform: `translate(${450 * (1 - m)},${235 * (1 - m)}) scale(${m})`, children: [
      i.features.map((C) => {
        const L = C.properties.ZCTA5CE10, F = Dd(L, h);
        return /* @__PURE__ */ O.jsx("path", { d: d(C), fill: L === f ? "#214fcc" : p(c === "Forecast" ? Math.min(100, F + 12) : F), stroke: L === f ? "#132b42" : "#fff", strokeWidth: L === f ? 2 : 1, tabIndex: L === f ? 0 : -1, role: "button", "aria-label": `Select ZIP area ${L}`, "aria-pressed": L === f, onClick: () => o(L), onKeyDown: (K) => {
          (K.key === "Enter" || K.key === " ") && (K.preventDefault(), o(L));
        }, children: /* @__PURE__ */ O.jsxs("title", { children: [
          "ZIP area ",
          L,
          " · illustrative ",
          P0[h].toLowerCase(),
          " index ",
          F
        ] }) }, L);
      }),
      c === "Resource planning" && Y.map((C, L) => /* @__PURE__ */ O.jsx("path", { d: d(Av().center(C).radius(0.025 * Le[y].coverage)()), fill: "#23616b", fillOpacity: ".09", stroke: "#23616b", strokeWidth: "1.3", strokeDasharray: "5 4", pointerEvents: "none" }, "c" + L)),
      Y.map((C, L) => /* @__PURE__ */ O.jsx("circle", { cx: b(C)[0], cy: b(C)[1], r: "5", fill: "#23616b", stroke: "white", strokeWidth: "1.5", pointerEvents: "none" }, L)),
      M && /* @__PURE__ */ O.jsxs("g", { pointerEvents: "none", transform: `translate(${b(Z)[0]},${b(Z)[1]})`, children: [
        /* @__PURE__ */ O.jsx("circle", { r: "6", fill: "#132b42", stroke: "white", strokeWidth: "2" }),
        /* @__PURE__ */ O.jsx("rect", { x: "-59", y: "-39", width: "118", height: "26", fill: "#214fcc" }),
        /* @__PURE__ */ O.jsxs("text", { x: "0", y: "-21", textAnchor: "middle", fill: "white", fontSize: "13", children: [
          "ZIP area ",
          f
        ] })
      ] })
    ] }) }) : /* @__PURE__ */ O.jsx("p", { className: "map-loading", children: "Loading geographic boundaries…" }),
    /* @__PURE__ */ O.jsxs("div", { className: "map-legend", children: [
      /* @__PURE__ */ O.jsxs("span", { children: [
        /* @__PURE__ */ O.jsx("i", { className: "high" }),
        "Higher barriers"
      ] }),
      /* @__PURE__ */ O.jsxs("span", { children: [
        /* @__PURE__ */ O.jsx("i", { className: "low" }),
        "Lower barriers"
      ] }),
      /* @__PURE__ */ O.jsxs("span", { children: [
        /* @__PURE__ */ O.jsx("i", { className: "point" }),
        "Sample service location"
      ] }),
      c === "Resource planning" && /* @__PURE__ */ O.jsxs("span", { children: [
        /* @__PURE__ */ O.jsx("i", { className: "coverage" }),
        "Scenario coverage"
      ] })
    ] }),
    /* @__PURE__ */ O.jsx("div", { className: "map-caption", children: "Illustrative planning scenario" })
  ] });
}
function gg({ data: i, compact: f = !1, onExplore: o, onReview: c }) {
  const [h, y] = H.useState("12205"), [v, m] = H.useState(f ? "Barriers" : "Resource planning"), [S, d] = H.useState("transport"), [b, p] = H.useState(0), [M, Z] = H.useState(6), Y = (i == null ? void 0 : i.features.map((C) => C.properties.ZCTA5CE10).sort()) || ["12205"];
  return /* @__PURE__ */ O.jsxs("div", { "data-layer": v, className: "workspace " + (f ? "workspace-compact" : ""), id: f ? void 0 : "planning", children: [
    /* @__PURE__ */ O.jsxs("div", { className: "geo-panel", children: [
      /* @__PURE__ */ O.jsxs("div", { className: "workspace-toolbar", children: [
        !f && /* @__PURE__ */ O.jsx("strong", { children: "Access planning" }),
        /* @__PURE__ */ O.jsx("div", { className: "tabs", role: "tablist", "aria-label": "Map view", children: ["Barriers", "Forecast", "Resource planning"].map((C) => /* @__PURE__ */ O.jsx("button", { onKeyDown: (L) => {
          if (L.key === "ArrowRight" || L.key === "ArrowLeft") {
            L.preventDefault();
            const F = Array.from(L.currentTarget.parentElement.children), K = F.indexOf(L.currentTarget), k = F[(K + (L.key === "ArrowRight" ? 1 : F.length - 1)) % F.length];
            k.focus(), k.click();
          }
        }, role: "tab", "aria-selected": v === C, onClick: () => m(C), children: C }, C)) })
      ] }),
      /* @__PURE__ */ O.jsx(yg, { data: i, zip: h, setZip: y, layer: v, barrier: b, scenario: S, compact: f }),
      !f && /* @__PURE__ */ O.jsxs("div", { className: "map-filters", children: [
        /* @__PURE__ */ O.jsxs("label", { children: [
          "ZIP area",
          /* @__PURE__ */ O.jsx("select", { "aria-label": "ZIP area", value: h, onChange: (C) => y(C.target.value), children: Y.map((C) => /* @__PURE__ */ O.jsx("option", { children: C }, C)) })
        ] }),
        /* @__PURE__ */ O.jsxs("label", { children: [
          "Barrier",
          /* @__PURE__ */ O.jsx("select", { "aria-label": "Barrier", value: b, onChange: (C) => p(+C.target.value), children: P0.map((C, L) => /* @__PURE__ */ O.jsx("option", { value: L, children: C }, C)) })
        ] }),
        /* @__PURE__ */ O.jsxs("p", { "aria-live": "polite", children: [
          /* @__PURE__ */ O.jsx("strong", { children: Dd(h, b) }),
          " / 100",
          /* @__PURE__ */ O.jsx("br", {}),
          /* @__PURE__ */ O.jsx("small", { children: "Illustrative barrier index" })
        ] })
      ] })
    ] }),
    !f && /* @__PURE__ */ O.jsxs("aside", { className: "response-panel", children: [
      /* @__PURE__ */ O.jsx("h2", { children: v === "Barriers" ? "Understand the barriers" : v === "Forecast" ? "Look ahead" : "Compare the response" }),
      /* @__PURE__ */ O.jsx("label", { className: "sr-only", htmlFor: "scenario", children: "Planning scenario" }),
      /* @__PURE__ */ O.jsx("select", { id: "scenario", value: S, onChange: (C) => d(C.target.value), children: Object.entries(Le).map(([C, L]) => /* @__PURE__ */ O.jsx("option", { value: C, children: L.name }, C)) }),
      /* @__PURE__ */ O.jsx(Rd, { zip: h, scenario: S, horizon: M }),
      /* @__PURE__ */ O.jsx("p", { children: "Compare service reach, capacity and funding before committing resources." }),
      /* @__PURE__ */ O.jsxs("button", { className: "text-link", onClick: () => c({ zip: h, scenario: S, horizon: M, barrier: b }), children: [
        "Review scenario ",
        /* @__PURE__ */ O.jsx(ef, {})
      ] }),
      v === "Forecast" && /* @__PURE__ */ O.jsxs("label", { className: "horizon", children: [
        "Forecast horizon: ",
        M,
        " months",
        /* @__PURE__ */ O.jsx("input", { type: "range", min: "3", max: "12", step: "3", value: M, onChange: (C) => Z(+C.target.value) })
      ] }),
      v === "Barriers" && /* @__PURE__ */ O.jsxs("p", { className: "context-note", children: [
        "Explore ",
        P0[b].toLowerCase(),
        " across neighboring areas. Select a ZIP area on the map or in the list to update the comparison."
      ] })
    ] }),
    f && v === "Forecast" && /* @__PURE__ */ O.jsxs("div", { className: "compact-result", children: [
      /* @__PURE__ */ O.jsx("strong", { children: "From visibility to foresight." }),
      /* @__PURE__ */ O.jsx("span", { children: "Compare future demand under different service plans." }),
      /* @__PURE__ */ O.jsxs("button", { className: "text-link", onClick: o, children: [
        "Open forecast ",
        /* @__PURE__ */ O.jsx(ef, {})
      ] })
    ] })
  ] });
}
function pg({ modal: i, close: f }) {
  const o = H.useRef(null), [c, h] = H.useState(!1);
  H.useEffect(() => {
    const m = document.activeElement;
    return o.current.showModal(), () => m == null ? void 0 : m.focus();
  }, []);
  const y = i.type === "scenario" ? i.details : null;
  function v() {
    h(!0);
  }
  return /* @__PURE__ */ O.jsxs("dialog", { "aria-label": i.type === "contact" ? "Contact SozoRock" : i.type === "scenario" ? "Scenario review" : i.title, ref: o, onCancel: f, onClick: (m) => {
    m.target === o.current && f();
  }, children: [
    /* @__PURE__ */ O.jsx("button", { className: "close", onClick: f, "aria-label": "Close dialog", children: /* @__PURE__ */ O.jsx(fg, { size: 25 }) }),
    i.type === "contact" ? /* @__PURE__ */ O.jsxs(O.Fragment, { children: [
      /* @__PURE__ */ O.jsx("p", { className: "eyebrow", children: "LET’S TALK" }),
      /* @__PURE__ */ O.jsx("h2", { children: "What are you working toward?" }),
      /* @__PURE__ */ O.jsx("p", { children: "Tell us where your organization needs better systems or clearer decisions." }),
      /* @__PURE__ */ O.jsxs("form", { onSubmit: (m) => {
        m.preventDefault(), h(!0);
      }, children: [
        /* @__PURE__ */ O.jsxs("label", { children: [
          "Name",
          /* @__PURE__ */ O.jsx("input", { required: !0, autoComplete: "name", name: "name" })
        ] }),
        /* @__PURE__ */ O.jsxs("label", { children: [
          "Work email",
          /* @__PURE__ */ O.jsx("input", { required: !0, type: "email", autoComplete: "email", name: "email" })
        ] }),
        /* @__PURE__ */ O.jsxs("label", { children: [
          "Area of interest",
          /* @__PURE__ */ O.jsxs("select", { name: "interest", children: [
            /* @__PURE__ */ O.jsx("option", { children: "CB-CAP" }),
            vg.map((m) => /* @__PURE__ */ O.jsx("option", { children: m[0] }, m[0]))
          ] })
        ] }),
        /* @__PURE__ */ O.jsxs("label", { children: [
          "Your priority",
          /* @__PURE__ */ O.jsx("textarea", { required: !0, name: "priority", rows: "3" })
        ] }),
        /* @__PURE__ */ O.jsx("p", { className: "context-note", children: "Preview form. Information stays in this browser session and is not sent." }),
        /* @__PURE__ */ O.jsxs("button", { className: "primary", type: "submit", children: [
          "Review inquiry ",
          /* @__PURE__ */ O.jsx(ef, {})
        ] }),
        c && /* @__PURE__ */ O.jsx("p", { role: "status", className: "form-status", children: "Inquiry ready for review. Sending is not connected in this preview." })
      ] })
    ] }) : y ? /* @__PURE__ */ O.jsxs(O.Fragment, { children: [
      /* @__PURE__ */ O.jsxs("p", { className: "eyebrow", children: [
        "ILLUSTRATIVE SCENARIO · ZIP AREA ",
        y.zip
      ] }),
      /* @__PURE__ */ O.jsx("h2", { children: Le[y.scenario].name }),
      /* @__PURE__ */ O.jsx("p", { children: Le[y.scenario].detail }),
      /* @__PURE__ */ O.jsx(Rd, { zip: y.zip, scenario: y.scenario, horizon: y.horizon }),
      /* @__PURE__ */ O.jsx("h3", { children: "Planning assumptions" }),
      /* @__PURE__ */ O.jsxs("ul", { children: [
        /* @__PURE__ */ O.jsx("li", { children: "Existing locations remain open." }),
        /* @__PURE__ */ O.jsx("li", { children: "Demand and service capacity are synthetic demonstration inputs." }),
        /* @__PURE__ */ O.jsx("li", { children: "Coverage circles illustrate reach; they are not road-network travel-time estimates." })
      ] }),
      /* @__PURE__ */ O.jsx("p", { children: "Use the comparison to frame a service plan, funding discussion or CHIP priority. Production forecasts require local data, validation and human review." }),
      /* @__PURE__ */ O.jsxs("button", { className: "primary", onClick: v, children: [
        "Export scenario ",
        /* @__PURE__ */ O.jsx(ag, { size: 20 })
      ] }),
      c && /* @__PURE__ */ O.jsxs("label", { className: "export-label", children: [
        "Scenario export — select and copy",
        /* @__PURE__ */ O.jsx("textarea", { "aria-label": "Scenario export", readOnly: !0, rows: "9", value: JSON.stringify({ status: "Illustrative scenario; not a validated forecast", ...y, assumption: Le[y.scenario].detail }, null, 2) })
      ] })
    ] }) : /* @__PURE__ */ O.jsxs(O.Fragment, { children: [
      /* @__PURE__ */ O.jsx("p", { className: "eyebrow", children: "SOZOROCK TECHNOLOGY" }),
      /* @__PURE__ */ O.jsx("h2", { children: i.title }),
      /* @__PURE__ */ O.jsx("p", { children: i.text }),
      i.extra && /* @__PURE__ */ O.jsx("p", { className: "context-note", children: i.extra }),
      /* @__PURE__ */ O.jsxs("button", { className: "text-link", onClick: f, children: [
        "Back to the preview ",
        /* @__PURE__ */ O.jsx(ef, {})
      ] })
    ] })
  ] });
}
function Sg({ compact: i }) {
  const [f, o] = H.useState(null), [c, h] = H.useState(!1), [y, v] = H.useState(null);
  return H.useEffect(() => {
    fetch(new URL(
      /* @vite-ignore */
      "capital-region-zcta.json",
      import.meta.url
    )).then((m) => {
      if (!m.ok) throw Error("Geography unavailable");
      return m.json();
    }).then(o).catch(() => h(!0));
  }, []), /* @__PURE__ */ O.jsxs(O.Fragment, { children: [
    c ? /* @__PURE__ */ O.jsxs("p", { role: "alert", children: [
      "The interactive map could not load. ",
      /* @__PURE__ */ O.jsx("a", { href: "/cb-cap/request-demo", children: "Discuss your planning needs with us." })
    ] }) : /* @__PURE__ */ O.jsx(gg, { data: f, compact: i, onExplore: () => {
      location.href = "/cb-cap";
    }, onReview: (m) => v({ type: "scenario", details: m }) }),
    y && /* @__PURE__ */ O.jsx(pg, { modal: y, close: () => v(null) })
  ] });
}
for (const i of document.querySelectorAll("[data-planning-root]")) mg.createRoot(i).render(/* @__PURE__ */ O.jsx(Sg, { compact: i.hasAttribute("data-compact") }));
