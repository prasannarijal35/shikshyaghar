import React from "react";
import { Blogs } from "@/components/blogs";
import OverlapMainpage from "./OverlapMainpage";
import ReviewSlider from "./Review";
import { dummyReviews } from "@/data/review";

export default function MainPage() {
  return (
    <>
      <OverlapMainpage />
      <ReviewSlider reviews={dummyReviews} />
      <Blogs />
    </>
  );
}
