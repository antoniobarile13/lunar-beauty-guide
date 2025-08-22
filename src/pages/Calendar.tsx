import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/appStore";
import { generateDailyAdviceRange } from "@/services/adviceService";
import { MoonIcon } from "@/components/MoonIcon";
import { BeautyBadge } from "@/components/BeautyBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
export default function Calendar() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const {
    settings
  } = useAppStore();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date().toISOString().split('T')[0];

  // Generate calendar data for current month
  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const startDate = new Date(startOfMonth);
  startDate.setDate(startDate.getDate() - startOfMonth.getDay()); // Start from Sunday
  const endDate = new Date(endOfMonth);
  endDate.setDate(endDate.getDate() + (6 - endOfMonth.getDay())); // End on Saturday

  const calendarAdvice = generateDailyAdviceRange(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0], settings.timezone, settings.language);
  const monthNames = t("months.long", {
    returnObjects: true
  }) as string[];
  const weekdays = t("weekdays.short", {
    returnObjects: true
  }) as string[];
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  const goToToday = () => {
    setCurrentMonth(new Date());
  };
  const handleDayClick = (dateISO: string) => {
    navigate(`/day/${dateISO}`);
  };
  return <div className="space-y-6">
      {/* Calendar Header */}
      <Card className="bg-gradient-card border-border/50 shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              {t("calendar.title")}
            </CardTitle>
            <Button variant="outline" size="sm" onClick={goToToday}>
              {t("calendar.goToToday")}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6 gap-2">
            <Button variant="ghost" size="sm" onClick={goToPreviousMonth} className="shrink-0">
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t("calendar.previousMonth")}</span>
            </Button>
            <h2 className="text-lg font-semibold text-center flex-1">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <Button variant="ghost" size="sm" onClick={goToNextMonth} className="shrink-0">
              <span className="hidden sm:inline">{t("calendar.nextMonth")}</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekdays.map(day => <div key={day} className="p-2 text-center text-xs font-medium text-muted-foreground">
                {day}
              </div>)}
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarAdvice.map(dayAdvice => {
            const date = new Date(dayAdvice.dateISO);
            const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
            const isToday = dayAdvice.dateISO === today;
            const dayNumber = date.getDate();
            return <button key={dayAdvice.dateISO} onClick={() => handleDayClick(dayAdvice.dateISO)} className={cn("p-2 rounded-lg border transition-smooth hover:shadow-soft", "flex flex-col items-center gap-1 min-h-[60px]", isCurrentMonth ? "bg-card border-border/50 hover:bg-accent/50" : "bg-muted/30 border-border/20 text-muted-foreground", isToday && "ring-2 ring-lunar-primary bg-accent")}>
                  <span className={cn("text-sm font-medium", isToday && "text-lunar-primary font-bold")}>
                    {dayNumber}
                  </span>
                  
                  {isCurrentMonth && <>
                      <MoonIcon phase={dayAdvice.phase} size="sm" />
                      
                    </>}
                </button>;
          })}
          </div>
        </CardContent>
      </Card>
      
      {/* Legend */}
      <Card className="bg-gradient-card border-border/50 shadow-soft">
        <CardContent className="p-4">
          <h3 className="font-medium mb-3 text-foreground">Legenda</h3>
          <div className="flex flex-wrap gap-2">
            <BeautyBadge type="Excellent" />
            <BeautyBadge type="Good" />
            <BeautyBadge type="Neutral" />
            <BeautyBadge type="NotIdeal" />
            <BeautyBadge type="Avoid" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Il pallino colorato indica il miglior consiglio del giorno
          </p>
        </CardContent>
      </Card>
    </div>;
}