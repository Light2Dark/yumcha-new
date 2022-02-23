import type { NextPage } from 'next'
import Link from "next/link"
import Head from 'next/head'
import Navbar from '../components/Header/Navbar/Navbar'

import mainStyles from "../styles/main.module.css"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Yumcha</title>
        <meta name="description" content="Place to meet new people over food!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Navbar />
      </header>

      <main className={mainStyles.fullImage}>
        <h1 className={mainStyles.mainText}>Wanna yumcha but no one’s free? Yumcha with new people lah!</h1>
        <div className={mainStyles.mainBtnDiv}>
          <Link href="/yumchaNow">
            <a>Yumcha Now</a>
          </Link>
          <Link href="/planYumcha">
            <a>Plan Yumcha</a>
          </Link>
          <Link href="/virtualYumcha">
            <a>Virtual Yumcha</a>
          </Link>
        </div>
      </main>

      <footer>
        
      </footer>
    </>
  )
}

export default Home
