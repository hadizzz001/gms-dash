"use client"

import AddPost from './../components/AddPost'
import PostList from './../components/PostList' 
import { fetchTemp } from './../utils'
import { useState, useEffect } from "react";

 

const dashboard = () => {
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
        <h1 className='text-3xl font-bold'>Admin Dashbaord</h1>

        <AddPost />
      </div>  
      {
      allTemp && allTemp?.length > 0 ? (
      <PostList posts={allTemp} />
      ) : (
        <div className='home___error-container'>
            <h2 className='text-black text-xl dont-bold'>...</h2>

        </div>
    )
    }
    </div>
  )
}

export default dashboard