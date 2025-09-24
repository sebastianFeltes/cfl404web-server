import { includes } from "zod";
import database from "../config/database.js";
import { omit } from "zod/mini";
import { fa, id } from "zod/locales";
// GET
export const getAllUsers = async (req, res) => {
  try {
    const users = await database.getClient().user.findMany({
      include: {
        status: {
          select: {
            name: true,
          },
        },
        role: {
          select: {
            name: true,
          },
        },
        students:{
          select: {
            recordNumber: true,
            dni: true,
            firstName: true,
            lastName: true,
            statusId: true,
          }
        },
        staff :{
          select: {
            statusId: true,
          }
        }
      },
      omit:{
        password: true,
        createdAt: true,
        updatedAt: true
      },
      select:{
        _count:{
          select: {
            students: true
          }
        }
      },
    });
    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "No se encontraron los usuarios",
      });
    }
    res.status(200).json({
      message: "Usuarios encontrados correctamente",
      users,
      count: users.length,
      page: 1,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener los usuarios",
    });
  }
};

// POST
export const createUser = async (req, res) => {
  try {
    const {
      username,
      firstName,
      lastName,
      googleId,
      photoUrl,
      email,
      password,
      roleId,
      statusId,
      description,
    } = req.body;

    const users = await database.getClient().user.create({
      data: {
        username,
        firstName,
        lastName,
        googleId,
        photoUrl,
        email,
        password,
        roleId,
        statusId,
        description,
      },
    });

    res.status(200).json({
      message: "Usuario creado correctamente",
      users,
      count: users.length,
      page: 1,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al crear el usuario",
    });
  }
};

//

/*
  id        Int      @id @default(autoincrement())
  username  String   @unique @db.VarChar(32)
  firstName String   @db.VarChar(64) @map("first_name")
  lastName  String   @db.VarChar(64) @map("last_name")
  googleId  String?  @db.VarChar(64) @map("google_id")
  photoUrl  String?  @db.VarChar(255) @map("photo_url")
  email     String   @unique @db.VarChar(64)
  password  String   @db.VarChar(255)
  roleId    Int      @map("role_id")
  statusId  Int      @map("status_id")
  description String? @db.VarChar(255)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
*/
