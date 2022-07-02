import NewInfectedChart from 'components/charts/NewInfectedChart'
import ZonesList from 'components/zonesList'
import Head from 'next/head'
import getNewInfected from 'services/infected'
export default function Home ({ infected, zones }) {
  return (
    <>
      <Head>
        <title>Covid-19 Alicante | Estadísticas diarias</title>
      </Head>

      <NewInfectedChart newInfected={infected} />
      <ZonesList zonesData={zones} />
    </>
  )
}

export async function getStaticProps () {
  const { zones, infected } = await getNewInfected()
  return {
    props: {
      infected,
      zones
    }
  }
}
