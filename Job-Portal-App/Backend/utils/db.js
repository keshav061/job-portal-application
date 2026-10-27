import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "job_portal",
        });

        isConnected = true;
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;