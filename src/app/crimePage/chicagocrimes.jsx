'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




const ChicagoCrimes = () => {

    const [ data, setData ] = useState([])

    const [ caseNum, setCaseNum ] = useState(-1)
    const [pri, setPri] = useState('')
    const [ district, setDistrict ] = useState('')
    const [ year, setYear ] = useState('')
    const [ lat, setLat ] = useState('')
    const [ ulat, usetLat ] = useState('')
    const [ ulong, usetLong ] = useState('')
    const [ long, setLong ] = useState('')
    const [arrest, setArrest] = useState('')
    const [ uarrest, usetArrest ] = useState('')


  
    const [ editCase, setEditCase ] = useState(-1)

    useEffect(() => {
        axios.get('https://node-mysql-chicagocrimes.onrender.com/getChicago')
        .then(res => {
            setData(res.data);
            toast.success('Crime records loaded!');
        })
        .catch(er => console.log(er))
      }, [])


      const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://node-mysql-chicagocrimes.onrender.com/Chicago',
        {
          Case_number: caseNum,
          Primary_Type: pri,
          Arrest: arrest,
          District: district,
          Year: year,
          Latitude: lat,
          Longitude: long,

        }).then(res =>{
            console.log(res)
          axios.get('https://node-mysql-chicagocrimes.onrender.com/getChicago')
          .then(res => {
            setData(res.data);
            toast.success('Crime details added!')
          })
          .catch(er => console.log(er))
        })
        .catch(er => console.log(er))
      }
    
      const handleEdit = (id) => {
        axios.get('https://node-mysql-chicagocrimes.onrender.com/getChicago', { Case_Number: editCase })
        .then(res => {
          usetArrest(res.data.Arrest)
          usetLat(res.data.Latitude)
          usetLong(res.data.Longitude)
        })
        .catch(er => console.log(er))
        setEditCase(id)
      }
    
      const handleUpdate = () => {
        axios.put('https://node-mysql-chicagocrimes.onrender.com/updateCrime', { Case_number: editCase, Arrest: uarrest, Latitude: ulat, Longitude: ulong })
        .then(res => {
          console.log(res);
          //location.reload();
          axios.get('https://node-mysql-chicagocrimes.onrender.com/getChicago')
          .then(res => {
            setData(res.data);
            toast.success('Crime record updated!')
          })
          .catch(er => console.log(er))
          setEditCase(-1);
        }).catch(err => console.log(err))
      }
     
      const handleDelete = (id) => {
        axios.delete('https://node-mysql-chicagocrimes.onrender.com/deleteCrime/'+id)
        .then(res => {
          console.log(res);
          //location.reload();
          axios.get('https://node-mysql-chicagocrimes.onrender.com/getChicago')
          .then(res => {setData(res.data);
            toast.success('Crime record deleted!')
          })
          .catch(er => console.log(er))
        }).catch(err => console.log(err))
      }



      return (

        <div className="container text-white font-montserrat">
            <h2 className="my-10 text-3xl text-center font-extrabold content-center">Chicago Crimes</h2>
          <div>
            <form  className="content-center text-black" onSubmit={handleSubmit}>
            <h3 className="text-lg font-bold font-montserrat text-white">Enter the Crime details:</h3>
              <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5' type='text' placeholder='Enter Case Number' onChange={e => setCaseNum(e.target.value)}/>
              <input type='text' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5'  placeholder='Enter Primary Type' onChange={e => setPri(e.target.value)}/>
              <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5' type='text' placeholder='Enter Arrested (True/False)' onChange={e => setArrest(e.target.value)}/>
              <input type='text' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5'  placeholder='Enter District' onChange={e => setDistrict(e.target.value)}/>
              <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5' type='text' placeholder='Enter Year' onChange={e => setYear(e.target.value)}/>
              <input type='text' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5'  placeholder='Enter Latitude' onChange={e => setLat(e.target.value)}/>
              <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5' type='text' placeholder='Enter Longitude' onChange={e => setLong(e.target.value)}/>

              <button className="my-20 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Add</button>

            </form>
          </div>
<div class="flex flex-col">
  <div class="-m-1.5 overflow-x-auto">
    <div class="p-1.5 min-w-full inline-block align-middle">
      <div class="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th scope='col' className="px-6 py-3 text-start text-lg font-large text-gray-500 uppercase">
                  Case Number
                </th>
                <th scope='col' className="px-6 py-3 text-start text-lg font-large text-gray-500 uppercase">
                  Primary Type
                </th>
                <th scope='col' className="px-6 py-3 text-start text-lg font-large text-gray-500 uppercase">
                  Arrest
                </th>
                <th scope='col' className="px-6 py-3 text-start text-lg font-large text-gray-500 uppercase">
                  District
                </th>
                <th scope='col' className="px-6 py-3 text-start text-lg font-large text-gray-500 uppercase">
                  Year
                </th>
                <th scope='col' className="px-6 py-3 text-start text-lg font-large text-gray-500 uppercase">
                  Latitude
                </th>
                <th scope='col' className="px-6 py-3 text-start text-lg font-large text-gray-500 uppercase">
                  Longitude
                </th>
                <th scope='col' className="px-6 py-3 text-start text-lg font-large text-gray-500 uppercase">
                    Action
                </th>
              </tr>
            </thead>
            <tbody style={{ }} className="divide-y divide-gray-200 dark:divide-gray-700">
              {
                data.map((user, index) => (
                  user.Case_number === editCase ?
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{ user.Case_number }</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{ user.Primary_Type }</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"><input type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' value={uarrest} onChange={e => usetArrest(e.target.value)}/></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{ user.District }</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{ user.Year }</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"><input type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' value={ulat} onChange={e => usetLat(e.target.value)}/></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"><input type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' value={ulong} onChange={e => usetLong(e.target.value)}/></td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"><button className="mx-1 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={handleUpdate}>Update</button></td>
                      <ToastContainer />
                    </tr>
                    :
                  <tr key = { index }>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{ user.Case_number }</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{ user.Primary_Type }</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{ user.Arrest }</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{ user.District }</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{ user.Year }</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{ user.Latitude }</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{ user.Longitude }</td>
                  
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      <button className="mx-1 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"  onClick={ () => handleEdit(user.Case_number) }>Edit</button>
                      <button className="mx-1 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"  onClick={ () => handleDelete(user.Case_number) }>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        </div>
        </div>
        </div>
        </div>
  );


}


export default ChicagoCrimes