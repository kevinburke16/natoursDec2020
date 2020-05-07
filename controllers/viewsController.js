const Tour = require('../models/tourModel');
const User = require('../models/userModel');
// const Review = require('../models/reviewModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  // get all tour data from
  const tours = await Tour.find();
  //build templates
  //render that template using tour data

  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review user rating'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name', 404));
  }

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};

exports.getSignUpForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Sign up for account'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

// exports.getMyReviews = catchAsync(async (req, res) => {
//   const reviews = await Review.find({ user: req.user.id });

//   const reviewIDs = reviews.map(el => el.review);

//   res.status(200).render('overview', {
//     title: 'Your reviews',
//     reviewIDs
//   });
// });

// exports.mySettings = catchAsync(async (req, res) => {
//   change colour switch to moibile
//
//   res.status(200).render('overview', {
//     title: 'Your reviews',
//     reviewIDs
//   });
// });

// exports.billing = catchAsync(async (req, res) => {
//   form to change credit card information
//
//   res.status(200).render('overview', {
//     title: 'Your reviews',
//     reviewIDs
//   });
// });

exports.getMyTours = catchAsync(async (req, res, next) => {
  //find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // puttin all the tourIds in an array
  const tourIDs = bookings.map(el => el.tour);
  // finding all the Tours based on Id where the id is located in the tourID
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});
