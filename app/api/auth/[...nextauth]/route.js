import NextAuth from "next-auth/next"
import SpotifyProvider from "next-auth/providers/spotify"
import querystring from 'querystring';

// id: profile.id,
// name: profile.display_name,
// email: profile.email,
// image: profile.images?.[0]?.url,

const scope = 'user-read-private user-read-email';
const redirect_uri = 'http://localhost:3000/api/callback';

const spotifyURL = 'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: process.env.SPOTIFY_CLIENT_ID,
          scope: scope,
          redirect_uri: redirect_uri,
        });

const auth = NextAuth({

    providers:[
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            authorization: spotifyURL,
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
    callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at * 1000,
          user,
        }
      }
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token
      }
      const newToken = await refreshAccessToken(token)
      return newToken
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.error = token.error
      session.user = token.user
      return session
    },
  },
    

})

export { auth as GET, auth as POST }

