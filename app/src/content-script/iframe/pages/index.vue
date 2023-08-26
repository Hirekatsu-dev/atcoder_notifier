<template>
  <div class="p-2 flex flex-col space-y-2">
    <div class="flex flex-row justify-between">
      <h1 class="font-bold text-xl">Rated 参加コンテスト一覧</h1>
      <Button @click="close">閉じる</Button>
    </div>
    <ContestCard
      v-for="contest in contests"
      :key="contest.id"
      :contest="contest"
      :on-delete="() => onDeleteContest(contest)"
    />
  </div>
</template>

<script setup lang="ts">
import { Contest } from '~/models/contest'
import Button from '../components/Button.vue'
import ContestCard from '../components/ContestCard.vue'
import { getContests, removeContest } from '~/db/db'

const now = ref(new Date())

const close = () => {
  window.parent.postMessage('closeIFrame', '*')
}

setInterval(() => {
  now.value = new Date()
}, 1000)

const contests: Ref<Contest[]> = ref([])

const refreshContests = async () => {
  contests.value = await getContests()

  // 1件も表示するものがないなら閉じる
  if (contests.value.length == 0) {
    close()
  }
}

onMounted(async () => {
  await refreshContests()
})

const onDeleteContest = async (contest: Contest) => {
  if (
    confirm(`コンテスト「${contest.name}」を削除します。
  ※ 再度登録する場合は参加ボタンを押し直してください。`)
  ) {
    await removeContest(contest.id)
    await refreshContests()
  }
}
</script>

<style scoped></style>
