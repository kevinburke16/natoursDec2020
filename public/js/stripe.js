/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';


export const bookTour = async tourId => {
  const stripe = Stripe('pk_test_KdsL4PT69om6kVNjQlOXerMY00CY0O5AQ9');
  //get checkoutsession from API
  try {
    const session = await axios(
      `/v1/bookings/checkout-session/${tourId}`
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
