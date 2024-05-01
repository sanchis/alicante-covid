import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

export default function NewInfectedChart ({ newInfected }) {
  return (
    <>
      <h2>Nuevos casos COVID</h2>
      <p className='text-cursive'>
        Número de positivos.
      </p>
      <ResponsiveContainer height={500}>
        <LineChart data={newInfected} width={500} height={500}>
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
