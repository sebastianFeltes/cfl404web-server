import database from "../config/database.js";

export const getRoles = async (req, res) => {
  try {
    const roles = await database.getClient().role.findMany();
    if (!roles || roles.length == 0) {
      return res.status(404).json({
        message: "No se encontraron los roles",
      });
    }
    res.status(200).json(roles);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener los roles",
    });
  }
};
