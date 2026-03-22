import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div>
          <div className="flex items-center gap-2 mb-6 cursor-pointer group">
            <img src="/ubinex.png" alt="Ubinex" className="w-20 h-20 object-contain" />
            <span className="text-xl font-black text-white tracking-tight uppercase">UBINEX</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Connecting farmers directly with consumers. Premium organic produce from local farms across Enugu State.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition"><i className="fab fa-facebook-f text-sm"></i></a>
            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition"><i className="fab fa-twitter text-sm"></i></a>
            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition"><i className="fab fa-instagram text-sm"></i></a>
            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition"><i className="fab fa-pinterest-p text-sm"></i></a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-black mb-8 italic">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-bold uppercase tracking-widest">
            <li><a href="#" className="hover:text-primary transition">About Us</a></li>
            <li><a href="#" className="hover:text-primary transition">Shop with Us</a></li>
            <li><a href="#" className="hover:text-primary transition">Our Services</a></li>
            <li><a href="#" className="hover:text-primary transition">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-black mb-8 italic">Categories</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-bold uppercase tracking-widest">
            <li><a href="#" className="hover:text-primary transition">Vegetables</a></li>
            <li><a href="#" className="hover:text-primary transition">Fresh Fruit</a></li>
            <li><a href="#" className="hover:text-primary transition">Dairy products</a></li>
            <li><a href="#" className="hover:text-primary transition">Meat & Seafood</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-black mb-8 italic">Newsletter</h4>
          <p className="text-gray-400 text-sm mb-6">Subscribe to get the latest updates and offers.</p>
          <form className="relative">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-sm focus:outline-none focus:border-primary transition" 
            />
            <button className="absolute right-2 top-2 bg-primary hover:bg-green-800 text-white font-bold py-2 px-6 rounded-full transition shadow-lg text-xs uppercase tracking-widest">
              Join
            </button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
        <p>© 2026 UBINEX. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
          <a href="#" className="hover:text-white transition">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
