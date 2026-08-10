import react from "react";
import "../../../assets/css/home.css";
import Navbar from "../../../components/Navbar";
import Hero from "../../../components/Hero";
import CareSection from "../../../components/CareSection";
import Services from "../../../components/Services";
import HowItWorks from "../../../components/HowItWorks";
import DownloadApp from "../../../components/DownloadApp";
import PartnerSection from "../../../components/PartnerSection";
import Faq from "../../../components/Faq";

export default function Home() {
  return (
    <>
  
  
    <Hero />
    <CareSection />
    <Services />
    <HowItWorks />
    <DownloadApp />
    <PartnerSection />
    <Faq />

      {/* Hero Section will come here */}

    </>
  );
}