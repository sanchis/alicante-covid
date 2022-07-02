import NewInfectedChart from 'components/charts/NewInfectedChart'
import Head from 'next/head'
import getNewInfected from '../scripts/infected'
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
      newInfected: await getNewInfected()
    }
  }
}
