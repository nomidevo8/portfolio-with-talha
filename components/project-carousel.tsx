"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"

type Props = {
  screenshots: string[]
  title: string
}

export default function ProjectCarousel({ screenshots, title }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [zoomed, setZoomed] = useState(false) // for full-screen preview

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1))
  }

  // Auto scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [activeIndex, screenshots.length])

  return (
    <>
      {/* Carousel */}
      <div className="relative w-full overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {screenshots.map((src, i) => (
            <div key={i} className="flex-shrink-0 w-full relative">
              <Card className="overflow-hidden border border-border bg-background/80">
                <div className="relative aspect-video w-full cursor-zoom-in">
                  <Image
                    src={src}
                    alt={`${title} screenshot ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    onClick={() => setZoomed(true)}
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Prev / Next */}
        {screenshots.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-2 text-muted-foreground -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition"
            >
              &#10094;
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-2 text-muted-foreground -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition"
            >
              &#10095;
            </button>
          </>
        )}

        {/* Pagination Dots */}
        {screenshots.length > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 w-2 rounded-full transition ${
                  i === activeIndex ? "bg-primary" : "bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Full-Screen Zoom */}
      {zoomed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 cursor-zoom-out"
          onClick={() => setZoomed(false)}
        >
          <Image
            src={screenshots[activeIndex]}
            alt={`${title} screenshot ${activeIndex + 1}`}
            width={1200}
            height={800}
            className="object-contain max-h-full max-w-full"
          />
        </div>
      )}
    </>
  )
}
