import { useTranslation } from "react-i18next";
import { useAppStore } from "@/store/appStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, Globe, Clock, Info } from "lucide-react";
import i18n from "@/lib/i18n";

export default function Settings() {
  const { t } = useTranslation();
  const { settings, updateSettings } = useAppStore();

  const handleLanguageChange = (language: 'it' | 'en') => {
    updateSettings({ language });
    i18n.changeLanguage(language);
  };

  const handleTimezoneChange = (timezone: string) => {
    updateSettings({ timezone });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          {t("settings.title")}
        </h1>
        <p className="text-white/80 text-sm">
          {t("settings.subtitle", "Configura le tue preferenze")}
        </p>
      </div>

      {/* Language Settings */}
      <Card className="bg-gradient-card border-border/50 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe className="w-4 h-4" />
            {t("settings.language")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={settings.language} onValueChange={handleLanguageChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="it">Italiano</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Timezone Settings */}
      <Card className="bg-gradient-card border-border/50 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="w-4 h-4" />
            {t("settings.timezone")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={settings.timezone} onValueChange={handleTimezoneChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Europe/Zurich">Europe/Zurich (CET)</SelectItem>
              <SelectItem value="Europe/Rome">Europe/Rome (CET)</SelectItem>
              <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
              <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
              <SelectItem value="America/Los_Angeles">America/Los_Angeles (PST)</SelectItem>
              <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>


    </div>
  );
}