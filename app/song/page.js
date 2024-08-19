"use client"

import '@/styles/globals.css'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const Song = () => {
  
  const [songData, setSongData] = useState("")

  useEffect(() => {

    const fetchData = async () => {
      
      try {
          const response = await fetch('api/current_song')
          const data = await response.json()
          await setSongData(data.item)

      } catch (error) {
        console.log(error)
        
      }
    }

    fetchData()

  }, [])
  

  return (
    <div>
      {songData
      ?
      <div className="text-5xl flex justify-center p-16 flex-col items-center">
        <p>You are listening to {songData.name} by {songData.artists[0].name}</p>
        <Image className='mt-10' src={songData.album.images[0].url} alt="album cover" width={300} height={300} />
      </div>
      :
      <div className="text-5xl flex justify-center p-16 flex-col items-center">
        You aren&apos;t listening to anything right now!
      </div>
      }

      
    </div>
  )
}

export default Song