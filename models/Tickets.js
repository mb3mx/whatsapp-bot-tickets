import * as fs from 'fs'; // to read our data from the json file
import * as fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/user.js';