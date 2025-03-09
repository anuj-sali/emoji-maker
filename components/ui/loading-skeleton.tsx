export function LoadingSkeleton() {
  return (
    <div className="animate-pulse flex items-center justify-center w-full aspect-square bg-muted rounded-lg">
      <div className="w-12 h-12 rounded-full bg-muted-foreground/20"></div>
    </div>
  );
}