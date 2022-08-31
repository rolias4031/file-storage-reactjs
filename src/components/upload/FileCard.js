import React, { useState } from 'react'

import BootstrapContainer from '../structure/BootstrapContainer'

import ActionPanel from './ActionPanel'

function FileCard (props) {
  // config.owned sets whether the file is owned or shared
  const [showActions, setShowActions] = useState(false)
  const { config } = props
  const { file } = props

  const contStyle = 'container my-2'
  const rowStyle = 'row'
  const colStyle = 'col'

  return (
    <BootstrapContainer onMouseEnter={hoverEnterHandler} onMouseLeave={hoverLeaveHandler} contStyle={contStyle} rowStyle={rowStyle} colStyle={colStyle}>
      <div className="">{file._id}</div>
      <div className="">{file.name}</div>
      <div className="">{file.createdAt}</div>
      <div className="">{file.downloadCount}</div>
      {showActions ? <ActionPanel file={file} config={config} /> : null}
    </BootstrapContainer>
  )

  function hoverEnterHandler () {
    setShowActions(true)
  }

  function hoverLeaveHandler () {
    setShowActions(false)
  }
}

export default FileCard
