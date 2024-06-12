import { connect } from 'mongoose';
import DB_NAME from '../../constants';
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await connect(process.env.DATABASE_URL)
            .then(() => console.log('Connected to MongoDB'))
            .catch((error) => console.log(error));
    }
    catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1);
    }
}

export default connectDB