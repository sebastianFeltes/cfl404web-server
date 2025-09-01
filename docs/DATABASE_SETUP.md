# Configuración de Base de Datos - CFL404 Web Server

## 📋 Descripción

Este documento describe la configuración y uso de la conexión a la base de datos usando Prisma en el proyecto CFL404 Web Server.

## 🗄️ Tecnologías Utilizadas

- **Prisma**: ORM para Node.js y TypeScript
- **PostgreSQL**: Base de datos relacional
- **Node.js**: Runtime de JavaScript

## 🚀 Configuración Inicial

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Configuración de la base de datos
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_base_datos"

# Configuración del entorno
NODE_ENV=development

# Configuración del servidor
PORT=3000

# Configuración de JWT
JWT_SECRET=tu_jwt_secret_super_seguro_aqui
JWT_EXPIRES_IN=24h

# Configuración de CORS
CORS_ORIGIN=http://localhost:3000

# Configuración de logs
LOG_LEVEL=info
```

### 2. Instalación de Dependencias

```bash
npm install
```

### 3. Generar el Cliente de Prisma

```bash
npm run db:generate
```

### 4. Ejecutar Migraciones

```bash
# Para desarrollo
npm run migrate:dev

# Para producción
npm run migrate:deploy
```

### 5. Poblar la Base de Datos (Opcional)

```bash
# Datos de ejemplo
npm run seed:example

# Datos personalizados
npm run seed
```

## 📁 Estructura de Archivos

```
src/
├── config/
│   ├── database.js              # Configuración principal de la base de datos
│   └── database.example.js      # Ejemplos de uso
├── middlewares/
│   └── database.middleware.js   # Middlewares para manejar la conexión
└── index.js                     # Archivo principal con inicialización
```

## 🔧 Uso de la Conexión

### 1. Inicialización Automática

La conexión se inicializa automáticamente al arrancar el servidor en `src/index.js`:

```javascript
import database from './config/database.js';

async function startServer() {
  try {
    // Inicializar la conexión a la base de datos
    await database.connect();
    
    // Verificar el estado
    const health = await database.healthCheck();
    console.log('Estado de la base de datos:', health.status);
    
    // Iniciar servidor...
  } catch (error) {
    console.error('Error al inicializar:', error);
    process.exit(1);
  }
}
```

### 2. Uso en Controladores

```javascript
import database from '../config/database.js';

export const getUserById = async (req, res) => {
  try {
    const prisma = database.getClient();
    
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        role: true,
        status: true
      }
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
};
```

### 3. Uso de Transacciones

```javascript
import database from '../config/database.js';

export const createUserWithRole = async (req, res) => {
  try {
    const result = await database.transaction(async (prisma) => {
      // Crear el rol si no existe
      const role = await prisma.role.upsert({
        where: { name: req.body.roleName },
        update: {},
        create: {
          name: req.body.roleName,
          description: `Rol: ${req.body.roleName}`
        }
      });

      // Crear el usuario
      const user = await prisma.user.create({
        data: {
          ...req.body,
          roleId: role.id
        },
        include: {
          role: true
        }
      });

      return { user, role };
    });

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error en transacción:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear usuario'
    });
  }
};
```

### 4. Uso de Middlewares

```javascript
import { databaseMiddleware, healthCheckMiddleware } from '../middlewares/database.middleware.js';

// Aplicar middleware a todas las rutas
app.use(databaseMiddleware);

// Ruta para verificar la salud de la base de datos
app.get('/health', healthCheckMiddleware);
```

## 🔍 Verificación de Estado

### 1. Verificar Conexión

```javascript
const health = await database.healthCheck();
console.log(health);
// Output: { status: 'connected', message: 'Conexión saludable' }
```

### 2. Endpoint de Salud

```bash
GET /health
```

Respuesta:
```json
{
  "success": true,
  "database": {
    "status": "connected",
    "message": "Conexión saludable"
  },
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600
}
```

## 🛠️ Comandos Útiles

```bash
# Generar cliente de Prisma
npm run db:generate

# Ejecutar migraciones en desarrollo
npm run migrate:dev

# Ejecutar migraciones en producción
npm run migrate:deploy

# Resetear base de datos
npm run migrate:reset

# Verificar estado de migraciones
npm run migrate:status

# Abrir Prisma Studio
npm run db:studio

# Poblar con datos de ejemplo
npm run seed:example
```

## 🔒 Manejo de Errores

### 1. Errores de Conexión

La aplicación maneja automáticamente:
- Errores de conexión inicial
- Pérdida de conexión durante la ejecución
- Cierre limpio al terminar la aplicación

### 2. Logs de Errores

Los errores se registran con:
- Timestamp
- Tipo de error
- Stack trace completo
- Contexto de la operación

### 3. Respuestas de Error

```javascript
// Error de conexión
{
  "success": false,
  "error": "Servicio de base de datos no disponible",
  "details": "No hay conexión activa",
  "timestamp": "2024-01-15T10:30:00.000Z"
}

// Error de transacción
{
  "success": false,
  "error": "Error en la transacción de base de datos",
  "message": "Detalles del error",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 📊 Monitoreo

### 1. Métricas Disponibles

- Estado de conexión
- Tiempo de respuesta
- Número de consultas
- Errores de base de datos

### 2. Logs

En modo desarrollo, Prisma registra:
- Consultas SQL
- Información de conexión
- Advertencias
- Errores

## 🔧 Configuración Avanzada

### 1. Pool de Conexiones

```javascript
const databaseConfig = {
  prisma: {
    log: ['query', 'info', 'warn', 'error'],
    errorFormat: 'pretty',
    // Configuración adicional de pool
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000
  }
};
```

### 2. Configuración de Logs

```javascript
const logConfig = {
  development: ['query', 'info', 'warn', 'error'],
  production: ['error'],
  test: ['error']
};
```

## 🚨 Troubleshooting

### 1. Error de Conexión

```bash
# Verificar que PostgreSQL esté ejecutándose
sudo systemctl status postgresql

# Verificar credenciales
psql -h localhost -U usuario -d nombre_base_datos
```

### 2. Error de Migración

```bash
# Resetear migraciones
npm run migrate:reset

# Regenerar cliente
npm run db:generate
```

### 3. Error de Permisos

```bash
# Verificar permisos de usuario
sudo -u postgres psql
GRANT ALL PRIVILEGES ON DATABASE nombre_base_datos TO usuario;
```

## 📚 Recursos Adicionales

- [Documentación de Prisma](https://www.prisma.io/docs)
- [Guía de PostgreSQL](https://www.postgresql.org/docs/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 🤝 Contribución

Para contribuir a la configuración de la base de datos:

1. Sigue las convenciones de código establecidas
2. Documenta los cambios realizados
3. Actualiza este archivo si es necesario
4. Prueba las migraciones antes de hacer commit




