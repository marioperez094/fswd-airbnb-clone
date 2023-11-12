import React from 'react';

const PropertyForm = (props) => {
  const { submitProperty, handleChange, property, cancelForm } = props;
  const {
    title,
    description,
    city,
    country,
    property_type,
    price_per_night,
    max_guests,
    bedrooms,
    beds,
    baths
  } = property;

  return (
    <form className='container-fluid' onSubmit={submitProperty}>
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
                  value={title}
                  onChange={(e) => handleChange(e)}
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
                  value={description}
                  onChange={(e) => handleChange(e)}
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
                  value={city}
                  onChange={(e) => handleChange(e)}
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
                  value={country}
                  onChange={(e) => handleChange(e)}
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
                  value={property_type} 
                  onChange={(e) => handleChange(e)}
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
                  value={price_per_night}
                  onChange={(e) => handleChange(e)}
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
                  value={max_guests}
                  onChange={(e) => handleChange(e)}
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
                  value={bedrooms}
                  onChange={(e) => handleChange(e)}
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
                  value={beds}
                  onChange={(e) => handleChange(e)}
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
                  name='baths' 
                  value={baths}
                  onChange={(e) => handleChange(e)}
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
              <button type='button' className='btn btn-secondary ms-2' onClick={() => cancelForm()}>Cancel</button>
            </form>
  )
}

export default PropertyForm