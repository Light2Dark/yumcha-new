import type {NextPage} from "next"
import Head from "next/head"
import Navbar from "../components/Header/Navbar/Navbar"
import MainNav from "../components/Header/MainNav/MainNav"
import mainStyles from "../styles/main.module.css"
import YumchaForm from "../components/Main/YumchaForm/yumchaForm"

import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useRef, useState, useEffect } from "react"
const API_KEY: string = process.env.NEXT_PUBLIC_MAPS_API!

const render = (status: Status) => {
    return <h1>{status}</h1>
}

const Map: React.FC<{}> = () => {
    const ref = useRef<HTMLDivElement>(null)
    const [map, setMap] = useState<google.maps.Map>()

    useEffect(() => {
      if(ref.current && !map) {
          setMap(new window.google.maps.Map(ref.current, {}))
      }
    }, [ref, map]);
    

    return(
        <>
            <div ref={ref}>
               
            </div> 
        </>
    )
}

const Page: NextPage = () => {
    return(
        <>
            <Head>
                <title>Yumcha</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header>
                <Navbar />
            </header>

            <main>
                <MainNav currentPage="Plan Yumcha" />

                <Wrapper apiKey={API_KEY}>
                    <Map />
                    <h2>Hello</h2>
                </Wrapper>

                <div>
                    <YumchaForm />
                </div>
                

            </main>
        </>
    )
}

export default Page