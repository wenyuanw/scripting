import { Color } from "scripting"

const colorMap: Record<string, Color> = {}
const colorList: Color[] = [
  "systemBlue",
  "systemGreen",
  "systemOrange",
  "systemRed",
]

let index = 0


export function getColorByLanguages(language: string) {
  let color = colorMap[language]

  if (!color) {
    color = colorMap[language] = colorList[index++] ?? "systemPurple"
  }

  return color
}