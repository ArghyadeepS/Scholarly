import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "hi", name: "हिंदी (Hindi)", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা (Bengali)", flag: "🇧🇩" },
    { code: "mr", name: "मराठी (Marathi)", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ் (Tamil)", flag: "🇮🇳" },
    { code: "te", name: "తెలుగు (Telugu)", flag: "🇮🇳" },
    { code: "gu", name: "ગુજરાતી (Gujarati)", flag: "🇮🇳" },
    { code: "kn", name: "ಕನ್ನಡ (Kannada)", flag: "🇮🇳" },
    { code: "ml", name: "മലയാളം (Malayalam)", flag: "🇮🇳" },
    { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)", flag: "🇮🇳" },
    { code: "ur", name: "اردو (Urdu)", flag: "🇵🇰" },
  ];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <span className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
