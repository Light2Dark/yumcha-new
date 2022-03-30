import Autocomplete from "react-google-autocomplete"

// bounds: defaultBounds,

interface Props {
    setLatLong: (geometry: string[]) => void
}

const GoogleAutocomplete = ({setLatLong}: Props) => {
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
                        setLatLong(geometryPlace)
                    }
                }}
                options={options}
            />
        </>
    )
}

export default GoogleAutocomplete