import React from 'react';
import { motion } from 'framer-motion';
import { Scan, ShieldCheck, Cpu } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
export function AboutSection() {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{
              opacity: 0,
              x: 50
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.6
            }}>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('about.title')}{' '}
              <span className="text-red-500">{t('about.highlight')}</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              {t('about.p1')}
            </p>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              {t('about.p2')}
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-lg bg-red-500/10 text-red-500">
                  <Scan className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">
                    {t('about.feature1Title')}
                  </h3>
                  <p className="text-slate-500 text-sm">
                    {t('about.feature1Desc')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-lg bg-red-500/10 text-red-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">
                    {t('about.feature2Title')}
                  </h3>
                  <p className="text-slate-500 text-sm">
                    {t('about.feature2Desc')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            whileInView={{
              opacity: 1,
              scale: 1
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.6
            }}
            className="relative">

            {/* Abstract Tech Visualization */}
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-grid-pattern opacity-30" />

              {/* Scanning Line Animation */}
              <motion.div
                animate={{
                  top: ['0%', '100%', '0%']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="absolute left-0 right-0 h-1 bg-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.5)] z-20" />


              {/* Central Element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 border-2 border-red-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-4 border-2 border-dashed border-red-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Cpu className="w-16 h-16 text-red-500" />
                  </div>

                  {/* Orbiting Dots */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                </div>
              </div>

              {/* Data Points */}
              <div className="absolute bottom-8 left-8 right-8 bg-slate-900/80 backdrop-blur border border-slate-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-slate-400">
                    {t('about.status')}
                  </span>
                  <span className="text-xs text-green-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    {t('about.active')}
                  </span>
                </div>
                <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full w-[75%]" />
                </div>
                <div className="flex justify-between mt-2 text-xs">
                  <span className="text-slate-400">
                    {t('about.processing')}
                  </span>
                  <span className="text-white">45 FPS</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}