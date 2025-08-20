import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Scissors, Palette, Zap, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BeautyCategory } from "@/types/lunar";
import { generateDailyAdviceRange } from "@/services/adviceService";
import { BeautyBadge } from "@/components/BeautyBadge";
import { cn } from "@/lib/utils";
interface CategoryData {
  category: BeautyCategory;
  icon: typeof Scissors;
  color: string;
  bgColor: string;
}
const categories: CategoryData[] = [{
  category: 'cut',
  icon: Scissors,
  color: 'text-beauty-cut',
  bgColor: 'bg-beauty-cut/10'
}, {
  category: 'color',
  icon: Palette,
  color: 'text-beauty-color',
  bgColor: 'bg-beauty-color/10'
}, {
  category: 'wax',
  icon: Zap,
  color: 'text-beauty-wax',
  bgColor: 'bg-beauty-wax/10'
}, {
  category: 'treat',
  icon: Sparkles,
  color: 'text-beauty-treat',
  bgColor: 'bg-beauty-treat/10'
}];
export default function CategoryOrder() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<BeautyCategory | null>(null);
  const [favorableDates, setFavorableDates] = useState<any[]>([]);
  const handleCategorySelect = (category: BeautyCategory) => {
    setSelectedCategory(category);

    // Calcola le date favorevoli per i prossimi 30 giorni
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 30);
    const startDateISO = today.toISOString().split('T')[0];
    const endDateISO = endDate.toISOString().split('T')[0];
    const adviceRange = generateDailyAdviceRange(startDateISO, endDateISO, 'Europe/Zurich', 'it');

    // Filtra solo le date con punteggio positivo per la categoria selezionata
    const favorable = adviceRange.filter(advice => advice.items[category].score >= 1).sort((a, b) => b.items[category].score - a.items[category].score).slice(0, 10); // Mostra solo le prime 10 date migliori

    setFavorableDates(favorable);
  };
  const handleBack = () => {
    if (selectedCategory) {
      setSelectedCategory(null);
      setFavorableDates([]);
    } else {
      navigate('/');
    }
  };
  const formatDate = (dateISO: string) => {
    const date = new Date(dateISO);
    return date.toLocaleDateString('it-IT', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };
  if (selectedCategory) {
    const categoryData = categories.find(c => c.category === selectedCategory)!;
    const Icon = categoryData.icon;
    return <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleBack} className="text-white hover:bg-white/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("categoryOrder.back")}
          </Button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", categoryData.bgColor)}>
            <Icon className={cn("w-6 h-6", categoryData.color)} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {t(`categories.${selectedCategory}`)}
            </h1>
            <p className="text-white/80">
              {t("categoryOrder.favorableDatesFor", {
              category: t(`categories.${selectedCategory}`)
            })}
            </p>
          </div>
        </div>

        {/* Date favorevoli */}
        <div className="space-y-4">
          {favorableDates.length === 0 ? <Card className="bg-gradient-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  {t("categoryOrder.noFavorableDates")}
                </p>
              </CardContent>
            </Card> : favorableDates.map(advice => <Card key={advice.dateISO} className="bg-gradient-card/80 backdrop-blur-sm border-border/50 hover:shadow-soft transition-smooth cursor-pointer" onClick={() => navigate(`/day/${advice.dateISO}`)}>
                <CardContent className="p-4 bg-slate-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">
                          {new Date(advice.dateISO).getDate()}
                        </div>
                        <div className="text-xs text-muted-foreground uppercase">
                          {new Date(advice.dateISO).toLocaleDateString('it-IT', {
                      month: 'short'
                    })}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {formatDate(advice.dateISO)}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {advice.items[selectedCategory].title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {t(`phases.${advice.phase}`)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {t(`zodiac.${advice.zodiacSign}`)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <BeautyBadge type={advice.items[selectedCategory].badge} />
                      <div className="text-xs text-muted-foreground mt-1">
                        {t("categoryOrder.score")}: {advice.items[selectedCategory].score}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
        </div>

        {/* Spiegazione */}
        <Card className="bg-gradient-card/80 backdrop-blur-sm border-border/50">
          <CardHeader className="bg-gray-200">
            <CardTitle className="text-foreground">
              {t("categoryOrder.explanationTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-yellow-50">
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t(`categoryOrder.explanation.${selectedCategory}`)}
            </p>
          </CardContent>
        </Card>
      </div>;
  }
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={handleBack} className="text-white hover:bg-white/10">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("navigation.today")}
        </Button>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-white mb-2">
          {t("categoryOrder.title")}
        </h1>
        <p className="text-white/80">
          {t("categoryOrder.subtitle")}
        </p>
      </div>

      {/* Grid delle categorie */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map(categoryData => {
        const Icon = categoryData.icon;
        return <Card key={categoryData.category} className="bg-gradient-card/80 backdrop-blur-sm border-border/50 hover:shadow-soft transition-smooth cursor-pointer group" onClick={() => handleCategorySelect(categoryData.category)}>
              <CardContent className="p-6 bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className={cn("w-16 h-16 rounded-xl flex items-center justify-center transition-smooth group-hover:scale-110", "bg-beauty-cut/10")}>
                    <Icon className={cn("w-8 h-8", categoryData.category === 'treat' ? "text-yellow-500 stroke-black stroke-1" : categoryData.color)} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {t(`categories.${categoryData.category}`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`categoryOrder.descriptions.${categoryData.category}`)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>;
      })}
      </div>

      {/* Info card */}
      <Card className="bg-gradient-card/80 backdrop-blur-sm border-border/50">
        <CardContent className="p-6 bg-gray-300">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-lunar-glow/20 flex items-center justify-center flex-shrink-0 mt-1">
              🌙
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                {t("categoryOrder.howItWorks")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("categoryOrder.howItWorksDescription")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
}