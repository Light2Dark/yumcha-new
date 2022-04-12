import type { NextPage } from 'next'
import Link from "next/link"
import Head from 'next/head'
import Image from 'next/image'

import mainStyles from "../styles/main.module.css"
import loginStyles from "../styles/login.module.css"

// import googleLogo from "../public/logos/google/signin-assets/google_signin_buttons/web/vector/btn_google_light_normal_ios.svg"
import emailLogo from "../public/logos/carbon_email.svg"
import pencil from "../public/logos/bx_pencil.svg"

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
            <Link href="/auth/sign-in" passHref>
                <a className={loginStyles.button} id = {loginStyles.email}>
                  <Image src={emailLogo} alt="Email Logo" height={25} width={25} />
                  <p>Log in with Email</p>
                </a>
            </Link>
            <Link href="/auth/sign-up" passHref>
                <a className={loginStyles.button} id = {loginStyles.email}>
                  <Image src={pencil} alt="Email Logo" height={25} width={25} />
                  <p>Sign Up with Email</p>
                </a>
            </Link>
            {/* <Link href="/" passHref>
                <a className={loginStyles.button} id={loginStyles.google}>
                  <Image src={googleLogo} alt="Google Logo"/>
                  <p>Sign in with Google</p>
                </a>
            </Link> */}
          </div>

          <Link href="/home" passHref>
            <p className={loginStyles.try}><a>Try first</a></p>
          </Link>
        

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
