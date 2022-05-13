import fs from 'fs/promises'
import { Command } from 'commander'
import { getAllDepsFromPackageLockJson } from './parser/package-lock'
import { packList } from './lib'

const program = new Command()
program
  .description('Pack all dependencies to tarballs.')
  .argument('[target]', 'folder to save tarballs', 'tarballs')
  .option('-p, --path <path>', 'path to package-lock.json', 'package-lock.json')
  .action(async (target: string, { path }: { path: string }) => {
    const jsonString = await fs
      .readFile(path, 'utf8')
      .catch((err) => {
        console.error('file to read package-lock.json')
        console.error(err)
        process.exit(1)
      })
    const deps = getAllDepsFromPackageLockJson(jsonString)
    if (
      !(await fs.access(target).then(
        () => true,
        () => false,
      ))
    )
      await fs.mkdir(target)
    await packList(deps, { cwd: target })
  })
  .parse()
