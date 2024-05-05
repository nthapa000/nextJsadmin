import mongoose from "mongoose";

// Whenever we want to make a operation we need to connect to Database and it will create a new connection everytime instead we will first check whether if we are connected or not , if we are not connected then only we will be connecting to DB else using the existing connection.

export const connectToDB = async () => {
  const connection = {};
  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.MONGO);
    connection.isConnected = db.connection[0].readyState;
  } catch (error) {
    throw new Error(error);
  }
};
