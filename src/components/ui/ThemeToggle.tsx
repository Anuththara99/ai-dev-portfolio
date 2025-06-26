'use client';

import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-700 dark:text-gray-300">Dark</span>
      <Switch
        checked={isDark}
        onCheckedChange={(v: boolean) => setTheme(v ? "dark" : "light")}
        aria-label="Toggle dark mode"
      />
    </div>
  );
}

export default ThemeToggle; 