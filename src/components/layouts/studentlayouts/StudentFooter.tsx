"use client";

export default function StudentFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-4 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left side - Copyright */}
        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ShikshaGhar. All rights reserved.
        </div>

        {/* Right side - Links */}
        <div className="flex items-center gap-6 text-sm">
          <a
            href="/privacy"
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="/support"
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
