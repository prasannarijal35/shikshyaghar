# Direct Messaging Feature - One-on-One Teacher-Student Communication

## Overview

The direct messaging feature enables private, one-on-one communication between teachers and students. Messages can only be exchanged when a student has an **active subscription** to at least one of the teacher's subjects.

---

## Business Logic

### Core Rules

1. **Subscription Requirement**

   - Students must have an active subscription to at least one of the teacher's subjects
   - Subscription status must be `ACTIVE`
   - Current date must be between `startDate` and `endDate`

2. **Who Can Message Whom**

   - Teachers can message any student who has an active subscription to their subjects
   - Students can message any teacher whose subject they are subscribed to
   - Users cannot message themselves
   - Messages can only be exchanged between a teacher and a student (not student-to-student or teacher-to-teacher)

3. **Subscription Linking**
   - Each message is linked to a specific subscription
   - If a student subscribes to multiple subjects from the same teacher, all messages use the first active subscription found
   - Messages remain accessible as long as the subscription record exists (even after expiry)

---

## Database Schema

### Message Model

```typescript
{
  id: number; // Primary key
  senderId: number; // Foreign key to User (sender)
  receiverId: number; // Foreign key to User (receiver)
  subscriptionId: number; // Foreign key to Subscription
  message: string; // Message content (max 5000 chars)
  read: boolean; // Read status (default: false)
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Update timestamp
}
```

**Relationships:**

- `sender` → User (who sent the message)
- `receiver` → User (who receives the message)
- `subscription` → Subscription (the active subscription linking them)

**Indexes:**

- `subscription_id` - Filter messages by subscription
- `sender_id` - Filter messages by sender
- `receiver_id` - Filter messages by receiver
- `created_at` - Sort messages chronologically

---

## API Endpoints

### 1. Send Message

**Endpoint:** `POST /api/v1/messages`

**Authentication:** Required (JWT Bearer token)

**Request Body:**

```json
{
  "receiverId": 5,
  "message": "Hello, when is the next class?"
}
```

**Validation:**

- `receiverId`: Required, must be a positive integer
- `message`: Required, string between 1-5000 characters

**Response (201):**

```json
{
  "status": 201,
  "message": "Message sent successfully",
  "data": {
    "id": 123,
    "senderId": 3,
    "receiverId": 5,
    "subscriptionId": 10,
    "message": "Hello, when is the next class?",
    "read": false,
    "createdAt": "2025-11-01T10:30:00.000Z",
    "updatedAt": "2025-11-01T10:30:00.000Z",
    "sender": {
      "id": 3,
      "fullName": "John Teacher",
      "email": "teacher@example.com",
      "role": "teacher",
      "phone": "9841234567",
      "gender": "male"
    },
    "receiver": {
      "id": 5,
      "fullName": "Jane Student",
      "email": "student@example.com",
      "role": "student",
      "phone": "9851234567",
      "gender": "female"
    }
  }
}
```

**Error Responses:**

```json
// 400 - Cannot message yourself
{
  "status": 400,
  "message": "You cannot send a message to yourself"
}

// 403 - Not between teacher and student
{
  "status": 403,
  "message": "Messages can only be sent between a teacher and a student"
}

// 403 - No active subscription
{
  "status": 403,
  "message": "No active subscription found. The student must have an active subscription to one of the teacher's subjects to exchange messages."
}

// 404 - Receiver not found
{
  "status": 404,
  "message": "Receiver not found"
}
```

---

### 2. Get Messages with Another User

**Endpoint:** `GET /api/v1/messages/:userId`

**Authentication:** Required (JWT Bearer token)

**Path Parameters:**

- `userId`: The ID of the other user (teacher or student)

**Query Parameters:**

- `page` (optional): Page number, default is 1
- `limit` (optional): Messages per page, default is 100

**Example:** `GET /api/v1/messages/5?page=1&limit=50`

**Response (200):**

```json
{
  "status": 200,
  "message": "Messages retrieved successfully",
  "data": {
    "messages": [
      {
        "id": 120,
        "senderId": 3,
        "receiverId": 5,
        "subscriptionId": 10,
        "message": "Hello! Welcome to the class.",
        "read": true,
        "createdAt": "2025-11-01T09:00:00.000Z",
        "updatedAt": "2025-11-01T09:05:00.000Z",
        "sender": {
          "id": 3,
          "fullName": "John Teacher",
          "email": "teacher@example.com",
          "role": "teacher"
        },
        "receiver": {
          "id": 5,
          "fullName": "Jane Student",
          "email": "student@example.com",
          "role": "student"
        }
      },
      {
        "id": 121,
        "senderId": 5,
        "receiverId": 3,
        "message": "Thank you! When is the next session?",
        "read": true,
        "createdAt": "2025-11-01T09:10:00.000Z",
        "updatedAt": "2025-11-01T09:15:00.000Z",
        "sender": {
          "id": 5,
          "fullName": "Jane Student",
          "email": "student@example.com",
          "role": "student"
        },
        "receiver": {
          "id": 3,
          "fullName": "John Teacher",
          "email": "teacher@example.com",
          "role": "teacher"
        }
      }
    ],
    "subscription": {
      "id": 10,
      "startDate": "2025-10-01T00:00:00.000Z",
      "endDate": "2025-11-01T00:00:00.000Z",
      "status": "active"
    },
    "pagination": {
      "total": 45,
      "page": 1,
      "limit": 50,
      "totalPages": 1
    }
  }
}
```

