import { MapPin, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ZiyaratPlace } from "@/data/types"

interface PlaceCardProps {
  place: ZiyaratPlace
  isVisited?: boolean
  onClick: () => void
  index: number
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

export function PlaceCard({ place, isVisited, onClick, index }: PlaceCardProps) {
  return (
    <Card
      className={cn(
        "group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
        "animate-slide-up opacity-0",
        isVisited && "ring-2 ring-primary/50"
      )}
      style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "forwards" }}
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
          <span className="text-4xl font-bold text-primary/30">{place.nameArabic}</span>
        </div>
        {isVisited && (
          <div className="absolute top-2 right-2 rounded-full bg-primary p-1">
            <CheckCircle className="h-4 w-4 text-primary-foreground" />
          </div>
        )}
        <Badge
          className={cn(
            "absolute bottom-2 left-2",
            categoryColors[place.category]
          )}
        >
          {categoryLabels[place.category]}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors">
              {place.nameEnglish}
            </h3>
            <p className="text-sm text-muted-foreground font-arabic">
              {place.nameArabic}
            </p>
          </div>
        </div>

        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
          {place.briefSummary}
        </p>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{place.distanceFromCenter} from center</span>
        </div>
      </CardContent>
    </Card>
  )
}
