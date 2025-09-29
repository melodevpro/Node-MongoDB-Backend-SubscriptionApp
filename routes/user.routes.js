
import { Router } from "express";

const userRouter = Router();

// Rutas de Usuarios
userRouter.get('/users', (req, res) => res.send({ title: 'Listado de usuarios GET' }));

userRouter.get('/users/:id', (req, res) => res.send({ title: 'Detalle de un usuario GET' }));

userRouter.post('/users', (req, res) => res.send ({ title: 'Crear un usuario CREATE' }));

userRouter.put('/users/:id', (req, res) => res.send({ title: 'Actualizar un usuario PUT' }));

userRouter.delete('/users/:id', (req, res) => res.send({ title: 'Eliminar un usuario DELETE' }));

export default userRouter;