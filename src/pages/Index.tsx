import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProgramsSection from "@/components/ProgramsSection";
import StatsSection from "@/components/StatsSection";
import FromPrincipalsDesk from "@/components/FromPrincipalsDesk";
import AchieversSection from "@/components/AchieversSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ContactSection from "@/components/ContactSection";
import AdmissionPopup from "@/components/AdmissionPopup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <AchieversSection />
      <FromPrincipalsDesk />
      <ProgramsSection /> 
      <WhyChooseUsSection />
      <TestimonialsSection />
      <ContactSection />
      <AdmissionPopup />
    </div>
  );
};

export default Index;