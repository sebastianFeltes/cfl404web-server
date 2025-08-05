// =========================
// Importaciones de módulos
// =========================
import express from "express";       // Express: framework web para Node.js
import cors from "cors";             // CORS: permite peticiones entre diferentes dominios
import morgan from "morgan";         // Morgan: muestra en consola detalles de las peticiones HTTP
import dotenv from "dotenv";         // Dotenv: permite usar variables de entorno desde un archivo .env

// =====================
// Configuración general
// =====================
dotenv.config(); // Carga las variables de entorno definidas en .env

// ==================
// Instanciar express
// ==================
const app = express(); // Creamos la aplicación de Express

// ======================
// Middlewares del server
// ======================
app.use(cors());              // Habilita CORS para que otros dominios puedan acceder a la API
app.use(express.json());      // Permite recibir y enviar datos en formato JSON
app.use(morgan("dev"));       // Muestra logs de peticiones HTTP en consola (modo 'dev')

// ====================
// Rutas de la API
// ====================
app.get("/", (req, res) => {
  res.send("Hello World!");   // Ruta de prueba que responde con un mensaje
});

// ============================
// Manejo de errores genérico
// ============================
app.use((err, req, res, next) => {
  console.error(err.stack);               // Muestra el error completo en consola
  res.status(500).send("Something broke!"); // Responde con error 500 si algo falla
});

// ==============================
// Inicializar el servidor
// ==============================
const PORT = process.env.PORT || 3000; // Usa el puerto de .env o el 3000 por defecto

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});