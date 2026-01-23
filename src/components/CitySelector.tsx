import { useNavigate } from "react-router"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { City } from "@/data/types"

interface CitySelectorProps {
  onSelect?: (city: City) => void
}

const cities = [
  {
    id: "madinah" as City,
    name: "Madinah",
    nameArabic: "المدينة المنورة",
    description: "The Radiant City - Home of the Prophet's Mosque",
    gradient: "from-emerald-600 to-teal-700",
    places: 12,
  },
  {
    id: "makkah" as City,
    name: "Makkah",
    nameArabic: "مكة المكرمة",
    description: "The Blessed City - Home of the Holy Kaaba",
    gradient: "from-amber-600 to-orange-700",
    places: 15,
  },
]

export function CitySelector({ onSelect }: CitySelectorProps) {
  const navigate = useNavigate()

  const handleSelect = (city: City) => {
    if (onSelect) {
      onSelect(city)
    }
    navigate(`/${city}`)
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {cities.map((city, index) => (
        <Card
          key={city.id}
          className={cn(
            "group relative cursor-pointer overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]",
            "animate-slide-up opacity-0"
          )}
          style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "forwards" }}
          onClick={() => handleSelect(city.id)}
        >
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-90 transition-opacity group-hover:opacity-100",
            city.gradient
          )} />

          <div className="absolute inset-0 islamic-pattern opacity-30" />

          <CardContent className="relative z-10 flex min-h-[200px] flex-col justify-end p-6 text-white sm:min-h-[250px]">
            <p className="text-4xl font-bold mb-2 font-arabic opacity-80 transition-transform group-hover:scale-105">
              {city.nameArabic}
            </p>
            <h2 className="text-3xl font-bold mb-2 transition-transform group-hover:translate-x-1">
              {city.name}
            </h2>
            <p className="text-sm opacity-90 mb-3">
              {city.description}
            </p>
            <p className="text-xs opacity-75">
              {city.places} Ziyarat Places
            </p>
          </CardContent>

          <div className="absolute inset-0 bg-white/0 transition-colors group-hover:bg-white/5" />
        </Card>
      ))}
    </div>
  )
}
