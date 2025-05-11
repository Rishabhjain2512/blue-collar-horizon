
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { Language } from "@/types";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState<Language>(
    (localStorage.getItem("i18nextLng") as Language) || "en"
  );

  const changeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Globe size={16} />
          <span className="hidden md:inline">{t("nav.language")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className={language === "en" ? "bg-muted" : ""}
          onClick={() => changeLanguage("en")}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          className={language === "hi" ? "bg-muted" : ""}
          onClick={() => changeLanguage("hi")}
        >
          हिंदी (Hindi)
        </DropdownMenuItem>
        <DropdownMenuItem
          className={language === "kn" ? "bg-muted" : ""}
          onClick={() => changeLanguage("kn")}
        >
          ಕನ್ನಡ (Kannada)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
