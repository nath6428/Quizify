import mongoose, { Mongoose } from "mongoose"

let isConnected = false;

export const connectToDB = async () => {
    
    mongoose.set('strictQuery', true);
    
    if(isConnected){
        return;
    } else{
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                dbName: "SpotifyApp",
                useUnifiedTopology: true,
            })

            isConnected = true;
            return;

        } catch (error) {
            console.log("Error connecting to the database")
            console.log(error)
            
        }
    }

}