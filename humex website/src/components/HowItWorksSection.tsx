import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Cpu, LayoutDashboard, Bell } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
export function HowItWorksSection() {
  const { t } = useLanguage();
  const steps = [
  {
    icon: <Camera className="w-8 h-8" />,
    title: t('howItWorks.steps.0.title'),
    description: t('howItWorks.steps.0.description')
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: t('howItWorks.steps.1.title'),
    description: t('howItWorks.steps.1.description')
  },
  {
    icon: <LayoutDashboard className="w-8 h-8" />,
    title: t('howItWorks.steps.2.title'),
    description: t('howItWorks.steps.2.description')
  },
  {
    icon: <Bell className="w-8 h-8" />,
    title: t('howItWorks.steps.3.title'),
    description: t('howItWorks.steps.3.description')
  }];

  return (
    <section id="how-it-works" className="py-24 bg-[#0a0a0f] relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            className="text-3xl md:text-4xl font-bold text-white mb-4">

            {t('howItWorks.title')}{' '}
            <span className="text-red-500">{t('howItWorks.highlight')}</span>
          </motion.h2>
          <p className="text-slate-400">{t('howItWorks.subtitle')}</p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) =>
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 30
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: index * 0.2
              }}
              className="relative flex flex-col items-center text-center">

                <div className="w-24 h-24 rounded-full bg-[#0a0a0f] border-4 border-slate-800 flex items-center justify-center text-red-500 mb-6 relative z-10 group hover:border-red-500 transition-colors duration-300">
                  <div className="absolute inset-2 rounded-full bg-slate-900 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Step Number Badge */}
                <div className="absolute top-0 right-1/2 translate-x-10 -translate-y-2 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm border-4 border-[#0a0a0f] z-20 rtl:translate-x-10 ltr:-translate-x-10">
                  {index + 1}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Tech Stack Badges */}
        <motion.div
          initial={{
            opacity: 0
          }}
          whileInView={{
            opacity: 1
          }}
          viewport={{
            once: true
          }}
          transition={{
            delay: 0.8
          }}
          className="mt-20 flex flex-wrap justify-center gap-4">

          {['Python', 'YOLOv8', 'Streamlit', 'OpenCV', 'PyTorch'].map(
            (tech) =>
            <span
              key={tech}
              className="px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 text-sm font-mono hover:border-red-500/50 hover:text-red-400 transition-colors cursor-default">

                {tech}
              </span>

          )}
        </motion.div>
      </div>
    </section>);

}