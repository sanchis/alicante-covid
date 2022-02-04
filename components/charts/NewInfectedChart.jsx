import { isBefore, parse, subDays, subMonths } from 'date-fns'
import React, { useState, useEffect } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import Select from '../ui/select'

function dateParse (date) {
  return parse(date, 'yyyy-MM-dd', new Date())
}
const valuesFilter = [
  {
    name: 'Últimos 6 meses',
    value: '6MONTHS',
    filter: (data) => data.filter(obj => isBefore(subMonths(new Date(), 6), dateParse(obj.fecha)))
  },
  {
    name: 'Últimos 3 meses',
    value: '3MONTHS',
    filter: (data) => data.filter(obj => isBefore(subMonths(new Date(), 3), dateParse(obj.fecha)))
  },
  {
    name: 'Ultimo mes',
    value: '1MONTHS',
    filter: (data) => data.filter(obj => isBefore(subMonths(new Date(), 1), dateParse(obj.fecha)))
  },
  {
    name: 'Últimos 15 días',
    value: '15DAYS',
    filter: (data) => data.filter(obj => isBefore(subDays(new Date(), 15), dateParse(obj.fecha)))
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
    setData(filterFn(newInfected.chart))
  }

  useEffect(() => {
    setData(DEFAULT_FILTER.filter(newInfected.chart))
  }, [newInfected.chart])

  return (
    <>
      <h2>Nuevos casos COVID</h2>
      <p className='text-cursive'>
        Número de hospitalizaciones, número de ingresos en UCI y número de defunciones.
      </p>
      <Select label='Filtro' value={filter} onChange={onChangeFilter}>
        {valuesFilter.map(val =>
          <option key={val.name} value={val.value}>{val.name}</option>
        )}
      </Select>
      <ResponsiveContainer height={500}>
        <LineChart data={data} width={500} height={500}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='fecha' fontSize='12px' minTickGap={0} interval='preserveStartEnd' />
          <Tooltip />
          <Legend />
          <Line type='monotone' name='Nuevos positivos' dataKey='numCasos' stroke='#77aab9' />
          <Line type='monotone' name='Nuevos hospitalizados' dataKey='numHosp' stroke='#5883a9' />
          <Line type='monotone' name='Nuevos UCI' dataKey='numUci' stroke='#305486' />
          <Line type='monotone' name='Nuevas defunciones' dataKey='numDef' stroke='#15404a' />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}
