import mongoose, { Schema, model, models } from "mongoose";

const quizSchema = new Schema({
    questions: {
        type: Array,
        required: true
    },
    quizurl: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
    
})

const Quiz = models.Quiz || new model('Quiz', quizSchema)

export default Quiz;