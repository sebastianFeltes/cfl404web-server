import { PrismaClient } from '../src/generated/prisma/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seeds de datos de ejemplo...');

  // Obtener IDs de referencia
  const godModeRole = await prisma.role.findUnique({ where: { name: 'GodMode' } });
  const adminRole = await prisma.role.findUnique({ where: { name: 'Administrativo' } });
  const docenteRole = await prisma.role.findUnique({ where: { name: 'Docente' } });
  const estudianteRole = await prisma.role.findUnique({ where: { name: 'Estudiante' } });
  const activoStatus = await prisma.status.findUnique({ where: { name: 'Activo' } });

  if (!godModeRole || !adminRole || !docenteRole || !estudianteRole || !activoStatus) {
    console.error('❌ Error: No se encontraron los roles o estados necesarios. Ejecuta primero el seed básico.');
    return;
  }

  // Crear usuario administrador
  console.log('👨‍💼 Creando usuario administrador...');
  const adminPassword = await bcrypt.hash('admin123', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@cfl404.com' },
    update: {},
    create: {
      username: 'admin',
      firstName: 'Administrador',
      lastName: 'Sistema',
      email: 'admin@cfl404.com',
      password: adminPassword,
      roleId: godModeRole.id,
      statusId: activoStatus.id,
      description: 'Administrador principal del sistema'
    }
  });

  // Crear usuario docente de ejemplo
  console.log('👨‍🏫 Creando usuario docente...');
  const docentePassword = await bcrypt.hash('docente123', 10);
  
  const docenteUser = await prisma.user.upsert({
    where: { email: 'docente@cfl404.com' },
    update: {},
    create: {
      username: 'docente1',
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'docente@cfl404.com',
      password: docentePassword,
      roleId: docenteRole.id,
      statusId: activoStatus.id,
      description: 'Docente de programación'
    }
  });

  // Crear staff docente
  console.log('👨‍🏫 Creando staff docente...');
  const staffDocente = await prisma.staff.upsert({
    where: { userId: docenteUser.id },
    update: {},
    create: {
      userId: docenteUser.id,
      firstName: 'Juan',
      lastName: 'Pérez',
      dni: 12345678,
      recordNumber: 'DOC001',
      statusId: activoStatus.id
    }
  });

  // Crear detalles del staff
  await prisma.staffDetail.upsert({
    where: { staffId: staffDocente.id },
    update: {},
    create: {
      staffId: staffDocente.id,
      phone: '011-1234-5678',
      address: 'Av. Corrientes 1234, CABA',
      email: 'juan.perez@cfl404.com',
      dob: new Date('1985-03-15'),
      admissionDate: new Date('2020-01-15'),
      description: 'Docente especializado en programación web'
    }
  });

  // Crear algunos estudiantes de ejemplo
  console.log('👨‍🎓 Creando estudiantes de ejemplo...');
  const estudiantes = [
    {
      username: 'estudiante1',
      firstName: 'María',
      lastName: 'González',
      email: 'maria.gonzalez@email.com',
      dni: 23456789,
      recordNumber: 'EST001'
    },
    {
      username: 'estudiante2',
      firstName: 'Carlos',
      lastName: 'López',
      email: 'carlos.lopez@email.com',
      dni: 34567890,
      recordNumber: 'EST002'
    },
    {
      username: 'estudiante3',
      firstName: 'Ana',
      lastName: 'Martínez',
      email: 'ana.martinez@email.com',
      dni: 45678901,
      recordNumber: 'EST003'
    }
  ];

  for (const estudiante of estudiantes) {
    const password = await bcrypt.hash('estudiante123', 10);
    
    const user = await prisma.user.upsert({
      where: { email: estudiante.email },
      update: {},
      create: {
        username: estudiante.username,
        firstName: estudiante.firstName,
        lastName: estudiante.lastName,
        email: estudiante.email,
        password: password,
        roleId: estudianteRole.id,
        statusId: activoStatus.id,
        description: 'Estudiante activo'
      }
    });

    const student = await prisma.student.upsert({
      where: { dni: estudiante.dni },
      update: {},
      create: {
        firstName: estudiante.firstName,
        lastName: estudiante.lastName,
        dni: estudiante.dni,
        userId: user.id,
        statusId: activoStatus.id,
        recordNumber: estudiante.recordNumber
      }
    });

    // Crear detalles del estudiante
    await prisma.studentDetail.upsert({
      where: { studentId: student.id },
      update: {},
      create: {
        studentId: student.id,
        phone: '011-9876-5432',
        address: 'Calle Falsa 123, CABA',
        email: estudiante.email,
        dob: new Date('2000-06-20'),
        dniCopy: true,
        schoolFileCopy: true,
        inscriptionForm: true
      }
    });
  }

  // Crear un curso de ejemplo
  console.log('📚 Creando curso de ejemplo...');
  const curso = await prisma.course.upsert({
    where: { name: 'Programación Web Full Stack' },
    update: {},
    create: {
      name: 'Programación Web Full Stack',
      staffId: staffDocente.id,
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-12-15'),
      innasistanceAllowed: 3,
      lectiveYear: 2024,
      teachingHours: 120,
      totalDays: 40,
      totalClasses: 80,
      statusId: activoStatus.id,
      description: 'Curso completo de programación web con tecnologías modernas'
    }
  });

  // Obtener días y turnos para crear horarios
  const lunes = await prisma.day.findUnique({ where: { name: 'Lunes' } });
  const miercoles = await prisma.day.findUnique({ where: { name: 'Miércoles' } });
  const turnoManana = await prisma.shift.findUnique({ where: { name: 'Mañana' } });
  const aula101 = await prisma.classroom.findUnique({ where: { name: 'Aula 101' } });

  if (lunes && miercoles && turnoManana && aula101) {
    // Crear horarios del curso
    console.log('⏰ Creando horarios del curso...');
    
    await prisma.courseDay.upsert({
      where: {
        courseId_dayId: {
          courseId: curso.id,
          dayId: lunes.id
        }
      },
      update: {},
      create: {
        courseId: curso.id,
        dayId: lunes.id,
        classroomId: aula101.id,
        shiftId: turnoManana.id,
        startTime: new Date('2024-01-01T09:00:00'),
        endTime: new Date('2024-01-01T12:00:00')
      }
    });

    await prisma.courseDay.upsert({
      where: {
        courseId_dayId: {
          courseId: curso.id,
          dayId: miercoles.id
        }
      },
      update: {},
      create: {
        courseId: curso.id,
        dayId: miercoles.id,
        classroomId: aula101.id,
        shiftId: turnoManana.id,
        startTime: new Date('2024-01-01T09:00:00'),
        endTime: new Date('2024-01-01T12:00:00')
      }
    });
  }

  console.log('✅ Seeds de datos de ejemplo completados exitosamente!');
  console.log('📧 Credenciales de acceso:');
  console.log('   Admin: admin@cfl404.com / admin123');
  console.log('   Docente: docente@cfl404.com / docente123');
  console.log('   Estudiantes: [email] / estudiante123');
}

main()
  .catch((e) => {
    console.error('❌ Error durante los seeds de ejemplo:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
