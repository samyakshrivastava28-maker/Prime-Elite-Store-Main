import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';
import { ShoppingBag } from 'lucide-react';
import { optimizeCloudinaryUrl } from '../utils/cloudinary';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = React.memo(({ product }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id!,
      name: product.productName,
      price: product.price,
      quantity: 1,
      image: product.variants?.[0]?.image || product.imageUrls?.[0] || '',
      category: product.category,
      color: product.variants?.[0]?.color || product.colors?.[0],    
    });
  };

  return (
    <div className="group flex flex-col bg-zinc-950 border border-white/5 rounded-xl pb-3 md:pb-5 overflow-hidden hover:border-gold-500/30 transition-colors w-full h-full min-w-0 md:min-w-[280px]">
      <Link to={`/products/${product.id}`} className="aspect-square bg-zinc-900 relative overflow-hidden flex items-center justify-center p-2.5 md:p-0">
         {!imageLoaded && (
           <div className="absolute inset-0 bg-white/5 animate-pulse" />
         )}
         {product.variants && product.variants.length > 0 ? (
           <img 
             src={optimizeCloudinaryUrl(product.variants[0].image, { width: 400 })} 
             alt={product.productName} 
             className={`object-cover w-full h-full rounded-md md:rounded-none group-hover:scale-105 transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} 
             loading="lazy" 
             onLoad={() => setImageLoaded(true)}
           />
         ) : product.imageUrls && product.imageUrls[0] ? (
           <img 
             src={optimizeCloudinaryUrl(product.imageUrls[0], { width: 400 })} 
             alt={product.productName} 
             className={`object-cover w-full h-full rounded-md md:rounded-none group-hover:scale-105 transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} 
             loading="lazy" 
             onLoad={() => setImageLoaded(true)}
           />
         ) : (
           <span className="text-zinc-800 font-display font-bold text-2xl md:text-4xl text-center px-4">IMAGE</span>
         )}
         
         <div className="absolute top-2 left-2 md:top-4 md:left-4 flex flex-col gap-1 md:gap-2">
           {product.offerPercentage > 0 && (
             <span className="bg-gold-500 text-black text-[8px] md:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 md:px-2 md:py-1 rounded-sm z-10 shadow-lg">
               -{product.offerPercentage}%
             </span>
           )}
           {product.trending && (
             <span className="bg-white text-black text-[8px] md:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 md:px-2 md:py-1 rounded-sm z-10 shadow-lg">
               HOT
             </span>
           )}
         </div>

         {/* Floating Tap for info text */}
         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
           <span className="bg-black/80 backdrop-blur-md text-white text-[10px] md:text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 shadow-2xl translate-y-4 group-hover:translate-y-0 transition-all duration-300">
             Tap to View Details
           </span>
         </div>
      </Link>
      
      <div className="p-3 md:p-5 flex flex-col flex-1 gap-1 md:gap-2">
        <div className="text-[10px] md:text-xs text-gold-500 tracking-wider font-mono uppercase truncate">{product.category}</div>
        <h3 className="font-light text-white text-sm md:text-lg tracking-wide line-clamp-2 leading-tight group-hover:text-gold-400 transition-colors">{product.productName}</h3>
        <p className="text-gray-400 text-[10px] md:text-xs line-clamp-2 md:line-clamp-3 leading-relaxed mt-1 hidden md:block">
          {product.description || 'Premium variant loaded with high-fidelity performance metrics.'}
        </p>
        
        <div className="mt-auto flex justify-between items-end pt-3">
          <div className="space-y-0.5 md:space-y-1">
            <div className="text-white text-base md:text-xl font-mono relative">
              <span className="text-gold-500 text-xs md:text-sm mr-1">₹</span>
              {product.price?.toLocaleString()}
            </div>
            {product.oldPrice > product.price && (
               <div className="text-gray-500 line-through text-[10px] md:text-xs">
                 ₹{product.oldPrice?.toLocaleString()}
               </div>
            )}
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 md:gap-2 text-[9px] md:text-xs font-bold uppercase tracking-wider text-black bg-gold-500 hover:bg-gold-400 border border-gold-500 px-3 py-2 md:px-4 md:py-2 rounded-lg transition-all z-10 whitespace-nowrap shadow-lg shadow-gold-500/20"
          >
            <ShoppingBag size={14} className="md:w-4 md:h-4" />
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
});
