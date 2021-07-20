import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render () {
    return (
      <Html lang='es'>
        <Head>
          <meta name='description' content='Ultimas estadísticas sobre el covid en la ciudad de Alicante. Información sobre todos los municipios de la ciudad de Alicante' />

          <link rel='icon' type='image/png' sizes='32x32' href='icon-32x32.png' />
          <link rel='icon' type='image/png' sizes='96x96' href='icon-96x96.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='icon-16x16.png' />

          <meta property='og:description' content='Ultimas estadísticas sobre el covid en la ciudad de Alicante. Información sobre todos los municipios de la ciudad de Alicante' />
          <meta property='og:image' content='/oglogo.png' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='Covid 19 Alicante | Estadísticas diarias' />

          <meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
          <meta name='google-site-verification' content='bnDck8whGv2SHMuVDS7gTTXGDQ0d2G_ux3wucCIVyIc' />

          <meta name='theme-color' content='#3A5699' />

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
