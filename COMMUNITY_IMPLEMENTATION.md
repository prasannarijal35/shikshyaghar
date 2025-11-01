# Community Messaging Feature - Implementation Guide

## Overview

The community messaging feature has been successfully implemented for ShikshyaGhar, allowing students and teachers to communicate within subject-based communities. Only users with active subscriptions can participate in messaging.

## Files Created

### 1. Types (`src/types/community.ts`)

- **CommunitySender**: Interface for message sender information
- **CommunityMessage**: Interface for community messages
- **SendCommunityMessagePayload**: Payload for sending messages
- **GetCommunityMessagesResponse**: Response structure with pagination

### 2. Services (`src/services/communityServices.ts`)

- **sendMessage()**: Send a message to a community
- **getMessages()**: Retrieve messages from a community with pagination

### 3. Components

#### Student Component (`src/components/studentpanel/community/CommunityChat.tsx`)

Features:

- Lists all active subscriptions in sidebar
- Displays messages for selected class
- Real-time message polling (every 5 seconds)
- Send messages with validation (max 5000 characters)
- Load more messages pagination
- Visual distinction between teacher and student messages
- Auto-scroll to latest messages
- Responsive design with gradient UI

#### Teacher Component (`src/components/teacherpanel/community/CommunityChat.tsx`)

Features:

- Lists all teacher's subjects in sidebar
- Displays messages for selected subject
- Real-time message polling (every 5 seconds)
- Send messages to students
- Load more messages pagination
- Visual distinction between own messages and student messages
- Auto-scroll to latest messages
- Green-themed gradient UI for teachers

### 4. Pages

- **Student**: `/student/community` → `src/app/(student-teacher)/student/community/page.tsx`
- **Teacher**: `/teacher/community` → `src/app/(student-teacher)/teacher/community/page.tsx`

### 5. Navigation Updates

- Added "Community" link to Student sidebar with MessageCircle icon
- Added "Community" link to Teacher sidebar with MessageCircle icon

## Features Implemented

✅ **Authentication & Authorization**

- Only authenticated users can access
- Students need active subscriptions to send/view messages
- Teachers can access their subject communities freely

✅ **Real-time Updates**

- Auto-refresh messages every 5 seconds
- Instant message display after sending

✅ **User Experience**

- Visual distinction for teachers (green badges)
- Sender identification (You, Teacher, Student)
- Timestamp formatting (relative time)
- Character counter (5000 max)
- Loading states and error handling
- Responsive design

✅ **Pagination**

- Load more older messages
- 50 messages per page default
- Scroll to bottom on new messages

✅ **UI/UX**

- Gradient backgrounds
- Smooth animations
- Hover effects
- Icon indicators
- Empty states
- Error states

## API Integration

The feature integrates with these backend endpoints:

### Send Message

```
POST /api/v1/community
Body: {
  "teacherSubjectId": number,
  "message": string
}
```

### Get Messages

```
GET /api/v1/community/:teacherSubjectId?page=1&limit=50
```

## Access Control

### Students

- Must have ACTIVE subscription status
- Subscription must be within startDate and endDate
- Can only access communities for subscribed subjects

### Teachers

- Can access all their subject communities
- No subscription requirement

## Usage Instructions

### For Students

1. Navigate to "Community" from the student dashboard sidebar
2. Select a class from the left sidebar (only active subscriptions shown)
3. View messages in the main chat area
4. Type a message in the input field (max 5000 characters)
5. Click "Send" or press Enter to send
6. Messages auto-refresh every 5 seconds

### For Teachers

1. Navigate to "Community" from the teacher dashboard sidebar
2. Select a subject from the left sidebar (all your subjects shown)
3. View messages from all subscribed students
4. Type a message in the input field (max 5000 characters)
5. Click "Send" or press Enter to send
6. Messages auto-refresh every 5 seconds

## Visual Design

### Student View

- **Primary Color**: Blue (#2563EB) to Purple (#9333EA) gradient
- **Own Messages**: Blue-purple gradient with white text
- **Teacher Messages**: Green gradient with teacher badge
- **Other Student Messages**: Gray background

### Teacher View

- **Primary Color**: Green (#059669) to Emerald (#10B981) gradient
- **Own Messages**: Green-emerald gradient with white text
- **Student Messages**: Purple badge for identification
- **Teacher Messages**: Blue badge for identification

## Error Handling

The implementation includes comprehensive error handling:

- **403 Forbidden**: User doesn't have active subscription
- **404 Not Found**: Teacher subject not found
- **400 Bad Request**: Validation errors
- **Network Errors**: Generic error messages with toast notifications

## Performance Considerations

- **Polling Interval**: 5 seconds (configurable)
- **Message Limit**: 50 per page (configurable)
- **Auto-scroll**: Only on new messages
- **Lazy Loading**: Load more messages on demand

## Future Enhancements (Optional)

1. **WebSocket Integration**: Real-time messaging instead of polling
2. **Message Editing**: Allow users to edit their messages
3. **Message Deletion**: Allow users to delete their messages
4. **Read Receipts**: Track who has read messages
5. **File Attachments**: Support image and file sharing
6. **Emoji Support**: Emoji picker for reactions
7. **Search**: Search within messages
8. **Notifications**: Push notifications for new messages
9. **Typing Indicators**: Show when someone is typing
10. **Message Reactions**: Like, heart, etc.

## Testing Checklist

- [ ] Student can view active subscriptions
- [ ] Student can send messages in subscribed communities
- [ ] Student cannot send messages without active subscription
- [ ] Teacher can view all their subjects
- [ ] Teacher can send messages to any subject community
- [ ] Messages auto-refresh every 5 seconds
- [ ] Pagination works (load more messages)
- [ ] Message length validation (5000 chars)
- [ ] Proper error messages for failed requests
- [ ] Responsive design on mobile/tablet
- [ ] Auto-scroll works correctly
- [ ] Visual distinction between sender types

## Dependencies

All dependencies are already in the project:

- `react` and `react-dom`
- `next` (Next.js 14+)
- `lucide-react` (Icons)
- `react-hot-toast` (Notifications)
- Existing services and utilities

## Notes

- The feature follows the existing codebase patterns and conventions
- All components use TypeScript for type safety
- Consistent with existing UI/UX design patterns
- Fully integrated with authentication system
- Works with existing subscription system
- No additional packages required

## Support

For issues or questions:

1. Check backend API is running and endpoints are accessible
2. Verify user has proper authentication token
3. Check subscription status for students
4. Review console for error messages
5. Test with different user roles (student/teacher)

---

**Status**: ✅ Feature Complete and Ready for Testing
**Last Updated**: November 1, 2025
