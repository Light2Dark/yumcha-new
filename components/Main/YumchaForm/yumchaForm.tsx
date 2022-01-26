import styles from "./form.module.css"
import Image from "next/image"
import locationPic from "../../../public/logos/choosePlace.svg"

const Form = () => {

    const BookYumcha = (event: any) => {
        event.preventDefault()
    }

    return(
        <form id = {styles.yumchaForm} className = {styles.userForm}>
            <div className={styles.datetime} onSubmit={BookYumcha}>
                <div>
                    <label htmlFor="name" className={styles.block}>Name:</label>
                    <input type="text" name="name" id="name" required placeholder="Jenna" className = {styles.largerInput} />
                </div>
    
                <div>
                    <label htmlFor="phoneNum" className = {styles.block}>Phone Number:</label>
                    <input type="tel" name="phoneNum" id="phoneNum" required placeholder="012706869" className = {styles.smallerInput} />
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
                <label htmlFor="place" className = {styles.block}>Place:</label>
                <input type="text" name="place" id="place" required className = {styles.location} placeholder="KFC, Jalan Sambanthan" />
                {/* <Image src={locationPic} alt="Choose location on map"></Image> */}
            </div>

            <div>
                <label htmlFor="seatLocation" className = {styles.block}>Seat:</label>
                <input type="text" className = {styles.placeInput} name = "seatLocation" required id = "seatLocation" placeholder="Upstairs, 2nd table" autoComplete="off" autoCapitalize="on" />
            </div>

            <div>
                <label htmlFor="yumchaName" className = {styles.block}>Yumcha Name:</label>
                <input type="text" name="yumchaName" id="yumchaName" required placeholder="Lunch + talk" className = "placeInput" max="15" />
            </div>

            <div>
                <label htmlFor="description" className = {styles.block}>Description:</label>
                <textarea name="description" id="description" rows={2} placeholder="We can talk about anime and food!" autoComplete="on" style = {{width: "80%"}}></textarea>
            </div>

            <div style = {{marginTop: "10px"}} className={styles.select}>
                <input type="checkbox" name="sameGender" id="sameGender" value = "1" />
                <label htmlFor="sameGender" className = {styles.smaller}>Only yumcha with same gender</label>
            </div>

            <div className={styles.select}>
                <input type="checkbox" name="whatsapp" id="whatsapp" value = "1" required />
                <label htmlFor="whatsapp" className = {styles.smaller}>Users can WhatsApp you</label>
            </div>

            <div className = {styles.submitBtn}>
                <button id = "submitButton" type="submit">Plan Yumcha</button>
            </div>
        </form>
    )
}

export default Form