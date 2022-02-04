const axios = require('axios')
const { load } = require('cheerio')
const validCodMunicipio = require('./config/validCodMunicipio')
const extractCsvData = require('./utils/csv')
const { dateParse } = require('./utils/date')

/**
 * Get last log of municipalities data.
 */
async function getLastMunicipalitiesData () {
  const data = await getListLogs().then(data => data[0])
  return getStats(data.id, data.date)
}

async function getAllOldMunicipalitiesData () {
  const logs = await getListLogsOld()
  const result = []
  for (const log of logs) {
    result.push(await getStats(log.id, log.date))
  }
  return result
}

/**
 * Get the data of municipalities name, incidencia and pcrPositives.
 * @param {*} id
 * @param {*} date
 */
async function getStats (id, date = null, municipality = null) {
  return axios.get(`https://dadesobertes.gva.es/dataset/38e6d3ac-fd77-413e-be72-aed7fa6f13c2/resource/${id}/download/covid-19-casos-confirmados-por-pcr-casos-pcr-en-los-ultimos-14-dias-y-personas-fallecidas-por-mu.csv`)
    .then(response => {
      return extractCsvData(
        response.data,
        ['codMunicipio', 'municipio', 'positivos', 'incidencia', 'positivos14', 'incidencia14', 'defunciones', 'tasaDefuncion'],
        ['codMunicipio', 'municipio', 'positivos14', 'incidencia14'],
        ';'
      )
    })
    .then(records => records.filter(record => validCodMunicipio.indexOf(Number(record.codMunicipio)) > 0))
    .then(records => {
      if (municipality) {
        return records.filter(record => record.codMunicipio === municipality)
      }
      return records
    })
    .then(records =>
      records.map(record =>
        ({
          id: Number(record.codMunicipio),
          name: record.municipio,
          pcrPositives: Number(record.positivos14),
          incidencia: Number(record.incidencia14.trim().replace(',', '.')),
          date
        })
      )
    )
}

/**
 * Crawl all links for the municipalities
 */
async function getListLogs () {
  return axios.get(process.env.MUNICIPALITIES_URL)
    .then(response => response.data)
    .then(onResponseLog)
}

function onResponseLog (response) {
  const $ = load(response)
  return $('#dataset-resources a.heading').map((index, el) => {
    const domLink = $(el)
    return {
      date: extractDateFromTitle(domLink.prop('title')),
      id: extractIdFromLink(domLink.prop('href'))
    }
  }).toArray()
}

/**
 * Crawl all links for the municipalities
 */
function getListLogsOld () {
  return axios.get(process.env.MUNICIPALITIES_OLD_URL)
    .then(response => response.data)
    .then(onResponseLog)
}

function extractIdFromLink (link) {
  return link ? link.substr(link.lastIndexOf('/') + 1, link.length) : undefined
}

function extractDateFromTitle (title) {
  return title.substring(title.length - 10, title.length)
}

module.exports = {
  getLastMunicipalitiesData,
  getAllOldMunicipalitiesData
}
