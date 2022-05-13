import fs from 'fs'
import { Command } from 'commander'
import { packList } from './lib'
import { getAllDepsFromLockFile } from './parser'

const program = new Command()
program
  .description('Pack all dependencies to tarballs.')
  .argument('[target]', 'folder to save tarballs', 'tarballs')
  .option('-p, --path <path>', 'path to package-lock.json', 'package-lock.json')
  .action(async (target: string, { path }: { path: string }) => {
    const deps = await getAllDepsFromLockFile(path)
    if (!fs.existsSync(target))
      fs.mkdirSync(target)
    await packList(deps, { cwd: target })
  })
  .parse()
