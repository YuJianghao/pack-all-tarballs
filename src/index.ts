import {resolve} from "path"
import fs from "fs/promises"
import { Command } from "commander"
import { getAllDepsFromPackageLockJson } from "./parser/package-lock"
import { packList } from "./lib"

const program = new Command()
program
  .description("des")
  .argument("<target>", "folder to save tarballs, default to `tarballs`")
  .option("-p, --path <path>", "path to package-lock.json")
  .action(async (target = "tarballs", path = "package-lock.json") => {
    const PACKAGE_LOCK_JSON = resolve(path)
    const jsonString = await fs
      .readFile(PACKAGE_LOCK_JSON, "utf8")
      .catch((err) => {
        console.error("file to read package-lock.json")
        console.error(err)
        process.exit(1)
      })
    const deps = getAllDepsFromPackageLockJson(jsonString)
    if (
      !(await fs.access(target).then(
        () => true,
        () => false
      ))
    )
      await fs.mkdir(target)
    await packList(deps, { cwd: path.resolve(process.cwd(), target) })
  }).parse()
