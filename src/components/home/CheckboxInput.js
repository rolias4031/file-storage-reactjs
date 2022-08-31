import React, { forwardRef } from 'react'

const CheckboxInput = forwardRef((props, ref) => {
  return (
    <React.Fragment>
      <div className="form-check">
        <label className="form-check-label" htmlFor="confirm">I want to delete my profile forever</label>
        <input ref={ref} className="form-check-input" type="checkbox" name="confirm" value="true"/>
      </div>
    </React.Fragment>
  )
})

export default CheckboxInput
