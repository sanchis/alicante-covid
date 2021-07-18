import Card from 'components/ui/card'
import React from 'react'
import styles from './municipalities.module.css'

function getRisk (incidencia) {
  return incidencia >= 250
    ? styles.extremeRisk
    : incidencia >= 150
      ? styles.hightRisk
      : incidencia >= 50 ? styles.lowRisk : styles.noRisk
//   return incidencia < 20
//     ? styles.noRisk
//     : incidencia < 50
//       ? styles.lowRisk
//       : incidencia < 150 ? styles.hightRisk : styles.extremeRisk
}

export default function MunicipalitiesList ({ municipalitiesData }) {
  return (
    <>
      <h2 className={styles.header}>Información sobre municipios</h2>
      <div className={styles.cardContainer}>
        {municipalitiesData.municipalities.map(muni =>
          <Card key={muni.name}>
            <h3>{muni.name}</h3>
            <h1 className='align-center'>{muni.pcrPositives}</h1>
            <small className={`align-center ${styles.descriptionLabel}`}>Positivos</small>
            <h1 className={`align-center ${getRisk(muni.incidencia)}`}>{muni.incidencia}</h1>
            <small className={`align-center ${styles.descriptionLabel}`}>Incidencia Acumulada</small>
            <p className='text-cursive'>Datos de los últimos 14 días</p>
          </Card>)}
      </div>
    </>

  )
}
