

export const getAccessToken = async () => {
      
    try {
      const responseFunc = await import("../app/api/access/route.js")
      const response = await responseFunc.GET()
      const data = await response.json()
      const access_token = await data.access_token

      return access_token

    } catch (error) {
      console.log(error)
      
    }
  }
