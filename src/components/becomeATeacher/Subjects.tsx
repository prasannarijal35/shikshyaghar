import {
  Calculator,
  FlaskConical,
  Code,
  Globe,
  Music,
  Palette,
} from "lucide-react";

const subjects = [
  { icon: Calculator, color: "blue", name: "Mathematics" },
  { icon: FlaskConical, color: "green", name: "Science" },
  { icon: Code, color: "purple", name: "Programming" },
  { icon: Globe, color: "red", name: "Languages" },
  { icon: Music, color: "yellow", name: "Music" },
  { icon: Palette, color: "indigo", name: "Arts" },
];

const Subjects = () => {
  return (
    <section className="py-20">
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover-lift text-center"
            >
              <div
                className={`w-16 h-16 bg-${subject.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4`}
              >
                <subject.icon className={`text-${subject.color}-600 w-8 h-8`} />
              </div>
              <h4 className="font-bold text-lg">{subject.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Subjects;
