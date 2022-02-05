
const extractCsvData = require('./utils/csv')
const axios = require('axios')

const columns = ['provinciaIso', 'sexo', 'grupoEdad', 'fecha', 'numCasos', 'numHosp', 'numUci', 'numDef']
const columnsToExtract = ['provinciaIso', 'fecha', 'numCasos', 'numHosp', 'numUci', 'numDef']

/**
 * Get the infected people, hospital,uci and dead.
 */
module.exports = function getNewInfected () {
  if (!process.env.NEW_INFECTED_URL) {
    return {
      chart: []
    }
  }
  return axios.get(process.env.NEW_INFECTED_URL)
    .then(csv =>
      extractCsvData(csv.data, columns, columnsToExtract)
        .then(filterCityInAlicante)
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
            chart: result
          }
        })
    )
}

function filterCityInAlicante (data) {
  return data.filter(resultData => resultData.provinciaIso === 'A')
}
