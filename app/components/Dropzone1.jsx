'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone'
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { getSignature, saveToDatabase } from '../_actions'
import axios from "axios";

const Dropzone1 = ({ postid }, { className }) => {
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])
  const router = useRouter();
  const [inputs, setInputs] = useState({});

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        // If allowing multiple files
        // ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }

    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'pdf/*': []
    },
    maxFiles: 1,
    onDrop
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = name => {
    setFiles(files => files.filter(file => file.name !== name))
  }

 
  useEffect(() => {
    axios
      .patch(`/api/posts/${postid}`, inputs)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [inputs]);

 


  async function action() {

    try {


      const file = files[0]
      if (!file) return

      // get a signature using server action
      const { timestamp, signature } = await getSignature()

      // upload to cloudinary using the signature
      const formData = new FormData()

      formData.append('file', file)
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
      formData.append('signature', signature)
      formData.append('timestamp', timestamp)
      formData.append('folder', 'next')

      const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL
      const data = await fetch(endpoint, {
        method: 'POST',
        body: formData
      }).then(res => res.json())

      // write to database using server actions
      saveToDatabase({
        version: data?.version,
        signature: data?.signature,
        public_id: data?.public_id, 
      })
 

      setInputs({
        pdf: "https://res.cloudinary.com/dixtwo21g/image/upload/v" + data?.version + "/" + data?.public_id + ".pdf"
      })
      window.location.replace("/dashboard");

    } catch (err) {
      console.log("Error ::::::::::::::::: " + err);
    } 

  }

  return (
    <form id='form2' action={action}>
      <div
        {...getRootProps({
          className: className
        })}
      >
        <input {...getInputProps({ name: 'file' })} />
        <div className='flex flex-col items-center justify-center gap-4'>
          <ArrowUpTrayIcon className='h-5 w-5 fill-current' />
          {isDragActive ? (
            <p>Drop the PDF here ...</p>
          ) : (
            <p>Drag & drop PDF here, or click to select PDF</p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className='mt-10' style={{ width: "100%" }}>
        <div className='flex gap-4'>
          <button
            style={{ height: "50px", width: "100px" }}
            type='submit'
            className='ml-auto mt-1 rounded-md border px-3 text-[12px] font-bold uppercase tracking-wider text-stone-500 '
          >
            Upload
          </button>
        </div>


        <ul className='mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
          {files.map(file => (
            <li key={file.name} className='relative h-32 rounded-md shadow-lg'>
              <Image
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview)
                }}
                className='h-full w-full rounded-md object-contain'
              />
              <button
                type='button'
                className='absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full border border-rose-400 bg-rose-400 transition-colors hover:bg-white'
                onClick={() => removeFile(file.name)}
              >
                <XMarkIcon className='h-5 w-5 fill-white transition-colors hover:fill-rose-400' />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </form>
  )
}

export default Dropzone1
