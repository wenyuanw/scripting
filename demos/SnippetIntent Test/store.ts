import { Color, Intent } from "scripting"
import { colorKey } from "./const"

class Store {

  get color(): Color {

    let c = IntentMemoryStorage.get<Color>(
      colorKey
    )

    //console.log("Color in memory", c)

    return c ?? 'systemBlue'
  }

  setColor(value: Color) {
    console.log("set new color", value)
    IntentMemoryStorage.set(colorKey, value)
  }

}

export const store = new Store()