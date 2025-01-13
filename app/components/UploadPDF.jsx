import Dropzone1 from './Dropzone1'

export default function UploadImage({postid}) { 
  return (
    <section>
      <div className='container'> 
        {/* <h1 className='text-3xl font-bold'>Upload Files</h1> */}
        <Dropzone1 postid={postid} className='mt-10 border border-neutral-200 p-16' />
      </div>
    </section>
  )
}
