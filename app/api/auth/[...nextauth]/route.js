import NextAuth from "next-auth/next"
import SpotifyProvider from "next-auth/providers/spotify"

// id: profile.id,
// name: profile.display_name,
// email: profile.email,
// image: profile.images?.[0]?.url,

const auth = NextAuth({

    providers:[
        SpotifyProvider({
                clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            profile(profile){
                return {
                    id: profile.id,
                    name: profile.display_name,
                    email: profile.email,
                    image: profile.images?.[0]?.url,  
                }
            }
        })
    ],
    

})

export { auth as GET, auth as POST }

