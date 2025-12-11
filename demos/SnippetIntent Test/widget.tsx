import { Button, Divider, Text, VStack, Widget } from "scripting"

function WidgetView() {

  return <VStack
    padding
    frame={Widget.displaySize}
  >
  </VStack>
}

Widget.present(<WidgetView />)