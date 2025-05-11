
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/Home/HeroSection";
import FeaturesSection from "@/components/Home/FeaturesSection";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      
      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{t("app.tagline")}</h2>
          <p className="mt-4 text-lg leading-6">
            Join our platform today and connect with opportunities or talents.
          </p>
          <div className="mt-8 flex justify-center">
            {!user ? (
              <>
                <Link to="/register">
                  <Button
                    size="lg"
                    className="px-8 py-3 text-lg bg-white text-blue-600 hover:bg-blue-50"
                  >
                    {t("auth.register")}
                  </Button>
                </Link>
                <span className="mx-4">or</span>
                <Link to="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-3 text-lg border-white text-white hover:bg-blue-700"
                  >
                    {t("auth.login")}
                  </Button>
                </Link>
              </>
            ) : user.role === "worker" ? (
              <Link to="/jobs">
                <Button
                  size="lg"
                  className="px-8 py-3 text-lg bg-white text-blue-600 hover:bg-blue-50"
                >
                  {t("job.search_jobs")}
                </Button>
              </Link>
            ) : (
              <Link to="/workers">
                <Button
                  size="lg"
                  className="px-8 py-3 text-lg bg-white text-blue-600 hover:bg-blue-50"
                >
                  {t("nav.workers")}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
