"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = _interopRequireDefault(require("../controllers/userController.js"));
var _tourController = _interopRequireDefault(require("../controllers/tourController.js"));
var _detailController = _interopRequireDefault(require("../controllers/detailController.js"));
var _testController = _interopRequireDefault(require("../controllers/testController.js"));
var _bookTourController = _interopRequireDefault(require("../controllers/bookTourController.js"));
var _paymentController = _interopRequireDefault(require("../controllers/paymentController.js"));
var _auth = _interopRequireDefault(require("../middleware/auth.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var authenticate = _auth["default"].authenticate,
  authorize = _auth["default"].authorize;
var router = _express["default"].Router();
var initWebRoutes = function initWebRoutes(app) {
  router.post('/CreateNewTest', authenticate, authorize(['admin']), _testController["default"].handleCreateNewTest);
  router.get('/GetAllTest', authenticate, authorize(['admin', 'user']), _testController["default"].handleGetAllTests);
  router.put('/UpdateTest', authenticate, authorize(['user']), _testController["default"].handleUpdateTest);
  router["delete"]('/DeleteTest', authenticate, authorize(['admin']), _testController["default"].handleDeleteTest);
  router.post('/Login', _userController["default"].handleLogin);
  router.get('/GetAllUsers', _userController["default"].handleGetAllUsers);
  router.get('/GetUser/:id', _userController["default"].handleGetUserById);
  router.post('/CreateNewUser', _userController["default"].handleCreateNewUser);
  router.put('/UpdateUser', _userController["default"].handleUpdateUser);
  router["delete"]('/DeleteUser/:id', _userController["default"].handleDeleteUser);
  router.get("/ForgotPassword", _userController["default"].forgotPassword);
  router.post("/ResetPassword", _userController["default"].resetPassword);
  router.get('/GetAllTours', _tourController["default"].handleGetAllTours);
  router.get('/GetTour/:id', _tourController["default"].handleGetTourById);
  router.post('/CreateNewTour', _tourController["default"].handleCreateNewTour);
  router.put('/UpdateTour', _tourController["default"].handleUpdateTour);
  router["delete"]('/DeleteTour/:id', _tourController["default"].handleDeleteTour);
  router.get('/SearchTour', _tourController["default"].handleSearchTours);
  router.get('/GetAllDetails', _detailController["default"].handleGetAllDetails);
  router.get('/GetDetail/:id', _detailController["default"].handleGetDetailById);
  router.post('/CreateNewDetail', _detailController["default"].handleCreateNewDetail);
  router.put('/UpdateDetail', _detailController["default"].handleUpdateDetail);
  router["delete"]('/DeleteDetail/:id', _detailController["default"].handleDeleteDetail);
  router.get('/GetAllBooktours', _bookTourController["default"].handleGetAllBookTours);
  router.get('/GetBooktour/:id', _bookTourController["default"].handleGetBookTourById);
  router.post('/CreateNewBooktour', _bookTourController["default"].handleCreateNewBookTour);
  router.put('/UpdateBooktour', _bookTourController["default"].handleUpdateBookTour);
  router["delete"]('/DeleteBooktour/:id', _bookTourController["default"].handleDeleteBookTour);
  router.get('/GetAllPayments', _paymentController["default"].handleGetAllPayments);
  router.get('/GetPayment/:id', _paymentController["default"].handleGetPaymentById);
  router.post('/CreateNewPayment', _paymentController["default"].handleCreateNewPayment);
  router.put('/UpdatePayment', _paymentController["default"].handleUpdatePayment);
  router["delete"]('/DeletePayment/:id', _paymentController["default"].handleDeletePayment);
  router.post("/Payment/Momo", _paymentController["default"].handleProcessMomoPayment);
  router.post('/Payment/Callback', _paymentController["default"].handleMomoIPN);
  return app.use("/", router);
};
var _default = exports["default"] = initWebRoutes;