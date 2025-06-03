import React from "react";

const MyClasses = () => {
  const classes = [
    {
      id: 1,
      name: "Mathematics 101",
      instructor: "Dr. Alice Johnson",
      schedule: "Mon & Wed 9:00 - 10:30 AM",
      status: "Enrolled",
    },
    {
      id: 2,
      name: "Introduction to Physics",
      instructor: "Prof. Mark Lee",
      schedule: "Tue & Thu 11:00 - 12:30 PM",
      status: "Enrolled",
    },
    {
      id: 3,
      name: "History of Art",
      instructor: "Ms. Clara Benson",
      schedule: "Fri 2:00 - 4:00 PM",
      status: "Waitlisted",
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">📘 My Classes</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-md rounded-2xl p-4 space-y-2"
          >
            <h2 className="text-xl font-semibold">{course.name}</h2>
            <p className="text-sm text-gray-600">
              Instructor: {course.instructor}
            </p>
            <p className="text-sm text-gray-600">{course.schedule}</p>
            <div className="flex justify-between items-center pt-3">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  course.status === "Enrolled"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {course.status}
              </span>
              <button className="px-4 py-2 text-sm rounded-xl font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClasses;
