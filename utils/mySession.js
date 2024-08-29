import { getServerSession } from "next-auth";
import { AuthOptions } from "./authOptions.js";


export const getSession = async(req) => {
    try {
        const session = await getServerSession(AuthOptions)
        return session
    } catch (error) {
        return null
    }
}