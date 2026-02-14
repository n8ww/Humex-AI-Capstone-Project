import React from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Clock,
  AlertTriangle,
  MonitorPlay,
  FileText,
  Link } from
'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
export function FeaturesSection() {
  const { t } = useLanguage();
  const features = [
  {
    icon: <Target className="w-6 h-6" />,
    title: t('features.0.title'),
    description: t('features.0.description')
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: t('features.1.title'),
    description: t('features.1.description')
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: t('features.2.title'),
    description: t('features.2.description')
  },
  {
    icon: <MonitorPlay className="w-6 h-6" />,
    title: t('features.3.title'),
    description: t('features.3.description')
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: t('features.4.title'),
    description: t('features.4.description')
  },
  {
    icon: <Link className="w-6 h-6" />,
    title: t('features.5.title'),
    description: t('features.5.description')
  }];

  return (
    <section id="features" className="py-24 bg-[#0d0d12]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
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

            {t('features.title')}{' '}
            <span className="text-red-500">{t('features.highlight')}</span>
          </motion.h2>
          <div className="w-20 h-1 bg-red-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) =>
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            whileInView={{
              opacity: 1,
              scale: 1
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: index * 0.1
            }}
            whileHover={{
              y: -5
            }}
            className="bg-[#15151a] p-8 rounded-2xl border border-slate-800/50 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] transition-all duration-300 cursor-pointer">

              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-red-500 mb-6 shadow-inner border border-slate-700">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}