import { Prompt } from 'src/types'
import { ParsedEvent, ReconnectInterval, createParser } from 'eventsource-parser'

const model = import.meta.env.OPENAI_API_MODEL || 'gpt-3.5-turbo'

export const generatePayload = (apiKey: string, messages: Prompt[]): RequestInit => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  },
  method: 'POST',
  body: JSON.stringify({
    model,
    messages,
    temperature: 0.6,
    stream: true
  })
})

export const parseOpenAIStream = (res: Response) => {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  if (!res.ok) {
    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText
    })
  }

  const stream = new ReadableStream({
    async start(controller) {
      const streamParser = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data
          if (data === '[DONE]') {
            controller.close()
            return
          }
          try {
            // response
            // {
            //   id: 'chatcmpl-6yzYEZABsxRiO0tWtWMe9HJ1c0z0T',
            //   object: 'chat.completion.chunk',
            //   created: 1679994302,
            //   model: 'gpt-3.5-turbo-0301',
            //   choices: [ { delta: [{content:''}], index: 0, finish_reason: null } ]
            // }
            const json = JSON.parse(data)
            console.log(json)
            const text = json.choices[0].delta.content || ''
            const queue = encoder.encode(text)
            controller.enqueue(queue)
          } catch (error) {
            controller.error(error)
          }
        }
      }

      const parser = createParser(streamParser)
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk))
      }
    }
  })

  return new Response(stream)
}
