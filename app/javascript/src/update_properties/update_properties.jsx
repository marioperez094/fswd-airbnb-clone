import React from 'react';
import Layout from '@src/layout';
import { safeCredentialsFormData, handleErrors } from '@utils/fetchHelper';

import './update_properties.scss';
import PropertyForm from '../my_properties/propertyForm';

class UpdateProperties extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      property: {},
      loading: false,
    }
  }
  componentDidMount() {
    fetch(`/api/properties/${this.props.property_id}`)
      .then(handleErrors)
      .then(data => {
        console.log(data)
        this.setState({
          property: data.property,
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

  handleChange = (e) => {
    this.setState({
      property: {
        ...this.state.property,
        [e.target.name]: e.target.value
      }
    })
    console.log(this.state[e.target.name])
  }

  cancelForm = () => {
    window.location.assign('/my-properties')
  }

  submitProperty = (e) => {
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
    

    fetch(`/api/properties/${this.props.property_id}`, safeCredentialsFormData({
      method: 'PUT',
      body: formData
    }))
    .then(handleErrors)
    .then(res => console.log(res))
  }

  render() {
    const { username, property, loading } = this.state;
    if (loading) {
      return (
        <div className='text-center'>
          <Loader />
        </div>
      );
    };

    const {
      title,
      description, 
      city,
      country,
      price_per_night,
      property_type,
      max_guests,
      bedrooms,
      beds,
      baths,
    } = property;

    return (
      <Layout username={username}>
        <PropertyForm submitProperty={this.submitProperty} handleChange={this.handleChange} property={property} cancelForm={this.cancelForm} />
      </Layout>
    )
  }
}

export default UpdateProperties;