<template>
    <Link :href="home().url" class="font-semibold hover:scale-110 transition duration-300" :class="[
        props.size === 'large' ? 'text-4xl' : 'text-lg'
    ]">
        {{ usePage().props.name }}
    </Link>
</template>
<script setup lang="ts">
    import { home } from '@/routes';
    import { Link, usePage } from '@inertiajs/vue3'

    const props = withDefaults(defineProps<{
        size?: 'small' | 'large'
    }>(), {
        size: 'small'
    });
</script>