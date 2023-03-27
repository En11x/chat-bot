import { APIRoute } from 'astro'

export const post: APIRoute = async (context) => {
  const body = await context.request.json()
  const { message } = body
  if (!message) {
    return new Response(
      JSON.stringify({
        error: {
          message: 'No input text',
          code:'400'
        },
      }),
      { status: 400 }
    )
  }
}
