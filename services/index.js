import axios from 'axios'
import { load } from 'cheerio'
import { validCodMunicipio } from 'config/validCodMunicipio'
import { isBefore, subMonths } from 'date-fns'
import { extrarCsvData } from 'utils/csv'
import { dateParse } from 'utils/date'

/**
 * Get the infected people, in hospital, in uci and dead.
 * @returns { Array }
 */
export function getNewInfected () {
  if (!process.env.NEW_INFECTED_URL) {
    return {
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
            chart: result
          }
        })
    )
}

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
  const id = await getLastLogMunicipalities()
  if (!id) {
    return result
  }
  return getLog(id)
}

/**
 * Get the data of municipalities name, incidencia and pcrPositives.
 * @param {*} id
 * @param {*} date
 * @returns { Array }
 */
async function getLog (id, date = null) {
  const result = {
    municipalities: [],
    date
  }
  return axios.get(`https://dadesobertes.gva.es/dataset/38e6d3ac-fd77-413e-be72-aed7fa6f13c2/resource/${id}/download/covid-19-casos-confirmados-por-pcr-casos-pcr-en-los-ultimos-14-dias-y-personas-fallecidas-por-mu.csv`)
    .then(response =>
      extrarCsvData(
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
async function getLastLogMunicipalities () {
  return getListLogs()
    .then(links => links.prop('href'))
    .then(link => extractIdFromLink(link))
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
    return getLog(data.link, data.date)
  }))
}

/**
 * Crawl all links for the municipalities
 * @returns 
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
