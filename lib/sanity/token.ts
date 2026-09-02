import 'server-only'

export function getReadToken(): string {
  const token = process.env.SANITY_API_READ_TOKEN
  if (!token) {
    throw new Error('Missing environment variable: SANITY_API_READ_TOKEN')
  }
  return token
}
