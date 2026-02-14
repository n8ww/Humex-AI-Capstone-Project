import React, { useEffect, useState } from 'react';
import { HeartPulse, Menu, X, Globe } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
  {
    name: t('nav.home'),
    href: '#hero'
  },
  {
    name: t('nav.about'),
    href: '#about'
  },
  {
    name: t('nav.objectives'),
    href: '#objectives'
  },
  {
    name: t('nav.howItWorks'),
    href: '#how-it-works'
  },
  {
    name: t('nav.features'),
    href: '#features'
  }];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 group-hover:border-red-500/60 transition-colors">
              <HeartPulse className="w-6 h-6 text-red-500" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              <span className="text-red-500">Humex</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-red-500 transition-colors relative group">

                {link.name}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full" />
              </a>
            )}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">

              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium">
                {language === 'ar' ? 'English' : 'عربي'}
              </span>
            </button>
            <Button
              variant="primary"
              size="sm"
              onClick={() =>
              document.getElementById('contact')?.scrollIntoView({
                behavior: 'smooth'
              })
              }>

              {language === 'ar' ? 'تواصل معانا' : 'Contact Us'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleLanguage}
              className="text-slate-300 hover:text-white transition-colors">

              <span className="text-sm font-bold">
                {language === 'ar' ? 'EN' : 'عربي'}
              </span>
            </button>
            <button
              className="p-2 text-slate-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>

              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen &&
        <motion.div
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          className="md:hidden glass border-t border-slate-800 overflow-hidden">

            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) =>
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-slate-300 hover:text-red-500 py-2 border-b border-slate-800/50"
              onClick={() => setIsMobileMenuOpen(false)}>

                  {link.name}
                </a>
            )}
              <Button
              variant="primary"
              className="w-full mt-2"
              onClick={() => {
                setIsMobileMenuOpen(false);
                document.getElementById('contact')?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}>

                {language === 'ar' ? 'تواصل معانا' : 'Contact Us'}
              </Button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </nav>);

}