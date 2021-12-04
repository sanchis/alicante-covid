import MunicipalityChart from 'components/charts/MunicipalityChart'
import React from 'react'
import { getLastMunicipalitiesData, getLogMunicipality } from 'services/municipalities'

export default function Municipios ({ data }) {
  return (
    <>
      <MunicipalityChart data={data} />
    </>
  )
}

export async function getStaticProps ({ params }) {
  const result = {
    name: '',
    chart: []
  }

  const res = await getLogMunicipality(params.id)

  // Get current name of current municipalities
  result.name = res[0].name
  result.chart = res

  return {
    props: {
      data: result
    }
  }
}

export async function getStaticPaths () {
  const res = await getLastMunicipalitiesData()

  const paths = res.map((data) => ({
    params: { id: data.id.toString() }
  }))

  return { paths, fallback: false }
}
