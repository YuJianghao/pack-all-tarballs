import { resolve } from 'path'
import { describe, expect, it } from 'vitest'
import { getAllDepsFromLockFile } from '../src/parser'

describe('parer package lock', () => {
  it('should parse package-lock.json', async () => {
    const deps = await getAllDepsFromLockFile(
      resolve(__dirname, './fixture/package-lock.json'),
    )
    expect(deps).include('element-ui@2.15.6')
  })
  it('should parse pnpm-lock.yaml', async () => {
    const deps = await getAllDepsFromLockFile(
      resolve(__dirname, './fixture/pnpm-lock.yaml'),
    )
    expect(deps).include('element-ui@2.15.8')
  })
})
