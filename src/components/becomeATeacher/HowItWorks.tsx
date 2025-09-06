import { Check, ShieldCheck, Play } from "lucide-react";

const steps = [
  {
    number: 1,
    color: "blue",
    title: "Register & Apply",
    text: "Fill out our simple registration form with your qualifications and teaching experience. Takes less than 5 minutes.",
    detail: "Quick application process",
    icon: Check,
  },
  {
    number: 2,
    color: "yellow",
    title: "Get Verified",
    text: "Our team reviews your application and credentials. Most applications are approved within 24-48 hours.",
    detail: "Fast verification process",
    icon: ShieldCheck,
  },
  {
    number: 3,
    color: "green",
    title: "Start Teaching",
    text: "Create your courses, set your schedule, and start connecting with students. Begin earning immediately.",
    detail: "Instant course creation",
    icon: Play,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Your Journey as a{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-yellow-500">
              Teacher
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started is simple. Follow these three steps to begin your
            teaching journey with us.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {steps.map((step, index) => (
            <div key={index} className="text-center lg:text-left">
              <div className="relative">
                <div
                  className={`w-20 h-20 bg-${step.color}-100 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6`}
                >
                  <span className={`text-2xl font-bold text-${step.color}-600`}>
                    {step.number}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-20 w-32 h-0.5 bg-gray-200"></div>
                )}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{step.text}</p>
              <div className="flex items-center space-x-3 justify-center lg:justify-start">
                <step.icon className="text-green-500 w-5 h-5" />
                <span className="text-sm text-gray-600">{step.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
