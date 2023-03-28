import { Prompt } from 'src/types'

interface MessageProps {
  role: Prompt['role']
  message: string
}

const ROLE_CLASS:Record<MessageProps['role'],string> = {
  user:'bg-gradient-to-r from-purple-400 to-yellow-400',
  assistant:'',
  system:''
}

export const Message = ({ message, role }: MessageProps) => {

  return (
    <div className="py-2 -mx-4 px-4 transition-colors md:hover:bg-slate/3">
      <div className={'flex gap-3 rounded-lg' + role === 'user' ? 'op-75' : ''}>
        <div className={`shrink-0 w-7 h-7 mt-4 rounded-full op-80 ${ROLE_CLASS[role]}`}></div>
        <div>{message}</div>
      </div>
    </div>
  )
}
