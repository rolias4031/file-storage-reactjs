import React from 'react'

import UploadForm from './UploadForm'
import FileDisplay from './FileDisplay'

function Upload (props) {
  return (
    <React.Fragment>
      <h1>Upload a File</h1>
      <UploadForm />
      <FileDisplay
        files={props.profile.files}
        sharedFiles={props.profile.sharedFiles}
      />
    </React.Fragment>
  )
}

export default Upload
