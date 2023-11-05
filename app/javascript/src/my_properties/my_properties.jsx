// login.jsx
import React from 'react';
import Layout from '@src/layout';
import { safeCredentials, safeCredentialsFormData, handleErrors } from '@utils/fetchHelper';

import './my_properties.scss';

class MyProperties extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      username: '',
      properties: [],
      total_pages: null,
      next_page: null,
      title: 'Studio Apartment',
      description: '10 minute bus ride (1 stop) to NYC Times Square.',
      city: 'New York',
      country: 'us',
      property_type: 'studio',
      price_per_night: 50,
      max_guests: 3,
      bedrooms: 0,
      beds: 1,
      baths: 1,
      image: null,
    }
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          username: data.username,
          authenticated: data.authenticated,
        })
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

  handleFileChange(event) {
    this.setState({ image: event.target.files[0] }, () => { console.log(this.state.image) })
  }

  submitProperty = (e) => {
    if (e) { e.preventDefault(); }

    let formData = new FormData();

    formData.set('property[image]', this.state.image)

    formData.set('property[title]', this.state.title)
    formData.set('property[description]', this.state.description)
    formData.set('property[city]', this.state.city)
    formData.set('property[country]', this.state.country)
    formData.set('property[property_type]', this.state.property_type)
    formData.set('property[price_per_night]', this.state.price_per_night)
    formData.set('property[max_guests]', this.state.max_guests)
    formData.set('property[bedrooms]', this.state.bedrooms)
    formData.set('property[beds]', this.state.beds)
    formData.set('property[baths]', this.state.baths)
    

    fetch(`/api/properties`, safeCredentialsFormData({
      method: 'POST',
      body: formData
    }))
    .then(handleErrors)
    .then(res => console.log(res))
  }

  render() {
    const { authenticated, username, properties, next_page } = this.state;
    if (!authenticated) {
      return (
        <div className="border p-4 mb-4">
          Please <a href={`/login?redirect_url=${window.location.pathname}`}>log in</a> to make add your home.
        </div>
      );
    };

    return (
      <Layout username={username} >
        <div className='container pt-4'>
          <h4 className='mb-1'>Your properties</h4>
          <div className='row'>
            {properties.map(property => {
              return (
                <div key={property.id} className="col-6 col-lg-4 mb-4 property">
                  <a href={`/property/${property.id}`} className="text-body text-decoration-none">
                    <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.image})` }} />
                    <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
                    <h6 className="mb-0">{property.title}</h6>
                    <p className="mb-0"><small>${property.price_per_night} USD/night</small></p>
                  </a>
                </div>
              )
            })}
          </div>
        </div>
        

        <form onSubmit={(e) => this.submitProperty(e)}>
          <input />
          <input
            type='file'
            id='image-select'
            name='images'
            accept='image/*'
            onChange={(e) => this.handleFileChange(e)}
          />
          <button type='submit'>Click</button>
        </form>
      </Layout>
    )
  }
}

export default MyProperties;