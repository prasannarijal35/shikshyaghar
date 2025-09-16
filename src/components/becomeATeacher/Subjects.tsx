"use client";

import { useEffect, useState } from "react";
import subjectService, { Subject } from "@/services/subjectServices";
import {
  Calculator,
  FlaskConical,
  Code,
  Globe,
  Music,
  Palette,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Icon/color mapping for subjects
const subjectStyles: Record<string, { icon: any; color: string }> = {
  Mathematics: { icon: Calculator, color: "blue" },
  Physics: { icon: FlaskConical, color: "indigo" },
  Chemistry: { icon: FlaskConical, color: "green" },
  Science: { icon: FlaskConical, color: "green" },
  Programming: { icon: Code, color: "purple" },
  "Computer Science": { icon: Code, color: "purple" },
  Languages: { icon: Globe, color: "red" },
  Nepali: { icon: Globe, color: "red" },
  "Social Studies": { icon: Globe, color: "teal" },
  Music: { icon: Music, color: "yellow" },
  Arts: { icon: Palette, color: "pink" },
};

export default function Subjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await subjectService.getAllSubjects();
        setSubjects(data);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  if (loading) {
    return <p className="text-center">Loading subjects...</p>;
  }

  if (!subjects || subjects.length === 0) {
    return (
      <section className="py-20 text-center">
        <p className="text-gray-600">No subjects available</p>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#f9fafb]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            What Can You{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-yellow-500">
              Teach
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We welcome educators from all disciplines. Share your expertise in
            any subject area.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={4}
          pagination={{ clickable: true, el: ".custom-pagination" }}
          autoplay={{ delay: 4000 }}
          loop
          className="subject-swiper"
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 20 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
        >
          {subjects.map((subject) => {
            const style =
              subjectStyles[subject.name] || {
                icon: Calculator,
                color: "gray",
              };
            const Icon = style.icon;

            return (
              <SwiperSlide key={subject.id}>
                <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift text-center h-full flex flex-col justify-center">
                  <div
                    className={`w-16 h-16 bg-${style.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className={`text-${style.color}-600 w-8 h-8`} />
                  </div>
                  <h4 className="font-bold text-lg">{subject.name}</h4>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
