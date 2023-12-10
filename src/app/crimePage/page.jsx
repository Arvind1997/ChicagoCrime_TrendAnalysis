'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import ChicagoCrimes from './chicagocrimes'




const table = () => {

  const [ data, setData ] = useState([])

  const [ id, setID ] = useState('')
  const [location, setLocation] = useState('')
  const [ulocation, usetLocation] = useState('')

  const [ editID, setEditId ] = useState(-1)
  

  useEffect(() => {
    axios.get('https://node-mysql-chicagocrimes.onrender.com/getUsers')
    .then(res => {setData(res.data);})
    .catch(er => toast.error(er))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://node-mysql-chicagocrimes.onrender.com/location',
    {
      Location_ID: id,
      Location_Description: location,
    }).then(res =>{
      axios.get('https://node-mysql-chicagocrimes.onrender.com/getUsers')
      .then(res => {setData(res.data); 
        toast.success("Location added!")
      })
      .catch(er =>  toast.error(er))
    })
    .catch(er => console.log(er))
  }

  const handleEdit = (id) => {
    axios.get('https://node-mysql-chicagocrimes.onrender.com/getUsers', { Location_ID: editID })
    .then(res => {
      usetLocation(res.data.Location_Description);
    })
    .catch(er => console.log(er))
    setEditId(id)
  }

  const handleUpdate = () => {
    axios.put('https://node-mysql-chicagocrimes.onrender.com/updateLocation', { Location_ID: editID, Location_Description: ulocation })
    .then(res => {
      console.log(res);
      //location.reload();
      axios.get('https://node-mysql-chicagocrimes.onrender.com/getUsers')
      .then(res => {
        setData(res.data);
        toast.success('Location updated!')
      })
      .catch(er => console.log(er))
      setEditId(-1);
    }).catch(err => console.log(err))
  }
 
  const handleDelete = (id) => {
    axios.delete('https://node-mysql-chicagocrimes.onrender.com/deleteLocation/'+id)
    .then(res => {
      console.log(res);
      //location.reload();
      toast.success('Location deleted!')

      axios.get('https://node-mysql-chicagocrimes.onrender.com/getUsers')
      .then(res => {
        setData(res.data);
      })
      .catch(er => console.log(er))
    }).catch(err => console.log(err))
  }

  return (
    <>
    <ChicagoCrimes />
        <div className="container text-white font-montserrat">
          <br></br>
          <h2 className="text-3xl text-center font-extrabold font-montserrat content-center">Location Details</h2>
          <div>
            <form onSubmit={handleSubmit} className="text-black font-montserrat">
              <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5' type='text' placeholder='Enter ID' onChange={e => setID(e.target.value)}/>
              <input type='text' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5'  placeholder='Enter Location' onChange={e => setLocation(e.target.value)}/>
              <button className="my-20 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Add</button>

            </form>
          </div>

<div className="flex flex-col">
  <div className="-m-1.5 overflow-x-auto">
    <div className="p-1.5 min-w-full inline-block align-middle">
      <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th scope='col' className="px-6 py-3 text-start text-lg font-large text-gray-500 uppercase">
                  Location ID
                </th>
                <th scope='col' className="px-6 py-3 text-start text-lg font-large text-gray-500 uppercase">
                  Location Description
                </th>
                <th scope='col' className="px-6 py-3 text-start text-lg font-large text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody style={{ }} className="divide-y divide-gray-200 dark:divide-gray-700">
              {
                data.map((user, index) => (
                  user.Location_ID === editID ?
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{ user.Location_ID }</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"><input type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="Enter the value" value={ulocation} onChange={e => usetLocation(e.target.value)}/></td>
                      <td className="items-center text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"><button onClick={ handleUpdate }>Update</button></td>
                    </tr>
                    :
                  <tr key = { index }  className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"> {user.Location_ID} </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"> {user.Location_Description} </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      <button className="mx-1 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={ () => handleEdit(user.Location_ID) }>Edit</button>
                      <button className="mx-1 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={ () => handleDelete(user.Location_ID) }>Delete</button>
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
          <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} theme="dark" />

        </div>
        </>
  );
};

export default table;