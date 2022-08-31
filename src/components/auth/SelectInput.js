import React, { forwardRef } from 'react'

const SelectInput = forwardRef((props, ref) => {

  const { config } = props
  const itemClass = `form-control ${config.itemClass}`

  return (
    <React.Fragment>

      { config.labelTitle ? <label className="">{config.labelTitle}</label> : null }
      { config.stateHandler ? (
          <select onChange={changeHandler} className={itemClass} name={config.name}>
            <option value="PERSONAL">Personal</option>
            <option value="BUSINESS">Business</option>
          </select>
        )
        : (
          <select ref={ref} className={itemClass} name="">
            <option value="PERSONAL">Personal</option>
            <option value="BUSINESS">Business</option>
          </select>
        )
      }


    </React.Fragment>
  )

  function changeHandler (event) {
    config.stateHandler((prevState) => {
      return {...prevState, [event.target.name]: event.target.value}
    })
  }
})

export default SelectInput
