import React from 'react'
import { CommonOptionsChart } from 'config/chartjs.config'
import { Line } from 'react-chartjs-2'

export default function PcrTestChart ({ pcrTest }) {
  return (
    <>
      <h2>Nuevas pruebas PCR</h2>
      <i className='text-cursive'>Número de casos por técnica diagnóstica y provincia (de residencia)</i>
      <Line
        data={{
          labels: pcrTest.map(data => data.fecha),
          datasets: [
            {
              label: '# of Votes',
              data: pcrTest.map(data => data.numCasos),
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgba(255, 99, 132, 0.2)'
            }
          ]
        }} options={CommonOptionsChart}
      />
    </>
  )
}
