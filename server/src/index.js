import express from 'express';
import dotenv from 'dotenv';
import scoreRoutes from './routes/scoreRoutes.js'
import { connectDB } from '../config/db.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config()

const app = express();
const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors())

// Serve static files
app.use(express.static(path.join(__dirname, '../../client/dist')));

app.use('/api/score',scoreRoutes);

// ✅ SPA fallback route — safe for Express v5
app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/api')) return next();
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

app.get('/',(req,res)=>{
    res.send("This is the website made with help of chatgpt");
})

connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
})

