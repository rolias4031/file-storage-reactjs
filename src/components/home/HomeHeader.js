function HomeHeader (props) {
  const heading = props.name ? `Welcome, ${props.name.first}` : null
  return (
    <h1>{heading}</h1>
  )
}

export default HomeHeader
