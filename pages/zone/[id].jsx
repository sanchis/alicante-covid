import Head from 'next/head'
import ZoneChart from 'components/charts/ZoneChart'
import { getNewInfected } from 'services/infected'

export default function Municipios ({ data }) {
  const title = `Covid-19 ${data.name} | Estadísticas diarias`
  return (
    <>
      <Head>
        <meta name='description' content={`Ultimas estadísticas sobre el covid en la zona sanitaria de ${data.name}. Información sobre todos los municipios de la ciudad de Alicante`} />
        <title>{title}</title>
        <meta property='og:description' content={`Ultimas estadísticas sobre el covid en la zona sanitaria de ${data.name}. Información sobre todos los municipios de la ciudad de Alicante`} />
        <meta property='og:title' content={`Covid 19 ${data.name} | Estadísticas diarias`} />
      </Head>
      <ZoneChart data={data} />
    </>
  )
}

export async function getStaticProps ({ params }) {
  const { zones } = await getNewInfected()
  const zone = zones.find(zn => zn.name === params.id)

  return {
    props: {
      data: zone
    }
  }
}

export async function getStaticPaths () {
  const { zones } = await getNewInfected()
  const paths = zones.map(zn => ({ params: { id: zn.name } }))
  return { paths, fallback: false }
}
