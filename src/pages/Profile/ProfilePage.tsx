
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfilePage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  if (!user) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="mb-6 text-gray-600">
            You need to login to access your profile.
          </p>
          <Link to="/login">
            <Button className="bg-blue-600 hover:bg-blue-700">
              {t("auth.login")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">{t("nav.profile")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                
                <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
                <p className="text-gray-600 capitalize">{user.role}</p>
                
                <Button 
                  variant="outline" 
                  className="mt-4 w-full"
                >
                  {t("profile.change_avatar")}
                </Button>
              </div>
              
              <div className="mt-8 border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">{t("profile.contact_info")}</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{user.email}</p>
                  </div>
                  {user.phone && (
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p>{user.phone}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          <Card className="shadow-lg mb-8">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">{t("profile.basic_info")}</h2>
                <Link to="/profile/edit">
                  <Button>
                    {t("profile.edit")}
                  </Button>
                </Link>
              </div>

              {user.role === "worker" ? (
                <div className="space-y-6">
                  <p className="text-gray-600">
                    Your worker profile is incomplete. Add your skills, experience, and other details to improve your chances of finding work.
                  </p>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-medium text-yellow-800">Complete your profile</h3>
                    <p className="text-yellow-700 text-sm mt-1">
                      A complete profile helps employers find you and increases your chances of getting hired.
                    </p>
                    <div className="mt-4">
                      <Button variant="outline" className="bg-yellow-100 border-yellow-300 text-yellow-800">
                        {t("worker.complete_profile")}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-gray-600">
                    Complete your employer profile to attract skilled workers for your projects.
                  </p>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-800">Post a job</h3>
                    <p className="text-blue-700 text-sm mt-1">
                      Start hiring skilled workers by posting your job requirements.
                    </p>
                    <div className="mt-4">
                      <Link to="/post-job">
                        <Button variant="outline" className="bg-blue-100 border-blue-300 text-blue-800">
                          {t("job.post_job")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {user.role === "employer" && (
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Your Posted Jobs</h2>
                
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-600">You haven't posted any jobs yet</p>
                  <Link to="/post-job">
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                      {t("job.post_job")}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
          
          {user.role === "worker" && (
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Your Applied Jobs</h2>
                
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-600">You haven't applied to any jobs yet</p>
                  <Link to="/jobs">
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                      {t("job.search_jobs")}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
