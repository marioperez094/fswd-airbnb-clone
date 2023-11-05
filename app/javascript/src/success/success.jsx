// login.jsx
import React from 'react';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './success.scss';

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
          property: data.booking.property,
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
    const { loading, booking, property, username } = this.state;
    if (loading) {
      return <p>loading...</p>;
    };

    const {
      id,
      start_date,
      end_date,
      charge,
    } = booking;

    const {
      title,
      image
    } = property;

    console.log(property)

    return (
      <Layout username={username}>
        {booking &&
          <div className='container pt-4'>
            <h4 className='mb-1 text-center'>Payment Processing</h4>
            <div className='row'>
              <div className='col-12 success'>
                <div className='property-image mb-1 rounded' style={{ backgroundImage: `url(${image})` }} />
                <h2 className='mb-0'>{title}</h2>
                <p className='mb-0'><small>From: {start_date} To: {end_date}</small></p>
              </div>
            </div>
          </div>
        }
      </Layout>
    )
  }
}


export default Success;