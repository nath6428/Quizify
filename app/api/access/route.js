
export const GET = async (req,res) => {
    
    try {

        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)}`,
              },
              body: `grant_type=refresh_token&refresh_token=${process.env.SPOTIFY_REFRESH_TOKEN}`
        })
        
        const data = await response.json()
        return new Response(JSON.stringify(data), { status: 201 })

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error fetching current song' }), { status: 500 })
        
    }

    
}

