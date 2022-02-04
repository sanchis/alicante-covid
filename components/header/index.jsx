import React from 'react'
import styles from './header.module.css'

export default function Header () {
  return (
    <>
      <img className={styles.imageContainer} src='./logo.png' loading='lazy' placeholder='blur' alt='logo' />
    </>
  )
}
