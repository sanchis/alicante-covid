// import NavBar from 'components/navbar'
import Header from 'components/header'
import NewInfectedChart from 'components/charts/NewInfectedChart'
import { getNewInfected } from 'utils/csvExtractor'

export default function Home ({ newInfected }) {
  return (
    <>
      {/* <NavBar /> */}
      <Header />
      <main>
        <div className='container'>
          <NewInfectedChart newInfected={newInfected} />
        </div>
      </main>
    </>
  )
}

export async function getStaticProps () {
  const newInfected = await getNewInfected()
  return {
    props: {
      newInfected
    },
    revalidate: Number(process.env.REVALIDATE_INFECTED) || 1200
  }
}
