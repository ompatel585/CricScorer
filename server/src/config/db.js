import mongoose from 'mongoose';

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo DB Connected ${conn.connection.host}`);

    } catch (error) {
        console.error("Error connecting to the database ",error.message);
        process.exit(1);
    }
}

export default connectDB;