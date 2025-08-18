import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col items-start leading-tight', className)}>
      <span className="font-bold text-2xl text-primary font-headline">রং গৃহ</span>
      <span className="text-[10px] text-muted-foreground tracking-widest">
        Rong Griho
      </span>
    </div>
  );
}
