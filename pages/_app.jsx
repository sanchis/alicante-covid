import '../styles/variables.css'
import '../styles/globals.css'
import '../styles/form.css'
import Header from 'components/header'
import Footer from 'components/footer'
import Loading from 'components/loading'
import Head from 'next/head'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no' />
      </Head>
      <main>
        <Loading />
        <div className='container'>
          <Header />
          <Component {...pageProps} />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default MyApp
