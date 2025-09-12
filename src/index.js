// =========================
// Importaciones de módulos
// =========================
import express from "express"; // Express: framework web para Node.js
import cors from "cors"; // CORS: permite peticiones entre diferentes dominios
import morgan from "morgan"; // Morgan: muestra en consola detalles de las peticiones HTTP
import dotenv from "dotenv"; // Dotenv: permite usar variables de entorno desde un archivo .env
import database from "./config/database.js"; // Conexión a la base de datos

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
app.use(cors()); // Habilita CORS para que otros dominios puedan acceder a la API
app.use(express.json()); // Permite recibir y enviar datos en formato JSON
app.use(morgan("dev")); // Muestra logs de peticiones HTTP en consola (modo 'dev')

// ====================
// Rutas de la API
// ====================
import RolesRouter from "./routes/roles.routes.js";
import AttendanceRouter from "./routes/attendance.routes.js";

app.use("/roles", RolesRouter)
app.use("/attendance", AttendanceRouter)
import CoursesRouter from "./routes/courses.routes.js";

app.use(`/courses`, CoursesRouter);

// Importar middlewares de base de datos
import { healthCheckMiddleware } from "./middlewares/database.middleware.js";
import UsersRouter from "./routes/users.routes.js";
import StaffRouter from "./routes/staff.routes.js";
// Ruta de salud de la base de datos
app.get("/health", healthCheckMiddleware);



app.use('/users', UsersRouter)

app.use('/staff', StaffRouter)

// Ruta principal
//app.use("/", (req, res) => {
//  res.json({
//   message: "CFL404 Web Server API",
//   version: "1.0.0",
//   status: "running",
//   timestamp: new Date().toISOString(),
//   endpoints: {
//     health: "/health",
//     users: "/api/users"
//    }
//  });
//});

// Rutas de la API
import ResumesRouter from "./routes/resumes.routes.js";
app.use("/resumes", ResumesRouter);
// ============================
// Manejo de errores genérico
// ============================
app.use((err, req, res, next) => {
  console.error(err.stack); // Muestra el error completo en consola
  res.status(500).send("Something broke!"); // Responde con error 500 si algo falla
});

// ==============================
// Inicializar el servidor
// ==============================
const PORT = process.env.PORT || 3000; // Usa el puerto de .env o el 3000 por defecto

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Función para inicializar la aplicación
async function startServer() {
  try {
    // Inicializar la conexión a la base de datos
    console.log("🔄 Inicializando conexión a la base de datos...");
    await database.connect();

    // Verificar el estado de la base de datos
    const health = await database.healthCheck();
    console.log("📊 Estado de la base de datos:", health.status);

    // Iniciar el servidor
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log(`📅 Fecha: ${new Date().toLocaleString("es-ES")}`);
    });
  } catch (error) {
    console.error("❌ Error al inicializar el servidor:", error);
    process.exit(1);
  }
}

// Iniciar el servidor
startServer();
