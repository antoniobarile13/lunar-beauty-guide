import { MoonPhase } from "@/types/lunar";
import { cn } from "@/lib/utils";

interface MoonIconProps {
  phase: MoonPhase;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "w-6 h-6 text-lg",
  md: "w-8 h-8 text-xl", 
  lg: "w-12 h-12 text-3xl",
  xl: "w-24 h-24 text-6xl"
};

const phaseEmojis = {
  NEW: '🌑',
  WAXING_CRESCENT: '🌒',
  FIRST_QUARTER: '🌓',
  WAXING_GIBBOUS: '🌔',
  FULL: '🌕',
  WANING_GIBBOUS: '🌖',
  LAST_QUARTER: '🌗',
  WANING_CRESCENT: '🌘'
};

export function MoonIcon({ phase, className, size = "md" }: MoonIconProps) {
  return (
    <div className={cn(
      "flex items-center justify-center",
      "drop-shadow-glow transition-smooth",
      sizeClasses[size],
      className
    )}>
      <span className="filter drop-shadow-sm">
        {phaseEmojis[phase]}
      </span>
    </div>
  );
}