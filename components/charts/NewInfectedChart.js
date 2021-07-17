import { CommonOptionsChart } from 'config/chartjs.config'
import React from 'react'
import { Line } from 'react-chartjs-2'

export default function NewInfectedChart ({ newInfected }) {
  return (
    <>
      <h2>Nuevos casos COVID</h2>
      <i className='text-cursive'>Número de hospitalizaciones, número de ingresos en UCI y número de defunciones por sexo, edad y provincia de residencia.</i>
      <Line
        data={{
          labels: newInfected.map(data => data.fecha),
          datasets: [
            {
              label: 'Nuevos positivos',
              data: newInfected.map(data => data.numCasos),
              fill: false,
              backgroundColor: 'rgb(255, 193, 7)',
              borderColor: 'rgba(255, 193, 7, 0.2)'
            },
            {
              label: 'Nuevos hospitalizados',
              data: newInfected.map(data => data.numHosp),
              fill: false,
              backgroundColor: 'rgb(255,87,34)',
              borderColor: 'rgba(255,87,34, 0.2)'
            },
            {
              label: 'Nuevos en UCI',
              data: newInfected.map(data => data.numUci),
              fill: false,
              backgroundColor: 'rgb(183,28,28)',
              borderColor: 'rgba(183,28,28, 0.2)'
            },
            {
              label: 'Nuevas defunciones',
              data: newInfected.map(data => data.numDef),
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
