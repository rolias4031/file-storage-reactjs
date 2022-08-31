import React, { useRef, useContext } from 'react'
import TextInput from '../auth/TextInput'
import SubmitButton from '../auth/SubmitButton'
import FetchContext from '../../store/FetchContext'

function ChangeDetailForm (props) {

  const { type } = props

  const aRef = useRef(); const bRef = useRef(); const cRef = useRef()
  const ctx = useContext(FetchContext)

  const config = {
    header: type === 'PASSWORD' ? 'Change Password' : 'Change Email',
    inputA: type === 'PASSWORD' ? 'Old Password' : 'New Email',
    inputB: type === 'PASSWORD' ? 'New Password' : 'Confirm New Email',
    inputC: type === 'PASSWORD' ? 'Confirm New Password' : 'Password',
    bodyA: type === 'PASSWORD' ? 'oldPassword' : 'newEmail',
    bodyB: type === 'PASSWORD' ? 'newPassword' : 'confirmNewEmail',
    bodyC: type === 'PASSWORD' ? 'confirmPassword' : 'password',
    url: type === 'PASSWORD' ? 'auth/change-password' : 'auth/change-email'
  }

  return (
    <React.Fragment>
    <h6>{config.header}</h6>
      <form onSubmit={changeDetailHandler} className="form-control">
        <TextInput ref={aRef} config={{
          placeholder: config.inputA,
          itemClass: 'my-2'
        }}/>
        <TextInput ref={bRef} config={{
          placeholder: config.inputB,
          itemClass: 'my-2'
        }}/>
        <TextInput ref={cRef} config={{
          placeholder: config.inputC,
          itemClass: 'my-2'
        }}/>
        <SubmitButton config={{
          value: 'Save Changes',
          itemClass: 'btn-primary my-1'
        }}/>
      </form>
    </React.Fragment>
  )

  async function changeDetailHandler (e) {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) {
      console.log('NO TOKEN');
      return
    }
    const aInput = aRef.current.value
    const bInput = bRef.current.value
    const cInput = cRef.current.value
    const url = `${ctx.baseUrl}${config.url}`
    const fetchOptions = {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        [config.bodyA]: aInput,
        [config.bodyB]: bInput,
        [config.bodyC]: cInput
      })
    }
    ctx.fetchHandler(url, fetchOptions)
  }
}

export default ChangeDetailForm
