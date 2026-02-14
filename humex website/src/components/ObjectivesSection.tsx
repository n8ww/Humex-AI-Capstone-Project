import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  BellRing,
  Shield,
  Zap,
  Database,
  BrainCircuit } from
'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
export function ObjectivesSection() {
  const { t } = useLanguage();
  const objectives = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: t('objectives.0.title'),
    description: t('objectives.0.description')
  },
  {
    icon: <BellRing className="w-6 h-6" />,
    title: t('objectives.1.title'),
    description: t('objectives.1.description')
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: t('objectives.2.title'),
    description: t('objectives.2.description')
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: t('objectives.3.title'),
    description: t('objectives.3.description')
  },
  {
    icon: <BrainCircuit className="w-6 h-6" />,
    title: t('objectives.4.title'),
    description: t('objectives.4.description')
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: t('objectives.5.title'),
    description: t('objectives.5.description')
  }];

  return (
    <section id="objectives" className="py-24 bg-[#0d0d12]">
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

            {t('objectives.title')}{' '}
            <span className="text-red-500">{t('objectives.highlight')}</span>
          </motion.h2>
          <motion.p
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
            transition={{
              delay: 0.1
            }}
            className="text-slate-400 max-w-2xl mx-auto">

            {t('objectives.subtitle')}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectives.map((obj, index) =>
          <motion.div
            key={index}
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
            transition={{
              delay: index * 0.1
            }}
            className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-red-500/30 hover:bg-slate-800/50 transition-all duration-300 group">

              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-red-500 mb-4 group-hover:bg-red-500 group-hover:text-white transition-colors">
                {obj.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{obj.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {obj.description}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}