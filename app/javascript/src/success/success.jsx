// login.jsx
import React from 'react';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './success.scss';
import Loader from '../loading';

class Success extends React.Component {
  state = {
    username: '',
    booking: {},
    property: {},
    loading: false,
  }

  componentDidMount() {
    fetch(`/api/bookings/${this.props.booking_id}`)
      .then(handleErrors)
      .then(data => {
        console.log(data)
        this.setState({
          booking: data.booking,
          loading: false,
        })
      })

    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        if (data.authenticated) {
          this.setState({ username: data.username })
        }
      })
  }

  render() {
    const { username, booking, loading } = this.state;
    if (loading) {
      return (
        <div className='text-center'>
          <Loader />
        </div>
      );
    };

    const {
      start_date,
      end_date,
      property
    } = booking;


    console.log(property)

    return (
      <Layout username={username}>
        {Object.keys(booking).length > 0 &&
          <div className='container pt-4'>
            <h4 className='mb-1 text-center'>Payment Processing</h4>
            <div className='row'>
              <div className='col-12 success'>
                <div className='property-image mb-1 rounded' style={{ backgroundImage: `url(${property.images[0].image_url})` }} />
                <h2 className='mb-0 text-center'>{property.title}</h2>
                <p className='mb-0 text-center'><small>From: {start_date} To: {end_date}</small></p>
              </div>
            </div>
          </div>
        }
      </Layout>
    )
  }
}


export default Success;