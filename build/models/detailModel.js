"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var detailSchema = new _mongoose["default"].Schema({
  TourId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "Tour"
  },
  Des_Enjoy: {
    type: String,
    required: true
  },
  Des_Included: {
    type: String,
    required: true
  },
  Des_Map: {
    type: String
  },
  Des_Itinerary: {
    type: String
  }
}, {
  versionKey: false,
  timestamps: true
});
var Detail = _mongoose["default"].model("Detail", detailSchema);
var _default = exports["default"] = Detail;