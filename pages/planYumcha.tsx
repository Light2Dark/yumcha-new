import type {NextPage} from "next"
import Head from "next/head"
import Navbar from "../components/Header/Navbar/Navbar"
import mainStyles from "../styles/main.module.css"
import YumchaForm from "../components/Main/YumchaForm/yumchaForm"
import Map from "../components/Main/Map/map"
import { useState, useEffect } from "react"
import { Wrapper } from "@googlemaps/react-wrapper";
import Script from "next/script"

const API_KEY: string = process.env.NEXT_PUBLIC_MAPS_API || ""

export const GoogleApiWrapper = ({
    apiKey: "--GOOGLE-MAPS-KEY--",
    libraries: ["places"]
})

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
            <header>
                <Navbar loggedIn={true} />
            </header>

            <main>
                    <h1 className={mainStyles.h1}>F2F Yumchas</h1>
                    {/* <Map /> */}

                    <div>
                        <YumchaForm setGeometry={setGeometry} />
                    </div>
            </main>
        </>
    )
}

export default Page