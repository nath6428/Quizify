import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { set } from 'mongoose'

  



const QuestionCard = ({ question, setScore, nextQuestion }) => {
  
    const { username, type, range, rangeString, num1, num2, option1, option2, answer } = question
    const [answered, setAnswered] = useState(false)
    const [correct, setCorrect] = useState(false)
    const [embed1, setEmbed1] = useState(null)
    const [embed2, setEmbed2] = useState(null)

    
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

    const embed = async (option1, option2) => {

        const embed1 = await fetch(`https://open.spotify.com/oembed?url=${option1.external_urls.spotify}`, {
            method: 'GET'
        })
        const embed1json = await embed1.json()
        setEmbed1(embed1json.html)

        const embed2 = await fetch(`https://open.spotify.com/oembed?url=${option2.external_urls.spotify}`, {
            method: 'GET'
        })
        const embed2json = await embed2.json()
        setEmbed2(embed2json.html)
    }

    embed(option1, option2)



    
    return (
        <div className='flex flex-col items-center w-3/4 h-1/2'>

            {answered ?
                <div className ={`flex max-h-16 justify-center items-center py-36 px-24 xl:p-60 mt-12 xl:m-16 text-4xl border-2 border-white rounded-2xl ${correct ? 'bg-green-400' : 'bg-red-500'}`}>
                    {correct 
                    ?
                        <h1>Correct!</h1>
                    :
                        <h1>Incorrect!</h1>
                    }
                </div>
            :
                <div className='flex flex-col items-center pt-2 w-72 xl:p-24'>
                    <h1 className='xl:mb-32 text-lg xl:text-3xl flex-wrap text-center'>{`Which of the following ${type} has been listened to more by ${username} in the last ${rangeString}?`}</h1>
                    <div className='flex flex-col xl:flex-row mb-8 p-4'>
                        <button onClick={() => {handleAnswer(0)}}>
                            <div className='flex flex-col items-center justify-between w-96 h-80 border-white border-2 rounded-3xl mx-48 overflow-hidden py-8 text-2xl'>
                                {embed1 && <div className='max-h-52 overflow-y-scroll scrollbar-padded' dangerouslySetInnerHTML={{ __html: embed1 }} />}
                                {option1?.name}
                            </div>
                        </button>
                        <button onClick={() => {handleAnswer(1)}}>
                            <div className='flex flex-col items-center justify-between w-96 h-80 border-white border-2 rounded-3xl mx-48 overflow-hidden py-8 text-2xl'>                            
                                {embed2 && <div className='max-h-52 overflow-y-scroll scrollbar-padded' dangerouslySetInnerHTML={{ __html: embed2 }} />}
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