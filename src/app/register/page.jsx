'use client'
import React from 'react'
import { Fragment, useState } from 'react'
import Link from "next/link";
import axios from 'axios';
import { yupResolver } from'@hookform/resolvers/yup'
import * as yup from 'yup'
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const registration = () => {

    const [ loginUserName, setLoginUserName ] = useState('')
    const [ loginPassword, setLoginPassword ] = useState('')

    const register = () => {
        axios.post('http://localhost:3001/register',
        {
            username: loginUserName,
            password: loginPassword   

        }).then(res =>{
            console.log(res)
          toast.success('Registration Successful!')

    }).catch(er => console.log(er));

    }



    return (
                <div className='bg-white p-2 rounded'>
                    <div className='py-6 px-6 lg:px-8 text-left'>
                        <h3 className='mb-4 text-xl font-medium text-gray-900'>
                            Create Account
                        </h3>

                            <div className='my-10'>

                                <label
                                className='block mb-2 text-sm font-medium text-gray-900'>
                                    Email
                                </label>
                                <input type='text' name='email' id='email' className='bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 blocl w-full p-2.5'
                                placeholder='name@domain.com' onChange={e => setLoginUserName(e.target.value)}
                                />
                            </div>
                            <div className='my-10'>
                                <label
                                className='block mb-2 text-sm font-medium text-gray-900'>
                                    Password
                                </label>
                                <input type='password' name='password' id='password' className='bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 blocl w-full p-2.5'
                                placeholder='••••••••••' onChange={e => setLoginPassword(e.target.value)}
                                />
                            </div>

                            <button onClick={register}
                            className='w-full text-white bg-emerald-950 hover:bg-emerald-700
                            focus:ring-4 focus:outline-none focus:ring-blue-300
                            font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                            Create and Login
                            </button>   

                    </div>
                    <ToastContainer />
                </div>
    )    

}

export default registration;