"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Send,
  MessageSquare,
  Loader2,
  Users,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { toast } from "react-hot-toast";
import useMessageService from "@/services/messageServices";
import { Message, Conversation } from "@/types/message";
import { getUser } from "@/utils/localStorage";

const StudentDirectMessageChat: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const messageService = useMessageService();
  const currentUser = getUser();

  // Fetch conversations list
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await messageService.getConversations();
        setConversations(data || []);

        // Auto-select first conversation if available
        if (data && data.length > 0 && !selectedUserId) {
          setSelectedUserId(data[0].otherUser.id);
        }
      } catch (err) {
        console.error("fetchConversations error:", err);
        toast.error("Failed to fetch conversations");
      }
    };

    fetchConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch messages when user is selected
  const fetchMessages = useCallback(
    async (
      page: number = 1,
      append: boolean = false,
      silent: boolean = false
    ) => {
      if (!selectedUserId) return;

      try {
        if (!silent) {
          setLoading(true);
        }
        const response = await messageService.getMessages(
          selectedUserId,
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

        // Mark unread messages as read
        if (!silent) {
          const unreadIds = response.messages
            .filter((m) => !m.read && m.receiverId === currentUser?.id)
            .map((m) => m.id);

          if (unreadIds.length > 0) {
            await messageService.markAsRead({ messageIds: unreadIds });
            // Update conversations to reflect read status
            const updatedConvs = await messageService.getConversations();
            setConversations(updatedConvs || []);
          }
        }
      } catch (err: any) {
        console.error("fetchMessages error:", err);
        console.error("Error response:", err?.response?.data);
        console.error("Error status:", err?.response?.status);
        if (!silent) {
          if (err?.response?.status === 403) {
            toast.error(
              "You need an active subscription to message this teacher"
            );
          } else if (err?.response?.status === 404) {
            toast.error("No subscription found with this teacher");
          } else {
            const errorMsg =
              err?.response?.data?.message || "Failed to load messages";
            toast.error(errorMsg);
          }
        }
      } finally {
        if (!silent) {
          setLoading(false);
        }
      }
    },
    [selectedUserId, currentUser, messageService]
  );

  // Load messages when user changes
  useEffect(() => {
    if (selectedUserId) {
      setIsInitialLoad(true);
      setMessages([]);
      fetchMessages(1, false, false);

      // Clear any existing polling interval
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUserId]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Poll for new messages every 10 seconds
  useEffect(() => {
    if (!selectedUserId || isInitialLoad) return;

    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }

    pollingIntervalRef.current = setInterval(() => {
      fetchMessages(1, false, true); // Silent fetch
    }, 10000);

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUserId, isInitialLoad]);

  // Send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !selectedUserId) return;

    if (newMessage.length > 5000) {
      toast.error("Message is too long (max 5000 characters)");
      return;
    }

    try {
      setSending(true);
      const message = await messageService.sendMessage({
        receiverId: selectedUserId,
        message: newMessage.trim(),
      });

      setMessages((prev) => [...prev, message]);
      setNewMessage("");
      scrollToBottom();

      // Refresh conversations to update last message
      const updatedConvs = await messageService.getConversations();
      setConversations(updatedConvs || []);
    } catch (err: any) {
      console.error(err);
      if (err?.response?.status === 403) {
        toast.error("You need an active subscription to message this teacher");
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
      fetchMessages(currentPage + 1, true, false);
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
            You must be logged in as a student to access direct messages.
          </p>
        </div>
      </div>
    );
  }

  const selectedConversation = conversations.find(
    (c) => c.otherUser.id === selectedUserId
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Direct Messages
              </h1>
              <p className="text-gray-600">
                Private conversations with your teachers
              </p>
            </div>
          </div>
        </div>

        {conversations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Conversations Yet
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              You don&apos;t have any message conversations yet. Subscribe to a
              teacher&apos;s class to start messaging!
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar - Conversations List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Conversations
                </h2>
                <div className="space-y-2">
                  {conversations.map((conv) => (
                    <button
                      key={conv.subscriptionId}
                      onClick={() => setSelectedUserId(conv.otherUser.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all relative ${
                        selectedUserId === conv.otherUser.id
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-semibold text-sm truncate">
                          {conv.otherUser.fullName}
                        </div>
                        {conv.unreadCount > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                      <div
                        className={`text-xs truncate ${
                          selectedUserId === conv.otherUser.id
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        {conv.lastMessage?.message || "No messages yet"}
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
                {selectedConversation && (
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedUserId(null)}
                        className="lg:hidden p-2 hover:bg-white/20 rounded-lg transition"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <div>
                        <h2 className="text-xl font-bold">
                          {selectedConversation.otherUser.fullName}
                        </h2>
                        <p className="text-sm text-blue-100">
                          Teacher • {selectedConversation.otherUser.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                        <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          No messages yet. Start the conversation!
                        </p>
                      </div>
                    </div>
                  ) : (
                    messages.map((msg) => {
                      const isMyMessage = msg.senderId === currentUser?.id;

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
                                : "bg-gray-100 text-gray-900"
                            } rounded-2xl p-4 shadow-md`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`font-semibold text-sm ${
                                  isMyMessage ? "text-white" : "text-gray-800"
                                }`}
                              >
                                {isMyMessage ? "You" : msg.sender.fullName}
                              </span>
                              {!isMyMessage && (
                                <span className="px-2 py-0.5 bg-green-600 text-white text-xs rounded-full">
                                  Teacher
                                </span>
                              )}
                            </div>
                            <p className="text-sm break-words">{msg.message}</p>
                            <p
                              className={`text-xs mt-2 ${
                                isMyMessage ? "text-blue-100" : "text-gray-500"
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
                {selectedUserId && (
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

export default StudentDirectMessageChat;
