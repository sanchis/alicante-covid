import Header from 'components/header'
import NewInfectedChart from 'components/charts/NewInfectedChart'
import MunicipalitiesList from 'components/municipalitiesList'
import { getMunicipalitiesData, getNewInfected } from 'services'
import Footer from 'components/footer'
import Head from 'next/head'

export default function Home ({ newInfected, municipalitiesData }) {
  return (
    <>
      <Head>
        <title>Covid 19 Alicante | Estadísticas diarias</title>
      </Head>
      <main>
        <div className='container'>
          <Header />
          <NewInfectedChart newInfected={newInfected} />
          <MunicipalitiesList municipalitiesData={municipalitiesData} />
        </div>
      </main>
      <Footer />
    </>
  )
}

export async function getStaticProps () {
  const [newInfected, municipalitiesData] = await Promise.all([getNewInfected(), getMunicipalitiesData()])
    .catch(error => console.error(error))
  return {
    props: {
      newInfected,
      municipalitiesData
    },
    revalidate: Number(process.env.REVALIDATE_INFECTED) || 1200
  }
}
