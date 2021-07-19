import Card from 'components/ui/card'
import Input from 'components/ui/input'
import React from 'react'
import styles from './filterMunicipalities.module.css'

export default function FilterMunicipalities ({ onChangeSearchText }) {
  return (
    <Card className={styles.containerFilter}>
      {/* <Select onChange={(event) => onChangeOrderBy(event.target.value)}>
        <option value='name'>Alfabéticamente</option>
        <option value='pcrPositives'>Positivos COVID</option>
        <option value='incidencia'>Incidencia acumulada</option>
      </Select> */}
      <Input onChange={(event) => onChangeSearchText(event.target.value)} />

    </Card>
  )
}
