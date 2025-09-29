import express from "express";
import { PORT } from "./config/env.js";

const app = express();

app.get("/", (req, res) => {
    res.send('Bienvenido a la API Tracker subscripcion');
})

app.listen(3000, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
})

export default app;