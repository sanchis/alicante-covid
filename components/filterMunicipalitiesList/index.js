import Card from 'components/ui/card'
import Input from 'components/ui/input'
import Select from 'components/ui/select'
import React from 'react'
import styles from './filterMunicipalities.module.css'

export default function FilterMunicipalities ({ onChangeSearchText, onChangeOrderBy }) {
  return (
    <Card className={styles.containerFilter}>
      <Select onChange={(event) => onChangeOrderBy(event.target.value)}>
        <option>Uno</option>
      </Select>
      <Input onChange={(event) => onChangeSearchText(event.target.value)} />

    </Card>
  )
}
