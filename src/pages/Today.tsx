import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/appStore";
import { getTodayAdvice } from "@/services/adviceService";
import { MoonIcon } from "@/components/MoonIcon";
import { BeautyCard } from "@/components/BeautyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Star, Calendar } from "lucide-react";
export default function Today() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const {
    settings,
    setCurrentDate
  } = useAppStore();

  // Get today's date and advice
  const today = new Date().toISOString().split('T')[0];
  const todayAdvice = getTodayAdvice(settings.timezone, settings.language);
  useEffect(() => {
    setCurrentDate(today);
  }, [today, setCurrentDate]);
  const handleSeeDetails = () => {
    navigate(`/day/${today}`);
  };
  const handleGoToCalendar = () => {
    navigate('/calendar');
  };
  return <div className="space-y-6">
      {/* Moon Phase Card */}
      <Card className="bg-gradient-card border-border/50 shadow-lunar">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <MoonIcon phase={todayAdvice.phase} size="xl" className="mx-auto" />
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">
                {t(`phases.${todayAdvice.phase}`)}
              </h2>
              <p className="text-sm text-lunar-primary font-medium mb-2">
                Luna in {t(`zodiac.${todayAdvice.zodiacSign}`)}
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span>
                  {t("today.illumination")}: {Math.round(todayAdvice.illumination * 100)}%
                </span>
                <span>•</span>
                <span>
                  {t("today.moonAge")}: {Math.round(todayAdvice.ageDays)} {t("today.days")}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best Advice Card */}
      <Card className="bg-gradient-beauty border-border/50 shadow-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-500 text-base font-bold">
            <Star className="w-5 h-5 fill-current" />
            {t("today.bestAdvice")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-white">
            <h3 className="font-semibold mb-1 text-gray-800">
              {todayAdvice.items[todayAdvice.bestCategory].title}
            </h3>
            <p className="text-sm text-gray-800">
              {todayAdvice.items[todayAdvice.bestCategory].text}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Today's Advice Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            {t("today.todayAdvice")}
          </h2>
          <Button variant="outline" size="sm" onClick={handleSeeDetails} className="gap-2">
            {t("today.seeDetails")}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(todayAdvice.items).map(([category, advice]) => <BeautyCard key={category} category={category as any} advice={advice} variant="compact" />)}
        </div>
      </div>

      {/* Calendar CTA */}
      <Card className="bg-gradient-card border-border/50 shadow-soft">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <h3 className="font-semibold text-foreground">
              {t("calendar.title")}
            </h3>
            <p className="text-sm text-muted-foreground">
              Esplora i consigli per tutti i giorni del mese
            </p>
            <Button onClick={handleGoToCalendar} className="bg-lunar-primary hover:bg-lunar-primary/90 text-primary-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              Vai al calendario
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>;
}