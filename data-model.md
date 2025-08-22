### Modelo de datos

> User
    - id: int, PK
    - username: varchar(32)
    - first_name: varchar(64)
    - last_name: varchar(64)
    - google_id: varchar(64)
    - photo_url: varchar(255)
    - email: varchar(64)
    - password: varchar(255)
    - role_id: int, FK (Role.id)
    - status_id: int, FK (Status.id)
    - description: string(255)
    - created_at: datetime
    - updated_at: datetime

> Role
    - id: int, PK
    - name: varchar(64)
    - description: varchar(255)
    - created_at: datetime
    - updated_at: datetime

> Session
    - id: int, PK
    - user_id: int, FK (User.id)
    - ip: varchar(64)
    - session_token: varchar(255)
    - expires_at: datetime
    - created_at: datetime
    - updated_at: datetime

> Inscription
    - id: int, PK
    - user_id: int, FK (User.id)
    - course_id: int, FK (Course.id)
    - created_at: datetime
    - updated_at: datetime

> Student
    - id: int, PK
    - first_name: varchar(64)
    - last_name: varchar(64)
    - dni: int
    - user_id: int, FK (User.id)
    - status_id: int, FK (Status.id)
    - record_number: varchar(64)
    - photo_url: varchar(255)
    - created_at: datetime
    - updated_at: datetime

> Student_detail
    - id: int, PK
    - student_id: int, FK (Student.id)
    - phone: varchar(64)
    - address: varchar(128)
    - email: varchar(64)
    - dob: datetime
    - extra_phone: varchar(64)
    - extra_email: varchar(64)
    - dni_copy: boolean
    - school_file_copy: boolean
    - inscription_form: boolean
    - description: varchar(255)
    - created_at: datetime
    - updated_at: datetime

> Course
    - id: int, PK
    - name: varchar(64)
    - staff_id: int, FK (Staff.id)
    - start_date: date
    - end_date: date
    - innasistance_allowed: int
    - lective_year: int
    - teaching_hours: int
    - total_days: int
    - total_classes: int
    - status_id: int, FK (Status.id)
    - description: varchar(255)
    - created_at: datetime
    - updated_at: datetime

> Course_day
    - id: int, PK
    - course_id: int, FK (Course.id)
    - day_id: int, FK (Day.id)
    - classroom_id: int, FK (Classroom.id)
    - shift_id: int, FK (Shift.id)
    - start_time: time
    - end_time: time
    - created_at: datetime
    - updated_at: datetime

> Course_student
    - id: int, PK
    - course_id: int, FK (Course.id)
    - student_id: int, FK (Student.id)
    - status_id: int, FK (Status.id)
    - created_at: datetime
    - updated_at: datetime

> Attendance
    - id: int, PK
    - course_student_id: int, FK (Course_student.id)
    - code_id: int, FK (Attendance_code.id)
    - hour: time
    - date: date
    - created_at: datetime
    - updated_at: datetime

> Attendance_code
    - id: int, PK
    - name: varchar(64)
    - description: varchar(255)
    - created_at: datetime
    - updated_at: datetime

> Classroom
    - id: int, PK
    - name: varchar(64)
    - capacity: int
    - created_at: datetime
    - updated_at: datetime

> Day
    - id: int, PK
    - name: varchar(64)
    - created_at: datetime
    - updated_at: datetime

> Staff
    - id: int, PK
    - user_id: int, FK (User.id)
    - first_name: varchar(64)
    - last_name: varchar(64)
    - dni: int
    - record_number: varchar(64)
    - status_id: int, FK (Status.id)
    - created_at: datetime
    - updated_at: datetime

> Shift
    - id: int, PK
    - name: varchar(64)
    - created_at: datetime
    - updated_at: datetime

> Staff_detail
    - id: int, PK
    - staff_id: int, FK (Staff.id)
    - phone: varchar(64)
    - address: varchar(128)
    - email: varchar(64)
    - dob: date
    - admission_date: date
    - photo_url: varchar(255)
    - description: varchar(255)
    - created_at: datetime
    - updated_at: datetime

> Log
    - id: int, PK
    - user_id: int, FK (User.id)
    - table_name: varchar(64)
    - action: varchar(64)
    - record_id: int
    - created_at: datetime
    - updated_at: datetime

> Status
    - id: int, PK
    - name: varchar(64)
    - description: varchar(255)
    - created_at: datetime
    - updated_at: datetime