import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CitySelector } from "@/components/CitySelector"

interface HomePageProps {
  isDark: boolean
  toggleTheme: () => void
}

export default function HomePage({ isDark, toggleTheme }: HomePageProps) {
  return (
    <div className="min-h-screen islamic-pattern">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4">
          <h1 className="flex-1 text-lg font-semibold tracking-tight">Ziyarat Guide</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="container px-4 py-8">
        {/* Greeting */}
        <div className="mb-8 text-center animate-fade-in">
          <p className="text-2xl font-arabic text-primary mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <h2 className="text-3xl font-bold mb-2">Welcome to Ziyarat Guide</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Discover the sacred places of Madinah and Makkah with engaging stories
            and fascinating facts for the whole family.
          </p>
        </div>

        {/* City selection */}
        <section className="max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-4 text-center">Choose Your City</h3>
          <CitySelector />
        </section>

        {/* Trip info */}
        <section className="mt-12 max-w-md mx-auto text-center opacity-75">
          <p className="text-sm text-muted-foreground">
            Your blessed journey: Karachi → Madinah (2 nights) → Makkah (3 nights) → Riyadh → Karachi
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Jan 24-31, 2026
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 mt-auto">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>May Allah accept your Umrah and bless your family.</p>
          <p className="mt-1 font-arabic">تَقَبَّلَ اللهُ مِنَّا وَمِنكُم</p>
        </div>
      </footer>
    </div>
  )
}
