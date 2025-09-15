import mongoose from "mongoose"

export const db = async () => {
    try {
        
        await mongoose.connect(process.env.mongo_uri!, {
            dbName: "atelier-shop"
        })

        return "connecté"

    } catch (error) {
        console.log(error)
    }
}