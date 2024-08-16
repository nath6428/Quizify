import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  



const QuestionCard = ({ question, setScore }) => {
  
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
    }
    
    return (
        <div className='flex flex-col items-center rounded-full my-5 mx-52 p-4 border-white border-2'>

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
                <div className='flex flex-col items-center'>
                    <h1 className='m-2'>{`Which of the following ${type} has been listened to more by ${username} in the last ${rangeString}?`}</h1>
                    <div className='flex flex-col'>
                        <button onClick={() => {handleAnswer(0)}}>{option1?.name}</button>
                        <button onClick={() => {handleAnswer(1)}}>{option2?.name}</button>
                    </div>
                </div>
            }
        </div>
  )
}

export default QuestionCard