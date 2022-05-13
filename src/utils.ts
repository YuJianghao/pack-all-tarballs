import fs from 'fs/promises'
export async function pool<T>(
  jobs: T[],
  consumer: (job: T) => void,
  { threads = 8 }: { threads?: number } = {},
) {
  async function task(): Promise<void> {
    const job = jobs.shift()
    if (!job)
      return
    await consumer(job)
    return task()
  }

  return Promise.all(Array.from({ length: threads }).map(() => task()))
}

export async function loadFile(path: string) {
  return fs.readFile(path, 'utf8').catch((err) => {
    console.error('file to read package-lock.json')
    console.error(err)
    throw err
  })
}
