import React, { useState, useEffect } from 'react'
import QuestionCard from './QuestionCard'
import Leaderboard from './Leaderboard';

const QuestionDisplay = ({ data, setScore, score, name }) => {

    const [index, setIndex] = useState(0)
    const { questions, leaderboard, quizurl } = data

    const nextQuestion = () => {
        setTimeout(() => {
            setIndex((prevIndex) => prevIndex + 1)
        }, 2000)

               
    };

  return (
    <div className='flex flex-col items-center w-full h-full'>
        {index < questions.length
        ?
            <div className='flex flex-col items-center w-full'>
                <h1 className='text-xl'>Your score: {score}</h1>
                <QuestionCard question={questions[index]} key={index} setScore={setScore} nextQuestion={nextQuestion} />
            </div>
        :
            <Leaderboard quizurl={quizurl} leaderboard = {leaderboard} name={name} score={score}/>
        }
    </div>
  )
}

export default QuestionDisplay