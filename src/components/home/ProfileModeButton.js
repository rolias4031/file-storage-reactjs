function ProfileModeButton (props) {

  const { config } = props
  const itemClass = `form-control btn ${config.style}`
  return (
    <button onClick={clickHandler} className={itemClass} type="button" name="button">{config.name}</button>
  )

  function clickHandler () {
    props.onClick(true)
  }
}

export default ProfileModeButton
