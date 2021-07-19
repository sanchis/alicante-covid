import React from 'react'
// import styles from './header.module.css'
import Image from 'next/image'
import Logo from 'public/logo.png'

export default function Header () {
  return (
    <Image src={Logo} placeholder='blur' alt='logo' />
  )
}
