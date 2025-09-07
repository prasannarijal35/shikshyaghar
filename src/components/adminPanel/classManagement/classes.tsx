// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { toast } from "react-hot-toast";
// // import DeleteModal from "@/components/adminPanel/students/DeleteModal";
// import { LiveClass, ClassStatus } from "@/types/teacher/class";
// import { useAuth } from "@/context/AuthContext";
// import liveClassService from "@/services/liveClassServices";

// type SortBy = "grade" | "startTime" | "status";

// export default function LiveClassTable() {
//   const { token } = useAuth();
//   const [classes, setClasses] = useState<LiveClass[]>([]);
//   const [sortBy, setSortBy] = useState<SortBy>("grade");
//   const [filterGrade, setFilterGrade] = useState<string>("");
//   const [filterStatus, setFilterStatus] = useState<ClassStatus | "">("");
//   // const [showDeleteModal, setShowDeleteModal] = useState(false);
//   // const [selectedClass, setSelectedClass] = useState<LiveClass | null>(null);
//   const [loading, setLoading] = useState(true);

//   const computeStatus = (cls: LiveClass): ClassStatus => {
//     const start = new Date(cls.startTime);
//     const end = new Date(start.getTime() + cls.duration * 60000);
//     const now = new Date();
//     if (now < start) return ClassStatus.Upcoming;
//     if (now > end) return ClassStatus.Completed;
//     return ClassStatus.Live;
//   };

//   const fetchClasses = useCallback(async () => {
//     if (!token) return;
//     try {
//       setLoading(true);
//       const data = await liveClassService.getAllLiveClasses(token);
//       setClasses(data);
//     } catch (err) {
//       console.error("Failed to fetch classes", err);
//       toast.error("Failed to load classes");
//     } finally {
//       setLoading(false);
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchClasses();
//   }, [fetchClasses]);

//   // const handleDelete = async () => {
//   //   if (!selectedClass || !token) return;
//   //   try {
//   //     await liveClassService.deleteLiveClass(token, selectedClass.id);
//   //     setClasses(classes.filter((c) => c.id !== selectedClass.id));
//   //     toast.success(`Deleted ${selectedClass.title}`);
//   //     setShowDeleteModal(false);
//   //   } catch (err) {
//   //     console.error("Failed to delete class", err);
//   //     toast.error("Failed to delete class");
//   //   }
//   // };

//   const handleStart = (cls: LiveClass) => {
//     if (!cls.meetingLink) return toast.error("No meeting link!");
//     window.open(cls.meetingLink, "_blank");
//   };

//   const handleView = (cls: LiveClass) => {
//     toast(`Viewing ${cls.title}`);
//   };

//   const filteredSortedClasses = [...classes]
//     .filter((c) =>
//       filterGrade ? c.grade.toLowerCase() === filterGrade.toLowerCase() : true
//     )
//     .filter((c) => (filterStatus ? computeStatus(c) === filterStatus : true))
//     .sort((a, b) => {
//       if (sortBy === "grade") return a.grade.localeCompare(b.grade);
//       if (sortBy === "startTime")
//         return (
//           new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
//         );
//       if (sortBy === "status") {
//         const order: Record<ClassStatus, number> = {
//           Live: 0,
//           Upcoming: 1,
//           Completed: 2,
//         };
//         return order[computeStatus(a)] - order[computeStatus(b)];
//       }
//       return 0;
//     });

//   const grades = Array.from(new Set(classes.map((c) => c.grade)));

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
//       </div>
//     );

//   return (
//     <main className="min-h-screen p-6 bg-gray-50">
//       <h1 className="text-3xl font-bold text-primary mb-4">My Live Classes</h1>

//       {/* Filters & Sorting */}
//       <div className="mb-4 flex gap-3 items-center">
//         <span>Grade:</span>
//         <select
//           value={filterGrade}
//           onChange={(e) => setFilterGrade(e.target.value)}
//           className="border rounded p-1"
//         >
//           <option value="">All</option>
//           {grades.map((g) => (
//             <option key={g} value={g}>
//               {g}
//             </option>
//           ))}
//         </select>

//         <span>Status:</span>
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value as ClassStatus | "")}
//           className="border rounded p-1"
//         >
//           <option value="">All</option>
//           <option value={ClassStatus.Live}>Live</option>
//           <option value={ClassStatus.Upcoming}>Upcoming</option>
//           <option value={ClassStatus.Completed}>Completed</option>
//         </select>

//         <span>Sort by:</span>
//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value as SortBy)}
//           className="border rounded p-1"
//         >
//           <option value="grade">Grade</option>
//           <option value="startTime">Start Time</option>
//           <option value="status">Status</option>
//         </select>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded-lg overflow-hidden">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-4 px-4 text-left font-medium">ID</th>
//               <th className="py-4 px-4 text-left font-medium">Title</th>
//               <th className="py-4 px-4 text-left font-medium">Grade</th>
//               <th className="py-4 px-4 text-left font-medium">Subject</th>
//               <th className="py-4 px-4 text-left font-medium">Start Time</th>
//               <th className="py-4 px-4 text-left font-medium">Duration</th>
//               <th className="py-4 px-4 text-left font-medium">Status</th>
//               <th className="py-4 px-4 text-left font-medium">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="text-base">
//             {filteredSortedClasses.map((cls) => {
//               const status = computeStatus(cls);
//               const startDate = new Date(cls.startTime);
//               const dateStr = startDate.toLocaleDateString();
//               const timeStr = startDate.toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               });

//               return (
//                 <tr key={cls.id} className="border-t hover:bg-primary/10">
//                   <td className="py-5 px-4">{cls.id}</td>
//                   <td className="py-5 px-4">{cls.title}</td>
//                   <td className="py-5 px-4">{cls.grade}</td>
//                   <td className="py-5 px-4">{cls.subject}</td>
//                   <td className="py-5 px-4">
//                     {dateStr} • {timeStr}
//                   </td>
//                   <td className="py-5 px-4">{cls.duration} min</td>
//                   <td className="py-5 px-4">
//                     <span
//                       className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
//                         status === ClassStatus.Live
//                           ? "bg-green-100 text-green-700"
//                           : status === ClassStatus.Upcoming
//                           ? "bg-blue-100 text-blue-700"
//                           : "bg-gray-200 text-gray-600"
//                       }`}
//                     >
//                       {status}
//                     </span>
//                   </td>
//                   <td className="py-5 px-4">
//                     <div className="flex gap-3">
//                       <button
//                         onClick={() => handleStart(cls)}
//                         className="p-2 rounded-md bg-green-600 text-white hover:bg-green-700"
//                       >
//                         Start
//                       </button>
//                       <button
//                         onClick={() => handleView(cls)}
//                         className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
//                       >
//                         View
//                       </button>
//                       <button
//                         onClick={() => {
//                           setSelectedClass(cls);
//                           setShowDeleteModal(true);
//                         }}
//                         className="p-2 rounded-md bg-red-600 text-white hover:bg-red-700"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* <DeleteModal/ */}
//         {/* isOpen={showDeleteModal}
//         onClose={() => setShowDeleteModal(false)}
//         title="Confirm Deletion"
//         description={`Are you sure you want to delete ${selectedClass?.title}?`}
//         onConfirm={handleDelete}
//       /> */}
//     </main>
//   );
// }
