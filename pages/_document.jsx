import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render () {
    return (
      <Html lang='es'>
        <Head>
          <title>Covid 19 Alicante | Estadísticas diarias</title>
          <meta name='description' content='Ultimas estadísticas sobre el covid en la ciudad de Alicante. Información sobre todos los municipios de la ciudad de Alicante' />

          <link rel='icon' type='image/png' sizes='32x32' href='favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='96x96' href='favicon-96x96.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='favicon-16x16.png' />

          <meta property='og:description' content='Ultimas estadísticas sobre el covid en la ciudad de Alicante. Información sobre todos los municipios de la ciudad de Alicante' />
          <meta property='og:image' content='/oglogo.png' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='Covid 19 Alicante | Estadísticas diarias' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
