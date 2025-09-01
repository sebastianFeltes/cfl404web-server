import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Configuración de la base de datos
const databaseConfig = {
  // Configuración de conexión
  connection: {
    url: process.env.DATABASE_URL,
  },
  
  // Configuración de Prisma Client
  prisma: {
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    errorFormat: 'pretty',
  }
};

// Clase singleton para manejar la conexión a la base de datos
class Database {
  constructor() {
    if (!Database.instance) {
      this.prisma = null;
      this.isConnected = false;
      Database.instance = this;
    }
    return Database.instance;
  }

  // Inicializar la conexión
  async connect() {
    try {
      if (!this.prisma) {
        this.prisma = new PrismaClient(databaseConfig.prisma);
      }

      if (!this.isConnected) {
        await this.prisma.$connect();
        this.isConnected = true;
        console.log('✅ Conexión a la base de datos establecida correctamente');
      }

      return this.prisma;
    } catch (error) {
      console.error('❌ Error al conectar con la base de datos:', error);
      throw error;
    }
  }

  // Obtener la instancia de Prisma Client
  getClient() {
    if (!this.prisma) {
      throw new Error('La base de datos no ha sido inicializada. Llama a connect() primero.');
    }
    return this.prisma;
  }

  // Cerrar la conexión
  async disconnect() {
    try {
      if (this.prisma && this.isConnected) {
        await this.prisma.$disconnect();
        this.isConnected = false;
        console.log('🔌 Conexión a la base de datos cerrada');
      }
    } catch (error) {
      console.error('❌ Error al cerrar la conexión a la base de datos:', error);
      throw error;
    }
  }

  // Verificar el estado de la conexión
  async healthCheck() {
    try {
      if (!this.prisma || !this.isConnected) {
        return { status: 'disconnected', message: 'No hay conexión activa' };
      }

      // Ejecutar una consulta simple para verificar la conexión
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'connected', message: 'Conexión saludable' };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  // Ejecutar transacciones
  async transaction(callback) {
    if (!this.prisma) {
      throw new Error('La base de datos no ha sido inicializada');
    }

    return await this.prisma.$transaction(callback);
  }
}

// Crear una instancia única
const database = new Database();

// Manejar señales de terminación para cerrar la conexión correctamente
process.on('SIGINT', async () => {
  console.log('\n🛑 Recibida señal SIGINT, cerrando conexión a la base de datos...');
  await database.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Recibida señal SIGTERM, cerrando conexión a la base de datos...');
  await database.disconnect();
  process.exit(0);
});

// Manejar errores no capturados
process.on('uncaughtException', async (error) => {
  console.error('❌ Error no capturado:', error);
  await database.disconnect();
  process.exit(1);
});

process.on('unhandledRejection', async (reason, promise) => {
  console.error('❌ Promesa rechazada no manejada:', reason);
  await database.disconnect();
  process.exit(1);
});

export default database;
export { databaseConfig };




