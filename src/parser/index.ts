import { basename } from 'path'
import { getAllDepsFromPackageLockJson } from './package-lock'
import { getAllDepsFromPnpmLockYaml } from './pnpm-lock'
export async function getAllDepsFromLockFile(path: string) {
  console.log(basename(path))
  switch (basename(path)) {
    case 'package-lock.json':
      return getAllDepsFromPackageLockJson(path)
    case 'pnpm-lock.yaml':
      return getAllDepsFromPnpmLockYaml(path)
    default:
      throw new Error(`unsupported file type: ${basename(path)}`)
  }
}
