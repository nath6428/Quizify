import mongoose, { Schema, model, models } from "mongoose";

const TokensSchema = new Schema({
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    }
    
})

const tokens = models.tokens || new model('tokens', TokensSchema)

export default tokens;