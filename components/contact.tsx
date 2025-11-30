"use client"

import type React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import emailjs from "emailjs-com";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs
      .send(
        "service_romu1li",       
        "template_lbuche8",    
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        "4AWkBfBTXrkt5FE8x"      
      )
      .then(
        (result) => {
          console.log("Email sent:", result.text);
          alert("Message sent successfully!");
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        },
        (error) => {
          console.error("Error sending email:", error.text);
          alert("Failed to send message. Please try again later.");
        }
      );
  };

  return (
    <section id="contact" className="py-20 bg-secondary/5 bg-dots">
      <div className="container mx-auto px-4">
        <h2 className="section-heading gradient-text">Contact</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="reveal">
            <div className="space-y-8">
              <div className="flex items-start gap-6 p-6 rounded-lg bg-secondary/10 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300">
                <MapPin className="h-10 w-10 p-2 bg-secondary/20 rounded-full text-primary" />
                <div>
                  <h3 className="font-medium text-lg mb-1 text-primary">Address</h3>
                  <p className="text-muted-foreground">Kot samaba Rahim yar khan Punjab</p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 rounded-lg bg-secondary/10 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300">
                <Phone className="h-10 w-10 p-2 bg-secondary/20 rounded-full text-primary" />
                <div>
                  <h3 className="font-medium text-lg mb-1 text-primary">Phone</h3>
                  <p className="text-muted-foreground">03707931432</p>
                  <p className="text-muted-foreground">03043403219 (Mobile/Chat)</p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 rounded-lg bg-secondary/10 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300">
                <Mail className="h-10 w-10 p-2 bg-secondary/20 rounded-full text-primary" />
                <div>
                  <h3 className="font-medium text-lg mb-1 text-primary">Email</h3>
                  <p className="text-muted-foreground">nomideveloper628@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-6 rounded-lg bg-secondary/5 backdrop-blur-sm border border-border glow"
            >
              <h3 className="text-xl font-semibold mb-4 text-primary">Send Me a Message</h3>
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-background/50 backdrop-blur-sm border-border focus:border-primary"
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-background/50 backdrop-blur-sm border-border focus:border-primary"
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-background/50 backdrop-blur-sm border-border focus:border-primary"
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="min-h-[150px] bg-background/50 backdrop-blur-sm border-border focus:border-primary"
                />
              </div>
              <Button type="submit" className="w-full group">
                Send Message
                <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
