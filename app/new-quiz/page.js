"use client"

import { generateQuiz } from '@/utils/generateQuiz'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import '@/styles/globals.css'


const NewQuiz = () => {
    const { data: session, status } = useSession();
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        
        if(status === 'authenticated'){
            const fetchQuestions = async () => {
                const quiz = await generateQuiz(session.user.name)
                setQuestions(quiz)
            }
            fetchQuestions()
        }

    }, [session, status])

    return (
        <div>
            {questions.map((question, index) => (
                <div key={index}>
                    <h1>{question.getQuestion()}</h1>
                    <h2>{question.getOptionsArray().map((option, index) => (
                        <div key={index}>{option}</div>
                    ))}</h2>
                </div>
            ))}
        </div>
    )
}

export default NewQuiz