import { setContest } from '~/db/db'
import { Contest } from '~/models/contest'

console.log('hello')

function getContestInfo() {
  const $formDiv = document
    .getElementsByClassName('insert-participant-box')
    .item(0)
  const title = $formDiv?.getElementsByTagName('h1')?.item(0)?.innerText

  const startAt = document
    .getElementsByClassName('contest-duration')
    .item(0)
    ?.getElementsByTagName('time')
    ?.item(0)?.innerText
  const endAt = document
    .getElementsByClassName('contest-duration')
    .item(0)
    ?.getElementsByTagName('time')
    ?.item(1)?.innerText

  if (!$formDiv || !startAt || !endAt || !title) {
    return undefined
  }

  return new Contest(
    title,
    title,
    location.href,
    new Date(startAt).getTime(),
    new Date(endAt).getTime()
  )
}

function getRatedButtonElement() {
  const $formDiv = document
    .getElementsByClassName('insert-participant-box')
    .item(0)

  if (!$formDiv) {
    return undefined
  }

  const $buttons = $formDiv.getElementsByTagName('button')
  const $ratedButton = Array.from($buttons).filter(
    ($button) => $button.name === 'rated'
  )[0]

  return $ratedButton
}

const $ratedButton = getRatedButtonElement()
const contest = getContestInfo()

console.log('ratedButtton', $ratedButton)
console.log('contest', contest)

if (!!$ratedButton && !!contest) {
  $ratedButton.addEventListener('click', async () => {
    await setContest(contest)
    alert('拡張機能への登録が成功しました。')
  })
}

export {}
