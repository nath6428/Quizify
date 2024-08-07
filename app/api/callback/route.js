import { NextURL } from "next/dist/server/web/next-url"
import { redirect } from "next/navigation"


export const GET = async (req, res) => {
    
    try {
        
        const code = await req.nextUrl.searchParams.get('code')
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)}`,
              },
              body: `grant_type=authorization_code&code=${code}&redirect_uri=${'http://localhost:3000/api/callback'}`
        })
        
        const data = await response.json()
        redirect('/')
        return new Response(JSON.stringify(data), { status: 201 })

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error fetching current song' }), { status: 500 })
        
    }


}