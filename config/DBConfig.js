import mongoose from 'mongoose';
import { config } from 'dotenv'

config();

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDB = async () => {
    await mongoose.connect(MONGODB_URI);
    console.log('connected to DB');
}

export default connectToDB;