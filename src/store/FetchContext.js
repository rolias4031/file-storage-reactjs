import React, { useContext, useState } from 'react'

const FetchContext = React.createContext({
  baseUrl: '',
  responseHandler: () => {},
  fetchHandler: () => {},
  alert: {
    message: '',
    data: '',
    timeStamp: '',
    error: false
  },
  setAlert: () => {}
})

export function FetchContextProvider (props) {

  const [forceUpdate, setForceUpdate] = useState(Date.now())
  const [alert, setAlert] = useState({
    message: '',
    error: false
  })
  const baseUrl = 'http://localhost:8080/'

  return (
    <FetchContext.Provider value={{
      baseUrl: baseUrl,
      responseHandler: responseHandler,
      fetchHandler: fetchHandler,
      forceUpdate: forceUpdate,
      setForceUpdate: setForceUpdate,
      alert: {...alert},
      setAlert: setAlert
    }}>
      {props.children}
    </FetchContext.Provider>
  )

  async function fetchHandler (url, fetchOptions) {
    const response = await fetch(url, fetchOptions)
    console.log(response)
    const result = await response.json()
    console.log(result)
    return { response, result }
  }

  function responseHandler (response, result) {
    if (response.status !== 200 && response.status !== 201) {
      const error = new Error(result.message)
      error.data = result.data
      throw error
    }
  }

}

export default FetchContext
