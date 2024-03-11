import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import AdminLogin from './pages/AdminLogin';
import Home from './pages/Home'
import Layout from './pages/Layout';
import AdminLayout from './pages/AdminLayout';
import NoPage from './pages/NoPages'
import Restaurant from './pages/Restaurant';
import AddRestaurant from './pages/AddRestaurant';
import AdminHome from './pages/AdminHome';
import AdminRestaurant from './pages/AdminRestaurant';
function App() {
  const [users, setUsers] = useState()
  const [load, setLoad] = useState(false)
  useEffect(() => {
    const user = sessionStorage.getItem('user')
    user && setUsers(JSON.parse(user))
    setLoad(true)
    return () => {
      setLoad(false)
    }
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/:_id' element={<Restaurant />} />
          </Route>
          <Route path='/admin' element={<AdminLayout user={users} />}>
            <Route index element={<AdminLogin />} />
            <Route path='/admin/home' element={users && (users ? <AdminHome /> : <Navigate to="/admin" replace={true} />)} />
            <Route path='/admin/add' element={users && (users ? <AddRestaurant /> : <Navigate to="/admin" replace={true} />)} />
            <Route path='/admin/:_id' element={users && (users ? <AdminRestaurant /> : <Navigate to="/admin" replace={true} />)} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
