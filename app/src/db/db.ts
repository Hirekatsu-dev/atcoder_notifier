import { getBucket } from '@extend-chrome/storage'
import { Contest } from '~/models/contest'
import { plainToInstance, instanceToPlain } from 'class-transformer'

const contestBucket = getBucket<typeof Contest>('contest', 'sync')

export async function getContests() {
  const contests = plainToInstance(
    Contest,
    Object.values(await contestBucket.get())
  )

  // 開始日時, 名前の照準でソート
  contests.sort((a, b) => {
    if (a.startAt < b.startAt) {
      return -1
    } else if (a.startAt > b.startAt) {
      return 1
    } else {
      if (a.name < b.name) {
        return -1
      } else if (a.name > b.name) {
        return 1
      } else {
        return 0
      }
    }
  })

  return contests
}

export async function setContest(contest: Contest) {
  await contestBucket.set({
    [contest.id]: instanceToPlain(contest),
  })
}

export async function removeContest(id: string) {
  await contestBucket.remove(id)
}

export async function clearContests() {
  await contestBucket.clear()
}
