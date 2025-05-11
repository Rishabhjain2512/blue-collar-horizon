
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LogIn } from "lucide-react";

const LoginForm = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      setIsLoading(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-8">
          <LogIn className="w-12 h-12 mx-auto text-blue-600" />
          <h2 className="text-2xl font-bold mt-4">{t("auth.login")}</h2>
          <p className="text-gray-500 mt-2">{t("auth.login_prompt")}</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="form-input"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t("auth.password")}</Label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {t("auth.forgot_password")}
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full btn-primary py-2"
              disabled={isLoading}
            >
              {isLoading ? t("common.loading") : t("auth.login")}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {t("auth.register_prompt")}{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
              {t("auth.register")}
            </Link>
          </p>
          
          {/* Demo accounts information */}
          <div className="mt-8 border-t pt-4">
            <p className="text-sm font-semibold text-gray-500 mb-2">Demo Accounts</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="bg-blue-50 p-2 rounded">
                <p><strong>Worker:</strong> worker@example.com</p>
                <p><strong>Password:</strong> password</p>
              </div>
              <div className="bg-orange-50 p-2 rounded">
                <p><strong>Employer:</strong> employer@example.com</p>
                <p><strong>Password:</strong> password</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
