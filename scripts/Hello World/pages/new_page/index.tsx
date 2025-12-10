import { NavigationStack, Text, VStack, Button, useContext, Navigation } from "scripting"
import { useI18n } from "../../i18n"
import { MyInfo } from "../../common/types"
import { MyInfoProvider, MyInfoContext } from "./store"

export function NewPage({
  myInfo
}: {
  myInfo: MyInfo
}) {

  return (
    <MyInfoProvider initialMyInfo={myInfo}>
      <NavigationStack>
        <BodyView />
      </NavigationStack>
    </MyInfoProvider>
  )
}

function BodyView() {
  const i18n = useI18n()
  const dismiss = Navigation.useDismiss()
  const { nameAndAge, setName, setAge } = useContext(MyInfoContext)

  return <VStack
    navigationTitle={i18n.newPageTitle}
    navigationBarTitleDisplayMode="inline"
    toolbar={{
      cancellationAction: <Button
        title={i18n.done}
        action={dismiss}
      />,
    }}
  >
    <Text>{i18n.newPageText}</Text>
    <Text>Name and Age: {nameAndAge}</Text>
    <Button title="Change Name and Age" action={() => {
      setName("John" + Math.random().toString(36).substring(2, 15))
      setAge(Math.floor(Math.random() * 100))
    }} />
  </VStack>
}