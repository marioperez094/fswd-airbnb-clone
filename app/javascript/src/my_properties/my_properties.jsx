// login.jsx
import React from 'react';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './my_properties.scss';

class MyProperties extends React.Component {
  state = {
    authenticated: false,
    username: '',
    properties: [],
    total_pages: null,
    next_page: null,
    newProperty: {}
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          username: data.username,
          authenticated: data.authenticated,
        })
        console.log('hi')
        this.loadProperties(data.username)
      })
  }

  loadProperties(user) {
    fetch(`/api/properties/${user}/user`)
      .then(handleErrors)
      .then(data => {
        console.log(data)
        this.setState({
          properties: data.properties,
          total_pages: data.total_pages,
          next_page: data.next_page,
        })
      })
  }

  render() {
    const { authenticated, username } = this.state;
    if (!authenticated) {
      return (
        <div className="border p-4 mb-4">
          Please <a href={`/login?redirect_url=${window.location.pathname}`}>log in</a> to make a booking.
        </div>
      );
    };

    return (
      <Layout username={username} >

      </Layout>
    )
  }
}

export default MyProperties;