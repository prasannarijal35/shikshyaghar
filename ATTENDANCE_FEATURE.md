# Attendance Feature Documentation

## Overview

The attendance tracking feature allows teachers to mark and manage student attendance for their classes. Students can also view their own attendance records and statistics.

## Database Schema

### Attendance Model

```typescript
{
  id: number (Primary Key, Auto Increment)
  subscriptionId: number (Foreign Key -> Subscription)
  studentId: number (Foreign Key -> User)
  teacherSubjectId: number (Foreign Key -> TeacherSubject)
  attendanceDate: Date (Format: YYYY-MM-DD)
  status: AttendanceStatus (PRESENT, ABSENT, LATE, EXCUSED)
  markedBy: number (Foreign Key -> User - the teacher who marked)
  remarks?: string (Optional, max 500 characters)
  createdAt: Date
  updatedAt: Date
}
```

### Indexes

- **Unique Constraint**: `subscription_id + attendance_date` (prevents duplicate attendance for same day)
- **Index on**: `student_id` (for student-specific queries)
- **Index on**: `teacher_subject_id` (for class-wide queries)
- **Index on**: `attendance_date` (for date range queries)
- **Index on**: `status` (for status filtering)

### Enums

```typescript
enum AttendanceStatus {
  PRESENT = "present",
  ABSENT = "absent",
  LATE = "late",
  EXCUSED = "excused",
}
```

## API Endpoints

### 1. Mark Single Attendance

**POST** `/api/v1/attendance/mark`

Mark or update attendance for a single student on a specific date.

**Authentication**: Required (Teacher only)

**Request Body**:

```json
{
  "subscriptionId": 123,
  "attendanceDate": "2024-01-15",
  "status": "present",
  "remarks": "Student arrived on time"
}
```

**Validation**:

- `subscriptionId`: Required, positive integer
- `attendanceDate`: Required, format YYYY-MM-DD, valid date
- `status`: Required, one of: present, absent, late, excused
- `remarks`: Optional, string, max 500 characters

**Business Logic**:

1. Verify user is a teacher
2. Validate subscription exists and is ACTIVE
3. Verify subscription belongs to teacher's subject
4. Check date is within subscription period (startDate to endDate)
5. Upsert attendance record (update if exists for that date, create if new)

**Response**:

```json
{
  "status": 200,
  "message": "Attendance marked successfully",
  "data": {
    "attendance": {
      "id": 456,
      "subscriptionId": 123,
      "studentId": 789,
      "teacherSubjectId": 10,
      "attendanceDate": "2024-01-15T00:00:00.000Z",
      "status": "present",
      "markedBy": 20,
      "remarks": "Student arrived on time",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    "created": true
  }
}
```

**Error Cases**:

- 401: Unauthorized (missing/invalid token)
- 403: Forbidden (user is not a teacher)
- 404: Subscription not found or doesn't belong to teacher
- 400: Invalid date format or date outside subscription period

---

### 2. Bulk Mark Attendance

**POST** `/api/v1/attendance/bulk`

Mark attendance for multiple students at once on a specific date.

**Authentication**: Required (Teacher only)

**Request Body**:

```json
{
  "teacherSubjectId": 10,
  "attendanceDate": "2024-01-15",
  "attendances": [
    {
      "subscriptionId": 123,
      "status": "present",
      "remarks": "On time"
    },
    {
      "subscriptionId": 124,
      "status": "absent"
    },
    {
      "subscriptionId": 125,
      "status": "late",
      "remarks": "Arrived 10 minutes late"
    }
  ]
}
```

**Validation**:

- `teacherSubjectId`: Required, positive integer
- `attendanceDate`: Required, format YYYY-MM-DD, valid date
- `attendances`: Required, non-empty array
- `attendances[].subscriptionId`: Required, positive integer
- `attendances[].status`: Required, one of: present, absent, late, excused
- `attendances[].remarks`: Optional, string, max 500 characters

**Business Logic**:

1. Verify user is a teacher
2. Verify teacherSubject belongs to this teacher
3. For each attendance record:
   - Validate subscription exists, is ACTIVE, and belongs to teacherSubjectId
   - Check date is within subscription period
   - Upsert attendance record
4. Return summary of successful and failed operations

**Response**:

