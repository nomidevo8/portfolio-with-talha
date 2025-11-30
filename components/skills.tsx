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
    { name: "WordPress Development", icon: Globe },
    { name: "Core PHP & MySQL", icon: Code },
    { name: "JavaScript & jQuery", icon: Zap },
    { name: "WordPress Customizer API", icon: Settings },
    { name: "ACF & Custom Post Types", icon: Layers },
    { name: "Third-Party API Integration", icon: Server },
    { name: "WP-CLI & Automation", icon: Workflow },
    { name: "Database Management", icon: Database },
  ]

const apiExperience = [
  { name: "Setmore", url: "https://www.setmore.com/" },
  { name: "Clover", url: "https://www.clover.com/" },
  { name: "Pipedrive", url: "https://www.pipedrive.com/" },
  { name: "Dialpad", url: "https://www.dialpad.com/" },
  { name: "Twilio", url: "https://www.twilio.com/" },
  { name: "SendGrid", url: "https://sendgrid.com/" },
  { name: "Aladhan", url: "https://aladhan.com/prayer-times-api" },
  { name: "Wesabi", url: "https://wasabi.com/" },
  { name: "Surepay USA - Payment Gateway", url: "https://surepay.co/" },
  { name: "Email marketing Mailchimp", url: "https://mailchimp.com/" },
  { name: "Stripe - Payment Gateway", url: "https://stripe.com/" },
    { name: "SMS automation Firebase", url: "https://firebase.google.com/" },
  { name: "Email marketing Brevo", url: "https://www.brevo.com/" },
 
]


  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-heading gradient-text">Skill Development</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-6 reveal">Technical Proficiency</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {skillsWithProgress.map((skill, index) => (
                <div key={index} className="reveal" style={{ transitionDelay: `${index * 0.06}s` }}>
                 <div className="aspect-square rounded-lg bg-secondary/5 flex flex-col items-center p-4 hover:scale-105 transition-transform shadow-sm">
  <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mb-3">
    <skill.icon className="w-6 h-6 block text-primary" />
  </div>
  <div className="text-center font-medium text-sm leading-tight">{skill.name}</div>
</div>

                </div>
              ))}
            </div>
          </div>

          <div className="bg-secondary/5 rounded-lg p-6 glow reveal">
            <h3 className="text-xl font-semibold mb-6">API Experience</h3>
            <div className="flex flex-wrap gap-2">
              {apiExperience.map((api, index) => (
                <a
                  key={index}
                  href={api.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="skill-tag bg-secondary/20 backdrop-blur-sm border border-border hover:bg-primary/10 transition-colors"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {api.name}
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
