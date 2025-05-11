
import { useTranslation } from "react-i18next";
import RegisterForm from "@/components/Auth/RegisterForm";

const RegisterPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{t("auth.register")}</h1>
        <p className="text-gray-600 mt-2">
          {t("auth.register_prompt")}
        </p>
      </div>

      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
