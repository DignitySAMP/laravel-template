<template>
	<div
		@click="model = !model"
		class="w-10 p-0.5 cursor-pointer font-medium bg-white rounded-xl shadow-sm relative group"
	>
		<div
			class="rounded-full size-4 p-1 transition-transform duration-300 ease-in-out"
			:class="{
				'bg-black group-hover:bg-gray-700 translate-x-5': model,
				'bg-gray-300 group-hover:bg-gray-400 translate-x-0': !model,
			}"
		/>
	</div>
</template>

<script setup lang="ts">
const model = defineModel<boolean>()
</script>
