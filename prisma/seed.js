import { PrismaClient } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seeds...');

  // Crear días de la semana
  console.log('📅 Creando días de la semana...');
  const days = [
    { name: 'Lunes' },
    { name: 'Martes' },
    { name: 'Miércoles' },
    { name: 'Jueves' },
    { name: 'Viernes' },
    { name: 'Sábado' },
    { name: 'Domingo' }
  ];

  for (const day of days) {
    await prisma.day.upsert({
      where: { name: day.name },
      update: {},
      create: day
    });
  }

  // Crear turnos
  console.log('⏰ Creando turnos...');
  const shifts = [
    { name: 'Mañana' },
    { name: 'Tarde' },
    { name: 'Vespertino' }
  ];

  for (const shift of shifts) {
    await prisma.shift.upsert({
      where: { name: shift.name },
      update: {},
      create: shift
    });
  }

  // Crear estados
  console.log('📊 Creando estados...');
  const statuses = [
    { name: 'Activo', description: 'Estado activo del registro' },
    { name: 'Inactivo', description: 'Estado inactivo del registro' },
    { name: 'Suspendido', description: 'Estado suspendido temporalmente' },
    { name: 'Baja', description: 'Estado de baja definitiva' },
    { name: 'Pendiente', description: 'Estado pendiente de aprobación' },
    { name: 'Cancelado', description: 'Estado cancelado' },
    { name: 'Completado', description: 'Estado completado' }
  ];

  for (const status of statuses) {
    await prisma.status.upsert({
      where: { name: status.name },
      update: {},
      create: status
    });
  }

  // Crear roles
  console.log('👥 Creando roles...');
  const roles = [
    { name: 'Invitado', description: 'Usuario invitado con acceso limitado' },
    { name: 'Docente', description: 'Profesor o instructor del curso' },
    { name: 'Aspirante', description: 'Persona interesada en inscribirse' },
    { name: 'Estudiante', description: 'Estudiante activo del curso' },
    { name: 'Directivo', description: 'Directivo de la institución' },
    { name: 'Administrativo', description: 'Personal administrativo' },
    { name: 'GodMode', description: 'Administrador con acceso total al sistema' }
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role
    });
  }

  // Crear códigos de asistencia
  console.log('✅ Creando códigos de asistencia...');
  const attendanceCodes = [
    { name: 'Presente', description: 'El estudiante asistió a la clase' },
    { name: 'Tarde', description: 'El estudiante llegó tarde a la clase' },
    { name: 'Media-Falta', description: 'El estudiante asistió parcialmente' },
    { name: 'Ausente', description: 'El estudiante no asistió a la clase' },
    { name: 'Justificado', description: 'Ausencia justificada con documentación' },
    { name: 'Feriado', description: 'No hay clases por feriado' }
  ];

  for (const code of attendanceCodes) {
    await prisma.attendanceCode.upsert({
      where: { name: code.name },
      update: {},
      create: code
    });
  }

  // Crear algunas aulas de ejemplo
  console.log('🏫 Creando aulas de ejemplo...');
  const classrooms = [
    { name: 'Aula 101', capacity: 30 },
    { name: 'Aula 102', capacity: 25 },
    { name: 'Laboratorio 1', capacity: 20 },
    { name: 'Aula Magna', capacity: 100 },
    { name: 'Sala de Conferencias', capacity: 50 }
  ];

  for (const classroom of classrooms) {
    await prisma.classroom.upsert({
      where: { name: classroom.name },
      update: {},
      create: classroom
    });
  }

  console.log('✅ Seeds completados exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error durante los seeds:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
