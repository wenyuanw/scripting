import { Capsule, Color, HStack, Image, Link, List, Notification, Spacer, Text, VStack } from "scripting"
import { GithubTrendingRepo } from "./types"
import { fetchData } from "./data"

let colors: Color[] = [
  "systemBlue",
  "systemOrange",
  "systemGreen",
  "systemPurple",
  "systemRed"
]

let colorMap: Record<string, Color> = {}

let index = 0

function colorOfLang(lang: string): Color {
  if (colorMap[lang] == null) {
    colorMap[lang] = colors[index++] || "systemPink"
  }
  return colorMap[lang]
}

async function run() {

  let list: GithubTrendingRepo[] = await fetchData()

  if (!list.length) {
    Notification.present(
      <Text padding>暂无仓库数据</Text>
    )
    return
  }

  Notification.present(

    <VStack
      frame={{
        height: 500
      }}
    >
      <Text
        padding
        font="headline"
      >
        关注的仓库
      </Text>
      <List
        contentMargins={{
          edges: "top",
          insets: 0
        }}
      >
        {list.map((item) => {
          let color = colorOfLang(item.language)
          return <Link
            url={item.url}
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
                  background={
                    <Capsule
                      fill={
                        // "systemBlue"
                        color
                      }
                    />
                  }
                >
                  {item.language}
                </Text>
                <Text
                  lineLimit={1}
                >
                  {item.title}
                </Text>
                <Spacer />
                <Text
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
                {item.builders.map(user =>
                  <Image
                    imageUrl={user.avatar}
                    resizable
                    scaleToFit
                    frame={{
                      width: 10,
                      height: 10
                    }}
                    clipShape={{
                      type: "rect",
                      cornerRadius: 10
                    }}
                  />
                )}
              </HStack>
            </VStack>
          </Link>
        }
        )}
      </List>
    </VStack>
  )
}

run()

