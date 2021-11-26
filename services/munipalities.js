import axios from 'axios'
import { load } from 'cheerio'
import { validCodMunicipio } from 'config/validCodMunicipio'
import { extractCsvData } from 'utils/csv'
import { dateParse } from 'utils/date'

/**
 * Get last log of municipalities data.
 * @returns { string }
 */
export async function getLastMunicipalitiesData () {
  const result = {
    municipalities: []
  }
  if (!process.env.MUNICIPALITIES_URL) {
    return result
  }
  const id = await getLastStatsMunicipalitiesId()
  if (!id) {
    return result
  }
  return getStats(id)
}

/**
 * Return all data for all municipalities
 * @returns { Array }
 */
export async function getAllLogMunicipalities () {
  const resLinks = await getListLogs()
    .then(links =>
      links.map((index, element) => {
        return {
          date: element.attribs.title.substring(element.attribs.title.length - 10, element.attribs.title.length),
          link: extractIdFromLink(element.attribs.href)
        }
      }).toArray()
    ).then(links => links.sort((a, b) => dateParse(a.date) - dateParse(b.date)))

  return Promise.all(resLinks.map(async (data) => {
    return getStats(data.link, data.date)
  }))
}

/**
 * Get the data of municipalities name, incidencia and pcrPositives.
 * @param {*} id
 * @param {*} date
 * @returns { Array }
 */
async function getStats (id, date = null) {
  const result = {
    municipalities: [],
    date
  }
  return axios.get(`https://dadesobertes.gva.es/dataset/38e6d3ac-fd77-413e-be72-aed7fa6f13c2/resource/${id}/download/covid-19-casos-confirmados-por-pcr-casos-pcr-en-los-ultimos-14-dias-y-personas-fallecidas-por-mu.csv`)
    .then(response =>
      extractCsvData(
        response.data,
        ['codMunicipio', 'municipio', 'positivos', 'incidencia', 'positivos14', 'incidencia14', 'defunciones', 'tasaDefuncion'],
        ['codMunicipio', 'municipio', 'positivos14', 'incidencia14'],
        ';'
      ))
    .then(records => {
      result.municipalities = records.filter(record => validCodMunicipio.indexOf(Number(record.codMunicipio)) > 0)
        .map(record =>
          ({
            id: Number(record.codMunicipio),
            name: record.municipio,
            pcrPositives: Number(record.positivos14),
            incidencia: Number(record.incidencia14.trim().replace(',', '.'))
          })
        )
      return result
    })
}

/**
 * Crawl the web and extract the last link of municipalities
 * @returns { string }
 */
async function getLastStatsMunicipalitiesId () {
  return getListLogs()
    .then(links => links.prop('href'))
    .then(link => extractIdFromLink(link))
}

/**
 * Crawl all links for the municipalities
 * @returns { Array }
 */
function getListLogs () {
  return axios.get(process.env.MUNICIPALITIES_URL)
    .then(response => response.data)
    .then(data => load(data))
    .then(dom =>
      dom('#dataset-resources a.heading')
    )
}

function extractIdFromLink (link) {
  return link ? link.substr(link.lastIndexOf('/') + 1, link.length) : undefined
}
