import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { ArrowLeft, ArrowRight, Eye, HeartPulse, Users } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export function HeroSection() {
  const { t, language } = useLanguage();
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">

      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#0a0a0f] z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f]" />

        {/* Animated Blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[100px]" />

        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 1
          }}
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px]" />

      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.5
            }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-red-400 text-sm font-medium mb-6">

            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            {t('hero.badge')}
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.5,
              delay: 0.1
            }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">

            <span className="text-gradient">{t('hero.titleHighlight')}</span>
            <br />
            {t('hero.title2')}
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.5,
              delay: 0.2
            }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">

            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.5,
              delay: 0.3
            }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">

            {/* تم تعديل الرابط هنا لفتح نظام البايثون */}
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto gap-2 group"
              onClick={() => window.location.href = 'http://localhost:8501'}>

              {t('hero.cta')}
              <ArrowIcon
                className={`w-5 h-5 transition-transform ${language === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />

            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() =>
              document.getElementById('about')?.scrollIntoView({
                behavior: 'smooth'
              })
              }>

              {t('hero.secondary')}
            </Button>
          </motion.div>

          {/* Stats / Features Preview */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.7,
              delay: 0.5
            }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mt-20 w-full border-t border-slate-800/50 pt-8">

            <div className="flex flex-col items-center">
              <div className="p-3 bg-slate-800/50 rounded-lg mb-3 text-red-500">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-white font-bold">{t('hero.stat1Title')}</h3>
              <p className="text-slate-500 text-sm">{t('hero.stat1Desc')}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 bg-slate-800/50 rounded-lg mb-3 text-red-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-white font-bold">{t('hero.stat2Title')}</h3>
              <p className="text-slate-500 text-sm">{t('hero.stat2Desc')}</p>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col items-center">
              <div className="p-3 bg-slate-800/50 rounded-lg mb-3 text-red-300">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-white font-bold">{t('hero.stat3Title')}</h3>
              <p className="text-slate-500 text-sm">{t('hero.stat3Desc')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}