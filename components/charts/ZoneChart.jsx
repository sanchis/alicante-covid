import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

export default function ZoneChart ({ data }) {
  return (
    <>
      <h2>Datos zona sanitaria <span style={{ color: 'var(--primary-light-2)' }}>{data.name}</span></h2>
      <p className='text-cursive'>
        Número de PCR positivas.
      </p>
      <ResponsiveContainer height={500}>
        <LineChart data={data.value} width={500} height={500}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' fontSize='12px' minTickGap={0} interval='preserveStartEnd' />
          <Tooltip />
          <Legend />
          <Line type='monotone' name='Nuevos positivos' dataKey='positiveNumber' stroke='rgb(21,64,74)' />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}
