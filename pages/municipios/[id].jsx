import MunicipalityChart from 'components/charts/MunicipalityChart'
import Head from 'next/head'
import allMunicipalities from 'scripts/data/all_municipalities.json'

export default function Municipios ({ data }) {
  return (
    <>
      <Head>
        <meta name='description' content={`Ultimas estadísticas sobre el covid en la ciudad de ${data.name}. Información sobre todos los municipios de la ciudad de Alicante`} />
        <title>Covid-19 {data.name} | Estadísticas diarias</title>

        <meta property='og:description' content={`Ultimas estadísticas sobre el covid en la ciudad de ${data.name}. Información sobre todos los municipios de la ciudad de Alicante`} />
        <meta property='og:title' content={`Covid 19 ${data.name} | Estadísticas diarias`} />
      </Head>
      <MunicipalityChart data={data} />
    </>
  )
}

export async function getStaticProps ({ params }) {
  const result = {
    name: '',
    chart: []
  }

  const res = []
  allMunicipalities.forEach(groupDates => {
    const cityFounded = groupDates.find(muni => String(muni.id) === params.id.toString())
    if (cityFounded) {
      res.push(cityFounded)
    }
  })
  // Get current name of current municipalities
  result.name = res[0].name
  result.chart = res.reverse()
  return {
    props: {
      data: result
    }
  }
}

export async function getStaticPaths () {
  const paths = allMunicipalities[0].map(municipios => ({ params: { id: municipios.id.toString() } }))
  return { paths, fallback: false }
}
