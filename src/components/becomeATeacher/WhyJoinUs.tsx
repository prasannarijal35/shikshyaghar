import { DollarSign, Clock, Users, Settings } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    color: "green",
    title: "Earn While Teaching",
    text: "Set your own rates and earn competitive income. Our top teachers earn $5,000+ monthly.",
  },
  {
    icon: Clock,
    color: "blue",
    title: "Flexible Schedule",
    text: "Teach when you want, from anywhere. Perfect work-life balance with complete schedule control.",
  },
  {
    icon: Users,
    color: "purple",
    title: "Global Reach",
    text: "Connect with thousands of eager learners worldwide. Impact lives beyond geographical boundaries.",
  },
  {
    icon: Settings,
    color: "yellow",
    title: "Advanced Tools",
    text: "Access cutting-edge teaching tools, analytics, and resources to enhance your teaching experience.",
  },
];

const WhyJoinUs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Why Teach on{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-yellow-500">
              EduConnect
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join a platform that values your expertise and provides everything
            you need to succeed as an online educator.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover-lift step-card"
            >
              <div
                className={`w-16 h-16 bg-${benefit.color}-100 rounded-2xl flex items-center justify-center mb-6`}
              >
                <benefit.icon className={`text-${benefit.color}-600 w-8 h-8`} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoinUs;
