interface IPackageLockItem {
  version: string
  dependencies?: Record<string, IPackageLockItem>
}
export function getAllDepsFromPackageLockJson(packageLock: string) {
  const deps: string[] = []
  function getDeps(packageLockItem: IPackageLockItem) {
    if (!packageLockItem.dependencies)
      return
    Object.entries(packageLockItem.dependencies).forEach(([name, dep]) => {
      deps.push(`${name}@${dep.version}`)
      getDeps(dep)
    })
  }
  getDeps(JSON.parse(packageLock))
  return deps
}
