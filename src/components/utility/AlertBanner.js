import React, { useEffect } from 'react'
import BootstrapContainer from '../structure/BootstrapContainer'

function AlertBanner (props) {

  const { setAlert } = props
  const { alert } = props
  let content

  useEffect(() => {
    const id = setTimeout(() => {
      setAlert({message: null, error: null})
    }, 5000)
    return () => {
      clearTimeout(id)
    }
  }, [alert.timeStamp])

  const style = alert.error ? 'alert alert-danger' : 'alert alert-success'

  if (alert.data) {
    content = (
      alert.data.map((data, i) => {
        return <div key={i} className="">{data.msg}</div>
      })
    )
  }

  return (
    <BootstrapContainer contStyle={`container text-center my-4`} rowStyle={`row`} colStyle={`col ${style}`}>
      <h5 className="">{alert.message}</h5>
      {content}
    </BootstrapContainer>

  )

}

export default AlertBanner
