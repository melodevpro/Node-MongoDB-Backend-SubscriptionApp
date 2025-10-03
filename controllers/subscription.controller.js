import Subscription from "../models/subscription.model.js";

// Crear suscripción
export const createSubscription = async (req, res, next) => {
  try {
    // Guardar en base de datos
    const newSub = new Subscription(req.body);
    await newSub.save();

    // Si quieres llamar a un workflow externo
    if (typeof workflowClient !== "undefined") {
      await workflowClient.trigger({
        url: `${SERVER_URL}`,
        body: req.body, // 👈 le pasamos el body
        headers: { "Content-Type": "application/json" },
        workflowRunId: Date.now().toString(),
        retries: 3
      });
    }

    res.status(201).json(newSub);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear suscripción", error: error.message });
    next(error);
  }
};

// Obtener suscripciones de un usuario
export const getUserSubscriptions = async (req, res, next) => {
  try {
    // Solo el dueño puede ver sus suscripciones
    if (req.user.id !== req.params.id) {
      return res.status(401).json({
        success: false,
        error: "No tienes permiso para ver estas suscripciones"
      });
    }

    const subscriptions = await Subscription.find({ user: req.params.id });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};
