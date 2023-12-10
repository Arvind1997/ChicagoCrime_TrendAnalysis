'use client'
import React from 'react'
import { Fragment, useState } from 'react'
import Register from '../register/page'
import Link from "next/link";
import axios from 'axios';

const login = () => {



    const [ loginUserName, setLoginUserName ] = useState('')
    const [ loginPassword, setLoginPassword ] = useState('')

    const login = () => {
        axios({
            method: "post",
            data: {
                username: loginUserName,
                password: loginPassword
            },
            withCredentials: true,
            url: "http://localhost:3001/login"
        }).then(res => console.log(res)).catch(err => console.log(err));
    }

    return (
                <div className='bg-white p-2 rounded'>
                    <div className='py-6 px-6 lg:px-8 text-left'>
                        <h3 className='mb-4 text-xl font-medium text-gray-900'>
                            Login or Sign-up
                        </h3>

                            <div>

                                <label
                                className='block mb-2 text-sm font-medium text-gray-900'>
                                    Your email
                                </label>
                                <input type='email' name='email' id='email' className='bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 blocl w-full p-2.5'
                                placeholder='name@domain.com'
                                required 
                                onChange={e => setLoginUserName(e.target.value)} />
                            </div>
                            <div>
                                <label
                                className='block mb-2 text-sm font-medium text-gray-900'>
                                    Your Password
                                </label>
                                <input type='password' name='password' id='password' className='bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 blocl w-full p-2.5'
                                placeholder='••••••••••'
                                required 
                                onChange={e => setLoginPassword(e.target.value)} />
                            </div>
                            <Link href='/'>
                            <button
                            onClick = { login }
                            className='w-full text-white bg-emerald-200 hover:bg-emerald-800
                            focus:ring-4 focus:outline-none focus:ring-blue-300
                            font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                            Login to your Account
                            </button>      
                            </Link>     
                            <div className='text-sm font-medium text-gray-500'>
                                Not registered?{" "}
                            <Fragment>
                            <Link href='/register'>
                            <p className='text-emerald-500 hover:underline hover:text-emerald-700'>
                            Create Account
                            </p>
                            </Link>
                            </Fragment>
                            </div>

                    </div>
                </div>

    )
}

export default login