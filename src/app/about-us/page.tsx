import Image from "next/image";
import React from "react";
import image1 from "@/assets/about-us/aboutus.png";

export default function page() {
  return (
    <div className="container bg-primary">
      <div className="flex ">
        <div>
          <Image className="w-full h- rounded-md" src={image1} alt="logo" />
        </div>
        <div>
          <h1>About us</h1>
          <h2>
            Bridging knowledge and opportunity through seamless connections.
          </h2>
        </div>
      </div>
    </div>
  );
}
