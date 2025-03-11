import express from 'express';
import userController from "@controllers/userController.js";
import tourController from '@controllers/tourController.js';
import detailController from "@controllers/detailController.js";
import testController from "@controllers/testController.js";
import bookTourController from '@controllers/bookTourController.js';
import paymentController from '@controllers/paymentController.js';
import reviewController from '@controllers/reviewController.js';
import auth from "../middleware/auth.js";

const { authenticate, authorize } = auth;

const router = express.Router();

let initWebRoutes = (app) => {
    router.post('/CreateNewTest', authenticate, authorize(['admin']), testController.handleCreateNewTest);
    router.get('/GetAllTest', authenticate, authorize(['admin', 'user']), testController.handleGetAllTests);
    router.put('/UpdateTest', authenticate, authorize(['user']), testController.handleUpdateTest);
    router.delete('/DeleteTest', authenticate, authorize(['admin']), testController.handleDeleteTest);

    router.post('/Login', userController.handleLogin);
    router.get('/GetAllUsers', userController.handleGetAllUsers);
    router.get('/GetUser/:id', userController.handleGetUserById);
    router.post('/CreateNewUser', userController.handleCreateNewUser);
    router.put('/UpdateUser', userController.handleUpdateUser);
    router.delete('/DeleteUser/:id', userController.handleDeleteUser);
    router.get("/ForgotPassword", userController.forgotPassword);
    router.post("/ResetPassword", userController.resetPassword);

    router.get('/GetAllTours', tourController.handleGetAllTours);
    router.get('/GetTour/:id', tourController.handleGetTourById);
    router.post('/CreateNewTour', tourController.handleCreateNewTour);
    router.put('/UpdateTour', tourController.handleUpdateTour);
    router.delete('/DeleteTour/:id', tourController.handleDeleteTour);
    router.get('/SearchTour', tourController.handleSearchTours);
    router.get('/tours-paginated', tourController.handleGetAllToursPaginated);

    router.get('/GetAllDetails', detailController.handleGetAllDetails);
    router.get('/GetDetail/:id', detailController.handleGetDetailById);
    router.post('/CreateNewDetail', detailController.handleCreateNewDetail);
    router.put('/UpdateDetail', detailController.handleUpdateDetail);
    router.delete('/DeleteDetail/:id', detailController.handleDeleteDetail);

    router.get('/GetAllBooktours', bookTourController.handleGetAllBookTours);
    router.get('/GetBooktour/:id', bookTourController.handleGetBookTourById);
    router.post('/CreateNewBooktour', bookTourController.handleCreateNewBookTour);
    router.put('/UpdateBooktour', bookTourController.handleUpdateBookTour);
    router.delete('/DeleteBooktour/:id', bookTourController.handleDeleteBookTour);

    router.get('/GetAllPayments', paymentController.handleGetAllPayments);
    router.get('/GetPayment/:id', paymentController.handleGetPaymentById);
    router.post('/CreateNewPayment', paymentController.handleCreateNewPayment);
    router.put('/UpdatePayment', paymentController.handleUpdatePayment);
    router.delete('/DeletePayment/:id', paymentController.handleDeletePayment);
    router.post("/Payment/Momo", paymentController.handleProcessMomoPayment);
    router.post('/Payment/Callback', paymentController.handleMomoIPN);

    router.get('/GetReviews/:tourId', reviewController.handleGetReviewsByTourId);
    router.post('/CreateNewReview', reviewController.handleCreateReview);
    router.put('/UpdateReview/:id', reviewController.handleUpdateReview);
    router.delete('/DeleteReview/:id', reviewController.handleDeleteReview);

    return app.use("/", router);
};

export default initWebRoutes;
