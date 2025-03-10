"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _paymentModel = _interopRequireDefault(require("../models/paymentModel.js"));
var _bookTourModel = _interopRequireDefault(require("../models/bookTourModel.js"));
var _tourModel = _interopRequireDefault(require("../models/tourModel.js"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _crypto = _interopRequireDefault(require("crypto"));
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
_dotenv["default"].config();
var getAllPayments = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var payments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _paymentModel["default"].find().populate('UserId').populate({
            path: 'BookTourId',
            populate: {
              path: 'TourId'
            }
          });
        case 3:
          payments = _context.sent;
          return _context.abrupt("return", {
            errCode: 0,
            data: payments
          });
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", {
            errCode: 500,
            errMessage: "Database error",
            error: _context.t0.message
          });
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function getAllPayments() {
    return _ref.apply(this, arguments);
  };
}();
var getPaymentById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(paymentId) {
    var payment;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _paymentModel["default"].findById(paymentId).populate('UserId').populate({
            path: 'BookTourId',
            populate: {
              path: 'TourId'
            }
          });
        case 3:
          payment = _context2.sent;
          if (payment) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", {
            errCode: 1,
            errMessage: "Payment not found"
          });
        case 6:
          return _context2.abrupt("return", {
            errCode: 0,
            data: payment
          });
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", {
            errCode: 500,
            errMessage: "Database error",
            error: _context2.t0.message
          });
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function getPaymentById(_x) {
    return _ref2.apply(this, arguments);
  };
}();
var createNewPayment = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data) {
    var BookTourId, UserId, PaymentMethod, PaymentStatus, bookTour, tour, amount, newPayment;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          BookTourId = data.BookTourId, UserId = data.UserId, PaymentMethod = data.PaymentMethod, PaymentStatus = data.PaymentStatus;
          if (!(!BookTourId || !UserId || PaymentStatus === undefined)) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return", {
            errCode: 1,
            errMessage: "Missing required fields"
          });
        case 4:
          _context3.next = 6;
          return _bookTourModel["default"].findById(BookTourId);
        case 6:
          bookTour = _context3.sent;
          if (bookTour) {
            _context3.next = 9;
            break;
          }
          return _context3.abrupt("return", {
            errCode: 2,
            errMessage: "BookTour not found"
          });
        case 9:
          _context3.next = 11;
          return _tourModel["default"].findById(bookTour.TourId);
        case 11:
          tour = _context3.sent;
          if (tour) {
            _context3.next = 14;
            break;
          }
          return _context3.abrupt("return", {
            errCode: 3,
            errMessage: "Tour not found"
          });
        case 14:
          amount = tour.TourPrice;
          newPayment = new _paymentModel["default"]({
            BookTourId: BookTourId,
            UserId: UserId,
            PaymentMethod: PaymentMethod || "Unknown",
            TransactionId: "TXN_".concat(Date.now()),
            Amount: amount,
            PaymentStatus: PaymentStatus
          });
          _context3.next = 18;
          return newPayment.save();
        case 18:
          return _context3.abrupt("return", {
            errCode: 0,
            message: "Payment created successfully!"
          });
        case 21:
          _context3.prev = 21;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", {
            errCode: 500,
            errMessage: "Database error",
            error: _context3.t0.message
          });
        case 24:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 21]]);
  }));
  return function createNewPayment(_x2) {
    return _ref3.apply(this, arguments);
  };
}();
var updatePayment = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data) {
    var payment, bookTour, tour;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          if (data.PaymentId) {
            _context4.next = 3;
            break;
          }
          return _context4.abrupt("return", {
            errCode: 2,
            errMessage: "Missing required parameter"
          });
        case 3:
          _context4.next = 5;
          return _paymentModel["default"].findById(data.PaymentId);
        case 5:
          payment = _context4.sent;
          if (payment) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", {
            errCode: 1,
            errMessage: "Payment not found!"
          });
        case 8:
          if (data.PaymentStatus !== undefined) payment.PaymentStatus = data.PaymentStatus;
          if (!data.updateAmountFromTour) {
            _context4.next = 18;
            break;
          }
          _context4.next = 12;
          return _bookTourModel["default"].findById(payment.BookTourId);
        case 12:
          bookTour = _context4.sent;
          if (!bookTour) {
            _context4.next = 18;
            break;
          }
          _context4.next = 16;
          return _tourModel["default"].findById(bookTour.TourId);
        case 16:
          tour = _context4.sent;
          if (tour) {
            payment.Amount = tour.TourPrice;
          }
        case 18:
          _context4.next = 20;
          return payment.save();
        case 20:
          return _context4.abrupt("return", {
            errCode: 0,
            message: "Payment updated successfully!"
          });
        case 23:
          _context4.prev = 23;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", {
            errCode: 500,
            errMessage: "Database error",
            error: _context4.t0.message
          });
        case 26:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 23]]);
  }));
  return function updatePayment(_x3) {
    return _ref4.apply(this, arguments);
  };
}();
var deletePayment = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(paymentId) {
    var payment;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _paymentModel["default"].findById(paymentId);
        case 3:
          payment = _context5.sent;
          if (payment) {
            _context5.next = 6;
            break;
          }
          return _context5.abrupt("return", {
            errCode: 2,
            errMessage: "Payment does not exist"
          });
        case 6:
          _context5.next = 8;
          return _paymentModel["default"].findByIdAndDelete(paymentId);
        case 8:
          return _context5.abrupt("return", {
            errCode: 0,
            message: "Payment deleted successfully!"
          });
        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", {
            errCode: 500,
            errMessage: "Database error",
            error: _context5.t0.message
          });
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 11]]);
  }));
  return function deletePayment(_x4) {
    return _ref5.apply(this, arguments);
  };
}();
var processMomoPayment = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(UserId, BookTourId) {
    var bookTour, tour, amount, orderId, requestId, partnerCode, accessKey, secretKey, requestType, orderInfo, redirectUrl, ipnUrl, extraData, rawSignature, signature, requestBody, momoResponse, newPayment;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          if (!(!UserId || !BookTourId)) {
            _context6.next = 3;
            break;
          }
          return _context6.abrupt("return", {
            errCode: 1,
            errMessage: "Missing parameters"
          });
        case 3:
          _context6.next = 5;
          return _bookTourModel["default"].findById(BookTourId);
        case 5:
          bookTour = _context6.sent;
          if (bookTour) {
            _context6.next = 8;
            break;
          }
          return _context6.abrupt("return", {
            errCode: 2,
            errMessage: "BookTour not found"
          });
        case 8:
          _context6.next = 10;
          return _tourModel["default"].findById(bookTour.TourId);
        case 10:
          tour = _context6.sent;
          if (tour) {
            _context6.next = 13;
            break;
          }
          return _context6.abrupt("return", {
            errCode: 3,
            errMessage: "Tour not found"
          });
        case 13:
          amount = tour.TourPrice;
          orderId = "ORDERID_".concat(Date.now());
          requestId = "REQUESTID_".concat(Date.now());
          partnerCode = process.env.MOMO_PARTNER_CODE;
          accessKey = process.env.MOMO_ACCESS_KEY;
          secretKey = process.env.MOMO_SECRET_KEY;
          requestType = "captureWallet";
          orderInfo = "Thanh to\xE1n tour ".concat(BookTourId);
          redirectUrl = process.env.MOMO_REDIRECT_URL;
          ipnUrl = process.env.MOMO_IPN_URL;
          extraData = "";
          rawSignature = "accessKey=".concat(accessKey, "&amount=").concat(amount, "&extraData=").concat(extraData, "&ipnUrl=").concat(ipnUrl, "&orderId=").concat(orderId, "&orderInfo=").concat(orderInfo, "&partnerCode=").concat(partnerCode, "&redirectUrl=").concat(redirectUrl, "&requestId=").concat(requestId, "&requestType=").concat(requestType);
          signature = _crypto["default"].createHmac('sha256', secretKey).update(rawSignature).digest('hex');
          requestBody = {
            partnerCode: partnerCode,
            accessKey: accessKey,
            requestId: requestId,
            amount: amount.toString(),
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            extraData: extraData,
            requestType: requestType,
            signature: signature,
            lang: 'vi'
          };
          console.log("Request gửi tới Momo:", requestBody);
          _context6.next = 30;
          return _axios["default"].post(process.env.MOMO_API_URL, requestBody, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        case 30:
          momoResponse = _context6.sent;
          if (!(!momoResponse.data || momoResponse.data.resultCode !== 0)) {
            _context6.next = 33;
            break;
          }
          return _context6.abrupt("return", {
            errCode: -2,
            errMessage: momoResponse.data.message || "Momo payment failed"
          });
        case 33:
          newPayment = new _paymentModel["default"]({
            BookTourId: BookTourId,
            UserId: UserId,
            PaymentMethod: "Momo",
            TransactionId: orderId,
            Amount: amount,
            PaymentStatus: false
          });
          _context6.next = 36;
          return newPayment.save();
        case 36:
          return _context6.abrupt("return", {
            errCode: 0,
            data: momoResponse.data
          });
        case 39:
          _context6.prev = 39;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", {
            errCode: -1,
            errMessage: _context6.t0.message
          });
        case 42:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 39]]);
  }));
  return function processMomoPayment(_x5, _x6) {
    return _ref6.apply(this, arguments);
  };
}();
var updatePaymentStatusByTransactionId = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(transactionId, paymentStatus) {
    var payment;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _paymentModel["default"].findOne({
            TransactionId: transactionId
          });
        case 3:
          payment = _context7.sent;
          if (payment) {
            _context7.next = 6;
            break;
          }
          return _context7.abrupt("return", {
            errCode: 2,
            errMessage: "Payment not found"
          });
        case 6:
          payment.PaymentStatus = paymentStatus;
          _context7.next = 9;
          return payment.save();
        case 9:
          return _context7.abrupt("return", {
            errCode: 0,
            message: "Payment status updated!"
          });
        case 12:
          _context7.prev = 12;
          _context7.t0 = _context7["catch"](0);
          return _context7.abrupt("return", {
            errCode: -1,
            errMessage: _context7.t0.message
          });
        case 15:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 12]]);
  }));
  return function updatePaymentStatusByTransactionId(_x7, _x8) {
    return _ref7.apply(this, arguments);
  };
}();
var getPaymentByTransactionId = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(transactionId) {
    var payment;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _paymentModel["default"].findOne({
            TransactionId: transactionId
          });
        case 3:
          payment = _context8.sent;
          return _context8.abrupt("return", payment || null);
        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          return _context8.abrupt("return", null);
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return function getPaymentByTransactionId(_x9) {
    return _ref8.apply(this, arguments);
  };
}();
var _default = exports["default"] = {
  getAllPayments: getAllPayments,
  getPaymentById: getPaymentById,
  createNewPayment: createNewPayment,
  updatePayment: updatePayment,
  deletePayment: deletePayment,
  processMomoPayment: processMomoPayment,
  updatePaymentStatusByTransactionId: updatePaymentStatusByTransactionId,
  getPaymentByTransactionId: getPaymentByTransactionId
};