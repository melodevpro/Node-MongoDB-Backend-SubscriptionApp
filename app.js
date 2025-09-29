import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send('Bienvenido a la API Tracker subscripcion');
})

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto http://localhost:3000");
})