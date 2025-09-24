/**
 * Controlador para manejar las operaciones relacionadas con los días
 */

import database from "../config/database.js";

/* 

model Staff {
  id           Int      @id @default(autoincrement())
  userId       Int      @unique @map("user_id")
  firstName    String   @db.VarChar(64) @map("first_name")
  lastName     String   @db.VarChar(64) @map("last_name")
  dni          Int      @unique
  recordNumber String?   @db.VarChar(64) @map("record_number")
  statusId     Int      @map("status_id")
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  // Relaciones
  user          User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  status        Status        @relation(fields: [statusId], references: [id])
  staffDetail   StaffDetail?
  courses       Course[]

  @@map("staff")
}

model StaffDetail {
  id            Int      @id @default(autoincrement())
  staffId       Int      @unique @map("staff_id")
  phone         String?  @db.VarChar(64)
  address       String?  @db.VarChar(128)
  email         String?  @db.VarChar(64)
  dob           DateTime?
  admissionDate DateTime? @map("admission_date")
  photoUrl      String?  @db.VarChar(255) @map("photo_url")
  description   String?  @db.VarChar(255)
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")

  // Relaciones
  staff Staff @relation(fields: [staffId], references: [id], onDelete: Cascade)

  @@map("staff_details")
}
*/

export const getAllStaff = async (req, res) => {
  try {
    const staff = await database.getClient().staff.findMany({
      include: {
        _count: {
          select: {
            id: true
          }
        },
        status: {
          omit: {
            createdAt: true,
            updatedAt: true,
            description:true
          }
        },
        staffDetail:{
          omit:{
            id:true,
            createdAt:true,
            updatedAt:true,
            staffId: true
          }
        },
        courses:{
          select:{
            _count: {
              select: {
                courseStudents: true
              }
            },
          },
        }
      },
      omit: {
        createdAt: true,
        updatedAt: true,
        statusId: true,
      }
      
    });

    if (!staff) {
      return res.status(404).json({
        message: "No se encontraron docentes"
      });
    }
    
    res.status(200).json({
      message: "Docentes obtenidos correctamente",
      data: staff
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener los docentes"
    });
    
  }
}