
const axios = require('axios')
const { format, parseISO } = require('date-fns')
let dataCached
function extractInfected (data) {
  return data.map(record => ({
    id: record.at(0),
    date: format(parseISO(record.at(1)), 'dd/MM/yy'),
    men: Number(record.at(3)),
    women: Number(record.at(4)),
    positiveNumber: Number(record.at(5))
  }))
}

function findZone (data, indexZone) {
  return data.map(recordZone => ({
    date: format(parseISO(recordZone.at(1)), 'dd/MM/yy'), // TODO function,
    positiveNumber: recordZone.at(indexZone)
  }))
}

function extractZones (data) {
  return [
    { name: 'Crevillente', value: findZone(data, 31), positiveNumber: findZone(data, 31).at(-1).positiveNumber },
    { name: 'Torrevieja', value: findZone(data, 29), positiveNumber: findZone(data, 29).at(-1).positiveNumber },
    { name: 'Orihuela', value: findZone(data, 28), positiveNumber: findZone(data, 28).at(-1).positiveNumber },
    { name: 'Elche', value: findZone(data, 27), positiveNumber: findZone(data, 27).at(-1).positiveNumber },
    { name: 'Alicante', value: findZone(data, 26), positiveNumber: findZone(data, 26).at(-1).positiveNumber },
    { name: 'Elda', value: findZone(data, 25), positiveNumber: findZone(data, 25).at(-1).positiveNumber },
    { name: 'San juan de Alicante', value: findZone(data, 24), positiveNumber: findZone(data, 24).at(-1).positiveNumber },
    { name: 'La Marina Baja', value: findZone(data, 23), positiveNumber: findZone(data, 23).at(-1).positiveNumber },
    { name: 'Alcoy', value: findZone(data, 22), positiveNumber: findZone(data, 22).at(-1).positiveNumber },
    { name: 'Denia', value: findZone(data, 20), positiveNumber: findZone(data, 20).at(-1).positiveNumber }
  ]
}

/**
 * Get the infected people, hospital,uci and dead.
 */
export function getNewInfected () {
  if (dataCached) {
    console.log('RETURN CACHED DATA')
    return dataCached
  }

  console.log('FETCH NEW DATA')
  return axios.get(process.env.NEW_INFECTED_URL)
    .then(({ data }) => data)
    .then(({ records }) => ({
      infected: extractInfected(records),
      zones: extractZones(records)
    }))
    .then(data => {
      dataCached = data
      return data
    })
}
