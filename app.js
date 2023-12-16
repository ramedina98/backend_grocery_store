import express from 'express';
import cors from 'cors';
//we imported the BD conexion...
import db from './database/db.js';
//we imported our router
import uRoutes from './routes/route.js';
import dotenv from 'dotenv';

if(process.env.NODE_ENV !== 'production'){
    dotenv.config();
}

const app = express();
app.use(cors());
app.use(express.json());
app.use('/abarrotes_unedl', uRoutes);

try {
    await db.authenticate()
    console.log('conexion exitosa BD')
} catch (error) {
    console.log(`El error de conexion es: ${error}`)
}

app.get('/', (req, res) => {
    res.send('Hello world')
})
app.listen(3000, () => {
    console.log('Server up running in http://localhost:3000/')
});
