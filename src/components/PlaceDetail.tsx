import { useState, useEffect } from "react"
import { MapPin, ExternalLink, CheckCircle, Star } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { AudioPlayer } from "@/components/AudioPlayer"
import { cn } from "@/lib/utils"
import { ZiyaratPlace } from "@/data/types"

interface PlaceDetailProps {
  place: ZiyaratPlace | null
  isOpen: boolean
  onClose: () => void
  isVisited: boolean
  onMarkVisited: () => void
}

const categoryColors: Record<string, string> = {
  mosque: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  cemetery: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  mountain: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  landmark: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "ritual-site": "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
}

const categoryLabels: Record<string, string> = {
  mosque: "Mosque",
  cemetery: "Cemetery",
  mountain: "Mountain",
  landmark: "Landmark",
  "ritual-site": "Ritual Site",
}

export function PlaceDetail({
  place,
  isOpen,
  onClose,
  isVisited,
  onMarkVisited,
}: PlaceDetailProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Reset image state when place changes
  useEffect(() => {
    setImageLoaded(false)
    setImageError(false)
  }, [place?.id])

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
      setImageLoaded(false)
      setImageError(false)
    }
  }

  if (!place) return null

  const webpUrl = place.imageUrl.replace('.jpg', '.webp')

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] p-0 sm:max-w-xl sm:mx-auto sm:rounded-t-xl">
        <ScrollArea className="h-full">
          <div className="p-6">
            <SheetHeader className="text-left mb-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <SheetTitle className="text-xl">{place.nameEnglish}</SheetTitle>
                  <p className="text-lg text-muted-foreground font-arabic mt-1">
                    {place.nameArabic}
                  </p>
                </div>
                <Badge className={cn("shrink-0", categoryColors[place.category])}>
                  {categoryLabels[place.category]}
                </Badge>
              </div>
            </SheetHeader>

            {/* Hero image */}
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mb-4">
              {/* Gradient placeholder - always visible as fallback */}
              <div className={cn(
                "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 transition-opacity duration-300",
                imageLoaded && !imageError ? "opacity-0" : "opacity-100"
              )}>
                <span className="text-5xl font-bold text-primary/30">{place.nameArabic}</span>
              </div>

              {/* Actual image with WebP support */}
              {!imageError && (
                <picture>
                  <source srcSet={webpUrl} type="image/webp" />
                  <img
                    src={place.imageUrl}
                    alt={place.nameEnglish}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
                      imageLoaded ? "opacity-100" : "opacity-0"
                    )}
                  />
                </picture>
              )}
            </div>

            {/* Quick info */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center gap-1 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{place.distanceFromCenter} from center</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 text-secondary fill-secondary" />
                <span>Historical Rating: {place.historicalRating}/5</span>
              </div>
            </div>

            {/* Audio Player */}
            <AudioPlayer
              audioUrl={place.audioUrl}
              title={`Listen: ${place.nameEnglish}`}
              className="mb-4"
            />

            {/* Summary */}
            <p className="text-muted-foreground mb-4">{place.briefSummary}</p>

            <Separator className="my-4" />

            {/* Accordion sections */}
            <Accordion type="multiple" defaultValue={["story"]} className="w-full">
              <AccordionItem value="story">
                <AccordionTrigger className="text-base font-semibold">
                  The Full Story
                </AccordionTrigger>
                <AccordionContent>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {place.fullStory.split("\n\n").map((paragraph, i) => (
                      <p key={i} className="mb-3 text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="history">
                <AccordionTrigger className="text-base font-semibold">
                  Historical Significance
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {place.historicalSignificance.map((item, i) => (
                      <li key={i} className="flex gap-2 text-muted-foreground">
                        <span className="text-primary font-bold shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="facts">
                <AccordionTrigger className="text-base font-semibold">
                  Fun Facts for Kids
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {place.kidFriendlyFacts.map((fact, i) => (
                      <li key={i} className="flex gap-2 text-muted-foreground">
                        <span className="text-secondary font-bold shrink-0">★</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Separator className="my-4" />

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <Button
                className="w-full"
                onClick={() => window.open(place.googleMapsUrl, "_blank")}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Open in Google Maps
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant={isVisited ? "secondary" : "outline"}
                className="w-full"
                onClick={onMarkVisited}
              >
                <CheckCircle className={cn("mr-2 h-4 w-4", isVisited && "text-primary")} />
                {isVisited ? "Visited!" : "Mark as Visited"}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
