import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

const ambienteImages = [
  "images/rooms/6.webp",
  "images/rooms/3.webp",
  "images/rooms/5.webp",
  "images/rooms/2.webp",
  "images/rooms/1.webp",
]

export function AmbienteImageCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-2xl mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {ambienteImages.map((src, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="overflow-hidden rounded-2xl border-rose-900/30 shadow-lg">
                <CardContent className="flex aspect-video items-center justify-center p-0 bg-black">
                  <img
                    src={src}
                    alt={`Ambiente Beispielraum ${index + 1}`}
                    className="w-full h-[28rem] object-cover object-center"
                    loading="lazy"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
  {/* No navigation arrows, only autoplay */}
    </Carousel>
  )
}
