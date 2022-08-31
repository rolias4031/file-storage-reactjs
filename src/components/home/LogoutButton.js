import React, { useContext } from 'react'
import FetchContext from '../../store/FetchContext'

function LogoutButton (props) {

  return (
    <button onClick={clickHandler} className="btn btn-dark" type="button" name="button">Logout</button>
  )

  function clickHandler () {
    localStorage.removeItem('token')
    props.setIsAuth(false)
  }
}

export default LogoutButton
