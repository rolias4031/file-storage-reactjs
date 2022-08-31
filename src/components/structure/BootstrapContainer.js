function BootstrapContainer (props) {

  return (
    <div onClick={props.onMouseEnter} onMouseLeave={props.onMouseLeave} className={props.contStyle}>
      <div className={props.rowStyle}>
        <div className={props.colStyle}>

          {props.children}

        </div>
      </div>
    </div>
  )
}

export default BootstrapContainer
