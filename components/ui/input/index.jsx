import React from 'react'
export default function Input ({ label, ...props }) {
  return (
    <>
      {label ? <label>{label}</label> : null}
      <input {...props} />
    </>
  )
}
