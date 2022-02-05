const getNewInfected = require('./infected')
const { getLastMunicipalitiesData } = require('./municipalities')
const fs = require('fs')
require('dotenv/config')

async function main () {
  const infectedData = await getNewInfected()
  fs.writeFileSync('scripts/data/infected.json', JSON.stringify(infectedData))

  const lastLog = await getLastMunicipalitiesData()

  const filePath = 'scripts/data/all_municipalities.json'
  const currentData = JSON.parse(fs.readFileSync(filePath))

  if (lastLog[0].date !== currentData[0][0].date) {
    console.log('----- FOUND NEW LOG -----')
    currentData.unshift(lastLog)
    fs.writeFileSync(filePath, JSON.stringify(currentData))
  }
}

try {
  main()
} catch (error) {
  console.error(error)
}
