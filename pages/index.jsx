import NewInfectedChart from 'components/charts/NewInfectedChart'
import MunicipalitiesList from 'components/municipalitiesList'
import { getLastMunicipalitiesData } from 'services/municipalities'
import { getNewInfected } from 'services/infected'
import Head from 'next/head'

export default function Home ({ newInfected, municipalitiesData }) {
  return (
    <>
      <Head>
        <title>Covid 19 Alicante | Estadísticas diarias</title>
      </Head>

      <NewInfectedChart newInfected={newInfected} />
      <MunicipalitiesList municipalitiesData={municipalitiesData} />
    </>
  )
}

export async function getStaticProps () {
  const [newInfected, municipalitiesData] = await Promise.all([getNewInfected(), getLastMunicipalitiesData()])
  return {
    props: {
      newInfected,
      municipalitiesData
    }
  }
}
