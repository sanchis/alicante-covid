import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

export default function NewInfectedChart ({ newInfected }) {
  return (
    <>
      <h2>Nuevos casos COVID</h2>
      <p className='text-cursive'>
        Número de hospitalizaciones, número de ingresos en UCI y número de defunciones.
      </p>
      <ResponsiveContainer height={500}>
        <LineChart data={newInfected.chart} width={500} height={500}>
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
