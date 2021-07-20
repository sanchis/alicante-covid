function Error ({ error, res }) {
  return (
    <code>
      {JSON.stringify(error)}
      {JSON.stringify(res)}
    </code>
  )
}

Error.getInitialProps = ({ res, err }) => {
  return { error: err, res }
}

export default Error
