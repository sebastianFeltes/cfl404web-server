import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Función para generar fechas aleatorias
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Función para generar DNI aleatorio
function randomDNI() {
  return Math.floor(Math.random() * 90000000) + 10000000;
}

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

  // Crear aulas
  console.log('🏫 Creando aulas...');
  const classrooms = [
    { name: 'Aula 101', capacity: 30 },
    { name: 'Aula 102', capacity: 25 },
    { name: 'Laboratorio 1', capacity: 20 },
    { name: 'Aula Magna', capacity: 100 },
    { name: 'Sala de Conferencias', capacity: 50 },
    { name: 'Aula 201', capacity: 35 },
    { name: 'Laboratorio 2', capacity: 15 },
    { name: 'Aula Virtual', capacity: 200 }
  ];

  for (const classroom of classrooms) {
    await prisma.classroom.upsert({
      where: { name: classroom.name },
      update: {},
      create: classroom
    });
  }

  // Obtener IDs de roles y estados para usar en usuarios
  const rolesData = await prisma.role.findMany();
  const statusesData = await prisma.status.findMany();
  const activeStatus = statusesData.find(s => s.name === 'Activo');
  const godModeRole = rolesData.find(r => r.name === 'GodMode');
  const docenteRole = rolesData.find(r => r.name === 'Docente');
  const estudianteRole = rolesData.find(r => r.name === 'Estudiante');
  const directivoRole = rolesData.find(r => r.name === 'Directivo');
  const adminRole = rolesData.find(r => r.name === 'Administrativo');

  // Crear usuarios
  console.log('👤 Creando usuarios...');
  const users = [
    {
      username: 'admin',
      firstName: 'Administrador',
      lastName: 'Sistema',
      email: 'admin@cfl404.edu.ar',
      password: '$2b$10$rQZ8K9vL2mN3oP4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV',
      roleId: godModeRole.id,
      statusId: activeStatus.id,
      description: 'Administrador principal del sistema'
    },
    {
      username: 'director',
      firstName: 'María',
      lastName: 'González',
      email: 'director@cfl404.edu.ar',
      password: '$2b$10$rQZ8K9vL2mN3oP4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV',
      roleId: directivoRole.id,
      statusId: activeStatus.id,
      description: 'Directora de la institución'
    },
    {
      username: 'profesor1',
      firstName: 'Carlos',
      lastName: 'Rodríguez',
      email: 'carlos.rodriguez@cfl404.edu.ar',
      password: '$2b$10$rQZ8K9vL2mN3oP4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV',
      roleId: docenteRole.id,
      statusId: activeStatus.id,
      description: 'Profesor de Programación'
    },
    {
      username: 'profesor2',
      firstName: 'Ana',
      lastName: 'Martínez',
      email: 'ana.martinez@cfl404.edu.ar',
      password: '$2b$10$rQZ8K9vL2mN3oP4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV',
      roleId: docenteRole.id,
      statusId: activeStatus.id,
      description: 'Profesora de Base de Datos'
    },
    {
      username: 'secretaria',
      firstName: 'Laura',
      lastName: 'Fernández',
      email: 'laura.fernandez@cfl404.edu.ar',
      password: '$2b$10$rQZ8K9vL2mN3oP4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV',
      roleId: adminRole.id,
      statusId: activeStatus.id,
      description: 'Secretaria administrativa'
    }
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user
    });
  }

  // Obtener usuarios creados para usar en staff y students
  const usersData = await prisma.user.findMany();
  const adminUser = usersData.find(u => u.username === 'admin');
  const directorUser = usersData.find(u => u.username === 'director');
  const profesor1User = usersData.find(u => u.username === 'profesor1');
  const profesor2User = usersData.find(u => u.username === 'profesor2');
  const secretariaUser = usersData.find(u => u.username === 'secretaria');

  // Crear staff
  console.log('👨‍🏫 Creando staff...');
  const staffMembers = [
    {
      userId: directorUser.id,
      firstName: 'María',
      lastName: 'González',
      dni: randomDNI(),
      recordNumber: 'STF001',
      statusId: activeStatus.id
    },
    {
      userId: profesor1User.id,
      firstName: 'Carlos',
      lastName: 'Rodríguez',
      dni: randomDNI(),
      recordNumber: 'STF002',
      statusId: activeStatus.id
    },
    {
      userId: profesor2User.id,
      firstName: 'Ana',
      lastName: 'Martínez',
      dni: randomDNI(),
      recordNumber: 'STF003',
      statusId: activeStatus.id
    },
    {
      userId: secretariaUser.id,
      firstName: 'Laura',
      lastName: 'Fernández',
      dni: randomDNI(),
      recordNumber: 'STF004',
      statusId: activeStatus.id
    }
  ];

  for (const staff of staffMembers) {
    await prisma.staff.upsert({
      where: { userId: staff.userId },
      update: {},
      create: staff
    });
  }

  // Crear detalles de staff
  console.log('📋 Creando detalles de staff...');
  const staffData = await prisma.staff.findMany();
  
  for (const staff of staffData) {
    await prisma.staffDetail.upsert({
      where: { staffId: staff.id },
      update: {},
      create: {
        staffId: staff.id,
        phone: `+54 11 ${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
        address: `Calle ${Math.floor(Math.random() * 9999) + 1} #${Math.floor(Math.random() * 999) + 1}, Buenos Aires`,
        email: staff.userId === directorUser.id ? 'director@cfl404.edu.ar' : 
               staff.userId === profesor1User.id ? 'carlos.rodriguez@cfl404.edu.ar' :
               staff.userId === profesor2User.id ? 'ana.martinez@cfl404.edu.ar' :
               'laura.fernandez@cfl404.edu.ar',
        dob: randomDate(new Date(1970, 0, 1), new Date(1990, 11, 31)),
        admissionDate: randomDate(new Date(2020, 0, 1), new Date(2023, 11, 31)),
        photoUrl: `https://example.com/photos/staff_${staff.id}.jpg`,
        description: `Detalles adicionales del staff ${staff.firstName} ${staff.lastName}`
      }
    });
  }

  // Crear estudiantes
  console.log('🎓 Creando estudiantes...');
  const students = [
    {
      firstName: 'Juan',
      lastName: 'Pérez',
      dni: randomDNI(),
      userId: adminUser.id, // Usar admin como placeholder
      statusId: activeStatus.id,
      recordNumber: 'EST001',
      photoUrl: 'https://example.com/photos/student_1.jpg'
    },
    {
      firstName: 'María',
      lastName: 'López',
      dni: randomDNI(),
      userId: adminUser.id,
      statusId: activeStatus.id,
      recordNumber: 'EST002',
      photoUrl: 'https://example.com/photos/student_2.jpg'
    },
    {
      firstName: 'Pedro',
      lastName: 'García',
      dni: randomDNI(),
      userId: adminUser.id,
      statusId: activeStatus.id,
      recordNumber: 'EST003',
      photoUrl: 'https://example.com/photos/student_3.jpg'
    },
    {
      firstName: 'Sofía',
      lastName: 'Hernández',
      dni: randomDNI(),
      userId: adminUser.id,
      statusId: activeStatus.id,
      recordNumber: 'EST004',
      photoUrl: 'https://example.com/photos/student_4.jpg'
    },
    {
      firstName: 'Diego',
      lastName: 'Martín',
      dni: randomDNI(),
      userId: adminUser.id,
      statusId: activeStatus.id,
      recordNumber: 'EST005',
      photoUrl: 'https://example.com/photos/student_5.jpg'
    }
  ];

  for (const student of students) {
    await prisma.student.upsert({
      where: { dni: student.dni },
      update: {},
      create: student
    });
  }

  // Crear detalles de estudiantes
  console.log('📝 Creando detalles de estudiantes...');
  const studentsData = await prisma.student.findMany();
  
  for (const student of studentsData) {
    await prisma.studentDetail.upsert({
      where: { studentId: student.id },
      update: {},
      create: {
        studentId: student.id,
        phone: `+54 11 ${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
        address: `Calle ${Math.floor(Math.random() * 9999) + 1} #${Math.floor(Math.random() * 999) + 1}, Buenos Aires`,
        email: `${student.firstName.toLowerCase()}.${student.lastName.toLowerCase()}@gmail.com`,
        dob: randomDate(new Date(1995, 0, 1), new Date(2005, 11, 31)),
        extraPhone: `+54 11 ${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
        extraEmail: `contacto.${student.firstName.toLowerCase()}@gmail.com`,
        dniCopy: Math.random() > 0.5,
        schoolFileCopy: Math.random() > 0.3,
        inscriptionForm: Math.random() > 0.2,
        description: `Detalles adicionales del estudiante ${student.firstName} ${student.lastName}`
      }
    });
  }

  // Crear cursos
  console.log('📚 Creando cursos...');
  const courses = [
    {
      name: 'Programación Web Full Stack',
      staffId: staffData.find(s => s.recordNumber === 'STF002').id,
      startDate: new Date(2024, 2, 1), // Marzo 2024
      endDate: new Date(2024, 11, 15), // Diciembre 2024
      innasistanceAllowed: 5,
      lectiveYear: 2024,
      teachingHours: 200,
      totalDays: 100,
      totalClasses: 50,
      statusId: activeStatus.id,
      description: 'Curso completo de desarrollo web con tecnologías modernas'
    },
    {
      name: 'Base de Datos Avanzadas',
      staffId: staffData.find(s => s.recordNumber === 'STF003').id,
      startDate: new Date(2024, 2, 15),
      endDate: new Date(2024, 11, 20),
      innasistanceAllowed: 3,
      lectiveYear: 2024,
      teachingHours: 150,
      totalDays: 75,
      totalClasses: 37,
      statusId: activeStatus.id,
      description: 'Curso avanzado de diseño y administración de bases de datos'
    },
    {
      name: 'Desarrollo de Aplicaciones Móviles',
      staffId: staffData.find(s => s.recordNumber === 'STF002').id,
      startDate: new Date(2024, 3, 1),
      endDate: new Date(2024, 11, 30),
      innasistanceAllowed: 4,
      lectiveYear: 2024,
      teachingHours: 180,
      totalDays: 90,
      totalClasses: 45,
      statusId: activeStatus.id,
      description: 'Desarrollo de aplicaciones móviles nativas e híbridas'
    }
  ];

  for (const course of courses) {
    await prisma.course.upsert({
      where: { name: course.name },
      update: {},
      create: course
    });
  }

  // Obtener datos para crear relaciones
  const coursesData = await prisma.course.findMany();
  const daysData = await prisma.day.findMany();
  const shiftsData = await prisma.shift.findMany();
  const classroomsData = await prisma.classroom.findMany();

  // Crear días de curso (CourseDay)
  console.log('📅 Creando días de curso...');
  for (const course of coursesData) {
    // Cada curso tiene 2-3 días por semana
    const courseDays = daysData.slice(0, Math.floor(Math.random() * 3) + 2);
    
    for (const day of courseDays) {
      const randomClassroom = classroomsData[Math.floor(Math.random() * classroomsData.length)];
      const randomShift = shiftsData[Math.floor(Math.random() * shiftsData.length)];
      
      // Crear horarios aleatorios
      const startHour = Math.floor(Math.random() * 4) + 8; // Entre 8 y 11
      const startTime = new Date(2024, 0, 1, startHour, 0, 0);
      const endTime = new Date(2024, 0, 1, startHour + 2, 0, 0);
      
      await prisma.courseDay.upsert({
        where: { 
          courseId_dayId: {
            courseId: course.id,
            dayId: day.id
          }
        },
        update: {},
        create: {
          courseId: course.id,
          dayId: day.id,
          classroomId: randomClassroom.id,
          shiftId: randomShift.id,
          startTime: startTime,
          endTime: endTime
        }
      });
    }
  }

  // Crear inscripciones de estudiantes en cursos
  console.log('📝 Creando inscripciones...');
  for (const student of studentsData) {
    // Cada estudiante se inscribe en 1-2 cursos
    const numCourses = Math.floor(Math.random() * 2) + 1;
    const selectedCourses = coursesData.slice(0, numCourses);
    
    for (const course of selectedCourses) {
      await prisma.inscription.upsert({
        where: {
          userId_courseId: {
            userId: student.userId,
            courseId: course.id
          }
        },
        update: {},
        create: {
          userId: student.userId,
          courseId: course.id
        }
      });
    }
  }

  // Crear relaciones curso-estudiante
  console.log('🎓 Creando relaciones curso-estudiante...');
  const inscriptionsData = await prisma.inscription.findMany();
  
  for (const inscription of inscriptionsData) {
    const student = studentsData.find(s => s.userId === inscription.userId);
    if (student) {
      await prisma.courseStudent.upsert({
        where: {
          courseId_studentId: {
            courseId: inscription.courseId,
            studentId: student.id
          }
        },
        update: {},
        create: {
          courseId: inscription.courseId,
          studentId: student.id,
          statusId: activeStatus.id
        }
      });
    }
  }

  // Crear asistencias
  console.log('✅ Creando asistencias...');
  const courseStudentsData = await prisma.courseStudent.findMany();
  const attendanceCodesData = await prisma.attendanceCode.findMany();
  
  for (const courseStudent of courseStudentsData) {
    // Crear 10-20 asistencias por estudiante
    const numAttendances = Math.floor(Math.random() * 11) + 10;
    
    for (let i = 0; i < numAttendances; i++) {
      const randomCode = attendanceCodesData[Math.floor(Math.random() * attendanceCodesData.length)];
      const randomDateValue = randomDate(new Date(2024, 2, 1), new Date(2024, 11, 31));
      const randomHour = new Date(randomDateValue.getTime() + Math.random() * 8 * 60 * 60 * 1000); // 8 horas de variación
      
      await prisma.attendance.create({
        data: {
          courseStudentId: courseStudent.id,
          codeId: randomCode.id,
          hour: randomHour,
          date: randomDateValue
        }
      });
    }
  }

  // Crear sesiones de usuario
  console.log('🔐 Creando sesiones...');
  for (const user of usersData) {
    const sessionToken = `session_${user.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 días
    
    await prisma.session.create({
      data: {
        userId: user.id,
        ip: `192.168.1.${Math.floor(Math.random() * 255) + 1}`,
        sessionToken: sessionToken,
        expiresAt: expiresAt
      }
    });
  }

  // Crear logs
  console.log('📊 Creando logs...');
  const tableNames = ['users', 'students', 'courses', 'staff', 'attendances'];
  const actions = ['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT'];
  
  for (let i = 0; i < 50; i++) {
    const randomUser = usersData[Math.floor(Math.random() * usersData.length)];
    const randomTable = tableNames[Math.floor(Math.random() * tableNames.length)];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    const randomRecordId = Math.floor(Math.random() * 100) + 1;
    
    await prisma.log.create({
      data: {
        userId: randomUser.id,
        tableName: randomTable,
        action: randomAction,
        recordId: randomRecordId
      }
    });
  }

  console.log('✅ Seeds completados exitosamente!');
  console.log(`📊 Resumen:`);
  console.log(`   - ${days.length} días creados`);
  console.log(`   - ${shifts.length} turnos creados`);
  console.log(`   - ${statuses.length} estados creados`);
  console.log(`   - ${roles.length} roles creados`);
  console.log(`   - ${attendanceCodes.length} códigos de asistencia creados`);
  console.log(`   - ${classrooms.length} aulas creadas`);
  console.log(`   - ${users.length} usuarios creados`);
  console.log(`   - ${staffMembers.length} miembros de staff creados`);
  console.log(`   - ${students.length} estudiantes creados`);
  console.log(`   - ${courses.length} cursos creados`);
  console.log(`   - Múltiples días de curso, inscripciones, asistencias, sesiones y logs creados`);
}

main()
  .catch((e) => {
    console.error('❌ Error durante los seeds:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
