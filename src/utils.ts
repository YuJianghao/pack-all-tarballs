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

  Array.from({ length: threads }).forEach(() => {
    task()
  })
}

