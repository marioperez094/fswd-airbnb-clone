// property.jsx
import React from 'react';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './user.scss';

class User extends React.Component {
  state = {
    username: this.props.username,
    bookings: {},
    loading: true,
  }

  componentDidMount() {
    fetch(`/api/bookings/${this.props.username}/user`)
      .then(handleErrors)
      .then(data => {
        console.log(data.bookings)
        this.setState({
          bookings: data.bookings,
          loading: false,
        })
      })
  }

  initiateStripeCheckout = (booking_id) => {
    console.log(booking_id)
    return fetch(`/api/charges?booking_id=${booking_id}&cancel_url=${window.location.pathname}`, safeCredentials({
      method: 'POST',
    }))
      .then(handleErrors)
      .then(response => {
        const stripe = Stripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);

        stripe.redirectToCheckout({
          // Make the id field from the Checkout Session creation API response
          // available to this file, so you can provide it as parameter here
          // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
          sessionId: response.charge.checkout_session_id,
        }).then((result) => {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    const { username, bookings, loading } = this.state;
    if (loading) {
      return <p>loading...</p>;
    };

    return (
      <Layout username={username}>
        <div className='container pt-4'>
          <h4 className='mb-1'>Total Bookings: {bookings.length}</h4>
          <div className='row'>
            {bookings.length > 0 
              ? bookings.map(property => {

                return (
                  <div key={property.id} className="col-6 col-lg-4 mb-4 booking">
                    <a className="text-body text-decoration-none">
                      <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.property_image})` }} />
                      <h6 className="mb-0">{property.property_title}</h6>
                      <p className='mb-0'><small>From: {property.start_date} To: {property.end_date}</small></p>
                      {property.is_paid || <button className='btn btn-warning' onClick={() => this.initiateStripeCheckout(property.id)}> Finish booking for ${property.charges[0].amount}0</button>}
                    </a>
                  </div>
                )
              })
              : null
            }
          </div>
        </div>
      </Layout>
    )
  }
}

export default User;