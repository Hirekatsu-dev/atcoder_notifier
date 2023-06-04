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
    {
      js: ['src/display_contests.ts'], // 拡張子を .ts に変更する
      matches: [
        // 'https://developer.chrome.com/docs/extensions/*',
        // 'https://developer.chrome.com/docs/webstore/*',
        'https://*/*',
      ],
    },
    {
      js: ['src/add_button_event.ts'],
      matches: [
        'https://atcoder.jp/contests/*',
      ],
      exclude_matches: [
        'https://atcoder.jp/contests/*/*'
      ]
    }
  ],
  permissions: [
    "storage",
    "tabs"
  ]
})

export default defineConfig({
  plugins: [crx({ manifest })],
  resolve: {
    alias: {
      'models': path.resolve(__dirname, 'src/models'),
    }
  }
})
