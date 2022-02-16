import styles from "./form.module.css"
import Image from "next/image"
import locationPic from "../../../public/logos/choosePlace.svg"
import { VirtualYumchaProps } from "../YumchaCard/virtualYumchaCard"
import { useState } from "react"
import { supabase } from "../../../utils/supabaseClient"

const Form = () => {
    const [loading, setLoading] = useState(false)

    async function BookYumcha(event: any) {
        event.preventDefault()
        
        const Yumcha: VirtualYumchaProps = {
            username: event.target.name.value,
            description: event.target.description.value,
            time: event.target.time.value,
            date: event.target.date.value,
            yumchaName: event.target.yumchaName.value,
            onlineLink: event.target.onlineLink.value
        }

        try {
            setLoading(true)
            const {data, error} = await supabase
                .from("virtualYumcha")
                .insert(Yumcha)
            
            if(data) {
                alert("Success! Enjoy your yumcha")
            }

            if (error) {
                throw error
            }
        }
        catch(error) {
            console.error(error)
            alert("Error")
        }
        finally {
            setLoading(false)
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

            <div id = {styles.locationSelector}>
                <label htmlFor="onlineLink" className = {styles.block}>Online Link:</label>
                <input type="text" name="onlineLink" id="onlineLink" required className = {styles.location} placeholder="Paste the Zoom/Meet/Discord link here" />
            </div>

            <div>
                <label htmlFor="yumchaName" className = {styles.block}>Yumcha Name:</label>
                <input type="text" name="yumchaName" id="yumchaName" required placeholder="Lunch + talk" className = {styles.medium} max="15" />
            </div>

            <div>
                <label htmlFor="description" className = {styles.block}>Description:</label>
                <textarea name="description" id="description" rows={2} placeholder="We can talk about anime and food!" autoComplete="on" style = {{width: "80%"}}></textarea>
            </div>

            {/* <div style = {{marginTop: "10px"}} className={styles.select}>
                <input type="checkbox" name="sameGender" id="sameGender" value = "1" />
                <label htmlFor="sameGender" className = {styles.smaller}>Only yumcha with same gender</label>
            </div> */}

            <div className = {styles.submitBtn}>
                <button id = "submitButton" type="submit">Plan Yumcha</button>
            </div>
        </form>
    )
}

export default Form