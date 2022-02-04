const { parseString } = require('@fast-csv/parse')

module.exports = function extractCsvData (csvData, columns, extractColumns = [], delimiter = ',') {
  const result = []
  return new Promise((resolve) =>
    parseString(csvData, {
      delimiter,
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
