console.log("this is popup.js")
console.log(this)

const SPREADSHEET_ID = '1GWX5bQP4SpwfXcGA61I26UKYljqAzM44ILJLC7QiFTg';
const SPREADSHEET_TAB_NAME = 'test';

async function execute(token) {
  let init = {
    method: 'GET',
    async: true,
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    'contentType': 'json'
  };

  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SPREADSHEET_TAB_NAME}?fields=values`,init
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
  }
  catch (e) {
    console.log(e);
  }
}

window.addEventListener('load', async function() {

  try {
    console.log('loaded');
    const token = (await chrome.identity.getAuthToken({interactive: true})).token;
    console.log(token);
    await execute(token);
  }
  catch (e) {
    console.log(e);
  }
});
