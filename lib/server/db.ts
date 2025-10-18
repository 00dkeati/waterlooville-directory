import { createClient } from '@libsql/client'

// Centralized database client
const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? '',
  authToken: process.env.TURSO_AUTH_TOKEN ?? '',
})

// Check if required environment variables are present
if (!process.env.TURSO_DATABASE_URL) {
  console.error('[DB_ERROR] TURSO_DATABASE_URL is missing')
}

if (!process.env.TURSO_AUTH_TOKEN) {
  console.error('[DB_ERROR] TURSO_AUTH_TOKEN is missing')
}

// Database ping function for health checks
export async function dbPing(): Promise<boolean> {
  try {
    await client.execute('SELECT 1')
    return true
  } catch (error) {
    console.error('[DB_PING_ERROR]', error)
    return false
  }
}

// Export the client for use in other modules
export { client }
export default client
