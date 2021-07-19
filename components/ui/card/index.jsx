import React from 'react'
import styles from './card.module.css'
export default function Card ({ className, children }) {
  return (
    <div className={`${styles.card} ${className}`}>
      {children}
    </div>
  )
}
