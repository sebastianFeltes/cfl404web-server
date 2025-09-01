import database from '../config/database.js';

/**
 * Middleware para manejar la conexión a la base de datos
 * Verifica que la base de datos esté conectada y agrega el cliente de Prisma al request
 */
export const databaseMiddleware = async (req, res, next) => {
  try {
    // Verificar que la base de datos esté conectada
    const health = await database.healthCheck();
    
    if (health.status !== 'connected') {
      return res.status(503).json({
        success: false,
        error: 'Servicio de base de datos no disponible',
        details: health.message,
        timestamp: new Date().toISOString()
      });
    }

    // Agregar el cliente de Prisma al objeto request
    req.prisma = database.getClient();
    
    // Agregar información de la base de datos al request
    req.databaseInfo = {
      status: health.status,
      timestamp: new Date().toISOString()
    };

    next();
  } catch (error) {
    console.error('❌ Error en el middleware de base de datos:', error);
    
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: 'Problema con la conexión a la base de datos',
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * Middleware para manejar transacciones de base de datos
 * @param {Function} callback - Función que contiene la lógica de la transacción
 */
export const transactionMiddleware = (callback) => {
  return async (req, res, next) => {
    try {
      const prisma = database.getClient();
      
      // Ejecutar la transacción
      const result = await prisma.$transaction(async (tx) => {
        // Agregar el cliente de transacción al request
        req.prisma = tx;
        return await callback(req, res, next);
      });

      // Restaurar el cliente normal de Prisma
      req.prisma = prisma;
      
      return result;
    } catch (error) {
      console.error('❌ Error en la transacción:', error);
      
      res.status(500).json({
        success: false,
        error: 'Error en la transacción de base de datos',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }
  };
};

/**
 * Middleware para verificar la salud de la base de datos
 */
export const healthCheckMiddleware = async (req, res) => {
  try {
    const health = await database.healthCheck();
    
    res.json({
      success: true,
      database: health,
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  } catch (error) {
    console.error('❌ Error al verificar la salud de la base de datos:', error);
    
    res.status(500).json({
      success: false,
      error: 'Error al verificar la salud de la base de datos',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
};

export default {
  databaseMiddleware,
  transactionMiddleware,
  healthCheckMiddleware
};




