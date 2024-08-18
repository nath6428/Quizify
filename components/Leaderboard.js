import React, { useEffect } from 'react'

const Leaderboard = ({ leaderboard, name, score }) => {
  
  useEffect(() => {
    const response = async () => {

    }
  })
  
    return (
    <div className='flex flex-col justify-center items-center w-3/4 h-1/2'>
        Final Score: { score }
    </div>
  )
}

export default Leaderboard