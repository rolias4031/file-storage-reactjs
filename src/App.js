import React, { useState, useContext } from 'react'

import BootstrapContainer from './components/structure/BootstrapContainer'
import AuthModeButton from './components/auth/AuthModeButton'
import Auth from './components/auth/Auth'
import AlertBanner from './components/utility/AlertBanner'

import UserProfile from './components/home/UserProfile'

import FetchContext from './store/FetchContext'

function App() {

  const ctx = useContext(FetchContext)
  const [isAuth, setIsAuth] = useState(true)

  return (
    <React.Fragment>
      <BootstrapContainer contStyle='container my-5' rowStyle='row' colStyle='col' >
        {renderUserProfile()}
        {renderAuth()}
      </BootstrapContainer>
      <BootstrapContainer contStyle='container my-5' rowStyle='row' colStyle='col' >
        {renderAlert()}
      </BootstrapContainer>

    </React.Fragment>
  );

  function renderUserProfile () {
    return (
      isAuth ? <UserProfile isAuth={isAuth} setIsAuth={setIsAuth} /> : null
    )
  }

  function renderAuth () {
    return (
      !isAuth ? <Auth setIsAuth={setIsAuth}/> : null
    )
  }

  function renderAlert () {
    return (
        ctx.alert.message ? <AlertBanner alert={ctx.alert} setAlert={ctx.setAlert}/> : null
      )
  }

}

export default App;
