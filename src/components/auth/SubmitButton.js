import React from 'react'

function SubmitButton (props) {
  // needs config = { itemClass, value }
  const { config } = props
  const itemClass = `form-control btn ${config.itemClass}`

  return (
    <input className={itemClass} type="submit" value={config.value} />
  )
}

export default SubmitButton
