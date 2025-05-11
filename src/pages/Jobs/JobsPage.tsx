
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import JobCard from "@/components/Jobs/JobCard";
import SearchFilters from "@/components/Search/SearchFilters";
import { Job } from "@/types";
import { getJobs } from "@/data/mockData";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";

const JobsPage = () => {
  const { t } = useTranslation();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const fetchedJobs = getJobs();
      setJobs(fetchedJobs);
      setFilteredJobs(fetchedJobs);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredJobs(jobs);
      return;
    }
    
    const filtered = jobs.filter((job) => {
      return (
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skillsRequired.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    });
    
    setFilteredJobs(filtered);
  };

  const handleApplyFilters = (filters: any) => {
    let filtered = jobs;
    
    // Apply search term
    if (filters.search) {
      filtered = filtered.filter((job) => {
        return (
          job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          job.description.toLowerCase().includes(filters.search.toLowerCase()) ||
          job.skillsRequired.some(skill => 
            skill.toLowerCase().includes(filters.search.toLowerCase())
          )
        );
      });
    }
    
    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter((job) => 
        job.location.city === filters.location ||
        job.location.state === filters.location
      );
    }
    
    // Apply skills filter
    if (filters.skills.length > 0) {
      filtered = filtered.filter((job) => 
        filters.skills.some((skill: string) => 
          job.skillsRequired.includes(skill)
        )
      );
    }
    
    // Apply salary filter
    if (filters.salary) {
      filtered = filtered.filter((job) => {
        if (!job.salary) return true;
        return (
          job.salary.max >= filters.salary[0] &&
          job.salary.min <= filters.salary[1]
        );
      });
    }
    
    setFilteredJobs(filtered);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
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

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">{t("job.search_jobs")}</h1>
        <p className="text-gray-600">
          Find the perfect job matching your skills and experience
        </p>
      </div>

      {/* Search bar */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder={t("search.search_placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
          />
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            {t("search.search")}
          </Button>
          <Button variant="outline" onClick={toggleFilters}>
            {showFilters ? t("common.close") : t("search.filter")}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        {showFilters && (
          <div className="lg:col-span-1">
            <SearchFilters type="jobs" onApplyFilters={handleApplyFilters} />
          </div>
        )}

        {/* Job listings */}
        <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
          {filteredJobs.length === 0 ? (
            <div className="text-center p-8 bg-white rounded-lg shadow">
              <p className="text-lg text-gray-600">{t("search.no_results")}</p>
              <Button variant="link" onClick={() => setFilteredJobs(jobs)}>
                {t("search.reset_filters")}
              </Button>
            </div>
          ) : (
            <>
              <p className="mb-4 text-gray-600">
                {filteredJobs.length} {t("search.results")} found
              </p>
              <div className="space-y-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              
              {/* Show all jobs link */}
              <div className="mt-8 text-center">
                <Link to="/jobs/all">
                  <Button variant="outline" className="text-blue-600 hover:text-blue-700">
                    View All Jobs <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
