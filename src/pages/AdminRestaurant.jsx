import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useParams } from 'react-router-dom'
function AdminRestaurant() {
    const [data, setData] = useState()
    const [book, setBook] = useState()
    const [load, setLoad] = useState(false)
    const [display, setDisplay] = useState(false)
    const [update, setUpdate] = useState()
    const { _id } = useParams()
    const navgate = useNavigate()
    const handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        setUpdate({ ...update, [name]: value });
    };
    useEffect(() => {
        axios
            .get(`https://toyxona-app.onrender.com/restaurant/${_id}`)
            .then((response) => {
                setData(response.data)
                setLoad(true)
            })
        return () => {
            setLoad(false)
        }
    }, [])
    const deleteRestaurant = () => {
        axios
            .delete(`https://toyxona-app.onrender.com/restaurant/${_id}`)
            .then(response => {
                Swal.fire({
                    title: `Siz haqiqatdan ham ${response?.data.name}  to'yxonani o'chirmoqchimisiz?`,
                    text: "",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'ok!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Yaxshi!',
                            ` ${response.data.name} to'yxona  muvaffaqiyatli  o'chdi`,
                            'success'
                        ).then((result) => {
                            navgate('/admin/home')
                        })
                    }
                })
            })


    }
    const updateRestaurtnat = () => {
        axios
           .put(`https://toyxona-app.onrender.com/restaurant/${_id}`,update)
           .then(response => {
            Swal.fire(
                'Yaxshi!',
                `To'yxona  muvaffaqiyatli  ma'lumotlari o'zgardi`,
                'success'
            ).then(()=>{
                navgate(`/admin/home`)
            })
           })
           .catch(error=>{
            Swal.fire(
                'Xatolik',
                `To'yxona ma'lumotlarini o'zgartirishda xatolik`,
                'error'
            )
           })
        setDisplay(!display)
    }

    const bookDate = () => {
        axios
            .put(`https://toyxona-app.onrender.com/restaurant/book/${_id}`, { book })
            .then((response) => {
                response.data ?
                    Swal.fire({
                        title: `Siz haqiqatdan ham ${book} sanaga joyni band qilmoqchimisiz?`,
                        text: "",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'ok!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire(
                                'Yaxshi!',
                                `To'yxonani  muvaffaqiyatli ${book} sanaga band qildingiz`,
                                'success'
                            )
                        }
                    }) :
                    Swal.fire(
                        'Xatolik',
                        `Bu sanaga oldin band qilinggan`,
                        'error'
                    )
            })
            .catch((error) => {
                console.log(error);
                Swal.fire(
                    'Xatolik',
                    `Siz xato qildingiz`,
                    'error'
                )
            })
    }
    console.log(data?.bookArray)
    return (
        <>
            {load ? <div className="container mt-3" >
                <h4 className='text-center'>{data?.name}</h4>
                <div className="row">
                    <div className="col-xl-6 " >
                        <img className='w-100 rounded' style={{ height: '500px', objectFit: 'cover' }} src={data?.photo} alt="404" />
                    </div>
                  
                    <div className="col-xl-6 ">
                        <h1 className='fw-bold'>Nomi:{data?.name}</h1>
                        <p>{data?.generalInformation}</p>
                        <h4 className='fw-bold'>Joylashkan joyi:{data?.address}</h4>
                        <h4>Sig'mi: {data?.capacity} -ta</h4>
                        <h5>Narxi: ${data?.price}</h5>
                        <div className='w-100  d-flex ' >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <StaticDatePicker
                                    displayStaticWrapperAs="desktop"
                                    orientation="landscape"
                                    onChange={(newValue) => setBook(newValue.$d)}
                                // }
                                />
                            </LocalizationProvider>
                            <div className="row">
                                <button disabled={!book} onClick={() => bookDate()} style={{ height: '40px' }} className=' btn btn-outline-primary'>Band qilish</button>
                                <button onClick={() => setDisplay(!display)} style={{ height: '40px' }} className=' btn btn-outline-info'>O'zgartirish</button>
                                <button onClick={deleteRestaurant} style={{ height: '40px' }} className=' btn btn-outline-danger'>To'yxonani o'chirish</button>
                            </div>
                        </div>

                    </div>
                </div>
                { data?.bookArray&&
                <div className="row mt-5">
                    <h5 className='text-center'>{data?.name} - to'yxonasi band qilngan sanalar</h5>
                    <div className='col-xl-1'></div>
                    <div className="col-xl-10">
                        <table className='table table-hover border'>
                            <thead>
                                <tr>
                                    <th className='col'>№</th>
                                    <th className='col'>Sana</th>
                                    <th className='col'>O'zgartirish</th>
                                    <th className='col'>O'chirish</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.bookArray.map((value, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className='col'>{index + 1}</td>
                                                <td className='col'>{value}</td>
                                                <td style={{cursor:'pointer'}} className='col'><i class='bx fs-4 bx-pencil'></i></td>
                                                <td style={{cursor:'pointer'}} className='col'><i class='bx fs-4 bx-message-alt-x'></i></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>}
            </div> :
                <h1 style={{ height: "80vh" }} className='w-100'>
                    <i style={{ position: "fixed", top: "45vh", left: "50vw", zIndex: 12, fontSize: "100px" }} className='bx bx-loader bx-spin bx-flip-horizontal' ></i>
                </h1>
            }

            {display &&
                <div className="container w-100"  >

                    <div style={{ position: "fixed", top: "0", left: "0", zIndex: 1121, backgroundColor: 'rgb(30,30,30,0.8)' }} className="row w-100 h-100">
                        <div className="col-xl-3 "></div>
                        <div className="col-xl-6 border my-5 py-3 px-5" style={{ backgroundColor: 'white', borderRadius: '5px' }}>
                            <div className="d-flex justify-content-end">
                                <i style={{ cursor: 'pointer' }} onClick={() => setDisplay(!display)} className=' fs-3 bx bxs-x-circle'></i>
                            </div>
                            <h1 className='text-center'>To'yxona ma'lumotlarni o'zgartirish</h1>
                            <form >
                                <div className="input-group mb-3">
                                    <span className="input-group-text " id="inputGroup-sizing-default">Nom</span>
                                    <input
                                        name="name"
                                        placeholder='nom'
                                        onChange={(e) => handleChange(e)}
                                        type="text"
                                        className="form-control col-8"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text " id="inputGroup-sizing-default">Sig'im</span>
                                    <input
                                        name="capacity"
                                        placeholder="sig'm"
                                        onChange={(e) => handleChange(e)}
                                        type="number"
                                        className="form-control col-8"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text " id="inputGroup-sizing-default">
                                        <i className='bx fs-5 bx-location-plus'></i>
                                    </span>
                                    <input
                                        name="address"
                                        onChange={(e) => handleChange(e)}
                                        type="text"
                                        className="form-control col-8"
                                        placeholder='location'
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text " id="inputGroup-sizing-default">Price</span>
                                    <input
                                        name="price"
                                        onChange={(e) => handleChange(e)}
                                        type="number"
                                        placeholder='narx'
                                        className="form-control col-8"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" />
                                </div>
                                <div className="input-group mb-3">
                                    <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="3" placeholder="umumiy ma'lumot(ixtyoriy)"

                                        name='generalInformation'
                                        onChange={handleChange}></textarea>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button onClick={updateRestaurtnat} type="button" className="btn btn-outline-secondary">
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export default AdminRestaurant