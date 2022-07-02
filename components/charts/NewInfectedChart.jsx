import { isBefore, parse, subDays, subMonths } from 'date-fns'
import React, { useState, useEffect } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import Select from '../ui/select'

function dateParse (date) {
  return parse(date, 'dd/MM/yy', new Date())
}
const valuesFilter = [
  {
    name: 'Últimos 6 meses',
    value: '6MONTHS',
    filter: (data) => data.filter(obj => isBefore(subMonths(new Date(), 6), dateParse(obj.date)))
  },
  {
    name: 'Últimos 3 meses',
    value: '3MONTHS',
    filter: (data) => data.filter(obj => isBefore(subMonths(new Date(), 3), dateParse(obj.date)))
  },
  {
    name: 'Últimos 30 días',
    value: '1MONTHS',
    filter: (data) => data.filter(obj => isBefore(subDays(new Date(), 30), dateParse(obj.date)))
  },
  {
    name: 'Últimos 15 días',
    value: '15DAYS',
    filter: (data) => data.filter(obj => isBefore(subDays(new Date(), 15), dateParse(obj.date)))
  },
  {
    name: 'Desde inicio hasta ahora',
    value: 'FOREVERNOW',
    filter: (data) => data
  }
]
const DEFAULT_FILTER = valuesFilter[1]
export default function NewInfectedChart ({ newInfected }) {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState(DEFAULT_FILTER.value)

  function onChangeFilter (event) {
    const filterFn = valuesFilter.find(filter => filter.value === event.target.value).filter
    setFilter(event.target.value)
    setData(filterFn(newInfected))
  }

  useEffect(() => {
    setData(DEFAULT_FILTER.filter(newInfected))
  }, [newInfected])

  return (
    <>
      <h2>Nuevos casos COVID</h2>
      <p className='text-cursive'>
        Número de positivos.
      </p>
      <Select
        label='Filtro' style={{
          margin: 'var(--size-8) 0 var(--size-8) 0'
        }} value={filter} onChange={onChangeFilter}
      >
        {valuesFilter.map(val =>
          <option key={val.name} value={val.value}>{val.name}</option>
        )}
      </Select>
      <ResponsiveContainer height={500}>
        <LineChart data={data} width={500} height={500}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' fontSize='12px' minTickGap={0} interval='preserveStartEnd' />
          <Tooltip />
          <Legend />
          <Line type='monotone' name='Nuevos positivos' dataKey='positiveNumber' stroke='#77aab9' />
          <Line type='monotone' name='Nuevos positivos hombres' dataKey='men' stroke='#5883a9' />
          <Line type='monotone' name='Nuevos positivos mujeres' dataKey='women' stroke='#305486' />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}
