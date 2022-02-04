import NewInfectedChart from 'components/charts/NewInfectedChart'
import MunicipalitiesList from 'components/municipalitiesList'
import newInfected from 'scripts/data/infected.json'
import data from 'scripts/data/all_municipalities.json'
import Head from 'next/head'

export default function Home ({ newInfected, municipalitiesData }) {
  return (
    <>
      <Head>
        <title>Covid-19 Alicante | Estadísticas diarias</title>
      </Head>

      <NewInfectedChart newInfected={newInfected} />
      <MunicipalitiesList municipalitiesData={municipalitiesData} />
    </>
  )
}

export async function getStaticProps () {
  return {
    props: {
      newInfected,
      municipalitiesData: data[0]
    }
  }
}
