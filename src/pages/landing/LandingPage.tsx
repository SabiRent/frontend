import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import PainPointBar from "@/components/landing/PainPointsBar";
import WhyUsSection from "@/components/landing/WhyUsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import Footer from "@/components/layout/Footer";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <PainPointBar />
      <WhyUsSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
