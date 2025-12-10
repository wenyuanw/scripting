import { Button, NavigationStack, Text, List, Section, TextField, HStack, VStack, Spacer, useState } from "scripting"
import { loadGithubToken, loadRepoList, saveGithubToken, saveRepoList, resetRepoList, RepoSetting } from "./storage"
import { REPO_CACHE_KEY } from "./data"

export function SettingView() {
  const [repoList, setRepoList] = useState<RepoSetting[]>(loadRepoList())
  const [showAddRepoModal, setShowAddRepoModal] = useState(false)
  const [newOwner, setNewOwner] = useState("")
  const [newName, setNewName] = useState("")
  const [pendingDeleteIndex, setPendingDeleteIndex] = useState<number | null>(null)
  const [token, setToken] = useState(loadGithubToken())

  const handleAddRepo = () => {
    const owner = newOwner.trim()
    const name = newName.trim()
    if (!owner || !name) return

    const isDuplicate = repoList.some(
      (repo: RepoSetting) => repo.owner.toLowerCase() === owner.toLowerCase() && repo.name.toLowerCase() === name.toLowerCase()
    )
    if (isDuplicate) {
      setShowAddRepoModal(false)
      setNewOwner("")
      setNewName("")
      return
    }

    const updated = saveRepoList([...repoList, { owner, name }])
    Storage.remove(REPO_CACHE_KEY)
    setRepoList(updated)
    setNewOwner("")
    setNewName("")
    setShowAddRepoModal(false)
    setPendingDeleteIndex(null)
  }

  const handleRemoveRepo = (index: number) => {
    const updated = repoList.filter((_: RepoSetting, i: number) => i !== index)
    setRepoList(saveRepoList(updated))
    Storage.remove(REPO_CACHE_KEY)
    setPendingDeleteIndex(null)
  }

  const requestRemoveRepo = (index: number) => {
    if (pendingDeleteIndex === index) {
      handleRemoveRepo(index)
    } else {
      setPendingDeleteIndex(index)
    }
  }

  const handleCancelAddRepo = () => {
    setNewOwner("")
    setNewName("")
    setShowAddRepoModal(false)
    setPendingDeleteIndex(null)
  }

  const handleResetRepos = () => {
    const defaults = resetRepoList()
    Storage.remove(REPO_CACHE_KEY)
    setRepoList(defaults)
    setNewOwner("")
    setNewName("")
    setShowAddRepoModal(false)
    setPendingDeleteIndex(null)
  }

  const handleSaveToken = () => {
    const saved = saveGithubToken(token)
    Storage.remove(REPO_CACHE_KEY)
    setToken(saved)
  }

  return <NavigationStack>
    <List
      navigationTitle={"设置"}
      navigationBarTitleDisplayMode={"inline"}
      scrollDismissesKeyboard={"immediately"}
    >
      <Section
        header={<Text font="headline">关注的仓库列表</Text>}
        footer={<Text font="footnote" foregroundStyle="secondaryLabel">列表数据会全局存储，用于展示关注的仓库</Text>}
      >
        <Button
          title="添加仓库"
          action={() => setShowAddRepoModal(true)}
          sheet={{
            isPresented: showAddRepoModal,
            onChanged: setShowAddRepoModal,
            content: (
              <NavigationStack>
                <List
                  navigationTitle="添加仓库"
                  navigationBarTitleDisplayMode="inline"
                  toolbar={{
                    topBarLeading: <Button title="取消" action={handleCancelAddRepo} />,
                    topBarTrailing: <Button title="保存" action={handleAddRepo} fontWeight="medium" />
                  }}
                >
                  <Section>
                    <TextField title="Owner" value={newOwner} onChanged={setNewOwner} prompt="例如：vercel" />
                    <TextField title="仓库名" value={newName} onChanged={setNewName} prompt="例如：next.js" />
                  </Section>
                </List>
              </NavigationStack>
            )
          }}
        />

        {repoList && repoList.length > 0 ? (
          repoList.map((repo: RepoSetting, index: number) => (
            <HStack key={`${repo.owner}/${repo.name}-${index}`}>
              <VStack spacing={4} alignment="leading">
                <Text font="body">
                  仓库 {index + 1}
                </Text>
                <Text font="headline">
                  {repo.owner}/{repo.name}
                </Text>
              </VStack>
              <Spacer />
              <Button
                title={pendingDeleteIndex === index ? "确定删除？" : "删除"}
                action={() => requestRemoveRepo(index)}
                foregroundStyle="systemRed"
              />
            </HStack>
          ))
        ) : (
          <Text font="footnote" foregroundStyle="secondaryLabel">
            暂无关注仓库，点击“添加仓库”开始设置
          </Text>
        )}
      </Section>

      <Section
        header={<Text font="headline">API Token</Text>}
        footer={<Text font="footnote" foregroundStyle="secondaryLabel">非必需。用于提升 GitHub API 频率限制。留空可清除。</Text>}
      >
        <TextField
          title="GitHub Token"
          value={token}
          onChanged={setToken}
          prompt="例如：ghp_xxx"
        />
        <Button title="保存 Token" action={handleSaveToken} />
      </Section>

      <Section
        header={<Text font="headline">恢复默认</Text>}
        footer={<Text font="footnote" foregroundStyle="secondaryLabel">将关注列表重置为默认预设，并清理缓存</Text>}
      >
        <Button
          title="恢复默认设置"
          action={handleResetRepos}
          foregroundStyle="systemRed"
        />
      </Section>
    </List>
  </NavigationStack>
}