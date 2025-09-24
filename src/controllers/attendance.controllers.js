import database from "../config/database.js";

export const getAllAttendances = async (req, res) => {
  try {
    const attendance = await database.getClient().attendance.findMany({
      include: {
        courseStudent: {
          include: {
            course: { select: { name: true } },
            student: { select: { firstName: true, lastName: true } },
          },
        },
      },
    });
    if (!attendance || attendance.length == 0) {
      return res.status(404).json({
        message: "No se encontro la asistencia",
      });
    }
    res
      .status(200)
      .json({ message: "Asistencia encontrada correctamente", attendance });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener las asistencia",
    });
  }
};
