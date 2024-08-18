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
    const [notFound, setNotFound] = useState(false)
    const [name, setName] = useState('')
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
                setNotFound(false)
                const questions = data.questions
                setLoading(false)
                setQuizData(questions)
                
            } catch(e){
                setLoading(false)
                setNotFound(true)
            }
        }

        getQuiz()
    }, [url])



    return (
        <div className='flex flex-col items-center w-full h-full'>
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
                                    <QuestionDisplay questions={quizData} setScore={setScore} score={score} />
                                    <h1 className='text-xl'>Your score: {score}</h1>
                                </div>
                            :
                            <div className='flex flex-col w-80 text-2xl items-center justify-center' onKeyDown={(e) => e.key === 'Enter' && setNameEntered(true)}>
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