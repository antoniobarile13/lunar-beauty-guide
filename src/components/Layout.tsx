import { ReactNode } from "react";
import { Button } from "./ui/button";
import { Calendar, Home, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { path: "/", icon: Home, label: t("navigation.today") },
    { path: "/calendar", icon: Calendar, label: t("navigation.calendar") },
    { path: "/settings", icon: Settings, label: t("navigation.settings") }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-lunar">
      {/* Header */}
      <header className="bg-gradient-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-glow flex items-center justify-center text-lg shadow-glow">
                🌙
              </div>
              <div>
                <h1 className="text-lg font-semibold text-lunar-primary">
                  {t("app.title")}
                </h1>
                <p className="text-xs text-lunar-glow">
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
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Button
                key={path}
                variant="ghost"
                size="sm"
                onClick={() => navigate(path)}
                className={cn(
                  "flex flex-col items-center gap-1 h-auto py-2 px-3",
                  "transition-smooth hover:bg-accent/50 text-lunar-primary",
                  location.pathname === path && "text-lunar-glow bg-accent/30"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{label}</span>
              </Button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}