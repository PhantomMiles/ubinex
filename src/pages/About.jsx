import React from "react";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        <div className="max-w-3xl">
          <p className="text-[10px] font-black text-primary uppercase mb-4">Our Mission</p>
          <h1 className="text-6xl font-black text-gray-900 uppercase leading-none mb-12">
            Revolutionizing <br />
            Nigerian Agriculture
          </h1>
          <div className="space-y-8 text-gray-600 leading-relaxed font-medium">
            <p>
              Ubinex is a state-of-the-art agricultural marketplace designed to bridge the gap between hard-working Nigerian farmers and final consumers. Based in the heart of Enugu, we leverage technology to ensure food security, fair pricing, and seamless logistics.
            </p>
            <p>
              Our platform empowers local farmers by giving them direct access to regional and national markets, eliminating unnecessary middlemen and ensuring that fresh produce reaches your table at its peak quality.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 mt-20">
            <div>
              <h3 className="text-[10px] font-black uppercase text-gray-400 mb-4">Our Values</h3>
              <ul className="space-y-4 text-[10px] font-black text-gray-900">
                <li className="flex items-center gap-3">
                  <i className="fas fa-check text-primary"></i> Transparency
                </li>
                <li className="flex items-center gap-3">
                  <i className="fas fa-check text-primary"></i> Fairness
                </li>
                <li className="flex items-center gap-3">
                  <i className="fas fa-check text-primary"></i> Sustainability
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase text-gray-400 mb-4">Contact</h3>
              <p className="text-[10px] font-black uppercase text-gray-900">Enugu State, Nigeria</p>
              <p className="text-[10px] font-black uppercase text-primary mt-2">contact@ubinex.com.ng</p>
              <p className="text-[10px] font-black uppercase text-gray-900 mt-2">+234 814 305 4030</p>
            </div>
          </div>
        </div>

        {/* Mission Parallax Image (Right Side) */}
        <div className="min-h-[400px] lg:h-full w-full rounded-xl overflow-hidden shadow-sm">
          <div 
            className="w-full h-full bg-fixed bg-no-repeat bg-cover bg-[center_top] lg:bg-[68%_center] rounded-xl min-h-[400px]"
            style={{ backgroundImage: `url('https://i.pinimg.com/1200x/23/0a/19/230a1946ac92e516db049ae09dac10a8.jpg')` }}
          />
        </div>
      </main>

      {/* Vision Section Container (Left Side Image) */}
      <div className="bg-gray-50 border border-gray-100 px-6 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Vision Parallax Image (Left Side) */}
          <div className="min-h-[400px] lg:h-[600px] w-full rounded-xl overflow-hidden shadow-sm">
            <div 
              className="w-full h-full bg-fixed bg-cover bg-no-repeat bg-center rounded-xl min-h-[400px]"
              style={{ backgroundImage: `url('https://i.pinimg.com/1200x/2b/c5/03/2bc503b5209e55610398d2d904ffa834.jpg')` }}
            />
          </div>

          {/* Right Column: Text Content (Consistently Right-Aligned) */}
          <div>
            <p className="text-[10px] font-black text-primary uppercase mb-4 text-right">Our Vision</p>
            <h1 className="text-6xl font-black text-gray-900 uppercase leading-none text-right mb-12">
              Building Food <br /> Security For All
            </h1>
            <div className="space-y-8 text-gray-600 leading-relaxed font-medium">
              <ul className="space-y-6 text-[15px] font-bold">
                <li className="flex items-start justify-end gap-3 text-right">
                  <span>To position Ubinex as the premier agricultural marketplace in West Africa, connecting farmers directly to consumers and ensuring food security across the region.</span>
                  <i className="fas fa-check text-primary mt-1"></i>
                </li>
                <li className="flex items-start justify-end gap-3 text-right">
                  <span>To eliminate post-harvest waste and market friction in African agriculture by directly connecting rural farmers to markets through smart, accessible digital infrastructure.</span>
                  <i className="fas fa-check text-primary mt-1"></i>
                </li>
                <li className="flex items-start justify-end gap-3 text-right">
                  <span>To empower farmers with transparent pricing, secure payments, and reliable logistics, fostering sustainable income and community growth.</span>
                  <i className="fas fa-check text-primary mt-1"></i>
                </li>
                <li className="flex items-start justify-end gap-3 text-right">
                  <span>To support Nigeria’s farmers by providing direct access to both local and international markets, fair pricing, and market-driven insights that enhance livelihoods and food security.</span>
                  <i className="fas fa-check text-primary mt-1"></i>
                </li>
                <li className="flex items-start justify-end gap-3 text-right">
                  <span>To build a trusted ecosystem that ensures quality produce reaches consumers faster and fresher while expanding opportunities for agricultural growth in Nigeria and beyond.</span>
                  <i className="fas fa-check text-primary mt-1"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Text Story Content + Metrics Grid */}
          <div className="lg:col-span-7 w-full">
            <p className="text-primary text-[10px] font-black uppercase mb-3">Our Story</p>
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 uppercase leading-none mb-6">
              Farming Runs <br />
              In Our Blood
            </h1>
            
            {/* Narrative Paragraphs */}
            <div className="text-gray-700 text-base leading-relaxed space-y-4 mb-10">
              <p>
                Ubinex was born from a deep understanding of the challenges Nigerian farmers face. 
                We saw hardworking men and women pouring their sweat into the soil, only to lose 
                a significant portion of their harvest to spoilage and middlemen.
              </p>
              <p>
                Our founders, having grown up surrounded by agriculture, knew there was a better way. 
                We envisioned a platform that could bridge the gap between the farm gate and the 
                consumer’s table, ensuring fair prices for farmers and fresh, quality produce for everyone.
              </p>
            </div>

            {/* Info Grid directly under narrative */}
            <div className="grid grid-cols-2 gap-6 pt-6 -mt-10 border-t border-gray-100">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-2xl font-black text-primary mb-1">01.</p>
                <h4 className="text-[11px] font-black uppercase text-gray-900 mb-1">Direct Access</h4>
                <p className="text-[12px] text-gray-500 font-medium leading-snug">
                  Bypassing middleman markups to maximize farm-gate value.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-2xl font-black text-primary mb-1">02.</p>
                <h4 className="text-[11px] font-black uppercase text-gray-900 mb-1">Smart Logistics</h4>
                <p className="text-[12px] text-gray-500 font-medium leading-snug">
                  Streamlining transport routes across Enugu and beyond.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-2xl font-black text-primary mb-1">03.</p>
                <h4 className="text-[11px] font-black uppercase text-gray-900 mb-1">Zero Waste</h4>
                <p className="text-[12px] text-gray-500 font-medium leading-snug">
                  Reducing post-harvest loss through demand matching.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-2xl font-black text-primary mb-1">04.</p>
                <h4 className="text-[11px] font-black uppercase text-gray-900 mb-1">Fair Trade</h4>
                <p className="text-[12px] text-gray-500 font-medium leading-snug">
                  Transparent pricing frameworks for every crop listed.
                </p>
              </div>
            </div>
            <div className="text-gray-700 text-base leading-relaxed space-y-4 mt-10">
              <p className="font-black text-gray-900">
                Today, Ubinex stands as a testament to that vision—a thriving agricultural ecosystem 
                powered by technology, built on trust, and dedicated to feeding our communities.
              </p>
            </div>
          </div>

          {/* Right: Image Frame */}
          <div className="lg:col-span-5 w-full">
            <div className="min-h-[500px] lg:h-full w-full rounded-2xl overflow-hidden shadow-sm relative">
              <div 
                className="w-full h-full bg-fixed bg-cover bg-no-repeat bg-center rounded-2xl min-h-[500px]"
                style={{ backgroundImage: `url('https://i.pinimg.com/1200x/0d/46/da/0d46daa570082ba54c881b53d18be277.jpg')` }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
