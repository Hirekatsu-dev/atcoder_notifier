<script lang="ts" setup>
import { PropType } from 'vue'
import { Contest } from '../../../models/contest'
import Button from './Button.vue'

defineProps({
  /**
   * 表示するコンテスト
   */
  contest: {
    type: Object as PropType<Contest>,
    required: true,
  },

  /**
   * 削除する時
   */
  onDelete: {
    type: Function as PropType<() => Promise<void>>,
    default: async () => {
      /* nop */
    },
  },
})

function formatDate(d: number) {
  const date = new Date(d)
  const year = date.getFullYear().toString().padStart(4, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const weekday = new Intl.DateTimeFormat('ja-JP', { weekday: 'short' }).format(
    date
  )
  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')

  return `${year}/${month}/${day}(${weekday}) ${hour}:${minute}`
}

function onOpen(url: string) {
  window.open(url)
}
</script>

<template>
  <div
    class="p-2 w-full rounded-md flex justify-between"
    :class="{
      'bg-green-200': contest.status == 'reserved',
      'bg-red-200': contest.status == 'doing',
      'bg-gray-200': contest.status == 'done',
    }"
  >
    <a
      :href="contest.url"
      target="_top"
      rel="noopener noreferrer"
      @click.prevent.stop="onOpen(contest.url)"
    >
      <span class="font-bold">
        {{ contest.name }}
      </span>
      <span>
        {{ ` (${formatDate(contest.startAt)} ~ ${formatDate(contest.endAt)})` }}
      </span>
    </a>
    <Button
      variant="danger"
      @click="onDelete"
    >
      削除
    </Button>
  </div>
</template>
