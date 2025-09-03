import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  title: string;
  subTitle?: string;
  subTitleLink?: string;
  description?: string;
}

export default function Breadcrumb({
  title,
  subTitle,
  subTitleLink,
  description,
}: BreadcrumbProps) {
  return (
    <section className="relative mt-16 py-12 md:py-5 overflow-hidden">
      {/* Custom Background with your theme colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#08ade6] via-[#08ade6]/80 to-[#c72b32]/20">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #ffffff 2px, transparent 2px), radial-gradient(circle at 75% 75%, #ffffff 2px, transparent 2px)`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        {/* Animated overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-6 md:p-10 shadow-lg">
          {/* Breadcrumb Navigation */}
          <nav
            className="flex items-center justify-center space-x-3 text-sm mb-6 text-white/95"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="flex items-center hover:text-white transition-all duration-300 transform hover:scale-105 hover:bg-white/10 px-2 py-1 rounded"
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>

            {subTitle && (
              <>
                <ChevronRight className="w-4 h-4 text-white/70" />
                <Link
                  href={subTitleLink || "#"}
                  className="hover:text-white transition-all duration-300 transform hover:scale-105 hover:bg-white/10 px-2 py-1 rounded"
                >
                  {subTitle}
                </Link>
              </>
            )}

            <ChevronRight className="w-4 h-4 text-white/70" />
            <span className="text-white font-semibold bg-[#c72b32]/30 border border-[#c72b32]/40 px-3 py-1 rounded-full">
              {title}
            </span>
          </nav>

          {/* Title and Description */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-md">
              {title}
            </h1>

            {description && (
              <p className="text-white/95 text-base md:text-lg leading-relaxed max-w-3xl mx-auto drop-shadow-sm">
                {description}
              </p>
            )}
          </div>

          {/* Decorative accent line with your secondary color */}
          <div className="mt-6 flex justify-center">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#c72b32] to-transparent rounded-full opacity-80"></div>
          </div>
        </div>
      </div>

      {/* Subtle floating accents using your theme colors */}
      <div className="absolute top-1/4 left-1/6 w-3 h-3 bg-[#c72b32]/40 rounded-full blur-sm animate-bounce"></div>
      <div
        className="absolute top-1/2 right-1/4 w-2 h-2 bg-white/30 rounded-full blur-sm animate-bounce"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-[#08ade6]/60 rounded-full blur-sm animate-bounce"
        style={{ animationDelay: "2s" }}
      ></div>
    </section>
  );
}
