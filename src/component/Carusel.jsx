import React from "react";

function Carusel() {
  return (
    <>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="4"
            aria-label="Slide 5"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="5"
            aria-label="Slide 6"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active ">
            <img
              src="https://bazm.uz/storage/2019/7/22trLqLYLWaR_640_425_fit.jpg"
              className="d-block w-100"
              style={{ height: "400px", objectFit: "cover" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://daryo.uz/cache/2019/09/toyxona-1-742x436.jpg"
              className="d-block w-100"
              style={{ height: "400px", objectFit: "cover" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://daryo.uz/cache/2020/09/t_ylarni_orti_cha_dabdabali_tkazish_oilaviy_azhrimlarga_saba-640x426-640x426-680x453.jpg"
              className="d-block w-100"
              style={{ height: "400px", objectFit: "cover" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://avatars.mds.yandex.net/get-altay/11072941/2a0000018ab87b9af1a014ae672310f468de/L_height"
              className="d-block w-100"
              style={{ height: "400px", objectFit: "cover" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://static.zarnews.uz/crop/c/c/736_736_80_cc55f431dc79963f41a84d4aab1201c1.jpg?img=self&v=1594132076"
              className="d-block w-100"
              style={{ height: "400px", objectFit: "cover" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://xabar.uz/static/crop/5/1/920__95_51259544.jpg"
              className="d-block w-100"
              style={{ height: "400px", objectFit: "cover" }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default Carusel;
