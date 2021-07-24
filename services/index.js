import axios from 'axios'
import { load } from 'cheerio'
import { validCodMunicipio } from 'config/validCodMunicipio'
import { isBefore, subMonths } from 'date-fns'
import { extrarCsvData } from 'utils/csv'
import { dateParse } from 'utils/date'

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

async function getLog (id, date = null) {
  const result = {
    municipalities: [],
    date
  }
  return axios.get(`https://dadesobertes.gva.es/es/datastore/dump/${id}?format=json`)
    .then(response => response.data.records)
    .then(records => {
      result.municipalities = records.filter(record => validCodMunicipio.indexOf(record[1]) > 0)
        .map(record =>
          ({
            id: record[1],
            name: record[2],
            pcrPositives: record[5],
            incidencia: Number(record[6].replace(',', '.'))
          })
        )
      return result
    })
}

async function getLastLogMunicipalities () {
  return getListLogs()
    .then(links => links.prop('href'))
    .then(link => extractIdFromLink(link))
}

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
