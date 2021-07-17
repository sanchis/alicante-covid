import { parseString } from '@fast-csv/parse'
import axios from 'axios'
import { isBefore, parse, subMonths } from 'date-fns'

export function getPcrTest () {
  return axios.get('http://127.0.0.1:5500/casos_tecnica_provincia (1).csv')
    .then(csv =>
      extrarCsvData(csv.data,
        [
          'provinciaIso', 'fecha', 'numCasos',
          'numCasosPruebaPcr', 'numCasosPruebaTestAc',
          'numCasosPruebaAg', 'numCasosPruebaElisa', 'numCasosPruebaDesconocida'
        ],
        ['provinciaIso', 'fecha', 'numCasos']
      ).then(data =>
        data
          .filter(resultData => resultData.provinciaIso === 'A')
          .filter(data => isBefore(subMonths(new Date(), 2), dateParse(data.fecha)))
      )
    )
}

function dateParse (date) {
  return parse(date, 'yyyy-MM-dd', new Date())
}

export function getNewInfected () {
  return axios.get('http://localhost:5500/casos_hosp_uci_def_sexo_edad_provres (1).csv')
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
          console.log(result)
          return result
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
