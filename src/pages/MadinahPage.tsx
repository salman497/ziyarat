import { useState, useMemo } from "react"
import { useParams, useNavigate } from "react-router"
import { Header } from "@/components/layout/Header"
import { PlaceCard } from "@/components/PlaceCard"
import { PlaceDetail } from "@/components/PlaceDetail"
import { SortSelector } from "@/components/SortSelector"
import { useSessionStorage, STORAGE_KEYS } from "@/hooks/useSessionStorage"
import { madinahPlaces } from "@/data/madinah-places"
import { SortOption, ZiyaratPlace } from "@/data/types"

interface MadinahPageProps {
  isDark: boolean
  toggleTheme: () => void
}

export default function MadinahPage({ isDark, toggleTheme }: MadinahPageProps) {
  const { placeId } = useParams()
  const navigate = useNavigate()
  const [sortBy, setSortBy] = useState<SortOption>("distance")
  const [visitedPlaces, setVisitedPlaces] = useSessionStorage<string[]>(
    STORAGE_KEYS.VISITED_MADINAH,
    []
  )

  const selectedPlace = placeId
    ? madinahPlaces.find((p) => p.id === placeId) || null
    : null

  const sortedPlaces = useMemo(() => {
    const places = [...madinahPlaces]
    switch (sortBy) {
      case "distance":
        return places.sort((a, b) => a.distanceKm - b.distanceKm)
      case "significance":
        return places.sort((a, b) => b.historicalRating - a.historicalRating)
      case "alphabetical":
        return places.sort((a, b) => a.nameEnglish.localeCompare(b.nameEnglish))
      default:
        return places
    }
  }, [sortBy])

  const handlePlaceClick = (place: ZiyaratPlace) => {
    navigate(`/madinah/${place.id}`)
  }

  const handleCloseDetail = () => {
    navigate("/madinah")
  }

  const handleMarkVisited = () => {
    if (!selectedPlace) return
    setVisitedPlaces((prev) => {
      if (prev.includes(selectedPlace.id)) {
        return prev.filter((id) => id !== selectedPlace.id)
      }
      return [...prev, selectedPlace.id]
    })
  }

  const isPlaceVisited = (placeId: string) => visitedPlaces.includes(placeId)

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Madinah Ziyarat"
        showBack
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      <main className="container px-4 py-6">
        {/* Page header */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl font-bold">Holy Places in Madinah</h2>
              <p className="text-muted-foreground">
                {madinahPlaces.length} places to explore
              </p>
            </div>
            <SortSelector value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6 p-4 rounded-lg bg-muted/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Your Progress</span>
            <span className="text-sm text-muted-foreground">
              {visitedPlaces.length} / {madinahPlaces.length} visited
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{
                width: `${(visitedPlaces.length / madinahPlaces.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Places grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedPlaces.map((place, index) => (
            <PlaceCard
              key={place.id}
              place={place}
              isVisited={isPlaceVisited(place.id)}
              onClick={() => handlePlaceClick(place)}
              index={index}
            />
          ))}
        </div>
      </main>

      {/* Place detail sheet */}
      <PlaceDetail
        place={selectedPlace}
        isOpen={!!selectedPlace}
        onClose={handleCloseDetail}
        isVisited={selectedPlace ? isPlaceVisited(selectedPlace.id) : false}
        onMarkVisited={handleMarkVisited}
      />
    </div>
  )
}
