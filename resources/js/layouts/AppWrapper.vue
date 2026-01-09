<template>
	<div class="relative">
		<slot />

		<AppCookies/>
	</div>
</template>
<script setup lang="ts">
// This serves as a Vue wrapper around layouts, used for i.e. creating a cookie banner, toasts or overlays.

import AppCookies from '@/components/AppCookies.vue';
</script>
