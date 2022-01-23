import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Header/Navbar/Navbar'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Yumcha</title>
        <meta name="description" content="Place to meet new people over food!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />
      </main>

      <footer>
        
      </footer>
    </>
  )
}

export default Home
