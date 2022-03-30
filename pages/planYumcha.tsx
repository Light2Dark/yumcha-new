import type {NextPage} from "next"
import Head from "next/head"
import Navbar from "../components/Header/Navbar/Navbar"
import mainStyles from "../styles/main.module.css"
import YumchaForm from "../components/Main/YumchaForm/yumchaForm"
import Map from "../components/Main/Map/map"
import { useState, useEffect } from "react"
import { Wrapper } from "@googlemaps/react-wrapper";

const API_KEY: string = process.env.NEXT_PUBLIC_MAPS_API || ""

const Page: NextPage = () => {
    const [selectedPlaceLatLong, setSelectedPlaceLatLong] = useState<string[]>([])

    // When autocomplete place is selected, call the callback function passed in to set a new marker on map
    useEffect(() => {
        if(selectedPlaceLatLong.length >= 1) {
            
        }
    
        return () => {
            
        }
    }, [selectedPlaceLatLong])
          

    const setMarkerOnMap = () => {

    }

    const setGeometry = (value: string[]) => {
        setSelectedPlaceLatLong(value)
    }

    return(
        <>
            <Head>
                <title>Yumcha</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header>
                <Navbar loggedIn={true} />
            </header>

            <main>
                <Wrapper apiKey={API_KEY}>
                    <h1 className={mainStyles.h1}>F2F Yumchas</h1>
                    <Map />

                    <div>
                        <YumchaForm setGeometry={setGeometry} />
                    </div>
                </Wrapper>
            </main>
        </>
    )
}

export default Page