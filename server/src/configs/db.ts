import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log('MongoDB connected'));

    await mongoose.connect(`${process.env.MONGODB_URL}/justwiselove`)
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('An unknown error occurred');
    }
  }
}