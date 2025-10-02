import { Router } from "express";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js"; 
import { get } from "mongoose";

const subscriptionRouter = Router();

// Rutas de suscripciones
subscriptionRouter.get('/', (req, res) => {
  res.json({ title: 'Todas las suscripciones GET' });
});

subscriptionRouter.get('/:id', (req, res) => {
  res.json({ title: 'Detalle de una subscripcion GET' });
});

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => {
  res.json({ title: 'Actualizar una subscripcion PUT' });
});

subscriptionRouter.delete('/:id', (req, res) => {
  res.json({ title: 'Eliminar una subscripcion DELETE' });
});

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res) => {
  res.json({ title: 'Cancelar una subscripcion PUT' });
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
  res.json({ title: 'Próximas renovaciones GET' });
});

export default subscriptionRouter;
