
import { useTranslation } from "react-i18next";
import LoginForm from "@/components/Auth/LoginForm";

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{t("auth.login")}</h1>
        <p className="text-gray-600 mt-2">
          {t("auth.login_prompt")}
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Now using Supabase for secure authentication
        </p>
      </div>

      <LoginForm />
    </div>
  );
};

export default LoginPage;
