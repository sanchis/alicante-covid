import Card from 'components/ui/card'
import { formatRelative, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import React from 'react'
import styles from './municipalities.module.css'

function getRisk (incidencia) {
  return incidencia >= 250
    ? styles.extremeRisk
    : incidencia >= 150
      ? styles.hightRisk
      : incidencia >= 50 ? styles.lowRisk : styles.noRisk
}

export default function MunicipalitiesList ({ municipalitiesData }) {
  return (
    <>
      <h2 className={styles.header}>Información sobre municipios</h2>
      <p className='text-cursive'>Datos de los últimos 14 días</p>
      <p className='text-cursive'>Ultima actualización: {formatRelative(parseISO(municipalitiesData.lastUpdate), new Date(), { locale: es })}</p>

      <div className={styles.cardContainer}>
        {municipalitiesData.municipalities.map(muni =>
          <Card key={muni.name}>
            <h3>{muni.name}</h3>
            <h1 className='align-center'>{muni.pcrPositives}</h1>
            <small className={`align-center ${styles.descriptionLabel}`}>Positivos</small>
            <h1 className={`align-center ${getRisk(muni.incidencia)}`}>{muni.incidencia}</h1>
            <small className={`align-center ${styles.descriptionLabel}`}>Incidencia Acumulada</small>
          </Card>)}
      </div>
    </>

  )
}
