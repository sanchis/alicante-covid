import React from 'react'
import styles from './button.module.css'

export default function Button ({ label, children, type = 'primary', displayAs = 'button', ...rest }) {
  return (
    <>
      {displayAs === 'a'
        ? <a className={`${styles.button} ${styles[type]}`} {...rest}>{children}</a>
        : <button className={`${styles.button} ${styles[type]}`} {...rest}>{children}</button>}
    </>
  )
}
