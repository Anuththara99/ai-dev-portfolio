import React from "react";
import clsx from "clsx";

export function GlassSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={clsx(
        "backdrop-blur-md rounded-3xl shadow-xl border",
        "bg-white/60 dark:bg-black/30",
        "border-white/20 dark:border-white/20",
        "p-6 md:p-10",
        className
      )}
    >
      {children}
    </section>
  );
} 