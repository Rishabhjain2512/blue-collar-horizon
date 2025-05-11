
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Job } from "@/types";
import { formatDistanceToNow } from "date-fns";

interface JobCardProps {
  job: Job;
  compact?: boolean;
}

const JobCard = ({ job, compact = false }: JobCardProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="job-card flex flex-col">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            <Link to={`/jobs/${job.id}`} className="hover:text-blue-600">
              {job.title}
            </Link>
          </h3>
          <p className="text-sm text-gray-500">{job.employerName}</p>
        </div>
        {job.employerLogo && (
          <img 
            src={job.employerLogo} 
            alt={job.employerName} 
            className="w-12 h-12 object-contain" 
          />
        )}
      </div>

      <div className="mt-2 flex items-center text-sm text-gray-500">
        <MapPin size={16} className="mr-1" />
        <span>{job.location.city}, {job.location.state}</span>
      </div>
      
      {!compact && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 line-clamp-2">
            {job.description}
          </p>
        </div>
      )}
      
      <div className="mt-4 flex flex-wrap">
        {job.skillsRequired.slice(0, compact ? 3 : job.skillsRequired.length).map((skill, index) => (
          <span key={index} className="skill-badge">
            {skill}
          </span>
        ))}
        {compact && job.skillsRequired.length > 3 && (
          <span className="text-xs text-gray-500 px-2 py-0.5">
            +{job.skillsRequired.length - 3} more
          </span>
        )}
      </div>
      
      <div className="mt-4 flex flex-wrap justify-between items-center text-sm text-gray-500">
        {job.salary && (
          <span className="font-medium text-blue-600">
            ₹{job.salary.min.toLocaleString()} - ₹{job.salary.max.toLocaleString()} / {t(`job.${job.salary.period}`)}
          </span>
        )}
        <span className="flex items-center">
          <Calendar size={16} className="mr-1" />
          {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
        </span>
      </div>
      
      {!compact && (
        <div className="mt-6 flex justify-between">
          <Link to={`/jobs/${job.id}`}>
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              View Details
            </Button>
          </Link>
          <Link to={`/jobs/${job.id}/apply`}>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              {t("job.apply")}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default JobCard;
