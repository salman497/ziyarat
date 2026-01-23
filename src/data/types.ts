export interface ZiyaratPlace {
  id: string
  nameEnglish: string
  nameArabic: string
  briefSummary: string
  historicalSignificance: string[]
  kidFriendlyFacts: string[]
  fullStory: string
  distanceFromCenter: string
  distanceKm: number
  coordinates: {
    lat: number
    lng: number
  }
  googleMapsUrl: string
  category: "mosque" | "cemetery" | "mountain" | "landmark" | "ritual-site"
  historicalRating: number // 1-5 for sorting by significance
  imageUrl: string
  audioUrl?: string
}

export type City = "madinah" | "makkah"

export type SortOption = "distance" | "significance" | "alphabetical"

export interface UserProgress {
  visitedMadinah: string[]
  visitedMakkah: string[]
  lastCity: City | null
}
