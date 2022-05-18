/* eslint-disable no-console */
import execa from 'execa'
import { pool } from './utils'

export interface IPackOption {
  cwd?: string
  threads?: number
}

export async function packOne(target: string, { cwd }: IPackOption = {}) {
  await execa('npm', ['pack', target], { cwd }).catch((err) => {
    console.error(`fail to pack ${target}`)
    console.error(err)
  })
}

export async function packList(targets: string[], option: IPackOption = {}) {
  console.log('Start packing ...')
  let count = 0
  const total = targets.length
  await pool(targets, async (target) => {
    await packOne(target, option)
    count++
    console.log(`${count}/${total} - ${target}`)
  }, {
    threads: option.threads,
  })
  console.log('Done.')
}

