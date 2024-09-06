"use client"

import { connectToDB } from '@/utils/connectToDB'
import React, { useEffect, useState } from 'react'
import '@/styles/globals.css'
import { Question } from '@/utils/generateQuiz'
import QuestionDisplay from '@/components/QuestionDisplay'
import { Input } from '@/components/ui/input'



const PlayQuiz = ({ params }) => {

    const [loading, setLoading] = useState(true)
    const url = params.url
    const [quizData, setQuizData] = useState([])
    const [score, setScore] = useState(0);
    const [notFound, setNotFound] = useState(true)
    const [name, setName] = useState('3ddw')
    const [nameEntered, setNameEntered] = useState(false)
    

    
    useEffect(() => {
        
        const getQuiz = async () => {
            
            try{

                const response = await fetch('/api/find_quiz', {
                    method: 'POST',
                    body: JSON.stringify({
                        url: url
                    })
                }) 
                    
    
                const data = await response.json()
                if(!data) throw new Error('Quiz not found')
                setNotFound(false)
                setLoading(false)
                setQuizData(data)
                
            } catch(e){
                setLoading(false)
                setNotFound(true)
            }
        }

        getQuiz()
    }, [url])



    return (
        <div className='flex flex-col items-center w-full h-full mt-4 md:mt-10'>
            {loading 
            ?
                <h1>Loading...</h1> 
            :
                <div className='flex flex-col items-center'>
                    {notFound
                    ?
                        <h1>Quiz not found!</h1>
                    :
                        <div>
                            {nameEntered
                            ?
                                <div className='flex flex-col items-center w-full h-full'>
                                    <QuestionDisplay data={quizData} setScore={setScore} score={score} name={name} />
                                </div>
                            :
                            <div className='flex flex-col w-72 md:w-80 text-2xl items-center justify-center' onKeyDown={(e) => e.key === 'Enter' && setNameEntered(true)}>
                                <h1 className='mb-4'>Enter your name:</h1>
                                <Input className='w-full mb-4' onChange={(e) => {setName(e.target.value)}} />
                                <button onClick={() => {setNameEntered(true)}}>Play!</button>
                            </div>
                            }
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default PlayQuiz