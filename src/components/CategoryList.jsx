import React from 'react';

const categories = [
  { name: 'Vegetables', icon: 'fas fa-leaf', image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=300&h=300&auto=format&fit=crop' },
  { name: 'Grains', icon: 'fas fa-seedling', image: 'https://images.unsplash.com/photo-1586201327693-86649f7ba80d?q=80&w=300&h=300&auto=format&fit=crop' },
  { name: 'Roots', icon: 'fas fa-box-open', image: 'https://i.pinimg.com/1200x/49/4e/8e/494e8eb058f63e67fab6ef6662edf16e.jpg' },
  { name: 'Fruits', icon: 'fas fa-apple-alt', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=300&h=300&auto=format&fit=crop' },
  { name: 'Oils', icon: 'fas fa-tint', image: 'https://i.pinimg.com/1200x/2d/a5/cb/2da5cb4f8f4a1f6a1d1e4e886b34af2a.jpg' },
  { name: 'Spices', icon: 'fas fa-pepper-hot', image: 'https://i.pinimg.com/1200x/85/5e/74/855e74af0d4b469be60828d41e886b34.jpg' },
];

export default function CategoryList({ onSelect }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 font-sans">
      <div className="flex flex-col items-center mb-16">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-4">Explore Markets</p>
        <h2 className="text-4xl font-black text-gray-900 italic uppercase tracking-tighter">Shop by Category</h2>
        <div className="w-12 h-1 bg-primary mt-6 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
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
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-primary transition-colors duration-300 italic">{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
