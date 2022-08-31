import React, { useRef, useEffect, useContext } from 'react'
import TextInput from './TextInput'
import SelectInput from './SelectInput'
import SubmitButton from './SubmitButton'
import AltButton from './AltButton'

import FetchContext from '../../store/FetchContext'

import BootstrapRow from '../structure/BootstrapRow'

function SignupForm (props) {

  const ctx = useContext(FetchContext)
  const emailRef = useRef(); const passwordRef = useRef(); const confirmPwRef = useRef();
  const firstNameRef = useRef(); const lastNameRef = useRef(); const profileTypeRef = useRef()

  return (
    <React.Fragment>
    <h1>Signup</h1>
    <form onSubmit={signupHandler} className="form-control">
      <BootstrapRow rowStyle={`row`} colStyle={['col', 'col']}>
        <TextInput ref={firstNameRef} config={{
          labelTitle: '',
          placeholder: 'First Name',
          itemClass: 'form-control-inline my-2'
        }}/>

        <TextInput ref={lastNameRef} config={{
          labelTitle: '',
          placeholder: 'Last Name',
          itemClass: 'form-control-inline my-2'
        }}/>
      </ BootstrapRow>
      <TextInput ref={emailRef} config={{
        labelTitle: '',
        placeholder: 'Email',
        itemClass: 'my-2'
      }}/>
      <TextInput ref={passwordRef} config={{
        labelTitle: '',
        placeholder: 'Password',
        itemClass: 'my-2'
      }}/>
      <TextInput ref={confirmPwRef} config={{
        labelTitle: '',
        placeholder: 'Confirm Password',
        itemClass: 'my-2'
      }}/>
      <SelectInput ref={profileTypeRef} config={{
        labelTitle: 'Profile Type',
        itemClass: 'my-2'
      }}/>
      <SubmitButton config={{
        value: 'Signup',
        itemClass: 'btn-primary mt-2 mb-1'
      }}/>
      <AltButton config={{
        value: 'Login',
        itemClass: 'my-1',
        altButtonHandler: altButtonHandler
      }}/>
    </form>
    </React.Fragment>
  )

  function altButtonHandler () {
    props.setFormMode('LOGIN')
  }

  async function signupHandler (e) {
    e.preventDefault()
    const email = emailRef.current.value
    const firstName = firstNameRef.current.value
    const lastName = lastNameRef.current.value
    const password = passwordRef.current.value
    const confirmPw = confirmPwRef.current.value
    const profileType = profileTypeRef.current.value
    // prepare fetch options
    const url = 'http://localhost:8080/auth/signup'
    const fetchOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: {
          first: firstName,
          last: lastName
        },
        email: email,
        password: password,
        confirmPw: confirmPw,
        profileType: profileType
      })
    }
    try {
      const response = await fetch(url, fetchOptions)
      console.log(response.status);
      const result = await response.json()
      console.log(result);
      ctx.responseHandler(response, result)
      ctx.setAlert({ message: result.message, timeStamp: Date.now(), error: false})
      props.setFormMode('LOGIN')
    } catch (error) {
      console.log(error);
      ctx.setAlert({ message: error.message, timeStamp: Date.now(), data: error.data, error: true })
    }
  }
}

export default SignupForm
