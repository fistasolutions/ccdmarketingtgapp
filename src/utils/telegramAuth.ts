import crypto from 'crypto'

interface User {
  id?: string
  first_name?: string
  photo_url?:string
  [key: string]: any
}

interface ValidatedData {
  [key: string]: string
}

interface ValidationResult {
  validatedData: ValidatedData | null
  user: User
  message: string
}

export function validateTelegramWebAppData(telegramInitData: string): ValidationResult {
  const BOT_TOKEN = "7589469392:AAF28lrfcF-iK9I7KFJE4nEKcDBPfa3F6q0"

  let validatedData: ValidatedData | null = null
  let user: User = {}
  let message = ''

  if (!BOT_TOKEN) {
    return { message: 'BOT_TOKEN is not set', validatedData: null, user: {} }
  }

  const initData = new URLSearchParams(telegramInitData)
  const hash = initData.get('hash')

  if (!hash) {
    return { message: 'Hash is missing from initData', validatedData: null, user: {} }
  }

  initData.delete('hash')

  const authDate = initData.get('auth_date')
  if (!authDate) {
    return { message: 'auth_date is missing from initData', validatedData: null, user: {} }
  }


  const dataCheckString = Array.from(initData.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('\n')

  const secretKey = crypto.createHmac('sha256', 'WebAppData').update(BOT_TOKEN).digest()
  const calculatedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex')

  if (calculatedHash === hash) {
    validatedData = Object.fromEntries(initData.entries())
    message = 'Validation successful'
    const userString = validatedData['user']
    if (userString) {
        user = JSON.parse(userString)
    } 
  } else {
    message = 'Hash validation failed'
  }

  return { validatedData, user, message }
}
