import {
  HelpCircle,
  DollarSign,
  Clock,
  Users,
  GraduationCap,
} from "lucide-react";

const faqs = [
  {
    icon: HelpCircle,
    color: "blue",
    question: "Do I need prior online teaching experience?",
    answer:
      "No prior online teaching experience is required. We provide comprehensive training, resources, and ongoing support to help you succeed. What matters most is your expertise in your subject area and passion for teaching.",
  },
  {
    icon: DollarSign,
    color: "green",
    question: "How do I get paid and when?",
    answer:
      "We offer multiple payment options including bank transfer, PayPal, and digital wallets. Payments are processed weekly, and you can track your earnings in real-time through your teacher dashboard.",
  },
  {
    icon: Clock,
    color: "blue",
    question: "Can I set my own schedule?",
    answer:
      "Absolutely! You have complete control over your teaching schedule. Set your availability, choose your teaching hours, and even take breaks whenever you need. Our platform is designed around your flexibility.",
  },
  {
    icon: Users,
    color: "purple",
    question: "What kind of support do you provide?",
    answer:
      "We provide 24/7 technical support, marketing assistance to help you attract students, teaching resources, and a dedicated teacher success team. You're never alone in your teaching journey with us.",
  },
  {
    icon: GraduationCap,
    color: "red",
    question: "What qualifications do I need?",
    answer:
      "Requirements vary by subject, but generally we look for relevant education, professional experience, or demonstrable expertise in your field. Teaching credentials are preferred but not always required.",
  },
];

const FAQ = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Frequently Asked{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-yellow-500">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Got questions? We&apost answers. Here are the most common questions
            from new teachers.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <faq.icon className={`text-${faq.color}-600 w-6 h-6 mr-3`} />
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
