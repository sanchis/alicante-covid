import '../styles/variables.css'
import '../styles/globals.css'
import '../styles/form.css'
import Header from 'components/header'
import Footer from 'components/footer'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <main>
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
