import React, { useState } from "react";

import './property.scss'

const ImageSlider = (props) => {
  const {images} = props;
  const [imageNum, setImageNum] = useState(0)

  const changeImage = (factor) => {

    if (factor === 'add' && imageNum < images.length - 1) {
      console.log(imageNum)
      return setImageNum(imageNum => imageNum + 1);
    }
    if (factor === 'subtract' && imageNum > 0) {
      return setImageNum(imageNum => imageNum - 1) 
    }

  }

  return (
    <>
      <div className="property-image mb-3" style={{ backgroundImage: `url(${images[imageNum].image_url})` }}>
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-1 h-100">
              <button 
                className="h-100 w-100"
                onClick={() => changeImage('subtract')}
              >
                {'<'}
              </button>
            </div>
            <div className="offset-10 col-1 h-100">
              <button 
                className="h-100 w-100"
                onClick={() => changeImage('add')}
              >
                {'>'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
 
}

export default ImageSlider;