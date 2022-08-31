import React, { useContext, useState, useRef } from 'react'

import FetchContext from '../../store/FetchContext'
import DownloadAnchor from './DownloadAnchor'

function DownloadButton (props) {

  const ctx = useContext(FetchContext)
  const [fileToDownload, setFileToDownload] = useState('')
  const anchorRef = useRef()
  return (
    <React.Fragment>
      <button onClick={downloadHandler} className="btn btn-secondary btn-sm" type="button">Download</button>
    </React.Fragment>
  )

  async function downloadHandler () {
    const token = localStorage.getItem('token')
    console.log(props.fileId);
    const url = `${ctx.baseUrl}storage/download-file/${props.fileId}`
    const fetchOptions = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
    // make download request
    try {
      const response = await fetch(url, fetchOptions)
      const blob = await response.blob()
      const file = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = file
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(file)
      ctx.setForceUpdate(Date.now())
    } catch (error) {
      console.log(error)
      ctx.setAlert({ message: error.message, data: error.data, timeStamp: Date.now(), error: true })
    }
  }
}
export default DownloadButton
