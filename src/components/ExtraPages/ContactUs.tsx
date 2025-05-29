import Image from "next/image";
import Image1 from "@/assets/teachers/teacher1.png";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-yellow-100 container">
      <div className="relative w-full max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-900">
        {/* Left - Contact Info with Background Image */}
        <div className="relative space-y-6 overflow-hidden rounded-xl">
          {/* Background image absolutely positioned */}
          <div className="absolute inset-0 -z-10">
            <Image
              src={Image1}
              alt="Background"
              fill
              style={{ objectFit: "cover" }}
              className="opacity-30"
              priority
            />
            {/* Optional overlay to darken the image for text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-30" />
          </div>

          {/* Text content */}
          <h2 className="text-3xl font-semibold relative text-primary">Contact us</h2>
          <div className="relative">
            <p className="font-semibold">ADDRESS:</p>
            <p>Bagar 1, Pokhara, Kaski</p>
          </div>
          <div className="relative">
            <p className="font-semibold">PHONE:</p>
            <p>+977 9825162384</p>
          </div>
          <div className="relative">
            <p className="font-semibold">EMAIL:</p>
            <p>info@shikshyaghar.com</p>
          </div>
          <div className="relative">
            <p className="font-semibold">WEBSITE:</p>
            <p>shikshyaghar.com</p>
          </div>
        </div>

        {/* Right - Contact Form */}
        <div className="bg-white rounded-xl p-8 shadow-lg text-gray-900">
          <h3 className="text-2xl font-semibold mb-6 text-primary">Get in touch</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            ></textarea>
            <button
              type="submit"
              className="px-6 py-2 rounded-l-2xl rounded-r-2xl border border-primary text-white bg-primary font-medium  hover:text-primary hover:bg-white transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
