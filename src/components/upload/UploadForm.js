import React, { useRef, useContext } from 'react'
import axios from 'axios'

import FetchContext from '../../store/FetchContext'
import SubmitButton from '../auth/SubmitButton'
import TextInput from '../auth/TextInput'

function UploadForm (props) {
  const ctx = useContext(FetchContext)
  const fileRef = useRef(); const shareRef = useRef()

  return (
    <form onSubmit={uploadFileHandler} className="form-control">
      <input className='form-control my-1' ref={fileRef} type="file" />
      <TextInput ref={shareRef} config={{
        labelTitle: 'Share this file?',
        placeholder: 'Enter an Email',
        itemClass: 'my-1'
      }}/>
      <SubmitButton config={{
        value: 'Upload File',
        itemClass: 'btn-primary my-2'
      }}/>
    </form>
  )

  async function uploadFileHandler (e) {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const file = fileRef.current.files[0]
    const sharedWith = shareRef.current.value
    const formData = new FormData()
    formData.append('name', file.name)
    formData.append('file', file)
    formData.append('sharedWith', sharedWith)
    const url = `${ctx.baseUrl}storage/upload`
    const fetchOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
      },
      body: formData
    }
    try {
      const {response, result} = await ctx.fetchHandler(url, fetchOptions)
      ctx.responseHandler(response, result)
      ctx.setAlert({ message: result.message, timeStamp: Date.now(), error: false })
      ctx.setForceUpdate(Date.now())
    } catch (error) {
      console.log(error);
      ctx.setAlert({ message: error.message, data: error.data, timeStamp: Date.now(), error: true })
    }
  }
}

export default UploadForm
