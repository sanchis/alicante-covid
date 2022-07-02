import NewInfectedChart from 'components/charts/NewInfectedChart'
import newInfected from 'scripts/data/infected.json'
import Head from 'next/head'

export default function Home ({ newInfected, municipalitiesData }) {
  return (
    <>
      <Head>
        <title>Covid-19 Alicante | Estadísticas diarias</title>
      </Head>

      <NewInfectedChart newInfected={newInfected} />
    </>
  )
}

export async function getStaticProps () {
  return {
    props: {
      newInfected
    }
  }
}
