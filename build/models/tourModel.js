"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var tourSchema = new _mongoose["default"].Schema({
  TourName: {
    type: String,
    required: true
  },
  CategoryName: {
    type: String
  },
  TourLocation: {
    type: String
  },
  TourTime: {
    type: Number
  },
  TourPrice: {
    type: Number,
    "default": 0
  },
  TourDifficulty: {
    type: String,
    "enum": ['Easy', 'Medium', 'High'],
    "default": 'Easy'
  },
  TourMinAge: {
    type: Number
  },
  DescribeTour: {
    type: String
  }
}, {
  versionKey: false,
  timestamps: true
});
var Tour = _mongoose["default"].model('Tour', tourSchema);
var _default = exports["default"] = Tour;