**Error Responses:**

```json
// 403 - Not between teacher and student
{
  "status": 403,
  "message": "Messages can only be exchanged between a teacher and a student"
}

// 403 - No active subscription
{
  "status": 403,
  "message": "No active subscription found between these users"
}

// 404 - User not found
{
  "status": 404,
  "message": "User not found"
}
```

---

### 3. Get All Conversations

**Endpoint:** `GET /api/v1/messages/conversations`

**Authentication:** Required (JWT Bearer token)

**Description:** Returns all active conversations for the current user with their last message and unread count.

**Response (200):**

```json
{
  "status": 200,
  "message": "Conversations retrieved successfully",
  "data": [
    {
      "subscriptionId": 10,
      "otherUser": {
        "id": 5,
        "fullName": "Jane Student",
        "email": "student@example.com",
        "role": "student",
        "phone": "9851234567",
        "gender": "female"
      },
      "lastMessage": {
        "message": "See you tomorrow!",
        "createdAt": "2025-11-01T15:30:00.000Z",
        "sender": {
          "id": 5,
          "fullName": "Jane Student"
        }
      },
      "unreadCount": 2
    },
    {
      "subscriptionId": 15,
      "otherUser": {
        "id": 8,
        "fullName": "Bob Student",
        "email": "bob@example.com",
        "role": "student",
        "phone": "9841111111",
        "gender": "male"
      },
      "lastMessage": {
        "message": "Thank you for the explanation!",
        "createdAt": "2025-11-01T14:00:00.000Z",
        "sender": {
          "id": 8,
          "fullName": "Bob Student"
        }
      },
      "unreadCount": 0
    }
  ]
}
```

**Features:**

- Sorted by most recent message first
- Shows unread message count per conversation
- Displays the last message preview
- Shows the other user's details (teacher or student)

---

### 4. Mark Messages as Read

**Endpoint:** `PATCH /api/v1/messages/mark-read`

**Authentication:** Required (JWT Bearer token)

**Request Body:**

```json
{
  "messageIds": [123, 124, 125]
}
```

**Validation:**

- `messageIds`: Required, must be a non-empty array of positive integers

**Response (200):**

```json
{
  "status": 200,
  "message": "3 message(s) marked as read",
  "data": {
    "updatedCount": 3
  }
}
```

**Notes:**

- Only marks messages where current user is the receiver
- Only updates messages that are currently unread
- Returns count of actually updated messages

---

## Client Integration Guide

### 1. Detecting Message Sender/Receiver

```javascript
// Check if message was sent by current user
const isMyMessage = message.senderId === currentUser.id;

// Get sender information
const senderName = message.sender.fullName;
const senderRole = message.sender.role; // "teacher" or "student"

// Display message with appropriate styling
if (isMyMessage) {
  // Show on right side with "You" label
} else {
  // Show on left side with sender's name
}
```

### 2. Building a Chat Interface

```javascript
// Fetch conversations list
async function loadConversations() {
  const response = await fetch("/api/v1/messages/conversations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.data; // Array of conversations
}

// Load messages with a specific user
async function loadMessages(userId, page = 1) {
  const response = await fetch(
    `/api/v1/messages/${userId}?page=${page}&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data.data; // { messages, subscription, pagination }
}

// Send a message
async function sendMessage(receiverId, messageText) {
  const response = await fetch("/api/v1/messages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      receiverId,
      message: messageText,
    }),
  });
  return await response.json();
}

// Mark messages as read when viewing conversation
async function markMessagesAsRead(messageIds) {
  await fetch("/api/v1/messages/mark-read", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messageIds }),
  });
}
```

### 3. Real-time Updates (Polling)

Since this API doesn't use WebSockets, implement polling:

```javascript
// Poll for new messages every 5 seconds
let pollingInterval;

function startPolling(userId) {
  pollingInterval = setInterval(async () => {
    const data = await loadMessages(userId, 1);
    updateChatUI(data.messages);

    // Mark new messages as read
    const unreadIds = data.messages
      .filter((m) => !m.read && m.receiverId === currentUser.id)
      .map((m) => m.id);

    if (unreadIds.length > 0) {
      await markMessagesAsRead(unreadIds);
    }
  }, 5000);
}

function stopPolling() {
  if (pollingInterval) {
    clearInterval(pollingInterval);
  }
}

