import { defineConfig } from 'vite'
import { crx, defineManifest } from '@crxjs/vite-plugin'
import * as path from 'path'

const manifest = defineManifest({
  manifest_version: 3,
  name: 'atcoder notifier',
  description: 'chrome extension that notifies nearest atcoder contest',
  version: '1.0',
  icons: {
  },
  content_scripts: [
    // {
    //   js: ['src/display_contests.ts'], // 拡張子を .ts に変更する
    //   matches: [
    //     // 'https://developer.chrome.com/docs/extensions/*',
    //     // 'https://developer.chrome.com/docs/webstore/*',
    //     'https://*/*',
    //   ],
    // },
    // {
    //   js: ['src/add_button_event.ts'],
    //   matches: [
    //     'https://atcoder.jp/contests/*',
    //   ],
    //   exclude_matches: [
    //     'https://atcoder.jp/contests/*/*'
    //   ]
    // },
  ],
  oauth2: {
    client_id: "116203437555337527915",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  },
  permissions: [
    "storage",
    "tabs",
    "identity"
  ],
  content_security_policy: {
    "extension_pages": "script-src 'self'; object-src 'self';",
    "sandbox": "sandbox allow-scripts allow-forms allow-popups allow-modals; script-src 'self' 'unsafe-inline' 'unsafe-eval'; child-src 'self';"
  },
  action: {
    default_popup: 'src/popup.html'
  }
})

export default defineConfig({
  plugins: [crx({ manifest })],
  resolve: {
    alias: {
      'models': path.resolve(__dirname, 'src/models'),
    }
  },
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        content_scripts: path.resolve(__dirname, 'src/popup.ts'),
        popup: path.resolve(__dirname, 'src/popup.html')
      },
      output: {
        entryFileNames: '[name].js'
      }
    }
  }
})
