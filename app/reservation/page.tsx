
"use client"
import Link from "next/link";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { fetchTemp1 } from './../utils'
import { useState, useEffect } from "react";





const page = () => {
    const [allTemp, setTemp] = useState<any>()
    const router = useRouter()

    const a = async () => {
        const b = await fetchTemp1()
        console.log(allTemp);
        
        setTemp(b)
    }
    useEffect(() => {
        a()
    }, [])


    const handleDeletePost = (id) => {

        const confirmed = window.confirm('Are you sure you want to delete?');

        if (confirmed) {
            axios
                .delete(`/api/order/${id}`)
                .then((res: any) => {
                    console.log(res);
                })
                .catch((err: any) => {
                    console.log(err);
                })
                .finally(() => {
                    location.replace('/reservation')
                });
        } else { }

    }










    return (
        <>
            <Link href='/dashboard'>
                <button type="button" className="text-white rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2" style={{ background: "#6c3429" }}>
                    <img src="https://res.cloudinary.com/dixtwo21g/image/upload/v1699388330/next/dmhmwrpyxkjzjzk5iurq.png" width={14} style={{ color: "white" }} alt="" />
                </button>
                Return Home
            </Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Type</th>
                        <th scope="col">Message</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        allTemp && allTemp?.length > 0 ? (
                            allTemp.map((post: any, index: any) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{post.firstname}</td>
                                    <td>{post.lastname}</td>
                                    <td>{post.email}</td>
                                    <td>{post.phone}</td>
                                    <td>{post.type}</td>
                                    <td>{post.message}</td>
                                    <td><button onClick={() => handleDeletePost(post.id)} className="text-red-700 mr-3">Delete</button></td>
                                </tr>
                            ))
                            ) : (
                            <div className='home___error-container'>
                                <h2 className='text-black text-xl dont-bold'>...</h2>

                            </div>
                        )
                    }

                </tbody>
            </table>
        </>

    )
}

export default page