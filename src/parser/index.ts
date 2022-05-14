import fs from 'fs'
import { basename } from 'path'
import { getAllDepsFromPackageLockJson } from './package-lock'
import { getAllDepsFromPnpmLockYaml } from './pnpm-lock'
const PACKAGE_LOCK_JSON = 'package-lock.json'
const PNPM_LOCK_YAML = 'pnpm-lock.yaml'
function getFile() {
  if (fs.existsSync(PACKAGE_LOCK_JSON))
    return PACKAGE_LOCK_JSON
  if (fs.existsSync(PNPM_LOCK_YAML))
    return PNPM_LOCK_YAML
  throw new Error('no lock file found')
}
export async function getAllDepsFromLockFile(path: string = getFile()) {
  // eslint-disable-next-line no-console
  console.log(`using file: ${path}`)
  switch (basename(path)) {
    case 'package-lock.json':
      return getAllDepsFromPackageLockJson(path)
    case 'pnpm-lock.yaml':
      return getAllDepsFromPnpmLockYaml(path)
    default:
      throw new Error(`unsupported file type: ${basename(path)}`)
  }
}
