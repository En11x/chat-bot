import { Prompt } from 'src/types'
import MarkdownIT from 'markdown-it'
import mdKatex from 'markdown-it-katex'
import mdHighlight from 'markdown-it-highlightjs'
import { useMemo } from 'react'

interface MessageProps {
  role: Prompt['role']
  message: string
}

const ROLE_CLASS: Record<MessageProps['role'], string> = {
  user: 'bg-gradient-to-r from-purple-400 to-yellow-400',
  assistant: 'bg-gradient-to-r from-yellow-200 via-green-200 to-green-300',
  system: 'bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300',
}

export const Message = ({ message, role }: MessageProps) => {
  const htmlString = useMemo(() => {
    const md = MarkdownIT({
      linkify: true,
      breaks: true,
    })
      .use(mdKatex)
      .use(mdHighlight)

    return md.render(message) || ''
  }, [message])

  return (
    <div className="py-2 -mx-4 px-4 transition-colors md:hover:bg-slate/3">
      <div className={'flex gap-3 rounded-lg' + role === 'user' ? 'op-75' : ''}>
        <div
          className={`shrink-0 w-7 h-7 mt-4 rounded-full op-80 ${ROLE_CLASS[role]}`}
        ></div>
        <div
          className="prose break-words overflow-hidden"
          dangerouslySetInnerHTML={{ __html: htmlString }}
        ></div>
      </div>
    </div>
  )
}
