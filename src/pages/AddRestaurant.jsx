import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
function AddRestaurant() {
  const [data, setData] = useState({});
  const navgate = useNavigate()
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://toyxona-app.onrender.com/restaurant/add', data)
      .then((res) => {
        Swal.fire(
          'Yaxshi!',
          `To'yxona qo'shildi`,
          'success'
        ).then(() => {
          navgate('/admin/home')
        });
        console.log(res.data)
      })
      .catch(err => {
        console.log(err.message)
        Swal.fire(
          'Xatolik!',
          `To'yxona qo'shguncha xatolik`,
          'error'
        );
      })



  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setData({ ...data, 'photo': base64 })
  }
  console.log(data)
  return (
    <>
      <div className="container" style={{ marginTop: '80px' }}>
        <div className="row">
          <h4 className='text-center'>To'yxona qo`shish</h4>
          <div className="col-xl-3"></div>
          <div className="col-xl-6">
            <form className='mt-3' onSubmit={handleSubmit}>
              <div className="mb-3">
                <label for="exampleFormControlInput3" className="form-label">Nom</label>
                <input type="text" className="form-control" id="exampleFormControlInput3" placeholder="Nom" name='name' value={data.name || ''} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput3" className="form-label">Sig'im</label>
                <input type="number" className="form-control" id="exampleFormControlInput3" placeholder="Sig'im" name='capacity' value={data.capacity || ''} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput3" className="form-label">Narx</label>
                <input type="number" className="form-control" id="exampleFormControlInput3" placeholder="Narx" name='price' value={data.price || ''} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput4" className="form-label">Joylashuv</label>
                <input type="text" className="form-control" id="exampleFormControlInput4" placeholder="Joylashuv" name='address' value={data.address || ''} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput5" className="form-label">Surat</label>
                <input type="file" accept='.jpg, .png, .jpeg' className="form-control" id="exampleFormControlInput5" name='photo' onChange={(e) => handleFileUpload(e)} />
              </div>
              <div className="mb-3">
                <label for="exampleFormControlTextarea1" className="form-label">Umumiy ma'lumot</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="umumiy ma'lumot(ixtyoriy)" value={data.phogeneralInformationto} name='generalInformation' onChange={handleChange}></textarea>
              </div>
              <div className='d-flex justify-content-end'>
                <button className='btn btn-outline-primary'>Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddRestaurant

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}