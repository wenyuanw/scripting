import { AppIntentManager, AppIntentProtocol, Circle, Button, Color, HStack, Spacer, Image, Text, VStack, Intent } from "scripting"
import { store } from "./store"

export const PickColorIntent = AppIntentManager.register<void>({
  name: "PickColorIntent",
  protocol: AppIntentProtocol.SnippetIntent,
  perform: async () => {
    return <PickColorView />
  }
})

export const SetColorIntent = AppIntentManager.register({
  name: "SetColorIntent",
  protocol: AppIntentProtocol.AppIntent,
  perform: async (color: Color) => {
    try {
      store.setColor(color)
    } catch (e) {
      console.error(e)
    }
  }
})

export const ShowResultIntent = AppIntentManager.register({
  name: "ShowResultIntent",
  protocol: AppIntentProtocol.SnippetIntent,
  perform: async ({
    content,
    //color
  }: {
    content: string
    //color: Color
  }) => {
    return <ResultView
      content={content}
    //color={color}
    />

  }
})

function PickColorView() {
  const current = store.color
  console.log("pick color view current", current)

  const colors: Color[] = [
    "systemBlue",
    "systemOrange",
    "systemGreen",
    "systemRed",
    "systemBrown"
  ]
  return <VStack
    frame={{
      maxWidth: 'infinity',
      alignment: 'leading'
    }}
  >
    {colors.map(color =>
      <HStack>
        <Circle
          frame={{
            width: 30,
            height: 30
          }}
          fill={color}
        />
        <Text>{color}</Text>
        <Spacer />
        {
          current == color
            ? <Image
              systemName="checkmark"
              foregroundStyle="accentColor"
            />
            : <Button
              title="Set"
              intent={
                SetColorIntent(color)
              }
            />
        }
      </HStack>
    )}
  </VStack>
}

function ResultView({
  content,
  //color
}: {
  content: string
  //color: Color
}) {
  const color = store.color

  return <VStack>
    <Text
      font="title"
    >The Result</Text>
    <Text
      foregroundStyle={color}
    >
      {content}
    </Text>
    <Button
      title="Set red"
      intent={SetColorIntent("systemRed")}
    />

    <Button
      title="Set green"
      intent={
        SetColorIntent("systemGreen")
      }
    />

  </VStack>
}