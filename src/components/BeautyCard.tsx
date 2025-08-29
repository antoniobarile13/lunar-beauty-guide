import { BeautyCategory, BeautyAdviceItem } from "@/types/lunar";
import { BeautyBadge } from "./BeautyBadge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Scissors, Palette, Zap, Sparkles } from "lucide-react";

interface BeautyCardProps {
  category: BeautyCategory;
  advice: BeautyAdviceItem;
  variant?: "default" | "compact";
  className?: string;
}

const categoryIcons = {
  cut: Scissors,
  color: Palette,
  wax: Zap,
  treat: Sparkles
};

// Sfondi colorati per le icone come nella pagina filtri
const categoryIconBgs = {
  cut: "bg-beauty-cut/10",
  color: "bg-beauty-color/10",
  wax: "bg-beauty-wax/10",
  treat: "bg-beauty-treat/10"
};

const adviceBackgrounds = {
  Excellent: "bg-advice-excellent border-badge-excellent/20",
  Good: "bg-advice-good border-badge-good/20",
  Neutral: "bg-advice-neutral border-border/50",
  NotIdeal: "bg-advice-not-ideal border-badge-not-ideal/20",
  Avoid: "bg-advice-avoid border-badge-avoid/20"
};

export function BeautyCard({ category, advice, variant = "default", className }: BeautyCardProps) {
  const { t } = useTranslation();
  const Icon = categoryIcons[category];

  return (
    <Card className={cn(
      "shadow-soft transition-smooth hover:shadow-lunar",
      adviceBackgrounds[advice.badge],
      variant === "compact" && "p-3",
      className
    )}>
      <CardHeader className={cn(
        "pb-3",
        variant === "compact" && "pb-2 pt-0"
      )}>
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-smooth",
            categoryIconBgs[category]
          )}>
            <Icon className="w-5 h-5 text-yellow-500 drop-shadow-[0_0_1px_black]" />
          </div>
          <span>{t(`categories.${category}`)}</span>
          <BeautyBadge type={advice.badge} className="ml-auto" />
        </CardTitle>
      </CardHeader>
      <CardContent className={cn(
        "pt-0",
        variant === "compact" && "pb-0"
      )}>
        <h4 className="font-medium text-foreground mb-1">
          {advice.title}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {advice.text}
        </p>
      </CardContent>
    </Card>
  );
}