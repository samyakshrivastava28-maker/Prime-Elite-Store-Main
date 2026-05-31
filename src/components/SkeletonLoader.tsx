import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className = '' }: SkeletonProps) => {
  return (
    <div className={`animate-pulse bg-zinc-800 rounded-md ${className}`}></div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="aspect-square w-full rounded-2xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const ProductDetailSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
      <Skeleton className="aspect-square w-full rounded-2xl animate-pulse" />
      <div className="flex flex-col justify-center space-y-6">
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-24 w-full" />
        <div className="space-y-4 pt-6 mt-6 border-t border-white/10">
          <Skeleton className="h-6 w-24" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-14 w-full mt-8 rounded-lg" />
      </div>
    </div>
  );
};

export const CollectionPageSkeleton = () => {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-48" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export const CartCheckoutSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
      <div className="lg:col-span-2 space-y-8">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-6 items-center p-4 bg-zinc-900/40 rounded-xl border border-white/5">
              <Skeleton className="w-20 h-20 rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-1/4" />
              </div>
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-zinc-900/40 p-6 rounded-2xl border border-white/5 space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export const ProfileOrdersSkeleton = () => {
  return (
    <div className="space-y-8 pt-8">
      <div className="flex items-center gap-6">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-60" />
        </div>
      </div>
      <div className="space-y-6 pt-6 border-t border-white/5">
        <Skeleton className="h-6 w-36" />
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="p-6 bg-zinc-900/20 rounded-xl border border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AdminDashboardSkeleton = () => {
  return (
    <div className="space-y-8 pt-8">
      <div className="space-y-2">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-zinc-900/20 p-5 rounded-2xl border border-white/5 space-y-3">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="h-64 lg:col-span-1 rounded-2xl" />
        <Skeleton className="h-64 lg:col-span-2 rounded-2xl" />
      </div>
    </div>
  );
};

