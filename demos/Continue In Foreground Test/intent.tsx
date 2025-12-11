import { Button, Intent, List, Navigation, NavigationStack, Script, Section, TextField, useState } from "scripting"

function View() {
  const dismiss = Navigation.useDismiss()

  const [text, setText] = useState("")

  return <NavigationStack>

    <List
      navigationTitle="Intent Demo"
    >
      <TextField
        title="Enter a text"
        value={text}
        onChanged={setText}
      />

      <Section>
        <Button
          title="Return Text"
          action={() => {
            dismiss(text)
          }}
          disabled={!/\S+/.test(text)}
        />
      </Section>

    </List>

  </NavigationStack>

}

async function runIntent() {

  await Intent.continueInForeground(
    "Do you want to open the app and continue?"
  )

  const text = await Navigation.present<string | null>(
    <View />
  )

  Safari.openURL("shortcuts://")

  Script.exit(
    Intent.text(
      text ?? "No text return"
    )
  )
}

runIntent()