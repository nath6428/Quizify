"use client"

import React, { useState } from 'react'
import '@/styles/globals.css'
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'


const JoinQuiz = () => {
  
  const [url, setURL] = useState("")
  const router = useRouter()

  const handleEnter = (event) => {
    if(event.key === "Enter"){
      redirectToQuiz()
    }
  }

  const redirectToQuiz = () => {
    router.push(`/play-quiz/${url}`)
  }

  return (
    <div className='flex flex-col items-center'  onKeyDown={handleEnter}>
        <h1 className='text-3xl m-6'>Type in a quiz url or code:</h1>
        <Input className = "w-1/4" onChange = {(event) => {setURL(event.target.value.trim())}}/>
        <button className='m-6 text-xl' onClick={redirectToQuiz}>Go!</button>
    </div>
  )
}

export default JoinQuiz