import React, { useRef, useEffect, useContext } from 'react'
import TextInput from './TextInput'
import SubmitButton from './SubmitButton'
import AltButton from './AltButton'

import FetchContext from '../../store/FetchContext'

function LoginForm (props) {

  const ctx = useContext(FetchContext)
  const emailRef = useRef(); const passwordRef = useRef()

  return (
    <React.Fragment>
    <h1>Login</h1>
    <form onSubmit={loginHandler} className="form-control">
      <TextInput ref={emailRef} config={{
        placeholder: 'Email',
        itemClass: 'my-2'
      }}/>
      <TextInput ref={passwordRef} config={{
        placeholder: 'Password',
        itemClass: 'my-2'
      }}/>
      <SubmitButton config={{
        value: 'Login',
        itemClass: 'btn-primary my-1'
      }}/>
      <AltButton config={{
        value: 'Signup',
        altButtonHandler: altButtonHandler,
        itemClass: 'my-1'
      }}/>
    </form>
    </React.Fragment>
  )

  function altButtonHandler () {
    props.setFormMode('SIGNUP')
  }

  async function loginHandler (e) {
    e.preventDefault()
    // get inputs
    const email = emailRef.current.value
    const password = passwordRef.current.value
    console.log(email, password);
    // set request options
    const url = 'http://localhost:8080/auth/login'
    const fetchOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }
    // make request
    try {
      const response = await fetch(url, fetchOptions)
      const result = await response.json()
      ctx.responseHandler(response, result)
      localStorage.setItem('token', result.token)
      props.setIsAuth(true)
      ctx.setAlert({ message: result.message, timeStamp: Date.now(), error: false })
    } catch (error) {
      console.log(error);
      props.setIsAuth(false)
      ctx.setAlert({ message: error.message, timeStamp: Date.now(), data: error.data, error: true })
    }
  }

}

export default LoginForm
