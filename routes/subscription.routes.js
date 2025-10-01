import { Router } from "express";

const subscriptionRouter = Router();

// Rutas de suscripciones
subscriptionRouter.get('/', (req, res) => {
  res.json({ title: 'Todas las suscripciones GET' });
});

subscriptionRouter.get('/:id', (req, res) => {
  res.json({ title: 'Detalle de una subscripcion GET' });
});

subscriptionRouter.post('/', (req, res) => {
  res.json({ title: 'Crear una subscripcion CREATE' });
});

subscriptionRouter.put('/:id', (req, res) => {
  res.json({ title: 'Actualizar una subscripcion PUT' });
});

subscriptionRouter.delete('/:id', (req, res) => {
  res.json({ title: 'Eliminar una subscripcion DELETE' });
});

subscriptionRouter.get('/user/:id', (req, res) => {
  res.json({ title: 'Suscripciones de un usuario GET' });
});

subscriptionRouter.put('/:id/cancel', (req, res) => {
  res.json({ title: 'Cancelar una subscripcion PUT' });
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
  res.json({ title: 'Próximas renovaciones GET' });
});

export default subscriptionRouter;
