import mongoose from "mongoose"

export const db = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI environment variable is not defined");
        }
        
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "atelier-shop"
        })

        return "connecté"

    } catch (error) {
        console.log(error)
        throw error;
    }
}