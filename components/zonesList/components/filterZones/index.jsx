import Card from 'components/ui/card'
import Input from 'components/ui/input'
import Select from 'components/ui/select'
import debounce from 'just-debounce-it'
import styles from './filterZones.module.css'

export default function FilterZones ({ onChangeSearchText, onChangeOrderBy }) {
  const debounceOnChangeSearch = debounce((event) => onChangeSearchText(event.target.value), 250)
  return (
    <Card className={styles.containerFilter}>
      <Select className={styles.selectOrder} onChange={(event) => onChangeOrderBy(event.target.value)}>
        <option value='name'>Alfabéticamente</option>
        <option value='positiveNumber'>Positivos COVID</option>
      </Select>
      <Input placeholder='Buscar por nombre' type='text' onChange={debounceOnChangeSearch} />

    </Card>
  )
}
