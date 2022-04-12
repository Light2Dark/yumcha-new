import { supabase } from "../../utils/supabaseClient"
import path from "path"

const postsDirectory = path.join(process.cwd(), "yumchas")

// Get yumcha ID's for populating dynamic yumcha pages
export async function getAllYumchaIds() {
    try {
        const {data, error, status} = await supabase
            .from("yumcha")
            .select("id")

        if (error && status !== 406) {
            throw error
        }

        if (data) {
            return data.map(id => {
                return {
                    params: {
                        yumchaID: id.id.toString()
                    }
                }
            })
        }
    }
    catch(error: any) {
        console.error(error)
    }
}

// export async function getYumchaData(yumchaID: number) {
//     console.log(postsDirectory)
//     const fullPath = path.join(postsDirectory, `${yumchaID}.tsx`)
// }

export async function getYumchaData(yumchaID: string) {

    let newYumchaID = parseInt(yumchaID)
    try {
        const {data, error, status} = await supabase
            .from("yumcha")
            .select(`
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
                latLong,

                yumcha-profiles(
                    yumchaID,
                    userID,
                    creator
                ),

                profiles(
                    id,
                    firstName,
                    avatarUrl,
                    bio,
                    gender
                )
            `)
            .match({id: newYumchaID})

        if (error && status !== 406) {
            throw error
        }

        if (data) {
            return data
        }
    }
    catch(error: any) {
        console.error(error)
    }
}