const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('./../controllers/authController');
// the merge params allows for the the id from the parent param to be passed. In this ex the tourid is requiredd
const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;
