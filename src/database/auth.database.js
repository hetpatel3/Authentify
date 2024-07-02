import mongoose from 'mongoose'

const connectDb = async() => {
    try {
        const connectMe = await mongoose.connect(`${process.env.MONGODB_URI}/authProject`)
        console.log("Connected Successfully!")
    } catch (error) {
        console.log("MongoDB Connection Failed!", error);
        process.exit(1);
    }
}

export default connectDb;