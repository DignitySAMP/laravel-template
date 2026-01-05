<template>
    <div class="flex flex-col items-center justify-center gap-1">
        <div class="flex items-center justify-center gap-2">
            <div v-for="(links, index) in props.links" :key="index">
                <span
                    v-if="links.url === null"
                    v-html="links.label"
                    class="cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-gray-400 shadow-sm select-none"
                />

                <Link
                    :href="links.url"
                    v-if="links.url !== null"
                    class="cursor-pointer rounded-md border px-4 py-2 shadow-sm select-none"
                    :class="
                        current_page === links.page
                            ? 'border-blue-600 bg-blue-600 text-blue-100 hover:bg-blue-700'
                            : 'border-gray-200 bg-white hover:bg-gray-100'
                    "
                >
                    <span v-html="links.label" />
                </Link>
            </div>
        </div>
        <div class="mt-4 text-sm text-gray-600">
            Showing {{ to ?? '0' }} of {{ total ?? '0' }} results
        </div>
    </div>
</template>
<script setup lang="ts">
import type { Pagination } from '@/types/pagination';
import { Link } from '@inertiajs/vue3';
const props = defineProps<Pagination>();
</script>