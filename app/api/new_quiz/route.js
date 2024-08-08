import Quiz from "@/models/quiz";
import { connectToDB } from "@/utils/connectToDB";
import { nanoid } from "nanoid";

export const POST = async (req, res) => {
    await connectToDB();

    const { questions, user_id, quizurl } = await req.json();

    try {
        const quizobj = await Quiz.create({
            user_id: user_id,
            questions: questions,
            quizurl: quizurl
        });
        
        await quizobj.save()

        return new Response(JSON.stringify(quizobj), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response(error, { status: 500 })
    }
}