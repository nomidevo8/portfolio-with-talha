"use client"

import { useEffect } from "react"
import { Code, Database, Globe, Settings, Layers, Workflow, Server, Zap } from "lucide-react"

export default function Skills() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")

            // Animate progress bars when they come into view
            const progressBars = entry.target.querySelectorAll(".skill-progress-bar")
            progressBars.forEach((bar: Element) => {
              const width = (bar as HTMLElement).dataset.width || "0"
              setTimeout(() => {
                ;(bar as HTMLElement).style.width = width
              }, 300)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    const revealElements = document.querySelectorAll(".reveal")
    revealElements.forEach((el) => observer.observe(el))

    return () => {
      revealElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const skillsWithProgress = [
    { name: "WordPress Development", progress: "95%", icon: <Globe className="h-6 w-6" /> },
    { name: "Core PHP & MySQL", progress: "90%", icon: <Code className="h-6 w-6" /> },
    { name: "JavaScript & jQuery", progress: "90%", icon: <Zap className="h-6 w-6" /> },
    { name: "WordPress Customizer API", progress: "92%", icon: <Settings className="h-6 w-6" /> },
    { name: "ACF & Custom Post Types", progress: "95%", icon: <Layers className="h-6 w-6" /> },
    { name: "Third-Party API Integration", progress: "88%", icon: <Server className="h-6 w-6" /> },
    { name: "WP-CLI & Automation", progress: "80%", icon: <Workflow className="h-6 w-6" /> },
    { name: "Database Management", progress: "85%", icon: <Database className="h-6 w-6" /> },
  ]

  const apiExperience = [
    "Setmore",
    "Clover",
    "Pipedrive",
    "Dialpad",
    "Twilio",
    "SendGrid",
    "alahdi",
    "Payment gateways",
    "Surepay USA",
    "SMS automation",
  ]

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-heading gradient-text">Skill Development</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-6 reveal">Technical Proficiency</h3>
            <div className="space-y-6">
              {skillsWithProgress.map((skill, index) => (
                <div key={index} className="reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {skill.icon}
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.progress}</span>
                  </div>
                  <div className="skill-progress">
                    <div
                      className="skill-progress-bar transition-all duration-1000 ease-out"
                      style={{ width: "0%" }}
                      data-width={skill.progress}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-secondary/5 rounded-lg p-6 glow reveal">
            <h3 className="text-xl font-semibold mb-6">API Experience</h3>
            <div className="flex flex-wrap gap-2">
              {apiExperience.map((api, index) => (
                <span
                  key={index}
                  className="skill-tag bg-secondary/20 backdrop-blur-sm border border-border"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {api}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
