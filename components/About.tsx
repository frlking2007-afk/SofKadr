import React from 'react';
import { Mail, Phone, MapPin, Globe, ShieldCheck, Users, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
          Biz haqimizda
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          <span className="font-bold text-gray-900 dark:text-white">Sof Kadr</span> — bu O'zbekistonda ish beruvchilar va ish izlovchilarni birlashtiruvchi zamonaviy platforma. Bizning maqsadimiz — insonlarga orzuidagi ishni topishda va kompaniyalarga eng yaxshi kadrlarni jalb qilishda yordam berishdir.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
            <Zap className="text-blue-600 dark:text-blue-400" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Tezkor Qidiruv</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Bizning aqlli filtrlash tizimimiz orqali o'zingizga mos ishni yoki xodimni sanoqli daqiqalarda toping.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-6">
            <ShieldCheck className="text-green-600 dark:text-green-400" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Ishonchli Vakansiyalar</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Platformadagi barcha e'lonlar va kompaniyalar tekshiruvdan o'tadi, bu esa xavfsizlikni ta'minlaydi.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6">
            <Users className="text-purple-600 dark:text-purple-400" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Keng Auditoriya</h3>
          <p className="text-gray-600 dark:text-gray-400">
            O'zbekistonning barcha hududlaridan minglab mutaxassislar va yirik kompaniyalar bizni tanlashadi.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Biz bilan bog'laning
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Savollaringiz bormi yoki hamkorlik qilmoqchimisiz? Bizning jamoamiz har doim yordam berishga tayyor.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-700 dark:text-gray-200">
                <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm">
                  <Phone size={20} />
                </div>
                <span className="font-medium">+998 71 200-00-00</span>
              </div>
              
              <div className="flex items-center gap-4 text-gray-700 dark:text-gray-200">
                <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm">
                  <Mail size={20} />
                </div>
                <span className="font-medium">info@sofkadr.uz</span>
              </div>

              <div className="flex items-center gap-4 text-gray-700 dark:text-gray-200">
                <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm">
                  <MapPin size={20} />
                </div>
                <span className="font-medium">Toshkent sh, Amir Temur ko'chasi, 108</span>
              </div>

              <div className="flex items-center gap-4 text-gray-700 dark:text-gray-200">
                <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm">
                  <Globe size={20} />
                </div>
                <span className="font-medium">www.sofkadr.uz</span>
              </div>
            </div>
          </div>

          <div className="relative h-64 md:h-full min-h-[300px] rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700">
            {/* Simple Map Placeholder */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.173752526367!2d69.27891731542368!3d41.32675697927005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b5185938097%3A0x272722b5e2820526!2sAmir%20Temur%20Avenue%2C%20Tashkent!5e0!3m2!1sen!2suz!4v1647514934825!5m2!1sen!2suz" 
              width="100%" 
              height="100%" 
              style={{border:0}} 
              allowFullScreen={true} 
              loading="lazy"
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;