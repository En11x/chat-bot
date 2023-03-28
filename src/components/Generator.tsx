import { useCallback, useEffect, useRef, useState } from 'react'
import { Errors, Prompt } from 'src/types'
import { generateSignature } from 'src/utils/auth'
import IconClear from '../components/icons/Clear'
import ErrorMsg from './Error'

export default () => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [prompts, setPrompt] = useState<Prompt[]>([])
  const [error, setError] = useState<Errors>()

  const addPrompt = () => {
    const inputValue = inputRef.current.value
    if (!inputValue) {
      return
    }
    inputRef.current.value = ''
    setPrompt((prompt) => [...prompt, { role: 'user', content: inputValue }])
  }

  const send = useCallback(async () => {
    setLoading(true)
    try {
      console.log(prompts, '?')
      const timestamp = Date.now()
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({
          messages: prompts,
          timestamp,
          sign: generateSignature({
            t: timestamp,
            m: prompts[prompts.length - 1].content || '',
          }),
        }),
      })
      if (!response.ok) {
        const error = await response.json()
        console.error(error.error)
        setError(error.error)
        throw new Error('Request failed')
      }
      const data = response.body
      if (!data) {
        throw new Error('No data')
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
      return
    }
  }, [prompts])

  const clear = () => {
    inputRef.current.value = ''
    inputRef.current.style.height = 'auto'
  }

  const handleKeydown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.shiftKey) {
        return
      }
      if (e.key === 'Enter') {
        send()
      }
    },
    []
  )

  useEffect(()=>{
    if(!prompts.length) return
    send()
  },[prompts])

  return (
    <div className="my-6">
      {error && <ErrorMsg error={error} />}
      {loading ? (
        <div className="h-12 my-4 f-c-c gap-4 bg-(slate op-15) rounded-sm">
          <span>AI is thinking...</span>
          <div className="px-2 py-0.5 border border-slate rounded-md text-sm op-70 cursor-pointer hover:bg-slate/10">
            Stop
          </div>
        </div>
      ) : (
        <div className="my-4 f-c gap-2 transition-opacity">
          <textarea
            ref={inputRef}
            rows={1}
            className="textarea"
            placeholder="Enter something..."
            autoComplete="off"
            autoFocus
            onInput={() => {
              inputRef.current.style.height = 'auto'
              inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
            }}
            onKeyDown={handleKeydown}
          ></textarea>
          <button className="slate-btn" onClick={addPrompt}>
            Send
          </button>
          <button className="slate-btn" onClick={clear}>
            <IconClear />
          </button>
        </div>
      )}
    </div>
  )
}