```json
{
  "status": 200,
  "message": "Bulk attendance processed: 3 successful, 0 failed",
  "data": {
    "total": 3,
    "successful": 3,
    "failed": 0,
    "results": [
      {
        "subscriptionId": 123,
        "success": true,
        "message": "Attendance marked",
        "attendance": {
          /* attendance object */
        }
      },
      {
        "subscriptionId": 124,
        "success": true,
        "message": "Attendance updated",
        "attendance": {
          /* attendance object */
        }
      },
      {
        "subscriptionId": 125,
        "success": true,
        "message": "Attendance marked",
        "attendance": {
          /* attendance object */
        }
      }
    ]
  }
}
```

**Use Case**: Teachers can mark attendance for entire class in one operation instead of individual API calls.

---

### 3. Get Attendance by Subscription

**GET** `/api/v1/attendance/subscription/:subscriptionId`

Retrieve all attendance records for a specific subscription with filtering and statistics.

**Authentication**: Required (Teacher of the class OR the student)

**Query Parameters**:

- `startDate` (optional): Filter from this date (YYYY-MM-DD)
- `endDate` (optional): Filter until this date (YYYY-MM-DD)
- `status` (optional): Filter by status (present, absent, late, excused)

**Example**:

```
GET /api/v1/attendance/subscription/123?startDate=2024-01-01&endDate=2024-01-31&status=present
```

**Validation**:

- `startDate`: Optional, format YYYY-MM-DD, valid date
- `endDate`: Optional, format YYYY-MM-DD, valid date, must be after startDate
- `status`: Optional, one of: present, absent, late, excused

**Business Logic**:

1. Verify subscription exists
2. Check permissions:
   - If user is teacher: verify they teach this subject
   - If user is student: verify this is their subscription
3. Fetch attendance records with filters applied
4. Calculate statistics (total, counts by status, attendance rate)

**Response**:

```json
{
  "status": 200,
  "message": "Attendance records retrieved successfully",
  "data": {
    "subscriptionId": 123,
    "student": {
      "id": 789,
      "fullName": "John Doe",
      "email": "john@example.com"
    },
    "teacherSubject": {
      "id": 10,
      "subjectName": "Mathematics Grade 10"
    },
    "attendances": [
      {
        "id": 456,
        "attendanceDate": "2024-01-15T00:00:00.000Z",
        "status": "present",
        "remarks": "On time",
        "markedBy": 20,
        "marker": {
          "id": 20,
          "fullName": "Teacher Name"
        }
      }
      // ... more records
    ],
    "statistics": {
      "total": 20,
      "present": 15,
      "absent": 2,
      "late": 2,
      "excused": 1,
      "attendanceRate": 85.0
    }
  }
}
```

**Attendance Rate Calculation**:

```
attendanceRate = ((present + late) / total) * 100
```

Excused absences are counted in total but not in the rate calculation.

---

### 4. Get Students Attendance (Teacher View)

**GET** `/api/v1/attendance/teacher-subject/:teacherSubjectId`

Get all students enrolled in a teacher's subject with their attendance summary.

**Authentication**: Required (Teacher only - must own the subject)

**Response**:

```json
{
  "status": 200,
  "message": "Students attendance retrieved successfully",
  "data": {
    "teacherSubjectId": 10,
    "totalStudents": 25,
    "students": [
      {
        "subscriptionId": 123,
        "student": {
          "id": 789,
          "fullName": "John Doe",
          "email": "john@example.com",
          "phone": "1234567890",
          "gender": "male"
        },
        "subscriptionPeriod": {
          "startDate": "2024-01-01T00:00:00.000Z",
          "endDate": "2024-12-31T00:00:00.000Z"
        },
        "attendanceSummary": {
          "total": 20,
          "present": 15,
          "absent": 2,
          "late": 2,
          "excused": 1,
          "attendanceRate": 85.0
        },
        "recentAttendance": [
          {
            "id": 456,
            "attendanceDate": "2024-01-15T00:00:00.000Z",
            "status": "present",
            "remarks": "On time"
          }
          // Last 5 attendance records
        ]
      }
      // ... more students
    ]
  }
}
```

**Business Logic**:

1. Verify user is a teacher
2. Verify teacherSubject belongs to this teacher
3. Get all ACTIVE subscriptions for this teacherSubject
4. For each student, calculate attendance summary and include last 5 records

