"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchTerm) params.set("search", searchTerm)
    if (location) params.set("location", location)
    router.push(`/jobs?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Job title, keywords, or company"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        <Button type="submit" size="lg" className="h-12 px-8">
          Search Jobs
        </Button>
      </div>
    </form>
  )
}
