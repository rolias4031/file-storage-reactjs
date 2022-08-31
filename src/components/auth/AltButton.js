function AltButton (props) {
  const { config } = props
  const buttonText = `Go to ${config.value}`
  const itemClass = `form-control btn btn-secondary ${config.itemClass}`

  return (
    <button onClick={config.altButtonHandler} className={itemClass} type="button" name="button">{buttonText}</button>
  )

}

export default AltButton
