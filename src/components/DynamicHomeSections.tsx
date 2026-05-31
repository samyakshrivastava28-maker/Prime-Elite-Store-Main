import React, { useMemo } from 'react';
import { useAppStore } from '../store/appStore';
import { ProductCard } from './ProductCard';

export const DynamicHomeSections = () => {
  const { products } = useAppStore();

  const newArrivals = useMemo(() => {
    // Assuming ids are sequentially generated or we fallback to basic slicing.
    // If you have createdAt field on products, you would do `.sort((a,b) => b.createdAt - a.createdAt)`
    // Here we'll take the top 8 latest based on reverse order or an 'isNew' flag
    return [...products].reverse().slice(0, 8);
  }, [products]);

  const bestSellers = useMemo(() => {
    // Mock sort by popularity/stock dynamics since orderCount doesn't strictly exist heavily on Product type yet.
    // We can use offerPercentage > 0 or trending flags to influence it
    return [...products]
      .filter((p) => p.trending || p.offerPercentage > 10)
      .slice(0, 8);
  }, [products]);

  return (
    <div className="bg-black space-y-24 py-24 pb-32">
      {/* New Arrivals Section */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-5xl font-display font-light text-white">
              New <span className="font-bold text-gold-500">Arrivals</span>
            </h2>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {newArrivals.map((p) => (
              <div key={p.id} className="snap-start shrink-0 w-[280px] md:w-[320px]">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Best Sellers Section */}
      {bestSellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-5xl font-display font-light text-white">
              Best <span className="font-bold text-gold-500">Sellers</span>
            </h2>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {bestSellers.map((p) => (
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
