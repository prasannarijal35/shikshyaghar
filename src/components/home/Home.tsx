import { HeroSection } from "@/components/home";
import banner3 from "@/assets/bannerimages/banner1.jpg";
import MainPage from "./MainPage";

export default function Home() {
  return (
    <>
      <section
        className="h-screen w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${banner3.src})` }}
      >
        <div className="pt-16">
          <HeroSection />
        </div>
      </section>
      <MainPage />
    </>
  );
}
