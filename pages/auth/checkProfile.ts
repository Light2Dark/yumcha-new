import { User } from "@supabase/supabase-js";
import { supabase } from "../../utils/supabaseClient";

type Props = {
    isMounted: boolean
    setIsProfileSet: (isProfileSet: boolean) => void
    user: User
}

export default async function checkProfile({isMounted, setIsProfileSet, user}: Props) {
    
    try {
        let {data, error, status} = await supabase
            .from("profiles")
            .select("firstName")
            .eq("id", user?.id)
            .single()

        if (error && status !== 406) {
            throw error
        }

        if (data && isMounted) {
            if (data.firstName) { // if empty string is false
                setIsProfileSet(true)
                console.log("yoo profile sett", data)
            }
        }
    } catch(error: any) {
        alert(error.message || error.description)
    }
}