"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { JobCard } from "@/components/job-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, SlidersHorizontal } from "lucide-react"

// Mock jobs data
const allJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    category: "Technology",
    deadline: "2024-02-15",
    applicants: 24,
    salaryMin: 120000,
    salaryMax: 150000,
    currency: "USD",
    description: "We are looking for a senior frontend developer to join our team...",
    postedDate: "2024-01-15",
    experienceLevel: "senior",
  },
  {
    id: "2",
    title: "Product Manager",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    category: "Management",
    deadline: "2024-02-20",
    applicants: 18,
    salaryMin: 100000,
    salaryMax: 130000,
    currency: "USD",
    description: "Join our growing team as a Product Manager...",
    postedDate: "2024-01-18",
    experienceLevel: "mid",
  },
  {
    id: "3",
    title: "UX Designer",
    company: "DesignStudio",
    location: "Remote",
    type: "Part-time",
    category: "Design",
    deadline: "2024-02-25",
    applicants: 12,
    salaryMin: 60000,
    salaryMax: 80000,
    currency: "USD",
    description: "Create amazing user experiences for our clients...",
    postedDate: "2024-01-20",
    experienceLevel: "mid",
  },
  {
    id: "4",
    title: "Data Scientist",
    company: "DataCorp",
    location: "Boston, MA",
    type: "Full-time",
    category: "Technology",
    deadline: "2024-03-01",
    applicants: 31,
    salaryMin: 110000,
    salaryMax: 140000,
    currency: "USD",
    description: "Analyze complex data sets and provide insights...",
    postedDate: "2024-01-22",
    experienceLevel: "senior",
  },
  {
    id: "5",
    title: "Junior Developer",
    company: "CodeStart",
    location: "Austin, TX",
    type: "Full-time",
    category: "Technology",
    deadline: "2024-02-28",
    applicants: 45,
    salaryMin: 70000,
    salaryMax: 90000,
    currency: "USD",
    description: "Perfect opportunity for new graduates...",
    postedDate: "2024-01-25",
    experienceLevel: "junior",
  },
  {
    id: "6",
    title: "Marketing Intern",
    company: "MarketPro",
    location: "Chicago, IL",
    type: "Internship",
    category: "Marketing",
    deadline: "2024-03-05",
    applicants: 67,
    salaryMin: 30000,
    salaryMax: 40000,
    currency: "USD",
    description: "Learn marketing fundamentals with our team...",
    postedDate: "2024-01-28",
    experienceLevel: "internship",
  },
]

export default function JobsPage() {
  const searchParams = useSearchParams()
  const [jobs, setJobs] = useState(allJobs)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [jobType, setJobType] = useState("all")
  const [experienceLevel, setExperienceLevel] = useState("all")
  const [salaryRange, setSalaryRange] = useState("all")
  const [sortBy, setSortBy] = useState("deadline")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    filterAndSortJobs()
  }, [searchTerm, jobType, experienceLevel, salaryRange, sortBy])

  const filterAndSortJobs = () => {
    setLoading(true)

    let filteredJobs = [...allJobs]

    // Search filter
    if (searchTerm) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Job type filter
    if (jobType && jobType !== "all") {
      filteredJobs = filteredJobs.filter((job) => job.type === jobType)
    }

    // Experience level filter & filter
    if (experienceLevel && experienceLevel !== "all") {
      filteredJobs = filteredJobs.filter((job) => job.experienceLevel === experienceLevel)
    }

    // Salary range filter
    if (salaryRange && salaryRange !== "all") {
      const [min, max] = salaryRange.split("-").map(Number)
      filteredJobs = filteredJobs.filter((job) => job.salaryMin >= min && job.salaryMax <= max)
    }

    // Sort jobs
    filteredJobs.sort((a, b) => {
      if (sortBy === "deadline") {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      } else if (sortBy === "posted") {
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      } else if (sortBy === "salary") {
        return b.salaryMax - a.salaryMax
      }
      return 0
    })

    setTimeout(() => {
      setJobs(filteredJobs)
      setLoading(false)
    }, 300)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setJobType("all")
    setExperienceLevel("all")
    setSalaryRange("all")
    setSortBy("deadline")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Jobs</h1>
        <p className="text-muted-foreground">Discover {jobs.length} job opportunities that match your skills</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search jobs, companies, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filters */}
        <Card className={`${showFilters ? "block" : "hidden"} lg:block`}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </span>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Job Type</label>
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Experience Level</label>
                <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Salary Range</label>
                <Select value={salaryRange} onValueChange={setSalaryRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Ranges" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ranges</SelectItem>
                    <SelectItem value="0-50000">$0 - $50k</SelectItem>
                    <SelectItem value="50000-100000">$50k - $100k</SelectItem>
                    <SelectItem value="100000-150000">$100k - $150k</SelectItem>
                    <SelectItem value="150000-999999">$150k+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Deadline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="posted">Recently Posted</SelectItem>
                    <SelectItem value="salary">Highest Salary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64"></div>
            </div>
          ))}
        </div>
      ) : jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      )}
    </div>
  )
}
