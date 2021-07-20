function Error ({ error }) {
  return (
    <code>
      {JSON.stringify(error)}
    </code>
  )
}

Error.getInitialProps = ({ res, err }) => {
  return { error: err }
}

export default Error
