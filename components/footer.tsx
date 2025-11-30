import Link from "next/link"
import { Github, Linkedin, Twitter, Instagram } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-2 gradient-text">Nauman Sajjad</h2>
            <p className="text-muted-foreground">WordPress Developer & Customization Specialist</p>
            <p className="text-muted-foreground mt-4">© {new Date().getFullYear()} All rights reserved.</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center space-x-6 mb-6">
              {/* <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full bg-secondary/20 hover:bg-secondary/40"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link> */}
              <Link
                href="https://www.linkedin.com/in/noman-sajjad-infy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full bg-secondary/20 hover:bg-secondary/40"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://www.fiverr.com/nomi_devo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full bg-secondary/20 hover:bg-secondary/40"
              >
                <Image
                  src={"/fiver.png"}
                  alt={"Fiver"}
                  width={24}        
                  height={24}
                  className="object-contain"
                />
                <span className="sr-only">Fiverr</span>
              </Link>
              <Link
                href="https://www.upwork.com/freelancers/~0168bf9ce230fd2a40"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full bg-secondary/20 hover:bg-secondary/40"
              >
                <Image
                  src={"/upwork.png"}
                  alt={"Upwork"}
                  width={24}        
                  height={24}
                  className="object-contain"
                />
                <span className="sr-only">Upwork</span>
              </Link>
              {/* <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full bg-secondary/20 hover:bg-secondary/40"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link> */}
            </div>
            <p className="text-sm text-muted-foreground">Designed with ❤️ by Nauman Sajjad</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
