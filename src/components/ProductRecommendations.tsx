import React, { useMemo } from 'react';
import { useAppStore } from '../store/appStore';
import { useRecentsStore } from '../store/recentsStore';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface ProductRecommendationsProps {
  currentProductId?: string;
  currentCategory?: string;
}

export const ProductRecommendations = ({ currentProductId, currentCategory }: ProductRecommendationsProps) => {
  const { products } = useAppStore();
  const { recentProductIds } = useRecentsStore();

  // "You May Also Like" - Related Products
  const relatedProducts = useMemo(() => {
    if (!currentCategory) return [];
    return products
      .filter((p) => p.category === currentCategory && p.id !== currentProductId)
      .slice(0, 8); // maximum 8
  }, [products, currentCategory, currentProductId]);

  // "Recently Viewed"
  const recentlyViewed = useMemo(() => {
    return recentProductIds
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => p !== undefined && p.id !== currentProductId);
  }, [recentProductIds, products, currentProductId]);

  if (relatedProducts.length === 0 && recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div className="space-y-24">
      {relatedProducts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-light text-white">
              You May <span className="font-bold text-gold-500">Also Like</span>
            </h2>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {relatedProducts.map((p) => (
              <div key={p.id} className="snap-start shrink-0 w-[280px] md:w-[320px]">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      {recentlyViewed.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-light text-white">
              Recently <span className="font-bold text-gold-500">Viewed</span>
            </h2>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {recentlyViewed.map((p) => (
              <div key={p.id} className="snap-start shrink-0 w-[280px] md:w-[320px]">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
