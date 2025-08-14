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

const categoryColors = {
  cut: "beauty-cut",
  color: "beauty-color", 
  wax: "beauty-wax",
  treat: "beauty-treat"
};

export function BeautyCard({ category, advice, variant = "default", className }: BeautyCardProps) {
  const { t } = useTranslation();
  const Icon = categoryIcons[category];
  
  return (
    <Card className={cn(
      "bg-gradient-card border-border/50 shadow-soft transition-smooth hover:shadow-lunar",
      variant === "compact" && "p-3",
      className
    )}>
      <CardHeader className={cn(
        "pb-3",
        variant === "compact" && "pb-2 pt-0"
      )}>
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <div className={cn(
            "p-1.5 rounded-lg",
            `bg-${categoryColors[category]}/10 text-${categoryColors[category]}`
          )}>
            <Icon className="w-4 h-4" />
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