import { Navigation, Script } from "scripting"
import { MainPage } from "./pages/main"

async function run() {
  await Navigation.present({
    element: <MainPage />
  })

  // Exit the script and return result
  Script.exit()
}

run()
