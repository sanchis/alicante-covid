import React from 'react'
import styles from './header.module.css'
import Image from 'next/image'
import Logo from 'public/logo.png'

export default function Header () {
  return (
    <div className={styles.imageContainer}>
      <Image src={Logo} placeholder='blur' alt='logo' />
    </div>
  )
}
