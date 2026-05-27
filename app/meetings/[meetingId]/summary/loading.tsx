import { Skeleton } from '@/components/ui/Skeleton';
import { Corners } from '@/components/ui/primitives';

export default function SummaryLoading() {
  return (
    <div className="min-h-screen bg-background text-white">
      <div className="sticky top-0 z-50 w-full flex justify-center bg-background/90 pt-4 px-4">
        <div className="relative flex w-full max-w-[1200px] h-[64px] items-center
                        border border-white/12 bg-surface px-6">
          <Corners />
          <Skeleton className="h-7 w-7" />
        </div>
      </div>
      <div className="flex flex-col items-center px-4">
        <div className="w-full max-w-[1200px]">
          <div className="border-x border-white/12 px-8 pt-16 pb-10">
            <Skeleton className="h-3 w-32 mb-4" />
            <Skeleton className="h-10 w-72 mb-3" />
            <Skeleton className="h-3 w-40" />
          </div>
          {[1, 2, 3].map(i => (
            <div key={i} className="border border-white/12 border-t-0">
              <div className="border-b border-white/12 px-8 py-5">
                <Skeleton className="h-3 w-24" />
              </div>
              <div className="px-8 py-6 flex flex-col gap-3">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-5/6" />
                <Skeleton className="h-3.5 w-4/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}