var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function (a, b, c) {
  a instanceof String && (a = String(a));
  for (var e = a.length, g = 0; g < e; g++) {
    var k = a[g];
    if (b.call(c, k, g, a)) return { i: g, v: k };
  }
  return { i: -1, v: void 0 };
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function (a, b, c) {
        a != Array.prototype && a != Object.prototype && (a[b] = c.value);
      };
$jscomp.getGlobal = function (a) {
  return "undefined" != typeof window && window === a
    ? a
    : "undefined" != typeof global && null != global
    ? global
    : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (a, b, c, e) {
  if (b) {
    c = $jscomp.global;
    a = a.split(".");
    for (e = 0; e < a.length - 1; e++) {
      var g = a[e];
      g in c || (c[g] = {});
      c = c[g];
    }
    a = a[a.length - 1];
    e = c[a];
    b = b(e);
    b != e &&
      null != b &&
      $jscomp.defineProperty(c, a, {
        configurable: !0,
        writable: !0,
        value: b,
      });
  }
};
$jscomp.polyfill(
  "Array.prototype.find",
  function (a) {
    return a
      ? a
      : function (a, c) {
          return $jscomp.findInternal(this, a, c).v;
        };
  },
  "es6",
  "es3"
);
(function (a, b) {
  function c(b, c) {
    c = c || {};
    var d = this,
      e = c.query || "> :even";
    a.extend(d, {
      $el: b,
      options: c,
      sections: [],
      isAccordion: c.accordion || !1,
      db: c.persist ? jQueryCollapseStorage(b.get(0).id) : !1,
    });
    d.states = d.db ? d.db.read() : [];
    d.$el.find(e).each(function () {
      new jQueryCollapseSection(a(this), d);
    });
    (function (b) {
      d.$el.on(
        "click",
        "[data-collapse-summary] " + (b.options.clickQuery || ""),
        a.proxy(d.handleClick, b)
      );
      d.$el.bind("toggle close open", a.proxy(d.handleEvent, b));
    })(d);
  }
  function e(b, c) {
    c.options.clickQuery || b.wrapInner('<a href="#"/>');
    a.extend(this, {
      isOpen: !1,
      $summary: b.attr("data-collapse-summary", ""),
      $details: b.next(),
      options: c.options,
      parent: c,
    });
    c.sections.push(this);
    b = c.states[this._index()];
    0 === b
      ? this.close(!0)
      : this.$summary.is(".open") || 1 === b
      ? this.open(!0)
      : this.close(!0);
  }
  c.prototype = {
    handleClick: function (b, c) {
      b.preventDefault();
      c = c || "toggle";
      for (var d = this.sections, e = d.length; e--; )
        if (a.contains(d[e].$summary[0], b.target)) {
          d[e][c]();
          break;
        }
    },
    handleEvent: function (a) {
      if (a.target == this.$el.get(0)) return this[a.type]();
      this.handleClick(a, a.type);
    },
    open: function (a) {
      this._change("open", a);
    },
    close: function (a) {
      this._change("close", a);
    },
    toggle: function (a) {
      this._change("toggle", a);
    },
    _change: function (b, c) {
      if (isFinite(c)) return this.sections[c][b]();
      a.each(this.sections, function (a, c) {
        c[b]();
      });
    },
  };
  e.prototype = {
    toggle: function () {
      this.isOpen ? this.close() : this.open();
    },
    close: function (a) {
      this._changeState("close", a);
    },
    open: function (b) {
      this.options.accordion &&
        !b &&
        a.each(this.parent.sections, function (a, b) {
          b.close();
        });
      this._changeState("open", b);
    },
    _index: function () {
      return a.inArray(this, this.parent.sections);
    },
    _changeState: function (b, c) {
      this.isOpen = "open" == b;
      if (a.isFunction(this.options[b]) && !c)
        this.options[b].apply(this.$details);
      else this.$details[this.isOpen ? "show" : "hide"]();
      this.$summary.toggleClass("open", "close" !== b);
      this.$details.attr("aria-hidden", "close" === b);
      this.$summary.attr("aria-expanded", "open" === b);
      this.$summary.trigger("open" === b ? "opened" : "closed", this);
      this.parent.db && this.parent.db.write(this._index(), this.isOpen);
    },
  };
  a.fn.extend({
    collapse: function (b, e) {
      return (e ? a("body").find("[data-collapse]") : a(this)).each(
        function () {
          var d = e ? {} : b,
            h = a(this).attr("data-collapse") || "";
          a.each(h.split(" "), function (a, b) {
            b && (d[b] = !0);
          });
          new c(a(this), d);
        }
      );
    },
  });
  b.jQueryCollapse = c;
  b.jQueryCollapseSection = e;
  a(function () {
    a.fn.collapse(!1, !0);
  });
})(window.jQuery, window);
window.Modernizr = (function (a, b, c) {
  function e(a, b) {
    return typeof a === b;
  }
  function g(a, b) {
    for (var d in a) {
      var e = a[d];
      if (!~("" + e).indexOf("-") && m[e] !== c) return "pfx" == b ? e : !0;
    }
    return !1;
  }
  function k(a, b, d) {
    var p = a.charAt(0).toUpperCase() + a.slice(1),
      f = (a + " " + u.join(p + " ") + p).split(" ");
    if (e(b, "string") || e(b, "undefined")) b = g(f, b);
    else
      a: {
        (f = (a + " " + w.join(p + " ") + p).split(" ")), (a = f);
        for (var q in a)
          if (((p = b[a[q]]), p !== c)) {
            b = !1 === d ? a[q] : e(p, "function") ? p.bind(d || b) : p;
            break a;
          }
        b = !1;
      }
    return b;
  }
  function d() {
    h.input = (function (c) {
      for (var d = 0, e = c.length; d < e; d++) B[c[d]] = c[d] in n;
      return (
        B.list &&
          (B.list = !!b.createElement("datalist") && !!a.HTMLDataListElement),
        B
      );
    })(
      "autocomplete autofocus list placeholder max min multiple pattern required step".split(
        " "
      )
    );
    h.inputtypes = (function (a) {
      for (var d = 0, e, f, q, h = a.length; d < h; d++)
        n.setAttribute("type", (f = a[d])),
          (e = "text" !== n.type) &&
            ((n.value = r),
            (n.style.cssText = "position:absolute;visibility:hidden;"),
            /^range$/.test(f) && n.style.WebkitAppearance !== c
              ? (l.appendChild(n),
                (q = b.defaultView),
                (e =
                  q.getComputedStyle &&
                  "textfield" !==
                    q.getComputedStyle(n, null).WebkitAppearance &&
                  0 !== n.offsetHeight),
                l.removeChild(n))
              : /^(search|tel)$/.test(f) ||
                (/^(url|email)$/.test(f)
                  ? (e = n.checkValidity && !1 === n.checkValidity())
                  : (e = n.value != r))),
          (I[a[d]] = !!e);
      return I;
    })(
      "search tel url email datetime date month week time datetime-local number range color".split(
        " "
      )
    );
  }
  var h = {},
    l = b.documentElement,
    f = b.createElement("modernizr"),
    m = f.style,
    n = b.createElement("input"),
    r = ":)",
    y = {}.toString,
    t = " -webkit- -moz- -o- -ms- ".split(" "),
    u = ["Webkit", "Moz", "O", "ms"],
    w = ["webkit", "moz", "o", "ms"];
  f = {};
  var I = {},
    B = {},
    D = [],
    E = D.slice,
    F,
    z = function (a, c, d, e) {
      var p,
        f,
        q,
        h = b.createElement("div"),
        g = b.body,
        k = g || b.createElement("body");
      if (parseInt(d, 10))
        for (; d--; ) {
          var A = b.createElement("div");
          A.id = e ? e[d] : "modernizr" + (d + 1);
          h.appendChild(A);
        }
      return (
        (p = ['&#173;<style id="smodernizr">', a, "</style>"].join("")),
        (h.id = "modernizr"),
        ((g ? h : k).innerHTML += p),
        k.appendChild(h),
        g ||
          ((k.style.background = ""),
          (k.style.overflow = "hidden"),
          (q = l.style.overflow),
          (l.style.overflow = "hidden"),
          l.appendChild(k)),
        (f = c(h, a)),
        g
          ? h.parentNode.removeChild(h)
          : (k.parentNode.removeChild(k), (l.style.overflow = q)),
        !!f
      );
    },
    G = (function () {
      var a = {
        select: "input",
        change: "input",
        submit: "form",
        reset: "form",
        error: "img",
        load: "img",
        abort: "img",
      };
      return function (d, f) {
        f = f || b.createElement(a[d] || "div");
        d = "on" + d;
        var p = d in f;
        return (
          p ||
            (f.setAttribute || (f = b.createElement("div")),
            f.setAttribute &&
              f.removeAttribute &&
              (f.setAttribute(d, ""),
              (p = e(f[d], "function")),
              e(f[d], "undefined") || (f[d] = c),
              f.removeAttribute(d))),
          p
        );
      };
    })(),
    v = {}.hasOwnProperty,
    C;
  e(v, "undefined") || e(v.call, "undefined")
    ? (C = function (a, b) {
        return b in a && e(a.constructor.prototype[b], "undefined");
      })
    : (C = function (a, b) {
        return v.call(a, b);
      });
  Function.prototype.bind ||
    (Function.prototype.bind = function (a) {
      var b = this;
      if ("function" != typeof b) throw new TypeError();
      var c = E.call(arguments, 1),
        d = function () {
          if (this instanceof d) {
            var e = function () {};
            e.prototype = b.prototype;
            e = new e();
            var f = b.apply(e, c.concat(E.call(arguments)));
            return Object(f) === f ? f : e;
          }
          return b.apply(a, c.concat(E.call(arguments)));
        };
      return d;
    });
  f.flexbox = function () {
    return k("flexWrap");
  };
  f.flexboxlegacy = function () {
    return k("boxDirection");
  };
  f.canvas = function () {
    var a = b.createElement("canvas");
    return !!a.getContext && !!a.getContext("2d");
  };
  f.canvastext = function () {
    return (
      !!h.canvas &&
      !!e(b.createElement("canvas").getContext("2d").fillText, "function")
    );
  };
  f.touch = function () {
    var c;
    return (
      "ontouchstart" in a || (a.DocumentTouch && b instanceof DocumentTouch)
        ? (c = !0)
        : z(
            [
              "@media (",
              t.join("touch-enabled),("),
              "modernizr){#modernizr{top:9px;position:absolute}}",
            ].join(""),
            function (a) {
              c = 9 === a.offsetTop;
            }
          ),
      c
    );
  };
  f.postmessage = function () {
    return !!a.postMessage;
  };
  f.websqldatabase = function () {
    return !!a.openDatabase;
  };
  f.indexedDB = function () {
    return !!k("indexedDB", a);
  };
  f.hashchange = function () {
    return G("hashchange", a) && (b.documentMode === c || 7 < b.documentMode);
  };
  f.history = function () {
    return !!a.history && !!history.pushState;
  };
  f.draganddrop = function () {
    var a = b.createElement("div");
    return "draggable" in a || ("ondragstart" in a && "ondrop" in a);
  };
  f.websockets = function () {
    return "WebSocket" in a || "MozWebSocket" in a;
  };
  f.rgba = function () {
    m.cssText = "background-color:rgba(150,255,150,.5)";
    return !!~("" + m.backgroundColor).indexOf("rgba");
  };
  f.hsla = function () {
    m.cssText = "background-color:hsla(120,40%,100%,.5)";
    return (
      !!~("" + m.backgroundColor).indexOf("rgba") ||
      !!~("" + m.backgroundColor).indexOf("hsla")
    );
  };
  f.multiplebgs = function () {
    m.cssText = "background:url(https://),url(https://),red url(https://)";
    return /(url\s*\(.*?){3}/.test(m.background);
  };
  f.backgroundsize = function () {
    return k("backgroundSize");
  };
  f.borderimage = function () {
    return k("borderImage");
  };
  f.borderradius = function () {
    return k("borderRadius");
  };
  f.boxshadow = function () {
    return k("boxShadow");
  };
  f.textshadow = function () {
    return "" === b.createElement("div").style.textShadow;
  };
  f.opacity = function () {
    m.cssText = t.join("opacity:.55;") + "";
    return /^0.55$/.test(m.opacity);
  };
  f.cssanimations = function () {
    return k("animationName");
  };
  f.csscolumns = function () {
    return k("columnCount");
  };
  f.cssgradients = function () {
    m.cssText = (
      "background-image:-webkit-gradient(linear,left top,right bottom,from(#9f9),to(white));background-image:" +
      t.join("linear-gradient(left top,#9f9, white);background-image:")
    ).slice(0, -17);
    return !!~("" + m.backgroundImage).indexOf("gradient");
  };
  f.cssreflections = function () {
    return k("boxReflect");
  };
  f.csstransforms = function () {
    return !!k("transform");
  };
  f.csstransforms3d = function () {
    var a = !!k("perspective");
    return (
      a &&
        "webkitPerspective" in l.style &&
        z(
          "@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",
          function (b, c) {
            a = 9 === b.offsetLeft && 3 === b.offsetHeight;
          }
        ),
      a
    );
  };
  f.csstransitions = function () {
    return k("transition");
  };
  f.fontface = function () {
    var a;
    return (
      z('@font-face {font-family:"font";src:url("https://")}', function (c, d) {
        c = b.getElementById("smodernizr");
        c = (c = c.sheet || c.styleSheet)
          ? c.cssRules && c.cssRules[0]
            ? c.cssRules[0].cssText
            : c.cssText || ""
          : "";
        a = /src/i.test(c) && 0 === c.indexOf(d.split(" ")[0]);
      }),
      a
    );
  };
  f.generatedcontent = function () {
    var a;
    return (
      z(
        [
          '#modernizr{font:0/0 a}#modernizr:after{content:"',
          r,
          '";visibility:hidden;font:3px/1 a}',
        ].join(""),
        function (b) {
          a = 3 <= b.offsetHeight;
        }
      ),
      a
    );
  };
  f.video = function () {
    var a = b.createElement("video"),
      c = !1;
    try {
      if ((c = !!a.canPlayType))
        (c = new Boolean(c)),
          (c.ogg = a
            .canPlayType('video/ogg; codecs="theora"')
            .replace(/^no$/, "")),
          (c.h264 = a
            .canPlayType('video/mp4; codecs="avc1.42E01E"')
            .replace(/^no$/, "")),
          (c.webm = a
            .canPlayType('video/webm; codecs="vp8, vorbis"')
            .replace(/^no$/, ""));
    } catch (A) {}
    return c;
  };
  f.audio = function () {
    var a = b.createElement("audio"),
      c = !1;
    try {
      if ((c = !!a.canPlayType))
        (c = new Boolean(c)),
          (c.ogg = a
            .canPlayType('audio/ogg; codecs="vorbis"')
            .replace(/^no$/, "")),
          (c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, "")),
          (c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, "")),
          (c.m4a = (
            a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")
          ).replace(/^no$/, ""));
    } catch (A) {}
    return c;
  };
  f.localstorage = function () {
    try {
      return (
        localStorage.setItem("modernizr", "modernizr"),
        localStorage.removeItem("modernizr"),
        !0
      );
    } catch (q) {
      return !1;
    }
  };
  f.sessionstorage = function () {
    try {
      return (
        sessionStorage.setItem("modernizr", "modernizr"),
        sessionStorage.removeItem("modernizr"),
        !0
      );
    } catch (q) {
      return !1;
    }
  };
  f.webworkers = function () {
    return !!a.Worker;
  };
  f.applicationcache = function () {
    return !!a.applicationCache;
  };
  f.svg = function () {
    return (
      !!b.createElementNS &&
      !!b.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect
    );
  };
  f.inlinesvg = function () {
    var a = b.createElement("div");
    return (
      (a.innerHTML = "<svg/>"),
      "http://www.w3.org/2000/svg" ==
        (a.firstChild && a.firstChild.namespaceURI)
    );
  };
  f.svgclippaths = function () {
    return (
      !!b.createElementNS &&
      /SVGClipPath/.test(
        y.call(b.createElementNS("http://www.w3.org/2000/svg", "clipPath"))
      )
    );
  };
  for (var H in f)
    C(f, H) &&
      ((F = H.toLowerCase()), (h[F] = f[H]()), D.push((h[F] ? "" : "no-") + F));
  h.input || d();
  h.addTest = function (a, b) {
    if ("object" == typeof a) for (var d in a) C(a, d) && h.addTest(d, a[d]);
    else {
      a = a.toLowerCase();
      if (h[a] !== c) return h;
      b = "function" == typeof b ? b() : b;
      l.className += " dealer" + (b ? "" : "no-") + a;
      h[a] = b;
    }
    return h;
  };
  m.cssText = "";
  return (
    (f = n = null),
    (function (a, b) {
      function c() {
        var a = q.elements;
        return "string" == typeof a ? a.split(" ") : a;
      }
      function d(a) {
        var b = J[a[m]];
        return b || ((b = {}), n++, (a[m] = n), (J[n] = b)), b;
      }
      function e(a, c, e) {
        c || (c = b);
        if (r) return c.createElement(a);
        e || (e = d(c));
        var f;
        return (
          e.cache[a]
            ? (f = e.cache[a].cloneNode())
            : p.test(a)
            ? (f = (e.cache[a] = e.createElem(a)).cloneNode())
            : (f = e.createElem(a)),
          !f.canHaveChildren || k.test(a) || f.tagUrn
            ? f
            : e.frag.appendChild(f)
        );
      }
      function f(a, b) {
        b.cache ||
          ((b.cache = {}),
          (b.createElem = a.createElement),
          (b.createFrag = a.createDocumentFragment),
          (b.frag = b.createFrag()));
        a.createElement = function (c) {
          return q.shivMethods ? e(c, a, b) : b.createElem(c);
        };
        a.createDocumentFragment = Function(
          "h,f",
          "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" +
            c()
              .join()
              .replace(/[\w\-]+/g, function (a) {
                return (
                  b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
                );
              }) +
            ");return n}"
        )(q, b.frag);
      }
      function h(a) {
        a || (a = b);
        var c = d(a);
        if (q.shivCSS && !l && !c.hasCSS) {
          var e = a;
          var h = e.createElement("p");
          e = e.getElementsByTagName("head")[0] || e.documentElement;
          h =
            ((h.innerHTML =
              "x<style>article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}</style>"),
            e.insertBefore(h.lastChild, e.firstChild));
          c.hasCSS = !!h;
        }
        return r || f(a, c), a;
      }
      var g = a.html5 || {},
        k =
          /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
        p =
          /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
        l,
        m = "_html5shiv",
        n = 0,
        J = {},
        r;
      (function () {
        try {
          var a = b.createElement("a");
          a.innerHTML = "<xyz></xyz>";
          l = "hidden" in a;
          var c;
          if (!(c = 1 == a.childNodes.length)) {
            b.createElement("a");
            var d = b.createDocumentFragment();
            c =
              "undefined" == typeof d.cloneNode ||
              "undefined" == typeof d.createDocumentFragment ||
              "undefined" == typeof d.createElement;
          }
          r = c;
        } catch (K) {
          r = l = !0;
        }
      })();
      var q = {
        elements:
          g.elements ||
          "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
        version: "3.7.0",
        shivCSS: !1 !== g.shivCSS,
        supportsUnknownElements: r,
        shivMethods: !1 !== g.shivMethods,
        type: "default",
        shivDocument: h,
        createElement: e,
        createDocumentFragment: function (a, e) {
          a || (a = b);
          if (r) return a.createDocumentFragment();
          e = e || d(a);
          a = e.frag.cloneNode();
          e = 0;
          for (var f = c(), h = f.length; e < h; e++) a.createElement(f[e]);
          return a;
        },
      };
      a.html5 = q;
      h(b);
    })(this, b),
    (h._version = "2.8.3"),
    (h._prefixes = t),
    (h._domPrefixes = w),
    (h._cssomPrefixes = u),
    (h.mq = function (b) {
      var c = a.matchMedia || a.msMatchMedia;
      if (c) return (c(b) && c(b).matches) || !1;
      var d;
      return (
        z(
          "@media " + b + " { #modernizr { position: absolute; } }",
          function (b) {
            d =
              "absolute" ==
              (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle)
                .position;
          }
        ),
        d
      );
    }),
    (h.hasEvent = G),
    (h.testProp = function (a) {
      return g([a]);
    }),
    (h.testAllProps = k),
    (h.testStyles = z),
    (l.className =
      l.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") +
      (" dealerjs dealer" + D.join(" dealer"))),
    h
  );
})(this, this.document);
(function (a, b, c) {
  function e(a) {
    return "[object Function]" == t.call(a);
  }
  function g(a) {
    return "string" == typeof a;
  }
  function k() {}
  function d(a) {
    return !a || "loaded" == a || "complete" == a || "uninitialized" == a;
  }
  function h() {
    var a = u.shift();
    w = 1;
    a
      ? a.t
        ? r(function () {
            ("c" == a.t ? q.injectCss : q.injectJs)(a.s, 0, a.a, a.x, a.e, 1);
          }, 0)
        : (a(), h())
      : (w = 0);
  }
  function l(a, c, e, f, g, k, l) {
    function p(b) {
      if (
        !n &&
        d(m.readyState) &&
        ((t.r = n = 1), !w && h(), (m.onload = m.onreadystatechange = null), b)
      ) {
        "img" != a &&
          r(function () {
            D.removeChild(m);
          }, 50);
        for (var e in v[c]) v[c].hasOwnProperty(e) && v[c][e].onload();
      }
    }
    l = l || q.errorTimeout;
    var m = b.createElement(a),
      n = 0,
      A = 0,
      t = { t: e, s: c, e: g, a: k, x: l };
    1 === v[c] && ((A = 1), (v[c] = []));
    "object" == a ? (m.data = c) : ((m.src = c), (m.type = a));
    m.width = m.height = "0";
    m.onerror =
      m.onload =
      m.onreadystatechange =
        function () {
          p.call(this, A);
        };
    u.splice(f, 0, t);
    "img" != a &&
      (A || 2 === v[c]
        ? (D.insertBefore(m, B ? null : y), r(p, l))
        : v[c].push(m));
  }
  function f(a, b, c, d, e) {
    return (
      (w = 0),
      (b = b || "j"),
      g(a)
        ? l("c" == b ? F : E, a, b, this.i++, c, d, e)
        : (u.splice(this.i++, 0, a), 1 == u.length && h()),
      this
    );
  }
  function m() {
    var a = q;
    return (a.loader = { load: f, i: 0 }), a;
  }
  var n = b.documentElement,
    r = a.setTimeout,
    y = b.getElementsByTagName("script")[0],
    t = {}.toString,
    u = [],
    w = 0,
    I = "MozAppearance" in n.style,
    B = I && !!b.createRange().compareNode,
    D = B ? n : y.parentNode;
  n = a.opera && "[object Opera]" == t.call(a.opera);
  n = !!b.attachEvent && !n;
  var E = I ? "object" : n ? "script" : "img",
    F = n ? "script" : E,
    z =
      Array.isArray ||
      function (a) {
        return "[object Array]" == t.call(a);
      },
    G = [],
    v = {},
    C = {
      timeout: function (a, b) {
        return b.length && (a.timeout = b[0]), a;
      },
    },
    H;
  var q = function (a) {
    function b(a) {
      a = a.split("!");
      var b = G.length,
        c = a.pop(),
        d = a.length;
      c = { url: c, origUrl: c, prefixes: a };
      var e, f;
      for (f = 0; f < d; f++) {
        var h = a[f].split("=");
        (e = C[h.shift()]) && (c = e(c, h));
      }
      for (f = 0; f < b; f++) c = G[f](c);
      return c;
    }
    function d(a, d, f, h, g) {
      var k = b(a),
        l = k.autoCallback;
      k.url.split(".").pop().split("?").shift();
      k.bypass ||
        (d &&
          (d = e(d) ? d : d[a] || d[h] || d[a.split("/").pop().split("?")[0]]),
        k.instead
          ? k.instead(a, d, f, h, g)
          : (v[k.url] ? (k.noexec = !0) : (v[k.url] = 1),
            f.load(
              k.url,
              k.forceCSS ||
                (!k.forceJS &&
                  "css" == k.url.split(".").pop().split("?").shift())
                ? "c"
                : c,
              k.noexec,
              k.attrs,
              k.timeout
            ),
            (e(d) || e(l)) &&
              f.load(function () {
                m();
                d && d(k.origUrl, g, h);
                l && l(k.origUrl, g, h);
                v[k.url] = 2;
              })));
    }
    function f(a, b) {
      function c(a, c) {
        if (a)
          if (g(a))
            c ||
              (l = function () {
                var a = [].slice.call(arguments);
                m.apply(this, a);
                n();
              }),
              d(a, l, b, 0, f);
          else {
            if (Object(a) === a)
              for (p in ((r = (function () {
                var b = 0,
                  c;
                for (c in a) a.hasOwnProperty(c) && b++;
                return b;
              })()),
              a))
                a.hasOwnProperty(p) &&
                  (!c &&
                    !--r &&
                    (e(l)
                      ? (l = function () {
                          var a = [].slice.call(arguments);
                          m.apply(this, a);
                          n();
                        })
                      : (l[p] = (function (a) {
                          return function () {
                            var b = [].slice.call(arguments);
                            a && a.apply(this, b);
                            n();
                          };
                        })(m[p]))),
                  d(a[p], l, b, p, f));
          }
        else !c && n();
      }
      var f = !!a.test,
        h = a.load || a.both,
        l = a.callback || k,
        m = l,
        n = a.complete || k,
        r,
        p;
      c(f ? a.yep : a.nope, !!h);
      h && c(h);
    }
    var h,
      l = this.yepnope.loader;
    if (g(a)) d(a, 0, l, 0);
    else if (z(a))
      for (h = 0; h < a.length; h++) {
        var n = a[h];
        g(n) ? d(n, 0, l, 0) : z(n) ? q(n) : Object(n) === n && f(n, l);
      }
    else Object(a) === a && f(a, l);
  };
  q.addPrefix = function (a, b) {
    C[a] = b;
  };
  q.addFilter = function (a) {
    G.push(a);
  };
  q.errorTimeout = 1e4;
  null == b.readyState &&
    b.addEventListener &&
    ((b.readyState = "loading"),
    b.addEventListener(
      "DOMContentLoaded",
      (H = function () {
        b.removeEventListener("DOMContentLoaded", H, 0);
        b.readyState = "complete";
      }),
      0
    ));
  a.yepnope = m();
  a.yepnope.executeStack = h;
  a.yepnope.injectJs = function (a, c, e, f, g, l) {
    var m = b.createElement("script"),
      n,
      p;
    f = f || q.errorTimeout;
    m.src = a;
    for (p in e) m.setAttribute(p, e[p]);
    c = l ? h : c || k;
    m.onreadystatechange = m.onload = function () {
      !n &&
        d(m.readyState) &&
        ((n = 1), c(), (m.onload = m.onreadystatechange = null));
    };
    r(function () {
      n || ((n = 1), c(1));
    }, f);
    g ? m.onload() : y.parentNode.insertBefore(m, y);
  };
  a.yepnope.injectCss = function (a, c, d, e, f, g) {
    e = b.createElement("link");
    var l;
    c = g ? h : c || k;
    e.href = a;
    e.rel = "stylesheet";
    e.type = "text/css";
    for (l in d) e.setAttribute(l, d[l]);
    f || (y.parentNode.insertBefore(e, y), r(c, 0));
  };
})(this, document);
Modernizr.load = function () {
  yepnope.apply(window, [].slice.call(arguments, 0));
};
(function (a) {
  a.fn.viewportChecker = function (b) {
    var c = {
      classToAdd: "visible",
      offset: 100,
      callbackFunction: function (a) {},
    };
    a.extend(c, b);
    var e = this,
      g = a(window).height();
    this.checkElements = function () {
      var b =
          -1 != navigator.userAgent.toLowerCase().indexOf("webkit")
            ? "body"
            : "html",
        d = a(b).scrollTop(),
        h = d + g;
      e.each(function () {
        var b = a(this);
        if (!b.hasClass(c.classToAdd)) {
          var e = Math.round(b.offset().top) + c.offset,
            g = e + b.height();
          e < h && g > d && (b.addClass(c.classToAdd), c.callbackFunction(b));
        }
      });
    };
    a(window).scroll(this.checkElements);
    this.checkElements();
    a(window).resize(function (a) {
      g = a.currentTarget.innerHeight;
    });
  };
})(jQuery);
(function (a, b, c) {
  a.ImageZoom = function (c, g) {
    function e(a) {
      a = parseInt(a);
      return (a = isNaN(a) ? 0 : a);
    }
    var d = this;
    d.$el = a(c);
    d.$el.data("imagezoom", d);
    d.init = function (b) {
      d.options = a.extend({}, a.ImageZoom.defaults, b);
      d.$viewer = a(
        '<div class="zm-viewer ' + d.options.zoomViewerClass + '"></div>'
      ).appendTo("body");
      d.$handler = a(
        '<div class="zm-handler' + d.options.zoomHandlerClass + '"></div>'
      ).appendTo("body");
      d.isBigImageReady = -1;
      d.$largeImg = null;
      d.isActive = !1;
      d.$handlerArea = null;
      d.isWebkit =
        /chrome/.test(navigator.userAgent.toLowerCase()) ||
        /safari/.test(navigator.userAgent.toLowerCase());
      d.evt = { x: -1, y: -1 };
      d.options.bigImageSrc =
        "" == d.options.bigImageSrc ? d.$el.attr("src") : d.options.bigImageSrc;
      new Image().src = d.options.bigImageSrc;
      d.callIndex = a.ImageZoom._calltimes + 1;
      d.animateTimer = null;
      a.ImageZoom._calltimes += 1;
      a(document).bind("mousemove.imagezoom" + d.callIndex, function (a) {
        d.isActive && d.moveHandler(a.pageX, a.pageY);
      });
      d.$el.bind("mouseover.imagezoom", function (a) {
        d.isActive = !0;
        d.showViewer(a);
      });
    };
    d.moveHandler = function (a, c) {
      var f = d.$el.offset(),
        g = d.$el.outerWidth(!1),
        h = d.$el.outerHeight(!1);
      if (a >= f.left && a <= f.left + g && c >= f.top && c <= f.top + h) {
        if (
          ((f.left =
            f.left +
            e(d.$el.css("borderLeftWidth")) +
            e(d.$el.css("paddingLeft"))),
          (f.top =
            f.top +
            e(d.$el.css("borderTopWidth")) +
            e(d.$el.css("paddingTop"))),
          (g = d.$el.width()),
          (h = d.$el.height()),
          a >= f.left &&
            a <= f.left + g &&
            c >= f.top &&
            c <= f.top + h &&
            ((d.evt = { x: a, y: c }),
            "follow" == d.options.type &&
              d.$viewer.css({
                top: c - d.$viewer.outerHeight(!1) / 2,
                left: a - d.$viewer.outerWidth(!1) / 2,
              }),
            1 == d.isBigImageReady))
        ) {
          c -= f.top;
          a -= f.left;
          if ("inner" == d.options.type) {
            var k = (-d.$largeImg.height() * c) / h + c;
            var l = (-d.$largeImg.width() * a) / g + a;
          } else if ("standard" == d.options.type) {
            var t = a - d.$handlerArea.width() / 2,
              u = c - d.$handlerArea.height() / 2;
            k = d.$handlerArea.width();
            l = d.$handlerArea.height();
            0 > t ? (t = 0) : t > g - k && (t = g - k);
            0 > u ? (u = 0) : u > h - l && (u = h - l);
            l = -t / d.scale;
            k = -u / d.scale;
            d.isWebkit
              ? (d.$handlerArea.css({ opacity: 0.99 }),
                setTimeout(function () {
                  d.$handlerArea.css({ top: u, left: t, opacity: 1 });
                }, 0))
              : d.$handlerArea.css({ top: u, left: t });
          } else
            "follow" == d.options.type &&
              ((k =
                (-d.$largeImg.height() / h) * c + d.options.zoomSize[1] / 2),
              (l = (-d.$largeImg.width() / g) * a + d.options.zoomSize[0] / 2),
              -k > d.$largeImg.height() - d.options.zoomSize[1]
                ? (k = -(d.$largeImg.height() - d.options.zoomSize[1]))
                : 0 < k && (k = 0),
              -l > d.$largeImg.width() - d.options.zoomSize[0]
                ? (l = -(d.$largeImg.width() - d.options.zoomSize[0]))
                : 0 < l && (l = 0));
          d.options.smoothMove
            ? (b.clearTimeout(d.animateTimer), d.smoothMove(l, k))
            : d.$viewer.find("img").css({ top: k, left: l });
        }
      } else
        (d.isActive = !1),
          d.$viewer.hide(),
          d.$handler.hide(),
          d.options.onHide(d),
          b.clearTimeout(d.animateTimer),
          (d.animateTimer = null);
    };
    d.showViewer = function (b) {
      var c = d.$el.offset().top,
        f = e(d.$el.css("borderTopWidth")),
        g = e(d.$el.css("paddingTop")),
        h = d.$el.offset().left,
        k = e(d.$el.css("borderLeftWidth")),
        y = e(d.$el.css("paddingLeft"));
      c = c + f + g;
      h = h + k + y;
      var t = d.$el.width();
      f = d.$el.height();
      1 > d.isBigImageReady && a("div", d.$viewer).remove();
      if ("inner" == d.options.type)
        d.$viewer.css({ top: c, left: h, width: t, height: f }).show();
      else if ("standard" == d.options.type) {
        g = "" == d.options.alignTo ? d.$el : a("#" + d.options.alignTo);
        if ("left" == d.options.position) {
          var u = g.offset().left - d.options.zoomSize[0] - d.options.offset[0];
          var w = g.offset().top + d.options.offset[1];
        } else
          "right" == d.options.position &&
            ((u = g.offset().left + g.width() + d.options.offset[0]),
            (w = g.offset().top + d.options.offset[1]));
        d.$viewer
          .css({
            top: w,
            left: u,
            width: d.options.zoomSize[0],
            height: d.options.zoomSize[1],
          })
          .show();
        d.$handlerArea &&
          ((d.scale = t / d.$largeImg.width()),
          d.$handlerArea.css({
            width: d.$viewer.width() * d.scale,
            height: d.$viewer.height() * d.scale,
          }));
      } else
        "follow" == d.options.type &&
          d.$viewer
            .css({
              width: d.options.zoomSize[0],
              height: d.options.zoomSize[1],
              top: b.pageY - d.options.zoomSize[1] / 2,
              left: b.pageX - d.options.zoomSize[0] / 2,
            })
            .show();
      d.$handler.css({ top: c, left: h, width: t, height: f }).show();
      d.options.onShow(d);
      -1 == d.isBigImageReady &&
        ((d.isBigImageReady = 0),
        fastImg(
          d.options.bigImageSrc,
          function () {
            if (a.trim(a(this).attr("src")) == a.trim(d.options.bigImageSrc)) {
              d.$viewer.append(
                '<img src="' +
                  d.$el.attr("src") +
                  '" class="zm-fast" style="position:absolute;width:' +
                  this.width +
                  "px;height:" +
                  this.height +
                  'px">'
              );
              d.isBigImageReady = 1;
              d.$largeImg = a(
                '<img src="' +
                  d.options.bigImageSrc +
                  '" style="position:absolute;width:' +
                  this.width +
                  "px;height:" +
                  this.height +
                  'px">'
              );
              d.$viewer.append(d.$largeImg);
              if ("standard" == d.options.type) {
                var c = t / this.width;
                d.$handlerArea = a(
                  '<div class="zm-handlerarea" style="width:' +
                    d.$viewer.width() * c +
                    "px;height:" +
                    d.$viewer.height() * c +
                    'px"></div>'
                ).appendTo(d.$handler);
                d.scale = c;
              }
              -1 == d.evt.x && -1 == d.evt.y
                ? d.moveHandler(b.pageX, b.pageY)
                : d.moveHandler(d.evt.x, d.evt.y);
              d.options.showDescription &&
                d.$el.attr("alt") &&
                "" != a.trim(d.$el.attr("alt")) &&
                d.$viewer.append(
                  '<div class="' +
                    d.options.descriptionClass +
                    '">' +
                    d.$el.attr("alt") +
                    "</div>"
                );
            }
          },
          function () {},
          function () {}
        ));
    };
    d.changeImage = function (a, c) {
      this.$el.attr("src", a);
      this.isBigImageReady = -1;
      this.options.bigImageSrc = "string" === typeof c ? c : a;
      d.options.preload && (new Image().src = this.options.bigImageSrc);
      this.$viewer.hide().empty();
      this.$handler.hide().empty();
      this.$handlerArea = null;
    };
    d.changeZoomSize = function (a, c) {
      d.options.zoomSize = [a, c];
    };
    d.destroy = function () {
      a(document).unbind("mousemove.imagezoom" + d.callIndex);
      this.$el.unbind(".imagezoom");
      this.$viewer.remove();
      this.$handler.remove();
      this.$el.removeData("imagezoom");
    };
    d.smoothMove = function (a, c) {
      var e = parseInt(d.$largeImg.css("top"));
      e = isNaN(e) ? 0 : e;
      var g = parseInt(d.$largeImg.css("left"));
      g = isNaN(g) ? 0 : g;
      c = parseInt(c);
      a = parseInt(a);
      if (e == c && g == a)
        b.clearTimeout(d.animateTimer), (d.animateTimer = null);
      else {
        var k = c - e,
          h = a - g;
        e += (k / Math.abs(k)) * Math.ceil(Math.abs(k / 10));
        g += (h / Math.abs(h)) * Math.ceil(Math.abs(h / 10));
        d.$viewer.find("img").css({ top: e, left: g });
        d.animateTimer = setTimeout(function () {
          d.smoothMove(a, c);
        }, 10);
      }
    };
    d.init(g);
  };
  a.ImageZoom.defaults = {
    bigImageSrc: "",
    preload: !0,
    type: "inner",
    smoothMove: !0,
    position: "right",
    offset: [10, 0],
    alignTo: "",
    zoomSize: [100, 100],
    descriptionClass: "zm-description",
    zoomViewerClass: "",
    zoomHandlerClass: "",
    showDescription: !0,
    onShow: function (a) {},
    onHide: function (a) {},
  };
  a.ImageZoom._calltimes = 0;
  a.fn.ImageZoom = function (c) {
    return this.each(function () {
      new a.ImageZoom(this, c);
    });
  };
})(jQuery, window);
var fastImg = (function () {
  var a = [],
    b = null,
    c = function () {
      for (var c = 0; c < a.length; c++) a[c].end ? a.splice(c--, 1) : a[c]();
      a.length || (clearInterval(b), (b = null));
    };
  return function (e, g, k, d) {
    var h,
      l,
      f = new Image();
    f.src = e;
    if (f.complete) g.call(f), k && k.call(f);
    else {
      var m = f.width;
      var n = f.height;
      f.onerror = function () {
        d && d.call(f);
        r.end = !0;
        f = f.onload = f.onerror = null;
      };
      var r = function () {
        h = f.width;
        l = f.height;
        if (h !== m || l !== n || 1024 < h * l) g.call(f), (r.end = !0);
      };
      r();
      f.onload = function () {
        !r.end && r();
        k && k.call(f);
        f = f.onload = f.onerror = null;
      };
      r.end || (a.push(r), null === b && (b = setInterval(c, 40)));
    }
  };
})();
jQuery(document).ready(function (a) {
  function b() {
    $(".label_check input").length &&
      ($(".label_check ").each(function () {
        $(this).removeClass("c_on");
      }),
      $(".label_check input:checked").each(function () {
        $(this).parent("div").addClass("c_on");
      }));
    $(".label_radio input").length &&
      ($(".label_radio").each(function () {
        $(this).removeClass("r_on");
      }),
      $(".label_radio input:checked").each(function () {
        $(this).parent("div").addClass("r_on");
      }));
  }
  0 == $(".specoffer").length &&
    0 == $(".newoutlist").length &&
    0 == $(".newcontact").length &&
    0 == $(".newbookser").length &&
    ($(".custom-select").each(function (a) {
      $(this).after("<span class='holder'></span>");
    }),
    $(".custom-select").change(function (a) {
      a = $(this).find(":selected").text();
      $(this).parents(".select-wrapper").find(".holder").text(a);
    }),
    $(".holder").each(function (a) {
      $(this).text($(this).parent().find("select").find(":selected").text());
    }));
  a = jQuery(this).prop("active");
  jQuery(this).prop("active", !a);
  $(".menu_aberto li").on("click", function () {
    $(".menu_aberto li").removeClass("active");
    $(this).addClass("active");
  });
  $(function () {
    "Microsoft Internet Explorer" === navigator.appName &&
      ($("input[type=text]").each(function () {
        var a;
        if ((a = $(this).attr("placeholder")))
          $(this).val(a),
            $(this).css("color", "gray"),
            $(this).focus(function () {
              if (a === $(this).val()) return $(this).val("");
            }),
            $(this).blur(function () {
              if ("" === $(this).val()) return $(this).val(a);
            });
      }),
      $("textarea").each(function () {
        var a;
        if ((a = $(this).attr("placeholder")))
          $(this).val(a),
            $(this).css("color", "gray"),
            $(this).focus(function () {
              if (a === $(this).val()) return $(this).val("");
            }),
            $(this).blur(function () {
              if ("" === $(this).val()) return $(this).val(a);
            });
      }),
      $("input[type=email]").each(function () {
        var a;
        if ((a = $(this).attr("placeholder")))
          $(this).val(a),
            $(this).css("color", "gray"),
            $(this).focus(function () {
              if (a === $(this).val()) return $(this).val("");
            }),
            $(this).blur(function () {
              if ("" === $(this).val()) return $(this).val(a);
            });
      }),
      $("input[type=tel]").each(function () {
        var a;
        if ((a = $(this).attr("placeholder")))
          $(this).val(a),
            $(this).css("color", "gray"),
            $(this).focus(function () {
              if (a === $(this).val()) return $(this).val("");
            }),
            $(this).blur(function () {
              if ("" === $(this).val()) return $(this).val(a);
            });
      }),
      $("input[type=password]").each(function () {
        var a;
        if ((a = $(this).attr("placeholder"))) {
          var b = $(this).attr("id");
          document.getElementById(b).type = "text";
          $(this).val(a);
          $(this).focus(function () {
            document.getElementById(b).type = "password";
            if (a === $(this).val()) return $(this).val("");
          });
          $(this).blur(function () {
            "" === $(this).val() &&
              ((document.getElementById(b).type = "text"), $(this).val(a));
          });
        }
      }),
      $("form").submit(function () {
        $("input[type=text]").each(function () {
          $(this).val() === $(this).attr("placeholder") && $(this).val("");
        });
        $("input[type=password]").each(function () {
          $(this).val() === $(this).attr("placeholder") && $(this).val("");
        });
      }));
  });
  $(".chkhold").addClass("has-js");
  $(".label_check, .label_radio").click(function () {
    b();
  });
  b();
  $(".more").click(function () {
    $(".moredrop").toggle(200);
  });
  $(".mobdots").click(function () {
    $(".toplink").toggle(200);
  });
  $("#cartab")
    .find("ul li")
    .each(function () {
      var a = $(this);
      $(this)
        .find(".quickview a")
        .on("click", function () {
          a.find(".quickdetail").slideDown();
          a.css("z-index", "9");
          a.find(".listhold").css("height", "560px");
          a.find(".quickview a").hide();
        });
      $(this).on("mouseleave", function () {
        a.find(".quickview a").show();
        a.css("z-index", "0");
        a.find(".quickdetail").hide();
        a.find(".listhold").css("height", "312px");
      });
    });
  $("#addcomparecar").click(function () {
    $(".comaddcar").toggleClass("open");
  });
  $(".comparemob .tabname").click(function (a) {
    $(".comparemob .tabname.active").removeClass("active");
    $(this).addClass("active");
  });
  comparemobtab("overviewr");
  $("a.tab").click(function () {
    $(".active").removeClass("active");
    $(this).addClass("active");
    $(".respanal").hide();
    var a = $(this).attr("title");
    $("#" + a).show();
  });
  $(".doctabs li a").click(function (a) {
    $(".doctabs li a.active").removeClass("active");
    $(this).addClass("active");
  });
  display("salaried");
  $(".financetab li a").click(function (a) {
    $(".financetab li a.active").removeClass("active");
    $(this).addClass("active");
  });
  financemaintab("forloan");
});
function display(a) {
  $("div.blockdiv").hide();
  $("div#" + a + ".blockdiv").fadeIn("slow");
}
function financemaintab(a) {
  $("li.blockdiv").hide();
  $("li#" + a + ".blockdiv").fadeIn("slow");
}
function comparemobtab(a) {
  $("div.blockdiv").hide();
  $("div#" + a + ".blockdiv").fadeIn("slow");
}
$("#menu .burger-menu").click(function () {
  $("#menu ul.menu_aberto").slideToggle("slow");
});
var clickDelay = 500,
  clickDelayTimer = null;
$(".burger-click-region").on("click", function () {
  if (null === clickDelayTimer) {
    var a = $(this);
    a.toggleClass("active");
    a.parent().toggleClass("is-open");
    a.hasClass("active") || a.addClass("closing");
    clickDelayTimer = setTimeout(function () {
      a.removeClass("closing");
      clearTimeout(clickDelayTimer);
      clickDelayTimer = null;
    }, clickDelay);
  }
});
$("#select_a_car").show();
$("#select_a_car").gsp_carousel({
  item: 6,
  pager: !1,
  slideMargin: 0,
  prevHtml: '<span class="sprite"></span>',
  nextHtml: '<span class="sprite"></span>',
  loop: !1,
  enableDrag: !1,
  responsive: [
    { breakpoint: 1e3, settings: { item: 6 } },
    { breakpoint: 768, settings: { item: 6 } },
    { breakpoint: 640, settings: { item: 4 } },
    { breakpoint: 600, settings: { item: 1 } },
    { breakpoint: 320, settings: { item: 1, enableDrag: !0 } },
  ],
});
$(".topslider").show();
$(".topslider").gsp_carousel({
  item: 1,
  loop: !0,
  pager: !0,
  speed: 1e3,
  auto: !0,
  pause: 5e3,
  enableDrag: !1,
  prevHtml: '<div class="slick-prev sprite"></div>',
  nextHtml: '<div class="slick-next sprite"></div>',
});
$(document).ready(function () {
  if (767 < screen.width && 0 < $("#stickyheader").length) {
    var a = $("#stickyheader").height() + $("section.headertop").height();
    $(window).scroll(function () {
      $(window).scrollTop() > a
        ? $("#stickyheader")
            .slideDown()
            .css({ position: "fixed", top: "0px", "margin-top": "0px" })
            .addClass("headershadow")
        : $("#stickyheader")
            .css({ position: "relative", top: "0px", "margin-top": "39px" })
            .removeClass("headershadow");
    });
  }
});
$(".mobdots").on("click", function () {
  $(".mobdots").toggleClass("mobdotsactive");
});
if (1006 > screen.width)
  $(".moremenu").on("click", function () {
    $(".mobiactive .submenu").slideToggle("slow");
  });
$(".menu_aberto li.moremenu").on("mouseover", function () {
  $(".menu_aberto li.moremenu i.plusminus").empty().append("-");
});
$(".menu_aberto li.moremenu").on("mouseleave", function () {
  $(".menu_aberto li.moremenu i.plusminus").empty().append("+");
});
$(".menu_aberto li.moremenu").on("mouseleave", function () {
  $(".menu_aberto li.moremenu i.plusminus").empty().append("+");
});
1007 < screen.width &&
  ($(".menu_aberto li.moremenu").on("mouseover", function () {
    $(this).find(".pcnavactive").slideDown("slow");
  }),
  $(".menu_aberto li.moremenu").on("mouseleave", function () {
    $(this).find(".pcnavactive").slideUp("slow");
  }));
$(".menu_aberto li.more").on("click", function () {
  $(".menu_aberto ul.submenu-onclick").slideToggle("slow");
});
$("html").click(function (a) {
  0 === $(a.target).closest(".submenu-onclick, .more").length &&
    ($(".submenu-onclick").slideUp("slow"), $(".more").removeClass("active"));
});
jQuery(".titlecont")
  .addClass("")
  .viewportChecker({ classToAdd: "titleblock", offset: 100 });
$(document).ready(function () {
  $(window).scroll(function () {
    250 < $(this).scrollTop() ? $(".top").fadeIn(1e3) : $(".top").fadeOut(1e3);
  });
  $(".top").click(function (a) {
    a.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 300);
  });
});
$(".offerwrap .tabbutton li").click(function (a) {
  $(".offerwrap .tabbutton li.active").removeClass("active");
  $(this).addClass("active");
});
dispass("New");
function dispass(a) {
  $("ul.passtab").hide();
  $("ul#" + a + ".passtab").fadeIn("slow");
}
$(".insurancewrap .tabbutton li").click(function (a) {
  $(".insurancewrap .tabbutton li.active").removeClass("active");
  $(this).addClass("active");
});
$(".renewal").click(function (a) {
  $("#Renewal").show("slow");
});
$(".new").click(function (a) {
  $("#Renewal").hide("slow");
});
$(".galleryslider").show();
$(".galleryslider").each(function () {
  $(this).show();
  $(this).gsp_carousel({
    item: 4,
    loop: !1,
    pager: !1,
    prevHtml: '<div class="sprite"></div>',
    nextHtml: '<div class="sprite"></div>',
    responsive: [
      { breakpoint: 768, settings: { item: 4 } },
      { breakpoint: 640, settings: { item: 2 } },
      { breakpoint: 480, settings: { item: 1, slideMargin: 0 } },
      { breakpoint: 320, settings: { item: 1 } },
    ],
  });
});
var model_pictures_exterior, model_pictures_interior;
jQuery(document).ready(function (a) {
  function b(a) {
    var b = parseInt(a.children(".cd-tabs-navigation").width()),
      c = parseInt(a.width());
    a.scrollLeft() >= b - c
      ? a.parent(".cd-tabs").addClass("is-ended")
      : a.parent(".cd-tabs").removeClass("is-ended");
  }
  var c = a("#variant_tabs");
  c.each(function () {
    var c = a(this),
      g = c.find("ul.cd-tabs-navigation"),
      k = c.children("ul.cd-tabs-content");
    c = c.find("nav");
    g.on("click", "a", function (b) {
      b.preventDefault();
      b = a(this);
      if (!b.hasClass("selected")) {
        var c = b.data("content"),
          d = k.find('li[data-content="' + c + '"]'),
          e = d.innerHeight();
        g.find("a.selected").removeClass("selected");
        b.addClass("selected");
        d.addClass("selected").siblings("li").removeClass("selected");
        k.animate({ height: e }, "auto");
        "Pictures" == c &&
          (model_pictures_exterior
            ? model_pictures_exterior.refresh()
            : exterior_pictures_carousel());
      }
    });
    b(c);
    c.on("scroll", function () {
      b(a(this));
    });
  });
  a(window).on("resize", function () {
    c.each(function () {
      var c = a(this);
      b(c.find("nav"));
      c.find(".cd-tabs-content").css("height", "auto");
    });
  });
  a(".colorpalet li.colorblue").click(function (b) {
    a(
      ".colorimage > img.colorred,.colorimage > img.colorblack,.colorimage > img.colorgrey,.colorimage > img.colorsilver"
    ).hide();
    a(".colorimage > img.colorblue").show();
  });
  a(".colorpalet li.colorred").click(function (b) {
    a(
      ".colorimage > img.colorblue,.colorimage > img.colorblack,.colorimage > img.colorgrey,.colorimage > img.colorsilver"
    ).hide();
    a(".colorimage > img.colorred").show();
  });
  a(".colorpalet li.colorblack").click(function (b) {
    a(
      ".colorimage > img.colorred,.colorimage > img.colorblue,.colorimage > img.colorgrey,.colorimage > img.colorsilver"
    ).hide();
    a(".colorimage > img.colorblack").show();
  });
  a(".colorpalet li.colorgrey").click(function (b) {
    a(
      ".colorimage > img.colorred,.colorimage > img.colorblack,.colorimage > img.colorblue,.colorimage > img.colorsilver"
    ).hide();
    a(".colorimage > img.colorgrey").show();
  });
  a(".colorpalet li.colorsilver").click(function (b) {
    a(
      ".colorimage > img.colorred,.colorimage > img.colorblack,.colorimage > img.colorgrey,.colorimage > img.colorblue"
    ).hide();
    a(".colorimage > img.colorsilver").show();
  });
  a(".featureclose").click(function (b) {
    a(".stickyshortcut .feature").animate({ width: "toggle" });
    a(".featureclose").toggleClass("showfeature");
  });
  a(".modelpictures .tabbutton li").click(function (b) {
    a(".modelpictures .tabbutton li.active").removeClass("active");
    a(this).addClass("active");
  });
  a(".interiortab").click(function (b) {
    a("#Interior").fadeIn("slow");
    a("#Exterior,#Three60View,#feeltab").hide();
  });
  a(".exteriortab").click(function (b) {
    a("#Exterior").fadeIn("slow");
    a("#Interior,#Three60View,#feeltab").hide();
  });
  a(".three60").click(function (b) {
    a("#Three60View").fadeIn("slow");
    a("#Exterior,#Interior,#feeltab").hide();
  });
  a(".feeltab").click(function (b) {
    a("#feeltab").fadeIn("slow");
    a("#Exterior,#Interior,#Three60View").hide();
  });
});
$(document).ready(function () {
  $("#newusedslide").show();
  var a = !0,
    b = !0;
  1024 > window.screen.availWidth && (b = a = !1);
  $(window).bind("load", function () {
    $("#newusedslide").gsp_carousel({
      item: 1,
      loop: !0,
      pager: !1,
      thumbItem: 4,
      thumbMargin: 15,
      showCounter: !0,
      counterText: "{current} of {total}",
      gallery: a,
      speed: 1e3,
      auto: !1,
      controls: b,
      prevHtml: '<div class="owl-prev newusedsprite"></div>',
      nextHtml: '<div class="owl-next newusedsprite"></div>',
      onSliderLoad: function (a, b) {
        1024 <= window.screen.availWidth &&
          $(".zoomimage").each(function () {
            $(this).ImageZoom({
              type: "standard",
              zoomSize: [480, 300],
              zoomImageWidth: 1500,
              zoomImageHeight: 1125,
              bigImageSrc: $(this).data("zoom-image"),
              zoomViewerClass: "standardViewer",
            });
          });
      },
      onAfterSlide: function (a, b, g) {},
      responsive: [
        { breakpoint: 768, settings: { item: 1 } },
        { breakpoint: 480, settings: { item: 1, pager: !1 } },
        { breakpoint: 320, settings: { item: 1, pager: !1 } },
      ],
    });
  });
});
$(".interiortab").click(function () {
  model_pictures_interior && model_pictures_interior.destroy();
  interior_pictures_carousel();
});
$(".exteriortab").click(function () {
  model_pictures_exterior && model_pictures_exterior.destroy();
  exterior_pictures_carousel();
});
function exterior_pictures_carousel() {
  model_pictures_exterior = $("#sync3").gsp_carousel({
    item: 1,
    loop: !0,
    pager: !0,
    gallery: !0,
    speed: 1e3,
    auto: !1,
    thumbItem: 3,
    prevHtml: "",
    nextHtml: "",
    responsive: [
      { breakpoint: 768, settings: { item: 1 } },
      { breakpoint: 480, settings: { item: 1, pager: !1 } },
      { breakpoint: 320, settings: { item: 1, pager: !1 } },
    ],
  });
  model_pictures_exterior.show();
}
function interior_pictures_carousel() {
  model_pictures_interior = $("#sync1").gsp_carousel({
    item: 1,
    loop: !0,
    pager: !0,
    gallery: !0,
    speed: 1e3,
    auto: !1,
    thumbItem: 3,
    prevHtml: "",
    nextHtml: "",
    responsive: [
      { breakpoint: 768, settings: { item: 1 } },
      { breakpoint: 480, settings: { item: 1, pager: !1 } },
      { breakpoint: 320, settings: { item: 1, pager: !1 } },
    ],
  });
  model_pictures_interior.show();
}
$("#carousel-tab").gsp_tab({
  content_wrap: "#carousel-tab-container",
  responsive: !1,
  layout: "auto",
});
var $tabs = $("#carousel-in-tab *[data-gstab]");
$tabs
  .one("gse_tab_click", function (a, b, c) {})
  .on("gse_tab_click", function (a, b, c) {
    setTimeout(function () {
      var a = $("#carousel-tab")
        .find(".gsc-ta-active")[0]
        .getBoundingClientRect();
      a = a.left + a.width / 2;
      var b = window.innerWidth / 2;
      a = $("#carousel-tab").offset().left - (a - b);
      0 > a
        ? $("#carousel-tab").animate({ left: a })
        : $("#carousel-tab").animate({ left: 0 });
    }, 1);
  });
