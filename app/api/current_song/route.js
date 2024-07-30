import { getAccessToken } from "@/utils/getAccessToken"

export const revalidate = 0;

export const GET = async () => {
        
    try {

        const access_token = await getAccessToken()

        const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        

        const data = await response.json()
        return new Response(JSON.stringify(data), { status: 201,  })
    
        
    } catch (error) {
        return new Response(error, { status: 500 })
        }
    
}


  