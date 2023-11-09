// login.jsx
import React from 'react';
import Layout from '@src/layout';
import { safeCredentialsFormData, handleErrors } from '@utils/fetchHelper';

import './my_properties.scss';

class MyProperties extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      username: '',
      addProperty: false,
      properties: [],
      total_pages: null,
      next_page: null,
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
    console.log(this.state[e.target.name])
  }

  submitProperty = (e) => {
    if (e) { e.preventDefault(); }
    const fileInputElement = document.querySelector('#images');

    let formData = new FormData();
    for (let i = 0; i < fileInputElement.files.length; i++) {
      formData.append('property[images][]', fileInputElement.files[i]);
    }

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
    .then(
      this.setState({
        title: '',
        description: '',
        city: '', 
        country: '',
        property_type: '',
        price_per_night: 0,
        max_guests: 0,
        bedrooms: 0,
        beds: 0,
        baths: 0
      })
    )
  }

  render() {
    const { authenticated, username, properties, next_page, addProperty } = this.state;
    if (!authenticated) {
      return (
        <div className="border p-4 mb-4">
          Please <a href={`/login?redirect_url=${window.location.pathname}`}>log in</a> to make add your home.
        </div>
      );
    };

    return (
      <Layout username={username} >
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
                    <div key={property.id} className="col-6 col-lg-4 mb-4 property">
                      <a href={`/property/${property.id}`} className="text-body text-decoration-none">
                        <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.images[0].image_url})  ` }} />
                        <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
                        <h6 className="mb-0">{property.title}</h6>
                        <p className="mb-0"><small>${property.price_per_night} USD/night</small></p>
                      </a>
                    </div>
                  )
                })}
              </div>
            </div>
          : <form className='container-fluid' onSubmit={this.submitProperty}>
              <div className='mb-3'>
                <label 
                  htmlFor='inputTitle'
                  className='form-label'
                >
                  Title
                </label>
                <input  
                  className="form-control" 
                  id="inputTitle" 
                  name='title'
                  aria-describedby="titleHelp" 
                  onChange={this.handleChange}
                />
              </div>
              <div className='mb-3'>
                <label 
                  htmlFor='inputDescription'
                  className='form-label'
                >
                  Description
                </label>
                <textarea  
                  className="form-control" 
                  id="inputDescription" 
                  name='description'
                  onChange={this.handleChange}
                />
              </div>
              <div className='mb-3'>
                <label 
                  htmlFor='inputCity'
                  className='form-label'
                >
                  City
                </label>
                <input  
                  className="form-control" 
                  id="inputCity" 
                  name='city'
                  onChange={this.handleChange}
                />
              </div>
              <div className='mb-3'>
                <label 
                  htmlFor='inputCountry'
                  className='form-label'
                >
                  Country
                </label>
                <input  
                  className="form-control" 
                  id="inputCountry" 
                  name='country' 
                  onChange={this.handleChange}
                />
              </div>
              <div className='mb-3'>
                <label 
                  htmlFor='inputproperty_type'
                  className='form-label'
                >
                  Property Type
                </label>
                <input  
                  className="form-control" 
                  id="inputProperty_type" 
                  name='property_type' 
                  onChange={this.handleChange}
                />
              </div>
              <div className='mb-3'>
                <label 
                  htmlFor='inputPrice_per_night'
                  className='form-label'
                >
                  Price Per Night
                </label>
                <input  
                  type='number'
                  className="form-control" 
                  id="inputPrice_per_night" 
                  name='price_per_night' 
                  onChange={this.handleChange}
                />
              </div>
              <div className='mb-3'>
                <label 
                  htmlFor='inputMax_guests'
                  className='form-label'
                >
                  Max Guests
                </label>
                <input  
                  className="form-control" 
                  type='number'
                  id="inputMax_guests" 
                  name='max_guests' 
                  onChange={this.handleChange}
                />
              </div>
              <div className='mb-3'>
                <label 
                  htmlFor='inputBedrooms'
                  className='form-label'
                >
                  Bedrooms
                </label>
                <input  
                  className="form-control" 
                  type='number'
                  id="inputBedrooms" 
                  name='bedrooms' 
                  onChange={this.handleChange}
                />
              </div>
              <div className='mb-3'>
                <label 
                  htmlFor='inputBeds'
                  className='form-label'
                >
                  Beds
                </label>
                <input  
                  className="form-control" 
                  id="inputBeds" 
                  name='beds' 
                  onChange={this.handleChange}
                />
              </div>
              <div className='mb-3'>
                <label 
                  htmlFor='inputBaths'
                  className='form-label'
                >
                  Baths
                </label>
                <input  
                  className="form-control" 
                  type='number'
                  id="inputBaths" 
                  name='Baths' 
                  onChange={this.handleChange}
                />
              </div>

              <input
                type='file'
                id='images'
                name='images'
                accept='images/*'
                multiple
              />
              <button type='submit' className='btn btn-primary'>Submit property</button>
              <button type='button' className='btn btn-secondary ms-2' onClick={() => this.setState({ addProperty: false })}>Cancel</button>
            </form>
          }
        </Layout>
      )
    }
  }

export default MyProperties;