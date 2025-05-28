import Image from "next/image";
import logo from "@/assets/logo/Sg_logo.png";

export default function Aside({ isOpen }: { isOpen: boolean }) {
  return (
    <aside
      className={`w-64 h-screen bg-white shadow-md fixed top-0 left-0 z-20 flex flex-col transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-6">
        <Image
          src={logo}
          alt="TailAdmin Logo"
          width={150}
          height={40}
          priority
        />
      </div>
    </aside>
  );
}
