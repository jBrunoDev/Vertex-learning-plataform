import fs from 'node:fs'
import path from 'node:path'
import {spawnSync} from 'node:child_process'

const root = path.resolve(import.meta.dirname, '..')
const envPath = path.join(root, '.env.local')
const text = fs.readFileSync(envPath, 'utf8')
const env = {...process.env}

for (const line of text.split(/\r?\n/)) {
  const match = line.match(/^([A-Z0-9_]+)=(.*)$/)
  if (!match) continue
  env[match[1]] = match[2].replace(/^["']|["']$/g, '')
}

const result = spawnSync('npx', ['sanity', ...process.argv.slice(2)], {
  cwd: path.join(root, 'studio'),
  env,
  stdio: 'inherit',
  shell: true,
})

process.exit(result.status ?? 1)
