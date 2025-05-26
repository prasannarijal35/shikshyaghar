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
    <div className="h-screen bg-primary flex items-center justify-center">
      <div className="bg-white w-full max-w-6xl rounded-3xl shadow-lg flex flex-col lg:flex-row items-center justify-between p-10 space-y-10 lg:space-y-0 lg:space-x-10">
        {/* Left Side (Illustration + Small Images) */}
        <div className="flex-1 flex flex-col items-center relative w-[320px] h-[320px]">
          {/* Main Image */}
          <Image
            src={main}
            alt="404 illustration"
            width={300}
            height={300}
            className="object-contain z-10"
          />

          {/* Top-Left Animated Image */}
          <Image
            src={first}
            alt="Emoji"
            width={100}
            height={100}
            className="object-contain absolute top-2 left-2 animate-float-slow"
          />

          {/* Top-Right Animated Image */}
          <Image
            src={forth}
            alt="What 1"
            width={100}
            height={100}
            className="object-contain absolute top-2 right-2 animate-float-fast"
          />

          {/* Bottom-Left Animated Image */}
          <Image
            src={second}
            alt="Big What"
            width={100}
            height={100}
            className="object-contain absolute bottom-2 left-2 animate-float-slow"
          />

          {/* Bottom-Right Animated Image */}
          <Image
            src={third}
            alt="Cloud"
            width={100}
            height={100}
            className="object-contain absolute bottom-2 right-3 animate-float-fast"
          />
        </div>

        {/* Right Side (Text and Links) */}
        <div className="flex-1 text-center lg:text-left space-y-4">
          <h1 className="text-5xl font-bold text-primary">ERROR</h1>
          <h2 className="text-8xl font-extrabold text-gray-900">404</h2>
          <p className="text-gray-600 text-lg">
            Oops... sorry we couldn’t find your page.
          </p>
          <p className="text-gray-500 max-w-md mx-auto lg:mx-0">
            The page you’re looking for might have been removed or doesn’t
            exist.
          </p>
          <Link href="/" passHref legacyBehavior>
            <a className="inline-block bg-primary text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-yellow-500 transition duration-300">
              Back Home
            </a>
          </Link>

          {/* Social Icons */}
          <div className="flex space-x-5 text-2xl mt-6 justify-center lg:justify-start">
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
