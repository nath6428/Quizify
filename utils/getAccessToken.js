
import { getServerSession } from "next-auth";
import { AuthOptions } from "./authOptions.js";


export const getAccessToken = async () => {
  
  try {
    
      const session = await getServerSession(AuthOptions)
      const accessToken = await session.user.accessToken
      return accessToken

    } catch (error) {
      console.log(error)
      
    }
  }
