import type { NextPage } from 'next'
import Link from "next/link"
import Head from 'next/head'
import Navbar from '../components/Header/Navbar/Navbar'
import Image from 'next/image'

import mainStyles from "../styles/main.module.css"
import loginStyles from "../styles/login.module.css"

import googleLogo from "../public/logos/google/signin-assets/google_signin_buttons/web/vector/btn_google_light_normal_ios.svg"
import emailLogo from "../public/logos/carbon_email.svg"

const Home: NextPage = () => {  
  return (
    <>
      <Head>
        <title>Yumcha</title>
        <meta name="description" content="Place to meet new people over food!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={mainStyles.fullImage}>
        <div className={mainStyles.yumchaBox}>
          <h1 className={mainStyles.yumcha}>Yumcha</h1>
          <h2 className={mainStyles.mainText}>Have lunch with new people lah!</h2>

          <div className={loginStyles.loginButtonsDiv}>
            <Link href="/">
                <a className={loginStyles.button} id = {loginStyles.email}>
                  <Image src={emailLogo} alt="Email Logo" height={25} width={25} />
                  <p>Log in with Email</p>
                </a>
            </Link>
            <Link href="/">
                <a className={loginStyles.button} id={loginStyles.google}>
                  <Image src={googleLogo} alt="Google Logo"/>
                  <p>Sign in with Google</p>
                </a>
            </Link>
          </div>

          <p className={loginStyles.try}><a>Try first</a></p>

        </div>

        {/* <div className={mainStyles.mainBtnDiv}>
          <Link href="/yumchaNow">
            <a>Yumcha Now</a>
          </Link>
          <Link href="/planYumcha">
            <a>Plan Yumcha</a>
          </Link>
          <Link href="/virtualYumcha">
            <a>Virtual Yumcha</a>
          </Link>
        </div> */}
      </main>

      <footer>
        
      </footer>
    </>
  )
}

export default Home
