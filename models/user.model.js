
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'El nombre es requerido'],
        trim: true,
        minLength: 2,
        maxLength: 50,
     },
     email: {
        type: String,
        required: [true, 'El email es requerido'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingrese un email válido']
     },
     password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
        trim: true,
        minLength: 6,
     }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;