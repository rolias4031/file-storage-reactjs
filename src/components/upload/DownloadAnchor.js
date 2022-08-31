import React, { forwardRef } from 'react'

const DownloadAnchor = forwardRef((props, ref) => {
  return (
    <a ref={ref} href={props.file} download>Text</a>
  )
})

export default DownloadAnchor
