import FilterMunicipalities from 'components/filterMunicipalitiesList'
import Card from 'components/ui/card'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from './municipalities.module.css'

function getRisk (incidencia) {
  return incidencia >= 250
    ? styles.extremeRisk
    : incidencia >= 150
      ? styles.hightRisk
      : incidencia >= 50 ? styles.lowRisk : styles.noRisk
}

export default function MunicipalitiesList ({ municipalitiesData }) {
  const [searchText, setSearchText] = useState('')
  const [orderBy, setOrderBy] = useState('name')
  const [municipalities, setMunicipalities] = useState(municipalitiesData)
  const router = useRouter()

  useEffect(() => {
    setMunicipalities(
      municipalitiesData
        .filter(muniFilter => muniFilter.name.toLowerCase().includes(searchText))
    )
  }, [searchText, municipalitiesData])

  useEffect(() => {
    setMunicipalities(munis =>
      [...munis].sort((a, b) =>
        isNaN(a[orderBy])
          ? (a[orderBy] > b[orderBy] ? 1 : -1)
          : (a[orderBy] < b[orderBy] ? 1 : -1)
      )
    )
  }, [orderBy])

  return (
    <>
      <h2 className={styles.header}>Información sobre municipios</h2>
      <p className='text-cursive'>Datos de los últimos 14 días</p>

      <FilterMunicipalities onChangeOrderBy={(val) => setOrderBy(val)} onChangeSearchText={(val) => setSearchText(val.trim().toLowerCase())} />
      <div className={styles.cardContainer}>
        {municipalities
          .map(muni =>
            <Card key={muni.name} onClick={() => router.push(`municipios/${muni.id}`)}>
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
