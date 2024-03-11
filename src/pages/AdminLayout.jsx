import React from 'react'
import { Outlet } from "react-router-dom";
import AdminNavbar from '../component/AdminNavbar';
import Footer from '../component/Footer';
function AdminLayout(props) {
    const data = props.user;
    return (
        <> {data ? <AdminNavbar /> : null}
            <Outlet />
            {data ? <Footer /> : null}
        </>
    )
}

export default AdminLayout