import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useParams } from 'react-router-dom'
function Restaurant() {
    const [data, setData] = useState()
    const [book, setBook] = useState()
    const [load, setLoad] = useState(false)
    const { _id } = useParams()
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
                            console.log(result);
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
                Swal.fire(
                    'Xatolik',
                    `Siz xato qildingiz`,
                    'error'
                )
            })
    }
    return (
        <>
            {load ? <div className="container" style={{ marginTop: '80px' }}>
                <h4 className='text-center'>{data?.name}</h4>
                <div className="row">
                    <div className="col-xl-6 " >
                        {
                          data.photo&& <img className='w-100 rounded' style={{ height: '500px', objectFit: 'cover' }} src={data?.photo} alt="404" />
                        }
                    </div>
                    <div className="col-xl-6 ">
                        <h1 className='fw-bold'>Nomi:{data?.name}</h1>
                        <p className='p'>{data.generalInformation}</p>
                        <h4>Sig'mi: {data?.capacity} -ta</h4>
                        <h5>Narxi: ${data?.price}</h5>
                        <div className='w-100 ms-0' >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <StaticDatePicker
                                    displayStaticWrapperAs="desktop"
                                    orientation="landscape"
                                    onChange={(newValue) => setBook(newValue)}
                                />
                            </LocalizationProvider>
                            <button disabled={!book} onClick={bookDate} className='btn btn-outline-primary'>Band qilish</button>
                        </div>
                    </div>
                </div>
            </div> :
                <h1 style={{ height: "80vh" }} className='w-100'>
                    <i style={{ position: "fixed", top: "45vh", left: "50vw", zIndex: 12, fontSize: "100px" }} className='bx bx-loader bx-spin bx-flip-horizontal' ></i>
                </h1>
            }

        </>
    )
}

export default Restaurant