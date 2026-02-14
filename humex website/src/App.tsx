import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ObjectivesSection } from './components/ObjectivesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { FeaturesSection } from './components/FeaturesSection';
import { Footer } from './components/Footer';
import { LanguageProvider, useLanguage } from './hooks/useLanguage';
function AppContent() {
  const { dir } = useLanguage();
  return (
    <div dir={dir} className="bg-[#0a0a0f] min-h-screen text-slate-50">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ObjectivesSection />
        <HowItWorksSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>);

}
export function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>);

}