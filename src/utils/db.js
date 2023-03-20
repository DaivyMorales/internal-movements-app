import { connect, connection } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const conn = {
  isConnected: false,
};

export const dbConnect = async () => {
  if (conn.isConnected) return;

  const db = await connect(process.env.MONGODB_URL);

  conn.isConnected = db.connections[0].readyState;

  console.log(db.connection.db.databaseName);
};

connection.on("connected", () => {
  console.log("DB CONNECTED!");
});

connection.on("ERROR", (err) => {
  console.log(err);
});
