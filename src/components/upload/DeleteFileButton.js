import React, { useContext } from 'react'

import FetchContext from '../../store/FetchContext'

function DeleteFileButton (props) {
  const ctx = useContext(FetchContext)
  return (
    <React.Fragment>
      <button
        onClick={deleteFileHandler}
        className="btn btn-danger btn-sm"
        type="button"
        style={{ float: 'right' }}
      >Delete</button>
    </React.Fragment>
  )

  async function deleteFileHandler () {
    const token = localStorage.getItem('token')
    const url = `${ctx.baseUrl}storage/delete-file`
    const fetchOptions = {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fileId: props.fileId
      })
    }
    // make request
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

export default DeleteFileButton