**Use Case**: Teachers can get overview of entire class attendance at once.

---

## Frontend Integration Examples

### Mark Attendance (Single Student)

```typescript
const markAttendance = async (
  subscriptionId: number,
  date: string,
  status: "present" | "absent" | "late" | "excused",
  remarks?: string
) => {
  const response = await fetch("/api/v1/attendance/mark", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      subscriptionId,
      attendanceDate: date,
      status,
      remarks,
    }),
  });

  return await response.json();
};

// Usage
await markAttendance(123, "2024-01-15", "present", "On time");
```

### Bulk Mark Attendance

```typescript
const bulkMarkAttendance = async (
  teacherSubjectId: number,
  date: string,
  attendances: Array<{
    subscriptionId: number;
    status: string;
    remarks?: string;
  }>
) => {
  const response = await fetch("/api/v1/attendance/bulk", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      teacherSubjectId,
      attendanceDate: date,
      attendances,
    }),
  });

  return await response.json();
};

// Usage - mark entire class at once
await bulkMarkAttendance(10, "2024-01-15", [
  { subscriptionId: 123, status: "present" },
  { subscriptionId: 124, status: "absent" },
  { subscriptionId: 125, status: "late", remarks: "10 min late" },
]);
```

### Get Student Attendance (with filters)

```typescript
const getStudentAttendance = async (
  subscriptionId: number,
  filters?: {
    startDate?: string;
    endDate?: string;
    status?: string;
  }
) => {
  const params = new URLSearchParams();
  if (filters?.startDate) params.append("startDate", filters.startDate);
  if (filters?.endDate) params.append("endDate", filters.endDate);
  if (filters?.status) params.append("status", filters.status);

  const response = await fetch(
    `/api/v1/attendance/subscription/${subscriptionId}?${params}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await response.json();
};

// Usage - get January attendance only
const januaryAttendance = await getStudentAttendance(123, {
  startDate: "2024-01-01",
  endDate: "2024-01-31",
});

