import { Routes, Route } from "react-router"
import { useEffect, useState } from "react"
import HomePage from "./pages/HomePage"
import MadinahPage from "./pages/MadinahPage"
import MakkahPage from "./pages/MakkahPage"

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ziyarat-theme")
      return saved === "dark"
    }
    return false
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("ziyarat-theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("ziyarat-theme", "light")
    }
  }, [isDark])

  const toggleTheme = () => setIsDark(!isDark)

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<HomePage isDark={isDark} toggleTheme={toggleTheme} />} />
        <Route path="/madinah" element={<MadinahPage isDark={isDark} toggleTheme={toggleTheme} />} />
        <Route path="/madinah/:placeId" element={<MadinahPage isDark={isDark} toggleTheme={toggleTheme} />} />
        <Route path="/makkah" element={<MakkahPage isDark={isDark} toggleTheme={toggleTheme} />} />
        <Route path="/makkah/:placeId" element={<MakkahPage isDark={isDark} toggleTheme={toggleTheme} />} />
      </Routes>
    </div>
  )
}

export default App
