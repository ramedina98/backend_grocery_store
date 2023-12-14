//we import the database...
import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

//get the path to the current directory...
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

//load environment variables from the .env file...
dotenv.config({path: path.resolve(_dirname, '../.env')});

const db = new Sequelize (process.env.DB_TABLE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect:"mysql"
});

export default db;