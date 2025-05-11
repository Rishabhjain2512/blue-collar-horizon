
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFiltersProps {
  type: "jobs" | "workers";
  onApplyFilters: (filters: any) => void;
}

// Mock data - in a real app this would come from the backend
const skillsList = [
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Painting",
  "Driving",
  "Construction",
  "Welding",
  "Masonry",
  "HVAC",
  "Gardening",
];

const locationsList = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Pune",
  "Jaipur",
  "Lucknow",
];

const SearchFilters = ({ type, onApplyFilters }: SearchFiltersProps) => {
  const { t } = useTranslation();
  
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    skills: [] as string[],
    experience: [0, 10], // Years
    salary: [0, 100000], // Rupees
    availability: "",
  });
  
  const handleFilterChange = (name: string, value: any) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSkillToggle = (skill: string) => {
    setFilters(prev => {
      const updatedSkills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills: updatedSkills };
    });
  };
  
  const handleReset = () => {
    setFilters({
      search: "",
      location: "",
      skills: [],
      experience: [0, 10],
      salary: [0, 100000],
      availability: "",
    });
  };
  
  const handleApply = () => {
    onApplyFilters(filters);
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">{t("search.filter")}</h3>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <Label htmlFor="search">{t("search.search")}</Label>
          <div className="mt-1">
            <Input
              id="search"
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              placeholder={t("search.search_placeholder")}
              className="form-input"
            />
          </div>
        </div>
        
        {/* Accordion for other filters */}
        <Accordion type="multiple">
          {/* Location */}
          <AccordionItem value="location">
            <AccordionTrigger>{t("search.location_filter")}</AccordionTrigger>
            <AccordionContent>
              <Select 
                value={filters.location}
                onValueChange={(value) => handleFilterChange("location", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All locations</SelectItem>
                  {locationsList.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </AccordionContent>
          </AccordionItem>
          
          {/* Skills */}
          <AccordionItem value="skills">
            <AccordionTrigger>{t("search.skills_filter")}</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2">
                {skillsList.map((skill) => (
                  <div key={skill} className="flex items-center">
                    <input
                      id={`skill-${skill}`}
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={filters.skills.includes(skill)}
                      onChange={() => handleSkillToggle(skill)}
                    />
                    <label
                      htmlFor={`skill-${skill}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Experience */}
          <AccordionItem value="experience">
            <AccordionTrigger>{t("search.experience_filter")}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>{filters.experience[0]} years</span>
                  <span>{filters.experience[1]} years</span>
                </div>
                <Slider
                  value={filters.experience}
                  min={0}
                  max={20}
                  step={1}
                  onValueChange={(value) => handleFilterChange("experience", value)}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Salary - Only for jobs */}
          {type === "jobs" && (
            <AccordionItem value="salary">
              <AccordionTrigger>{t("search.salary_filter")}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>₹{filters.salary[0].toLocaleString()}</span>
                    <span>₹{filters.salary[1].toLocaleString()}</span>
                  </div>
                  <Slider
                    value={filters.salary}
                    min={0}
                    max={100000}
                    step={5000}
                    onValueChange={(value) => handleFilterChange("salary", value)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
          
          {/* Availability - Only for workers */}
          {type === "workers" && (
            <AccordionItem value="availability">
              <AccordionTrigger>{t("worker.availability")}</AccordionTrigger>
              <AccordionContent>
                <Select 
                  value={filters.availability}
                  onValueChange={(value) => handleFilterChange("availability", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any</SelectItem>
                    <SelectItem value="immediate">{t("worker.immediate")}</SelectItem>
                    <SelectItem value="within_week">{t("worker.within_week")}</SelectItem>
                    <SelectItem value="within_month">{t("worker.within_month")}</SelectItem>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            {t("search.reset_filters")}
          </Button>
          <Button onClick={handleApply}>
            {t("search.apply_filters")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
