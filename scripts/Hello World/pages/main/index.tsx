import { Button, VStack, HStack, Navigation, NavigationStack, Spacer, Text, useState } from "scripting"
import { useI18n } from "../../i18n"
import { NewPage } from "../new_page"

export function MainPage() {
  return <NavigationStack>
    <ContentView />
  </NavigationStack>
}

function ContentView() {
  const i18n = useI18n()
  const dismiss = Navigation.useDismiss()

  const [
    count,
    setCount
  ] = useState(0)

  return <VStack
    navigationTitle={i18n.mainPage}
    navigationBarTitleDisplayMode="inline"
    toolbar={{
      cancellationAction: <Button
        title={i18n.done}
        action={dismiss}
      />,
      bottomBar: <HStack>
        <Button
          title={i18n.decrement}
          fontWeight="medium"
          action={() => setCount(count - 1)}
        />
        <Spacer />
        <Button
          title={i18n.increment}
          fontWeight="medium"
          action={() => setCount(count + 1)}
        />
      </HStack>
    }}
    >
    <Text>Hello, World!</Text>
    <Text>count: {count}</Text>
    <Button
      title={i18n.openNewPage}
      fontWeight="medium"
      action={async () => {
        await Navigation.present({
          element: <NewPage myInfo={{ name: "Bob Smith", age: 18, email: "bob.smith@example.com" }} />,
          modalPresentationStyle: "pageSheet"
        })
      }}
    />
  </VStack>
}