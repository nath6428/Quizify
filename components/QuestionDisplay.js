import React, { useState, useEffect } from 'react'
import QuestionCard from './QuestionCard'

const QuestionDisplay = ({ questions, setScore }) => {

    const [index, setIndex] = useState(0)
    
    

    const nextQuestion = () => {

        setTimeout(() => {
            setIndex((prevIndex) => prevIndex + 1)
        }, 2000)

               
    };

  return (
    <div className='flex flex-col items-center w-full h-full'>
        <QuestionCard question={questions[index]} key={index} setScore={setScore} nextQuestion={nextQuestion} />
    </div>
  )
}

export default QuestionDisplay