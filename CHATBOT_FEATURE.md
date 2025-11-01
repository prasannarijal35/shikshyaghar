# Chatbot Feature Documentation

## Overview

The ShikshyaGhar Chatbot is an intelligent assistant that helps students and teachers navigate the platform and get instant answers to common questions.

## Features

### 🎯 **Role-Based Responses**

- **Student Portal**: Blue/Purple theme with student-specific guidance
- **Teacher Portal**: Green/Emerald theme with teacher-specific support

### 💬 **Smart Conversation**

- Predefined quick replies for common questions
- Natural language understanding (greetings, thanks, goodbye)
- Typing indicator for realistic chat experience
- Message history with timestamps
- User-friendly chat interface

### 📱 **Responsive Design**

- Fixed floating button in bottom-right corner
- Collapsible chat window (600px height, 384px width)
- Smooth animations and transitions
- Mobile-friendly interface

## Student Quick Replies

1. **How do I find teachers?**

   - Navigate to Find Teachers
   - Browse by subject/grade
   - View profiles and reviews
   - Subscribe process

2. **How to subscribe?**

   - Finding teachers
   - Viewing profiles
   - Choosing plans
   - Payment completion

3. **What is Community?**

   - Group chat features
   - Discussion with classmates
   - Teacher Q&A
   - Resource sharing

4. **How to message teachers?**

   - Direct messaging guide
   - Subscription requirements
   - Starting conversations

5. **View my classes**

   - Accessing My Classes
   - Class materials
   - Progress tracking

6. **Payment methods**
   - Accepted payment options
   - Security information

## Teacher Quick Replies

1. **How to add subjects?**

   - Adding new subjects
   - Setting pricing
   - Admin approval process

2. **View my students**

   - Accessing student list
   - Viewing profiles
   - Tracking subscriptions

3. **How to post reviews?**

   - Creating reviews
   - Sharing success stories
   - Building reputation

4. **Subscription management**

   - Managing subscribers
   - Payment tracking
   - Renewal reminders

5. **Community features**

   - Group discussions
   - Announcements
   - Material sharing

6. **How to verify account?**
   - Verification process
   - Document submission
   - Benefits of verification

## Natural Language Support

The chatbot recognizes:

- **Greetings**: "hello", "hi", "hey"
- **Thanks**: "thank you", "thanks", "appreciate"
- **Goodbye**: "bye", "goodbye", "see you"

## Technical Implementation

### Components Used

- **Chatbot.tsx**: Main chatbot component
- **StudentLayout.tsx**: Student portal integration
- **TeacherLayout.tsx**: Teacher portal integration

### Technologies

- React with TypeScript
- Lucide React icons
- Tailwind CSS for styling
- Local state management

### Props

```typescript
interface ChatbotProps {
  userRole: "student" | "teacher";
}
```

## Usage

The chatbot is automatically available to:

- ✅ Logged-in students (Student Portal)
- ✅ Logged-in teachers (Teacher Portal)

### Opening the Chatbot

Click the floating chat button in the bottom-right corner

### Closing the Chatbot

Click the X button in the chat header

### Sending Messages

1. Type your question in the input field
2. Press Enter or click the Send button
3. Use quick reply buttons for common questions

## Customization

### Adding New Responses

**For Students** (`studentResponses`):

```typescript
"Your question": "Your detailed answer with instructions"
```

**For Teachers** (`teacherResponses`):

```typescript
"Your question": "Your detailed answer with instructions"
```

### Adding New Quick Replies

**For Students** (`studentQuickReplies`):

```typescript
const studentQuickReplies = ["Existing question", "New question here"];
```

**For Teachers** (`teacherQuickReplies`):

```typescript
const teacherQuickReplies = ["Existing question", "New question here"];
```

## Styling

### Student Theme

- Primary: Blue to Purple gradient (`from-blue-500 to-purple-600`)
- Accent: Blue shades
- Button: Blue/Purple gradient

### Teacher Theme

- Primary: Green to Emerald gradient (`from-green-500 to-emerald-600`)
- Accent: Green shades
- Button: Green/Emerald gradient

## Future Enhancements

Potential improvements:

- [ ] AI-powered responses using OpenAI/Claude
- [ ] Chat history persistence
- [ ] File/image sharing
- [ ] Voice messages
- [ ] Multi-language support
- [ ] Analytics dashboard
- [ ] Live agent handoff
- [ ] FAQ search functionality

## Support

For questions or issues with the chatbot:

1. Check predefined responses
2. Use quick reply buttons
3. Contact admin for complex queries

---

**Version**: 1.0.0  
**Last Updated**: November 1, 2025  
**Component Path**: `/src/components/common/Chatbot.tsx`
