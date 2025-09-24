import database from "../config/database.js";

// StudentsResume
export const getStudentsResume = async (req, res) => {
  try {
    const students = await database.getClient().student.count();

    if (!students || students.length === 0) {
      return res.status(404).json({
        message: "No se encontraron estudiantes",
      });
    }

    res.status(200).json({
      message: "Estudiantes encontrados correctamente",
      data: students,
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
    const courses = await database.getClient().course.count();

    if (!courses || courses.length === 0) {
      return res.status(404).json({
        message: "No se encontraron cursos",
      });
    }

    res.status(200).json({
      message: "Cursos encontrados correctamente",
      data: courses,
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
    const staffs = await database.getClient().staff.count();

    if (!staffs || staffs.length === 0) {
      return res.status(404).json({
        message: "No se encontraron el staff",
      });
    }

    res.status(200).json({
      message: "Staff encontrados correctamente",
      data: staffs,
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
    const attendances = await database.getClient().attendance.count();

    if (!attendances || attendances.length === 0) {
      return res.status(404).json({
        message: "No se encontraron las asistencias",
      });
    }

    res.status(200).json({
      message: "Asistencias encontrados correctamente",
      data: attendances,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      massage: "Error al obtener las asistencias",
    });
  }
};
