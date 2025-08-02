import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import db = require('./config/db');
import authRoutes from './modules/auth/auth.routes';

dotenv.config();
db.connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (_, res) => res.send('Ride Booking API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
