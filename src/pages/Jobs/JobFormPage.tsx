
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

// Mock data - would come from API in a real app
const skillsList = [
  "Plumbing", "Electrical", "Carpentry", "Painting", "Driving",
  "Construction", "Welding", "Masonry", "HVAC", "Gardening",
  "Pipe Fitting", "Wiring", "Circuit Installation", "Water Heater Installation",
  "Furniture Making", "Wood Finishing", "Air Conditioning", "Ventilation Systems"
];

const cityOptions = [
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata",
  "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Lucknow"
];

const stateOptions = [
  "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "West Bengal",
  "Telangana", "Gujarat", "Rajasthan", "Uttar Pradesh", "Punjab"
];

const JobFormPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    state: "",
    minSalary: "",
    maxSalary: "",
    salaryPeriod: "monthly" as "hourly" | "daily" | "weekly" | "monthly",
    skills: [] as string[],
  });
  
  const [selectedSkill, setSelectedSkill] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (selectedSkill && !formData.skills.includes(selectedSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, selectedSkill],
      }));
      setSelectedSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.description || !formData.city || !formData.state || formData.skills.length === 0) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: t("job.job_posted"),
        description: "Your job has been successfully posted",
      });
      
      navigate("/jobs");
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect if not employer
  if (user?.role !== "employer") {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="mb-6 text-gray-600">
            Only employers can post jobs. Please login as an employer to continue.
          </p>
          <Button onClick={() => navigate("/login")}>
            Login as Employer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{t("job.post_job")}</h1>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Job Title */}
                <div>
                  <Label htmlFor="title" className="text-base">
                    {t("job.title")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-input mt-1"
                    placeholder="e.g. Experienced Plumber Needed for Residential Project"
                    required
                  />
                </div>
                
                {/* Job Description */}
                <div>
                  <Label htmlFor="description" className="text-base">
                    {t("job.description")} <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-input mt-1 min-h-32"
                    placeholder="Provide detailed information about the job responsibilities, requirements, etc."
                    required
                  />
                </div>
                
                {/* Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-base">
                      {t("common.city")} <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.city}
                      onValueChange={(value) => handleSelectChange("city", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cityOptions.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="state" className="text-base">
                      {t("common.state")} <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) => handleSelectChange("state", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {stateOptions.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Salary */}
                <div>
                  <Label className="text-base">{t("job.salary")}</Label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <div>
                      <Label htmlFor="minSalary" className="text-sm">
                        {t("job.min_salary")}
                      </Label>
                      <Input
                        id="minSalary"
                        name="minSalary"
                        type="number"
                        value={formData.minSalary}
                        onChange={handleChange}
                        className="form-input mt-1"
                        placeholder="e.g. 15000"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="maxSalary" className="text-sm">
                        {t("job.max_salary")}
                      </Label>
                      <Input
                        id="maxSalary"
                        name="maxSalary"
                        type="number"
                        value={formData.maxSalary}
                        onChange={handleChange}
                        className="form-input mt-1"
                        placeholder="e.g. 25000"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="salaryPeriod" className="text-sm">
                        {t("job.period")}
                      </Label>
                      <Select
                        value={formData.salaryPeriod}
                        onValueChange={(value) => handleSelectChange("salaryPeriod", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">{t("job.hourly")}</SelectItem>
                          <SelectItem value="daily">{t("job.daily")}</SelectItem>
                          <SelectItem value="weekly">{t("job.weekly")}</SelectItem>
                          <SelectItem value="monthly">{t("job.monthly")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                {/* Skills */}
                <div>
                  <Label className="text-base">
                    {t("job.skills_required")} <span className="text-red-500">*</span>
                  </Label>
                  
                  <div className="flex gap-2 mt-2">
                    <Select
                      value={selectedSkill}
                      onValueChange={setSelectedSkill}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select skill" />
                      </SelectTrigger>
                      <SelectContent>
                        {skillsList
                          .filter(skill => !formData.skills.includes(skill))
                          .map((skill) => (
                          <SelectItem key={skill} value={skill}>
                            {skill}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Button type="button" onClick={handleAddSkill}>
                      {t("worker.add_skill")}
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {formData.skills.length === 0 ? (
                      <p className="text-sm text-gray-500">
                        No skills added yet. Add at least one skill.
                      </p>
                    ) : (
                      formData.skills.map((skill) => (
                        <Badge key={skill} className="bg-blue-100 text-blue-800 flex items-center gap-1 py-1">
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-1 text-blue-800 hover:text-blue-900"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))
                    )}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 flex justify-end">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t("common.loading") : t("job.post_job")}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobFormPage;
