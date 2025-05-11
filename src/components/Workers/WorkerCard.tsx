
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MapPin, Star, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Worker } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface WorkerCardProps {
  worker: Worker;
  compact?: boolean;
}

const WorkerCard = ({ worker, compact = false }: WorkerCardProps) => {
  const { t } = useTranslation();
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };
  
  return (
    <div className="job-card flex flex-col">
      <div className="flex items-center">
        <Avatar className="h-12 w-12">
          <AvatarImage src={worker.avatar} alt={worker.name} />
          <AvatarFallback>{getInitials(worker.name)}</AvatarFallback>
        </Avatar>
        
        <div className="ml-4">
          <h3 className="text-lg font-bold text-gray-900">
            <Link to={`/workers/${worker.id}`} className="hover:text-blue-600">
              {worker.name}
            </Link>
          </h3>
          
          <div className="flex items-center mt-1">
            <MapPin size={16} className="text-gray-500" />
            <span className="text-sm text-gray-500 ml-1">
              {worker.location.city}, {worker.location.state}
            </span>
            
            {worker.ratings && (
              <div className="flex items-center ml-4">
                <Star size={16} className="text-yellow-500" />
                <span className="text-sm ml-1">{worker.ratings.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="text-sm font-medium text-gray-700">{t("worker.skills")}</div>
        <div className="mt-2 flex flex-wrap">
          {worker.skills.slice(0, compact ? 4 : worker.skills.length).map((skill, index) => (
            <span key={index} className="skill-badge">
              {skill}
            </span>
          ))}
          {compact && worker.skills.length > 4 && (
            <span className="text-xs text-gray-500 px-2 py-0.5">
              +{worker.skills.length - 4} more
            </span>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div>
          <div className="text-sm font-medium text-gray-700">{t("worker.experience")}</div>
          <div className="text-sm text-gray-500">{worker.experience}</div>
        </div>
        
        <div className="flex items-center">
          {worker.videoResume && (
            <div className="flex items-center text-blue-600 mr-4">
              <Video size={16} className="mr-1" />
              <span className="text-sm">{t("worker.video_resume")}</span>
            </div>
          )}
          
          {worker.certifications && worker.certifications.some(cert => cert.verified) && (
            <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Verified
            </div>
          )}
        </div>
      </div>
      
      {!compact && (
        <div className="mt-6 flex justify-between">
          <Link to={`/workers/${worker.id}`}>
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              View Profile
            </Button>
          </Link>
          <Link to={`/messages/new?receiverId=${worker.id}`}>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              {t("message.new_message")}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default WorkerCard;
