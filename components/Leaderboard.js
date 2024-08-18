import React, { useEffect, useState } from 'react'

const Leaderboard = ({ quizurl, leaderboard, name, score }) => {
    
    const newLeaderboard = [...leaderboard, {name: name, score: score}]
    newLeaderboard.sort((a, b) => b.score - a.score)
    
    useEffect(() => {
        
    const response = async () => {
        try {
            const res = await fetch('/api/leaderboard', {
                method: 'POST',
                body: JSON.stringify({
                    quizurl: quizurl,
                    newLeaderboard: newLeaderboard
                })
            })
            const data = await res.json()
        } catch (error) {
            console.log(error)
            
        }
    }

    response()

  }, [])



  
    return (
    <div className='flex flex-col justify-center items-center w-3/4 h-1/2'>
        <h2 className='text-xl'>Your Score: {score}</h2>
        <h1 className='text-7xl mb-10 mt-4'>Leaderboard</h1>
        <div className='flex flex-col items-center w-full h-full'>
            {newLeaderboard.map((entry, index) => (
                <div className='flex justify-between w-full text-2xl mb-2' key={index}>
                    
                    <div className='flex w-full'>
                        {index === 0 && '🥇'}
                        {index === 1 && '🥈'}
                        {index === 2 && '🥉'}
                        {index > 2 && <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>}
                        <p className='ml-2'>{entry.name}</p>
                    </div>
                    <p>{entry.score}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Leaderboard