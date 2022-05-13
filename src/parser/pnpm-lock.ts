import yaml from 'js-yaml'
import { loadFile } from '../utils'

interface IPnpmLock {
  packages: Record<string, any>
}

export async function getAllDepsFromPnpmLockYaml(path: string) {
  const yamlString = await loadFile(path)
  const deps = Object.keys((yaml.load(yamlString) as IPnpmLock).packages).map(
    (id) => {
      const parts = id.split('/').slice(1)
      const first = parts.slice(0, parts.length - 1)
      const last = parts[parts.length - 1]
      return `${first.join('/')}@${last.split('_')[0]}`
    },
  )
  return deps
}
