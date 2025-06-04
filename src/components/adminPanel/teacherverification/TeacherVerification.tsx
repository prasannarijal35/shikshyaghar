'use client';

import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import photo from '@/assets/teachers/teacher1.png';

type Teacher = {
  id: string;
  name: string;
  email: string;
  subject: string;
  isVerified: boolean;
  image: string | StaticImageData;
};

const dummyTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Anjali Sharma',
    email: 'anjali@example.com',
    subject: 'Mathematics',
    isVerified: false,
    image: photo,
  },
  {
    id: '2',
    name: 'Ramesh Thapa',
    email: 'ramesh@example.com',
    subject: 'Science',
    isVerified: false,
    image: photo,
  },
  {
    id: '3',
    name: 'Sita Gurung',
    email: 'sita@example.com',
    subject: 'English',
    isVerified: false,
    image: photo,
  },
];

export default function TeacherVerification() {
  const [teachers, setTeachers] = useState<Teacher[]>(dummyTeachers);

  const approveTeacher = (id: string) => {
    setTeachers(prev => prev.filter(teacher => teacher.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl text-primary font-bold mb-6">Pending Teacher Verifications</h1>

      {teachers.length === 0 ? (
        <p className="text-gray-500">No pending teacher profiles to verify.</p>
      ) : (
        <div className="grid gap-4">
          {teachers.map((teacher, index) => (
            <div
              key={teacher.id}
              className="border border-gray-200 rounded-lg p-4 flex justify-between items-center bg-white shadow-sm"
            >
              {/* Left: SN + Photo + Info */}
              <div className="flex items-center gap-4">
                <div className="font-semibold w-6 text-gray-700">{index + 1}.</div>
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  width={60}
                  height={60}
                  className="w-15 h-15 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-lg text-gray-800 font-semibold">{teacher.name}</h2>
                  <p className="text-sm text-gray-600">{teacher.email}</p>
                  <p className="text-sm">Subject: {teacher.subject}</p>
                </div>
              </div>

              {/* Right: Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => alert(`Viewing profile for ${teacher.name}`)}
                  className="bg-gray-500 text-white font-medium px-4 py-2 rounded-md hover:bg-white border border-gray-500 hover:text-gray-600 transition duration-200 cursor-pointer"
                >
                  View Profile
                </button>
                <button
                  onClick={() => approveTeacher(teacher.id)}
                  className="bg-primary text-white font-medium px-4 py-2 rounded-md border border-primary transition duration-200 hover:bg-white hover:text-primary cursor-pointer"
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}