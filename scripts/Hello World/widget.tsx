import { VStack, Text, Divider, Widget } from "scripting"
import { getI18n } from "./i18n"

export function WidgetView({
  text
}: {
  text: string
}) {
  const i18n = getI18n()

  return (
    <VStack
      background="systemBackground"
      frame={Widget.displaySize}
    >
      <VStack
        padding
      >
        <Text
          foregroundStyle="secondaryLabel"
          font={12}
          fontWeight="light"
        >
          {i18n.widgetText}
        </Text>
        <Text
          fontWeight="bold"
          foregroundStyle="systemGreen"
        >
          {text}
        </Text>
        <Divider />
      </VStack>
    </VStack>
  )
}


async function run() {
  let text = 'Hello, World!'

  Widget.present(
    <WidgetView
      text={text}
    />
  )
}

run()