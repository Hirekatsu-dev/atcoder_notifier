import { Contest } from 'models/contest';

async function execute() {
  const $formDiv = document.getElementsByClassName('insert-participant-box').item(0);
  const title = $formDiv?.getElementsByTagName('h1')?.item(0)?.innerText;

  const startAt = document.getElementsByClassName('contest-duration').item(0)?.getElementsByTagName('time')?.item(0)?.innerText;
  const endAt = document.getElementsByClassName('contest-duration').item(0)?.getElementsByTagName('time')?.item(1)?.innerText;

  if (!$formDiv || !startAt || !endAt || !title) {
    return;
  }

  const $buttons = $formDiv.getElementsByTagName('button');
  const $ratedButton = Array.from($buttons).filter($button => $button.name === 'rated')[0];

  if (!$ratedButton) {
    return;
  }

  const url = location.href;

  const contest = new Contest(title, new Date(startAt), new Date(endAt), url);

  $ratedButton.addEventListener('click', async () => {
    await contest.save();
  })
}

await execute();
