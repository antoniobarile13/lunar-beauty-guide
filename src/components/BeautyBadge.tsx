import { BadgeType } from "@/types/lunar";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface BeautyBadgeProps {
  type: BadgeType;
  className?: string;
}

const badgeStyles = {
  Excellent: "bg-badge-excellent text-white shadow-soft",
  Good: "bg-badge-good text-green-800 shadow-soft",
  Neutral: "bg-badge-neutral text-foreground shadow-soft",
  NotIdeal: "bg-badge-not-ideal text-orange-800 shadow-soft",
  Avoid: "bg-badge-avoid text-white shadow-soft"
};

export function BeautyBadge({ type, className }: BeautyBadgeProps) {
  const { t } = useTranslation();
  
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      "transition-smooth",
      badgeStyles[type],
      className
    )}>
      {t(`badges.${type}`)}
    </span>
  );
}