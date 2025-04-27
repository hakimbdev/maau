import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ProgramsSection from '../components/sections/ProgramsSection';
import NewsEventsSection from '../components/sections/NewsEventsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CampusLifeSection from '../components/sections/CampusLifeSection';
import FacultySection from '../components/sections/FacultySection';
import CallToActionSection from '../components/sections/CallToActionSection';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <CampusLifeSection />
        <FacultySection />
        <NewsEventsSection />
        <TestimonialsSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;