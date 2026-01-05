<template>
    <Link :href="home().url" class="text-xl font-semibold hover:scale-110 transition duration-300">
        {{ usePage().props.name }}
    </Link>
</template>
<script setup lang="ts">
    import { home } from '@/routes';
    import { Link, usePage } from '@inertiajs/vue3'
</script>