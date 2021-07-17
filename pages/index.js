import axios from 'axios'
import { parseString } from '@fast-csv/parse'
import { Line } from 'react-chartjs-2'
import { isBefore, parse, subMonths } from 'date-fns'
import Button from 'components/ui/button'
const options = {
  interaction: {
    mode: 'index',
    axis: 'y'
  },
  plugins: {
    legend: { position: 'bottom' },
    tooltips: { position: 'nearest' }
  }
}
export default function Home ({ pcrTest, newIfected }) {
  return (
    <>
      <main>
        <div className='container'>
          <Button displayAs='a'>
            test
          </Button>
          <Button >
            test
          </Button>
          <h2>Nuevas pruebas PCR</h2>
          <Line
            data={{
              labels: pcrTest.map(data => data.fecha),
              datasets: [
                {
                  label: '# of Votes',
                  data: pcrTest.map(data => data.numCasos),
                  fill: false,
                  backgroundColor: 'rgb(255, 99, 132)',
                  borderColor: 'rgba(255, 99, 132, 0.2)'
                }
              ]
            }} options={options}
          />

          <h2>Nuevos casos COVID</h2>

          <Line
            data={{
              labels: newIfected.map(data => data.fecha),
              datasets: [
                {
                  label: 'Nuevos positivos',
                  data: newIfected.map(data => data.numCasos),
                  fill: false,
                  backgroundColor: 'rgb(255, 193, 7)',
                  borderColor: 'rgba(255, 193, 7, 0.2)'
                },
                {
                  label: 'Nuevos hospitalizados',
                  data: newIfected.map(data => data.numHosp),
                  fill: false,
                  backgroundColor: 'rgb(255,87,34)',
                  borderColor: 'rgba(255,87,34, 0.2)'
                },
                {
                  label: 'Nuevos en UCI',
                  data: newIfected.map(data => data.numUci),
                  fill: false,
                  backgroundColor: 'rgb(183,28,28)',
                  borderColor: 'rgba(183,28,28, 0.2)'
                },
                {
                  label: 'Nuevas defunciones',
                  data: newIfected.map(data => data.numDef),
                  fill: false,
                  backgroundColor: 'rgb(66,66,66)',
                  borderColor: 'rgba(66,66,66, 0.2)'
                }
              ]
            }} options={options}
          />
        </div>
      </main>
    </>
  )
}

export async function getStaticProps () {
  const [pcrTest, newIfected] = await Promise.all([getPcrTest(), getNewInfected()])
  return {
    props: {
      pcrTest,
      newIfected
    },
    revalidate: 122
  }
}

function getPcrTest () {
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

function getNewInfected () {
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
