
export const getArtistsData = async (range) => {

    try {
        const response = await fetch('api/music_data', {
          method: 'POST',
          body: JSON.stringify({
            type: 'artists',
            time_range: range,
            limit: 50
          })
        })
        const data = await response.json()
        return data

    } catch (error) {
      console.log(error)
      
    }

}

