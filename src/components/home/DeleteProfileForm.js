import React, { useRef, useContext } from 'react'

import TextInput from '../auth/TextInput'
import CheckboxInput from './CheckboxInput'
import SubmitButton from '../auth/SubmitButton'

import FetchContext from '../../store/FetchContext'

function DeleteProfileForm (props) {

  const ctx = useContext(FetchContext)

  const passwordRef = useRef(); const checkRef = useRef()

  return (
    <form onSubmit={deleteHandler} className="form-control">
      <TextInput ref={passwordRef} config={{
        placeholder: 'Password',
        itemClass: 'my-2'
      }} />
      <CheckboxInput ref={checkRef} />
      <SubmitButton config={{
        value: 'Delete Profile Forever',
        itemClass: 'btn-danger my-1 btn-lg'
      }} />
    </form>
  )

  async function deleteHandler (e) {
    e.preventDefault()
    if (!checkRef.current.checked) {
      // some kind of alert
      return
    }
    const token = localStorage.getItem('token')
    const password = passwordRef.current.value
    const url = `${ctx.baseUrl}auth/delete`
    const fetchOptions = {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify({
        password: password
      })
    }
    try {
      const response = await fetch(url, fetchOptions)
      const result = await response.json()
      ctx.responseHandler(response, result)
      ctx.setAlert({ message: result.message, timeStamp: Date.now(), error: false })
      localStorage.removeItem('token')
      props.setIsAuth(false)
    } catch (error) {
      ctx.setAlert({ message: error.message, timeStamp: Date.now(), data: error.data, error: true })
    }
  }
}

export default DeleteProfileForm
