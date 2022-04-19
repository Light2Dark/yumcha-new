import { supabase } from "../../utils/supabaseClient"
import { useEffect } from "react"

export function JoinYumcha(yumchaID: number, userID: String, setLoading: (loading: boolean) => void) {
    if (confirm("Join this yumcha?")) {
        UpdateDB(yumchaID, userID, setLoading)
    }
}

export function EndYumcha(yumchaID: number, setLoading: (loading: boolean) => void) {
    if  (confirm("End your yumcha?")) {
        DeleteDB(yumchaID, setLoading)
    }   
}

async function DeleteDB(id: number, setLoading: (loading: boolean) => void) {
    try {
        setLoading(true)

        const {error} = await supabase
            .from("yumcha-profiles")
            .delete()
            .match({yumchaID: id})

        if (error) {
            throw error
        }
    }
    catch(error: any) {
        console.error(error.message || error.description)
    }

    try {
        const {data, error} = await supabase
            .from("yumcha")
            .delete()
            .match({id: id})
        
        if(data) {
            alert("Yumcha ended! Thank you.")
        }

        if (error) {
            throw error
        }
    }
    catch(error: any) {
        console.error(error.message || error.description)
    }

    finally {
        setLoading(false)
    }
}

async function UpdateDB(yumchaID: number, userID: String, setLoading: (loading: boolean) => void) {
    try {
        setLoading(true)
        const {data, error} = await supabase
            .from("yumcha-profiles")
            .insert([
                {yumchaID: yumchaID, userID: userID, creator: false} // because not creator of yumcha joining yumcha
            ])
        
        if(data) {
            alert("Yumcha joined, enjoy!")
        }

        if (error) {
            throw error
        }
    }
    catch(error: any) {
        console.error(error.message || error.description)
    }

    finally {
        setLoading(false)
    }
}

// function GoToYumchaPage(id: number) {
//     // check whether user has profile
//     if (isProfileSet) {
//         // redirect to yumcha page
//         const link = "/yumchas/" + id
//         router.push(link)
//     } else if (isProfileSet === false) {
//         alert("Set up your profile first!")
//         router.push("./auth/profile")
//     }
// } 

// useEffect(() => {
    
//     if(deletingDB) {
//         DeleteDB()
//     }

//     return() => {
//         setDeletingDB(false)
//     }

// }, [deletingDB])

// useEffect(() => {
//     if(updatingDB) {
//         UpdateDB()
//     }

//     return () => {
//         setUpdatingDB(false)
//     }
// }, [numPeopleYumcha, updatingDB])

// export async function UpdateDB(id: number) {
//     try {
//         setLoading(true)
//         const {data, error} = await supabase
//             .from("yumcha")
//             .update({numPeopleJoin: numPeopleYumcha})
//             .match({id: id})
        
//         if(data) {
//             alert("Joining! Enjoy your yumcha.")
//         }

//         if (error) {
//             throw error
//         }
//     }
//     catch(error: any) {
//         console.error(error.message || error.description)
//     }
//     finally {
//         setLoading(false)
//     }
// }