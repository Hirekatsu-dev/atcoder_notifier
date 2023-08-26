<script lang="ts" setup>
import { PropType } from 'vue'

defineProps({
  /**
   * スタイル
   */
  variant: {
    type: String as PropType<'primary' | 'danger'>,
    default: 'primary',
  },
})
</script>

<template>
  <button
    type="button"
    :class="[
      'px-1 rounded border-2 hover:text-white bg-white',
      variant == 'primary' && 'border-primary text-primary hover:bg-primary',
      variant == 'danger' && 'border-danger text-danger hover:bg-danger',
    ]"
  >
    <!--
      @slot ボタン内部のスロット
    -->
    <slot />
  </button>
</template>

<style lang="scss"></style>
