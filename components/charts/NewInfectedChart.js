import { CommonOptionsChart } from 'config/chartjs.config'
import { formatRelative, parseISO } from 'date-fns'
import React from 'react'
import { Line } from 'react-chartjs-2'
import { es } from 'date-fns/locale'

export default function NewInfectedChart ({ newInfected }) {
  return (
    <>
      <h2>Nuevos casos COVID</h2>
      <p className='text-cursive'>
        Número de hospitalizaciones, número de ingresos en UCI y número de defunciones.
      </p>
      <p className='text-cursive'>
        Ultima actualizacion: {formatRelative(parseISO(newInfected.lastUpdate), new Date(), {
        locale: es
      })}
      </p>
      <Line
        data={{
          labels: newInfected.chart.map(data => data.fecha),
          datasets: [
            {
              label: 'Nuevos positivos',
              data: newInfected.chart.map(data => data.numCasos),
              fill: false,
              backgroundColor: 'rgb(255, 193, 7)',
              borderColor: 'rgba(255, 193, 7, 0.2)'
            },
            {
              label: 'Nuevos hospitalizados',
              data: newInfected.chart.map(data => data.numHosp),
              fill: false,
              backgroundColor: 'rgb(255,87,34)',
              borderColor: 'rgba(255,87,34, 0.2)'
            },
            {
              label: 'Nuevos en UCI',
              data: newInfected.chart.map(data => data.numUci),
              fill: false,
              backgroundColor: 'rgb(183,28,28)',
              borderColor: 'rgba(183,28,28, 0.2)'
            },
            {
              label: 'Nuevas defunciones',
              data: newInfected.chart.map(data => data.numDef),
              fill: false,
              backgroundColor: 'rgb(66,66,66)',
              borderColor: 'rgba(66,66,66, 0.2)'
            }
          ]
        }} options={CommonOptionsChart}
      />
    </>
  )
}
