<template>
    <span
        class="text-xs px-2 py-0.5 rounded-lg tracking-wider select-none"
        :class="{
            'bg-black text-white': props.theme === 'primary',
            'bg-gray-300 text-gray-800': props.theme === 'secondary',
            'bg-red-500 text-white': props.theme === 'danger',
        }"
    >
        <slot/>
    </span>
</template>
<script setup lang="ts">
interface Props {
    theme?: 'primary' | 'secondary' | 'danger'
}

const props = withDefaults(defineProps<Props>(), {
	theme: 'primary',
})
</script>