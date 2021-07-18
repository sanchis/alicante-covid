import { parseString } from '@fast-csv/parse'
import axios from 'axios'
import { isBefore, parse, subMonths } from 'date-fns'

function dateParse (date) {
  return parse(date, 'yyyy-MM-dd', new Date())
}

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

function extrarCsvData (csvData, columns, extractColumns = []) {
  const result = []
  return new Promise((resolve) =>
    parseString(csvData, {
      delimiter: ',',
      headers: columns,
      renameHeaders: true,
      skipRows: 0
    })
      .on('data', (data) => {
        const obj = data
        Object.keys(obj).filter(key => !extractColumns.includes(key)).forEach(key => delete obj[key])
        result.push(obj)
      })
      .on('end', () => resolve(result))
  )
}
