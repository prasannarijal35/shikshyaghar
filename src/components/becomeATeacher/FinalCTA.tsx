import { Zap, TrendingUp, Lock } from "lucide-react";
import Link from "next/link";

const FinalCTA = () => {
  return (
    <section
      id="registration"
      className="py-20 bg-gradient-to-br from-blue-500 to-purple-700"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8">
            Ready to Start Your{" "}
            <span className="text-yellow-300">Teaching Journey</span>?
          </h2>
          <p className="text-xl mb-12 opacity-90 leading-relaxed">
            Join thousands of educators who are already making a difference and
            earning a great living through online teaching. Your expertise is
            needed, and students are waiting to learn from you.
          </p>
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 glass-effect">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-yellow-300 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quick Setup</h3>
                <p className="opacity-80">Start teaching within 48 hours</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-yellow-300 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">High Earnings</h3>
                <p className="opacity-80">
                  Top teachers earn Rs.1,00,000+ monthly
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="text-yellow-300 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure & Free</h3>
                <p className="opacity-80">No hidden fees, no commitment</p>
              </div>
            </div>
            <Link
              href="/teacherRegister"
              className="bg-white text-blue-600 px-12 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transition-colors animate-[pulse_2s_ease-in-out_infinite] hover-lift"
            >
              Join ShikshyaGhar Today
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
