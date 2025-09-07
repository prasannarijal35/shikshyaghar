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
      {/* Background using primary & secondary */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-secondary/20">
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
      <div className="relative  container mx-auto px-4">
        <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-6 md:p-10 shadow-lg">
          {/* Breadcrumb Navigation */}
          <nav
            className="flex items-center justify-center space-x-2 text-sm md:text-base mb-6 text-white/90"
            aria-label="Breadcrumb"
          >
            {/* Home */}
            <Link
              href="/"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 shadow-sm"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>

            {/* Divider */}
            {subTitle && (
              <>
                <ChevronRight className="w-4 h-4 text-white/70" />
                <Link
                  href={subTitleLink || "#"}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/20 transition-all duration-300 shadow-sm"
                >
                  {subTitle}
                </Link>
              </>
            )}

            {/* Divider + Current Page */}
            <ChevronRight className="w-4 h-4 text-white/70" />
            <span className="px-4 py-1.5 rounded-full font-semibold bg-secondary/30 border border-secondary/50 text-white shadow-md">
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

          {/* Decorative accent line with secondary */}
          <div className="mt-6 flex justify-center">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent rounded-full opacity-80"></div>
          </div>
        </div>
      </div>

      {/* Floating accents */}
      <div className="absolute top-1/4 left-1/6 w-3 h-3 bg-secondary/40 rounded-full blur-sm animate-bounce"></div>
      <div
        className="absolute top-1/2 right-1/4 w-2 h-2 bg-white/30 rounded-full blur-sm animate-bounce"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-primary/60 rounded-full blur-sm animate-bounce"
        style={{ animationDelay: "2s" }}
      ></div>
    </section>
  );
}
