import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppStore } from "@/store/appStore";
import { getDailyAdvice } from "@/services/adviceService";
import { MoonIcon } from "@/components/MoonIcon";
import { BeautyCard } from "@/components/BeautyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Info } from "lucide-react";

export default function DayDetail() {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { settings } = useAppStore();
  
  if (!date) {
    navigate('/');
    return null;
  }
  
  const dayAdvice = getDailyAdvice(date, settings.timezone, settings.language);
  const formattedDate = new Date(date).toLocaleDateString(settings.language, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const handleBackToCalendar = () => {
    navigate('/calendar');
  };
  
  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleBackToCalendar}
        className="text-white hover:text-white/80 hover:bg-white/10">
        <ArrowLeft className="w-4 h-4" />
        {t("dayDetail.backToCalendar")}
      </Button>
      
      {/* Date and Moon Phase */}
      <Card className="bg-gradient-card border-border/50 shadow-lunar">
        <CardHeader>
          <CardTitle>{t("dayDetail.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <h1 className="text-xl font-bold text-foreground capitalize">
              {formattedDate}
            </h1>
            <MoonIcon phase={dayAdvice.phase} size="xl" className="mx-auto" />
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {t(`phases.${dayAdvice.phase}`)}
              </h2>
              <p className="text-sm text-lunar-primary font-medium mb-3">
                Luna in {t(`zodiac.${dayAdvice.zodiacSign}`)}
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span>
                  {t("today.illumination")}: {Math.round(dayAdvice.illumination * 100)}%
                </span>
                <span>•</span>
                <span>
                  {t("today.moonAge")}: {Math.round(dayAdvice.ageDays)} {t("today.days")}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Why Today */}
      <Card className="bg-gradient-card border-border/50 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            {t("dayDetail.whyToday")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {t(`phaseExplanations.${dayAdvice.phase}`)}
          </p>
        </CardContent>
      </Card>

      {/* Beauty Advice */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          {t("dayDetail.beautyAdvice")}
        </h2>
        
        <div className="grid grid-cols-1 gap-4">
          {Object.entries(dayAdvice.items).map(([category, advice]) => (
            <BeautyCard
              key={category}
              category={category as any}
              advice={advice}
              className={
                category === dayAdvice.bestCategory 
                  ? "ring-2 ring-lunar-primary/50 shadow-lunar" 
                  : ""
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}