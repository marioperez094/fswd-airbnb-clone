import React from 'react';
import { handleErrors } from '@utils/fetchHelper';

import './my_properties.scss';

class BookingHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      existingBookings: []
    }
  }

  componentDidMount() {
    fetch(`/api/properties/${this.props.property_id}/bookings`)
      .then(handleErrors)
      .then(data => {
        console.log(data);
        this.setState({
          existingBookings: data.bookings,
        }, () => {console.log(this.state.existingBookings)})
      })
  }

  render() {
    const { existingBookings } = this.state;
    return (
      <div className='col-6 col-lg-8'>
        {existingBookings.length > 0
          ? existingBookings.map((booking) => {
            return (
              <React.Fragment key={booking.id}>
                <div className='row listing-owner'>
                  <div className='col-12'>
                    From: {booking.start_date} To: {booking.end_date}
                  </div>
                  <div className='col-12 d-flex justify-content-start'>
                    User: {booking.username}
                  </div>
                  <div className='col-12'>
                    Paid: {booking.is_paid ? 'true' : 'false'}
                  </div>
                </div>
              </React.Fragment>
            )
          })
          : <p>No bookings</p>
        }
      </div>
    )
  }
}

export default BookingHistory;