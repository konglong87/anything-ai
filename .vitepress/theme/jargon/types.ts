import { KIND_LABELS as SOURCE_KIND_LABELS } from '../../../scripts/jargon/labels.mjs'

export interface PromptField {
  key: string
  label: string
  placeholder: string
}

export interface PromptChoice {
  key: string
  label: string
  options: { value: string; label: string; text: string; status?: 'published' | 'reference' }[]
}

export interface PromptItem {
  id: string
  title: string
  domainId: string
  domainTitle: string
  subdomainId: string
  subdomainTitle: string
  kind: string
  status: 'published' | 'reference'
  description: string
  whenToUse: string
  aliases: string[]
  prompt: string
  fields: PromptField[]
  choices: PromptChoice[]
  warnings: string[]
  sourcePath: string
  sourceUrl: string
  sourceFiles: string[]
  detailPath: string
  exclusiveGroup: string | null
  provider: string | null
}

export interface PromptCatalog {
  source: { repository: string; commit: string; importedAt: string; license?: string }
  stats: { domains: number; leaves: number; entries: number; templates: number; legacy: number; drafts: number }
  domains: { id: string; title: string; description: string; count: number }[]
  items: PromptItem[]
}

export interface SelectionResult {
  ok: boolean
  message: string
}

export const KIND_LABELS: Readonly<Record<string, string>> = SOURCE_KIND_LABELS

export const LIBRARY_PATH = '/prompts/jargon/README.html'
export const COMPOSER_ID = 'compose'
export const TASK_FIELD_KEY = 'task'
export const SELECTION_STORAGE_KEY = 'anything-ai:jargon:selection:v1'
export const DOWNLOAD_MIME = 'text/plain;charset=utf-8'
