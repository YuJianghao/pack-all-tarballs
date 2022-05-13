import fs from 'fs'
import { Command } from 'commander'
import { getAllDepsFromPackageLockJson } from './parser/package-lock'
import { packList } from './lib'

const program = new Command()
program
  .description('Pack all dependencies to tarballs.')
  .argument('[target]', 'folder to save tarballs', 'tarballs')
  .option('-p, --path <path>', 'path to package-lock.json', 'package-lock.json')
  .action(async (target: string, { path }: { path: string }) => {
    const deps = await getAllDepsFromPackageLockJson(path)
    if (!fs.existsSync(target))
      fs.mkdirSync(target)
    await packList(deps, { cwd: target })
  })
  .parse()
