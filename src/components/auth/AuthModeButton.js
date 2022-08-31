function AuthModeButton (props) {
  return (
    <button onClick={clickHandler} className="btn btn-primary" type="button" name="button">Login/Signup</button>
  )

  function clickHandler () {
    props.setIsAuth(true)
  }
}

export default AuthModeButton
