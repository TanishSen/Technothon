import { cn } from "../lib/utils";

export function BorderBeam({ className }) {
  return (
    <>
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-[inherit] opacity-0 transition-opacity group-hover:opacity-100 animate-spin"
        style={{ animationDuration: "20s" }}
      >
        <div
          className={cn(
            "absolute inset-0 rounded-[inherit] border border-white/10",
            className
          )}
        />
        <div className="absolute inset-0 -z-10 rounded-[inherit] opacity-0 mix-blend-soft-light group-hover:opacity-100">
          <div className="relative z-10 h-full w-full">
            <div className="absolute left-1/2 top-1/2 h-1/4 w-1/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 opacity-50 blur-2xl" />
          </div>
        </div>
      </div>
    </>
  );
}
