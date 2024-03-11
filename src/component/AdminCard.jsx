import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Style/Card.scss';

function Card(props) {
  const data = props.data;
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  return (
    <div className="rounded border mb-3 col-sm-12 col-md-6 col-lg-4 col-xl-3  p-2">
      <div className="position-relative border-card" style={{ height: '350px' }}>
        {data.photo && (
          <img
            className={`image rounded ${imageLoaded ? '' : 'd-none'}`}
            style={{ objectFit: 'cover', height: '100%' }}
            src={data.photo}
            alt={data.name}
            onLoad={handleImageLoad}
          />
        )}
        {!imageLoaded && (
          <div
            className="image rounded d-flex align-items-center justify-content-center"
            style={{ height: '100%' }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <div className=" position-absolute top-50 start-50  middle">
          <h3 className="text-light mb-3">{data.name}</h3>
          
          <h6 className="text-light text-uppercase pb-2">${data.price}</h6>
          <Link to={`/admin/${data._id}`} className="btn btn-outline-light">
            More
          </Link>
        </div>
      </div>
      <hr />
      <h6 className="text-center h5 position-relative">{data.name}</h6>
    </div>
  );
}

export default Card;
