<template>
	<div
		v-if="showCookieList"
		class="bg-white rounded-xl shadow-sm"
	>
		<div class="flex flex-col gap-2">
			<div
				v-for="(cookie, index) in CookieContainer"
				:key="index"
				class="grid grid-cols-4 gap-2 bg-gray-50 border border-gray-100 rounded-lg"
			>
				<span>
					{{ cookie.name }}
				</span>

				<span class="text-wrap">
					{{ cookie.description }}
				</span>

				<span>
					{{ getCookieTypeName(cookie.type)?.name ?? 'Unknown' }}
				</span>

				<span>{{ cookie.lifetime }} minutes ({{ cookie.lifetime / 60 }} hours)</span>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { CookieContainer, getCookieTypeName } from '@/composables/cookieHandler'
const showCookieList = ref<boolean>(false)
// TODO: Make the actual banner, make individual cookies toggable (make a new model for this so we can handle the choice on the backend)
</script>
