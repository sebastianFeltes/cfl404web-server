import database from "../config/database.js";

// StudentsResume
export const getStudentsResume = async (req, res) => {
  try {
    const students = await database.getClient().student.findMany();

    if (!students || students.length === 0) {
      return res.status(404).json({
        message: "No se encontraron estudiantes",
      });
    }

    res.status(200).json({
      message: "Estudiantes encontrados correctamente",
      data: students,
      count: students.length,
      page: 1,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      massage: "Error al obtener los dias",
    });
  }
};

// CoursesResume
export const getCoursesResume = async (req, res) => {
  try {
    const courses = await database.getClient().course.findMany();

    if (!courses || courses.length === 0) {
      return res.status(404).json({
        message: "No se encontraron cursos",
      });
    }

    res.status(200).json({
      message: "Cursos encontrados correctamente",
      data: courses,
      count: courses.length,
      page: 1,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      massage: "Error al obtener los cursos",
    });
  }
};

// StaffsResume
export const getStaffsResume = async (req, res) => {
  try {
    const staffs = await database.getClient().staff.findMany();

    if (!staffs || staffs.length === 0) {
      return res.status(404).json({
        message: "No se encontraron el staff",
      });
    }

    res.status(200).json({
      message: "Staff encontrados correctamente",
      data: staffs,
      count: staffs.length,
      page: 1,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      massage: "Error al obtener los staff",
    });
  }
};

// AttendancesResume
export const getAttendancesResume = async (req, res) => {
  try {
    const attendances = await database.getClient().attendance.findMany();

    if (!attendances || attendances.length === 0) {
      return res.status(404).json({
        message: "No se encontraron las asistencias",
      });
    }

    res.status(200).json({
      message: "Asistencias encontrados correctamente",
      data: attendances,
      count: attendances.length,
      page: 1,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      massage: "Error al obtener las asistencias",
    });
  }
};
