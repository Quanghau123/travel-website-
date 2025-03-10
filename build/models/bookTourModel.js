"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var bookTourSchema = new _mongoose["default"].Schema({
  TourId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Tour',
    required: true
  },
  QuantityAdults: {
    type: Number,
    "default": 0
  },
  QuantityChildren: {
    type: Number,
    "default": 0
  }
}, {
  versionKey: false,
  timestamps: true
});
var BookTour = _mongoose["default"].model('BookTour', bookTourSchema);
var _default = exports["default"] = BookTour;