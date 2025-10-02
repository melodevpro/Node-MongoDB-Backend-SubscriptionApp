
import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize  from "../middlewares/auth.middleware.js";

const userRouter = Router();

// Rutas de Usuarios
userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.post('/', (req, res) => res.send ({ title: 'Crear un usuario CREATE' }));

userRouter.put('/:id', (req, res) => res.send({ title: 'Actualizar un usuario PUT' }));

userRouter.delete('/:id', (req, res) => res.send({ title: 'Eliminar un usuario DELETE' }));

export default userRouter;