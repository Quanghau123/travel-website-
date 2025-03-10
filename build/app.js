"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _web = _interopRequireDefault(require("./routes/web.js"));
var _connectDB = _interopRequireDefault(require("./config/connectDB.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
(0, _web["default"])(app);

// run-Server
var PORT = process.env.PORT || 5000;

// Kết nối MySQL
(0, _connectDB["default"])().then(function () {
  app.listen(PORT, function () {
    console.log("Server ch\u1EA1y tr\xEAn c\u1ED5ng ".concat(PORT));
  });
})["catch"](function (err) {
  console.log("Error occurred with MongoDB connection. Error = ", err);
  process.exit(0);
});