# 🌱 Seeds de Base de Datos

Este directorio contiene los archivos de seeds para poblar la base de datos con datos iniciales.

## 📁 Archivos

- `seed.js` - Seeds básicos (días, turnos, estados, roles, códigos de asistencia, aulas)
- `seed-example-data.js` - Datos de ejemplo avanzados (usuarios, estudiantes, cursos, etc.)

## 🚀 Cómo usar

### 1. Seeds Básicos (Obligatorio)

Ejecuta primero los seeds básicos para crear las tablas de configuración:

```bash
npm run seed
```

Esto creará:
- ✅ **Días de la semana** (Lunes a Domingo)
- ✅ **Turnos** (Mañana, Tarde, Vespertino)
- ✅ **Estados** (Activo, Inactivo, Suspendido, Baja, Pendiente, Cancelado, Completado)
- ✅ **Roles** (Invitado, Docente, Aspirante, Estudiante, Directivo, Administrativo, GodMode)
- ✅ **Códigos de asistencia** (Presente, Tarde, Media-Falta, Ausente, Justificado, Feriado)
- ✅ **Aulas de ejemplo** (Aula 101, 102, Laboratorio 1, Aula Magna, Sala de Conferencias)

### 2. Seeds de Datos de Ejemplo (Opcional)

Después de ejecutar los seeds básicos, puedes agregar datos de ejemplo:

```bash
npm run seed:example
```

Esto creará:
- 👨‍💼 **Usuario administrador** (admin@cfl404.com / admin123)
- 👨‍🏫 **Usuario docente** (docente@cfl404.com / docente123)
- 👨‍🎓 **3 estudiantes de ejemplo** ([email] / estudiante123)
- 📚 **Curso de ejemplo** (Programación Web Full Stack)
- ⏰ **Horarios del curso** (Lunes y Miércoles de 9:00 a 12:00)

## 🔑 Credenciales de Acceso

### Usuario Administrador
- **Email:** admin@cfl404.com
- **Password:** admin123
- **Rol:** GodMode (acceso total)

### Usuario Docente
- **Email:** docente@cfl404.com
- **Password:** docente123
- **Rol:** Docente

### Estudiantes de Ejemplo
- **Email:** maria.gonzalez@email.com, carlos.lopez@email.com, ana.martinez@email.com
- **Password:** estudiante123
- **Rol:** Estudiante

## ⚠️ Notas Importantes

1. **Orden de ejecución:** Siempre ejecuta `npm run seed` antes que `npm run seed:example`
2. **Base de datos:** Asegúrate de que la base de datos esté configurada y las migraciones aplicadas
3. **Variables de entorno:** Verifica que `DATABASE_URL` esté configurada en tu `.env`
4. **Uso de upsert:** Los seeds usan `upsert` para evitar duplicados, puedes ejecutarlos múltiples veces

## 🔧 Comandos Útiles

```bash
# Generar cliente de Prisma
npx prisma generate

# Aplicar migraciones
npx prisma db push

# Ver datos en Prisma Studio
npx prisma studio

# Resetear base de datos (¡CUIDADO!)
npx prisma db push --force-reset
```

## 📊 Datos Creados

### Estados del Sistema
- **Activo:** Registro activo y funcional
- **Inactivo:** Registro inactivo temporalmente
- **Suspendido:** Registro suspendido temporalmente
- **Baja:** Registro dado de baja definitiva
- **Pendiente:** Registro pendiente de aprobación
- **Cancelado:** Registro cancelado
- **Completado:** Registro completado exitosamente

### Roles de Usuario
- **Invitado:** Acceso limitado al sistema
- **Docente:** Profesor o instructor
- **Aspirante:** Persona interesada en inscribirse
- **Estudiante:** Estudiante activo
- **Directivo:** Directivo de la institución
- **Administrativo:** Personal administrativo
- **GodMode:** Administrador con acceso total

### Códigos de Asistencia
- **Presente:** El estudiante asistió a la clase
- **Tarde:** El estudiante llegó tarde
- **Media-Falta:** El estudiante asistió parcialmente
- **Ausente:** El estudiante no asistió
- **Justificado:** Ausencia justificada con documentación
- **Feriado:** No hay clases por feriado
