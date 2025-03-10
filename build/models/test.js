"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var TestSchema = new _mongoose["default"].Schema({
  TestId: {
    type: Number,
    required: true,
    unique: true
  },
  TestName: {
    type: String,
    required: true
  },
  TestAge: {
    type: String
  },
  TestAdd: {
    type: String,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
});
var Test = _mongoose["default"].model("Test", TestSchema);
var _default = exports["default"] = Test;