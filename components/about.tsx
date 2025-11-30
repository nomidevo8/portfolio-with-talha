"use client"

import { useEffect } from "react"
import Image from "next/image"

export default function About() {
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

  return (
    <section id="about" className="py-20 bg-secondary/5 bg-dots">
      <div className="container mx-auto px-4">
        <h2 className="section-heading gradient-text">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="reveal">
            <div className="relative mb-8 md:mb-0">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden glow">
              <Image
                src="/nauman.png"
                alt="Nauman Sajjad"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-cover"
              />

                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-secondary/10 backdrop-blur-sm border border-border p-4 rounded-lg">
                <p className="text-lg font-medium">2+ Years Experience</p>
              </div>
            </div>
          </div>

          <div className="self-center">
            <p className="text-lg leading-relaxed mb-6 reveal reveal-delay-1">
              I'm a skilled WordPress developer with knowledge of Core PHP, plugin development, and theme customization. My area of expertise is creating responsive, high-performance websites that put an emphasis on security, speed, and great user experiences. I love building unique admin panels and coming up with effective, customized solutions to help businesses succeed online because I'm passionate about finding solutions to challenging problems.
            </p>
            <p className="text-lg leading-relaxed mb-8 reveal reveal-delay-2">
          
            </p>

            <div className="space-y-4 reveal reveal-delay-3">
              <div className="flex gap-4  rounded-lg hover:bg-secondary/10 transition-colors">
                <div className="w-32 font-medium text-primary">Address:</div>
                <div>Kot samaba, Rahim yar khan, Punjab Pakistan</div>
              </div>
              <div className="flex gap-4  rounded-lg hover:bg-secondary/10 transition-colors">
                <div className="w-32 font-medium text-primary">Date of Birth:</div>
                <div>August 4, 2002</div>
              </div>
              <div className="flex gap-4  rounded-lg hover:bg-secondary/10 transition-colors">
                <div className="w-32 font-medium text-primary">Nationality:</div>
                <div>Pakistan</div>
              </div>
              <div className="flex gap-4  rounded-lg hover:bg-secondary/10 transition-colors">
                <div className="w-32 font-medium text-primary">Languages:</div>
                <div>Urdu & English</div>
              </div>
              <div className="flex gap-4  rounded-lg hover:bg-secondary/10 transition-colors">
                <div className="w-32 font-medium text-primary">Phone:</div>
                <div>03707931432</div>
              </div>
              <div className="flex gap-4  rounded-lg hover:bg-secondary/10 transition-colors">
                <div className="w-32 font-medium text-primary">Mobile/Chat:</div>
                <div>03043403219</div>
              </div>
              <div className="flex gap-4  rounded-lg hover:bg-secondary/10 transition-colors">
                <div className="w-32 font-medium text-primary">Email:</div>
                <div>nomideveloper628@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
