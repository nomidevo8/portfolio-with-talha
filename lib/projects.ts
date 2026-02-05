import projectsData from "@/components/data/projects.json"

export interface Project {
  id: number
  slug: string
  projectName: string
  title: string
  short_description: string
  role: string
  website: string
  live_url: string
  github_url: string | null
  location: string
  image: string
  thumbnail: string
  problem?: string
  solution?: string
  implementation?: string[]
  features?: string[]
  tech_stack?: string[]
  screenshots?: string[]
  enabled_all?: boolean | string
  enabled_all_all?: boolean | string
}

const projects = projectsData as Project[]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAllProjects(): Project[] {
  return projects
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug)
}
