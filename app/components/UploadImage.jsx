import Dropzone from './Dropzone'

export default function UploadImage() {
  return (
    <section>
      <div className='container'>
        {/* <h1 className='text-3xl font-bold'>Upload Files</h1> */}
        <Dropzone className='mt-10 border border-neutral-200 p-16' />
      </div>
    </section>
  )
}
