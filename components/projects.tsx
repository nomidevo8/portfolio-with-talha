"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, MapPin } from "lucide-react"
import projectsData from "@/components/data/projects.json"

type Project = {
  slug: string
  projectName: string
  role: string
  website: string
  location: string
  image: string
  enabled_all?: boolean | string
  enabled_all_all?: boolean | string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [showAll, setShowAll] = useState(false)
  const projectsPerPage = 6

  useEffect(() => {
    // Parse query param from window.location (client-only)
    let enableAll = false
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const enableAllParam = params.get("enable_all") ?? "false"
      enableAll = /^(true|1)$/i.test(enableAllParam)
    }

    // Helper: handle both `enabled_all` and the typo `enabled_all_all`
    const isEnabledAllTrue = (p: Partial<Project>) => {
      return (
        p.enabled_all === true ||
        p.enabled_all === "true" ||
        p.enabled_all_all === true ||
        p.enabled_all_all === "true"
      )
    }

    const filtered = enableAll ? projectsData : projectsData.filter((p) => !isEnabledAllTrue(p))

    setProjects(filtered)
    setShowAll(enableAll)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active")
        })
      },
      { threshold: 0.1 }
    )

    const revealElements = document.querySelectorAll(".revealDev")
    revealElements.forEach((el) => observer.observe(el))

    return () => {
      revealElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  // ⬆️ Scroll to top when page changes
const isFirstRender = useRef(true)

useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false
    return
  }

  if (!showAll) {
    const section = document.getElementById("projects")
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }
}, [currentPage, showAll])

  // Pagination Logic
  const totalPages = Math.ceil(projects.length / projectsPerPage)
  const startIndex = (currentPage - 1) * projectsPerPage
  const currentProjects = showAll
    ? projects
    : projects.slice(startIndex, startIndex + projectsPerPage)

  return (
    <section id="projects" className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <h2 className="section-heading gradient-text text-center mb-12">
          Projects & Experience
        </h2>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="block h-full group"
            >
              <Card
                className="project-card border border-border bg-background/80 backdrop-blur-sm h-full overflow-hidden revealDev hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-2xl"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Project Image */}
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.projectName}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {project.projectName}
                  </CardTitle>
                  <div className="flex items-center text-primary/80 text-sm">
                    <MapPin className="w-4 h-4 mr-1 shrink-0" />
                    <p>{project.location}</p>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    Role: {project.role}
                  </p>
                </CardContent>

                <CardFooter>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a href={`/projects/${project.slug}`} target="_blank" rel="noopener noreferrer">
                      View Details <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination & Show All Controls */}
        <div className="flex flex-col items-center gap-4 mt-12">
          {!showAll && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Prev
              </Button>

              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}

          {/* Show All / Show Less Toggle */}
          <Button
            variant="default"
            size="sm"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show Less" : "Show All"}
          </Button>
        </div>
      </div>
    </section>
  )
}
