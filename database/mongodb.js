
import mongoose from "mongoose";    
import { DB_URI, NODE_ENV } from "../config/env.js";

if(!DB_URI) {
    throw new Error('La variable de entorno DB_URI no está definida .env.<development/>production>.local');
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Conectado a la base de datos en ${NODE_ENV}`);
    } catch (error) {
        console.log('Error al conectar a la base de datos: ', error);
        process.exit(1);
    }
} 

export default connectToDatabase;