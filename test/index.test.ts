import { describe, expect, it } from 'vitest'
import { getAllDepsFromPackageLockJson } from '../src/parser/package-lock'
import { packageLock0 } from './fixture'

describe('parer package lock', () => {
  it('parse basic', () => {
    const deps = getAllDepsFromPackageLockJson(packageLock0)
    expect(deps).include('execa@4.1.0')
    expect(deps).include('cross-spawn@7.0.3')
    expect(deps.length).toBe(48)
  })
})
