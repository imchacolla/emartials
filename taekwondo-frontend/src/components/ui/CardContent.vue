<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../lib/utils'

interface Props {
  class?: string
}

const props = withDefaults(defineProps<Props>(), {})

const className = computed(() => cn('p-6', props.class))
</script>

<template>
  <div :class="className">
    <slot />
  </div>
</template>