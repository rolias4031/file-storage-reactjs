function AltButton (props) {
  
  const { config } = props
  const itemClass = `form-control btn btn-secondary ${config.itemClass}`

  return (
    <button onClick={config.altButtonHandler} className={itemClass} type="button" name="button">{config.value}</button>
  )

}

export default AltButton
