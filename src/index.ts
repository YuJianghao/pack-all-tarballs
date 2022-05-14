import fs from 'fs'
import { Command } from 'commander'
import { packList } from './lib'
import { getAllDepsFromLockFile } from './parser'

const program = new Command()
program
  .description('Pack all dependencies to tarballs.')
  .argument('[target]', 'folder to save tarballs', 'tarballs')
  .option('-t, --threads <threads>', 'threads count to run parallel', '32')
  .option('-f, --file <file>', 'lock file path')
  .action(
    async (
      target: string,
      { file, threads }: { file: string; threads: string },
    ) => {
      const deps = await getAllDepsFromLockFile(file)
      if (!fs.existsSync(target))
        fs.mkdirSync(target)
      await packList(deps, { cwd: target, threads: Number.parseInt(threads, 10) })
    },
  )
  .parse()
