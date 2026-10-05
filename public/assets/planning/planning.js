var xr = { exports: {} }, Pa = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dd;
function iy() {
  if (dd) return Pa;
  dd = 1;
  var u = Symbol.for("react.transitional.element"), c = Symbol.for("react.fragment");
  function o(f, d, y) {
    var v = null;
    if (y !== void 0 && (v = "" + y), d.key !== void 0 && (v = "" + d.key), "key" in d) {
      y = {};
      for (var m in d)
        m !== "key" && (y[m] = d[m]);
    } else y = d;
    return d = y.ref, {
      $$typeof: u,
      type: f,
      key: v,
      ref: d !== void 0 ? d : null,
      props: y
    };
  }
  return Pa.Fragment = c, Pa.jsx = o, Pa.jsxs = o, Pa;
}
var hd;
function cy() {
  return hd || (hd = 1, xr.exports = iy()), xr.exports;
}
var A = cy(), Ar = { exports: {} }, rt = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var md;
function fy() {
  if (md) return rt;
  md = 1;
  var u = Symbol.for("react.transitional.element"), c = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), y = Symbol.for("react.consumer"), v = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), S = Symbol.for("react.activity"), M = Symbol.iterator;
  function H(E) {
    return E === null || typeof E != "object" ? null : (E = M && E[M] || E["@@iterator"], typeof E == "function" ? E : null);
  }
  var U = {
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
  function V(E, q, X) {
    this.props = E, this.context = q, this.refs = L, this.updater = X || U;
  }
  V.prototype.isReactComponent = {}, V.prototype.setState = function(E, q) {
    if (typeof E != "object" && typeof E != "function" && E != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, E, q, "setState");
  }, V.prototype.forceUpdate = function(E) {
    this.updater.enqueueForceUpdate(this, E, "forceUpdate");
  };
  function Q() {
  }
  Q.prototype = V.prototype;
  function K(E, q, X) {
    this.props = E, this.context = q, this.refs = L, this.updater = X || U;
  }
  var w = K.prototype = new Q();
  w.constructor = K, C(w, V.prototype), w.isPureReactComponent = !0;
  var lt = Array.isArray;
  function F() {
  }
  var k = { H: null, A: null, T: null, S: null }, it = Object.prototype.hasOwnProperty;
  function ft(E, q, X) {
    var $ = X.ref;
    return {
      $$typeof: u,
      type: E,
      key: q,
      ref: $ !== void 0 ? $ : null,
      props: X
    };
  }
  function Et(E, q) {
    return ft(E.type, q, E.props);
  }
  function tt(E) {
    return typeof E == "object" && E !== null && E.$$typeof === u;
  }
  function I(E) {
    var q = { "=": "=0", ":": "=2" };
    return "$" + E.replace(/[=:]/g, function(X) {
      return q[X];
    });
  }
  var ht = /\/+/g;
  function at(E, q) {
    return typeof E == "object" && E !== null && E.key != null ? I("" + E.key) : q.toString(36);
  }
  function Y(E) {
    switch (E.status) {
      case "fulfilled":
        return E.value;
      case "rejected":
        throw E.reason;
      default:
        switch (typeof E.status == "string" ? E.then(F, F) : (E.status = "pending", E.then(
          function(q) {
            E.status === "pending" && (E.status = "fulfilled", E.value = q);
          },
          function(q) {
            E.status === "pending" && (E.status = "rejected", E.reason = q);
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
  function T(E, q, X, $, ut) {
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
            case u:
            case c:
              zt = !0;
              break;
            case p:
              return zt = E._init, T(
                zt(E._payload),
                q,
                X,
                $,
                ut
              );
          }
      }
    if (zt)
      return ut = ut(E), zt = $ === "" ? "." + at(E, 0) : $, lt(ut) ? (X = "", zt != null && (X = zt.replace(ht, "$&/") + "/"), T(ut, q, X, "", function(ia) {
        return ia;
      })) : ut != null && (tt(ut) && (ut = Et(
        ut,
        X + (ut.key == null || E && E.key === ut.key ? "" : ("" + ut.key).replace(
          ht,
          "$&/"
        ) + "/") + zt
      )), q.push(ut)), 1;
    zt = 0;
    var ae = $ === "" ? "." : $ + ":";
    if (lt(E))
      for (var Lt = 0; Lt < E.length; Lt++)
        $ = E[Lt], mt = ae + at($, Lt), zt += T(
          $,
          q,
          X,
          mt,
          ut
        );
    else if (Lt = H(E), typeof Lt == "function")
      for (E = Lt.call(E), Lt = 0; !($ = E.next()).done; )
        $ = $.value, mt = ae + at($, Lt++), zt += T(
          $,
          q,
          X,
          mt,
          ut
        );
    else if (mt === "object") {
      if (typeof E.then == "function")
        return T(
          Y(E),
          q,
          X,
          $,
          ut
        );
      throw q = String(E), Error(
        "Objects are not valid as a React child (found: " + (q === "[object Object]" ? "object with keys {" + Object.keys(E).join(", ") + "}" : q) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return zt;
  }
  function G(E, q, X) {
    if (E == null) return E;
    var $ = [], ut = 0;
    return T(E, $, "", "", function(mt) {
      return q.call(X, mt, ut++);
    }), $;
  }
  function J(E) {
    if (E._status === -1) {
      var q = E._result;
      q = q(), q.then(
        function(X) {
          (E._status === 0 || E._status === -1) && (E._status = 1, E._result = X);
        },
        function(X) {
          (E._status === 0 || E._status === -1) && (E._status = 2, E._result = X);
        }
      ), E._status === -1 && (E._status = 0, E._result = q);
    }
    if (E._status === 1) return E._result.default;
    throw E._result;
  }
  var ct = typeof reportError == "function" ? reportError : function(E) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var q = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof E == "object" && E !== null && typeof E.message == "string" ? String(E.message) : String(E),
        error: E
      });
      if (!window.dispatchEvent(q)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", E);
      return;
    }
    console.error(E);
  }, ot = {
    map: G,
    forEach: function(E, q, X) {
      G(
        E,
        function() {
          q.apply(this, arguments);
        },
        X
      );
    },
    count: function(E) {
      var q = 0;
      return G(E, function() {
        q++;
      }), q;
    },
    toArray: function(E) {
      return G(E, function(q) {
        return q;
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
  return rt.Activity = S, rt.Children = ot, rt.Component = V, rt.Fragment = o, rt.Profiler = d, rt.PureComponent = K, rt.StrictMode = f, rt.Suspense = g, rt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = k, rt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(E) {
      return k.H.useMemoCache(E);
    }
  }, rt.cache = function(E) {
    return function() {
      return E.apply(null, arguments);
    };
  }, rt.cacheSignal = function() {
    return null;
  }, rt.cloneElement = function(E, q, X) {
    if (E == null)
      throw Error(
        "The argument must be a React element, but you passed " + E + "."
      );
    var $ = C({}, E.props), ut = E.key;
    if (q != null)
      for (mt in q.key !== void 0 && (ut = "" + q.key), q)
        !it.call(q, mt) || mt === "key" || mt === "__self" || mt === "__source" || mt === "ref" && q.ref === void 0 || ($[mt] = q[mt]);
    var mt = arguments.length - 2;
    if (mt === 1) $.children = X;
    else if (1 < mt) {
      for (var zt = Array(mt), ae = 0; ae < mt; ae++)
        zt[ae] = arguments[ae + 2];
      $.children = zt;
    }
    return ft(E.type, ut, $);
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
  }, rt.createElement = function(E, q, X) {
    var $, ut = {}, mt = null;
    if (q != null)
      for ($ in q.key !== void 0 && (mt = "" + q.key), q)
        it.call(q, $) && $ !== "key" && $ !== "__self" && $ !== "__source" && (ut[$] = q[$]);
    var zt = arguments.length - 2;
    if (zt === 1) ut.children = X;
    else if (1 < zt) {
      for (var ae = Array(zt), Lt = 0; Lt < zt; Lt++)
        ae[Lt] = arguments[Lt + 2];
      ut.children = ae;
    }
    if (E && E.defaultProps)
      for ($ in zt = E.defaultProps, zt)
        ut[$] === void 0 && (ut[$] = zt[$]);
    return ft(E, mt, ut);
  }, rt.createRef = function() {
    return { current: null };
  }, rt.forwardRef = function(E) {
    return { $$typeof: m, render: E };
  }, rt.isValidElement = tt, rt.lazy = function(E) {
    return {
      $$typeof: p,
      _payload: { _status: -1, _result: E },
      _init: J
    };
  }, rt.memo = function(E, q) {
    return {
      $$typeof: h,
      type: E,
      compare: q === void 0 ? null : q
    };
  }, rt.startTransition = function(E) {
    var q = k.T, X = {};
    k.T = X;
    try {
      var $ = E(), ut = k.S;
      ut !== null && ut(X, $), typeof $ == "object" && $ !== null && typeof $.then == "function" && $.then(F, ct);
    } catch (mt) {
      ct(mt);
    } finally {
      q !== null && X.types !== null && (q.types = X.types), k.T = q;
    }
  }, rt.unstable_useCacheRefresh = function() {
    return k.H.useCacheRefresh();
  }, rt.use = function(E) {
    return k.H.use(E);
  }, rt.useActionState = function(E, q, X) {
    return k.H.useActionState(E, q, X);
  }, rt.useCallback = function(E, q) {
    return k.H.useCallback(E, q);
  }, rt.useContext = function(E) {
    return k.H.useContext(E);
  }, rt.useDebugValue = function() {
  }, rt.useDeferredValue = function(E, q) {
    return k.H.useDeferredValue(E, q);
  }, rt.useEffect = function(E, q) {
    return k.H.useEffect(E, q);
  }, rt.useEffectEvent = function(E) {
    return k.H.useEffectEvent(E);
  }, rt.useId = function() {
    return k.H.useId();
  }, rt.useImperativeHandle = function(E, q, X) {
    return k.H.useImperativeHandle(E, q, X);
  }, rt.useInsertionEffect = function(E, q) {
    return k.H.useInsertionEffect(E, q);
  }, rt.useLayoutEffect = function(E, q) {
    return k.H.useLayoutEffect(E, q);
  }, rt.useMemo = function(E, q) {
    return k.H.useMemo(E, q);
  }, rt.useOptimistic = function(E, q) {
    return k.H.useOptimistic(E, q);
  }, rt.useReducer = function(E, q, X) {
    return k.H.useReducer(E, q, X);
  }, rt.useRef = function(E) {
    return k.H.useRef(E);
  }, rt.useState = function(E) {
    return k.H.useState(E);
  }, rt.useSyncExternalStore = function(E, q, X) {
    return k.H.useSyncExternalStore(
      E,
      q,
      X
    );
  }, rt.useTransition = function() {
    return k.H.useTransition();
  }, rt.version = "19.2.0", rt;
}
var yd;
function e0() {
  return yd || (yd = 1, Ar.exports = fy()), Ar.exports;
}
var _ = e0();
const ah = [
  "Demand stays constant over the planning period; no backlog, seasonality or population growth is modeled.",
  "Demand and capacity use the same service, area, monthly period and definition of a request. Requests are not unique people.",
  "All added capacity is usable. Staffing, transport, eligibility and other constraints must be checked separately.",
  "Costs are incremental operating costs only; existing costs, one-time setup costs and wider savings are excluded.",
  "Results are conditional arithmetic, not a demand forecast, clinical assessment or evidence of intervention effectiveness."
], ry = { demand: "Monthly service requests", capacity: "Current monthly capacity", added: "Added monthly capacity", cost: "Additional monthly operating cost", months: "Planning period" }, oy = { area: 160, service: 120, source: 300, sourceDate: 10, owner: 120, outcome: 200, target: 120, reviewDate: 10 };
function sy(u, c = "CAD") {
  if (!["CAD", "USD"].includes(c)) throw Error("Choose a supported currency.");
  const o = {};
  for (const [m, g] of Object.entries(ry)) {
    const h = String(u[m] ?? "").trim();
    if (!/^\d+(?:\.\d+)?$/.test(h)) throw Error(`${g}: enter a number of zero or more.`);
    if (o[m] = Number(h), !Number.isFinite(o[m]) || o[m] > 1e9) throw Error(`${g}: the value is outside the supported range.`);
  }
  if (!Number.isInteger(o.months) || o.months < 1 || o.months > 36) throw Error("Choose a planning period from 1 to 36 whole months.");
  for (const [m, g] of Object.entries(oy))
    if (o[m] = String(u[m] ?? "").trim(), !o[m] || o[m].length > g || /[\u0000-\u001f\u007f]/.test(o[m])) throw Error("Complete the source, service area, accountability and review fields within their stated limits.");
  for (const m of ["sourceDate", "reviewDate"]) {
    const g = o[m];
    if (!/^\d{4}-\d{2}-\d{2}$/.test(g) || Number.isNaN(Date.parse(g)) || new Date(g).toISOString().slice(0, 10) !== g) throw Error("Enter valid source and review dates.");
  }
  if (o.reviewDate < o.sourceDate) throw Error("The review date must be on or after the source date.");
  const f = Math.max(0, o.demand - o.capacity), d = Math.max(0, o.demand - o.capacity - o.added), y = f - d, v = y > 0 ? o.cost / y : null;
  if (v !== null && !Number.isFinite(v)) throw Error("The unit cost is outside the supported range. Check demand and capacity values.");
  return { version: 1, currency: c, inputs: o, currentGap: f, plannedGap: d, capacityApplied: y, totalCost: o.cost * o.months, costPerRequest: v, assumptions: [...ah] };
}
function vd(u) {
  const c = u.inputs, o = (d) => Number(d).toLocaleString("en", { maximumFractionDigits: 2 }), f = (d) => `${u.currency} ${o(d)}`;
  return [
    "CB-CAP | Service capacity decision brief",
    "User-supplied aggregate inputs · not independently verified",
    "",
    `Service: ${c.service}`,
    `Operating area: ${c.area}`,
    `Source and reporting period: ${c.source}`,
    `Source as of: ${c.sourceDate}`,
    "",
    `Monthly service requests: ${o(c.demand)}`,
    `Current monthly capacity: ${o(c.capacity)}`,
    `Proposed added monthly capacity: ${o(c.added)}`,
    `Current monthly capacity gap: ${o(u.currentGap)} requests`,
    `Planned monthly capacity gap: ${o(u.plannedGap)} requests`,
    `Added capacity applicable to current gap: ${o(u.capacityApplied)} requests/month`,
    `Additional monthly operating cost: ${f(c.cost)}`,
    `Planning period: ${c.months} months`,
    `Additional operating budget: ${f(u.totalCost)}`,
    `Operating cost per additional request capacity: ${u.costPerRequest === null ? "Not applicable: no reduction in the current capacity gap" : f(u.costPerRequest)}`,
    "",
    `Accountable team or role: ${c.owner}`,
    `Outcome measure: ${c.outcome}`,
    `Review target: ${c.target}`,
    `Review date: ${c.reviewDate}`,
    "",
    "Method: current gap = max(requests − current capacity, 0); planned gap = max(requests − current capacity − added capacity, 0). Budget = monthly cost × months. Unit cost = monthly cost ÷ added capacity applicable to the current gap.",
    "",
    "Assumptions to review:",
    ...u.assumptions.map((d) => `• ${d}`),
    "",
    "Decision status: draft for human review. Agree on delivery constraints and data quality before approving resources. Compare observed outcomes with the target at the review date."
  ].join(`
`);
}
function dy({ currency: u = "CAD" }) {
  const c = _.useId(), o = _.useRef(null), f = _.useRef(null), d = _.useRef(null), [y, v] = _.useState(null), [m, g] = _.useState(""), h = (H) => H.toLocaleString("en", { maximumFractionDigits: 2 }), p = (H, U, C = {}) => /* @__PURE__ */ A.jsxs("label", { htmlFor: `${c}-${H}`, children: [
    U,
    /* @__PURE__ */ A.jsx("input", { id: `${c}-${H}`, name: H, required: !0, autoComplete: "off", maxLength: 120, ...C })
  ] }, H);
  function S(H) {
    H.preventDefault();
    try {
      v(sy(Object.fromEntries(new FormData(o.current)), u)), g(""), requestAnimationFrame(() => {
        var U;
        return (U = f.current) == null ? void 0 : U.focus();
      });
    } catch (U) {
      v(null), g(U.message), requestAnimationFrame(() => {
        var C;
        return (C = d.current) == null ? void 0 : C.focus();
      });
    }
  }
  function M() {
    const H = URL.createObjectURL(new Blob([vd(y)], { type: "text/plain;charset=utf-8" })), U = document.createElement("a");
    U.href = H, U.download = "cb-cap-decision-brief.txt", U.click(), setTimeout(() => URL.revokeObjectURL(H), 1e3);
  }
  return /* @__PURE__ */ A.jsxs("section", { className: "decision-brief", id: "decision-brief", "aria-labelledby": `${c}-title`, children: [
    /* @__PURE__ */ A.jsxs("header", { children: [
      /* @__PURE__ */ A.jsx("p", { className: "eyebrow", children: "FROM EVIDENCE TO A DECISION" }),
      /* @__PURE__ */ A.jsx("h2", { id: `${c}-title`, children: "Build a service capacity brief." }),
      /* @__PURE__ */ A.jsx("p", { children: "Use your own aggregate figures to compare one capacity change, its operating cost and the result your team will review." })
    ] }),
    /* @__PURE__ */ A.jsx("p", { className: "decision-privacy", children: "Enter public or approved aggregate information only. Use a team or role for accountability; do not enter names, contact details or patient records. Entries are processed in your browser and are not sent to SozoRock. Use Clear entries when finished, or download a brief to retain it." }),
    /* @__PURE__ */ A.jsxs("form", { ref: o, onSubmit: S, onChange: () => {
      v(null), g("");
    }, children: [
      /* @__PURE__ */ A.jsxs("fieldset", { children: [
        /* @__PURE__ */ A.jsx("legend", { children: "1. Define the evidence" }),
        /* @__PURE__ */ A.jsxs("div", { className: "decision-fields", children: [
          p("service", "Service being planned", { placeholder: "e.g. community transport trips" }),
          p("area", "Operating area", { maxLength: 160, placeholder: "Use your actual service boundary" }),
          p("source", "Source and reporting period", { maxLength: 300, placeholder: "e.g. published monthly service report, July 2026" }),
          p("sourceDate", "Source as of", { type: "date" })
        ] }),
        /* @__PURE__ */ A.jsx("p", { children: "Use the same service definition, area and monthly period for demand and capacity. The sample map is separate from your calculations." })
      ] }),
      /* @__PURE__ */ A.jsxs("fieldset", { children: [
        /* @__PURE__ */ A.jsx("legend", { children: "2. Compare capacity and cost" }),
        /* @__PURE__ */ A.jsxs("div", { className: "decision-fields", children: [
          p("demand", "Monthly service requests", { type: "number", min: 0, max: 1e9, step: "any", inputMode: "decimal" }),
          p("capacity", "Current capacity (requests/month)", { type: "number", min: 0, max: 1e9, step: "any", inputMode: "decimal" }),
          p("added", "Proposed added capacity (requests/month)", { type: "number", min: 0, max: 1e9, step: "any", inputMode: "decimal" }),
          p("cost", `Additional operating cost (${u}/month)`, { type: "number", min: 0, max: 1e9, step: "any", inputMode: "decimal" }),
          p("months", "Planning period (months)", { type: "number", min: 1, max: 36, step: 1, inputMode: "numeric" })
        ] })
      ] }),
      /* @__PURE__ */ A.jsxs("fieldset", { children: [
        /* @__PURE__ */ A.jsx("legend", { children: "3. Assign the review" }),
        /* @__PURE__ */ A.jsxs("div", { className: "decision-fields", children: [
          p("owner", "Accountable team or role", { placeholder: "e.g. service planning team" }),
          p("outcome", "Outcome measure", { maxLength: 200, placeholder: "e.g. completed transport requests per month" }),
          p("target", "Target to assess at review", { placeholder: "e.g. 120 completed requests per month" }),
          p("reviewDate", "Review date", { type: "date" })
        ] })
      ] }),
      m && /* @__PURE__ */ A.jsx("p", { className: "decision-error", role: "alert", tabIndex: -1, ref: d, children: m }),
      /* @__PURE__ */ A.jsxs("div", { className: "decision-actions", children: [
        /* @__PURE__ */ A.jsx("button", { className: "primary", type: "submit", children: "Calculate decision brief" }),
        /* @__PURE__ */ A.jsx("button", { className: "text-link", type: "reset", onClick: () => {
          v(null), g("");
        }, children: "Clear entries" })
      ] })
    ] }),
    y && /* @__PURE__ */ A.jsxs("section", { className: "decision-result", ref: f, tabIndex: -1, "aria-labelledby": `${c}-result`, children: [
      /* @__PURE__ */ A.jsx("p", { className: "eyebrow", children: "YOUR INPUTS · CONDITIONAL CALCULATION" }),
      /* @__PURE__ */ A.jsx("h3", { id: `${c}-result`, children: "Capacity and budget comparison" }),
      /* @__PURE__ */ A.jsxs("dl", { className: "decision-metrics", children: [
        /* @__PURE__ */ A.jsxs("div", { children: [
          /* @__PURE__ */ A.jsx("dt", { children: "Current capacity gap" }),
          /* @__PURE__ */ A.jsxs("dd", { children: [
            h(y.currentGap),
            /* @__PURE__ */ A.jsx("small", { children: " requests/month" })
          ] })
        ] }),
        /* @__PURE__ */ A.jsxs("div", { children: [
          /* @__PURE__ */ A.jsx("dt", { children: "Planned capacity gap" }),
          /* @__PURE__ */ A.jsxs("dd", { children: [
            h(y.plannedGap),
            /* @__PURE__ */ A.jsx("small", { children: " requests/month" })
          ] })
        ] }),
        /* @__PURE__ */ A.jsxs("div", { children: [
          /* @__PURE__ */ A.jsx("dt", { children: "Additional operating budget" }),
          /* @__PURE__ */ A.jsxs("dd", { children: [
            u,
            " ",
            h(y.totalCost),
            /* @__PURE__ */ A.jsxs("small", { children: [
              " over ",
              y.inputs.months,
              " months"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ A.jsxs("p", { children: [
        "Added capacity applicable to the current gap: ",
        /* @__PURE__ */ A.jsxs("strong", { children: [
          h(y.capacityApplied),
          " requests/month"
        ] }),
        ". Operating cost per additional request capacity: ",
        /* @__PURE__ */ A.jsx("strong", { children: y.costPerRequest === null ? "not applicable (no gap reduction)" : `${u} ${h(y.costPerRequest)}` }),
        "."
      ] }),
      /* @__PURE__ */ A.jsx("p", { children: "This calculates capacity under your assumptions. It does not establish that requests will be completed or that health outcomes will improve." }),
      /* @__PURE__ */ A.jsx("button", { className: "primary", type: "button", onClick: M, children: "Download decision brief" }),
      /* @__PURE__ */ A.jsxs("details", { children: [
        /* @__PURE__ */ A.jsx("summary", { children: "Read or copy the full brief" }),
        /* @__PURE__ */ A.jsxs("label", { htmlFor: `${c}-export`, children: [
          "Decision brief",
          /* @__PURE__ */ A.jsx("textarea", { id: `${c}-export`, readOnly: !0, rows: 15, value: vd(y) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ A.jsxs("details", { className: "decision-method", children: [
      /* @__PURE__ */ A.jsx("summary", { children: "Method and assumptions" }),
      /* @__PURE__ */ A.jsx("p", { children: "Current gap = the greater of monthly requests minus current capacity, or zero. Planned gap also subtracts proposed added capacity. The budget multiplies additional monthly cost by the planning period. Unit cost divides monthly cost by added capacity applicable to the current gap." }),
      /* @__PURE__ */ A.jsx("ul", { children: ah.map((H) => /* @__PURE__ */ A.jsx("li", { children: H }, H)) }),
      /* @__PURE__ */ A.jsx("p", { children: "Source quality, local constraints and the review target remain your team's responsibility. Keep the source date and outcome review attached when sharing a brief." })
    ] })
  ] });
}
const Wn = { publisher: "CDC PLACES", release: "2025 county release", released: "December 4, 2025", snapshot: "July 14, 2026", years: "BRFSS 2023/2022; Census 2023; ACS 2019–2023/2018–2022", url: "https://data.cdc.gov/500-Cities-Places/PLACES-County-Data-GIS-Friendly-Format-2025-releas/i46a-9kgh" }, Ur = { transport: "Lack of reliable transportation", uninsured: "Adults without health insurance", diabetes: "Diagnosed diabetes" };
function hy(u) {
  const c = /* @__PURE__ */ new Set();
  if (!Array.isArray(u) || u.length !== 3144) throw Error("County snapshot unavailable.");
  for (const o of u) {
    if (!/^\d{5}$/.test(o.fips) || c.has(o.fips) || typeof o.state != "string" || !o.state || typeof o.county != "string" || !o.county) throw Error("County snapshot unavailable.");
    c.add(o.fips);
    for (const f of Object.keys(Ur)) {
      const d = o[f];
      if (!Array.isArray(d) || d.length !== 3) throw Error("County snapshot unavailable.");
      if (!d.every((y) => y === null) && (!d.every((y) => typeof y == "number" && Number.isFinite(y)) || d[1] < 0 || d[1] > d[0] || d[0] > d[2] || d[2] > 100))
        throw Error("County snapshot unavailable.");
    }
  }
  return u;
}
const my = { fips: "36001", state: "New York", stateCode: "NY", county: "Albany County", transport: [7.2, 6.1, 8.5], uninsured: [5.5, 4.2, 7], diabetes: [9.2, 7.9, 10.7] };
function yy() {
  const u = _.useId(), [c, o] = _.useState(null), [f, d] = _.useState(!1), [y, v] = _.useState(0), [m, g] = _.useState("New York"), [h, p] = _.useState("36001"), [S, M] = _.useState("transport");
  _.useEffect(() => {
    const V = new AbortController();
    let Q = !0;
    const K = setTimeout(() => V.abort(), 15e3);
    return d(!1), fetch(new URL(
      /* @vite-ignore */
      "../data/cbcap-counties-2025.json",
      import.meta.url
    ), { signal: V.signal, credentials: "omit" }).then((w) => {
      if (!w.ok) throw Error("Unavailable");
      return w.json();
    }).then(hy).then((w) => {
      Q && o(w);
    }).catch(() => {
      Q && d(!0);
    }).finally(() => clearTimeout(K)), () => {
      Q = !1, clearTimeout(K), V.abort();
    };
  }, [y]);
  const H = (c == null ? void 0 : c.find((V) => V.fips === h)) || my, U = H[S], C = c ? [...new Set(c.map((V) => V.state))].sort() : [], L = (c == null ? void 0 : c.filter((V) => V.state === m).sort((V, Q) => V.county.localeCompare(Q.county))) || [];
  return /* @__PURE__ */ A.jsxs("section", { className: "county-evidence", "aria-labelledby": `${u}-title`, children: [
    /* @__PURE__ */ A.jsx("p", { className: "eyebrow", children: "PUBLISHED COUNTY EVIDENCE" }),
    /* @__PURE__ */ A.jsx("h2", { id: `${u}-title`, children: "Check the local context." }),
    /* @__PURE__ */ A.jsx("p", { children: "Explore three population estimates before defining a service question. Keep county evidence separate from the sample ZIP-area scenarios." }),
    c && /* @__PURE__ */ A.jsxs("div", { className: "county-fields", children: [
      /* @__PURE__ */ A.jsxs("label", { htmlFor: `${u}-state`, children: [
        "State",
        /* @__PURE__ */ A.jsx("select", { id: `${u}-state`, value: m, onChange: (V) => {
          g(V.target.value), p(c.filter((Q) => Q.state === V.target.value).sort((Q, K) => Q.county.localeCompare(K.county))[0].fips);
        }, children: C.map((V) => /* @__PURE__ */ A.jsx("option", { children: V }, V)) })
      ] }),
      /* @__PURE__ */ A.jsxs("label", { htmlFor: `${u}-county`, children: [
        "County",
        /* @__PURE__ */ A.jsx("select", { id: `${u}-county`, value: h, onChange: (V) => p(V.target.value), children: L.map((V) => /* @__PURE__ */ A.jsx("option", { value: V.fips, children: V.county }, V.fips)) })
      ] }),
      /* @__PURE__ */ A.jsxs("label", { htmlFor: `${u}-measure`, children: [
        "Population measure",
        /* @__PURE__ */ A.jsx("select", { id: `${u}-measure`, value: S, onChange: (V) => M(V.target.value), children: Object.entries(Ur).map(([V, Q]) => /* @__PURE__ */ A.jsx("option", { value: V, children: Q }, V)) })
      ] })
    ] }),
    /* @__PURE__ */ A.jsxs("div", { className: "county-reading", "aria-live": "polite", children: [
      /* @__PURE__ */ A.jsxs("h3", { children: [
        H.county,
        ", ",
        H.state
      ] }),
      /* @__PURE__ */ A.jsx("p", { className: "county-value", children: U[0] === null ? "Estimate unavailable" : `${U[0].toFixed(1)}%` }),
      /* @__PURE__ */ A.jsxs("p", { children: [
        Ur[S],
        " · ",
        S === "uninsured" ? "Adults aged 18–64" : "Adults aged 18 and older"
      ] }),
      /* @__PURE__ */ A.jsxs("p", { children: [
        U[0] === null ? "Missing data is not zero." : `95% confidence interval: ${U[1].toFixed(1)}%–${U[2].toFixed(1)}%.`,
        " County FIPS ",
        H.fips,
        "."
      ] })
    ] }),
    !c && (f ? /* @__PURE__ */ A.jsxs("p", { role: "alert", children: [
      "County selection could not load. The Albany County transportation snapshot remains available. ",
      /* @__PURE__ */ A.jsx("button", { className: "text-link", onClick: () => v(y + 1), children: "Retry county selection" })
    ] }) : /* @__PURE__ */ A.jsx("p", { role: "status", children: "Loading county selection…" })),
    /* @__PURE__ */ A.jsxs("p", { className: "county-source", children: [
      "Source: ",
      /* @__PURE__ */ A.jsxs("a", { href: Wn.url, children: [
        Wn.publisher,
        ", ",
        Wn.release
      ] }),
      ", released ",
      Wn.released,
      ". Published snapshot: ",
      Wn.snapshot,
      ". Underlying years: ",
      Wn.years,
      ". Model-based estimates describe county populations, not individual diagnoses, service requests or current capacity. Do not apply them to ZIP areas. Differences do not establish statistical significance or causation."
    ] })
  ] });
}
function Yi(u, c) {
  return u == null || c == null ? NaN : u < c ? -1 : u > c ? 1 : u >= c ? 0 : NaN;
}
function vy(u, c) {
  return u == null || c == null ? NaN : c < u ? -1 : c > u ? 1 : c >= u ? 0 : NaN;
}
function uh(u) {
  let c, o, f;
  u.length !== 2 ? (c = Yi, o = (m, g) => Yi(u(m), g), f = (m, g) => u(m) - g) : (c = u === Yi || u === vy ? u : gy, o = u, f = u);
  function d(m, g, h = 0, p = m.length) {
    if (h < p) {
      if (c(g, g) !== 0) return p;
      do {
        const S = h + p >>> 1;
        o(m[S], g) < 0 ? h = S + 1 : p = S;
      } while (h < p);
    }
    return h;
  }
  function y(m, g, h = 0, p = m.length) {
    if (h < p) {
      if (c(g, g) !== 0) return p;
      do {
        const S = h + p >>> 1;
        o(m[S], g) <= 0 ? h = S + 1 : p = S;
      } while (h < p);
    }
    return h;
  }
  function v(m, g, h = 0, p = m.length) {
    const S = d(m, g, h, p - 1);
    return S > h && f(m[S - 1], g) > -f(m[S], g) ? S - 1 : S;
  }
  return { left: d, center: v, right: y };
}
function gy() {
  return 0;
}
function py(u) {
  return u === null ? NaN : +u;
}
const Sy = uh(Yi), by = Sy.right;
uh(py).center;
class rn {
  constructor() {
    this._partials = new Float64Array(32), this._n = 0;
  }
  add(c) {
    const o = this._partials;
    let f = 0;
    for (let d = 0; d < this._n && d < 32; d++) {
      const y = o[d], v = c + y, m = Math.abs(c) < Math.abs(y) ? c - (v - y) : y - (v - c);
      m && (o[f++] = m), c = v;
    }
    return o[f] = c, this._n = f + 1, this;
  }
  valueOf() {
    const c = this._partials;
    let o = this._n, f, d, y, v = 0;
    if (o > 0) {
      for (v = c[--o]; o > 0 && (f = v, d = c[--o], v = f + d, y = d - (v - f), !y); )
        ;
      o > 0 && (y < 0 && c[o - 1] < 0 || y > 0 && c[o - 1] > 0) && (d = y * 2, f = v + d, d == f - v && (v = f));
    }
    return v;
  }
}
const Ey = Math.sqrt(50), xy = Math.sqrt(10), Ay = Math.sqrt(2);
function Gi(u, c, o) {
  const f = (c - u) / Math.max(0, o), d = Math.floor(Math.log10(f)), y = f / Math.pow(10, d), v = y >= Ey ? 10 : y >= xy ? 5 : y >= Ay ? 2 : 1;
  let m, g, h;
  return d < 0 ? (h = Math.pow(10, -d) / v, m = Math.round(u * h), g = Math.round(c * h), m / h < u && ++m, g / h > c && --g, h = -h) : (h = Math.pow(10, d) * v, m = Math.round(u / h), g = Math.round(c / h), m * h < u && ++m, g * h > c && --g), g < m && 0.5 <= o && o < 2 ? Gi(u, c, o * 2) : [m, g, h];
}
function My(u, c, o) {
  if (c = +c, u = +u, o = +o, !(o > 0)) return [];
  if (u === c) return [u];
  const f = c < u, [d, y, v] = f ? Gi(c, u, o) : Gi(u, c, o);
  if (!(y >= d)) return [];
  const m = y - d + 1, g = new Array(m);
  if (f)
    if (v < 0) for (let h = 0; h < m; ++h) g[h] = (y - h) / -v;
    else for (let h = 0; h < m; ++h) g[h] = (y - h) * v;
  else if (v < 0) for (let h = 0; h < m; ++h) g[h] = (d + h) / -v;
  else for (let h = 0; h < m; ++h) g[h] = (d + h) * v;
  return g;
}
function Cr(u, c, o) {
  return c = +c, u = +u, o = +o, Gi(u, c, o)[2];
}
function zy(u, c, o) {
  c = +c, u = +u, o = +o;
  const f = c < u, d = f ? Cr(c, u, o) : Cr(u, c, o);
  return (f ? -1 : 1) * (d < 0 ? 1 / -d : d);
}
function* Ty(u) {
  for (const c of u)
    yield* c;
}
function ih(u) {
  return Array.from(Ty(u));
}
var Ht = 1e-6, bt = Math.PI, me = bt / 2, gd = bt / 4, Te = bt * 2, ie = 180 / bt, qt = bt / 180, Bt = Math.abs, ch = Math.atan, iu = Math.atan2, Xt = Math.cos, Ny = Math.exp, _y = Math.log, Qt = Math.sin, Oy = Math.sign || function(u) {
  return u > 0 ? 1 : u < 0 ? -1 : 0;
}, sn = Math.sqrt, Dy = Math.tan;
function jy(u) {
  return u > 1 ? 0 : u < -1 ? bt : Math.acos(u);
}
function cu(u) {
  return u > 1 ? me : u < -1 ? -me : Math.asin(u);
}
function Ze() {
}
function Vi(u, c) {
  u && Sd.hasOwnProperty(u.type) && Sd[u.type](u, c);
}
var pd = {
  Feature: function(u, c) {
    Vi(u.geometry, c);
  },
  FeatureCollection: function(u, c) {
    for (var o = u.features, f = -1, d = o.length; ++f < d; ) Vi(o[f].geometry, c);
  }
}, Sd = {
  Sphere: function(u, c) {
    c.sphere();
  },
  Point: function(u, c) {
    u = u.coordinates, c.point(u[0], u[1], u[2]);
  },
  MultiPoint: function(u, c) {
    for (var o = u.coordinates, f = -1, d = o.length; ++f < d; ) u = o[f], c.point(u[0], u[1], u[2]);
  },
  LineString: function(u, c) {
    qr(u.coordinates, c, 0);
  },
  MultiLineString: function(u, c) {
    for (var o = u.coordinates, f = -1, d = o.length; ++f < d; ) qr(o[f], c, 0);
  },
  Polygon: function(u, c) {
    bd(u.coordinates, c);
  },
  MultiPolygon: function(u, c) {
    for (var o = u.coordinates, f = -1, d = o.length; ++f < d; ) bd(o[f], c);
  },
  GeometryCollection: function(u, c) {
    for (var o = u.geometries, f = -1, d = o.length; ++f < d; ) Vi(o[f], c);
  }
};
function qr(u, c, o) {
  var f = -1, d = u.length - o, y;
  for (c.lineStart(); ++f < d; ) y = u[f], c.point(y[0], y[1], y[2]);
  c.lineEnd();
}
function bd(u, c) {
  var o = -1, f = u.length;
  for (c.polygonStart(); ++o < f; ) qr(u[o], c, 1);
  c.polygonEnd();
}
function Pn(u, c) {
  u && pd.hasOwnProperty(u.type) ? pd[u.type](u, c) : Vi(u, c);
}
function Br(u) {
  return [iu(u[1], u[0]), cu(u[2])];
}
function na(u) {
  var c = u[0], o = u[1], f = Xt(o);
  return [f * Xt(c), f * Qt(c), Qt(o)];
}
function Hi(u, c) {
  return u[0] * c[0] + u[1] * c[1] + u[2] * c[2];
}
function Xi(u, c) {
  return [u[1] * c[2] - u[2] * c[1], u[2] * c[0] - u[0] * c[2], u[0] * c[1] - u[1] * c[0]];
}
function Mr(u, c) {
  u[0] += c[0], u[1] += c[1], u[2] += c[2];
}
function Ri(u, c) {
  return [u[0] * c, u[1] * c, u[2] * c];
}
function Zr(u) {
  var c = sn(u[0] * u[0] + u[1] * u[1] + u[2] * u[2]);
  u[0] /= c, u[1] /= c, u[2] /= c;
}
function In(u) {
  return function() {
    return u;
  };
}
function Yr(u, c) {
  function o(f, d) {
    return f = u(f, d), c(f[0], f[1]);
  }
  return u.invert && c.invert && (o.invert = function(f, d) {
    return f = c.invert(f, d), f && u.invert(f[0], f[1]);
  }), o;
}
function Lr(u, c) {
  return Bt(u) > bt && (u -= Math.round(u / Te) * Te), [u, c];
}
Lr.invert = Lr;
function l0(u, c, o) {
  return (u %= Te) ? c || o ? Yr(xd(u), Ad(c, o)) : xd(u) : c || o ? Ad(c, o) : Lr;
}
function Ed(u) {
  return function(c, o) {
    return c += u, Bt(c) > bt && (c -= Math.round(c / Te) * Te), [c, o];
  };
}
function xd(u) {
  var c = Ed(u);
  return c.invert = Ed(-u), c;
}
function Ad(u, c) {
  var o = Xt(u), f = Qt(u), d = Xt(c), y = Qt(c);
  function v(m, g) {
    var h = Xt(g), p = Xt(m) * h, S = Qt(m) * h, M = Qt(g), H = M * o + p * f;
    return [
      iu(S * d - H * y, p * o - M * f),
      cu(H * d + S * y)
    ];
  }
  return v.invert = function(m, g) {
    var h = Xt(g), p = Xt(m) * h, S = Qt(m) * h, M = Qt(g), H = M * d - S * y;
    return [
      iu(S * d + M * y, p * o + H * f),
      cu(H * o - p * f)
    ];
  }, v;
}
function Hy(u) {
  u = l0(u[0] * qt, u[1] * qt, u.length > 2 ? u[2] * qt : 0);
  function c(o) {
    return o = u(o[0] * qt, o[1] * qt), o[0] *= ie, o[1] *= ie, o;
  }
  return c.invert = function(o) {
    return o = u.invert(o[0] * qt, o[1] * qt), o[0] *= ie, o[1] *= ie, o;
  }, c;
}
function fh(u, c, o, f, d, y) {
  if (o) {
    var v = Xt(c), m = Qt(c), g = f * o;
    d == null ? (d = c + f * Te, y = c - g / 2) : (d = Md(v, d), y = Md(v, y), (f > 0 ? d < y : d > y) && (d += f * Te));
    for (var h, p = d; f > 0 ? p > y : p < y; p -= g)
      h = Br([v, -m * Xt(p), -m * Qt(p)]), u.point(h[0], h[1]);
  }
}
function Md(u, c) {
  c = na(c), c[0] -= u, Zr(c);
  var o = jy(-c[1]);
  return ((-c[2] < 0 ? -o : o) + Te - Ht) % Te;
}
function Ry() {
  var u = In([0, 0]), c = In(90), o = In(2), f, d, y = { point: v };
  function v(g, h) {
    f.push(g = d(g, h)), g[0] *= ie, g[1] *= ie;
  }
  function m() {
    var g = u.apply(this, arguments), h = c.apply(this, arguments) * qt, p = o.apply(this, arguments) * qt;
    return f = [], d = l0(-g[0] * qt, -g[1] * qt, 0).invert, fh(y, h, p, 1), g = { type: "Polygon", coordinates: [f] }, f = d = null, g;
  }
  return m.center = function(g) {
    return arguments.length ? (u = typeof g == "function" ? g : In([+g[0], +g[1]]), m) : u;
  }, m.radius = function(g) {
    return arguments.length ? (c = typeof g == "function" ? g : In(+g), m) : c;
  }, m.precision = function(g) {
    return arguments.length ? (o = typeof g == "function" ? g : In(+g), m) : o;
  }, m;
}
function rh() {
  var u = [], c;
  return {
    point: function(o, f, d) {
      c.push([o, f, d]);
    },
    lineStart: function() {
      u.push(c = []);
    },
    lineEnd: Ze,
    rejoin: function() {
      u.length > 1 && u.push(u.pop().concat(u.shift()));
    },
    result: function() {
      var o = u;
      return u = [], c = null, o;
    }
  };
}
function Li(u, c) {
  return Bt(u[0] - c[0]) < Ht && Bt(u[1] - c[1]) < Ht;
}
function Ui(u, c, o, f) {
  this.x = u, this.z = c, this.o = o, this.e = f, this.v = !1, this.n = this.p = null;
}
function oh(u, c, o, f, d) {
  var y = [], v = [], m, g;
  if (u.forEach(function(U) {
    if (!((C = U.length - 1) <= 0)) {
      var C, L = U[0], V = U[C], Q;
      if (Li(L, V)) {
        if (!L[2] && !V[2]) {
          for (d.lineStart(), m = 0; m < C; ++m) d.point((L = U[m])[0], L[1]);
          d.lineEnd();
          return;
        }
        V[0] += 2 * Ht;
      }
      y.push(Q = new Ui(L, U, null, !0)), v.push(Q.o = new Ui(L, null, Q, !1)), y.push(Q = new Ui(V, U, null, !1)), v.push(Q.o = new Ui(V, null, Q, !0));
    }
  }), !!y.length) {
    for (v.sort(c), zd(y), zd(v), m = 0, g = v.length; m < g; ++m)
      v[m].e = o = !o;
    for (var h = y[0], p, S; ; ) {
      for (var M = h, H = !0; M.v; ) if ((M = M.n) === h) return;
      p = M.z, d.lineStart();
      do {
        if (M.v = M.o.v = !0, M.e) {
          if (H)
            for (m = 0, g = p.length; m < g; ++m) d.point((S = p[m])[0], S[1]);
          else
            f(M.x, M.n.x, 1, d);
          M = M.n;
        } else {
          if (H)
            for (p = M.p.z, m = p.length - 1; m >= 0; --m) d.point((S = p[m])[0], S[1]);
          else
            f(M.x, M.p.x, -1, d);
          M = M.p;
        }
        M = M.o, p = M.z, H = !H;
      } while (!M.v);
      d.lineEnd();
    }
  }
}
function zd(u) {
  if (c = u.length) {
    for (var c, o = 0, f = u[0], d; ++o < c; )
      f.n = d = u[o], d.p = f, f = d;
    f.n = d = u[0], d.p = f;
  }
}
function zr(u) {
  return Bt(u[0]) <= bt ? u[0] : Oy(u[0]) * ((Bt(u[0]) + bt) % Te - bt);
}
function Uy(u, c) {
  var o = zr(c), f = c[1], d = Qt(f), y = [Qt(o), -Xt(o), 0], v = 0, m = 0, g = new rn();
  d === 1 ? f = me + Ht : d === -1 && (f = -me - Ht);
  for (var h = 0, p = u.length; h < p; ++h)
    if (M = (S = u[h]).length)
      for (var S, M, H = S[M - 1], U = zr(H), C = H[1] / 2 + gd, L = Qt(C), V = Xt(C), Q = 0; Q < M; ++Q, U = w, L = F, V = k, H = K) {
        var K = S[Q], w = zr(K), lt = K[1] / 2 + gd, F = Qt(lt), k = Xt(lt), it = w - U, ft = it >= 0 ? 1 : -1, Et = ft * it, tt = Et > bt, I = L * F;
        if (g.add(iu(I * ft * Qt(Et), V * k + I * Xt(Et))), v += tt ? it + ft * Te : it, tt ^ U >= o ^ w >= o) {
          var ht = Xi(na(H), na(K));
          Zr(ht);
          var at = Xi(y, ht);
          Zr(at);
          var Y = (tt ^ it >= 0 ? -1 : 1) * cu(at[2]);
          (f > Y || f === Y && (ht[0] || ht[1])) && (m += tt ^ it >= 0 ? 1 : -1);
        }
      }
  return (v < -Ht || v < Ht && g < -1e-12) ^ m & 1;
}
function sh(u, c, o, f) {
  return function(d) {
    var y = c(d), v = rh(), m = c(v), g = !1, h, p, S, M = {
      point: H,
      lineStart: C,
      lineEnd: L,
      polygonStart: function() {
        M.point = V, M.lineStart = Q, M.lineEnd = K, p = [], h = [];
      },
      polygonEnd: function() {
        M.point = H, M.lineStart = C, M.lineEnd = L, p = ih(p);
        var w = Uy(h, f);
        p.length ? (g || (d.polygonStart(), g = !0), oh(p, qy, w, o, d)) : w && (g || (d.polygonStart(), g = !0), d.lineStart(), o(null, null, 1, d), d.lineEnd()), g && (d.polygonEnd(), g = !1), p = h = null;
      },
      sphere: function() {
        d.polygonStart(), d.lineStart(), o(null, null, 1, d), d.lineEnd(), d.polygonEnd();
      }
    };
    function H(w, lt) {
      u(w, lt) && d.point(w, lt);
    }
    function U(w, lt) {
      y.point(w, lt);
    }
    function C() {
      M.point = U, y.lineStart();
    }
    function L() {
      M.point = H, y.lineEnd();
    }
    function V(w, lt) {
      S.push([w, lt]), m.point(w, lt);
    }
    function Q() {
      m.lineStart(), S = [];
    }
    function K() {
      V(S[0][0], S[0][1]), m.lineEnd();
      var w = m.clean(), lt = v.result(), F, k = lt.length, it, ft, Et;
      if (S.pop(), h.push(S), S = null, !!k) {
        if (w & 1) {
          if (ft = lt[0], (it = ft.length - 1) > 0) {
            for (g || (d.polygonStart(), g = !0), d.lineStart(), F = 0; F < it; ++F) d.point((Et = ft[F])[0], Et[1]);
            d.lineEnd();
          }
          return;
        }
        k > 1 && w & 2 && lt.push(lt.pop().concat(lt.shift())), p.push(lt.filter(Cy));
      }
    }
    return M;
  };
}
function Cy(u) {
  return u.length > 1;
}
function qy(u, c) {
  return ((u = u.x)[0] < 0 ? u[1] - me - Ht : me - u[1]) - ((c = c.x)[0] < 0 ? c[1] - me - Ht : me - c[1]);
}
const Td = sh(
  function() {
    return !0;
  },
  By,
  Yy,
  [-bt, -me]
);
function By(u) {
  var c = NaN, o = NaN, f = NaN, d;
  return {
    lineStart: function() {
      u.lineStart(), d = 1;
    },
    point: function(y, v) {
      var m = y > 0 ? bt : -bt, g = Bt(y - c);
      Bt(g - bt) < Ht ? (u.point(c, o = (o + v) / 2 > 0 ? me : -me), u.point(f, o), u.lineEnd(), u.lineStart(), u.point(m, o), u.point(y, o), d = 0) : f !== m && g >= bt && (Bt(c - f) < Ht && (c -= f * Ht), Bt(y - m) < Ht && (y -= m * Ht), o = Zy(c, o, y, v), u.point(f, o), u.lineEnd(), u.lineStart(), u.point(m, o), d = 0), u.point(c = y, o = v), f = m;
    },
    lineEnd: function() {
      u.lineEnd(), c = o = NaN;
    },
    clean: function() {
      return 2 - d;
    }
  };
}
function Zy(u, c, o, f) {
  var d, y, v = Qt(u - o);
  return Bt(v) > Ht ? ch((Qt(c) * (y = Xt(f)) * Qt(o) - Qt(f) * (d = Xt(c)) * Qt(u)) / (d * y * v)) : (c + f) / 2;
}
function Yy(u, c, o, f) {
  var d;
  if (u == null)
    d = o * me, f.point(-bt, d), f.point(0, d), f.point(bt, d), f.point(bt, 0), f.point(bt, -d), f.point(0, -d), f.point(-bt, -d), f.point(-bt, 0), f.point(-bt, d);
  else if (Bt(u[0] - c[0]) > Ht) {
    var y = u[0] < c[0] ? bt : -bt;
    d = o * y / 2, f.point(-y, d), f.point(0, d), f.point(y, d);
  } else
    f.point(c[0], c[1]);
}
function Ly(u) {
  var c = Xt(u), o = 2 * qt, f = c > 0, d = Bt(c) > Ht;
  function y(p, S, M, H) {
    fh(H, u, o, M, p, S);
  }
  function v(p, S) {
    return Xt(p) * Xt(S) > c;
  }
  function m(p) {
    var S, M, H, U, C;
    return {
      lineStart: function() {
        U = H = !1, C = 1;
      },
      point: function(L, V) {
        var Q = [L, V], K, w = v(L, V), lt = f ? w ? 0 : h(L, V) : w ? h(L + (L < 0 ? bt : -bt), V) : 0;
        if (!S && (U = H = w) && p.lineStart(), w !== H && (K = g(S, Q), (!K || Li(S, K) || Li(Q, K)) && (Q[2] = 1)), w !== H)
          C = 0, w ? (p.lineStart(), K = g(Q, S), p.point(K[0], K[1])) : (K = g(S, Q), p.point(K[0], K[1], 2), p.lineEnd()), S = K;
        else if (d && S && f ^ w) {
          var F;
          !(lt & M) && (F = g(Q, S, !0)) && (C = 0, f ? (p.lineStart(), p.point(F[0][0], F[0][1]), p.point(F[1][0], F[1][1]), p.lineEnd()) : (p.point(F[1][0], F[1][1]), p.lineEnd(), p.lineStart(), p.point(F[0][0], F[0][1], 3)));
        }
        w && (!S || !Li(S, Q)) && p.point(Q[0], Q[1]), S = Q, H = w, M = lt;
      },
      lineEnd: function() {
        H && p.lineEnd(), S = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return C | (U && H) << 1;
      }
    };
  }
  function g(p, S, M) {
    var H = na(p), U = na(S), C = [1, 0, 0], L = Xi(H, U), V = Hi(L, L), Q = L[0], K = V - Q * Q;
    if (!K) return !M && p;
    var w = c * V / K, lt = -c * Q / K, F = Xi(C, L), k = Ri(C, w), it = Ri(L, lt);
    Mr(k, it);
    var ft = F, Et = Hi(k, ft), tt = Hi(ft, ft), I = Et * Et - tt * (Hi(k, k) - 1);
    if (!(I < 0)) {
      var ht = sn(I), at = Ri(ft, (-Et - ht) / tt);
      if (Mr(at, k), at = Br(at), !M) return at;
      var Y = p[0], T = S[0], G = p[1], J = S[1], ct;
      T < Y && (ct = Y, Y = T, T = ct);
      var ot = T - Y, E = Bt(ot - bt) < Ht, q = E || ot < Ht;
      if (!E && J < G && (ct = G, G = J, J = ct), q ? E ? G + J > 0 ^ at[1] < (Bt(at[0] - Y) < Ht ? G : J) : G <= at[1] && at[1] <= J : ot > bt ^ (Y <= at[0] && at[0] <= T)) {
        var X = Ri(ft, (-Et + ht) / tt);
        return Mr(X, k), [at, Br(X)];
      }
    }
  }
  function h(p, S) {
    var M = f ? u : bt - u, H = 0;
    return p < -M ? H |= 1 : p > M && (H |= 2), S < -M ? H |= 4 : S > M && (H |= 8), H;
  }
  return sh(v, m, y, f ? [0, -u] : [-bt, u - bt]);
}
function Gy(u, c, o, f, d, y) {
  var v = u[0], m = u[1], g = c[0], h = c[1], p = 0, S = 1, M = g - v, H = h - m, U;
  if (U = o - v, !(!M && U > 0)) {
    if (U /= M, M < 0) {
      if (U < p) return;
      U < S && (S = U);
    } else if (M > 0) {
      if (U > S) return;
      U > p && (p = U);
    }
    if (U = d - v, !(!M && U < 0)) {
      if (U /= M, M < 0) {
        if (U > S) return;
        U > p && (p = U);
      } else if (M > 0) {
        if (U < p) return;
        U < S && (S = U);
      }
      if (U = f - m, !(!H && U > 0)) {
        if (U /= H, H < 0) {
          if (U < p) return;
          U < S && (S = U);
        } else if (H > 0) {
          if (U > S) return;
          U > p && (p = U);
        }
        if (U = y - m, !(!H && U < 0)) {
          if (U /= H, H < 0) {
            if (U > S) return;
            U > p && (p = U);
          } else if (H > 0) {
            if (U < p) return;
            U < S && (S = U);
          }
          return p > 0 && (u[0] = v + p * M, u[1] = m + p * H), S < 1 && (c[0] = v + S * M, c[1] = m + S * H), !0;
        }
      }
    }
  }
}
var eu = 1e9, Ci = -eu;
function Vy(u, c, o, f) {
  function d(h, p) {
    return u <= h && h <= o && c <= p && p <= f;
  }
  function y(h, p, S, M) {
    var H = 0, U = 0;
    if (h == null || (H = v(h, S)) !== (U = v(p, S)) || g(h, p) < 0 ^ S > 0)
      do
        M.point(H === 0 || H === 3 ? u : o, H > 1 ? f : c);
      while ((H = (H + S + 4) % 4) !== U);
    else
      M.point(p[0], p[1]);
  }
  function v(h, p) {
    return Bt(h[0] - u) < Ht ? p > 0 ? 0 : 3 : Bt(h[0] - o) < Ht ? p > 0 ? 2 : 1 : Bt(h[1] - c) < Ht ? p > 0 ? 1 : 0 : p > 0 ? 3 : 2;
  }
  function m(h, p) {
    return g(h.x, p.x);
  }
  function g(h, p) {
    var S = v(h, 1), M = v(p, 1);
    return S !== M ? S - M : S === 0 ? p[1] - h[1] : S === 1 ? h[0] - p[0] : S === 2 ? h[1] - p[1] : p[0] - h[0];
  }
  return function(h) {
    var p = h, S = rh(), M, H, U, C, L, V, Q, K, w, lt, F, k = {
      point: it,
      lineStart: I,
      lineEnd: ht,
      polygonStart: Et,
      polygonEnd: tt
    };
    function it(Y, T) {
      d(Y, T) && p.point(Y, T);
    }
    function ft() {
      for (var Y = 0, T = 0, G = H.length; T < G; ++T)
        for (var J = H[T], ct = 1, ot = J.length, E = J[0], q, X, $ = E[0], ut = E[1]; ct < ot; ++ct)
          q = $, X = ut, E = J[ct], $ = E[0], ut = E[1], X <= f ? ut > f && ($ - q) * (f - X) > (ut - X) * (u - q) && ++Y : ut <= f && ($ - q) * (f - X) < (ut - X) * (u - q) && --Y;
      return Y;
    }
    function Et() {
      p = S, M = [], H = [], F = !0;
    }
    function tt() {
      var Y = ft(), T = F && Y, G = (M = ih(M)).length;
      (T || G) && (h.polygonStart(), T && (h.lineStart(), y(null, null, 1, h), h.lineEnd()), G && oh(M, m, Y, y, h), h.polygonEnd()), p = h, M = H = U = null;
    }
    function I() {
      k.point = at, H && H.push(U = []), lt = !0, w = !1, Q = K = NaN;
    }
    function ht() {
      M && (at(C, L), V && w && S.rejoin(), M.push(S.result())), k.point = it, w && p.lineEnd();
    }
    function at(Y, T) {
      var G = d(Y, T);
      if (H && U.push([Y, T]), lt)
        C = Y, L = T, V = G, lt = !1, G && (p.lineStart(), p.point(Y, T));
      else if (G && w) p.point(Y, T);
      else {
        var J = [Q = Math.max(Ci, Math.min(eu, Q)), K = Math.max(Ci, Math.min(eu, K))], ct = [Y = Math.max(Ci, Math.min(eu, Y)), T = Math.max(Ci, Math.min(eu, T))];
        Gy(J, ct, u, c, o, f) ? (w || (p.lineStart(), p.point(J[0], J[1])), p.point(ct[0], ct[1]), G || p.lineEnd(), F = !1) : G && (p.lineStart(), p.point(Y, T), F = !1);
      }
      Q = Y, K = T, w = G;
    }
    return k;
  };
}
const Gr = (u) => u;
var Tr = new rn(), Vr = new rn(), dh, hh, Xr, Qr, ml = {
  point: Ze,
  lineStart: Ze,
  lineEnd: Ze,
  polygonStart: function() {
    ml.lineStart = Xy, ml.lineEnd = wy;
  },
  polygonEnd: function() {
    ml.lineStart = ml.lineEnd = ml.point = Ze, Tr.add(Bt(Vr)), Vr = new rn();
  },
  result: function() {
    var u = Tr / 2;
    return Tr = new rn(), u;
  }
};
function Xy() {
  ml.point = Qy;
}
function Qy(u, c) {
  ml.point = mh, dh = Xr = u, hh = Qr = c;
}
function mh(u, c) {
  Vr.add(Qr * u - Xr * c), Xr = u, Qr = c;
}
function wy() {
  mh(dh, hh);
}
var aa = 1 / 0, Qi = aa, fu = -aa, wi = fu, Ki = {
  point: Ky,
  lineStart: Ze,
  lineEnd: Ze,
  polygonStart: Ze,
  polygonEnd: Ze,
  result: function() {
    var u = [[aa, Qi], [fu, wi]];
    return fu = wi = -(Qi = aa = 1 / 0), u;
  }
};
function Ky(u, c) {
  u < aa && (aa = u), u > fu && (fu = u), c < Qi && (Qi = c), c > wi && (wi = c);
}
var wr = 0, Kr = 0, lu = 0, Ji = 0, $i = 0, ta = 0, Jr = 0, $r = 0, nu = 0, yh, vh, Je, $e, Be = {
  point: on,
  lineStart: Nd,
  lineEnd: _d,
  polygonStart: function() {
    Be.lineStart = Fy, Be.lineEnd = ky;
  },
  polygonEnd: function() {
    Be.point = on, Be.lineStart = Nd, Be.lineEnd = _d;
  },
  result: function() {
    var u = nu ? [Jr / nu, $r / nu] : ta ? [Ji / ta, $i / ta] : lu ? [wr / lu, Kr / lu] : [NaN, NaN];
    return wr = Kr = lu = Ji = $i = ta = Jr = $r = nu = 0, u;
  }
};
function on(u, c) {
  wr += u, Kr += c, ++lu;
}
function Nd() {
  Be.point = Jy;
}
function Jy(u, c) {
  Be.point = $y, on(Je = u, $e = c);
}
function $y(u, c) {
  var o = u - Je, f = c - $e, d = sn(o * o + f * f);
  Ji += d * (Je + u) / 2, $i += d * ($e + c) / 2, ta += d, on(Je = u, $e = c);
}
function _d() {
  Be.point = on;
}
function Fy() {
  Be.point = Wy;
}
function ky() {
  gh(yh, vh);
}
function Wy(u, c) {
  Be.point = gh, on(yh = Je = u, vh = $e = c);
}
function gh(u, c) {
  var o = u - Je, f = c - $e, d = sn(o * o + f * f);
  Ji += d * (Je + u) / 2, $i += d * ($e + c) / 2, ta += d, d = $e * u - Je * c, Jr += d * (Je + u), $r += d * ($e + c), nu += d * 3, on(Je = u, $e = c);
}
function ph(u) {
  this._context = u;
}
ph.prototype = {
  _radius: 4.5,
  pointRadius: function(u) {
    return this._radius = u, this;
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
  point: function(u, c) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(u, c), this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(u, c);
        break;
      }
      default: {
        this._context.moveTo(u + this._radius, c), this._context.arc(u, c, this._radius, 0, Te);
        break;
      }
    }
  },
  result: Ze
};
var Fr = new rn(), Nr, Sh, bh, au, uu, ru = {
  point: Ze,
  lineStart: function() {
    ru.point = Iy;
  },
  lineEnd: function() {
    Nr && Eh(Sh, bh), ru.point = Ze;
  },
  polygonStart: function() {
    Nr = !0;
  },
  polygonEnd: function() {
    Nr = null;
  },
  result: function() {
    var u = +Fr;
    return Fr = new rn(), u;
  }
};
function Iy(u, c) {
  ru.point = Eh, Sh = au = u, bh = uu = c;
}
function Eh(u, c) {
  au -= u, uu -= c, Fr.add(sn(au * au + uu * uu)), au = u, uu = c;
}
let Od, Fi, Dd, jd;
class Hd {
  constructor(c) {
    this._append = c == null ? xh : Py(c), this._radius = 4.5, this._ = "";
  }
  pointRadius(c) {
    return this._radius = +c, this;
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
  point(c, o) {
    switch (this._point) {
      case 0: {
        this._append`M${c},${o}`, this._point = 1;
        break;
      }
      case 1: {
        this._append`L${c},${o}`;
        break;
      }
      default: {
        if (this._append`M${c},${o}`, this._radius !== Dd || this._append !== Fi) {
          const f = this._radius, d = this._;
          this._ = "", this._append`m0,${f}a${f},${f} 0 1,1 0,${-2 * f}a${f},${f} 0 1,1 0,${2 * f}z`, Dd = f, Fi = this._append, jd = this._, this._ = d;
        }
        this._ += jd;
        break;
      }
    }
  }
  result() {
    const c = this._;
    return this._ = "", c.length ? c : null;
  }
}
function xh(u) {
  let c = 1;
  this._ += u[0];
  for (const o = u.length; c < o; ++c)
    this._ += arguments[c] + u[c];
}
function Py(u) {
  const c = Math.floor(u);
  if (!(c >= 0)) throw new RangeError(`invalid digits: ${u}`);
  if (c > 15) return xh;
  if (c !== Od) {
    const o = 10 ** c;
    Od = c, Fi = function(d) {
      let y = 1;
      this._ += d[0];
      for (const v = d.length; y < v; ++y)
        this._ += Math.round(arguments[y] * o) / o + d[y];
    };
  }
  return Fi;
}
function tv(u, c) {
  let o = 3, f = 4.5, d, y;
  function v(m) {
    return m && (typeof f == "function" && y.pointRadius(+f.apply(this, arguments)), Pn(m, d(y))), y.result();
  }
  return v.area = function(m) {
    return Pn(m, d(ml)), ml.result();
  }, v.measure = function(m) {
    return Pn(m, d(ru)), ru.result();
  }, v.bounds = function(m) {
    return Pn(m, d(Ki)), Ki.result();
  }, v.centroid = function(m) {
    return Pn(m, d(Be)), Be.result();
  }, v.projection = function(m) {
    return arguments.length ? (d = m == null ? (u = null, Gr) : (u = m).stream, v) : u;
  }, v.context = function(m) {
    return arguments.length ? (y = m == null ? (c = null, new Hd(o)) : new ph(c = m), typeof f != "function" && y.pointRadius(f), v) : c;
  }, v.pointRadius = function(m) {
    return arguments.length ? (f = typeof m == "function" ? m : (y.pointRadius(+m), +m), v) : f;
  }, v.digits = function(m) {
    if (!arguments.length) return o;
    if (m == null) o = null;
    else {
      const g = Math.floor(m);
      if (!(g >= 0)) throw new RangeError(`invalid digits: ${m}`);
      o = g;
    }
    return c === null && (y = new Hd(o)), v;
  }, v.projection(u).digits(o).context(c);
}
function n0(u) {
  return function(c) {
    var o = new kr();
    for (var f in u) o[f] = u[f];
    return o.stream = c, o;
  };
}
function kr() {
}
kr.prototype = {
  constructor: kr,
  point: function(u, c) {
    this.stream.point(u, c);
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
function a0(u, c, o) {
  var f = u.clipExtent && u.clipExtent();
  return u.scale(150).translate([0, 0]), f != null && u.clipExtent(null), Pn(o, u.stream(Ki)), c(Ki.result()), f != null && u.clipExtent(f), u;
}
function Ah(u, c, o) {
  return a0(u, function(f) {
    var d = c[1][0] - c[0][0], y = c[1][1] - c[0][1], v = Math.min(d / (f[1][0] - f[0][0]), y / (f[1][1] - f[0][1])), m = +c[0][0] + (d - v * (f[1][0] + f[0][0])) / 2, g = +c[0][1] + (y - v * (f[1][1] + f[0][1])) / 2;
    u.scale(150 * v).translate([m, g]);
  }, o);
}
function ev(u, c, o) {
  return Ah(u, [[0, 0], c], o);
}
function lv(u, c, o) {
  return a0(u, function(f) {
    var d = +c, y = d / (f[1][0] - f[0][0]), v = (d - y * (f[1][0] + f[0][0])) / 2, m = -y * f[0][1];
    u.scale(150 * y).translate([v, m]);
  }, o);
}
function nv(u, c, o) {
  return a0(u, function(f) {
    var d = +c, y = d / (f[1][1] - f[0][1]), v = -y * f[0][0], m = (d - y * (f[1][1] + f[0][1])) / 2;
    u.scale(150 * y).translate([v, m]);
  }, o);
}
var Rd = 16, av = Xt(30 * qt);
function Ud(u, c) {
  return +c ? iv(u, c) : uv(u);
}
function uv(u) {
  return n0({
    point: function(c, o) {
      c = u(c, o), this.stream.point(c[0], c[1]);
    }
  });
}
function iv(u, c) {
  function o(f, d, y, v, m, g, h, p, S, M, H, U, C, L) {
    var V = h - f, Q = p - d, K = V * V + Q * Q;
    if (K > 4 * c && C--) {
      var w = v + M, lt = m + H, F = g + U, k = sn(w * w + lt * lt + F * F), it = cu(F /= k), ft = Bt(Bt(F) - 1) < Ht || Bt(y - S) < Ht ? (y + S) / 2 : iu(lt, w), Et = u(ft, it), tt = Et[0], I = Et[1], ht = tt - f, at = I - d, Y = Q * ht - V * at;
      (Y * Y / K > c || Bt((V * ht + Q * at) / K - 0.5) > 0.3 || v * M + m * H + g * U < av) && (o(f, d, y, v, m, g, tt, I, ft, w /= k, lt /= k, F, C, L), L.point(tt, I), o(tt, I, ft, w, lt, F, h, p, S, M, H, U, C, L));
    }
  }
  return function(f) {
    var d, y, v, m, g, h, p, S, M, H, U, C, L = {
      point: V,
      lineStart: Q,
      lineEnd: w,
      polygonStart: function() {
        f.polygonStart(), L.lineStart = lt;
      },
      polygonEnd: function() {
        f.polygonEnd(), L.lineStart = Q;
      }
    };
    function V(it, ft) {
      it = u(it, ft), f.point(it[0], it[1]);
    }
    function Q() {
      S = NaN, L.point = K, f.lineStart();
    }
    function K(it, ft) {
      var Et = na([it, ft]), tt = u(it, ft);
      o(S, M, p, H, U, C, S = tt[0], M = tt[1], p = it, H = Et[0], U = Et[1], C = Et[2], Rd, f), f.point(S, M);
    }
    function w() {
      L.point = V, f.lineEnd();
    }
    function lt() {
      Q(), L.point = F, L.lineEnd = k;
    }
    function F(it, ft) {
      K(d = it, ft), y = S, v = M, m = H, g = U, h = C, L.point = K;
    }
    function k() {
      o(S, M, p, H, U, C, y, v, d, m, g, h, Rd, f), L.lineEnd = w, w();
    }
    return L;
  };
}
var cv = n0({
  point: function(u, c) {
    this.stream.point(u * qt, c * qt);
  }
});
function fv(u) {
  return n0({
    point: function(c, o) {
      var f = u(c, o);
      return this.stream.point(f[0], f[1]);
    }
  });
}
function rv(u, c, o, f, d) {
  function y(v, m) {
    return v *= f, m *= d, [c + u * v, o - u * m];
  }
  return y.invert = function(v, m) {
    return [(v - c) / u * f, (o - m) / u * d];
  }, y;
}
function Cd(u, c, o, f, d, y) {
  if (!y) return rv(u, c, o, f, d);
  var v = Xt(y), m = Qt(y), g = v * u, h = m * u, p = v / u, S = m / u, M = (m * o - v * c) / u, H = (m * c + v * o) / u;
  function U(C, L) {
    return C *= f, L *= d, [g * C - h * L + c, o - h * C - g * L];
  }
  return U.invert = function(C, L) {
    return [f * (p * C - S * L + M), d * (H - S * C - p * L)];
  }, U;
}
function ov(u) {
  return sv(function() {
    return u;
  })();
}
function sv(u) {
  var c, o = 150, f = 480, d = 250, y = 0, v = 0, m = 0, g = 0, h = 0, p, S = 0, M = 1, H = 1, U = null, C = Td, L = null, V, Q, K, w = Gr, lt = 0.5, F, k, it, ft, Et;
  function tt(Y) {
    return it(Y[0] * qt, Y[1] * qt);
  }
  function I(Y) {
    return Y = it.invert(Y[0], Y[1]), Y && [Y[0] * ie, Y[1] * ie];
  }
  tt.stream = function(Y) {
    return ft && Et === Y ? ft : ft = cv(fv(p)(C(F(w(Et = Y)))));
  }, tt.preclip = function(Y) {
    return arguments.length ? (C = Y, U = void 0, at()) : C;
  }, tt.postclip = function(Y) {
    return arguments.length ? (w = Y, L = V = Q = K = null, at()) : w;
  }, tt.clipAngle = function(Y) {
    return arguments.length ? (C = +Y ? Ly(U = Y * qt) : (U = null, Td), at()) : U * ie;
  }, tt.clipExtent = function(Y) {
    return arguments.length ? (w = Y == null ? (L = V = Q = K = null, Gr) : Vy(L = +Y[0][0], V = +Y[0][1], Q = +Y[1][0], K = +Y[1][1]), at()) : L == null ? null : [[L, V], [Q, K]];
  }, tt.scale = function(Y) {
    return arguments.length ? (o = +Y, ht()) : o;
  }, tt.translate = function(Y) {
    return arguments.length ? (f = +Y[0], d = +Y[1], ht()) : [f, d];
  }, tt.center = function(Y) {
    return arguments.length ? (y = Y[0] % 360 * qt, v = Y[1] % 360 * qt, ht()) : [y * ie, v * ie];
  }, tt.rotate = function(Y) {
    return arguments.length ? (m = Y[0] % 360 * qt, g = Y[1] % 360 * qt, h = Y.length > 2 ? Y[2] % 360 * qt : 0, ht()) : [m * ie, g * ie, h * ie];
  }, tt.angle = function(Y) {
    return arguments.length ? (S = Y % 360 * qt, ht()) : S * ie;
  }, tt.reflectX = function(Y) {
    return arguments.length ? (M = Y ? -1 : 1, ht()) : M < 0;
  }, tt.reflectY = function(Y) {
    return arguments.length ? (H = Y ? -1 : 1, ht()) : H < 0;
  }, tt.precision = function(Y) {
    return arguments.length ? (F = Ud(k, lt = Y * Y), at()) : sn(lt);
  }, tt.fitExtent = function(Y, T) {
    return Ah(tt, Y, T);
  }, tt.fitSize = function(Y, T) {
    return ev(tt, Y, T);
  }, tt.fitWidth = function(Y, T) {
    return lv(tt, Y, T);
  }, tt.fitHeight = function(Y, T) {
    return nv(tt, Y, T);
  };
  function ht() {
    var Y = Cd(o, 0, 0, M, H, S).apply(null, c(y, v)), T = Cd(o, f - Y[0], d - Y[1], M, H, S);
    return p = l0(m, g, h), k = Yr(c, T), it = Yr(p, k), F = Ud(k, lt), at();
  }
  function at() {
    return ft = Et = null, tt;
  }
  return function() {
    return c = u.apply(this, arguments), tt.invert = c.invert && I, ht();
  };
}
function u0(u, c) {
  return [u, _y(Dy((me + c) / 2))];
}
u0.invert = function(u, c) {
  return [u, 2 * ch(Ny(c)) - me];
};
function dv() {
  return hv(u0).scale(961 / Te);
}
function hv(u) {
  var c = ov(u), o = c.center, f = c.scale, d = c.translate, y = c.clipExtent, v = null, m, g, h;
  c.scale = function(S) {
    return arguments.length ? (f(S), p()) : f();
  }, c.translate = function(S) {
    return arguments.length ? (d(S), p()) : d();
  }, c.center = function(S) {
    return arguments.length ? (o(S), p()) : o();
  }, c.clipExtent = function(S) {
    return arguments.length ? (S == null ? v = m = g = h = null : (v = +S[0][0], m = +S[0][1], g = +S[1][0], h = +S[1][1]), p()) : v == null ? null : [[v, m], [g, h]];
  };
  function p() {
    var S = bt * f(), M = c(Hy(c.rotate()).invert([0, 0]));
    return y(v == null ? [[M[0] - S, M[1] - S], [M[0] + S, M[1] + S]] : u === u0 ? [[Math.max(M[0] - S, v), m], [Math.min(M[0] + S, g), h]] : [[v, Math.max(M[1] - S, m)], [g, Math.min(M[1] + S, h)]]);
  }
  return p();
}
function mv(u, c) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(u);
      break;
    default:
      this.range(c).domain(u);
      break;
  }
  return this;
}
function i0(u, c, o) {
  u.prototype = c.prototype = o, o.constructor = u;
}
function Mh(u, c) {
  var o = Object.create(u.prototype);
  for (var f in c) o[f] = c[f];
  return o;
}
function hu() {
}
var ou = 0.7, ki = 1 / ou, la = "\\s*([+-]?\\d+)\\s*", su = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Fe = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", yv = /^#([0-9a-f]{3,8})$/, vv = new RegExp(`^rgb\\(${la},${la},${la}\\)$`), gv = new RegExp(`^rgb\\(${Fe},${Fe},${Fe}\\)$`), pv = new RegExp(`^rgba\\(${la},${la},${la},${su}\\)$`), Sv = new RegExp(`^rgba\\(${Fe},${Fe},${Fe},${su}\\)$`), bv = new RegExp(`^hsl\\(${su},${Fe},${Fe}\\)$`), Ev = new RegExp(`^hsla\\(${su},${Fe},${Fe},${su}\\)$`), qd = {
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
i0(hu, du, {
  copy(u) {
    return Object.assign(new this.constructor(), this, u);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Bd,
  // Deprecated! Use color.formatHex.
  formatHex: Bd,
  formatHex8: xv,
  formatHsl: Av,
  formatRgb: Zd,
  toString: Zd
});
function Bd() {
  return this.rgb().formatHex();
}
function xv() {
  return this.rgb().formatHex8();
}
function Av() {
  return zh(this).formatHsl();
}
function Zd() {
  return this.rgb().formatRgb();
}
function du(u) {
  var c, o;
  return u = (u + "").trim().toLowerCase(), (c = yv.exec(u)) ? (o = c[1].length, c = parseInt(c[1], 16), o === 6 ? Yd(c) : o === 3 ? new ye(c >> 8 & 15 | c >> 4 & 240, c >> 4 & 15 | c & 240, (c & 15) << 4 | c & 15, 1) : o === 8 ? qi(c >> 24 & 255, c >> 16 & 255, c >> 8 & 255, (c & 255) / 255) : o === 4 ? qi(c >> 12 & 15 | c >> 8 & 240, c >> 8 & 15 | c >> 4 & 240, c >> 4 & 15 | c & 240, ((c & 15) << 4 | c & 15) / 255) : null) : (c = vv.exec(u)) ? new ye(c[1], c[2], c[3], 1) : (c = gv.exec(u)) ? new ye(c[1] * 255 / 100, c[2] * 255 / 100, c[3] * 255 / 100, 1) : (c = pv.exec(u)) ? qi(c[1], c[2], c[3], c[4]) : (c = Sv.exec(u)) ? qi(c[1] * 255 / 100, c[2] * 255 / 100, c[3] * 255 / 100, c[4]) : (c = bv.exec(u)) ? Vd(c[1], c[2] / 100, c[3] / 100, 1) : (c = Ev.exec(u)) ? Vd(c[1], c[2] / 100, c[3] / 100, c[4]) : qd.hasOwnProperty(u) ? Yd(qd[u]) : u === "transparent" ? new ye(NaN, NaN, NaN, 0) : null;
}
function Yd(u) {
  return new ye(u >> 16 & 255, u >> 8 & 255, u & 255, 1);
}
function qi(u, c, o, f) {
  return f <= 0 && (u = c = o = NaN), new ye(u, c, o, f);
}
function Mv(u) {
  return u instanceof hu || (u = du(u)), u ? (u = u.rgb(), new ye(u.r, u.g, u.b, u.opacity)) : new ye();
}
function Wr(u, c, o, f) {
  return arguments.length === 1 ? Mv(u) : new ye(u, c, o, f ?? 1);
}
function ye(u, c, o, f) {
  this.r = +u, this.g = +c, this.b = +o, this.opacity = +f;
}
i0(ye, Wr, Mh(hu, {
  brighter(u) {
    return u = u == null ? ki : Math.pow(ki, u), new ye(this.r * u, this.g * u, this.b * u, this.opacity);
  },
  darker(u) {
    return u = u == null ? ou : Math.pow(ou, u), new ye(this.r * u, this.g * u, this.b * u, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ye(fn(this.r), fn(this.g), fn(this.b), Wi(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Ld,
  // Deprecated! Use color.formatHex.
  formatHex: Ld,
  formatHex8: zv,
  formatRgb: Gd,
  toString: Gd
}));
function Ld() {
  return `#${cn(this.r)}${cn(this.g)}${cn(this.b)}`;
}
function zv() {
  return `#${cn(this.r)}${cn(this.g)}${cn(this.b)}${cn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Gd() {
  const u = Wi(this.opacity);
  return `${u === 1 ? "rgb(" : "rgba("}${fn(this.r)}, ${fn(this.g)}, ${fn(this.b)}${u === 1 ? ")" : `, ${u})`}`;
}
function Wi(u) {
  return isNaN(u) ? 1 : Math.max(0, Math.min(1, u));
}
function fn(u) {
  return Math.max(0, Math.min(255, Math.round(u) || 0));
}
function cn(u) {
  return u = fn(u), (u < 16 ? "0" : "") + u.toString(16);
}
function Vd(u, c, o, f) {
  return f <= 0 ? u = c = o = NaN : o <= 0 || o >= 1 ? u = c = NaN : c <= 0 && (u = NaN), new Ve(u, c, o, f);
}
function zh(u) {
  if (u instanceof Ve) return new Ve(u.h, u.s, u.l, u.opacity);
  if (u instanceof hu || (u = du(u)), !u) return new Ve();
  if (u instanceof Ve) return u;
  u = u.rgb();
  var c = u.r / 255, o = u.g / 255, f = u.b / 255, d = Math.min(c, o, f), y = Math.max(c, o, f), v = NaN, m = y - d, g = (y + d) / 2;
  return m ? (c === y ? v = (o - f) / m + (o < f) * 6 : o === y ? v = (f - c) / m + 2 : v = (c - o) / m + 4, m /= g < 0.5 ? y + d : 2 - y - d, v *= 60) : m = g > 0 && g < 1 ? 0 : v, new Ve(v, m, g, u.opacity);
}
function Tv(u, c, o, f) {
  return arguments.length === 1 ? zh(u) : new Ve(u, c, o, f ?? 1);
}
function Ve(u, c, o, f) {
  this.h = +u, this.s = +c, this.l = +o, this.opacity = +f;
}
i0(Ve, Tv, Mh(hu, {
  brighter(u) {
    return u = u == null ? ki : Math.pow(ki, u), new Ve(this.h, this.s, this.l * u, this.opacity);
  },
  darker(u) {
    return u = u == null ? ou : Math.pow(ou, u), new Ve(this.h, this.s, this.l * u, this.opacity);
  },
  rgb() {
    var u = this.h % 360 + (this.h < 0) * 360, c = isNaN(u) || isNaN(this.s) ? 0 : this.s, o = this.l, f = o + (o < 0.5 ? o : 1 - o) * c, d = 2 * o - f;
    return new ye(
      _r(u >= 240 ? u - 240 : u + 120, d, f),
      _r(u, d, f),
      _r(u < 120 ? u + 240 : u - 120, d, f),
      this.opacity
    );
  },
  clamp() {
    return new Ve(Xd(this.h), Bi(this.s), Bi(this.l), Wi(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const u = Wi(this.opacity);
    return `${u === 1 ? "hsl(" : "hsla("}${Xd(this.h)}, ${Bi(this.s) * 100}%, ${Bi(this.l) * 100}%${u === 1 ? ")" : `, ${u})`}`;
  }
}));
function Xd(u) {
  return u = (u || 0) % 360, u < 0 ? u + 360 : u;
}
function Bi(u) {
  return Math.max(0, Math.min(1, u || 0));
}
function _r(u, c, o) {
  return (u < 60 ? c + (o - c) * u / 60 : u < 180 ? o : u < 240 ? c + (o - c) * (240 - u) / 60 : c) * 255;
}
const c0 = (u) => () => u;
function Nv(u, c) {
  return function(o) {
    return u + o * c;
  };
}
function _v(u, c, o) {
  return u = Math.pow(u, o), c = Math.pow(c, o) - u, o = 1 / o, function(f) {
    return Math.pow(u + f * c, o);
  };
}
function Ov(u) {
  return (u = +u) == 1 ? Th : function(c, o) {
    return o - c ? _v(c, o, u) : c0(isNaN(c) ? o : c);
  };
}
function Th(u, c) {
  var o = c - u;
  return o ? Nv(u, o) : c0(isNaN(u) ? c : u);
}
const Qd = (function u(c) {
  var o = Ov(c);
  function f(d, y) {
    var v = o((d = Wr(d)).r, (y = Wr(y)).r), m = o(d.g, y.g), g = o(d.b, y.b), h = Th(d.opacity, y.opacity);
    return function(p) {
      return d.r = v(p), d.g = m(p), d.b = g(p), d.opacity = h(p), d + "";
    };
  }
  return f.gamma = u, f;
})(1);
function Dv(u, c) {
  c || (c = []);
  var o = u ? Math.min(c.length, u.length) : 0, f = c.slice(), d;
  return function(y) {
    for (d = 0; d < o; ++d) f[d] = u[d] * (1 - y) + c[d] * y;
    return f;
  };
}
function jv(u) {
  return ArrayBuffer.isView(u) && !(u instanceof DataView);
}
function Hv(u, c) {
  var o = c ? c.length : 0, f = u ? Math.min(o, u.length) : 0, d = new Array(f), y = new Array(o), v;
  for (v = 0; v < f; ++v) d[v] = f0(u[v], c[v]);
  for (; v < o; ++v) y[v] = c[v];
  return function(m) {
    for (v = 0; v < f; ++v) y[v] = d[v](m);
    return y;
  };
}
function Rv(u, c) {
  var o = /* @__PURE__ */ new Date();
  return u = +u, c = +c, function(f) {
    return o.setTime(u * (1 - f) + c * f), o;
  };
}
function Ii(u, c) {
  return u = +u, c = +c, function(o) {
    return u * (1 - o) + c * o;
  };
}
function Uv(u, c) {
  var o = {}, f = {}, d;
  (u === null || typeof u != "object") && (u = {}), (c === null || typeof c != "object") && (c = {});
  for (d in c)
    d in u ? o[d] = f0(u[d], c[d]) : f[d] = c[d];
  return function(y) {
    for (d in o) f[d] = o[d](y);
    return f;
  };
}
var Ir = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Or = new RegExp(Ir.source, "g");
function Cv(u) {
  return function() {
    return u;
  };
}
function qv(u) {
  return function(c) {
    return u(c) + "";
  };
}
function Bv(u, c) {
  var o = Ir.lastIndex = Or.lastIndex = 0, f, d, y, v = -1, m = [], g = [];
  for (u = u + "", c = c + ""; (f = Ir.exec(u)) && (d = Or.exec(c)); )
    (y = d.index) > o && (y = c.slice(o, y), m[v] ? m[v] += y : m[++v] = y), (f = f[0]) === (d = d[0]) ? m[v] ? m[v] += d : m[++v] = d : (m[++v] = null, g.push({ i: v, x: Ii(f, d) })), o = Or.lastIndex;
  return o < c.length && (y = c.slice(o), m[v] ? m[v] += y : m[++v] = y), m.length < 2 ? g[0] ? qv(g[0].x) : Cv(c) : (c = g.length, function(h) {
    for (var p = 0, S; p < c; ++p) m[(S = g[p]).i] = S.x(h);
    return m.join("");
  });
}
function f0(u, c) {
  var o = typeof c, f;
  return c == null || o === "boolean" ? c0(c) : (o === "number" ? Ii : o === "string" ? (f = du(c)) ? (c = f, Qd) : Bv : c instanceof du ? Qd : c instanceof Date ? Rv : jv(c) ? Dv : Array.isArray(c) ? Hv : typeof c.valueOf != "function" && typeof c.toString != "function" || isNaN(c) ? Uv : Ii)(u, c);
}
function Zv(u, c) {
  return u = +u, c = +c, function(o) {
    return Math.round(u * (1 - o) + c * o);
  };
}
function Yv(u) {
  return function() {
    return u;
  };
}
function Lv(u) {
  return +u;
}
var wd = [0, 1];
function ea(u) {
  return u;
}
function Pr(u, c) {
  return (c -= u = +u) ? function(o) {
    return (o - u) / c;
  } : Yv(isNaN(c) ? NaN : 0.5);
}
function Gv(u, c) {
  var o;
  return u > c && (o = u, u = c, c = o), function(f) {
    return Math.max(u, Math.min(c, f));
  };
}
function Vv(u, c, o) {
  var f = u[0], d = u[1], y = c[0], v = c[1];
  return d < f ? (f = Pr(d, f), y = o(v, y)) : (f = Pr(f, d), y = o(y, v)), function(m) {
    return y(f(m));
  };
}
function Xv(u, c, o) {
  var f = Math.min(u.length, c.length) - 1, d = new Array(f), y = new Array(f), v = -1;
  for (u[f] < u[0] && (u = u.slice().reverse(), c = c.slice().reverse()); ++v < f; )
    d[v] = Pr(u[v], u[v + 1]), y[v] = o(c[v], c[v + 1]);
  return function(m) {
    var g = by(u, m, 1, f) - 1;
    return y[g](d[g](m));
  };
}
function Qv(u, c) {
  return c.domain(u.domain()).range(u.range()).interpolate(u.interpolate()).clamp(u.clamp()).unknown(u.unknown());
}
function wv() {
  var u = wd, c = wd, o = f0, f, d, y, v = ea, m, g, h;
  function p() {
    var M = Math.min(u.length, c.length);
    return v !== ea && (v = Gv(u[0], u[M - 1])), m = M > 2 ? Xv : Vv, g = h = null, S;
  }
  function S(M) {
    return M == null || isNaN(M = +M) ? y : (g || (g = m(u.map(f), c, o)))(f(v(M)));
  }
  return S.invert = function(M) {
    return v(d((h || (h = m(c, u.map(f), Ii)))(M)));
  }, S.domain = function(M) {
    return arguments.length ? (u = Array.from(M, Lv), p()) : u.slice();
  }, S.range = function(M) {
    return arguments.length ? (c = Array.from(M), p()) : c.slice();
  }, S.rangeRound = function(M) {
    return c = Array.from(M), o = Zv, p();
  }, S.clamp = function(M) {
    return arguments.length ? (v = M ? !0 : ea, p()) : v !== ea;
  }, S.interpolate = function(M) {
    return arguments.length ? (o = M, p()) : o;
  }, S.unknown = function(M) {
    return arguments.length ? (y = M, S) : y;
  }, function(M, H) {
    return f = M, d = H, p();
  };
}
function Kv() {
  return wv()(ea, ea);
}
function Jv(u) {
  return Math.abs(u = Math.round(u)) >= 1e21 ? u.toLocaleString("en").replace(/,/g, "") : u.toString(10);
}
function Pi(u, c) {
  if (!isFinite(u) || u === 0) return null;
  var o = (u = c ? u.toExponential(c - 1) : u.toExponential()).indexOf("e"), f = u.slice(0, o);
  return [
    f.length > 1 ? f[0] + f.slice(2) : f,
    +u.slice(o + 1)
  ];
}
function ua(u) {
  return u = Pi(Math.abs(u)), u ? u[1] : NaN;
}
function $v(u, c) {
  return function(o, f) {
    for (var d = o.length, y = [], v = 0, m = u[0], g = 0; d > 0 && m > 0 && (g + m + 1 > f && (m = Math.max(1, f - g)), y.push(o.substring(d -= m, d + m)), !((g += m + 1) > f)); )
      m = u[v = (v + 1) % u.length];
    return y.reverse().join(c);
  };
}
function Fv(u) {
  return function(c) {
    return c.replace(/[0-9]/g, function(o) {
      return u[+o];
    });
  };
}
var kv = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function tc(u) {
  if (!(c = kv.exec(u))) throw new Error("invalid format: " + u);
  var c;
  return new r0({
    fill: c[1],
    align: c[2],
    sign: c[3],
    symbol: c[4],
    zero: c[5],
    width: c[6],
    comma: c[7],
    precision: c[8] && c[8].slice(1),
    trim: c[9],
    type: c[10]
  });
}
tc.prototype = r0.prototype;
function r0(u) {
  this.fill = u.fill === void 0 ? " " : u.fill + "", this.align = u.align === void 0 ? ">" : u.align + "", this.sign = u.sign === void 0 ? "-" : u.sign + "", this.symbol = u.symbol === void 0 ? "" : u.symbol + "", this.zero = !!u.zero, this.width = u.width === void 0 ? void 0 : +u.width, this.comma = !!u.comma, this.precision = u.precision === void 0 ? void 0 : +u.precision, this.trim = !!u.trim, this.type = u.type === void 0 ? "" : u.type + "";
}
r0.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function Wv(u) {
  t: for (var c = u.length, o = 1, f = -1, d; o < c; ++o)
    switch (u[o]) {
      case ".":
        f = d = o;
        break;
      case "0":
        f === 0 && (f = o), d = o;
        break;
      default:
        if (!+u[o]) break t;
        f > 0 && (f = 0);
        break;
    }
  return f > 0 ? u.slice(0, f) + u.slice(d + 1) : u;
}
var ec;
function Iv(u, c) {
  var o = Pi(u, c);
  if (!o) return ec = void 0, u.toPrecision(c);
  var f = o[0], d = o[1], y = d - (ec = Math.max(-8, Math.min(8, Math.floor(d / 3))) * 3) + 1, v = f.length;
  return y === v ? f : y > v ? f + new Array(y - v + 1).join("0") : y > 0 ? f.slice(0, y) + "." + f.slice(y) : "0." + new Array(1 - y).join("0") + Pi(u, Math.max(0, c + y - 1))[0];
}
function Kd(u, c) {
  var o = Pi(u, c);
  if (!o) return u + "";
  var f = o[0], d = o[1];
  return d < 0 ? "0." + new Array(-d).join("0") + f : f.length > d + 1 ? f.slice(0, d + 1) + "." + f.slice(d + 1) : f + new Array(d - f.length + 2).join("0");
}
const Jd = {
  "%": (u, c) => (u * 100).toFixed(c),
  b: (u) => Math.round(u).toString(2),
  c: (u) => u + "",
  d: Jv,
  e: (u, c) => u.toExponential(c),
  f: (u, c) => u.toFixed(c),
  g: (u, c) => u.toPrecision(c),
  o: (u) => Math.round(u).toString(8),
  p: (u, c) => Kd(u * 100, c),
  r: Kd,
  s: Iv,
  X: (u) => Math.round(u).toString(16).toUpperCase(),
  x: (u) => Math.round(u).toString(16)
};
function $d(u) {
  return u;
}
var Fd = Array.prototype.map, kd = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function Pv(u) {
  var c = u.grouping === void 0 || u.thousands === void 0 ? $d : $v(Fd.call(u.grouping, Number), u.thousands + ""), o = u.currency === void 0 ? "" : u.currency[0] + "", f = u.currency === void 0 ? "" : u.currency[1] + "", d = u.decimal === void 0 ? "." : u.decimal + "", y = u.numerals === void 0 ? $d : Fv(Fd.call(u.numerals, String)), v = u.percent === void 0 ? "%" : u.percent + "", m = u.minus === void 0 ? "−" : u.minus + "", g = u.nan === void 0 ? "NaN" : u.nan + "";
  function h(S, M) {
    S = tc(S);
    var H = S.fill, U = S.align, C = S.sign, L = S.symbol, V = S.zero, Q = S.width, K = S.comma, w = S.precision, lt = S.trim, F = S.type;
    F === "n" ? (K = !0, F = "g") : Jd[F] || (w === void 0 && (w = 12), lt = !0, F = "g"), (V || H === "0" && U === "=") && (V = !0, H = "0", U = "=");
    var k = (M && M.prefix !== void 0 ? M.prefix : "") + (L === "$" ? o : L === "#" && /[boxX]/.test(F) ? "0" + F.toLowerCase() : ""), it = (L === "$" ? f : /[%p]/.test(F) ? v : "") + (M && M.suffix !== void 0 ? M.suffix : ""), ft = Jd[F], Et = /[defgprs%]/.test(F);
    w = w === void 0 ? 6 : /[gprs]/.test(F) ? Math.max(1, Math.min(21, w)) : Math.max(0, Math.min(20, w));
    function tt(I) {
      var ht = k, at = it, Y, T, G;
      if (F === "c")
        at = ft(I) + at, I = "";
      else {
        I = +I;
        var J = I < 0 || 1 / I < 0;
        if (I = isNaN(I) ? g : ft(Math.abs(I), w), lt && (I = Wv(I)), J && +I == 0 && C !== "+" && (J = !1), ht = (J ? C === "(" ? C : m : C === "-" || C === "(" ? "" : C) + ht, at = (F === "s" && !isNaN(I) && ec !== void 0 ? kd[8 + ec / 3] : "") + at + (J && C === "(" ? ")" : ""), Et) {
          for (Y = -1, T = I.length; ++Y < T; )
            if (G = I.charCodeAt(Y), 48 > G || G > 57) {
              at = (G === 46 ? d + I.slice(Y + 1) : I.slice(Y)) + at, I = I.slice(0, Y);
              break;
            }
        }
      }
      K && !V && (I = c(I, 1 / 0));
      var ct = ht.length + I.length + at.length, ot = ct < Q ? new Array(Q - ct + 1).join(H) : "";
      switch (K && V && (I = c(ot + I, ot.length ? Q - at.length : 1 / 0), ot = ""), U) {
        case "<":
          I = ht + I + at + ot;
          break;
        case "=":
          I = ht + ot + I + at;
          break;
        case "^":
          I = ot.slice(0, ct = ot.length >> 1) + ht + I + at + ot.slice(ct);
          break;
        default:
          I = ot + ht + I + at;
          break;
      }
      return y(I);
    }
    return tt.toString = function() {
      return S + "";
    }, tt;
  }
  function p(S, M) {
    var H = Math.max(-8, Math.min(8, Math.floor(ua(M) / 3))) * 3, U = Math.pow(10, -H), C = h((S = tc(S), S.type = "f", S), { suffix: kd[8 + H / 3] });
    return function(L) {
      return C(U * L);
    };
  }
  return {
    format: h,
    formatPrefix: p
  };
}
var Zi, Nh, _h;
tg({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function tg(u) {
  return Zi = Pv(u), Nh = Zi.format, _h = Zi.formatPrefix, Zi;
}
function eg(u) {
  return Math.max(0, -ua(Math.abs(u)));
}
function lg(u, c) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(ua(c) / 3))) * 3 - ua(Math.abs(u)));
}
function ng(u, c) {
  return u = Math.abs(u), c = Math.abs(c) - u, Math.max(0, ua(c) - ua(u)) + 1;
}
function ag(u, c, o, f) {
  var d = zy(u, c, o), y;
  switch (f = tc(f ?? ",f"), f.type) {
    case "s": {
      var v = Math.max(Math.abs(u), Math.abs(c));
      return f.precision == null && !isNaN(y = lg(d, v)) && (f.precision = y), _h(f, v);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      f.precision == null && !isNaN(y = ng(d, Math.max(Math.abs(u), Math.abs(c)))) && (f.precision = y - (f.type === "e"));
      break;
    }
    case "f":
    case "%": {
      f.precision == null && !isNaN(y = eg(d)) && (f.precision = y - (f.type === "%") * 2);
      break;
    }
  }
  return Nh(f);
}
function ug(u) {
  var c = u.domain;
  return u.ticks = function(o) {
    var f = c();
    return My(f[0], f[f.length - 1], o ?? 10);
  }, u.tickFormat = function(o, f) {
    var d = c();
    return ag(d[0], d[d.length - 1], o ?? 10, f);
  }, u.nice = function(o) {
    o == null && (o = 10);
    var f = c(), d = 0, y = f.length - 1, v = f[d], m = f[y], g, h, p = 10;
    for (m < v && (h = v, v = m, m = h, h = d, d = y, y = h); p-- > 0; ) {
      if (h = Cr(v, m, o), h === g)
        return f[d] = v, f[y] = m, c(f);
      if (h > 0)
        v = Math.floor(v / h) * h, m = Math.ceil(m / h) * h;
      else if (h < 0)
        v = Math.ceil(v * h) / h, m = Math.floor(m * h) / h;
      else
        break;
      g = h;
    }
    return u;
  }, u;
}
function lc() {
  var u = Kv();
  return u.copy = function() {
    return Qv(u, lc());
  }, mv.apply(u, arguments), ug(u);
}
const ig = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M228,128a100,100,0,0,1-98.66,100H128a99.39,99.39,0,0,1-68.62-27.29,12,12,0,0,1,16.48-17.45,76,76,0,1,0-1.57-109c-.13.13-.25.25-.39.37L54.89,92H72a12,12,0,0,1,0,24H24a12,12,0,0,1-12-12V56a12,12,0,0,1,24,0V76.72L57.48,57.06A100,100,0,0,1,228,128Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M216,128a88,88,0,1,1-88-88A88,88,0,0,1,216,128Z", opacity: "0.2" }), /* @__PURE__ */ _.createElement("path", { d: "M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L44.59,96H72a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V56a8,8,0,0,1,16,0V85.8L60.25,60A96,96,0,0,1,224,128Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L60.63,81.29l17,17A8,8,0,0,1,72,112H24a8,8,0,0,1-8-8V56A8,8,0,0,1,29.66,50.3L49.31,70,60.25,60A96,96,0,0,1,224,128Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M222,128a94,94,0,0,1-92.74,94H128a93.43,93.43,0,0,1-64.5-25.65,6,6,0,1,1,8.24-8.72A82,82,0,1,0,70,70l-.19.19L39.44,98H72a6,6,0,0,1,0,12H24a6,6,0,0,1-6-6V56a6,6,0,0,1,12,0V90.34L61.63,61.4A94,94,0,0,1,222,128Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L44.59,96H72a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V56a8,8,0,0,1,16,0V85.8L60.25,60A96,96,0,0,1,224,128Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M220,128a92,92,0,0,1-90.77,92H128a91.47,91.47,0,0,1-63.13-25.1,4,4,0,1,1,5.5-5.82A84,84,0,1,0,68.6,68.57l-.13.12L34.3,100H72a4,4,0,0,1,0,8H24a4,4,0,0,1-4-4V56a4,4,0,0,1,8,0V94.89l35-32A92,92,0,0,1,220,128Z" }))
  ]
]), cg = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M216,128l-72,72V56Z", opacity: "0.2" }), /* @__PURE__ */ _.createElement("path", { d: "M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M221.66,133.66l-72,72A8,8,0,0,1,136,200V136H40a8,8,0,0,1,0-16h96V56a8,8,0,0,1,13.66-5.66l72,72A8,8,0,0,1,221.66,133.66Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M220.24,132.24l-72,72a6,6,0,0,1-8.48-8.48L201.51,134H40a6,6,0,0,1,0-12H201.51L139.76,60.24a6,6,0,0,1,8.48-8.48l72,72A6,6,0,0,1,220.24,132.24Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M218.83,130.83l-72,72a4,4,0,0,1-5.66-5.66L206.34,132H40a4,4,0,0,1,0-8H206.34L141.17,58.83a4,4,0,0,1,5.66-5.66l72,72A4,4,0,0,1,218.83,130.83Z" }))
  ]
]), fg = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M228,144v64a12,12,0,0,1-12,12H40a12,12,0,0,1-12-12V144a12,12,0,0,1,24,0v52H204V144a12,12,0,0,1,24,0Zm-108.49,8.49a12,12,0,0,0,17,0l40-40a12,12,0,0,0-17-17L140,115V32a12,12,0,0,0-24,0v83L96.49,95.51a12,12,0,0,0-17,17Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement(
      "path",
      {
        d: "M216,48V208H40V48A16,16,0,0,1,56,32H200A16,16,0,0,1,216,48Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ _.createElement("path", { d: "M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,124.69V32a8,8,0,0,0-16,0v92.69L93.66,98.34a8,8,0,0,0-11.32,11.32Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40A8,8,0,0,0,168,96H136V32a8,8,0,0,0-16,0V96H88a8,8,0,0,0-5.66,13.66Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M222,144v64a6,6,0,0,1-6,6H40a6,6,0,0,1-6-6V144a6,6,0,0,1,12,0v58H210V144a6,6,0,0,1,12,0Zm-98.24,4.24a6,6,0,0,0,8.48,0l40-40a6,6,0,0,0-8.48-8.48L134,129.51V32a6,6,0,0,0-12,0v97.51L92.24,99.76a6,6,0,0,0-8.48,8.48Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,124.69V32a8,8,0,0,0-16,0v92.69L93.66,98.34a8,8,0,0,0-11.32,11.32Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M220,144v64a4,4,0,0,1-4,4H40a4,4,0,0,1-4-4V144a4,4,0,0,1,8,0v60H212V144a4,4,0,0,1,8,0Zm-94.83,2.83a4,4,0,0,0,5.66,0l40-40a4,4,0,1,0-5.66-5.66L132,134.34V32a4,4,0,0,0-8,0V134.34L90.83,101.17a4,4,0,0,0-5.66,5.66Z" }))
  ]
]), rg = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement(
      "path",
      {
        d: "M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ _.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,136H72a8,8,0,0,1,0-16H184a8,8,0,0,1,0,16Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M222,128a6,6,0,0,1-6,6H40a6,6,0,0,1,0-12H216A6,6,0,0,1,222,128Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M220,128a4,4,0,0,1-4,4H40a4,4,0,0,1,0-8H216A4,4,0,0,1,220,128Z" }))
  ]
]), og = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement(
      "path",
      {
        d: "M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ _.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,136H136v48a8,8,0,0,1-16,0V136H72a8,8,0,0,1,0-16h48V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M222,128a6,6,0,0,1-6,6H134v82a6,6,0,0,1-12,0V134H40a6,6,0,0,1,0-12h82V40a6,6,0,0,1,12,0v82h82A6,6,0,0,1,222,128Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M220,128a4,4,0,0,1-4,4H132v84a4,4,0,0,1-8,0V132H40a4,4,0,0,1,0-8h84V40a4,4,0,0,1,8,0v84h84A4,4,0,0,1,220,128Z" }))
  ]
]), sg = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement(
      "path",
      {
        d: "M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ _.createElement("path", { d: "M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM181.66,170.34a8,8,0,0,1-11.32,11.32L128,139.31,85.66,181.66a8,8,0,0,1-11.32-11.32L116.69,128,74.34,85.66A8,8,0,0,1,85.66,74.34L128,116.69l42.34-42.35a8,8,0,0,1,11.32,11.32L139.31,128Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M204.24,195.76a6,6,0,1,1-8.48,8.48L128,136.49,60.24,204.24a6,6,0,0,1-8.48-8.48L119.51,128,51.76,60.24a6,6,0,0,1,8.48-8.48L128,119.51l67.76-67.75a6,6,0,0,1,8.48,8.48L136.49,128Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("path", { d: "M202.83,197.17a4,4,0,0,1-5.66,5.66L128,133.66,58.83,202.83a4,4,0,0,1-5.66-5.66L122.34,128,53.17,58.83a4,4,0,0,1,5.66-5.66L128,122.34l69.17-69.17a4,4,0,1,1,5.66,5.66L133.66,128Z" }))
  ]
]), dg = _.createContext({
  color: "currentColor",
  size: "1em",
  weight: "regular",
  mirrored: !1
}), dn = _.forwardRef(
  (u, c) => {
    const {
      alt: o,
      color: f,
      size: d,
      weight: y,
      mirrored: v,
      children: m,
      weights: g,
      ...h
    } = u, {
      color: p = "currentColor",
      size: S,
      weight: M = "regular",
      mirrored: H = !1,
      ...U
    } = _.useContext(dg);
    return /* @__PURE__ */ _.createElement(
      "svg",
      {
        ref: c,
        xmlns: "http://www.w3.org/2000/svg",
        width: d ?? S,
        height: d ?? S,
        fill: f ?? p,
        viewBox: "0 0 256 256",
        transform: v || H ? "scale(-1, 1)" : void 0,
        ...U,
        ...h
      },
      !!o && /* @__PURE__ */ _.createElement("title", null, o),
      m,
      g.get(y ?? M)
    );
  }
);
dn.displayName = "IconBase";
const Oh = _.forwardRef((u, c) => /* @__PURE__ */ _.createElement(dn, { ref: c, ...u, weights: ig }));
Oh.displayName = "ArrowCounterClockwiseIcon";
const hg = Oh, Dh = _.forwardRef((u, c) => /* @__PURE__ */ _.createElement(dn, { ref: c, ...u, weights: cg }));
Dh.displayName = "ArrowRightIcon";
const mg = Dh, jh = _.forwardRef((u, c) => /* @__PURE__ */ _.createElement(dn, { ref: c, ...u, weights: fg }));
jh.displayName = "DownloadSimpleIcon";
const yg = jh, Hh = _.forwardRef((u, c) => /* @__PURE__ */ _.createElement(dn, { ref: c, ...u, weights: rg }));
Hh.displayName = "MinusIcon";
const vg = Hh, Rh = _.forwardRef((u, c) => /* @__PURE__ */ _.createElement(dn, { ref: c, ...u, weights: og }));
Rh.displayName = "PlusIcon";
const gg = Rh, Uh = _.forwardRef((u, c) => /* @__PURE__ */ _.createElement(dn, { ref: c, ...u, weights: sg }));
Uh.displayName = "XIcon";
const pg = Uh;
var Dr = { exports: {} }, tu = {}, jr = { exports: {} }, Hr = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wd;
function Sg() {
  return Wd || (Wd = 1, (function(u) {
    function c(T, G) {
      var J = T.length;
      T.push(G);
      t: for (; 0 < J; ) {
        var ct = J - 1 >>> 1, ot = T[ct];
        if (0 < d(ot, G))
          T[ct] = G, T[J] = ot, J = ct;
        else break t;
      }
    }
    function o(T) {
      return T.length === 0 ? null : T[0];
    }
    function f(T) {
      if (T.length === 0) return null;
      var G = T[0], J = T.pop();
      if (J !== G) {
        T[0] = J;
        t: for (var ct = 0, ot = T.length, E = ot >>> 1; ct < E; ) {
          var q = 2 * (ct + 1) - 1, X = T[q], $ = q + 1, ut = T[$];
          if (0 > d(X, J))
            $ < ot && 0 > d(ut, X) ? (T[ct] = ut, T[$] = J, ct = $) : (T[ct] = X, T[q] = J, ct = q);
          else if ($ < ot && 0 > d(ut, J))
            T[ct] = ut, T[$] = J, ct = $;
          else break t;
        }
      }
      return G;
    }
    function d(T, G) {
      var J = T.sortIndex - G.sortIndex;
      return J !== 0 ? J : T.id - G.id;
    }
    if (u.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var y = performance;
      u.unstable_now = function() {
        return y.now();
      };
    } else {
      var v = Date, m = v.now();
      u.unstable_now = function() {
        return v.now() - m;
      };
    }
    var g = [], h = [], p = 1, S = null, M = 3, H = !1, U = !1, C = !1, L = !1, V = typeof setTimeout == "function" ? setTimeout : null, Q = typeof clearTimeout == "function" ? clearTimeout : null, K = typeof setImmediate < "u" ? setImmediate : null;
    function w(T) {
      for (var G = o(h); G !== null; ) {
        if (G.callback === null) f(h);
        else if (G.startTime <= T)
          f(h), G.sortIndex = G.expirationTime, c(g, G);
        else break;
        G = o(h);
      }
    }
    function lt(T) {
      if (C = !1, w(T), !U)
        if (o(g) !== null)
          U = !0, F || (F = !0, I());
        else {
          var G = o(h);
          G !== null && Y(lt, G.startTime - T);
        }
    }
    var F = !1, k = -1, it = 5, ft = -1;
    function Et() {
      return L ? !0 : !(u.unstable_now() - ft < it);
    }
    function tt() {
      if (L = !1, F) {
        var T = u.unstable_now();
        ft = T;
        var G = !0;
        try {
          t: {
            U = !1, C && (C = !1, Q(k), k = -1), H = !0;
            var J = M;
            try {
              e: {
                for (w(T), S = o(g); S !== null && !(S.expirationTime > T && Et()); ) {
                  var ct = S.callback;
                  if (typeof ct == "function") {
                    S.callback = null, M = S.priorityLevel;
                    var ot = ct(
                      S.expirationTime <= T
                    );
                    if (T = u.unstable_now(), typeof ot == "function") {
                      S.callback = ot, w(T), G = !0;
                      break e;
                    }
                    S === o(g) && f(g), w(T);
                  } else f(g);
                  S = o(g);
                }
                if (S !== null) G = !0;
                else {
                  var E = o(h);
                  E !== null && Y(
                    lt,
                    E.startTime - T
                  ), G = !1;
                }
              }
              break t;
            } finally {
              S = null, M = J, H = !1;
            }
            G = void 0;
          }
        } finally {
          G ? I() : F = !1;
        }
      }
    }
    var I;
    if (typeof K == "function")
      I = function() {
        K(tt);
      };
    else if (typeof MessageChannel < "u") {
      var ht = new MessageChannel(), at = ht.port2;
      ht.port1.onmessage = tt, I = function() {
        at.postMessage(null);
      };
    } else
      I = function() {
        V(tt, 0);
      };
    function Y(T, G) {
      k = V(function() {
        T(u.unstable_now());
      }, G);
    }
    u.unstable_IdlePriority = 5, u.unstable_ImmediatePriority = 1, u.unstable_LowPriority = 4, u.unstable_NormalPriority = 3, u.unstable_Profiling = null, u.unstable_UserBlockingPriority = 2, u.unstable_cancelCallback = function(T) {
      T.callback = null;
    }, u.unstable_forceFrameRate = function(T) {
      0 > T || 125 < T ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : it = 0 < T ? Math.floor(1e3 / T) : 5;
    }, u.unstable_getCurrentPriorityLevel = function() {
      return M;
    }, u.unstable_next = function(T) {
      switch (M) {
        case 1:
        case 2:
        case 3:
          var G = 3;
          break;
        default:
          G = M;
      }
      var J = M;
      M = G;
      try {
        return T();
      } finally {
        M = J;
      }
    }, u.unstable_requestPaint = function() {
      L = !0;
    }, u.unstable_runWithPriority = function(T, G) {
      switch (T) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          T = 3;
      }
      var J = M;
      M = T;
      try {
        return G();
      } finally {
        M = J;
      }
    }, u.unstable_scheduleCallback = function(T, G, J) {
      var ct = u.unstable_now();
      switch (typeof J == "object" && J !== null ? (J = J.delay, J = typeof J == "number" && 0 < J ? ct + J : ct) : J = ct, T) {
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
      return ot = J + ot, T = {
        id: p++,
        callback: G,
        priorityLevel: T,
        startTime: J,
        expirationTime: ot,
        sortIndex: -1
      }, J > ct ? (T.sortIndex = J, c(h, T), o(g) === null && T === o(h) && (C ? (Q(k), k = -1) : C = !0, Y(lt, J - ct))) : (T.sortIndex = ot, c(g, T), U || H || (U = !0, F || (F = !0, I()))), T;
    }, u.unstable_shouldYield = Et, u.unstable_wrapCallback = function(T) {
      var G = M;
      return function() {
        var J = M;
        M = G;
        try {
          return T.apply(this, arguments);
        } finally {
          M = J;
        }
      };
    };
  })(Hr)), Hr;
}
var Id;
function bg() {
  return Id || (Id = 1, jr.exports = Sg()), jr.exports;
}
var Rr = { exports: {} }, ne = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pd;
function Eg() {
  if (Pd) return ne;
  Pd = 1;
  var u = e0();
  function c(g) {
    var h = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var p = 2; p < arguments.length; p++)
        h += "&args[]=" + encodeURIComponent(arguments[p]);
    }
    return "Minified React error #" + g + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var f = {
    d: {
      f: o,
      r: function() {
        throw Error(c(522));
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
  }, d = Symbol.for("react.portal");
  function y(g, h, p) {
    var S = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: d,
      key: S == null ? null : "" + S,
      children: g,
      containerInfo: h,
      implementation: p
    };
  }
  var v = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(g, h) {
    if (g === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return ne.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = f, ne.createPortal = function(g, h) {
    var p = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(c(299));
    return y(g, h, null, p);
  }, ne.flushSync = function(g) {
    var h = v.T, p = f.p;
    try {
      if (v.T = null, f.p = 2, g) return g();
    } finally {
      v.T = h, f.p = p, f.d.f();
    }
  }, ne.preconnect = function(g, h) {
    typeof g == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, f.d.C(g, h));
  }, ne.prefetchDNS = function(g) {
    typeof g == "string" && f.d.D(g);
  }, ne.preinit = function(g, h) {
    if (typeof g == "string" && h && typeof h.as == "string") {
      var p = h.as, S = m(p, h.crossOrigin), M = typeof h.integrity == "string" ? h.integrity : void 0, H = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      p === "style" ? f.d.S(
        g,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: S,
          integrity: M,
          fetchPriority: H
        }
      ) : p === "script" && f.d.X(g, {
        crossOrigin: S,
        integrity: M,
        fetchPriority: H,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, ne.preinitModule = function(g, h) {
    if (typeof g == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var p = m(
            h.as,
            h.crossOrigin
          );
          f.d.M(g, {
            crossOrigin: p,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0
          });
        }
      } else h == null && f.d.M(g);
  }, ne.preload = function(g, h) {
    if (typeof g == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var p = h.as, S = m(p, h.crossOrigin);
      f.d.L(g, p, {
        crossOrigin: S,
        integrity: typeof h.integrity == "string" ? h.integrity : void 0,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0,
        type: typeof h.type == "string" ? h.type : void 0,
        fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
        referrerPolicy: typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
        imageSrcSet: typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
        imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
        media: typeof h.media == "string" ? h.media : void 0
      });
    }
  }, ne.preloadModule = function(g, h) {
    if (typeof g == "string")
      if (h) {
        var p = m(h.as, h.crossOrigin);
        f.d.m(g, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: p,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else f.d.m(g);
  }, ne.requestFormReset = function(g) {
    f.d.r(g);
  }, ne.unstable_batchedUpdates = function(g, h) {
    return g(h);
  }, ne.useFormState = function(g, h, p) {
    return v.H.useFormState(g, h, p);
  }, ne.useFormStatus = function() {
    return v.H.useHostTransitionStatus();
  }, ne.version = "19.2.0", ne;
}
var th;
function xg() {
  if (th) return Rr.exports;
  th = 1;
  function u() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (c) {
        console.error(c);
      }
  }
  return u(), Rr.exports = Eg(), Rr.exports;
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
var eh;
function Ag() {
  if (eh) return tu;
  eh = 1;
  var u = bg(), c = e0(), o = xg();
  function f(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        e += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function d(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function y(t) {
    var e = t, l = t;
    if (t.alternate) for (; e.return; ) e = e.return;
    else {
      t = e;
      do
        e = t, (e.flags & 4098) !== 0 && (l = e.return), t = e.return;
      while (t);
    }
    return e.tag === 3 ? l : null;
  }
  function v(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function m(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function g(t) {
    if (y(t) !== t)
      throw Error(f(188));
  }
  function h(t) {
    var e = t.alternate;
    if (!e) {
      if (e = y(t), e === null) throw Error(f(188));
      return e !== t ? null : t;
    }
    for (var l = t, n = e; ; ) {
      var a = l.return;
      if (a === null) break;
      var i = a.alternate;
      if (i === null) {
        if (n = a.return, n !== null) {
          l = n;
          continue;
        }
        break;
      }
      if (a.child === i.child) {
        for (i = a.child; i; ) {
          if (i === l) return g(a), t;
          if (i === n) return g(a), e;
          i = i.sibling;
        }
        throw Error(f(188));
      }
      if (l.return !== n.return) l = a, n = i;
      else {
        for (var r = !1, s = a.child; s; ) {
          if (s === l) {
            r = !0, l = a, n = i;
            break;
          }
          if (s === n) {
            r = !0, n = a, l = i;
            break;
          }
          s = s.sibling;
        }
        if (!r) {
          for (s = i.child; s; ) {
            if (s === l) {
              r = !0, l = i, n = a;
              break;
            }
            if (s === n) {
              r = !0, n = i, l = a;
              break;
            }
            s = s.sibling;
          }
          if (!r) throw Error(f(189));
        }
      }
      if (l.alternate !== n) throw Error(f(190));
    }
    if (l.tag !== 3) throw Error(f(188));
    return l.stateNode.current === l ? t : e;
  }
  function p(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = p(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  var S = Object.assign, M = Symbol.for("react.element"), H = Symbol.for("react.transitional.element"), U = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), L = Symbol.for("react.strict_mode"), V = Symbol.for("react.profiler"), Q = Symbol.for("react.consumer"), K = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), lt = Symbol.for("react.suspense"), F = Symbol.for("react.suspense_list"), k = Symbol.for("react.memo"), it = Symbol.for("react.lazy"), ft = Symbol.for("react.activity"), Et = Symbol.for("react.memo_cache_sentinel"), tt = Symbol.iterator;
  function I(t) {
    return t === null || typeof t != "object" ? null : (t = tt && t[tt] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var ht = Symbol.for("react.client.reference");
  function at(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === ht ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case C:
        return "Fragment";
      case V:
        return "Profiler";
      case L:
        return "StrictMode";
      case lt:
        return "Suspense";
      case F:
        return "SuspenseList";
      case ft:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case U:
          return "Portal";
        case K:
          return t.displayName || "Context";
        case Q:
          return (t._context.displayName || "Context") + ".Consumer";
        case w:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case k:
          return e = t.displayName || null, e !== null ? e : at(t.type) || "Memo";
        case it:
          e = t._payload, t = t._init;
          try {
            return at(t(e));
          } catch {
          }
      }
    return null;
  }
  var Y = Array.isArray, T = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, G = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, J = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ct = [], ot = -1;
  function E(t) {
    return { current: t };
  }
  function q(t) {
    0 > ot || (t.current = ct[ot], ct[ot] = null, ot--);
  }
  function X(t, e) {
    ot++, ct[ot] = t.current, t.current = e;
  }
  var $ = E(null), ut = E(null), mt = E(null), zt = E(null);
  function ae(t, e) {
    switch (X(mt, e), X(ut, t), X($, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? C1(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = C1(e), t = q1(e, t);
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
    q($), X($, t);
  }
  function Lt() {
    q($), q(ut), q(mt);
  }
  function ia(t) {
    t.memoizedState !== null && X(zt, t);
    var e = $.current, l = q1(e, t.type);
    e !== l && (X(ut, t), X($, l));
  }
  function mu(t) {
    ut.current === t && (q($), q(ut)), zt.current === t && (q(zt), Fa._currentValue = J);
  }
  var nc, o0;
  function Gl(t) {
    if (nc === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        nc = e && e[1] || "", o0 = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + nc + t + o0;
  }
  var ac = !1;
  function uc(t, e) {
    if (!t || ac) return "";
    ac = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var Z = function() {
                throw Error();
              };
              if (Object.defineProperty(Z.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(Z, []);
                } catch (j) {
                  var D = j;
                }
                Reflect.construct(t, [], Z);
              } else {
                try {
                  Z.call();
                } catch (j) {
                  D = j;
                }
                t.call(Z.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (j) {
                D = j;
              }
              (Z = t()) && typeof Z.catch == "function" && Z.catch(function() {
              });
            }
          } catch (j) {
            if (j && D && typeof j.stack == "string")
              return [j.stack, D.stack];
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
      var i = n.DetermineComponentFrameRoot(), r = i[0], s = i[1];
      if (r && s) {
        var b = r.split(`
`), O = s.split(`
`);
        for (a = n = 0; n < b.length && !b[n].includes("DetermineComponentFrameRoot"); )
          n++;
        for (; a < O.length && !O[a].includes(
          "DetermineComponentFrameRoot"
        ); )
          a++;
        if (n === b.length || a === O.length)
          for (n = b.length - 1, a = O.length - 1; 1 <= n && 0 <= a && b[n] !== O[a]; )
            a--;
        for (; 1 <= n && 0 <= a; n--, a--)
          if (b[n] !== O[a]) {
            if (n !== 1 || a !== 1)
              do
                if (n--, a--, 0 > a || b[n] !== O[a]) {
                  var R = `
` + b[n].replace(" at new ", " at ");
                  return t.displayName && R.includes("<anonymous>") && (R = R.replace("<anonymous>", t.displayName)), R;
                }
              while (1 <= n && 0 <= a);
            break;
          }
      }
    } finally {
      ac = !1, Error.prepareStackTrace = l;
    }
    return (l = t ? t.displayName || t.name : "") ? Gl(l) : "";
  }
  function Bh(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Gl(t.type);
      case 16:
        return Gl("Lazy");
      case 13:
        return t.child !== e && e !== null ? Gl("Suspense Fallback") : Gl("Suspense");
      case 19:
        return Gl("SuspenseList");
      case 0:
      case 15:
        return uc(t.type, !1);
      case 11:
        return uc(t.type.render, !1);
      case 1:
        return uc(t.type, !0);
      case 31:
        return Gl("Activity");
      default:
        return "";
    }
  }
  function s0(t) {
    try {
      var e = "", l = null;
      do
        e += Bh(t, l), l = t, t = t.return;
      while (t);
      return e;
    } catch (n) {
      return `
Error generating stack: ` + n.message + `
` + n.stack;
    }
  }
  var ic = Object.prototype.hasOwnProperty, cc = u.unstable_scheduleCallback, fc = u.unstable_cancelCallback, Zh = u.unstable_shouldYield, Yh = u.unstable_requestPaint, ve = u.unstable_now, Lh = u.unstable_getCurrentPriorityLevel, d0 = u.unstable_ImmediatePriority, h0 = u.unstable_UserBlockingPriority, yu = u.unstable_NormalPriority, Gh = u.unstable_LowPriority, m0 = u.unstable_IdlePriority, Vh = u.log, Xh = u.unstable_setDisableYieldValue, ca = null, ge = null;
  function yl(t) {
    if (typeof Vh == "function" && Xh(t), ge && typeof ge.setStrictMode == "function")
      try {
        ge.setStrictMode(ca, t);
      } catch {
      }
  }
  var pe = Math.clz32 ? Math.clz32 : Kh, Qh = Math.log, wh = Math.LN2;
  function Kh(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Qh(t) / wh | 0) | 0;
  }
  var vu = 256, gu = 262144, pu = 4194304;
  function Vl(t) {
    var e = t & 42;
    if (e !== 0) return e;
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
  function Su(t, e, l) {
    var n = t.pendingLanes;
    if (n === 0) return 0;
    var a = 0, i = t.suspendedLanes, r = t.pingedLanes;
    t = t.warmLanes;
    var s = n & 134217727;
    return s !== 0 ? (n = s & ~i, n !== 0 ? a = Vl(n) : (r &= s, r !== 0 ? a = Vl(r) : l || (l = s & ~t, l !== 0 && (a = Vl(l))))) : (s = n & ~i, s !== 0 ? a = Vl(s) : r !== 0 ? a = Vl(r) : l || (l = n & ~t, l !== 0 && (a = Vl(l)))), a === 0 ? 0 : e !== 0 && e !== a && (e & i) === 0 && (i = a & -a, l = e & -e, i >= l || i === 32 && (l & 4194048) !== 0) ? e : a;
  }
  function fa(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Jh(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
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
        return e + 5e3;
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
  function y0() {
    var t = pu;
    return pu <<= 1, (pu & 62914560) === 0 && (pu = 4194304), t;
  }
  function rc(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function ra(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function $h(t, e, l, n, a, i) {
    var r = t.pendingLanes;
    t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
    var s = t.entanglements, b = t.expirationTimes, O = t.hiddenUpdates;
    for (l = r & ~l; 0 < l; ) {
      var R = 31 - pe(l), Z = 1 << R;
      s[R] = 0, b[R] = -1;
      var D = O[R];
      if (D !== null)
        for (O[R] = null, R = 0; R < D.length; R++) {
          var j = D[R];
          j !== null && (j.lane &= -536870913);
        }
      l &= ~Z;
    }
    n !== 0 && v0(t, n, 0), i !== 0 && a === 0 && t.tag !== 0 && (t.suspendedLanes |= i & ~(r & ~e));
  }
  function v0(t, e, l) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var n = 31 - pe(e);
    t.entangledLanes |= e, t.entanglements[n] = t.entanglements[n] | 1073741824 | l & 261930;
  }
  function g0(t, e) {
    var l = t.entangledLanes |= e;
    for (t = t.entanglements; l; ) {
      var n = 31 - pe(l), a = 1 << n;
      a & e | t[n] & e && (t[n] |= e), l &= ~a;
    }
  }
  function p0(t, e) {
    var l = e & -e;
    return l = (l & 42) !== 0 ? 1 : oc(l), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l;
  }
  function oc(t) {
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
  function sc(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function S0() {
    var t = G.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : ud(t.type));
  }
  function b0(t, e) {
    var l = G.p;
    try {
      return G.p = t, e();
    } finally {
      G.p = l;
    }
  }
  var vl = Math.random().toString(36).slice(2), It = "__reactFiber$" + vl, ce = "__reactProps$" + vl, hn = "__reactContainer$" + vl, dc = "__reactEvents$" + vl, Fh = "__reactListeners$" + vl, kh = "__reactHandles$" + vl, E0 = "__reactResources$" + vl, oa = "__reactMarker$" + vl;
  function hc(t) {
    delete t[It], delete t[ce], delete t[dc], delete t[Fh], delete t[kh];
  }
  function mn(t) {
    var e = t[It];
    if (e) return e;
    for (var l = t.parentNode; l; ) {
      if (e = l[hn] || l[It]) {
        if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
          for (t = X1(t); t !== null; ) {
            if (l = t[It]) return l;
            t = X1(t);
          }
        return e;
      }
      t = l, l = t.parentNode;
    }
    return null;
  }
  function yn(t) {
    if (t = t[It] || t[hn]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function sa(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(f(33));
  }
  function vn(t) {
    var e = t[E0];
    return e || (e = t[E0] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function kt(t) {
    t[oa] = !0;
  }
  var x0 = /* @__PURE__ */ new Set(), A0 = {};
  function Xl(t, e) {
    gn(t, e), gn(t + "Capture", e);
  }
  function gn(t, e) {
    for (A0[t] = e, t = 0; t < e.length; t++)
      x0.add(e[t]);
  }
  var Wh = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), M0 = {}, z0 = {};
  function Ih(t) {
    return ic.call(z0, t) ? !0 : ic.call(M0, t) ? !1 : Wh.test(t) ? z0[t] = !0 : (M0[t] = !0, !1);
  }
  function bu(t, e, l) {
    if (Ih(e))
      if (l === null) t.removeAttribute(e);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var n = e.toLowerCase().slice(0, 5);
            if (n !== "data-" && n !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, "" + l);
      }
  }
  function Eu(t, e, l) {
    if (l === null) t.removeAttribute(e);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, "" + l);
    }
  }
  function ke(t, e, l, n) {
    if (n === null) t.removeAttribute(l);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttributeNS(e, l, "" + n);
    }
  }
  function Ne(t) {
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
  function T0(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function Ph(t, e, l) {
    var n = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    );
    if (!t.hasOwnProperty(e) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var a = n.get, i = n.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return a.call(this);
        },
        set: function(r) {
          l = "" + r, i.call(this, r);
        }
      }), Object.defineProperty(t, e, {
        enumerable: n.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(r) {
          l = "" + r;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function mc(t) {
    if (!t._valueTracker) {
      var e = T0(t) ? "checked" : "value";
      t._valueTracker = Ph(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function N0(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(), n = "";
    return t && (n = T0(t) ? t.checked ? "true" : "false" : t.value), t = n, t !== l ? (e.setValue(t), !0) : !1;
  }
  function xu(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var tm = /[\n"\\]/g;
  function _e(t) {
    return t.replace(
      tm,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function yc(t, e, l, n, a, i, r, s) {
    t.name = "", r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" ? t.type = r : t.removeAttribute("type"), e != null ? r === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + Ne(e)) : t.value !== "" + Ne(e) && (t.value = "" + Ne(e)) : r !== "submit" && r !== "reset" || t.removeAttribute("value"), e != null ? vc(t, r, Ne(e)) : l != null ? vc(t, r, Ne(l)) : n != null && t.removeAttribute("value"), a == null && i != null && (t.defaultChecked = !!i), a != null && (t.checked = a && typeof a != "function" && typeof a != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? t.name = "" + Ne(s) : t.removeAttribute("name");
  }
  function _0(t, e, l, n, a, i, r, s) {
    if (i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.type = i), e != null || l != null) {
      if (!(i !== "submit" && i !== "reset" || e != null)) {
        mc(t);
        return;
      }
      l = l != null ? "" + Ne(l) : "", e = e != null ? "" + Ne(e) : l, s || e === t.value || (t.value = e), t.defaultValue = e;
    }
    n = n ?? a, n = typeof n != "function" && typeof n != "symbol" && !!n, t.checked = s ? t.checked : !!n, t.defaultChecked = !!n, r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" && (t.name = r), mc(t);
  }
  function vc(t, e, l) {
    e === "number" && xu(t.ownerDocument) === t || t.defaultValue === "" + l || (t.defaultValue = "" + l);
  }
  function pn(t, e, l, n) {
    if (t = t.options, e) {
      e = {};
      for (var a = 0; a < l.length; a++)
        e["$" + l[a]] = !0;
      for (l = 0; l < t.length; l++)
        a = e.hasOwnProperty("$" + t[l].value), t[l].selected !== a && (t[l].selected = a), a && n && (t[l].defaultSelected = !0);
    } else {
      for (l = "" + Ne(l), e = null, a = 0; a < t.length; a++) {
        if (t[a].value === l) {
          t[a].selected = !0, n && (t[a].defaultSelected = !0);
          return;
        }
        e !== null || t[a].disabled || (e = t[a]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function O0(t, e, l) {
    if (e != null && (e = "" + Ne(e), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? "" + Ne(l) : "";
  }
  function D0(t, e, l, n) {
    if (e == null) {
      if (n != null) {
        if (l != null) throw Error(f(92));
        if (Y(n)) {
          if (1 < n.length) throw Error(f(93));
          n = n[0];
        }
        l = n;
      }
      l == null && (l = ""), e = l;
    }
    l = Ne(e), t.defaultValue = l, n = t.textContent, n === l && n !== "" && n !== null && (t.value = n), mc(t);
  }
  function Sn(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var em = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function j0(t, e, l) {
    var n = e.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? n ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : n ? t.setProperty(e, l) : typeof l != "number" || l === 0 || em.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
  }
  function H0(t, e, l) {
    if (e != null && typeof e != "object")
      throw Error(f(62));
    if (t = t.style, l != null) {
      for (var n in l)
        !l.hasOwnProperty(n) || e != null && e.hasOwnProperty(n) || (n.indexOf("--") === 0 ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "");
      for (var a in e)
        n = e[a], e.hasOwnProperty(a) && l[a] !== n && j0(t, a, n);
    } else
      for (var i in e)
        e.hasOwnProperty(i) && j0(t, i, e[i]);
  }
  function gc(t) {
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
  var lm = /* @__PURE__ */ new Map([
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
  ]), nm = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Au(t) {
    return nm.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function We() {
  }
  var pc = null;
  function Sc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var bn = null, En = null;
  function R0(t) {
    var e = yn(t);
    if (e && (t = e.stateNode)) {
      var l = t[ce] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (yc(
            t,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name
          ), e = l.name, l.type === "radio" && e != null) {
            for (l = t; l.parentNode; ) l = l.parentNode;
            for (l = l.querySelectorAll(
              'input[name="' + _e(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < l.length; e++) {
              var n = l[e];
              if (n !== t && n.form === t.form) {
                var a = n[ce] || null;
                if (!a) throw Error(f(90));
                yc(
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
            for (e = 0; e < l.length; e++)
              n = l[e], n.form === t.form && N0(n);
          }
          break t;
        case "textarea":
          O0(t, l.value, l.defaultValue);
          break t;
        case "select":
          e = l.value, e != null && pn(t, !!l.multiple, e, !1);
      }
    }
  }
  var bc = !1;
  function U0(t, e, l) {
    if (bc) return t(e, l);
    bc = !0;
    try {
      var n = t(e);
      return n;
    } finally {
      if (bc = !1, (bn !== null || En !== null) && (oi(), bn && (e = bn, t = En, En = bn = null, R0(e), t)))
        for (e = 0; e < t.length; e++) R0(t[e]);
    }
  }
  function da(t, e) {
    var l = t.stateNode;
    if (l === null) return null;
    var n = l[ce] || null;
    if (n === null) return null;
    l = n[e];
    t: switch (e) {
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
    if (l && typeof l != "function")
      throw Error(
        f(231, e, typeof l)
      );
    return l;
  }
  var Ie = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ec = !1;
  if (Ie)
    try {
      var ha = {};
      Object.defineProperty(ha, "passive", {
        get: function() {
          Ec = !0;
        }
      }), window.addEventListener("test", ha, ha), window.removeEventListener("test", ha, ha);
    } catch {
      Ec = !1;
    }
  var gl = null, xc = null, Mu = null;
  function C0() {
    if (Mu) return Mu;
    var t, e = xc, l = e.length, n, a = "value" in gl ? gl.value : gl.textContent, i = a.length;
    for (t = 0; t < l && e[t] === a[t]; t++) ;
    var r = l - t;
    for (n = 1; n <= r && e[l - n] === a[i - n]; n++) ;
    return Mu = a.slice(t, 1 < n ? 1 - n : void 0);
  }
  function zu(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Tu() {
    return !0;
  }
  function q0() {
    return !1;
  }
  function fe(t) {
    function e(l, n, a, i, r) {
      this._reactName = l, this._targetInst = a, this.type = n, this.nativeEvent = i, this.target = r, this.currentTarget = null;
      for (var s in t)
        t.hasOwnProperty(s) && (l = t[s], this[s] = l ? l(i) : i[s]);
      return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Tu : q0, this.isPropagationStopped = q0, this;
    }
    return S(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Tu);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Tu);
      },
      persist: function() {
      },
      isPersistent: Tu
    }), e;
  }
  var Ql = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Nu = fe(Ql), ma = S({}, Ql, { view: 0, detail: 0 }), am = fe(ma), Ac, Mc, ya, _u = S({}, ma, {
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
    getModifierState: Tc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== ya && (ya && t.type === "mousemove" ? (Ac = t.screenX - ya.screenX, Mc = t.screenY - ya.screenY) : Mc = Ac = 0, ya = t), Ac);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Mc;
    }
  }), B0 = fe(_u), um = S({}, _u, { dataTransfer: 0 }), im = fe(um), cm = S({}, ma, { relatedTarget: 0 }), zc = fe(cm), fm = S({}, Ql, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), rm = fe(fm), om = S({}, Ql, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), sm = fe(om), dm = S({}, Ql, { data: 0 }), Z0 = fe(dm), hm = {
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
  }, mm = {
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
  }, ym = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function vm(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = ym[t]) ? !!e[t] : !1;
  }
  function Tc() {
    return vm;
  }
  var gm = S({}, ma, {
    key: function(t) {
      if (t.key) {
        var e = hm[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = zu(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? mm[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Tc,
    charCode: function(t) {
      return t.type === "keypress" ? zu(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? zu(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), pm = fe(gm), Sm = S({}, _u, {
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
  }), Y0 = fe(Sm), bm = S({}, ma, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Tc
  }), Em = fe(bm), xm = S({}, Ql, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Am = fe(xm), Mm = S({}, _u, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), zm = fe(Mm), Tm = S({}, Ql, {
    newState: 0,
    oldState: 0
  }), Nm = fe(Tm), _m = [9, 13, 27, 32], Nc = Ie && "CompositionEvent" in window, va = null;
  Ie && "documentMode" in document && (va = document.documentMode);
  var Om = Ie && "TextEvent" in window && !va, L0 = Ie && (!Nc || va && 8 < va && 11 >= va), G0 = " ", V0 = !1;
  function X0(t, e) {
    switch (t) {
      case "keyup":
        return _m.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Q0(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var xn = !1;
  function Dm(t, e) {
    switch (t) {
      case "compositionend":
        return Q0(e);
      case "keypress":
        return e.which !== 32 ? null : (V0 = !0, G0);
      case "textInput":
        return t = e.data, t === G0 && V0 ? null : t;
      default:
        return null;
    }
  }
  function jm(t, e) {
    if (xn)
      return t === "compositionend" || !Nc && X0(t, e) ? (t = C0(), Mu = xc = gl = null, xn = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
          if (e.char && 1 < e.char.length)
            return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return L0 && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var Hm = {
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
  function w0(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!Hm[t.type] : e === "textarea";
  }
  function K0(t, e, l, n) {
    bn ? En ? En.push(n) : En = [n] : bn = n, e = gi(e, "onChange"), 0 < e.length && (l = new Nu(
      "onChange",
      "change",
      null,
      l,
      n
    ), t.push({ event: l, listeners: e }));
  }
  var ga = null, pa = null;
  function Rm(t) {
    O1(t, 0);
  }
  function Ou(t) {
    var e = sa(t);
    if (N0(e)) return t;
  }
  function J0(t, e) {
    if (t === "change") return e;
  }
  var $0 = !1;
  if (Ie) {
    var _c;
    if (Ie) {
      var Oc = "oninput" in document;
      if (!Oc) {
        var F0 = document.createElement("div");
        F0.setAttribute("oninput", "return;"), Oc = typeof F0.oninput == "function";
      }
      _c = Oc;
    } else _c = !1;
    $0 = _c && (!document.documentMode || 9 < document.documentMode);
  }
  function k0() {
    ga && (ga.detachEvent("onpropertychange", W0), pa = ga = null);
  }
  function W0(t) {
    if (t.propertyName === "value" && Ou(pa)) {
      var e = [];
      K0(
        e,
        pa,
        t,
        Sc(t)
      ), U0(Rm, e);
    }
  }
  function Um(t, e, l) {
    t === "focusin" ? (k0(), ga = e, pa = l, ga.attachEvent("onpropertychange", W0)) : t === "focusout" && k0();
  }
  function Cm(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Ou(pa);
  }
  function qm(t, e) {
    if (t === "click") return Ou(e);
  }
  function Bm(t, e) {
    if (t === "input" || t === "change")
      return Ou(e);
  }
  function Zm(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var Se = typeof Object.is == "function" ? Object.is : Zm;
  function Sa(t, e) {
    if (Se(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var l = Object.keys(t), n = Object.keys(e);
    if (l.length !== n.length) return !1;
    for (n = 0; n < l.length; n++) {
      var a = l[n];
      if (!ic.call(e, a) || !Se(t[a], e[a]))
        return !1;
    }
    return !0;
  }
  function I0(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function P0(t, e) {
    var l = I0(t);
    t = 0;
    for (var n; l; ) {
      if (l.nodeType === 3) {
        if (n = t + l.textContent.length, t <= e && n >= e)
          return { node: l, offset: e - t };
        t = n;
      }
      t: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break t;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = I0(l);
    }
  }
  function to(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? to(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function eo(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = xu(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = xu(t.document);
    }
    return e;
  }
  function Dc(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var Ym = Ie && "documentMode" in document && 11 >= document.documentMode, An = null, jc = null, ba = null, Hc = !1;
  function lo(t, e, l) {
    var n = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Hc || An == null || An !== xu(n) || (n = An, "selectionStart" in n && Dc(n) ? n = { start: n.selectionStart, end: n.selectionEnd } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
      anchorNode: n.anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    }), ba && Sa(ba, n) || (ba = n, n = gi(jc, "onSelect"), 0 < n.length && (e = new Nu(
      "onSelect",
      "select",
      null,
      e,
      l
    ), t.push({ event: e, listeners: n }), e.target = An)));
  }
  function wl(t, e) {
    var l = {};
    return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
  }
  var Mn = {
    animationend: wl("Animation", "AnimationEnd"),
    animationiteration: wl("Animation", "AnimationIteration"),
    animationstart: wl("Animation", "AnimationStart"),
    transitionrun: wl("Transition", "TransitionRun"),
    transitionstart: wl("Transition", "TransitionStart"),
    transitioncancel: wl("Transition", "TransitionCancel"),
    transitionend: wl("Transition", "TransitionEnd")
  }, Rc = {}, no = {};
  Ie && (no = document.createElement("div").style, "AnimationEvent" in window || (delete Mn.animationend.animation, delete Mn.animationiteration.animation, delete Mn.animationstart.animation), "TransitionEvent" in window || delete Mn.transitionend.transition);
  function Kl(t) {
    if (Rc[t]) return Rc[t];
    if (!Mn[t]) return t;
    var e = Mn[t], l;
    for (l in e)
      if (e.hasOwnProperty(l) && l in no)
        return Rc[t] = e[l];
    return t;
  }
  var ao = Kl("animationend"), uo = Kl("animationiteration"), io = Kl("animationstart"), Lm = Kl("transitionrun"), Gm = Kl("transitionstart"), Vm = Kl("transitioncancel"), co = Kl("transitionend"), fo = /* @__PURE__ */ new Map(), Uc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Uc.push("scrollEnd");
  function Ye(t, e) {
    fo.set(t, e), Xl(e, [t]);
  }
  var Du = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Oe = [], zn = 0, Cc = 0;
  function ju() {
    for (var t = zn, e = Cc = zn = 0; e < t; ) {
      var l = Oe[e];
      Oe[e++] = null;
      var n = Oe[e];
      Oe[e++] = null;
      var a = Oe[e];
      Oe[e++] = null;
      var i = Oe[e];
      if (Oe[e++] = null, n !== null && a !== null) {
        var r = n.pending;
        r === null ? a.next = a : (a.next = r.next, r.next = a), n.pending = a;
      }
      i !== 0 && ro(l, a, i);
    }
  }
  function Hu(t, e, l, n) {
    Oe[zn++] = t, Oe[zn++] = e, Oe[zn++] = l, Oe[zn++] = n, Cc |= n, t.lanes |= n, t = t.alternate, t !== null && (t.lanes |= n);
  }
  function qc(t, e, l, n) {
    return Hu(t, e, l, n), Ru(t);
  }
  function Jl(t, e) {
    return Hu(t, null, null, e), Ru(t);
  }
  function ro(t, e, l) {
    t.lanes |= l;
    var n = t.alternate;
    n !== null && (n.lanes |= l);
    for (var a = !1, i = t.return; i !== null; )
      i.childLanes |= l, n = i.alternate, n !== null && (n.childLanes |= l), i.tag === 22 && (t = i.stateNode, t === null || t._visibility & 1 || (a = !0)), t = i, i = i.return;
    return t.tag === 3 ? (i = t.stateNode, a && e !== null && (a = 31 - pe(l), t = i.hiddenUpdates, n = t[a], n === null ? t[a] = [e] : n.push(e), e.lane = l | 536870912), i) : null;
  }
  function Ru(t) {
    if (50 < Va)
      throw Va = 0, Kf = null, Error(f(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Tn = {};
  function Xm(t, e, l, n) {
    this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function be(t, e, l, n) {
    return new Xm(t, e, l, n);
  }
  function Bc(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Pe(t, e) {
    var l = t.alternate;
    return l === null ? (l = be(
      t.tag,
      e,
      t.key,
      t.mode
    ), l.elementType = t.elementType, l.type = t.type, l.stateNode = t.stateNode, l.alternate = t, t.alternate = l) : (l.pendingProps = e, l.type = t.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = t.flags & 65011712, l.childLanes = t.childLanes, l.lanes = t.lanes, l.child = t.child, l.memoizedProps = t.memoizedProps, l.memoizedState = t.memoizedState, l.updateQueue = t.updateQueue, e = t.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, l.sibling = t.sibling, l.index = t.index, l.ref = t.ref, l.refCleanup = t.refCleanup, l;
  }
  function oo(t, e) {
    t.flags &= 65011714;
    var l = t.alternate;
    return l === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, t.type = l.type, e = l.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function Uu(t, e, l, n, a, i) {
    var r = 0;
    if (n = t, typeof t == "function") Bc(t) && (r = 1);
    else if (typeof t == "string")
      r = $2(
        t,
        l,
        $.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case ft:
          return t = be(31, l, e, a), t.elementType = ft, t.lanes = i, t;
        case C:
          return $l(l.children, a, i, e);
        case L:
          r = 8, a |= 24;
          break;
        case V:
          return t = be(12, l, e, a | 2), t.elementType = V, t.lanes = i, t;
        case lt:
          return t = be(13, l, e, a), t.elementType = lt, t.lanes = i, t;
        case F:
          return t = be(19, l, e, a), t.elementType = F, t.lanes = i, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case K:
                r = 10;
                break t;
              case Q:
                r = 9;
                break t;
              case w:
                r = 11;
                break t;
              case k:
                r = 14;
                break t;
              case it:
                r = 16, n = null;
                break t;
            }
          r = 29, l = Error(
            f(130, t === null ? "null" : typeof t, "")
          ), n = null;
      }
    return e = be(r, l, e, a), e.elementType = t, e.type = n, e.lanes = i, e;
  }
  function $l(t, e, l, n) {
    return t = be(7, t, n, e), t.lanes = l, t;
  }
  function Zc(t, e, l) {
    return t = be(6, t, null, e), t.lanes = l, t;
  }
  function so(t) {
    var e = be(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function Yc(t, e, l) {
    return e = be(
      4,
      t.children !== null ? t.children : [],
      t.key,
      e
    ), e.lanes = l, e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, e;
  }
  var ho = /* @__PURE__ */ new WeakMap();
  function De(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = ho.get(t);
      return l !== void 0 ? l : (e = {
        value: t,
        source: e,
        stack: s0(e)
      }, ho.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: s0(e)
    };
  }
  var Nn = [], _n = 0, Cu = null, Ea = 0, je = [], He = 0, pl = null, Xe = 1, Qe = "";
  function tl(t, e) {
    Nn[_n++] = Ea, Nn[_n++] = Cu, Cu = t, Ea = e;
  }
  function mo(t, e, l) {
    je[He++] = Xe, je[He++] = Qe, je[He++] = pl, pl = t;
    var n = Xe;
    t = Qe;
    var a = 32 - pe(n) - 1;
    n &= ~(1 << a), l += 1;
    var i = 32 - pe(e) + a;
    if (30 < i) {
      var r = a - a % 5;
      i = (n & (1 << r) - 1).toString(32), n >>= r, a -= r, Xe = 1 << 32 - pe(e) + a | l << a | n, Qe = i + t;
    } else
      Xe = 1 << i | l << a | n, Qe = t;
  }
  function Lc(t) {
    t.return !== null && (tl(t, 1), mo(t, 1, 0));
  }
  function Gc(t) {
    for (; t === Cu; )
      Cu = Nn[--_n], Nn[_n] = null, Ea = Nn[--_n], Nn[_n] = null;
    for (; t === pl; )
      pl = je[--He], je[He] = null, Qe = je[--He], je[He] = null, Xe = je[--He], je[He] = null;
  }
  function yo(t, e) {
    je[He++] = Xe, je[He++] = Qe, je[He++] = pl, Xe = e.id, Qe = e.overflow, pl = t;
  }
  var Pt = null, Rt = null, St = !1, Sl = null, Re = !1, Vc = Error(f(519));
  function bl(t) {
    var e = Error(
      f(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw xa(De(e, t)), Vc;
  }
  function vo(t) {
    var e = t.stateNode, l = t.type, n = t.memoizedProps;
    switch (e[It] = t, e[ce] = n, l) {
      case "dialog":
        vt("cancel", e), vt("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        vt("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Qa.length; l++)
          vt(Qa[l], e);
        break;
      case "source":
        vt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        vt("error", e), vt("load", e);
        break;
      case "details":
        vt("toggle", e);
        break;
      case "input":
        vt("invalid", e), _0(
          e,
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
        vt("invalid", e);
        break;
      case "textarea":
        vt("invalid", e), D0(e, n.value, n.defaultValue, n.children);
    }
    l = n.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || n.suppressHydrationWarning === !0 || R1(e.textContent, l) ? (n.popover != null && (vt("beforetoggle", e), vt("toggle", e)), n.onScroll != null && vt("scroll", e), n.onScrollEnd != null && vt("scrollend", e), n.onClick != null && (e.onclick = We), e = !0) : e = !1, e || bl(t, !0);
  }
  function go(t) {
    for (Pt = t.return; Pt; )
      switch (Pt.tag) {
        case 5:
        case 31:
        case 13:
          Re = !1;
          return;
        case 27:
        case 3:
          Re = !0;
          return;
        default:
          Pt = Pt.return;
      }
  }
  function On(t) {
    if (t !== Pt) return !1;
    if (!St) return go(t), St = !0, !1;
    var e = t.tag, l;
    if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || cr(t.type, t.memoizedProps)), l = !l), l && Rt && bl(t), go(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(f(317));
      Rt = V1(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(f(317));
      Rt = V1(t);
    } else
      e === 27 ? (e = Rt, Ul(t.type) ? (t = dr, dr = null, Rt = t) : Rt = e) : Rt = Pt ? Ce(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Fl() {
    Rt = Pt = null, St = !1;
  }
  function Xc() {
    var t = Sl;
    return t !== null && (de === null ? de = t : de.push.apply(
      de,
      t
    ), Sl = null), t;
  }
  function xa(t) {
    Sl === null ? Sl = [t] : Sl.push(t);
  }
  var Qc = E(null), kl = null, el = null;
  function El(t, e, l) {
    X(Qc, e._currentValue), e._currentValue = l;
  }
  function ll(t) {
    t._currentValue = Qc.current, q(Qc);
  }
  function wc(t, e, l) {
    for (; t !== null; ) {
      var n = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, n !== null && (n.childLanes |= e)) : n !== null && (n.childLanes & e) !== e && (n.childLanes |= e), t === l) break;
      t = t.return;
    }
  }
  function Kc(t, e, l, n) {
    var a = t.child;
    for (a !== null && (a.return = t); a !== null; ) {
      var i = a.dependencies;
      if (i !== null) {
        var r = a.child;
        i = i.firstContext;
        t: for (; i !== null; ) {
          var s = i;
          i = a;
          for (var b = 0; b < e.length; b++)
            if (s.context === e[b]) {
              i.lanes |= l, s = i.alternate, s !== null && (s.lanes |= l), wc(
                i.return,
                l,
                t
              ), n || (r = null);
              break t;
            }
          i = s.next;
        }
      } else if (a.tag === 18) {
        if (r = a.return, r === null) throw Error(f(341));
        r.lanes |= l, i = r.alternate, i !== null && (i.lanes |= l), wc(r, l, t), r = null;
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
  function Dn(t, e, l, n) {
    t = null;
    for (var a = e, i = !1; a !== null; ) {
      if (!i) {
        if ((a.flags & 524288) !== 0) i = !0;
        else if ((a.flags & 262144) !== 0) break;
      }
      if (a.tag === 10) {
        var r = a.alternate;
        if (r === null) throw Error(f(387));
        if (r = r.memoizedProps, r !== null) {
          var s = a.type;
          Se(a.pendingProps.value, r.value) || (t !== null ? t.push(s) : t = [s]);
        }
      } else if (a === zt.current) {
        if (r = a.alternate, r === null) throw Error(f(387));
        r.memoizedState.memoizedState !== a.memoizedState.memoizedState && (t !== null ? t.push(Fa) : t = [Fa]);
      }
      a = a.return;
    }
    t !== null && Kc(
      e,
      t,
      l,
      n
    ), e.flags |= 262144;
  }
  function qu(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Se(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Wl(t) {
    kl = t, el = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function te(t) {
    return po(kl, t);
  }
  function Bu(t, e) {
    return kl === null && Wl(t), po(t, e);
  }
  function po(t, e) {
    var l = e._currentValue;
    if (e = { context: e, memoizedValue: l, next: null }, el === null) {
      if (t === null) throw Error(f(308));
      el = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else el = el.next = e;
    return l;
  }
  var Qm = typeof AbortController < "u" ? AbortController : function() {
    var t = [], e = this.signal = {
      aborted: !1,
      addEventListener: function(l, n) {
        t.push(n);
      }
    };
    this.abort = function() {
      e.aborted = !0, t.forEach(function(l) {
        return l();
      });
    };
  }, wm = u.unstable_scheduleCallback, Km = u.unstable_NormalPriority, wt = {
    $$typeof: K,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Jc() {
    return {
      controller: new Qm(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Aa(t) {
    t.refCount--, t.refCount === 0 && wm(Km, function() {
      t.controller.abort();
    });
  }
  var Ma = null, $c = 0, jn = 0, Hn = null;
  function Jm(t, e) {
    if (Ma === null) {
      var l = Ma = [];
      $c = 0, jn = If(), Hn = {
        status: "pending",
        value: void 0,
        then: function(n) {
          l.push(n);
        }
      };
    }
    return $c++, e.then(So, So), e;
  }
  function So() {
    if (--$c === 0 && Ma !== null) {
      Hn !== null && (Hn.status = "fulfilled");
      var t = Ma;
      Ma = null, jn = 0, Hn = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function $m(t, e) {
    var l = [], n = {
      status: "pending",
      value: null,
      reason: null,
      then: function(a) {
        l.push(a);
      }
    };
    return t.then(
      function() {
        n.status = "fulfilled", n.value = e;
        for (var a = 0; a < l.length; a++) (0, l[a])(e);
      },
      function(a) {
        for (n.status = "rejected", n.reason = a, a = 0; a < l.length; a++)
          (0, l[a])(void 0);
      }
    ), n;
  }
  var bo = T.S;
  T.S = function(t, e) {
    n1 = ve(), typeof e == "object" && e !== null && typeof e.then == "function" && Jm(t, e), bo !== null && bo(t, e);
  };
  var Il = E(null);
  function Fc() {
    var t = Il.current;
    return t !== null ? t : jt.pooledCache;
  }
  function Zu(t, e) {
    e === null ? X(Il, Il.current) : X(Il, e.pool);
  }
  function Eo() {
    var t = Fc();
    return t === null ? null : { parent: wt._currentValue, pool: t };
  }
  var Rn = Error(f(460)), kc = Error(f(474)), Yu = Error(f(542)), Lu = { then: function() {
  } };
  function xo(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Ao(t, e, l) {
    switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then(We, We), e = l), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, zo(t), t;
      default:
        if (typeof e.status == "string") e.then(We, We);
        else {
          if (t = jt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(f(482));
          t = e, t.status = "pending", t.then(
            function(n) {
              if (e.status === "pending") {
                var a = e;
                a.status = "fulfilled", a.value = n;
              }
            },
            function(n) {
              if (e.status === "pending") {
                var a = e;
                a.status = "rejected", a.reason = n;
              }
            }
          );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw t = e.reason, zo(t), t;
        }
        throw tn = e, Rn;
    }
  }
  function Pl(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (tn = l, Rn) : l;
    }
  }
  var tn = null;
  function Mo() {
    if (tn === null) throw Error(f(459));
    var t = tn;
    return tn = null, t;
  }
  function zo(t) {
    if (t === Rn || t === Yu)
      throw Error(f(483));
  }
  var Un = null, za = 0;
  function Gu(t) {
    var e = za;
    return za += 1, Un === null && (Un = []), Ao(Un, t, e);
  }
  function Ta(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Vu(t, e) {
    throw e.$$typeof === M ? Error(f(525)) : (t = Object.prototype.toString.call(e), Error(
      f(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function To(t) {
    function e(z, x) {
      if (t) {
        var N = z.deletions;
        N === null ? (z.deletions = [x], z.flags |= 16) : N.push(x);
      }
    }
    function l(z, x) {
      if (!t) return null;
      for (; x !== null; )
        e(z, x), x = x.sibling;
      return null;
    }
    function n(z) {
      for (var x = /* @__PURE__ */ new Map(); z !== null; )
        z.key !== null ? x.set(z.key, z) : x.set(z.index, z), z = z.sibling;
      return x;
    }
    function a(z, x) {
      return z = Pe(z, x), z.index = 0, z.sibling = null, z;
    }
    function i(z, x, N) {
      return z.index = N, t ? (N = z.alternate, N !== null ? (N = N.index, N < x ? (z.flags |= 67108866, x) : N) : (z.flags |= 67108866, x)) : (z.flags |= 1048576, x);
    }
    function r(z) {
      return t && z.alternate === null && (z.flags |= 67108866), z;
    }
    function s(z, x, N, B) {
      return x === null || x.tag !== 6 ? (x = Zc(N, z.mode, B), x.return = z, x) : (x = a(x, N), x.return = z, x);
    }
    function b(z, x, N, B) {
      var et = N.type;
      return et === C ? R(
        z,
        x,
        N.props.children,
        B,
        N.key
      ) : x !== null && (x.elementType === et || typeof et == "object" && et !== null && et.$$typeof === it && Pl(et) === x.type) ? (x = a(x, N.props), Ta(x, N), x.return = z, x) : (x = Uu(
        N.type,
        N.key,
        N.props,
        null,
        z.mode,
        B
      ), Ta(x, N), x.return = z, x);
    }
    function O(z, x, N, B) {
      return x === null || x.tag !== 4 || x.stateNode.containerInfo !== N.containerInfo || x.stateNode.implementation !== N.implementation ? (x = Yc(N, z.mode, B), x.return = z, x) : (x = a(x, N.children || []), x.return = z, x);
    }
    function R(z, x, N, B, et) {
      return x === null || x.tag !== 7 ? (x = $l(
        N,
        z.mode,
        B,
        et
      ), x.return = z, x) : (x = a(x, N), x.return = z, x);
    }
    function Z(z, x, N) {
      if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint")
        return x = Zc(
          "" + x,
          z.mode,
          N
        ), x.return = z, x;
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case H:
            return N = Uu(
              x.type,
              x.key,
              x.props,
              null,
              z.mode,
              N
            ), Ta(N, x), N.return = z, N;
          case U:
            return x = Yc(
              x,
              z.mode,
              N
            ), x.return = z, x;
          case it:
            return x = Pl(x), Z(z, x, N);
        }
        if (Y(x) || I(x))
          return x = $l(
            x,
            z.mode,
            N,
            null
          ), x.return = z, x;
        if (typeof x.then == "function")
          return Z(z, Gu(x), N);
        if (x.$$typeof === K)
          return Z(
            z,
            Bu(z, x),
            N
          );
        Vu(z, x);
      }
      return null;
    }
    function D(z, x, N, B) {
      var et = x !== null ? x.key : null;
      if (typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint")
        return et !== null ? null : s(z, x, "" + N, B);
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case H:
            return N.key === et ? b(z, x, N, B) : null;
          case U:
            return N.key === et ? O(z, x, N, B) : null;
          case it:
            return N = Pl(N), D(z, x, N, B);
        }
        if (Y(N) || I(N))
          return et !== null ? null : R(z, x, N, B, null);
        if (typeof N.then == "function")
          return D(
            z,
            x,
            Gu(N),
            B
          );
        if (N.$$typeof === K)
          return D(
            z,
            x,
            Bu(z, N),
            B
          );
        Vu(z, N);
      }
      return null;
    }
    function j(z, x, N, B, et) {
      if (typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint")
        return z = z.get(N) || null, s(x, z, "" + B, et);
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case H:
            return z = z.get(
              B.key === null ? N : B.key
            ) || null, b(x, z, B, et);
          case U:
            return z = z.get(
              B.key === null ? N : B.key
            ) || null, O(x, z, B, et);
          case it:
            return B = Pl(B), j(
              z,
              x,
              N,
              B,
              et
            );
        }
        if (Y(B) || I(B))
          return z = z.get(N) || null, R(x, z, B, et, null);
        if (typeof B.then == "function")
          return j(
            z,
            x,
            N,
            Gu(B),
            et
          );
        if (B.$$typeof === K)
          return j(
            z,
            x,
            N,
            Bu(x, B),
            et
          );
        Vu(x, B);
      }
      return null;
    }
    function W(z, x, N, B) {
      for (var et = null, xt = null, P = x, dt = x = 0, pt = null; P !== null && dt < N.length; dt++) {
        P.index > dt ? (pt = P, P = null) : pt = P.sibling;
        var At = D(
          z,
          P,
          N[dt],
          B
        );
        if (At === null) {
          P === null && (P = pt);
          break;
        }
        t && P && At.alternate === null && e(z, P), x = i(At, x, dt), xt === null ? et = At : xt.sibling = At, xt = At, P = pt;
      }
      if (dt === N.length)
        return l(z, P), St && tl(z, dt), et;
      if (P === null) {
        for (; dt < N.length; dt++)
          P = Z(z, N[dt], B), P !== null && (x = i(
            P,
            x,
            dt
          ), xt === null ? et = P : xt.sibling = P, xt = P);
        return St && tl(z, dt), et;
      }
      for (P = n(P); dt < N.length; dt++)
        pt = j(
          P,
          z,
          dt,
          N[dt],
          B
        ), pt !== null && (t && pt.alternate !== null && P.delete(
          pt.key === null ? dt : pt.key
        ), x = i(
          pt,
          x,
          dt
        ), xt === null ? et = pt : xt.sibling = pt, xt = pt);
      return t && P.forEach(function(Yl) {
        return e(z, Yl);
      }), St && tl(z, dt), et;
    }
    function nt(z, x, N, B) {
      if (N == null) throw Error(f(151));
      for (var et = null, xt = null, P = x, dt = x = 0, pt = null, At = N.next(); P !== null && !At.done; dt++, At = N.next()) {
        P.index > dt ? (pt = P, P = null) : pt = P.sibling;
        var Yl = D(z, P, At.value, B);
        if (Yl === null) {
          P === null && (P = pt);
          break;
        }
        t && P && Yl.alternate === null && e(z, P), x = i(Yl, x, dt), xt === null ? et = Yl : xt.sibling = Yl, xt = Yl, P = pt;
      }
      if (At.done)
        return l(z, P), St && tl(z, dt), et;
      if (P === null) {
        for (; !At.done; dt++, At = N.next())
          At = Z(z, At.value, B), At !== null && (x = i(At, x, dt), xt === null ? et = At : xt.sibling = At, xt = At);
        return St && tl(z, dt), et;
      }
      for (P = n(P); !At.done; dt++, At = N.next())
        At = j(P, z, dt, At.value, B), At !== null && (t && At.alternate !== null && P.delete(At.key === null ? dt : At.key), x = i(At, x, dt), xt === null ? et = At : xt.sibling = At, xt = At);
      return t && P.forEach(function(uy) {
        return e(z, uy);
      }), St && tl(z, dt), et;
    }
    function Dt(z, x, N, B) {
      if (typeof N == "object" && N !== null && N.type === C && N.key === null && (N = N.props.children), typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case H:
            t: {
              for (var et = N.key; x !== null; ) {
                if (x.key === et) {
                  if (et = N.type, et === C) {
                    if (x.tag === 7) {
                      l(
                        z,
                        x.sibling
                      ), B = a(
                        x,
                        N.props.children
                      ), B.return = z, z = B;
                      break t;
                    }
                  } else if (x.elementType === et || typeof et == "object" && et !== null && et.$$typeof === it && Pl(et) === x.type) {
                    l(
                      z,
                      x.sibling
                    ), B = a(x, N.props), Ta(B, N), B.return = z, z = B;
                    break t;
                  }
                  l(z, x);
                  break;
                } else e(z, x);
                x = x.sibling;
              }
              N.type === C ? (B = $l(
                N.props.children,
                z.mode,
                B,
                N.key
              ), B.return = z, z = B) : (B = Uu(
                N.type,
                N.key,
                N.props,
                null,
                z.mode,
                B
              ), Ta(B, N), B.return = z, z = B);
            }
            return r(z);
          case U:
            t: {
              for (et = N.key; x !== null; ) {
                if (x.key === et)
                  if (x.tag === 4 && x.stateNode.containerInfo === N.containerInfo && x.stateNode.implementation === N.implementation) {
                    l(
                      z,
                      x.sibling
                    ), B = a(x, N.children || []), B.return = z, z = B;
                    break t;
                  } else {
                    l(z, x);
                    break;
                  }
                else e(z, x);
                x = x.sibling;
              }
              B = Yc(N, z.mode, B), B.return = z, z = B;
            }
            return r(z);
          case it:
            return N = Pl(N), Dt(
              z,
              x,
              N,
              B
            );
        }
        if (Y(N))
          return W(
            z,
            x,
            N,
            B
          );
        if (I(N)) {
          if (et = I(N), typeof et != "function") throw Error(f(150));
          return N = et.call(N), nt(
            z,
            x,
            N,
            B
          );
        }
        if (typeof N.then == "function")
          return Dt(
            z,
            x,
            Gu(N),
            B
          );
        if (N.$$typeof === K)
          return Dt(
            z,
            x,
            Bu(z, N),
            B
          );
        Vu(z, N);
      }
      return typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint" ? (N = "" + N, x !== null && x.tag === 6 ? (l(z, x.sibling), B = a(x, N), B.return = z, z = B) : (l(z, x), B = Zc(N, z.mode, B), B.return = z, z = B), r(z)) : l(z, x);
    }
    return function(z, x, N, B) {
      try {
        za = 0;
        var et = Dt(
          z,
          x,
          N,
          B
        );
        return Un = null, et;
      } catch (P) {
        if (P === Rn || P === Yu) throw P;
        var xt = be(29, P, null, z.mode);
        return xt.lanes = B, xt.return = z, xt;
      } finally {
      }
    };
  }
  var en = To(!0), No = To(!1), xl = !1;
  function Wc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Ic(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Al(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Ml(t, e, l) {
    var n = t.updateQueue;
    if (n === null) return null;
    if (n = n.shared, (Mt & 2) !== 0) {
      var a = n.pending;
      return a === null ? e.next = e : (e.next = a.next, a.next = e), n.pending = e, e = Ru(t), ro(t, null, l), e;
    }
    return Hu(t, n, e, l), Ru(t);
  }
  function Na(t, e, l) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
      var n = e.lanes;
      n &= t.pendingLanes, l |= n, e.lanes = l, g0(t, l);
    }
  }
  function Pc(t, e) {
    var l = t.updateQueue, n = t.alternate;
    if (n !== null && (n = n.updateQueue, l === n)) {
      var a = null, i = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var r = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          i === null ? a = i = r : i = i.next = r, l = l.next;
        } while (l !== null);
        i === null ? a = i = e : i = i.next = e;
      } else a = i = e;
      l = {
        baseState: n.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: i,
        shared: n.shared,
        callbacks: n.callbacks
      }, t.updateQueue = l;
      return;
    }
    t = l.lastBaseUpdate, t === null ? l.firstBaseUpdate = e : t.next = e, l.lastBaseUpdate = e;
  }
  var tf = !1;
  function _a() {
    if (tf) {
      var t = Hn;
      if (t !== null) throw t;
    }
  }
  function Oa(t, e, l, n) {
    tf = !1;
    var a = t.updateQueue;
    xl = !1;
    var i = a.firstBaseUpdate, r = a.lastBaseUpdate, s = a.shared.pending;
    if (s !== null) {
      a.shared.pending = null;
      var b = s, O = b.next;
      b.next = null, r === null ? i = O : r.next = O, r = b;
      var R = t.alternate;
      R !== null && (R = R.updateQueue, s = R.lastBaseUpdate, s !== r && (s === null ? R.firstBaseUpdate = O : s.next = O, R.lastBaseUpdate = b));
    }
    if (i !== null) {
      var Z = a.baseState;
      r = 0, R = O = b = null, s = i;
      do {
        var D = s.lane & -536870913, j = D !== s.lane;
        if (j ? (gt & D) === D : (n & D) === D) {
          D !== 0 && D === jn && (tf = !0), R !== null && (R = R.next = {
            lane: 0,
            tag: s.tag,
            payload: s.payload,
            callback: null,
            next: null
          });
          t: {
            var W = t, nt = s;
            D = e;
            var Dt = l;
            switch (nt.tag) {
              case 1:
                if (W = nt.payload, typeof W == "function") {
                  Z = W.call(Dt, Z, D);
                  break t;
                }
                Z = W;
                break t;
              case 3:
                W.flags = W.flags & -65537 | 128;
              case 0:
                if (W = nt.payload, D = typeof W == "function" ? W.call(Dt, Z, D) : W, D == null) break t;
                Z = S({}, Z, D);
                break t;
              case 2:
                xl = !0;
            }
          }
          D = s.callback, D !== null && (t.flags |= 64, j && (t.flags |= 8192), j = a.callbacks, j === null ? a.callbacks = [D] : j.push(D));
        } else
          j = {
            lane: D,
            tag: s.tag,
            payload: s.payload,
            callback: s.callback,
            next: null
          }, R === null ? (O = R = j, b = Z) : R = R.next = j, r |= D;
        if (s = s.next, s === null) {
          if (s = a.shared.pending, s === null)
            break;
          j = s, s = j.next, j.next = null, a.lastBaseUpdate = j, a.shared.pending = null;
        }
      } while (!0);
      R === null && (b = Z), a.baseState = b, a.firstBaseUpdate = O, a.lastBaseUpdate = R, i === null && (a.shared.lanes = 0), Ol |= r, t.lanes = r, t.memoizedState = Z;
    }
  }
  function _o(t, e) {
    if (typeof t != "function")
      throw Error(f(191, t));
    t.call(e);
  }
  function Oo(t, e) {
    var l = t.callbacks;
    if (l !== null)
      for (t.callbacks = null, t = 0; t < l.length; t++)
        _o(l[t], e);
  }
  var Cn = E(null), Xu = E(0);
  function Do(t, e) {
    t = sl, X(Xu, t), X(Cn, e), sl = t | e.baseLanes;
  }
  function ef() {
    X(Xu, sl), X(Cn, Cn.current);
  }
  function lf() {
    sl = Xu.current, q(Cn), q(Xu);
  }
  var Ee = E(null), Ue = null;
  function zl(t) {
    var e = t.alternate;
    X(Gt, Gt.current & 1), X(Ee, t), Ue === null && (e === null || Cn.current !== null || e.memoizedState !== null) && (Ue = t);
  }
  function nf(t) {
    X(Gt, Gt.current), X(Ee, t), Ue === null && (Ue = t);
  }
  function jo(t) {
    t.tag === 22 ? (X(Gt, Gt.current), X(Ee, t), Ue === null && (Ue = t)) : Tl();
  }
  function Tl() {
    X(Gt, Gt.current), X(Ee, Ee.current);
  }
  function xe(t) {
    q(Ee), Ue === t && (Ue = null), q(Gt);
  }
  var Gt = E(0);
  function Qu(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || or(l) || sr(l)))
          return e;
      } else if (e.tag === 19 && (e.memoizedProps.revealOrder === "forwards" || e.memoizedProps.revealOrder === "backwards" || e.memoizedProps.revealOrder === "unstable_legacy-backwards" || e.memoizedProps.revealOrder === "together")) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    return null;
  }
  var nl = 0, st = null, _t = null, Kt = null, wu = !1, qn = !1, ln = !1, Ku = 0, Da = 0, Bn = null, Fm = 0;
  function Zt() {
    throw Error(f(321));
  }
  function af(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!Se(t[l], e[l])) return !1;
    return !0;
  }
  function uf(t, e, l, n, a, i) {
    return nl = i, st = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, T.H = t === null || t.memoizedState === null ? ms : Ef, ln = !1, i = l(n, a), ln = !1, qn && (i = Ro(
      e,
      l,
      n,
      a
    )), Ho(t), i;
  }
  function Ho(t) {
    T.H = Ra;
    var e = _t !== null && _t.next !== null;
    if (nl = 0, Kt = _t = st = null, wu = !1, Da = 0, Bn = null, e) throw Error(f(300));
    t === null || Jt || (t = t.dependencies, t !== null && qu(t) && (Jt = !0));
  }
  function Ro(t, e, l, n) {
    st = t;
    var a = 0;
    do {
      if (qn && (Bn = null), Da = 0, qn = !1, 25 <= a) throw Error(f(301));
      if (a += 1, Kt = _t = null, t.updateQueue != null) {
        var i = t.updateQueue;
        i.lastEffect = null, i.events = null, i.stores = null, i.memoCache != null && (i.memoCache.index = 0);
      }
      T.H = ys, i = e(l, n);
    } while (qn);
    return i;
  }
  function km() {
    var t = T.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? ja(e) : e, t = t.useState()[0], (_t !== null ? _t.memoizedState : null) !== t && (st.flags |= 1024), e;
  }
  function cf() {
    var t = Ku !== 0;
    return Ku = 0, t;
  }
  function ff(t, e, l) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~l;
  }
  function rf(t) {
    if (wu) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      wu = !1;
    }
    nl = 0, Kt = _t = st = null, qn = !1, Da = Ku = 0, Bn = null;
  }
  function ue() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Kt === null ? st.memoizedState = Kt = t : Kt = Kt.next = t, Kt;
  }
  function Vt() {
    if (_t === null) {
      var t = st.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = _t.next;
    var e = Kt === null ? st.memoizedState : Kt.next;
    if (e !== null)
      Kt = e, _t = t;
    else {
      if (t === null)
        throw st.alternate === null ? Error(f(467)) : Error(f(310));
      _t = t, t = {
        memoizedState: _t.memoizedState,
        baseState: _t.baseState,
        baseQueue: _t.baseQueue,
        queue: _t.queue,
        next: null
      }, Kt === null ? st.memoizedState = Kt = t : Kt = Kt.next = t;
    }
    return Kt;
  }
  function Ju() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ja(t) {
    var e = Da;
    return Da += 1, Bn === null && (Bn = []), t = Ao(Bn, t, e), e = st, (Kt === null ? e.memoizedState : Kt.next) === null && (e = e.alternate, T.H = e === null || e.memoizedState === null ? ms : Ef), t;
  }
  function $u(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return ja(t);
      if (t.$$typeof === K) return te(t);
    }
    throw Error(f(438, String(t)));
  }
  function of(t) {
    var e = null, l = st.updateQueue;
    if (l !== null && (e = l.memoCache), e == null) {
      var n = st.alternate;
      n !== null && (n = n.updateQueue, n !== null && (n = n.memoCache, n != null && (e = {
        data: n.data.map(function(a) {
          return a.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), l === null && (l = Ju(), st.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
      for (l = e.data[e.index] = Array(t), n = 0; n < t; n++)
        l[n] = Et;
    return e.index++, l;
  }
  function al(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Fu(t) {
    var e = Vt();
    return sf(e, _t, t);
  }
  function sf(t, e, l) {
    var n = t.queue;
    if (n === null) throw Error(f(311));
    n.lastRenderedReducer = l;
    var a = t.baseQueue, i = n.pending;
    if (i !== null) {
      if (a !== null) {
        var r = a.next;
        a.next = i.next, i.next = r;
      }
      e.baseQueue = a = i, n.pending = null;
    }
    if (i = t.baseState, a === null) t.memoizedState = i;
    else {
      e = a.next;
      var s = r = null, b = null, O = e, R = !1;
      do {
        var Z = O.lane & -536870913;
        if (Z !== O.lane ? (gt & Z) === Z : (nl & Z) === Z) {
          var D = O.revertLane;
          if (D === 0)
            b !== null && (b = b.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: O.action,
              hasEagerState: O.hasEagerState,
              eagerState: O.eagerState,
              next: null
            }), Z === jn && (R = !0);
          else if ((nl & D) === D) {
            O = O.next, D === jn && (R = !0);
            continue;
          } else
            Z = {
              lane: 0,
              revertLane: O.revertLane,
              gesture: null,
              action: O.action,
              hasEagerState: O.hasEagerState,
              eagerState: O.eagerState,
              next: null
            }, b === null ? (s = b = Z, r = i) : b = b.next = Z, st.lanes |= D, Ol |= D;
          Z = O.action, ln && l(i, Z), i = O.hasEagerState ? O.eagerState : l(i, Z);
        } else
          D = {
            lane: Z,
            revertLane: O.revertLane,
            gesture: O.gesture,
            action: O.action,
            hasEagerState: O.hasEagerState,
            eagerState: O.eagerState,
            next: null
          }, b === null ? (s = b = D, r = i) : b = b.next = D, st.lanes |= Z, Ol |= Z;
        O = O.next;
      } while (O !== null && O !== e);
      if (b === null ? r = i : b.next = s, !Se(i, t.memoizedState) && (Jt = !0, R && (l = Hn, l !== null)))
        throw l;
      t.memoizedState = i, t.baseState = r, t.baseQueue = b, n.lastRenderedState = i;
    }
    return a === null && (n.lanes = 0), [t.memoizedState, n.dispatch];
  }
  function df(t) {
    var e = Vt(), l = e.queue;
    if (l === null) throw Error(f(311));
    l.lastRenderedReducer = t;
    var n = l.dispatch, a = l.pending, i = e.memoizedState;
    if (a !== null) {
      l.pending = null;
      var r = a = a.next;
      do
        i = t(i, r.action), r = r.next;
      while (r !== a);
      Se(i, e.memoizedState) || (Jt = !0), e.memoizedState = i, e.baseQueue === null && (e.baseState = i), l.lastRenderedState = i;
    }
    return [i, n];
  }
  function Uo(t, e, l) {
    var n = st, a = Vt(), i = St;
    if (i) {
      if (l === void 0) throw Error(f(407));
      l = l();
    } else l = e();
    var r = !Se(
      (_t || a).memoizedState,
      l
    );
    if (r && (a.memoizedState = l, Jt = !0), a = a.queue, yf(Bo.bind(null, n, a, t), [
      t
    ]), a.getSnapshot !== e || r || Kt !== null && Kt.memoizedState.tag & 1) {
      if (n.flags |= 2048, Zn(
        9,
        { destroy: void 0 },
        qo.bind(
          null,
          n,
          a,
          l,
          e
        ),
        null
      ), jt === null) throw Error(f(349));
      i || (nl & 127) !== 0 || Co(n, e, l);
    }
    return l;
  }
  function Co(t, e, l) {
    t.flags |= 16384, t = { getSnapshot: e, value: l }, e = st.updateQueue, e === null ? (e = Ju(), st.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
  }
  function qo(t, e, l, n) {
    e.value = l, e.getSnapshot = n, Zo(e) && Yo(t);
  }
  function Bo(t, e, l) {
    return l(function() {
      Zo(e) && Yo(t);
    });
  }
  function Zo(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !Se(t, l);
    } catch {
      return !0;
    }
  }
  function Yo(t) {
    var e = Jl(t, 2);
    e !== null && he(e, t, 2);
  }
  function hf(t) {
    var e = ue();
    if (typeof t == "function") {
      var l = t;
      if (t = l(), ln) {
        yl(!0);
        try {
          l();
        } finally {
          yl(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: al,
      lastRenderedState: t
    }, e;
  }
  function Lo(t, e, l, n) {
    return t.baseState = l, sf(
      t,
      _t,
      typeof n == "function" ? n : al
    );
  }
  function Wm(t, e, l, n, a) {
    if (Iu(t)) throw Error(f(485));
    if (t = e.action, t !== null) {
      var i = {
        payload: a,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(r) {
          i.listeners.push(r);
        }
      };
      T.T !== null ? l(!0) : i.isTransition = !1, n(i), l = e.pending, l === null ? (i.next = e.pending = i, Go(e, i)) : (i.next = l.next, e.pending = l.next = i);
    }
  }
  function Go(t, e) {
    var l = e.action, n = e.payload, a = t.state;
    if (e.isTransition) {
      var i = T.T, r = {};
      T.T = r;
      try {
        var s = l(a, n), b = T.S;
        b !== null && b(r, s), Vo(t, e, s);
      } catch (O) {
        mf(t, e, O);
      } finally {
        i !== null && r.types !== null && (i.types = r.types), T.T = i;
      }
    } else
      try {
        i = l(a, n), Vo(t, e, i);
      } catch (O) {
        mf(t, e, O);
      }
  }
  function Vo(t, e, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(n) {
        Xo(t, e, n);
      },
      function(n) {
        return mf(t, e, n);
      }
    ) : Xo(t, e, l);
  }
  function Xo(t, e, l) {
    e.status = "fulfilled", e.value = l, Qo(e), t.state = l, e = t.pending, e !== null && (l = e.next, l === e ? t.pending = null : (l = l.next, e.next = l, Go(t, l)));
  }
  function mf(t, e, l) {
    var n = t.pending;
    if (t.pending = null, n !== null) {
      n = n.next;
      do
        e.status = "rejected", e.reason = l, Qo(e), e = e.next;
      while (e !== n);
    }
    t.action = null;
  }
  function Qo(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function wo(t, e) {
    return e;
  }
  function Ko(t, e) {
    if (St) {
      var l = jt.formState;
      if (l !== null) {
        t: {
          var n = st;
          if (St) {
            if (Rt) {
              e: {
                for (var a = Rt, i = Re; a.nodeType !== 8; ) {
                  if (!i) {
                    a = null;
                    break e;
                  }
                  if (a = Ce(
                    a.nextSibling
                  ), a === null) {
                    a = null;
                    break e;
                  }
                }
                i = a.data, a = i === "F!" || i === "F" ? a : null;
              }
              if (a) {
                Rt = Ce(
                  a.nextSibling
                ), n = a.data === "F!";
                break t;
              }
            }
            bl(n);
          }
          n = !1;
        }
        n && (e = l[0]);
      }
    }
    return l = ue(), l.memoizedState = l.baseState = e, n = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: wo,
      lastRenderedState: e
    }, l.queue = n, l = ss.bind(
      null,
      st,
      n
    ), n.dispatch = l, n = hf(!1), i = bf.bind(
      null,
      st,
      !1,
      n.queue
    ), n = ue(), a = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, n.queue = a, l = Wm.bind(
      null,
      st,
      a,
      i,
      l
    ), a.dispatch = l, n.memoizedState = t, [e, l, !1];
  }
  function Jo(t) {
    var e = Vt();
    return $o(e, _t, t);
  }
  function $o(t, e, l) {
    if (e = sf(
      t,
      e,
      wo
    )[0], t = Fu(al)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var n = ja(e);
      } catch (r) {
        throw r === Rn ? Yu : r;
      }
    else n = e;
    e = Vt();
    var a = e.queue, i = a.dispatch;
    return l !== e.memoizedState && (st.flags |= 2048, Zn(
      9,
      { destroy: void 0 },
      Im.bind(null, a, l),
      null
    )), [n, i, t];
  }
  function Im(t, e) {
    t.action = e;
  }
  function Fo(t) {
    var e = Vt(), l = _t;
    if (l !== null)
      return $o(e, l, t);
    Vt(), e = e.memoizedState, l = Vt();
    var n = l.queue.dispatch;
    return l.memoizedState = t, [e, n, !1];
  }
  function Zn(t, e, l, n) {
    return t = { tag: t, create: l, deps: n, inst: e, next: null }, e = st.updateQueue, e === null && (e = Ju(), st.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (n = l.next, l.next = t, t.next = n, e.lastEffect = t), t;
  }
  function ko() {
    return Vt().memoizedState;
  }
  function ku(t, e, l, n) {
    var a = ue();
    st.flags |= t, a.memoizedState = Zn(
      1 | e,
      { destroy: void 0 },
      l,
      n === void 0 ? null : n
    );
  }
  function Wu(t, e, l, n) {
    var a = Vt();
    n = n === void 0 ? null : n;
    var i = a.memoizedState.inst;
    _t !== null && n !== null && af(n, _t.memoizedState.deps) ? a.memoizedState = Zn(e, i, l, n) : (st.flags |= t, a.memoizedState = Zn(
      1 | e,
      i,
      l,
      n
    ));
  }
  function Wo(t, e) {
    ku(8390656, 8, t, e);
  }
  function yf(t, e) {
    Wu(2048, 8, t, e);
  }
  function Pm(t) {
    st.flags |= 4;
    var e = st.updateQueue;
    if (e === null)
      e = Ju(), st.updateQueue = e, e.events = [t];
    else {
      var l = e.events;
      l === null ? e.events = [t] : l.push(t);
    }
  }
  function Io(t) {
    var e = Vt().memoizedState;
    return Pm({ ref: e, nextImpl: t }), function() {
      if ((Mt & 2) !== 0) throw Error(f(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function Po(t, e) {
    return Wu(4, 2, t, e);
  }
  function ts(t, e) {
    return Wu(4, 4, t, e);
  }
  function es(t, e) {
    if (typeof e == "function") {
      t = t();
      var l = e(t);
      return function() {
        typeof l == "function" ? l() : e(null);
      };
    }
    if (e != null)
      return t = t(), e.current = t, function() {
        e.current = null;
      };
  }
  function ls(t, e, l) {
    l = l != null ? l.concat([t]) : null, Wu(4, 4, es.bind(null, e, t), l);
  }
  function vf() {
  }
  function ns(t, e) {
    var l = Vt();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    return e !== null && af(e, n[1]) ? n[0] : (l.memoizedState = [t, e], t);
  }
  function as(t, e) {
    var l = Vt();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    if (e !== null && af(e, n[1]))
      return n[0];
    if (n = t(), ln) {
      yl(!0);
      try {
        t();
      } finally {
        yl(!1);
      }
    }
    return l.memoizedState = [n, e], n;
  }
  function gf(t, e, l) {
    return l === void 0 || (nl & 1073741824) !== 0 && (gt & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = l, t = u1(), st.lanes |= t, Ol |= t, l);
  }
  function us(t, e, l, n) {
    return Se(l, e) ? l : Cn.current !== null ? (t = gf(t, l, n), Se(t, e) || (Jt = !0), t) : (nl & 42) === 0 || (nl & 1073741824) !== 0 && (gt & 261930) === 0 ? (Jt = !0, t.memoizedState = l) : (t = u1(), st.lanes |= t, Ol |= t, e);
  }
  function is(t, e, l, n, a) {
    var i = G.p;
    G.p = i !== 0 && 8 > i ? i : 8;
    var r = T.T, s = {};
    T.T = s, bf(t, !1, e, l);
    try {
      var b = a(), O = T.S;
      if (O !== null && O(s, b), b !== null && typeof b == "object" && typeof b.then == "function") {
        var R = $m(
          b,
          n
        );
        Ha(
          t,
          e,
          R,
          ze(t)
        );
      } else
        Ha(
          t,
          e,
          n,
          ze(t)
        );
    } catch (Z) {
      Ha(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: Z },
        ze()
      );
    } finally {
      G.p = i, r !== null && s.types !== null && (r.types = s.types), T.T = r;
    }
  }
  function t2() {
  }
  function pf(t, e, l, n) {
    if (t.tag !== 5) throw Error(f(476));
    var a = cs(t).queue;
    is(
      t,
      a,
      e,
      J,
      l === null ? t2 : function() {
        return fs(t), l(n);
      }
    );
  }
  function cs(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: J,
      baseState: J,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: al,
        lastRenderedState: J
      },
      next: null
    };
    var l = {};
    return e.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: al,
        lastRenderedState: l
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function fs(t) {
    var e = cs(t);
    e.next === null && (e = t.alternate.memoizedState), Ha(
      t,
      e.next.queue,
      {},
      ze()
    );
  }
  function Sf() {
    return te(Fa);
  }
  function rs() {
    return Vt().memoizedState;
  }
  function os() {
    return Vt().memoizedState;
  }
  function e2(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = ze();
          t = Al(l);
          var n = Ml(e, t, l);
          n !== null && (he(n, e, l), Na(n, e, l)), e = { cache: Jc() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function l2(t, e, l) {
    var n = ze();
    l = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Iu(t) ? ds(e, l) : (l = qc(t, e, l, n), l !== null && (he(l, t, n), hs(l, e, n)));
  }
  function ss(t, e, l) {
    var n = ze();
    Ha(t, e, l, n);
  }
  function Ha(t, e, l, n) {
    var a = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Iu(t)) ds(e, a);
    else {
      var i = t.alternate;
      if (t.lanes === 0 && (i === null || i.lanes === 0) && (i = e.lastRenderedReducer, i !== null))
        try {
          var r = e.lastRenderedState, s = i(r, l);
          if (a.hasEagerState = !0, a.eagerState = s, Se(s, r))
            return Hu(t, e, a, 0), jt === null && ju(), !1;
        } catch {
        } finally {
        }
      if (l = qc(t, e, a, n), l !== null)
        return he(l, t, n), hs(l, e, n), !0;
    }
    return !1;
  }
  function bf(t, e, l, n) {
    if (n = {
      lane: 2,
      revertLane: If(),
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Iu(t)) {
      if (e) throw Error(f(479));
    } else
      e = qc(
        t,
        l,
        n,
        2
      ), e !== null && he(e, t, 2);
  }
  function Iu(t) {
    var e = t.alternate;
    return t === st || e !== null && e === st;
  }
  function ds(t, e) {
    qn = wu = !0;
    var l = t.pending;
    l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
  }
  function hs(t, e, l) {
    if ((l & 4194048) !== 0) {
      var n = e.lanes;
      n &= t.pendingLanes, l |= n, e.lanes = l, g0(t, l);
    }
  }
  var Ra = {
    readContext: te,
    use: $u,
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
  var ms = {
    readContext: te,
    use: $u,
    useCallback: function(t, e) {
      return ue().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: te,
    useEffect: Wo,
    useImperativeHandle: function(t, e, l) {
      l = l != null ? l.concat([t]) : null, ku(
        4194308,
        4,
        es.bind(null, e, t),
        l
      );
    },
    useLayoutEffect: function(t, e) {
      return ku(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      ku(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var l = ue();
      e = e === void 0 ? null : e;
      var n = t();
      if (ln) {
        yl(!0);
        try {
          t();
        } finally {
          yl(!1);
        }
      }
      return l.memoizedState = [n, e], n;
    },
    useReducer: function(t, e, l) {
      var n = ue();
      if (l !== void 0) {
        var a = l(e);
        if (ln) {
          yl(!0);
          try {
            l(e);
          } finally {
            yl(!1);
          }
        }
      } else a = e;
      return n.memoizedState = n.baseState = a, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: a
      }, n.queue = t, t = t.dispatch = l2.bind(
        null,
        st,
        t
      ), [n.memoizedState, t];
    },
    useRef: function(t) {
      var e = ue();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = hf(t);
      var e = t.queue, l = ss.bind(null, st, e);
      return e.dispatch = l, [t.memoizedState, l];
    },
    useDebugValue: vf,
    useDeferredValue: function(t, e) {
      var l = ue();
      return gf(l, t, e);
    },
    useTransition: function() {
      var t = hf(!1);
      return t = is.bind(
        null,
        st,
        t.queue,
        !0,
        !1
      ), ue().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, l) {
      var n = st, a = ue();
      if (St) {
        if (l === void 0)
          throw Error(f(407));
        l = l();
      } else {
        if (l = e(), jt === null)
          throw Error(f(349));
        (gt & 127) !== 0 || Co(n, e, l);
      }
      a.memoizedState = l;
      var i = { value: l, getSnapshot: e };
      return a.queue = i, Wo(Bo.bind(null, n, i, t), [
        t
      ]), n.flags |= 2048, Zn(
        9,
        { destroy: void 0 },
        qo.bind(
          null,
          n,
          i,
          l,
          e
        ),
        null
      ), l;
    },
    useId: function() {
      var t = ue(), e = jt.identifierPrefix;
      if (St) {
        var l = Qe, n = Xe;
        l = (n & ~(1 << 32 - pe(n) - 1)).toString(32) + l, e = "_" + e + "R_" + l, l = Ku++, 0 < l && (e += "H" + l.toString(32)), e += "_";
      } else
        l = Fm++, e = "_" + e + "r_" + l.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: Sf,
    useFormState: Ko,
    useActionState: Ko,
    useOptimistic: function(t) {
      var e = ue();
      e.memoizedState = e.baseState = t;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = l, e = bf.bind(
        null,
        st,
        !0,
        l
      ), l.dispatch = e, [t, e];
    },
    useMemoCache: of,
    useCacheRefresh: function() {
      return ue().memoizedState = e2.bind(
        null,
        st
      );
    },
    useEffectEvent: function(t) {
      var e = ue(), l = { impl: t };
      return e.memoizedState = l, function() {
        if ((Mt & 2) !== 0)
          throw Error(f(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, Ef = {
    readContext: te,
    use: $u,
    useCallback: ns,
    useContext: te,
    useEffect: yf,
    useImperativeHandle: ls,
    useInsertionEffect: Po,
    useLayoutEffect: ts,
    useMemo: as,
    useReducer: Fu,
    useRef: ko,
    useState: function() {
      return Fu(al);
    },
    useDebugValue: vf,
    useDeferredValue: function(t, e) {
      var l = Vt();
      return us(
        l,
        _t.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Fu(al)[0], e = Vt().memoizedState;
      return [
        typeof t == "boolean" ? t : ja(t),
        e
      ];
    },
    useSyncExternalStore: Uo,
    useId: rs,
    useHostTransitionStatus: Sf,
    useFormState: Jo,
    useActionState: Jo,
    useOptimistic: function(t, e) {
      var l = Vt();
      return Lo(l, _t, t, e);
    },
    useMemoCache: of,
    useCacheRefresh: os
  };
  Ef.useEffectEvent = Io;
  var ys = {
    readContext: te,
    use: $u,
    useCallback: ns,
    useContext: te,
    useEffect: yf,
    useImperativeHandle: ls,
    useInsertionEffect: Po,
    useLayoutEffect: ts,
    useMemo: as,
    useReducer: df,
    useRef: ko,
    useState: function() {
      return df(al);
    },
    useDebugValue: vf,
    useDeferredValue: function(t, e) {
      var l = Vt();
      return _t === null ? gf(l, t, e) : us(
        l,
        _t.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = df(al)[0], e = Vt().memoizedState;
      return [
        typeof t == "boolean" ? t : ja(t),
        e
      ];
    },
    useSyncExternalStore: Uo,
    useId: rs,
    useHostTransitionStatus: Sf,
    useFormState: Fo,
    useActionState: Fo,
    useOptimistic: function(t, e) {
      var l = Vt();
      return _t !== null ? Lo(l, _t, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
    },
    useMemoCache: of,
    useCacheRefresh: os
  };
  ys.useEffectEvent = Io;
  function xf(t, e, l, n) {
    e = t.memoizedState, l = l(n, e), l = l == null ? e : S({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
  }
  var Af = {
    enqueueSetState: function(t, e, l) {
      t = t._reactInternals;
      var n = ze(), a = Al(n);
      a.payload = e, l != null && (a.callback = l), e = Ml(t, a, n), e !== null && (he(e, t, n), Na(e, t, n));
    },
    enqueueReplaceState: function(t, e, l) {
      t = t._reactInternals;
      var n = ze(), a = Al(n);
      a.tag = 1, a.payload = e, l != null && (a.callback = l), e = Ml(t, a, n), e !== null && (he(e, t, n), Na(e, t, n));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var l = ze(), n = Al(l);
      n.tag = 2, e != null && (n.callback = e), e = Ml(t, n, l), e !== null && (he(e, t, l), Na(e, t, l));
    }
  };
  function vs(t, e, l, n, a, i, r) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(n, i, r) : e.prototype && e.prototype.isPureReactComponent ? !Sa(l, n) || !Sa(a, i) : !0;
  }
  function gs(t, e, l, n) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, n), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, n), e.state !== t && Af.enqueueReplaceState(e, e.state, null);
  }
  function nn(t, e) {
    var l = e;
    if ("ref" in e) {
      l = {};
      for (var n in e)
        n !== "ref" && (l[n] = e[n]);
    }
    if (t = t.defaultProps) {
      l === e && (l = S({}, l));
      for (var a in t)
        l[a] === void 0 && (l[a] = t[a]);
    }
    return l;
  }
  function ps(t) {
    Du(t);
  }
  function Ss(t) {
    console.error(t);
  }
  function bs(t) {
    Du(t);
  }
  function Pu(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function Es(t, e, l) {
    try {
      var n = t.onCaughtError;
      n(l.value, {
        componentStack: l.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Mf(t, e, l) {
    return l = Al(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Pu(t, e);
    }, l;
  }
  function xs(t) {
    return t = Al(t), t.tag = 3, t;
  }
  function As(t, e, l, n) {
    var a = l.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var i = n.value;
      t.payload = function() {
        return a(i);
      }, t.callback = function() {
        Es(e, l, n);
      };
    }
    var r = l.stateNode;
    r !== null && typeof r.componentDidCatch == "function" && (t.callback = function() {
      Es(e, l, n), typeof a != "function" && (Dl === null ? Dl = /* @__PURE__ */ new Set([this]) : Dl.add(this));
      var s = n.stack;
      this.componentDidCatch(n.value, {
        componentStack: s !== null ? s : ""
      });
    });
  }
  function n2(t, e, l, n, a) {
    if (l.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
      if (e = l.alternate, e !== null && Dn(
        e,
        l,
        a,
        !0
      ), l = Ee.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return Ue === null ? si() : l.alternate === null && Yt === 0 && (Yt = 3), l.flags &= -257, l.flags |= 65536, l.lanes = a, n === Lu ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([n]) : e.add(n), Ff(t, n, a)), !1;
          case 22:
            return l.flags |= 65536, n === Lu ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([n])
            }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([n]) : l.add(n)), Ff(t, n, a)), !1;
        }
        throw Error(f(435, l.tag));
      }
      return Ff(t, n, a), si(), !1;
    }
    if (St)
      return e = Ee.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = a, n !== Vc && (t = Error(f(422), { cause: n }), xa(De(t, l)))) : (n !== Vc && (e = Error(f(423), {
        cause: n
      }), xa(
        De(e, l)
      )), t = t.current.alternate, t.flags |= 65536, a &= -a, t.lanes |= a, n = De(n, l), a = Mf(
        t.stateNode,
        n,
        a
      ), Pc(t, a), Yt !== 4 && (Yt = 2)), !1;
    var i = Error(f(520), { cause: n });
    if (i = De(i, l), Ga === null ? Ga = [i] : Ga.push(i), Yt !== 4 && (Yt = 2), e === null) return !0;
    n = De(n, l), l = e;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, t = a & -a, l.lanes |= t, t = Mf(l.stateNode, n, t), Pc(l, t), !1;
        case 1:
          if (e = l.type, i = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || i !== null && typeof i.componentDidCatch == "function" && (Dl === null || !Dl.has(i))))
            return l.flags |= 65536, a &= -a, l.lanes |= a, a = xs(a), As(
              a,
              t,
              l,
              n
            ), Pc(l, a), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var zf = Error(f(461)), Jt = !1;
  function ee(t, e, l, n) {
    e.child = t === null ? No(e, null, l, n) : en(
      e,
      t.child,
      l,
      n
    );
  }
  function Ms(t, e, l, n, a) {
    l = l.render;
    var i = e.ref;
    if ("ref" in n) {
      var r = {};
      for (var s in n)
        s !== "ref" && (r[s] = n[s]);
    } else r = n;
    return Wl(e), n = uf(
      t,
      e,
      l,
      r,
      i,
      a
    ), s = cf(), t !== null && !Jt ? (ff(t, e, a), ul(t, e, a)) : (St && s && Lc(e), e.flags |= 1, ee(t, e, n, a), e.child);
  }
  function zs(t, e, l, n, a) {
    if (t === null) {
      var i = l.type;
      return typeof i == "function" && !Bc(i) && i.defaultProps === void 0 && l.compare === null ? (e.tag = 15, e.type = i, Ts(
        t,
        e,
        i,
        n,
        a
      )) : (t = Uu(
        l.type,
        null,
        n,
        e,
        e.mode,
        a
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (i = t.child, !Rf(t, a)) {
      var r = i.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Sa, l(r, n) && t.ref === e.ref)
        return ul(t, e, a);
    }
    return e.flags |= 1, t = Pe(i, n), t.ref = e.ref, t.return = e, e.child = t;
  }
  function Ts(t, e, l, n, a) {
    if (t !== null) {
      var i = t.memoizedProps;
      if (Sa(i, n) && t.ref === e.ref)
        if (Jt = !1, e.pendingProps = n = i, Rf(t, a))
          (t.flags & 131072) !== 0 && (Jt = !0);
        else
          return e.lanes = t.lanes, ul(t, e, a);
    }
    return Tf(
      t,
      e,
      l,
      n,
      a
    );
  }
  function Ns(t, e, l, n) {
    var a = n.children, i = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (i = i !== null ? i.baseLanes | l : l, t !== null) {
          for (n = e.child = t.child, a = 0; n !== null; )
            a = a | n.lanes | n.childLanes, n = n.sibling;
          n = a & ~i;
        } else n = 0, e.child = null;
        return _s(
          t,
          e,
          i,
          l,
          n
        );
      }
      if ((l & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Zu(
          e,
          i !== null ? i.cachePool : null
        ), i !== null ? Do(e, i) : ef(), jo(e);
      else
        return n = e.lanes = 536870912, _s(
          t,
          e,
          i !== null ? i.baseLanes | l : l,
          l,
          n
        );
    } else
      i !== null ? (Zu(e, i.cachePool), Do(e, i), Tl(), e.memoizedState = null) : (t !== null && Zu(e, null), ef(), Tl());
    return ee(t, e, a, l), e.child;
  }
  function Ua(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function _s(t, e, l, n, a) {
    var i = Fc();
    return i = i === null ? null : { parent: wt._currentValue, pool: i }, e.memoizedState = {
      baseLanes: l,
      cachePool: i
    }, t !== null && Zu(e, null), ef(), jo(e), t !== null && Dn(t, e, n, !0), e.childLanes = a, null;
  }
  function ti(t, e) {
    return e = li(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Os(t, e, l) {
    return en(e, t.child, null, l), t = ti(e, e.pendingProps), t.flags |= 2, xe(e), e.memoizedState = null, t;
  }
  function a2(t, e, l) {
    var n = e.pendingProps, a = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (St) {
        if (n.mode === "hidden")
          return t = ti(e, n), e.lanes = 536870912, Ua(null, t);
        if (nf(e), (t = Rt) ? (t = G1(
          t,
          Re
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: pl !== null ? { id: Xe, overflow: Qe } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = so(t), l.return = e, e.child = l, Pt = e, Rt = null)) : t = null, t === null) throw bl(e);
        return e.lanes = 536870912, null;
      }
      return ti(e, n);
    }
    var i = t.memoizedState;
    if (i !== null) {
      var r = i.dehydrated;
      if (nf(e), a)
        if (e.flags & 256)
          e.flags &= -257, e = Os(
            t,
            e,
            l
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(f(558));
      else if (Jt || Dn(t, e, l, !1), a = (l & t.childLanes) !== 0, Jt || a) {
        if (n = jt, n !== null && (r = p0(n, l), r !== 0 && r !== i.retryLane))
          throw i.retryLane = r, Jl(t, r), he(n, t, r), zf;
        si(), e = Os(
          t,
          e,
          l
        );
      } else
        t = i.treeContext, Rt = Ce(r.nextSibling), Pt = e, St = !0, Sl = null, Re = !1, t !== null && yo(e, t), e = ti(e, n), e.flags |= 4096;
      return e;
    }
    return t = Pe(t.child, {
      mode: n.mode,
      children: n.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function ei(t, e) {
    var l = e.ref;
    if (l === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(f(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function Tf(t, e, l, n, a) {
    return Wl(e), l = uf(
      t,
      e,
      l,
      n,
      void 0,
      a
    ), n = cf(), t !== null && !Jt ? (ff(t, e, a), ul(t, e, a)) : (St && n && Lc(e), e.flags |= 1, ee(t, e, l, a), e.child);
  }
  function Ds(t, e, l, n, a, i) {
    return Wl(e), e.updateQueue = null, l = Ro(
      e,
      n,
      l,
      a
    ), Ho(t), n = cf(), t !== null && !Jt ? (ff(t, e, i), ul(t, e, i)) : (St && n && Lc(e), e.flags |= 1, ee(t, e, l, i), e.child);
  }
  function js(t, e, l, n, a) {
    if (Wl(e), e.stateNode === null) {
      var i = Tn, r = l.contextType;
      typeof r == "object" && r !== null && (i = te(r)), i = new l(n, i), e.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = Af, e.stateNode = i, i._reactInternals = e, i = e.stateNode, i.props = n, i.state = e.memoizedState, i.refs = {}, Wc(e), r = l.contextType, i.context = typeof r == "object" && r !== null ? te(r) : Tn, i.state = e.memoizedState, r = l.getDerivedStateFromProps, typeof r == "function" && (xf(
        e,
        l,
        r,
        n
      ), i.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (r = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), r !== i.state && Af.enqueueReplaceState(i, i.state, null), Oa(e, n, i, a), _a(), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308), n = !0;
    } else if (t === null) {
      i = e.stateNode;
      var s = e.memoizedProps, b = nn(l, s);
      i.props = b;
      var O = i.context, R = l.contextType;
      r = Tn, typeof R == "object" && R !== null && (r = te(R));
      var Z = l.getDerivedStateFromProps;
      R = typeof Z == "function" || typeof i.getSnapshotBeforeUpdate == "function", s = e.pendingProps !== s, R || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (s || O !== r) && gs(
        e,
        i,
        n,
        r
      ), xl = !1;
      var D = e.memoizedState;
      i.state = D, Oa(e, n, i, a), _a(), O = e.memoizedState, s || D !== O || xl ? (typeof Z == "function" && (xf(
        e,
        l,
        Z,
        n
      ), O = e.memoizedState), (b = xl || vs(
        e,
        l,
        b,
        n,
        D,
        O,
        r
      )) ? (R || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = n, e.memoizedState = O), i.props = n, i.state = O, i.context = r, n = b) : (typeof i.componentDidMount == "function" && (e.flags |= 4194308), n = !1);
    } else {
      i = e.stateNode, Ic(t, e), r = e.memoizedProps, R = nn(l, r), i.props = R, Z = e.pendingProps, D = i.context, O = l.contextType, b = Tn, typeof O == "object" && O !== null && (b = te(O)), s = l.getDerivedStateFromProps, (O = typeof s == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (r !== Z || D !== b) && gs(
        e,
        i,
        n,
        b
      ), xl = !1, D = e.memoizedState, i.state = D, Oa(e, n, i, a), _a();
      var j = e.memoizedState;
      r !== Z || D !== j || xl || t !== null && t.dependencies !== null && qu(t.dependencies) ? (typeof s == "function" && (xf(
        e,
        l,
        s,
        n
      ), j = e.memoizedState), (R = xl || vs(
        e,
        l,
        R,
        n,
        D,
        j,
        b
      ) || t !== null && t.dependencies !== null && qu(t.dependencies)) ? (O || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(n, j, b), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(
        n,
        j,
        b
      )), typeof i.componentDidUpdate == "function" && (e.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || r === t.memoizedProps && D === t.memoizedState || (e.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || r === t.memoizedProps && D === t.memoizedState || (e.flags |= 1024), e.memoizedProps = n, e.memoizedState = j), i.props = n, i.state = j, i.context = b, n = R) : (typeof i.componentDidUpdate != "function" || r === t.memoizedProps && D === t.memoizedState || (e.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || r === t.memoizedProps && D === t.memoizedState || (e.flags |= 1024), n = !1);
    }
    return i = n, ei(t, e), n = (e.flags & 128) !== 0, i || n ? (i = e.stateNode, l = n && typeof l.getDerivedStateFromError != "function" ? null : i.render(), e.flags |= 1, t !== null && n ? (e.child = en(
      e,
      t.child,
      null,
      a
    ), e.child = en(
      e,
      null,
      l,
      a
    )) : ee(t, e, l, a), e.memoizedState = i.state, t = e.child) : t = ul(
      t,
      e,
      a
    ), t;
  }
  function Hs(t, e, l, n) {
    return Fl(), e.flags |= 256, ee(t, e, l, n), e.child;
  }
  var Nf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function _f(t) {
    return { baseLanes: t, cachePool: Eo() };
  }
  function Of(t, e, l) {
    return t = t !== null ? t.childLanes & ~l : 0, e && (t |= Me), t;
  }
  function Rs(t, e, l) {
    var n = e.pendingProps, a = !1, i = (e.flags & 128) !== 0, r;
    if ((r = i) || (r = t !== null && t.memoizedState === null ? !1 : (Gt.current & 2) !== 0), r && (a = !0, e.flags &= -129), r = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (St) {
        if (a ? zl(e) : Tl(), (t = Rt) ? (t = G1(
          t,
          Re
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: pl !== null ? { id: Xe, overflow: Qe } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = so(t), l.return = e, e.child = l, Pt = e, Rt = null)) : t = null, t === null) throw bl(e);
        return sr(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      var s = n.children;
      return n = n.fallback, a ? (Tl(), a = e.mode, s = li(
        { mode: "hidden", children: s },
        a
      ), n = $l(
        n,
        a,
        l,
        null
      ), s.return = e, n.return = e, s.sibling = n, e.child = s, n = e.child, n.memoizedState = _f(l), n.childLanes = Of(
        t,
        r,
        l
      ), e.memoizedState = Nf, Ua(null, n)) : (zl(e), Df(e, s));
    }
    var b = t.memoizedState;
    if (b !== null && (s = b.dehydrated, s !== null)) {
      if (i)
        e.flags & 256 ? (zl(e), e.flags &= -257, e = jf(
          t,
          e,
          l
        )) : e.memoizedState !== null ? (Tl(), e.child = t.child, e.flags |= 128, e = null) : (Tl(), s = n.fallback, a = e.mode, n = li(
          { mode: "visible", children: n.children },
          a
        ), s = $l(
          s,
          a,
          l,
          null
        ), s.flags |= 2, n.return = e, s.return = e, n.sibling = s, e.child = n, en(
          e,
          t.child,
          null,
          l
        ), n = e.child, n.memoizedState = _f(l), n.childLanes = Of(
          t,
          r,
          l
        ), e.memoizedState = Nf, e = Ua(null, n));
      else if (zl(e), sr(s)) {
        if (r = s.nextSibling && s.nextSibling.dataset, r) var O = r.dgst;
        r = O, n = Error(f(419)), n.stack = "", n.digest = r, xa({ value: n, source: null, stack: null }), e = jf(
          t,
          e,
          l
        );
      } else if (Jt || Dn(t, e, l, !1), r = (l & t.childLanes) !== 0, Jt || r) {
        if (r = jt, r !== null && (n = p0(r, l), n !== 0 && n !== b.retryLane))
          throw b.retryLane = n, Jl(t, n), he(r, t, n), zf;
        or(s) || si(), e = jf(
          t,
          e,
          l
        );
      } else
        or(s) ? (e.flags |= 192, e.child = t.child, e = null) : (t = b.treeContext, Rt = Ce(
          s.nextSibling
        ), Pt = e, St = !0, Sl = null, Re = !1, t !== null && yo(e, t), e = Df(
          e,
          n.children
        ), e.flags |= 4096);
      return e;
    }
    return a ? (Tl(), s = n.fallback, a = e.mode, b = t.child, O = b.sibling, n = Pe(b, {
      mode: "hidden",
      children: n.children
    }), n.subtreeFlags = b.subtreeFlags & 65011712, O !== null ? s = Pe(
      O,
      s
    ) : (s = $l(
      s,
      a,
      l,
      null
    ), s.flags |= 2), s.return = e, n.return = e, n.sibling = s, e.child = n, Ua(null, n), n = e.child, s = t.child.memoizedState, s === null ? s = _f(l) : (a = s.cachePool, a !== null ? (b = wt._currentValue, a = a.parent !== b ? { parent: b, pool: b } : a) : a = Eo(), s = {
      baseLanes: s.baseLanes | l,
      cachePool: a
    }), n.memoizedState = s, n.childLanes = Of(
      t,
      r,
      l
    ), e.memoizedState = Nf, Ua(t.child, n)) : (zl(e), l = t.child, t = l.sibling, l = Pe(l, {
      mode: "visible",
      children: n.children
    }), l.return = e, l.sibling = null, t !== null && (r = e.deletions, r === null ? (e.deletions = [t], e.flags |= 16) : r.push(t)), e.child = l, e.memoizedState = null, l);
  }
  function Df(t, e) {
    return e = li(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function li(t, e) {
    return t = be(22, t, null, e), t.lanes = 0, t;
  }
  function jf(t, e, l) {
    return en(e, t.child, null, l), t = Df(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function Us(t, e, l) {
    t.lanes |= e;
    var n = t.alternate;
    n !== null && (n.lanes |= e), wc(t.return, e, l);
  }
  function Hf(t, e, l, n, a, i) {
    var r = t.memoizedState;
    r === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: n,
      tail: l,
      tailMode: a,
      treeForkCount: i
    } : (r.isBackwards = e, r.rendering = null, r.renderingStartTime = 0, r.last = n, r.tail = l, r.tailMode = a, r.treeForkCount = i);
  }
  function Cs(t, e, l) {
    var n = e.pendingProps, a = n.revealOrder, i = n.tail;
    n = n.children;
    var r = Gt.current, s = (r & 2) !== 0;
    if (s ? (r = r & 1 | 2, e.flags |= 128) : r &= 1, X(Gt, r), ee(t, e, n, l), n = St ? Ea : 0, !s && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Us(t, l, e);
        else if (t.tag === 19)
          Us(t, l, e);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (a) {
      case "forwards":
        for (l = e.child, a = null; l !== null; )
          t = l.alternate, t !== null && Qu(t) === null && (a = l), l = l.sibling;
        l = a, l === null ? (a = e.child, e.child = null) : (a = l.sibling, l.sibling = null), Hf(
          e,
          !1,
          a,
          l,
          i,
          n
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, a = e.child, e.child = null; a !== null; ) {
          if (t = a.alternate, t !== null && Qu(t) === null) {
            e.child = a;
            break;
          }
          t = a.sibling, a.sibling = l, l = a, a = t;
        }
        Hf(
          e,
          !0,
          l,
          null,
          i,
          n
        );
        break;
      case "together":
        Hf(
          e,
          !1,
          null,
          null,
          void 0,
          n
        );
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function ul(t, e, l) {
    if (t !== null && (e.dependencies = t.dependencies), Ol |= e.lanes, (l & e.childLanes) === 0)
      if (t !== null) {
        if (Dn(
          t,
          e,
          l,
          !1
        ), (l & e.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && e.child !== t.child)
      throw Error(f(153));
    if (e.child !== null) {
      for (t = e.child, l = Pe(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        t = t.sibling, l = l.sibling = Pe(t, t.pendingProps), l.return = e;
      l.sibling = null;
    }
    return e.child;
  }
  function Rf(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && qu(t)));
  }
  function u2(t, e, l) {
    switch (e.tag) {
      case 3:
        ae(e, e.stateNode.containerInfo), El(e, wt, t.memoizedState.cache), Fl();
        break;
      case 27:
      case 5:
        ia(e);
        break;
      case 4:
        ae(e, e.stateNode.containerInfo);
        break;
      case 10:
        El(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, nf(e), null;
        break;
      case 13:
        var n = e.memoizedState;
        if (n !== null)
          return n.dehydrated !== null ? (zl(e), e.flags |= 128, null) : (l & e.child.childLanes) !== 0 ? Rs(t, e, l) : (zl(e), t = ul(
            t,
            e,
            l
          ), t !== null ? t.sibling : null);
        zl(e);
        break;
      case 19:
        var a = (t.flags & 128) !== 0;
        if (n = (l & e.childLanes) !== 0, n || (Dn(
          t,
          e,
          l,
          !1
        ), n = (l & e.childLanes) !== 0), a) {
          if (n)
            return Cs(
              t,
              e,
              l
            );
          e.flags |= 128;
        }
        if (a = e.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), X(Gt, Gt.current), n) break;
        return null;
      case 22:
        return e.lanes = 0, Ns(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        El(e, wt, t.memoizedState.cache);
    }
    return ul(t, e, l);
  }
  function qs(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        Jt = !0;
      else {
        if (!Rf(t, l) && (e.flags & 128) === 0)
          return Jt = !1, u2(
            t,
            e,
            l
          );
        Jt = (t.flags & 131072) !== 0;
      }
    else
      Jt = !1, St && (e.flags & 1048576) !== 0 && mo(e, Ea, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var n = e.pendingProps;
          if (t = Pl(e.elementType), e.type = t, typeof t == "function")
            Bc(t) ? (n = nn(t, n), e.tag = 1, e = js(
              null,
              e,
              t,
              n,
              l
            )) : (e.tag = 0, e = Tf(
              null,
              e,
              t,
              n,
              l
            ));
          else {
            if (t != null) {
              var a = t.$$typeof;
              if (a === w) {
                e.tag = 11, e = Ms(
                  null,
                  e,
                  t,
                  n,
                  l
                );
                break t;
              } else if (a === k) {
                e.tag = 14, e = zs(
                  null,
                  e,
                  t,
                  n,
                  l
                );
                break t;
              }
            }
            throw e = at(t) || t, Error(f(306, e, ""));
          }
        }
        return e;
      case 0:
        return Tf(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 1:
        return n = e.type, a = nn(
          n,
          e.pendingProps
        ), js(
          t,
          e,
          n,
          a,
          l
        );
      case 3:
        t: {
          if (ae(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(f(387));
          n = e.pendingProps;
          var i = e.memoizedState;
          a = i.element, Ic(t, e), Oa(e, n, null, l);
          var r = e.memoizedState;
          if (n = r.cache, El(e, wt, n), n !== i.cache && Kc(
            e,
            [wt],
            l,
            !0
          ), _a(), n = r.element, i.isDehydrated)
            if (i = {
              element: n,
              isDehydrated: !1,
              cache: r.cache
            }, e.updateQueue.baseState = i, e.memoizedState = i, e.flags & 256) {
              e = Hs(
                t,
                e,
                n,
                l
              );
              break t;
            } else if (n !== a) {
              a = De(
                Error(f(424)),
                e
              ), xa(a), e = Hs(
                t,
                e,
                n,
                l
              );
              break t;
            } else {
              switch (t = e.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (Rt = Ce(t.firstChild), Pt = e, St = !0, Sl = null, Re = !0, l = No(
                e,
                null,
                n,
                l
              ), e.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
            }
          else {
            if (Fl(), n === a) {
              e = ul(
                t,
                e,
                l
              );
              break t;
            }
            ee(t, e, n, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return ei(t, e), t === null ? (l = J1(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = l : St || (l = e.type, t = e.pendingProps, n = pi(
          mt.current
        ).createElement(l), n[It] = e, n[ce] = t, le(n, l, t), kt(n), e.stateNode = n) : e.memoizedState = J1(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return ia(e), t === null && St && (n = e.stateNode = Q1(
          e.type,
          e.pendingProps,
          mt.current
        ), Pt = e, Re = !0, a = Rt, Ul(e.type) ? (dr = a, Rt = Ce(n.firstChild)) : Rt = a), ee(
          t,
          e,
          e.pendingProps.children,
          l
        ), ei(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && St && ((a = n = Rt) && (n = C2(
          n,
          e.type,
          e.pendingProps,
          Re
        ), n !== null ? (e.stateNode = n, Pt = e, Rt = Ce(n.firstChild), Re = !1, a = !0) : a = !1), a || bl(e)), ia(e), a = e.type, i = e.pendingProps, r = t !== null ? t.memoizedProps : null, n = i.children, cr(a, i) ? n = null : r !== null && cr(a, r) && (e.flags |= 32), e.memoizedState !== null && (a = uf(
          t,
          e,
          km,
          null,
          null,
          l
        ), Fa._currentValue = a), ei(t, e), ee(t, e, n, l), e.child;
      case 6:
        return t === null && St && ((t = l = Rt) && (l = q2(
          l,
          e.pendingProps,
          Re
        ), l !== null ? (e.stateNode = l, Pt = e, Rt = null, t = !0) : t = !1), t || bl(e)), null;
      case 13:
        return Rs(t, e, l);
      case 4:
        return ae(
          e,
          e.stateNode.containerInfo
        ), n = e.pendingProps, t === null ? e.child = en(
          e,
          null,
          n,
          l
        ) : ee(t, e, n, l), e.child;
      case 11:
        return Ms(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 7:
        return ee(
          t,
          e,
          e.pendingProps,
          l
        ), e.child;
      case 8:
        return ee(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 12:
        return ee(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 10:
        return n = e.pendingProps, El(e, e.type, n.value), ee(t, e, n.children, l), e.child;
      case 9:
        return a = e.type._context, n = e.pendingProps.children, Wl(e), a = te(a), n = n(a), e.flags |= 1, ee(t, e, n, l), e.child;
      case 14:
        return zs(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 15:
        return Ts(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 19:
        return Cs(t, e, l);
      case 31:
        return a2(t, e, l);
      case 22:
        return Ns(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        return Wl(e), n = te(wt), t === null ? (a = Fc(), a === null && (a = jt, i = Jc(), a.pooledCache = i, i.refCount++, i !== null && (a.pooledCacheLanes |= l), a = i), e.memoizedState = { parent: n, cache: a }, Wc(e), El(e, wt, a)) : ((t.lanes & l) !== 0 && (Ic(t, e), Oa(e, null, null, l), _a()), a = t.memoizedState, i = e.memoizedState, a.parent !== n ? (a = { parent: n, cache: n }, e.memoizedState = a, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = a), El(e, wt, n)) : (n = i.cache, El(e, wt, n), n !== a.cache && Kc(
          e,
          [wt],
          l,
          !0
        ))), ee(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(f(156, e.tag));
  }
  function il(t) {
    t.flags |= 4;
  }
  function Uf(t, e, l, n, a) {
    if ((e = (t.mode & 32) !== 0) && (e = !1), e) {
      if (t.flags |= 16777216, (a & 335544128) === a)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (r1()) t.flags |= 8192;
        else
          throw tn = Lu, kc;
    } else t.flags &= -16777217;
  }
  function Bs(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !I1(e))
      if (r1()) t.flags |= 8192;
      else
        throw tn = Lu, kc;
  }
  function ni(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? y0() : 536870912, t.lanes |= e, Vn |= e);
  }
  function Ca(t, e) {
    if (!St)
      switch (t.tailMode) {
        case "hidden":
          e = t.tail;
          for (var l = null; e !== null; )
            e.alternate !== null && (l = e), e = e.sibling;
          l === null ? t.tail = null : l.sibling = null;
          break;
        case "collapsed":
          l = t.tail;
          for (var n = null; l !== null; )
            l.alternate !== null && (n = l), l = l.sibling;
          n === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : n.sibling = null;
      }
  }
  function Ut(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, l = 0, n = 0;
    if (e)
      for (var a = t.child; a !== null; )
        l |= a.lanes | a.childLanes, n |= a.subtreeFlags & 65011712, n |= a.flags & 65011712, a.return = t, a = a.sibling;
    else
      for (a = t.child; a !== null; )
        l |= a.lanes | a.childLanes, n |= a.subtreeFlags, n |= a.flags, a.return = t, a = a.sibling;
    return t.subtreeFlags |= n, t.childLanes = l, e;
  }
  function i2(t, e, l) {
    var n = e.pendingProps;
    switch (Gc(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ut(e), null;
      case 1:
        return Ut(e), null;
      case 3:
        return l = e.stateNode, n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), ll(wt), Lt(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (On(e) ? il(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, Xc())), Ut(e), null;
      case 26:
        var a = e.type, i = e.memoizedState;
        return t === null ? (il(e), i !== null ? (Ut(e), Bs(e, i)) : (Ut(e), Uf(
          e,
          a,
          null,
          n,
          l
        ))) : i ? i !== t.memoizedState ? (il(e), Ut(e), Bs(e, i)) : (Ut(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== n && il(e), Ut(e), Uf(
          e,
          a,
          t,
          n,
          l
        )), null;
      case 27:
        if (mu(e), l = mt.current, a = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== n && il(e);
        else {
          if (!n) {
            if (e.stateNode === null)
              throw Error(f(166));
            return Ut(e), null;
          }
          t = $.current, On(e) ? vo(e) : (t = Q1(a, n, l), e.stateNode = t, il(e));
        }
        return Ut(e), null;
      case 5:
        if (mu(e), a = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== n && il(e);
        else {
          if (!n) {
            if (e.stateNode === null)
              throw Error(f(166));
            return Ut(e), null;
          }
          if (i = $.current, On(e))
            vo(e);
          else {
            var r = pi(
              mt.current
            );
            switch (i) {
              case 1:
                i = r.createElementNS(
                  "http://www.w3.org/2000/svg",
                  a
                );
                break;
              case 2:
                i = r.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  a
                );
                break;
              default:
                switch (a) {
                  case "svg":
                    i = r.createElementNS(
                      "http://www.w3.org/2000/svg",
                      a
                    );
                    break;
                  case "math":
                    i = r.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      a
                    );
                    break;
                  case "script":
                    i = r.createElement("div"), i.innerHTML = "<script><\/script>", i = i.removeChild(
                      i.firstChild
                    );
                    break;
                  case "select":
                    i = typeof n.is == "string" ? r.createElement("select", {
                      is: n.is
                    }) : r.createElement("select"), n.multiple ? i.multiple = !0 : n.size && (i.size = n.size);
                    break;
                  default:
                    i = typeof n.is == "string" ? r.createElement(a, { is: n.is }) : r.createElement(a);
                }
            }
            i[It] = e, i[ce] = n;
            t: for (r = e.child; r !== null; ) {
              if (r.tag === 5 || r.tag === 6)
                i.appendChild(r.stateNode);
              else if (r.tag !== 4 && r.tag !== 27 && r.child !== null) {
                r.child.return = r, r = r.child;
                continue;
              }
              if (r === e) break t;
              for (; r.sibling === null; ) {
                if (r.return === null || r.return === e)
                  break t;
                r = r.return;
              }
              r.sibling.return = r.return, r = r.sibling;
            }
            e.stateNode = i;
            t: switch (le(i, a, n), a) {
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
            n && il(e);
          }
        }
        return Ut(e), Uf(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          l
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== n && il(e);
        else {
          if (typeof n != "string" && e.stateNode === null)
            throw Error(f(166));
          if (t = mt.current, On(e)) {
            if (t = e.stateNode, l = e.memoizedProps, n = null, a = Pt, a !== null)
              switch (a.tag) {
                case 27:
                case 5:
                  n = a.memoizedProps;
              }
            t[It] = e, t = !!(t.nodeValue === l || n !== null && n.suppressHydrationWarning === !0 || R1(t.nodeValue, l)), t || bl(e, !0);
          } else
            t = pi(t).createTextNode(
              n
            ), t[It] = e, e.stateNode = t;
        }
        return Ut(e), null;
      case 31:
        if (l = e.memoizedState, t === null || t.memoizedState !== null) {
          if (n = On(e), l !== null) {
            if (t === null) {
              if (!n) throw Error(f(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(f(557));
              t[It] = e;
            } else
              Fl(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Ut(e), t = !1;
          } else
            l = Xc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l), t = !0;
          if (!t)
            return e.flags & 256 ? (xe(e), e) : (xe(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(f(558));
        }
        return Ut(e), null;
      case 13:
        if (n = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (a = On(e), n !== null && n.dehydrated !== null) {
            if (t === null) {
              if (!a) throw Error(f(318));
              if (a = e.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(f(317));
              a[It] = e;
            } else
              Fl(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Ut(e), a = !1;
          } else
            a = Xc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), a = !0;
          if (!a)
            return e.flags & 256 ? (xe(e), e) : (xe(e), null);
        }
        return xe(e), (e.flags & 128) !== 0 ? (e.lanes = l, e) : (l = n !== null, t = t !== null && t.memoizedState !== null, l && (n = e.child, a = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (a = n.alternate.memoizedState.cachePool.pool), i = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (i = n.memoizedState.cachePool.pool), i !== a && (n.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), ni(e, e.updateQueue), Ut(e), null);
      case 4:
        return Lt(), t === null && lr(e.stateNode.containerInfo), Ut(e), null;
      case 10:
        return ll(e.type), Ut(e), null;
      case 19:
        if (q(Gt), n = e.memoizedState, n === null) return Ut(e), null;
        if (a = (e.flags & 128) !== 0, i = n.rendering, i === null)
          if (a) Ca(n, !1);
          else {
            if (Yt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (i = Qu(t), i !== null) {
                  for (e.flags |= 128, Ca(n, !1), t = i.updateQueue, e.updateQueue = t, ni(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                    oo(l, t), l = l.sibling;
                  return X(
                    Gt,
                    Gt.current & 1 | 2
                  ), St && tl(e, n.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            n.tail !== null && ve() > fi && (e.flags |= 128, a = !0, Ca(n, !1), e.lanes = 4194304);
          }
        else {
          if (!a)
            if (t = Qu(i), t !== null) {
              if (e.flags |= 128, a = !0, t = t.updateQueue, e.updateQueue = t, ni(e, t), Ca(n, !0), n.tail === null && n.tailMode === "hidden" && !i.alternate && !St)
                return Ut(e), null;
            } else
              2 * ve() - n.renderingStartTime > fi && l !== 536870912 && (e.flags |= 128, a = !0, Ca(n, !1), e.lanes = 4194304);
          n.isBackwards ? (i.sibling = e.child, e.child = i) : (t = n.last, t !== null ? t.sibling = i : e.child = i, n.last = i);
        }
        return n.tail !== null ? (t = n.tail, n.rendering = t, n.tail = t.sibling, n.renderingStartTime = ve(), t.sibling = null, l = Gt.current, X(
          Gt,
          a ? l & 1 | 2 : l & 1
        ), St && tl(e, n.treeForkCount), t) : (Ut(e), null);
      case 22:
      case 23:
        return xe(e), lf(), n = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== n && (e.flags |= 8192) : n && (e.flags |= 8192), n ? (l & 536870912) !== 0 && (e.flags & 128) === 0 && (Ut(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Ut(e), l = e.updateQueue, l !== null && ni(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), n = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), n !== l && (e.flags |= 2048), t !== null && q(Il), null;
      case 24:
        return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), ll(wt), Ut(e), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(f(156, e.tag));
  }
  function c2(t, e) {
    switch (Gc(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return ll(wt), Lt(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return mu(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (xe(e), e.alternate === null)
            throw Error(f(340));
          Fl();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (xe(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(f(340));
          Fl();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return q(Gt), null;
      case 4:
        return Lt(), null;
      case 10:
        return ll(e.type), null;
      case 22:
      case 23:
        return xe(e), lf(), t !== null && q(Il), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return ll(wt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Zs(t, e) {
    switch (Gc(e), e.tag) {
      case 3:
        ll(wt), Lt();
        break;
      case 26:
      case 27:
      case 5:
        mu(e);
        break;
      case 4:
        Lt();
        break;
      case 31:
        e.memoizedState !== null && xe(e);
        break;
      case 13:
        xe(e);
        break;
      case 19:
        q(Gt);
        break;
      case 10:
        ll(e.type);
        break;
      case 22:
      case 23:
        xe(e), lf(), t !== null && q(Il);
        break;
      case 24:
        ll(wt);
    }
  }
  function qa(t, e) {
    try {
      var l = e.updateQueue, n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var a = n.next;
        l = a;
        do {
          if ((l.tag & t) === t) {
            n = void 0;
            var i = l.create, r = l.inst;
            n = i(), r.destroy = n;
          }
          l = l.next;
        } while (l !== a);
      }
    } catch (s) {
      Nt(e, e.return, s);
    }
  }
  function Nl(t, e, l) {
    try {
      var n = e.updateQueue, a = n !== null ? n.lastEffect : null;
      if (a !== null) {
        var i = a.next;
        n = i;
        do {
          if ((n.tag & t) === t) {
            var r = n.inst, s = r.destroy;
            if (s !== void 0) {
              r.destroy = void 0, a = e;
              var b = l, O = s;
              try {
                O();
              } catch (R) {
                Nt(
                  a,
                  b,
                  R
                );
              }
            }
          }
          n = n.next;
        } while (n !== i);
      }
    } catch (R) {
      Nt(e, e.return, R);
    }
  }
  function Ys(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        Oo(e, l);
      } catch (n) {
        Nt(t, t.return, n);
      }
    }
  }
  function Ls(t, e, l) {
    l.props = nn(
      t.type,
      t.memoizedProps
    ), l.state = t.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (n) {
      Nt(t, e, n);
    }
  }
  function Ba(t, e) {
    try {
      var l = t.ref;
      if (l !== null) {
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
        typeof l == "function" ? t.refCleanup = l(n) : l.current = n;
      }
    } catch (a) {
      Nt(t, e, a);
    }
  }
  function we(t, e) {
    var l = t.ref, n = t.refCleanup;
    if (l !== null)
      if (typeof n == "function")
        try {
          n();
        } catch (a) {
          Nt(t, e, a);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (a) {
          Nt(t, e, a);
        }
      else l.current = null;
  }
  function Gs(t) {
    var e = t.type, l = t.memoizedProps, n = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && n.focus();
          break t;
        case "img":
          l.src ? n.src = l.src : l.srcSet && (n.srcset = l.srcSet);
      }
    } catch (a) {
      Nt(t, t.return, a);
    }
  }
  function Cf(t, e, l) {
    try {
      var n = t.stateNode;
      O2(n, t.type, l, e), n[ce] = e;
    } catch (a) {
      Nt(t, t.return, a);
    }
  }
  function Vs(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Ul(t.type) || t.tag === 4;
  }
  function qf(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Vs(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Ul(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Bf(t, e, l) {
    var n = t.tag;
    if (n === 5 || n === 6)
      t = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(t, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(t), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = We));
    else if (n !== 4 && (n === 27 && Ul(t.type) && (l = t.stateNode, e = null), t = t.child, t !== null))
      for (Bf(t, e, l), t = t.sibling; t !== null; )
        Bf(t, e, l), t = t.sibling;
  }
  function ai(t, e, l) {
    var n = t.tag;
    if (n === 5 || n === 6)
      t = t.stateNode, e ? l.insertBefore(t, e) : l.appendChild(t);
    else if (n !== 4 && (n === 27 && Ul(t.type) && (l = t.stateNode), t = t.child, t !== null))
      for (ai(t, e, l), t = t.sibling; t !== null; )
        ai(t, e, l), t = t.sibling;
  }
  function Xs(t) {
    var e = t.stateNode, l = t.memoizedProps;
    try {
      for (var n = t.type, a = e.attributes; a.length; )
        e.removeAttributeNode(a[0]);
      le(e, n, l), e[It] = t, e[ce] = l;
    } catch (i) {
      Nt(t, t.return, i);
    }
  }
  var cl = !1, $t = !1, Zf = !1, Qs = typeof WeakSet == "function" ? WeakSet : Set, Wt = null;
  function f2(t, e) {
    if (t = t.containerInfo, ur = zi, t = eo(t), Dc(t)) {
      if ("selectionStart" in t)
        var l = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          l = (l = t.ownerDocument) && l.defaultView || window;
          var n = l.getSelection && l.getSelection();
          if (n && n.rangeCount !== 0) {
            l = n.anchorNode;
            var a = n.anchorOffset, i = n.focusNode;
            n = n.focusOffset;
            try {
              l.nodeType, i.nodeType;
            } catch {
              l = null;
              break t;
            }
            var r = 0, s = -1, b = -1, O = 0, R = 0, Z = t, D = null;
            e: for (; ; ) {
              for (var j; Z !== l || a !== 0 && Z.nodeType !== 3 || (s = r + a), Z !== i || n !== 0 && Z.nodeType !== 3 || (b = r + n), Z.nodeType === 3 && (r += Z.nodeValue.length), (j = Z.firstChild) !== null; )
                D = Z, Z = j;
              for (; ; ) {
                if (Z === t) break e;
                if (D === l && ++O === a && (s = r), D === i && ++R === n && (b = r), (j = Z.nextSibling) !== null) break;
                Z = D, D = Z.parentNode;
              }
              Z = j;
            }
            l = s === -1 || b === -1 ? null : { start: s, end: b };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (ir = { focusedElem: t, selectionRange: l }, zi = !1, Wt = e; Wt !== null; )
      if (e = Wt, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = e, Wt = t;
      else
        for (; Wt !== null; ) {
          switch (e = Wt, i = e.alternate, t = e.flags, e.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = e.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (l = 0; l < t.length; l++)
                  a = t[l], a.ref.impl = a.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && i !== null) {
                t = void 0, l = e, a = i.memoizedProps, i = i.memoizedState, n = l.stateNode;
                try {
                  var W = nn(
                    l.type,
                    a
                  );
                  t = n.getSnapshotBeforeUpdate(
                    W,
                    i
                  ), n.__reactInternalSnapshotBeforeUpdate = t;
                } catch (nt) {
                  Nt(
                    l,
                    l.return,
                    nt
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = e.stateNode.containerInfo, l = t.nodeType, l === 9)
                  rr(t);
                else if (l === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      rr(t);
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
              if ((t & 1024) !== 0) throw Error(f(163));
          }
          if (t = e.sibling, t !== null) {
            t.return = e.return, Wt = t;
            break;
          }
          Wt = e.return;
        }
  }
  function ws(t, e, l) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        rl(t, l), n & 4 && qa(5, l);
        break;
      case 1:
        if (rl(t, l), n & 4)
          if (t = l.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (r) {
              Nt(l, l.return, r);
            }
          else {
            var a = nn(
              l.type,
              e.memoizedProps
            );
            e = e.memoizedState;
            try {
              t.componentDidUpdate(
                a,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (r) {
              Nt(
                l,
                l.return,
                r
              );
            }
          }
        n & 64 && Ys(l), n & 512 && Ba(l, l.return);
        break;
      case 3:
        if (rl(t, l), n & 64 && (t = l.updateQueue, t !== null)) {
          if (e = null, l.child !== null)
            switch (l.child.tag) {
              case 27:
              case 5:
                e = l.child.stateNode;
                break;
              case 1:
                e = l.child.stateNode;
            }
          try {
            Oo(t, e);
          } catch (r) {
            Nt(l, l.return, r);
          }
        }
        break;
      case 27:
        e === null && n & 4 && Xs(l);
      case 26:
      case 5:
        rl(t, l), e === null && n & 4 && Gs(l), n & 512 && Ba(l, l.return);
        break;
      case 12:
        rl(t, l);
        break;
      case 31:
        rl(t, l), n & 4 && $s(t, l);
        break;
      case 13:
        rl(t, l), n & 4 && Fs(t, l), n & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = g2.bind(
          null,
          l
        ), B2(t, l))));
        break;
      case 22:
        if (n = l.memoizedState !== null || cl, !n) {
          e = e !== null && e.memoizedState !== null || $t, a = cl;
          var i = $t;
          cl = n, ($t = e) && !i ? ol(
            t,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : rl(t, l), cl = a, $t = i;
        }
        break;
      case 30:
        break;
      default:
        rl(t, l);
    }
  }
  function Ks(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, Ks(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && hc(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Ct = null, re = !1;
  function fl(t, e, l) {
    for (l = l.child; l !== null; )
      Js(t, e, l), l = l.sibling;
  }
  function Js(t, e, l) {
    if (ge && typeof ge.onCommitFiberUnmount == "function")
      try {
        ge.onCommitFiberUnmount(ca, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        $t || we(l, e), fl(
          t,
          e,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        $t || we(l, e);
        var n = Ct, a = re;
        Ul(l.type) && (Ct = l.stateNode, re = !1), fl(
          t,
          e,
          l
        ), Ka(l.stateNode), Ct = n, re = a;
        break;
      case 5:
        $t || we(l, e);
      case 6:
        if (n = Ct, a = re, Ct = null, fl(
          t,
          e,
          l
        ), Ct = n, re = a, Ct !== null)
          if (re)
            try {
              (Ct.nodeType === 9 ? Ct.body : Ct.nodeName === "HTML" ? Ct.ownerDocument.body : Ct).removeChild(l.stateNode);
            } catch (i) {
              Nt(
                l,
                e,
                i
              );
            }
          else
            try {
              Ct.removeChild(l.stateNode);
            } catch (i) {
              Nt(
                l,
                e,
                i
              );
            }
        break;
      case 18:
        Ct !== null && (re ? (t = Ct, Y1(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          l.stateNode
        ), kn(t)) : Y1(Ct, l.stateNode));
        break;
      case 4:
        n = Ct, a = re, Ct = l.stateNode.containerInfo, re = !0, fl(
          t,
          e,
          l
        ), Ct = n, re = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Nl(2, l, e), $t || Nl(4, l, e), fl(
          t,
          e,
          l
        );
        break;
      case 1:
        $t || (we(l, e), n = l.stateNode, typeof n.componentWillUnmount == "function" && Ls(
          l,
          e,
          n
        )), fl(
          t,
          e,
          l
        );
        break;
      case 21:
        fl(
          t,
          e,
          l
        );
        break;
      case 22:
        $t = (n = $t) || l.memoizedState !== null, fl(
          t,
          e,
          l
        ), $t = n;
        break;
      default:
        fl(
          t,
          e,
          l
        );
    }
  }
  function $s(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        kn(t);
      } catch (l) {
        Nt(e, e.return, l);
      }
    }
  }
  function Fs(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        kn(t);
      } catch (l) {
        Nt(e, e.return, l);
      }
  }
  function r2(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new Qs()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new Qs()), e;
      default:
        throw Error(f(435, t.tag));
    }
  }
  function ui(t, e) {
    var l = r2(t);
    e.forEach(function(n) {
      if (!l.has(n)) {
        l.add(n);
        var a = p2.bind(null, t, n);
        n.then(a, a);
      }
    });
  }
  function oe(t, e) {
    var l = e.deletions;
    if (l !== null)
      for (var n = 0; n < l.length; n++) {
        var a = l[n], i = t, r = e, s = r;
        t: for (; s !== null; ) {
          switch (s.tag) {
            case 27:
              if (Ul(s.type)) {
                Ct = s.stateNode, re = !1;
                break t;
              }
              break;
            case 5:
              Ct = s.stateNode, re = !1;
              break t;
            case 3:
            case 4:
              Ct = s.stateNode.containerInfo, re = !0;
              break t;
          }
          s = s.return;
        }
        if (Ct === null) throw Error(f(160));
        Js(i, r, a), Ct = null, re = !1, i = a.alternate, i !== null && (i.return = null), a.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        ks(e, t), e = e.sibling;
  }
  var Le = null;
  function ks(t, e) {
    var l = t.alternate, n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        oe(e, t), se(t), n & 4 && (Nl(3, t, t.return), qa(3, t), Nl(5, t, t.return));
        break;
      case 1:
        oe(e, t), se(t), n & 512 && ($t || l === null || we(l, l.return)), n & 64 && cl && (t = t.updateQueue, t !== null && (n = t.callbacks, n !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? n : l.concat(n))));
        break;
      case 26:
        var a = Le;
        if (oe(e, t), se(t), n & 512 && ($t || l === null || we(l, l.return)), n & 4) {
          var i = l !== null ? l.memoizedState : null;
          if (n = t.memoizedState, l === null)
            if (n === null)
              if (t.stateNode === null) {
                t: {
                  n = t.type, l = t.memoizedProps, a = a.ownerDocument || a;
                  e: switch (n) {
                    case "title":
                      i = a.getElementsByTagName("title")[0], (!i || i[oa] || i[It] || i.namespaceURI === "http://www.w3.org/2000/svg" || i.hasAttribute("itemprop")) && (i = a.createElement(n), a.head.insertBefore(
                        i,
                        a.querySelector("head > title")
                      )), le(i, n, l), i[It] = t, kt(i), n = i;
                      break t;
                    case "link":
                      var r = k1(
                        "link",
                        "href",
                        a
                      ).get(n + (l.href || ""));
                      if (r) {
                        for (var s = 0; s < r.length; s++)
                          if (i = r[s], i.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && i.getAttribute("rel") === (l.rel == null ? null : l.rel) && i.getAttribute("title") === (l.title == null ? null : l.title) && i.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            r.splice(s, 1);
                            break e;
                          }
                      }
                      i = a.createElement(n), le(i, n, l), a.head.appendChild(i);
                      break;
                    case "meta":
                      if (r = k1(
                        "meta",
                        "content",
                        a
                      ).get(n + (l.content || ""))) {
                        for (s = 0; s < r.length; s++)
                          if (i = r[s], i.getAttribute("content") === (l.content == null ? null : "" + l.content) && i.getAttribute("name") === (l.name == null ? null : l.name) && i.getAttribute("property") === (l.property == null ? null : l.property) && i.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && i.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            r.splice(s, 1);
                            break e;
                          }
                      }
                      i = a.createElement(n), le(i, n, l), a.head.appendChild(i);
                      break;
                    default:
                      throw Error(f(468, n));
                  }
                  i[It] = t, kt(i), n = i;
                }
                t.stateNode = n;
              } else
                W1(
                  a,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = F1(
                a,
                n,
                t.memoizedProps
              );
          else
            i !== n ? (i === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : i.count--, n === null ? W1(
              a,
              t.type,
              t.stateNode
            ) : F1(
              a,
              n,
              t.memoizedProps
            )) : n === null && t.stateNode !== null && Cf(
              t,
              t.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        oe(e, t), se(t), n & 512 && ($t || l === null || we(l, l.return)), l !== null && n & 4 && Cf(
          t,
          t.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (oe(e, t), se(t), n & 512 && ($t || l === null || we(l, l.return)), t.flags & 32) {
          a = t.stateNode;
          try {
            Sn(a, "");
          } catch (W) {
            Nt(t, t.return, W);
          }
        }
        n & 4 && t.stateNode != null && (a = t.memoizedProps, Cf(
          t,
          a,
          l !== null ? l.memoizedProps : a
        )), n & 1024 && (Zf = !0);
        break;
      case 6:
        if (oe(e, t), se(t), n & 4) {
          if (t.stateNode === null)
            throw Error(f(162));
          n = t.memoizedProps, l = t.stateNode;
          try {
            l.nodeValue = n;
          } catch (W) {
            Nt(t, t.return, W);
          }
        }
        break;
      case 3:
        if (Ei = null, a = Le, Le = Si(e.containerInfo), oe(e, t), Le = a, se(t), n & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            kn(e.containerInfo);
          } catch (W) {
            Nt(t, t.return, W);
          }
        Zf && (Zf = !1, Ws(t));
        break;
      case 4:
        n = Le, Le = Si(
          t.stateNode.containerInfo
        ), oe(e, t), se(t), Le = n;
        break;
      case 12:
        oe(e, t), se(t);
        break;
      case 31:
        oe(e, t), se(t), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, ui(t, n)));
        break;
      case 13:
        oe(e, t), se(t), t.child.flags & 8192 && t.memoizedState !== null != (l !== null && l.memoizedState !== null) && (ci = ve()), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, ui(t, n)));
        break;
      case 22:
        a = t.memoizedState !== null;
        var b = l !== null && l.memoizedState !== null, O = cl, R = $t;
        if (cl = O || a, $t = R || b, oe(e, t), $t = R, cl = O, se(t), n & 8192)
          t: for (e = t.stateNode, e._visibility = a ? e._visibility & -2 : e._visibility | 1, a && (l === null || b || cl || $t || an(t)), l = null, e = t; ; ) {
            if (e.tag === 5 || e.tag === 26) {
              if (l === null) {
                b = l = e;
                try {
                  if (i = b.stateNode, a)
                    r = i.style, typeof r.setProperty == "function" ? r.setProperty("display", "none", "important") : r.display = "none";
                  else {
                    s = b.stateNode;
                    var Z = b.memoizedProps.style, D = Z != null && Z.hasOwnProperty("display") ? Z.display : null;
                    s.style.display = D == null || typeof D == "boolean" ? "" : ("" + D).trim();
                  }
                } catch (W) {
                  Nt(b, b.return, W);
                }
              }
            } else if (e.tag === 6) {
              if (l === null) {
                b = e;
                try {
                  b.stateNode.nodeValue = a ? "" : b.memoizedProps;
                } catch (W) {
                  Nt(b, b.return, W);
                }
              }
            } else if (e.tag === 18) {
              if (l === null) {
                b = e;
                try {
                  var j = b.stateNode;
                  a ? L1(j, !0) : L1(b.stateNode, !1);
                } catch (W) {
                  Nt(b, b.return, W);
                }
              }
            } else if ((e.tag !== 22 && e.tag !== 23 || e.memoizedState === null || e === t) && e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              l === e && (l = null), e = e.return;
            }
            l === e && (l = null), e.sibling.return = e.return, e = e.sibling;
          }
        n & 4 && (n = t.updateQueue, n !== null && (l = n.retryQueue, l !== null && (n.retryQueue = null, ui(t, l))));
        break;
      case 19:
        oe(e, t), se(t), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, ui(t, n)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        oe(e, t), se(t);
    }
  }
  function se(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var l, n = t.return; n !== null; ) {
          if (Vs(n)) {
            l = n;
            break;
          }
          n = n.return;
        }
        if (l == null) throw Error(f(160));
        switch (l.tag) {
          case 27:
            var a = l.stateNode, i = qf(t);
            ai(t, i, a);
            break;
          case 5:
            var r = l.stateNode;
            l.flags & 32 && (Sn(r, ""), l.flags &= -33);
            var s = qf(t);
            ai(t, s, r);
            break;
          case 3:
          case 4:
            var b = l.stateNode.containerInfo, O = qf(t);
            Bf(
              t,
              O,
              b
            );
            break;
          default:
            throw Error(f(161));
        }
      } catch (R) {
        Nt(t, t.return, R);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Ws(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Ws(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
      }
  }
  function rl(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        ws(t, e.alternate, e), e = e.sibling;
  }
  function an(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Nl(4, e, e.return), an(e);
          break;
        case 1:
          we(e, e.return);
          var l = e.stateNode;
          typeof l.componentWillUnmount == "function" && Ls(
            e,
            e.return,
            l
          ), an(e);
          break;
        case 27:
          Ka(e.stateNode);
        case 26:
        case 5:
          we(e, e.return), an(e);
          break;
        case 22:
          e.memoizedState === null && an(e);
          break;
        case 30:
          an(e);
          break;
        default:
          an(e);
      }
      t = t.sibling;
    }
  }
  function ol(t, e, l) {
    for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var n = e.alternate, a = t, i = e, r = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          ol(
            a,
            i,
            l
          ), qa(4, i);
          break;
        case 1:
          if (ol(
            a,
            i,
            l
          ), n = i, a = n.stateNode, typeof a.componentDidMount == "function")
            try {
              a.componentDidMount();
            } catch (O) {
              Nt(n, n.return, O);
            }
          if (n = i, a = n.updateQueue, a !== null) {
            var s = n.stateNode;
            try {
              var b = a.shared.hiddenCallbacks;
              if (b !== null)
                for (a.shared.hiddenCallbacks = null, a = 0; a < b.length; a++)
                  _o(b[a], s);
            } catch (O) {
              Nt(n, n.return, O);
            }
          }
          l && r & 64 && Ys(i), Ba(i, i.return);
          break;
        case 27:
          Xs(i);
        case 26:
        case 5:
          ol(
            a,
            i,
            l
          ), l && n === null && r & 4 && Gs(i), Ba(i, i.return);
          break;
        case 12:
          ol(
            a,
            i,
            l
          );
          break;
        case 31:
          ol(
            a,
            i,
            l
          ), l && r & 4 && $s(a, i);
          break;
        case 13:
          ol(
            a,
            i,
            l
          ), l && r & 4 && Fs(a, i);
          break;
        case 22:
          i.memoizedState === null && ol(
            a,
            i,
            l
          ), Ba(i, i.return);
          break;
        case 30:
          break;
        default:
          ol(
            a,
            i,
            l
          );
      }
      e = e.sibling;
    }
  }
  function Yf(t, e) {
    var l = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && t.refCount++, l != null && Aa(l));
  }
  function Lf(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Aa(t));
  }
  function Ge(t, e, l, n) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Is(
          t,
          e,
          l,
          n
        ), e = e.sibling;
  }
  function Is(t, e, l, n) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Ge(
          t,
          e,
          l,
          n
        ), a & 2048 && qa(9, e);
        break;
      case 1:
        Ge(
          t,
          e,
          l,
          n
        );
        break;
      case 3:
        Ge(
          t,
          e,
          l,
          n
        ), a & 2048 && (t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Aa(t)));
        break;
      case 12:
        if (a & 2048) {
          Ge(
            t,
            e,
            l,
            n
          ), t = e.stateNode;
          try {
            var i = e.memoizedProps, r = i.id, s = i.onPostCommit;
            typeof s == "function" && s(
              r,
              e.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (b) {
            Nt(e, e.return, b);
          }
        } else
          Ge(
            t,
            e,
            l,
            n
          );
        break;
      case 31:
        Ge(
          t,
          e,
          l,
          n
        );
        break;
      case 13:
        Ge(
          t,
          e,
          l,
          n
        );
        break;
      case 23:
        break;
      case 22:
        i = e.stateNode, r = e.alternate, e.memoizedState !== null ? i._visibility & 2 ? Ge(
          t,
          e,
          l,
          n
        ) : Za(t, e) : i._visibility & 2 ? Ge(
          t,
          e,
          l,
          n
        ) : (i._visibility |= 2, Yn(
          t,
          e,
          l,
          n,
          (e.subtreeFlags & 10256) !== 0 || !1
        )), a & 2048 && Yf(r, e);
        break;
      case 24:
        Ge(
          t,
          e,
          l,
          n
        ), a & 2048 && Lf(e.alternate, e);
        break;
      default:
        Ge(
          t,
          e,
          l,
          n
        );
    }
  }
  function Yn(t, e, l, n, a) {
    for (a = a && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var i = t, r = e, s = l, b = n, O = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          Yn(
            i,
            r,
            s,
            b,
            a
          ), qa(8, r);
          break;
        case 23:
          break;
        case 22:
          var R = r.stateNode;
          r.memoizedState !== null ? R._visibility & 2 ? Yn(
            i,
            r,
            s,
            b,
            a
          ) : Za(
            i,
            r
          ) : (R._visibility |= 2, Yn(
            i,
            r,
            s,
            b,
            a
          )), a && O & 2048 && Yf(
            r.alternate,
            r
          );
          break;
        case 24:
          Yn(
            i,
            r,
            s,
            b,
            a
          ), a && O & 2048 && Lf(r.alternate, r);
          break;
        default:
          Yn(
            i,
            r,
            s,
            b,
            a
          );
      }
      e = e.sibling;
    }
  }
  function Za(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t, n = e, a = n.flags;
        switch (n.tag) {
          case 22:
            Za(l, n), a & 2048 && Yf(
              n.alternate,
              n
            );
            break;
          case 24:
            Za(l, n), a & 2048 && Lf(n.alternate, n);
            break;
          default:
            Za(l, n);
        }
        e = e.sibling;
      }
  }
  var Ya = 8192;
  function Ln(t, e, l) {
    if (t.subtreeFlags & Ya)
      for (t = t.child; t !== null; )
        Ps(
          t,
          e,
          l
        ), t = t.sibling;
  }
  function Ps(t, e, l) {
    switch (t.tag) {
      case 26:
        Ln(
          t,
          e,
          l
        ), t.flags & Ya && t.memoizedState !== null && F2(
          l,
          Le,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Ln(
          t,
          e,
          l
        );
        break;
      case 3:
      case 4:
        var n = Le;
        Le = Si(t.stateNode.containerInfo), Ln(
          t,
          e,
          l
        ), Le = n;
        break;
      case 22:
        t.memoizedState === null && (n = t.alternate, n !== null && n.memoizedState !== null ? (n = Ya, Ya = 16777216, Ln(
          t,
          e,
          l
        ), Ya = n) : Ln(
          t,
          e,
          l
        ));
        break;
      default:
        Ln(
          t,
          e,
          l
        );
    }
  }
  function t1(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function La(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var n = e[l];
          Wt = n, l1(
            n,
            t
          );
        }
      t1(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        e1(t), t = t.sibling;
  }
  function e1(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        La(t), t.flags & 2048 && Nl(9, t, t.return);
        break;
      case 3:
        La(t);
        break;
      case 12:
        La(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, ii(t)) : La(t);
        break;
      default:
        La(t);
    }
  }
  function ii(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var n = e[l];
          Wt = n, l1(
            n,
            t
          );
        }
      t1(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          Nl(8, e, e.return), ii(e);
          break;
        case 22:
          l = e.stateNode, l._visibility & 2 && (l._visibility &= -3, ii(e));
          break;
        default:
          ii(e);
      }
      t = t.sibling;
    }
  }
  function l1(t, e) {
    for (; Wt !== null; ) {
      var l = Wt;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Nl(8, l, e);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var n = l.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          Aa(l.memoizedState.cache);
      }
      if (n = l.child, n !== null) n.return = l, Wt = n;
      else
        t: for (l = t; Wt !== null; ) {
          n = Wt;
          var a = n.sibling, i = n.return;
          if (Ks(n), n === l) {
            Wt = null;
            break t;
          }
          if (a !== null) {
            a.return = i, Wt = a;
            break t;
          }
          Wt = i;
        }
    }
  }
  var o2 = {
    getCacheForType: function(t) {
      var e = te(wt), l = e.data.get(t);
      return l === void 0 && (l = t(), e.data.set(t, l)), l;
    },
    cacheSignal: function() {
      return te(wt).controller.signal;
    }
  }, s2 = typeof WeakMap == "function" ? WeakMap : Map, Mt = 0, jt = null, yt = null, gt = 0, Tt = 0, Ae = null, _l = !1, Gn = !1, Gf = !1, sl = 0, Yt = 0, Ol = 0, un = 0, Vf = 0, Me = 0, Vn = 0, Ga = null, de = null, Xf = !1, ci = 0, n1 = 0, fi = 1 / 0, ri = null, Dl = null, Ft = 0, jl = null, Xn = null, dl = 0, Qf = 0, wf = null, a1 = null, Va = 0, Kf = null;
  function ze() {
    return (Mt & 2) !== 0 && gt !== 0 ? gt & -gt : T.T !== null ? If() : S0();
  }
  function u1() {
    if (Me === 0)
      if ((gt & 536870912) === 0 || St) {
        var t = gu;
        gu <<= 1, (gu & 3932160) === 0 && (gu = 262144), Me = t;
      } else Me = 536870912;
    return t = Ee.current, t !== null && (t.flags |= 32), Me;
  }
  function he(t, e, l) {
    (t === jt && (Tt === 2 || Tt === 9) || t.cancelPendingCommit !== null) && (Qn(t, 0), Hl(
      t,
      gt,
      Me,
      !1
    )), ra(t, l), ((Mt & 2) === 0 || t !== jt) && (t === jt && ((Mt & 2) === 0 && (un |= l), Yt === 4 && Hl(
      t,
      gt,
      Me,
      !1
    )), Ke(t));
  }
  function i1(t, e, l) {
    if ((Mt & 6) !== 0) throw Error(f(327));
    var n = !l && (e & 127) === 0 && (e & t.expiredLanes) === 0 || fa(t, e), a = n ? m2(t, e) : $f(t, e, !0), i = n;
    do {
      if (a === 0) {
        Gn && !n && Hl(t, e, 0, !1);
        break;
      } else {
        if (l = t.current.alternate, i && !d2(l)) {
          a = $f(t, e, !1), i = !1;
          continue;
        }
        if (a === 2) {
          if (i = e, t.errorRecoveryDisabledLanes & i)
            var r = 0;
          else
            r = t.pendingLanes & -536870913, r = r !== 0 ? r : r & 536870912 ? 536870912 : 0;
          if (r !== 0) {
            e = r;
            t: {
              var s = t;
              a = Ga;
              var b = s.current.memoizedState.isDehydrated;
              if (b && (Qn(s, r).flags |= 256), r = $f(
                s,
                r,
                !1
              ), r !== 2) {
                if (Gf && !b) {
                  s.errorRecoveryDisabledLanes |= i, un |= i, a = 4;
                  break t;
                }
                i = de, de = a, i !== null && (de === null ? de = i : de.push.apply(
                  de,
                  i
                ));
              }
              a = r;
            }
            if (i = !1, a !== 2) continue;
          }
        }
        if (a === 1) {
          Qn(t, 0), Hl(t, e, 0, !0);
          break;
        }
        t: {
          switch (n = t, i = a, i) {
            case 0:
            case 1:
              throw Error(f(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              Hl(
                n,
                e,
                Me,
                !_l
              );
              break t;
            case 2:
              de = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(f(329));
          }
          if ((e & 62914560) === e && (a = ci + 300 - ve(), 10 < a)) {
            if (Hl(
              n,
              e,
              Me,
              !_l
            ), Su(n, 0, !0) !== 0) break t;
            dl = e, n.timeoutHandle = B1(
              c1.bind(
                null,
                n,
                l,
                de,
                ri,
                Xf,
                e,
                Me,
                un,
                Vn,
                _l,
                i,
                "Throttled",
                -0,
                0
              ),
              a
            );
            break t;
          }
          c1(
            n,
            l,
            de,
            ri,
            Xf,
            e,
            Me,
            un,
            Vn,
            _l,
            i,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Ke(t);
  }
  function c1(t, e, l, n, a, i, r, s, b, O, R, Z, D, j) {
    if (t.timeoutHandle = -1, Z = e.subtreeFlags, Z & 8192 || (Z & 16785408) === 16785408) {
      Z = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: We
      }, Ps(
        e,
        i,
        Z
      );
      var W = (i & 62914560) === i ? ci - ve() : (i & 4194048) === i ? n1 - ve() : 0;
      if (W = k2(
        Z,
        W
      ), W !== null) {
        dl = i, t.cancelPendingCommit = W(
          y1.bind(
            null,
            t,
            e,
            i,
            l,
            n,
            a,
            r,
            s,
            b,
            R,
            Z,
            null,
            D,
            j
          )
        ), Hl(t, i, r, !O);
        return;
      }
    }
    y1(
      t,
      e,
      i,
      l,
      n,
      a,
      r,
      s,
      b
    );
  }
  function d2(t) {
    for (var e = t; ; ) {
      var l = e.tag;
      if ((l === 0 || l === 11 || l === 15) && e.flags & 16384 && (l = e.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var n = 0; n < l.length; n++) {
          var a = l[n], i = a.getSnapshot;
          a = a.value;
          try {
            if (!Se(i(), a)) return !1;
          } catch {
            return !1;
          }
        }
      if (l = e.child, e.subtreeFlags & 16384 && l !== null)
        l.return = e, e = l;
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    }
    return !0;
  }
  function Hl(t, e, l, n) {
    e &= ~Vf, e &= ~un, t.suspendedLanes |= e, t.pingedLanes &= ~e, n && (t.warmLanes |= e), n = t.expirationTimes;
    for (var a = e; 0 < a; ) {
      var i = 31 - pe(a), r = 1 << i;
      n[i] = -1, a &= ~r;
    }
    l !== 0 && v0(t, l, e);
  }
  function oi() {
    return (Mt & 6) === 0 ? (Xa(0), !1) : !0;
  }
  function Jf() {
    if (yt !== null) {
      if (Tt === 0)
        var t = yt.return;
      else
        t = yt, el = kl = null, rf(t), Un = null, za = 0, t = yt;
      for (; t !== null; )
        Zs(t.alternate, t), t = t.return;
      yt = null;
    }
  }
  function Qn(t, e) {
    var l = t.timeoutHandle;
    l !== -1 && (t.timeoutHandle = -1, H2(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), dl = 0, Jf(), jt = t, yt = l = Pe(t.current, null), gt = e, Tt = 0, Ae = null, _l = !1, Gn = fa(t, e), Gf = !1, Vn = Me = Vf = un = Ol = Yt = 0, de = Ga = null, Xf = !1, (e & 8) !== 0 && (e |= e & 32);
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= e; 0 < n; ) {
        var a = 31 - pe(n), i = 1 << a;
        e |= t[a], n &= ~i;
      }
    return sl = e, ju(), l;
  }
  function f1(t, e) {
    st = null, T.H = Ra, e === Rn || e === Yu ? (e = Mo(), Tt = 3) : e === kc ? (e = Mo(), Tt = 4) : Tt = e === zf ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, Ae = e, yt === null && (Yt = 1, Pu(
      t,
      De(e, t.current)
    ));
  }
  function r1() {
    var t = Ee.current;
    return t === null ? !0 : (gt & 4194048) === gt ? Ue === null : (gt & 62914560) === gt || (gt & 536870912) !== 0 ? t === Ue : !1;
  }
  function o1() {
    var t = T.H;
    return T.H = Ra, t === null ? Ra : t;
  }
  function s1() {
    var t = T.A;
    return T.A = o2, t;
  }
  function si() {
    Yt = 4, _l || (gt & 4194048) !== gt && Ee.current !== null || (Gn = !0), (Ol & 134217727) === 0 && (un & 134217727) === 0 || jt === null || Hl(
      jt,
      gt,
      Me,
      !1
    );
  }
  function $f(t, e, l) {
    var n = Mt;
    Mt |= 2;
    var a = o1(), i = s1();
    (jt !== t || gt !== e) && (ri = null, Qn(t, e)), e = !1;
    var r = Yt;
    t: do
      try {
        if (Tt !== 0 && yt !== null) {
          var s = yt, b = Ae;
          switch (Tt) {
            case 8:
              Jf(), r = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ee.current === null && (e = !0);
              var O = Tt;
              if (Tt = 0, Ae = null, wn(t, s, b, O), l && Gn) {
                r = 0;
                break t;
              }
              break;
            default:
              O = Tt, Tt = 0, Ae = null, wn(t, s, b, O);
          }
        }
        h2(), r = Yt;
        break;
      } catch (R) {
        f1(t, R);
      }
    while (!0);
    return e && t.shellSuspendCounter++, el = kl = null, Mt = n, T.H = a, T.A = i, yt === null && (jt = null, gt = 0, ju()), r;
  }
  function h2() {
    for (; yt !== null; ) d1(yt);
  }
  function m2(t, e) {
    var l = Mt;
    Mt |= 2;
    var n = o1(), a = s1();
    jt !== t || gt !== e ? (ri = null, fi = ve() + 500, Qn(t, e)) : Gn = fa(
      t,
      e
    );
    t: do
      try {
        if (Tt !== 0 && yt !== null) {
          e = yt;
          var i = Ae;
          e: switch (Tt) {
            case 1:
              Tt = 0, Ae = null, wn(t, e, i, 1);
              break;
            case 2:
            case 9:
              if (xo(i)) {
                Tt = 0, Ae = null, h1(e);
                break;
              }
              e = function() {
                Tt !== 2 && Tt !== 9 || jt !== t || (Tt = 7), Ke(t);
              }, i.then(e, e);
              break t;
            case 3:
              Tt = 7;
              break t;
            case 4:
              Tt = 5;
              break t;
            case 7:
              xo(i) ? (Tt = 0, Ae = null, h1(e)) : (Tt = 0, Ae = null, wn(t, e, i, 7));
              break;
            case 5:
              var r = null;
              switch (yt.tag) {
                case 26:
                  r = yt.memoizedState;
                case 5:
                case 27:
                  var s = yt;
                  if (r ? I1(r) : s.stateNode.complete) {
                    Tt = 0, Ae = null;
                    var b = s.sibling;
                    if (b !== null) yt = b;
                    else {
                      var O = s.return;
                      O !== null ? (yt = O, di(O)) : yt = null;
                    }
                    break e;
                  }
              }
              Tt = 0, Ae = null, wn(t, e, i, 5);
              break;
            case 6:
              Tt = 0, Ae = null, wn(t, e, i, 6);
              break;
            case 8:
              Jf(), Yt = 6;
              break t;
            default:
              throw Error(f(462));
          }
        }
        y2();
        break;
      } catch (R) {
        f1(t, R);
      }
    while (!0);
    return el = kl = null, T.H = n, T.A = a, Mt = l, yt !== null ? 0 : (jt = null, gt = 0, ju(), Yt);
  }
  function y2() {
    for (; yt !== null && !Zh(); )
      d1(yt);
  }
  function d1(t) {
    var e = qs(t.alternate, t, sl);
    t.memoizedProps = t.pendingProps, e === null ? di(t) : yt = e;
  }
  function h1(t) {
    var e = t, l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Ds(
          l,
          e,
          e.pendingProps,
          e.type,
          void 0,
          gt
        );
        break;
      case 11:
        e = Ds(
          l,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          gt
        );
        break;
      case 5:
        rf(e);
      default:
        Zs(l, e), e = yt = oo(e, sl), e = qs(l, e, sl);
    }
    t.memoizedProps = t.pendingProps, e === null ? di(t) : yt = e;
  }
  function wn(t, e, l, n) {
    el = kl = null, rf(e), Un = null, za = 0;
    var a = e.return;
    try {
      if (n2(
        t,
        a,
        e,
        l,
        gt
      )) {
        Yt = 1, Pu(
          t,
          De(l, t.current)
        ), yt = null;
        return;
      }
    } catch (i) {
      if (a !== null) throw yt = a, i;
      Yt = 1, Pu(
        t,
        De(l, t.current)
      ), yt = null;
      return;
    }
    e.flags & 32768 ? (St || n === 1 ? t = !0 : Gn || (gt & 536870912) !== 0 ? t = !1 : (_l = t = !0, (n === 2 || n === 9 || n === 3 || n === 6) && (n = Ee.current, n !== null && n.tag === 13 && (n.flags |= 16384))), m1(e, t)) : di(e);
  }
  function di(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        m1(
          e,
          _l
        );
        return;
      }
      t = e.return;
      var l = i2(
        e.alternate,
        e,
        sl
      );
      if (l !== null) {
        yt = l;
        return;
      }
      if (e = e.sibling, e !== null) {
        yt = e;
        return;
      }
      yt = e = t;
    } while (e !== null);
    Yt === 0 && (Yt = 5);
  }
  function m1(t, e) {
    do {
      var l = c2(t.alternate, t);
      if (l !== null) {
        l.flags &= 32767, yt = l;
        return;
      }
      if (l = t.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !e && (t = t.sibling, t !== null)) {
        yt = t;
        return;
      }
      yt = t = l;
    } while (t !== null);
    Yt = 6, yt = null;
  }
  function y1(t, e, l, n, a, i, r, s, b) {
    t.cancelPendingCommit = null;
    do
      hi();
    while (Ft !== 0);
    if ((Mt & 6) !== 0) throw Error(f(327));
    if (e !== null) {
      if (e === t.current) throw Error(f(177));
      if (i = e.lanes | e.childLanes, i |= Cc, $h(
        t,
        l,
        i,
        r,
        s,
        b
      ), t === jt && (yt = jt = null, gt = 0), Xn = e, jl = t, dl = l, Qf = i, wf = a, a1 = n, (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, S2(yu, function() {
        return b1(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), n = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || n) {
        n = T.T, T.T = null, a = G.p, G.p = 2, r = Mt, Mt |= 4;
        try {
          f2(t, e, l);
        } finally {
          Mt = r, G.p = a, T.T = n;
        }
      }
      Ft = 1, v1(), g1(), p1();
    }
  }
  function v1() {
    if (Ft === 1) {
      Ft = 0;
      var t = jl, e = Xn, l = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || l) {
        l = T.T, T.T = null;
        var n = G.p;
        G.p = 2;
        var a = Mt;
        Mt |= 4;
        try {
          ks(e, t);
          var i = ir, r = eo(t.containerInfo), s = i.focusedElem, b = i.selectionRange;
          if (r !== s && s && s.ownerDocument && to(
            s.ownerDocument.documentElement,
            s
          )) {
            if (b !== null && Dc(s)) {
              var O = b.start, R = b.end;
              if (R === void 0 && (R = O), "selectionStart" in s)
                s.selectionStart = O, s.selectionEnd = Math.min(
                  R,
                  s.value.length
                );
              else {
                var Z = s.ownerDocument || document, D = Z && Z.defaultView || window;
                if (D.getSelection) {
                  var j = D.getSelection(), W = s.textContent.length, nt = Math.min(b.start, W), Dt = b.end === void 0 ? nt : Math.min(b.end, W);
                  !j.extend && nt > Dt && (r = Dt, Dt = nt, nt = r);
                  var z = P0(
                    s,
                    nt
                  ), x = P0(
                    s,
                    Dt
                  );
                  if (z && x && (j.rangeCount !== 1 || j.anchorNode !== z.node || j.anchorOffset !== z.offset || j.focusNode !== x.node || j.focusOffset !== x.offset)) {
                    var N = Z.createRange();
                    N.setStart(z.node, z.offset), j.removeAllRanges(), nt > Dt ? (j.addRange(N), j.extend(x.node, x.offset)) : (N.setEnd(x.node, x.offset), j.addRange(N));
                  }
                }
              }
            }
            for (Z = [], j = s; j = j.parentNode; )
              j.nodeType === 1 && Z.push({
                element: j,
                left: j.scrollLeft,
                top: j.scrollTop
              });
            for (typeof s.focus == "function" && s.focus(), s = 0; s < Z.length; s++) {
              var B = Z[s];
              B.element.scrollLeft = B.left, B.element.scrollTop = B.top;
            }
          }
          zi = !!ur, ir = ur = null;
        } finally {
          Mt = a, G.p = n, T.T = l;
        }
      }
      t.current = e, Ft = 2;
    }
  }
  function g1() {
    if (Ft === 2) {
      Ft = 0;
      var t = jl, e = Xn, l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        l = T.T, T.T = null;
        var n = G.p;
        G.p = 2;
        var a = Mt;
        Mt |= 4;
        try {
          ws(t, e.alternate, e);
        } finally {
          Mt = a, G.p = n, T.T = l;
        }
      }
      Ft = 3;
    }
  }
  function p1() {
    if (Ft === 4 || Ft === 3) {
      Ft = 0, Yh();
      var t = jl, e = Xn, l = dl, n = a1;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? Ft = 5 : (Ft = 0, Xn = jl = null, S1(t, t.pendingLanes));
      var a = t.pendingLanes;
      if (a === 0 && (Dl = null), sc(l), e = e.stateNode, ge && typeof ge.onCommitFiberRoot == "function")
        try {
          ge.onCommitFiberRoot(
            ca,
            e,
            void 0,
            (e.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        e = T.T, a = G.p, G.p = 2, T.T = null;
        try {
          for (var i = t.onRecoverableError, r = 0; r < n.length; r++) {
            var s = n[r];
            i(s.value, {
              componentStack: s.stack
            });
          }
        } finally {
          T.T = e, G.p = a;
        }
      }
      (dl & 3) !== 0 && hi(), Ke(t), a = t.pendingLanes, (l & 261930) !== 0 && (a & 42) !== 0 ? t === Kf ? Va++ : (Va = 0, Kf = t) : Va = 0, Xa(0);
    }
  }
  function S1(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Aa(e)));
  }
  function hi() {
    return v1(), g1(), p1(), b1();
  }
  function b1() {
    if (Ft !== 5) return !1;
    var t = jl, e = Qf;
    Qf = 0;
    var l = sc(dl), n = T.T, a = G.p;
    try {
      G.p = 32 > l ? 32 : l, T.T = null, l = wf, wf = null;
      var i = jl, r = dl;
      if (Ft = 0, Xn = jl = null, dl = 0, (Mt & 6) !== 0) throw Error(f(331));
      var s = Mt;
      if (Mt |= 4, e1(i.current), Is(
        i,
        i.current,
        r,
        l
      ), Mt = s, Xa(0, !1), ge && typeof ge.onPostCommitFiberRoot == "function")
        try {
          ge.onPostCommitFiberRoot(ca, i);
        } catch {
        }
      return !0;
    } finally {
      G.p = a, T.T = n, S1(t, e);
    }
  }
  function E1(t, e, l) {
    e = De(l, e), e = Mf(t.stateNode, e, 2), t = Ml(t, e, 2), t !== null && (ra(t, 2), Ke(t));
  }
  function Nt(t, e, l) {
    if (t.tag === 3)
      E1(t, t, l);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          E1(
            e,
            t,
            l
          );
          break;
        } else if (e.tag === 1) {
          var n = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (Dl === null || !Dl.has(n))) {
            t = De(l, t), l = xs(2), n = Ml(e, l, 2), n !== null && (As(
              l,
              n,
              e,
              t
            ), ra(n, 2), Ke(n));
            break;
          }
        }
        e = e.return;
      }
  }
  function Ff(t, e, l) {
    var n = t.pingCache;
    if (n === null) {
      n = t.pingCache = new s2();
      var a = /* @__PURE__ */ new Set();
      n.set(e, a);
    } else
      a = n.get(e), a === void 0 && (a = /* @__PURE__ */ new Set(), n.set(e, a));
    a.has(l) || (Gf = !0, a.add(l), t = v2.bind(null, t, e, l), e.then(t, t));
  }
  function v2(t, e, l) {
    var n = t.pingCache;
    n !== null && n.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, jt === t && (gt & l) === l && (Yt === 4 || Yt === 3 && (gt & 62914560) === gt && 300 > ve() - ci ? (Mt & 2) === 0 && Qn(t, 0) : Vf |= l, Vn === gt && (Vn = 0)), Ke(t);
  }
  function x1(t, e) {
    e === 0 && (e = y0()), t = Jl(t, e), t !== null && (ra(t, e), Ke(t));
  }
  function g2(t) {
    var e = t.memoizedState, l = 0;
    e !== null && (l = e.retryLane), x1(t, l);
  }
  function p2(t, e) {
    var l = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var n = t.stateNode, a = t.memoizedState;
        a !== null && (l = a.retryLane);
        break;
      case 19:
        n = t.stateNode;
        break;
      case 22:
        n = t.stateNode._retryCache;
        break;
      default:
        throw Error(f(314));
    }
    n !== null && n.delete(e), x1(t, l);
  }
  function S2(t, e) {
    return cc(t, e);
  }
  var mi = null, Kn = null, kf = !1, yi = !1, Wf = !1, Rl = 0;
  function Ke(t) {
    t !== Kn && t.next === null && (Kn === null ? mi = Kn = t : Kn = Kn.next = t), yi = !0, kf || (kf = !0, E2());
  }
  function Xa(t, e) {
    if (!Wf && yi) {
      Wf = !0;
      do
        for (var l = !1, n = mi; n !== null; ) {
          if (t !== 0) {
            var a = n.pendingLanes;
            if (a === 0) var i = 0;
            else {
              var r = n.suspendedLanes, s = n.pingedLanes;
              i = (1 << 31 - pe(42 | t) + 1) - 1, i &= a & ~(r & ~s), i = i & 201326741 ? i & 201326741 | 1 : i ? i | 2 : 0;
            }
            i !== 0 && (l = !0, T1(n, i));
          } else
            i = gt, i = Su(
              n,
              n === jt ? i : 0,
              n.cancelPendingCommit !== null || n.timeoutHandle !== -1
            ), (i & 3) === 0 || fa(n, i) || (l = !0, T1(n, i));
          n = n.next;
        }
      while (l);
      Wf = !1;
    }
  }
  function b2() {
    A1();
  }
  function A1() {
    yi = kf = !1;
    var t = 0;
    Rl !== 0 && j2() && (t = Rl);
    for (var e = ve(), l = null, n = mi; n !== null; ) {
      var a = n.next, i = M1(n, e);
      i === 0 ? (n.next = null, l === null ? mi = a : l.next = a, a === null && (Kn = l)) : (l = n, (t !== 0 || (i & 3) !== 0) && (yi = !0)), n = a;
    }
    Ft !== 0 && Ft !== 5 || Xa(t), Rl !== 0 && (Rl = 0);
  }
  function M1(t, e) {
    for (var l = t.suspendedLanes, n = t.pingedLanes, a = t.expirationTimes, i = t.pendingLanes & -62914561; 0 < i; ) {
      var r = 31 - pe(i), s = 1 << r, b = a[r];
      b === -1 ? ((s & l) === 0 || (s & n) !== 0) && (a[r] = Jh(s, e)) : b <= e && (t.expiredLanes |= s), i &= ~s;
    }
    if (e = jt, l = gt, l = Su(
      t,
      t === e ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n = t.callbackNode, l === 0 || t === e && (Tt === 2 || Tt === 9) || t.cancelPendingCommit !== null)
      return n !== null && n !== null && fc(n), t.callbackNode = null, t.callbackPriority = 0;
    if ((l & 3) === 0 || fa(t, l)) {
      if (e = l & -l, e === t.callbackPriority) return e;
      switch (n !== null && fc(n), sc(l)) {
        case 2:
        case 8:
          l = h0;
          break;
        case 32:
          l = yu;
          break;
        case 268435456:
          l = m0;
          break;
        default:
          l = yu;
      }
      return n = z1.bind(null, t), l = cc(l, n), t.callbackPriority = e, t.callbackNode = l, e;
    }
    return n !== null && n !== null && fc(n), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function z1(t, e) {
    if (Ft !== 0 && Ft !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var l = t.callbackNode;
    if (hi() && t.callbackNode !== l)
      return null;
    var n = gt;
    return n = Su(
      t,
      t === jt ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n === 0 ? null : (i1(t, n, e), M1(t, ve()), t.callbackNode != null && t.callbackNode === l ? z1.bind(null, t) : null);
  }
  function T1(t, e) {
    if (hi()) return null;
    i1(t, e, !0);
  }
  function E2() {
    R2(function() {
      (Mt & 6) !== 0 ? cc(
        d0,
        b2
      ) : A1();
    });
  }
  function If() {
    if (Rl === 0) {
      var t = jn;
      t === 0 && (t = vu, vu <<= 1, (vu & 261888) === 0 && (vu = 256)), Rl = t;
    }
    return Rl;
  }
  function N1(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Au("" + t);
  }
  function _1(t, e) {
    var l = e.ownerDocument.createElement("input");
    return l.name = e.name, l.value = e.value, t.id && l.setAttribute("form", t.id), e.parentNode.insertBefore(l, e), t = new FormData(t), l.parentNode.removeChild(l), t;
  }
  function x2(t, e, l, n, a) {
    if (e === "submit" && l && l.stateNode === a) {
      var i = N1(
        (a[ce] || null).action
      ), r = n.submitter;
      r && (e = (e = r[ce] || null) ? N1(e.formAction) : r.getAttribute("formAction"), e !== null && (i = e, r = null));
      var s = new Nu(
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
                if (Rl !== 0) {
                  var b = r ? _1(a, r) : new FormData(a);
                  pf(
                    l,
                    {
                      pending: !0,
                      data: b,
                      method: a.method,
                      action: i
                    },
                    null,
                    b
                  );
                }
              } else
                typeof i == "function" && (s.preventDefault(), b = r ? _1(a, r) : new FormData(a), pf(
                  l,
                  {
                    pending: !0,
                    data: b,
                    method: a.method,
                    action: i
                  },
                  i,
                  b
                ));
            },
            currentTarget: a
          }
        ]
      });
    }
  }
  for (var Pf = 0; Pf < Uc.length; Pf++) {
    var tr = Uc[Pf], A2 = tr.toLowerCase(), M2 = tr[0].toUpperCase() + tr.slice(1);
    Ye(
      A2,
      "on" + M2
    );
  }
  Ye(ao, "onAnimationEnd"), Ye(uo, "onAnimationIteration"), Ye(io, "onAnimationStart"), Ye("dblclick", "onDoubleClick"), Ye("focusin", "onFocus"), Ye("focusout", "onBlur"), Ye(Lm, "onTransitionRun"), Ye(Gm, "onTransitionStart"), Ye(Vm, "onTransitionCancel"), Ye(co, "onTransitionEnd"), gn("onMouseEnter", ["mouseout", "mouseover"]), gn("onMouseLeave", ["mouseout", "mouseover"]), gn("onPointerEnter", ["pointerout", "pointerover"]), gn("onPointerLeave", ["pointerout", "pointerover"]), Xl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Xl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Xl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Xl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Xl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Xl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Qa = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), z2 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Qa)
  );
  function O1(t, e) {
    e = (e & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var n = t[l], a = n.event;
      n = n.listeners;
      t: {
        var i = void 0;
        if (e)
          for (var r = n.length - 1; 0 <= r; r--) {
            var s = n[r], b = s.instance, O = s.currentTarget;
            if (s = s.listener, b !== i && a.isPropagationStopped())
              break t;
            i = s, a.currentTarget = O;
            try {
              i(a);
            } catch (R) {
              Du(R);
            }
            a.currentTarget = null, i = b;
          }
        else
          for (r = 0; r < n.length; r++) {
            if (s = n[r], b = s.instance, O = s.currentTarget, s = s.listener, b !== i && a.isPropagationStopped())
              break t;
            i = s, a.currentTarget = O;
            try {
              i(a);
            } catch (R) {
              Du(R);
            }
            a.currentTarget = null, i = b;
          }
      }
    }
  }
  function vt(t, e) {
    var l = e[dc];
    l === void 0 && (l = e[dc] = /* @__PURE__ */ new Set());
    var n = t + "__bubble";
    l.has(n) || (D1(e, t, 2, !1), l.add(n));
  }
  function er(t, e, l) {
    var n = 0;
    e && (n |= 4), D1(
      l,
      t,
      n,
      e
    );
  }
  var vi = "_reactListening" + Math.random().toString(36).slice(2);
  function lr(t) {
    if (!t[vi]) {
      t[vi] = !0, x0.forEach(function(l) {
        l !== "selectionchange" && (z2.has(l) || er(l, !1, t), er(l, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[vi] || (e[vi] = !0, er("selectionchange", !1, e));
    }
  }
  function D1(t, e, l, n) {
    switch (ud(e)) {
      case 2:
        var a = P2;
        break;
      case 8:
        a = ty;
        break;
      default:
        a = gr;
    }
    l = a.bind(
      null,
      e,
      l,
      t
    ), a = void 0, !Ec || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (a = !0), n ? a !== void 0 ? t.addEventListener(e, l, {
      capture: !0,
      passive: a
    }) : t.addEventListener(e, l, !0) : a !== void 0 ? t.addEventListener(e, l, {
      passive: a
    }) : t.addEventListener(e, l, !1);
  }
  function nr(t, e, l, n, a) {
    var i = n;
    if ((e & 1) === 0 && (e & 2) === 0 && n !== null)
      t: for (; ; ) {
        if (n === null) return;
        var r = n.tag;
        if (r === 3 || r === 4) {
          var s = n.stateNode.containerInfo;
          if (s === a) break;
          if (r === 4)
            for (r = n.return; r !== null; ) {
              var b = r.tag;
              if ((b === 3 || b === 4) && r.stateNode.containerInfo === a)
                return;
              r = r.return;
            }
          for (; s !== null; ) {
            if (r = mn(s), r === null) return;
            if (b = r.tag, b === 5 || b === 6 || b === 26 || b === 27) {
              n = i = r;
              continue t;
            }
            s = s.parentNode;
          }
        }
        n = n.return;
      }
    U0(function() {
      var O = i, R = Sc(l), Z = [];
      t: {
        var D = fo.get(t);
        if (D !== void 0) {
          var j = Nu, W = t;
          switch (t) {
            case "keypress":
              if (zu(l) === 0) break t;
            case "keydown":
            case "keyup":
              j = pm;
              break;
            case "focusin":
              W = "focus", j = zc;
              break;
            case "focusout":
              W = "blur", j = zc;
              break;
            case "beforeblur":
            case "afterblur":
              j = zc;
              break;
            case "click":
              if (l.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              j = B0;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              j = im;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              j = Em;
              break;
            case ao:
            case uo:
            case io:
              j = rm;
              break;
            case co:
              j = Am;
              break;
            case "scroll":
            case "scrollend":
              j = am;
              break;
            case "wheel":
              j = zm;
              break;
            case "copy":
            case "cut":
            case "paste":
              j = sm;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              j = Y0;
              break;
            case "toggle":
            case "beforetoggle":
              j = Nm;
          }
          var nt = (e & 4) !== 0, Dt = !nt && (t === "scroll" || t === "scrollend"), z = nt ? D !== null ? D + "Capture" : null : D;
          nt = [];
          for (var x = O, N; x !== null; ) {
            var B = x;
            if (N = B.stateNode, B = B.tag, B !== 5 && B !== 26 && B !== 27 || N === null || z === null || (B = da(x, z), B != null && nt.push(
              wa(x, B, N)
            )), Dt) break;
            x = x.return;
          }
          0 < nt.length && (D = new j(
            D,
            W,
            null,
            l,
            R
          ), Z.push({ event: D, listeners: nt }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (D = t === "mouseover" || t === "pointerover", j = t === "mouseout" || t === "pointerout", D && l !== pc && (W = l.relatedTarget || l.fromElement) && (mn(W) || W[hn]))
            break t;
          if ((j || D) && (D = R.window === R ? R : (D = R.ownerDocument) ? D.defaultView || D.parentWindow : window, j ? (W = l.relatedTarget || l.toElement, j = O, W = W ? mn(W) : null, W !== null && (Dt = y(W), nt = W.tag, W !== Dt || nt !== 5 && nt !== 27 && nt !== 6) && (W = null)) : (j = null, W = O), j !== W)) {
            if (nt = B0, B = "onMouseLeave", z = "onMouseEnter", x = "mouse", (t === "pointerout" || t === "pointerover") && (nt = Y0, B = "onPointerLeave", z = "onPointerEnter", x = "pointer"), Dt = j == null ? D : sa(j), N = W == null ? D : sa(W), D = new nt(
              B,
              x + "leave",
              j,
              l,
              R
            ), D.target = Dt, D.relatedTarget = N, B = null, mn(R) === O && (nt = new nt(
              z,
              x + "enter",
              W,
              l,
              R
            ), nt.target = N, nt.relatedTarget = Dt, B = nt), Dt = B, j && W)
              e: {
                for (nt = T2, z = j, x = W, N = 0, B = z; B; B = nt(B))
                  N++;
                B = 0;
                for (var et = x; et; et = nt(et))
                  B++;
                for (; 0 < N - B; )
                  z = nt(z), N--;
                for (; 0 < B - N; )
                  x = nt(x), B--;
                for (; N--; ) {
                  if (z === x || x !== null && z === x.alternate) {
                    nt = z;
                    break e;
                  }
                  z = nt(z), x = nt(x);
                }
                nt = null;
              }
            else nt = null;
            j !== null && j1(
              Z,
              D,
              j,
              nt,
              !1
            ), W !== null && Dt !== null && j1(
              Z,
              Dt,
              W,
              nt,
              !0
            );
          }
        }
        t: {
          if (D = O ? sa(O) : window, j = D.nodeName && D.nodeName.toLowerCase(), j === "select" || j === "input" && D.type === "file")
            var xt = J0;
          else if (w0(D))
            if ($0)
              xt = Bm;
            else {
              xt = Cm;
              var P = Um;
            }
          else
            j = D.nodeName, !j || j.toLowerCase() !== "input" || D.type !== "checkbox" && D.type !== "radio" ? O && gc(O.elementType) && (xt = J0) : xt = qm;
          if (xt && (xt = xt(t, O))) {
            K0(
              Z,
              xt,
              l,
              R
            );
            break t;
          }
          P && P(t, D, O), t === "focusout" && O && D.type === "number" && O.memoizedProps.value != null && vc(D, "number", D.value);
        }
        switch (P = O ? sa(O) : window, t) {
          case "focusin":
            (w0(P) || P.contentEditable === "true") && (An = P, jc = O, ba = null);
            break;
          case "focusout":
            ba = jc = An = null;
            break;
          case "mousedown":
            Hc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Hc = !1, lo(Z, l, R);
            break;
          case "selectionchange":
            if (Ym) break;
          case "keydown":
          case "keyup":
            lo(Z, l, R);
        }
        var dt;
        if (Nc)
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
          xn ? X0(t, l) && (pt = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (pt = "onCompositionStart");
        pt && (L0 && l.locale !== "ko" && (xn || pt !== "onCompositionStart" ? pt === "onCompositionEnd" && xn && (dt = C0()) : (gl = R, xc = "value" in gl ? gl.value : gl.textContent, xn = !0)), P = gi(O, pt), 0 < P.length && (pt = new Z0(
          pt,
          t,
          null,
          l,
          R
        ), Z.push({ event: pt, listeners: P }), dt ? pt.data = dt : (dt = Q0(l), dt !== null && (pt.data = dt)))), (dt = Om ? Dm(t, l) : jm(t, l)) && (pt = gi(O, "onBeforeInput"), 0 < pt.length && (P = new Z0(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          R
        ), Z.push({
          event: P,
          listeners: pt
        }), P.data = dt)), x2(
          Z,
          t,
          O,
          l,
          R
        );
      }
      O1(Z, e);
    });
  }
  function wa(t, e, l) {
    return {
      instance: t,
      listener: e,
      currentTarget: l
    };
  }
  function gi(t, e) {
    for (var l = e + "Capture", n = []; t !== null; ) {
      var a = t, i = a.stateNode;
      if (a = a.tag, a !== 5 && a !== 26 && a !== 27 || i === null || (a = da(t, l), a != null && n.unshift(
        wa(t, a, i)
      ), a = da(t, e), a != null && n.push(
        wa(t, a, i)
      )), t.tag === 3) return n;
      t = t.return;
    }
    return [];
  }
  function T2(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function j1(t, e, l, n, a) {
    for (var i = e._reactName, r = []; l !== null && l !== n; ) {
      var s = l, b = s.alternate, O = s.stateNode;
      if (s = s.tag, b !== null && b === n) break;
      s !== 5 && s !== 26 && s !== 27 || O === null || (b = O, a ? (O = da(l, i), O != null && r.unshift(
        wa(l, O, b)
      )) : a || (O = da(l, i), O != null && r.push(
        wa(l, O, b)
      ))), l = l.return;
    }
    r.length !== 0 && t.push({ event: e, listeners: r });
  }
  var N2 = /\r\n?/g, _2 = /\u0000|\uFFFD/g;
  function H1(t) {
    return (typeof t == "string" ? t : "" + t).replace(N2, `
`).replace(_2, "");
  }
  function R1(t, e) {
    return e = H1(e), H1(t) === e;
  }
  function Ot(t, e, l, n, a, i) {
    switch (l) {
      case "children":
        typeof n == "string" ? e === "body" || e === "textarea" && n === "" || Sn(t, n) : (typeof n == "number" || typeof n == "bigint") && e !== "body" && Sn(t, "" + n);
        break;
      case "className":
        Eu(t, "class", n);
        break;
      case "tabIndex":
        Eu(t, "tabindex", n);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Eu(t, l, n);
        break;
      case "style":
        H0(t, n, i);
        break;
      case "data":
        if (e !== "object") {
          Eu(t, "data", n);
          break;
        }
      case "src":
      case "href":
        if (n === "" && (e !== "a" || l !== "href")) {
          t.removeAttribute(l);
          break;
        }
        if (n == null || typeof n == "function" || typeof n == "symbol" || typeof n == "boolean") {
          t.removeAttribute(l);
          break;
        }
        n = Au("" + n), t.setAttribute(l, n);
        break;
      case "action":
      case "formAction":
        if (typeof n == "function") {
          t.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof i == "function" && (l === "formAction" ? (e !== "input" && Ot(t, e, "name", a.name, a, null), Ot(
            t,
            e,
            "formEncType",
            a.formEncType,
            a,
            null
          ), Ot(
            t,
            e,
            "formMethod",
            a.formMethod,
            a,
            null
          ), Ot(
            t,
            e,
            "formTarget",
            a.formTarget,
            a,
            null
          )) : (Ot(t, e, "encType", a.encType, a, null), Ot(t, e, "method", a.method, a, null), Ot(t, e, "target", a.target, a, null)));
        if (n == null || typeof n == "symbol" || typeof n == "boolean") {
          t.removeAttribute(l);
          break;
        }
        n = Au("" + n), t.setAttribute(l, n);
        break;
      case "onClick":
        n != null && (t.onclick = We);
        break;
      case "onScroll":
        n != null && vt("scroll", t);
        break;
      case "onScrollEnd":
        n != null && vt("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n))
            throw Error(f(61));
          if (l = n.__html, l != null) {
            if (a.children != null) throw Error(f(60));
            t.innerHTML = l;
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
        l = Au("" + n), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          l
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
        n != null && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(l, "" + n) : t.removeAttribute(l);
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
        n && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(l, "") : t.removeAttribute(l);
        break;
      case "capture":
      case "download":
        n === !0 ? t.setAttribute(l, "") : n !== !1 && n != null && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(l, n) : t.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        n != null && typeof n != "function" && typeof n != "symbol" && !isNaN(n) && 1 <= n ? t.setAttribute(l, n) : t.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        n == null || typeof n == "function" || typeof n == "symbol" || isNaN(n) ? t.removeAttribute(l) : t.setAttribute(l, n);
        break;
      case "popover":
        vt("beforetoggle", t), vt("toggle", t), bu(t, "popover", n);
        break;
      case "xlinkActuate":
        ke(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          n
        );
        break;
      case "xlinkArcrole":
        ke(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          n
        );
        break;
      case "xlinkRole":
        ke(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          n
        );
        break;
      case "xlinkShow":
        ke(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          n
        );
        break;
      case "xlinkTitle":
        ke(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          n
        );
        break;
      case "xlinkType":
        ke(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          n
        );
        break;
      case "xmlBase":
        ke(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          n
        );
        break;
      case "xmlLang":
        ke(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          n
        );
        break;
      case "xmlSpace":
        ke(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          n
        );
        break;
      case "is":
        bu(t, "is", n);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = lm.get(l) || l, bu(t, l, n));
    }
  }
  function ar(t, e, l, n, a, i) {
    switch (l) {
      case "style":
        H0(t, n, i);
        break;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n))
            throw Error(f(61));
          if (l = n.__html, l != null) {
            if (a.children != null) throw Error(f(60));
            t.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof n == "string" ? Sn(t, n) : (typeof n == "number" || typeof n == "bigint") && Sn(t, "" + n);
        break;
      case "onScroll":
        n != null && vt("scroll", t);
        break;
      case "onScrollEnd":
        n != null && vt("scrollend", t);
        break;
      case "onClick":
        n != null && (t.onclick = We);
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
        if (!A0.hasOwnProperty(l))
          t: {
            if (l[0] === "o" && l[1] === "n" && (a = l.endsWith("Capture"), e = l.slice(2, a ? l.length - 7 : void 0), i = t[ce] || null, i = i != null ? i[l] : null, typeof i == "function" && t.removeEventListener(e, i, a), typeof n == "function")) {
              typeof i != "function" && i !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(e, n, a);
              break t;
            }
            l in t ? t[l] = n : n === !0 ? t.setAttribute(l, "") : bu(t, l, n);
          }
    }
  }
  function le(t, e, l) {
    switch (e) {
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
        vt("error", t), vt("load", t);
        var n = !1, a = !1, i;
        for (i in l)
          if (l.hasOwnProperty(i)) {
            var r = l[i];
            if (r != null)
              switch (i) {
                case "src":
                  n = !0;
                  break;
                case "srcSet":
                  a = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(f(137, e));
                default:
                  Ot(t, e, i, r, l, null);
              }
          }
        a && Ot(t, e, "srcSet", l.srcSet, l, null), n && Ot(t, e, "src", l.src, l, null);
        return;
      case "input":
        vt("invalid", t);
        var s = i = r = a = null, b = null, O = null;
        for (n in l)
          if (l.hasOwnProperty(n)) {
            var R = l[n];
            if (R != null)
              switch (n) {
                case "name":
                  a = R;
                  break;
                case "type":
                  r = R;
                  break;
                case "checked":
                  b = R;
                  break;
                case "defaultChecked":
                  O = R;
                  break;
                case "value":
                  i = R;
                  break;
                case "defaultValue":
                  s = R;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (R != null)
                    throw Error(f(137, e));
                  break;
                default:
                  Ot(t, e, n, R, l, null);
              }
          }
        _0(
          t,
          i,
          s,
          b,
          O,
          r,
          a,
          !1
        );
        return;
      case "select":
        vt("invalid", t), n = r = i = null;
        for (a in l)
          if (l.hasOwnProperty(a) && (s = l[a], s != null))
            switch (a) {
              case "value":
                i = s;
                break;
              case "defaultValue":
                r = s;
                break;
              case "multiple":
                n = s;
              default:
                Ot(t, e, a, s, l, null);
            }
        e = i, l = r, t.multiple = !!n, e != null ? pn(t, !!n, e, !1) : l != null && pn(t, !!n, l, !0);
        return;
      case "textarea":
        vt("invalid", t), i = a = n = null;
        for (r in l)
          if (l.hasOwnProperty(r) && (s = l[r], s != null))
            switch (r) {
              case "value":
                n = s;
                break;
              case "defaultValue":
                a = s;
                break;
              case "children":
                i = s;
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(f(91));
                break;
              default:
                Ot(t, e, r, s, l, null);
            }
        D0(t, n, a, i);
        return;
      case "option":
        for (b in l)
          if (l.hasOwnProperty(b) && (n = l[b], n != null))
            switch (b) {
              case "selected":
                t.selected = n && typeof n != "function" && typeof n != "symbol";
                break;
              default:
                Ot(t, e, b, n, l, null);
            }
        return;
      case "dialog":
        vt("beforetoggle", t), vt("toggle", t), vt("cancel", t), vt("close", t);
        break;
      case "iframe":
      case "object":
        vt("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Qa.length; n++)
          vt(Qa[n], t);
        break;
      case "image":
        vt("error", t), vt("load", t);
        break;
      case "details":
        vt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        vt("error", t), vt("load", t);
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
        for (O in l)
          if (l.hasOwnProperty(O) && (n = l[O], n != null))
            switch (O) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(f(137, e));
              default:
                Ot(t, e, O, n, l, null);
            }
        return;
      default:
        if (gc(e)) {
          for (R in l)
            l.hasOwnProperty(R) && (n = l[R], n !== void 0 && ar(
              t,
              e,
              R,
              n,
              l,
              void 0
            ));
          return;
        }
    }
    for (s in l)
      l.hasOwnProperty(s) && (n = l[s], n != null && Ot(t, e, s, n, l, null));
  }
  function O2(t, e, l, n) {
    switch (e) {
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
        var a = null, i = null, r = null, s = null, b = null, O = null, R = null;
        for (j in l) {
          var Z = l[j];
          if (l.hasOwnProperty(j) && Z != null)
            switch (j) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                b = Z;
              default:
                n.hasOwnProperty(j) || Ot(t, e, j, null, n, Z);
            }
        }
        for (var D in n) {
          var j = n[D];
          if (Z = l[D], n.hasOwnProperty(D) && (j != null || Z != null))
            switch (D) {
              case "type":
                i = j;
                break;
              case "name":
                a = j;
                break;
              case "checked":
                O = j;
                break;
              case "defaultChecked":
                R = j;
                break;
              case "value":
                r = j;
                break;
              case "defaultValue":
                s = j;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (j != null)
                  throw Error(f(137, e));
                break;
              default:
                j !== Z && Ot(
                  t,
                  e,
                  D,
                  j,
                  n,
                  Z
                );
            }
        }
        yc(
          t,
          r,
          s,
          b,
          O,
          R,
          i,
          a
        );
        return;
      case "select":
        j = r = s = D = null;
        for (i in l)
          if (b = l[i], l.hasOwnProperty(i) && b != null)
            switch (i) {
              case "value":
                break;
              case "multiple":
                j = b;
              default:
                n.hasOwnProperty(i) || Ot(
                  t,
                  e,
                  i,
                  null,
                  n,
                  b
                );
            }
        for (a in n)
          if (i = n[a], b = l[a], n.hasOwnProperty(a) && (i != null || b != null))
            switch (a) {
              case "value":
                D = i;
                break;
              case "defaultValue":
                s = i;
                break;
              case "multiple":
                r = i;
              default:
                i !== b && Ot(
                  t,
                  e,
                  a,
                  i,
                  n,
                  b
                );
            }
        e = s, l = r, n = j, D != null ? pn(t, !!l, D, !1) : !!n != !!l && (e != null ? pn(t, !!l, e, !0) : pn(t, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        j = D = null;
        for (s in l)
          if (a = l[s], l.hasOwnProperty(s) && a != null && !n.hasOwnProperty(s))
            switch (s) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ot(t, e, s, null, n, a);
            }
        for (r in n)
          if (a = n[r], i = l[r], n.hasOwnProperty(r) && (a != null || i != null))
            switch (r) {
              case "value":
                D = a;
                break;
              case "defaultValue":
                j = a;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (a != null) throw Error(f(91));
                break;
              default:
                a !== i && Ot(t, e, r, a, n, i);
            }
        O0(t, D, j);
        return;
      case "option":
        for (var W in l)
          if (D = l[W], l.hasOwnProperty(W) && D != null && !n.hasOwnProperty(W))
            switch (W) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Ot(
                  t,
                  e,
                  W,
                  null,
                  n,
                  D
                );
            }
        for (b in n)
          if (D = n[b], j = l[b], n.hasOwnProperty(b) && D !== j && (D != null || j != null))
            switch (b) {
              case "selected":
                t.selected = D && typeof D != "function" && typeof D != "symbol";
                break;
              default:
                Ot(
                  t,
                  e,
                  b,
                  D,
                  n,
                  j
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
        for (var nt in l)
          D = l[nt], l.hasOwnProperty(nt) && D != null && !n.hasOwnProperty(nt) && Ot(t, e, nt, null, n, D);
        for (O in n)
          if (D = n[O], j = l[O], n.hasOwnProperty(O) && D !== j && (D != null || j != null))
            switch (O) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (D != null)
                  throw Error(f(137, e));
                break;
              default:
                Ot(
                  t,
                  e,
                  O,
                  D,
                  n,
                  j
                );
            }
        return;
      default:
        if (gc(e)) {
          for (var Dt in l)
            D = l[Dt], l.hasOwnProperty(Dt) && D !== void 0 && !n.hasOwnProperty(Dt) && ar(
              t,
              e,
              Dt,
              void 0,
              n,
              D
            );
          for (R in n)
            D = n[R], j = l[R], !n.hasOwnProperty(R) || D === j || D === void 0 && j === void 0 || ar(
              t,
              e,
              R,
              D,
              n,
              j
            );
          return;
        }
    }
    for (var z in l)
      D = l[z], l.hasOwnProperty(z) && D != null && !n.hasOwnProperty(z) && Ot(t, e, z, null, n, D);
    for (Z in n)
      D = n[Z], j = l[Z], !n.hasOwnProperty(Z) || D === j || D == null && j == null || Ot(t, e, Z, D, n, j);
  }
  function U1(t) {
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
  function D2() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, l = performance.getEntriesByType("resource"), n = 0; n < l.length; n++) {
        var a = l[n], i = a.transferSize, r = a.initiatorType, s = a.duration;
        if (i && s && U1(r)) {
          for (r = 0, s = a.responseEnd, n += 1; n < l.length; n++) {
            var b = l[n], O = b.startTime;
            if (O > s) break;
            var R = b.transferSize, Z = b.initiatorType;
            R && U1(Z) && (b = b.responseEnd, r += R * (b < s ? 1 : (s - O) / (b - O)));
          }
          if (--n, e += 8 * (i + r) / (a.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var ur = null, ir = null;
  function pi(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function C1(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function q1(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function cr(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var fr = null;
  function j2() {
    var t = window.event;
    return t && t.type === "popstate" ? t === fr ? !1 : (fr = t, !0) : (fr = null, !1);
  }
  var B1 = typeof setTimeout == "function" ? setTimeout : void 0, H2 = typeof clearTimeout == "function" ? clearTimeout : void 0, Z1 = typeof Promise == "function" ? Promise : void 0, R2 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Z1 < "u" ? function(t) {
    return Z1.resolve(null).then(t).catch(U2);
  } : B1;
  function U2(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Ul(t) {
    return t === "head";
  }
  function Y1(t, e) {
    var l = e, n = 0;
    do {
      var a = l.nextSibling;
      if (t.removeChild(l), a && a.nodeType === 8)
        if (l = a.data, l === "/$" || l === "/&") {
          if (n === 0) {
            t.removeChild(a), kn(e);
            return;
          }
          n--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          n++;
        else if (l === "html")
          Ka(t.ownerDocument.documentElement);
        else if (l === "head") {
          l = t.ownerDocument.head, Ka(l);
          for (var i = l.firstChild; i; ) {
            var r = i.nextSibling, s = i.nodeName;
            i[oa] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && i.rel.toLowerCase() === "stylesheet" || l.removeChild(i), i = r;
          }
        } else
          l === "body" && Ka(t.ownerDocument.body);
      l = a;
    } while (l);
    kn(e);
  }
  function L1(t, e) {
    var l = t;
    t = 0;
    do {
      var n = l.nextSibling;
      if (l.nodeType === 1 ? e ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (e ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), n && n.nodeType === 8)
        if (l = n.data, l === "/$") {
          if (t === 0) break;
          t--;
        } else
          l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || t++;
      l = n;
    } while (l);
  }
  function rr(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (e = e.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          rr(l), hc(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(l);
    }
  }
  function C2(t, e, l, n) {
    for (; t.nodeType === 1; ) {
      var a = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!n && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (n) {
        if (!t[oa])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (i = t.getAttribute("rel"), i === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (i !== a.rel || t.getAttribute("href") !== (a.href == null || a.href === "" ? null : a.href) || t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin) || t.getAttribute("title") !== (a.title == null ? null : a.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (i = t.getAttribute("src"), (i !== (a.src == null ? null : a.src) || t.getAttribute("type") !== (a.type == null ? null : a.type) || t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin)) && i && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var i = a.name == null ? null : "" + a.name;
        if (a.type === "hidden" && t.getAttribute("name") === i)
          return t;
      } else return t;
      if (t = Ce(t.nextSibling), t === null) break;
    }
    return null;
  }
  function q2(t, e, l) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = Ce(t.nextSibling), t === null)) return null;
    return t;
  }
  function G1(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Ce(t.nextSibling), t === null)) return null;
    return t;
  }
  function or(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function sr(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function B2(t, e) {
    var l = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || l.readyState !== "loading")
      e();
    else {
      var n = function() {
        e(), l.removeEventListener("DOMContentLoaded", n);
      };
      l.addEventListener("DOMContentLoaded", n), t._reactRetry = n;
    }
  }
  function Ce(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&" || e === "F!" || e === "F")
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var dr = null;
  function V1(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "/$" || l === "/&") {
          if (e === 0)
            return Ce(t.nextSibling);
          e--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function X1(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (e === 0) return t;
          e--;
        } else l !== "/$" && l !== "/&" || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Q1(t, e, l) {
    switch (e = pi(l), t) {
      case "html":
        if (t = e.documentElement, !t) throw Error(f(452));
        return t;
      case "head":
        if (t = e.head, !t) throw Error(f(453));
        return t;
      case "body":
        if (t = e.body, !t) throw Error(f(454));
        return t;
      default:
        throw Error(f(451));
    }
  }
  function Ka(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    hc(t);
  }
  var qe = /* @__PURE__ */ new Map(), w1 = /* @__PURE__ */ new Set();
  function Si(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var hl = G.d;
  G.d = {
    f: Z2,
    r: Y2,
    D: L2,
    C: G2,
    L: V2,
    m: X2,
    X: w2,
    S: Q2,
    M: K2
  };
  function Z2() {
    var t = hl.f(), e = oi();
    return t || e;
  }
  function Y2(t) {
    var e = yn(t);
    e !== null && e.tag === 5 && e.type === "form" ? fs(e) : hl.r(t);
  }
  var Jn = typeof document > "u" ? null : document;
  function K1(t, e, l) {
    var n = Jn;
    if (n && typeof e == "string" && e) {
      var a = _e(e);
      a = 'link[rel="' + t + '"][href="' + a + '"]', typeof l == "string" && (a += '[crossorigin="' + l + '"]'), w1.has(a) || (w1.add(a), t = { rel: t, crossOrigin: l, href: e }, n.querySelector(a) === null && (e = n.createElement("link"), le(e, "link", t), kt(e), n.head.appendChild(e)));
    }
  }
  function L2(t) {
    hl.D(t), K1("dns-prefetch", t, null);
  }
  function G2(t, e) {
    hl.C(t, e), K1("preconnect", t, e);
  }
  function V2(t, e, l) {
    hl.L(t, e, l);
    var n = Jn;
    if (n && t && e) {
      var a = 'link[rel="preload"][as="' + _e(e) + '"]';
      e === "image" && l && l.imageSrcSet ? (a += '[imagesrcset="' + _e(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (a += '[imagesizes="' + _e(
        l.imageSizes
      ) + '"]')) : a += '[href="' + _e(t) + '"]';
      var i = a;
      switch (e) {
        case "style":
          i = $n(t);
          break;
        case "script":
          i = Fn(t);
      }
      qe.has(i) || (t = S(
        {
          rel: "preload",
          href: e === "image" && l && l.imageSrcSet ? void 0 : t,
          as: e
        },
        l
      ), qe.set(i, t), n.querySelector(a) !== null || e === "style" && n.querySelector(Ja(i)) || e === "script" && n.querySelector($a(i)) || (e = n.createElement("link"), le(e, "link", t), kt(e), n.head.appendChild(e)));
    }
  }
  function X2(t, e) {
    hl.m(t, e);
    var l = Jn;
    if (l && t) {
      var n = e && typeof e.as == "string" ? e.as : "script", a = 'link[rel="modulepreload"][as="' + _e(n) + '"][href="' + _e(t) + '"]', i = a;
      switch (n) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          i = Fn(t);
      }
      if (!qe.has(i) && (t = S({ rel: "modulepreload", href: t }, e), qe.set(i, t), l.querySelector(a) === null)) {
        switch (n) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector($a(i)))
              return;
        }
        n = l.createElement("link"), le(n, "link", t), kt(n), l.head.appendChild(n);
      }
    }
  }
  function Q2(t, e, l) {
    hl.S(t, e, l);
    var n = Jn;
    if (n && t) {
      var a = vn(n).hoistableStyles, i = $n(t);
      e = e || "default";
      var r = a.get(i);
      if (!r) {
        var s = { loading: 0, preload: null };
        if (r = n.querySelector(
          Ja(i)
        ))
          s.loading = 5;
        else {
          t = S(
            { rel: "stylesheet", href: t, "data-precedence": e },
            l
          ), (l = qe.get(i)) && hr(t, l);
          var b = r = n.createElement("link");
          kt(b), le(b, "link", t), b._p = new Promise(function(O, R) {
            b.onload = O, b.onerror = R;
          }), b.addEventListener("load", function() {
            s.loading |= 1;
          }), b.addEventListener("error", function() {
            s.loading |= 2;
          }), s.loading |= 4, bi(r, e, n);
        }
        r = {
          type: "stylesheet",
          instance: r,
          count: 1,
          state: s
        }, a.set(i, r);
      }
    }
  }
  function w2(t, e) {
    hl.X(t, e);
    var l = Jn;
    if (l && t) {
      var n = vn(l).hoistableScripts, a = Fn(t), i = n.get(a);
      i || (i = l.querySelector($a(a)), i || (t = S({ src: t, async: !0 }, e), (e = qe.get(a)) && mr(t, e), i = l.createElement("script"), kt(i), le(i, "link", t), l.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, n.set(a, i));
    }
  }
  function K2(t, e) {
    hl.M(t, e);
    var l = Jn;
    if (l && t) {
      var n = vn(l).hoistableScripts, a = Fn(t), i = n.get(a);
      i || (i = l.querySelector($a(a)), i || (t = S({ src: t, async: !0, type: "module" }, e), (e = qe.get(a)) && mr(t, e), i = l.createElement("script"), kt(i), le(i, "link", t), l.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, n.set(a, i));
    }
  }
  function J1(t, e, l, n) {
    var a = (a = mt.current) ? Si(a) : null;
    if (!a) throw Error(f(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (e = $n(l.href), l = vn(
          a
        ).hoistableStyles, n = l.get(e), n || (n = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(e, n)), n) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          t = $n(l.href);
          var i = vn(
            a
          ).hoistableStyles, r = i.get(t);
          if (r || (a = a.ownerDocument || a, r = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, i.set(t, r), (i = a.querySelector(
            Ja(t)
          )) && !i._p && (r.instance = i, r.state.loading = 5), qe.has(t) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, qe.set(t, l), i || J2(
            a,
            t,
            l,
            r.state
          ))), e && n === null)
            throw Error(f(528, ""));
          return r;
        }
        if (e && n !== null)
          throw Error(f(529, ""));
        return null;
      case "script":
        return e = l.async, l = l.src, typeof l == "string" && e && typeof e != "function" && typeof e != "symbol" ? (e = Fn(l), l = vn(
          a
        ).hoistableScripts, n = l.get(e), n || (n = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(e, n)), n) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(f(444, t));
    }
  }
  function $n(t) {
    return 'href="' + _e(t) + '"';
  }
  function Ja(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function $1(t) {
    return S({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function J2(t, e, l, n) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]") ? n.loading = 1 : (e = t.createElement("link"), n.preload = e, e.addEventListener("load", function() {
      return n.loading |= 1;
    }), e.addEventListener("error", function() {
      return n.loading |= 2;
    }), le(e, "link", l), kt(e), t.head.appendChild(e));
  }
  function Fn(t) {
    return '[src="' + _e(t) + '"]';
  }
  function $a(t) {
    return "script[async]" + t;
  }
  function F1(t, e, l) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var n = t.querySelector(
            'style[data-href~="' + _e(l.href) + '"]'
          );
          if (n)
            return e.instance = n, kt(n), n;
          var a = S({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return n = (t.ownerDocument || t).createElement(
            "style"
          ), kt(n), le(n, "style", a), bi(n, l.precedence, t), e.instance = n;
        case "stylesheet":
          a = $n(l.href);
          var i = t.querySelector(
            Ja(a)
          );
          if (i)
            return e.state.loading |= 4, e.instance = i, kt(i), i;
          n = $1(l), (a = qe.get(a)) && hr(n, a), i = (t.ownerDocument || t).createElement("link"), kt(i);
          var r = i;
          return r._p = new Promise(function(s, b) {
            r.onload = s, r.onerror = b;
          }), le(i, "link", n), e.state.loading |= 4, bi(i, l.precedence, t), e.instance = i;
        case "script":
          return i = Fn(l.src), (a = t.querySelector(
            $a(i)
          )) ? (e.instance = a, kt(a), a) : (n = l, (a = qe.get(i)) && (n = S({}, l), mr(n, a)), t = t.ownerDocument || t, a = t.createElement("script"), kt(a), le(a, "link", n), t.head.appendChild(a), e.instance = a);
        case "void":
          return null;
        default:
          throw Error(f(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (n = e.instance, e.state.loading |= 4, bi(n, l.precedence, t));
    return e.instance;
  }
  function bi(t, e, l) {
    for (var n = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), a = n.length ? n[n.length - 1] : null, i = a, r = 0; r < n.length; r++) {
      var s = n[r];
      if (s.dataset.precedence === e) i = s;
      else if (i !== a) break;
    }
    i ? i.parentNode.insertBefore(t, i.nextSibling) : (e = l.nodeType === 9 ? l.head : l, e.insertBefore(t, e.firstChild));
  }
  function hr(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function mr(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var Ei = null;
  function k1(t, e, l) {
    if (Ei === null) {
      var n = /* @__PURE__ */ new Map(), a = Ei = /* @__PURE__ */ new Map();
      a.set(l, n);
    } else
      a = Ei, n = a.get(l), n || (n = /* @__PURE__ */ new Map(), a.set(l, n));
    if (n.has(t)) return n;
    for (n.set(t, null), l = l.getElementsByTagName(t), a = 0; a < l.length; a++) {
      var i = l[a];
      if (!(i[oa] || i[It] || t === "link" && i.getAttribute("rel") === "stylesheet") && i.namespaceURI !== "http://www.w3.org/2000/svg") {
        var r = i.getAttribute(e) || "";
        r = t + r;
        var s = n.get(r);
        s ? s.push(i) : n.set(r, [i]);
      }
    }
    return n;
  }
  function W1(t, e, l) {
    t = t.ownerDocument || t, t.head.insertBefore(
      l,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function $2(t, e, l) {
    if (l === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "")
          break;
        return !0;
      case "link":
        if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
          break;
        switch (e.rel) {
          case "stylesheet":
            return t = e.disabled, typeof e.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
          return !0;
    }
    return !1;
  }
  function I1(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function F2(t, e, l, n) {
    if (l.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var a = $n(n.href), i = e.querySelector(
          Ja(a)
        );
        if (i) {
          e = i._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = xi.bind(t), e.then(t, t)), l.state.loading |= 4, l.instance = i, kt(i);
          return;
        }
        i = e.ownerDocument || e, n = $1(n), (a = qe.get(a)) && hr(n, a), i = i.createElement("link"), kt(i);
        var r = i;
        r._p = new Promise(function(s, b) {
          r.onload = s, r.onerror = b;
        }), le(i, "link", n), l.instance = i;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(l, e), (e = l.state.preload) && (l.state.loading & 3) === 0 && (t.count++, l = xi.bind(t), e.addEventListener("load", l), e.addEventListener("error", l));
    }
  }
  var yr = 0;
  function k2(t, e) {
    return t.stylesheets && t.count === 0 && Mi(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(l) {
      var n = setTimeout(function() {
        if (t.stylesheets && Mi(t, t.stylesheets), t.unsuspend) {
          var i = t.unsuspend;
          t.unsuspend = null, i();
        }
      }, 6e4 + e);
      0 < t.imgBytes && yr === 0 && (yr = 62500 * D2());
      var a = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Mi(t, t.stylesheets), t.unsuspend)) {
            var i = t.unsuspend;
            t.unsuspend = null, i();
          }
        },
        (t.imgBytes > yr ? 50 : 800) + e
      );
      return t.unsuspend = l, function() {
        t.unsuspend = null, clearTimeout(n), clearTimeout(a);
      };
    } : null;
  }
  function xi() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Mi(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Ai = null;
  function Mi(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Ai = /* @__PURE__ */ new Map(), e.forEach(W2, t), Ai = null, xi.call(t));
  }
  function W2(t, e) {
    if (!(e.state.loading & 4)) {
      var l = Ai.get(t);
      if (l) var n = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), Ai.set(t, l);
        for (var a = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), i = 0; i < a.length; i++) {
          var r = a[i];
          (r.nodeName === "LINK" || r.getAttribute("media") !== "not all") && (l.set(r.dataset.precedence, r), n = r);
        }
        n && l.set(null, n);
      }
      a = e.instance, r = a.getAttribute("data-precedence"), i = l.get(r) || n, i === n && l.set(null, a), l.set(r, a), this.count++, n = xi.bind(this), a.addEventListener("load", n), a.addEventListener("error", n), i ? i.parentNode.insertBefore(a, i.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(a, t.firstChild)), e.state.loading |= 4;
    }
  }
  var Fa = {
    $$typeof: K,
    Provider: null,
    Consumer: null,
    _currentValue: J,
    _currentValue2: J,
    _threadCount: 0
  };
  function I2(t, e, l, n, a, i, r, s, b) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = rc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = rc(0), this.hiddenUpdates = rc(null), this.identifierPrefix = n, this.onUncaughtError = a, this.onCaughtError = i, this.onRecoverableError = r, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = b, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function P1(t, e, l, n, a, i, r, s, b, O, R, Z) {
    return t = new I2(
      t,
      e,
      l,
      r,
      b,
      O,
      R,
      Z,
      s
    ), e = 1, i === !0 && (e |= 24), i = be(3, null, null, e), t.current = i, i.stateNode = t, e = Jc(), e.refCount++, t.pooledCache = e, e.refCount++, i.memoizedState = {
      element: n,
      isDehydrated: l,
      cache: e
    }, Wc(i), t;
  }
  function td(t) {
    return t ? (t = Tn, t) : Tn;
  }
  function ed(t, e, l, n, a, i) {
    a = td(a), n.context === null ? n.context = a : n.pendingContext = a, n = Al(e), n.payload = { element: l }, i = i === void 0 ? null : i, i !== null && (n.callback = i), l = Ml(t, n, e), l !== null && (he(l, t, e), Na(l, t, e));
  }
  function ld(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function vr(t, e) {
    ld(t, e), (t = t.alternate) && ld(t, e);
  }
  function nd(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Jl(t, 67108864);
      e !== null && he(e, t, 67108864), vr(t, 67108864);
    }
  }
  function ad(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = ze();
      e = oc(e);
      var l = Jl(t, e);
      l !== null && he(l, t, e), vr(t, e);
    }
  }
  var zi = !0;
  function P2(t, e, l, n) {
    var a = T.T;
    T.T = null;
    var i = G.p;
    try {
      G.p = 2, gr(t, e, l, n);
    } finally {
      G.p = i, T.T = a;
    }
  }
  function ty(t, e, l, n) {
    var a = T.T;
    T.T = null;
    var i = G.p;
    try {
      G.p = 8, gr(t, e, l, n);
    } finally {
      G.p = i, T.T = a;
    }
  }
  function gr(t, e, l, n) {
    if (zi) {
      var a = pr(n);
      if (a === null)
        nr(
          t,
          e,
          n,
          Ti,
          l
        ), id(t, n);
      else if (ly(
        a,
        t,
        e,
        l,
        n
      ))
        n.stopPropagation();
      else if (id(t, n), e & 4 && -1 < ey.indexOf(t)) {
        for (; a !== null; ) {
          var i = yn(a);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (i = i.stateNode, i.current.memoizedState.isDehydrated) {
                  var r = Vl(i.pendingLanes);
                  if (r !== 0) {
                    var s = i;
                    for (s.pendingLanes |= 2, s.entangledLanes |= 2; r; ) {
                      var b = 1 << 31 - pe(r);
                      s.entanglements[1] |= b, r &= ~b;
                    }
                    Ke(i), (Mt & 6) === 0 && (fi = ve() + 500, Xa(0));
                  }
                }
                break;
              case 31:
              case 13:
                s = Jl(i, 2), s !== null && he(s, i, 2), oi(), vr(i, 2);
            }
          if (i = pr(n), i === null && nr(
            t,
            e,
            n,
            Ti,
            l
          ), i === a) break;
          a = i;
        }
        a !== null && n.stopPropagation();
      } else
        nr(
          t,
          e,
          n,
          null,
          l
        );
    }
  }
  function pr(t) {
    return t = Sc(t), Sr(t);
  }
  var Ti = null;
  function Sr(t) {
    if (Ti = null, t = mn(t), t !== null) {
      var e = y(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (t = v(e), t !== null) return t;
          t = null;
        } else if (l === 31) {
          if (t = m(e), t !== null) return t;
          t = null;
        } else if (l === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return Ti = t, null;
  }
  function ud(t) {
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
        switch (Lh()) {
          case d0:
            return 2;
          case h0:
            return 8;
          case yu:
          case Gh:
            return 32;
          case m0:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var br = !1, Cl = null, ql = null, Bl = null, ka = /* @__PURE__ */ new Map(), Wa = /* @__PURE__ */ new Map(), Zl = [], ey = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function id(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        Cl = null;
        break;
      case "dragenter":
      case "dragleave":
        ql = null;
        break;
      case "mouseover":
      case "mouseout":
        Bl = null;
        break;
      case "pointerover":
      case "pointerout":
        ka.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Wa.delete(e.pointerId);
    }
  }
  function Ia(t, e, l, n, a, i) {
    return t === null || t.nativeEvent !== i ? (t = {
      blockedOn: e,
      domEventName: l,
      eventSystemFlags: n,
      nativeEvent: i,
      targetContainers: [a]
    }, e !== null && (e = yn(e), e !== null && nd(e)), t) : (t.eventSystemFlags |= n, e = t.targetContainers, a !== null && e.indexOf(a) === -1 && e.push(a), t);
  }
  function ly(t, e, l, n, a) {
    switch (e) {
      case "focusin":
        return Cl = Ia(
          Cl,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "dragenter":
        return ql = Ia(
          ql,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "mouseover":
        return Bl = Ia(
          Bl,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "pointerover":
        var i = a.pointerId;
        return ka.set(
          i,
          Ia(
            ka.get(i) || null,
            t,
            e,
            l,
            n,
            a
          )
        ), !0;
      case "gotpointercapture":
        return i = a.pointerId, Wa.set(
          i,
          Ia(
            Wa.get(i) || null,
            t,
            e,
            l,
            n,
            a
          )
        ), !0;
    }
    return !1;
  }
  function cd(t) {
    var e = mn(t.target);
    if (e !== null) {
      var l = y(e);
      if (l !== null) {
        if (e = l.tag, e === 13) {
          if (e = v(l), e !== null) {
            t.blockedOn = e, b0(t.priority, function() {
              ad(l);
            });
            return;
          }
        } else if (e === 31) {
          if (e = m(l), e !== null) {
            t.blockedOn = e, b0(t.priority, function() {
              ad(l);
            });
            return;
          }
        } else if (e === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Ni(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = pr(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var n = new l.constructor(
          l.type,
          l
        );
        pc = n, l.target.dispatchEvent(n), pc = null;
      } else
        return e = yn(l), e !== null && nd(e), t.blockedOn = l, !1;
      e.shift();
    }
    return !0;
  }
  function fd(t, e, l) {
    Ni(t) && l.delete(e);
  }
  function ny() {
    br = !1, Cl !== null && Ni(Cl) && (Cl = null), ql !== null && Ni(ql) && (ql = null), Bl !== null && Ni(Bl) && (Bl = null), ka.forEach(fd), Wa.forEach(fd);
  }
  function _i(t, e) {
    t.blockedOn === e && (t.blockedOn = null, br || (br = !0, u.unstable_scheduleCallback(
      u.unstable_NormalPriority,
      ny
    )));
  }
  var Oi = null;
  function rd(t) {
    Oi !== t && (Oi = t, u.unstable_scheduleCallback(
      u.unstable_NormalPriority,
      function() {
        Oi === t && (Oi = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e], n = t[e + 1], a = t[e + 2];
          if (typeof n != "function") {
            if (Sr(n || l) === null)
              continue;
            break;
          }
          var i = yn(l);
          i !== null && (t.splice(e, 3), e -= 3, pf(
            i,
            {
              pending: !0,
              data: a,
              method: l.method,
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
    function e(b) {
      return _i(b, t);
    }
    Cl !== null && _i(Cl, t), ql !== null && _i(ql, t), Bl !== null && _i(Bl, t), ka.forEach(e), Wa.forEach(e);
    for (var l = 0; l < Zl.length; l++) {
      var n = Zl[l];
      n.blockedOn === t && (n.blockedOn = null);
    }
    for (; 0 < Zl.length && (l = Zl[0], l.blockedOn === null); )
      cd(l), l.blockedOn === null && Zl.shift();
    if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
      for (n = 0; n < l.length; n += 3) {
        var a = l[n], i = l[n + 1], r = a[ce] || null;
        if (typeof i == "function")
          r || rd(l);
        else if (r) {
          var s = null;
          if (i && i.hasAttribute("formAction")) {
            if (a = i, r = i[ce] || null)
              s = r.formAction;
            else if (Sr(a) !== null) continue;
          } else s = r.action;
          typeof s == "function" ? l[n + 1] = s : (l.splice(n, 3), n -= 3), rd(l);
        }
      }
  }
  function od() {
    function t(i) {
      i.canIntercept && i.info === "react-transition" && i.intercept({
        handler: function() {
          return new Promise(function(r) {
            return a = r;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function e() {
      a !== null && (a(), a = null), n || setTimeout(l, 20);
    }
    function l() {
      if (!n && !navigation.transition) {
        var i = navigation.currentEntry;
        i && i.url != null && navigation.navigate(i.url, {
          state: i.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var n = !1, a = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(l, 100), function() {
        n = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), a !== null && (a(), a = null);
      };
    }
  }
  function Er(t) {
    this._internalRoot = t;
  }
  Di.prototype.render = Er.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(f(409));
    var l = e.current, n = ze();
    ed(l, n, t, e, null, null);
  }, Di.prototype.unmount = Er.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      ed(t.current, 2, null, t, null, null), oi(), e[hn] = null;
    }
  };
  function Di(t) {
    this._internalRoot = t;
  }
  Di.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = S0();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < Zl.length && e !== 0 && e < Zl[l].priority; l++) ;
      Zl.splice(l, 0, t), l === 0 && cd(t);
    }
  };
  var sd = c.version;
  if (sd !== "19.2.0")
    throw Error(
      f(
        527,
        sd,
        "19.2.0"
      )
    );
  G.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(f(188)) : (t = Object.keys(t).join(","), Error(f(268, t)));
    return t = h(e), t = t !== null ? p(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var ay = {
    bundleType: 0,
    version: "19.2.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: T,
    reconcilerVersion: "19.2.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ji = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ji.isDisabled && ji.supportsFiber)
      try {
        ca = ji.inject(
          ay
        ), ge = ji;
      } catch {
      }
  }
  return tu.createRoot = function(t, e) {
    if (!d(t)) throw Error(f(299));
    var l = !1, n = "", a = ps, i = Ss, r = bs;
    return e != null && (e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (a = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (r = e.onRecoverableError)), e = P1(
      t,
      1,
      !1,
      null,
      null,
      l,
      n,
      null,
      a,
      i,
      r,
      od
    ), t[hn] = e.current, lr(t), new Er(e);
  }, tu.hydrateRoot = function(t, e, l) {
    if (!d(t)) throw Error(f(299));
    var n = !1, a = "", i = ps, r = Ss, s = bs, b = null;
    return l != null && (l.unstable_strictMode === !0 && (n = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (i = l.onUncaughtError), l.onCaughtError !== void 0 && (r = l.onCaughtError), l.onRecoverableError !== void 0 && (s = l.onRecoverableError), l.formState !== void 0 && (b = l.formState)), e = P1(
      t,
      1,
      !0,
      e,
      l ?? null,
      n,
      a,
      b,
      i,
      r,
      s,
      od
    ), e.context = td(null), l = e.current, n = ze(), n = oc(n), a = Al(n), a.callback = null, Ml(l, a, n), l = n, e.current.lanes = l, ra(e, l), Ke(e), t[hn] = e.current, lr(t), new Di(e);
  }, tu.version = "19.2.0", tu;
}
var lh;
function Mg() {
  if (lh) return Dr.exports;
  lh = 1;
  function u() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (c) {
        console.error(c);
      }
  }
  return u(), Dr.exports = Ag(), Dr.exports;
}
var zg = Mg();
const Ll = { transport: { name: "Add community transport", short: "Transport scenario", factor: 0.77, coverage: 1.65, detail: "Two additional weekday routes connect selected communities to existing service locations." }, capacity: { name: "Extend service hours", short: "Capacity scenario", factor: 0.86, coverage: 1.22, detail: "Evening appointments add capacity at existing service locations." }, mobile: { name: "Deploy a mobile care team", short: "Mobile care scenario", factor: 0.68, coverage: 2.05, detail: "A mobile team adds recurring visits in areas beyond the existing service footprint." } }, t0 = ["Transportation", "Service capacity", "Digital access"], Ch = (u, c = 0) => 36 + (Number(u) * 7 + c * 19) % 58, nh = () => /* @__PURE__ */ A.jsx(mg, { size: 23, "aria-hidden": "true" });
function qh({ zip: u, scenario: c, horizon: o = 6 }) {
  const f = 105 + Number(u) % 35, d = Math.round(f * (1 + 0.32 * o / 6)), y = Math.round(f * (1 + (Ll[c].factor - 1) * o / 6)), v = lc().domain([-6, o]).range([48, 380]), m = lc().domain([0, 220]).range([218, 38]), g = (h) => h.map((p, S) => `${S ? "L" : "M"}${v(p[0])},${m(p[1])}`).join(" ");
  return /* @__PURE__ */ A.jsxs("div", { className: "chart", children: [
    /* @__PURE__ */ A.jsx("h3", { children: "Compare sample demand" }),
    /* @__PURE__ */ A.jsxs("svg", { viewBox: "0 0 414 250", role: "img", "aria-label": `Illustrative demand index for ${u}: current plan ${d}; ${Ll[c].short} ${y} at ${o} months.`, children: [
      [0, 50, 100, 150, 200].map((h) => /* @__PURE__ */ A.jsxs("g", { children: [
        /* @__PURE__ */ A.jsx("line", { x1: "48", x2: "380", y1: m(h), y2: m(h), stroke: "#e1e8ee" }),
        /* @__PURE__ */ A.jsx("text", { x: "35", y: m(h) + 4, textAnchor: "end", children: h })
      ] }, h)),
      /* @__PURE__ */ A.jsx("text", { x: (48 + v(0)) / 2, y: "17", textAnchor: "middle", children: "Synthetic baseline" }),
      /* @__PURE__ */ A.jsx("text", { x: (380 + v(0)) / 2, y: "17", textAnchor: "middle", children: "Sample projection" }),
      /* @__PURE__ */ A.jsx("line", { x1: v(0), x2: v(0), y1: "30", y2: "218", stroke: "#a8b8cb", strokeDasharray: "5 5" }),
      /* @__PURE__ */ A.jsx("path", { d: g([[-6, f * 0.74], [-3, f * 0.88], [0, f]]), fill: "none", stroke: "var(--blue)", strokeWidth: "2.5" }),
      /* @__PURE__ */ A.jsx("path", { d: g([[0, f], [o, d]]), fill: "none", stroke: "var(--blue)", strokeWidth: "2.5", strokeDasharray: "7 5" }),
      /* @__PURE__ */ A.jsx("path", { d: g([[0, f], [o, y]]), fill: "none", stroke: "var(--teal)", strokeWidth: "2.5", strokeDasharray: "7 5" }),
      [[-6, f * 0.74, "var(--blue)"], [0, f, "var(--blue)"], [o, d, "var(--blue)"], [o, y, "var(--teal)"]].map(([h, p, S], M) => /* @__PURE__ */ A.jsx("circle", { cx: v(h), cy: m(p), r: "4.5", fill: S }, M)),
      /* @__PURE__ */ A.jsx("text", { x: "48", y: "240", children: "-6 months" }),
      /* @__PURE__ */ A.jsx("text", { x: v(0), y: "240", textAnchor: "middle", children: "Now" }),
      /* @__PURE__ */ A.jsxs("text", { x: "380", y: "240", textAnchor: "end", children: [
        "+",
        o,
        " months"
      ] }),
      /* @__PURE__ */ A.jsx("text", { transform: "translate(12,155) rotate(-90)", textAnchor: "middle", children: "Demand index" })
    ] }),
    /* @__PURE__ */ A.jsxs("div", { className: "chart-legend", children: [
      /* @__PURE__ */ A.jsxs("span", { children: [
        /* @__PURE__ */ A.jsx("i", {}),
        "Current plan"
      ] }),
      /* @__PURE__ */ A.jsxs("span", { children: [
        /* @__PURE__ */ A.jsx("i", { className: "teal" }),
        Ll[c].short
      ] })
    ] }),
    /* @__PURE__ */ A.jsx("small", { children: "Synthetic projection · index, not a count of people" })
  ] });
}
function Tg({ data: u, zip: c, setZip: o, layer: f, barrier: d, scenario: y, compact: v = !1 }) {
  const [m, g] = _.useState(1.85), { path: h, projection: p } = _.useMemo(() => {
    const C = dv();
    return u && C.fitExtent([[18, 20], [882, 442]], u), { projection: C, path: tv(C) };
  }, [u]), S = lc().domain([30, 65, 100]).range(["#e4f0fc", "#9bc3ee", "#396cd2"]), M = u == null ? void 0 : u.features.find((C) => C.properties.ZCTA5CE10 === c), H = M ? [+M.properties.INTPTLON10, +M.properties.INTPTLAT10] : [-73.82, 42.72], U = (u == null ? void 0 : u.features.filter((C, L) => L % 5 === 0).map((C) => [+C.properties.INTPTLON10, +C.properties.INTPTLAT10])) || [];
  return /* @__PURE__ */ A.jsxs("div", { className: "map-shell " + (v ? "compact" : ""), children: [
    /* @__PURE__ */ A.jsxs("div", { className: "map-tools", children: [
      /* @__PURE__ */ A.jsxs("label", { className: "map-location", children: [
        /* @__PURE__ */ A.jsx("span", { className: "sr-only", children: "Map ZIP area" }),
        /* @__PURE__ */ A.jsx("select", { "aria-label": "Map ZIP area", value: c, onChange: (C) => o(C.target.value), children: u == null ? void 0 : u.features.map((C) => C.properties.ZCTA5CE10).sort().map((C) => /* @__PURE__ */ A.jsxs("option", { value: C, children: [
          "ZIP area ",
          C
        ] }, C)) })
      ] }),
      /* @__PURE__ */ A.jsxs("div", { children: [
        /* @__PURE__ */ A.jsx("button", { "aria-label": "Zoom in", disabled: m >= 3.2, onClick: () => g(Math.min(3.2, m + 0.3)), children: /* @__PURE__ */ A.jsx(gg, {}) }),
        /* @__PURE__ */ A.jsx("button", { "aria-label": "Zoom out", disabled: m <= 1, onClick: () => g(Math.max(1, m - 0.3)), children: /* @__PURE__ */ A.jsx(vg, {}) }),
        /* @__PURE__ */ A.jsx("button", { "aria-label": "Reset map zoom", onClick: () => g(1.85), children: /* @__PURE__ */ A.jsx(hg, {}) })
      ] })
    ] }),
    u ? /* @__PURE__ */ A.jsx("svg", { className: "map", viewBox: "0 0 900 470", "aria-label": "Interactive ZIP tabulation area map", children: /* @__PURE__ */ A.jsxs("g", { transform: `translate(${450 * (1 - m)},${235 * (1 - m)}) scale(${m})`, children: [
      u.features.map((C) => {
        const L = C.properties.ZCTA5CE10, V = Ch(L, d);
        return /* @__PURE__ */ A.jsx("path", { d: h(C), fill: L === c ? "#214fcc" : S(f === "Forecast" ? Math.min(100, V + 12) : V), stroke: L === c ? "#132b42" : "#fff", strokeWidth: L === c ? 2 : 1, tabIndex: L === c ? 0 : -1, role: "button", "aria-label": `Select ZIP area ${L}`, "aria-pressed": L === c, onClick: () => o(L), onKeyDown: (Q) => {
          (Q.key === "Enter" || Q.key === " ") && (Q.preventDefault(), o(L));
        }, children: /* @__PURE__ */ A.jsxs("title", { children: [
          "ZIP area ",
          L,
          " · illustrative ",
          t0[d].toLowerCase(),
          " index ",
          V
        ] }) }, L);
      }),
      f === "Resource planning" && U.map((C, L) => /* @__PURE__ */ A.jsx("path", { d: h(Ry().center(C).radius(0.025 * Ll[y].coverage)()), fill: "#23616b", fillOpacity: ".09", stroke: "#23616b", strokeWidth: "1.3", strokeDasharray: "5 4", pointerEvents: "none" }, "c" + L)),
      U.map((C, L) => /* @__PURE__ */ A.jsx("circle", { cx: p(C)[0], cy: p(C)[1], r: "5", fill: "#23616b", stroke: "white", strokeWidth: "1.5", pointerEvents: "none" }, L)),
      M && /* @__PURE__ */ A.jsxs("g", { pointerEvents: "none", transform: `translate(${p(H)[0]},${p(H)[1]})`, children: [
        /* @__PURE__ */ A.jsx("circle", { r: "6", fill: "#132b42", stroke: "white", strokeWidth: "2" }),
        /* @__PURE__ */ A.jsx("rect", { x: "-59", y: "-39", width: "118", height: "26", fill: "#214fcc" }),
        /* @__PURE__ */ A.jsxs("text", { x: "0", y: "-21", textAnchor: "middle", fill: "white", fontSize: "13", children: [
          "ZIP area ",
          c
        ] })
      ] })
    ] }) }) : /* @__PURE__ */ A.jsx("p", { className: "map-loading", children: "Loading geographic boundaries…" }),
    /* @__PURE__ */ A.jsxs("div", { className: "map-legend", children: [
      /* @__PURE__ */ A.jsxs("span", { children: [
        /* @__PURE__ */ A.jsx("i", { className: "high" }),
        "Higher barriers"
      ] }),
      /* @__PURE__ */ A.jsxs("span", { children: [
        /* @__PURE__ */ A.jsx("i", { className: "low" }),
        "Lower barriers"
      ] }),
      /* @__PURE__ */ A.jsxs("span", { children: [
        /* @__PURE__ */ A.jsx("i", { className: "point" }),
        "Sample service location"
      ] }),
      f === "Resource planning" && /* @__PURE__ */ A.jsxs("span", { children: [
        /* @__PURE__ */ A.jsx("i", { className: "coverage" }),
        "Scenario coverage"
      ] })
    ] }),
    /* @__PURE__ */ A.jsx("div", { className: "map-caption", children: "Illustrative planning scenario" })
  ] });
}
function Ng({ data: u, compact: c = !1, onExplore: o, onReview: f }) {
  const [d, y] = _.useState("12205"), [v, m] = _.useState(c ? "Barriers" : "Resource planning"), [g, h] = _.useState("transport"), [p, S] = _.useState(0), [M, H] = _.useState(6), U = (u == null ? void 0 : u.features.map((C) => C.properties.ZCTA5CE10).sort()) || ["12205"];
  return /* @__PURE__ */ A.jsxs("div", { "data-layer": v, className: "workspace " + (c ? "workspace-compact" : ""), id: c ? void 0 : "planning", children: [
    /* @__PURE__ */ A.jsxs("div", { className: "geo-panel", children: [
      /* @__PURE__ */ A.jsxs("div", { className: "workspace-toolbar", children: [
        !c && /* @__PURE__ */ A.jsx("strong", { children: "Access planning" }),
        /* @__PURE__ */ A.jsx("div", { className: "tabs", role: "tablist", "aria-label": "Map view", children: ["Barriers", "Forecast", "Resource planning"].map((C) => /* @__PURE__ */ A.jsx("button", { onKeyDown: (L) => {
          if (L.key === "ArrowRight" || L.key === "ArrowLeft") {
            L.preventDefault();
            const V = Array.from(L.currentTarget.parentElement.children), Q = V.indexOf(L.currentTarget), K = V[(Q + (L.key === "ArrowRight" ? 1 : V.length - 1)) % V.length];
            K.focus(), K.click();
          }
        }, role: "tab", "aria-selected": v === C, onClick: () => m(C), children: C }, C)) })
      ] }),
      /* @__PURE__ */ A.jsx(Tg, { data: u, zip: d, setZip: y, layer: v, barrier: p, scenario: g, compact: c }),
      !c && /* @__PURE__ */ A.jsxs("div", { className: "map-filters", children: [
        /* @__PURE__ */ A.jsxs("label", { children: [
          "ZIP area",
          /* @__PURE__ */ A.jsx("select", { "aria-label": "ZIP area", value: d, onChange: (C) => y(C.target.value), children: U.map((C) => /* @__PURE__ */ A.jsx("option", { children: C }, C)) })
        ] }),
        /* @__PURE__ */ A.jsxs("label", { children: [
          "Barrier",
          /* @__PURE__ */ A.jsx("select", { "aria-label": "Barrier", value: p, onChange: (C) => S(+C.target.value), children: t0.map((C, L) => /* @__PURE__ */ A.jsx("option", { value: L, children: C }, C)) })
        ] }),
        /* @__PURE__ */ A.jsxs("p", { "aria-live": "polite", children: [
          /* @__PURE__ */ A.jsx("strong", { children: Ch(d, p) }),
          " / 100",
          /* @__PURE__ */ A.jsx("br", {}),
          /* @__PURE__ */ A.jsx("small", { children: "Illustrative barrier index" })
        ] })
      ] })
    ] }),
    !c && /* @__PURE__ */ A.jsxs("aside", { className: "response-panel", children: [
      /* @__PURE__ */ A.jsx("h2", { children: v === "Barriers" ? "Understand the barriers" : v === "Forecast" ? "Look ahead" : "Compare the response" }),
      /* @__PURE__ */ A.jsx("label", { className: "sr-only", htmlFor: "scenario", children: "Planning scenario" }),
      /* @__PURE__ */ A.jsx("select", { id: "scenario", value: g, onChange: (C) => h(C.target.value), children: Object.entries(Ll).map(([C, L]) => /* @__PURE__ */ A.jsx("option", { value: C, children: L.name }, C)) }),
      /* @__PURE__ */ A.jsx(qh, { zip: d, scenario: g, horizon: M }),
      /* @__PURE__ */ A.jsx("p", { children: "Explore the sample scenario, then use your own aggregate figures in the decision brief below." }),
      /* @__PURE__ */ A.jsxs("button", { className: "text-link", onClick: () => f({ zip: d, scenario: g, horizon: M, barrier: p }), children: [
        "Review scenario ",
        /* @__PURE__ */ A.jsx(nh, {})
      ] }),
      v === "Forecast" && /* @__PURE__ */ A.jsxs("label", { className: "horizon", children: [
        "Forecast horizon: ",
        M,
        " months",
        /* @__PURE__ */ A.jsx("input", { type: "range", min: "3", max: "12", step: "3", value: M, onChange: (C) => H(+C.target.value) })
      ] }),
      v === "Barriers" && /* @__PURE__ */ A.jsxs("p", { className: "context-note", children: [
        "Explore ",
        t0[p].toLowerCase(),
        " across neighboring areas. Select a ZIP area on the map or in the list to update the comparison."
      ] })
    ] }),
    c && v === "Forecast" && /* @__PURE__ */ A.jsxs("div", { className: "compact-result", children: [
      /* @__PURE__ */ A.jsx("strong", { children: "Explore a sample projection." }),
      /* @__PURE__ */ A.jsx("span", { children: "See how assumptions change a sample comparison." }),
      /* @__PURE__ */ A.jsxs("button", { className: "text-link", onClick: o, children: [
        "Open forecast ",
        /* @__PURE__ */ A.jsx(nh, {})
      ] })
    ] })
  ] });
}
function _g({ modal: u, close: c }) {
  const o = _.useRef(null), [f, d] = _.useState(!1), y = u.details;
  _.useEffect(() => {
    const m = document.activeElement;
    return o.current.showModal(), () => m == null ? void 0 : m.focus();
  }, []);
  const v = () => d(!0);
  return /* @__PURE__ */ A.jsxs("dialog", { "aria-label": "Scenario review", ref: o, onCancel: c, onClick: (m) => {
    m.target === o.current && c();
  }, children: [
    /* @__PURE__ */ A.jsx("button", { className: "close", onClick: c, "aria-label": "Close dialog", children: /* @__PURE__ */ A.jsx(pg, { size: 25 }) }),
    /* @__PURE__ */ A.jsxs(A.Fragment, { children: [
      /* @__PURE__ */ A.jsxs("p", { className: "eyebrow", children: [
        "ILLUSTRATIVE SCENARIO · ZIP AREA ",
        y.zip
      ] }),
      /* @__PURE__ */ A.jsx("h2", { children: Ll[y.scenario].name }),
      /* @__PURE__ */ A.jsx("p", { children: Ll[y.scenario].detail }),
      /* @__PURE__ */ A.jsx(qh, { zip: y.zip, scenario: y.scenario, horizon: y.horizon }),
      /* @__PURE__ */ A.jsx("h3", { children: "Planning assumptions" }),
      /* @__PURE__ */ A.jsxs("ul", { children: [
        /* @__PURE__ */ A.jsx("li", { children: "Existing locations remain open." }),
        /* @__PURE__ */ A.jsx("li", { children: "Demand and service capacity are synthetic demonstration inputs." }),
        /* @__PURE__ */ A.jsx("li", { children: "Coverage circles illustrate reach; they are not road-network travel-time estimates." })
      ] }),
      /* @__PURE__ */ A.jsx("p", { children: "Use this sample to explore the interface. Build a decision brief from your own aggregate evidence below. Production forecasts require local data, validation and human review." }),
      /* @__PURE__ */ A.jsxs("button", { className: "primary", onClick: v, children: [
        "Export scenario ",
        /* @__PURE__ */ A.jsx(yg, { size: 20 })
      ] }),
      f && /* @__PURE__ */ A.jsxs("label", { className: "export-label", children: [
        "Scenario export — select and copy",
        /* @__PURE__ */ A.jsx("textarea", { "aria-label": "Scenario export", readOnly: !0, rows: "9", value: JSON.stringify({ status: "Illustrative scenario; not a validated forecast", ...y, assumption: Ll[y.scenario].detail }, null, 2) })
      ] })
    ] })
  ] });
}
function Og({ compact: u }) {
  const [c, o] = _.useState(null), [f, d] = _.useState(!1), [y, v] = _.useState(null);
  return _.useEffect(() => {
    fetch(new URL(
      /* @vite-ignore */
      "capital-region-zcta.json",
      import.meta.url
    )).then((m) => {
      if (!m.ok) throw Error("Geography unavailable");
      return m.json();
    }).then(o).catch(() => d(!0));
  }, []), /* @__PURE__ */ A.jsxs(A.Fragment, { children: [
    !u && /* @__PURE__ */ A.jsx("p", { className: "sample-context", children: "SAMPLE MAP · Synthetic metrics and scenarios. Your decision brief below uses only the figures you enter." }),
    f ? /* @__PURE__ */ A.jsxs("p", { role: "alert", children: [
      "The interactive map could not load. ",
      /* @__PURE__ */ A.jsx("a", { href: "/cb-cap/request-demo", children: "Discuss your planning needs with us." })
    ] }) : /* @__PURE__ */ A.jsx(Ng, { data: c, compact: u, onExplore: () => {
      location.href = "/cb-cap";
    }, onReview: (m) => v({ type: "scenario", details: m }) }),
    !u && /* @__PURE__ */ A.jsx(yy, {}),
    !u && /* @__PURE__ */ A.jsx(dy, { currency: "USD" }),
    y && /* @__PURE__ */ A.jsx(_g, { modal: y, close: () => v(null) })
  ] });
}
for (const u of document.querySelectorAll("[data-planning-root]")) zg.createRoot(u).render(/* @__PURE__ */ A.jsx(Og, { compact: u.hasAttribute("data-compact") }));
