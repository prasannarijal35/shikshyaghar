// // src/components/ChatBox.tsx
// "use client";

// import { useEffect, useState, useRef } from "react";
// import messageService, { Message } from "@/services/messageServices";
// // import { io, Socket } from "socket.io-client";

// interface ChatBoxProps {
//   subscriptionId: number;
//   userId: number;
//   userRole: "STUDENT" | "TEACHER";
//   otherUserId: number;
// }

// const ChatBox = ({
//   subscriptionId,
//   userId,
//   userRole,
//   otherUserId,
// }: ChatBoxProps) => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const socketRef = useRef<Socket | null>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Scroll to latest message
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     // Fetch chat history
//     const fetchMessages = async () => {
//       try {
//         const msgs = await messageService.getMessages(subscriptionId);
//         setMessages(msgs);
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };
//     fetchMessages();

//     // Initialize Socket.IO
//     const socketClient = io(`${process.env.NEXT_PUBLIC_API_URL}`);

//     // Join personal room for private messages
//     socketClient.emit("joinUser", userId);

//     // Listen for new messages for this subscription
//     socketClient.on("newPrivateMessage", (msg: Message) => {
//       if (msg.subscriptionId === subscriptionId) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     });

//     // Listen for any error messages
//     socketClient.on("errorMessage", (msg: string) => {
//       console.warn("Socket error:", msg);
//     });

//     socketRef.current = socketClient;

//     return () => {
//       socketClient.disconnect();
//     };
//   }, [subscriptionId, userId]);

//   const handleSend = async () => {
//     if (!newMessage.trim()) return;

//     try {
//       const msg = await messageService.sendMessage({
//         senderId: userId,
//         receiverId: otherUserId,
//         message: newMessage,
//         senderRole: userRole,
//       });

//       setMessages((prev) => [...prev, msg]);
//       setNewMessage("");

//       // Emit via socket for immediate UI update (optional)
//       socketRef.current?.emit("sendMessage", {
//         senderId: userId,
//         subscriptionId,
//         message: newMessage,
//       });
//     } catch (error: any) {
//       console.error("Error sending message:", error?.response?.data || error);
//       alert(error?.response?.data?.message || "Failed to send message");
//     }
//   };

//   return (
//     <div style={{ border: "1px solid #ccc", padding: "1rem", maxWidth: 500 }}>
//       <div style={{ maxHeight: 300, overflowY: "auto", marginBottom: "1rem" }}>
//         {messages.map((m) => (
//           <div
//             key={m.id}
//             style={{
//               textAlign: m.senderId === userId ? "right" : "left",
//               margin: "0.5rem 0",
//             }}
//           >
//             <strong>{m.sender?.fullName}:</strong> {m.message}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <div style={{ display: "flex", gap: "0.5rem" }}>
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           style={{ flex: 1 }}
//           placeholder="Type a message..."
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;
