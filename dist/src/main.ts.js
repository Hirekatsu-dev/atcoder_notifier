import { Contest } from './models/contest.ts.js';

async function onOpen() {
  console.log("called");
  const $body = document.querySelector("body");
  const contests = await Contest.list();
  if ($body) {
    $body.innerHTML = contests.length.toString();
  }
}
await onOpen();
