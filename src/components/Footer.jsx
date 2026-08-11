import React from 'react';
import { useApp } from '../context/useAppContext';

export default function Footer() {
  const { t } = useApp();

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-28 sm:pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div>
          <div className="flex items-center gap-2 mb-6 cursor-pointer group">
            <img src="/ubinex.png" alt="Ubinex" className="w-20 h-20 object-contain" />
            <span className="text-xl font-black text-white uppercase">UBINEX</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            {t("footer_desc")}
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition"><i className="fab fa-facebook-f text-sm"></i></a>
            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition"><i className="fab fa-twitter text-sm"></i></a>
            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition"><i className="fab fa-instagram text-sm"></i></a>
            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition"><i className="fab fa-pinterest-p text-sm"></i></a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-black mb-8">{t("quick_links")}</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-bold uppercase">
            <li><a href="#" className="hover:text-primary transition">{t("about")}</a></li>
            <li><a href="#" className="hover:text-primary transition">{t("shop_with_us")}</a></li>
            <li><a href="#" className="hover:text-primary transition">{t("our_services")}</a></li>
            <li><a href="#" className="hover:text-primary transition">{t("contact_us")}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-black mb-8">{t("markets")}</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-bold uppercase">
            <li><a href="#" className="hover:text-primary transition">{t("vegetables")}</a></li>
            <li><a href="#" className="hover:text-primary transition">{t("fruits")}</a></li>
            <li><a href="#" className="hover:text-primary transition">{t("grains")}</a></li>
            <li><a href="#" className="hover:text-primary transition">{t("meat")}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-black mb-8">{t("newsletter")}</h4>
          <p className="text-gray-400 text-sm mb-6">{t("newsletter_sub")}</p>
          <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder={t("email_placeholder")} 
              className="w-full bg-white/5 border border-white/10 rounded-lg py-4 px-6 text-sm focus:outline-none focus:border-primary transition" 
            />
            <button className="absolute right-2 top-2 bg-primary hover:bg-green-800 text-white font-bold py-2 px-6 rounded-lg transition shadow-lg text-xs uppercase">
              {t("join")}
            </button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase text-gray-500">
        <p>© 2026 UBINEX. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition">{t("privacy_policy")}</a>
          <a href="#" className="hover:text-white transition">{t("terms_of_service")}</a>
          <a href="#" className="hover:text-white transition">{t("cookies")}</a>
        </div>
      </div>
    </footer>
  );
}