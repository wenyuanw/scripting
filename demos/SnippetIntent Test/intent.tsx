import { Intent, Script } from "scripting"
import { PickColorIntent, ShowResultIntent } from "./app_intents"
import { store } from "./store"

async function runIntent() {

  await Intent.requestConfirmation(
    "set",
    PickColorIntent(), {
      dialog: "Set a color"
    }
  )

  Script.exit(
    Intent.snippetIntent({
      value: Intent.text(`Selected color: ${store.color}`),
      snippetIntent: ShowResultIntent({
        content: Intent.shortcutParameter?.type === 'text'
          ? Intent.shortcutParameter.value
          : "No text parameter from Shortcuts",
      })
    })
  )
}

// presentIntentView()
runIntent()