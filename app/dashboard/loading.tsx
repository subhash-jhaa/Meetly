import { Skeleton } from '@/components/ui/Skeleton';
import { Corners } from '@/components/ui/primitives';

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background text-white">

      {/* Nav skeleton */}
      <div className="sticky top-0 z-50 w-full flex justify-center bg-background/90 pt-4 px-4">
        <div className="relative flex w-full max-w-[1200px] h-[64px] items-center
                        justify-between border border-white/12 bg-surface px-6">
          <Corners />
          <Skeleton className="h-7 w-7" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      <div className="flex flex-col items-center px-4">
        <div className="w-full max-w-[1200px]">

          {/* Header skeleton */}
          <div className="border-x border-white/12 px-8 pt-16 pb-10">
            <Skeleton className="h-3 w-20 mb-4" />
            <Skeleton className="h-10 w-64 mb-3" />
            <Skeleton className="h-3 w-40" />
          </div>

          {/* New meeting + join panels */}
          <div className="border border-white/12 border-t-0 flex flex-col md:flex-row">
            <div className="flex-1 border-b md:border-b-0 md:border-r border-white/12 p-8">
              <Skeleton className="h-3 w-24 mb-6" />
              <div className="flex gap-0 mb-6 w-fit">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-20" />
              </div>
              <div className="flex flex-col gap-3">
                <Skeleton className="h-11 w-full" />
                <Skeleton className="h-11 w-full" />
              </div>
            </div>
            <div className="flex-1 p-8">
              <Skeleton className="h-3 w-32 mb-6" />
              <div className="flex flex-col gap-3">
                <Skeleton className="h-11 w-full" />
                <Skeleton className="h-11 w-full" />
              </div>
            </div>
          </div>

          {/* History rows */}
          <div className="border border-white/12 border-t-0">
            <div className="border-b border-white/12 px-8 py-5">
              <Skeleton className="h-3 w-28" />
            </div>
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="flex items-center justify-between px-8 py-5
                           border-b border-white/12 last:border-0"
              >
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-3.5 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-7 w-28" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}