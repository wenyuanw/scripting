import { Intent, Navigation, Script } from "scripting"
import { getI18n } from "./i18n"
import type { MyInfo } from "./common/types"
import { NewPage } from "./pages/new_page"

async function run() {
  const i18n = getI18n()

  if (Intent.shortcutParameter == null) {
    Dialog.alert({
      message: i18n.noShortcutParameterFound,
    })

    Script.exit()
    return
  }

  if (Intent.shortcutParameter.type !== "text") {
    Dialog.alert({
      message: i18n.shortcutTextParamOnly,
    })
    Script.exit()
    return
  }

  const text = Intent.shortcutParameter.value

  const myInfo = await Navigation.present<MyInfo>({
    element: <NewPage
      myInfo={{ name: text, age: 18, email: "bob.smith@example.com" }}
    />
  })

  if (myInfo != null) {
    await Dialog.alert({
      message: i18n.myInfoSuccessful(
        myInfo.name,
        myInfo.age,
        myInfo.email
      )
    })
  }

  Script.exit()
}

run()