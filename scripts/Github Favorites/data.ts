import { CachedData, GithubTrendingRepo } from "./types"
import { loadRepoList } from "./storage"

export const REPO_CACHE_KEY = "github.following.cache.v1"
const cacheTTL = 1000 * 60 * 30 // 30 分钟缓存

async function fetchRepo(owner: string, name: string) {
  const url = `https://api.github.com/repos/${owner}/${name}`
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "scripting-github-repo",
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  return response.json() as Promise<{
    name: string
    full_name: string
    html_url: string
    description: string | null
    language: string | null
    stargazers_count: number
    forks_count: number
    watchers_count: number
    owner?: {
      login?: string
      avatar_url?: string
      html_url?: string
    }
  }>
}

export async function fetchData() {
  const now = Date.now()
  const cachedData = Storage.get<CachedData>(REPO_CACHE_KEY)

  if (cachedData != null && cachedData.expiresAt > now) {
    return cachedData.list
  }

  const result: GithubTrendingRepo[] = []
  const favoriteRepos = loadRepoList()

  for (const repo of favoriteRepos) {
    try {
      const data = await fetchRepo(repo.owner, repo.name)
      result.push({
        author: data.owner?.login ?? repo.owner,
        title: data.name ?? repo.name,
        url: data.html_url ?? `https://github.com/${repo.owner}/${repo.name}`,
        description: data.description ?? "暂无简介",
        color: "systemBlue",
        language: data.language ?? "Unknown",
        stars: `${data.stargazers_count ?? 0}`,
        forks: `${data.forks_count ?? 0}`,
        starsToday: `${data.watchers_count ?? 0}`,
        builders: data.owner
          ? [
            {
              avatar: data.owner.avatar_url ?? "",
              username: data.owner.login ?? repo.owner,
              url: data.owner.html_url ?? `https://github.com/${repo.owner}`,
            },
          ]
          : [],
      })
    } catch (e) {
      console.error(`Failed to fetch ${repo.owner}/${repo.name}: ${e}`)
    }
  }

  if (!result.length && cachedData?.list?.length) {
    return cachedData.list
  }

  if (result.length) {
    Storage.set(REPO_CACHE_KEY, {
      expiresAt: now + cacheTTL,
      list: result,
    } satisfies CachedData)
  }

  return result
}