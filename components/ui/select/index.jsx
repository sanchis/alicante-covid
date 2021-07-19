import React from 'react'
export default function Select ({ label, children, ...props }) {
  return (
    <>
      {label ? <label>{label}</label> : null}
      <select {...props}>
        {children}
      </select>
    </>
  )
}
