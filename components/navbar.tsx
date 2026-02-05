"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"
import LivePreviewButton from "@/components/live-preview-button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold gradient-text">
          NOMII
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <Link href="#about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#skills" className="hover:text-primary transition-colors">
              Skills
            </Link>
            <Link href="#projects" className="hover:text-primary transition-colors">
              Projects
            </Link>
            <Link href="#contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
            <LivePreviewButton url={"https://cal.com/talhacoder.gt.tc/15min"} innerText="Schedule a call" />

          {/* <Button className="rounded-full bg-primary/50 hover:bg-primary/80 backdrop-blur-sm">
            <Phone className="mr-2 h-4 w-4" />
            <a href="https://cal.com/talhacoder.gt.tc/15min" target="_blank">
              SCHEDULE A CALL</a>
          </Button> */}
        </div>

        <button
          className="md:hidden p-2 rounded-full bg-secondary/20 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border">
          <nav className="flex flex-col p-4 gap-4">
            <Link
              href="#about"
              className="py-3 px-4 hover:bg-secondary/20 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#skills"
              className="py-3 px-4 hover:bg-secondary/20 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Skills
            </Link>
            <Link
              href="#projects"
              className="py-3 px-4 hover:bg-secondary/20 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className="py-3 px-4 hover:bg-secondary/20 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Button className="rounded-full mt-2 bg-primary/20 hover:bg-primary/30">
              <Phone className="mr-2 h-4 w-4" />  
              <a href="https://cal.com/talhacoder.gt.tc/15min" target="_blank">
              SCHEDULE A CALL</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
