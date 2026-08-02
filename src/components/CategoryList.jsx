import React from 'react';
import { useApp } from '../context/useAppContext';

const categories = [
  { name: 'Vegetables', key: 'vegetables', icon: 'fas fa-leaf', image: 'https://i.pinimg.com/736x/9d/11/f2/9d11f2080e301f2f79b79a9364ef2b4b.jpg' },
  { name: 'Grains', key: 'grains', icon: 'fas fa-wheat-awn', image: 'https://i.pinimg.com/1200x/b5/ef/e3/b5efe340e7d97fb9d0dde05625c82330.jpg' },
  { name: 'Roots', key: 'roots', icon: 'fas fa-carrot', image: 'https://i.pinimg.com/1200x/49/4e/8e/494e8eb058f63e67fab6ef6662edf16e.jpg' },
  { name: 'Fruits', key: 'fruits', icon: 'fas fa-apple-alt', image: 'https://i.pinimg.com/736x/6f/c7/d3/6fc7d309207ff0265fe6326a5132a7f7.jpg' },
  { name: 'Meat', key: 'meat', icon: 'fas fa-cow', image: 'https://i.pinimg.com/736x/c8/63/d9/c863d92a74576d7ade497ff36d064d45.jpg' },
  { name: 'Fish', key: 'fish', icon: 'fas fa-fish-fins', image: 'https://i.pinimg.com/1200x/83/9f/50/839f509321e6b3883be11280f95f613d.jpg' },
  { name: 'Poultry', key: 'poultry', icon: 'fas fa-feather', image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=300&h=300&auto=format&fit=crop' },
  { name: 'Oils', key: 'palm_oil', icon: 'fas fa-tint', image: 'https://i.pinimg.com/1200x/7b/f3/82/7bf3820f4cd358223af714cf59cf80bc.jpg' },
  { name: 'Spices', key: 'spices', icon: 'fas fa-pepper-hot', image: 'https://i.pinimg.com/1200x/85/5e/74/855e74af0d4b469be60828d41e886b34.jpg' },
  { name: 'Processed', key: 'processed', icon: 'fas fa-bowl-food', image: 'https://i.pinimg.com/1200x/ea/4f/c0/ea4fc008379a6af31efbaf623d6ce284.jpg' },
];

export default function CategoryList({ onSelect }) {
  const { t } = useApp();

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 font-sans">
      <div className="flex flex-col items-center mb-16">
        <p className="text-[10px] font-black text-gray-400 uppercase mb-4">{t("explore_markets")}</p>
        <h2 className="text-4xl font-black text-gray-900 uppercase">{t("shop_by_category")}</h2>
        <div className="w-12 h-1 bg-primary mt-6 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {categories.map((cat) => (
          <div 
            key={cat.name}
            onClick={() => onSelect(cat.name)}
            className="group cursor-pointer flex flex-col items-center text-center"
          >
            <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-6 border border-gray-100 shadow-sm group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 grayscale-[0.3] group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                 <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-primary shadow-xl">
                    <i className={`${cat.icon} text-lg`}></i>
                  </div>
              </div>
            </div>
            <span className="text-[10px] font-black uppercase text-gray-400 group-hover:text-primary transition-colors duration-300">
              {t(cat.key)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}