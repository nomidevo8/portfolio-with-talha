"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return

      const { clientX, clientY } = e
      const { width, height, left, top } = heroRef.current.getBoundingClientRect()

      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5

      const nameElement = heroRef.current.querySelector(".hero-name") as HTMLElement
      if (nameElement) {
        nameElement.style.transform = `translate(${x * 20}px, ${y * 20}px)`
      }

      const bgElement = heroRef.current.querySelector(".hero-bg") as HTMLElement
      if (bgElement) {
        bgElement.style.transform = `translate(${x * -40}px, ${y * -40}px)`
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

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
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center items-center pt-16 overflow-hidden bg-grid"
      >
        {/* Background Glow Circles */}
        <div className="absolute inset-0 hero-bg pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
        </div>

        {/* Content & Image */}
        <div className="container mx-auto px-4 z-10 flex flex-col lg:flex-row items-center lg:items-start">
          {/* Text Section */}
          <div className="flex-1 flex flex-col items-start">
            <h1 className="hero-name text-left transition-transform duration-300 ease-out text-glow">
              <div className="flex flex-col">
                <span className="gradient-text reveal">NAU</span>
                <span className="ml-16 gradient-text reveal reveal-delay-1">MAN</span>
              </div>
            </h1>

            <div className="mt-4 mb-8 reveal reveal-delay-2">
              <h2 className="text-2xl md:text-3xl font-medium">
                <span className="text-primary">WordPress Developer</span>{" "}
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-primary">Customization Specialist</span>{" "}
                <span className="mx-2 text-muted-foreground">•</span><br></br>
                <span className="text-primary">Core PHP Expert</span>
              </h2>
            </div>

            <Button
              className="rounded-full text-lg px-8 py-6 mt-8 bg-primary/50 hover:bg-primary/80 backdrop-blur-sm reveal reveal-delay-3"
              onClick={() => {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Explore My Work <ArrowDown className="ml-2" size={18} />
            </Button>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-[450px] mt-8 lg:mt-0 flex-shrink-0 relative">
            <div className="relative w-full h-[350px] sm:h-[400px] lg:h-[450px]">
              <Image
                src="/nauman.png"
                alt="Nauman"
                fill
                className="rounded-full object-cover opacity-90 pointer-events-none select-none"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-background/80 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Scroll Down Arrow */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>

        {/* Wave Divider */}
        <div className="wave-divider">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-background"
            ></path>
          </svg>
        </div>
      </section>
    )
  }

