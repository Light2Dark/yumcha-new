import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useRef, useState, useEffect } from "react"
import * as React from "react"
import { createCustomEqual } from "fast-equals";

import Marker from "./marker";
import styles from "./mapStyles.module.css"

const API_KEY: string = process.env.NEXT_PUBLIC_MAPS_API || ""

interface MapProps extends google.maps.MapOptions {
    style: { [key: string]: string };
    onClick?: (e: google.maps.MapMouseEvent) => void
    onIdle?: (map: google.maps.Map) => void
}

const render = (status: Status) => {
    return <h2>{status}</h2>
}

const deepCompareEqualsForMaps = createCustomEqual(
    (deepEqual) => (a: any, b: any) => {
        if (
        isLatLngLiteral(a) ||
        a instanceof google.maps.LatLng ||
        isLatLngLiteral(b) ||
        b instanceof google.maps.LatLng
        ) {
        return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
        }

        // TODO extend to other types

        // use fast-equals for other objects
        return deepEqual(a, b);
    }
);

function useDeepCompareEffectForMaps(
    callback: React.EffectCallback,
    dependencies: any[]
  ) {
    React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}
  
function isLatLngLiteral(obj: any): obj is google.maps.LatLngLiteral {
    return (
      typeof obj === "object" &&
      obj.hasOwnProperty("lat") &&
      obj.hasOwnProperty("lng")
    );
}

function useDeepCompareMemoize(value: any) {
    const ref = React.useRef();
  
    if (!deepCompareEqualsForMaps(value, ref.current)) {
      ref.current = value;
    }
  
    return ref.current;
}

const Map: React.FC<MapProps> = ({center, zoom, onClick, onIdle, children, style, ...options}) => {
    const ref = useRef<HTMLDivElement>(null)
    const [map, setMap] = useState<google.maps.Map>()

    useEffect(() => {
      if(ref.current && !map) {
          setMap(new window.google.maps.Map(ref.current, {
            center: center,
            zoom: zoom,
            mapTypeControl: false,
            streetViewControl: false
          }))
      }
    }, [ref, map]);

    useDeepCompareEffectForMaps(() => {
        if (map) {
          map.setOptions(options);
        }
    }, [map, options]);

    useEffect(() => {
        if (map) {
          ["click", "idle"].forEach((eventName) =>
            google.maps.event.clearListeners(map, eventName)
          );
    
          if (onClick) {
            map.addListener("click", onClick);
          }
    
          if (onIdle) {
            map.addListener("idle", () => onIdle(map));
          }
        }
    }, [map, onClick, onIdle]);

    return(
        <>
            <div ref={ref} style={style} className={styles.mapContainer} />
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                // set the map prop on the child component
                return React.cloneElement(child, { map });
                }
            })}
        </>
    )
}

const App = () => {
    const [zoom, setZoom] = useState(18)
    const [center, setCenter] = useState<google.maps.LatLngLiteral>({
        lat: 3.0670144765507605,
        lng: 101.60389023893472
    })
    const [click, setClick] = useState<google.maps.LatLng>()

    const onClick = (e: google.maps.MapMouseEvent) => {
        setClick(e.latLng!) // definitely setting latLng
    }

    const onIdle = (m: google.maps.Map) => {
        console.log("onIdle")
        setZoom(m.getZoom()!)
        setCenter(m.getCenter()!.toJSON())
    }

    return(
        <Wrapper apiKey={API_KEY} render={render}>
            <Map center={center} zoom={zoom} style={styles} onIdle={onIdle}>
                {/* <Marker position={center}></Marker> */}
            </Map>
        </Wrapper>
    )
}

export default App