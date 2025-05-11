
import { useTranslation } from "react-i18next";
import { Briefcase, Video, MessageSquare, MapPin } from "lucide-react";

const features = [
  {
    name: "Job Matching",
    description: "Find jobs that match your skills and experience",
    icon: Briefcase,
    iconBgClass: "bg-blue-100",
    iconTextClass: "text-blue-600",
  },
  {
    name: "Video Resumes",
    description: "Create video resumes to showcase your skills",
    icon: Video,
    iconBgClass: "bg-orange-100",
    iconTextClass: "text-orange-600",
  },
  {
    name: "In-app Chat",
    description: "Communicate directly with employers or workers",
    icon: MessageSquare,
    iconBgClass: "bg-green-100",
    iconTextClass: "text-green-600",
  },
  {
    name: "Location-based Search",
    description: "Find jobs or workers near your location",
    icon: MapPin,
    iconBgClass: "bg-purple-100",
    iconTextClass: "text-purple-600",
  },
];

const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold tracking-wide text-blue-600 uppercase">
            Features
          </h2>
          <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight lg:text-5xl">
            Everything you need to find the right match
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Our platform connects skilled workers with employers in a simple, efficient way.
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-md h-full">
                  <div className="-mt-6">
                    <div>
                      <span
                        className={`inline-flex items-center justify-center p-3 ${feature.iconBgClass} rounded-md shadow-lg`}
                      >
                        <feature.icon
                          className={`h-6 w-6 ${feature.iconTextClass}`}
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
