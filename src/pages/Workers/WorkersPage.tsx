
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import WorkerCard from "@/components/Workers/WorkerCard";
import SearchFilters from "@/components/Search/SearchFilters";
import { Worker } from "@/types";
import { getWorkers } from "@/data/mockData";
import { Search } from "lucide-react";

const WorkersPage = () => {
  const { t } = useTranslation();
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [filteredWorkers, setFilteredWorkers] = useState<Worker[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const fetchedWorkers = getWorkers();
      setWorkers(fetchedWorkers);
      setFilteredWorkers(fetchedWorkers);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredWorkers(workers);
      return;
    }
    
    const filtered = workers.filter((worker) => {
      return (
        worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.skills.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        worker.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.location.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    
    setFilteredWorkers(filtered);
  };

  const handleApplyFilters = (filters: any) => {
    let filtered = workers;
    
    // Apply search term
    if (filters.search) {
      filtered = filtered.filter((worker) => {
        return (
          worker.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          worker.skills.some(skill => 
            skill.toLowerCase().includes(filters.search.toLowerCase())
          ) ||
          worker.location.city.toLowerCase().includes(filters.search.toLowerCase()) ||
          worker.location.state.toLowerCase().includes(filters.search.toLowerCase())
        );
      });
    }
    
    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter((worker) => 
        worker.location.city === filters.location ||
        worker.location.state === filters.location
      );
    }
    
    // Apply skills filter
    if (filters.skills.length > 0) {
      filtered = filtered.filter((worker) => 
        filters.skills.some((skill: string) => 
          worker.skills.includes(skill)
        )
      );
    }
    
    // Apply experience filter
    if (filters.experience && filters.experience.length === 2) {
      filtered = filtered.filter((worker) => {
        const yearsOfExperience = parseInt(worker.experience.split(' ')[0]);
        return (
          yearsOfExperience >= filters.experience[0] &&
          yearsOfExperience <= filters.experience[1]
        );
      });
    }
    
    // Apply availability filter
    if (filters.availability) {
      filtered = filtered.filter((worker) => 
        worker.availability === filters.availability
      );
    }
    
    setFilteredWorkers(filtered);
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
        <h1 className="text-3xl font-bold mb-4">{t("nav.workers")}</h1>
        <p className="text-gray-600">
          Find skilled workers for your projects
        </p>
      </div>

      {/* Search bar */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search by name, skills, or location"
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
            <SearchFilters type="workers" onApplyFilters={handleApplyFilters} />
          </div>
        )}

        {/* Worker listings */}
        <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
          {filteredWorkers.length === 0 ? (
            <div className="text-center p-8 bg-white rounded-lg shadow">
              <p className="text-lg text-gray-600">{t("search.no_results")}</p>
              <Button variant="link" onClick={() => setFilteredWorkers(workers)}>
                {t("search.reset_filters")}
              </Button>
            </div>
          ) : (
            <>
              <p className="mb-4 text-gray-600">
                {filteredWorkers.length} {t("search.results")} found
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredWorkers.map((worker) => (
                  <WorkerCard key={worker.id} worker={worker} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkersPage;
