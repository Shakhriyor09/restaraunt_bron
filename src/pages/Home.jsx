import React, { useEffect, useState } from 'react'
import Card from '../component/Card'
import Carusel from "../component/Carusel";
import { setRestaurant } from '../redux/reducers/restaurant.js';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
function Home() {
  const [load, setLoad] = useState(false)
  const dispatch = useDispatch();
  const restaurants = useSelector(state => state.restaurant.array);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [sortArr, setSortArr] = useState([]);
  const restaurantsSort = (e) => {
    e.preventDefault()
    setSortArr([...restaurants]?.sort((a, b) => a.price - b.price))
  }
  const reverseRestaurantsSort = (e) => {
    e.preventDefault()
    setSortArr([...restaurants]?.sort((a, b) => b.price - a.price))
  }


  const handleInputChange = (event) => {
    setQuery(event.target.value);
    if (event.target.value.length >= 2) {
      const regex = new RegExp(`${event.target.value}`, 'i');
      const newResult = restaurants?.filter((weddinghall) => regex.test(weddinghall.name));
      console.log(newResult)
      setResults(newResult);
    } else {
      setResults([]);
    }
  };
  useEffect(  () => {

    axios
      .get('https://toyxona-app.onrender.com/restaurant')
      .then(res => {
        dispatch(setRestaurant(res.data))
        setLoad(true)
      })
      return () => {
        setLoad(false)
      }

  
  }, [])
  return (
    <>{
      load ? <>
        <div className="container-fluid mt-5">
          <Carusel />
        </div>
        <div className="container d-flex">
          <input className="form-control  m-2" value={query} onChange={handleInputChange} type="search" placeholder="Search" aria-label="Search" />
          <div className="form-check mt-2 ">
            <button className="btn btn-outline-secondary" onClick={restaurantsSort} for="flexRadioDefault1">
              <i className='bx fs-4 bx-trending-up'></i>
            </button>
          </div>
          <div className="form-check mt-2 ">
            <button className="btn btn-outline-secondary" onClick={reverseRestaurantsSort} for="flexRadioDefault2">
              <i className='bx fs-4 bx-trending-down'></i>
            </button>
          </div>
        </div>
        <div className="container">
          <div className="row  mt-4 ">
            {
              (results.length === 0 && sortArr.length === 0) ? restaurants?.map((restaurant) => {
                return (
                  <Card key={restaurant._id} data={restaurant} />
                )
              }) : (
                (results.length === 0 && sortArr.length > 0) ? sortArr?.map((restaurant) => {
                  return (
                    <Card key={restaurant._id} data={restaurant} />
                  )
                }) : results?.map((restaurant) => {
                  return (
                    <Card key={restaurant._id} data={restaurant} />
                  )
                })
              )
            }
          </div>
        </div>
      </> :
        <h1 style={{ height: "80vh" }} className='w-100'>
          <i style={{ position: "fixed", top: "45vh", left: "50vw", zIndex: 12, fontSize: "100px" }} className='bx bx-loader bx-spin bx-flip-horizontal' ></i>
        </h1>
    }
    </>
  )
}

export default Home