import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { PremiumCard, PremiumCardHeader, PremiumCardContent, PremiumCardFooter } from '@/components/ui/premium-card';

/**
 * Skeleton loaders that match actual component dimensions
 * for better perceived performance
 */

export const ServiceCardSkeleton = () => (
  <PremiumCard variant="elevated" size="lg" className="card-equal-height">
    <PremiumCardHeader>
      <Skeleton className="h-7 w-7 rounded mb-6" />
      <Skeleton className="h-6 w-3/4 mb-4" />
    </PremiumCardHeader>
    <PremiumCardContent className="card-content-grow">
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </PremiumCardContent>
    <PremiumCardFooter>
      <Skeleton className="h-5 w-24" />
    </PremiumCardFooter>
  </PremiumCard>
);

export const ProcessStepSkeleton = () => (
  <div className="space-y-4">
    <div className="flex items-start gap-4">
      <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  </div>
);

export const TeamMemberSkeleton = () => (
  <PremiumCard variant="elevated" size="lg" className="overflow-hidden">
    <div className="relative h-64 bg-muted">
      <Skeleton className="w-full h-full" />
    </div>
    <PremiumCardContent className="p-6 space-y-3">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
      <div className="space-y-2 pt-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </PremiumCardContent>
  </PremiumCard>
);

export const CalculatorSkeleton = () => (
  <PremiumCard variant="elevated" size="lg" className="p-6">
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-7 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <Skeleton className="h-32 w-full rounded" />
      <Skeleton className="h-10 w-full" />
    </div>
  </PremiumCard>
);

export const FAQSkeleton = () => (
  <div className="space-y-2">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="border border-border rounded-lg p-4">
        <Skeleton className="h-5 w-3/4" />
      </div>
    ))}
  </div>
);

export const CaseStudySkeleton = () => (
  <PremiumCard variant="elevated" size="lg" className="overflow-hidden">
    <div className="relative h-48 bg-muted">
      <Skeleton className="w-full h-full" />
    </div>
    <PremiumCardContent className="p-6 space-y-4">
      <Skeleton className="h-7 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex gap-4 pt-4">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex-1 space-y-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex-1 space-y-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </PremiumCardContent>
  </PremiumCard>
);
