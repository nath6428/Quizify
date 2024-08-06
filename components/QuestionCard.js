import React, { useState } from 'react'

const QuestionCard = ({ question, setScore }) => {
  
    const { username, type, range, data } = question
    const [answered, setAnswered] = useState(false)
    const [correct, setCorrect] = useState(false)
    
    const handleAnswer = (index) => {
        setAnswered(true)
        if(question.checkAnswer(index)){
            setCorrect(true)
            setScore((prevScore) => prevScore + 1)
        } else {
            setCorrect(false)
        }
    }

    return (
        <div className='flex flex-col items-center rounded-full my-5 mx-52 p-4 border-black border-2'>
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
                    <h1 className='m-2'>{question.getQuestion()}</h1>
                    <div className='flex flex-col'>
                        {question.getOptionsArray().map((option, index) => {
                            return (
                                <button key={index} onClick={() => {handleAnswer(index)}}>{option}</button>
                            )
                        })}
                    </div>
                </div>
            }
        </div>
  )
}

export default QuestionCard