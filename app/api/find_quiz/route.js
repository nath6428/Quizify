import { connectToDB } from "@/utils/connectToDB"
import Quiz from "@/models/quiz"

export const POST = async (req, res) => {
    
    const { url } = await req.json()
    
    try {
        await connectToDB()
        const quizData = await Quiz.findOne({ quizurl: url })
        return new Response(JSON.stringify(quizData), { status: 200 })
        console.log(quizData)
        
    } catch (error) {
        return new Response("Error fetching quiz", { status: 500 })
    }
}

