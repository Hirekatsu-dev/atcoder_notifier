import { Contest } from './models/contest.ts.js';

const $body = document.querySelector("body");
const contests = (await Contest.list()).sort((a, b) => {
  if (a.startAt < b.startAt) {
    return 1;
  } else if (a.startAt === b.startAt) {
    return 0;
  } else {
    return -1;
  }
});
const targetContests = contests.filter((contest) => {
  return true;
});
console.log(targetContests);
if ($body) {
  const $contestsHTML = document.createElement("div");
  targetContests.forEach((contest) => {
    contest.startAt = /* @__PURE__ */ new Date("2023-06-10(土) 21:00");
    contest.endAt = /* @__PURE__ */ new Date("2023-06-10(土) 22:40");
    contest.save();
    $contestsHTML.append(buildContestHTML(contest));
  });
  $body.prepend($contestsHTML);
}
function buildContestHTML(contest) {
  const div = document.createElement("div");
  const a = document.createElement("a");
  a.href = contest.pageUrl;
  a.text = `${contest.startAt.toLocaleString()}~${contest.endAt.toLocaleString()}: ${contest.name}`;
  div.innerHTML = a.outerHTML;
  console.log(div.innerHTML);
  return div;
}
