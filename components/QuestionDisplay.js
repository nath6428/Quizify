import React, { useState, useEffect } from 'react'
import QuestionCard from './QuestionCard'
import Leaderboard from './Leaderboard';

const QuestionDisplay = ({ questions, setScore, score}) => {

    const [index, setIndex] = useState(0)
    const leaderboard = questions?.leaderboard

    const nextQuestion = () => {

        setTimeout(() => {
            setIndex((prevIndex) => prevIndex + 1)
        }, 2000)

               
    };

  return (
    <div className='flex flex-col items-center w-full h-full'>
        {index < questions.length
        ?
            <QuestionCard question={questions[index]} key={index} setScore={setScore} nextQuestion={nextQuestion} />
        :
            <Leaderboard leaderboard = {leaderboard} name={name} score={score}/>
        }
    </div>
  )
}

export default QuestionDisplay