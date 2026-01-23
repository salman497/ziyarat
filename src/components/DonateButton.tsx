import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

const PAYPAL_DONATE_URL = "https://www.paypal.com/donate/?hosted_button_id=9WGS8R7479UJ6"

export function DonateButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      asChild
      className="text-muted-foreground hover:text-pink-500"
    >
      <a
        href={PAYPAL_DONATE_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="Support this project"
      >
        <Heart className="h-5 w-5" />
        <span className="sr-only">Donate</span>
      </a>
    </Button>
  )
}
