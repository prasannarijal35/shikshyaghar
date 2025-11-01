"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { getUser } from "@/utils/localStorage";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  options?: string[];
}

interface ChatbotProps {
  userRole: "student" | "teacher";
}

const studentQuickReplies = [
  "How do I find teachers?",
  "How to subscribe?",
  "What is Community?",
  "How to message teachers?",
  "View my classes",
  "Payment methods",
];

const teacherQuickReplies = [
  "How to add subjects?",
  "View my students",
  "How to post reviews?",
  "Subscription management",
  "Community features",
  "How to verify account?",
];

const studentResponses: Record<string, string> = {
  "How do I find teachers?":
    "To find teachers:\n1. Go to 'Find Teachers' from the sidebar\n2. Browse teachers by subject or grade\n3. View teacher profiles and reviews\n4. Click 'Subscribe' to enroll with a teacher",
  "How to subscribe?":
    "To subscribe to a teacher:\n1. Find a teacher you like\n2. Click on their profile\n3. Choose a subscription plan\n4. Complete payment\n5. Start learning immediately!",
  "What is Community?":
    "Community is a group chat feature where you can:\n• Discuss with classmates in the same subject\n• Ask questions to your teacher\n• Share learning resources\n• Collaborate on assignments\nAccess it from the 'Community' menu!",
  "How to message teachers?":
    "To message teachers directly:\n1. Go to 'Messages' in the sidebar\n2. Select a teacher you're subscribed to\n3. Start a private conversation\n4. Messages are only available with active subscriptions",
  "View my classes":
    "To view your classes:\n1. Click 'My Classes' in the sidebar\n2. See all your enrolled subjects\n3. Access class materials and schedules\n4. Track your progress",
  "Payment methods":
    "We accept:\n• Credit/Debit Cards\n• eSewa\n• Khalti\n• Bank Transfer\nAll payments are secure and encrypted. You'll receive instant confirmation!",
  greeting:
    "Hello! 👋 I'm your ShikshyaGhar assistant. I'm here to help you navigate the platform, find teachers, manage subscriptions, and answer any questions you have. How can I help you today?",
  thanks:
    "You're welcome! 😊 If you have any more questions, feel free to ask. Happy learning!",
  bye: "Goodbye! 👋 Have a great day and happy learning! Feel free to come back anytime you need help.",
  default:
    "I'm not sure about that, but I can help you with:\n• Finding teachers\n• Subscription process\n• Using Community features\n• Messaging teachers\n• Viewing your classes\n• Payment information\n\nPlease select from the quick replies below!",
};

const teacherResponses: Record<string, string> = {
  "How to add subjects?":
    "To add subjects you teach:\n1. Go to 'My Classes' in the sidebar\n2. Click 'Add New Subject'\n3. Select grade and subject\n4. Set your pricing and schedule\n5. Wait for admin approval\n\nOnce approved, students can subscribe!",
  "View my students":
    "To view your students:\n1. Click 'Students' in the sidebar\n2. See all enrolled students\n3. View student profiles\n4. Track subscription status\n5. Access student contact information",
  "How to post reviews?":
    "To post reviews:\n1. Go to 'Post Reviews' in the sidebar\n2. Write feedback about your teaching experience\n3. Share success stories\n4. Highlight student achievements\n\nReviews help build your reputation and attract more students!",
  "Subscription management":
    "Manage subscriptions through:\n• 'Subscribers' menu - See active subscribers\n• Track payment history\n• View subscription dates\n• Monitor student engagement\n• Send reminders for renewals",
  "Community features":
    "Community allows you to:\n• Create group discussions by subject\n• Answer student questions\n• Share announcements\n• Post study materials\n• Engage with multiple students at once\n\nAccess from 'Community' in the sidebar!",
  "How to verify account?":
    "Account verification process:\n1. Submit required documents to admin\n2. Wait for admin review\n3. Receive verification email\n4. Start teaching!\n\nVerified teachers get priority in search results and can set higher rates.",
  greeting:
    "Hello Teacher! 👋 Welcome to ShikshyaGhar. I'm here to assist you with managing your classes, students, subscriptions, and all platform features. How can I help you today?",
  thanks:
    "You're welcome! 😊 If you have any more questions, feel free to ask. Happy teaching!",
  bye: "Goodbye! 👋 Have a great day and happy teaching! Feel free to come back anytime you need assistance.",
  default:
    "I'm here to help! I can assist you with:\n• Adding and managing subjects\n• Viewing your students\n• Posting reviews\n• Managing subscriptions\n• Community features\n• Account verification\n\nPlease select from the options below!",
};

export default function Chatbot({ userRole }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = getUser();

  const quickReplies =
    userRole === "student" ? studentQuickReplies : teacherQuickReplies;
  const responses =
    userRole === "student" ? studentResponses : teacherResponses;

  useEffect(() => {
    // Send greeting message when chatbot opens
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(responses.greeting, quickReplies);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addBotMessage = (text: string, options?: string[]) => {
    const botMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "bot",
      timestamp: new Date(),
      options,
    };
    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  const addUserMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
  };

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    addUserMessage(text);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      // Check for common greetings and thanks
      const lowerText = text.toLowerCase();
      let response = responses.default;

      if (
        lowerText.includes("thank") ||
        lowerText.includes("thanks") ||
        lowerText.includes("appreciate")
      ) {
        response = responses.thanks;
      } else if (
        lowerText.includes("bye") ||
        lowerText.includes("goodbye") ||
        lowerText.includes("see you")
      ) {
        response = responses.bye;
      } else if (
        lowerText.includes("hello") ||
        lowerText.includes("hi") ||
        lowerText.includes("hey")
      ) {
        response = responses.greeting;
      } else {
        response = responses[text] || responses.default;
      }

      addBotMessage(response, quickReplies);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!currentUser) return null;

  return (
    <>
      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
            userRole === "student"
              ? "bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              : "bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          }`}
        >
          <MessageCircle className="w-6 h-6 text-white" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div
            className={`p-4 text-white ${
              userRole === "student"
                ? "bg-gradient-to-r from-blue-500 to-purple-600"
                : "bg-gradient-to-r from-green-500 to-emerald-600"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">ShikshyaGhar Assistant</h3>
                  <p className="text-xs text-white/80">
                    {userRole === "student"
                      ? "Student Support"
                      : "Teacher Support"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-2 max-w-[85%] ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === "user"
                        ? userRole === "student"
                          ? "bg-blue-500"
                          : "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-gray-700" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div>
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        message.sender === "user"
                          ? userRole === "student"
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                            : "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                          : "bg-white text-gray-800 shadow-md"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">
                        {message.text}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 px-2">
                      {formatTime(message.timestamp)}
                    </p>

                    {/* Quick Reply Options */}
                    {message.sender === "bot" && message.options && (
                      <div className="mt-2 space-y-2">
                        {message.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickReply(option)}
                            className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-all hover:shadow-md ${
                              userRole === "student"
                                ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                                : "bg-green-50 text-green-700 hover:bg-green-100"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-gray-700" />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl shadow-md">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className={`p-2 rounded-lg text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  userRole === "student"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
