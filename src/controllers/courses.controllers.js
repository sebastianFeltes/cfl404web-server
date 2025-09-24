import database from "../config/database.js";

/* HAGO UN GET */
export const getCourses = async (req, res) => {
  try {
    const courses = await database.getClient().course.findMany({
      include:{
        staff:{
          select: {
            firstName: true,
            lastName: true,
          }
        },
        status:{
          select:{
            name:true,
          }
        },
        courseDays:{
          include:{
            classroom:{
              omit:{
                createdAt: true,
                updatedAt: true
              }
            },
            shift:{
              select:{
                name: true
              }
            },
            day:{
              select:{
                name:true
              }
            },
            course:{
              select:{
                name:true
              }
            }
          }
        },
        courseStudents:{
          include:{
            course:{
              omit:{
                createdAt:true,
                updatedAt:true
              }
            },
            student:{
              omit:{
                createdAt:true,
                updatedAt:true
              }
            },
            status:{
              select:{
                name:true,
                description:true
              }
            },
            attendances:{
              select:{
                hour:true,
                date:true
              }
            }
          }

          },
        inscriptions:{
          include:{
            user:{
              
            }
          }
        }  
        }
      }
    )

    if (!courses || courses.length == 0) {
      return res.status(404).json({
        message: "No se encontraron cursos",
      });
    }
    res.status(200).json({
      message: "Cursos encontrados correctamente",
      courses,
      count: courses.length,
      page: 1,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener los cursos",
    });
  }
};

/*
model Course {
  id                  Int      @id @default(autoincrement())
  name                String   @unique @db.VarChar(64)
  staffId             Int      @map("staff_id")
  startDate           DateTime? @map("start_date")
  endDate             DateTime? @map("end_date")
  innasistanceAllowed Int?      @map("innasistance_allowed")
  lectiveYear         Int      @map("lective_year")
  teachingHours       Int?      @map("teaching_hours")
  totalDays           Int?      @map("total_days")
  totalClasses        Int?      @map("total_classes")
  statusId            Int      @map("status_id")
  description         String?  @db.VarChar(255)
  createdAt           DateTime @default(now()) @map("created_at")
  updatedAt           DateTime @updatedAt @map("updated_at")
*/

/* HAGO UN POST */
export const createCourse = async (req, res) => {
  try {
    const {
      name,
      staffId,
      startDate,
      endDate,
      innasistanceAllowed,
      lectiveYear,
      teachingHours,
      totalDays,
      totalClasses,
      statusId,
      description,
    } = req.body;

    const course = await database.getClient().course.create({
      data: {
        name,
        staffId,
        startDate,
        endDate,
        innasistanceAllowed,
        lectiveYear,
        teachingHours,
        totalDays,
        totalClasses,
        statusId,
        description,
      },
    });

    res.status(200).json({
      message: "Curso creado correctamente",
      course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener los cursos",
    });
  }
};
