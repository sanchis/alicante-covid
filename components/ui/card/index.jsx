import React from 'react'
import styles from './card.module.css'
export default function Card ({ className, children, onClick }) {
  return (
    <div onClick={onClick} className={`${styles.card} ${className} ${onClick ? styles.cardClickeable : ''}`}>
      {children}
    </div>
  )
}
