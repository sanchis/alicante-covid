import axios from 'axios'
import { validCodMunicipio } from 'config/validCodMunicipio'
import { isBefore, subMonths } from 'date-fns'
import { extrarCsvData } from 'utils/csv'
import { dateParse } from 'utils/date'

export function getNewInfected () {
  if (!process.env.NEW_INFECTED_URL) {
    return {
      lastUpdate: new Date().toISOString(),
      chart: []
    }
  }
  return axios.get(process.env.NEW_INFECTED_URL)
    .then(csv =>
      extrarCsvData(csv.data,
        ['provinciaIso', 'sexo', 'grupoEdad', 'fecha', 'numCasos', 'numHosp', 'numUci', 'numDef'],
        ['provinciaIso', 'fecha', 'numCasos', 'numHosp', 'numUci', 'numDef']
      )
        .then(data =>
          data
            .filter(resultData => resultData.provinciaIso === 'A')
            .filter(data => isBefore(subMonths(new Date(), 2), dateParse(data.fecha)))
        )
        .then(data => {
          const result = []
          data.forEach(row => {
            if (!result.some(element => element.fecha === row.fecha)) {
              const allDataSameDay = data.filter(element => element.fecha === row.fecha)
              const reducer = (accumulator, curr) => Number(accumulator) + Number(curr)

              result.push({
                fecha: row.fecha,
                numCasos: allDataSameDay.map(ele => ele.numCasos).reduce(reducer),
                numHosp: allDataSameDay.map(ele => ele.numHosp).reduce(reducer),
                numUci: allDataSameDay.map(ele => ele.numUci).reduce(reducer),
                numDef: allDataSameDay.map(ele => ele.numDef).reduce(reducer)
              })
            }
          })

          return {
            chart: result,
            lastUpdate: new Date().toISOString()
          }
        })
    )
}

export function getMunicipalitiesData () {
  const result = {
    lastUpdate: new Date().toISOString(),
    municipalities: []
  }
  if (!process.env.MUNICIPALITIES_URL) {
    return result
  }
  return axios.get(process.env.MUNICIPALITIES_URL)
    .then(response => response.data.records)
    .then(records => {
      result.municipalities = records.filter(record => validCodMunicipio.indexOf(record[1]) > 0)
        .map(record =>
          ({
            name: record[2],
            pcrPositives: record[5],
            incidencia: Number(record[6].replace(',', '.'))
          })
        )
      return result
    })
}
