import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SortOption } from "@/data/types"

interface SortSelectorProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

export function SortSelector({ value, onChange }: SortSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="distance">Distance</SelectItem>
        <SelectItem value="significance">Historical Significance</SelectItem>
        <SelectItem value="alphabetical">Alphabetical</SelectItem>
      </SelectContent>
    </Select>
  )
}
