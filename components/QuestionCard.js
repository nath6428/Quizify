import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  



const QuestionCard = ({ question, setScore, nextQuestion }) => {
  
    const { username, type, range, rangeString, num1, num2, option1, option2, answer } = question
    const [answered, setAnswered] = useState(false)
    const [correct, setCorrect] = useState(false)

    
    const handleAnswer = (index) => {
        setAnswered(true)
        if(answer === index){
            setCorrect(true)
            setScore((prevScore) => prevScore + 1)
        } else {
            setCorrect(false)
        }
        nextQuestion()
    }
    
    return (
        <div className='flex flex-col items-center w-3/4 h-1/2'>

            {answered ?
                <div>
                    {correct 
                    ?
                        <h1>Correct!</h1>
                    :
                        <h1>Incorrect!</h1>
                    }
                </div>
            :
                <div className='flex flex-col items-center p-24'>
                    <h1 className='mb-32 text-3xl flex-wrap'>{`Which of the following ${type} has been listened to more by ${username} in the last ${rangeString}?`}</h1>
                    <div className='flex mb-8 p-4'>
                    <button onClick={() => {handleAnswer(0)}}>
                        <div className='flex items-center justify-center w-64 h-64 border-white border-2 rounded-3xl mx-48 text-2xl'>
                            {option1?.name}
                        </div>
                    </button>
                    <button onClick={() => {handleAnswer(1)}}>
                        <div className='flex items-center justify-center w-64 h-64 border-white border-2 rounded-3xl mx-48 text-2xl'>
                           {option2?.name}
                        </div>
                    </button>
                    </div>
                </div>
                
            }
        </div>
  )
}

export default QuestionCard