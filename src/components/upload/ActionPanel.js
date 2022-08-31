import React, { useState } from 'react'

import BootstrapRow from '../structure/BootstrapRow'

import DeleteFileButton from './DeleteFileButton'
import ShareFileForm from './ShareFileForm'
import RejectFileButton from './RejectFileButton'
import DownloadButton from './DownloadButton'

function ActionPanel (props) {

  const [shareFileMode, setShareFileMode] = useState(false)
  const { config } = props
  const { file } = props

  return (
    <React.Fragment>
      <BootstrapRow rowStyle={`row g-1`} colStyle={[`col-auto`, `col`, `col-5`]} >
        <DownloadButton fileId={file._id} file={file}/>
        {config.owner ? <ShareFileForm fileId={file._id} /> : <RejectFileButton file={file} />}
        {config.owner ? <DeleteFileButton fileId={file._id}/> : null}
      </BootstrapRow>
    </React.Fragment>
  )

}

export default ActionPanel
