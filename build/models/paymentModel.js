"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var paymentSchema = new _mongoose["default"].Schema({
  BookTourId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'BookTour',
    required: true
  },
  UserId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  PaymentMethod: {
    type: String,
    "default": 'Unknown'
  },
  TransactionId: {
    type: String
  },
  Amount: {
    type: Number,
    "default": 0
  },
  PaymentStatus: {
    type: Boolean,
    "default": false
  }
}, {
  versionKey: false,
  timestamps: true
});
var Payment = _mongoose["default"].model('Payment', paymentSchema);
var _default = exports["default"] = Payment;