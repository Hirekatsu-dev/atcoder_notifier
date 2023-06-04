import { Contest } from 'models/contest';

const $body = document.querySelector('body');

const contests = (await Contest.list()).sort((a, b) => {
  if (a.startAt < b.startAt) {
    return 1;
  } else if (a.startAt === b.startAt) {
    return 0;
  } else {
    return -1;
  }
});

// 24時間以内に開始するコンテスト
const targetContests = contests.filter(contest => {
  // contest.startAt.getTime() < new Date().getTime() + 24 * 60 * 60 * 1000
  return true;
});

console.log(targetContests);

if ($body) {
  const $contestsHTML = document.createElement('div');
  targetContests.forEach(contest => {
    contest.startAt = new Date('2023-06-10(土) 21:00');
    contest.endAt = new Date('2023-06-10(土) 22:40');
    contest.save();
    $contestsHTML.append(buildContestHTML(contest));
  });

  $body.prepend($contestsHTML);
}

function buildContestHTML(contest: Contest) {
  const div = document.createElement('div');
  const a: HTMLAnchorElement = document.createElement('a');
  a.href = contest.pageUrl;
  a.text = `${contest.startAt.toLocaleString()}~${contest.endAt.toLocaleString()}: ${contest.name}`;

  div.innerHTML = a.outerHTML;

  console.log(div.innerHTML);

  return div;
}