import { useTranslation } from "react-i18next";
import { useAppStore } from "@/store/appStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, Globe, Clock, Bell, Info } from "lucide-react";
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
  
  const handleNotificationsChange = (notifications: boolean) => {
    updateSettings({ notifications });
  };
  
  const handleReminderTimeChange = (reminderTime: string) => {
    updateSettings({ reminderTime });
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-card border-border/50 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" />
            {t("settings.title")}
          </CardTitle>
        </CardHeader>
      </Card>

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

      {/* Notifications Settings */}
      <Card className="bg-gradient-card border-border/50 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="w-4 h-4" />
            {t("settings.notifications")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="daily-reminder" className="text-sm font-medium">
              {t("settings.dailyReminder")}
            </Label>
            <Switch
              id="daily-reminder"
              checked={settings.notifications}
              onCheckedChange={handleNotificationsChange}
            />
          </div>
          
          {settings.notifications && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {t("settings.reminderTime")}
              </Label>
              <Select value={settings.reminderTime} onValueChange={handleReminderTimeChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="07:00">07:00</SelectItem>
                  <SelectItem value="08:00">08:00</SelectItem>
                  <SelectItem value="09:00">09:00</SelectItem>
                  <SelectItem value="10:00">10:00</SelectItem>
                  <SelectItem value="11:00">11:00</SelectItem>
                  <SelectItem value="12:00">12:00</SelectItem>
                  <SelectItem value="18:00">18:00</SelectItem>
                  <SelectItem value="19:00">19:00</SelectItem>
                  <SelectItem value="20:00">20:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* About */}
      <Card className="bg-gradient-card border-border/50 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Info className="w-4 h-4" />
            {t("settings.about")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>{t("app.title")}</strong> ti aiuta a pianificare la tua routine di bellezza 
              seguendo i cicli naturali della luna.
            </p>
            <p>
              I consigli si basano su tradizioni antiche che collegano le fasi lunari 
              alla crescita dei capelli e all'efficacia dei trattamenti estetici.
            </p>
            <p className="pt-2 text-xs">
              Versione 1.0.0
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}