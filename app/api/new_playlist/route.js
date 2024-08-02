import { getAccessToken } from "@/utils/getAccessToken"
import { useSession } from "next-auth/react"



export const POST = async (req, res) => {
    
    
    const { name, user_id } = await req.json()

    try {
        
        const access_token = await getAccessToken()
        const response = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name
            })
        })
        

        const data = await response.json()
        return new Response(JSON.stringify(data), { status: 201 })
    
        
    } catch (error) {
        return new Response(error, { status: 500 })
        }
}