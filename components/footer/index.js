import Image from 'next/image'
import React from 'react'
import styles from './footer.module.css'
import logo from 'public/logo.png'
export default function Footer () {
  return (
    <footer className={styles.footer}>
      <p className={`align-center ${styles.noMargin}`}>Creado por <a className={styles.link} href='https://www.linkedin.com/in/adrian-sanchis-gallego-817585119/' target='_blank' rel='noreferrer'>Adrian Sanchis Gallego </a></p>
      <p className={`align-center ${styles.noMargin}`}>Animate a colaborar en el proyecto en <a className={styles.link} href='https://github.com/sanchis/covid-alicante' target='_blank' rel='noreferrer'> GitHub</a></p>
      <div className={styles.containerLogo}>
        <Image src={logo} alt='logo footer' placeholder='blur' />
      </div>
      <p className={`align-center ${styles.noMargin}`}>Last version: {process.env.VERCEL_GIT_COMMIT_MESSAGE || ''}</p>
    </footer>
  )
}
