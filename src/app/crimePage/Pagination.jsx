import React, { Fragment, useState } from "react";
import Link from "next/link";
import { useEffect } from 'react';
import axios from 'axios'

const Pagination = ({users}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 10
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const records = users.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(users.length / recordsPerPage)
    const numbers = [...Array(nPage + 1).keys()].slice(1)
    console.log(currentPage, firstIndex, lastIndex, nPage, records)
    console.log(users.length)

    return(
        <>
                <div>{users.length} </div>
        <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Location ID
                </th>
                <th scope="col" className="px-6 py-3">
                    Location Description
                </th>
            </tr>
        </thead>
        <tbody>
                {
                    users.map((user, i) => {
                        return (
                            <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {user.Location_ID}
                            </th>
                            <td className="px-6 py-4">
                                {user.Location_Description}
                            </td>
                            </tr>
                    )
                    })
                }

        </tbody>
    </table>
    <nav>
        <ul className="pagination">
            <li className="page-item">
                <a href="#" className="page-link"
                onClick = { prePage }>Previous</a>
            </li>
            <li className="page-item">
                <a href="#" className="page-link"
                onClick = { nextPage }>Next</a>
            </li>
        </ul>
    </nav>
</div>
        </>
    )


}

export default Pagination