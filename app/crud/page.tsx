"use client"

import AddPost from '../components/AddPost'
import PostList from '../components/PostList'
import { fetchTemp } from './../utils'
import { useState, useEffect } from "react";

 



const Crud = async () => {

    const [allTemp, setTemp] = useState<any>()

    const a = async () => { 
        const b = await fetchTemp()  
        setTemp(b) 
    }
    useEffect(() => {
        a()
    }, [])

  return (
    <div className='max-w-4xl mx-auto mt-4'>
        <div className='my-5 flex flex-col gap-4'>
            <h1 className='text-3xl font-bold'>Todo List App</h1>
            <AddPost />
        </div> 
        <PostList posts={allTemp} />
    </div>
  )
}

export default Crud