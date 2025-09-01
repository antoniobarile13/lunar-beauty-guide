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

  const handleLanguageChange = (language: 'it' | 'en' | 'de' | 'es' | 'fr' | 'pt') => {
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
              <SelectItem value="it">🇮🇹 Italiano</SelectItem>
              <SelectItem value="en">🇬🇧 English</SelectItem>
              <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
              <SelectItem value="es">🇪🇸 Español</SelectItem>
              <SelectItem value="fr">🇫🇷 Français</SelectItem>
              <SelectItem value="pt">🇵🇹 Português</SelectItem>
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
            <SelectContent className="max-h-60">
              {/* Europe */}
              <SelectItem value="Europe/London">🇬🇧 London (GMT)</SelectItem>
              <SelectItem value="Europe/Paris">🇫🇷 Paris (CET)</SelectItem>
              <SelectItem value="Europe/Berlin">🇩🇪 Berlin (CET)</SelectItem>
              <SelectItem value="Europe/Rome">🇮🇹 Rome (CET)</SelectItem>
              <SelectItem value="Europe/Madrid">🇪🇸 Madrid (CET)</SelectItem>
              <SelectItem value="Europe/Zurich">🇨🇭 Zurich (CET)</SelectItem>
              <SelectItem value="Europe/Amsterdam">🇳🇱 Amsterdam (CET)</SelectItem>
              <SelectItem value="Europe/Vienna">🇦🇹 Vienna (CET)</SelectItem>
              <SelectItem value="Europe/Prague">🇨🇿 Prague (CET)</SelectItem>
              <SelectItem value="Europe/Warsaw">🇵🇱 Warsaw (CET)</SelectItem>
              <SelectItem value="Europe/Budapest">🇭🇺 Budapest (CET)</SelectItem>
              <SelectItem value="Europe/Bucharest">🇷🇴 Bucharest (EET)</SelectItem>
              <SelectItem value="Europe/Athens">🇬🇷 Athens (EET)</SelectItem>
              <SelectItem value="Europe/Helsinki">🇫🇮 Helsinki (EET)</SelectItem>
              <SelectItem value="Europe/Stockholm">🇸🇪 Stockholm (CET)</SelectItem>
              <SelectItem value="Europe/Oslo">🇳🇴 Oslo (CET)</SelectItem>
              <SelectItem value="Europe/Copenhagen">🇩🇰 Copenhagen (CET)</SelectItem>
              <SelectItem value="Europe/Dublin">🇮🇪 Dublin (GMT)</SelectItem>
              <SelectItem value="Europe/Lisbon">🇵🇹 Lisbon (WET)</SelectItem>
              <SelectItem value="Europe/Moscow">🇷🇺 Moscow (MSK)</SelectItem>
              
              {/* Americas */}
              <SelectItem value="America/New_York">🇺🇸 New York (EST)</SelectItem>
              <SelectItem value="America/Chicago">🇺🇸 Chicago (CST)</SelectItem>
              <SelectItem value="America/Denver">🇺🇸 Denver (MST)</SelectItem>
              <SelectItem value="America/Los_Angeles">🇺🇸 Los Angeles (PST)</SelectItem>
              <SelectItem value="America/Toronto">🇨🇦 Toronto (EST)</SelectItem>
              <SelectItem value="America/Vancouver">🇨🇦 Vancouver (PST)</SelectItem>
              <SelectItem value="America/Mexico_City">🇲🇽 Mexico City (CST)</SelectItem>
              <SelectItem value="America/Sao_Paulo">🇧🇷 São Paulo (BRT)</SelectItem>
              <SelectItem value="America/Buenos_Aires">🇦🇷 Buenos Aires (ART)</SelectItem>
              <SelectItem value="America/Santiago">🇨🇱 Santiago (CLT)</SelectItem>
              <SelectItem value="America/Lima">🇵🇪 Lima (PET)</SelectItem>
              <SelectItem value="America/Bogota">🇨🇴 Bogotá (COT)</SelectItem>
              
              {/* Asia Pacific */}
              <SelectItem value="Asia/Tokyo">🇯🇵 Tokyo (JST)</SelectItem>
              <SelectItem value="Asia/Shanghai">🇨🇳 Shanghai (CST)</SelectItem>
              <SelectItem value="Asia/Hong_Kong">🇭🇰 Hong Kong (HKT)</SelectItem>
              <SelectItem value="Asia/Singapore">🇸🇬 Singapore (SGT)</SelectItem>
              <SelectItem value="Asia/Seoul">🇰🇷 Seoul (KST)</SelectItem>
              <SelectItem value="Asia/Taipei">🇹🇼 Taipei (CST)</SelectItem>
              <SelectItem value="Asia/Bangkok">🇹🇭 Bangkok (ICT)</SelectItem>
              <SelectItem value="Asia/Jakarta">🇮🇩 Jakarta (WIB)</SelectItem>
              <SelectItem value="Asia/Manila">🇵🇭 Manila (PST)</SelectItem>
              <SelectItem value="Asia/Kuala_Lumpur">🇲🇾 Kuala Lumpur (MYT)</SelectItem>
              <SelectItem value="Asia/Kolkata">🇮🇳 Mumbai (IST)</SelectItem>
              <SelectItem value="Asia/Dubai">🇦🇪 Dubai (GST)</SelectItem>
              <SelectItem value="Asia/Riyadh">🇸🇦 Riyadh (AST)</SelectItem>
              <SelectItem value="Asia/Tehran">🇮🇷 Tehran (IRST)</SelectItem>
              <SelectItem value="Asia/Istanbul">🇹🇷 Istanbul (TRT)</SelectItem>
              
              {/* Africa */}
              <SelectItem value="Africa/Cairo">🇪🇬 Cairo (EET)</SelectItem>
              <SelectItem value="Africa/Lagos">🇳🇬 Lagos (WAT)</SelectItem>
              <SelectItem value="Africa/Johannesburg">🇿🇦 Johannesburg (SAST)</SelectItem>
              <SelectItem value="Africa/Casablanca">🇲🇦 Casablanca (WET)</SelectItem>
              <SelectItem value="Africa/Nairobi">🇰🇪 Nairobi (EAT)</SelectItem>
              
              {/* Oceania */}
              <SelectItem value="Australia/Sydney">🇦🇺 Sydney (AEST)</SelectItem>
              <SelectItem value="Australia/Melbourne">🇦🇺 Melbourne (AEST)</SelectItem>
              <SelectItem value="Australia/Perth">🇦🇺 Perth (AWST)</SelectItem>
              <SelectItem value="Pacific/Auckland">🇳🇿 Auckland (NZST)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>


    </div>
  );
}