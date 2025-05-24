
import { Blogs } from "../blogs";

export default function Home() {
  return (
    <div className="flex   container  mb-20">
      <Blogs />
    </div>

import { HeroSection } from "@/components/home";
import { Header } from "../common/header";
import banner1 from "@/assets/bannerimages/banner1.jpg"; // Adjust the path as needed
import MainPage from "./MainPage";

export default function Home() {
  return (
    <>
      <Header />
      <section
        className="h-screen w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${banner1.src})` }}
      >
        <div className="pt-16">
          <HeroSection />
        </div>
      </section>
      <MainPage />
    </>

  );
}
