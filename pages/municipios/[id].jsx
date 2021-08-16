import MunicipalityChart from 'components/charts/MunicipalityChart'
import React from 'react'
import { getAllLogMunicipalities, getLastMunicipalitiesData } from 'services'

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

  const res = await getAllLogMunicipalities()

  res.forEach(responses =>
    result.chart.push({
      date: responses.date,
      data: responses.municipalities.find(municipalitiesFind => municipalitiesFind.id === Number(params.id)) || null
    })
  )

  result.name = result.chart[0].data.name

  return {
    props: {
      data: result
    }
  }
}

export async function getStaticPaths () {
  const res = await getLastMunicipalitiesData()

  const paths = res.municipalities.map((data) => ({
    params: { id: data.id.toString() }
  }))

  return { paths, fallback: false }
}
