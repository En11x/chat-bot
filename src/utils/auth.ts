import { sha256 } from 'js-sha256'

interface AuthPayload {
  t: number
  m: string
}

function digestMessage(message: string) {
  return sha256(message).toString()
}

export const generateSignature = (payload: AuthPayload) => {
  const { t: timestamp, m: message } = payload
  const secretKey = import.meta.env.PUBLIC_SECRET_KEY
  const signText = `${timestamp}:${message}:${secretKey}`

  return digestMessage(signText)
}

export const verifySignature = async (payload: AuthPayload, sign: string) => {
  const payloadSign = await generateSignature(payload)

  return payloadSign === sign
}
