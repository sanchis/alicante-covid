import Card from 'components/ui/card'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import FilterZones from './components/filterZones'
import styles from './zonesList.module.css'

export default function ZonesList ({ zonesData }) {
  const [searchText, setSearchText] = useState('')
  const [orderBy, setOrderBy] = useState('name')
  const [zones, setZones] = useState(zonesData)
  const router = useRouter()

  useEffect(() => {
    setZones(
      zonesData
        .filter(zonesFilter => zonesFilter.name.toLowerCase().includes(searchText))
    )
  }, [searchText, zonesData])

  useEffect(() => {
    setZones(zn =>
      [...zn].sort((a, b) =>
        isNaN(a[orderBy])
          ? (a[orderBy] > b[orderBy] ? 1 : -1)
          : (a[orderBy] < b[orderBy] ? 1 : -1)
      )
    )
  }, [orderBy])

  return (
    <>
      <h2 className={styles.header}>Información sobre distrito sanitarios</h2>
      <p className='text-cursive'>Datos de los últimos 14 días</p>

      <FilterZones onChangeOrderBy={(val) => setOrderBy(val)} onChangeSearchText={(val) => setSearchText(val.trim().toLowerCase())} />
      <div className={styles.cardContainer}>
        {zones
          .map(zn =>
            <Card key={zn.name} onClick={() => router.push(`zone/${zn.name}`)}>
              <h3>{zn.name}</h3>
              <h1 className='align-center'>{zn.positiveNumber}</h1>
              <small className={`align-center ${styles.descriptionLabel}`}>Positivos</small>
            </Card>)}
      </div>
    </>

  )
}
