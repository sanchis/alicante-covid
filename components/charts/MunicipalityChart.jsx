import { CommonOptionsChart } from 'config/chartjs.config'
import React from 'react'
import { Line } from 'react-chartjs-2'
import styles from './chart.module.css'

export default function MunicipalityChart ({ data }) {
  return (
    <>
      <h2>Datos municipio <span style={{ color: 'var(--primary-light-2)' }}>{data.name}</span></h2>
      <p className='text-cursive'>
        Número de PCR positivas y incidencia acumulada.
      </p>
      <div className={styles.chartContainer}>
        <Line
          data={{
            labels: data.chart.map(data => data.date),
            datasets: [
              {
                label: 'Nuevos positivos',
                data: data.chart.map(data => data.data.pcrPositives),
                fill: false,
                backgroundColor: 'rgb(119, 170, 185)',
                borderColor: 'rgba(119, 170, 185, 0.2)'
              },
              {
                label: 'Incidencia acumulada',
                data: data.chart.map(data => data.data.incidencia),
                fill: false,
                backgroundColor: 'rgb(88,131,169)',
                borderColor: 'rgba(88,131,169, 0.2)'
              }

            ]
          }} options={CommonOptionsChart}
        />
      </div>
    </>
  )
}
