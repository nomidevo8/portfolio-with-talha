import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ProjectNotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold gradient-text mb-2">Project not found</h1>
        <p className="text-muted-foreground mb-8">
          The project you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Button asChild variant="outline" size="lg" className="rounded-full">
          <Link href="/#projects" className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      </div>
    </main>
  )
}