$(document).ready(function () {
  $("#newprice_varintslide").gsp_carousel({
    item: 2,
    loop: !0,
    showUpcoming: !1,
    upcomingPercent: 40,
    slideMove: 2,
    mode: "slide",
    autoWidth: !1,
    slideMargin: 0,
    addClass: "my-carousel",
    useCSS: !0,
    speed: 400,
    auto: !1,
    pauseOnHover: !1,
    pause: 2e3,
    controls: !0,
    prevHtml: "<span class='sprite'></span>",
    nextHtml: "<span class='sprite'></span>",
    adaptiveHeight: !1,
    pager: !1,
    gallery: !1,
    enableTouch: !0,
    enableDrag: !1,
    freeMove: !1,
    swipeThreshold: 40,
  });
});
$(document).ready(function () {
  0 < $(".modelpictures").length && $(".exteriortab").click();
  $("#contact_service").hide();
  $("#brand,#brand1").change();
  var a = $("#customformpopup").text(),
    b = $("#popuppageurls").text(),
    c = [];
  b && (c = $.parseJSON(b));
  b =
    window.location.protocol +
    "//" +
    window.location.hostname +
    window.location.pathname;
  if (a)
    var e =
      -1 == $.inArray(b, c) || "" == c ? "/customer-profile/customform" : "";
  e &&
    setTimeout(function () {
      $.gsp_popup({ href: lang + e });
    }, 5e3);
  $("#model_car1").click();
  0 < $(".comparedetail").length &&
    $(".comparedetail")
      .find("li a")
      .click(function () {
        $(".comparedetail").find("li a").removeClass("selected");
        $(this).addClass("selected");
        $(".overviewresult").find("li").removeClass("selected");
        $(".overviewresult")
          .find("[data-content='" + $(this).attr("data-content") + "']")
          .addClass("selected");
      });
  0 < $("#bookservice-city").length && $("#bookservice-city").change();
  $("#accessories-model_id_accessiores").change();
  $(".popupform").gsp_popup({ overlayClose: !1 });
  $(".popupform").gsp_popup({
    onOpen: function () {
      $("#show_connecto_popup").text("false");
      $("body").addClass("pnoscroll");
    },
    onClosed: function () {
      $("#show_connecto_popup").text("true");
      $("body").removeClass("pnoscroll");
    },
  });
  $("#cal_emi").click();
  "renewal" == $("#insurance_type").val() && $("#Renewal").click();
  $("#Renewal-link").click(function () {
    $("#old_policy").show("slow");
    $("#insurance_type").val("renewal");
    $("#Renewal").attr("checked", "true");
  });
  $("#New-link").click(function () {
    $("#old_policy").hide("slow");
    $("#insurance_type").val("new");
    $("#New").attr("checked", "true");
  });
  0 < $(".colorpalet").length &&
    $(".colorpalet ul li").click(function () {
      var a = $(this).index() + 1;
      $(".colorimage ul").find("li").hide();
      $(".colorimage ul")
        .find("li:nth-of-type(" + a + ")")
        .show();
    });
  $("#price_select").change(function () {
    $("#price_form").submit();
  });
  a = location.hash;
  hashValue1 = a.replace(/^#/, "");
  a = hashValue1.replace("&360view", "");
  "" != a &&
    0 < $("li[rel=" + a + "]").length &&
    ($("li[rel=" + a + "] a").click(),
    "tab3&360view" == hashValue1 && $(".feeltab").click());
  if (0 != $("#usedcar_km").val() || 0 != $("#usedcar_year").val())
    $("#salaried").css("display", "none"), $("#self").css("display", "block");
  $(".offerwrap").find(".tabbutton").find("ul li.active").click();
  $("#insurance-registration_month").attr("disabled", !0);
  $("#insurance-registration_year").on("change keyup mouseup", function () {
    $("#insurance-registration_year").val()
      ? $("#insurance-registration_month").attr("disabled", !1)
      : $(".field-insurance-registration_month .holder").text("Select Month");
  });
  $("a[href^='tel:']").each(function () {
    navigator.userAgent.match(/(mobile)/gi) || (this.href = "javascript:;");
  });
  0 < $(".preownbtn").length &&
    $(".preownbtn").click(function () {
      $("#preownlist").slideToggle(800);
    });
  0 < $(".clickcall").length &&
    ($(".clickcall")
      .addClass("grow")
      .delay(5e3)
      .queue(function () {
        $(this).removeClass("grow").dequeue();
      }),
    $(".clickcall").click(function () {
      $("body").addClass("callbgnoscroll");
      $(".callpopupbg").fadeIn(500);
      $(".callparenttab").fadeIn(500);
    }),
    $(".callparenttab a").click(function () {
      var a = $(this).attr("data-id"),
        b = $("#count_outlet_" + a).val();
      $("#" + a).gsp_modal({
        border: !1,
        width: "auto",
        onOpen: function () {
          $("#show_connecto_popup").text("false");
          $(".gsc_modal_wrapper").addClass("clicktocall_model");
          $(".gsc_modal_wrapper").addClass("borderradius5");
          10 > b
            ? $(".gsc_modal_wrapper").addClass("nosearchmrgn")
            : $(".gsc_modal_wrapper").removeClass("nosearchmrgn");
        },
        onClose: function () {
          $("#show_connecto_popup").text("true");
          $("body").removeClass("callbgnoscroll");
          $(".callpopup").trigger("gse_modal.close");
          $(".callparenttab").fadeOut(500);
          $(".callpopupbg").hide();
          $(".callpopup").find("#search").val("");
          $(".userdetail").show();
        },
      });
      $("#" + a).trigger("gse_modal.open");
      $(".callparenttab").fadeOut(500);
    }),
    $(".callpclose").click(function () {
      $("body").removeClass("callbgnoscroll");
      $(".callpopup").trigger("gse_modal.close");
      $(".callparenttab").fadeOut(500);
      $(".callpopupbg").fadeOut(500);
      $(".callpopup").find("#search").val("");
      $(".userdetail").show();
    }),
    $(".callpopupbg").click(function () {
      $("body").removeClass("callbgnoscroll");
      $(".callpopup").trigger("gse_modal.close");
      $(".callparenttab").fadeOut(500);
      $(".callpopupbg").hide();
      $(".callpopup").find("#search").val("");
      $(".userdetail").show();
    }));
  1024 <= window.screen.availWidth &&
    0 < $(".nusingleimg").length &&
    $(".nusingleimg").each(function () {
      $(this).ImageZoom({
        type: "standard",
        zoomSize: [480, 300],
        zoomImageWidth: 1500,
        zoomImageHeight: 1125,
        bigImageSrc: $(this).data("zoom-image"),
        zoomViewerClass: "standardViewer",
      });
    });
  0 < $("#bookservice-city").length && $("#bookservice-city").change();
  if (
    0 <= $(".specoffer").length ||
    (0 <= $(".newoutlist").length && 0 <= $(".newcontact").length) ||
    0 <= $(".newbookser").length
  )
    $(".drop")
      .find(".custom-select")
      .each(function (a) {
        $(this).wrap("<span class='select-wrapper'></span>");
        $(this).after("<span class='holder'></span>");
      }),
      $(".drop")
        .find(".custom-select")
        .change(function (a) {
          a = $(this).find(":selected").text();
          $(this).next(".holder").text(a);
        })
        .trigger("change");
  0 < $("#outlet_detail").find(".rate_me").find("span").length &&
    $("#outlet_detail")
      .find(".rate_me")
      .find("span")
      .click(function () {
        var a = $(this).index() + 1;
        $(".rate_me").find(".star-fullselect").addClass("star-unselect");
        $(".rate_me").find(".star-fullselect").removeClass("star-fullselect");
        $(".rate_me").children().slice(0, a).removeClass("star-unselect");
        $(".rate_me").children().slice(0, a).addClass("star-fullselect");
        $("#outletrating-rating").val(a);
      });
  0 < $("#scrollhere").length &&
    $("html, body").animate({ scrollTop: $("#scrollhere").offset().top }, 1e3);
  0 < $("#outlet-outlet_type").length &&
    $(window).bind("load", function () {
      $("#outlet-outlet_type").change();
    });
  $("#outlet-outlet_type").change(function () {
    select_city();
  });
  $("#outlet-city").change(function () {
    select_area();
  });
  $("#outlet-area").change(function () {
    0 < $("#page_val").length &&
      "home" == $("#page_val").val() &&
      select_data();
  });
  0 < $("#googleMap").length &&
    setTimeout(function () {
      var a = 0;
      0 < $(".newoutlet-detail").length && (a = 1);
      $.fn.google_map({
        type_val: $("#outlet-outlet_type").val(),
        city_val: $("#outlet-city").val(),
        my_lat: $("#mylat").val(),
        my_long: $("#mylong").val(),
        brand: $("#outlet-outlet_brand").val(),
        show_single: a,
      });
    }, 200);
  $(".coroffertab").click(function () {
    $(".spoffer-result").fadeOut();
    $(".corofferresult").fadeIn();
    $(".spoffertab").removeClass("active");
    $(".coroffertab").addClass("active");
  });
  $(".soffer-selectbtn").click(function () {
    $(".specoffer-drop").slideToggle();
  });
  $(".soffer-selectbtn").is(":visible") &&
    ((a = $("#offers-model_name")), variant_data($("#variant_" + a.val()), a));
  $("#offers-city").change(function () {
    select_variant_offer($("#offers-model_name"));
  });
  $("#offers-model_name").change(function () {
    if (0 < $(".offerdetail").length) {
      var a = $("#offers-model_name")
        .find("option:selected")
        .attr("data-model_link");
      location.href = a + ".html";
    }
    select_variant_offer($("#offers-model_name"));
  });
  0 < $(".specoffer").length &&
    1 >= $("#offer_count").val() &&
    $(".specoffer-drop").hide();
  0 < $(".specoffer").length &&
    $("span.select-wrapper select[id ^='variant_']").parent().hide();
});
1007 < screen.width &&
  ($("#offer_type").change(function () {
    variant_data(
      $("#variant_" + $("#offers-model_name").val()),
      $("#offers-model_name")
    );
  }),
  $("select[id ^='variant_']").change(function () {
    $(this).is(":visible") &&
      variant_data(
        $("#variant_" + $("#offers-model_name").val()),
        $("#offers-model_name")
      );
  }));
function ftc_image(a) {
  "interior" == a
    ? ($("#owl-picture1").css("display", "none"),
      $("#int-owl-picture2").css("display", "block"),
      $(".ftctab span.exterior").removeClass("active"),
      $(".ftctab span.interior").addClass("active"))
    : ($("#owl-picture1").css("display", "block"),
      $("#int-owl-picture2").css("display", "none"),
      $(".ftctab span.exterior").addClass("active"),
      $(".ftctab span.interior").removeClass("active"));
}
function display_model_car(a, b) {
  $(".tabbing .item").removeClass("gscr_active");
  b.closest(".item").addClass("gscr_active");
  $.ajax({
    type: "get",
    url: lang + "/site/model-car",
    data: { model_id: a },
    beforeSend: function () {
      $("#car_detail").css("position", "relative");
      $("#car_detail").append(
        '<div id="loader" style="position: absolute; top: 0px; left: 0px; height: 100%; width: 100%; text-align: center; box-sizing: border-box; padding-top: 70px; background: rgba(255, 255, 255, 0.7) none repeat scroll 0px 0px;"><img src="/themes/knight/image/loading.gif" /></div>'
      );
    },
    success: function (a) {
      $("#car_detail").html(a);
      $(".popupform").gsp_popup({ overlayClose: !1 });
      $(".popupform").gsp_popup({
        onOpen: function () {
          $("#show_connecto_popup").text("false");
          $("body").addClass("pnoscroll");
        },
        onClosed: function () {
          $("#show_connecto_popup").text("true");
          $("body").removeClass("pnoscroll");
        },
      });
    },
  });
}
function select_variant(a, b) {
  $("select[id ^='variant_" + b + "']")
    .parent()
    .hide();
  $("#variant_" + b + "_" + a.val())
    .parent()
    .show();
}
function select_city() {
  var a = $("#outlet-outlet_type").val(),
    b = $("#outlet-outlet_brand").val(),
    c = $("#hidden_selected_city").val(),
    e = "no";
  if (
    (0 < $(".noutdetailwrap").length && 0 < $(".newoutlet-mobiview").length) ||
    0 < $(".outletshome").length
  )
    e = "yes";
  $.get(lang + "/outlet/city", {
    outlet_type: a,
    outlet_brand: b,
    selected_city: c,
    is_first_selected: e,
  }).done(function (a) {
    $("#outlet-city").html(a);
    $("#outlet-city").next(".holder").text(c);
    $("#outlet-city").change();
  });
}
function select_area() {
  var a = $("#outlet-city").val(),
    b = $("#outlet-outlet_brand").val(),
    c = $("#outlet-outlet_type").val(),
    e = $("#hidden_selected_area").val();
  a != $("#hidden_selected_city").val() && (e = "");
  var g = "no";
  if (
    (0 < $(".noutdetailwrap").length && 0 < $(".newoutlet-mobiview").length) ||
    0 < $(".outletshome").length
  )
    g = "yes";
  $.get(lang + "/outlet/area", {
    outlet_city: a,
    outlet_type_val: c,
    outlet_brand: b,
    selected_area: e,
    is_first_selected: g,
  }).done(function (a) {
    "" == c && (a = '<option value="">Locality</option>');
    $("#outlet-area").html(a);
    e || (e = $("#outlet-area").find(":selected").text());
    $("#outlet-area").next(".holder").text(e);
    $("#outlet-area").change();
  });
}
function select_data(a) {
  var b = $("#outlet-outlet_type").val(),
    c = $("#outlet-outlet_brand").val();
  void 0 == c && (c = "");
  var e = $("#outlet-city").val(),
    g = $("#outlet-area").val();
  a || (a = 1);
  var k = $("#page_val").val();
  void 0 == k && (k = "");
  $.ajax({
    url:
      lang +
      "/outlet/data?outlet_type=" +
      b +
      "&city=" +
      e +
      "&area=" +
      encodeURIComponent(g) +
      "&page=" +
      a +
      "&outlet_brand=" +
      c +
      "&page_type=" +
      k,
    type: "get",
    beforeSend: function (a) {
      $(".lodingimg").show();
    },
    success: function (a) {
      $("#outlet_data").html(a);
      $(".lodingimg").hide();
      "" == k && $(window).scrollTop(0);
      "home" != k &&
        $.get(
          lang +
            "/outlet/generate-url-with-title?outlet_type=" +
            b +
            "&city=" +
            e,
          function (a) {
            "" != a &&
              ($("#heading").html(a.page_heading),
              history.pushState(window.location.href + "/", "new_page", a.url));
          }
        );
      0 < $(".popupform").length &&
        ($(".popupform").gsp_popup({ overlayClose: !1 }),
        $(".popupform").gsp_popup({
          onOpen: function () {
            $("#show_connecto_popup").text("false");
            $("body").addClass("pnoscroll");
          },
          onClosed: function () {
            $("#show_connecto_popup").text("true");
            $("body").removeClass("pnoscroll");
          },
        }));
      $("a[href^='tel:']").each(function () {
        navigator.userAgent.match(/(mobile)/gi) || (this.href = "javascript:;");
      });
      void 0 != k &&
        "home" == k &&
        $.fn.google_map({
          type_val: $("#outlet-outlet_type").val(),
          city_val: $("#outlet-city").val(),
          my_lat: $("#mylat").val(),
          my_long: $("#mylong").val(),
          scroll: 0,
          brand: c,
        });
    },
  });
}
function validateNumber(a) {
  var b = String.fromCharCode(a.which),
    c = $("#bookservice-kilometer_done").val(),
    e = window.event ? a.keyCode : a.which;
  return 8 == a.keyCode || 39 == a.keyCode
    ? !0
    : 48 > e || 57 < e
    ? !1
    : "0" == b && 0 == c.length
    ? !1
    : !0;
}
function get_model_variant(a) {
  a &&
    $.get(lang + "/customer-profile/model-link", { model_id: a }).done(
      function (a) {
        $("#customerprofile-variant_link_rewrite").val(a);
      }
    );
}
function validateFunction(a) {
  var b = $("#popup_type").val();
  $.ajax({
    url: lang + "/customer-profile/create-service?type=" + b,
    type: "post",
    async: !1,
    data: $("#popup_form").serialize(),
    beforeSend: function (b) {
      a.attr("disabled", !0);
      $("#loading_img").show();
    },
    success: function (a) {
      void 0 != a.redirect
        ? (($form = $(
            "<form style='display:none;' action='" +
              lang +
              "/customer-profile/redirect' method='get'></form>"
          )),
          $form.append(
            '<input type="hidden" name="redirect" value="' + a.redirect + '">'
          ),
          $form.append('<input type="submit" value="button">'),
          $("body").append($form),
          $form.submit())
        : ($("#custom_popup").html(a), $(window).resize());
    },
  });
  return !1;
}
function validatePopupNumber(a) {
  a = $("#popup_type").val();
  var b = $("#eventaction").val(),
    c = "";
  b && (c = "&eventaction=" + b);
  $.ajax({
    url: lang + "/customer-profile/verify-number?type=" + a + c,
    type: "post",
    async: !1,
    data: $("#popup_form").serialize(),
    beforeSend: function (a) {},
    success: function (a) {
      "success" == a.status
        ? void 0 != a.content
          ? $("#custom_popup").html(a.content)
          : void 0 != a.redirect &&
            (($form = $(
              "<form style='display:none;' action='" +
                lang +
                "/customer-profile/redirect' method='get'></form>"
            )),
            $form.append(
              '<input type="hidden" name="redirect" value="' + a.redirect + '">'
            ),
            $form.append('<input type="submit" value="button">'),
            $("body").append($form),
            $form.submit())
        : alert(a.error);
    },
  });
  return !1;
}
txtloanamount = 0;
x = Math;
months = eb = txtloanamount = 0;
str = hk = "";
function getFinanceEmiCalculator() {
  var a = document.getElementById("amountText").value,
    b = document.getElementById("interestText").value;
  if (0 >= a.length) return alert("Please Enter Loan Amount"), !1;
  if (0 >= b.length) return alert("Please Enter Interest Rate"), !1;
  if (0 == b) return alert("Please Enter Interest Rate Greater Then 0"), !1;
  if (isNaN(parseFloat(b))) return alert("Please Enter only digit"), !1;
  validateIntrest() && calculateFinanceEMI();
}
function calculateFinanceEMI() {
  grossbalance();
  $("ul.monthvalue li").each(function () {
    var a = $(this).text();
    computeMonthlyFinanceEMI(a);
  });
}
function grossbalance() {
  str = document.getElementById("amountText").value;
  gz = str.length + 3;
  dp = 2;
  txtloanamount = str;
  str = document.getElementById("interestText").value;
  dp = 4;
  eb = str;
}
function computeMonthlyFinanceEMI(a) {
  for (var b = 1, c = eb / 1200, e = 0; e < a; e++) b *= 1 + c;
  b = (txtloanamount * b * c) / (b - 1);
  c = Math.round(b);
  document.getElementById(a + "monthsemi").innerHTML =
    "<span class='rupee'>Rs.</span> " + intToFormatFinance(c) + "/-";
  return b;
}
function intToFormatFinance(a) {
  xx = (a + "").split(".");
  x1 = xx[0];
  x2 = 1 < xx.length ? "." + xx[1] : "";
  a = /(\d+)(\d{3})/;
  for (
    var b = 0, c = parseInt(String(x1).length / 2 - 1);
    a.test(x1) &&
    (0 < b
      ? (x1 = x1.replace(a, "$1,$2"))
      : ((x1 = x1.replace(a, "$1,$2")), (a = /(\d+)(\d{2})/)),
    b++,
    c--,
    0 != c);

  );
  return x1 + x2;
}
function getBrandModels(a, b, c) {
  $.get(lang + "/cust-car-info/brand-models", { id_brand: a, expire: c }).done(
    function (a) {
      $("#" + b).html(a);
      $("#" + b)
        .next(".holder")
        .text(
          $("#" + b)
            .find(":selected")
            .text()
        );
      a = b.substr(b.length - 1);
      getModelVariants("", "custcarinfo-variant" + a);
    }
  );
  "" == a &&
    ((a = b.substr(b.length - 1)),
    getModelVariants("", "custcarinfo-variant" + a),
    $("#compare1").submit());
}
function getModelVariantsId(a, b) {
  a &&
    $.get(lang + "/used-cars/model-variants", { id_model: a }).done(function (
      a
    ) {
      $("#" + b).html(a);
      $("#" + b).change();
    });
}
function getModelVariants(a, b) {
  $.get(lang + "/cust-car-info/model-variants", { id_model: a }).done(function (
    a
  ) {
    $("#" + b).html(a);
    $("select[id^='custcarinfo-variant']").each(function () {
      b != $(this).attr("id") &&
        "" != $(this).val() &&
        $("#" + b)
          .find("option[value='" + $(this).val() + "']")
          .remove();
    });
    $("#" + b)
      .next(".holder")
      .text(
        $("#" + b)
          .find(":selected")
          .text()
      );
  });
  "" == a && $("#custcarinfo-variant" + b).change();
}
function select_drop_outlet() {
  2 == $("select#customerprofile-outlet_name option").length &&
    ($("#customerprofile-outlet_name option:nth(1)").attr(
      "selected",
      "selected"
    ),
    $("#customerprofile-outlet_name option[value='']").remove());
}
function popup(a, b, c) {
  $.ajax({
    url: lang + "/used-cars/popup?id=" + b + "&variant_name=" + c,
    type: "post",
    data: $("#popup_form").serialize(),
    beforeSend: function (b) {
      a.attr("disabled", !0);
      $("#loading_img").show();
    },
    success: function (a) {
      $("#custom_popup").html(a);
    },
  });
  return !1;
}
function validateRegistrationNumber(a) {
  a = window.event ? a.keyCode : a.which;
  return (64 < a && 91 > a) ||
    (96 < a && 123 > a) ||
    32 == a ||
    8 == a ||
    127 == a ||
    46 == a ||
    9 == a ||
    8 == a ||
    46 == a ||
    39 == a ||
    45 == a ||
    47 == a
    ? !0
    : 48 > a || 57 < a
    ? !1
    : !0;
}
$(".intrest_rate, #amountText").keypress(function (a) {
  (46 == a.which && -1 == $(this).val().indexOf(".")) ||
    !(48 > a.which || 57 < a.which) ||
    0 == a.which ||
    8 == a.which ||
    a.preventDefault();
  var b = $(this).val();
  -1 != b.indexOf(".") &&
    2 < b.substring(b.indexOf(".")).length &&
    0 != a.which &&
    8 != a.which &&
    $(this)[0].selectionStart >= b.length - 2 &&
    a.preventDefault();
});
function validateIntrest() {
  if (99.99 < parseFloat($("#interestText").val()))
    return (
      $("#rate_error").css("display", "block"),
      $("#rate_error").html("Intrest rate should be less than 99.99."),
      $("#rate_error").css("color", "red"),
      !1
    );
  $("#rate_error").css("display", "none");
  return !0;
}
function validateZipcode(a) {
  -1 !== $.inArray(a.keyCode, [46, 8, 9, 27, 13, 110, 190]) ||
    (65 == a.keyCode && (!0 === a.ctrlKey || !0 === a.metaKey)) ||
    (35 <= a.keyCode && 40 >= a.keyCode) ||
    ((a.shiftKey || 48 > a.keyCode || 57 < a.keyCode) &&
      (96 > a.keyCode || 105 < a.keyCode) &&
      a.preventDefault());
}
function validateOfferPopup(a) {
  var b = $("#offer_id").val();
  $.ajax({
    url: lang + "/offers/popup?offer_id=" + b,
    type: "post",
    async: !1,
    data: $("#popup_form").serialize(),
    beforeSend: function (b) {
      a.attr("disabled", !0);
      $("#loading_img").show();
    },
    success: function (a) {
      $("#custom_popup").html(a);
    },
  });
  return !1;
}
$(document).ajaxComplete(function () {
  customerplaceHolder();
});
function customerplaceHolder() {
  $.support.placeholder = "placeholder" in document.createElement("input");
  $.support.placeholder ||
    ($("[placeholder]")
      .focus(function () {
        $(this).val() == $(this).attr("placeholder") && $(this).val("");
      })
      .blur(function () {
        "" == $(this).val() && $(this).val($(this).attr("placeholder"));
      })
      .blur(),
    $("[placeholder]")
      .parents("form")
      .submit(function () {
        $(this)
          .find("[placeholder]")
          .each(function () {
            $(this).val() == $(this).attr("placeholder") && $(this).val("");
          });
      }));
}
customerplaceHolder();
function validateTestimonialPopup(a) {
  var b = new FormData($("#popup_form")[0]);
  $.ajax({
    url: lang + "/testimonial/popup",
    type: "post",
    async: !1,
    data: b,
    processData: !1,
    contentType: !1,
    beforeSend: function (b) {
      a.attr("disabled", !0);
      $(".select-button").prop("disabled", "disabled");
    },
    success: function (a) {
      $(".select-button").removeAttr("disabled");
      $("#custom_popup").html(a);
    },
  });
  return !0;
}
function validateaMobileNo(a) {
  var b = $("#popup_type").val(),
    c = $("#customerprofile-update_mobileno").val(),
    e = /^[6-9][0-9]{9}$/;
  $.ajax({
    url: lang + "/customer-profile/updateno?type=" + b,
    type: "post",
    async: !1,
    data: $("#popup_form1").serialize(),
    beforeSend: function (b) {
      a.attr("disabled", !0);
      $("#loading_img").show();
    },
    success: function (a) {
      $("#custom_popup").html(a);
      (c && e.test(c)) || ($("#popup_form1").show(), $("#popup_form").hide());
      $("#customerprofile-update_mobileno").val("");
    },
  });
  return !1;
}
function GetAnotherOtp(a) {
  a = $("#popup_type").val();
  var b = $("#customerprofile-cust_id").val();
  $.get(lang + "/customer-profile/resend-otp", { cust_id: b, type: a }).done(
    function (a) {
      $("#custom_popup").html(a);
    }
  );
}
function validateCustomForm(a) {
  $.ajax({
    url: lang + "/customer-profile/customform",
    type: "post",
    async: !1,
    data: $("#popup_form").serialize(),
    beforeSend: function (b) {
      a.attr("disabled", !0);
      $("#loading_img").show();
    },
    success: function (a) {
      $("#custom_popup").html(a);
    },
  });
  return !1;
}
function getPrice(a, b) {
  $.get(lang + "/used-cars/get-price", { brand_id: a, searched_price: b }).done(
    function (a) {
      $("#price").html(a);
      $("#price").change();
      $("#price1").html(a);
      $("#price1").change();
    }
  );
}
$(".popup_close").click(function () {
  $(this).trigger("gse_modal.close");
});
var galleryCarousel;
$(function () {
  if (0 < $("#gallery-popup").length) {
    $("#gallery-popup").gsp_modal({
      height: "80%",
      border: !1,
      width: "100%",
      maxWidth: "100%",
    });
    var a = $("#gallery-popup");
    $(".bestcompany").click(function (b) {
      var c = $(b.target).attr("data-image-index");
      if (void 0 == c) return !1;
      $this = $(this);
      $galleryContainer = $("#galler_cr");
      $galleryContainer.empty();
      $this
        .find("img")
        .clone(!0)
        .removeClass("lazyOwl")
        .removeAttr("height")
        .removeAttr("width")
        .each(function () {
          $(this).attr("title");
          var a = $(this).attr("data-full-img");
          $galleryContainer.append('<li><img src="' + a + '"></li>');
        });
      galleryCarousel && galleryCarousel.destroy();
      galleryCarousel = $("#galler_cr").gsp_carousel({
        gallery: !0,
        item: 1,
        loop: !1,
        pager: !1,
        controls: !0,
        prevHtml: '<i class=""></i>',
        nextHtml: '<i class=""></i>',
        responsive: [
          { breakpoint: 768, settings: { item: 1 } },
          { breakpoint: 480, settings: { item: 1, pager: !1 } },
          { breakpoint: 320, settings: { item: 1, pager: !1 } },
        ],
      });
      a.trigger("gse_modal.open");
      setTimeout(function () {
        galleryCarousel.refresh();
        galleryCarousel.goToSlide(c);
      }, 50);
    });
  }
});
$(".car-model-selection")
  .find(".gscr_lSNext")
  .click(function () {
    $(".car-model-selection").find(".gscr_active a").click();
  });
$(".car-model-selection")
  .find(".gscr_lSPrev")
  .click(function () {
    $(".car-model-selection").find(".gscr_active a").click();
  });
function resetUsedcars() {
  $("#brand").val("");
  $("#model").val("");
  $("#city").val("");
  $("#price").val("");
  $("#usedcar_km").val("");
  $("#usedcar_year").val("");
  $("#fuel").val("");
}
function sortByprice(a, b) {
  $.ajax({
    type: "get",
    url: lang + "/used-cars/index",
    data: { sorted_price: a, type: b },
    success: function (a) {
      location.reload();
    },
  });
}
function getusedcars(a) {
  var b = getUrlParameter("type"),
    c = window.location.href;
  void 0 === b
    ? (window.location.href = window.location.pathname + "?type=" + a)
    : ((a = c.replace("type=" + b, "type=" + a)), (window.location.href = a));
}
function getUrlParameter(a) {
  var b = decodeURIComponent(window.location.search.substring(1)).split("&"),
    c;
  for (c = 0; c < b.length; c++) {
    var e = b[c].split("=");
    if (e[0] === a) return void 0 === e[1] ? !0 : e[1];
  }
}
function search_outlet(a) {
  var b, c;
  var e = $("#" + a)
    .find("#search")
    .val()
    .toUpperCase();
  var g = 0;
  $("#" + a)
    .find(".outlet_list")
    .find(".userdetail")
    .each(function (a) {
      b = $(this).find(".landmark").text();
      c = $(this).find(".addrs").text();
      -1 < b.toUpperCase().indexOf(e) || -1 < c.toUpperCase().indexOf(e)
        ? ((g += 1), $(this).show())
        : $(this).hide();
    });
  g ? $(".no_data").hide() : $(".no_data").show();
}
0 < $("#bookservice-service_date").length &&
  $("#bookservice-service_date").datepicker({
    clearBtn: !0,
    minDate: 1,
    dateFormat: "dd/mm/yy",
    onClose: function (a, b) {
      $("#bookservice-service_date")
        .parent()
        .parent()
        .addClass("nbook-selectdate");
      $(".service_timeslots").show();
    },
  });
$("#bookservice_mobistep1")
  .on("beforeValidate", function () {
    $(this).find("button").prop("disabled", "disabled");
  })
  .on("afterValidate", function (a, b, c) {
    c.length && $(this).find("button").removeAttr("disabled");
  })
  .on("beforeSubmit", function (a, b, c) {
    $.ajax({
      url: lang + "/book-service/saveservicedata",
      type: "post",
      data: $("#bookservice_mobistep1").serialize(),
      success: function (a) {
        $("#lead_id").val(a);
        ga_event({
          event: "leadsubmit",
          eventCategory: "enquiry",
          eventAction: "submit",
          form_field: "submit",
          formName: "book-service",
        });
        $(".nb-serresult").fadeIn();
        $(".nb-persresult").fadeOut();
        $(".servicemobitab span").fadeOut();
        $(".basicmobitab span").fadeIn();
      },
    });
    return !1;
  });
$("#bookservice_mobistep2")
  .on("beforeValidate", function () {
    $(this).find("button").prop("disabled", "disabled");
  })
  .on("afterValidate", function (a, b, c) {
    c.length && $(this).find("button").removeAttr("disabled");
  })
  .on("beforeSubmit", function (a, b, c) {
    $.ajax({
      url: lang + "/book-service/saveservicedata",
      type: "post",
      data: $("#bookservice_mobistep2, #bookservice_mobistep1").serialize(),
      success: function (a) {
        location.reload();
      },
    });
    return !1;
  });
$(".nb-sharecar").click(function () {
  $(".nb-shareresult").is(":visible")
    ? $(".nb-sharecar").removeClass("nb-shareactive")
    : $(".nb-sharecar").addClass("nb-shareactive");
  $(".nb-shareresult").slideToggle();
});
jQuery(document).ready(function (a) {
  a(".nbinput")
    .focus(function () {
      a(this).is("select")
        ? (a(this).parent().parent().parent().removeClass(""),
          a(this).parent().parent().parent().addClass("nbinput-active"))
        : (a(this).parent().parent().removeClass(""),
          a(this).parent().parent().addClass("nbinput-active"));
    })
    .blur(function () {
      a(this).is("select")
        ? (a(this).parent().parent().parent().removeClass("nbinput-active"),
          a(this).parent().parent().parent().addClass(""))
        : (a(this).parent().parent().removeClass("nbinput-active"),
          a(this).parent().parent().addClass(""));
    });
});
$('input[name="BookService[pickup_required]"]').click(function () {
  "Yes" == $(this).val()
    ? $(".nb-addresspick").fadeIn()
    : $(".nb-addresspick").fadeOut();
});
function outlet_filter() {
  var a = $("#outlet-outlet_type").val(),
    b = $("#outlet-outlet_brand").val(),
    c = $("#outlet-city").val(),
    e = $("#outlet-area").val(),
    g = $("#page_val").val();
  a
    ? $.get(lang + "/outlet/outletlink", {
        outlet_type: a,
        city: c,
        area: e,
        page: g,
        outlet_brand: b,
      }).done(function (a) {
        window.location.href = a
          ? lang + "/outlet/" + a + ".html"
          : lang + "/outlet.html";
      })
    : (window.location.href = lang + "/outlet.html");
  return !1;
}
function search_outlet(a) {
  var b, c;
  var e = $("#" + a)
    .find("#search")
    .val()
    .toUpperCase();
  var g = 0;
  $("#" + a)
    .find(".outlet_list")
    .find(".userdetail")
    .each(function (a) {
      b = $(this).find(".landmark").text();
      c = $(this).find(".addrs").text();
      -1 < b.toUpperCase().indexOf(e) || -1 < c.toUpperCase().indexOf(e)
        ? ((g += 1), $(this).show())
        : $(this).hide();
    });
  g ? $(".no_data").hide() : $(".no_data").show();
}
$(".nout-viewgal").click(function () {
  $(".nout-showgal").fadeIn();
  $(".nout-viewgal").fadeOut();
});
$(".nout-btn1").click(function () {
  $(".mobi-modisearch").slideToggle();
  $(".noutmobi-bgtrans").fadeIn();
});
$(".mobi-outbtn").click(function () {
  0 < $(".success").length && ($(".success").text(""), $(".success").hide());
  $(".mobi-modisearch").slideToggle();
  $(".noutmobi-bgtrans").fadeIn();
});
$(".modiclose").click(function () {
  $(".mobi-modisearch").slideToggle();
  $(".noutmobi-bgtrans").fadeOut();
});
$(".clicktoadd-review").click(function () {
  $(".nout-popupbg").fadeIn();
  $(".nout-popupwrap").fadeIn();
});
$(".nout-close").click(function () {
  $(".nout-popupbg").fadeOut();
  $(".nout-popupwrap").fadeOut();
});
$(document).ready(function () {
  $("#mobigallery").gsp_carousel({
    item: 3,
    loop: !0,
    showUpcoming: !1,
    upcomingPercent: 40,
    slideMove: 1,
    mode: "slide",
    showCounter: !1,
    counterText: "Showing {current} / {total}",
    autoWidth: !1,
    slideMargin: 6,
    addClass: "my-carousel",
    useCSS: !0,
    speed: 400,
    auto: !1,
    pauseOnHover: !1,
    pause: 2e3,
    controls: !0,
    prevHtml: "<span class='sprite'></span>",
    nextHtml: "<span class='sprite'></span>",
    adaptiveHeight: !1,
    pager: !1,
    gallery: !1,
    enableTouch: !0,
    enableDrag: !0,
    freeMove: !0,
    swipeThreshold: 40,
    responsive: [
      { breakpoint: 1600, settings: { item: 3, slideMargin: 6 } },
      { breakpoint: 480, settings: { item: 3, slideMargin: 6 } },
    ],
  });
  var a;
  $(function () {
    if (0 < $("#noutgal-popup").length) {
      $("#noutgal-popup").gsp_modal({
        height: "80%",
        border: !1,
        width: "100%",
        maxWidth: "100%",
      });
      var b = $("#noutgal-popup");
      $(".mobigalslider, .nreview-gallerywrap").click(function (c) {
        var e = $(c.target).attr("data-image-index");
        void 0 == e && (e = 1);
        a &&
          (a.parents(".gscr_slideOuter").remove(),
          $("#gallery-container").append(
            '<ul class="gallery list-unstyled cS-hidden" id="galler_cr"></ul>'
          ));
        $this = $(this);
        $galleryContainer = $("#galler_cr");
        $galleryContainer.empty();
        $this
          .find("img")
          .clone(!0)
          .removeClass("lazyOwl")
          .removeAttr("height")
          .removeAttr("width")
          .each(function () {
            var a = $(this).attr("title"),
              b = $(this).attr("data-full-img");
            $galleryContainer.append(
              '<div class="L-Contents"><div class="outpop-galtitle">' +
                a +
                '</div><div class="L-Img"><img src="' +
                b +
                '"></div></div>'
            );
          });
        a = $("#galler_cr").gsp_carousel({
          gallery: !0,
          item: 1,
          loop: !1,
          pager: !1,
          controls: !0,
          prevHtml: '<i class="sprite"></i>',
          nextHtml: '<i class="sprite"></i>',
        });
        b.trigger("gse_modal.open");
        setTimeout(function () {
          a.refresh();
          a.goToSlide(e);
        }, 50);
      });
    }
  });
});
$(".nout-plus").click(function () {
  $(".daywise").slideToggle(function () {
    1 == $(this).is(":visible")
      ? ($(".workingslide").removeClass("nout-plus"),
        $(".workingslide").addClass("nout-minus"))
      : ($(".workingslide").removeClass("nout-minus"),
        $(".workingslide").addClass("nout-plus"));
  });
});
$(document).ready(function (a) {
  $("a.mobi-outseemore").on("click", function (a) {
    a.preventDefault();
    $(".daywise").slideToggle(function (a) {
      $(".daywise").is(":visible")
        ? ($(".mobi-outseemore").removeClass("outplus"),
          $(".mobi-outseemore").addClass("outminus"))
        : ($(".mobi-outseemore").addClass("outplus"),
          $(".mobi-outseemore").removeClass("outminus"));
    });
  });
});
function outlet_popup(a, b) {
  $.ajax({
    url: lang + "/outlet/popup?id=" + b,
    type: "post",
    data: $("#popup_form").serialize(),
    beforeSend: function (b) {
      a.attr("disabled", !0);
      $("#loading_img").show();
    },
    success: function (a) {
      $("#custom_popup").html(a);
      if (0 <= $("#popup_form").find(".has-error").length) return !1;
    },
  });
  return !0;
}
function submitRating(a) {
  $.ajax({
    url: lang + "/outlet/outlet-detail?link_rewrite=" + a,
    type: "post",
    data: $("#outlet_detail").serialize(),
    beforeSend: function (a) {
      $(".nout-viewbtn").prop("disabled", "disabled");
    },
    success: function (a) {
      "1" != a
        ? ($(".nout-viewbtn").removeAttr("disabled"),
          (errors = $.parseJSON(a)),
          $.each(errors, function (a, b) {
            $("#outletrating-" + a)
              .parent()
              .addClass("has-error");
            $("#outletrating-" + a)
              .parent()
              .find(".help-block")
              .text(b);
          }))
        : ($(".nout-viewbtn").removeAttr("disabled"),
          0 < $(".newoutlet-desktopview").length
            ? ($(".success").show(),
              $("#outlet_detail")[0].reset(),
              $("#outletrating-undefined").parent().removeClass("has-error"),
              $("#outletrating-undefined")
                .parent()
                .find(".help-block")
                .text(""),
              $(".rate_me").find("span").addClass("star-unselect"))
            : location.reload());
    },
  });
  return !1;
}
function select_data_outletmobile() {
  select_data();
  setTimeout(function () {
    $(".noutmobi-bgtrans").css("display", "none");
  }, 10);
}
$(".model_close").click(function () {
  $(this).trigger("gse_modal.close");
});
function service_popup(a, b) {
  $.ajax({
    url: lang + "/outlet/service-popup?id=" + b,
    type: "post",
    data: $("#popup_form").serialize(),
    beforeSend: function (b) {
      a.attr("disabled", !0);
      $("#loading_img").show();
    },
    success: function (a) {
      $("#custom_popup").html(a);
      if (0 <= $("#popup_form").find(".has-error").length) return !1;
    },
  });
  return !0;
}
function driving_popup(a, b) {
  $.ajax({
    url: lang + "/outlet/driving-popup?id=" + b,
    type: "post",
    data: $("#popup_form").serialize(),
    beforeSend: function (b) {
      a.attr("disabled", !0);
      $("#loading_img").show();
    },
    success: function (a) {
      $("#custom_popup").html(a);
      if (0 <= $("#popup_form").find(".has-error").length) return !1;
    },
  });
  return !0;
}
function getRatings(a, b, c) {
  $.ajax({
    url:
      lang +
      "/outlet/getratings?outlet_id=" +
      a +
      "&page=" +
      b +
      "&exclude_ids=" +
      c,
    type: "get",
    success: function (a) {
      $.trim(a) && $("#rating_data").append(a);
    },
  });
}
var lead_type = "contactus_newcar";
function getleadtype(a) {
  lead_type = a;
  "contactus_newcar" == lead_type
    ? ($("#contact_service").hide(), $("#contact_sales").show())
    : "contactus_service" == lead_type
    ? ($("#contact_sales").hide(), $("#contact_service").show())
    : "contactus_others" == lead_type
    ? ($("#contact_service").hide(), $("#contact_sales").show())
    : "contactus_feedback" == lead_type &&
      ($("#contact_service").hide(),
      $("#contact_sales").show(),
      $("#customerprofile-query")
        .parent()
        .parent()
        .find("label")
        .html("Your Query<sup>*</sup>"));
}
function calltocontactus() {
  $("#show_contactus").show();
  $("body").addClass("pnoscroll");
  "contactus_service" == lead_type
    ? ($(".popuptitle").text("Service No."),
      $("#service_phone").show(),
      $("#new_car").hide())
    : ($(".popuptitle").text("Sales No."),
      $("#new_car").show(),
      $("#service_phone").hide());
}
0 < $(".newcontact").find(".contact_rate").find("span").length &&
  $(".newcontact")
    .find(".contact_rate")
    .find("span")
    .click(function () {
      var a = $(this).index() + 1;
      $(".contact_rate").find(".star-fullselect").addClass("star-unselect");
      $(".contact_rate")
        .find(".star-fullselect")
        .removeClass("star-fullselect");
      $(".contact_rate").children().slice(0, a).removeClass("star-unselect");
      $(".contact_rate").children().slice(0, a).addClass("star-fullselect");
      $("#customerprofile-rating").val(a);
    });
function select_variant_offer(a) {
  $("select[id ^='variant_']").parent().hide();
  $("#variant_" + a.val())
    .parent()
    .show();
  a.val() && a.val();
  1007 < screen.width && variant_data($("#variant_" + a.text()), a);
}
function submit_offer_form(a, b) {
  var c = $("#offers-model_name");
  variant_data($("#variant_" + c.val()), c, a);
  "mobile" == b && $(".soffer-selectbtn").click();
}
function variant_data(a, b, c) {
  a = a.val();
  b = b.val();
  var e = $("#offer_type").val(),
    g = $("#offers-city").val();
  c = c ? c : $("#page_no").val();
  $.get(lang + "/offers/variantdetail", {
    model_id: b,
    variant_id: a,
    type: e,
    page: c,
    city_id: g,
  }).done(function (a) {
    $("#offerproduct").html(a);
    $(".offer_terms").gsp_popup({
      inline: !0,
      onOpen: function () {
        $("#show_connecto_popup").text("false");
        $("body").addClass("pnoscroll");
      },
      onClosed: function () {
        $("#show_connecto_popup").text("true");
        $("body").removeClass("pnoscroll");
      },
    });
    $(".close").click(function () {
      $.gsp_popup.close();
    });
    $(".sdescribe").click(function () {
      var a = $(this).data("count");
      $('div[class^="soffer-des"]')
        .not(".soffer-des" + a)
        .slideUp();
      $(".soffer-des" + $(this).data("count")).slideToggle(700);
      $(".sdescribe" + $(this).data("count")).addClass("active");
      $("#sofferlist" + $(this).data("count")).addClass("sofselected");
    });
    $(".soff-close").click(function () {
      $(".soffer-des" + $(this).data("count")).slideToggle(700);
      $(".sdescribe" + $(this).data("count")).removeClass("active");
      $("#sofferlist" + $(this).data("count")).removeClass("sofselected");
    });
    $(".spoffertab").click(function () {
      $(".spoffer-result").fadeIn();
      $(".corofferresult").fadeOut();
      $(".spoffertab").addClass("active");
      $(".coroffertab").removeClass("active");
    });
    $(".popupform").gsp_popup({ overlayClose: !1 });
    $(".popupform").gsp_popup({
      onOpen: function () {
        $("#show_connecto_popup").text("false");
        $("body").addClass("pnoscroll");
      },
      onClosed: function () {
        $("#show_connecto_popup").text("true");
        $("body").removeClass("pnoscroll");
      },
    });
  });
}
function book_test_drive_popup(a, b) {
  $.ajax({
    url: lang + "/outlet/book-test-drive-popup?id=" + b,
    type: "post",
    data: $("#popup_form").serialize(),
    beforeSend: function (b) {
      a.attr("disabled", !0);
      $("#loading_img").show();
    },
    success: function (a) {
      $("#custom_popup").html(a);
      if (0 <= $("#popup_form").find(".has-error").length) return !1;
    },
  });
  return !0;
}
$("#fuel_select").change(function () {
  $("#fuel_form").submit();
});
$(document).click(function (a) {
  var b = $("#final_city_value"),
    c = $("#getcityname").val();
  b.is(a.target)
    ? ($("#city_name li").show(), $("#no_match").hide())
    : ($("#city_name").hide(), $("#final_city_value").val(c));
});
$("#final_city_value").click(function () {
  $("#city_name").slideToggle();
});
$("#final_city_value").on("keyup", function () {
  $("#city_name").show();
  1 == $("#no_match").length && $("#no_match").hide();
  var a = $(this).val().toLowerCase();
  $("#city_name > li").each(function () {
    $(this).toggle(-1 !== $(this).text().toLowerCase().indexOf(a));
  });
  0 == $("#city_name > li :visible").length &&
    (1 == $("#no_match").length
      ? $("#no_match").show()
      : $("#city_name").append('<li id="no_match">No matches</li>'));
});
$("#acc1").addClass("open");
$("#open-by-default-example h3").click(function () {
  var a = $(this);
  $(this)
    .next("div.compcontent")
    .slideToggle(function () {
      $(this).is(":visible") ? a.addClass("open") : a.removeClass("open");
    });
});
$("select[id^=offers-model_name_]").change();
$("#cal_emi").click();
function getOutletCity(a) {
  var b = $("#model_name").val();
  $.ajax({
    url:
      lang +
      "/outlet/getoutletcities?id_model=" +
      a +
      "&model_name=" +
      b +
      "&outlet_type=showroom",
    type: "get",
    beforeSend: function (a) {
      $(".lodingimg").show();
    },
    success: function (a) {
      a &&
        ($("#customerprofile-city").html(a),
        $("#customerprofile-city").change());
    },
  });
}
function getOfferOutletCity() {
  var a = $("#offermodelid").val(),
    b = $("#offermodel").val();
  $.ajax({
    url:
      lang +
      "/outlet/getoutletcities?id_model=" +
      a +
      "&model_name=" +
      b +
      "&outlet_type=showroom",
    type: "get",
    beforeSend: function (a) {
      $(".lodingimg").show();
    },
    success: function (a) {
      $("#popup_form").find("#offers-city").html(a);
      $("#popup_form").find("#offers-city").change();
    },
  });
}
0 < $(".desktoptionprice").length &&
  $(".checkoptionprice").click(function () {
    $(".checkoptionprice").is(":checked")
      ? ($(".optional_price").show(), $(".onroad_price").hide())
      : ($(".optional_price").hide(), $(".onroad_price").show());
  });
function showoptionprice(a) {
  $(".checkoptionpricemobi" + a).is(":checked")
    ? ($(".optional_price" + a).show(), $(".onroad_price" + a).hide())
    : ($(".optional_price" + a).hide(), $(".onroad_price" + a).show());
}
window.dataLayer = window.dataLayer || [];
(function (a) {
  a.fn.tracking = function (b) {
    defaults = {
      open: !1,
      clicked: !1,
      formId: "",
      location: "",
      openType: "clicked",
    };
    b = a.extend({}, a.fn.tracking.defaults, b);
    if (b.formId) {
      var c = a("#" + b.formId);
      c.find(":input");
    }
    void 0 == b.location && (b.location = "");
    b.formId &&
      void 0 != c.attr("name") &&
      ((c = c.attr("name")),
      void 0 == c && (c = ""),
      "autoopen" == b.openType && (c = b.openType + "-" + c),
      b.open
        ? dataLayer.push({
            event: "leadbuttonclick",
            eventCategory: "enquiry",
            eventAction: "open",
            formName: c,
          })
        : b.clicked &&
          ("autoopen" == b.openType
            ? dataLayer.push({
                event: "leadformopen",
                eventCategory: "enquiry",
                eventAction: "autoopen",
                formName: c,
              })
            : dataLayer.push({
                event: "leadbuttonclick",
                eventCategory: "enquiry",
                eventAction: "clicked",
                formName: c,
                location: b.location,
              })));
  };
})(jQuery);
$(document).ready(function () {
  $("form").each(function () {
    "fuel_form" != $(this).attr("id") &&
      $.fn.tracking({ open: !0, formId: $(this).attr("id") });
  });
});
var position = "";
$(document).on("click", "a", function (a, b) {
  position = $(this).attr("data-position");
});
$(document).ajaxComplete(function (a, b, c) {
  if ((a = $("<div>" + b.responseText + "</div>").find("form"))) {
    var e = "";
    c = c.url.substring(1).split("&");
    for (b = 0; b < c.length; b++) {
      var g = c[b].split("=");
      "eventaction" == g[0] && (e = g[1]);
    }
    a.each(function () {
      $.fn.tracking({
        clicked: !0,
        formId: $(this).attr("id"),
        location: position,
        openType: e,
      });
    });
  }
});
function ga_event(a) {
  var b = "",
    c = "",
    e = "";
  a.eventLabel && (b = a.eventLabel);
  a.form_field && (c = a.form_field);
  a.formName && (e = a.formName);
  dataLayer.push({
    event: a.event,
    eventCategory: a.eventCategory,
    eventAction: a.eventAction,
    eventLabel: b,
    form_field: c,
    formName: e,
  });
}
