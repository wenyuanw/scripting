export type GithubTrendingRepo = {
  author: string
  title: string
  url: string
  description: string
  color: string
  language: string
  stars: string
  forks: string
  starsToday: string
  builders: {
    avatar: string
    username: string
    url: string
  }[]
}

export enum SupportedLanguages {
  Python,
  TypeScript,
  Swift,
}

export type CachedData = {
  expiresAt: number
  list: GithubTrendingRepo[]
}