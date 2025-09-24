import database from "../config/database.js";

export const getStudentStats = async (req, res) => {
  try {
    const students = await database.getClient().student.count();

    if (!students || students.length === 0) {
      return res.status(404).json({
        message: "no se encontraron estudiantes",
      });
    }

    res.status(200).json({
      message: "estudiante mostrado correctamente",
      data:students,
    });
  } catch (error) {
    console.log(error);
    res.status().json({
      message: "error al obtener los estudiantes",
    });
  }
};

export const getCoursesStats = async (req, res) => {
  try {
    const courses = await database.getClient().course.findMany();

    if (!courses || courses.length === 0) {
      return res.status(404).json({
        message: "no se encontraron cursos",
      });
    }

    res.status(200).json({
      message: "cursos mostrados correctamente",
      data:courses,
      
    });
  } catch (error) {
    console.log(error);
    res.status().json({
      message: "error al obtener los cursos",
    });
  }
};

export const getStaffsStats = async (req, res) => {
  try {
    const staffs = await database.getClient().staff.findMany();

    if (!staffs || staffs.length === 0) {
      return res.status(404).json({
        message: "no se encontraron docentes",
      });
    }

    res.status(200).json({
      message: "docentes mostrados correctamente",
    data:staffs,
    
    });
  } catch (error) {
    console.log(error);
    res.status().json({
      message: "error al obtener los docentes",
    });
  }
};

export const getAttendancesStats = async (req, res) => {
  try {
    const attendances = await database.getClient().attendance.findMany();

    if (!attendances || attendances.length === 0) {
      return res.status(404).json({
        message: "no se encontraron asistencias",
      });
    }

    res.status(200).json({
      message: "asistencias mostrados correctamente",
      data:attendances,
      
    });
  } catch (error) {
    console.log(error);
    res.status().json({
      message: "error al obtener las asistencias",
    });
  }
};

// model Course {
//   id                  Int      @id @default(autoincrement())
//   name                String   @unique @db.VarChar(64)
//   staffId             Int      @map("staff_id")
//   startDate           DateTime? @map("start_date")
//   endDate             DateTime? @map("end_date")
//   innasistanceAllowed Int?      @map("innasistance_allowed")
//   lectiveYear         Int      @map("lective_year")
//   teachingHours       Int?      @map("teaching_hours")
//   totalDays           Int?      @map("total_days")
//   totalClasses        Int?      @map("total_classes")
//   statusId            Int      @map("status_id")
//   description         String?  @db.VarChar(255)
//   createdAt           DateTime @default(now()) @map("created_at")
//   updatedAt           DateTime @updatedAt @map("updated_at")
