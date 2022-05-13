import { resolve } from 'path'
import { describe, expect, it } from 'vitest'
import { getAllDepsFromPackageLockJson } from '../src/parser/package-lock'

describe('parer package lock', () => {
  it('should parse package-lock.json', async () => {
    const deps = await getAllDepsFromPackageLockJson(
      resolve(__dirname, './fixture/package-lock.json'),
    )
    expect(deps).include('execa@4.1.0')
    expect(deps).include('cross-spawn@7.0.3')
    expect(deps.length).toBe(48)
    expect(1).toBe(1)
  })
})
