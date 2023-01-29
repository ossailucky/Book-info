import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();


mongoose.connect(process.env.MONGODB);
mongoose.connection.once("open",()=>{
    console.log("connected to database");
});

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(4000, ()=>{
    console.log("now listening for requests on port 4000");
});