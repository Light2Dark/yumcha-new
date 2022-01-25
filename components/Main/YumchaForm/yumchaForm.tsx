const Form = () => {
    return(
        <form id = "yumchaForm" class = "userForm" action="php/action.php" method = "POST">
            <div class="datetime">
                <div>
                    <label for="name" class = "block">Name:</label>
                    <input type="text" name="name" id="name" required placeholder="Jenna" class = "largerInput">
                </div>
    
                <div>
                    <label for="phoneNum" class = "block">Phone Number:</label>
                    <input type="tel" name="phoneNum" id="phoneNum" required placeholder="012706869" class = "smallerInput">
                </div>
            </div>

            <div class = datetime>
                <div>
                    <label for="date" class = "block">Date:</label>
                    <input type="date" name="date" id="date" required class = "largerInput">
                </div>

                <div>
                    <label for="time" class = "block">Time:</label>
                    <input type="time" name="time" id="time" required class = "smallerInput">
                </div>
            </div>

            <div id = "locationSelector">
                <label for="place" class = "block">Place:</label>
                <img src="./assets/logos/choosePlace.svg" alt="Choose location on map">
            </div>

            <div>
                <label for="seatLocation" class = "block">Seat:</label>
                <input type="text" class = "placeInput" name = "seatLocation" required id = "seatLocation" placeholder="Upstairs, 2nd table" autocomplete="off" autocapitalize="on" >
            </div>

            <div>
                <label for="yumchaName" class = "block">Yumcha Name:</label>
                <input type="text" name="yumchaName" id="yumchaName" required placeholder="Lunch + talk" maxlength="15" class = "placeInput">
            </div>

            <div>
                <label for="description" class = "block">Description:</label>
                <textarea name="description" id="description" rows="2" placeholder="We can talk about anime and food!" maxlength="30" autocomplete="on" style = "width: 80%"></textarea>
            </div>

            <div style = "margin-top: 10px;">
                <input type="checkbox" name="sameGender" id="sameGender" value = "1">
                <label for="sameGender" class = "smaller">Only yumcha with same gender</label>
            </div>

            <div>
                <input type="checkbox" name="whatsapp" id="whatsapp" value = "1" required>
                <label for="whatsapp" class = "smaller">Users can WhatsApp you</label>
            </div>

            <div class = "submitBtn">
                <button id = "submitButton" type="submit" onclick = "formFilled()">Plan Yumcha</button>
            </div>
        </form>
    )
}

export default Form