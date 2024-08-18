import Quiz from "@/models/quiz";
import { connectToDB } from "@/utils/connectToDB";

export const POST = async (req, res) => {

    const { quizurl, newLeaderboard } = await req.json();

    try {
        console.log(newLeaderboard)
        await connectToDB()
        await Quiz.updateOne(
            { quizurl },
            { 
                $set: { leaderboard: newLeaderboard }
            }
        );
        
        return new Response(JSON.stringify("Done!"), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response(error, { status: 500 })
    }


}