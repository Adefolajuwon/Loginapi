import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';

import User from './model/User.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import loginRoute from './Routes/loginRoute.mjs';
import registerRoute from './Routes/registerRoute.mjs';
import connectDB from './model/connect.mjs';
import bodyParser from 'body-parser';
import dashboardRoute from './Routes/dashboardRoute.mjs';

const app = express();

app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', true);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/register', registerRoute);
app.use('/api/v1/login', loginRoute);
app.use('/api/v1/dashboard', dashboardRoute);

const startServer = async () => {
	try {
		//connectDB(process.env.mongoURI);
		app.listen(8000, () => console.log('Server started on port '));
	} catch (error) {
		console.log(error);
	}
};

startServer();
