import { loadFile } from '../utils'
interface IPackageLockItem {
  version: string
  dependencies?: Record<string, IPackageLockItem>
}
export async function getAllDepsFromPackageLockJson(path: string) {
  const jsonString = await loadFile(path)
  const deps: string[] = []
  function getDeps(packageLockItem: IPackageLockItem) {
    if (!packageLockItem.dependencies)
      return
    Object.entries(packageLockItem.dependencies).forEach(([name, dep]) => {
      deps.push(`${name}@${dep.version}`)
      getDeps(dep)
    })
  }
  getDeps(JSON.parse(jsonString))
  return deps
}
