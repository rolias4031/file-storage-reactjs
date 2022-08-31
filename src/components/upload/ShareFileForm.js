import React, { useRef, useContext } from 'react'

import BootstrapRow from '../structure/BootstrapRow'
import SubmitButton from '../auth/SubmitButton'
import TextInput from '../auth/TextInput'
import AltButton from '../home/AltButton'

import FetchContext from '../../store/FetchContext'

function ShareFileForm (props) {

  const ctx = useContext(FetchContext)
  const emailRef = useRef()

  const style = {
  }
  return (
    <React.Fragment>
      <form className="" onSubmit={shareFileHandler} style={style}>
        <BootstrapRow rowStyle={`row g-1`} colStyle={['col', 'col-auto']} >
          <input ref={emailRef} className="form-control form-control-sm mx-0" type="text" name="" placeholder="Email" />
          <input className="btn btn-primary btn-sm mx-0" type="submit" name="" value="Share" />
        </BootstrapRow >
      </form>
    </React.Fragment>
  )

  async function shareFileHandler (e) {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const url = `${ctx.baseUrl}storage/share-file`
    const fetchOptions = {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fileId: props.fileId,
        sharedUserEmail: emailRef.current.value
      })
    }
    try {
      const { response, result } = await ctx.fetchHandler(url, fetchOptions)
      ctx.responseHandler(response, result)
      ctx.setAlert({ message: result.message, timeStamp: Date.now(), error: false })
    } catch (error) {
      console.log(error)
      ctx.setAlert({ message: error.message, data: error.data, timeStamp: Date.now(), error: true })

    }
  }
}

export default ShareFileForm
