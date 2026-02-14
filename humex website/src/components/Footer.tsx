import React, { useState } from 'react';
import { HeartPulse } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
export function Footer() {
  const { t, language } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };
  return (
    <footer
      id="contact"
      className="bg-[#050507] border-t border-slate-900 pt-16 pb-8">

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <HeartPulse className="w-6 h-6 text-red-500" />
              <span className="text-xl font-bold text-white">
                {t('footer.brand')}{' '}
                <span className="text-red-500">
                  {t('footer.brandHighlight')}
                </span>
              </span>
            </div>
            <p className="text-slate-500 mb-6 max-w-xs">
              {t('footer.brandDesc')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-6">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#hero"
                  className="text-slate-400 hover:text-red-500 transition-colors">

                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-slate-400 hover:text-red-500 transition-colors">

                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a
                  href="#objectives"
                  className="text-slate-400 hover:text-red-500 transition-colors">

                  {t('nav.objectives')}
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-slate-400 hover:text-red-500 transition-colors">

                  {t('nav.features')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div>
            <h4 className="text-white font-bold mb-6">
              {language === 'ar' ? 'تواصل معانا' : 'Contact Us'}
            </h4>

            {status === 'sent' ?
            <div className="text-center py-8">
                <div className="text-green-400 text-lg font-bold mb-2">✓</div>
                <p className="text-green-400 font-bold">
                  {language === 'ar' ?
                'تم الإرسال بنجاح!' :
                'Sent successfully!'}
                </p>
              </div> :

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                type="hidden"
                name="access_key"
                value="97b04707-2bcf-4ce2-8a26-ff413e3914a2" />

                <input
                type="text"
                name="name"
                required
                placeholder={language === 'ar' ? 'الاسم' : 'Name'}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors" />

                <input
                type="email"
                name="email"
                required
                placeholder={
                language === 'ar' ? 'البريد الإلكتروني' : 'Email'
                }
                className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors" />

                <textarea
                name="message"
                required
                rows={3}
                placeholder={language === 'ar' ? 'الرسالة' : 'Message'}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors resize-none" />

                {status === 'error' &&
              <p className="text-red-400 text-sm">
                    {language === 'ar' ?
                'حدث خطأ، حاول مرة ثانية' :
                'Error, please try again'}
                  </p>
              }
                <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white font-bold hover:from-red-500 hover:to-red-400 transition-all shadow-lg shadow-red-900/20 disabled:opacity-50">

                  {status === 'sending' ?
                language === 'ar' ?
                'جاري الإرسال...' :
                'Sending...' :
                language === 'ar' ?
                'إرسال' :
                'Send'}
                </button>
              </form>
            }
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 text-center text-slate-600 text-sm">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>);

}