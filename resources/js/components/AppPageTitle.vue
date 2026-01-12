<template>
    <div class="flex flex-col py-2 my-4">
        <h1 v-if="props.title" class="font-bold" :class="props.small ? '' : 'text-lg'" v-html="props.title"/>
        <span v-if="props.description" class="font-light" :class="props.small ? 'text-sm' : ''" v-html="props.description"/>
    </div>
</template>
<script setup lang="ts">
    const props = withDefaults(defineProps<{
        title?: string
        description?: string
        small?: boolean
    }>(), {
        small: false
    });
</script>