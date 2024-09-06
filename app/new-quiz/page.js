"use client"

import { generateQuiz } from '@/utils/generateQuiz'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import '@/styles/globals.css'
import QuestionCard from '@/components/QuestionCard'
import { nanoid } from 'nanoid'
import { getSession } from '@/utils/getSession'



const NewQuiz = () => {
    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [status, setStatus] = useState('unauthenticated')
    const [questions, setQuestions] = useState([])
    const [quizurl, setQuizurl] = useState(nanoid(6))
    const [showCopied, setShowCopied] = useState(false)

    const fetchSession = async () => {
        try {
          setStatus('loading');
          const newSession = await getSession();
          setSession(newSession);
          if (newSession) {
            setStatus('authenticated');
          } else {
            setStatus('unauthenticated');
          }
        } catch (error) {
          console.error("Error fetching session:", error);
          setStatus('error');
        }
      };
    
    useEffect(() => {
        
        fetchSession()

        if(status === 'authenticated'){
            const fetchQuestions = async () => {
                
                const quiz = await generateQuiz(session.user.name)
                setQuestions(quiz)
                setLoading(false)
                sendToDB(quiz)
            }
            fetchQuestions()
            }

    
    }, [status, session?.user.name])

    const sendToDB = async (quiz) => {
        
        await fetch('/api/new_quiz', {
            method: 'POST',
            body: JSON.stringify({
                user_id: session.user.email,
                questions: quiz,
                quizurl: quizurl,
                leaderboard: []
            })
        })
    }
    
    const copyURL = () => {
        navigator.clipboard.writeText(quizurl)
        setShowCopied(true)
        setTimeout(() => {
            setShowCopied(false)
        }, 5000)

    }

    const redirectURL = () => {
        window.location.href = `https://quizify-self.vercel.app/play-quiz/${quizurl}`
    }

    return (
        <div className='flex flex-col items-center mt-10 justify-between md:text-4xl'>
                {loading 
                ? 
                    <h1>Loading...</h1>
                :
                    <div className='flex flex-col items-center'>
                        Quiz Code: {quizurl}
                        <button onClick={copyURL} className='mt-10 text-2xl border-2 border-white rounded-full p-4'>Copy URL to Clipboard</button>
                        <button onClick={redirectURL} className='mt-10 text-2xl border-2 border-white rounded-full p-4'>Play Quiz</button>
                    </div>
                }
                <div>
                    {showCopied ? (
                        <p className="mt-24 transition-opacity duration-300 opacity-100">Copied to clipboard!</p>
                    ) : (
                        <p className="mt-24 transition-opacity duration-300 opacity-0">Copied to clipboard!</p>
                    )}

                </div>
        </div>
    )
}

export default NewQuiz