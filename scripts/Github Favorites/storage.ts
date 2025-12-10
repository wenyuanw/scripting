export type RepoSetting = {
  owner: string
  name: string
}

const REPO_LIST_STORAGE_KEY = "github.following.repos.v1"

export const DEFAULT_REPO_LIST: RepoSetting[] = [
  { owner: "vercel", name: "next.js" },
  { owner: "facebook", name: "react" },
  { owner: "microsoft", name: "TypeScript" },
  { owner: "withastro", name: "astro" },
  { owner: "apache", name: "echarts" }
]

/**
 * 读取关注仓库列表，若无数据则使用默认值
 */
export const loadRepoList = (): RepoSetting[] => {
  const stored = Storage.get<RepoSetting[]>(REPO_LIST_STORAGE_KEY)
  const cleaned = sanitizeRepoList(stored)
  return cleaned.length > 0 ? cleaned : DEFAULT_REPO_LIST
}

/**
 * 保存关注仓库列表（会自动清洗空值）
 */
export const saveRepoList = (list: RepoSetting[]): RepoSetting[] => {
  const cleaned = sanitizeRepoList(list)
  Storage.set(REPO_LIST_STORAGE_KEY, cleaned)
  return cleaned
}

/**
 * 恢复到默认关注列表
 */
export const resetRepoList = (): RepoSetting[] => {
  Storage.set(REPO_LIST_STORAGE_KEY, DEFAULT_REPO_LIST)
  return DEFAULT_REPO_LIST
}

/**
 * 清洗仓库列表，过滤空值并统一格式
 */
const sanitizeRepoList = (list?: RepoSetting[] | null): RepoSetting[] => {
  if (!Array.isArray(list)) return []

  return list
    .map(item => ({
      owner: String(item?.owner ?? "").trim(),
      name: String(item?.name ?? "").trim()
    }))
    .filter(item => item.owner.length > 0 && item.name.length > 0)
}