console.log(
  `Attendance rate: ${januaryAttendance.data.statistics.attendanceRate}%`
);
```

### Get Class Overview (Teacher)

```typescript
const getClassAttendance = async (teacherSubjectId: number) => {
  const response = await fetch(
    `/api/v1/attendance/teacher-subject/${teacherSubjectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await response.json();
};

// Usage
const classData = await getClassAttendance(10);
console.log(`Total students: ${classData.data.totalStudents}`);
classData.data.students.forEach((student) => {
  console.log(
    `${student.student.fullName}: ${student.attendanceSummary.attendanceRate}% attendance`
  );
});
```

---

## Business Rules

### Attendance Marking Rules

1. **Only teachers can mark attendance** - Students cannot mark their own attendance
2. **Teacher must own the subject** - Can only mark for their own classes
3. **Subscription must be ACTIVE** - Cannot mark for expired/cancelled subscriptions
4. **Date must be within subscription period** - Cannot mark attendance before subscription starts or after it ends
5. **Unique per day** - Only one attendance record per student per day (upsert behavior)
6. **Date validation** - Must use valid dates in YYYY-MM-DD format

### Viewing Rules

1. **Teachers can view**:

   - All attendance for their subjects
   - Individual student attendance in their classes
   - Class-wide attendance overview

2. **Students can view**:
   - Only their own attendance records
   - Cannot view other students' attendance

### Statistics Calculation

- **Total**: Count of all attendance records
- **Present/Absent/Late/Excused**: Count by status
- **Attendance Rate**: `((present + late) / total) * 100`
  - Late arrivals count as attended
  - Excused absences count in total but not as attended
  - Unexcused absences don't count as attended

---

## Database Relations

```
Attendance
├── belongsTo Subscription (subscription_id)
├── belongsTo User as student (student_id)
├── belongsTo User as marker (marked_by)
└── belongsTo TeacherSubject (teacher_subject_id)

Subscription
├── belongsTo User as student
├── belongsTo TeacherSubject
└── hasMany Attendance

TeacherSubject
├── belongsTo Teacher
├── hasMany Subscription
└── hasMany Attendance

User (Student)
└── hasMany Attendance (as student)

User (Teacher)
└── hasMany Attendance (as marker)
```

---

## Testing Checklist

### Mark Attendance

- [ ] Teacher can mark attendance for their student
- [ ] Non-teacher cannot mark attendance (403)
- [ ] Teacher cannot mark for other teacher's class (404)
- [ ] Cannot mark for inactive subscription (404)
- [ ] Cannot mark for date outside subscription period (400)
- [ ] Marking same date twice updates existing record
- [ ] Remarks are optional and can be up to 500 characters

### Bulk Mark

- [ ] Can mark multiple students at once
- [ ] Partial failures don't break the entire operation
- [ ] Returns detailed results for each record
- [ ] Validates teacher ownership of subject

### Get Attendance

- [ ] Student can view own attendance
- [ ] Student cannot view other student's attendance (403)
- [ ] Teacher can view student attendance in their class
- [ ] Teacher cannot view attendance for other classes (403)
- [ ] Date filters work correctly
- [ ] Status filter works correctly
- [ ] Statistics are calculated accurately

### Get Class Attendance

- [ ] Teacher can view all students in their class
- [ ] Only shows ACTIVE subscriptions
- [ ] Attendance summary is accurate
- [ ] Recent attendance shows last 5 records
- [ ] Non-teacher cannot access (403)
- [ ] Teacher cannot access other teacher's class (404)

---

## Performance Considerations

### Indexes

All critical query paths are indexed:

- Subscription lookup: Index on `subscription_id`
- Student queries: Index on `student_id`
- Class queries: Index on `teacher_subject_id`
- Date range queries: Index on `attendance_date`
- Status filtering: Index on `status`

### Optimization Tips

1. Use bulk marking for class attendance to reduce API calls
2. Apply date filters when fetching attendance to limit data transfer
3. The unique constraint prevents duplicate entries automatically
4. Recent attendance is limited to 5 records to avoid large payloads

---

## Migration Notes

### Database Table Creation

The `attendances` table will be auto-created by Sequelize on server start with the following structure:

```sql
CREATE TABLE attendances (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subscription_id INT NOT NULL,
  student_id INT NOT NULL,
  teacher_subject_id INT NOT NULL,
  attendance_date DATE NOT NULL,
  status ENUM('present', 'absent', 'late', 'excused') NOT NULL,
  marked_by INT NOT NULL,
  remarks VARCHAR(500),
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  UNIQUE KEY unique_subscription_date (subscription_id, attendance_date),
  KEY idx_student_id (student_id),
  KEY idx_teacher_subject_id (teacher_subject_id),
  KEY idx_attendance_date (attendance_date),
  KEY idx_status (status),
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(id),
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (teacher_subject_id) REFERENCES teacher_subjects(id),
  FOREIGN KEY (marked_by) REFERENCES users(id)
);
```

### Important Settings

- `underscored: true` - All column names use snake_case
- `timestamps: true` - Automatically adds created_at and updated_at
- No `alter: true` - Schema is locked after initial creation

---

## Error Handling

All endpoints follow consistent error response format:

```json
{
  "status": 400,
  "message": "Error description",
  "errors": [
    {
      "field": "attendanceDate",
      "message": "Date must be in YYYY-MM-DD format"
    }
  ]
}
```

Common status codes:

- **200**: Success
- **400**: Bad request (validation errors)
- **401**: Unauthorized (missing/invalid token)
- **403**: Forbidden (insufficient permissions)
- **404**: Resource not found
- **500**: Internal server error

---

## Future Enhancements (Optional)

1. **Attendance Reports**: Generate PDF/Excel reports of attendance
2. **Attendance Notifications**: Email/SMS to students/parents for absences
3. **Attendance Percentage Alerts**: Warn when attendance falls below threshold
4. **Attendance Patterns**: Analytics on attendance trends
5. **Bulk Import**: CSV import for attendance data
6. **Edit History**: Track who changed attendance and when
7. **Grace Period**: Allow marking attendance within X hours of class
8. **Late Threshold**: Automatically mark as late if arrival > X minutes

---

## Support

For issues or questions about the attendance feature:

1. Check this documentation first
2. Verify database schema is created correctly
3. Check server logs for detailed error messages
4. Ensure all required environment variables are set

Created: 2024
Last Updated: 2024
