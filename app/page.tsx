import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Theme from "@/components/sections/Theme";
import Objectives from "@/components/sections/Objectives";
import Tracks from "@/components/sections/Tracks";
import Dates from "@/components/sections/Dates";
import Guidelines from "@/components/sections/Guidelines";
import Fees from "@/components/sections/Fees";
import Publication from "@/components/sections/Publication";
import Institutions from "@/components/sections/Institutions";
import Committee from "@/components/sections/Committee";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Marquee />
        <Theme />
        <Objectives />
        <Tracks />
        <Dates />
        <Guidelines />
        <Fees />
        <Publication />
        <Institutions />
        <Committee />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
