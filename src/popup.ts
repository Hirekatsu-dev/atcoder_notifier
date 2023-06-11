const API_KEY = 'AIzaSyAyTcLh3cFalS6ieT3B2o_b0BBvv4-pkMw';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SPREADSHEET_ID = '1GWX5bQP4SpwfXcGA61I26UKYljqAzM44ILJLC7QiFTg';
const SPREADSHEET_TAB_NAME = 'test';

function onGAPILoad() {
  console.log('called onGAPILoad')
	gapi.client.init({
		// Don't pass client nor scope as these will init auth2, which we don't want
		apiKey: API_KEY,
		discoveryDocs: DISCOVERY_DOCS,
	}).then(function () {
		console.log('gapi initialized')
		chrome.identity.getAuthToken({ interactive: true }, function (token) {
			gapi.auth.setToken({
				access_token: token ?? '',
			});

			gapi.client.sheets.spreadsheets.values.get({
				spreadsheetId: SPREADSHEET_ID,
				range: SPREADSHEET_TAB_NAME,
			}).then(function (response) {
				console.log(`Got ${response?.result?.values?.length} rows back`)

				// valuesをfor文を回すと1行ずつデータが取り出せます
				for (let a of response?.result?.values ?? []) {
					console.log(a)
				}
			});
		})
	}, function (error) {
		console.log('error', error)
	});
}

console.log('called popup.ts')
const script: HTMLScriptElement = document.createElement('script');
script.src = 'https://apis.google.com/js/client.js?onload=onGAPILoad';

document.head.appendChild(script);
