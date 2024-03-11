import React, { useState } from 'react'
import axios from 'axios'
import Swal from "sweetalert2";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
function AdminLogin() {
    const [login, setLogin] = useState({})
    const [showPassword, setShowPassword] = useState(false);
    const navgate = useNavigate();
    const toggleShowPassword = () => setShowPassword(!showPassword);
    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('https://toyxona-app.onrender.com/admin/login', login)
            .then(res => {
                sessionStorage.setItem('user', JSON.stringify(res.data))
                Swal.fire(
                    'Yaxshi',
                    'Siz muvaffaqqiyatli admin panelga kirdingiz',
                    `${res.data.msg}`
                ).then((result) => {
                    navgate('/admin/home')
                })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
            })
            .catch(error => {
                Swal.fire(
                    'Xatolik!',
                    'Login yoki parol xato',
                    `${error.response.data.msg}`
                )
            });
    };
    return (
        <>
            <div className="container" style={{ marginTop: '80px' }}>
                <div className="row">
                    <div className="col-xl-3"></div>
                    <div className="col-xl-6">
                        <h4 className='text-center'>Admin Log in</h4>
                        <form action="" className="row g-4" onSubmit={handleSubmit}>
                            <div className="col-12">
                                <label htmlFor=''>Username<span className="text-danger">*</span></label>
                                <div className="input-group">
                                    <div className="input-group-text"><i className='bx bxs-user fs-4'></i></div>
                                    <input type="text" className="form-control" name='username' value={login.username || ''} onChange={handleChange} placeholder="Enter Username" />
                                </div>
                            </div>
                            <div className="col-12">
                                <label htmlFor=''>Password<span className="text-danger">*</span></label>
                                <div className="input-group">
                                    <div className="input-group-text"><i className='bx bxs-lock-alt fs-4'></i></div>
                                    <input type={showPassword ? "text" : "password"} name='password' value={login.password || ''} onChange={handleChange} id="password" className="form-control" placeholder="Enter Password" />
                                    <div className="input-group-text">

                                        <input type="checkbox" checked={showPassword} className="form-check-input mt-0" onChange={toggleShowPassword} aria-label="Checkbox for following text input" />
                                    </div>
                                </div>
                            </div>
                            <i className="fa fa-eye-slash"></i>
                            <div className="row mt-3 ">
                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="inlineFormCheck" />
                                        <label className="form-check-label" htmlFor="inlineFormCheck">Remember me</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <a href="/" className="float-end text-primary">Forgot Password?</a>
                                </div>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-outline-secondary px-4 float-end mt-4">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLogin