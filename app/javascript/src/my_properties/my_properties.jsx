import React from 'react';
import Layout from '@src/layout';
import Loader from '../loading'
import { safeCredentialsFormData, safeCredentials, handleErrors } from '@utils/fetchHelper';

import './my_properties.scss';
import BookingHistory from './bookingHistory';
import PropertyForm from './propertyForm';

class MyProperties extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      username: '',
      addProperty: false,
      properties: [],
      loading: true,
      total_pages: null,
      next_page: null,
      property: {   
        title: '',
        description: '',
        city: '',
        country: '',
        property_type: '',
        price_per_night: 0,
        max_guests: 0,
        bedrooms: 0,
        beds: 0,
        baths: 0,
      }
    }
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
          loading: false,
        })
      })
  }

  handleChange = (e) => {
    this.setState({
      property: {
        ...this.state.property,
        [e.target.name]: e.target.value
      }
    })
  }

  submitProperty = (e) => {
    this.setState({loading: true})
    if (e) { e.preventDefault(); }
    const fileInputElement = document.querySelector('#images');

    let formData = new FormData();
    for (let i = 0; i < fileInputElement.files.length; i++) {
      formData.append('property[images][]', fileInputElement.files[i]);
    }

    formData.set('property[title]', this.state.property.title)
    formData.set('property[description]', this.state.property.description)
    formData.set('property[city]', this.state.property.city)
    formData.set('property[country]', this.state.property.country)
    formData.set('property[property_type]', this.state.property.property_type)
    formData.set('property[price_per_night]', this.state.property.price_per_night)
    formData.set('property[max_guests]', this.state.property.max_guests)
    formData.set('property[bedrooms]', this.state.property.bedrooms)
    formData.set('property[beds]', this.state.property.beds)
    formData.set('property[baths]', this.state.property.baths)
    

    fetch(`/api/properties`, safeCredentialsFormData({
      method: 'POST',
      body: formData
    }))
    .then(handleErrors)
    .then(res => {
      if (res.property) {
        this.loadProperties(this.state.username);
        this.setState({
          property: {   
            title: '',
            description: '',
            city: '',
            country: '',
            property_type: '',
            price_per_night: 0,
            max_guests: 0,
            bedrooms: 0,
            beds: 0,
            baths: 0,
          },
          addProperty: false, 
          loading: false,
        })
        
      }
    })
  }
  cancelForm = () => {
    this.setState({ addProperty: false })
  }

  deleteProperty = (id) => {
    this.setState({ loading: true })
    fetch(`/api/properties/${id}`, safeCredentials({
      method: 'DELETE',
    }))
      .then(handleErrors)
      .then(res => {
        if (res.success) {
          this.loadProperties(this.state.username)
        }
      })
      .then(this.setState({ loading: false }))
  }

  loadMore = () => {
    if (this.state.next_page === null) {
      return;
    }
    this.setState({ loading: true });
    fetch(`/api/properties?page=${this.state.next_page}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          properties: this.state.properties.concat(data.properties),
          total_pages: data.total_pages,
          next_page: data.next_page,
          loading: false,
        })
      })
  }

  render() {
    const { authenticated, username, properties, next_page, addProperty, loading, property } = this.state;
    if (!authenticated) {
      return (
        <div className="border p-4 mb-4">
          Please <a href={`/login?redirect_url=${window.location.pathname}`}>log in</a> to make add your home.
        </div>
      );
    };


    if (loading) {
      return (
        <div className='text-center'>
          <Loader />
        </div>
      );
    };

    return (
      <Layout username={username}>
        {!addProperty 
          ? <div className='container pt-4'>
              <h4 className='mb-1'>Your properties</h4>
              <button 
                className='btn btn-warning mb-2'
                onClick={() => this.setState({ addProperty: true })}
              >
                Add a new property!
              </button>
              <div className='row'>
                {properties.map(property => {
                  return (
                    <React.Fragment key={property.id}>
                      <div className="col-6 col-lg-4 mb-4 property">
                          <a href={`/property/${property.id}/update`} className="text-body text-decoration-none">
                            <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.images[0].image_url})  ` }}>
                              <div>Edit</div>
                            </div>
                          </a>
                          <button className='btn btn-danger w-100' onClick={() => this.deleteProperty(property.id)}>Delete</button>
                          <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
                          <h6 className="mb-0">{property.title}</h6>
                          <p className="mb-0"><small>${property.price_per_night} USD/night</small></p>
                      </div>
                      <BookingHistory property_id={property.id} />
                    </React.Fragment>

                  )
                })}
                {(loading || next_page === null) ||
                  <div className="text-center">
                    <button
                      className="btn btn-light mb-4"
                      onClick={this.loadMore}
                    >load more</button>
                  </div>
                }
              </div>
            </div>
          : <PropertyForm submitProperty={this.submitProperty} handleChange={this.handleChange} property={property} cancelForm={this.cancelForm}/>
          }
        </Layout>
      )
    }
  }

export default MyProperties;