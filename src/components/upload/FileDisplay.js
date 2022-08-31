import React, { useState, useContext, useEffect } from 'react'

import BootstrapRow from '../structure/BootstrapRow'
import FetchContext from '../../store/FetchContext'

import FileCard from './FileCard'

function FileDisplay (props) {

  return (
    <React.Fragment>
      <BootstrapRow rowStyle={`row my-3`} colStyle={`col`}>
        <h6>Your Files</h6>
        {renderFiles()}
      </BootstrapRow >
      <BootstrapRow rowStyle={`row my-3`} colStyle={`col`}>
        <h6>Files Shared With You</h6>
        {renderSharedFiles()}
      </BootstrapRow >
    </React.Fragment>
  )

  function renderFiles () {
    let content
    if (props.files) {
      content = props.files.map((file) => {
        return <FileCard key={file._id} file={file} config={{ owner: true }}/>
      })
    }
    return content
  }

  function renderSharedFiles () {
    let content
    if (props.sharedFiles) {
      content = props.sharedFiles.map((sharedFile) => {
        return <FileCard key={sharedFile._id} file={sharedFile} config={{ owner: false }}/>
      })
    }
    return content
  }


}

export default FileDisplay
