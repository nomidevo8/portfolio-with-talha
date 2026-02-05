import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getProjectBySlug, getAllSlugs } from "@/lib/projects"
import type { Project } from "@/lib/projects"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, Github, MapPin } from "lucide-react"
import RevealObserver from "@/components/reveal-observer"
import ProjectCarousel from "@/components/project-carousel"
import LivePreviewButton from "@/components/live-preview-button";

const SITE_TITLE = "Nauman Sajjad"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: `Project Not Found | ${SITE_TITLE}`,
    }
  }

  return {
    title: `${project.title} | ${SITE_TITLE}`,
    description: project.short_description,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const liveUrl = project.live_url || project.website
  const techStack = project.tech_stack ?? []
  const implementation = project.implementation ?? []
  const features = project.features ?? []
  const screenshots = project.screenshots?.length
    ? project.screenshots
    : [project.thumbnail || project.image]

  return (
    <>
      <RevealObserver />
      <main className="min-h-screen flex flex-col">
        {/* Hero */}
        <section
          className="relative h-auto overflow-hidden min-h-[90vh] bg-secondary/5 bg-dots"
          style={{
            backgroundImage: `url(${project.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div
            className="container mx-auto flex items-center px-4 p-9 min-h-[90vh] backdrop-blur-[1px] bg-[#0000001f]"
            style={{
              // Desktop gradient
              background: 'linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.6) 35%, rgba(0, 0, 0, 0) 70%)',
              height: '100%',
            }}
          >
            {/* Mobile Full Gradient */}
            <div className="absolute inset-0 md:hidden bg-black/70"></div>

            <div className="relative w-full">
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 hover:text-primary transition-colors mb-8 reveal"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Link>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 reveal gradient-text">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl mb-6 reveal reveal-delay-1 max-w-xl">
                {project.short_description}
              </p>

              {project.location && project.location.toLowerCase() !== 'none' && (
                <div className=" gap-2 text-sm mb-6 reveal reveal-delay-2">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>{project.location}</span>
                </div>
              )}

              {techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8 reveal reveal-delay-2">
                  {techStack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="font-medium">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
                
              {/* Link preview  */}
              <div>
                {/* <Button asChild size="lg" className="rounded-full">
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    Live Preview
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button> */}
                <LivePreviewButton url={liveUrl} innerText="Take a Look" />
              </div>
              <div className="flex flex-wrap gap-3 reveal reveal-delay-3">
                {project.github_url && (
                  <Button asChild variant="outline" size="lg" className="rounded-full">
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>


        {/* Content */}
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
          {project.problem && (
            <ContentSection title="The Problem" className="reveal pt-4">
              <p className="text-muted-foreground leading-relaxed">
                {project.problem}
              </p>
            </ContentSection>
          )}

          {project.solution && (
            <ContentSection title="The Solution" className="reveal pt-4">
              <p className="text-muted-foreground leading-relaxed">
                {project.solution}
              </p>
            </ContentSection>
          )}

          {implementation.length > 0 && (
            <ContentSection title="How It Was Implemented" className="reveal pt-4">
              <ul className="space-y-2">
                {implementation.map((step, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-muted-foreground leading-relaxed"
                  >
                    <span className="text-primary font-medium shrink-0">
                      {i + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </ContentSection>
          )}

          {features.length > 0 && (
            <ContentSection title="Key Features" className="reveal pt-4">
              <ul className="grid gap-2 sm:grid-cols-2">
                {features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </ContentSection>
          )}

    

          {techStack.length > 0 && (
            <ContentSection title="Tech Stack" className="reveal pt-4">
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="text-sm py-1.5 px-3"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </ContentSection>
          )}
          </div>

          {/* Screenshots */}
          <ContentSection title="Screenshots / Preview"   className="reveal pt-2 px-4 md:pt-4 md:px-9">
            <ProjectCarousel screenshots={screenshots} title={project.title} />
          </ContentSection>

          {/* Back CTA */}
          <div className="pt-8 pb-16 text-center reveal">
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/#projects" className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>
      </main>
    </>
  )
}

function ContentSection({
  title,
  children,
  className = "",
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={` ${className}`}>
      <h2 className="section-heading gradient-text mb-2">{title}</h2>
      <Card className="border border-border bg-secondary/5">
        <CardContent className="pt-6">{children}</CardContent>
      </Card>
    </section>
  )
}
