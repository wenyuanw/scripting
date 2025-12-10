
import { RepoItemView } from "./repo_item_view"
import { Divider, Spacer, Text, VStack, VirtualNode, Widget } from "scripting"
import { fetchData } from "./data"
import { GithubTrendingRepo } from "./types"
import { getColorByLanguages as getColorByLanguage } from "./utils"

function WidgetView({
  list
}: {
  list: GithubTrendingRepo[]
}) {

  const children: VirtualNode[] = []

  for (const [index, item] of list.entries()) {
    const color = getColorByLanguage(item.language)
    // const color = item.color as Color

    children.push(
      <RepoItemView
        item={item}
        color={color}
      />
    )

    if (index != list.length - 1) {
      children.push(
        <Divider
          padding={{
            leading: true
          }}
        />
      )
    }
  }

  return <VStack
    spacing={6}
    frame={Widget.displaySize}
    widgetBackground={{
      color: "systemIndigo",
      gradient: true
    }}
  >
    <Spacer />
    {children}
    <Spacer />
  </VStack >
}

async function run() {
  let list: GithubTrendingRepo[] = []

  try {
    list = await fetchData()
  } catch (e) {
    const message = "获取关注仓库数据失败"
    console.error(message)
    Widget.present(
      <Text
        font={12}
      >
        {message}
      </Text>
    )
    return
  }

  const count = Math.floor(
    Widget.displaySize.height / 48
  )

  Widget.present(
    <WidgetView
      list={list.slice(0, count)}
    />,
    {
      policy: "after",
      date: new Date(Date.now() + 1000 * 60 * 30)
    }
  )
}

run()