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
      <Skeleton className="aspect-square w-full rounded-2xl" />
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
