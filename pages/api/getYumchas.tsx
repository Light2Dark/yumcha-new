import { supabase } from "../../utils/supabaseClient"

type Props = {
    isMounted: boolean
    setLoading: (loadingState: boolean) => void;
    setData : any
}

export async function getAllYumchas({isMounted, setLoading, setData}: Props) {
    try {
        setLoading(true)

        let {data, error, status} = await supabase
            .from("yumcha-profiles")
            .select(`
                yumchaID,
                userID,
                creator,
                profiles (
                    id,
                    avatarUrl
                ),
                yumcha (
                    id,
                    username,
                    seat,
                    date,
                    time,
                    yumchaName,
                    description,
                    sameGender,
                    tempPlace,
                    numPeopleJoin,
                    latLong
                )
            `)
            // .not("userID", "eq", user?.id)   
        
        if (error && status !== 406) {
            console.log("error not 406")
            throw error
        }

        if (data && isMounted) {
            setData(data)
            // return {
            //     props : {
            //         data
            //     }
            // }
        }

    } catch(error: any) {
        console.error(error.message || error.description)
    } finally {
        setLoading(false)
    }
}