import React, { useState } from 'react'

import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

function Auth (props) {

  const [formMode, setFormMode] = useState('LOGIN')

  return (
    <React.Fragment>
      {renderAuthContent()}
    </React.Fragment>
  )

  function renderAuthContent () {
    let content
    if (formMode === 'LOGIN') {
      content = (
        <React.Fragment>
          <LoginForm setIsAuth={props.setIsAuth} setFormMode={setFormMode}/>
        </React.Fragment>
      )
    } else if (formMode === 'SIGNUP') {
      content = (
        <React.Fragment>
          <SignupForm setFormMode={setFormMode}/>
        </React.Fragment>
      )
    }
    return content
  }


}

export default Auth
