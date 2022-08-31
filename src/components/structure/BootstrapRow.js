import React from 'react'

function BootstrapRow (props) {

  // component takes an array of columns for props.colStyle. Length must match number of props.children.

  const children = props.children

  return (
    <div className={`${props.rowStyle}`}>
      {renderRowContent()}
    </div>
  )

  function renderRowContent () {
    let content = React.Children.map(children, (child, i) => {
      return (
        <div className={`${props.colStyle[i]}`}>
          {child}
        </div>
      )
    })
    return content
  }
}

export default BootstrapRow
