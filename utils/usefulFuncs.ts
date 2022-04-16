function getTimeInString(time: string) {
    const timeString = time
    const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
      .toLocaleTimeString('en-US',
        {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
      );

    return timeString12hr
}

function getDateInString(date: string) {
    const year = parseInt(date.slice(0,4))
    const month = parseInt(date.slice(5,7))
    const day = parseInt(date.slice(8,10))
    const dateString = new Date(Date.UTC(year, month, day))
    const options = {day: "2-digit", month: "short"} as const
    const dateStr = dateString.toLocaleDateString("en-US", options)

    return dateStr
}

export {getTimeInString, getDateInString}