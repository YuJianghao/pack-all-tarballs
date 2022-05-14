import fs from 'fs'
import { Command } from 'commander'
import { packList } from './lib'
import { getAllDepsFromLockFile } from './parser'

const program = new Command()
program
  .description('Pack all dependencies to tarballs.')
  .argument('[file]', 'lock file path')
  .option('-o, --output <output>', 'folder to save tarballs', 'tarballs')
  .option('-t, --threads <threads>', 'threads count to run parallel', '32')
  .action(
    async (file: string, {
      threads,
      output,
    }: {
      output: string
      threads: string
    }) => {
      const deps = await getAllDepsFromLockFile(file)
      if (!fs.existsSync(output))
        fs.mkdirSync(output)
      await packList(deps, {
        cwd: output,
        threads: Number.parseInt(threads, 10),
      })
    },
  )
  .parse()
