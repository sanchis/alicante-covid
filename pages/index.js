import Header from 'components/header'
import NewInfectedChart from 'components/charts/NewInfectedChart'
import MunicipalitiesList from 'components/municipalitiesList'
import { getMunicipalitiesData, getNewInfected } from 'services'

export default function Home ({ newInfected, municipalitiesData }) {
  return (
    <>
      <main>
        <div className='container'>
          <Header />
          <NewInfectedChart newInfected={newInfected} />
          <MunicipalitiesList municipalitiesData={municipalitiesData} />
        </div>
      </main>
    </>
  )
}

export async function getStaticProps () {
  const [newInfected, municipalitiesData] = await Promise.all([getNewInfected(), getMunicipalitiesData()])
  return {
    props: {
      newInfected,
      municipalitiesData
    },
    revalidate: Number(process.env.REVALIDATE_INFECTED) || 1200
  }
}
