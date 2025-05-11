
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const HeroSection = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="relative bg-white overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 opacity-60"
        style={{ zIndex: -1 }}
      ></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-20 lg:pb-28 px-4 sm:px-6">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">{t("app.name")}</span>
                <span className="block text-blue-600 mt-2">{t("app.tagline")}</span>
              </h1>
              
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto lg:mx-0">
                Connect skilled blue-collar workers with employers through video resumes, skill matching, and direct communication.
              </p>
              
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                {!user && (
                  <>
                    <Link to="/register">
                      <Button size="lg" className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700">
                        {t("auth.register")}
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
                        {t("auth.login")}
                      </Button>
                    </Link>
                  </>
                )}
                
                {user && user.role === "worker" && (
                  <Link to="/jobs">
                    <Button size="lg" className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700">
                      {t("job.search_jobs")}
                    </Button>
                  </Link>
                )}
                
                {user && user.role === "employer" && (
                  <>
                    <Link to="/workers">
                      <Button size="lg" className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700">
                        {t("nav.workers")}
                      </Button>
                    </Link>
                    <Link to="/post-job">
                      <Button size="lg" variant="secondary" className="px-8 py-3 text-lg bg-orange-500 hover:bg-orange-600">
                        {t("job.post_job")}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0 lg:relative">
              <div className="aspect-w-5 aspect-h-3 rounded-lg shadow-xl overflow-hidden lg:absolute lg:inset-0">
                <img 
                  className="w-full h-full object-cover lg:w-full lg:h-full" 
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Blue-collar workers" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
