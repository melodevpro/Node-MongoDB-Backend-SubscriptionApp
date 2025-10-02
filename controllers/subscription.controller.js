import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const newSub = new Subscription(req.body); // ✅ usa "Subscription", no "subscription"
    await newSub.save();
    res.status(201).json(newSub);
  } catch (error) {
    res.status(400).json({ message: "Error al crear suscripción", error: error.message });
    next(error);
  }
};


export const getUserSubscriptions = async (req, res, next) => {
  try {
    if(req.user.id !== req.params.id) {
      const error = new Error('No tienes permiso para ver estas suscripciones');
      error.statusCode = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};
