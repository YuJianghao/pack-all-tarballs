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
