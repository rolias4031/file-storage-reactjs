import React, { useContext } from 'react'

import FetchContext from '../../store/FetchContext'

function RejectFileButton (props) {
  const ctx = useContext(FetchContext)
  return (
    <button onClick={rejectFileHandler} type="button" className="btn btn-danger btn-sm" >Reject</button>
  )

  async function rejectFileHandler () {
    const token = localStorage.getItem('token')
    const url = `${ctx.baseUrl}storage/reject-shared-file`
    console.log(props.file._id);
    const fetchOptions = {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fileIdToReject: props.file._id
      })
    }
    //
    // make PUT request
    try {
      const {response, result} = await ctx.fetchHandler(url, fetchOptions)
      ctx.responseHandler(response, result)
      ctx.setAlert({ message: result.message, timeStamp: Date.now(), error: false })
      ctx.setForceUpdate(Date.now())
    } catch (error) {
      console.log(error);
      ctx.setAlert({ message: error.message, data: error.data, timeStamp: Date.now(), error: true })
    }
  }
}

export default RejectFileButton
