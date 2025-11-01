"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Send,
  MessageCircle,
  Loader2,
  Users,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-hot-toast";
import useCommunityService from "@/services/communityServices";
import { CommunityMessage } from "@/types/community";
import { getUser } from "@/utils/localStorage";
import { SubscriptionType, SubscriptionStatus } from "@/types/subscription";
import useSubscriptionService from "@/services/subscriptionServices";
import Link from "next/link";

const CommunityChat: React.FC = () => {
  const [activeSubscriptions, setActiveSubscriptions] = useState<
    SubscriptionType[]
  >([]);
  const [selectedTeacherSubjectId, setSelectedTeacherSubjectId] = useState<
    number | null
  >(null);
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const communityService = useCommunityService();
  const subscriptionService = useSubscriptionService();
  const currentUser = getUser();

  // Fetch active subscriptions
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const data = await subscriptionService.getByStudentId(
          SubscriptionStatus.ACTIVE
        );
        setActiveSubscriptions(Array.isArray(data) ? data : []);

        // Auto-select first subscription if available
        if (data && data.length > 0 && !selectedTeacherSubjectId) {
          setSelectedTeacherSubjectId(data[0].teacherSubjectId);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch your active classes");
      }
    };

    fetchSubscriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch messages when teacher subject is selected
  const fetchMessages = useCallback(
    async (
      page: number = 1,
      append: boolean = false,
      silent: boolean = false
    ) => {
      if (!selectedTeacherSubjectId) return;

      try {
        if (!silent) {
          setLoading(true);
        }
        const response = await communityService.getMessages(
          selectedTeacherSubjectId,
          page,
          50
        );

        if (append) {
          setMessages((prev) => [...response.messages, ...prev]);
        } else {
          setMessages(response.messages);
        }

        setHasMore(response.pagination.page < response.pagination.totalPages);
        setCurrentPage(page);
        setIsInitialLoad(false);
      } catch (err: any) {
        console.error(err);
        if (!silent) {
          if (err?.response?.status === 403) {
            toast.error("Your subscription is not active for this class");
          } else {
            toast.error("Failed to load messages");
          }
        }
      } finally {
        if (!silent) {
          setLoading(false);
        }
      }
    },
    [selectedTeacherSubjectId, communityService]
  );

  // Load messages when teacher subject changes
  useEffect(() => {
    if (selectedTeacherSubjectId) {
      setIsInitialLoad(true);
      setMessages([]);
      fetchMessages(1, false, false);

      // Clear any existing polling interval
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeacherSubjectId]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Poll for new messages every 10 seconds (only when not loading initially)
  useEffect(() => {
    if (!selectedTeacherSubjectId || isInitialLoad) return;

    // Clear any existing interval
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }

    // Set up new polling interval
    pollingIntervalRef.current = setInterval(() => {
      fetchMessages(1, false, true); // Silent fetch
    }, 10000); // Increased to 10 seconds

    // Cleanup on unmount or when dependencies change
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeacherSubjectId, isInitialLoad]);

  // Send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !selectedTeacherSubjectId) return;

    if (newMessage.length > 5000) {
      toast.error("Message is too long (max 5000 characters)");
      return;
    }

    try {
      setSending(true);
      const message = await communityService.sendMessage({
        teacherSubjectId: selectedTeacherSubjectId,
        message: newMessage.trim(),
      });

      setMessages((prev) => [...prev, message]);
      setNewMessage("");
      scrollToBottom();
    } catch (err: any) {
      console.error(err);
      if (err?.response?.status === 403) {
        toast.error(
          "You must have an active subscription to send messages in this community"
        );
      } else {
        toast.error("Failed to send message");
      }
    } finally {
      setSending(false);
    }
  };

  // Load more messages
  const handleLoadMore = () => {
    if (hasMore && !loading) {
      fetchMessages(currentPage + 1, true);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / 60000);

    if (diffInMins < 1) return "Just now";
    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInMins < 1440) return `${Math.floor(diffInMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  if (!currentUser || currentUser.role !== "student") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600">
            You must be logged in as a student to access community chats.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Community Chat
              </h1>
              <p className="text-gray-600">
                Connect with your teachers and classmates
              </p>
            </div>
          </div>
        </div>

        {activeSubscriptions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Active Classes
            </h2>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              You need to have an active subscription to access community chats.
              Subscribe to a class to get started!
            </p>
            <Link href="/student/findteacher">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                Find Teachers & Subscribe
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar - Active Subscriptions */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Your Classes
                </h2>
                <div className="space-y-2">
                  {activeSubscriptions.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() =>
                        setSelectedTeacherSubjectId(sub.teacherSubjectId)
                      }
                      className={`w-full text-left p-3 rounded-xl transition-all ${
                        selectedTeacherSubjectId === sub.teacherSubjectId
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="font-semibold text-sm truncate">
                        {sub.subjectName}
                      </div>
                      <div
                        className={`text-xs ${
                          selectedTeacherSubjectId === sub.teacherSubjectId
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        {sub.gradeName} • {sub.teacherName}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-[calc(100vh-250px)]">
                {/* Chat Header */}
                {selectedTeacherSubjectId && (
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                    <h2 className="text-xl font-bold">
                      {
                        activeSubscriptions.find(
                          (s) => s.teacherSubjectId === selectedTeacherSubjectId
                        )?.subjectName
                      }
                    </h2>
                    <p className="text-sm text-blue-100">
                      {
                        activeSubscriptions.find(
                          (s) => s.teacherSubjectId === selectedTeacherSubjectId
                        )?.gradeName
                      }{" "}
                      •{" "}
                      {
                        activeSubscriptions.find(
                          (s) => s.teacherSubjectId === selectedTeacherSubjectId
                        )?.teacherName
                      }
                    </p>
                  </div>
                )}

                {/* Messages Container */}
                <div
                  ref={messagesContainerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4"
                >
                  {hasMore && (
                    <div className="text-center">
                      <button
                        onClick={handleLoadMore}
                        disabled={loading}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm disabled:opacity-50"
                      >
                        {loading ? "Loading..." : "Load older messages"}
                      </button>
                    </div>
                  )}

                  {loading && messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-center">
                      <div>
                        <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          No messages yet. Start the conversation!
                        </p>
                      </div>
                    </div>
                  ) : (
                    messages.map((msg) => {
                      const isMyMessage = msg.senderId === currentUser?.id;
                      const isTeacher = msg.sender.role === "teacher";

                      return (
                        <div
                          key={msg.id}
                          className={`flex ${
                            isMyMessage ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[70%] ${
                              isMyMessage
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                : isTeacher
                                ? "bg-gradient-to-r from-green-100 to-emerald-100 text-gray-900"
                                : "bg-gray-100 text-gray-900"
                            } rounded-2xl p-4 shadow-md`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`font-semibold text-sm ${
                                  isMyMessage
                                    ? "text-white"
                                    : isTeacher
                                    ? "text-green-800"
                                    : "text-gray-800"
                                }`}
                              >
                                {isMyMessage ? "You" : msg.sender.fullName}
                              </span>
                              {isTeacher && !isMyMessage && (
                                <span className="px-2 py-0.5 bg-green-600 text-white text-xs rounded-full">
                                  Teacher
                                </span>
                              )}
                            </div>
                            <p className="text-sm break-words">{msg.message}</p>
                            <p
                              className={`text-xs mt-2 ${
                                isMyMessage
                                  ? "text-blue-100"
                                  : isTeacher
                                  ? "text-green-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {formatDate(msg.createdAt)}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                {selectedTeacherSubjectId && (
                  <form
                    onSubmit={handleSendMessage}
                    className="border-t border-gray-200 p-4 bg-gray-50"
                  >
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        maxLength={5000}
                        className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim() || sending}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {sending ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Send className="w-5 h-5" />
                        )}
                        Send
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {newMessage.length}/5000 characters
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityChat;