// Start polling when entering a conversation
// Stop polling when leaving
```

### 4. Conversations List with Unread Badges

```javascript
function ConversationsList({ conversations }) {
  return conversations.map((conv) => (
    <ConversationItem key={conv.subscriptionId}>
      <UserAvatar user={conv.otherUser} />
      <div>
        <h4>{conv.otherUser.fullName}</h4>
        <p>{conv.lastMessage?.message || "No messages yet"}</p>
        <time>{formatTime(conv.lastMessage?.createdAt)}</time>
      </div>
      {conv.unreadCount > 0 && <Badge>{conv.unreadCount}</Badge>}
    </ConversationItem>
  ));
}
```

### 5. Infinite Scroll for Messages

```javascript
let currentPage = 1;
let hasMore = true;

async function loadMoreMessages(userId) {
  if (!hasMore) return;

  currentPage++;
  const data = await loadMessages(userId, currentPage);

  appendMessagesToTop(data.messages);
  hasMore = currentPage < data.pagination.totalPages;
}

// Trigger when user scrolls to top of chat
chatContainer.addEventListener("scroll", () => {
  if (chatContainer.scrollTop === 0 && hasMore) {
    loadMoreMessages(currentUserId);
  }
});
```

---

## Features

✅ **Subscription-Based Access**

- Only active subscribers can exchange messages
- Automatically finds the subscription between teacher and student

✅ **Smart User Detection**

- Automatically determines who is teacher and who is student
- Validates that messages are only between teacher-student pairs

✅ **Conversation Management**

- Get list of all active conversations
- See last message preview
- Track unread message counts

✅ **Read Receipts**

- Mark individual or multiple messages as read
- Track read status for each message

✅ **Complete User Information**

- Full sender and receiver details in each message
- Easy to build user interfaces

✅ **Pagination Support**

- Load messages in chunks
- Default 100 messages per page
- Efficient for long conversation histories

✅ **Proper Error Handling**

- Clear error messages for different scenarios
- Validates all business rules

---

## Authentication Flow

```
1. User logs in → Receives JWT token
2. User includes token in Authorization header: Bearer <token>
3. Auth middleware extracts user from token
4. Controllers use authenticated user to:
   - Determine sender
   - Validate subscription
   - Filter messages
```

---

## Example Use Cases

### Use Case 1: Student Messages Teacher

```
Student (ID: 5) wants to message Teacher (ID: 3)
1. Student has active subscription to Teacher's Math subject
2. POST /api/v1/messages with receiverId: 3
3. System finds active subscription
4. Message is created and linked to subscription
5. Teacher receives message
```

### Use Case 2: Teacher Messages Student

```
Teacher (ID: 3) wants to message Student (ID: 5)
1. Student has active subscription to Teacher's subject
2. POST /api/v1/messages with receiverId: 5
3. System finds the same subscription
4. Message is created
5. Student receives message
```

### Use Case 3: Viewing Conversation History

```
Student opens chat with Teacher
1. GET /api/v1/messages/3
2. System verifies active subscription
3. Returns all messages between them
4. Messages are sorted chronologically
5. Unread messages are marked as read
```

### Use Case 4: Teacher Views All Conversations

```
Teacher opens messages section
1. GET /api/v1/messages/conversations
2. System finds all active subscriptions to teacher's subjects
3. Returns list of students with last message
4. Shows unread count for each conversation
```

---

## Database Migration

After implementing this feature:

1. Restart your server
2. The `messages` table will be auto-updated by Sequelize
3. New indexes will be created for better performance

---

## Testing the API

### Test 1: Send Message

```bash
curl -X POST http://localhost:8080/api/v1/messages \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "receiverId": 5,
    "message": "Hello, when is our next class?"
  }'
```

### Test 2: Get Messages

```bash
curl -X GET "http://localhost:8080/api/v1/messages/5?page=1&limit=20" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Test 3: Get Conversations

```bash
curl -X GET http://localhost:8080/api/v1/messages/conversations \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Test 4: Mark as Read

```bash
curl -X PATCH http://localhost:8080/api/v1/messages/mark-read \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "messageIds": [123, 124, 125]
  }'
```

---

## Security Considerations

1. **Authentication Required**: All endpoints require valid JWT token
2. **Subscription Validation**: Messages only work with active subscriptions
3. **User Isolation**: Users can only access their own messages
4. **Input Validation**: All inputs are validated before processing
5. **SQL Injection Prevention**: Using Sequelize ORM with parameterized queries

---

## Performance Optimization

1. **Database Indexes**: Added on frequently queried fields
2. **Pagination**: Prevents loading too many messages at once
3. **Selective Field Loading**: Only loads necessary user attributes
4. **Efficient Queries**: Uses JOIN operations to minimize database calls

---

## Future Enhancements (Optional)

- [ ] WebSocket support for real-time messaging
- [ ] Message delivery status (sent, delivered, read)
- [ ] File/image attachments
- [ ] Message editing and deletion
- [ ] Typing indicators
- [ ] Message search functionality
- [ ] Push notifications for new messages
- [ ] Message reactions/emojis
- [ ] Voice messages
- [ ] Video call integration

---

## Summary

The direct messaging system provides secure, subscription-based one-on-one communication between teachers and students. It automatically validates subscriptions, manages conversations, tracks read status, and provides all necessary data for building a complete chat interface in your client application.
