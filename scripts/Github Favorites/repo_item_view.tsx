import { HStack, Capsule, Link, Text, Spacer, VStack, Color } from "scripting"
import { Avatar } from "./avatar"
import { GithubTrendingRepo } from "./types"

export function RepoItemView({
  item, color, showAvatar = true
}: {
  item: GithubTrendingRepo
  color: Color
  showAvatar?: boolean
}) {
  return <Link
    buttonStyle="plain"
    url={item.url}
    padding={{
      horizontal: true
    }}
  >
    <VStack
      alignment="leading"
      font={12}
      foregroundStyle="white"
      spacing={2}
    >
      <HStack
        fontWeight="bold"
      >
        <Text
          font={8}
          fontWeight="regular"
          padding={{
            horizontal: 4,
            vertical: 2,
          }}
          frame={{
            minWidth: 50
          }}
          background={
            <Capsule
              fill={color}
              widgetAccentable
            />
          }
        >
          {item.language}
        </Text>
        <Text
          lineLimit={1}
        >
          {item.author + '/' + item.title}
        </Text>
        <Spacer />
        <Text
          widgetAccentable
        >
          {item.stars}⭐️
        </Text>
      </HStack>
      <HStack
        foregroundStyle={{
          color: "white",
          opacity: 0.7
        }}
        spacing={4}
      >
        <Text
          lineLimit={2}
          font={10}
        >{item.description}</Text>
        <Spacer />
        {showAvatar
          ? item.builders.map(build =>
            <Avatar
              avatar={build.avatar}
              username={build.username}
              url={build.url}
              size={10}
              usePopover={false}
            />
          )
          : null}
      </HStack>
    </VStack>
  </Link>
}