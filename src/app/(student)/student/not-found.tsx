import Image from "next/image";
import main from "@/assets/extraimages/not_found.png";
import first from "@/assets/extraimages/notfound emoji.png";
import second from "@/assets/extraimages/not what 1.png";
import third from "@/assets/extraimages/notfound big what.png";
import forth from "@/assets/extraimages/notfound cloud.png";

import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-primary/15 flex items-center justify-center px-4 pt-8 pb-20">
      <div className="bg-white w-full max-w-6xl rounded-3xl shadow-lg flex flex-col lg:flex-row items-center lg:items-start justify-between p-6 sm:p-6 space-y-10 lg:space-y-0 lg:space-x-10">
        {/* Left Side (Illustration + Small Images) */}
        <div className="flex-1 flex items-center justify-center relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square mx-auto">
          {/* Main Image */}
          <Image
            src={main}
            alt="404 illustration"
            fill
            className="object-contain"
          />

          {/* Top-Left Animated Image */}
          <Image
            src={first}
            alt="Emoji"
            width={60}
            height={60}
            className="object-contain absolute top-2 left-2 animate-float-slow"
          />

          {/* Top-Right Animated Image */}
          <Image
            src={forth}
            alt="Cloud"
            width={60}
            height={60}
            className="object-contain absolute top-2 right-2 animate-float-fast"
          />

          {/* Bottom-Left Animated Image */}
          <Image
            src={second}
            alt="What 1"
            width={60}
            height={60}
            className="object-contain absolute bottom-2 left-2 animate-float-slow"
          />

          {/* Bottom-Right Animated Image */}
          <Image
            src={third}
            alt="Big What"
            width={60}
            height={60}
            className="object-contain absolute bottom-2 right-3 animate-float-fast"
          />
        </div>

        {/* Right Side (Text and Links) */}
        <div className="flex-1 text-center lg:text-left space-y-4 px-4 sm:px-0">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary">ERROR</h1>
          <h2 className="text-6xl sm:text-8xl font-extrabold text-gray-900">
            404
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Oops... sorry we couldn’t find your page.
          </p>
          <p className="text-gray-500 max-w-md mx-auto lg:mx-0 text-sm sm:text-base">
            The page you’re looking for might have been removed or doesn’t
            exist.
          </p>

          <Link
            href="/"
            className="inline-block bg-primary text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-white hover:text-primary hover:border-primary hover:border transition duration-300"
          >
            Back Home
          </Link>

          {/* Social Icons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xl sm:text-2xl mt-6">
            <Link
              href="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
              className="text-[#1877F2] hover:text-white bg-white hover:bg-[#1877F2] rounded-full p-3 shadow-md transition-colors duration-300"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
              className="text-[#E1306C] hover:text-white bg-white hover:bg-[#E1306C] rounded-full p-3 shadow-md transition-colors duration-300"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              aria-label="Twitter"
              className="text-[#1DA1F2] hover:text-white bg-white hover:bg-[#1DA1F2] rounded-full p-3 shadow-md transition-colors duration-300"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </Link>
            <Link
              href="https://youtube.com"
              target="_blank"
              aria-label="YouTube"
              className="text-[#FF0000] hover:text-white bg-white hover:bg-[#FF0000] rounded-full p-3 shadow-md transition-colors duration-300"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
