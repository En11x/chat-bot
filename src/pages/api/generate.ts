import { APIRoute } from 'astro'
import { verifySignature } from 'src/utils/auth'
import { generatePayload, parseOpenAIStream } from 'src/utils/openAI'

const apiKey = import.meta.env.OPENAI_API_KEY
const baseUrl = (import.meta.env.OPENAI_API_BASE_URL || 'https://api.openai.com')
  .trim()
  .replace(/\/$/, '')

export const post: APIRoute = async context => {
  const body = await context.request.json()
  const { messages, timestamp, sign } = body
  console.log(messages, '?')
  if (!messages) {
    return new Response(
      JSON.stringify({
        error: {
          message: 'No input text',
          code: '400'
        }
      }),
      { status: 400 }
    )
  }
  if (
    !(await verifySignature({ t: timestamp, m: messages[messages.length - 1].content || '' }, sign))
  ) {
    return new Response(
      JSON.stringify({
        error: {
          code: '401',
          message: 'Invalid signature'
        }
      }),
      { status: 401 }
    )
  }

  const initOptions = generatePayload(apiKey, messages)

  const response: Response = await fetch(`${baseUrl}/v1/chat/completions`, initOptions).catch(
    (err: Error) => {
      console.error(err)
      return new Response(
        JSON.stringify({
          error: {
            code: err.name,
            message: err.message
          }
        }),
        { status: 500 }
      )
    }
  )

  return parseOpenAIStream(response)
}
