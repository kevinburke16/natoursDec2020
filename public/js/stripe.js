/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_KdsL4PT69om6kVNjQlOXerMY00CY0O5AQ9');

export const bookTour = async tourId => {
  
  //get checkoutsession from API
  try {
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
    );
    //create checkout form + charge cc
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
