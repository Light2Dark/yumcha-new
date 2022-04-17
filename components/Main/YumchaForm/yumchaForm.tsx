import styles from "./form.module.css"
import Image from "next/image"
import locationPic from "../../../public/logos/choosePlace.svg"
// import { YumchaProps } from "../YumchaCard/yumchaCard"
import { useState, useEffect } from "react"
import { supabase } from "../../../utils/supabaseClient"
import Router, { useRouter } from "next/router"
import GoogleAutocomplete from "./autocomplete"

interface YumchaProfileProps {
    userID: string
    yumchaID: number
    creator: boolean
}

type Props = {
    setGeometry: (latLong: string[]) => void
}

const Form = ({setGeometry}: Props) => {
    const [loading, setLoading] = useState(false)
    const [yumchaTableUpdated, setYumchaTableUpdated] = useState(false)
    const [yumchaID, setYumchaID] = useState(0)
    const [selectedPlaceLatLong, setSelectedPlaceLatLong] = useState<string[]>([])
    const router = useRouter()

    useEffect(() => {
        let isMounted = true

        if (yumchaTableUpdated && isMounted) {
            InsertYumchaProfiles()
        }

        return () => {
            setYumchaTableUpdated(false) // dk if this works
            isMounted = false
        }
    }, [yumchaTableUpdated])

    async function InsertYumchaProfiles() {
        // inserting into yumcha-profiles table
        // get yumchaID returned from BookYumcha function. Insert yumchaID, userID and creator into yumcha-profiles table

        const user = supabase.auth.user()
        
        if (!user) {
            alert("You have to sign up first")
            router.push("../home")
            return
        }

        const YumchaProfile: YumchaProfileProps = {
            creator: true,
            userID: user?.id,
            yumchaID: yumchaID
        }

        try {
            setLoading(true)
            const {data, error} = await supabase
                .from("yumcha-profiles")
                .insert(YumchaProfile)
            
            if(data) {
                console.log("Yumcha-profile data inserted")
            }

            if (error) {
                throw error
            }
        }
        catch(error: any) {
            console.error(error.message || error.description)
            alert("Error with yumcha-profiles table")
        }
        finally {
            setLoading(false)
        }
    }

    async function BookYumcha(event: any) {
        event.preventDefault()
        
        if (selectedPlaceLatLong.length <= 1) {
            return
        }

        const Yumcha = {
            username: event.target.name.value,
            description: event.target.description.value,
            time: event.target.time.value,
            date: event.target.date.value,
            latLong: selectedPlaceLatLong,
            seat: event.target.seatLocation.value,
            yumchaName: event.target.yumchaName.value,
            // sameGender: event.target.sameGender.value
        }

        // inserting into yumcha table
        try {
            setLoading(true)
            const {data, error} = await supabase
                .from("yumcha")
                .insert(Yumcha)
            
            if(data) {
                alert("Success! Enjoy your yumcha")
                setYumchaID(data[0].id)
            }

            if (error) {
                throw error
            }
        }
        catch(error: any) {
            console.error(error.message || error.description)
            alert("Error")
        }
        finally {
            setLoading(false)
            setYumchaTableUpdated(true)
            event.target.reset()
        }
    }

    return(
        <form id = {styles.yumchaForm} className = {styles.userForm} onSubmit={BookYumcha}>
            <div className={styles.datetime}>
                <div>
                    <label htmlFor="name" className={styles.block}>Name:</label>
                    <input type="text" name="name" id="name" required placeholder="Jenna" className = {styles.largerInput} />
                </div>
            </div>

            <div className = {styles.datetime}>
                <div>
                    <label htmlFor="date" className = {styles.block}>Date:</label>
                    <input type="date" name="date" id="date" required className = {styles.largerInput} />
                </div>

                <div>
                    <label htmlFor="time" className = {styles.block}>Time:</label>
                    <input type="time" name="time" id="time" required className = {styles.smallerInput} />
                </div>
            </div>

            {/* <div id = {styles.locationSelector}>
                <label htmlFor="place" className = {styles.block}>Place:</label>
                <input type="text" name="place" id="place" required className = {styles.location} placeholder="KFC, Jalan Sambanthan" />
                <Image src={locationPic} alt="Choose location on map"></Image>
            </div> */}

            <div id = {styles.locationSelector}>
                <label htmlFor="place" className = {styles.block}>Place:</label>
                <GoogleAutocomplete setLatLongMap={setGeometry} setLatLongDB={setSelectedPlaceLatLong} />
            </div>

            <div>
                <label htmlFor="seatLocation" className = {styles.block}>Seat:</label>
                <input type="text" className = {styles.medium} name = "seatLocation" required id = "seatLocation" placeholder="Upstairs, 2nd table" autoComplete="off" autoCapitalize="on" />
            </div>

            <div>
                <label htmlFor="yumchaName" className = {styles.block}>Yumcha Name:</label>
                <input type="text" name="yumchaName" id="yumchaName" required placeholder="Lunch + talk" className = {styles.medium} max="15" />
            </div>

            <div>
                <label htmlFor="description" className = {styles.block}>Description:</label>
                <textarea name="description" id="description" rows={2} placeholder="We can talk about anime and food!" autoComplete="on" style = {{width: "80%"}}></textarea>
            </div>
{/* 
            <div>
                <label htmlFor="sameGender">Same Gender</label>
                <input type="checkbox" name="sameGender" id="sameGender" />
            </div> */}

            <div className = {styles.submitBtn}>
                <button id = "submitButton" type="submit">Plan Yumcha</button>
            </div>
        </form>
    )
}

export default Form