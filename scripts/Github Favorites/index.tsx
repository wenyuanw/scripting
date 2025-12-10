import { Button, Capsule, HStack, Link, List, Navigation, NavigationStack, ProgressView, Script, Section, Spacer, Text, VStack, useEffect, useState, useObservable } from "scripting"
import { Avatar } from "./avatar"
import { fetchData } from "./data"
import { GithubTrendingRepo } from "./types"
import { getColorByLanguages } from "./utils"
import { SettingView } from "./setting_view"


function View() {
  // Access dismiss function.
  const dismiss = Navigation.useDismiss()
  const showSetting = useObservable<boolean>(false)

  const [
    loading,
    setLoading
  ] = useState(false)

  const [
    list,
    setList
  ] = useState<GithubTrendingRepo[]>([])

  const refreshList = () => {
    setLoading(true)
    fetchData()
      .then(res => {
        setList(res)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    refreshList()
  }, [])

  return <NavigationStack>
    <List
      navigationTitle="关注的仓库"
      navigationBarTitleDisplayMode="inline"
      toolbar={{
        cancellationAction: <Button
          title="Done"
          action={dismiss}
        />,
        topBarTrailing: [<Button
          systemImage={"gear"}
          title={""}
          action={() => showSetting.setValue(true)}
        />]
      }}
      sheet={{
        isPresented: showSetting.value,
        onChanged: (value: boolean) => {
          showSetting.setValue(value)
          // 设置页关闭后刷新列表（包含小组件数据）
          if (value === false) {
            refreshList()
          }
        },
        content: <SettingView />
      }}
    >

      {loading
        ? <Section>
          <HStack>
            <Spacer />
            <ProgressView
              key={UUID.string()}
              progressViewStyle="circular"
            />
            <Spacer />
          </HStack>
        </Section>
        : null
      }

      {!loading && list.length === 0
        ? <Section>
          <Text
            font="callout"
            foregroundStyle="secondaryLabel"
          >
            暂无数据，请检查网络或更新仓库列表
          </Text>
        </Section>
        : null
      }

      {list.map(item =>
        <VStack
          alignment="leading"
          spacing={8}
          key={item.url}
        >
          <HStack>
            <Link
              font="headline"
              url={item.url}
              buttonStyle="plain"
            >{item.author + '/' + item.title}</Link>
            <Spacer />
            <Text
              font="caption"
              fontWeight="bold"
            >{item.stars.toLocaleString()}⭐️</Text>
          </HStack>

          <Text
            font="callout"
            foregroundStyle="secondaryLabel"
          >
            {item.description}
          </Text>

          <HStack
            alignment="center"
            spacing={10}
          >
            <HStack spacing={6}>
              {item.builders.slice(0, 4).map(build =>
                <Avatar
                  avatar={build.avatar}
                  username={build.username}
                  url={build.url}
                  size={24}
                />
              )}
            </HStack>
            <Spacer />
            <Text
              font="footnote"
              foregroundStyle={"white"}
              padding={{
                horizontal: 8,
                vertical: 4,
              }}
              frame={{
                minWidth: 80
              }}
              background={
                <Capsule
                  fill={getColorByLanguages(item.language)}
                />
              }
            >
              {item.language}
            </Text>
          </HStack>
        </VStack>
      )}
    </List>
  </NavigationStack>
}



async function run() {
  // Present view.
  await Navigation.present({
    element: <View />
  })

  // Avoiding memory leaks.
  Script.exit()
}

run()
