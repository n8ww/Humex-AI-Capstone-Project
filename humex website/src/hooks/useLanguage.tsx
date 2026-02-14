import React, { useState, createContext, useContext } from 'react';
type Language = 'ar' | 'en';
type Direction = 'rtl' | 'ltr';
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: Direction;
  toggleLanguage: () => void;
}
const translations = {
  ar: {
    'nav.home': 'الرئيسية',
    'nav.about': 'عن النظام',
    'nav.objectives': 'الأهداف',
    'nav.howItWorks': 'كيف يعمل',
    'nav.features': 'المميزات',
    'nav.cta': 'انتقل للنظام',
    'hero.badge': 'مشروع تخرج 2025',
    'hero.title1': '',
    'hero.titleHighlight': 'Humex',
    'hero.title2': 'نظام التدفق البشري الذكي',
    'hero.description':
    'نظام متطور لتحليل ومراقبة حركة الحشود في الوقت الحقيقي باستخدام تقنيات الذكاء الاصطناعي YOLOv8 وكاميرات المراقبة لضمان السلامة وتنظيم التدفق.',
    'hero.cta': 'انتقل للنظام',
    'hero.secondary': 'اعرف المزيد',
    'hero.stat1Title': 'مراقبة حية',
    'hero.stat1Desc': 'تحليل لحظي للكاميرات',
    'hero.stat2Title': 'عد الأشخاص',
    'hero.stat2Desc': 'دقة عالية في الحصر',
    'hero.stat3Title': 'تحليل الكثافة',
    'hero.stat3Desc': 'كشف مناطق الازدحام',
    'about.title': 'عن',
    'about.highlight': 'النظام',
    'about.p1':
    'نظام التدفق البشري هو حل تقني متكامل يهدف إلى تحسين إدارة الحشود في الأماكن العامة والخاصة. يعتمد النظام على أحدث خوارزميات الرؤية الحاسوبية (Computer Vision) لتحليل تدفق الأشخاص بدقة عالية.',
    'about.p2':
    'من خلال ربط كاميرات المراقبة بنموذج الذكاء الاصطناعي، يقوم النظام بتحويل الفيديو المباشر إلى بيانات رقمية وإحصائيات تساعد المسؤولين على اتخاذ قرارات فورية لتفادي الازدحام وضمان السلامة العامة.',
    'about.feature1Title': 'دقة عالية في الكشف',
    'about.feature1Desc':
    'استخدام YOLOv8 لضمان دقة متناهية في التعرف على الأشخاص.',
    'about.feature2Title': 'خصوصية وأمان',
    'about.feature2Desc': 'معالجة البيانات محلياً مع مراعاة معايير الخصوصية.',
    'about.status': 'الحالة',
    'about.active': 'نشط',
    'about.processing': 'المعالجة',
    'objectives.title': 'أهداف',
    'objectives.highlight': 'النظام',
    'objectives.subtitle':
    'نسعى من خلال هذا المشروع إلى تقديم حلول ذكية تساهم في تنظيم الحشود والحفاظ على الأرواح.',
    'objectives.0.title': 'تحليل فوري',
    'objectives.0.description':
    'تحليل تدفق الحشود في الوقت الحقيقي دون تأخير لمعالجة المواقف الطارئة.',
    'objectives.1.title': 'تنبيه مبكر',
    'objectives.1.description':
    'إرسال إشعارات فورية عند تجاوز الكثافة للحد المسموح به في منطقة معينة.',
    'objectives.2.title': 'إدارة السلامة',
    'objectives.2.description':
    'تحسين إجراءات السلامة والأمن من خلال المراقبة المستمرة والذكية.',
    'objectives.3.title': 'بيانات دقيقة',
    'objectives.3.description':
    'توفير إحصائيات دقيقة وموثوقة حول أعداد الزوار وأوقات الذروة.',
    'objectives.4.title': 'دعم القرار',
    'objectives.4.description':
    'مساعدة متخذي القرار عبر تقارير تحليلية مبنية على بيانات الذكاء الاصطناعي.',
    'objectives.5.title': 'تحسين التدفق',
    'objectives.5.description':
    'تحديد نقاط الاختناق والعمل على تحسين انسيابية الحركة.',
    'howItWorks.title': 'كيف يعمل',
    'howItWorks.highlight': 'النظام',
    'howItWorks.subtitle': 'آلية عمل النظام من التقاط الصورة وحتى اتخاذ القرار',
    'howItWorks.steps.0.title': 'ربط الكاميرات',
    'howItWorks.steps.0.description':
    'يتم توصيل كاميرات المراقبة (IP Cameras) أو كاميرات الويب بالنظام لاستقبال بث الفيديو المباشر.',
    'howItWorks.steps.1.title': 'التحليل بالذكاء الاصطناعي',
    'howItWorks.steps.1.description':
    'يقوم نموذج YOLOv8 بمعالجة الإطارات وكشف الأشخاص وتتبع حركتهم بدقة عالية.',
    'howItWorks.steps.2.title': 'عرض البيانات',
    'howItWorks.steps.2.description':
    'يتم عرض النتائج، عدد الأشخاص، ومناطق الكثافة عبر واجهة تفاعلية مبنية بـ Streamlit.',
    'howItWorks.steps.3.title': 'التنبيهات والتقارير',
    'howItWorks.steps.3.description':
    'إصدار تنبيهات صوتية أو مرئية عند اكتشاف ازدحام وتخزين البيانات للتقارير.',
    'features.title': 'مميزات',
    'features.highlight': 'النظام',
    'features.0.title': 'دقة عالية',
    'features.0.description':
    'خوارزميات متقدمة تضمن دقة عالية في كشف وتتبع الأشخاص حتى في البيئات المزدحمة.',
    'features.1.title': 'الوقت الحقيقي',
    'features.1.description':
    'معالجة فورية للفيديو وعرض النتائج بأقل معدل تأخير ممكن (Low Latency).',
    'features.2.title': 'تنبيهات ذكية',
    'features.2.description':
    'نظام تنبيهات قابل للتخصيص يعمل عند تجاوز عتبة معينة من الكثافة البشرية.',
    'features.3.title': 'لوحة تحكم',
    'features.3.description':
    'واجهة مستخدم تفاعلية وسهلة الاستخدام تعرض البث المباشر والرسوم البيانية.',
    'features.4.title': 'تقارير مفصلة',
    'features.4.description':
    'إمكانية تصدير البيانات والتقارير لتحليل الاتجاهات على المدى الطويل.',
    'features.5.title': 'سهولة الربط',
    'features.5.description':
    'يدعم النظام مختلف أنواع الكاميرات وبروتوكولات البث مثل RTSP و HTTP.',
    'footer.brand': '',
    'footer.brandHighlight': 'Humex',
    'footer.brandDesc':
    'مشروع تخرج يهدف لتوظيف الذكاء الاصطناعي في خدمة المجتمع وتحسين إدارة الحشود.',
    'footer.quickLinks': 'روابط سريعة',
    'footer.trySystem': 'جرب النظام',
    'footer.tryDesc':
    'يمكنك تجربة النسخة التجريبية من النظام والاطلاع على لوحة التحكم.',
    'footer.ctaButton': 'انتقل للنظام الآن',
    'footer.copyright': '© 2025 Humex. جميع الحقوق محفوظة - مشروع تخرج.'
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.objectives': 'Objectives',
    'nav.howItWorks': 'How it Works',
    'nav.features': 'Features',
    'nav.cta': 'Go to System',
    'hero.badge': 'Graduation Project 2025',
    'hero.title1': '',
    'hero.titleHighlight': 'Humex',
    'hero.title2': 'Intelligent Human Flow System',
    'hero.description':
    'An advanced system for real-time crowd analysis and monitoring using YOLOv8 AI technology and surveillance cameras to ensure safety and flow management.',
    'hero.cta': 'Go to System',
    'hero.secondary': 'Learn More',
    'hero.stat1Title': 'Live Monitoring',
    'hero.stat1Desc': 'Real-time camera analysis',
    'hero.stat2Title': 'People Counting',
    'hero.stat2Desc': 'High accuracy counting',
    'hero.stat3Title': 'Density Analysis',
    'hero.stat3Desc': 'Crowd congestion detection',
    'about.title': 'About the',
    'about.highlight': 'System',
    'about.p1':
    'The Human Flow System is a comprehensive technical solution aimed at improving crowd management in public and private spaces. The system relies on the latest Computer Vision algorithms to analyze people flow with high accuracy.',
    'about.p2':
    'By connecting surveillance cameras to the AI model, the system converts live video into digital data and statistics that help officials make immediate decisions to avoid congestion and ensure public safety.',
    'about.feature1Title': 'High Detection Accuracy',
    'about.feature1Desc':
    'Using YOLOv8 to ensure extreme accuracy in person identification.',
    'about.feature2Title': 'Privacy & Security',
    'about.feature2Desc': 'Local data processing respecting privacy standards.',
    'about.status': 'Status',
    'about.active': 'Active',
    'about.processing': 'Processing',
    'objectives.title': 'System',
    'objectives.highlight': 'Objectives',
    'objectives.subtitle':
    'Through this project, we aim to provide smart solutions that contribute to crowd organization and saving lives.',
    'objectives.0.title': 'Real-time Analysis',
    'objectives.0.description':
    'Analyzing crowd flow in real-time without delay to address emergency situations.',
    'objectives.1.title': 'Early Warning',
    'objectives.1.description':
    'Sending immediate notifications when density exceeds the allowed limit in a specific area.',
    'objectives.2.title': 'Safety Management',
    'objectives.2.description':
    'Improving safety and security procedures through continuous and smart monitoring.',
    'objectives.3.title': 'Accurate Data',
    'objectives.3.description':
    'Providing accurate and reliable statistics on visitor numbers and peak times.',
    'objectives.4.title': 'Decision Support',
    'objectives.4.description':
    'Assisting decision-makers through analytical reports based on AI data.',
    'objectives.5.title': 'Flow Improvement',
    'objectives.5.description':
    'Identifying bottlenecks and working to improve movement fluidity.',
    'howItWorks.title': 'How the System',
    'howItWorks.highlight': 'Works',
    'howItWorks.subtitle':
    'System mechanism from image capture to decision making',
    'howItWorks.steps.0.title': 'Connect Cameras',
    'howItWorks.steps.0.description':
    'Surveillance cameras (IP Cameras) or webcams are connected to the system to receive live video stream.',
    'howItWorks.steps.1.title': 'AI Analysis',
    'howItWorks.steps.1.description':
    'The YOLOv8 model processes frames, detects people, and tracks their movement with high accuracy.',
    'howItWorks.steps.2.title': 'Data Display',
    'howItWorks.steps.2.description':
    'Results, people count, and density areas are displayed via an interactive interface built with Streamlit.',
    'howItWorks.steps.3.title': 'Alerts & Reports',
    'howItWorks.steps.3.description':
    'Issuing audio or visual alerts when congestion is detected and storing data for reports.',
    'features.title': 'System',
    'features.highlight': 'Features',
    'features.0.title': 'High Accuracy',
    'features.0.description':
    'Advanced algorithms ensuring high accuracy in detecting and tracking people even in crowded environments.',
    'features.1.title': 'Real Time',
    'features.1.description':
    'Immediate video processing and result display with lowest possible latency.',
    'features.2.title': 'Smart Alerts',
    'features.2.description':
    'Customizable alert system that works when a certain human density threshold is exceeded.',
    'features.3.title': 'Dashboard',
    'features.3.description':
    'Interactive and easy-to-use user interface displaying live stream and charts.',
    'features.4.title': 'Detailed Reports',
    'features.4.description':
    'Ability to export data and reports to analyze long-term trends.',
    'features.5.title': 'Easy Integration',
    'features.5.description':
    'The system supports various types of cameras and streaming protocols like RTSP and HTTP.',
    'footer.brand': '',
    'footer.brandHighlight': 'Humex',
    'footer.brandDesc':
    'A graduation project aiming to employ AI in community service and improve crowd management.',
    'footer.quickLinks': 'Quick Links',
    'footer.trySystem': 'Try the System',
    'footer.tryDesc':
    'You can try the demo version of the system and view the dashboard.',
    'footer.ctaButton': 'Go to System Now',
    'footer.copyright':
    '© 2025 Humex. All rights reserved - Graduation Project.'
  }
};
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);
export function LanguageProvider({ children }: {children: ReactNode;}) {
  const [language, setLanguage] = useState<Language>('en');
  const t = (key: string) => {
    // @ts-ignore
    return translations[language][key] || key;
  };
  const dir = language === 'ar' ? 'rtl' : 'ltr';
  const toggleLanguage = () => {
    setLanguage((prev) => prev === 'ar' ? 'en' : 'ar');
  };
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        dir,
        toggleLanguage
      }}>

      {children}
    </LanguageContext.Provider>);

}
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}