export interface Prompt {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface Errors {
  code: string
  message: string
}
