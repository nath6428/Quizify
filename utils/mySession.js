import { getServerSession } from "next-auth";
import { AuthOptions } from "./authOptions.js";


export const getSessionFromServer = async(req) => {
    try {
        const session = await getServerSession(AuthOptions)
        if(session) {
            delete session.user.accessToken
        }
        return session

    } catch (error) {
        return null
    }
}