import path from 'path'
import fs from 'fs/promises'
import { getAllDepsFromPackageLockJson } from './parser/package-lock'
import { packList } from './lib'

const FOLDER = 'tarballs';
(async () => {
  const PACKAGE_LOCK_JSON = path.resolve(process.cwd(), 'package-lock.json')
  const jsonString = await fs.readFile(PACKAGE_LOCK_JSON, 'utf8').catch((err) => {
    console.error('file to read package-lock.json')
    console.error(err)
    process.exit(1)
  })
  const deps = getAllDepsFromPackageLockJson(jsonString)
  if (!await fs.access(FOLDER).then(() => true, () => false))
    await fs.mkdir(FOLDER)
  await packList(deps, { cwd: path.resolve(process.cwd(), FOLDER) })
})()

