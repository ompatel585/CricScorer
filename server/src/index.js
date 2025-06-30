import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import scoreRoutes from './routes/scoreRoutes.js'
import connectDB from './config/db.js';
import path from 'path'
dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 5001

const __dirname = path.resolve();
console.log(path.join(__dirname, '../client/dist'))

// middleware
if (process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: "http://localhost:5173",
        })
    );
  }
app.use(express.json())

app.use('/api/score',scoreRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    
    console.log("Adding catch-all route for production");
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
    });
  }


app.listen(port,()=>{
    console.log("Server is running on port ",port)
})