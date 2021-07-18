import React from 'react'
import Link from 'next/link'
import styles from './navbar.module.css'

export default function NavBar () {
  return (
    <nav className={styles.nav}>
      <Link href='/' passHref>
        <a className={styles.navLink}>Inicio</a>
      </Link>
    </nav>
  )
}
