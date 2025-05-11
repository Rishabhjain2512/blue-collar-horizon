
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types";
import { getJob } from "@/data/mockData";
import { MapPin, Calendar, Briefcase, Building, Clock, DollarSign, ArrowLeft, MessageSquare } from "lucide-react";
import { format } from "date-fns";

const JobDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Simulate API call
      setTimeout(() => {
        const fetchedJob = getJob(id);
        if (fetchedJob) {
          setJob(fetchedJob);
        }
        setIsLoading(false);
      }, 500);
    }
  }, [id]);

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

  if (!job) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
          <p className="mb-6 text-gray-600">
            The job you are looking for does not exist or has been removed.
          </p>
          <Link to="/jobs">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Link to="/jobs" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("common.back")} {t("nav.jobs")}
      </Link>

      <Card className="shadow-lg">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">{job.title}</h1>
              
              <div className="flex items-center mt-2 text-gray-600">
                <Building className="h-4 w-4 mr-2" />
                <span>{job.employerName}</span>
              </div>
              
              <div className="flex items-center mt-2 text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{job.location.city}, {job.location.state}</span>
              </div>
              
              <div className="flex items-center mt-2 text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{t("job.posted_on")} {format(new Date(job.createdAt), 'MMM dd, yyyy')}</span>
              </div>
            </div>
            
            {job.employerLogo && (
              <div className="mt-4 md:mt-0 md:ml-6">
                <img 
                  src={job.employerLogo} 
                  alt={job.employerName}
                  className="w-24 h-24 object-contain rounded-md"
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
              <Briefcase className="h-3 w-3 mr-1" />
              {job.status === 'open' ? t("job.open") : job.status === 'closed' ? t("job.closed") : t("job.filled")}
            </Badge>
            
            {job.salary && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                <DollarSign className="h-3 w-3 mr-1" />
                ₹{job.salary.min.toLocaleString()} - ₹{job.salary.max.toLocaleString()} / {t(`job.${job.salary.period}`)}
              </Badge>
            )}
            
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-200">
              <Clock className="h-3 w-3 mr-1" />
              {format(new Date(job.createdAt), 'MMM dd, yyyy')}
            </Badge>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">{t("job.description")}</h2>
            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">{t("job.skills_required")}</h2>
            <div className="flex flex-wrap gap-2">
              {job.skillsRequired.map((skill, index) => (
                <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link to={`/jobs/${job.id}/apply`}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                {t("job.apply")}
              </Button>
            </Link>
            
            <Link to={`/messages/new?receiverId=${job.employerId}`}>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <MessageSquare className="mr-2 h-5 w-5" />
                {t("message.new_message")}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobDetailsPage;
