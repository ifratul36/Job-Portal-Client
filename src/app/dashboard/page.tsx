"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Briefcase, FileText, Clock, Users, Calendar, ChevronRight } from "lucide-react"

// Mock data
const recentApplications = [
  {
    id: "1",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    appliedDate: "2024-01-25",
    status: "pending",
  },
  {
    id: "2",
    jobTitle: "UX Designer",
    company: "DesignStudio",
    appliedDate: "2024-01-20",
    status: "shortlisted",
  },
  {
    id: "3",
    jobTitle: "Product Manager",
    company: "StartupXYZ",
    appliedDate: "2024-01-15",
    status: "rejected",
  },
]

const postedJobs = [
  {
    id: "1",
    title: "Backend Developer",
    applicants: 12,
    deadline: "2024-02-28",
    status: "active",
  },
  {
    id: "2",
    title: "Marketing Specialist",
    applicants: 8,
    deadline: "2024-03-15",
    status: "active",
  },
]

const upcomingInterviews = [
  {
    id: "1",
    jobTitle: "UX Designer",
    company: "DesignStudio",
    date: "2024-02-05",
    time: "10:00 AM",
  },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name || "User"}! Heres an overview of your job activities.
        </p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 md:grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="jobs">My Jobs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                <FileText className="h-4 w-4 text-brand-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Interviews</CardTitle>
                <Calendar className="h-4 w-4 text-brand-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">1 upcoming</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Posted Jobs</CardTitle>
                <Briefcase className="h-4 w-4 text-brand-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Both active</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                <Users className="h-4 w-4 text-brand-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">142</div>
                <p className="text-xs text-muted-foreground">+28% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Recent Applications</CardTitle>
                <CardDescription>Your latest job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((application) => (
                    <div key={application.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">{application.jobTitle}</p>
                        <p className="text-sm text-muted-foreground">{application.company}</p>
                      </div>
                      <div className="flex items-center">
                        <Badge
                          variant="outline"
                          className={
                            application.status === "pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              : application.status === "shortlisted"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          }
                        >
                          {application.status === "pending"
                            ? "Pending"
                            : application.status === "shortlisted"
                              ? "Shortlisted"
                              : "Rejected"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-right">
                  <Link href="/application/me">
                    <Button variant="ghost" size="sm" className="text-brand-600 hover:text-brand-700">
                      View all applications
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Interviews</CardTitle>
                <CardDescription>Your scheduled interviews</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingInterviews.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingInterviews.map((interview) => (
                      <div
                        key={interview.id}
                        className="flex items-center space-x-4 p-3 bg-brand-50 dark:bg-brand-900/20 rounded-md"
                      >
                        <div className="bg-brand-100 dark:bg-brand-800 p-2 rounded-full">
                          <Clock className="h-5 w-5 text-brand-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{interview.jobTitle}</p>
                          <p className="text-sm text-muted-foreground">{interview.company}</p>
                          <p className="text-sm font-medium text-brand-600 mt-1">
                            {new Date(interview.date).toLocaleDateString()} at {interview.time}
                          </p>
                        </div>
                        <Button size="sm">Prepare</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No upcoming interviews</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Posted Jobs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Posted Jobs</CardTitle>
              <CardDescription>Jobs youve posted and their current status</CardDescription>
            </CardHeader>
            <CardContent>
              {postedJobs.length > 0 ? (
                <div className="space-y-4">
                  {postedJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">{job.title}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          {job.applicants} applicants
                          <span className="mx-2">•</span>
                          <Calendar className="h-4 w-4 mr-1" />
                          Deadline: {new Date(job.deadline).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        >
                          Active
                        </Badge>
                        <Link href={`/my-jobs/${job.id}`}>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">You havent posted any jobs yet</p>
                  <Button className="mt-4">
                    <Link href="/add-jobs">Post a Job</Link>
                  </Button>
                </div>
              )}
              {postedJobs.length > 0 && (
                <div className="mt-4 text-right">
                  <Link href="/my-jobs">
                    <Button variant="ghost" size="sm" className="text-brand-600 hover:text-brand-700">
                      Manage all jobs
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Applications</CardTitle>
              <CardDescription>Track all your job applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div
                    key={application.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1 mb-2 sm:mb-0">
                      <p className="font-medium">{application.jobTitle}</p>
                      <p className="text-sm text-muted-foreground">{application.company}</p>
                      <p className="text-xs text-muted-foreground">
                        Applied on {new Date(application.appliedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className={
                          application.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : application.status === "shortlisted"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }
                      >
                        {application.status === "pending"
                          ? "Pending"
                          : application.status === "shortlisted"
                            ? "Shortlisted"
                            : "Rejected"}
                      </Badge>
                      <Link href={`/application/${application.id}`}>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link href="/application/me">
                  <Button>View All Applications</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Posted Jobs</CardTitle>
              <CardDescription>Manage jobs youve posted</CardDescription>
            </CardHeader>
            <CardContent>
              {postedJobs.length > 0 ? (
                <div className="space-y-4">
                  {postedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="space-y-1 mb-2 sm:mb-0">
                        <p className="font-medium">{job.title}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          {job.applicants} applicants
                          <span className="mx-2">•</span>
                          <Calendar className="h-4 w-4 mr-1" />
                          Deadline: {new Date(job.deadline).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        >
                          Active
                        </Badge>
                        <Link href={`/my-jobs/${job.id}`}>
                          <Button size="sm" variant="outline">
                            View Applicants
                          </Button>
                        </Link>
                        <Link href={`/jobs/update/${job.id}`}>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">You havent posted any jobs yet</p>
                  <Button className="mt-4">
                    <Link href="/add-jobs">Post a Job</Link>
                  </Button>
                </div>
              )}
              {postedJobs.length > 0 && (
                <div className="mt-6 text-center">
                  <Link href="/my-jobs">
                    <Button>Manage All Jobs</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
