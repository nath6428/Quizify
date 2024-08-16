"use client"

import { connectToDB } from '@/utils/connectToDB'
import React, { useEffect, useState } from 'react'
import '@/styles/globals.css'
import QuestionCard from '@/components/QuestionCard'
import { Question } from '@/utils/generateQuiz'



const PlayQuiz = ({ params }) => {

    const [loading, setLoading] = useState(true)
    const url = params.url
    const [quizData, setQuizData] = useState([])
    const [score, setScore] = useState(0);
    const [notFound, setNotFound] = useState(false)

    
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
        <div className='flex flex-col items-center'>
            {loading 
                ?
                    <h1>Loading...</h1> 
                :
                    <div className='flex flex-col items-center mb-12'>
                        {notFound
                        ?
                            <h1>Quiz not found!</h1>
                        :
                            <div className='flex flex-col items-center'>
                                {quizData.map((question, index) => {
                                    return <QuestionCard key={index} question={question} setScore={setScore}/>
                                })}
                                <h1>Your score: {score}</h1>
                            </div>
                        }
                    </div>
                
            }
        </div>
    )
}

export default PlayQuiz