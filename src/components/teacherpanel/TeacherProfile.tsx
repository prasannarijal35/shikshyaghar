// import Image from "next/image";
// import { Teacher } from "@/types/teacher";

// interface Props {
//   teacher: Teacher;
// }

// export default function TeacherProfileCard({ teacher }: Props) {
//   return (
//     <div className="rounded-2xl shadow bg-white overflow-hidden">
//       {/* Cover Image Placeholder */}
//       <div className="h-40 bg-gradient-to-r from-green-100 to-blue-100"></div>

//       <div className="p-6 md:p-10 flex flex-col gap-8">
//         {/* Profile Photo */}
//         <div className="-mt-20">
//           <Image
//             src={teacher.photo}
//             alt={teacher.name}
//             width={120}
//             height={120}
//             className="rounded-xl border-4 border-white shadow-md object-cover"
//           />
//         </div>

//         {/* Name and Info */}
//         <div className="flex flex-col md:flex-row justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold mb-1">{teacher.name}</h1>
//             <div className="text-sm text-gray-700 flex flex-col sm:flex-row sm:items-center sm:gap-4">
//               <span className="font-medium">{teacher.education}</span>
//               <span className="text-green-600">
//                 {teacher.teachingExperience} of experience
//               </span>
//               <span className="text-gray-600">| {teacher.gradeRange}</span>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-3 items-center">
//             <button className="border px-4 py-1 rounded-md hover:bg-gray-100 text-sm">
//               ❤️ Save
//             </button>
//             <button className="border px-4 py-1 rounded-md hover:bg-gray-100 text-sm">
//               Ask questions
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="flex flex-wrap gap-4 text-sm text-gray-800">
//           <div className="flex items-center gap-1">
//             ⭐ <span className="font-bold">{teacher.rating.toFixed(1)}</span>{" "}
//             (16 Reviews)
//           </div>
//           <div className="flex items-center gap-1">
//             👥 <span className="font-bold">40+</span> Mentees
//           </div>
//           <div className="flex items-center gap-1">📍 {teacher.city}</div>
//         </div>

//         {/* Skills */}
//         <div className="flex flex-col gap-2">
//           <h3 className="text-lg font-semibold">Subjects</h3>
//           <div className="flex flex-wrap gap-2">
//             {teacher.subjects.map((subject, idx) => (
//               <span
//                 key={idx}
//                 className="bg-gray-100 text-sm px-3 py-1 rounded-full text-gray-800"
//               >
//                 {subject}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* About Section */}
//         <div className="flex flex-col gap-2">
//           <h3 className="text-lg font-semibold">About</h3>
//           <p className="text-sm text-gray-700">{teacher.about}</p>
//         </div>

//         {/* Badge */}
//         <div>
//           <span className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
//             🔁 Quick Responder
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";

export default function TeacherProfile() {
  return <div>hello</div>;
}
