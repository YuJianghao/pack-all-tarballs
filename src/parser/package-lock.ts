import fs from 'fs/promises'
interface IPackageLockItem {
  version: string
  dependencies?: Record<string, IPackageLockItem>
}
export async function loadPackageLocJson(path: string) {
  return fs.readFile(path, 'utf8').catch((err) => {
    console.error('file to read package-lock.json')
    console.error(err)
    process.exit(1)
  })
}
export async function getAllDepsFromPackageLockJson(path: string) {
  const jsonString = await loadPackageLocJson(path)
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
