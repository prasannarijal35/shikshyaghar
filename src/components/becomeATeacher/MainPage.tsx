import Hero from "./Hero";
import WhyJoinUs from "./WhyJoinUs";
import HowItWorks from "./HowItWorks";
// import SuccessStories from "./SuccessStories";
import Subjects from "./Subjects";
import FAQ from "./FAQ";
import FinalCTA from "./FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyJoinUs />
      <HowItWorks />
      {/* <SuccessStories /> */}
      <Subjects />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
