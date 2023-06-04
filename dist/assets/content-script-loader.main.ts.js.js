(function () {
  'use strict';

  (async () => {
    if ("")
      await import(
        /* @vite-ignore */
        chrome.runtime.getURL("")
      );
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("node_modules/vite/dist/client/client.mjs.js")
    );
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("src/main.ts.js")
    );
  })().catch(console.error);

})();
