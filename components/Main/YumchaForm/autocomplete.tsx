import Autocomplete from "react-google-autocomplete"

// bounds: defaultBounds,

interface Props {
    setLatLongMap: (geometry: string[]) => void
    setLatLongDB: (geometry: string[]) => void
    setLocationName: (location: any) => void 
}

const GoogleAutocomplete = ({setLatLongMap, setLatLongDB, setLocationName}: Props) => {
    const options = {
        componentRestrictions: { country: "my" },
        fields: ["address_components","name", "geometry"],
        strictBounds: false,
        types: ["establishment"],
    };
    
    return(
        <>
            <Autocomplete
                apiKey={process.env.NEXT_PUBLIC_MAPS_API}
                libraries={["places"]}
                onPlaceSelected={(place) => {
                    // set to string to preserve info
                    let lat = place.geometry?.location?.lat().toString()
                    let long = place.geometry?.location?.lng().toString()

                    if (lat && long) {
                        let geometryPlace = [lat, long]
                        setLatLongMap(geometryPlace)
                        setLatLongDB(geometryPlace)
                        if (place && place.address_components) {
                            let town = place.address_components[1] ? place.address_components[1].long_name : place.address_components[2].long_name
                            let loc = place.name + ", " + town
                            setLocationName(loc)
                        }
                        
                    }
                }}
                options={options}
            />
        </>
    )
}

export default GoogleAutocomplete