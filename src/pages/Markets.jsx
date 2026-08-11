import React from "react";
import Navbar from "../components/Navbar";

const marketHubs = [
  { name: "Ogbete Market", location: "Enugu North", special: "Everything", image: "https://scontent.fabb1-1.fna.fbcdn.net/v/t1.6435-9/95926697_1114038835640037_5154846609384669184_n.jpg?stp=dst-jpg_tt6&cstp=mx720x960&ctp=s590x590&_nc_cat=108&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFocLLx_Ot47XEaElTgVc4mRVDlr6neqOtFUOWvqd6o60w-VkxRMH81XplO9fxBX9mIlGFvBGxGylbRHIyKkEQU&_nc_ohc=cINcigeNwu4Q7kNvwGQk7Up&_nc_oc=Ado5Yhx9YKgx_SGHTT2P4TkBN2RhUR3UW0pPHeckKBkq2Eg5Ok4i3PNcn2QWz-IYJAs&_nc_zt=23&_nc_ht=scontent.fabb1-1.fna&_nc_gid=9kFP8u391E0ftvh9d4qP5g&_nc_ss=7b2a8&oh=00_AQFHfkdYSXvMqZ3K9Lt2HYQX5yHw5eEH8Ns2yzmZes082g&oe=6A99B050" },
  { name: "New Market", location: "Enugu North", special: "Fresh Produce", image: "https://images.pexels.com/photos/6193209/pexels-photo-6193209.jpeg" },
  { name: "Kenyatta Market", location: "Enugu South", special: "Cereal & Grains", image: "https://images.pexels.com/photos/30179960/pexels-photo-30179960.jpeg" },
  { name: "9th Mile Corner", location: "Ngwo", special: "Fruits & Tubers", image: "https://images.pexels.com/photos/6192532/pexels-photo-6192532.jpeg" },
  { name: "Abakpa Market", location: "Enugu East", special: "Vegetables", image: "https://images.pexels.com/photos/38968324/pexels-photo-38968324.jpeg" },
];

export default function Markets() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-16">
          <p className="text-[10px] font-black text-primary uppercase mb-4">Trading Hubs</p>
          <h1 className="text-5xl font-black text-gray-900 uppercase leading-none mb-4">
            Regional Markets
          </h1>
          <p className="text-xs text-gray-400 font-bold uppercasest max-w-lg">
            Discover the major agricultural trading hubs in Enugu state where fresh produce is consolidated daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {marketHubs.map((market) => (
            <div key={market.name} className="group relative rounded-xl overflow-hidden shadow-2xl h-[400px]">
              <img src={market.image} alt={market.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent flex flex-col justify-end p-8 text-white z-10 transition-all group-hover:from-primary/90">
                <span className="text-[8px] font-black uppercasest text-primary group-hover:text-white transition-colors mb-2">{market.location}</span>
                <h3 className="text-2xl font-black uppercase mb-4">{market.name}</h3>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500">
                   <p className="text-[10px] font-black uppercasest text-white/70">Specialty: {market.special}</p>
                   <button className="text-[10px] font-black uppercasest text-white border-b border-primary">Explore Vendors</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
