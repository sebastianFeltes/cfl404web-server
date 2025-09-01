import database from './database.js';

// Ejemplo de uso de la conexión a la base de datos

// 1. Inicializar la conexión al arrancar la aplicación
async function initializeDatabase() {
  try {
    const prisma = await database.connect();
    console.log('Base de datos inicializada correctamente');
    return prisma;
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error;
  }
}

// 2. Ejemplo de uso en un controlador
async function getUserById(userId) {
  try {
    const prisma = database.getClient();
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        role: true,
        status: true
      }
    });
    
    return user;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    throw error;
  }
}

// 3. Ejemplo de transacción
async function createUserWithRole(userData, roleName) {
  try {
    const result = await database.transaction(async (prisma) => {
      // Crear el rol si no existe
      const role = await prisma.role.upsert({
        where: { name: roleName },
        update: {},
        create: {
          name: roleName,
          description: `Rol: ${roleName}`
        }
      });

      // Crear el usuario
      const user = await prisma.user.create({
        data: {
          ...userData,
          roleId: role.id
        },
        include: {
          role: true
        }
      });

      return { user, role };
    });

    return result;
  } catch (error) {
    console.error('Error en la transacción:', error);
    throw error;
  }
}

// 4. Verificar el estado de la conexión
async function checkDatabaseHealth() {
  try {
    const health = await database.healthCheck();
    console.log('Estado de la base de datos:', health);
    return health;
  } catch (error) {
    console.error('Error al verificar la salud de la base de datos:', error);
    throw error;
  }
}

// 5. Ejemplo de uso en un middleware
async function databaseMiddleware(req, res, next) {
  try {
    // Verificar que la base de datos esté conectada
    const health = await database.healthCheck();
    
    if (health.status !== 'connected') {
      return res.status(503).json({
        error: 'Servicio de base de datos no disponible',
        details: health.message
      });
    }

    // Agregar el cliente de Prisma al objeto request
    req.prisma = database.getClient();
    next();
  } catch (error) {
    console.error('Error en el middleware de base de datos:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Problema con la conexión a la base de datos'
    });
  }
}

// 6. Ejemplo de cierre limpio
async function gracefulShutdown() {
  console.log('Cerrando aplicación...');
  await database.disconnect();
  console.log('Aplicación cerrada correctamente');
}

export {
  initializeDatabase,
  getUserById,
  createUserWithRole,
  checkDatabaseHealth,
  databaseMiddleware,
  gracefulShutdown
};




