import { ReactNode } from "react";
import { Button } from "./ui/button";
import { Calendar, Home, Settings, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { MoonIcon } from "./MoonIcon";
import { getMoonPhase } from "@/services/moonService";
import { useAppStore } from "@/store/appStore";
interface LayoutProps {
  children: ReactNode;
}
export function Layout({
  children
}: LayoutProps) {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    currentDate,
    settings
  } = useAppStore();

  // Get current moon phase for dynamic icon
  const currentMoonPhase = getMoonPhase(currentDate, settings.timezone);
  const navItems = [{
    path: "/",
    icon: Home,
    label: t("navigation.today")
  }, {
    path: "/calendar",
    icon: Calendar,
    label: t("navigation.calendar")
  }, {
    path: "/category-order",
    icon: List,
    label: t("categoryOrder.title")
  }, {
    path: "/settings",
    icon: Settings,
    label: t("navigation.settings")
  }];
  return <div className="min-h-screen bg-gradient-lunar">
      {/* Header */}
      <header className="bg-gradient-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 bg-purple-950">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-glow flex items-center justify-center shadow-glow">
                <MoonIcon phase={currentMoonPhase.phase} size="sm" className="text-white drop-shadow-sm" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">
                  {t("app.title")}
                </h1>
                <p className="text-xs text-white/80">
                  {t("app.subtitle")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gradient-card/95 backdrop-blur-sm border-t border-border/50">
        <div className="container mx-auto px-2">
          <div className="flex items-center justify-around py-1 bg-purple-950">
            {navItems.map(({
            path,
            icon: Icon,
            label
          }) => <Button key={path} variant="ghost" size="sm" onClick={() => navigate(path)} className={cn("flex flex-col items-center gap-0.5 h-auto py-1 px-2", "transition-smooth hover:bg-white/20 text-white", location.pathname === path && "text-black bg-white/90")}>
                <Icon className="w-4 h-4" />
                <span className="text-xs font-bold text-black">{label}</span>
              </Button>)}
          </div>
        </div>
      </nav>
    </div>;
}