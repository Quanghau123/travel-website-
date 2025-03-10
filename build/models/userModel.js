"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var userSchema = new _mongoose["default"].Schema({
  UserName: {
    type: String,
    required: true
  },
  UserPassword: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Phone: {
    type: String
  },
  Role: {
    type: String,
    "enum": ["admin", "user"],
    "default": "user"
  }
}, {
  versionKey: false,
  timestamps: true
});
var User = _mongoose["default"].model('User', userSchema);
var _default = exports["default"] = User;