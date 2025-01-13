import React from 'react'
import UploadImage from '../components/UploadImage' 

const page = () => {
  return (
    <div>
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <UploadImage/> 
        </Modal>
    </div>
  )
}

export default page