import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, DollarSign } from "lucide-react"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  category: string
  deadline: string
  applicants: number
  salaryMin: number
  salaryMax: number
  currency: string
  description: string
  postedDate: string
}

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const formatSalary = (min: number, max: number, currency: string) => {
    return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const isDeadlinePassed = new Date(job.deadline) < new Date()

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow border-2 border-transparent hover:border-brand-100 dark:hover:border-brand-900">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge
            variant={job.type === "Full-time" ? "default" : "secondary"}
            className={job.type === "Full-time" ? "bg-brand-600 hover:bg-brand-700" : ""}
          >
            {job.type}
          </Badge>
          <Badge variant="outline">{job.category}</Badge>
        </div>
        <h3 className="font-semibold text-lg line-clamp-2">{job.title}</h3>
        <p className="text-sm text-muted-foreground font-medium">{job.company}</p>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          {job.location}
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <DollarSign className="h-4 w-4 mr-1" />
          {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-1" />
          Deadline: {formatDate(job.deadline)}
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-1" />
          {job.applicants} applicants
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">{job.description}</p>
      </CardContent>

      <CardFooter className="pt-3">
        <Link href={`/jobs/details/${job.id}`} className="w-full">
          <Button className="w-full" disabled={isDeadlinePassed} variant={isDeadlinePassed ? "secondary" : "default"}>
            {isDeadlinePassed ? "Deadline Passed" : "View Details"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
