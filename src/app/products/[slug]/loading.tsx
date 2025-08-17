
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function ProductPageLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <Skeleton className="w-full aspect-[4/5] rounded-lg" />
          <div className="grid grid-cols-4 gap-2 mt-2">
            <Skeleton className="w-full aspect-square rounded-md" />
            <Skeleton className="w-full aspect-square rounded-md" />
            <Skeleton className="w-full aspect-square rounded-md" />
            <Skeleton className="w-full aspect-square rounded-md" />
          </div>
        </div>
        <div className="py-4 space-y-4">
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-8 w-1/3" />
          <Separator className="my-6" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-28 mt-6" />
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
