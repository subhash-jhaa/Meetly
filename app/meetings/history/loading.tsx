import { Skeleton } from '@/components/ui/Skeleton';

export default function HistoryLoading() {
  return (
    <div className="min-h-screen bg-background text-white">
      <div className="sticky top-0 z-50 w-full flex justify-center bg-background/90 pt-4 px-4">
        <div className="relative flex w-full max-w-[1200px] h-[64px] items-center
                        border border-white/12 bg-surface px-6">
          <Skeleton className="h-7 w-7" />
        </div>
      </div>
      <div className="flex flex-col items-center px-4">
        <div className="w-full max-w-[1200px]">
          <div className="border-x border-white/12 px-8 pt-16 pb-10">
            <Skeleton className="h-3 w-16 mb-4" />
            <Skeleton className="h-10 w-56 mb-3" />
            <Skeleton className="h-3 w-32" />
          </div>
          {/* Table header */}
          <div className="border border-white/12 border-t-0 px-8 py-3">
            <div className="flex gap-8">
              {[80, 100, 120, 80, 120].map((w, i) => (
                <Skeleton key={i} className={`h-2.5 w-${w}`} style={{ width: w }} />
              ))}
            </div>
          </div>
          {/* Rows */}
          {[1, 2, 3, 4, 5].map(i => (
            <div
              key={i}
              className="border border-white/12 border-t-0 px-8 py-5
                         flex items-center justify-between"
            >
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3.5 w-52" />
                <Skeleton className="h-3 w-36" />
              </div>
              <Skeleton className="h-7 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}