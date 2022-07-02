const getNewInfected = require('./infected')
const fs = require('fs')
require('dotenv/config')

async function main () {
  const infectedData = await getNewInfected()
  fs.writeFileSync('scripts/data/infected.json', JSON.stringify(infectedData))
}

try {
  main()
} catch (error) {
  console.error(error)
}
