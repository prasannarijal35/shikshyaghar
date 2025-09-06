import { Star } from "lucide-react";

const stories = [
  {
    initials: "SM",
    color: "blue",
    name: "Sarah Mitchell",
    role: "Mathematics Teacher",
    quote:
      '"Teaching on EduConnect has completely transformed my career. I now earn 3x more than my previous job while helping students worldwide. The flexibility is incredible!"',
  },
  {
    initials: "DK",
    color: "green",
    name: "David Kim",
    role: "Programming Instructor",
    quote:
      '"The tools and support provided are exceptional. I\'ve taught over 1000 students and the platform makes everything seamless. Highly recommend to fellow educators!"',
  },
  {
    initials: "AR",
    color: "purple",
    name: "Aisha Rahman",
    role: "Language Specialist",
    quote:
      '"Being able to teach students from different cultures has been incredibly rewarding. The platform\'s global reach has expanded my impact beyond my wildest dreams."',
  },
];

const SuccessStories = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Hear from Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-yellow-500">
              Teachers
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how educators like you are transforming their careers and
            making a global impact.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover-lift"
            >
              <div className="flex items-center mb-6">
                <div
                  className={`w-16 h-16 bg-${story.color}-500 rounded-full flex items-center justify-center mr-4`}
                >
                  <span className="text-white font-bold text-xl">
                    {story.initials}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">{story.name}</h4>
                  <p className="text-gray-600">{story.role}</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 italic">
                {story.quote}
              </p>
              <div className="flex items-center text-yellow-500">
                {Array(5)
                  .fill(null) // Corrected line
                  .map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
