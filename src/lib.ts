/* eslint-disable no-console */
import { execa } from 'execa'
import { pool } from './utils'

export interface IPackOption {
  cwd?: string
}

export async function packOne(target: string, { cwd }: IPackOption = {}) {
  await execa('npm', ['pack', target], { stdio: 'inherit', cwd }).catch((err) => {
    console.error(`fail to pack ${target}`)
    console.error(err)
  })
}

export async function packList(targets: string[], option: IPackOption = {}) {
  let count = 0
  await pool(targets, async (target) => {
    await packOne(target, option)
    count++
    console.log(`${count}/${targets.length}`)
  })
}

