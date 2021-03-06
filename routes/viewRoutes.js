const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');

const router = express.Router();

router.get(
  '/',  
  authController.isLoggedIn,
  viewsController.getOverview
);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', viewsController.getSignUpForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-tours', authController.protect, viewsController.getMyTours);
//footer 
router.get('/about', viewsController.getAbout);
router.get('/careers', viewsController.getCareers);
router.get('/contact', viewsController.getContact);
router.get('/guide', viewsController.getGuide);
// router.get('/my-reviews', authController.protect, viewsController.getMyReviews);
// router.get('/settings', authController.protect, viewsController.getMyReviews);
// router.get('/billing', authController.protect, viewsController.getMyReviews);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;

