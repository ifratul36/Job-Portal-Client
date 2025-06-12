import { JobCard } from "@/components/job-card"
import { SearchBar } from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock data for demonstration
const featuredJobs = [
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
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-700 to-brand-900 dark:from-brand-800 dark:to-brand-950 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Dream Job</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Connect with top employers and discover opportunities that match your skills and aspirations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/jobs">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Browse Jobs
              </Button>
            </Link>
            <Link href="/add-jobs">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white text-white hover:bg-white hover:text-brand-700"
              >
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SearchBar />
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Jobs</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover the latest job opportunities from top companies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/jobs">
              <Button size="lg" className="px-8">
                View All Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-brand-600 mb-2">1000+</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">Active Jobs</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-brand-600 mb-2">500+</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">Companies</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-brand-600 mb-2">10k+</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">Job Seekers</p>
            </div>
          </div>
          {/* hj */}
        </div>
      </section>
    </div>
  )
}
