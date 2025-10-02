import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";   // 👈 ruta correcta


const JWT_SECRET = process.env.JWT_SECRET || "secreto"; 
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("El usuario ya existe");
      error.statusCode = 409;
      throw error;
    }

    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario dentro de transacción
    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );

    // Crear token (usa newUsers[0] porque create devuelve array cuando usas transacción)
    const token = jwt.sign(
      { userId: newUsers[0]._id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "El usuario se ha creado correctamente",
      data: {
        token,
        user: newUsers[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};


export const signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({email});

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        const error = new Error("Email o contraseña incorrectos");
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
      res.status(200).json({
        success: true,
        message: "El usuario se ha logueado correctamente",
        data: {
          token,
          user,
        },
      });
    } catch (error) {
        next(error);
    }
}

export const signOut = async (req, res, next) => {

}