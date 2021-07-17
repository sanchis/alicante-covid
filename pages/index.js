import NavBar from 'components/navbar'
import PcrTestChart from 'components/charts/PcrTestChart'
import NewInfectedChart from 'components/charts/NewInfectedChart'
import { getNewInfected, getPcrTest } from 'utils/csvExtractor'

export default function Home ({ pcrTest, newInfected }) {
  return (
    <>
      <NavBar />
      <main>
        <div className='container'>
          <PcrTestChart pcrTest={pcrTest} />
          <NewInfectedChart newInfected={newInfected} />
        </div>
      </main>
    </>
  )
}

export async function getStaticProps () {
  const [pcrTest, newInfected] = await Promise.all([getPcrTest(), getNewInfected()])
  return {
    props: {
      pcrTest,
      newInfected
    },
    revalidate: 122
  }
}
