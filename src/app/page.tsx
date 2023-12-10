'use client'
import React, { Fragment, useState } from "react";
import Link from "next/link";
import { useEffect } from 'react';
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'

export default function Home() {

  const [users, setUsername] = useState([])

  useEffect(() => {
      // getUsers();

  }, []);

  // const getUser = () => {
  //     axios({
  //         method: "get",
  //         withCredentials: true,
  //         url: "http://localhost:3001/getUser"
  //     }).then(res => console.log(setUsername(res.data.email))).catch(err => console.log(err))
  // };

//   const getUsers = async () => {
//     axios({
//         method: "get",
//         withCredentials: true,
//         url: "http://localhost:3001/getUser"
//     }).then(res => {
//       console.log(setUsername(res.data.email));
//     }).catch(err => console.log(err))

// };

function handleScroll() {
  window.scroll({
    top: document.body.offsetHeight,
    left: 0, 
    behavior: 'smooth',
  });
}


  return (
    <>
      <div className='overflow-x-hidden text-white'>
        <div>
        <h2 className="text-xl text-right text-white">Welcome, { users }!</h2>
        </div>
      {/* background */}
      <video src={"/160725_181_Chicago_1080p.mp4"} loop autoPlay muted className='object-cover absolute h-screen w-screen -z-10 top-0 left-0'></video>

      {/* content */}
      <div className='px-72 w-[80%] h-screen flex flex-col justify-center text-white space-y-5'>
        <span className='text-6xl'>
        When You Go You Know..
        </span>
        <span className='text-neutral-200'>
        Where the skyline meets the soul: Chicago's urban symphony of lights and life, a breathtaking dance along the shores of Lake Michigan!        </span>
        <button className='w-fit px-12 py-4 bg-black border-2 border-black text-white hover:bg-transparent hover:border-white duration-200' onClick={handleScroll}>
          Read More
        </button>
      </div>

    <div className="container">
      <h2 className="text-4xl font-extrabold my-10 text-center font-montserrat font-bold">Life in Chicago</h2>
        <p>
          The Magnificent Mile, Millennium Park and the Willis Tower may blow many visitors away, but for those who live in the Windy City, the landmarks often become second thought.
        </p>

        <br></br>

        <p>
          Your experience living in Chicago will depend on your ZIP code. From Uptown to Hyde Park, East Garfield to the Loop, each of the city's 77 official community areas brings a unique personality. The summer's festivals, fireworks and beach afternoons shift to ice skating, zoo lights and holiday cheer in the winter months – with a mix of a warming spring and a colorful fall in between. The expansive Museum Campus is second to none, the beloved Cubbies never fail to entertain and the various festivals are seemingly never-ending.
        </p>

        <br></br>

        <p>
          Chicago residents exude Midwestern friendliness, offering "hellos" and "good mornings" to passers-by – as long as the weather's warm. Most people stay polite through the holiday season, but after that, all bets are off. As the weather begins to border on unbearably cold, Chicago residents lose their patience, acting as if they're in a hurry to be somewhere – whether or not that's actually the case.
        </p>
      </div>
      </div>

    </>
  );
}