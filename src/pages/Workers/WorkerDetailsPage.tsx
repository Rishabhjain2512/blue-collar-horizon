
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Worker } from "@/types";
import { getWorker } from "@/data/mockData";
import { MapPin, Video, Star, Calendar, Phone, Mail, ArrowLeft, MessageSquare, CheckCircle } from "lucide-react";

const WorkerDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    if (id) {
      // Simulate API call
      setTimeout(() => {
        const fetchedWorker = getWorker(id);
        if (fetchedWorker) {
          setWorker(fetchedWorker);
        }
        setIsLoading(false);
      }, 500);
    }
  }, [id]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Worker Not Found</h2>
          <p className="mb-6 text-gray-600">
            The worker profile you are looking for does not exist or has been removed.
          </p>
          <Link to="/workers">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Workers
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Link to="/workers" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("common.back")} {t("nav.workers")}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-lg mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={worker.avatar} alt={worker.name} />
                  <AvatarFallback>{getInitials(worker.name)}</AvatarFallback>
                </Avatar>
                
                <div className="md:ml-6 mt-4 md:mt-0">
                  <h1 className="text-3xl font-bold">{worker.name}</h1>
                  
                  <div className="flex items-center mt-2">
                    <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-gray-600">
                      {worker.location.city}, {worker.location.state}
                    </span>
                    
                    {worker.ratings && (
                      <div className="ml-4 flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>{worker.ratings.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                  
                  {worker.availability && (
                    <Badge className="mt-2 bg-green-100 text-green-800">
                      {t(`worker.${worker.availability}`)}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-3">{t("worker.skills")}</h2>
                <div className="flex flex-wrap gap-2">
                  {worker.skills.map((skill, index) => (
                    <Badge key={index} className="bg-blue-100 text-blue-800">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3">{t("worker.experience")}</h2>
                <p className="text-gray-700">{worker.experience}</p>
              </div>
              
              {worker.certifications && worker.certifications.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-3">{t("worker.certifications")}</h2>
                  <div className="space-y-3">
                    {worker.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center">
                        {cert.verified ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border border-gray-300 mr-2"></div>
                        )}
                        <span>{cert.name}</span>
                        {cert.verified && (
                          <Badge className="ml-2 bg-green-100 text-green-800">
                            Verified
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {!showContact && (
                <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
                  <p className="text-gray-600">Contact information is hidden</p>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => setShowContact(true)}
                  >
                    Show Contact Information
                  </Button>
                </div>
              )}
              
              {showContact && (
                <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h2 className="text-lg font-semibold mb-3">{t("profile.contact_info")}</h2>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-500 mr-2" />
                      <span>{worker.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-500 mr-2" />
                      <span>{worker.email}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          {/* Action buttons */}
          <Card className="shadow-lg mb-8">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Contact {worker.name}</h2>
              
              <div className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  {t("message.new_message")}
                </Button>
                
                <Button variant="outline" className="w-full" onClick={() => setShowContact(!showContact)}>
                  {showContact ? "Hide Contact Info" : "Show Contact Info"}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Video Resume Section */}
          {worker.videoResume && (
            <Card className="shadow-lg mb-8">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Video className="mr-2 h-5 w-5 text-blue-600" />
                  {t("worker.video_resume")}
                </h2>
                
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Video className="h-12 w-12 text-gray-400" />
                </div>
                
                <Button className="w-full mt-4">
                  View Video Resume
                </Button>
              </CardContent>
            </Card>
          )}
          
          {/* Ratings & Reviews Section */}
          {worker.ratings && (
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Star className="mr-2 h-5 w-5 text-yellow-500" />
                  {t("worker.ratings")} & {t("worker.reviews")}
                </h2>
                
                <div className="flex items-center mb-4">
                  <span className="text-3xl font-bold mr-2">{worker.ratings.toFixed(1)}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < Math.floor(worker.ratings) ? 'text-yellow-500' : 'text-gray-300'}`} 
                        fill={i < Math.floor(worker.ratings) ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                </div>
                
                {worker.reviews && worker.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {/* Reviews would be displayed here */}
                    <p className="text-gray-600">Reviews coming soon</p>
                  </div>
                ) : (
                  <p className="text-gray-600">No reviews yet</p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerDetailsPage;
