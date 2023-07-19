window.__require = function e(t, n, i) {
	function o(r, a) {
		if (!n[r]) {
			if (!t[r]) {
				var h = r.split("/");
				if (h = h[h.length - 1], !t[h]) {
					var c = "function" == typeof __require && __require;
					if (!a && c) return c(h, !0);
					if (s) return s(h, !0);
					throw new Error("Cannot find module '" + r + "'")
				}
				r = h
			}
			var l = n[r] = {
				exports: {}
			};
			t[r][0].call(l.exports, function (e) {
				return o(t[r][1][e] || e)
			}, l, l.exports, e, t, n, i)
		}
		return n[r].exports
	}
	for (var s = "function" == typeof __require && __require, r = 0; r < i.length; r++) o(i[r]);
	return o
}({
	1: [function (e, t, n) {
		"use strict";
		n.byteLength = function (e) {
			var t = c(e),
				n = t[0],
				i = t[1];
			return 3 * (n + i) / 4 - i
		}, n.toByteArray = function (e) {
			var t, n, i = c(e),
				r = i[0],
				a = i[1],
				h = new s(l(0, r, a)),
				u = 0,
				p = a > 0 ? r - 4 : r;
			for (n = 0; n < p; n += 4) t = o[e.charCodeAt(n)] << 18 | o[e.charCodeAt(n + 1)] << 12 | o[e.charCodeAt(n + 2)] << 6 | o[e.charCodeAt(n + 3)], h[u++] = t >> 16 & 255, h[u++] = t >> 8 & 255, h[u++] = 255 & t;
			return 2 === a && (t = o[e.charCodeAt(n)] << 2 | o[e.charCodeAt(n + 1)] >> 4, h[u++] = 255 & t), 1 === a && (t = o[e.charCodeAt(n)] << 10 | o[e.charCodeAt(n + 1)] << 4 | o[e.charCodeAt(n + 2)] >> 2, h[u++] = t >> 8 & 255, h[u++] = 255 & t), h
		}, n.fromByteArray = function (e) {
			for (var t, n = e.length, o = n % 3, s = [], r = 0, a = n - o; r < a; r += 16383) s.push(u(e, r, r + 16383 > a ? a : r + 16383));
			return 1 === o ? (t = e[n - 1], s.push(i[t >> 2] + i[t << 4 & 63] + "==")) : 2 === o && (t = (e[n - 2] << 8) + e[n - 1], s.push(i[t >> 10] + i[t >> 4 & 63] + i[t << 2 & 63] + "=")), s.join("")
		};
		for (var i = [], o = [], s = "undefined" != typeof Uint8Array ? Uint8Array : Array, r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, h = r.length; a < h; ++a) i[a] = r[a], o[r.charCodeAt(a)] = a;

		function c(e) {
			var t = e.length;
			if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
			var n = e.indexOf("=");
			return -1 === n && (n = t), [n, n === t ? 0 : 4 - n % 4]
		}

		function l(e, t, n) {
			return 3 * (t + n) / 4 - n
		}

		function u(e, t, n) {
			for (var o, s, r = [], a = t; a < n; a += 3) o = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (255 & e[a + 2]), r.push(i[(s = o) >> 18 & 63] + i[s >> 12 & 63] + i[s >> 6 & 63] + i[63 & s]);
			return r.join("")
		}
		o["-".charCodeAt(0)] = 62, o["_".charCodeAt(0)] = 63
	}, {}],
	2: [function (e, t, n) {
		(function (t) {
			"use strict";
			var i = e("base64-js"),
				o = e("ieee754"),
				s = e("isarray");

			function r() {
				return h.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
			}

			function a(e, t) {
				if (r() < t) throw new RangeError("Invalid typed array length");
				return h.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = h.prototype : (null === e && (e = new h(t)), e.length = t), e
			}

			function h(e, t, n) {
				if (!(h.TYPED_ARRAY_SUPPORT || this instanceof h)) return new h(e, t, n);
				if ("number" == typeof e) {
					if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
					return p(this, e)
				}
				return c(this, e, t, n)
			}

			function c(e, t, n, i) {
				if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
				return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? g(e, t, n, i) : "string" == typeof t ? d(e, t, n) : m(e, t)
			}

			function l(e) {
				if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
				if (e < 0) throw new RangeError('"size" argument must not be negative')
			}

			function u(e, t, n, i) {
				return l(t), t <= 0 ? a(e, t) : void 0 !== n ? "string" == typeof i ? a(e, t).fill(n, i) : a(e, t).fill(n) : a(e, t)
			}

			function p(e, t) {
				if (l(t), e = a(e, t < 0 ? 0 : 0 | v(t)), !h.TYPED_ARRAY_SUPPORT)
					for (var n = 0; n < t; ++n) e[n] = 0;
				return e
			}

			function d(e, t, n) {
				if ("string" == typeof n && "" !== n || (n = "utf8"), !h.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
				var i = 0 | y(t, n),
					o = (e = a(e, i)).write(t, n);
				return o !== i && (e = e.slice(0, o)), e
			}

			function f(e, t) {
				var n = t.length < 0 ? 0 : 0 | v(t.length);
				e = a(e, n);
				for (var i = 0; i < n; i += 1) e[i] = 255 & t[i];
				return e
			}

			function g(e, t, n, i) {
				if (t.byteLength, n < 0 || t.byteLength < n) throw new RangeError("'offset' is out of bounds");
				if (t.byteLength < n + (i || 0)) throw new RangeError("'length' is out of bounds");
				return t = void 0 === n && void 0 === i ? new Uint8Array(t) : void 0 === i ? new Uint8Array(t, n) : new Uint8Array(t, n, i), h.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = h.prototype : e = f(e, t), e
			}

			function m(e, t) {
				if (h.isBuffer(t)) {
					var n = 0 | v(t.length);
					return 0 === (e = a(e, n)).length ? e : (t.copy(e, 0, 0, n), e)
				}
				if (t) {
					if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || (i = t.length) != i ? a(e, 0) : f(e, t);
					if ("Buffer" === t.type && s(t.data)) return f(e, t.data)
				}
				var i;
				throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
			}

			function v(e) {
				if (e >= r()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + r().toString(16) + " bytes");
				return 0 | e
			}

			function y(e, t) {
				if (h.isBuffer(e)) return e.length;
				if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
				"string" != typeof e && (e = "" + e);
				var n = e.length;
				if (0 === n) return 0;
				for (var i = !1; ;) switch (t) {
					case "ascii":
					case "latin1":
					case "binary":
						return n;
					case "utf8":
					case "utf-8":
					case void 0:
						return Y(e).length;
					case "ucs2":
					case "ucs-2":
					case "utf16le":
					case "utf-16le":
						return 2 * n;
					case "hex":
						return n >>> 1;
					case "base64":
						return Z(e).length;
					default:
						if (i) return Y(e).length;
						t = ("" + t).toLowerCase(), i = !0
				}
			}

			function w(e, t, n) {
				var i = !1;
				if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
				if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
				if ((n >>>= 0) <= (t >>>= 0)) return "";
				for (e || (e = "utf8"); ;) switch (e) {
					case "hex":
						return D(this, t, n);
					case "utf8":
					case "utf-8":
						return R(this, t, n);
					case "ascii":
						return M(this, t, n);
					case "latin1":
					case "binary":
						return I(this, t, n);
					case "base64":
						return _(this, t, n);
					case "ucs2":
					case "ucs-2":
					case "utf16le":
					case "utf-16le":
						return W(this, t, n);
					default:
						if (i) throw new TypeError("Unknown encoding: " + e);
						e = (e + "").toLowerCase(), i = !0
				}
			}

			function P(e, t, n) {
				var i = e[t];
				e[t] = e[n], e[n] = i
			}

			function b(e, t, n, i, o) {
				if (0 === e.length) return -1;
				if ("string" == typeof n ? (i = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = o ? 0 : e.length - 1), n < 0 && (n = e.length + n), n >= e.length) {
					if (o) return -1;
					n = e.length - 1
				} else if (n < 0) {
					if (!o) return -1;
					n = 0
				}
				if ("string" == typeof t && (t = h.from(t, i)), h.isBuffer(t)) return 0 === t.length ? -1 : E(e, t, n, i, o);
				if ("number" == typeof t) return t &= 255, h.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : E(e, [t], n, i, o);
				throw new TypeError("val must be string, number or Buffer")
			}

			function E(e, t, n, i, o) {
				var s, r = 1,
					a = e.length,
					h = t.length;
				if (void 0 !== i && ("ucs2" === (i = String(i).toLowerCase()) || "ucs-2" === i || "utf16le" === i || "utf-16le" === i)) {
					if (e.length < 2 || t.length < 2) return -1;
					r = 2, a /= 2, h /= 2, n /= 2
				}

				function c(e, t) {
					return 1 === r ? e[t] : e.readUInt16BE(t * r)
				}
				if (o) {
					var l = -1;
					for (s = n; s < a; s++)
						if (c(e, s) === c(t, -1 === l ? 0 : s - l)) {
							if (-1 === l && (l = s), s - l + 1 === h) return l * r
						} else - 1 !== l && (s -= s - l), l = -1
				} else
					for (n + h > a && (n = a - h), s = n; s >= 0; s--) {
						for (var u = !0, p = 0; p < h; p++)
							if (c(e, s + p) !== c(t, p)) {
								u = !1;
								break
							} if (u) return s
					}
				return -1
			}

			function C(e, t, n, i) {
				n = Number(n) || 0;
				var o = e.length - n;
				i ? (i = Number(i)) > o && (i = o) : i = o;
				var s = t.length;
				if (s % 2 != 0) throw new TypeError("Invalid hex string");
				i > s / 2 && (i = s / 2);
				for (var r = 0; r < i; ++r) {
					var a = parseInt(t.substr(2 * r, 2), 16);
					if (isNaN(a)) return r;
					e[n + r] = a
				}
				return r
			}

			function S(e, t, n, i) {
				return J(Y(t, e.length - n), e, n, i)
			}

			function A(e, t, n, i) {
				return J(q(t), e, n, i)
			}

			function T(e, t, n, i) {
				return A(e, t, n, i)
			}

			function N(e, t, n, i) {
				return J(Z(t), e, n, i)
			}

			function x(e, t, n, i) {
				return J(X(t, e.length - n), e, n, i)
			}

			function _(e, t, n) {
				return 0 === t && n === e.length ? i.fromByteArray(e) : i.fromByteArray(e.slice(t, n))
			}

			function R(e, t, n) {
				n = Math.min(e.length, n);
				for (var i = [], o = t; o < n;) {
					var s, r, a, h, c = e[o],
						l = null,
						u = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
					if (o + u <= n) switch (u) {
						case 1:
							c < 128 && (l = c);
							break;
						case 2:
							128 == (192 & (s = e[o + 1])) && (h = (31 & c) << 6 | 63 & s) > 127 && (l = h);
							break;
						case 3:
							s = e[o + 1], r = e[o + 2], 128 == (192 & s) && 128 == (192 & r) && (h = (15 & c) << 12 | (63 & s) << 6 | 63 & r) > 2047 && (h < 55296 || h > 57343) && (l = h);
							break;
						case 4:
							s = e[o + 1], r = e[o + 2], a = e[o + 3], 128 == (192 & s) && 128 == (192 & r) && 128 == (192 & a) && (h = (15 & c) << 18 | (63 & s) << 12 | (63 & r) << 6 | 63 & a) > 65535 && h < 1114112 && (l = h)
					}
					null === l ? (l = 65533, u = 1) : l > 65535 && (l -= 65536, i.push(l >>> 10 & 1023 | 55296), l = 56320 | 1023 & l), i.push(l), o += u
				}
				return B(i)
			}
			n.Buffer = h, n.SlowBuffer = function (e) {
				return +e != e && (e = 0), h.alloc(+e)
			}, n.INSPECT_MAX_BYTES = 50, h.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function () {
				try {
					var e = new Uint8Array(1);
					return e.__proto__ = {
						__proto__: Uint8Array.prototype,
						foo: function () {
							return 42
						}
					}, 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
				} catch (t) {
					return !1
				}
			}(), n.kMaxLength = r(), h.poolSize = 8192, h._augment = function (e) {
				return e.__proto__ = h.prototype, e
			}, h.from = function (e, t, n) {
				return c(null, e, t, n)
			}, h.TYPED_ARRAY_SUPPORT && (h.prototype.__proto__ = Uint8Array.prototype, h.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && h[Symbol.species] === h && Object.defineProperty(h, Symbol.species, {
				value: null,
				configurable: !0
			})), h.alloc = function (e, t, n) {
				return u(null, e, t, n)
			}, h.allocUnsafe = function (e) {
				return p(null, e)
			}, h.allocUnsafeSlow = function (e) {
				return p(null, e)
			}, h.isBuffer = function (e) {
				return !(null == e || !e._isBuffer)
			}, h.compare = function (e, t) {
				if (!h.isBuffer(e) || !h.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
				if (e === t) return 0;
				for (var n = e.length, i = t.length, o = 0, s = Math.min(n, i); o < s; ++o)
					if (e[o] !== t[o]) {
						n = e[o], i = t[o];
						break
					} return n < i ? -1 : i < n ? 1 : 0
			}, h.isEncoding = function (e) {
				switch (String(e).toLowerCase()) {
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
						return !1
				}
			}, h.concat = function (e, t) {
				if (!s(e)) throw new TypeError('"list" argument must be an Array of Buffers');
				if (0 === e.length) return h.alloc(0);
				var n;
				if (void 0 === t)
					for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
				var i = h.allocUnsafe(t),
					o = 0;
				for (n = 0; n < e.length; ++n) {
					var r = e[n];
					if (!h.isBuffer(r)) throw new TypeError('"list" argument must be an Array of Buffers');
					r.copy(i, o), o += r.length
				}
				return i
			}, h.byteLength = y, h.prototype._isBuffer = !0, h.prototype.swap16 = function () {
				var e = this.length;
				if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
				for (var t = 0; t < e; t += 2) P(this, t, t + 1);
				return this
			}, h.prototype.swap32 = function () {
				var e = this.length;
				if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
				for (var t = 0; t < e; t += 4) P(this, t, t + 3), P(this, t + 1, t + 2);
				return this
			}, h.prototype.swap64 = function () {
				var e = this.length;
				if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
				for (var t = 0; t < e; t += 8) P(this, t, t + 7), P(this, t + 1, t + 6), P(this, t + 2, t + 5), P(this, t + 3, t + 4);
				return this
			}, h.prototype.toString = function () {
				var e = 0 | this.length;
				return 0 === e ? "" : 0 === arguments.length ? R(this, 0, e) : w.apply(this, arguments)
			}, h.prototype.equals = function (e) {
				if (!h.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
				return this === e || 0 === h.compare(this, e)
			}, h.prototype.inspect = function () {
				var e = "",
					t = n.INSPECT_MAX_BYTES;
				return this.length > 0 && (e = this.toString("hex", 0, t).match(/.{2}/g).join(" "), this.length > t && (e += " ... ")), "<Buffer " + e + ">"
			}, h.prototype.compare = function (e, t, n, i, o) {
				if (!h.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
				if (void 0 === t && (t = 0), void 0 === n && (n = e ? e.length : 0), void 0 === i && (i = 0), void 0 === o && (o = this.length), t < 0 || n > e.length || i < 0 || o > this.length) throw new RangeError("out of range index");
				if (i >= o && t >= n) return 0;
				if (i >= o) return -1;
				if (t >= n) return 1;
				if (this === e) return 0;
				for (var s = (o >>>= 0) - (i >>>= 0), r = (n >>>= 0) - (t >>>= 0), a = Math.min(s, r), c = this.slice(i, o), l = e.slice(t, n), u = 0; u < a; ++u)
					if (c[u] !== l[u]) {
						s = c[u], r = l[u];
						break
					} return s < r ? -1 : r < s ? 1 : 0
			}, h.prototype.includes = function (e, t, n) {
				return -1 !== this.indexOf(e, t, n)
			}, h.prototype.indexOf = function (e, t, n) {
				return b(this, e, t, n, !0)
			}, h.prototype.lastIndexOf = function (e, t, n) {
				return b(this, e, t, n, !1)
			}, h.prototype.write = function (e, t, n, i) {
				if (void 0 === t) i = "utf8", n = this.length, t = 0;
				else if (void 0 === n && "string" == typeof t) i = t, n = this.length, t = 0;
				else {
					if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
					t |= 0, isFinite(n) ? (n |= 0, void 0 === i && (i = "utf8")) : (i = n, n = void 0)
				}
				var o = this.length - t;
				if ((void 0 === n || n > o) && (n = o), e.length > 0 && (n < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
				i || (i = "utf8");
				for (var s = !1; ;) switch (i) {
					case "hex":
						return C(this, e, t, n);
					case "utf8":
					case "utf-8":
						return S(this, e, t, n);
					case "ascii":
						return A(this, e, t, n);
					case "latin1":
					case "binary":
						return T(this, e, t, n);
					case "base64":
						return N(this, e, t, n);
					case "ucs2":
					case "ucs-2":
					case "utf16le":
					case "utf-16le":
						return x(this, e, t, n);
					default:
						if (s) throw new TypeError("Unknown encoding: " + i);
						i = ("" + i).toLowerCase(), s = !0
				}
			}, h.prototype.toJSON = function () {
				return {
					type: "Buffer",
					data: Array.prototype.slice.call(this._arr || this, 0)
				}
			};
			var L = 4096;

			function B(e) {
				var t = e.length;
				if (t <= L) return String.fromCharCode.apply(String, e);
				for (var n = "", i = 0; i < t;) n += String.fromCharCode.apply(String, e.slice(i, i += L));
				return n
			}

			function M(e, t, n) {
				var i = "";
				n = Math.min(e.length, n);
				for (var o = t; o < n; ++o) i += String.fromCharCode(127 & e[o]);
				return i
			}

			function I(e, t, n) {
				var i = "";
				n = Math.min(e.length, n);
				for (var o = t; o < n; ++o) i += String.fromCharCode(e[o]);
				return i
			}

			function D(e, t, n) {
				var i, o = e.length;
				(!t || t < 0) && (t = 0), (!n || n < 0 || n > o) && (n = o);
				for (var s = "", r = t; r < n; ++r) s += (i = e[r]) < 16 ? "0" + i.toString(16) : i.toString(16);
				return s
			}

			function W(e, t, n) {
				for (var i = e.slice(t, n), o = "", s = 0; s < i.length; s += 2) o += String.fromCharCode(i[s] + 256 * i[s + 1]);
				return o
			}

			function G(e, t, n) {
				if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
				if (e + t > n) throw new RangeError("Trying to access beyond buffer length")
			}

			function U(e, t, n, i, o, s) {
				if (!h.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
				if (t > o || t < s) throw new RangeError('"value" argument is out of bounds');
				if (n + i > e.length) throw new RangeError("Index out of range")
			}

			function O(e, t, n, i) {
				t < 0 && (t = 65535 + t + 1);
				for (var o = 0, s = Math.min(e.length - n, 2); o < s; ++o) e[n + o] = (t & 255 << 8 * (i ? o : 1 - o)) >>> 8 * (i ? o : 1 - o)
			}

			function F(e, t, n, i) {
				t < 0 && (t = 4294967295 + t + 1);
				for (var o = 0, s = Math.min(e.length - n, 4); o < s; ++o) e[n + o] = t >>> 8 * (i ? o : 3 - o) & 255
			}

			function V(e, t, n, i) {
				if (n + i > e.length) throw new RangeError("Index out of range");
				if (n < 0) throw new RangeError("Index out of range")
			}

			function k(e, t, n, i, s) {
				return s || V(e, 0, n, 4), o.write(e, t, n, i, 23, 4), n + 4
			}

			function z(e, t, n, i, s) {
				return s || V(e, 0, n, 8), o.write(e, t, n, i, 52, 8), n + 8
			}
			h.prototype.slice = function (e, t) {
				var n, i = this.length;
				if ((e = ~~e) < 0 ? (e += i) < 0 && (e = 0) : e > i && (e = i), (t = void 0 === t ? i : ~~t) < 0 ? (t += i) < 0 && (t = 0) : t > i && (t = i), t < e && (t = e), h.TYPED_ARRAY_SUPPORT) (n = this.subarray(e, t)).__proto__ = h.prototype;
				else {
					var o = t - e;
					n = new h(o, void 0);
					for (var s = 0; s < o; ++s) n[s] = this[s + e]
				}
				return n
			}, h.prototype.readUIntLE = function (e, t, n) {
				e |= 0, t |= 0, n || G(e, t, this.length);
				for (var i = this[e], o = 1, s = 0; ++s < t && (o *= 256);) i += this[e + s] * o;
				return i
			}, h.prototype.readUIntBE = function (e, t, n) {
				e |= 0, t |= 0, n || G(e, t, this.length);
				for (var i = this[e + --t], o = 1; t > 0 && (o *= 256);) i += this[e + --t] * o;
				return i
			}, h.prototype.readUInt8 = function (e, t) {
				return t || G(e, 1, this.length), this[e]
			}, h.prototype.readUInt16LE = function (e, t) {
				return t || G(e, 2, this.length), this[e] | this[e + 1] << 8
			}, h.prototype.readUInt16BE = function (e, t) {
				return t || G(e, 2, this.length), this[e] << 8 | this[e + 1]
			}, h.prototype.readUInt32LE = function (e, t) {
				return t || G(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
			}, h.prototype.readUInt32BE = function (e, t) {
				return t || G(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
			}, h.prototype.readIntLE = function (e, t, n) {
				e |= 0, t |= 0, n || G(e, t, this.length);
				for (var i = this[e], o = 1, s = 0; ++s < t && (o *= 256);) i += this[e + s] * o;
				return i >= (o *= 128) && (i -= Math.pow(2, 8 * t)), i
			}, h.prototype.readIntBE = function (e, t, n) {
				e |= 0, t |= 0, n || G(e, t, this.length);
				for (var i = t, o = 1, s = this[e + --i]; i > 0 && (o *= 256);) s += this[e + --i] * o;
				return s >= (o *= 128) && (s -= Math.pow(2, 8 * t)), s
			}, h.prototype.readInt8 = function (e, t) {
				return t || G(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
			}, h.prototype.readInt16LE = function (e, t) {
				t || G(e, 2, this.length);
				var n = this[e] | this[e + 1] << 8;
				return 32768 & n ? 4294901760 | n : n
			}, h.prototype.readInt16BE = function (e, t) {
				t || G(e, 2, this.length);
				var n = this[e + 1] | this[e] << 8;
				return 32768 & n ? 4294901760 | n : n
			}, h.prototype.readInt32LE = function (e, t) {
				return t || G(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
			}, h.prototype.readInt32BE = function (e, t) {
				return t || G(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
			}, h.prototype.readFloatLE = function (e, t) {
				return t || G(e, 4, this.length), o.read(this, e, !0, 23, 4)
			}, h.prototype.readFloatBE = function (e, t) {
				return t || G(e, 4, this.length), o.read(this, e, !1, 23, 4)
			}, h.prototype.readDoubleLE = function (e, t) {
				return t || G(e, 8, this.length), o.read(this, e, !0, 52, 8)
			}, h.prototype.readDoubleBE = function (e, t) {
				return t || G(e, 8, this.length), o.read(this, e, !1, 52, 8)
			}, h.prototype.writeUIntLE = function (e, t, n, i) {
				e = +e, t |= 0, n |= 0, i || U(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
				var o = 1,
					s = 0;
				for (this[t] = 255 & e; ++s < n && (o *= 256);) this[t + s] = e / o & 255;
				return t + n
			}, h.prototype.writeUIntBE = function (e, t, n, i) {
				e = +e, t |= 0, n |= 0, i || U(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
				var o = n - 1,
					s = 1;
				for (this[t + o] = 255 & e; --o >= 0 && (s *= 256);) this[t + o] = e / s & 255;
				return t + n
			}, h.prototype.writeUInt8 = function (e, t, n) {
				return e = +e, t |= 0, n || U(this, e, t, 1, 255, 0), h.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1
			}, h.prototype.writeUInt16LE = function (e, t, n) {
				return e = +e, t |= 0, n || U(this, e, t, 2, 65535, 0), h.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : O(this, e, t, !0), t + 2
			}, h.prototype.writeUInt16BE = function (e, t, n) {
				return e = +e, t |= 0, n || U(this, e, t, 2, 65535, 0), h.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : O(this, e, t, !1), t + 2
			}, h.prototype.writeUInt32LE = function (e, t, n) {
				return e = +e, t |= 0, n || U(this, e, t, 4, 4294967295, 0), h.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : F(this, e, t, !0), t + 4
			}, h.prototype.writeUInt32BE = function (e, t, n) {
				return e = +e, t |= 0, n || U(this, e, t, 4, 4294967295, 0), h.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : F(this, e, t, !1), t + 4
			}, h.prototype.writeIntLE = function (e, t, n, i) {
				if (e = +e, t |= 0, !i) {
					var o = Math.pow(2, 8 * n - 1);
					U(this, e, t, n, o - 1, -o)
				}
				var s = 0,
					r = 1,
					a = 0;
				for (this[t] = 255 & e; ++s < n && (r *= 256);) e < 0 && 0 === a && 0 !== this[t + s - 1] && (a = 1), this[t + s] = (e / r >> 0) - a & 255;
				return t + n
			}, h.prototype.writeIntBE = function (e, t, n, i) {
				if (e = +e, t |= 0, !i) {
					var o = Math.pow(2, 8 * n - 1);
					U(this, e, t, n, o - 1, -o)
				}
				var s = n - 1,
					r = 1,
					a = 0;
				for (this[t + s] = 255 & e; --s >= 0 && (r *= 256);) e < 0 && 0 === a && 0 !== this[t + s + 1] && (a = 1), this[t + s] = (e / r >> 0) - a & 255;
				return t + n
			}, h.prototype.writeInt8 = function (e, t, n) {
				return e = +e, t |= 0, n || U(this, e, t, 1, 127, -128), h.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
			}, h.prototype.writeInt16LE = function (e, t, n) {
				return e = +e, t |= 0, n || U(this, e, t, 2, 32767, -32768), h.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : O(this, e, t, !0), t + 2
			}, h.prototype.writeInt16BE = function (e, t, n) {
				return e = +e, t |= 0, n || U(this, e, t, 2, 32767, -32768), h.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : O(this, e, t, !1), t + 2
			}, h.prototype.writeInt32LE = function (e, t, n) {
				return e = +e, t |= 0, n || U(this, e, t, 4, 2147483647, -2147483648), h.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : F(this, e, t, !0), t + 4
			}, h.prototype.writeInt32BE = function (e, t, n) {
				return e = +e, t |= 0, n || U(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), h.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : F(this, e, t, !1), t + 4
			}, h.prototype.writeFloatLE = function (e, t, n) {
				return k(this, e, t, !0, n)
			}, h.prototype.writeFloatBE = function (e, t, n) {
				return k(this, e, t, !1, n)
			}, h.prototype.writeDoubleLE = function (e, t, n) {
				return z(this, e, t, !0, n)
			}, h.prototype.writeDoubleBE = function (e, t, n) {
				return z(this, e, t, !1, n)
			}, h.prototype.copy = function (e, t, n, i) {
				if (n || (n = 0), i || 0 === i || (i = this.length), t >= e.length && (t = e.length), t || (t = 0), i > 0 && i < n && (i = n), i === n) return 0;
				if (0 === e.length || 0 === this.length) return 0;
				if (t < 0) throw new RangeError("targetStart out of bounds");
				if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
				if (i < 0) throw new RangeError("sourceEnd out of bounds");
				i > this.length && (i = this.length), e.length - t < i - n && (i = e.length - t + n);
				var o, s = i - n;
				if (this === e && n < t && t < i)
					for (o = s - 1; o >= 0; --o) e[o + t] = this[o + n];
				else if (s < 1e3 || !h.TYPED_ARRAY_SUPPORT)
					for (o = 0; o < s; ++o) e[o + t] = this[o + n];
				else Uint8Array.prototype.set.call(e, this.subarray(n, n + s), t);
				return s
			}, h.prototype.fill = function (e, t, n, i) {
				if ("string" == typeof e) {
					if ("string" == typeof t ? (i = t, t = 0, n = this.length) : "string" == typeof n && (i = n, n = this.length), 1 === e.length) {
						var o = e.charCodeAt(0);
						o < 256 && (e = o)
					}
					if (void 0 !== i && "string" != typeof i) throw new TypeError("encoding must be a string");
					if ("string" == typeof i && !h.isEncoding(i)) throw new TypeError("Unknown encoding: " + i)
				} else "number" == typeof e && (e &= 255);
				if (t < 0 || this.length < t || this.length < n) throw new RangeError("Out of range index");
				if (n <= t) return this;
				var s;
				if (t >>>= 0, n = void 0 === n ? this.length : n >>> 0, e || (e = 0), "number" == typeof e)
					for (s = t; s < n; ++s) this[s] = e;
				else {
					var r = h.isBuffer(e) ? e : Y(new h(e, i).toString()),
						a = r.length;
					for (s = 0; s < n - t; ++s) this[s + t] = r[s % a]
				}
				return this
			};
			var K = /[^+\/0-9A-Za-z-_]/g;

			function H(e) {
				if ((e = j(e).replace(K, "")).length < 2) return "";
				for (; e.length % 4 != 0;) e += "=";
				return e
			}

			function j(e) {
				return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
			}

			function Y(e, t) {
				var n;
				t = t || 1 / 0;
				for (var i = e.length, o = null, s = [], r = 0; r < i; ++r) {
					if ((n = e.charCodeAt(r)) > 55295 && n < 57344) {
						if (!o) {
							if (n > 56319) {
								(t -= 3) > -1 && s.push(239, 191, 189);
								continue
							}
							if (r + 1 === i) {
								(t -= 3) > -1 && s.push(239, 191, 189);
								continue
							}
							o = n;
							continue
						}
						if (n < 56320) {
							(t -= 3) > -1 && s.push(239, 191, 189), o = n;
							continue
						}
						n = 65536 + (o - 55296 << 10 | n - 56320)
					} else o && (t -= 3) > -1 && s.push(239, 191, 189);
					if (o = null, n < 128) {
						if ((t -= 1) < 0) break;
						s.push(n)
					} else if (n < 2048) {
						if ((t -= 2) < 0) break;
						s.push(n >> 6 | 192, 63 & n | 128)
					} else if (n < 65536) {
						if ((t -= 3) < 0) break;
						s.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
					} else {
						if (!(n < 1114112)) throw new Error("Invalid code point");
						if ((t -= 4) < 0) break;
						s.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
					}
				}
				return s
			}

			function q(e) {
				for (var t = [], n = 0; n < e.length; ++n) t.push(255 & e.charCodeAt(n));
				return t
			}

			function X(e, t) {
				for (var n, i, o, s = [], r = 0; r < e.length && !((t -= 2) < 0); ++r) i = (n = e.charCodeAt(r)) >> 8, o = n % 256, s.push(o), s.push(i);
				return s
			}

			function Z(e) {
				return i.toByteArray(H(e))
			}

			function J(e, t, n, i) {
				for (var o = 0; o < i && !(o + n >= t.length || o >= e.length); ++o) t[o + n] = e[o];
				return o
			}
		}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
	}, {
		"base64-js": 1,
		ieee754: 4,
		isarray: 3
	}],
	3: [function (e, t) {
		var n = {}.toString;
		t.exports = Array.isArray || function (e) {
			return "[object Array]" == n.call(e)
		}
	}, {}],
	4: [function (e, t, n) {
		n.read = function (e, t, n, i, o) {
			var s, r, a = 8 * o - i - 1,
				h = (1 << a) - 1,
				c = h >> 1,
				l = -7,
				u = n ? o - 1 : 0,
				p = n ? -1 : 1,
				d = e[t + u];
			for (u += p, s = d & (1 << -l) - 1, d >>= -l, l += a; l > 0; s = 256 * s + e[t + u], u += p, l -= 8);
			for (r = s & (1 << -l) - 1, s >>= -l, l += i; l > 0; r = 256 * r + e[t + u], u += p, l -= 8);
			if (0 === s) s = 1 - c;
			else {
				if (s === h) return r ? NaN : 1 / 0 * (d ? -1 : 1);
				r += Math.pow(2, i), s -= c
			}
			return (d ? -1 : 1) * r * Math.pow(2, s - i)
		}, n.write = function (e, t, n, i, o, s) {
			var r, a, h, c = 8 * s - o - 1,
				l = (1 << c) - 1,
				u = l >> 1,
				p = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
				d = i ? 0 : s - 1,
				f = i ? 1 : -1,
				g = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
			for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, r = l) : (r = Math.floor(Math.log(t) / Math.LN2), t * (h = Math.pow(2, -r)) < 1 && (r--, h *= 2), (t += r + u >= 1 ? p / h : p * Math.pow(2, 1 - u)) * h >= 2 && (r++, h /= 2), r + u >= l ? (a = 0, r = l) : r + u >= 1 ? (a = (t * h - 1) * Math.pow(2, o), r += u) : (a = t * Math.pow(2, u - 1) * Math.pow(2, o), r = 0)); o >= 8; e[n + d] = 255 & a, d += f, a /= 256, o -= 8);
			for (r = r << o | a, c += o; c > 0; e[n + d] = 255 & r, d += f, r /= 256, c -= 8);
			e[n + d - f] |= 128 * g
		}
	}, {}],
	AdNode: [function (e, t) {
		"use strict";
		cc._RF.push(t, "52086f41tdIxbxAj0j0iGNa", "AdNode");
		var n = e("./FBAdManager").default;
		cc.Class({
			extends: cc.Component,
			properties: {},
			onLoad: function () {
				window.hanldeAdStatus = function (e) {
					"request" == e ? console.log("js ad request\uff0c\u8bf7\u6c42\u5e7f\u544a") : "reward" == e ? GmEvent.dispatcher("watchType", cc.AdNode.watchType) : "error" == e && GmEvent.dispatcher("vedioError", cc.AdNode.watchType)
				}.bind(this), cc.AdNode = this, cc.sys.platform == cc.sys.ANDROID && this.scheduleOnce(function () {
					console.log("================================ MaxActivity")
				}, 1), "fb" == window.pf && (n.addRewardedVideo("531498498307462_547897183334260"), n.addBanner("531498498307462_547910806666231"), n.addInterstitial("531498498307462_547911303332848"), n.loadAllAsync())
			},
			delayCb: function (e, t) {
				this.scheduleOnce(function () {
					e()
				}, t)
			},
			showBanner: function () {
				"fb" == window.pf && n.showBannerAsync()
			},
			hideBanner: function () {
				"fb" == window.pf && n.hideBannerAsync()
			},
			loadVedio: function () { },
			showVedio: function (e, t) {
				var i = this;
				this.watchType = e,
				this.scene = t,
				console.log("\u51c6\u5907\u8c03\u8d77\u89c6\u9891\u5e7f\u544a", cc.sys.platform),
				GmEvent.dispatcher("watchType", i.watchType),
				console.log("RW succ"),				
				/*MusicManger.stopBmg(), "gb" == window.pf ?
				window.gamebridge.showReward(function () {
				GmEvent.dispatcher("watchType", i.watchType),
				console.log("RW succ"),
				MusicManger.playBmg()
				}, function () {
					GmEvent.dispatcher("vedioError", cc.AdNode.watchType), console.log("RW fail"), MusicManger.playBmg()
				}) : "fb" == window.pf ? n.showRewardedVideo().then(function () {
					console.log("\u64ad\u653e\u6fc0\u52b1\u89c6\u9891\u5e7f\u544a: \u6210\u529f"), GmEvent.dispatcher("watchType", i.watchType), MusicManger.playBmg()
				}).catch(function (e) {
					console.log("\u64ad\u653e\u6fc0\u52b1\u89c6\u9891\u5e7f\u544a: \u5931\u8d25\uff0c\u539f\u56e0: " + e.message), GmEvent.dispatcher("vedioError", cc.AdNode.watchType), MusicManger.playBmg()
				}) : (console.log("native call..."), native.callClz("AppActivity", "showVedio", " ")), this.sendEvent("s")*/
			},
			sendEvent: function () { },
			onVideoShowed: function () { },
			onVideoSucc: function (e) {
				console.log("----------"), e && this.sendEvent("c"), GmEvent.dispatcher("watchType", this.watchType, e)
			},
			showInterstitialAd: function () {
				"gb" == window.pf ? window.gamebridge.showBrowse() : "fb" == window.pf ? n.showInterstitialAd() : native.callClz("AppActivity", "showINAd")
			},
			showNativeAd: function () {
				"gb" == window.pf ? window.gamebridge.showBrowse() : "fb" == window.pf ? n.showInterstitialAd() : native.callClz("AppActivity", "showNativeAd")
			}
		}), cc._RF.pop()
	}, {
		"./FBAdManager": "FBAdManager"
	}],
	Alert: [function (e, t) {
		"use strict";
		cc._RF.push(t, "33212Cw1wBKDYWesdf96Mp1", "Alert"), cc.Class({
			extends: cc.Component,
			properties: {
				desTxt: cc.Label
			},
			init: function (e) {
				this.desTxt.string = e;
				var t = cc.moveBy(1, cc.v2(0, 200)),
					n = cc.fadeOut(.5),
					i = cc.callFunc(function () {
						this.node.destroy()
					}.bind(this)),
					o = cc.sequence(t, n, i);
				this.node.runAction(o)
			}
		}), cc._RF.pop()
	}, {}],
	BaseEnemy: [function (e, t) {
		"use strict";
		cc._RF.push(t, "8b43621EfhA9JszQtXPZY/M", "BaseEnemy");
		var n = cc.Class({
			extends: cc.Component,
			slowdownSpeedByIce: function () {
				this.node.getComponent("SteeredVehicle").reduceSpeedByIce()
			},
			slowdownSpeed: function () {
				this.node.getComponent("SteeredVehicle").reduceSpeed()
			},
			recoverSpeed: function () {
				this.node.getComponent("SteeredVehicle").resetSpeed()
			},
			handleShakeEffect: function () {
				if (this.canShake) {
					this.canShake = !1;
					var e = this.initScale;
					this.enemyArg.scaleY && (e = this.enemyArg.scaleY);
					var t = .15 + .05 * Math.random(),
						n = cc.scaleTo(.05, this.initScale + t, e + t),
						i = cc.scaleTo(.05, this.initScale, e),
						o = cc.scaleTo(.05, this.initScale + t, e + t),
						s = cc.scaleTo(.05, this.initScale, e),
						r = cc.callFunc(function () {
							this.canShake = !0
						}.bind(this)),
						a = cc.sequence(n, i, o, s, r);
					this.node.runAction(a)
				}
			},
			handleHitEffect: function (e) {
				if (-32 != e.y) {
					this.ishitSlow && !this.isIce && this.slowdownSpeed();
					var t = GNodePool.gethitEffect();
					t.parent = cc.find("Canvas/fightNode/enemygeneror"), null != t.parent && (t.zIndex = t.parent.childrenCount + 1e3), t.setPosition(e);
					var n = function () {
						this.ishitSlow && !this.isIce && this.recoverSpeed()
					}.bind(this);
					t.getComponent("HitEffect").init(n)
				}
			},
			handleExplode: function (e, t) {
				if (null != this.node.parent && this.node.parent.isValid) {
					var n = GNodePool.getexplode();
					n.parent = this.node.parent, n.zIndex = this.node.parent.childrenCount + 1, n.setPosition(e), n.getComponent("Explode").init(this.initScale, t)
				}
			},
			animate: function () {
				var e = this.initScale;
				this.enemyArg.scaleY && (e = this.enemyArg.scaleY);
				var t = .05 + .05 * Math.random(),
					n = cc.scaleTo(.6, this.initScale + t, e + t),
					i = cc.scaleTo(.6, this.initScale, e),
					o = cc.sequence(n, i),
					s = cc.repeatForever(o);
				this.node.runAction(s)
			}
		});
		window.BaseEnemy = n, cc._RF.pop()
	}, {}],
	DataProxy: [function (e, t) {
		"use strict";
		cc._RF.push(t, "77386bmvkhDka4qukRn8Huk", "DataProxy"), e("encryptjs");
		var n = {
			curWeaponTypeKey: "curWeaponTypeKey",
			playerLevel: "playerLevel",
			coinKey: "coinKey",
			wPowerKey1: "wPowerKey1",
			wSpeedKey1: "wSpeedKey1",
			wPowerKey2: "wPowerKey2",
			wSpeedKey2: "wSpeedKey2",
			wPowerKey3: "wPowerKey3",
			wSpeedKey3: "wSpeedKey3",
			wPowerKey4: "wPowerKey4",
			wSpeedKey4: "wSpeedKey4",
			amaKey: "amaKey",
			ppKey: "ppKey",
			init: function () {
				this.refreshPowerInfo(), this.ppamacardval = {
					1: 40,
					2: 20,
					3: 10,
					4: 5,
					5: 5,
					6: 2,
					7: 2,
					8: 2,
					9: 2,
					10: 2,
					11: 1,
					12: 1,
					13: 1,
					14: 1,
					15: 1,
					16: 1,
					17: 1,
					18: 1,
					19: 1,
					20: 1,
					21: 5
				}
			},
			refreshPowerInfo: function () {
				this.planePowerLevel = this.getPlanePowerLevel() || 1, this.planeSpeedLevel = this.getPlaneSpeedLevel() || 1, this.curWeaponType = this.getCurWeaponType() || 1, this.wpowerLevel1 = this.getWPowerLevel(this.wPowerKey1) || 1, this.wpowerLevel2 = this.getWPowerLevel(this.wPowerKey2) || 1, this.wpowerLevel3 = this.getWPowerLevel(this.wPowerKey3) || 1, this.wpowerLevel4 = this.getWPowerLevel(this.wPowerKey4) || 1
			},
			clearAll: function () {
				cc.sys.localStorage.clear()
			},
			setCurWeaponType: function (e) {
				this.curWeaponType = e, this.save(this.curWeaponTypeKey, e)
			},
			getCurWeaponType: function () {
				return this.get(this.curWeaponTypeKey)
			},
			savePlanePowerLevel: function (e) {
				this.save("planepowerLevel", e)
			},
			getPlanePowerLevel: function () {
				return this.get("planepowerLevel") || 1
			},
			savePlaneSpeedLevel: function (e) {
				this.save("planespeedLevel", e)
			},
			getPlaneSpeedLevel: function () {
				return this.get("planespeedLevel") || 1
			},
			saveLevel: function (e) {
				this.save(this.playerLevel, e)
			},
			getLevel: function () {
				return this.get(this.playerLevel) || 1
			},
			getCurPlanePower: function () {
				return this.getPlanePower(this.planePowerLevel)
			},
			getCurPlaneSpeed: function () {
				return this.getPlaneSpeed(this.planeSpeedLevel)
			},
			getPlanePower: function (e) {
				return 2 * e
			},
			getPlaneSpeed: function (e) {
				var t = 22 + .1 * e;
				return t > 35 && (t = 35), t
			},
			saveWPowerLevel: function (e, t) {
				this.save(e, t)
			},
			getWPowerLevel: function (e) {
				return this.get(e) || 1
			},
			saveWSpeedLevel: function (e, t) {
				this.save(e, t)
			},
			getWSpeedLevel: function (e) {
				return this.get(e) || 1
			},
			getWRealPower: function () {
				return 1 == this.curWeaponType ? 1 * this.wpowerLevel1 : 2 == this.curWeaponType ? 4 * this.wpowerLevel2 : 3 == this.curWeaponType ? 5 * this.wpowerLevel3 : 4 == this.curWeaponType ? 10 * this.wpowerLevel4 : void 0
			},
			saveCoins: function (e) {
				var t = this.getCoins();
				this.save(this.coinKey, parseInt(t) + e)
			},
			getCoins: function () {
				return this.get(this.coinKey) || 0
			},
			saveAma: function () {
				var e = this.getCurCarVal("AMA");
				this.addCarTimers("AMA");
				var t = this.getAmaVal();
				this.save(this.amaKey, parseInt(t) + e)
			},
			savePP: function () {
				var e = this.getCurCarVal("PP");
				this.addCarTimers("PP");
				var t = this.getPPVal();
				this.save(this.ppKey, parseInt(t) + e)
			},
			subAma: function (e, t) {
				var n;
				n = "PP" == e ? this.getPPVal() : this.getAmaVal(), this.save(this.ppKey, parseInt(n) - t)
			},
			getCurCarVal: function (e) {
				var t = Number(this.get(e + "CardTimes") || 1),
					n = this.ppamacardval[t];
				return null == n && (n = this.ppamacardval[21]), n
			},
			addCarTimers: function (e) {
				var t = Number(this.get(e + "CardTimes") || 1);
				this.save(e + "CardTimes", t++)
			},
			getAmaVal: function () {
				return this.get(this.amaKey) || 0
			},
			getPPVal: function () {
				return this.get(this.ppKey) || 0
			},
			setEarnCD: function (e, t) {
				this.save("cd" + e + t, Date.now() + 2592e5)
			},
			getEarnCD: function (e, t) {
				return this.get("cd" + e + t) || 0
			},
			setEarnADTimes: function (e, t, n, i) {
				var o = "ad" + e + t,
					s = this.get(o) || 0;
				n ? this.save(o, Number(s) + Number(i)) : this.save(o, i)
			},
			getEarnADTimes: function (e, t) {
				var n = "ad" + e + t;
				return this.get(n) || 0
			},
			isLevelTipClick: function (e) {
				return this.get("tip" + e)
			},
			saveLevelTip: function (e) {
				this.save("tip" + e, 1)
			},
			save: function (e, t) {
				cc.sys.localStorage.setItem(e, t)
			},
			get: function (e) {
				return cc.sys.localStorage.getItem(e)
			}
		};
		window.DataProxy = n, cc._RF.pop()
	}, {
		encryptjs: "encryptjs"
	}],
	EarnAddrView: [function (e, t) {
		"use strict";
		cc._RF.push(t, "20d43c50TBHgaf1uPERHVOh", "EarnAddrView"), cc.Class({
			extends: cc.Component,
			properties: {
				ppIcon: cc.Node,
				amaIcon: cc.Node,
				lab_val: cc.Label,
				input1: cc.EditBox,
				input2: cc.EditBox
			},
			onLoad: function () {
				console.log("data===========", Utils.panelarg), GmEvent.addListener("watchType", this.onWatchType, this), GmEvent.addListener("vedioError", this.onVedioError, this), this.args = Utils.getPanelArgs("prefab/ui_earn_addr"), this.data = this.args[0], this.mode = this.args[1], this.lab_val.string = "$" + this.data.val, this.ppIcon.active = "PP" == this.mode, this.amaIcon.active = "AMA" == this.mode
			},
			onOk: function () {
				this.input1.string.length > 0 ? this.input1.string == this.input2.string ? (DataProxy.subAma(this.mode, this.data.val), DataProxy.setEarnCD(this.mode, this.data.id), this.onCloseView()) : Utils.alert("\u8bf7\u518d\u6b21\u786e\u8ba4\u4f60\u7684\u901a\u4fe1\u5730\u5740") : Utils.alert("\u8bf7\u586b\u5199\u4f60\u7684\u901a\u4fe1\u5730\u5740")
			},
			onWatchType: function () { },
			onVedioError: function () { },
			onCloseView: function () {
				this.node.destroy()
			}
		}), cc._RF.pop()
	}, {}],
	EarnItem: [function (e, t) {
		"use strict";
		cc._RF.push(t, "d76b0jjj+JIfJghRCZiAnoL", "EarnItem"), cc.Class({
			extends: cc.Component,
			properties: {
				d1: cc.Node,
				d2: cc.Node,
				ppIcon: cc.Node,
				amaIcon: cc.Node,
				ppIconLong: cc.Node,
				amaIconLong: cc.Node,
				succDesc: cc.Label,
				adingnode: cc.Node,
				succnode: cc.Node,
				lab_cardnum: cc.Label,
				pb: cc.ProgressBar,
				lab_cardnumtype: cc.Label,
				lab_cardnumtype_succ: cc.Label,
				lab_time: cc.Label,
				lab_adtimes: cc.Label,
				pb_adtimes: cc.ProgressBar
			},
			init: function (e, t, n, i) {
				this.data = e, this.mode = t, this.idx = 0, this.onClickHandler = n, this.onClickADHandler = i, this.lab_cardnumtype.string = "$" + e.val, this.lab_cardnumtype_succ.string = "$" + e.val, this.ppIcon.active = "PP" == t, this.amaIcon.active = "AMA" == t, this.amaIconLong.active = "AMA" == t, this.ppIconLong.active = "PP" == t;
				var o = DataProxy.getEarnADTimes(this.mode, this.data.id);
				this.adingnode.active = o < 100, this.succnode.active = o >= 100, this.lab_adtimes.string = o + "/100", this.pb_adtimes.progress = o / 100, this.succDesc.string = "PP" == this.mode ? "The Paypal Gift Card are processing" : "The amazon Gift Card are processing", "AMA" == t ? (this.lab_cardnum.string = DataProxy.getAmaVal() + "/" + e.val, this.pb.progress = Math.floor(DataProxy.getAmaVal() / e.val * 10) / 10) : (this.lab_cardnum.string = DataProxy.getPPVal() + "/" + e.val, this.pb.progress = Math.floor(DataProxy.getPPVal() / e.val * 10) / 10), this.update(), this.idx = 60
			},
			update: function () {
				if (this.idx++, this.idx >= 60) {
					this.idx = 0;
					var e = Date.now() - DataProxy.getEarnCD(this.mode, this.data.id);
					if (this.d1.active = e > 0, this.d2.active = e <= 0, e > 0) DataProxy.getEarnADTimes(this.mode, this.data.id) > 0 && DataProxy.setEarnADTimes(this.mode, this.data.id, !1, 0);
					else {
						var t = Math.abs(e) / 1e3,
							n = Math.floor(t / 3600),
							i = Math.floor(t % 3600 / 60),
							o = Math.floor(t % 3600 % 60);
						this.lab_time.string = n + ":" + i + ":" + o
					}
				}
			},
			onclick: function () {
				"AMA" == this.mode && DataProxy.getAmaVal() < this.data.val ? Utils.alert("not enough money") : "PP" == this.mode && DataProxy.getPPVal() < this.data.val ? Utils.alert("not enough money") : (console.log("onClickHandler", this.onClickHandler), this.onClickHandler && this.onClickHandler[1].apply(this.onClickHandler[0], [this.data, this.mode]))
			},
			onclickAD: function () {
				this.onClickADHandler && this.onClickADHandler[1].apply(this.onClickADHandler[0], [this.data, this.mode])
			}
		}), cc._RF.pop()
	}, {}],
	EarnView: [function (e, t) {
		"use strict";
		cc._RF.push(t, "bf699OpTfRJ07muLzch8kGG", "EarnView"), cc.Class({
			extends: cc.Component,
			properties: {
				itemPrefab: cc.Prefab,
				list_content: cc.Node
			},
			onLoad: function () {
				GmEvent.addListener("watchType", this.onWatchType, this), GmEvent.addListener("vedioError", this.onVedioError, this), this.onModeAma()
			},
			onModeAma: function () {
				this.mode = "AMA", this.onRfList()
			},
			onModePP: function () {
				this.mode = "PP", this.onRfList()
			},
			onDestroy: function () {
				GmEvent.removeListener("watchType", this.onWatchType, this), GmEvent.removeListener("vedioError", this.onVedioError, this)
			},
			onRfList: function () {
				var e = this,
					t = [{
						id: 1,
						val: 100,
						exchangeing: !1,
						amamax: 10,
						ppmax: 10
					}, {
						id: 2,
						val: 200,
						exchangeing: !1,
						amamax: 10,
						ppmax: 10
					}, {
						id: 3,
						val: 300,
						exchangeing: !1,
						amamax: 10,
						ppmax: 10
					}, {
						id: 4,
						val: 400,
						exchangeing: !1,
						amamax: 10,
						ppmax: 10
					}, {
						id: 5,
						val: 500,
						exchangeing: !1,
						amamax: 10,
						ppmax: 10
					}];
				this.list_content.removeAllChildren();
				for (var n = this, i = function (i) {
					var o = t[i];
					console.log("ddd", e.list_content), cc.loader.loadRes("prefab/eitem", function (e, t) {
						var i = cc.instantiate(t);
						i.getComponent("EarnItem").init(o, n.mode, [n, n.onClickHandler], [n, n.onClickADHandler]), console.log("newNode", i), n.list_content.addChild(i)
					})
				}, o = 0; o < t.length; o++) i(o)
			},
			onClickHandler: function (e, t) {
				console.log("===", e, t), Utils.showPanel("prefab/ui_earn_addr", [e, t])
			},
			onClickADHandler: function (e, t) {
				this.adtype = "watch", this.adargs = {
					mode: t,
					id: e.id
				}, cc.AdNode.showVedio(1, t)
			},
			onWatchType: function (e, t) {
				t ? this.onRfList() : ("watch" == this.adtype && DataProxy.setEarnADTimes(this.adargs.mode, this.adargs.id, !0, 1), this.onRfList())
			},
			onVedioError: function () { },
			onCloseView: function () {
				this.node.destroy()
			}
		}), cc._RF.pop()
	}, {}],
	EnemyGenerorBase: [function (e, t) {
		"use strict";
		cc._RF.push(t, "fdaa1FqnGhCFL2xCM9knpyE", "EnemyGenerorBase");
		var n = cc.Class({
			extends: cc.Component,
			properties: {},
			start: function () {
				this.propNum = 0, this.hasBoss = !1, this.enemyNum = 0, this.enemyNumLeft = 0, this.isGeneralProp = !1, this.isArrive = !1, this.coinUI = cc.find("Canvas/gameui/coin");
				var e = this.coinUI.getPosition(),
					t = 55;
				this.limitPropNum = Math.ceil(5 * Math.random()), null != Utils.getSystemInfo() && "iPhone X" == Utils.getSystemInfo().model && (t = 200), this.coinPos = cc.v2(e.x, e.y + t), GmEvent.addListener("OnGetProp", this.onGetProp, this)
			},
			initwzobj: function (e, t) {
				var n = Math.min(Number(t) + 1, 10);
				console.log("wz_num======", t, n, e.length);
				var i = [],
					o = {};
				if (!native.showEarn) return o;
				for (; i.length < n;) {
					var s = Math.floor(Math.random() * e.length); - 1 == i.indexOf(s) && (i.push(s), 100 * Math.random() > 50 ? o[s] = {
						type: "PP"
					} : o[s] = {
						type: "AMA"
					})
				}
				return o
			},
			onDeleteEnemy: function (e) {
				this.deleteArrEnemy(this.enemys, e), null != this.moveEnemys && this.deleteArrEnemy(this.moveEnemys, e);
				var t = cc.v2(e.pos.x + 30 * l * c, e.pos.y + 30 * l * c);
				if (e.wzdata && GmEvent.dispatcher("OnShowWzView", e.wzdata), this.enemyNumLeft--, this.isCanGeneralProp() && Math.random() > .7 && this.propNum < this.limitPropNum && !this.isGeneralProp) {
					var n = cc.winSize.width / 2,
						i = -(n - 100) + Math.random() * (2 * n - 100),
						o = cc.winSize.height / 2 + 100,
						s = cc.v2(i, o);
					this.generalProp(s)
				}
				if (Math.random() > .5)
					for (var r = Math.ceil(5 * Math.random()), a = Math.ceil(this.coinNums / r), h = 0; h < r; h++) {
						var c = Math.random(),
							l = c > .5 ? 1 : -1;
						EnemyUtil.levelCoin + a <= PlaneLevelData.getCurLevelCoin(EnemyUtil.curLevel) && (EnemyUtil.levelCoin += a, EnemyUtil.generalCoin(this.node, t, this.coinPos, a))
					}
				this.isGame ? this.checkOver() : this.lastCheckOver = !0
			},
			checkOver: function () {
				this.lastCheckOver = !1, this.enemys.length <= 0 && this.moveEnemys.length <= 0 ? this.hasBoss ? (console.log("w1"), Utils.showWarn(EnemyKindGeneror.getBossName(this.dataObj)), this.hasBoss = !1, this.waittingBoss = !0, GmEvent.dispatcher("CanShoot", !1), this.scheduleOnce(function () {
					this.waittingBoss = !1, this.clearListener(), console.log("EnemyUtil.currentBossType", EnemyUtil.currentBossType), this.node.addComponent(EnemyUtil.currentBossType).init(this.dataObj), this.node.removeComponent(EnemyUtil.currentEnemyType)
				}.bind(this), 3)) : this.waittingBoss || this.showGameOver() : console.log("----", this.isGame)
			},
			onGetProp: function () {
				this.scheduleOnce(function () {
					this.isGeneralProp = !1
				}.bind(this), 2)
			},
			isCanGeneralProp: function () {
				if (null != this.dataObj) {
					var e = Math.floor(this.dataObj.values / 2);
					if (null != this.enemys && null != this.moveEnemys) {
						if (this.enemys.length + this.moveEnemys.length > e) return !0
					} else if (null != this.moveEnemys) {
						if (this.moveEnemys.length > e / 2) return !0
					} else if (null != this.enemys && this.enemys.length > e) return !0
				}
				return !1
			},
			generalProp: function (e) {
				this.isGeneralProp = !0;
				var t = GNodePool.getprop();
				t.getComponent("Prop").init(e), t.setPosition(e), t.parent = this.node, t.zIndex = 2e3, this.props.push(t), this.propNum++
			},
			deleteArrEnemy: function (e, t) {
				if (e.length > 0)
					for (var n = 0; n < e.length; n++)
						if (t.id == e[n]._id) {
							if (e.splice(n, 1), 0 == t.rt || null == t.rt || -1 == t.rt);
							else {
								var i = Math.PI * Math.random();
								this.splitEnemy(t, i), this.splitEnemy(t, i + Math.PI)
							}
							break
						}
			},
			splitEnemy: function (e, t) {
				if (this.isGame) {
					var n = {};
					n.type = e.type, n.scale = e.initScale, n.speedlength = 1.1 * e.speedlength, null != t ? (n.angle = t, n.life = Math.ceil(e.life / 2)) : n.life = e.life, n.rt = 0, n.pos = e.pos;
					var i = this.getEnemy(n);
					i.getComponent("SteeredVehicle").canBonusUp = !0, null != i.parent && (i.zIndex = i.parent.childrenCount - 1), this.moveEnemys.push(i)
				}
			},
			clearArrEnemys: function (e) {
				if (null != e) {
					for (var t = 0; t < e.length; t++) e[t].getComponent("Enemy").recycle(), GNodePool.putenemy(e[t]);
					e.splice(0, e.length)
				}
			},
			getEnemy: function (e, t, n) {
				var i = GNodePool.getenemy();
				i.parent = this.node, i.zIndex = t;
				var o = .4 + .2 * Math.random(),
					s = null != e.angle ? e.angle : -Math.PI * o,
					r = (Math.random() > .5 ? 1 : -1) * Math.random() * cc.winSize.width / 2,
					a = cc.winSize.height / 2 + 300;
				null != e.pos && (r = e.pos.x, a = e.pos.y);
				var h = e.speedlength,
					c = {};
				return c.level = this.level, c.type = e.type, c.initPos = e.initPos || null, c.hpbase = this.hpbase, c.scale = e.scale, c.isRotate = e.isRotate, c.isBottomRotate = e.isBottomRotate, c.ishitSlow = e.ishitSlow, c.turn = e.turn, c.rotateSpeed = e.rotateSpeed, c.life = e.life, c.color = e.color, c.rt = e.rt, c.reviveNum = e.reviveNum, c.isHead = e.isHead, c.showTxt = e.showTxt, c.scaleX = e.scaleX, c.scaleY = e.scaleY, c.angle = e.angle, c.wzdata = n, n && (c.life = 1), i.getComponent("Enemy").init(c), i.setPosition(r, a), i.getComponent("SteeredVehicle").initData(r, a, h, s), i
			},
			pause: function () {
				this.stopAllEnemys(), this.isGame = !1, null != this.enemys && this.stopEnemyMove(this.enemys), null != this.moveEnemys && this.stopEnemyMove(this.moveEnemys)
			},
			resume: function () {
				this.resumeAllEnemys(), this.isGame = !0, null != this.enemys && this.resumeEnemyMove(this.enemys), null != this.moveEnemys && this.resumeEnemyMove(this.moveEnemys), this.lastCheckOver && this.checkOver()
			},
			stopAllEnemys: function () {
				null != this.enemys && this.stopArrEnemys(this.enemys), null != this.moveEnemys && this.stopArrEnemys(this.moveEnemys)
			},
			stopArrEnemys: function (e) {
				if (e.length > 0)
					for (var t = 0; t < e.length; t++) e[t].getComponent("SteeredVehicle").pause()
			},
			resumeAllEnemys: function () {
				this.isArrive || this.enemys && this.resumeArrEnemys(this.enemys), this.moveEnemys && this.resumeArrEnemys(this.moveEnemys)
			},
			resumeEnemys: function () {
				this.enemys && this.resumeArrEnemys(this.enemys)
			},
			resumeArrEnemys: function (e) {
				if (e.length > 0)
					for (var t = 0; t < e.length; t++) e[t].getComponent("SteeredVehicle").resume()
			},
			stopEnemyMove: function (e) {
				if (e.length > 0)
					for (var t = 0; t < e.length; t++) e[t].getComponent("Enemy").pause()
			},
			resumeEnemyMove: function (e) {
				if (e.length > 0)
					for (var t = 0; t < e.length; t++) e[t].getComponent("Enemy").resume()
			},
			showGameOver: function () {
				this.isGame = !1, this.enemyNum = 0, this.enemyNumLeft = 0, this.clearListener();
				for (var e = 0; e < this.props.length; e++) GNodePool.putprop(this.props[e]);
				this.props.splice(0, this.props.length), GmEvent.removeListener("OnGetProp", this.onGetProp, this), GmEvent.dispatcher("GameOver", !0)
			},
			onGameOver: function () {
				this.isArrive = !1, this.clearListener(), this.clearArrEnemys(this.enemys), null != this.moveEnemys && this.clearArrEnemys(this.moveEnemys);
				for (var e = 0; e < this.props.length; e++) GNodePool.putprop(this.props[e]);
				this.props.splice(0, this.props.length), GmEvent.removeListener("OnGetProp", this.onGetProp, this)
			}
		});
		window.EnemyGenerorBase = n, cc._RF.pop()
	}, {}],
	EnemyGenerorType1: [function (e, t) {
		"use strict";
		cc._RF.push(t, "186b7lFEEpI3pOdGAzdkSi4", "EnemyGenerorType1"), cc.Class({
			extends: EnemyGenerorBase,
			properties: {},
			init: function (e) {
				this.bt = e.bt, EnemyUtil.currentBossType = EnemyUtil.getBossName(this.bt), EnemyUtil.curLevel = DataProxy.getLevel(), EnemyUtil.levelCoin = 0, 0 != this.bt ? this.hasBoss = !0 : this.hasBoss = !1, this.dataObj = e, this.interval = e.interval || 1.5, this.isGame = !0, this.isArrive = !1, this.hpbase = e.hpbase, this.level = e.level, this.speedlength = e.speed, this.enemys = [], this.moveEnemys = [], this.props = [], GmEvent.addListener("DeleteEnemy", this.onDeleteEnemy, this);
				var t = EnemyKindGeneror.createType1(e);
				this.enemyNum = t.length, this.enemyNumLeft = t.length, this.coinNums = PlaneLevelData.coinNumPerEnemy(t.length * (1 + e.rt));
				for (var n = this.initwzobj(t, e.level), i = 0; i < t.length; i++) {
					var o = this.getEnemy(t[i], i, n[i]);
					o.getComponent("SteeredVehicle").setInitRushSpeed(), this.enemys.push(o)
				}
				this.dataObj.values = 20, this.schedule(this.stopMove, .016)
			},
			stopMove: function () {
				if (this.enemys[0].y <= 200) {
					for (var e = 0; e < this.enemys.length; e++) this.enemys[e].getComponent("SteeredVehicle").resetSpeed();
					this.isArrive = !0, this.unschedule(this.stopMove), GmEvent.dispatcher("EanbleWeapon"), this.stopAllEnemys(), this.schedule(this.targetPlane, this.interval)
				}
			},
			targetPlane: function () {
				this.isGame && (Math.random() > .3 ? this.generalSingle() : (this.generalSingle(), this.scheduleOnce(function () {
					this.generalSingle()
				}.bind(this), .2)))
			},
			generalSingle: function () {
				if (this.enemys.length > 0) {
					var e = Math.floor(Math.random() * this.enemys.length),
						t = this.enemys[e];
					if (null != t && t.isValid && this.isGame) {
						this.moveEnemys.push(t), this.enemys.splice(e, 1), this.plane = cc.find("Canvas/fightNode/plane1");
						var n = this.plane.getPosition(),
							i = new Vector2D(n.x, n.y);
						t.getComponent("SteeredVehicle").canBonusUp = !0, t.getComponent("Enemy").seek(i, this.speedlength * Utils.countRange()), null != t.parent && (t.zIndex = t.parent.childrenCount + 1)
					}
					this.interval += .4 * Math.random() - .2
				}
			},
			clearListener: function () {
				this.unschedule(this.targetPlane), GmEvent.removeListener("DeleteEnemy", this.onDeleteEnemy, this)
			},
			onDestroy: function () {
				this.clearListener()
			}
		}), cc._RF.pop()
	}, {}],
	EnemyGenerorType2: [function (e, t) {
		"use strict";
		cc._RF.push(t, "91ec1uW5DNO4oXORuTFWLFu", "EnemyGenerorType2"), cc.Class({
			extends: EnemyGenerorBase,
			properties: {},
			init: function (e) {
				this.dataObj = e, this.bt = e.bt, EnemyUtil.currentBossType = EnemyUtil.getBossName(this.bt), EnemyUtil.curLevel = DataProxy.getLevel(), EnemyUtil.levelCoin = 0, 0 != this.bt ? this.hasBoss = !0 : this.hasBoss = !1, this.isGame = !0, this.hpbase = e.hpbase, this.interval = e.interval || 1.5, this.enemys = [], this.moveEnemys = [], this.speedlength = e.speed, this.props = [], this.pathArr = [], this.generalPath(), GmEvent.addListener("DeleteEnemy", this.onDeleteEnemy, this);
				var t = EnemyKindGeneror.createTypeSnake(e);
				this.enemyNum = t.length, this.enemyNumLeft = t.length;
				var n = this.initwzobj(t, e.level);
				this.coinNums = PlaneLevelData.coinNumPerEnemy(t.length * (1 + e.rt));
				for (var i = 0; i < t.length; i++) {
					var o = this.getEnemy(t[i], i, n[i]);
					o.getComponent("SteeredVehicle").canBonusUp = !0, this.enemys.push(o)
				}
				this.originColor = this.enemys[0].getComponent("Enemy").body.color, this.schedule(this.stopMove, 1)
			},
			stopMove: function () {
				this.unschedule(this.stopMove), this.schedule(this.generalPath, 5.5), this.schedule(this.shootEnemy, this.interval), GmEvent.dispatcher("EanbleWeapon")
			},
			targetTo: function () {
				if (null != this.enemys && this.enemys.length > 0 && this.pathArr.length > 0)
					for (var e = 0; e < this.enemys.length; e++) {
						this.enemys[e].getComponent("SteeredVehicle").setSpeed(this.speedlength - .3 * e);
						var t = this.pathArr[this.pathArr.length - 1];
						this.pathArr[this.pathArr.length - 1] = new Vector2D(t.x, t.y), this.enemys[e].getComponent("SteeredVehicle").followPath(this.pathArr, !1)
					}
			},
			isMoveEnemyNotFull: function () {
				return null != this.moveEnemys && null != this.enemys && this.moveEnemys.length + this.enemys.length <= this.dataObj.maxNum
			},
			shootEnemy: function () {
				if (this.isGame && !(this.enemys.length <= 0) && this.isMoveEnemyNotFull()) {
					var e = Math.floor(Math.random() * this.enemys.length),
						t = this.enemys[e],
						n = t.getComponent("Enemy").body,
						i = cc.tintTo(.8, 253, 0, 103),
						o = cc.scaleTo(.5, 1.2),
						s = cc.scaleTo(.5, 1),
						r = cc.spawn(i, o),
						a = cc.callFunc(function () {
							if (this.isGame && this.enemys.length > 0 && null != t && t.isValid && null != this.enemys[e]) {
								MusicManger.shootlaser(), n.color = this.originColor;
								var i = {};
								i.type = Math.floor(5 * Math.random()), i.scale = t.getComponent("Enemy").enemyArg.initScale;
								var o = 2 + Math.floor(4 * Math.random());
								i.life = t.getComponent("Enemy").enemyArg.life / o, i.speedlength = this.speedlength * Utils.countRange(), i.pos = this.enemys[e].getPosition();
								var s = this.getEnemy(i);
								this.plane = cc.find("Canvas/fightNode/plane1");
								var r = this.plane.getPosition(),
									a = new Vector2D(r.x, r.y);
								s.getComponent("SteeredVehicle").canBonusUp = !0, s.getComponent("SteeredVehicle").seek(a), this.moveEnemys.push(s)
							}
						}.bind(this)),
						h = cc.sequence(r, a, s);
					n.runAction(h)
				}
			},
			generalPath: function () {
				for (var e = 0; e < this.enemys.length; e++) this.enemys[e].getComponent("SteeredVehicle").pathIndex = 0;
				for (this.pathArr.splice(0, this.pathArr.length), e = 0; e < 5; e++) this.pathArr.push(this.generalTarget())
			},
			moveToPath: function () { },
			generalTarget: function () {
				var e = (Math.random() > .5 ? 1 : -1) * Math.random() * (cc.winSize.width / 2 - 100),
					t = -cc.winSize.height / 2 + 100 + Math.random() * cc.winSize.height;
				return new Vector2D(e, t)
			},
			update: function () {
				this.targetTo()
			},
			clearListener: function () {
				this.unschedule(this.generalTarget), this.unschedule(this.shootEnemy), GmEvent.removeListener("DeleteEnemy", this.onDeleteEnemy, this)
			},
			onDestroy: function () {
				this.clearListener()
			}
		}), cc._RF.pop()
	}, {}],
	EnemyGenerorType3: [function (e, t) {
		"use strict";
		cc._RF.push(t, "e1014UZTEZKC6IOMFiKvOfZ", "EnemyGenerorType3"), cc.Class({
			extends: EnemyGenerorBase,
			properties: {},
			init: function (e) {
				this.dataObj = e, this.bt = e.bt, EnemyUtil.currentBossType = EnemyUtil.getBossName(this.bt), EnemyUtil.curLevel = DataProxy.getLevel(), EnemyUtil.levelCoin = 0, 0 != this.bt ? this.hasBoss = !0 : this.hasBoss = !1, this.isGame = !0, this.maxNum = e.maxNum, this.enemys = [], this.moveEnemys = [], this.props = [], this.dataArr = EnemyKindGeneror.createNormal(e), this.enemyNum = this.dataArr.length, this.enemyNumLeft = this.dataArr.length, this.limitPropNum = Math.ceil(3 * Math.random());
				var t = e.interval || 1;
				this.schedule(this.generalEnemey, t), GmEvent.addListener("DeleteEnemy", this.onDeleteEnemy, this), GmEvent.dispatcher("EanbleWeapon"), this.coinNums = PlaneLevelData.coinNumPerEnemy(this.dataArr.length * (1 + e.rt)), this.coinUI = cc.find("Canvas/gameui/coin");
				var n = this.coinUI.getPosition(),
					i = 55;
				null != Utils.getSystemInfo() && "iPhone X" == Utils.getSystemInfo().model && (i = 200), this.coinPos = cc.v2(n.x, n.y + i)
			},
			generalEnemey: function () {
				var e = 1;
				Math.random() > .85 && (e = 2);
				for (var t = 0; t < e; t++)
					if (this.isGame && this.dataArr.length > 0 && this.enemys.length + this.moveEnemys.length < this.maxNum) {
						var n = this.dataArr.shift();
						n.speedlength = n.speedlength * Utils.countRange2(), this.enemys.push(this.getEnemy(n))
					}
			},
			isCanGeneralProp: function () {
				return null != this.dataObj && this.enemyNum <= this.dataObj.values / 2
			},
			onDeleteEnemy: function (e) {
				if (this.deleteArrEnemy(this.enemys, e), this.enemyNum--, null != this.moveEnemys && this.deleteArrEnemy(this.moveEnemys, e), this.isCanGeneralProp() && Math.random() > .85 && this.propNum < this.limitPropNum && !this.isGeneralProp) {
					var t = cc.winSize.width / 2,
						n = -(t - 100) + Math.random() * (2 * t - 100),
						i = cc.winSize.height / 2 + 100,
						o = cc.v2(n, i);
					this.generalProp(o)
				}
				if (Math.random() > .66)
					for (var s = Math.ceil(5 * Math.random()), r = Math.ceil(this.coinNums / s), a = 0; a < s; a++) {
						var h = Math.random(),
							c = h > .5 ? 1 : -1,
							l = cc.v2(e.pos.x + 30 * c * h, e.pos.y + 30 * c * h);
						EnemyUtil.levelCoin + r <= PlaneLevelData.getCurLevelCoin(EnemyUtil.curLevel) && (EnemyUtil.levelCoin += r, EnemyUtil.generalCoin(this.node, l, this.coinPos, r))
					}
				this.enemys.length <= 0 && this.moveEnemys.length <= 0 && this.enemyNum <= 0 && this.isGame && (this.hasBoss ? (console.log("w3"), Utils.showWarn(EnemyKindGeneror.getBossName(this.dataObj)), this.hasBoss = !1, GmEvent.dispatcher("CanShoot", !1), this.waittingBoss = !0, this.scheduleOnce(function () {
					this.waittingBoss = !1, this.clearListener(), this.node.addComponent(EnemyUtil.currentBossType).init(this.dataObj), this.node.removeComponent(EnemyUtil.currentEnemyType)
				}.bind(this), 3)) : this.waittingBoss || this.showGameOver())
			},
			clearListener: function () {
				this.unschedule(this.generalEnemey), GmEvent.removeListener("DeleteEnemy", this.onDeleteEnemy, this)
			},
			onDestroy: function () {
				this.clearListener()
			}
		}), cc._RF.pop()
	}, {}],
	EnemyGenerorType4: [function (e, t) {
		"use strict";
		cc._RF.push(t, "694e4xYpZNOHogxvThFw4SX", "EnemyGenerorType4"), cc.Class({
			extends: EnemyGenerorBase,
			properties: {},
			init: function (e) {
				this.dataObj = e, this.bt = e.bt, EnemyUtil.currentBossType = EnemyUtil.getBossName(this.bt), EnemyUtil.curLevel = DataProxy.getLevel(), EnemyUtil.levelCoin = 0, 0 != this.bt ? this.hasBoss = !0 : this.hasBoss = !1, this.isArrive = !1, this.isGame = !0, this.hpbase = e.hpbase, this.interval = e.interval || 1.5, this.speedlength = e.speed, this.enemys = [], this.moveEnemys = [], this.props = [], GmEvent.addListener("DeleteEnemy", this.onDeleteEnemy, this);
				var t = EnemyKindGeneror.createTypeNest(e);
				this.enemyNum = t.length, this.enemyNumLeft = t.length, this.coinNums = PlaneLevelData.coinNumPerEnemy(t.length * (1 + e.rt));
				for (var n = this.initwzobj(t, e.level), i = 0; i < t.length; i++) {
					var o = this.getEnemy(t[i], i, n[i]);
					o.getComponent("SteeredVehicle").setInitRushSpeed(), this.enemys.push(o)
				}
				this.target = new Vector2D(0, 180), this.schedule(this.stopMove, .016)
			},
			stopMove: function () {
				if (null != this.enemys && this.enemys[0].y <= 500) {
					for (var e = 0; e < this.enemys.length; e++) this.enemys[e].getComponent("SteeredVehicle").resetSpeed();
					this.isArrive = !0, this.unschedule(this.stopMove), GmEvent.dispatcher("EanbleWeapon"), this.stopAllEnemys(), this.schedule(this.preShootEnemy, this.interval)
				}
			},
			preShootEnemy: function () {
				this.shootEnemy(), Math.random() > .7 && this.scheduleOnce(this.shootEnemy, .3)
			},
			shootEnemy: function () {
				if (this.isGame && !(this.enemys.length <= 0)) {
					var e = Math.floor(Math.random() * this.enemys.length),
						t = this.enemys[e],
						n = t.getComponent("Enemy").body,
						i = cc.tintTo(.8, 253, 0, 103),
						o = cc.scaleTo(.5, 1.1),
						s = cc.scaleTo(.5, 1),
						r = cc.spawn(i, o),
						a = cc.callFunc(function () {
							if (this.isGame && this.enemys.length > 0 && null != t && t.isValid) {
								MusicManger.shootlaser(), n.color = t.getComponent("Enemy").initColor;
								var e = {};
								e.type = Math.floor(5 * Math.random()), e.speedlength = this.speedlength * Utils.countRange();
								var i = 2 + Math.floor(4 * Math.random());
								e.life = Math.ceil(t.getComponent("Enemy").enemyArg.life / i), e.scale = t.getComponent("Enemy").enemyArg.initScale || .55, e.pos = t.getPosition(), e.rt = 0;
								var o = this.getEnemy(e, 1e3);
								this.plane = cc.find("Canvas/fightNode/plane1");
								var s = this.plane.getPosition(),
									r = new Vector2D(s.x, s.y);
								o.getComponent("SteeredVehicle").seek(r), o.getComponent("SteeredVehicle").canBonusUp = !0, this.moveEnemys.push(o)
							}
						}.bind(this)),
						h = cc.sequence(r, a, s);
					n.runAction(h)
				}
			},
			clearListener: function () {
				this.unschedule(this.preShootEnemy), GmEvent.removeListener("DeleteEnemy", this.onDeleteEnemy, this)
			},
			onDestroy: function () {
				this.clearListener()
			}
		}), cc._RF.pop()
	}, {}],
	EnemyGenerorTypeBoss3: [function (e, t) {
		"use strict";
		cc._RF.push(t, "08b50oDqUJIRKx8g1hjTbqr", "EnemyGenerorTypeBoss3"), cc.Class({
			extends: EnemyGenerorBase,
			properties: {},
			init: function (e) {
				this.dataObj = e, this.shootType = e.bs, EnemyUtil.curLevel = DataProxy.getLevel(), this.target = null, this.isGame = !0, this.enemys = [], this.moveEnemys = [], this.props = [], this.isHeadDead = !1, this.isGeneralProp = !1, this.isArrive = !1, this.coinUI = cc.find("Canvas/gameui/coin");
				var t = this.coinUI.getPosition();
				this.coinPos = cc.v2(t.x, t.y + 55), this.limitPropNum = Math.ceil(3 * Math.random()), this.interval = .2, this.interval2 = 3 + 3 * Math.random(), this.shooting = !1, this.speedlength = e.bossSpeed, this.shootNum = 0, GmEvent.addListener("DeleteEnemy", this.onDeleteEnemy, this);
				var n = EnemyKindGeneror.createBoss(e);
				this.enemyNumLeft = n.length, this.coinNums = PlaneLevelData.coinNumPerEnemy(n.length * (1 + e.rt));
				for (var i = [], o = 0; o < n.length; o++) this.enemys.push(this.getEnemy(n[o], o, i[o]));
				this.initEnemyPos = this.enemys[0].getComponent("Enemy").enemyArg.initPos, this.schedule(this.stopMove, .016)
			},
			stopMove: function () {
				null != this.enemys[0] && this.isGame && this.enemys[0].y <= 300 && (this.isArrive = !0, this.unschedule(this.stopMove), this.stopAllEnemys(), this.shooting = !0, GmEvent.dispatcher("CanShoot", !0), this.scheduleOnce(function () {
					this.isArrive = !1, this.resumeEnemys()
				}.bind(this), 1.5), this.schedule(this.preShoot, this.interval), this.schedule(this.generalTarget, this.interval2))
			},
			onDeleteEnemy: function (e) {
				if (this.deleteArrEnemy(this.enemys, e), null != this.moveEnemys && this.deleteArrEnemy(this.moveEnemys, e), e.isHead) {
					this.isHeadDead = !0, this.unschedule(this.preShoot), this.unschedule(this.generalTarget);
					for (var t = 0; t < this.enemys.length; t++) this.enemys[t].getComponent("SteeredVehicle").rushRandom()
				}
				if (this.enemyNumLeft--, this.isCanGeneralProp() && Math.random() > .8 && this.propNum < this.limitPropNum && !this.isGeneralProp) {
					var n = cc.winSize.width / 2,
						i = -(n - 100) + Math.random() * (2 * n - 100),
						o = cc.winSize.height / 2 + 100,
						s = cc.v2(i, o);
					this.generalProp(s)
				}
				if (Math.random() > .9) {
					var r = Math.ceil(5 * Math.random()),
						a = Math.ceil(this.coinNums / r);
					for (t = 0; t < r; t++) {
						var h = Math.random(),
							c = h > .5 ? 1 : -1,
							l = cc.v2(e.pos.x + 30 * c * h, e.pos.y + 30 * c * h);
						EnemyUtil.levelCoin += a, EnemyUtil.generalCoin(this.node, l, this.coinPos, a)
					}
				}
				this.enemys.length <= 0 && this.moveEnemys.length <= 0 && this.isGame && (this.hasBoss ? (console.log("w3b"), Utils.showWarn(EnemyKindGeneror.getBossName(this.dataObj)), this.hasBoss = !1, this.waittingBoss = !0, this.scheduleOnce(function () {
					this.waittingBoss = !1, this.clearListener(), this.node.addComponent(EnemyUtil.currentBossType), this.node.removeComponent(EnemyUtil.currentEnemyType)
				}.bind(this), 3)) : this.waittingBoss || this.showGameOver())
			},
			generalTarget: function () {
				var e = (Math.random() > .5 ? 1 : -1) * Math.random() * (cc.winSize.width / 2 - 100),
					t = Math.random() * (cc.winSize.height / 2 - 350) + 150;
				this.target = new Vector2D(e, t), this.shootNum = 0
			},
			isMoveEnemyNotFull: function () {
				return null != this.moveEnemys && this.moveEnemys.length <= this.dataObj.maxNum
			},
			shootType1: function (e) {
				this.shootNum <= 3 ? this.isMoveEnemyNotFull() && (this.shootEnemy(e), this.shootNum++) : this.shooting = !1
			},
			shootType3: function (e) {
				var t = Utils.countRange();
				if (this.shootNum < 8) {
					for (var n = 0; n < 8; n++)
						if (this.isMoveEnemyNotFull()) {
							var i = {};
							i.type = e.getComponent("Enemy").enemyArg.type, i.scale = .55, i.speedlength = this.speedlength * t, i.pos = e.getPosition(), i.angle = n * Math.PI / 4, i.life = e.getComponent("Enemy").enemyArg.life / this.lifeRange();
							var o = this.getEnemy(i, 1e3);
							o.getComponent("SteeredVehicle").canBonusUp = !0, this.moveEnemys.push(o), this.shootNum++
						}
				} else this.shooting = !1
			},
			shootType2: function (e) {
				if (Math.random(), this.shootNum < 9) {
					for (var t = 0; t < 3; t++)
						if (this.isMoveEnemyNotFull()) {
							var n = {};
							n.type = e.getComponent("Enemy").enemyArg.type, n.scale = .55, n.speedlength = this.speedlength * Utils.countRange(), n.pos = e.getPosition(), n.angle = -Math.PI / 2 * (.5 + .5 * Math.random()), n.life = e.getComponent("Enemy").enemyArg.life / this.lifeRange();
							var i = this.getEnemy(n, 1e3);
							i.getComponent("SteeredVehicle").canBonusUp = !0, this.moveEnemys.push(i), this.shootNum++
						}
				} else this.shooting = !1
			},
			lifeRange: function () {
				var e = 20,
					t = Math.random();
				return t > .8 ? e = 15 + 5 * Math.random() : t > .7 ? e = 10 + 5 * Math.random() : t > .5 && (e = 8 + 5 * Math.random()), e
			},
			preShoot: function () {
				if (this.shooting && this.isGame && this.enemys.length > 0) {
					var e = this.enemys[0];
					if (0 == this.shootType) {
						var t = Math.random();
						t > .66 ? this.shootType1(e) : t > .33 ? this.shootType2(e) : this.shootType3(e)
					} else 1 == this.shootType ? this.shootType1(e) : 2 == this.shootType ? this.shootType2(e) : 3 == this.shootType && this.shootType3(e)
				}
			},
			targetTo: function () {
				if (null != this.target) {
					var e = new Vector2D(this.target.x, this.target.y);
					if (null != this.enemys[0])
						for (var t = function () {
							this.shooting = !0
						}.bind(this), n = 0; n < this.enemys.length; n++)
							if (0 == n) this.enemys[0].getComponent("SteeredVehicle").arrive(e, t);
							else {
								var i = this.enemys[n].getComponent("Enemy").enemyArg.initPos.sub(this.initEnemyPos),
									o = e.add(i);
								this.enemys[n].getComponent("SteeredVehicle").arrive(o, null)
							}
				}
			},
			shootEnemy: function (e) {
				if (this.isGame && !(this.enemys.length <= 0)) {
					var t = e.getComponent("Enemy").body,
						n = cc.scaleTo(.5, 1.2),
						i = cc.scaleTo(.5, 1),
						o = cc.callFunc(function () {
							if (this.isGame && this.enemys.length > 0 && null != e && e.isValid && null != this.enemys[0]) {
								MusicManger.shootlaser();
								var t = {};
								t.type = e.getComponent("Enemy").enemyArg.type, console.log("initScale:", e.getComponent("Enemy").enemyArg.scale), t.scale = .55, t.speedlength = this.speedlength * Utils.countRange(), t.pos = e.getPosition(), t.life = e.getComponent("Enemy").enemyArg.life / this.lifeRange();
								var n = this.getEnemy(t, 1e3);
								this.plane = cc.find("Canvas/fightNode/plane1");
								var i = this.plane.getPosition(),
									o = new Vector2D(i.x, i.y);
								n.getComponent("SteeredVehicle").canBonusUp = !0, n.getComponent("SteeredVehicle").seek(o), this.moveEnemys.push(n)
							}
						}.bind(this)),
						s = cc.sequence(n, o, i);
					t.runAction(s)
				}
			},
			update: function () {
				this.isHeadDead || this.targetTo()
			},
			clearListener: function () {
				this.unschedule(this.preShoot, this.interval), this.unschedule(this.generalTarget, this.interval2), GmEvent.removeListener("DeleteEnemy", this.onDeleteEnemy, this)
			}
		}), cc._RF.pop()
	}, {}],
	EnemyKindGeneror: [function (e, t) {
		"use strict";
		cc._RF.push(t, "048b4K/DDhOrplg56JH/mmF", "EnemyKindGeneror");
		var n = {
			initNestHashMap: function () {
				this.map = new HashMap;
				for (var e = -399, t = 0; t < 7; t++)
					for (var n = 0; n < 13; n++) {
						e = n % 2 == 0 ? -399 : -340;
						var i = cc.v2(e + 115 * t, 1200 - 98 * n);
						this.map.put(t + "," + n, i)
					}
			},
			createType1: function (e) {
				var t, n = [],
					i = Math.random() > .5,
					o = Utils.getRowCol(e.values);
				0 == e.enemyType && (e.enemyType = Math.ceil(5 * Math.random())), t = -1 == e.color ? EnemyUtil.getRandomColor() : EnemyUtil.getColor(e.color), e.hpbase = Math.ceil(e.hpbase * (.8 + .3 * Math.random()));
				for (var s = 0; s < o[0]; s++)
					for (var r = 0; r < o[1]; r++) {
						var a = cc.v2(120 * s - 230, cc.winSize.height / 2 + 100 + 120 * r),
							h = {};
						h.type = e.enemyType, h.pos = a, h.speedlength = e.speed, h.angle = -Math.PI / 2, h.scale = .55, h.isRotate = i, h.isBottomRotate = !0, h.ishitSlow = !1, h.rotateSpeed = 1, h.life = e.hpbase, h.color = t, Math.random() > 1 - e.rt ? h.rt = 1 : h.rt = 0, n.push(h)
					}
				return n
			},
			createTypeSnake: function (e) {
				var t, n = [];
				0 == e.enemyType && (e.enemyType = Math.ceil(5 * Math.random())), t = -1 == e.color ? EnemyUtil.getRandomColor() : EnemyUtil.getColor(e.color);
				for (var i = 0; i < e.values; i++) {
					var o = cc.v2(0, cc.winSize.height / 2 + 200 + 5 * i),
						s = {};
					s.type = e.enemyType, s.pos = o, s.speedlength = e.speed, s.angle = -Math.PI / 2, s.scale = .55, s.isRotate = !1, s.isBottomRotate = !0, s.ishitSlow = !1, s.rotateSpeed = 1, s.life = e.hpbase, s.color = t, Math.random() > 1 - e.rt ? s.rt = 1 : s.rt = 0, n.push(s)
				}
				return n
			},
			createTypeNest: function (e) {
				null == this.map && this.initNestHashMap();
				var t, n = [];
				0 == e.enemyType && (e.enemyType = Math.ceil(5 * Math.random())), t = -1 == e.color ? EnemyUtil.getRandomColor() : EnemyUtil.getColor(e.color), e.hpbase = Math.ceil(e.hpbase * (1 + .2 * Math.random()));
				for (var i = NestTypeData.getTypeNest1(), o = 0; o < i.length; o++) {
					var s = {};
					s.type = e.enemyType, s.pos = this.map.get(i[o][0] + "," + i[o][1]), s.speedlength = e.speed, s.angle = -Math.PI / 2, s.scale = .5, s.isRotate = !1, s.isBottomRotate = !0, s.ishitSlow = !1, s.rotateSpeed = 1, s.life = e.hpbase, Math.random() > 1 - e.rt ? s.rt = 1 : s.rt = 0, s.color = t, n.push(s)
				}
				return n
			},
			createNormal: function (e) {
				for (var t = [], n = 0; n < e.values; n++) {
					var i = (Math.random() > .5 ? 1 : -1) * Math.random() * cc.winSize.width / 2,
						o = cc.winSize.height / 2 + 300,
						s = cc.v2(i, o),
						r = {};
					0 == e.enemyType ? r.type = Math.ceil(5 * Math.random()) : r.type = e.enemyType, r.pos = s;
					var a = (1 - .2 * Math.random()) * e.speed;
					r.speedlength = a, r.angle = -Math.PI / 2 * (.5 + .5 * Math.random()), r.scale = .35 + .5 * Math.random(), r.isRotate = !1, r.isBottomRotate = !0, r.ishitSlow = !1, r.rotateSpeed = 1, r.life = e.hpbase * r.scale;
					var h = Math.random();
					h >= .6 && h < .65 && (r.speedlength *= 1.2, r.life *= 1.2), h >= .8 && (r.life = Math.ceil(r.life / 10), r.speedlength *= 2), r.color = EnemyUtil.getRandomColor(), Math.random() > 1 - e.rt ? r.rt = 1 : r.rt = 0, t.push(r)
				}
				return t
			},
			createType2: function (e, t) {
				for (var n = [], i = 0; i < e; i++)
					for (var o = 0; o < t; o++) {
						var s = cc.v2(120 * i - 300, cc.winSize.height / 2 + 100 + 120 * o),
							r = {
								type: 3
							};
						r.pos = s, r.speedlength = 1, r.angle = -Math.PI / 2, r.scale = .5, r.isRotate = !1, r.isBottomRotate = !0, r.ishitSlow = !1, r.rotateSpeed = 5, r.turn = i % 2 == 1 && o % 2 == 0 || o % 2 == 1 && i % 2 == 0, n.push(r)
					}
				return n
			},
			createType3: function (e, t, n) {
				for (var i = [], o = 0; o < e; o++)
					for (var s = 0; s < t; s++)
						if (!(0 == o && 0 == s || 2 == o && 0 == s)) {
							var r = cc.v2(n + 80 * o, cc.winSize.height / 2 + 50 + 115 * s),
								a = {
									type: 3,
									speedlength: 1
								};
							a.angle = -Math.PI / 2, a.scale = .55, a.isRotate = !1, a.isBottomRotate = !0, a.ishitSlow = !1, a.rotateSpeed = 5, o % 2 == 1 && s % 2 == 0 || s % 2 == 1 && o % 2 == 0 ? (r.y += 30, a.turn = !0) : a.turn = !1, a.pos = r, i.push(a)
						} return i
			},
			createBoss: function (e) {
				return 1 == e.bt ? this.createMushRoom1(e) : 2 == e.bt ? this.createAlie(e) : 3 == e.bt ? this.createGirl(e) : 4 == e.bt ? this.createThreeLeap(e) : 5 == e.bt ? this.createPotato(e) : 6 == e.bt ? this.createChilli(e) : 7 == e.bt ? this.createTortoise(e) : 8 == e.bt ? this.createSunFlower(e) : 9 == e.bt ? this.createBoss1(e) : 10 == e.bt ? this.createPig(e) : 11 == e.bt ? this.createGoat(e) : 12 == e.bt ? this.createRedDiamond(e) : 13 == e.bt ? this.createRose(e) : this.createBoss2(e)
			},
			getBossName: function (e) {
				return 1 == e.bt ? " [ \u5c0f\u8611\u83c7 ] " : 2 == e.bt ? " [ \u5916\u661f\u4eba ] " : 3 == e.bt ? " [ \u5fae\u7b11\u5929\u4f7f ] " : 4 == e.bt ? " [ \u4e09\u53f6\u8349 ] " : 5 == e.bt ? " [ \u571f\u8c46 ] " : 6 == e.bt ? " [ \u5c0f\u8fa3\u6912 ] " : 7 == e.bt ? " [ \u5c0f\u4e4c\u9f9f ] " : 8 == e.bt ? " [ \u5411\u65e5\u8475 ] " : 9 == e.bt ? " [ \u5c0f\u5411\u65e5\u8475 ] " : 10 == e.bt ? " [ \u732a\u5934 ] " : 11 == e.bt ? " [ \u94f6\u89d2\u5927\u738b ] " : 12 == e.bt ? " [ \u7ea2\u73cd\u73e0 ] " : 13 == e.bt ? " [\u6bd2\u73ab\u7470] " : "\u65b9\u5f62\u602a\u7269"
			},
			createBoss1: function (e) {
				for (var t = [], n = [cc.v2(-3, 141), cc.v2(97, 106), cc.v2(149, 15), cc.v2(132, -67), cc.v2(65, -134), cc.v2(-27, -144), cc.v2(-122, -96), cc.v2(-142, 3), cc.v2(-100, 100), cc.v2(0, 0)], i = EnemyUtil.getRandomColor(), o = EnemyUtil.getRandomColor(), s = 0; s < n.length; s++) {
					var r = n[s];
					r.y += 800;
					var a = {};
					s == n.length - 1 ? (a.type = 3, a.scale = 1, a.color = i, a.life = 5 * e.bossHp) : (a.type = 4, a.scale = .5, a.color = o, a.life = e.bossHp), a.initPos = r, a.pos = r, a.speedlength = e.speed, a.angle = -Math.PI / 2, a.isRotate = !1, a.isBottomRotate = !0, a.ishitSlow = !1, a.rotateSpeed = 1, Math.random() > 1 - e.rt ? a.rt = 1 : a.rt = 0, t.push(a)
				}
				return t
			},
			createBoss2: function (e) {
				var t = [],
					n = cc.v2(0, 800),
					i = {};
				return i.type = Math.ceil(5 * Math.random()), i.scale = 1.5, i.color = EnemyUtil.getColor(2), i.life = e.bossHp, i.pos = n, i.speedlength = e.speed, i.angle = -Math.PI / 2, i.isRotate = !1, i.isBottomRotate = !0, i.ishitSlow = !1, i.rotateSpeed = 1, Math.random() > 1 - e.rt ? i.rt = 1 : i.rt = 0, t.push(i), t
			},
			createBoss3: function (e) {
				for (var t = [], n = [cc.v2(0, 0), cc.v2(-43, 93), cc.v2(46, 93), cc.v2(-101, 182), cc.v2(92, 182), cc.v2(-5, 182), cc.v2(-53, 276), cc.v2(41, 276), cc.v2(138, 276), cc.v2(-146, 276), cc.v2(-90, 371), cc.v2(100, 371), cc.v2(196, 371), cc.v2(4, 371), cc.v2(-191, 371), cc.v2(-92, 465), cc.v2(102, 465)], i = EnemyUtil.getRandomColor(), o = EnemyUtil.getRandomColor(), s = EnemyUtil.getRandomColor(), r = Math.ceil(5 * Math.random()), a = 0; a < n.length; a++) {
					var h = n[a];
					h.y += 800;
					var c = {};
					c.type = r, c.color = a == n.length - 1 || a == n.length - 2 ? i : o, c.life = e.bossHp, c.scale = .5, 0 == a ? (c.color = s, c.life = 5 * e.bossHp, c.isHead = !0) : c.isHead = !1, c.initPos = h, c.pos = h, c.speedlength = e.speed, c.angle = -Math.PI / 2, c.isRotate = !1, c.isBottomRotate = !0, c.ishitSlow = !1, c.rotateSpeed = 1, Math.random() > 1 - e.rt ? c.rt = 1 : c.rt = 0, t.push(c)
				}
				return t
			},
			createGirl: function (e) {
				for (var t = [], n = NestTypeData.createGirl(), i = 0; i < n.length; i++) {
					var o = cc.v2(n[i][0], n[i][1]);
					o.y += 800;
					var s = {};
					s.type = n[i][2], s.color = n[i][4], s.life = e.bossHp, s.scale = n[i][3], 0 == i ? (s.life = 3 * e.bossHp, s.isHead = !0) : s.isHead = !1, s.initPos = o, s.pos = o, s.speedlength = e.speed, s.angle = -Math.PI / 2, s.isRotate = !1, s.isBottomRotate = !0, s.ishitSlow = !1, s.rotateSpeed = 1, Math.random() > 1 - e.rt ? s.rt = 1 : s.rt = 0, t.push(s)
				}
				return t
			},
			createShapes: function (e, t) {
				for (var n = [], i = 0; i < t.length; i++) {
					var o = cc.v2(t[i][0], t[i][1]);
					o.y += 800;
					var s = {};
					s.type = t[i][2], s.color = t[i][4], s.life = e.bossHp, s.scale = t[i][3], 0 == i ? (s.life = 3 * e.bossHp, s.isHead = !0, s.showTxt = !0, s.turn = !0, s.isBottomRotate = !1) : (s.isHead = !1, s.showTxt = !0, s.isBottomRotate = !0), t[i].length >= 6 && (s.scaleX = t[i][3], s.scaleY = t[i][5], s.showTxt = !0), 7 == t[i].length && (s.angle = t[i][6]), s.initPos = o, s.pos = o, s.speedlength = e.speed, s.angle = -Math.PI / 2, s.isRotate = !1, s.ishitSlow = !1, s.rotateSpeed = 1, Math.random() > 1 - e.rt ? s.rt = 1 : s.rt = 0, n.push(s)
				}
				return n
			},
			createAlie: function (e) {
				var t = NestTypeData.createAlie();
				return this.createShapes(e, t)
			},
			createPotato: function (e) {
				var t = NestTypeData.createPotato();
				return this.createShapes(e, t)
			},
			createSunFlower: function (e) {
				var t = NestTypeData.createSunFlower();
				return this.createShapes(e, t)
			},
			createMushRoom1: function (e) {
				var t = NestTypeData.createMushRoom1();
				return this.createShapes(e, t)
			},
			createThreeLeap: function (e) {
				var t = NestTypeData.createThreeLeap();
				return this.createShapes(e, t)
			},
			createChilli: function (e) {
				var t = NestTypeData.createChilli();
				return this.createShapes(e, t)
			},
			createTortoise: function (e) {
				var t = NestTypeData.createTortoise();
				return this.createShapes(e, t)
			},
			createPig: function (e) {
				var t = NestTypeData.createPig();
				return this.createShapes(e, t)
			},
			createGoat: function (e) {
				var t = NestTypeData.createGoat(e);
				return this.createShapes(e, t)
			},
			createRedDiamond: function (e) {
				var t = NestTypeData.createRedDiamond(e);
				return this.createShapes(e, t)
			},
			createRose: function (e) {
				var t = NestTypeData.createRose(e);
				return this.createShapes(e, t)
			}
		};
		window.EnemyKindGeneror = n, cc._RF.pop()
	}, {}],
	EnemyUtil: [function (e, t) {
		"use strict";
		cc._RF.push(t, "69b37d4TcZBHp7eYXLxsWWS", "EnemyUtil");
		var n = {
			currentEnemyType: "",
			currentBossType: null,
			levelCoin: 0,
			curLevel: 0,
			init: function () {
				this.colorArr = [], this.color1 = new cc.Color(250, 241, 73), this.color2 = new cc.Color(0, 255, 255), this.color3 = new cc.Color(255, 64, 64), this.color4 = new cc.Color(0, 191, 255), this.color5 = new cc.Color(224, 102, 255), this.color6 = new cc.Color(18, 232, 181), this.color7 = new cc.Color(255, 20, 147), this.color8 = new cc.Color(3, 3, 3), this.colorArr.push(this.color1, this.color2, this.color3, this.color4, this.color5, this.color6, this.color7, this.color8)
			},
			getColor: function (e) {
				return this.colorArr[e]
			},
			getRandomColor: function () {
				var e = Math.floor(Math.random() * this.colorArr.length);
				return this.colorArr[e]
			},
			generalCoin: function (e, t, n, i, o) {
				void 0 === o && (o = 0);
				var s = GNodePool.getcoinAnim();
				s.setPosition(t), s.parent = e, s.zIndex = e.childrenCount + 1;
				var r = [t, cc.v2(t.y - 200, t.y - 200), n],
					a = cc.bezierTo(.6 + .4 * Math.random(), r),
					h = cc.callFunc(function () {
						MusicManger.playCoin(), GNodePool.putcoinAnim(s), 0 == o && GmEvent.dispatcher("UpdateCoinNum", i)
					}),
					c = cc.sequence(a, h);
				s.runAction(c)
			},
			generalAmaOrPP: function (e, t, n, i, o, s, r) {
				void 0 === s && (s = 0), void 0 === r && (r = 1);
				var a = "ama" == e ? GNodePool.getamaAnim() : GNodePool.getppAnim();
				a.setPosition(n), a.parent = t, a.zIndex = t.childrenCount + 1;
				var h = [n, cc.v2(n.y - 200, n.y - 200), i],
					c = cc.bezierTo(.6 + .4 * Math.random(), h),
					l = cc.callFunc(function () {
						MusicManger.playCoin(), "ama" == e ? GNodePool.putamaAnim(a) : GNodePool.putppAnim(a), 0 == s && GmEvent.dispatcher("UpdateCoinNum", o)
					}),
					u = cc.sequence(c, l);
				a.runAction(u)
			},
			getBossName: function () {
				return "EnemyGenerorTypeBoss3"
			}
		};
		window.EnemyUtil = n, cc._RF.pop()
	}, {}],
	Enemy: [function (e, t) {
		"use strict";
		cc._RF.push(t, "0f645TnnbVDv5k5FGvFOKNv", "Enemy"), cc.Class({
			extends: BaseEnemy,
			properties: {
				skins: [cc.SpriteFrame],
				wzskins: [cc.SpriteFrame],
				bottom: cc.Node,
				hpTxt: cc.Node,
				wzIcon: cc.Node
			},
			init: function (e) {
				this.enemyArg = e, null == e.rotateSpeed ? this.rotateSpeed = .2 : this.rotateSpeed = e.rotateSpeed, null == e.isRotate ? this.isRotate = !0 : this.isRotate = e.isRotate, null == e.isBottomRotate ? this.isBottomRotate = !0 : this.isBottomRotate = e.isBottomRotate, null == e.turn ? this.turn = !1 : this.turn = e.turn, null == e.ishitSlow ? this.ishitSlow = !0 : this.ishitSlow = e.ishitSlow, null == e.moveSpeed ? this.moveSpeed = 3 : this.moveSpeed = e.moveSpeed, this.level = e.level, this.type = e.type, this.isPause = !1, e.life && (this.hp = Math.ceil(e.life)), this.initScale = .55, e.scale && (this.initScale = e.scale), null != e.rt ? this.rt = e.rt : this.rt = -1, null != e.reviveNum ? this.reviveNum = e.reviveNum : this.reviveNum = 0, null != e.showTxt && (this.hpTxt.active = e.showTxt), this.hpTxt.getComponent(cc.Label).string = Utils.formatNumber(this.hp), this.node.setScale(this.initScale), e.scaleX && (this.node.scaleX = this.enemyArg.scaleX), e.scaleY && (this.node.scaleY = this.enemyArg.scaleY), this.canShake = !0, 0 == e.type && (e.type = Math.ceil(5 * Math.random())), this.body = this.node.getChildByName("body"), this.body.getComponent(cc.Sprite).spriteFrame = this.skins[e.type - 1], this.bottom.getComponent(cc.Sprite).spriteFrame = this.skins[e.type - 1], e.wzdata ? (this.wzIcon.active = !0, this.hpTxt.active = !1, "AMA" == e.wzdata.type && (this.body.getComponent(cc.Sprite).spriteFrame = this.wzskins[0]), "PP" == e.wzdata.type && (this.body.getComponent(cc.Sprite).spriteFrame = this.wzskins[1])) : (this.wzIcon.active = !1, this.hpTxt.active = !0), 1 == e.type && (this.body.setAnchorPoint(cc.v2(.5, .42)), this.bottom.setAnchorPoint(cc.v2(.5, .42)));
				var t = EnemyUtil.getRandomColor();
				this.body.color = t, this.bottom.color = t, e.color ? (this.body.color = e.color, this.bottom.color = e.color, this.initColor = e.color) : this.initColor = t, this.bottom.opacity = 112;
				var n = Math.random(),
					i = n >= .5 ? 1 : -1;
				this.rotateValue = i * (this.rotateSpeed + .2 * n), this.bottomRotateValue = -i * (this.rotateSpeed + .5 * n), e.angle && (this.node.angle = e.angle), this.turn && (this.body.angle = 180, this.bottom.angle = 180), this.isIce = !1, this.animate(), this.startTime = 0, this.fireColor = new cc.Color(238, 117, 25), this.iceColor = new cc.Color(248, 248, 255), this.planePower = DataProxy.getCurPlanePower(), this.weaponPower = DataProxy.getWRealPower()
			},
			getHalfWidth: function () {
				return 218 * this.initScale / 2
			},
			seek: function (e, t) {
				MusicManger.playSeek();
				var n = cc.tintTo(.8, 253, 0, 103),
					i = cc.tintTo(.8, 253, 0, 103);
				this.bottom.runAction(i);
				var o = cc.callFunc(function () {
					this.isPause || (this.node.getComponent("SteeredVehicle").resume(), this.node.getComponent("SteeredVehicle").setSpeed(t), this.node.getComponent("SteeredVehicle").seek(e))
				}.bind(this)),
					s = cc.sequence(n, o);
				this.body.runAction(s)
			},
			pause: function () {
				this.isPause = !0
			},
			resume: function () {
				this.isPause = !1
			},
			update: function () {
				this.isRotate && (this.body.angle += this.rotateValue), this.isBottomRotate && (this.bottom.angle += this.bottomRotateValue)
			},
			onCollisionStay: function (e, t) {
				5 == e.tag && (this.startTime >= .4 && (this.hurtEnemy(e, t, !1), this.startTime = 0), this.startTime += .032)
			},
			onCollisionEnter: function (e, t) {
				this.hurtEnemy(e, t, !0)
			},
			hurtEnemy: function (e, t, n) {
				if (3 == e.tag && (this.isIce || (this.body.color = this.iceColor, this.bottom.color = this.iceColor, this.isIce = !0, this.slowdownSpeedByIce(), this.scheduleOnce(function () {
					this.isIce = !1, this.hp > 0 && (this.recoverSpeed(), this.body.color = this.initColor, this.bottom.color = this.initColor)
				}.bind(this), 2))), 4 == e.tag && (this.body.color = this.fireColor, this.bottom.color = this.fireColor, this.scheduleOnce(function () {
					this.hp > 0 && (this.body.color = this.initColor, this.bottom.color = this.initColor)
				}.bind(this), 2)), 1 == e.tag || 2 == e.tag || 3 == e.tag || 4 == e.tag || 5 == e.tag) {
					var i = e.node.getPosition();
					if (this.handleShakeEffect(), n && 4 != e.tag && 5 != e.tag && this.handleHitEffect(i), 4 != e.tag && 5 != e.tag && GmEvent.dispatcher("DeleteBullet", e.node), this.reduceHpByTag(e.tag), this.hp < 0 ? this.hpTxt.getComponent(cc.Label).string = "0" : this.hpTxt.getComponent(cc.Label).string = Utils.formatNumber(this.hp), this.hp <= 0) {
						var o = {};
						o.id = this.node._id, o.pos = this.node.getPosition(), o.reviveNum = this.reviveNum, o.rt = this.rt, o.life = this.enemyArg.life || 20, o.initScale = this.initScale, o.type = this.type, o.speedlength = this.node.getComponent("SteeredVehicle").speedLength, o.isHead = this.enemyArg.isHead || !1, o.wzdata = this.enemyArg.wzdata, this.handleExplode(o.pos, this.body.color), GmEvent.dispatcher("DeleteEnemy", o), MusicManger.playEp(this.type), Utils.vibrateShort(), Utils.shake(), 1 == this.type && (this.body.setAnchorPoint(cc.v2(.5, .5)), this.bottom.setAnchorPoint(cc.v2(.5, .5))), this.turn && (this.body.angle = 0, this.bottom.angle = 0), this.recycle(), GNodePool.putenemy(this.node)
					}
				} else 100 == e.tag && GmEvent.dispatcher("HitPlane")
			},
			reduceHpByTag: function (e) {
				this.hp -= 1 == e ? this.planePower : this.weaponPower
			},
			recycle: function () {
				this.bottom.stopAllActions(), this.body.stopAllActions(), this.node.stopAllActions(), this.bottom.color = new cc.Color(255, 255, 255), this.body.color = new cc.Color(255, 255, 255), this.bottom.angle = 0, this.body.angle = 0, this.node.angle = 0, this.body.setAnchorPoint(cc.v2(.5, .5)), this.bottom.setAnchorPoint(cc.v2(.5, .5)), this.isPause = !1, this.node.setScale(1), this.turn = !1, this.hpTxt.active = !0
			}
		}), cc._RF.pop()
	}, {}],
	Explode: [function (e, t) {
		"use strict";
		cc._RF.push(t, "7a346Thcl5NU554jQ+/ZTlZ", "Explode"), cc.Class({
			extends: cc.Component,
			properties: {},
			init: function (e, t) {
				var n = this,
					i = this.spine = this.getComponent("sp.Skeleton");
				this.node.setScale(1.5 * e);
				var o = Math.random() > .5 ? 1 : -1;
				this.node.angle = 180 * o * Math.random(), this.spine.setAnimation(0, "attack", !1), this.node.color = t, i.setCompleteListener(function (e) {
					"attack" === (e.animation ? e.animation.name : "") && (i.clearTrack(0), n.node.setScale(1), n.node.color = new cc.Color(255, 255, 255), GNodePool.putexplode(n.node))
				})
			}
		}), cc._RF.pop()
	}, {}],
	FBAdManager: [function (e, t, n) {
		"use strict";
		var i, o;

		function s(e) {
			var t = "NONE";
			switch (e) {
				case o.NEW:
					t = "NEW";
					break;
				case o.LOADING:
					t = "LOADING";
					break;
				case o.LOADED:
					t = "LOADED";
					break;
				case o.PLAYING:
					t = "PLAYING"
			}
			return t
		}

		function r(e, t) {
			return __awaiter(this, void 0, void 0, function () {
				return __generator(this, function () {
					return [2, new Promise(function (n) {
						setTimeout(function () {
							t && t(), n()
						}, 1e3 * e)
					})]
				})
			})
		}
		cc._RF.push(t, "ecee4rdHS1Jpa7X+OiJ3UD2", "FBAdManager"), Object.defineProperty(n, "__esModule", {
			value: !0
		}),
			function (e) {
				e[e.INTERSTITIAL = 0] = "INTERSTITIAL", e[e.REWARDED_VIDEO = 1] = "REWARDED_VIDEO", e[e.BANNER = 2] = "BANNER"
			}(i || (i = {})),
			function (e) {
				e[e.NONE = 0] = "NONE", e[e.NEW = 1] = "NEW", e[e.LOADING = 2] = "LOADING", e[e.LOADED = 3] = "LOADED", e[e.PLAYING = 4] = "PLAYING"
			}(o || (o = {}));
		var a = {
			code: "EXCEED_MAX_AD_INSTANCE",
			message: "\u5e7f\u544a\u5bf9\u8c61\u4e0d\u5141\u8bb8\u8d85\u8fc7 3"
		},
			h = {
				code: "NO_READY_AD_INSTANCE",
				message: "\u6ca1\u6709\u52a0\u8f7d\u5b8c\u6bd5\u7684\u5e7f\u544a\uff0c\u6216\u8005\u5e7f\u544a\u64ad\u653e\u592a\u9891\u7e41"
			},
			c = {
				code: "NOT_READY_FOR_LOAD",
				message: "\u5f53\u524d\u72b6\u6001\u4e0d\u5141\u8bb8\u518d\u6b21\u52a0\u8f7d"
			},
			l = {
				code: "AD_IS_LOADING",
				message: "\u5e7f\u544a\u6b63\u5728\u52a0\u8f7d"
			},
			u = {
				code: "NOT_READY_FOR_PLAYING",
				message: "\u6ca1\u6709\u53ef\u4ee5\u64ad\u653e\u7684\u5e7f\u544a"
			},
			p = {
				code: "AD_IS_PLAYING",
				message: "\u5e7f\u544a\u6b63\u5728\u64ad\u653e"
			},
			d = {
				code: "NO_BANNER_AD",
				message: "\u6ca1\u6709\u6dfb\u52a0Banner\u5e7f\u544a"
			},
			f = {
				code: "API_NOT_SUPPORT",
				message: "\u5e7f\u544a\u63a5\u53e3\u4e0d\u652f\u6301"
			},
			g = {
				code: "TOO_FAST_SHOW",
				message: "\u5e7f\u544a\u64ad\u653e\u592a\u9891\u7e41"
			},
			m = {
				code: "NOT_PLAYING",
				message: "\u5e7f\u544a\u6ca1\u6709\u64ad\u653e"
			},
			v = {
				code: "TOO_MANY_ERRORS",
				message: "\u592a\u591a\u9519\u8bef, \u505c\u6b62\u64cd\u4f5c"
			};

		function y(e, t, n) {
			return e && void 0 !== e[t] ? e[t] : n
		}
		var w = function () {
			function e(e, t) {
				this._lastShowTime = 0, this._refreshInterval = 0, this._refreshInterval = e > 0 ? e : 0, this._lastShowTime = 0, t > 0 && (this._lastShowTime = Date.now() + 1e3 * t - 1e3 * this._refreshInterval)
			}
			return e.prototype.isReadyToRefresh = function () {
				return this.getNextRefreshInterval() <= 0
			}, e.prototype.getNextRefreshInterval = function () {
				var e = 0;
				if (this._refreshInterval > 0 && this._lastShowTime > 0) {
					var t = Date.now();
					e = this._refreshInterval - (t - this._lastShowTime) / 1e3
				}
				return e
			}, e.prototype.updateLastShowTime = function () {
				this._lastShowTime = Date.now()
			}, e
		}(),
			P = function () {
				function e(e, t, n, i) {
					this._maxLoadError = 0, this._errorCounter = 0, this._fatalError = !1, this._sharedTimer = null, this._adId = e, this._state = o.NONE, this._type = t, this._sharedTimer = n, this._fatalError = !1, console.assert(!!n, "sharedTimer is invalid", n), this._maxLoadError = y(i, "maxLoadError", 0)
				}
				return e.prototype.getStateName = function () {
					return s(this._state)
				}, e.prototype.getAdTypeName = function () {
					return this._type == i.INTERSTITIAL ? "\u63d2\u5c4f\u5e7f\u544a" : this._type == i.REWARDED_VIDEO ? "\u6fc0\u52b1\u89c6\u9891\u5e7f\u544a" : this._type == i.BANNER ? "Banner" : "UNKNOWN"
				}, e.prototype.getInfo = function () {
					return "[" + this.getAdTypeName() + ":" + this._adId + ":" + this.getStateName() + "]"
				}, e.prototype.isReadyToRefresh = function () {
					return this._sharedTimer.isReadyToRefresh()
				}, e.prototype.getNextRefreshInterval = function () {
					return this._sharedTimer.getNextRefreshInterval()
				}, e.prototype.updateLastShowTime = function () {
					this._sharedTimer.updateLastShowTime()
				}, e.prototype.increaseErrorCounter = function () {
					this._errorCounter++
				}, e.prototype.resetErrorCounter = function () {
					this._errorCounter = 0
				}, e.prototype.setFatalError = function () {
					this._fatalError = !0
				}, e.prototype.isErrorTooMany = function () {
					return this._fatalError || this._maxLoadError > 0 && this._errorCounter >= this._maxLoadError
				}, e
			}(),
			b = function (e) {
				function t(t, n, i, o) {
					var s = e.call(this, t, n, i, o) || this;
					return s._adInstance = null, s._autoLoadOnPlay = y(o, "autoLoadOnPlay", !1), s
				}
				return __extends(t, e), t.prototype.loadAsync = function () {
					return __awaiter(this, void 0, void 0, function () {
						var e, t, n;
						return __generator(this, function (i) {
							switch (i.label) {
								case 0:
									return null != this._adInstance ? [3, 4] : this._state != o.NONE ? [3, 2] : (this._state = o.NEW, console.log("\u83b7\u53d6\u5e7f\u544a\u5bf9\u8c61: " + this.getInfo()), e = this, [4, this.createAdInstanceAsync(this._adId)]);
								case 1:
									return e._adInstance = i.sent(), [3, 3];
								case 2:
									return console.log("\u5f53\u524d\u72b6\u6001\u672a\u6ee1\u8db3\u52a0\u8f7d\u6761\u4ef6, \u6b63\u5728\u83b7\u53d6\u5e7f\u544a\u5bf9\u8c61: " + this.getInfo()), [2];
								case 3:
									return [3, 4];
								case 4:
									if (this._state != o.NEW) throw console.log("\u5f53\u524d\u72b6\u6001\u672a\u6ee1\u8db3\u52a0\u8f7d\u6761\u4ef6: " + this.getInfo()), this._state == o.LOADING ? (console.log("\u5e7f\u544a\u6b63\u5728\u52a0\u8f7d\u4e2d\uff0c\u4e0d\u8981\u91cd\u590d\u52a0\u8f7d" + this.getInfo()), l) : c;
									if (this.isErrorTooMany()) throw console.log("\u592a\u591a\u9519\u8bef\uff0c\u505c\u6b62\u52a0\u8f7d: " + this.getInfo()), v;
									i.label = 5;
								case 5:
									return i.trys.push([5, 7, , 8]), this._state = o.LOADING, console.log("\u5f00\u59cb\u52a0\u8f7d\u5e7f\u544a: " + this.getInfo()), [4, this._adInstance.loadAsync()];
								case 6:
									return i.sent(), this._state = o.LOADED, this.resetErrorCounter(), console.log("\u5e7f\u544a\u52a0\u8f7d\u6210\u529f: " + this.getInfo()), [2, !0];
								case 7:
									throw t = i.sent(), console.error("\u5e7f\u544a\u52a0\u8f7d\u5931\u8d25: " + this.getInfo(), t), "ADS_NO_FILL" == t.code ? (console.error("\u5e7f\u544a\u65e0\u6cd5\u586b\u5145\uff0c\u4e0d\u518d\u7ee7\u7eed\u8bf7\u6c42: " + this.getInfo()), this.setFatalError()) : (this.increaseErrorCounter(), this._state = o.NEW, n = 10 * this._errorCounter + 1, console.log("\u5ef6\u8fdf" + n + "\u79d2\u540e, \u81ea\u52a8\u91cd\u65b0\u52a0\u8f7d: " + this.getInfo()), r(n, this.loadAsync.bind(this))), t;
								case 8:
									return [2]
							}
						})
					})
				}, t.prototype.isReady = function () {
					return null != this._adInstance && this._state == o.LOADED
				}, t.prototype.showAsync = function () {
					return __awaiter(this, void 0, void 0, function () {
						var e;
						return __generator(this, function (t) {
							switch (t.label) {
								case 0:
									if (!this.isReady()) throw console.log("\u5f53\u524d\u72b6\u6001\u672a\u6ee1\u8db3\u64ad\u653e\u6761\u4ef6: " + this.getInfo()), this._state == o.PLAYING ? p : u;
									if (!this.isReadyToRefresh()) throw console.log("\u64ad\u653e\u592a\u9891\u7e41\uff0c\u8fd8\u9700\u95f4\u9694" + this.getNextRefreshInterval() + " \u79d2: " + this.getInfo()), g;
									t.label = 1;
								case 1:
									return t.trys.push([1, 3, , 4]), this._state = o.PLAYING, console.log("\u5f00\u59cb\u64ad\u653e\u5e7f\u544a: " + this.getInfo()), [4, this._adInstance.showAsync()];
								case 2:
									return t.sent(), console.log("\u64ad\u653e\u5e7f\u544a\u5b8c\u6bd5: " + this.getInfo()), this._adInstance = null, this._state = o.NONE, this.updateLastShowTime(), this._autoLoadOnPlay && (console.log("\u5ef6\u8fdf1\u79d2\u540e, \u81ea\u52a8\u91cd\u65b0\u52a0\u8f7d: " + this.getInfo()), r(1, this.loadAsync.bind(this))), [2, !0];
								case 3:
									throw e = t.sent(), console.log("\u64ad\u653e\u5e7f\u544a\u5931\u8d25: " + this.getInfo(), e), "RATE_LIMITED" == e.code ? this._state = o.LOADED : (this._adInstance = null, this._state = o.NONE, this._autoLoadOnPlay && (console.log("\u5ef6\u8fdf1\u79d2\u540e, \u81ea\u52a8\u91cd\u65b0\u52a0\u8f7d: " + this.getInfo()), r(1, this.loadAsync.bind(this)))), e;
								case 4:
									return [2]
							}
						})
					})
				}, t
			}(P),
			E = function (e) {
				function t(t, n, o) {
					return e.call(this, t, i.INTERSTITIAL, n, o) || this
				}
				return __extends(t, e), t.prototype.createAdInstanceAsync = function () {
					return __awaiter(this, void 0, void 0, function () {
						return __generator(this, function (e) {
							switch (e.label) {
								case 0:
									return [4, FBInstant.getInterstitialAdAsync(this._adId)];
								case 1:
									return [2, e.sent()]
							}
						})
					})
				}, t
			}(b),
			C = function (e) {
				function t(t, n, o) {
					return e.call(this, t, i.REWARDED_VIDEO, n, o) || this
				}
				return __extends(t, e), t.prototype.createAdInstanceAsync = function () {
					return __awaiter(this, void 0, void 0, function () {
						return __generator(this, function (e) {
							switch (e.label) {
								case 0:
									return [4, FBInstant.getRewardedVideoAsync(this._adId)];
								case 1:
									return [2, e.sent()]
							}
						})
					})
				}, t
			}(b),
			S = function (e) {
				function t(t, n, o) {
					return e.call(this, t, i.BANNER, n, o) || this
				}
				return __extends(t, e), t.prototype.showAsync = function () {
					return __awaiter(this, void 0, void 0, function () {
						var e;
						return __generator(this, function (t) {
							switch (t.label) {
								case 0:
									if (!this.isReadyToRefresh()) throw console.log("\u64ad\u653e\u592a\u9891\u7e41\uff0c\u8fd8\u9700\u95f4\u9694" + this.getNextRefreshInterval() + " \u79d2: " + this.getInfo()), g;
									if (this.isErrorTooMany()) throw console.log("\u592a\u591a\u9519\u8bef\uff0c\u505c\u6b62\u52a0\u8f7d: " + this.getInfo()), v;
									t.label = 1;
								case 1:
									return t.trys.push([1, 3, , 4]), this._state = o.PLAYING, console.log("\u5f00\u59cb\u663e\u793a\u5e7f\u544a: " + this.getInfo()), [4, FBInstant.loadBannerAdAsync(this._adId)];
								case 2:
									return t.sent(), console.log("\u663e\u793a\u5e7f\u544a\u6210\u529f: " + this.getInfo()), this.updateLastShowTime(), this.resetErrorCounter(), [3, 4];
								case 3:
									throw e = t.sent(), console.error("\u663e\u793a\u5e7f\u544a\u5931\u8d25: " + this.getInfo(), e), "RATE_LIMITED" == e.code || ("ADS_NO_FILL" == e.code ? (console.error("\u5e7f\u544a\u65e0\u6cd5\u586b\u5145\uff0c\u4e0d\u518d\u7ee7\u7eed\u8bf7\u6c42: " + this.getInfo()), this.setFatalError()) : this.increaseErrorCounter()), e;
								case 4:
									return [2]
							}
						})
					})
				}, t.prototype.hideAsync = function () {
					return __awaiter(this, void 0, void 0, function () {
						var e;
						return __generator(this, function (t) {
							switch (t.label) {
								case 0:
									if (this._state != o.PLAYING) throw console.log("\u5e7f\u544a\u6ca1\u6709\u5728\u64ad\u653e\u4e2d: " + this.getInfo()), m;
									t.label = 1;
								case 1:
									return t.trys.push([1, 3, , 4]), console.log("\u9690\u85cf\u5e7f\u544a: " + this.getInfo()), [4, FBInstant.hideBannerAdAsync()];
								case 2:
									return t.sent(), this._state = o.NONE, [3, 4];
								case 3:
									throw e = t.sent(), console.error("\u9690\u85cf\u5e7f\u544a\u5931\u8d25: " + this.getInfo(), e), e;
								case 4:
									return [2]
							}
						})
					})
				}, t
			}(P),
			A = function () {
				function e() { }
				return e.getVersion = function () {
					return "1.0.2"
				}, e.addInterstitial = function (e, t) {
					void 0 === t && (t = 3), null == this._interstitialTimer && (this._interstitialTimer = new w(this.defaultInterstitialTimerOption.refreshInterval, this.defaultInterstitialTimerOption.delayForFirstAd));
					for (var n = 0; n < t; n++) {
						if (this._interstitialAds.length >= 3) throw console.log("\u6dfb\u52a0\u63d2\u5c4f\u5e7f\u544a\u5931\u8d25, \u8d85\u51fa\u9650\u5236: " + this._interstitialAds.length, e), a;
						var i = new E(e, this._interstitialTimer, this.defaultInterstitialOption);
						this._interstitialAds.push(i), console.log("\u6dfb\u52a0\u63d2\u5c4f\u5e7f\u544a: " + e, "count: " + this._interstitialAds.length)
					}
					return this._interstitialAds.length
				}, e.addRewardedVideo = function (e, t) {
					void 0 === t && (t = 3), null == this._rewardedVideoTimer && (this._rewardedVideoTimer = new w(this.defaultRewardedVideoTimerOption.refreshInterval, this.defaultRewardedVideoTimerOption.delayForFirstAd));
					for (var n = 0; n < t; n++) {
						if (this._rewardedVideos.length >= 3) throw console.log("\u6dfb\u52a0\u6fc0\u52b1\u89c6\u9891\u5e7f\u544a\u5931\u8d25, \u8d85\u51fa\u9650\u5236: " + this._rewardedVideos.length, e), a;
						var i = new C(e, this._rewardedVideoTimer, this.defaultRewardedVideoOption);
						this._rewardedVideos.push(i), console.log("\u6dfb\u52a0\u6fc0\u52b1\u89c6\u9891\u5e7f\u544a: " + e, "count: " + this._rewardedVideos.length)
					}
					return this._rewardedVideos.length
				}, e.addBanner = function (e) {
					null == this._bannerTimer && (this._bannerTimer = new w(this.defaultBannerTimerOption.refreshInterval, this.defaultBannerTimerOption.delayForFirstAd));
					var t = new S(e, this._bannerTimer, this.defaultBannerOption);
					return this._banners.push(t), console.log("\u6dfb\u52a0Banner\u5e7f\u544a: " + e, "count: " + this._banners.length), t
				}, e.loadAll = function () {
					return __awaiter(this, void 0, void 0, function () {
						return __generator(this, function (e) {
							switch (e.label) {
								case 0:
									return console.log("\u521d\u59cb\u5316\u5e7f\u544a\u961f\u5217"), [4, this.loadAllAsync()];
								case 1:
									return [2, e.sent()]
							}
						})
					})
				}, e.loadAllAsync = function () {
					return __awaiter(this, void 0, void 0, function () {
						var e, t;
						return __generator(this, function (n) {
							switch (n.label) {
								case 0:
									console.log("FBAdManager Version: " + this.getVersion()), console.log("\u521d\u59cb\u5316\u5e7f\u544a\u961f\u5217"), e = 0, n.label = 1;
								case 1:
									return e < this._rewardedVideos.length ? (t = this._rewardedVideos[e], e > 0 ? [4, r(.1)] : [3, 3]) : [3, 7];
								case 2:
									n.sent(), n.label = 3;
								case 3:
									return n.trys.push([3, 5, , 6]), [4, t.loadAsync()];
								case 4:
								case 5:
									return n.sent(), [3, 6];
								case 6:
									return e++, [3, 1];
								case 7:
									e = 0, n.label = 8;
								case 8:
									return e < this._interstitialAds.length ? (t = this._interstitialAds[e], e > 0 ? [4, r(.1)] : [3, 10]) : [3, 14];
								case 9:
									n.sent(), n.label = 10;
								case 10:
									return n.trys.push([10, 12, , 13]), [4, t.loadAsync()];
								case 11:
								case 12:
									return n.sent(), [3, 13];
								case 13:
									return e++, [3, 8];
								case 14:
									return [2]
							}
						})
					})
				}, e._isAdReady = function (e) {
					for (var t = e == i.INTERSTITIAL ? this._interstitialAds : this._rewardedVideos, n = !1, o = 0; o < t.length; o++) {
						var s = t[o];
						if (s.isReady() && s.isReadyToRefresh()) {
							n = !0;
							break
						}
					}
					return n
				}, e._showAsync = function (e) {
					for (var t = e == i.INTERSTITIAL ? this._interstitialAds : this._rewardedVideos, n = null, o = 0; o < t.length; o++) {
						var s = t[o];
						if (s.isReady() && s.isReadyToRefresh()) {
							n = s;
							break
						}
					}
					if (null != n) return n.showAsync();
					throw h
				}, e._getAdTimer = function (e) {
					return e == i.INTERSTITIAL ? this._interstitialTimer : e == i.REWARDED_VIDEO ? this._rewardedVideoTimer : this._bannerTimer
				}, e.isInterstitialAdReady = function () {
					return this._isAdReady(i.INTERSTITIAL)
				}, e.showInterstitialAd = function () {
					return __awaiter(this, void 0, void 0, function () {
						return __generator(this, function (e) {
							switch (e.label) {
								case 0:
									return [4, this._showAsync(i.INTERSTITIAL)];
								case 1:
									return [2, e.sent()]
							}
						})
					})
				}, e.isRewardedVideoReady = function () {
					return this._isAdReady(i.REWARDED_VIDEO)
				}, e.showRewardedVideo = function () {
					return __awaiter(this, void 0, void 0, function () {
						return __generator(this, function (e) {
							switch (e.label) {
								case 0:
									return [4, this._showAsync(i.REWARDED_VIDEO)];
								case 1:
									return [2, e.sent()]
							}
						})
					})
				}, e.checkApiSupport = function (e) {
					return FBInstant.getSupportedAPIs().indexOf(e) >= 0
				}, e.isBannerSupport = function () {
					return void 0 === this._bannerSupport && (this._bannerSupport = this.checkApiSupport("loadBannerAdAsync")), this._bannerSupport
				}, e.isBannerReady = function () {
					if (this._banners.length <= 0) throw d;
					return this._banners[0].isReadyToRefresh()
				}, e.showBannerAsync = function () {
					return __awaiter(this, void 0, void 0, function () {
						return __generator(this, function (e) {
							switch (e.label) {
								case 0:
									if (!this.isBannerSupport()) throw f;
									if (this._banners.length <= 0) throw d;
									return [4, this._banners[0].showAsync()];
								case 1:
									return [2, e.sent()]
							}
						})
					})
				}, e.hideBannerAsync = function () {
					return __awaiter(this, void 0, void 0, function () {
						return __generator(this, function (e) {
							switch (e.label) {
								case 0:
									if (!this.isBannerSupport()) throw f;
									if (this._banners.length <= 0) throw d;
									return [4, this._banners[0].hideAsync()];
								case 1:
									return [2, e.sent()]
							}
						})
					})
				}, e._interstitialAds = [], e._rewardedVideos = [], e._banners = [], e._interstitialTimer = null, e._rewardedVideoTimer = null, e._bannerTimer = null, e._bannerSupport = void 0, e.defaultInterstitialOption = {
					autoLoadOnPlay: !0,
					maxLoadError: 3
				}, e.defaultRewardedVideoOption = {
					autoLoadOnPlay: !0,
					maxLoadError: 3
				}, e.defaultBannerOption = {
					autoLoadOnPlay: !0,
					maxLoadError: 1
				}, e.defaultInterstitialTimerOption = {
					refreshInterval: 40,
					delayForFirstAd: 30
				}, e.defaultRewardedVideoTimerOption = {
					refreshInterval: 0,
					delayForFirstAd: 0
				}, e.defaultBannerTimerOption = {
					refreshInterval: 40,
					delayForFirstAd: 0
				}, e
			}();
		n.default = A, cc._RF.pop()
	}, {}],
	FireWeapon: [function (e, t) {
		"use strict";
		cc._RF.push(t, "7615eL3ad5Ea6j6TENV8ndD", "FireWeapon"), cc.Class({
			extends: cc.Component,
			properties: {},
			init: function () {
				this.bulletArrs = [], this.intervalSecondTime = 3 - .01 * parseInt(DataProxy.getWSpeedLevel(DataProxy.wSpeedKey2)), this.intervalSecondTime < 1 && (this.intervalSecondTime = 1), this.schedule(this.initFireWeapon, this.intervalSecondTime), this.initFireWeapon();
				var e = 5 + .1 * parseInt(DataProxy.getWSpeedLevel(DataProxy.wSpeedKey4));
				e > 10 && (e = 10), this.speed = e
			},
			getPlaneScript: function () {
				return this.node.getComponent("Plane")
			},
			initFireWeapon: function () {
				if (this.getPlaneScript().canShoot) {
					var e = GNodePool.getfireWeapon();
					e.setScale(.2), this.node.parent.addChild(e, 1), e.setPosition(this.node.getPosition());
					var t = cc.scaleTo(3, 1);
					e.runAction(t), this.bulletArrs.push(e)
				}
			},
			update: function () {
				if (null != this.bulletArrs)
					for (var e = 0; e < this.bulletArrs.length; e++) this.bulletArrs[e].y += this.speed, (this.bulletArrs[e].y >= cc.winSize.height / 2 + 100 || this.bulletArrs[e].y <= -(cc.winSize.height / 2 + 100) || this.bulletArrs[e].x >= cc.winSize.width + 100 || this.bulletArrs[e].x <= 100 - cc.winSize.width) && (this.onDeleteBullet(this.bulletArrs[e], e), this.bulletArrs.splice(e, 1), e--)
			},
			onDeleteBullet: function (e) {
				e.setScale(1), GNodePool.putfireWeapon(e)
			},
			onDestroy: function () {
				for (var e = 0; e < this.bulletArrs.length; e++) this.onDeleteBullet(this.bulletArrs[e], e), this.bulletArrs.splice(e, 1), e--;
				this.bulletArrs.length = 0, this.unschedule(this.initFireWeapon)
			}
		}), cc._RF.pop()
	}, {}],
	FlashWeaponAnim: [function (e, t) {
		"use strict";
		cc._RF.push(t, "65356kbZ1pLaK9wzK7jEkja", "FlashWeaponAnim"), cc.Class({
			extends: cc.Component,
			properties: {},
			onLoad: function () {
				this.spine = this.getComponent("sp.Skeleton"), this.node.active = !1, this.strongFlag = !1
			},
			init: function (e) {
				this.sign = e, this.node.setScale(cc.v2(.2 * e, 1))
			},
			play: function () {
				this.strongFlag || (this.node.active = !0, this.spine.setAnimation(0, "attack", !0), MusicManger.shootflash(), this.scheduleOnce(function () {
					this.strongFlag || this.stop()
				}.bind(this), .4))
			},
			strongPlay: function () {
				this.strongFlag = !0, this.node.active = !0, this.spine.timeScale = 1.5, this.node.setScale(cc.v2(.3 * this.sign, 1)), this.spine.setAnimation(0, "attack", !0), this.scheduleOnce(function () {
					this.stopStrongPlay()
				}.bind(this), 2)
			},
			stopStrongPlay: function () {
				this.spine.timeScale = 1, this.node.setScale(cc.v2(.2 * this.sign, 1)), this.strongFlag = !1, this.node.active = !1
			},
			stop: function () {
				this.node.active = !1
			},
			start: function () { }
		}), cc._RF.pop()
	}, {}],
	FlashWeapon: [function (e, t) {
		"use strict";
		cc._RF.push(t, "fb98c1e+ftAGZKL3/GO+8PA", "FlashWeapon"), cc.Class({
			extends: cc.Component,
			properties: {},
			init: function () {
				this.initFlashWeapon();
				var e = 3;
				(e -= .005 * parseInt(DataProxy.getWSpeedLevel(DataProxy.wSpeedKey2))) <= 2 && (e = 2), this.schedule(this.showFlash, e)
			},
			showFlashInterval: function () {
				console.log("\u663e\u793a\u95ea\u7535")
			},
			unshowFlashInterval: function () {
				this.unschedule(this.showFlash)
			},
			getPlaneScript: function () {
				return this.node.getComponent("Plane")
			},
			initFlashWeapon: function () {
				this.flashWeapon1 = cc.instantiate(this.getPlaneScript().flashPrefab), this.flashWeapon1.parent = this.node, this.flashWeapon1.setPosition(this.getPlaneScript().leftWeapon.getPosition()), this.flashWeapon1.getComponent("FlashWeaponAnim").init(1), this.flashWeapon2 = cc.instantiate(this.getPlaneScript().flashPrefab), this.flashWeapon2.parent = this.node, this.flashWeapon2.setPosition(this.getPlaneScript().rightWeapon.getPosition()), this.flashWeapon2.getComponent("FlashWeaponAnim").init(-1)
			},
			setPos: function () {
				this.flashWeapon1.setPosition(this.getPlaneScript().leftWeapon.getPosition()), this.flashWeapon2.setPosition(this.getPlaneScript().rightWeapon.getPosition())
			},
			showFlash: function () {
				this.getPlaneScript().canShoot && this.getPlaneScript().isGame && (this.flashWeapon1.getComponent("FlashWeaponAnim").play(), this.flashWeapon2.getComponent("FlashWeaponAnim").play())
			},
			showStrongFlash: function () {
				this.getPlaneScript().isGame && (MusicManger.playlunch(), this.flashWeapon1.getComponent("FlashWeaponAnim").strongPlay(), this.flashWeapon2.getComponent("FlashWeaponAnim").strongPlay())
			},
			stopStrongFlash: function () {
				this.flashWeapon1.getComponent("FlashWeaponAnim").stopStrongPlay(), this.flashWeapon2.getComponent("FlashWeaponAnim").stopStrongPlay()
			},
			onDestroy: function () {
				this.unschedule(this.showFlash)
			}
		}), cc._RF.pop()
	}, {}],
	GNodePool: [function (e, t) {
		"use strict";
		cc._RF.push(t, "9132evytJdOaYjZzgey2RMR", "GNodePool"), cc.Class({
			extends: cc.Component,
			properties: {
				bulletPrefab: cc.Prefab,
				bullet2Prefab: cc.Prefab,
				bullet3Prefab: cc.Prefab,
				fireWeaponPrefab: cc.Prefab,
				enemyPrefab: cc.Prefab,
				explodePrefab: cc.Prefab,
				hitEffectPrefab: cc.Prefab,
				coinAnimPrefab: cc.Prefab,
				propPrefab: cc.Prefab,
				amaPrefab: cc.Prefab,
				ppPrefab: cc.Prefab
			},
			onLoad: function () {
				window.GNodePool = this, this.bulletPool = new cc.NodePool, this.enemyPool = new cc.NodePool, this.explodePool = new cc.NodePool, this.hitEffectPool = new cc.NodePool, this.coinAnimPool = new cc.NodePool, this.propPool = new cc.NodePool, this.amaAnimPool = new cc.NodePool, this.ppAnimPool = new cc.NodePool, this.fireWeaponPool = new cc.NodePool, this.hpTxtPool = new cc.NodePool;
				for (var e = 0; e < 80; e++) {
					if (e < 3) {
						var t = cc.instantiate(this.propPrefab);
						this.propPool.put(t);
						var n = cc.instantiate(this.fireWeaponPrefab);
						this.fireWeaponPool.put(n)
					}
					if (e <= 50) {
						var i = cc.instantiate(this.enemyPrefab);
						this.enemyPool.put(i);
						var o = cc.instantiate(this.explodePrefab);
						this.explodePool.put(o);
						var s = cc.instantiate(this.hitEffectPrefab);
						this.hitEffectPool.put(s);
						var r = cc.instantiate(this.coinAnimPrefab);
						this.coinAnimPool.put(r)
					}
					var a = cc.instantiate(this.bulletPrefab);
					this.bulletPool.put(a)
				}
			},
			initBullet2: function () {
				if (null == this.bulletPool2) {
					this.bulletPool2 = new cc.NodePool;
					for (var e = 0; e < 50; e++) {
						var t = cc.instantiate(this.bullet2Prefab);
						this.bulletPool2.put(t)
					}
				}
			},
			clearBullet2: function () {
				null != this.bulletPool2 && this.bulletPool2.clear()
			},
			initBullet3: function () {
				if (null == this.bulletPool3) {
					this.bulletPool3 = new cc.NodePool;
					for (var e = 0; e < 50; e++) {
						var t = cc.instantiate(this.bullet3Prefab);
						this.bulletPool3.put(t)
					}
				}
			},
			clearBullet3: function () {
				null != this.bulletPool3 && this.bulletPool3.clear()
			},
			getbullet: function () {
				return this.bulletPool.size() > 0 ? this.bulletPool.get() : cc.instantiate(this.bulletPrefab)
			},
			putbullet: function (e) {
				this.bulletPool.put(e)
			},
			getenemy: function () {
				return this.enemyPool.size() > 0 ? this.enemyPool.get() : cc.instantiate(this.enemyPrefab)
			},
			putenemy: function (e) {
				this.enemyPool.put(e)
			},
			getexplode: function () {
				return this.explodePool.size() > 0 ? this.explodePool.get() : cc.instantiate(this.explodePrefab)
			},
			putexplode: function (e) {
				this.explodePool.put(e)
			},
			gethitEffect: function () {
				return this.hitEffectPool.size() > 0 ? this.hitEffectPool.get() : cc.instantiate(this.hitEffectPrefab)
			},
			puthitEffect: function (e) {
				this.hitEffectPool.put(e)
			},
			getcoinAnim: function () {
				var e = null;
				return this.coinAnimPool.size() > 0 ? e = this.coinAnimPool.get() : (e = cc.instantiate(this.coinAnimPrefab), console.log("\u91cd\u65b0\u521b\u9020\u91d1\u5e01")), e
			},
			putcoinAnim: function (e) {
				this.coinAnimPool.put(e)
			},
			getamaAnim: function () {
				var e = null;
				return this.amaAnimPool.size() > 0 ? e = this.amaAnimPool.get() : (e = cc.instantiate(this.amaPrefab), console.log("\u91cd\u65b0\u521b\u9020ama")), e
			},
			putamaAnim: function (e) {
				this.amaAnimPool.put(e)
			},
			getppAnim: function () {
				var e = null;
				return this.ppAnimPool.size() > 0 ? e = this.ppAnimPool.get() : (e = cc.instantiate(this.ppPrefab), console.log("\u91cd\u65b0\u521b\u9020pp")), e
			},
			putppAnim: function (e) {
				this.ppAnimPool.put(e)
			},
			getprop: function () {
				return this.propPool.size() > 0 ? this.propPool.get() : cc.instantiate(this.propPrefab)
			},
			putprop: function (e) {
				this.propPool.put(e)
			},
			getbullet2: function () {
				return this.bulletPool2.size() > 0 ? this.bulletPool2.get() : cc.instantiate(this.bullet2Prefab)
			},
			putbullet2: function (e) {
				this.bulletPool2.put(e)
			},
			getbullet3: function () {
				return this.bulletPool3.size() > 0 ? this.bulletPool3.get() : cc.instantiate(this.bullet3Prefab)
			},
			putbullet3: function (e) {
				this.bulletPool3.put(e)
			},
			getfireWeapon: function () {
				return this.fireWeaponPool.size() > 0 ? this.fireWeaponPool.get() : cc.instantiate(this.fireWeaponPrefab)
			},
			putfireWeapon: function (e) {
				this.fireWeaponPool.put(e)
			}
		}), cc._RF.pop()
	}, {}],
	GPool: [function (e, t) {
		"use strict";
		cc._RF.push(t, "452e96iP19BmZDEuY82PAdx", "GPool");
		var n = cc.Class({
			name: "Pool",
			properties: {
				initNum: {
					default: 1,
					type: cc.Integer,
					min: 1,
					tooltip: "\u521d\u59cb\u5316\u8282\u70b9\u6c60\u7684\u9884\u5236\u6570\u91cf, \u5927\u4e8e0\u7684\u6574\u6570"
				},
				prefab: {
					default: null,
					type: cc.Prefab,
					tooltip: "\u7528\u6765\u751f\u6210\u8282\u70b9\u6c60\u7684\u9884\u5236\u4f53"
				}
			}
		});
		cc.Class({
			extends: cc.Component,
			properties: {
				prefabArr: {
					default: [],
					type: n,
					tooltip: "\u8f93\u5165\u8981\u751f\u6210\u7684\u8282\u70b9\u6c60\u7684\u4e2a\u6570"
				}
			},
			onLoad: function () {
				window.GPool = this, this.allPoolArr = [];
				for (var e = 0; e < this.prefabArr.length; e++) null === this.prefabArr[e].prefab ? console.error("\u7f3a\u5c11\u9884\u5236\u4f53!!!") : this.commonFunction(e)
			},
			commonFunction: function (e) {
				var t = this.prefabArr[e].initNum,
					n = this.prefabArr[e].prefab.name;
				this[n + "Pool"] = this.initPool(t, this.prefabArr[e].prefab), this["get" + n] = function () {
					return this.getNode(this[n + "Pool"], this.prefabArr[e].prefab)
				}.bind(this), this["put" + n] = function (e) {
					this.putNode(this[n + "Pool"], e)
				}.bind(this)
			},
			initPool: function (e, t) {
				for (var n = new cc.NodePool, i = 0; i < e; ++i) {
					var o = cc.instantiate(t);
					n.put(o)
				}
				return this.allPoolArr.push(n), n
			},
			getNode: function (e, t) {
				var n = null;
				return e.size() > 0 ? n = e.get() : (console.warn(t.name + "\u91cd\u65b0\u521b\u5efa!!!"), n = cc.instantiate(t)), n.name, n
			},
			putNode: function (e, t) {
				t.angle = 0, e.put(t), t.name
			},
			onDestroy: function () {
				for (var e = 0; e < this.allPoolArr.length; e++) this.allPoolArr[e].clear()
			}
		}), cc._RF.pop()
	}, {}],
	GameOver: [function (e, t) {
		"use strict";
		cc._RF.push(t, "2b339xdQRNEYZObIcvgibW/", "GameOver"), cc.Class({
			extends: cc.Component,
			properties: {
				coinIcon: cc.Node,
				coinTxt: cc.Label
			},
			init: function () {
				this.coins = EnemyUtil.levelCoin, DataProxy.saveCoins(this.coins), this.coinTxt.string = Utils.formatNumber(this.coins), this.isCollected = !1, cc.AdNode.showBanner(), GmEvent.addListener("watchType", this.onWatchType, this), GmEvent.addListener("vedioError", this.onVedioError, this), cc.AdNode.showInterstitialAd()
			},
			onWatchType: function (e) {
				if (1 == e && this.node.active) {
					var t = 2 * this.coins;
					DataProxy.saveCoins(t), EnemyUtil.levelCoin = 3 * this.coins, this.coinTxt.string = Utils.formatNumber(3 * this.coins), GmEvent.dispatcher("UpdateCoinNum"), this.collect()
				}
			},
			onVedioError: function () {
				Utils.alert("Reward Video Loading")
			},
			collectThreeTime: function () {
				cc.AdNode.showVedio(1, "col3")
			},
			collect: function () {
				if (!this.isCollected) {
					this.isCollected = !0, this.coinUI = cc.find("Canvas/gameui/coin");
					var e = this.coinUI.getPosition(),
						t = 55;
					if (null != Utils.getSystemInfo() && "iPhone X" == Utils.getSystemInfo().model && (t = 200), this.coins > 0) {
						this.coinPos = cc.v2(e.x, e.y + t);
						for (var n = Math.ceil(5 + 5 * Math.random()), i = Math.ceil(this.coins / n), o = this.coinIcon.getPosition(), s = 0; s < n; s++) {
							var r = Math.random(),
								a = r > .5 ? 1 : -1,
								h = cc.v2(o.x + 30 * a * r, o.y + 30 * a * r);
							EnemyUtil.generalCoin(this.node, h, this.coinPos, i, 1)
						}
						this.scheduleOnce(function () {
							GmEvent.dispatcher("Collect"), this.node.active = !1
						}.bind(this), 1.5)
					} else GmEvent.dispatcher("Collect"), this.node.active = !1
				}
			}
		}), cc._RF.pop()
	}, {}],
	GameUI: [function (e, t) {
		"use strict";
		var n;
		cc._RF.push(t, "9ca33Eyu5FOJ7+39N09LO6q", "GameUI"), (n = e("Wx")) && n.__esModule, cc.Class({
			extends: cc.Component,
			properties: {
				coinTxt: cc.Label,
				amaTxt: cc.Label,
				ppTxt: cc.Label,
				earnCoin: cc.Node,
				btn_e1: cc.Node,
				btn_e2: cc.Node
			},
			checkEarnUI: function () {
				this.earnCoin.active = native.showEarn
			},
			onEnable: function () {
				GmEvent.addListener("UpdateCoinNum", this.updateCoinNum, this), GmEvent.addListener("ShowTotalCoinNum", this.showTotalCoinNum, this)
			},
			init: function () {
				this.coinTxt.string = 0, this.addValue = 0
			},
			updateCoinNum: function () {
				this.coinTxt.string = Utils.formatNumber(EnemyUtil.levelCoin)
			},
			showTotal: function () {
				this.coinTxt.string = Utils.formatNumber(DataProxy.getCoins()), this.amaTxt.string = Utils.formatNumber(DataProxy.getAmaVal()), this.ppTxt.string = Utils.formatNumber(DataProxy.getPPVal())
			},
			showTotalCoinNum: function () {
				this.showTotal()
			},
			onGameOver: function () { },
			onShowEarn: function () {
				Utils.showPanel("prefab/ui_earn")
			},
			onDestroy: function () {
				GmEvent.removeListener("UpdateCoinNum", this.updateCoinNum, this), GmEvent.removeListener("ShowTotalCoinNum", this.showTotalCoinNum, this)
			}
		}), cc._RF.pop()
	}, {
		Wx: "Wx"
	}],
	GmEvent: [function (e, t) {
		"use strict";
		cc._RF.push(t, "41583ixlWNOn5OuYCJUhiTi", "GmEvent");
		var n = {
			init: function () {
				this.m_listeners = {}, this.gbass = 1, this.bgtgs = function () { }
			},
			addListener: function (e, t, n, i) {
				this.gbyouti = !1, this.gbass = 1, this.gbtgs = function () { }, null != i && void 0 !== i || (i = -1);
				var o = this.m_listeners[e];
				void 0 === o && (o = {}, this.m_listeners[e] = o);
				var s = o[n];
				void 0 === s && (s = [], o[n] = s);
				var r = {
					handler: t,
					context: n,
					count: i,
					isValid: !0
				};
				return s.push(r), r
			},
			removeListener: function (e, t, n) {
				var i = this.m_listeners[e];
				if (void 0 !== i)
					for (var o in i)
						for (var s = i[o], r = s.length, a = 0; a < r; a++) {
							var h = s[a];
							null != h && h.handler === t && h.context === n && s.splice(a, 1)
						}
				this.gbyouti = !1, this.gbass = 1, this.gbtgs = function () { }
			},
			gbGaa: function () {
				this.edTouchEf.active = !1, this.node.getChildByName("actEfe").opacity = 255, this.playAni(""), this.jumpTime = 0, this.slow = !1, this.jumpState = !1, this.aniState.speed = 1, this.node.getComponent(cc.Widget).updateAlignment(), this.rigid.gravityScale = 4, this.rigid.linearVelocity = cc.v2(0, -100)
			},
			dispatcher: function () {
				for (var e = arguments[0], t = [], n = 1; n < arguments.length; n++) t.push(arguments[n]);
				if (void 0 !== (a = this.m_listeners[e]))
					for (var i in a) {
						var o = (h = a[i]).length;
						for (n = 0; n < o; n++) {
							if ((c = h[n]).isValid) {
								var s = c.handler,
									r = c.context;
								s.apply(r, t)
							}
							c.count > 0 && (c.count -= 1), 0 == c.count && (c.isValid = !1)
						}
					}
				for (var e in this.m_listeners) {
					var a = this.m_listeners[e];
					for (var i in a) {
						var h;
						for (o = (h = a[i]).length, n = 0; n < o; n++) {
							var c;
							(c = h[n]).isValid || h.splice(n, 1)
						}
					}
				}
			},
			gbSass: function () {
				this.aniState.speed = .1, this.slow = !0, this.rigid.gravityScale *= .03;
				var e = this.rigid.linearVelocity;
				this.rigid.linearVelocity = cc.v2(e.x *= .2, e.y *= .2), MEvent.dispatchEvent(MEvent.Event.START_SLOW)
			}
		};
		window.GmEvent = n, n.init(), cc._RF.pop()
	}, {}],
	HashMap: [function (e, t) {
		"use strict";
		cc._RF.push(t, "0fc8dvDVStJSIEhC+EX5zWz", "HashMap"), window.HashMap = function () {
			var e = 0,
				t = new Object;
			this.isEmpty = function () {
				return 0 == e
			}, this.containsKey = function (e) {
				return e in t
			}, this.containsValue = function (e) {
				for (var n in t)
					if (t[n] == e) return !0;
				return !1
			}, this.put = function (n, i) {
				this.containsKey(n) || e++, t[n] = i
			}, this.get = function (e) {
				return this.containsKey(e) ? t[e] : null
			}, this.remove = function (n) {
				this.containsKey(n) && delete t[n] && e--
			}, this.values = function () {
				var e = new Array;
				for (var n in t) e.push(t[n]);
				return e
			}, this.keySet = function () {
				var e = new Array;
				for (var n in t) e.push(n);
				return e
			}, this.size = function () {
				return e
			}, this.clear = function () {
				e = 0, t = new Object
			}
		}, cc._RF.pop()
	}, {}],
	HitEffect: [function (e, t) {
		"use strict";
		cc._RF.push(t, "08c4fo5qW1BWoPI1wpKtQB3", "HitEffect"), cc.Class({
			extends: cc.Component,
			properties: {},
			init: function (e) {
				var t = this,
					n = this.spine = this.getComponent("sp.Skeleton");
				this.spine.setAnimation(0, "attack", !1);
				var i = Math.random() > .5 ? 1 : -1;
				this.node.angle = 180 * i * Math.random(), n.setCompleteListener(function (i) {
					i.animation && i.animation.name, GNodePool.puthitEffect(t.node), n.clearTrack(0), e()
				})
			}
		}), cc._RF.pop()
	}, {}],
	IceWeapon: [function (e, t) {
		"use strict";
		cc._RF.push(t, "6d33c5lFDdMWoiqvSD6SDVA", "IceWeapon"), cc.Class({
			extends: cc.Component,
			properties: {},
			init: function () {
				var e = 15 + .1 * parseInt(DataProxy.getWSpeedLevel(DataProxy.wSpeedKey3));
				e > 40 && (e = 40), this.speed = e, this.intervalSecondTime = 3 - .005 * parseInt(DataProxy.getWSpeedLevel(DataProxy.wSpeedKey3)), console.log("this.intervalSecondTime:", this.intervalSecondTime), this.intervalSecondTime < 1 && (this.intervalSecondTime = 1), this.schedule(this.generalSecondBullet, this.intervalSecondTime)
			},
			getPlaneScript: function () {
				return this.node.getComponent("Plane")
			},
			generalSecondBullet: function () {
				if (this.getPlaneScript().canShoot && this.getPlaneScript().isGame) {
					MusicManger.playPowerUp();
					for (var e = 0; e < 21; e++) this.initWeapon(e)
				}
			},
			initWeapon: function (e) {
				var t = this.node.getPosition(),
					n = GNodePool.getbullet3();
				n.parent = this.node.parent, this.getPlaneScript().bulletArrs.push(n), n.setPosition(t), n.angle = 5 * e - 45, n.x = this.node.x
			},
			onDestroy: function () {
				this.unschedule(this.generalSecondBullet)
			}
		}), cc._RF.pop()
	}, {}],
	LevelManager: [function (e, t) {
		"use strict";
		cc._RF.push(t, "00be5CP5RZHt5lZpOhyrdUX", "LevelManager");
		var n = {
			init: function (e) {
				var t = this;
				cc.loader.loadRes("json/level", function (n, i) {
					n ? console.error(n.message || n) : (t.levelConfig = i.json, e())
				})
			},
			getLevelData: function (e) {
				for (var t = 0; t < this.levelConfig.length; t++) {
					var n = this.levelConfig[t].lv.split(",");
					if (parseInt(e) <= parseInt(n[1])) return this.levelConfig[t]
				}
				return null
			},
			getGameInfo: function (e) {
				var t = {};
				return t.type = e.tp, t.hpbase = e.hp, t.enemyType = e.et, t.values = e.vl, t.interval = e.it, t.speed = e.sd, t.maxNum = e.mx, t.color = e.cr, t.bt = e.bt, t.bossHp = e.bh, t.bs = e.bs, t.rt = e.rt, t.bossSpeed = e.bsd || e.sd, t
			},
			getRandomGameInfo: function (e) {
				var t = this.getLevelData(100),
					n = {},
					i = Math.random(),
					o = 3;
				return o = i > .5 ? 3 : i > .3 ? 4 : i > .2 ? 2 : 1, n.type = o, n.hpbase = t.hp + (e - 100) * (50 + 50 * Math.random()), n.enemyType = 0, 1 == o ? (n.values = "5,4", n.interval = 1.8 + 2 * Math.random(), n.speed = 1.5 + Math.random()) : 2 == o ? (n.values = 6 + Math.floor(6 * Math.random()), n.interval = 2 + 2 * Math.random(), n.speed = 3 + 3 * Math.random()) : (o = 3) ? (n.values = 50 + Math.floor(10 * Math.random()), n.interval = 1 + Math.random(), n.speed = 3 + 2.5 * Math.random()) : 4 == o && (n.values = 30, n.interval = 2 + 1.5 * Math.random(), n.speed = 3 + 2 * Math.random()), n.maxNum = 15 + 10 * Math.random(), n.color = -1, n.bt = 0, n.bossHp = 0, n.bs = 0, n.rt = .2 + .3 * Math.random(), console.log("obj.values:", n.values), e % 5 == 0 && (null != cc.sys.localStorage.getItem("boss" + e) ? n.bt = cc.sys.localStorage.getItem("boss" + e) : (n.bt = Math.ceil(13 * Math.random()), cc.sys.localStorage.setItem("boss" + e, n.bt)), n.bossSpeed = 2 + 3 * Math.random(), n.bossHp = n.hpbase + (1500 + 500 * Math.random())), n
			}
		};
		window.LevelManager = n, cc._RF.pop()
	}, {}],
	LevelUI: [function (e, t) {
		"use strict";
		cc._RF.push(t, "37e6eEWuSVE2L5MlDLV83g2", "LevelUI"), cc.Class({
			extends: cc.Component,
			properties: {
				levelnode1: cc.Node,
				levelnode2: cc.Node,
				levelnode3: cc.Node,
				direction: cc.Node
			},
			init: function (e) {
				if (1 == e) this.levelnode1.active = !1, this.direction.active = !1, this.levelnode2.getChildByName("levelTxt").getComponent(cc.Label).string = e, this.levelnode3.getChildByName("levelTxt").getComponent(cc.Label).string = parseInt(e + 1);
				else {
					this.levelnode1.active = !0, this.direction.active = !0, this.levelnode1.getChildByName("levelTxt").getComponent(cc.Label).string = parseInt(e - 1), this.levelnode2.getChildByName("levelTxt").getComponent(cc.Label).string = e;
					var t = parseInt(e) + 1;
					this.levelnode3.getChildByName("levelTxt").getComponent(cc.Label).string = t
				}
			}
		}), cc._RF.pop()
	}, {}],
	LevelUpAnim: [function (e, t) {
		"use strict";
		cc._RF.push(t, "3ec32IHxItAT6l2B9nKhewZ", "LevelUpAnim"), cc.Class({
			extends: cc.Component,
			properties: {
				t1: cc.Node,
				t2: cc.Node,
				t3: cc.Node,
				circle: cc.Node
			},
			init: function (e) {
				this.circle.active = !1;
				var t = cc.moveTo(.3, cc.v2(0, 0)),
					n = cc.moveTo(.3, cc.v2(0, 0)),
					i = cc.moveTo(.3, cc.v2(0, 0)),
					o = cc.callFunc(function () {
						this.circle.active = !0, this.circle.scale = .01;
						var e = cc.scaleTo(.35, 1.5, 1.5),
							t = cc.callFunc(function () {
								this.node.destroy()
							}.bind(this)),
							n = cc.sequence(e, t);
						this.circle.runAction(n), this.t1.destroy(), this.t2.destroy(), this.t3.destroy()
					}.bind(this)),
					s = cc.sequence(i, o);
				this.t1.runAction(t), this.t2.runAction(n), this.t3.runAction(s), this.node.setPosition(e)
			}
		}), cc._RF.pop()
	}, {}],
	LineWeapon: [function (e, t) {
		"use strict";
		cc._RF.push(t, "98726mtQv9D0Z+XQrjC3WW+", "LineWeapon"), cc.Class({
			extends: cc.Component,
			properties: {},
			init: function () {
				this.countBullet2 = 0, this.intervalSecondTime = .08;
				var e = 20 + .1 * parseInt(DataProxy.getWSpeedLevel(DataProxy.wSpeedKey1));
				e > 35 && (e = 35), this.speed = e, console.log("speed:", e), this.schedule(this.generalSecondBullet, this.intervalSecondTime)
			},
			getPlaneScript: function () {
				return this.node.getComponent("Plane")
			},
			generalSecondBullet: function () {
				this.getPlaneScript().canShoot && this.getPlaneScript().isGame && this.initWeapon2()
			},
			initWeapon2: function () {
				var e = this.node.getPosition(),
					t = GNodePool.getbullet2();
				t.parent = this.node.parent, this.getPlaneScript().bulletArrs.push(t), t.setPosition(e), t.x = this.node.x - 90, this.countBulletType2(t);
				var n = GNodePool.getbullet2();
				n.parent = this.node.parent, this.getPlaneScript().bulletArrs.push(n), n.setPosition(e), n.x = this.node.x + 90, this.countBulletType2(n)
			},
			countBulletType2: function (e) {
				var t = 3;
				this.strengthenFire && (t = 6);
				var n = t;
				this.countBullet2 >= 1 && this.countBullet2 <= 2 ? e.angle += n : this.countBullet2 > 2 && this.countBullet2 <= 3 ? e.angle -= 0 : this.countBullet2 > 3 && this.countBullet2 <= 4 ? e.angle -= n : this.countBullet2 = 0, this.countBullet2++
			},
			onDestroy: function () {
				this.unschedule(this.generalSecondBullet)
			}
		}), cc._RF.pop()
	}, {}],
	Main: [function (e, t) {
		"use strict";
		cc._RF.push(t, "49183cf1oJP07lS95KqsyKs", "Main");
		var n, i = (n = e("Wx")) && n.__esModule ? n : {
			default: n
		};
		cc.Class({
			extends: cc.Component,
			properties: {
				canvas: cc.Node,
				plane: cc.Node,
				enemygeneral: cc.Node,
				title: cc.Node,
				slash: cc.Node,
				gameui: cc.Node,
				gameoverui: cc.Node,
				riviveui: cc.Node,
				levelui: cc.Node,
				weaponPanel: cc.Node,
				coverui: cc.Node,
				bgNode: cc.Node,
				fightNode: cc.Node,
				setting: cc.Node
			},
			onLoad: function () {
				cc.debug.setDisplayStats(!1), i.default.shareGame(), window.GMain = this, this.playTimes = 0, this.coverui.active = !1, this.iphoneXflag = !1, this.systemInfo = Utils.getSystemInfo(), EnemyUtil.init(), DataProxy.init(), MusicManger.init(), Utils.init(), MusicManger.playBmg(), cc.director.getCollisionManager().enabled = !0, this.needMoveCanvas = !0, this.isHome = !0, this.isGame = !1, this.weaponSystemOpen = !1, this.isOnUp = !1, this.isFirstClick = !1, this.isRivived = !1, this.isPressDown = !1, this.handleUI(), this.handleTouch(), this.curLevel = DataProxy.getLevel(), this.planeIn = !1;
				var e = function () {
					this.getData()
				}.bind(this);
				LevelManager.init(e), GmEvent.addListener("GameOver", this.onGameOver, this), GmEvent.addListener("Collect", this.onCollect, this), GmEvent.addListener("switchEarnVersion", this.switchEarnVersion, this), GmEvent.addListener("HitPlane", this.onHitPlane, this), GmEvent.addListener("OnRivive", this.onRivive, this), GmEvent.addListener("OnCancelRivive", this.onCancelRivive, this), GmEvent.addListener("showWeaponPanel", this.showWeaponPanel, this), GmEvent.addListener("OnCancelWzView", this.OnCancelWzView, this), GmEvent.addListener("OnShowWzView", this.OnShowWzView, this), GmEvent.addListener("OnShowEarnView", this.OnShowEarnView, this), native.getTrack(), this.switchEarnVersion()
			},
			handleUI: function () {
				cc.AdNode.hideBanner(), this.runPlane(), this.runTitle(), this.runlevelui(), this.runWeaponui(), Utils.showSetting(this.setting), this.curLevel % 5 == 0 && this.bgNode.getComponent("bgAnim").setRandomColor(), this.gameui.getComponent("GameUI").showTotal()
			},
			getData: function () {
				this.curLevel <= 100 ? (this.gameData = LevelManager.getLevelData(this.curLevel), this.dataobj = LevelManager.getGameInfo(this.gameData)) : this.dataobj = LevelManager.getRandomGameInfo(this.curLevel), this.dataobj.level = this.curLevel, 1 == this.dataobj.type ? this.enemyGeneroName = "EnemyGenerorType1" : 2 == this.dataobj.type ? this.enemyGeneroName = "EnemyGenerorType2" : 3 == this.dataobj.type ? this.enemyGeneroName = "EnemyGenerorType3" : 4 == this.dataobj.type && (this.enemyGeneroName = "EnemyGenerorType4"), null != this.enemyGeneroName && this.enemygeneral.removeComponent(this.enemyGeneroName), console.log("enemyGeneroName", this.enemyGeneroName), this.enemygeneral.addComponent(this.enemyGeneroName), EnemyUtil.currentEnemyType = this.enemyGeneroName, null != EnemyUtil.currentBossType && this.enemygeneral.removeComponent(EnemyUtil.currentBossType), this.levelui.getComponent("LevelUI").init(this.curLevel)
			},
			runlevelui: function () {
				this.levelui.active = !0, this.levelui.opacity = 0, this.levelui.x = 0, this.levelui.y = 100, this.levelui.setScale(1);
				var e = cc.fadeIn(.8);
				this.levelui.runAction(e)
			},
			showRankUI: function () {
				Utils.showPanel("prefab/rank")
			},
			showSetting: function () {
				Utils.showPanel("prefab/settingPanel")
			},
			runWeaponui: function () {
				this.weaponPanel.active = !0;
				var e = -cc.winSize.height / 2 + 90;
				cc.sys.platform == cc.sys.WECHAT_GAME && "iPhone X" == this.systemInfo.model && (this.iphoneXflag ? e = -cc.winSize.height / 2 + 90 : (this.iphoneXflag = !0, e = -590));
				var t = cc.v2(0, e),
					n = cc.moveTo(.8, t).easing(cc.easeElasticOut(1)),
					i = cc.callFunc(function () {
						this.weaponPanel.getComponent("WeaponSystem").loadTip()
					}.bind(this)),
					o = cc.sequence(n, i);
				this.weaponPanel.runAction(o)
			},
			runPlane: function () {
				this.plane.active = !0;
				var e = cc.moveTo(1, cc.v2(0, -cc.winSize.height / 3 + 50)).easing(cc.easeElasticOut(3)),
					t = cc.callFunc(function () {
						if (this.planeIn = !0, !this.isGame && !this.isOnUp) {
							this.slash.active = !0, this.slash.opacity = 0;
							var e = cc.fadeIn(.5);
							this.slash.runAction(e)
						}
					}.bind(this)),
					n = cc.sequence(e, t);
				this.plane.runAction(n)
			},
			runTitle: function () {
				var e = cc.moveTo(.8, cc.v2(0, cc.winSize.height / 4 + 50)).easing(cc.easeElasticOut(1));
				this.title.runAction(e)
			},
			showWeaponPanel: function () {
				this.slash.active = !1, this.weaponSystemOpen = !0, this.flyUp()
			},
			hideWeaponSystem: function () {
				this.slash.active = !0, this.weaponSystemOpen = !1, this.flyDown()
			},
			flyUp: function () {
				if (!this.isOnUp) {
					this.isOnUp = !0;
					var e = cc.moveBy(.5, cc.v2(0, 300)).easing(cc.easeElasticOut(3));
					this.plane.runAction(e)
				}
			},
			flyDown: function () {
				this.isOnUp = !1, GmEvent.dispatcher("hideWeaponPanel");
				var e = cc.moveBy(.5, cc.v2(0, -300)).easing(cc.easeElasticOut(3));
				this.plane.runAction(e)
			},
			handleTouch: function () {
				this.canvas.on(cc.Node.EventType.TOUCH_START, function (e) {
					if (console.log("this.planeIn", this.planeIn, this.isGame), this.planeIn) {
						this.isGame || this.weaponSystemOpen ? this.isGame ? console.log("w0001") : (this.isFirstClick = !0, this.hideWeaponSystem()) : (this.isGame = !0, this.isFirstClick = !1, this.startgame());
						var t = e.getTouches()[0].getLocation();
						this.startPos = this.plane.parent.convertToNodeSpaceAR(t), this.isPressDown = !0, null != this.enemygeneral.getComponent(this.enemyGeneroName) && this.enemygeneral.getComponent(this.enemyGeneroName).resume(), null != EnemyUtil.currentBossType && null != EnemyUtil.currentBossType && null != this.enemygeneral.getComponent(EnemyUtil.currentBossType) && this.enemygeneral.getComponent(EnemyUtil.currentBossType).resume(), this.plane.getComponent("Plane").resume(), this.coverui.active = !1
					}
				}.bind(this)), this.canvas.on(cc.Node.EventType.TOUCH_END, function () {
					if (this.planeIn) {
						var e = cc.rotateTo(.3, 0).easing(cc.easeElasticOut(1));
						this.canvas.runAction(e), this.isPressDown = !1, this.isGame && (null != this.enemygeneral.getComponent(this.enemyGeneroName) && this.enemygeneral.getComponent(this.enemyGeneroName).pause(), null != EnemyUtil.currentBossType && null != EnemyUtil.currentBossType && null != this.enemygeneral.getComponent(EnemyUtil.currentBossType) && this.enemygeneral.getComponent(EnemyUtil.currentBossType).pause(), this.plane.getComponent("Plane").pause(), this.coverui.active = !0)
					}
				}.bind(this)), this.canvas.on(cc.Node.EventType.TOUCH_CANCEL, function () {
					this.isGame && (null != this.enemygeneral.getComponent(this.enemyGeneroName) && this.enemygeneral.getComponent(this.enemyGeneroName).pause(), null != EnemyUtil.currentBossType && null != EnemyUtil.currentBossType && null != this.enemygeneral.getComponent(EnemyUtil.currentBossType) && this.enemygeneral.getComponent(EnemyUtil.currentBossType).pause(), this.plane.getComponent("Plane").pause(), this.coverui.active = !0)
				}.bind(this)), this.canvas.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
					if (this.planeIn) {
						var t = e.getTouches(),
							n = t[0].getLocation();
						if (this.isGame || this.isFirstClick || (this.isGame = !0, this.startgame(), this.startPos = this.plane.parent.convertToNodeSpaceAR(n)), !this.isFirstClick) {
							this.plane.parent.convertToNodeSpaceAR(t[0].getPreviousLocation()), this.moveToPos = this.plane.parent.convertToNodeSpaceAR(n), null == this.startPos && (this.startPos = this.moveToPos);
							var i = this.moveToPos.sub(this.startPos),
								o = this.plane.getPosition().add(i);
							o.x > cc.winSize.width / 2 - 41 && (o.x = cc.winSize.width / 2 - 41), o.x < -cc.winSize.width / 2 + 41 && (o.x = -cc.winSize.width / 2 + 41), o.y > cc.winSize.height / 2 - 66 && (o.y = cc.winSize.height / 2 - 66), o.y < -cc.winSize.height / 2 + 66 && (o.y = -cc.winSize.height / 2 + 66), this.plane.setPosition(o), this.startPos = this.moveToPos
						}
					}
				}.bind(this))
			},
			startgame: function () {
				this.isHome = !1, console.log("start====abab="), cc.AdNode.loadVedio(), this.playTimes++, this.slash.active && (this.slash.active = !1);
				var e = cc.moveTo(.2, cc.v2(0, -cc.winSize.height / 2 - 200)),
					t = cc.callFunc(function () {
						this.weaponPanel.getComponent("WeaponSystem").hideNewWeaponTip(), this.weaponPanel.active = !1
					}.bind(this)),
					n = cc.sequence(e, t);
				this.weaponPanel.runAction(n), Utils.hideSetting(this.setting);
				var i = cc.moveTo(.3, cc.v2(0, cc.winSize.height / 2 + 300)),
					o = cc.callFunc(function () {
						this.isRivived = !1, this.enemygeneral.getComponent(this.enemyGeneroName).init(this.dataobj), this.plane.getComponent("Plane").init(this.curLevel), this.gameui.getComponent("GameUI").init(), this.title.active = !1;
						var e = cc.moveTo(.3, cc.v2(0, cc.winSize.height / 2 - 30)),
							t = cc.scaleTo(.3, .5, .5),
							n = cc.spawn(e, t);
						this.levelui.runAction(n)
					}.bind(this)),
					s = cc.sequence(i, o);
				this.title.runAction(s)
			},
			isCanSplit: function (e) {
				return 4 == e
			},
			onGameOver: function (e) {
				console.log("Gameover======="), this.coverui.active = !1;
				var t = cc.rotateTo(.3, 0).easing(cc.easeElasticOut(1));
				this.canvas.runAction(t), this.isGame = !1, this.planeIn = !1, this.levelui.active = !1, this.gameui.getComponent("GameUI").onGameOver(this.curLevel, e), this.scheduleOnce(function () {
					native.showEarn ? this.OnShowWzView({}, !0) : (this.gameoverui.active = !0, this.gameoverui.getComponent("GameOver").init(this.curLevel)), this.curLevel % 3 == 0 && cc.AdNode.showInterstitialAd()
				}.bind(this), 2), this.plane.getComponent("Plane").onGameover(e), e ? (native.sendEvent("LevelSuccess_success"), this.curLevel++, DataProxy.saveLevel(this.curLevel)) : native.sendEvent("LevelSuccess_show"), this.curLevel % 2 == 0 ? this.needMoveCanvas = !0 : this.needMoveCanvas = !1
			},
			onCollect: function () {
				this.isHome = !0, this.plane.x = 0, this.plane.y = -cc.winSize.height / 2 - 200, this.title.active = !0, null != this.enemygeneral.getComponent(this.enemyGeneroName) && this.enemygeneral.getComponent(this.enemyGeneroName).onGameOver(), null != EnemyUtil.currentBossType && null != EnemyUtil.currentBossType && null != this.enemygeneral.getComponent(EnemyUtil.currentBossType) && this.enemygeneral.getComponent(EnemyUtil.currentBossType).onGameOver(), this.handleUI(), this.getData(), this.switchEarnVersion()
			},
			switchEarnVersion: function () {
				this.isHome && (native.checkShowEarnInGame(), this.gameui.getComponent("GameUI").checkEarnUI())
			},
			onHitPlane: function () {
				this.isGame && !this.isRivived ? (console.log("\u590d\u6d3b====="), this.isRivived = !0, this.isGame = !1, this.planeIn = !1, this.enemygeneral.getComponent(this.enemyGeneroName) && this.enemygeneral.getComponent(this.enemyGeneroName).pause(), null != EnemyUtil.currentBossType && null != EnemyUtil.currentBossType && this.enemygeneral.getComponent(EnemyUtil.currentBossType) && this.enemygeneral.getComponent(EnemyUtil.currentBossType).pause(), this.plane.getComponent("Plane").pause(), this.riviveui.active = !0, this.riviveui.getComponent("Rivive").init(), this.canDead = !1) : this.canDead ? (this.isGame = !1, this.planeIn = !1, this.enemygeneral.getComponent(this.enemyGeneroName) && this.enemygeneral.getComponent(this.enemyGeneroName).pause(), null != EnemyUtil.currentBossType && null != EnemyUtil.currentBossType && this.enemygeneral.getComponent(EnemyUtil.currentBossType) && this.enemygeneral.getComponent(EnemyUtil.currentBossType).pause(), console.log("\u76f4\u63a5\u6b7b\u4ea1"), GmEvent.dispatcher("OnCancelRivive")) : console.log("w0002")
			},
			onRivive: function () {
				console.log("===\u590d\u6d3b------"), this.isGame = !0, this.planeIn = !0, this.enemygeneral.getComponent(this.enemyGeneroName) && this.enemygeneral.getComponent(this.enemyGeneroName).resume(), null != EnemyUtil.currentBossType && null != EnemyUtil.currentBossType && this.enemygeneral.getComponent(EnemyUtil.currentBossType) && this.enemygeneral.getComponent(EnemyUtil.currentBossType).resume(), this.plane.getComponent("Plane").resume(), this.riviveui.active = !1, this.scheduleOnce(function () {
					this.canDead = !0
				}.bind(this), 6)
			},
			onCancelRivive: function () {
				this.riviveui.active = !1, this.plane.getComponent("Plane").bomb(), this.scheduleOnce(function () {
					this.onGameOver(!1)
				}.bind(this), .1)
			},
			OnShowWzView: function (e, t) {
				this.wzviewopening && 1 != t || (this.wzviewopening && t ? console.log("\u7b49\u5f85 \u5173\u95ed wzview \u540e \u518d\u6b21 \u6253\u5f00 ") : (console.log("..........1111"), Utils.showPanel("prefab/ui_getcard_ingame", [e, t]), this.wzviewopening = !0, t || (this.isGame = !1, this.planeIn = !1, this.enemygeneral.getComponent(this.enemyGeneroName) && this.enemygeneral.getComponent(this.enemyGeneroName).pause(), null != EnemyUtil.currentBossType && null != EnemyUtil.currentBossType && this.enemygeneral.getComponent(EnemyUtil.currentBossType) && this.enemygeneral.getComponent(EnemyUtil.currentBossType).pause(), this.plane.getComponent("Plane").pause())))
			},
			OnCancelWzView: function (e) {
				this.wzviewopening = !1, e || (console.log("\u6062\u590d\u6e38\u620f\u3002\u3002"), this.isGame = !0, this.planeIn = !0, this.enemygeneral.getComponent(this.enemyGeneroName) && this.enemygeneral.getComponent(this.enemyGeneroName).resume(), null != EnemyUtil.currentBossType && null != EnemyUtil.currentBossType && this.enemygeneral.getComponent(EnemyUtil.currentBossType) && this.enemygeneral.getComponent(EnemyUtil.currentBossType).resume(), this.plane.getComponent("Plane").resume())
			},
			update: function () { },
			onDestroy: function () {
				GmEvent.removeListener("GameOver", this.onGameOver, this), GmEvent.removeListener("Collect", this.onGameOver, this), GmEvent.removeListener("OnRivive", this.onRivive, this), GmEvent.removeListener("HitPlane", this.onHitPlane, this), GmEvent.removeListener("OnCancelRivive", this.onCancelRivive, this), GmEvent.removeListener("showWeaponPanel", this.showWeaponPanel, this)
			}
		}), cc._RF.pop()
	}, {
		Wx: "Wx"
	}],
	MusicManager: [function (e, t) {
		"use strict";
		cc._RF.push(t, "494b1T9SJ9KWJoGX6BAQToh", "MusicManager");
		var n = {
			init: function () {
				this.isOn = cc.sys.localStorage.getItem("musicKey") || 1
			},
			setMusic: function (e) {
				this.isOn = e, e ? this.playBmg() : this.stopBmg()
			},
			loadMusic: function (e, t, n) {
				var i = this; - 1 != this.isOn && (this.IdObj || (this.IdObj = {}), cc.loader.loadRes(e, cc.AudioClip, function (o, s) {
					if (o) cc.error(o.message || o);
					else {
						var r = cc.audioEngine.play(s, t);
						cc.audioEngine.setVolume(r, n), i.IdObj[e] = r
					}
				}))
			},
			playBmg: function () {
				this.loadMusic("audio/main2", !0, .6)
			},
			playHit: function () {
				1 == this.isOn && this.loadMusic("audio/hit", !0, .5)
			},
			setPlayHit: function (e) {
				1 == this.idOn && cc.audioEngine.setVolume(this.IdObj["audio/hit"], e)
			},
			pauseHit: function () {
				1 == this.isOn && cc.audioEngine.pause(this.IdObj["audio/hit"])
			},
			resumeHit: function () {
				1 == this.isOn && cc.audioEngine.resume(this.IdObj["audio/hit"])
			},
			stopHit: function () {
				1 == this.isOn && cc.audioEngine.stop(this.IdObj["audio/hit"])
			},
			stopBmg: function () {
				cc.audioEngine.stop(this.IdObj["audio/main2"])
			},
			playEp: function (e) {
				if (1 == this.isOn) {
					var t = "audio/ep1";
					1 == e ? t = "audio/ep1" : 2 == e ? t = "audio/ep2" : 3 == e ? t = "audio/ep3" : 4 == e ? t = "audio/ep4" : 5 == e && (t = "audio/ep5"), this.loadMusic(t, !1, .5)
				}
			},
			playProp: function () {
				1 == this.isOn && this.loadMusic("audio/prop1", !1, 1)
			},
			playPowerUp: function () {
				1 == this.isOn && this.loadMusic("audio/powerup", !1, 1)
			},
			playPlaneBomb: function () {
				1 == this.isOn && this.loadMusic("audio/pb", !1, 1)
			},
			playSeek: function () {
				1 == this.isOn && this.loadMusic("audio/seek", !1, .5)
			},
			playlunch: function () {
				1 == this.isOn && this.loadMusic("audio/launch", !1, 1)
			},
			shootlaser: function () {
				1 == this.isOn && this.loadMusic("audio/shoot_laser", !1, .5)
			},
			shootflash: function () {
				1 == this.isOn && this.loadMusic("audio/flashShoot", !1, 1)
			},
			playCoin: function () {
				1 == this.isOn && this.loadMusic("audio/coin", !1, 1)
			}
		};
		window.MusicManger = n, cc._RF.pop()
	}, {}],
	Native: [function (e, t) {
		"use strict";
		cc._RF.push(t, "57563M50DtODopUY7YCQob8", "Native");
		var n = function () {
			function e() {
				this.cbIdx = 0, this.cbs = {}, this.isEarnVersion = !1, this.networks_cfg = "", this.testDevice = "", this.istestDevice = !1, this.network = "", this._gaid = "", this.showEarn = !1;
				var e = this;
				window.js_native_cb = function (t) {
					var n = e.cbs[t];
					if (n) {
						delete e.cbs[t];
						var i = Array.prototype.slice.call(arguments);
						i.splice(0, 1), n.apply(null, i)
					} else cc.log("no func ", t)
				}
			}
			var t = e.prototype;
			return t._newCB = function (e) {
				this.cbIdx++;
				var t = "" + this.cbIdx;
				return this.cbs[t] = e, t
			}, t.call = function () {
				var e = Array.prototype.slice.call(arguments);
				if (cc.sys.os == cc.sys.OS_ANDROID) e.splice(0, 0, "Native");
				else {
					if (cc.sys.os != cc.sys.OS_IOS) return;
					e.splice(0, 0, "Native")
				}
				this.callClz.apply(this, e)
			}, t.callClz = function (e, t) {
				var n = this;
				if (cc.sys.platform == cc.sys.ANDROID) {
					var i = Array.prototype.slice.call(arguments);
					i.splice(0, 2);
					var o = [e, t];
					if (cc.sys.os == cc.sys.OS_ANDROID) {
						if (o[0] = "org/cocos2dx/javascript/" + e, o[2] = "()V", i.length > 0) {
							var s = "";
							i.forEach(function (e) {
								switch (typeof e) {
									case "boolean":
										s += "Z", o.push(e);
										break;
									case "string":
										s += "Ljava/lang/String;", o.push(e);
										break;
									case "number":
										s += "D", o.push(e);
										break;
									case "function":
										s += "Ljava/lang/String;", o.push(n._newCB(e))
								}
							}), o[2] = "(" + s + ")V"
						}
					} else {
						if (cc.sys.os != cc.sys.OS_IOS) return;
						if (i.length > 0) {
							for (var r = 0; r < i.length; r++) {
								var a = i[r];
								"function" == typeof a ? o.push(this._newCB(a)) : o.push(a), t += 0 == r ? ":" : "arg" + r + ":"
							}
							o[1] = t
						}
					}
					return jsb.reflection.callStaticMethod.apply(jsb.reflection, o)
				}
			}, t.nativeCallJs = function (e, t) {
				console.log("native===========", e, t), "videosucc" == e && cc.AdNode.onVideoSucc(!0), "videonotready" == e && cc.AdNode.onVideoSucc(!1), "videoerroe" == e && cc.AdNode.onVideoError(), "videoshow" == e && cc.AdNode.onVideoShowed(), "track" == e && native.trackCb(t), native[e] && native[e](t)
			}, t.sendEvent = function (e) {
				native.callClz("AppActivity", "sendEventVideo", e)
			}, t.getTrack = function () {
				var e = cc.sys.localStorage.getItem("isEarnVersion");
				e && "2" == e ? (this.isEarnVersion = !0, this.saveEarnStatus()) : native.callClz("AppActivity", "getTrack")
			}, t.callabtester = function () {
				console.log("send abtester====");
				var e = new XMLHttpRequest;
				e.onreadystatechange = function () {
					if (4 == e.readyState && e.status >= 200 && e.status < 400) {
						var t = e.responseText,
							n = JSON.parse(t);
						if (console.log(t), n && 1 == n.data) return void native.trackCb("yes")
					}
					cc.AdNode.delayCb(native.callabtester, 4)
				}, e.open("GET", "https://imbi.abtester.net/getclickid1.php", !0), e.setRequestHeader("Access-Control-Allow-Origin", "*"), cc.sys.isNative && e.setRequestHeader("Accept-Encoding", "gzip,deflate"), e.timeout = 2e3, e.send()
			}, t.trackCb = function (e) {
				console.log("track======", e), "empty" == e ? cc.AdNode.delayCb(function () {
					console.log("===\u518d\u6b21\u8bf7\u6c42 track"), native.getTrack()
				}, 2) : "false" == e ? cc.AdNode.delayCb(function () {
					console.log("===\u518d\u6b21\u8bf7\u6c42 track"), native.getTrack()
				}, 2) : (native.network = e, native.checkShowWz())
			}, t.firebaseNetwork = function (e) {
				native.networks_cfg = e, native.checkShowWz()
			}, t.firebaseTestDevice = function (e) {
				this.testDevice = e, native.checkShowWz()
			}, t.gaid = function (e) {
				e && "empty" != e && (this._gaid = e), native.checkShowWz()
			}, t.checkShowWz = function () {
				console.log("native==", "checkShowWz", this.networks_cfg, "nw", this.network), "" != this.network && (this.isEarnVersion = !0, this.saveEarnStatus()), "" != this.testDevice && "" != this._gaid && this.testDevice.indexOf(this._gaid) >= 0 && (this.istestDevice = !0, this.isEarnVersion = !0, this.saveEarnStatus())
			}, t.saveEarnStatus = function () {
				this.isEarnVersion && (console.log("native===== wzversion"), cc.sys.localStorage.setItem("isEarnVersion", "2"), GmEvent.dispatcher("switchEarnVersion"))
			}, t.checkShowEarnInGame = function () {
				this.isEarnVersion && (this.showEarn = !0)
			}, t.openPrivateUrl = function () {
				console.log("===r====="), native.callClz("AppActivity", "openPrivateUrl")
			}, e
		}();
		window.native = new n, cc._RF.pop()
	}, {}],
	NestGenerator: [function (e, t) {
		"use strict";
		cc._RF.push(t, "28a52s4pTdJwod8f86OcLOt", "NestGenerator"), cc.Class({
			extends: cc.Component,
			properties: {},
			onLoad: function () {
				this.map = new HashMap, this.initNest(), GmEvent.addListener("OnGetNest", this.OnGetNest, this)
			},
			initNest: function () {
				for (var e = -399, t = 0; t < 7; t++)
					for (var n = 0; n < 13; n++) {
						e = n % 2 == 0 ? -399 : -340;
						var i = cc.v2(e + 120 * t, 623 - 103 * n);
						this.map.put(t + "," + n, i)
					}
			},
			generalNest: function (e, t) {
				var n = GPool.getnest(),
					i = this.map.get(e + "," + t);
				n.x = i.x, n.y = i.y, n.parent = this.node, n.getComponent("Nest").init(), this.nestArrs.push(n)
			},
			OnGetNest: function () {
				this.nestArrs = [];
				for (var e = NestTypeData.getTypeNest1(), t = 0; t < e.length; t++) {
					this.generalNest(e[t][0], e[t][1]);
					var n = this.nestArrs[t].getPosition();
					this.nestArrs[t].getComponent("SteeredVehicle").initData(n.x, n.y, .5, -Math.PI / 2)
				}
			},
			init: function () { },
			onDestroy: function () {
				GmEvent.removeListener("OnGetNest", this.OnGetNest, this)
			}
		}), cc._RF.pop()
	}, {}],
	NestTypeData: [function (e, t) {
		"use strict";
		var n;
		cc._RF.push(t, "68654iI3mJF8KStuXDAL4Ye", "NestTypeData");
		var i = ((n = {
			getTypeNest1: function () {
				return [
					[2, 0],
					[3, 0],
					[4, 0],
					[5, 0],
					[5, 1],
					[6, 2],
					[5, 3],
					[5, 4],
					[4, 4],
					[3, 4],
					[2, 4],
					[1, 3],
					[1, 2],
					[1, 1],
					[2, 1],
					[3, 1],
					[4, 1],
					[5, 2],
					[4, 3],
					[3, 3],
					[2, 3],
					[2, 2],
					[3, 2],
					[4, 2]
				]
			},
			getLine1: function () {
				return [
					[2, 2],
					[3, 2],
					[4, 2],
					[5, 2]
				]
			},
			getLineDiagonal1: function () {
				return [
					[2, 2],
					[2, 3],
					[3, 4],
					[3, 5]
				]
			},
			getLineDiagonal2: function () {
				return [
					[2, 2],
					[2, 3],
					[3, 4],
					[3, 3],
					[4, 2]
				]
			},
			createTortoise: function () { },
			createGirl: function () {
				var e = new cc.Color(246, 232, 203),
					t = new cc.Color(250, 224, 7),
					n = new cc.Color(0, 0, 0);
				return [
					[0, 0, 3, 1.5, e],
					[-144, 106, 5, .5, t],
					[126, 108, 5, .5, t],
					[-65, 30, 3, .5, n],
					[55, 28, 3, .5, n]
				]
			},
			createAlie: function () {
				var e = new cc.Color(66, 250, 5),
					t = new cc.Color(3, 3, 3);
				return [
					[0, 173, 3, 1.2, e],
					[68, 221, 3, .5, t],
					[-68, 221, 3, .5, t]
				]
			},
			createPotato: function () {
				var e = new cc.Color(194, 160, 70),
					t = new cc.Color(255, 255, 255),
					n = new cc.Color(3, 3, 3);
				return [
					[0, 122, 3, 1.5, e, 2],
					[65, 221, 3, .45, t],
					[-65, 221, 3, .45, t],
					[65, 221, 3, .2, n],
					[-65, 221, 3, .2, n],
					[-137, 152, 4, .1, t, .35]
				]
			},
			createSunFlower: function () {
				for (var e = new cc.Color(183, 110, 55), t = new cc.Color(255, 255, 0), n = new cc.Color(0, 0, 0), i = [
					[0, 0, 3, 1, e]
				], o = 0; o < 15; o++) {
					var s = [146 * Math.cos(o * Math.PI / 7), 146 * Math.sin(o * Math.PI / 7), 3, .5, t];
					i.push(s)
				}
				return i.push([-83, 24, 2, .22, n, .5], [69, 24, 2, .22, n, .5]), i
			},
			createMushRoom1: function () {
				var e = new cc.Color(135, 79, 128);
				return [
					[0, 0, 2, .7, new cc.Color(255, 255, 255), .6],
					[0, 104, 3, 1, e, .8]
				]
			},
			createThreeLeap: function () {
				var e = new cc.Color(170, 253, 137);
				return [
					[0, 0, 3, .8, e],
					[10, 120, 1, .8, e, .8, 60],
					[-100, -69, 1, .8, e, .8, 60],
					[100, -69, 1, .8, e, .8, -60]
				]
			},
			createChilli: function () {
				var e = new cc.Color(255, 0, 0),
					t = new cc.Color(48, 243, 8),
					n = new cc.Color(255, 255, 255),
					i = new cc.Color(0, 0, 0);
				return [
					[0, 0, 1, .8, e, 2],
					[2, 188, 3, 1, t, .3],
					[15, 247, 1, .3, t, .8, 15],
					[-47, 110, 3, .5, n, .5],
					[-25, 103, 3, .2, i, .2],
					[63, 110, 3, .4, n, .4],
					[82, 98, 3, .15, i, .15]
				]
			}
		}).createTortoise = function () {
			var e = new cc.Color(250, 241, 73),
				t = new cc.Color(142, 231, 75);
			return [
				[0, -121, 3, .32, e, .4, 180],
				[-89, 104, 3, .25, e, .35, 143],
				[76, 106, 3, .25, e, .35, -160],
				[-102, -75, 3, .28, e, .35, -160],
				[100, -73, 3, .28, e, .35],
				[0, 129, 1, .15, t, .35],
				[0, 0, 3, 1, t, 1, 180]
			]
		}, n.createPig = function () {
			var e = new cc.Color(129, 187, 40),
				t = new cc.Color(202, 214, 0),
				n = new cc.Color(75, 93, 35),
				i = new cc.Color(255, 255, 255),
				o = new cc.Color(0, 0, 0);
			return [
				[0, 8, 3, .6, t, .5],
				[0, 0, 3, 1.2, e, 1],
				[-33, 3, 3, .1, n, .2],
				[29, 3, 3, .1, n, .2],
				[-86, -5, 3, .3, i, .3],
				[87, -5, 3, .3, i, .3],
				[-96, -3, 3, .1, o, .1],
				[96, -3, 3, .1, o, .1]
			]
		}, n.createGoat = function () {
			var e = new cc.Color(250, 230, 4),
				t = new cc.Color(255, 255, 255);
			return [
				[0, 0, 4, 1, e],
				[-147, 86, 2, .5, t],
				[147, 86, 2, .5, t],
				[-219, 167, 2, .5, t],
				[219, 167, 2, .5, t],
				[-238, 258, 2, .5, t],
				[238, 258, 2, .5, t]
			]
		}, n.createRedDiamond = function () {
			var e = new cc.Color(228, 97, 97),
				t = new cc.Color(255, 255, 255);
			return [
				[0, 0, 3, 1, e],
				[-149, 0, 2, .5, t],
				[149, 0, 2, .5, t],
				[-222, 80, 2, .5, t],
				[222, 80, 2, .5, t],
				[-95, -136, 2, .5, t],
				[-2, -136, 2, .5, t],
				[90, -136, 2, .5, t]
			]
		}, n.createRose = function () {
			var e = EnemyUtil.getColor(2);
			return [
				[0, 0, 3, 1.3, e],
				[0, 0, 4, .8, e],
				[0, 0, 3, .6, e]
			]
		}, n);
		window.NestTypeData = i, cc._RF.pop()
	}, {}],
	PlaneLevelData: [function (e, t) {
		"use strict";
		cc._RF.push(t, "8f7a1hpS3xEE6VnAfQzVzKE", "PlaneLevelData");
		var n = {
			curLevelCoin: 0,
			getSpeedNeedCoins: function (e) {
				return e * e * 68 + 28
			},
			getPowerNeedCoins: function (e) {
				return e * e * 68 + 28
			},
			getCurLevelCoin: function (e) {
				return 100 * e
			},
			coinNumPerEnemy: function (e) {
				var t = this.getCurLevelCoin(DataProxy.getLevel());
				return Math.ceil(t / e)
			},
			getNeedCoinBySpeed: function () {
				var e = DataProxy.getPlaneSpeedLevel();
				return this.getSpeedNeedCoins(e)
			},
			getNeedCoinByPower: function () {
				var e = DataProxy.getPlanePowerLevel();
				return this.getPowerNeedCoins(e)
			}
		};
		window.PlaneLevelData = n, cc._RF.pop()
	}, {}],
	PlaneUI: [function (e, t) {
		"use strict";
		cc._RF.push(t, "1c6d3uhbzRBmbwUMooihUC0", "PlaneUI"), cc.Class({
			extends: cc.Component,
			properties: {
				speedTxt: cc.Label,
				powerTxt: cc.Label,
				speedLevelTxt: cc.Label,
				powerLevelTxt: cc.Label,
				levelUpAnimPrefab: cc.Prefab
			},
			onEnable: function () {
				this.updateValue()
			},
			updateValue: function () {
				this.speedLevelTxt.string = "Fire Rate(x" + DataProxy.getPlaneSpeedLevel() + ")", this.powerLevelTxt.string = "Fire Power(x" + DataProxy.getPlanePowerLevel() + ")", this.speedTxt.string = Utils.formatNumber(this.getNeedCoinBySpeed()), this.powerTxt.string = Utils.formatNumber(this.getNeedCoinByPower())
			},
			getNeedCoinBySpeed: function () {
				var e = DataProxy.getPlaneSpeedLevel();
				return PlaneLevelData.getSpeedNeedCoins(e)
			},
			getNeedCoinByPower: function () {
				var e = DataProxy.getPlanePowerLevel();
				return PlaneLevelData.getPowerNeedCoins(e)
			},
			genlevelUpAnim: function () {
				this.plane = cc.find("Canvas/fightNode/plane1");
				var e = cc.instantiate(this.levelUpAnimPrefab);
				e.parent = this.plane.parent;
				var t = this.plane.getPosition();
				t.y -= 25, e.getComponent("LevelUpAnim").init(t)
			},
			strengthPower: function () {
				var e = PlaneLevelData.getNeedCoinByPower();
				if (DataProxy.getCoins() >= e) {
					var t = DataProxy.getPlanePowerLevel();
					DataProxy.saveCoins(-e), DataProxy.savePlanePowerLevel(parseInt(t) + 1), DataProxy.refreshPowerInfo(), this.updateValue(), this.genlevelUpAnim(), GmEvent.dispatcher("ShowTotalCoinNum")
				} else Utils.alert("Coins is not enough")
			},
			strengthSpeed: function () {
				var e = PlaneLevelData.getNeedCoinBySpeed();
				if (DataProxy.getCoins() >= e) {
					var t = DataProxy.getPlaneSpeedLevel();
					DataProxy.saveCoins(-e), DataProxy.savePlaneSpeedLevel(parseInt(t) + 1), DataProxy.refreshPowerInfo(), this.updateValue(), this.genlevelUpAnim(), GmEvent.dispatcher("ShowTotalCoinNum")
				} else Utils.alert("Coins is not enough")
			}
		}), cc._RF.pop()
	}, {}],
	PlaneWeapon: [function (e, t) {
		"use strict";
		cc._RF.push(t, "3d4f22GVTdKJ7UHo9/Z98Vb", "PlaneWeapon"), cc.Class({
			extends: cc.Component,
			properties: {},
			init: function () {
				this.initPowerLevel(), this.currentAngle = 0, this.currentAngle2 = 60, this.currentAngle3 = 120, this.currentAngle4 = 180, this.currentAngle5 = 240, this.currentAngle6 = 300, this.currentAngle7 = 0, this.currentAngle8 = 60, this.currentAngle9 = 120, this.currentAngle10 = 180, this.currentAngle11 = 240, this.currentAngle12 = 300, this.rotateSpeed = 1, this.rotateSpeed2 = -1, this.schedule(this.generalbullets, this.getPlaneScript().intervalTime)
			},
			initPowerLevel: function (e) {
				this.level = e, this.resetCountBullet(), this.powerLevel = DataProxy.getPlanePowerLevel()
			},
			resetCountBullet: function () {
				this.countBullet1 = 0, this.countBullet2 = 0, this.countBullet3 = 0, this.countBullet4 = 0, this.countBullet5 = 0, this.countBullet6 = 0
			},
			getPlaneScript: function () {
				return this.node.getComponent("Plane")
			},
			generalSinglebullet: function (e, t) {
				var n = GNodePool.getbullet();
				n.parent = this.node.parent, this.getPlaneScript().bulletArrs.push(n);
				var i = this.node.getPosition();
				i.y += 65, i.x += t, this.countBulletType(n, e), n.setPosition(i)
			},
			generalSinglebulletRt: function (e) {
				var t = GNodePool.getbullet();
				t.parent = this.node.parent, this.getPlaneScript().bulletArrs.push(t);
				var n = this.node.getPosition();
				n.y += 65, t.angle = 36 * Math.random() - 18, this.countBulletType(t, e), t.setPosition(n)
			},
			generalBulletRt: function (e) {
				1 == e ? this.generalSinglebulletRt(1, 0) : 2 == e ? (this.generalSinglebulletRt(1, -12), this.generalSinglebulletRt(2, 12)) : 3 == e ? (this.generalSinglebulletRt(1, -24), this.generalSinglebulletRt(2, 0), this.generalSinglebulletRt(3, 24)) : 4 == e ? (this.generalSinglebulletRt(1, -36), this.generalSinglebulletRt(2, -12), this.generalSinglebulletRt(3, 12), this.generalSinglebulletRt(4, 36)) : 5 == e ? (this.generalSinglebulletRt(1, -48), this.generalSinglebulletRt(2, -24), this.generalSinglebulletRt(3, 0), this.generalSinglebulletRt(4, 24), this.generalSinglebulletRt(5, 48)) : 6 == e && (this.generalSinglebulletRt(1, -60), this.generalSinglebulletRt(2, -36), this.generalSinglebulletRt(3, -12), this.generalSinglebulletRt(4, 12), this.generalSinglebulletRt(5, 36), this.generalSinglebulletRt(6, 60))
			},
			generalBullet: function (e) {
				1 == e ? this.generalSinglebullet(1, 0) : 2 == e ? (this.generalSinglebullet(1, -12), this.generalSinglebullet(2, 12)) : 3 == e ? (this.generalSinglebullet(1, -24), this.generalSinglebullet(2, 0), this.generalSinglebullet(3, 24)) : 4 == e ? (this.generalSinglebullet(1, -36), this.generalSinglebullet(2, -12), this.generalSinglebullet(3, 12), this.generalSinglebullet(4, 36)) : 5 == e ? (this.generalSinglebullet(1, -48), this.generalSinglebullet(2, -24), this.generalSinglebullet(3, 0), this.generalSinglebullet(4, 24), this.generalSinglebullet(5, 48)) : 6 == e && (this.generalSinglebullet(1, -60), this.generalSinglebullet(2, -36), this.generalSinglebullet(3, -12), this.generalSinglebullet(4, 12), this.generalSinglebullet(5, 36), this.generalSinglebullet(6, 60))
			},
			generalbullets: function () {
				this.getPlaneScript().canShoot && this.getPlaneScript().isGame && (this.getPlaneScript().strengthenFire ? 0 == this.getPlaneScript().strengType ? this.level >= 60 ? this.generalBullet(6) : this.level >= 40 ? this.generalBullet(5) : this.level >= 20 ? this.generalBullet(4) : this.generalBullet(3) : 1 == this.getPlaneScript().strengType ? (this.handleNormalBullet(), this.generalSinglebulletWeapon(1), this.generalSinglebulletWeapon(2), this.generalSinglebulletWeapon(3), this.generalSinglebulletWeapon(4), this.generalSinglebulletWeapon(5), this.generalSinglebulletWeapon(6), this.level >= 40 && (this.generalSinglebulletWeapon(7), this.generalSinglebulletWeapon(9), this.generalSinglebulletWeapon(11))) : 2 == this.getPlaneScript().strengType && (this.level >= 60 ? this.generalBulletRt(6) : this.level >= 40 ? this.generalBulletRt(5) : this.level >= 20 ? this.generalBulletRt(4) : this.generalBulletRt(3)) : this.handleNormalBullet())
			},
			handleNormalBullet: function () {
				this.powerLevel >= 0 && this.powerLevel < 5 ? this.generalBullet(1) : this.powerLevel >= 5 && this.powerLevel < 10 ? this.generalBullet(2) : this.powerLevel >= 10 && this.powerLevel < 20 ? this.generalBullet(3) : this.powerLevel >= 20 && this.powerLevel < 30 ? this.generalBullet(4) : this.powerLevel >= 30 && this.powerLevel < 40 ? this.generalBullet(5) : this.powerLevel >= 40 && this.generalBullet(6)
			},
			handleBullet1: function (e, t) {
				this.countBullet1 >= 1 && this.countBullet1 <= 2 ? e.angle += t : this.countBullet1 > 2 && this.countBullet1 <= 3 ? e.angle -= 0 : this.countBullet1 > 3 && this.countBullet1 <= 4 ? e.angle -= t : this.countBullet1 = 0, this.countBullet1++
			},
			handleBullet2: function (e, t) {
				this.countBullet2 >= 1 && this.countBullet2 <= 2 ? e.angle += t : this.countBullet2 > 2 && this.countBullet2 <= 3 ? e.angle -= 0 : this.countBullet2 > 3 && this.countBullet2 <= 4 ? e.angle -= t : this.countBullet2 = 0, this.countBullet2++
			},
			handleBullet3: function (e, t) {
				this.countBullet3 >= 1 && this.countBullet3 <= 2 ? e.angle += t : this.countBullet3 > 2 && this.countBullet3 <= 3 ? e.angle -= 0 : this.countBullet3 > 3 && this.countBullet3 <= 4 ? e.angle -= t : this.countBullet3 = 0, this.countBullet3++
			},
			handleBullet4: function (e, t) {
				this.countBullet4 >= 1 && this.countBullet4 <= 2 ? e.angle += t : this.countBullet4 > 2 && this.countBullet4 <= 3 ? e.angle -= 0 : this.countBullet4 > 3 && this.countBullet4 <= 4 ? e.angle -= t : this.countBullet4 = 0, this.countBullet4++
			},
			handleBullet5: function (e, t) {
				this.countBullet5 >= 1 && this.countBullet5 <= 2 ? e.angle += t : this.countBullet5 > 2 && this.countBullet5 <= 3 ? e.angle -= 0 : this.countBullet5 > 3 && this.countBullet5 <= 4 ? e.angle -= t : this.countBullet5 = 0, this.countBullet5++
			},
			handleBullet6: function (e, t) {
				this.countBullet6 >= 1 && this.countBullet6 <= 2 ? e.angle += t : this.countBullet6 > 2 && this.countBullet6 <= 3 ? e.angle -= 0 : this.countBullet6 > 3 && this.countBullet6 <= 4 ? e.angle -= t : this.countBullet6 = 0, this.countBullet6++
			},
			countBulletType: function (e, t) {
				1 == t ? this.handleBullet1(e, 3) : 2 == t ? this.handleBullet2(e, 3) : 3 == t ? this.handleBullet3(e, 3) : 4 == t ? this.handleBullet4(e, 3) : 5 == t ? this.handleBullet5(e, 3) : 6 == t && this.handleBullet6(e, 3)
			},
			generalSinglebulletWeapon: function (e) {
				var t = GNodePool.getbullet();
				t.parent = this.node.parent, this.getPlaneScript().bulletArrs.push(t);
				var n = this.node.getPosition();
				n.y += 15, 1 == e ? t.angle = this.currentAngle : 2 == e ? t.angle = this.currentAngle2 : 3 == e ? t.angle = this.currentAngle3 : 4 == e ? t.angle = this.currentAngle4 : 5 == e ? t.angle = this.currentAngle5 : 6 == e ? t.angle = this.currentAngle6 : 7 == e ? t.angle = this.currentAngle7 : 8 == e ? t.angle = this.currentAngle8 : 9 == e ? t.angle = this.currentAngle9 : 10 == e ? t.angle = this.currentAngle10 : 11 == e ? t.angle = this.currentAngle11 : 12 == e && (t.angle = this.currentAngle12), t.setPosition(n)
			},
			updateAngles: function () {
				this.currentAngle += this.rotateSpeed, this.currentAngle2 += this.rotateSpeed, this.currentAngle3 += this.rotateSpeed, this.currentAngle4 += this.rotateSpeed, this.currentAngle5 += this.rotateSpeed, this.currentAngle6 += this.rotateSpeed, this.currentAngle7 += this.rotateSpeed2, this.currentAngle8 += this.rotateSpeed2, this.currentAngle9 += this.rotateSpeed2, this.currentAngle10 += this.rotateSpeed2, this.currentAngle11 += this.rotateSpeed2, this.currentAngle12 += this.rotateSpeed2
			}
		}), cc._RF.pop()
	}, {}],
	Plane: [function (e, t) {
		"use strict";
		cc._RF.push(t, "63a40Sv5NBI1rAtpiEVSLIw", "Plane"), cc.Class({
			extends: cc.Component,
			properties: {
				flashPrefab: cc.Prefab,
				leftWeapon: cc.Node,
				rightWeapon: cc.Node
			},
			start: function () {
				this.intervalTime = .1, this.bulletArrs = [], this.isGame = !1, this.strengType = 0, this.canShoot = !1, GmEvent.addListener("DeleteBullet", this.onDeleteBullet, this), GmEvent.addListener("CanShoot", this.onCanShoot, this), GmEvent.addListener("EanbleWeapon", this.onEnableWeapon, this), this.node.addComponent("PlaneWeapon").init(), GmEvent.addListener("onChangeWeapon", this.onChangeWeapon, this)
			},
			initWeapon: function () {
				null != this.node.getComponent("LineWeapon") ? this.node.removeComponent("LineWeapon") : null != this.node.getComponent("IceWeapon") ? this.node.removeComponent("IceWeapon") : null != this.node.getComponent("FlashWeapon") ? this.node.removeComponent("FlashWeapon") : null != this.node.getComponent("FireWeapon") && this.node.removeComponent("FireWeapon"), this.isLineWeapon() ? this.node.addComponent("LineWeapon").init() : this.isIceWeapon() ? this.node.addComponent("IceWeapon").init() : this.isFlashWeapon() ? this.node.addComponent("FlashWeapon").init() : this.isFireWeapon() && this.node.addComponent("FireWeapon").init()
			},
			onChangeWeapon: function (e) {
				this.weaponType = e, DataProxy.setCurWeaponType(e), 1 == e ? (GNodePool.clearBullet3(), GNodePool.initBullet2()) : 3 == e && (GNodePool.clearBullet2(), GNodePool.initBullet3()), this.initWeapon()
			},
			isLineWeapon: function () {
				return 1 == this.weaponType
			},
			isFlashWeapon: function () {
				return 2 == this.weaponType
			},
			isIceWeapon: function () {
				return 3 == this.weaponType
			},
			isFireWeapon: function () {
				return 4 == this.weaponType
			},
			isRotateWeapon: function () {
				return 5 == this.weaponType
			},
			onCanShoot: function (e) {
				this.canShoot = e, this.canShoot ? MusicManger.playHit() : MusicManger.pauseHit()
			},
			showWeapon: function () {
				var e = cc.moveTo(.35, cc.v2(-80, -63)),
					t = cc.moveTo(.35, cc.v2(80, -63));
				this.leftWeapon.runAction(e);
				var n = cc.callFunc(function () {
					this.canShoot = !0, MusicManger.playHit(), this.isFlashWeapon() && null != this.node.getComponent("FlashWeapon") && this.node.getComponent("FlashWeapon").setPos()
				}.bind(this)),
					i = cc.sequence(t, n);
				this.rightWeapon.runAction(i)
			},
			hideWeapon: function () {
				var e = cc.moveTo(.35, cc.v2(0, -18)),
					t = cc.moveTo(.35, cc.v2(0, -18));
				this.leftWeapon.runAction(e);
				var n = cc.callFunc(function () { }.bind(this)),
					i = cc.sequence(t, n);
				this.rightWeapon.runAction(i)
			},
			onEnableWeapon: function () { },
			init: function (e) {
				this.clearBullet(), this.weaponType = DataProxy.getCurWeaponType() || 0, this.level = e, this.node.getComponent("PlaneWeapon").initPowerLevel(this.level), this.strengthenFire = !1, this.isGame = !0, 0 == this.weaponType && DataProxy.getLevel() > 1 && (GNodePool.initBullet2(), this.onChangeWeapon(1)), 1 == this.weaponType ? GNodePool.initBullet2() : 3 == this.weaponType && GNodePool.initBullet3(), this.speed = DataProxy.getCurPlaneSpeed(), this.initSpeed = DataProxy.getCurPlaneSpeed(), this.initWeapon(), this.showWeapon()
			},
			onGameover: function (e) {
				this.isFlashWeapon() ? (this.node.getComponent("FlashWeapon").unshowFlashInterval(), this.node.getComponent("FlashWeapon").stopStrongFlash()) : this.isFireWeapon() && this.node.getComponent("FireWeapon") && this.node.getComponent("FireWeapon").destroy(), MusicManger.stopHit(), this.isGame = !1, this.canShoot = !1, this.hideWeapon(), e && this.scheduleOnce(function () {
					this.flyOver()
				}.bind(this), 1.5)
			},
			pause: function () {
				MusicManger.pauseHit(), this.isGame = !1
			},
			resume: function () {
				this.canShoot && MusicManger.resumeHit(), this.isGame = !0
			},
			bomb: function () {
				this.clearBullet(), MusicManger.playPlaneBomb();
				var e = GNodePool.getexplode();
				e.parent = this.node.parent, e.setPosition(this.node.getPosition());
				var t = new cc.Color(133, 251, 255);
				e.getComponent("Explode").init(1, t), this.node.active = !1
			},
			flyOver: function () {
				this.node.stopAllActions();
				var e = cc.moveTo(2, cc.v2(this.node.x, cc.winSize.height / 2 + 200)).easing(cc.easeElasticOut(1));
				this.node.runAction(e)
			},
			onCollisionEnter: function (e) {
				11 == e.tag && (MusicManger.playProp(), GNodePool.putprop(e.node), this.isGame && (this.strengthenWeapon(), GmEvent.dispatcher("OnGetProp")))
			},
			strengthenWeapon: function () {
				MusicManger.playPowerUp(), this.speed = 35, this.intervalTime = .03, this.strengType = Math.floor(3 * Math.random()), this.node.getComponent("PlaneWeapon").resetCountBullet(), this.strengthenFire = !0, MusicManger.setPlayHit(1), this.unschedule(this.cancelStrengthen), this.schedule(this.cancelStrengthen, 6)
			},
			cancelStrengthen: function () {
				this.strengthenFire = !1, this.speed = this.initSpeed, this.intervalTime = .1, MusicManger.setPlayHit(.3), this.unschedule(this.cancelStrengthen)
			},
			update: function () {
				null != this.node.getComponent("PlaneWeapon") && this.node.getComponent("PlaneWeapon").updateAngles();
				for (var e = 0; e < this.bulletArrs.length; e++) {
					var t = this.speed;
					"bullet2" == this.bulletArrs[e].name ? t = this.node.getComponent("LineWeapon").speed : "bullet3" == this.bulletArrs[e].name ? t = this.node.getComponent("IceWeapon").speed : "bullet" == this.bulletArrs[e].name && (t = this.speed), this.bulletArrs[e].y += t * Math.cos(-this.bulletArrs[e].angle * (Math.PI / 180)), this.bulletArrs[e].x += t * Math.sin(-this.bulletArrs[e].angle * (Math.PI / 180)), (this.bulletArrs[e].y >= cc.winSize.height / 2 + 100 || this.bulletArrs[e].y <= -(cc.winSize.height / 2 + 100) || this.bulletArrs[e].x >= cc.winSize.width + 100 || this.bulletArrs[e].x <= 100 - cc.winSize.width) && this.onDeleteBullet(this.bulletArrs[e])
				}
			},
			clearBullet: function () {
				for (var e = 0; e < this.bulletArrs.length; e++) "bullet" == this.bulletArrs[e].name ? GNodePool.putbullet(this.bulletArrs[e]) : "bullet2" == this.bulletArrs[e].name ? GNodePool.putbullet2(this.bulletArrs[e]) : "bullet3" == this.bulletArrs[e].name && GNodePool.putbullet3(this.bulletArrs[e]), this.bulletArrs.splice(e, 1), e--
			},
			onDeleteBullet: function (e) {
				for (var t = 0; t < this.bulletArrs.length; t++)
					if (e._id == this.bulletArrs[t]._id) {
						this.bulletArrs.splice(t, 1), e.angle = 0, "bullet" == e.name ? GNodePool.putbullet(e) : "bullet2" == e.name ? GNodePool.putbullet2(e) : "bullet3" == e.name && GNodePool.putbullet3(e);
						break
					}
			},
			onDestroy: function () {
				this.unschedule(this.cancelStrengthen), GmEvent.removeListener("EanbleWeapon", this.onEnableWeapon, this), GmEvent.removeListener("DeleteBullet", this.onDeleteBullet, this), GmEvent.removeListener("onChangeWeapon", this.onChangeWeapon, this), GmEvent.removeListener("CanShoot", this.onCanShoot, this)
			}
		}), cc._RF.pop()
	}, {}],
	Prop: [function (e, t) {
		"use strict";
		cc._RF.push(t, "01697ISf/VLTphEtLwjB3uk", "Prop"), cc.Class({
			extends: cc.Component,
			properties: {
				bottom: cc.Node
			},
			init: function (e) {
				this.node.getComponent("SteeredVehicle").initData(e.x, e.y, 1 + Math.random(), -Math.PI / 2)
			},
			update: function () {
				this.bottom.angle += 3, this.node.y < -cc.winSize.height / 2 && (GmEvent.dispatcher("OnGetProp"), GNodePool.putprop(this.node))
			}
		}), cc._RF.pop()
	}, {}],
	RankUI: [function (e, t) {
		"use strict";
		cc._RF.push(t, "fe669sWm0VFJrpTUJCwjr21", "RankUI");
		var n, i = (n = e("Wx")) && n.__esModule ? n : {
			default: n
		};
		cc.Class({
			extends: cc.Component,
			properties: {
				bg: cc.Node,
				rankArea: cc.Node
			},
			start: function () {
				this.bg.on(cc.Node.EventType.TOUCH_END, function () {
					this.node.active = !1
				}.bind(this))
			},
			prev: function () {
				this.rankArea.getComponent("SubContextView").pageUp()
			},
			next: function () {
				this.rankArea.getComponent("SubContextView").pageDown()
			},
			shareTitle: function () {
				i.default.shareImg()
			}
		}), cc._RF.pop()
	}, {
		Wx: "Wx"
	}],
	Rivive: [function (e, t) {
		"use strict";
		cc._RF.push(t, "848c1NMkZdLTKO5p38O2c7B", "Rivive"), cc.Class({
			extends: cc.Component,
			properties: {
				countTxt: cc.Label
			},
			init: function () {
				this.count = 5, this.countTxt.string = this.count, this.schedule(this.countTime, 1), GmEvent.addListener("watchType", this.onWatchType, this), GmEvent.addListener("vedioError", this.onVedioError, this)
			},
			countTime: function () {
				this.count <= 1 && (this.unschedule(this.countTime), GmEvent.dispatcher("OnCancelRivive"), cc.AdNode.showNativeAd()), this.count--, this.countTxt.string = this.count
			},
			onWatchType: function (e) {
				1 == e && this.node.active && GmEvent.dispatcher("OnRivive")
			},
			toRivive: function () {
				cc.AdNode.showVedio(1, "relife"), this.unschedule(this.countTime)
			},
			onVedioError: function (e) {
				1 == e && (this.unschedule(this.countTime), GmEvent.dispatcher("OnCancelRivive"))
			}
		}), cc._RF.pop()
	}, {}],
	RotateObj: [function (e, t) {
		"use strict";
		cc._RF.push(t, "a3968MgXFtDup5ng091DdyN", "RotateObj"), cc.Class({
			extends: cc.Component,
			properties: {},
			update: function () {
				this.node.angle += 5
			}
		}), cc._RF.pop()
	}, {}],
	RotateWeapon: [function (e, t) {
		"use strict";
		cc._RF.push(t, "35a15BvYs1BK6SOFfU/h9D8", "RotateWeapon"), cc.Class({
			extends: cc.Component,
			properties: {},
			init: function () {
				this.initRotateWeapon()
			},
			getPlaneScript: function () {
				return this.node.getComponent("Plane")
			},
			initRotateWeapon: function () {
				this.rotateWeapon = cc.instantiate(this.getPlaneScript().rotatePrefab), this.rotateWeapon.parent = this.node, this.rotateWeapon.zIndex = -1
			},
			update: function () {
				null != this.rotateWeapon && (this.rotateWeapon.angle -= 8)
			}
		}), cc._RF.pop()
	}, {}],
	SettingUI: [function (e, t) {
		"use strict";
		cc._RF.push(t, "0809bcgC9dIoYLyddLxNvb5", "SettingUI"), cc.Class({
			extends: cc.Component,
			properties: {
				bg: cc.Node,
				musicBg: cc.Node,
				shakeBg: cc.Node,
				musicBtTxt: cc.Label,
				shakeBtTxt: cc.Label,
				music_sign: cc.Node,
				shake_sign: cc.Node,
				btn_private: cc.Label
			},
			onLoad: function () {
				this.bg.on(cc.Node.EventType.TOUCH_END, function () {
					this.node.destroy()
				}.bind(this));
				var e = cc.sys.localStorage.getItem("musicKey");
				null == e || "" == e || null == e || 1 == e ? this.setMusicOn() : this.setMusicOff();
				var t = cc.sys.localStorage.getItem("shakeKey");
				null == t || "" == t || null == t || 1 == t ? this.setShakeOn() : this.setShakeOff()
			},
			setMusicOn: function () {
				this.musicBg.color = new cc.Color(39, 153, 206), this.musicBtTxt.string = "on", this.music_sign.x = 103, this.music_sign.y = 62
			},
			setMusicOff: function () {
				this.musicBg.color = new cc.Color(166, 187, 192), this.musicBtTxt.string = "off", this.music_sign.x = 36, this.music_sign.y = 62
			},
			setShakeOn: function () {
				this.shakeBg.color = new cc.Color(39, 153, 206), this.shakeBtTxt.string = "on", this.shake_sign.x = 103, this.shake_sign.y = -14
			},
			setShakeOff: function () {
				this.shakeBg.color = new cc.Color(166, 187, 192), this.shakeBtTxt.string = "off", this.shake_sign.x = 36, this.shake_sign.y = -14
			},
			handleMusic: function () {
				var e = "musicKey",
					t = cc.sys.localStorage.getItem(e);
				null == t || 1 == t || "" == t || null == t ? (cc.sys.localStorage.setItem(e, -1), this.setMusicOff(), MusicManger.setMusic(!1)) : (cc.sys.localStorage.setItem(e, 1), this.setMusicOn(), MusicManger.setMusic(!0))
			},
			hanldeShake: function () {
				var e = "shakeKey",
					t = cc.sys.localStorage.getItem(e);
				console.log("isOn:", t), null == t || 1 == t || "" == t || null == t ? (cc.sys.localStorage.setItem(e, -1), this.setShakeOff(), Utils.setShake(!1)) : (cc.sys.localStorage.setItem(e, 1), this.setShakeOn(), Utils.setShake(!0))
			},
			handlePrivate: function () {
				console.log("private===="), native.openPrivateUrl()
			}
		}), cc._RF.pop()
	}, {}],
	SteeredVehicle: [function (e, t) {
		"use strict";
		cc._RF.push(t, "b73c9kXCsZF/a+buLLSsy4b", "SteeredVehicle"), cc.Class({
			extends: cc.Component,
			properties: {},
			start: function () { },
			init: function () {
				this.canMove = !0, this.canBonusUp = !1, this.maxSpeed = 15, this.mass = 1, this.edgeBehavior = "bounce", this.pathIndex = 0, this.pathThreshold = 20, this.maxForce = 5, this.arrivalThreshold = 100, this.steeringForce = new Vector2D, this.velocity = new Vector2D, this.iceRange = .5 - .005 * parseInt(DataProxy.getWSpeedLevel(DataProxy.wSpeedKey3)), this.iceRange <= .2 && (this.iceRange = .2), this.halfWidth = 10, null != this.node.getComponent("Enemy") && (this.halfWidth = this.node.getComponent("Enemy").getHalfWidth())
			},
			setSpeed: function (e) {
				this.velocity.setLength(e)
			},
			initData: function (e, t, n, i) {
				this.init(), this.position = new Vector2D(e, t), this.speedLength = n, this.velocity.setLength(n), this.velocity.setAngle(i)
			},
			reduceSpeed: function () {
				this.velocity.setLength(.6 * this.speedLength)
			},
			resetSpeed: function () {
				this.velocity.setLength(this.speedLength)
			},
			setInitRushSpeed: function () {
				this.velocity.setLength(6)
			},
			reduceSpeedByIce: function () {
				this.velocity.setLength(this.speedLength * this.iceRange)
			},
			rushRandom: function () {
				var e = -Math.PI / 2 * Math.random();
				this.velocity.setAngle(e), this.speedLength *= 1.1, this.velocity.setLength(this.speedLength)
			},
			pause: function () {
				this.canMove = !1
			},
			resume: function () {
				this.canMove = !0
			},
			update: function () {
				null != this.steeringForce && this.canMove && (this.steeringForce.truncate(this.maxForce), this.steeringForce = this.steeringForce.divide(this.mass), this.velocity = this.velocity.add(this.steeringForce), this.steeringForce = new Vector2D, this.velocity.truncate(this.maxSpeed), this.position = this.position.add(this.velocity), "wrap" == this.edgeBehavior ? this.wrap() : this.bounce(), this.node.x = this.position.x, this.node.y = this.position.y)
			},
			seek: function (e) {
				var t = e.subtract(this.getPosition());
				t.normalize();
				var n = (t = t.multiply(this.getMaxSpeed())).subtract(this.velocity);
				this.steeringForce = this.steeringForce.add(n)
			},
			arrive: function (e, t) {
				var n = e.subtract(this.getPosition());
				n.normalize();
				var i = this.getPosition().dist(e);
				i > this.getArriveThreshold() ? n = n.multiply(this.getMaxSpeed()) : (null != t && t(), n = n.multiply(this.getMaxSpeed() * i / this.getArriveThreshold()));
				var o = n.subtract(this.velocity);
				this.steeringForce = this.steeringForce.add(o)
			},
			followPath: function (e, t) {
				var n = e[this.pathIndex];
				null != n && (this.getPosition().dist(n) < this.pathThreshold && (this.pathIndex >= e.length - 1 ? t && (this.pathIndex = 0) : this.pathIndex++), this.pathIndex >= e.length - 1 && !t ? this.arrive(n) : this.seek(n))
			},
			setMaxForce: function (e) {
				this.maxForce = e
			},
			getMaxForce: function () {
				return this.maxForce
			},
			setArriveThreshold: function (e) {
				this.arrivalThreshold = e
			},
			getArriveThreshold: function () {
				return this.arrivalThreshold
			},
			bounce: function () {
				this.position.x > cc.winSize.width / 2 - this.halfWidth ? (this.position.x = cc.winSize.width / 2 - this.halfWidth, this.velocity.x *= -1) : this.position.x < -cc.winSize.width / 2 + this.halfWidth && (this.position.x = -cc.winSize.width / 2 + this.halfWidth, this.velocity.x *= -1), this.position.y > cc.winSize.height / 2 - this.halfWidth ? this.canBonusUp && (this.position.y = cc.winSize.height / 2 - this.halfWidth, this.velocity.y *= -1) : this.position.y < -cc.winSize.height / 2 - this.halfWidth && (this.position.y = cc.winSize.height / 2 + this.halfWidth + 100, this.canBonusUp = !1)
			},
			setEdgeBehavior: function (e) {
				this.edgeBehavior = e
			},
			getEdgeBehavior: function () {
				return this.edgeBehavior
			},
			setMass: function (e) {
				this.mass = e
			},
			setMaxSpeed: function (e) {
				this.maxSpeed = e
			},
			getMaxSpeed: function () {
				return this.maxSpeed
			},
			setPosition: function (e) {
				this.position = e, this.node.x = this.position.x, this.node.y = this.position.y
			},
			getPosition: function () {
				return this.position
			},
			getMass: function () {
				return this.mass
			},
			setVelocity: function (e) {
				this.velocity = e
			},
			getVelocity: function () {
				return this.velocity
			},
			setX: function (e) {
				this.position.x = e
			},
			setY: function (e) {
				this.position.y = e
			},
			wrap: function () { }
		}), cc._RF.pop()
	}, {}],
	SubContextView: [function (e, t, n) {
		"use strict";
		cc._RF.push(t, "509d30vxLxJRKL6KKZdqry4", "SubContextView"), Object.defineProperty(n, "__esModule", {
			value: !0
		}), n.SubContextView = void 0;
		var i, o = cc._decorator.ccclass,
			s = e("Wx"),
			r = cc._decorator.property;
		(function (e) {
			e[e.NONE = 0] = "NONE", e[e.WEEK = 1] = "WEEK", e[e.MONTH = 2] = "MONTH"
		})(i || (i = {}));
		var a = function (e) {
			function t() {
				var t = null !== e && e.apply(this, arguments) || this;
				return t.sprite = null, t.texture = new cc.Texture2D, t.viewName = "", t.key = "", t.sortKey = "", t.dateFilter = i.NONE, t
			}
			return __extends(t, e), t.prototype.onLoad = function () {
				this.sprite = this.getComponent(cc.Sprite), this.sprite || (this.sprite = this.addComponent(cc.Sprite))
			}, t.prototype.start = function () { }, t.prototype.onEnable = function () {
				if (s.default.isWeChatEnv())
					if (this.viewName.length <= 0 || this.key.length <= 0) console.error("SubContextView \u672a\u8bbe\u7f6e\u5b50\u57dfviewName \u548ckey ,\u65e0\u6cd5\u663e\u793a\u5b50\u57df");
					else {
						var e = s.default.getShareCanvas();
						e.width = this.node.width, e.height = this.node.height, s.default.sendMsgToContext("action_init_context", {
							view: this.viewName,
							bound: this.node.getContentSize()
						}), this.updateView(), this.setPage(0)
					}
			}, t.prototype.onDisable = function () { }, t.prototype.updateView = function () {
				s.default.sendMsgToContext(this.viewName, {
					sortKey: this.sortKey,
					key: this.key,
					dateFilter: this.dateFilter
				})
			}, t.prototype.setPage = function (e) {
				s.default.sendMsgToContext("action_paging", {
					page: e,
					view: this.viewName
				})
			}, t.prototype.pageUp = function () {
				s.default.sendMsgToContext("action_paging", {
					offset: -1,
					view: this.viewName
				})
			}, t.prototype.pageDown = function () {
				s.default.sendMsgToContext("action_paging", {
					offset: 1,
					view: this.viewName
				})
			}, t.prototype.lateUpdate = function () {
				this.render()
			}, t.prototype.render = function () {
				if (s.default.isWeChatEnv()) {
					var e = s.default.getShareCanvas();
					this.texture.initWithElement(e), this.texture.handleLoadedTexture(), this.sprite.spriteFrame ? this.sprite.spriteFrame.setTexture(this.texture) : this.sprite.spriteFrame = new cc.SpriteFrame(this.texture)
				}
			}, __decorate([r], t.prototype, "viewName", void 0), __decorate([r], t.prototype, "key", void 0), __decorate([r], t.prototype, "sortKey", void 0), __decorate([r({
				type: cc.Enum(i),
				serializable: !0,
				displayName: "\u8fc7\u6ee4\u65b9\u5f0f",
				tooltip: "\u6307\u5b9a\u6392\u884c\u6570\u636e\u662f\u5426\u6309\u5468/\u6708\u8fdb\u884c\u8fc7\u6ee4,\u4ec5\u663e\u793a\u672c\u5468/\u6708\u7684\u6570\u636e."
			})], t.prototype, "dateFilter", void 0), __decorate([o], t)
		}(cc.Component);
		n.SubContextView = a, cc._RF.pop()
	}, {
		Wx: "Wx"
	}],
	Test: [function (e, t) {
		"use strict";
		cc._RF.push(t, "8f338k52EJExIj3v/K5Zv6U", "Test"), cc.Class({
			extends: cc.Component,
			properties: {
				enemPrefab: cc.Prefab
			},
			start: function () {
				for (var e = 0; e < 4; e++)
					for (var t = 0; t < 5; t++) {
						var n = cc.instantiate(this.enemPrefab);
						this.node.addChild(n), n.x = 120 * e - 200, n.y = 120 * t - 300, n.setScale(.5)
					}
			}
		}), cc._RF.pop()
	}, {}],
	Title: [function (e, t) {
		"use strict";
		cc._RF.push(t, "658e8lANlNI+ZJKvPsrxeUs", "Title"), cc.Class({
			extends: cc.Component,
			properties: {},
			start: function () { },
			onEnable: function () { }
		}), cc._RF.pop()
	}, {}],
	UpTip: [function (e, t) {
		"use strict";
		cc._RF.push(t, "c1fcbC2kOtKNYcPm8XJCilA", "UpTip"), cc.Class({
			extends: cc.Component,
			properties: {},
			onLoad: function () {
				var e = cc.moveBy(.35, cc.v2(0, 20)).easing(cc.easeElasticOut(1)),
					t = cc.moveBy(.35, cc.v2(0, -20)).easing(cc.easeElasticOut(1)),
					n = cc.sequence(e, t),
					i = cc.repeatForever(n);
				this.node.runAction(i)
			}
		}), cc._RF.pop()
	}, {}],
	Utils: [function (e, t) {
		"use strict";
		cc._RF.push(t, "f38fe/otBNIiZdWVcdaW7sZ", "Utils");
		var n = {
			init: function () {
				this.isShakeOn = cc.sys.localStorage.getItem("shakeKey")
			},
			setShake: function (e) {
				this.isShakeOn = e
			},
			shakeEffect: function (e, t) {
				e.runAction(cc.repeatForever(cc.sequence(cc.moveTo(.02, cc.v2(5, 7)), cc.moveTo(.02, cc.v2(-6, 7)), cc.moveTo(.02, cc.v2(-13, 3)), cc.moveTo(.02, cc.v2(3, -6)), cc.moveTo(.02, cc.v2(-5, 5)), cc.moveTo(.02, cc.v2(2, -8)), cc.moveTo(.02, cc.v2(-8, -10)), cc.moveTo(.02, cc.v2(3, 10)), cc.moveTo(.02, cc.v2(0, 0))))), setTimeout(function () {
					e.stopAllActions(), e.setPosition(0, 0)
				}, 1e3 * t)
			},
			shake: function () {
				this.shakeEffect(GMain.fightNode, .05), this.shakeEffect(GMain.bgNode, .05)
			},
			vibrateShort: function () {
				cc.sys.platform == cc.sys.WECHAT_GAME && this.isShakeOn && wx.vibrateShort()
			},
			getRowCol: function (e) {
				return e.split(",")
			},
			formatNumber: function (e) {
				var t, n;
				return e >= 1e5 ? 0 == (n = (t = (e / 1e5).toFixed(1)).split("."))[1] ? n[0] + "M" : t + "M" : e >= 1e3 ? 0 == (n = (t = (e / 1e3).toFixed(1)).split("."))[1] ? n[0] + "K" : t + "K" : e
			},
			alert: function (e) {
				cc.loader.loadRes("prefab/alert", function (t, n) {
					var i = cc.instantiate(n);
					i.getComponent("Alert").init(e), i.x = cc.winSize.width / 2, i.y = cc.winSize.height / 2, cc.director.getScene().addChild(i)
				})
			},
			showWarn: function (e) {
				cc.loader.loadRes("prefab/warnning", function (t, n) {
					var i = cc.instantiate(n);
					i.getComponent("Warnning").init(e), i.x = cc.winSize.width / 2, i.y = cc.winSize.height, cc.director.getScene().addChild(i);
					var o = cc.moveBy(.8, cc.v2(0, -350)).easing(cc.easeElasticOut(1));
					i.runAction(o)
				})
			},
			getPanelArgs: function (e) {
				return this.panelarg ? this.panelarg[e] : null
			},
			showPanel: function (e, t) {
				null == this.panelarg && (this.panelarg = {}), this.panelarg[e] = t, cc.loader.loadRes(e, function (e, t) {
					var n = cc.instantiate(t);
					n.x = cc.winSize.width / 2, n.y = cc.winSize.height / 2, cc.director.getScene().addChild(n)
				})
			},
			getSystemInfo: function () {
				if (null != this.systemInfo) return this.systemInfo;
				if (cc.sys.platform == cc.sys.WECHAT_GAME) try {
					return this.systemInfo = wx.getSystemInfoSync(), console.log("\u8bbe\u5907\u578b\u53f7:", this.systemInfo), this.systemInfo
				} catch (e) { }
				return null
			},
			hideSetting: function (e) {
				var t = cc.v2(20, 0),
					n = cc.v2(-220, 0);
				this.hideNode(e, t, n)
			},
			showSetting: function (e) {
				var t = cc.v2(200, 0);
				this.showNode(e, t)
			},
			hideRank: function (e) {
				var t = cc.v2(-20, 0),
					n = cc.v2(220, 0);
				this.hideNode(e, t, n)
			},
			showRank: function (e) {
				var t = cc.v2(-200, 0);
				this.showNode(e, t)
			},
			hideNode: function (e, t, n) {
				if (null != e) {
					var i = cc.moveBy(.3, t).easing(cc.easeElasticOut(1)),
						o = cc.moveBy(.8, n).easing(cc.easeElasticOut(1)),
						s = cc.callFunc(function () {
							e.active = !1
						}),
						r = cc.sequence(i, o, s);
					e.runAction(r)
				}
			},
			showNode: function (e, t) {
				if (null != e) {
					e.active = !0;
					var n = cc.moveBy(.8, t).easing(cc.easeElasticOut(1));
					e.runAction(n)
				}
			},
			countRange: function () {
				var e = 1;
				return Math.random() > .9 && (e = 1 + 2 * Math.random()), e
			},
			countRange2: function () {
				var e = 1;
				return Math.random() > .9 && (e = 1 + 3 * Math.random()), e
			}
		};
		window.Utils = n, cc._RF.pop()
	}, {}],
	Vector2D: [function (e, t) {
		"use strict";
		cc._RF.push(t, "9fb08Pq6T9PV7Dq7b7hcGFp", "Vector2D");
		var n = cc.Class({
			ctor: function (e, t) {
				this.x = e || 0, this.y = t || 0
			},
			clone: function () {
				return new n(this.x, this.y)
			},
			zero: function () {
				return this.x = 0, this.y = 0, this
			},
			isZero: function () {
				return 0 == this.x && 0 == this.y
			},
			setLength: function (e) {
				var t = this.getAngle();
				this.x = Math.cos(t) * e, this.y = Math.sin(t) * e
			},
			getLength: function () {
				return Math.sqrt(this.x * this.x + this.y * this.y)
			},
			setAngle: function (e) {
				var t = this.getLength();
				this.x = Math.cos(e) * t, this.y = Math.sin(e) * t
			},
			getAngle: function () {
				return Math.atan2(this.y, this.x)
			},
			normalize: function () {
				if (0 == this.getLength()) return this.x = 1, this;
				var e = this.getLength();
				return this.x /= e, this.y /= e, this
			},
			truncate: function (e) {
				return this.setLength(Math.min(e, this.getLength())), this
			},
			reverse: function () {
				return this.x = -this.x, this.y = -this.y, this
			},
			isNormalized: function () {
				return 1 == this.getLength()
			},
			dotProd: function (e) {
				return this.x * e.x + this.y * e.y
			},
			crossProd: function (e) {
				return this.x * e.y - this.y * e.y
			},
			angleBetween: function (e, t) {
				return e.isNormalized() || (e = e.clone().normalize()), t.isNormalized() || (t = t.clone().normalize()), Math.acos(e.dotProd(t))
			},
			sign: function (e) {
				return this.getPerp().dotProd(e) < 0 ? -1 : 1
			},
			getPerp: function () {
				return new n(-this.y, this.x)
			},
			dist: function (e) {
				return Math.sqrt(this.distSQ(e))
			},
			distSQ: function (e) {
				var t = e.x - this.x,
					n = e.y - this.y;
				return t * t + n * n
			},
			add: function (e) {
				return new n(this.x + e.x, this.y + e.y)
			},
			subtract: function (e) {
				return new n(this.x - e.x, this.y - e.y)
			},
			multiply: function (e) {
				return new n(this.x * e, this.y * e)
			},
			divide: function (e) {
				return new n(this.x / e, this.y / e)
			},
			equals: function (e) {
				return this.x == e.x && this.y == e.y
			},
			toString: function () {
				return "[Vector2D (x:" + this.x + ", y:" + this.y + ")]"
			}
		});
		window.Vector2D = n, cc._RF.pop()
	}, {}],
	Warnning: [function (e, t) {
		"use strict";
		cc._RF.push(t, "a5eb2CYZe9FNKycBIB9wOxh", "Warnning");
		var n = ["\u60a8\u7684\u5c0f\u5b9d\u8d1d", "\u60a8\u7684\u8001\u670b\u53cb", "\u60a8\u7684\u597d\u53cb", "\u60a8\u7684\u5feb\u9012", "\u60a8\u7684\u5c0f\u51a4\u5bb6"],
			i = ["\u9a6c\u4e0a\u9a7e\u5230", "\u51c6\u65f6\u6740\u5230", "\u524d\u6765\u62a5\u9053", "\u8bf7\u6ce8\u610f\u67e5\u6536", "\u5df2\u4e0a\u7ebf"];
		cc.Class({
			extends: cc.Component,
			properties: {
				desTxt: cc.Label
			},
			start: function () { },
			init: function () {
				Math.floor(Math.random() * n.length), Math.floor(Math.random() * i.length);
				var e = cc.moveBy(.8, cc.v2(0, 500)).easing(cc.easeElasticOut(1)),
					t = cc.callFunc(function () {
						this.node.destroy()
					}.bind(this)),
					o = cc.sequence(e, t);
				this.scheduleOnce(function () {
					this.node.runAction(o)
				}.bind(this), 3)
			}
		}), cc._RF.pop()
	}, {}],
	WeaponSystem: [function (e, t) {
		"use strict";
		cc._RF.push(t, "cbed4euXVxIUZcaer+SEPjh", "WeaponSystem"), cc.Class({
			extends: cc.Component,
			properties: {
				planePanel: cc.Node,
				weaponPanel: cc.Node,
				nodeTip: cc.Node,
				planeUpIcon: cc.Node,
				weaponUpIcon: cc.Node
			},
			start: function () {
				this.planeUpIcon.active = !1, this.weaponUpIcon.active = !1, this.isCanUpWeapon = !1, this.plane = cc.find("Canvas/fightNode/plane1"), GmEvent.addListener("hideWeaponPanel", this.hideWeaponPanel, this), GmEvent.addListener("onChangeWeapon", this.changeWeapon, this), GmEvent.addListener("UpdateCoinNum", this.upDateCoinNum, this), GmEvent.addListener("ShowTotalCoinNum", this.upDateCoinNum, this)
			},
			changeWeapon: function () {
				this.loadTip()
			},
			upDateCoinNum: function () {
				this.loadTip()
			},
			loadTip: function () {
				this.level = DataProxy.getLevel(), this.isCanUpWeapon = !1;
				var e = PlaneLevelData.getNeedCoinBySpeed();
				DataProxy.getCoins() >= e ? this.planeUpIcon.active = !0 : this.planeUpIcon.active = !1, this.level > 1 && this.level < 5 ? (this.handleTip(1), this.weaponNeedCoin = this.getWeaponCoin(DataProxy.wPowerKey1, 1)) : this.level > 5 && this.level < 10 ? (this.handleTip(5), this.weaponNeedCoin = this.getWeaponCoin(DataProxy.wPowerKey2, 2)) : this.level > 10 && this.level < 15 ? (this.handleTip(10), this.weaponNeedCoin = this.getWeaponCoin(DataProxy.wPowerKey3, 3)) : this.level > 15 && (this.handleTip(15), this.weaponNeedCoin = this.getWeaponCoin(DataProxy.wPowerKey4, 4)), DataProxy.getCoins() >= this.weaponNeedCoin && this.isCanUpWeapon ? this.weaponUpIcon.active = !0 : this.weaponUpIcon.active = !1
			},
			getWeaponCoin: function (e, t) {
				var n = DataProxy.getWPowerLevel(e);
				return WeaponUtil.getNeedCoin(n, t)
			},
			handleTip: function (e) {
				if (this.level > e) {
					this.isCanUpWeapon = !0;
					var t = DataProxy.isLevelTipClick(e);
					null != t && 0 != t && null != t || (this.nodeTip.active = !0)
				}
			},
			hideNewWeaponTip: function () {
				this.nodeTip.active = !1
			},
			hideWeaponPanel: function () {
				this.planePanel.active = !1, this.weaponPanel.active = !1
			},
			showPlanePanel: function () {
				this.weaponPanel.active = !1, this.planePanel.active = !0, GmEvent.dispatcher("showWeaponPanel", 1)
			},
			showWeaponPanel: function () {
				this.planePanel.active = !1, this.weaponPanel.active = !0, this.nodeTip.active = !1;
				var e = 1;
				this.level > 1 && this.level < 5 ? e = 1 : this.level > 5 && this.level < 10 ? e = 5 : this.level > 10 && this.level < 15 ? e = 10 : this.level > 15 && (e = 15), DataProxy.saveLevelTip(e), GmEvent.dispatcher("showWeaponPanel", 2)
			},
			onDestroy: function () {
				GmEvent.removeListener("hideWeaponPanel", this.hideWeaponPanel, this), GmEvent.removeListener("onChangeWeapon", this.changeWeapon, this), GmEvent.removeListener("ShowTotalCoinNum", this.upDateCoinNum, this), GmEvent.removeListener("UpdateCoinNum", this.upDateCoinNum, this)
			}
		}), cc._RF.pop()
	}, {}],
	WeaponUI: [function (e, t) {
		"use strict";
		cc._RF.push(t, "4e84ad6JZ5ORo03eGE6mEhL", "WeaponUI"), cc.Class({
			extends: cc.Component,
			properties: {
				speedTxt: cc.Label,
				powerTxt: cc.Label,
				speedLevelTxt: cc.Label,
				powerLevelTxt: cc.Label,
				spriteFrames: [cc.SpriteFrame],
				backgrounds: [cc.Node],
				weaponItems: [cc.Node],
				tipNodePrefab: cc.Prefab,
				levelUpAnimPrefab: cc.Prefab
			},
			onEnable: function () {
				this.level = DataProxy.getLevel(), this.curWeaponType = DataProxy.getCurWeaponType(), this.tipPos = cc.v2(0, 0);
				var e = 5;
				if (this.level > 15 ? (this.tipPos = cc.v2(130, 260), e = 15) : this.level > 10 ? (this.tipPos = cc.v2(10, 260), e = 10) : this.level > 5 ? (this.tipPos = cc.v2(-110, 260), e = 5) : this.level > 1 && (this.tipPos = cc.v2(-230, 260), e = 1), this.level > 1) {
					var t = DataProxy.isLevelTipClick(e);
					null != t && 0 != t && null != t || (this.tipNode = cc.instantiate(this.tipNodePrefab), this.node.getChildByName("weaponItemNode").addChild(this.tipNode), this.tipNode.setPosition(this.tipPos))
				}
				1 == this.curWeaponType ? this.selectLineWeapon() : 2 == this.curWeaponType ? this.selectFlashWeapon() : 3 == this.curWeaponType ? this.selectIceWeapon() : 4 == this.curWeaponType ? this.selectFireWeapon() : (this.speedKey = DataProxy.wSpeedKey1, this.powerKey = DataProxy.wPowerKey1, this.curWeaponType = 1, this.updateValueByType(DataProxy.wSpeedKey1, DataProxy.wPowerKey1, this.curWeaponType))
			},
			onShowValue: function (e, t) {
				this.speedTxt.string = Utils.formatNumber(e), this.powerTxt.string = Utils.formatNumber(t)
			},
			onShowSpeed: function (e) {
				this.speedTxt.string = Utils.formatNumber(e)
			},
			onShowPower: function (e) {
				this.powerTxt.string = Utils.formatNumber(e)
			},
			updateValueByType: function (e, t, n) {
				this.updateSpeedByType(e, n), this.updatePowerByType(t, n)
			},
			updateSpeedByType: function (e, t) {
				var n = DataProxy.getWSpeedLevel(e),
					i = WeaponUtil.getNeedCoin(n, t);
				this.speedLevelTxt.string = "Fire Rate(x" + n + ")", this.onShowSpeed(i)
			},
			updatePowerByType: function (e, t) {
				var n = DataProxy.getWPowerLevel(e),
					i = WeaponUtil.getNeedCoin(n, t);
				this.powerLevelTxt.string = "Fire Power(x" + n + ")", this.onShowPower(i)
			},
			setBackground: function () {
				for (var e = 0; e < this.backgrounds.length; e++) this.backgrounds[e].getComponent(cc.Sprite).spriteFrame = this.spriteFrames[0];
				this.backgrounds[this.curWeaponType - 1].getComponent(cc.Sprite).spriteFrame = this.spriteFrames[1]
			},
			hideLevelTip: function () {
				null != this.tipNode && (this.tipNode.active = !1)
			},
			selectLineWeapon: function () {
				this.level <= 1 ? Utils.alert("Pass level 1 to unlock") : (this.speedKey = DataProxy.wSpeedKey1, this.powerKey = DataProxy.wPowerKey1, this.curWeaponType = 1, this.updateValueByType(DataProxy.wSpeedKey1, DataProxy.wPowerKey1, this.curWeaponType), GmEvent.dispatcher("onChangeWeapon", 1), this.setBackground(), DataProxy.saveLevelTip(1), this.hideLevelTip(cc.v2(-230, 260)))
			},
			selectFlashWeapon: function () {
				this.level <= 5 ? Utils.alert("Pass level 5 to unlock") : (this.speedKey = DataProxy.wSpeedKey2, this.powerKey = DataProxy.wPowerKey2, this.curWeaponType = 2, this.updateValueByType(DataProxy.wSpeedKey2, DataProxy.wPowerKey2, this.curWeaponType), GmEvent.dispatcher("onChangeWeapon", 2), this.setBackground(), DataProxy.saveLevelTip(5), this.hideLevelTip(cc.v2(10, 260)))
			},
			selectIceWeapon: function () {
				this.level <= 10 ? Utils.alert("Pass level 10 to unlock") : (this.speedKey = DataProxy.wSpeedKey3, this.powerKey = DataProxy.wPowerKey3, this.curWeaponType = 3, this.updateValueByType(DataProxy.wSpeedKey3, DataProxy.wPowerKey3, this.curWeaponType), GmEvent.dispatcher("onChangeWeapon", 3), this.setBackground(), DataProxy.saveLevelTip(10), this.hideLevelTip(cc.v2(-110, 260)))
			},
			selectFireWeapon: function () {
				this.level <= 15 ? Utils.alert("Pass level 15 to unlock") : (this.speedKey = DataProxy.wSpeedKey4, this.powerKey = DataProxy.wPowerKey4, this.curWeaponType = 4, this.updateValueByType(DataProxy.wSpeedKey4, DataProxy.wPowerKey4, this.curWeaponType), GmEvent.dispatcher("onChangeWeapon", 4), this.setBackground(), DataProxy.saveLevelTip(15), this.hideLevelTip(cc.v2(130, 260)))
			},
			genlevelUpAnim: function () {
				this.plane = cc.find("Canvas/fightNode/plane1");
				var e = cc.instantiate(this.levelUpAnimPrefab);
				e.parent = this.plane.parent;
				var t = this.plane.getPosition();
				t.y -= 25, e.getComponent("LevelUpAnim").init(t)
			},
			strengthPower: function () {
				if (this.level <= this.getUnlockLevel()) Utils.alert("Weapon not unlocked");
				else {
					var e, t, n = this.powerKey;
					e = DataProxy.getWPowerLevel(n), t = WeaponUtil.getNeedCoin(e, this.curWeaponType), DataProxy.getCoins() >= t ? (DataProxy.saveCoins(-t), DataProxy.saveWPowerLevel(n, parseInt(e) + 1), DataProxy.refreshPowerInfo(), this.updatePowerByType(n, this.curWeaponType), this.genlevelUpAnim(), GmEvent.dispatcher("ShowTotalCoinNum")) : Utils.alert("Coins is not enough")
				}
			},
			strengthSpeed: function () {
				if (this.level <= this.getUnlockLevel()) Utils.alert("Weapon not unlocked");
				else {
					var e, t, n = this.speedKey;
					e = DataProxy.getWSpeedLevel(n), t = WeaponUtil.getNeedCoin(e, this.curWeaponType), DataProxy.getCoins() >= t ? (DataProxy.saveCoins(-t), DataProxy.saveWSpeedLevel(n, parseInt(e) + 1), DataProxy.refreshPowerInfo(), this.updateSpeedByType(n, this.curWeaponType), this.genlevelUpAnim(), GmEvent.dispatcher("ShowTotalCoinNum")) : Utils.alert("Coins is not enough")
				}
			},
			getUnlockLevel: function () {
				var e = 1;
				return 1 == this.curWeaponType ? e = 1 : 2 == this.curWeaponType ? e = 5 : 3 == this.curWeaponType ? e = 10 : 4 == this.curWeaponType && (e = 15), e
			}
		}), cc._RF.pop()
	}, {}],
	WeaponUtil: [function (e, t) {
		"use strict";
		cc._RF.push(t, "ccd1aYR995MjqzyO0qoyLJK", "WeaponUtil"), window.WeaponUtil = {
			getRatio: function (e) {
				return 1 == e ? 38 : 2 == e ? 58 : 3 == e ? 68 : 4 == e ? 88 : void 0
			},
			getNeedCoin: function (e, t) {
				return e < 15 ? e * e * 60 + 28 : e * e * this.getRatio(t)
			}
		}, cc._RF.pop()
	}, {}],
	Wx: [function (e, t, n) {
		"use strict";
		cc._RF.push(t, "5da51g/7nFP/LVT0y/r3sB7", "Wx"), Object.defineProperty(n, "__esModule", {
			value: !0
		}), n.wx = void 0, n.wx = window.wx || !1;
		var i = function () {
			function e() { }
			return e.isWeChatEnv = function () {
				return !!n.wx
			}, e.updateUserData = function (t, i, o) {
				return e.isWeChatEnv() ? t && i ? new Promise(function (e, s) {
					i.uuid = "" + Math.random(), i.timestamp = cc.sys.now(), o && (i.wxgame = {
						score: i[o],
						update_time: i.timestamp
					}), n.wx.setUserCloudStorage({
						KVDataList: [{
							key: t,
							value: JSON.stringify(i)
						}],
						success: function (t) {
							console.log("\u4e0a\u4f20\u6392\u884c\u699c\u6210\u529f.", t), e(t)
						},
						fail: function (e) {
							console.log("\u4e0a\u4f20\u6392\u884c\u699c\u5931\u8d25.", e), s(e)
						}
					})
				}) : void 0 : Promise.resolve()
			}, e.removeUserData = function () {
				for (var t = [], i = 0; i < arguments.length; i++) t[i] = arguments[i];
				e.isWeChatEnv() && n.wx.removeUserCloudStorage({
					keyList: t,
					success: function () {
						cc.log("\u6e05\u9664\u73a9\u5bb6\u6570\u636e\u6210\u529f.")
					},
					fail: function () {
						cc.log("\u6e05\u9664\u73a9\u5bb6\u6570\u636e\u5931\u8d25.", t)
					}
				})
			}, e.getShareContext = function () {
				return e.isWeChatEnv() ? n.wx.getOpenDataContext() : null
			}, e.getShareCanvas = function () {
				return e.isWeChatEnv() ? n.wx.getOpenDataContext().canvas : null
			}, e.clearSubContext = function () {
				if (e.isWeChatEnv()) {
					var t = n.wx.getOpenDataContext();
					t && (t.width = cc.winSize.width, t.height = cc.winSize.height, cc.log("\u5c4f\u5e55\u5c3a\u5bf8:", cc.winSize))
				}
			}, e.sendMsgToContext = function (e, t) {
				var n = this.getShareContext();
				null != n ? (console.log(e, t), n.postMessage({
					what: e,
					arguments: t
				})) : console.info("\u5fae\u4fe1\u73af\u5883\u5f02\u5e38.\u65e0\u6cd5\u8c03\u7528context.")
			}, e.updateSubContextDrawable = function (t, n) {
				return new Promise(function () {
					t.spriteFrame = e.getSubContextDrawable(n)
				})
			}, e.getSubContextDrawable = function (e) {
				var t = this.getShareCanvas();
				if (t) {
					var n = e;
					return e || (n = this.texture), n.initWithElement(t), n.handleLoadedTexture(), new cc.SpriteFrame(n)
				}
			}, e.clearUserCloudStorage = function (t) {
				e.isWeChatEnv() && n.wx.removeUserCloudStorage({
					keyList: t || [],
					success: function (e) {
						console.warn("\u5df2\u6210\u529f\u6e05\u9664\u5fae\u4fe1\u6258\u7ba1\u6570\u636e", e)
					}
				})
			}, e.shareTitle = function () {
				e.isWeChatEnv() && n.wx.shareAppMessage({
					title: "\u5168\u901f\u5c04\u51fb\uff0c\u706b\u70ed\u5f00\u53d1\uff0c\u901f\u6765!"
				})
			}, e.shareGame = function () {
				e.isWeChatEnv() && (n.wx.showShareMenu({
					withShareTicket: !0
				}), n.wx.onShareAppMessage(function () {
					return {
						title: "\u6025\u901f\u66b4\u723d\u7684\u5c04\u51fb\u6e38\u620f,\u6253\u51fb\u611f\u7206\u68da,\u73a9\u6cd5\u65b0\u9896,\u89e3\u538b\u795e\u6e38",
						imageUrlId: "AgHh_i20RHaY6wRYJ5Z9gw",
						imageUrl: "https://mmocgame.qpic.cn/wechatgame/YQLgwIpCyOSLZ6wQgVL5ClDkHVyItsQOO5hIoxECSEkx066gIgkDlcoMWhXtazXt/0"
					}
				}))
			}, e.shareImg = function () {
				e.isWeChatEnv() && n.wx.shareAppMessage({
					title: "\u6025\u901f\u66b4\u723d\u7684\u5c04\u51fb\u6e38\u620f,\u6253\u51fb\u611f\u7206\u68da,\u73a9\u6cd5\u65b0\u9896,\u89e3\u538b\u795e\u6e38",
					imageUrlId: "AgHh_i20RHaY6wRYJ5Z9gw",
					imageUrl: "https://mmocgame.qpic.cn/wechatgame/YQLgwIpCyOSLZ6wQgVL5ClDkHVyItsQOO5hIoxECSEkx066gIgkDlcoMWhXtazXt/0"
				})
			}, e.texture = new cc.Texture2D, e
		}();
		n.default = i, cc._RF.pop()
	}, {}],
	WzView: [function (e, t) {
		"use strict";
		cc._RF.push(t, "28db6btiPpDGosBG8ELsiH/", "WzView"), cc.Class({
			extends: cc.Component,
			properties: {
				amaIcon: cc.Node,
				ppIcon: cc.Node,
				amaAndPPIcon: cc.Node,
				btnget: cc.Node,
				btngotoboth: cc.Node,
				btngetall: cc.Node,
				btnnothanks: cc.Node,
				btnnothanks_goboth: cc.Node,
				ppPage: cc.Node,
				amaPage: cc.Node,
				bothPage: cc.Node,
				lab_wz_get: cc.Label,
				lab_getboth: cc.Label,
				over: Boolean,
				wzdata: Object,
				tempadtype: String,
				win: cc.Node,
				eff: cc.Node
			},
			onLoad: function () {
				if (this.args = Utils.getPanelArgs("prefab/ui_getcard_ingame"), null != this.args) {
					var e = this.args[0],
						t = this.args[1];
					this.coins = 0, t && (this.coins = EnemyUtil.levelCoin, DataProxy.saveCoins(this.coins)), console.log("data===", this.args), this.over = t, this.win.active = !!t, this.eff.active = !!t, null == e.type && (e.type = "PP"), "PP" == e.type && (this.ppPage.active = !0, this.amaPage.active = !1, this.bothPage.active = !1, this.btnnothanks_goboth.active = !1, this.btngotoboth.active = !0, this.btngotoboth.active = !1), "AMA" == e.type && (this.amaPage.active = !0, this.ppPage.active = !1, this.bothPage.active = !1, this.btnnothanks_goboth.active = !0, this.btngotoboth.active = !1, this.btngotoboth.active = !0), this.lab_wz_get.string = "$" + DataProxy.getCurCarVal(e.type), this.lab_getboth.string = "$" + DataProxy.getCurCarVal("PP"), this.wzdata = e, console.log("wzview    wzdata......", e, t), GmEvent.addListener("watchType", this.onWatchType, this), GmEvent.addListener("vedioError", this.onVedioError, this)
				} else console.log("err=====")
			},
			onADCollect: function () {
				console.log("onADCollect....."), this.tempadtype = "collect", cc.AdNode.showVedio(1, this.wzdata.type)
			},
			onADCollectBoth: function () {
				this.tempadtype = "collectall", cc.AdNode.showVedio(1, "both")
			},
			onADGotoBoth: function () {
				this.tempadtype = "goboth", cc.AdNode.showVedio(1, "goboth")
			},
			onGotoBoth: function () {
				this.bothPage.active = !0, this.btnnothanks = !0, this.amaPage.active = !1, this.ppPage.active = !1, this.btnnothanks_goboth.active = !1, this.btngotoboth.active = !1, this.btnget.active = !1, this.lab_wz_get.string = "$" + (DataProxy.getCurCarVal("PP") + DataProxy.getCurCarVal("AMA"))
			},
			onWatchType: function (e, t) {
				0 != t ? ("collect" == this.tempadtype && ("PP" == this.wzdata.type && DataProxy.savePP(), "AMA" == this.wzdata.type && DataProxy.saveAma(), this.nothank()), "goboth" == this.tempadtype && this.onGotoBoth(), "collectall" == this.tempadtype && (DataProxy.savePP(), DataProxy.saveAma(), this.nothank()), GmEvent.dispatcher("ShowTotalCoinNum")) : this.nothank()
			},
			onVedioError: function () { },
			nothank: function () {
				if (native.sendEvent("nothanks_click"), GmEvent.removeListener("watchType", this.onWatchType, this), GmEvent.removeListener("vedioError", this.onVedioError, this), this.over) {
					if (console.log("over"), !this.isCollected) {
						this.isCollected = !0, this.coinUI = cc.find("Canvas/gameui/coin");
						var e = this.coinUI.getPosition(),
							t = 55;
						if (null != Utils.getSystemInfo() && "iPhone X" == Utils.getSystemInfo().model && (t = 200), this.coins > 0) {
							this.coinPos = cc.v2(e.x, e.y + t);
							for (var n = Math.ceil(5 + 5 * Math.random()), i = Math.ceil(this.coins / n), o = {
								x: 0,
								y: 0
							}, s = 0; s < n; s++) {
								var r = Math.random(),
									a = r > .5 ? 1 : -1,
									h = cc.v2(o.x + 30 * a * r, o.y + 30 * a * r);
								EnemyUtil.generalCoin(this.node, h, this.coinPos, i, 1)
							}
							this.scheduleOnce(function () {
								GmEvent.dispatcher("Collect"), this.closeView()
							}.bind(this), 1.5)
						} else GmEvent.dispatcher("Collect"), this.closeView()
					}
				} else this.closeView();
				cc.AdNode.showInterstitialAd()
			},
			closeView: function () {
				GmEvent.dispatcher("OnCancelWzView", this.over), this.node.destroy()
			}
		}), cc._RF.pop()
	}, {}],
	algo: [function (e, t) {
		"use strict";
		cc._RF.push(t, "2a44eyNtBFJoaVaZcC+/T/h", "algo");
		var n = {
			cipher: function (e, t) {
				for (var i = t.length / 4 - 1, o = [
					[],
					[],
					[],
					[]
				], s = 0; s < 16; s++) o[s % 4][Math.floor(s / 4)] = e[s];
				o = n.addRoundKey(o, t, 0, 4);
				for (var r = 1; r < i; r++) o = n.subBytes(o, 4), o = n.shiftRows(o, 4), o = n.mixColumns(o, 4), o = n.addRoundKey(o, t, r, 4);
				o = n.subBytes(o, 4), o = n.shiftRows(o, 4), o = n.addRoundKey(o, t, i, 4);
				var a = new Array(16);
				for (s = 0; s < 16; s++) a[s] = o[s % 4][Math.floor(s / 4)];
				return a
			},
			keyExpansion: function (e) {
				for (var t = e.length / 4, i = t + 6, o = new Array(4 * (i + 1)), s = new Array(4), r = 0; r < t; r++) {
					var a = [e[4 * r], e[4 * r + 1], e[4 * r + 2], e[4 * r + 3]];
					o[r] = a
				}
				for (r = t; r < 4 * (i + 1); r++) {
					o[r] = new Array(4);
					for (var h = 0; h < 4; h++) s[h] = o[r - 1][h];
					if (r % t == 0)
						for (s = n.subWord(n.rotWord(s)), h = 0; h < 4; h++) s[h] ^= n.rCon[r / t][h];
					else t > 6 && r % t == 4 && (s = n.subWord(s));
					for (h = 0; h < 4; h++) o[r][h] = o[r - t][h] ^ s[h]
				}
				return o
			},
			subBytes: function (e, t) {
				for (var i = 0; i < 4; i++)
					for (var o = 0; o < t; o++) e[i][o] = n.sBox[e[i][o]];
				return e
			},
			shiftRows: function (e, t) {
				for (var n = new Array(4), i = 1; i < 4; i++) {
					for (var o = 0; o < 4; o++) n[o] = e[i][(o + i) % t];
					for (o = 0; o < 4; o++) e[i][o] = n[o]
				}
				return e
			},
			mixColumns: function (e) {
				for (var t = 0; t < 4; t++) {
					for (var n = new Array(4), i = new Array(4), o = 0; o < 4; o++) n[o] = e[o][t], i[o] = 128 & e[o][t] ? e[o][t] << 1 ^ 283 : e[o][t] << 1;
					e[0][t] = i[0] ^ n[1] ^ i[1] ^ n[2] ^ n[3], e[1][t] = n[0] ^ i[1] ^ n[2] ^ i[2] ^ n[3], e[2][t] = n[0] ^ n[1] ^ i[2] ^ n[3] ^ i[3], e[3][t] = n[0] ^ i[0] ^ n[1] ^ n[2] ^ i[3]
				}
				return e
			},
			addRoundKey: function (e, t, n, i) {
				for (var o = 0; o < 4; o++)
					for (var s = 0; s < i; s++) e[o][s] ^= t[4 * n + s][o];
				return e
			},
			subWord: function (e) {
				for (var t = 0; t < 4; t++) e[t] = n.sBox[e[t]];
				return e
			},
			rotWord: function (e) {
				for (var t = e[0], n = 0; n < 3; n++) e[n] = e[n + 1];
				return e[3] = t, e
			},
			sBox: [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22],
			rCon: [
				[0, 0, 0, 0],
				[1, 0, 0, 0],
				[2, 0, 0, 0],
				[4, 0, 0, 0],
				[8, 0, 0, 0],
				[16, 0, 0, 0],
				[32, 0, 0, 0],
				[64, 0, 0, 0],
				[128, 0, 0, 0],
				[27, 0, 0, 0],
				[54, 0, 0, 0]
			]
		};
		void 0 !== t && t.exports && (t.exports = n), "function" == typeof define && define.amd && define([], function () {
			return n
		}), cc._RF.pop()
	}, {}],
	bgAnim: [function (e, t) {
		"use strict";
		cc._RF.push(t, "50bcaaHef5NM4k3trnJhPam", "bgAnim"), cc.Class({
			extends: cc.Component,
			properties: {
				b1: cc.Node,
				s1: cc.Node,
				s2: cc.Node,
				s3: cc.Node,
				s4: cc.Node
			},
			start: function () {
				this.color1 = new cc.Color(13, 180, 167), this.color2 = new cc.Color(13, 120, 180), this.color3 = new cc.Color(177, 177, 39), this.color4 = new cc.Color(202, 16, 150), this.color5 = new cc.Color(180, 13, 86), this.colorArr = [], this.colorArr.push(this.color1, this.color2, this.color3, this.color4, this.color5), this.index = cc.sys.localStorage.getItem("curColor") || 0, this.setBgColor(this.index), this.index++, this.index > 4 && (this.index = 0)
			},
			update: function () {
				this.moveObject(this.s1), this.moveObject(this.s2), this.moveObject(this.s3), this.moveObject(this.s4)
			},
			moveObject: function (e) {
				e.y -= .2, e.y < -cc.winSize.height / 2 - e.width && (e.y = cc.winSize.height / 2 + e.width, e.x = -cc.winSize.width / 2 + Math.random() * cc.winSize.width)
			},
			changeColor: function () { },
			setRandomColor: function () {
				null != this.colorArr && (this.setBgColor(this.index), this.index++, this.index > 4 && (this.index = 0))
			},
			setBgColor: function (e) {
				cc.sys.localStorage.setItem("curColor", e);
				var t = this.colorArr[e],
					n = cc.tintTo(.8, t.r, t.g, t.b),
					i = cc.tintTo(.8, t.r, t.g, t.b),
					o = cc.tintTo(.8, t.r, t.g, t.b),
					s = cc.tintTo(.8, t.r, t.g, t.b),
					r = cc.tintTo(.8, t.r, t.g, t.b);
				this.b1.runAction(n), this.s1.runAction(i), this.s2.runAction(o), this.s3.runAction(s), this.s4.runAction(r)
			}
		}), cc._RF.pop()
	}, {}],
	encryptjs: [function (e, t, n) {
		(function (i) {
			"use strict";
			cc._RF.push(t, "86fb0uxzrVBjpxeTvm8lHlu", "encryptjs"),
				function (e, i) {
					void 0 !== n && void 0 !== t ? t.exports = i() : "function" == typeof define && "object" == typeof define.amd ? define(i) : "function" == typeof define && "object" == typeof define.petal ? define("encryptjs", [], i) : this.encryptjs = i()
				}(0, function (n) {
					if ((n = {
						version: "1.0.0"
					}).init = function () {
						console.log("--------------------Applying Encryption Algorithm------------------ ")
					}, void 0 !== t && t.exports) var o = e("./algo");
					return n.encrypt = function (e, t, n) {
						if (128 != n && 192 != n && 256 != n) return "";
						e = String(e).utf8Encode(), t = String(t).utf8Encode();
						for (var i = n / 8, s = new Array(i), r = 0; r < i; r++) s[r] = isNaN(t.charCodeAt(r)) ? 0 : t.charCodeAt(r);
						var a = o.cipher(s, o.keyExpansion(s));
						a = a.concat(a.slice(0, i - 16));
						var h = new Array(16),
							c = (new Date).getTime(),
							l = c % 1e3,
							u = Math.floor(c / 1e3),
							p = Math.floor(65535 * Math.random());
						for (r = 0; r < 2; r++) h[r] = l >>> 8 * r & 255;
						for (r = 0; r < 2; r++) h[r + 2] = p >>> 8 * r & 255;
						for (r = 0; r < 4; r++) h[r + 4] = u >>> 8 * r & 255;
						var d = "";
						for (r = 0; r < 8; r++) d += String.fromCharCode(h[r]);
						for (var f = o.keyExpansion(a), g = Math.ceil(e.length / 16), m = new Array(g), v = 0; v < g; v++) {
							for (var y = 0; y < 4; y++) h[15 - y] = v >>> 8 * y & 255;
							for (y = 0; y < 4; y++) h[15 - y - 4] = v / 4294967296 >>> 8 * y;
							var w = o.cipher(h, f),
								P = v < g - 1 ? 16 : (e.length - 1) % 16 + 1,
								b = new Array(P);
							for (r = 0; r < P; r++) b[r] = w[r] ^ e.charCodeAt(16 * v + r), b[r] = String.fromCharCode(b[r]);
							m[v] = b.join("")
						}
						var E = d + m.join("");
						return E.base64Encode()
					}, n.decrypt = function (e, t, n) {
						if (128 != n && 192 != n && 256 != n) return "";
						e = String(e).base64Decode(), t = String(t).utf8Encode();
						for (var i = n / 8, s = new Array(i), r = 0; r < i; r++) s[r] = isNaN(t.charCodeAt(r)) ? 0 : t.charCodeAt(r);
						var a = o.cipher(s, o.keyExpansion(s));
						a = a.concat(a.slice(0, i - 16));
						var h = new Array(8),
							c = e.slice(0, 8);
						for (r = 0; r < 8; r++) h[r] = c.charCodeAt(r);
						for (var l = o.keyExpansion(a), u = Math.ceil((e.length - 8) / 16), p = new Array(u), d = 0; d < u; d++) p[d] = e.slice(8 + 16 * d, 24 + 16 * d);
						e = p;
						var f = new Array(e.length);
						for (d = 0; d < u; d++) {
							for (var g = 0; g < 4; g++) h[15 - g] = d >>> 8 * g & 255;
							for (g = 0; g < 4; g++) h[15 - g - 4] = (d + 1) / 4294967296 - 1 >>> 8 * g & 255;
							var m = o.cipher(h, l),
								v = new Array(e[d].length);
							for (r = 0; r < e[d].length; r++) v[r] = m[r] ^ e[d].charCodeAt(r), v[r] = String.fromCharCode(v[r]);
							f[d] = v.join("")
						}
						var y = f.join("");
						return y.utf8Decode()
					}, n.getTextEncryptAndSaveToTextFile = function () {
						throw Error("Command line not supported on this platform")
					}, n.getTextEncryptAndSaveToJSONFile = function () {
						throw Error("Command line not supported on this platform")
					}, n.writeCipherTextToJSON = function (e, t, n, i) {
						null == i && (i = n, n = {});
						var o = "object" == typeof n && null !== n && "spaces" in n ? n.spaces : this.spaces,
							s = "";
						try {
							s = JSON.stringify(t, n ? n.replacer : null, o) + "\n"
						} catch (r) {
							if (i) return i(r, null)
						}
						fs.writeFile(e, s, n, i)
					}, void 0 === String.prototype.utf8Encode && (String.prototype.utf8Encode = function () {
						return unescape(encodeURIComponent(this))
					}), void 0 === String.prototype.utf8Decode && (String.prototype.utf8Decode = function () {
						try {
							return decodeURIComponent(escape(this))
						} catch (e) {
							return this
						}
					}), void 0 === String.prototype.base64Encode && (String.prototype.base64Encode = function () {
						if ("undefined" != typeof btoa) return btoa(this);
						if (void 0 !== i) return new i(this, "utf8").toString("base64");
						throw new Error("No Base64 Encode")
					}), void 0 === String.prototype.base64Decode && (String.prototype.base64Decode = function () {
						if ("undefined" != typeof atob) return atob(this);
						if (void 0 !== i) return new i(this, "base64").toString("utf8");
						throw new Error("No Base64 Decode")
					}), n.init(), n
				}), cc._RF.pop()
		}).call(this, e("buffer").Buffer)
	}, {
		"./algo": "algo",
		buffer: 2
	}],
	use_reversed_rotateTo: [function (e, t) {
		"use strict";
		cc._RF.push(t, "e4e3f0sPAlHZ6nYwIQfkjOh", "use_reversed_rotateTo"), cc.RotateTo._reverse = !0, cc._RF.pop()
	}, {}]
}, {}, ["AdNode", "FBAdManager", "Main", "Native", "Plane", "SubContextView", "Test", "Wx", "GNodePool", "GPool", "GmEvent", "HashMap", "RotateObj", "SteeredVehicle", "Utils", "Vector2D", "algo", "encryptjs", "DataProxy", "PlaneLevelData", "Explode", "HitEffect", "BaseEnemy", "Enemy", "EnemyGenerorBase", "EnemyGenerorType1", "EnemyGenerorType2", "EnemyGenerorType3", "EnemyGenerorType4", "EnemyGenerorTypeBoss3", "EnemyKindGeneror", "EnemyUtil", "NestGenerator", "NestTypeData", "LevelManager", "MusicManager", "Alert", "EarnAddrView", "EarnItem", "EarnView", "GameOver", "GameUI", "LevelUI", "LevelUpAnim", "PlaneUI", "Prop", "RankUI", "Rivive", "SettingUI", "Title", "UpTip", "Warnning", "WeaponSystem", "WeaponUI", "WeaponUtil", "WzView", "bgAnim", "FireWeapon", "FlashWeapon", "FlashWeaponAnim", "IceWeapon", "LineWeapon", "PlaneWeapon", "RotateWeapon", "use_reversed_rotateTo"]);