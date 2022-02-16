import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useRef, useState, useEffect } from "react"
import styles from "./mapStyles.module.css"

const API_KEY: string = process.env.NEXT_PUBLIC_MAPS_API || ""

interface MapProps extends google.maps.MapOptions {
    onClick?: (e: google.maps.MapMouseEvent) => void
    onIdle?: (map: google.maps.Map) => void
}

const render = (status: Status) => {
    return <h1>{status}</h1>
}

const Map: React.FC<MapProps> = () => {
    const ref = useRef<HTMLDivElement>(null)
    const [map, setMap] = useState<google.maps.Map>()

    useEffect(() => {
      if(ref.current && !map) {
          setMap(new window.google.maps.Map(ref.current, {
            center: {lat: 3.0670144765507605, lng: 101.60389023893472},
            zoom: 18,
            mapTypeControl: false,
            streetViewControl: false
          }))
      }
    }, [ref, map]);

    return(
        <>
            <div ref={ref} className={styles.map} />
        </>
    )
}

const App = () => {
    return(
        <>
            <Wrapper apiKey={API_KEY}>
                <Map />
            </Wrapper>
        </>
    )
}

export default App