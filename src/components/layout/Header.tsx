import { ArrowLeft, Moon, Sun } from "lucide-react"
import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  title: string
  showBack?: boolean
  isDark: boolean
  toggleTheme: () => void
}

export function Header({ title, showBack = false, isDark, toggleTheme }: HeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Go back</span>
          </Button>
        )}

        <h1 className="flex-1 text-lg font-semibold tracking-tight">{title}</h1>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="ml-auto"
        >
          {isDark ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  )
}
