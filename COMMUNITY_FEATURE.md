# Community Messaging Feature

## Overview

The community messaging feature allows students and teachers to exchange messages within a teacher's subject community. Only users with active subscriptions can participate.

## Database Schema

### Community Model

- `id` - Primary key
- `teacherSubjectId` - Foreign key to TeacherSubject
- `senderId` - Foreign key to User (the person who sent the message)
- `message` - Text content of the message
- `createdAt` - Timestamp when message was created
- `updatedAt` - Timestamp when message was updated

**Indexes:**

- `teacher_subject_id` - For filtering messages by community
- `sender_id` - For filtering messages by sender
- `created_at` - For sorting messages chronologically

## API Endpoints

### 1. Send Message to Community

**Endpoint:** `POST /api/v1/community`

**Authentication:** Required (JWT Bearer token)

**Request Body:**

```json
{
  "teacherSubjectId": 1,
  "message": "Hello everyone, when is the next class?"
}
```

**Validation:**

- `teacherSubjectId`: Required, must be a positive integer
- `message`: Required, string between 1-5000 characters

**Authorization Rules:**

- If user is the teacher of the subject: Can send messages freely
- If user is a student: Must have an active subscription to the teacher subject
  - Subscription status must be ACTIVE
  - Current date must be between startDate and endDate

**Response (201):**

```json
{
  "status": 201,
  "message": "Message sent successfully",
  "data": {
    "id": 1,
    "teacherSubjectId": 1,
    "senderId": 5,
    "message": "Hello everyone, when is the next class?",
    "createdAt": "2025-11-01T10:30:00.000Z",
    "updatedAt": "2025-11-01T10:30:00.000Z",
    "sender": {
      "id": 5,
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "phone": "9841234567",
      "gender": "male"
    }
  }
}
```

### 2. Get Messages from Community

**Endpoint:** `GET /api/v1/community/:teacherSubjectId`

**Authentication:** Required (JWT Bearer token)

**Path Parameters:**

- `teacherSubjectId`: The ID of the teacher subject community

**Query Parameters:**

- `page` (optional): Page number, default is 1
- `limit` (optional): Number of messages per page, default is 50

**Example:** `GET /api/v1/community/1?page=1&limit=20`

**Authorization Rules:**

- If user is the teacher of the subject: Can view messages
- If user is a student: Must have an active subscription to the teacher subject
  - Subscription status must be ACTIVE
  - Current date must be between startDate and endDate

**Response (200):**

```json
{
  "status": 200,
  "message": "Messages retrieved successfully",
  "data": {
    "messages": [
      {
        "id": 1,
        "teacherSubjectId": 1,
        "senderId": 5,
        "message": "Hello everyone!",
        "createdAt": "2025-11-01T10:00:00.000Z",
        "updatedAt": "2025-11-01T10:00:00.000Z",
        "sender": {
          "id": 5,
          "fullName": "John Doe",
          "email": "john@example.com",
          "role": "student",
          "phone": "9841234567",
          "gender": "male"
        }
      },
      {
        "id": 2,
        "teacherSubjectId": 1,
        "senderId": 3,
        "message": "Welcome to the class!",
        "createdAt": "2025-11-01T10:05:00.000Z",
        "updatedAt": "2025-11-01T10:05:00.000Z",
        "sender": {
          "id": 3,
          "fullName": "Jane Smith",
          "email": "jane@example.com",
          "role": "teacher",
          "phone": "9851234567",
          "gender": "female"
        }
      }
    ],
    "pagination": {
      "total": 45,
      "page": 1,
      "limit": 20,
      "totalPages": 3
    }
  }
}
```

## Error Responses

### 401 Unauthorized

```json
{
  "status": 401,
  "message": "Unauthorized: Missing token"
}
```

### 403 Forbidden (No Active Subscription)

```json
{
  "status": 403,
  "message": "You must have an active subscription to send messages in this community"
}
```

### 403 Forbidden (Subscription Expired)

```json
{
  "status": 403,
  "message": "Your subscription is not currently active"
}
```

### 404 Not Found

```json
{
  "status": 404,
  "message": "Teacher subject not found"
}
```

### 400 Bad Request (Validation Error)

```json
{
  "status": 400,
  "message": "Message is required",
  "errors": [
    {
      "message": "Message is required"
    }
  ]
}
```

## Client Integration

### Detecting Sender

The sender information is included in the response with the `sender` object. You can use this to:

1. Display the sender's name
2. Show the sender's role (student/teacher)
3. Identify if the message was sent by the current user

**Example Client Logic:**

```javascript
// Check if message was sent by current user
const isMyMessage = message.sender.id === currentUser.id;

// Check if sender is teacher
const isTeacher = message.sender.role === "teacher";

// Display sender name
const displayName = message.sender.fullName;
```

### Polling for New Messages

Since this is not using WebSocket, you'll need to poll for new messages:

```javascript
// Poll every 5 seconds for new messages
setInterval(async () => {
  const response = await fetch(
    `/api/v1/community/${teacherSubjectId}?page=1&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  updateMessages(data.data.messages);
}, 5000);
```

### Infinite Scroll / Load More

```javascript
let currentPage = 1;

async function loadMoreMessages() {
  currentPage++;
  const response = await fetch(
    `/api/v1/community/${teacherSubjectId}?page=${currentPage}&limit=20`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await response.json();
  appendMessages(data.data.messages);
}
```

## Features

✅ Only authenticated users can send/view messages  
✅ Students must have active subscription  
✅ Teachers can always access their subject communities  
✅ Sender information included for client display  
✅ Pagination support for loading messages  
✅ Messages ordered chronologically (oldest first)  
✅ Validation for all inputs  
✅ Proper error handling and responses

## Database Migration

After adding this feature, make sure to:

1. Restart your server to create the `communities` table
2. The table will be auto-created by Sequelize sync

## Notes

- Messages are permanent and cannot be deleted (you can add delete functionality later if needed)
- Messages cannot be edited (you can add edit functionality later if needed)
- No read receipts (different from the private messaging feature)
- Messages are ordered by creation time (oldest first) for conversation flow
