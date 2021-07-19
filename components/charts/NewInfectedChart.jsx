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
        Ultima actualización: {formatRelative(parseISO(newInfected.lastUpdate), new Date(), { locale: es })}
      </p>
      <Line
        data={{
          labels: newInfected.chart.map(data => data.fecha),
          datasets: [
            {
              label: 'Nuevos positivos',
              data: newInfected.chart.map(data => data.numCasos),
              fill: false,
              backgroundColor: 'rgb(119, 170, 185)',
              borderColor: 'rgba(119, 170, 185, 0.2)'
            },
            {
              label: 'Nuevos hospitalizados',
              data: newInfected.chart.map(data => data.numHosp),
              fill: false,
              backgroundColor: 'rgb(88,131,169)',
              borderColor: 'rgba(88,131,169, 0.2)'
            },
            {
              label: 'Nuevos en UCI',
              data: newInfected.chart.map(data => data.numUci),
              fill: false,
              backgroundColor: 'rgb(48,84,134)',
              borderColor: 'rgba(48,84,134, 0.2)'
            },
            {
              label: 'Nuevas defunciones',
              data: newInfected.chart.map(data => data.numDef),
              fill: false,
              backgroundColor: 'rgb(21,64,74)',
              borderColor: 'rgba(21,64,74, 0.2)'
            }
          ]
        }} options={CommonOptionsChart}
      />
    </>
  )
}
