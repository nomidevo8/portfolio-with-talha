"use client"

import { useEffect } from "react"
import { CheckCircle, Award, Star, Trophy } from "lucide-react"

export default function Achievements() {
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

  const achievements = [
    {
      title: "Developed & Customized WordPress Websites",
      description:
        "Designed and built scalable, fully responsive websites, ensuring smooth user experience and easy content management.",
      icon: <Trophy className="h-10 w-10 text-primary" />,
    },
    {
      title: "Integrated APIs & Enhanced User Experience",
      description:
        "Connected third-party services like Twilio for SMS automation, Setmore for bookings, Clover for payments, Pipedrive for CRM, and Dialpad for communication, improving client operations.",
      icon: <Star className="h-10 w-10 text-primary" />,
    },
    {
      title: "Automated Content Management with WP-CLI",
      description:
        "Created WP-CLI commands to scan posts, update metadata, and streamline bulk content processing, saving time and improving efficiency.",
      icon: <Award className="h-10 w-10 text-primary" />,
    },
    {
      title: "Built Custom Admin Dashboards",
      description:
        "Designed intuitive admin panels using ACF & Custom Post Types, allowing clients to manage their websites effortlessly.",
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
    },
  ]

  return (
    <section id="achievements" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-heading gradient-text">Achievements</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="flex gap-6 p-6 rounded-lg bg-secondary/5 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300 glow reveal"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="flex-shrink-0 mt-1 bg-secondary/20 p-4 rounded-full">{achievement.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">{achievement.title}</h3>
                <p className="text-muted-foreground">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
