import { Image, VStack, Link, useState } from "scripting"

export function Avatar({
  avatar, size, username, url, usePopover = true
}: {
  username: string
  avatar: string
  url: string
  size: number
  usePopover?: boolean
}) {
  const [
    presented,
    setPresented
  ] = useState(false)

  return <Image
    imageUrl={avatar}
    resizable
    scaleToFit
    frame={{
      width: size,
      height: size
    }}
    clipShape={{
      type: "rect",
      cornerRadius: size
    }}
    onTapGesture={() => {
      setPresented(true)
    }}
    widgetAccentedRenderingMode="fullColor"
    popover={usePopover
      ? {
        isPresented: presented,
        onChanged: setPresented,
        presentationCompactAdaptation: "popover",
        content: <VStack
          padding
        >
          <Image
            imageUrl={avatar}
            resizable
            scaleToFit
            frame={{
              width: 48,
              height: 48
            }}
            clipShape={{
              type: "rect",
              cornerRadius: 48
            }}
          />
          <Link
            url={url}
          >
            {username}
          </Link>
        </VStack>
      }
      : undefined}
  />
}