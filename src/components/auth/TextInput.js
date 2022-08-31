import React, { forwardRef } from 'react'

const TextInput = forwardRef((props, ref) => {

  // needs config={ itemClass, placeholder } ref={ref}

  const { config } = props
  const itemClass = `form-control ${config.itemClass}`

  return (
    <React.Fragment>
      {config.labelTitle ? <label htmlFor="">{config.labelTitle}</label> : null}
      {config.stateHandler ?
        <input onChange={changeHandler} className={itemClass} type="text" name={config.name} value={config.value} />
        : <input ref={ref} className={itemClass} type="text" placeholder={config.placeholder} />
      }
    </React.Fragment>
  )

  function changeHandler (event) {
    config.stateHandler((prevState) => {
      return {...prevState, [event.target.name]: event.target.value}
    })
  }
})

export default TextInput
