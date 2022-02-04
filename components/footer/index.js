/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from './footer.module.css'

export default function Footer () {
  return (
    <footer className={styles.footer}>
      <p className={`align-center ${styles.noMargin}`}>Creado por <a className={styles.link} href='https://www.linkedin.com/in/adrian-sanchis-gallego-817585119/' target='_blank' rel='noreferrer'>Adrian Sanchis Gallego </a></p>
      <p className={`align-center ${styles.noMargin}`}>Animate a colaborar en el proyecto en <a className={styles.link} href='https://github.com/sanchis/covid-alicante' target='_blank' rel='noreferrer'> GitHub</a></p>
      <img className={styles.containerLogo} src='./logo.png' alt='logo footer' placeholder='blur' />
      <p className={`align-center ${styles.noMargin}`}>Last version: {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE || ''}</p>
    </footer>
  )
}
